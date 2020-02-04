import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListProductComponent} from './list-product/list-product.component';
import {ShowProductComponent} from './show-product/show-product.component';
import {FormProductComponent} from './form-product/form-product.component';


const routes: Routes = [
  {
    path: '',
    component: ListProductComponent
  },
  {
    path: 'show/:id',
    component: ShowProductComponent
  },
  {
    path: 'new',
    component: FormProductComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
