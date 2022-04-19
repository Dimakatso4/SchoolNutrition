import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DeliveryScheduleComponent } from './delivery-schedule.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';


const routes: Routes = [
    {
      path: '',
      component: DeliveryScheduleComponent,
    }
  ]

@NgModule({
    declarations: [DeliveryScheduleComponent],
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes),
      DataTablesModule,
      NgSelectModule,
      NgbModule

    ]
  })
  export class DeliveryScheduleModule { }