import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolMenuComponent } from './school-menu.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {DataTablesModule} from 'angular-datatables';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: '',
    component: SchoolMenuComponent
   
  }
]


@NgModule({
  declarations: [
    SchoolMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgSelectModule
  ]
})
export class SchoolMenuModule { }
