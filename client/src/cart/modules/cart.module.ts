import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/modules/shared.module';
import { CartRoutingModule } from './cart-routing.module';



@NgModule({
  declarations: [
    ...CartRoutingModule.components
  ],
  imports: [
    SharedModule,
    CartRoutingModule
  ]
})
export class CartModule { }
