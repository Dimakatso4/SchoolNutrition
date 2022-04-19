import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { MenuCalculatorComponent } from './menu-calculator.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
    {
      path: '',
      component: MenuCalculatorComponent,
    }
  ]

@NgModule({
    declarations: [MenuCalculatorComponent],
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
  export class MenuCalculatorModule { }