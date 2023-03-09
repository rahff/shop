import { Component, Input, OnInit } from '@angular/core';
import { ProductCardDto } from 'src/shop/model/ProductPageModel';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product!: ProductCardDto;
  private price!: string;

  constructor() { }

  ngOnInit(): void {
  }
  
  public getPriceAfterPromo(): string {
    this.price = ((this.product.price - (this.product.price * this.product.promotion)/100)/100).toFixed(2)
    return this.price;
  }

}
