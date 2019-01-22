import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
      { prodId: 11, name: 'Mr. Nice' },
      { prodId: 12, name: 'Narco' },
      { prodId: 13, name: 'Bombasto' },
      { prodIdd: 14, name: 'Celeritas' },
      { prodId: 15, name: 'Magneta' },
      { prodId: 16, name: 'RubberMan' },
      { prodId: 17, name: 'Dynama' },
      { prodId: 18, name: 'Dr IQ' },
      { prodId: 19, name: 'Magma' },
      { prodId: 20, name: 'Tornado' }
    ];
    const components = [
      { id: 11, name: 'Component1' },
      { id: 12, name: 'Component1' },
      { id: 13, name: 'Component1' },
      { id: 14, name: 'Component1' },
      { id: 15, name: 'Component1' },
      { id: 16, name: 'Component1' }
    ];
    return {products, components};
  }

 

  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.prodId)) + 1 : 11;
  }

}