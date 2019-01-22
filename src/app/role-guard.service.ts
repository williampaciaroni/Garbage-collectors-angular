import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import * as decode from 'jwt-decode';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  constructor(public auth: TokenService,public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean{
    const expectedRole=route.data.expectedRole;

    const token=localStorage.getItem('auth_token');

    if(token){
      const tokenPayLoad=decode(token);
      if(tokenPayLoad.authorities[0]===expectedRole){
        return true;
      }else{
        this.router.navigate(['home']);
        return false;
      }
    }else{
      this.router.navigate(['login']);
      return false;

    }
    
    
  }
}
