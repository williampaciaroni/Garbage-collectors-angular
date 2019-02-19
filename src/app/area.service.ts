import { Injectable } from '@angular/core';
import { Area } from './area';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { tap, catchError } from 'rxjs/operators';
import { PoliticaSmaltimento } from './politicasmaltimento';
import { Product } from './product';
import { ProductService } from './product.service';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class AreaService {

  private areasUrl=environment.baseUrlRest+'/area-geografica';
  private product: Product;

  constructor(private http: HttpClient,
    private messageService: MessageService,private productService: ProductService) {
     }

  getAreas(): Observable<Area[]> {
      return this.http.get<Area[]>(this.areasUrl)
        .pipe(
          tap(_ => this.log('fetched areas')),
          catchError(this.handleError('getAreas', []))
        );
  }

  getPolitiche(prodId: string, nomeArea: string): Observable<PoliticaSmaltimento[]>{
    
    return this.http.get<PoliticaSmaltimento[]>(`${this.areasUrl}/${nomeArea}/ricerca/${prodId}`)
      .pipe(
        tap(_ => this.log('fetched politiche')),
        catchError(this.handleError('getPolitiche',[]))
      );
     
  }

  private log(message: string): void{
    this.messageService.add(`AreaService: ${message}`);
  }

 
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
