import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductPageModel } from '../model/ProductPageModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseApiUrl = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  public getProductPage(page: number): Observable<ProductPageModel> {
    return this.http.get<{data: ProductPageModel}>(`${this.baseApiUrl}/query/productPage?page=${page}`)
    .pipe(map((response: {data: ProductPageModel}) => response.data))
  }
}
