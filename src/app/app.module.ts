import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';
import { ProductSearchComponent } from './product-search/product-search.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { LoginpageComponent } from './loginpage/loginpage.component';
import { AuthGuardService } from './auth-guard.service';
import { LoginGuardService } from './login-guard.service';

import {TokenService} from './token.service';
import { MenuNavComponent } from './menu-nav/menu-nav.component';
import { RoleGuardService } from './role-guard.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InserisciComponent } from './inserisci/inserisci.component';
import { AuthInterceptor } from './interceptor/auth-interceptor';





@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponent,
    ProductDetailComponent,
    MessagesComponent,
    ProductSearchComponent,
    FirstpageComponent,
    RicercaComponent,
    LoginpageComponent,
    MenuNavComponent,
    PagenotfoundComponent,
    InserisciComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OnsenModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  providers: [
    TokenService,
     { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
