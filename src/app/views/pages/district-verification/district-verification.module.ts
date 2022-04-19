import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DistrictVerificationComponent } from './district-verification.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';

const routes: Routes = [
  {
    path: '',
    component: DistrictVerificationComponent
    
  },
]


@NgModule({
  declarations: [DistrictVerificationComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    NgbModule,
    NgSelectModule,
    DataTablesModule
  ]
})
export class DistrictVerificationModule { }
