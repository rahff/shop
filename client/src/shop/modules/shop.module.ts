import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListHeaderComponent } from '../components/list-header/list-header.component';
import { ListNavComponent } from '../components/list-nav/list-nav.component';
import { PaginatorComponent } from '../components/paginator/paginator.component';
import { ProductCardComponent } from '../components/product-card/product-card.component';
import { SortProductComponent } from '../components/main/sidebar/sort-product/sort-product.component';
import { FilterProductComponent } from '../components/main/sidebar/filter-product/filter-product.component';
import { SorterProductComponent } from '../components/main/sidebar/sorter-product/sorter-product.component';
import { ShopRoutingModule } from './shop-routing.module';



@NgModule({
  declarations: [
    ListHeaderComponent,
    ListNavComponent,
    PaginatorComponent,
    ProductCardComponent,
    SortProductComponent,
    FilterProductComponent,
    SorterProductComponent,
    ...ShopRoutingModule.components
  ],
  imports: [
    CommonModule,
    ShopRoutingModule
  ]
})
export class ShopModule { }
