import { Component, ViewChild } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test-project';
  loaded: boolean = false;
  showModal: boolean = false;

  @ViewChild(ProductListComponent)
  productListComponent: ProductListComponent;

  constructor(){

  }

  updateLoadedValue(value){
    this.loaded = value;
  }

  openAddProductModal(){
    this.showModal = true;
  }

  closeAddProductModal(event){
    this.showModal = false;
  }

  updateProductList(event: Product){
    this.showModal = false;
    this.productListComponent.addProduct(event);
  }
}
