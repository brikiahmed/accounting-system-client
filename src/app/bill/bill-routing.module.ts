import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListBillComponent} from './list-bill/list-bill.component';
import {ShowBillComponent} from './show-bill/show-bill.component';
import {FormBillComponent} from './form-bill/form-bill.component';


const routes: Routes = [
  {
    path: '',
    component: ListBillComponent
  }, {
    path: 'add',
    component: FormBillComponent
  }, {
    path: ':id',
    component: ShowBillComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule {
}
