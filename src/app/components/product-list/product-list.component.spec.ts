import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { HttpClientModule } from '@angular/common/http';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      imports: [ HttpClientModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select product', () => {
    fixture.detectChanges();
    component.setSelectedProduct({name: 'Test name'});
    expect(component.productsSorted[0].name).toEqual('Test name');
  })

  it('should have one product on select', () => {
    fixture.detectChanges();
    component.setSelectedProduct({name: 'Test name'});
    expect(component.productsSorted.length).toEqual(1);
  })

  it('should add one product on product creation output', () => {
    fixture.detectChanges();
    let prevLength = component.products.length;
    component.addProduct({name: 'Test name'});
    expect(component.products.length).toEqual(prevLength + 1);
  })

  it('should set name into search on option hover', () => {
    fixture.detectChanges();
    component.setProductsInputValue({name: 'Test name'});
    expect(component.searchField).toEqual('Test name');
  })

  it('should update slicing count on show more property button click', () => {
    fixture.detectChanges();
    let prevSlicingCount = component.slicingCount;
    component.setShowMoreProperty();
    expect(component.slicingCount).toEqual(prevSlicingCount + 8);
  })
});
