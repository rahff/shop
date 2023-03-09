import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ProductPageModel } from 'src/shop/model/ProductPageModel';
import { ProductService } from 'src/shop/services/product.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  public productPage$!: Observable<any>;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productPage$ = this.productService.getProductPage(1)
  }

}
