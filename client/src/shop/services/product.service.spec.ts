import { fakeAsync, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { productPageResponse } from '../data/productPageResponse';
import { ProductService } from './product.service';


describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj("HttpClient", ["get"])
    service = new ProductService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send get request to get product page', fakeAsync(()=>{
    httpClientSpy.get.and.returnValue(of(productPageResponse));
    service.getProductPage(1).subscribe((response: any) => {
      expect(response).toEqual(productPageResponse.data)
    })
    expect(httpClientSpy.get).toHaveBeenCalledWith("http://localhost:3000/query/productPage?page=1")
  }))
});
