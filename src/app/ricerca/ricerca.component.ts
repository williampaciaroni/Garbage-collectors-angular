import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Subject, Observable } from 'rxjs';
import { Area } from '../area';
import { AreaService } from '../area.service';
import { PoliticaSmaltimento } from '../politicasmaltimento';
import { TokenService } from '../token.service';

import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'q';




@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {

 

  product: Product=null;
  private searchTerms = new Subject<string>();
  area$:  Observable<Area[]>;
  area: Area;
  politiche$: PoliticaSmaltimento[]=null;
  
  constructor(private productService: ProductService, private areaService: AreaService, private token:TokenService, private route:ActivatedRoute, private router:Router) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getProduct(prodId: string): void{
    this.product=null;
    this.productService.getProduct(prodId)
      .subscribe(product => this.product = product);
  }

  getPolitiche(prodId:string , nomeArea: string): void{
    this.politiche$=null;
    this.areaService.getPolitiche(prodId,nomeArea)
      .subscribe(politiche => this.politiche$=politiche);
  }

  onClickSearch(): void{
    var barCode=(<HTMLInputElement>document.getElementById('barCode')).value;
    var area=(<HTMLInputElement>document.getElementById('area')).value;
    
    if(area!=='' && barCode!==''){
      this.getProduct(barCode);
      this.getPolitiche(barCode,area);
    } 
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params=>
      { if(params['barCode']!==undefined)
        {
          (<HTMLInputElement>document.getElementById('barCode')).value=params['barCode']
        }  
      }
    )
    
  }

  
  onClickCheckBox(){
    if((<HTMLInputElement>document.getElementById('checkBoxArea')).checked===true){
      (<HTMLInputElement>document.getElementById('area')).disabled=true;
      (<HTMLInputElement>document.getElementById('area')).value=this.getUserArea();
    }else{
      (<HTMLInputElement>document.getElementById('area')).disabled=false;
      (<HTMLInputElement>document.getElementById('area')).value="";
    }
    
  }

  isAuthenticated(){
    return this.token.isAuthenticated();
  }

  checkProduct(){
    if(this.product===undefined || this.product===null){
      return false;
    }else if(this.product!==undefined && this.product!==null){
      if(this.politiche$.length===0){
        return false;
      }
    }
    return true;
  }

  getUserArea(){
    return this.token.obtainAreaUser();
  }


}
