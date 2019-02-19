import { Component, OnInit } from '@angular/core';
import { PropostaService } from '../proposta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-proposte-prodotto-autorita',
  templateUrl: './proposte-prodotto-autorita.component.html',
  styleUrls: ['./proposte-prodotto-autorita.component.css']
})
export class ProposteProdottoAutoritaComponent implements OnInit {

  gruppiProposte$;
  constructor(private proposteService: PropostaService, private router:Router) { }

  ngOnInit() {
    this.getProposteProdotto();
  }

  getProposteProdotto(){
    this.proposteService.getGruppiProposteProdotto()
      .subscribe(proposte=>this.gruppiProposte$=proposte);
  }

  onClick(prodId: string){
    this.router.navigate(['auth/product/'],{queryParams: {prodId: prodId}});
  }
}
