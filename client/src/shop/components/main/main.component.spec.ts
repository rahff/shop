import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductService } from 'src/shop/services/product.service';

import { MainComponent } from './main.component';

describe(' Shop  => MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let productServiceSpy: any;
  beforeEach(async () => {
    productServiceSpy = jasmine.createSpyObj("ProductService", ["getProductPage"])
    await TestBed.configureTestingModule({
      declarations: [ MainComponent ],
      providers: [
        {
          provide: ProductService, useValue: productServiceSpy
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
