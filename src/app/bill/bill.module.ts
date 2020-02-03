import {NgModule} from '@angular/core';

import {BillRoutingModule} from './bill-routing.module';
import {ListBillComponent} from './list-bill/list-bill.component';
import {GlobalModule} from '../_globals/global.module';


@NgModule({
  declarations: [ListBillComponent],
  imports: [
    GlobalModule,
    BillRoutingModule
  ]
})
export class BillModule {
}
