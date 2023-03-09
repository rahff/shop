import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from 'src/shared/components/banner/banner.component';
import { FooterComponent } from 'src/shared/components/footer/footer.component';
import { HeaderComponent } from 'src/shared/components/header/header.component';
import { SharedRoutingModule } from './shared-routing.module';
import { HttpClientModule } from "@angular/common/http";

const COMPONENTS = [ 
  HeaderComponent,
  FooterComponent,
  BannerComponent
]

const MODULES = [
  SharedRoutingModule,
  CommonModule,
  HttpClientModule
]

@NgModule({
  declarations: [
   ...COMPONENTS
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES
  ]
})
export class SharedModule { }
