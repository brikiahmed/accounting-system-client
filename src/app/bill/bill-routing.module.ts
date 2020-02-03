import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListBillComponent} from './list-bill/list-bill.component';


const routes: Routes = [
  {
    path: '',
    component: ListBillComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillRoutingModule {
}
