import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { ProductService } from '../../services/product/product.service';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  @Input() showModal: boolean = false;
  @Output() onClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSuccess: EventEmitter<any> = new EventEmitter<any>();
  productForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private productService: ProductService) { }

  ngOnInit(): void {
    this.refreshForm();
  }

  closeModal(){
    this.refreshForm();
    this.onClose.emit(true);
  }

  refreshForm(){
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      company: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      img: ['', Validators.required],
      createdAt: ['']
    })
  }

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  customValidate(){
    if (this.validURL(this.productForm.value.img) == true && this.productForm.value.price > 0){
      return false;
    } else {
      return true;
    }
  }

  submitForm(){
    let newMomentString = moment(new Date()).toISOString();
    this.productForm.patchValue({createdAt: newMomentString});
    this.productService.addProduct(this.productForm.value).pipe(takeUntil(this.destroyed$)).subscribe(result => {
      this.refreshForm();
      this.onSuccess.emit(result);
    })
  }

  ngOnDestroy(){
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
