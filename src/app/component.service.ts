import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { ComponentP } from './componentp';
import { MessageService } from './message.service';


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ComponentService {

  private componentsUrl = 'http://10.0.3.28:8080/api/products/';

  constructor(private http: HttpClient,
    private messageService: MessageService) { }
 
    getComponents(): Observable<ComponentP[]> {
      // TODO: send the message _after_ fetching the products
      return this.http.get<ComponentP[]>(this.componentsUrl)
        .pipe(
          tap(_ => this.log('fetched components')),
          catchError(this.handleError('getComponents', []))
        );
    }

    getComponentNo404<Data>(id: number): Observable<ComponentP> {
      const url = `${this.componentsUrl}/?id=${id}/components`;
  
      return this.http.get<ComponentP[]>(url)
      .pipe(
        map(components => components[0]),
        tap(c => {
          const outcome = c ? `fetched` : `did not find`;
          this.log(`${outcome} component id=${id}`);
        }),
        catchError(this.handleError<ComponentP>(`getComponent id=${id}`))
      );
    }
    
    getComponent(id: number): Observable<ComponentP> {
      const url = `${this.componentsUrl}/?id=${id}/components`;
      return this.http.get<ComponentP>(url).pipe(
        tap(_ => this.log(`fetched component id=${id}`)),
        catchError(this.handleError<ComponentP>(`getComponent id=${id}`))
      );
    }

    updateComponent (component: ComponentP): Observable<any> {
      return this.http.put(this.componentsUrl, component, httpOptions).pipe(
        tap(_=> this.log(`updated component id=${component.id}`)),
        catchError(this.handleError<any>('updatedComponent'))
      );
    }
  
    addComponent(component: ComponentP): Observable<ComponentP> {
      return this.http.post<ComponentP>(this.componentsUrl, component, httpOptions).pipe(
        tap((component: ComponentP) => this.log(`added component w/ id=${component.id}`)),
        catchError(this.handleError<ComponentP>('addComponent'))
      );
    }
  
    deleteComponent (component: ComponentP | number): Observable<ComponentP> {
      const id = typeof component === 'number' ? component : component.id;
      const url = `${this.componentsUrl}/${id}`;
  
      return this.http.delete<ComponentP>(url, httpOptions).pipe(
        tap(_ => this.log(`deleted component id=${id}`)),
        catchError(this.handleError<ComponentP>('deleteComponent'))
      );
    }
  
    private log(message: string){
      this.messageService.add(`ComponentService: ${message}`);
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
