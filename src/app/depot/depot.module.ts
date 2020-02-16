import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepotRoutingModule } from './depot-routing.module';
import {GlobalModule} from '../_globals/global.module';
import { ListDepotComponent } from './list-depot/list-depot.component';
import { FormDepotComponent } from './form-depot/form-depot.component';


@NgModule({
  declarations: [ListDepotComponent, FormDepotComponent],
  imports: [
    GlobalModule,
    DepotRoutingModule
  ]
})
export class DepotModule { }
