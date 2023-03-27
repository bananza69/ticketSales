import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import {OrderComponent} from "./order.component";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    OrderComponent
  ],

  imports: [
    CommonModule,
    OrderRoutingModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DialogModule
  ]
})
export class OrderModule { }
