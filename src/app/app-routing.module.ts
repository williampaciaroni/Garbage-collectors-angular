import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { LoginGuardService } from './login-guard.service';
import { RoleGuardService } from './role-guard.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InserisciComponent } from './inserisci/inserisci.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { ScannerComponent } from './scanner/scanner.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch:'full'},
  { path: 'products/:id', component: ProductDetailComponent},
  { path: 'products', component: ProductsComponent },
  { path: 'home', component: FirstpageComponent},
  { path: 'search', component: RicercaComponent},
  { path: 'scanner', component: ScannerComponent},
  { path: 'login', component: LoginpageComponent, canActivate: [LoginGuardService] },
  { path: 'insert', component: InserisciComponent, canActivate: [RoleGuardService], data: { expectedRole: 'REGISTRATO' }},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [LoginGuardService, RoleGuardService]
})
export class AppRoutingModule { }
