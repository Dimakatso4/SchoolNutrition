import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SchoolDeliveryScheduleComponent } from './school-delivery-schedule.component';




const routes: Routes = [
    {
      path: '',
    component: SchoolDeliveryScheduleComponent,
      children: [
        {
          path: 'school-delivery-schedule',
          redirectTo: 'school-delivery-schedule',
          pathMatch: 'full'
        },
        {
          path: 'school-delivery-schedule',
          component: SchoolDeliveryScheduleComponent 
        },
     
       
      ]
    }
  
  ]


@NgModule({
    declarations: [SchoolDeliveryScheduleComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      DataTablesModule

    ]
  })
  export class SchoolDeliveryModule { }
  