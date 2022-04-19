import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivateProfileComponent } from './activate-profile.component';
const routes: Routes = [
    {
      path: '',
      component: ActivateProfileComponent
    }
  ]
  
  

@NgModule({
    declarations:[ ActivateProfileComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule
    

    ]
  })
  export class ActivateProfileModule { }