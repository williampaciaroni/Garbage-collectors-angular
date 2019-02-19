import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { catchError, tap } from 'rxjs/operators';
import { PropostaProdotto } from './proposta-prodotto';
import { Observable, of } from 'rxjs';
import { GruppoProposteProdotto } from './gruppoProposteProdotto';
import { Product } from './product';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class PropostaService {
  private propostaUrl=environment.baseUrlRest+'/proposte';
  
  constructor(private http: HttpClient) { }

  public salvaPropostaProdotto(prodId: string, nomeProdotto: string, nomeUtente: string){
    const params=new URLSearchParams();
    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'});


    params.append('prodId',prodId);
    params.append('nomeProdotto',nomeProdotto);
    params.append('nomeUtente',nomeUtente);

    
    return this.http.post<PropostaProdotto>(this.propostaUrl, params.toString(),{headers:headers}).subscribe();
  }

  public checkProposta(prodId: string,nomeUtente: string): Observable<Boolean> {
    
    const url = `${this.propostaUrl}/isEnable/${nomeUtente}/${prodId}`;
    return this.http.get<Boolean>(url).pipe(
      tap(_ => console.log(`fetched proposta id=${prodId}`)),
      catchError(this.handleError<Boolean>(`checkProduct id=${prodId}`))
    );
  }

  public getGruppiProposteProdotto(): Observable<GruppoProposteProdotto[]>{
    return this.http.get<GruppoProposteProdotto[]>(`${this.propostaUrl}/group`)
      .pipe(
        tap(_ => console.log('fetched proposte')),
        catchError(this.handleError('getProposte',[]))
    );
  }

  public getProposteProdotto(prodId: string): Observable<PropostaProdotto[]> {
    return this.http.get<PropostaProdotto[]>(`${this.propostaUrl}/${prodId}`)
      .pipe(
        tap(_ => console.log('fetched proposte')),
        catchError(this.handleError('getProposte',[]))
      );
  }

  public getProposteCount(): Observable<number> {
    return this.http.get<number>(`${this.propostaUrl}/count`)
      .pipe(
        tap(_ => console.log('fetched proposte'))
      )
  }

  public scartaProposta(propostaId):Observable<PropostaProdotto> {
    return this.http.delete<PropostaProdotto>(this.propostaUrl,{params: {prodId: propostaId.prodId, username: propostaId.user.username}});
  }

  public convalidaProposta(proposta: PropostaProdotto): Observable<Product> {
    const params=new URLSearchParams();
    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded'});


    params.append('prodId',proposta.propostaId.prodId);
    params.append('nomeProdotto',proposta.nomeProdotto);
    params.append('nomeUtente',proposta.propostaId.user.username);

    
    return this.http.post<Product>(environment.baseUrlRest+'/products', params.toString(),{headers:headers});
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
