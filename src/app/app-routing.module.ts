import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { LoginGuardService } from './login-guard.service';
import { RoleGuardService } from './role-guard.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InserisciComponent } from './inserisci/inserisci.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { ScannerComponent } from './scanner/scanner.component';
import { PropostaProdottoComponent } from './proposta-prodotto/proposta-prodotto.component';
import { PropostaComponenteComponent } from './proposta-componente/proposta-componente.component';
import { AuthorityComponent } from './authority/authority.component';
import { DashBoardAuthorityComponent } from './dash-board-authority/dash-board-authority.component';
import { ProposteAutoritaComponent } from './proposte-autorita/proposte-autorita.component';
import { ProposteProdottoAutoritaComponent } from './proposte-prodotto-autorita/proposte-prodotto-autorita.component';
import { GruppoproposteProdottoDetailComponent } from './gruppoproposte-prodotto-detail/gruppoproposte-prodotto-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full'},
  { path: 'search/result', component: ProductDetailComponent},
  { path: 'home', component: FirstpageComponent},
  { path: 'auth', component: AuthorityComponent, canActivate: [RoleGuardService], data: {expectedRole: 'AUTORITA'},
    children: [
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: DashBoardAuthorityComponent},
      {path: 'visualizza-proposte', component: ProposteAutoritaComponent}
    ]},
  {path: 'auth/visualizza-proposte/product', component: ProposteProdottoAutoritaComponent, canActivate: [RoleGuardService], data: {expectedRole: 'AUTORITA'}},
  {path: 'auth/product', component: GruppoproposteProdottoDetailComponent, canActivate: [RoleGuardService], data: {expectedRole: 'AUTORITA'}},
  { path: 'search', component: RicercaComponent},
  { path: 'scanner', component: ScannerComponent},
  { path: 'login', component: LoginpageComponent, canActivate: [LoginGuardService] },
  { path: 'insert', component: InserisciComponent, canActivate: [RoleGuardService], data: { expectedRole: 'REGISTRATO' }},
  { path: 'insert/product', component: PropostaProdottoComponent, canActivate: [RoleGuardService], data: { expectedRole: 'REGISTRATO'}},
  { path: 'insert/componet', component: PropostaComponenteComponent, canActivate: [RoleGuardService], data: { expectedRole: 'REGISTRATO'}},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuardService, RoleGuardService]
})
export class AppRoutingModule { }
