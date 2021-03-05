import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductModalComponent } from './add-product-modal.component';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('AddProductModalComponent', () => {
  let component: AddProductModalComponent;
  let fixture: ComponentFixture<AddProductModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductModalComponent ],
      imports: [ HttpClientModule ],
      providers: [ FormBuilder ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', () => {
    component.productForm.controls['name'].setValue('');
    component.productForm.controls['description'].setValue('');
    component.productForm.controls['company'].setValue('');
    component.productForm.controls['img'].setValue('');
    expect(component.productForm.valid).toBeFalsy();
  })

  it('form should be valid', () => {
    component.productForm.controls['name'].setValue('Name Test');
    component.productForm.controls['description'].setValue('Some product Test');
    component.productForm.controls['company'].setValue('Some company Test');
    component.productForm.controls['img'].setValue('https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg');
    expect(component.productForm.valid).toBeTruthy();
  })

  it('form should be invalid by custom validate', () => {
    component.productForm.controls['price'].setValue(0);
    component.productForm.controls['img'].setValue('fhdjfk');
    expect(component.customValidate()).toBeTruthy();
  })

  it('form should be valid by custom validate', () => {
    component.productForm.controls['price'].setValue(12);
    component.productForm.controls['img'].setValue('https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg');
    expect(component.customValidate()).toBeFalsy();
  })
});
