import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { OnsenModule } from 'ngx-onsenui';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MessagesComponent } from './messages/messages.component';

import { AppRoutingModule } from './app-routing.module';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { LoginpageComponent } from './loginpage/loginpage.component';

import {TokenService} from './token.service';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { InserisciComponent } from './inserisci/inserisci.component';
import { AuthInterceptor } from './interceptor/auth-interceptor';
import { MediaComponent } from './media/media.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScannerComponent } from './scanner/scanner.component';
import { PropostaProdottoComponent } from './proposta-prodotto/proposta-prodotto.component';
import { PropostaComponenteComponent } from './proposta-componente/proposta-componente.component';
import { AuthorityComponent } from './authority/authority.component';
import { DashBoardAuthorityComponent } from './dash-board-authority/dash-board-authority.component';
import { ProposteAutoritaComponent } from './proposte-autorita/proposte-autorita.component';
import { ProposteProdottoAutoritaComponent } from './proposte-prodotto-autorita/proposte-prodotto-autorita.component';
import { GruppoproposteProdottoDetailComponent } from './gruppoproposte-prodotto-detail/gruppoproposte-prodotto-detail.component';
import { ProfiloUserComponent } from './profilo-user/profilo-user.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ProductDetailComponent,
    MessagesComponent,
    FirstpageComponent,
    RicercaComponent,
    LoginpageComponent,
    PagenotfoundComponent,
    InserisciComponent,
    MediaComponent,
    ScannerComponent,
    PropostaProdottoComponent,
    PropostaComponenteComponent,
    AuthorityComponent,
    DashBoardAuthorityComponent,
    ProposteAutoritaComponent,
    ProposteProdottoAutoritaComponent,
    GruppoproposteProdottoDetailComponent,
    ProfiloUserComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OnsenModule,
    ZXingScannerModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
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
