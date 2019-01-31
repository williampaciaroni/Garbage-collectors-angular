import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import * as decode from 'jwt-decode';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(public auth: TokenService,public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot){
    const expectedRole=route.data.expectedRole;

    const token=localStorage.getItem('auth_token');

    if(!token){
      this.router.navigate(['login']);
      return false;
    }else{
      const tokenPayLoad=decode(token);
      if(tokenPayLoad.authorities[0]!==expectedRole){
       this.router.navigate(['home']);
       return false;
      }else{
        return this.checkToken();
      }
    }
  }

  async checkToken() {
    try {
      const res = await this.auth.checkToken().toPromise();
      return true;
    }
    catch (error) {
      return false;
    }

  }
} 
