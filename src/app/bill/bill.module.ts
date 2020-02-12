import {NgModule} from '@angular/core';

import {BillRoutingModule} from './bill-routing.module';
import {ListBillComponent} from './list-bill/list-bill.component';
import {GlobalModule} from '../_globals/global.module';
import { ShowBillComponent } from './show-bill/show-bill.component';
import { FormBillComponent } from './form-bill/form-bill.component';


@NgModule({
  declarations: [ListBillComponent, ShowBillComponent, FormBillComponent],
  exports: [
    FormBillComponent
  ],
  imports: [
    GlobalModule,
    BillRoutingModule
  ]
})
export class BillModule {
}
