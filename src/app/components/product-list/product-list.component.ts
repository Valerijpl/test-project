import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { Product, ProductModel } from '../../models/product';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  products: Product[] = [];
  productsSorted: Product[] = [];
  searchProductsResults: Product[] = [];
  slicingCount: number = 8;
  searchField: string = '';
  @Output() loaded: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().pipe(takeUntil(this.destroyed$)).subscribe((products: any[]) => {
      products.forEach(element => {
        let product = ProductModel.create(element);

        this.products.push(product);
        this.productsSorted.push(product);
      });
      this.loaded.emit(true);
    });
  }

  searchProducts(event){
    if (event.target.value.length > 2){
      let selectedProductItems = this.products.filter(x => x.name.toLowerCase().includes(event.target.value.toLowerCase()));
      this.searchProductsResults = selectedProductItems;
    } else {
      this.searchProductsResults = [];
      this.productsSorted = this.products;
    }
  }

  public addProduct(event){
    let product = ProductModel.create(event);
    this.products.push(product);
  }

  setProductsInputValue(item){
    this.searchField = item.name;
  }

  setSelectedProduct(item){
    this.productsSorted = [];
    this.productsSorted.push(item);
    this.searchProductsResults = [];
  }

  setShowMoreProperty(){
    this.slicingCount = this.slicingCount + 8;
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
