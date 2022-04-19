import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {  MonthlyreportComponent} from './monthlyreport.component';





const routes: Routes = [
    {
      path: '',
      component:  MonthlyreportComponent,
      children: [
        {
          path: 'monthlyreport',
          redirectTo: 'monthlyreport',
          pathMatch: 'full'
        },
        {
          path: 'monthlyreport',
          component: MonthlyreportComponent 
        },
      ]
    }
  
  ]


@NgModule({
    declarations: [MonthlyreportComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      DataTablesModule

    ]
  })
  export class MonthlyReportModule { }
  