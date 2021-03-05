import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, share, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get('/api/v1/Products').pipe(share()).pipe(map(response => {
      return response;
    }));
  }

  addProduct(product): Observable<any> {
    return this.http.post('/api/v1/Products', product).pipe(share()).pipe(map(response => {
      return response;
    }));
  }
}
