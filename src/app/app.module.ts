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
    ScannerComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    OnsenModule,
    ZXingScannerModule
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
