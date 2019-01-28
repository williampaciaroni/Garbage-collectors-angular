import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, interval } from 'rxjs';
import * as decode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private url=environment.baseUrlAuth;
  private client_username="test_user";
  private cient_psw="test_psw";
  constructor(private http: HttpClient) { 
    
  }

  public obtainToken(username, password): Observable<HttpResponse<string>> {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);
    params.append('grant_type', 'password');

    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded',
                                    'Authorization': 'Basic ' + btoa(this.client_username+':'+this.cient_psw)});  // btoa(...) converte una stringa in base-64

    
    return this.http.post<HttpResponse<string>>(this.url+'/oauth/token', params.toString(), {headers: headers});

    
  }

  public refreshToken(){

    const params = new URLSearchParams();

    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', localStorage.getItem('refresh_token'));
    

    const headers = new HttpHeaders({'Content-type': 'application/x-www-form-urlencoded',
                                    'Authorization': 'Basic ' + btoa(this.client_username+':'+this.cient_psw)}); 
             
    
    return this.http.post<HttpResponse<string>>(this.url+'/oauth/token', params.toString(), {headers: headers}).pipe(
      catchError(this.handleTokenError
      ));
  }

  public saveToken(token) {
    const _token=JSON.parse(token);
    localStorage.setItem('auth_token', _token ['access_token']);
    localStorage.setItem('refresh_token', _token ['refresh_token']);
  }

  public getToken() {
    return localStorage.getItem('auth_token');
  }

  public isAuthenticated(): boolean{
    let jwtHelper: JwtHelperService=new JwtHelperService();
    const token=localStorage.getItem('auth_token');
    return !jwtHelper.isTokenExpired(token);
  }

  public logOut(){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    location.reload();
  }

  private handleTokenError(error: HttpErrorResponse){
    return throwError(error);
  }

  public isExpired(){
    if(this.getToken()!==null){
      const helper=new JwtHelperService();
      return helper.isTokenExpired(this.getToken());
    }
    return true;
  }

  public removeToken(){
    localStorage.removeItem('auth_token');
  }

  public obtainAreaUser(){
    const token=decode(this.getToken());
    return token.area;
  }
  
}
