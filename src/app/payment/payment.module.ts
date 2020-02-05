import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PaymentRoutingModule} from './payment-routing.module';
import {GlobalModule} from '../_globals/global.module';
import { ListPaymentComponent } from './list-payment/list-payment.component';
import { FormPaymentComponent } from './form-payment/form-payment.component';


@NgModule({
  declarations: [ListPaymentComponent, FormPaymentComponent],
  imports: [
    GlobalModule,
    PaymentRoutingModule
  ]
})
export class PaymentModule {
}
