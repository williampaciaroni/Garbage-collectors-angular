import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
     
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Product } from './product';
import { MessageService } from './message.service';
import { environment } from 'src/environments/environment.prod';

 
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({providedIn: 'root'})

export class ProductService {
 
  private productsUrl=environment.baseUrlRest+'/products';
  _authHttp: any;
  

  constructor(private http: HttpClient,
    private messageService: MessageService) {
     }
 
 
  getProducts(): Observable<Product[]> {
    // TODO: send the message _after_ fetching the product
    return this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(_ => this.log('fetched products')),
        catchError(this.handleError('getProducts', []))
      );
  }

  getProductNo404<Data>(id: number): Observable<Product> {
    const url = `${this.productsUrl}/?id=${id}`;

    return this.http.get<Product[]>(url)
    .pipe(
      map(products => products[0]),
      tap(p => {
        const outcome = p ? `fetched` : `did not find`;
        this.log(`${outcome} product id=${id}`);
      }),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }
  
  getProduct(id: string): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
      tap(_ => this.log(`fetched product id=${id}`)),
      catchError(this.handleError<Product>(`getProduct id=${id}`))
    );
  }


  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
      // if not search term, return empty product array.
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }

  updateProduct (product: Product): Observable<any> {
    return this.http.put(this.productsUrl, product, httpOptions).pipe(
      tap(_=> this.log(`updated product id=${product.prodId}`)),
      catchError(this.handleError<any>('updatedProduct'))
    );
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, httpOptions).pipe(
      tap((product: Product) => this.log(`added product w/ id=${product.prodId}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }

  deleteProduct (product: Product | number): Observable<Product> {
    const id = typeof product === 'number' ? product : product.prodId;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted product id=${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }

  private log(message: string){
    this.messageService.add(`ProductService: ${message}`);
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

  checkProduct(prodId: string): Observable<Boolean> {
    const url = `${this.productsUrl}/esiste/${prodId}`;
    return this.http.get<Boolean>(url).pipe(
      tap(_ => this.log(`fetched product id=${prodId}`)),
      catchError(this.handleError<Boolean>(`checkProduct id=${prodId}`))
    );
  }


  
}
