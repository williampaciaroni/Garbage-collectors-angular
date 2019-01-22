import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-inserisci',
  templateUrl: './inserisci.component.html',
  styleUrls: ['./inserisci.component.css']
})
export class InserisciComponent implements OnInit {

  constructor(private productService: ProductService, private http:HttpClient) { }

  ngOnInit() {
  }

  onClick(){
    this.productService.checkProduct('1').subscribe(data=>(data)); 
  }

}
