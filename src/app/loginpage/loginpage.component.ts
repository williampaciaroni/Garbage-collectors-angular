import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { Router } from '@angular/router';
import { delay } from 'q';

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit {

  constructor(private tokenService: TokenService,private router:Router) { }

  ngOnInit() {
  }

  onClickLogin() {
    this.reset();


    var username=(<HTMLInputElement>document.getElementById('user')).value;
    if(username===''){
      document.getElementById('user').style.border="1px solid red";
      document.getElementById('user').setAttribute("placeholder","Inserire Username");
      username=null;
    }else{
      var password=(<HTMLInputElement>document.getElementById('psw')).value;
      if(password!==''){
            this.tokenService.removeToken();
            this.tokenService.obtainToken(username,password).subscribe(data=>{
            this.tokenService.saveToken(JSON.stringify(data));
            if(this.tokenService.getAuthorities()==='AUTORITA'){
              location.replace('auth');
            }else{
              location.replace('home');
            }
          });  
      }
      else{
        document.getElementById('psw').style.border="1px solid red";
        document.getElementById('psw').setAttribute("placeholder","Inserire Password");
      }
    }
  }

  private reset(){
    document.getElementById('user').style.border="1px solid grey";
    document.getElementById('user').setAttribute("placeholder","Username");
    document.getElementById('psw').style.border="1px solid grey";
    document.getElementById('psw').setAttribute("placeholder","Password");
  }
}
