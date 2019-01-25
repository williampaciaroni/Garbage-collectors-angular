import { Injectable } from '@angular/core';
import { Area } from './area';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { tap, catchError } from 'rxjs/operators';
import { PoliticaSmaltimento } from './politicasmaltimento';
import { Product } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})

export class AreaService {

  private areasUrl='https://garbage-rest.cfapps.io/area-geografica';
  product: Product;
  constructor(private http: HttpClient,
    private messageService: MessageService,private productService: ProductService) {
     }

  getAreas(): Observable<Area[]> {
      // TODO: send the message _after_ fetching the area
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


  searchAreas(term: string): Observable<Area[]> {
    if (!term.trim()) {
      // if not search term, return empty area array.
      return of([]);
    }
    return this.http.get<Area[]>(`${this.areasUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found areas matching "${term}"`)),
      catchError(this.handleError<Area[]>('searchAreas', []))
    );
  }

  private log(message: string){
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
