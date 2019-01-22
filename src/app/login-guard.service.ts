import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})

export class LoginGuardService implements CanActivate {

  constructor(public auth: TokenService, private router: Router) { }

  canActivate(): boolean{

    if(this.auth.getToken()!==null){
      this.router.navigate(['home']);
      return false;
    }
    return true;
  }
}
