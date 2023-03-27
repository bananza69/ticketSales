import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SettingsRoutingModule} from './settings-routing.module';
import {SettingsComponent} from './settings/settings.component';
import {TabViewModule} from "primeng/tabview";
import {InputTextModule} from "primeng/inputtext";
import {ToastModule} from "primeng/toast";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {StatisticComponent} from './statistic/statistic.component';
import {TableModule} from "primeng/table";
import {TourLoaderComponent} from "./tour-loader/tour-loader.component";
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from "primeng/calendar";
import {MessageService} from "primeng/api";
import {AdditionalSettingsComponent} from './additional-settings/additional-settings.component';
import {AccordionModule} from "primeng/accordion";
import {ChartModule} from 'primeng/chart';



@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent,
    TourLoaderComponent,
    AdditionalSettingsComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    InputTextModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    ToastModule,
    AccordionModule,
    ChartModule
  ],
  providers: [MessageService]
})
export class SettingsModule {
}
