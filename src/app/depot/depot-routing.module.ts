import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListDepotComponent} from './list-depot/list-depot.component';
import {ListPaymentComponent} from '../payment/list-payment/list-payment.component';
import {FormPaymentComponent} from '../payment/form-payment/form-payment.component';
import {FormDepotComponent} from './form-depot/form-depot.component';


const routes: Routes = [
  {
    path: '',
    component: ListDepotComponent
  },
  {
    path: 'box',
    component: ListDepotComponent
  },
  {
    path: 'bank',
    component: ListDepotComponent
  },
  {
    path: 'add',
    component: FormDepotComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepotRoutingModule {
}
