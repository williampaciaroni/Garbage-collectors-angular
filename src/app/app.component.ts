import { Component } from '@angular/core';
import { TokenService } from './token.service';
import { Router } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Garbage Collectors';
  buttonLogName='Accedi';


  constructor(private tokenService: TokenService, private router:Router){
    if(!this.tokenService.getToken()){
      this.buttonLogName="Accedi";
    }else{
      this.buttonLogName="Esci";
    }
    if(this.tokenService.isExpired()){
      this.repeated();
    }
    /* Refresh = 12 minuti*/
    interval(240000).subscribe(
      () => this.repeated()
    )
  }

  ngOnInit(){
  }

  onClickLog(){
    if(this.tokenService.getToken()==null){
      this.router.navigate(['login']);
    }else{
      this.tokenService.logOut();
    }
  }

  private repeated(){
    if(this.tokenService.getToken()!==null){
    this.tokenService.removeToken();
    this.tokenService.refreshToken().subscribe(
      data=>{
        this.tokenService.saveToken(JSON.stringify(data));
      });
   }
  }

  onActivate() {
    window.scroll(0,0);
    var side=document.getElementById("sideNav");
    side.style.width="0px";
    document.getElementById("hamburger").style.right="0";
  }

  openCloseSideNav(){
    var side=document.getElementById("sideNav");

    if(side.style.width==="260px"){
      side.style.width="0px";
      document.getElementById("hamburger").style.right="0px";
    }else{
      side.style.width="260px";
      document.getElementById("hamburger").style.right="180px";
    }
    
  }

  checkAuth(): boolean{
    if(this.tokenService.getAuthorities()==='AUTORITA'){
      return false;
    }
    return true;
  }
  
}
