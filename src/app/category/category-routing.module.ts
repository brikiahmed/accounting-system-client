import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCategoryComponent} from './list-category/list-category.component';
import {ShowCategoryComponent} from './show-category/show-category.component';
import {FormCategoryComponent} from './form-category/form-category.component';


const routes: Routes = [
  {
    path: '',
    component: ListCategoryComponent
  }, {
    path: 'edit/:id',
    component: FormCategoryComponent
  }, {
    path: ':id',
    component: ShowCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
