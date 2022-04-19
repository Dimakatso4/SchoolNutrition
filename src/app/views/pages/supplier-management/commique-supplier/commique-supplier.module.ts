import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommiqueSupplierComponent } from './commique-supplier.component';
const routes: Routes = [
    {
      path: '',
      component: CommiqueSupplierComponent
    }
  ]
  
  

@NgModule({
    declarations:[CommiqueSupplierComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule
    

    ]
  })
  export class CommiqueSupplierComponentModule { }