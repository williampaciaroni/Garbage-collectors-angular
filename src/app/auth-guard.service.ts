import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(public auth: TokenService, public router: Router) { }

  canActivate(): boolean{
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
