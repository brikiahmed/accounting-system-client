import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {GlobalModule} from '../_globals/global.module';
import { ListProductComponent } from './list-product/list-product.component';


@NgModule({
  declarations: [ListProductComponent],
  imports: [
    GlobalModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
