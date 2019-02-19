import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { TokenService } from '../token.service';
import { PropostaService } from '../proposta.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-proposta-prodotto',
  templateUrl: './proposta-prodotto.component.html',
  styleUrls: ['./proposta-prodotto.component.css']
})
export class PropostaProdottoComponent implements OnInit {
  error:String;
  check=false;

  constructor(private productService: ProductService, private tokenService: TokenService,
              private propostaService: PropostaService) { }

  ngOnInit() {
  }

  onClick(){
    var barCode=(<HTMLInputElement>document.getElementById('barCode')).value;
    var nomeProdotto=(<HTMLInputElement>document.getElementById('nomeProdotto')).value;
    var userName=this.tokenService.getUserName();

    if(!this.checkProduct() && barCode!=='' && nomeProdotto!==''){
      this.propostaService.salvaPropostaProdotto(barCode,nomeProdotto,userName);
      alert('La sua proposta è stata inviata con successo!');
      location.replace('insert');
    }
    
  }

  checkProduct(): boolean{
    var barCode=(<HTMLInputElement>document.getElementById('barCode')).value;
    if(barCode!==""){
      this.productService.checkProduct(barCode).subscribe(
        data=>{
          if(data===true){
          document.getElementById('barCode').style.border="1px solid red";
          this.error="Il prodotto già esiste";
          this.check=data.valueOf();
          (<HTMLInputElement>document.getElementById('btnProposta')).disabled=true;
          return true;
        }else if(data===false){
          this.checkProposta(barCode).subscribe(
            data=>{
              if(data===true){
                document.getElementById('barCode').style.border="1px solid grey";
                this.error="";
                this.check=false;
                (<HTMLInputElement>document.getElementById('btnProposta')).disabled=false;
                return false;
              }else if(data===false){
                document.getElementById('barCode').style.border="1px solid red";
                this.error="La proposta è già stata fatta";
                this.check=true;
                (<HTMLInputElement>document.getElementById('btnProposta')).disabled=true;
                return true;
              }
            }) 
        }
      },
      error=>{
        alert("Ops! C'è stato un errore");
        return true;
      }
      )
    }else{
      document.getElementById('barCode').style.border="1px solid grey";
      this.error="";
      this.check=false;
      (<HTMLInputElement>document.getElementById('btnProposta')).disabled=true;
      return false;
    } 
  }

  private checkProposta(prodId: string): Observable<Boolean>{
    return this.propostaService.checkProposta(prodId,this.tokenService.getUserName());
  }
}
