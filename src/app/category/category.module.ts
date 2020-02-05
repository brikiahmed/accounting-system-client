import { NgModule } from '@angular/core';

import { CategoryRoutingModule } from './category-routing.module';
import { ListCategoryComponent } from './list-category/list-category.component';
import {GlobalModule} from '../_globals/global.module';
import { ShowCategoryComponent } from './show-category/show-category.component';
import { FormCategoryComponent } from './form-category/form-category.component';


@NgModule({
  declarations: [ListCategoryComponent, ShowCategoryComponent, FormCategoryComponent],
  imports: [
    GlobalModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
