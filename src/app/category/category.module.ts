import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListCategoryComponent } from './list-category/list-category.component';
import {GlobalModule} from '../_globals/global.module';


@NgModule({
  declarations: [ListCategoryComponent],
  imports: [
    GlobalModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
