import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "", loadChildren: ()=> import("../../shop/modules/shop.module").then(m => m.ShopModule)
  },
  {
    path: "cart", loadChildren: ()=> import("../../cart/modules/cart.module").then(m => m.CartModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
