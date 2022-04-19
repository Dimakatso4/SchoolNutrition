import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { DonationComponent } from './donation.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';


const routes: Routes = [
    {
      path: '',
      component: DonationComponent,
      children: [
        {
          path: 'donation',
          redirectTo: 'donation',
          pathMatch: 'full'
        },
        {
          path: 'donation',
          component:DonationComponent
        },
      ]
    }
  ]


@NgModule({
    declarations: [DonationComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      DataTablesModule,
      MatFormFieldModule,
      MatTooltipModule
    ]
  })
  export class DonationModule { }