import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { ProductService} from '../product.service';
import { PoliticaSmaltimento } from '../politicasmaltimento';
import { AreaService } from '../area.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  politiche$: PoliticaSmaltimento[];
  product: Product=null;


  constructor(private areaService: AreaService, private productService: ProductService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params=>this.getProduct(params['barCode'],params['area'])
    );
  }

  checkProduct(): boolean{
    if(this.product===undefined || this.product===null){
      return false;
    }else if(this.product!==undefined && this.product!==null){
      if(this.politiche$.length===0){
        return false;
      }
    }
    return true;
  }

  getProduct(prodId: string,area: string): void{
    this.product=null;
    this.productService.getProduct(prodId)
      .subscribe(product => {
        this.product = product;
        if(product!==undefined){
          this.getPolitiche(prodId,area);
          }});
  }

  getPolitiche(prodId:string , nomeArea: string): void{
    this.areaService.getPolitiche(prodId,nomeArea)
      .subscribe(politiche => this.politiche$=politiche);
  }

}
