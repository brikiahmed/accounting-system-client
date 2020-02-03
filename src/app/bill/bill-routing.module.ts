import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListBillComponent} from './list-bill/list-bill.component';
import {ShowBillComponent} from './show-bill/show-bill.component';


const routes: Routes = [
  {
    path: '',
    component: ListBillComponent
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
