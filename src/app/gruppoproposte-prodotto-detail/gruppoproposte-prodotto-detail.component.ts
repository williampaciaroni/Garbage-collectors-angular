import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropostaService } from '../proposta.service';
import { PropostaProdotto } from '../proposta-prodotto';

@Component({
  selector: 'app-gruppoproposte-prodotto-detail',
  templateUrl: './gruppoproposte-prodotto-detail.component.html',
  styleUrls: ['./gruppoproposte-prodotto-detail.component.css']
})
export class GruppoproposteProdottoDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private proposteService: PropostaService) { }
  private prodId: string;
  proposte$: PropostaProdotto[];

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params=>
      { if(params['prodId']!==undefined)
        {
          this.prodId=params['prodId'];
          this.proposteService.getProposteProdotto(this.prodId)
            .subscribe(proposte=>{
              if(proposte.length===0){
              location.replace('auth/visualizza-proposte/product');
            }else{
              this.proposte$=proposte;
            }
          }
        )}
        }
    )
  }

  onClickScarta(propostaId: string): void{
    this.proposteService.scartaProposta(propostaId)
      .subscribe(
        data=>{
          location.reload();
        },
        error=>{
          console.log(error);
          alert("Ops. Qualcosa è andato storto!");
        }
      );
  }

  onClickConvalida(proposta: PropostaProdotto): void{
    this.proposteService.convalidaProposta(proposta)
      .subscribe(
        data=>{
          alert("La convalida della proposta è avvenuta con successo!");
          location.replace('auth/visualizza-proposte/product');
        }
      )
  }

}
