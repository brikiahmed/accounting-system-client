import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {GlobalModule} from '../_globals/global.module';
import { ListProductComponent } from './list-product/list-product.component';
import { ShowProductComponent } from './show-product/show-product.component';
import { FormProductComponent } from './form-product/form-product.component';


@NgModule({
  declarations: [ListProductComponent, ShowProductComponent, FormProductComponent],
  imports: [
    GlobalModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
