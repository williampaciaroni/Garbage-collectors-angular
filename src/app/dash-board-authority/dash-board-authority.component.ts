import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { tap } from 'rxjs/operators';
import { PropostaService } from '../proposta.service';

@Component({
  selector: 'app-dash-board-authority',
  templateUrl: './dash-board-authority.component.html',
  styleUrls: ['./dash-board-authority.component.css']
})
export class DashBoardAuthorityComponent implements OnInit {

  
  constructor(private tokenService: TokenService, private http: HttpClient, private propostaService: PropostaService) { }
  nomeAutorita=this.tokenService.getUserName();
  utenti=0;
  proposte=0;
  prodotti=0;
  private urlUser=environment.baseUrlRest+'/utenti/count';

  ngOnInit() {
    this.getUsersCount();
    this.getProposteCount();
  }

  getUsersCount(): void{
    this.http.get<number>(`${this.urlUser}`)
      .pipe(
        tap(_ => console.log('fetched proposte'))
    ).subscribe(utenti=>this.utenti=utenti);
  }

  getProposteCount(): void{
    this.propostaService.getProposteCount()
      .subscribe(proposte=>this.proposte=proposte);
  }
}
