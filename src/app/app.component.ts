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
  buttonLogName='';


  constructor(private tokenService: TokenService, private router:Router){
    if(!this.tokenService.getToken()){
      this.buttonLogName="Accedi";
    }else{
      this.buttonLogName="Esci";
    }
    if(this.tokenService.isExpired()){
      this.repeated();
    }
    interval(30000).subscribe(
      () => this.repeated()
    )
  }

  ngOnInit(){
  }

  onClickLog(){
    if(!this.tokenService.getToken()){
      this.router.navigate(['login']);
    }else{
      this.tokenService.logOut();
    }
  }

  onClickDropDown(){
    var collapse=document.getElementById('navbarButton');
    if(collapse.getAttribute('class')==='navbar-toggler collapsed'){
      document.getElementById('navbarButton').setAttribute('class','navbar toggler');
      document.getElementById('navbarButton').setAttribute('aria-expanded','true');
      document.getElementById('navbarNavDropdown').setAttribute('class','navbar-collapse collapse show');
    }else{
      document.getElementById('navbarButton').setAttribute('class','navbar-toggler collapsed');
      document.getElementById('navbarButton').setAttribute('aria-expanded','false');
      document.getElementById('navbarNavDropdown').setAttribute('class','navbar-collapse collapse');
    }
    
  }

  private repeated(){
    if(this.tokenService.getToken()!==null){
    this.tokenService.removeToken();
    this.tokenService.refreshToken().subscribe(
      data=>this.tokenService.saveToken(JSON.stringify(data))
    );
    }
  }
}
