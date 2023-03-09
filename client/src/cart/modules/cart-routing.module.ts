import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from '../components/main/main.component';


const ROUTES: Routes = [
  {
    path: "", pathMatch: "full", component: MainComponent
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(ROUTES)
  ],
})
export class CartRoutingModule {
  static components = [MainComponent]
}
