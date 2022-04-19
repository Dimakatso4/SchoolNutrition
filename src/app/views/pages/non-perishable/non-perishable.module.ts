import { CommonModule } from "@angular/common";

import { NgModule } from "@angular/core";

import { RouterModule, Routes } from "@angular/router";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DataTablesModule } from 'angular-datatables';

import { NonPerishableComponent } from './non-perishable.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { NgSelectModule } from "@ng-select/ng-select";



const routes: Routes = [

    {

      path: '',

      //component: NonPerishableComponent,

     

     

    }

 

  ]




@NgModule({

   // declarations: [NonPerishableComponent],

    imports: [

    CommonModule,

    FormsModule,

    ReactiveFormsModule,

    RouterModule.forChild(routes),

    NgbModule,

    NgSelectModule,

    ]

  })

  export class NonPerishableComponentModule { }