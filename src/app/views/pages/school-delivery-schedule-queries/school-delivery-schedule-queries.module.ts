import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DeliveryScheduleQueriesComponent } from './school-delivery-schedule-queries.component';




const routes: Routes = [
    {
      path: '',
    component: DeliveryScheduleQueriesComponent,
      children: [
        {
          path: 'school-delivery-schedule-queries',
          redirectTo: 'school-delivery-schedule-queries',
          pathMatch: 'full'
        },
        {
          path: 'school-delivery-schedule-queries',
          component: DeliveryScheduleQueriesComponent 
        },
     
       
      ]
    }
  
  ]


@NgModule({
  declarations: [DeliveryScheduleQueriesComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      DataTablesModule

    ]
  })
  export class SchoolDeliveryQueriesModule { }
  