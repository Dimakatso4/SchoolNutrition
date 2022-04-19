import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SupplierInformationComponent } from './supplier-information.component';


const routes: Routes = [
    {
      path: '',
      component: SupplierInformationComponent
    }
  ]
  
  

@NgModule({
    declarations:[ SupplierInformationComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule
    
    

    ]
  })
  export class SupplierInformationModule { }