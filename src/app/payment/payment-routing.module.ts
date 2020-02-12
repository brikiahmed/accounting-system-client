import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListPaymentComponent} from './list-payment/list-payment.component';
import {FormPaymentComponent} from './form-payment/form-payment.component';



const routes: Routes = [
  {
    path: 'cash',
    component: ListPaymentComponent
  },
  {
    path: 'check',
    component: ListPaymentComponent
  },
  {
    path: 'add',
    component: FormPaymentComponent
  },
  {
    path: 'edit/:id',
    component: FormPaymentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule {
}
