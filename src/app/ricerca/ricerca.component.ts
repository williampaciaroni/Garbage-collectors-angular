import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { Subject, Observable } from 'rxjs';
import { Area } from '../area';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AreaService } from '../area.service';
import { PoliticaSmaltimento } from '../politicasmaltimento';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {

  product: Product;
  private searchTerms = new Subject<string>();
  area$:  Observable<Area[]>;
  area: Area;
  politiche$: PoliticaSmaltimento[];

  constructor(private productService: ProductService, private areaService: AreaService) { }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  getProduct(prodId: string): void{
    this.productService.getProduct(prodId)
      .subscribe(product => this.product = product);
  }

  getPolitiche(prodId:string , nomeArea: string): void{
    this.areaService.getPolitiche(prodId,nomeArea)
      .subscribe(politiche => this.politiche$=politiche);
  }

  onClick(): void{
    var barCode=(<HTMLInputElement>document.getElementById('barCode')).value;
    var area=(<HTMLInputElement>document.getElementById('area')).value;
    
    this.getProduct(barCode);
    this.getPolitiche(barCode,area);
    
  }

  getColor(politica: PoliticaSmaltimento){
    var color='grey';
    if(politica.categoria!==undefined && politica.categoria!==null){
      const categoria=politica.categoria.categoria;
      if(categoria==='PLASTICA'){
        color='#00a8ec';
      }else if(categoria==='VETRO'){
        color='#51d93b';
      }else if(categoria==='CARTA'){
        color='#ffb11b';
      }
    }
    return color;;
  }

  ngOnInit(): void {
    
  }
}
