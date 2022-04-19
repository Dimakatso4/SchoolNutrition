import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import {SupplierManagementComponent} from './supplier-management.component';
import { SupplierProfileComponent } from './supplier-profile/supplier-profile.component';
import { ActivateProfileComponent } from './activate-profile/activate-profile.component';
import { DisclaimerComponent } from './disclaimer/disclaimer.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { SupplierInformationComponent } from './supplier-information/supplier-information.component';
import { CommiqueSupplierComponent } from './commique-supplier/commique-supplier.component';
// Ngx-mask
import { NgxMaskModule, IConfig } from 'ngx-mask';


//


//

const routes: Routes = [
    {
      path: '',
      component: SupplierProfileComponent,
      children: [
        {
          path: '',
          redirectTo: 'supplier-management',
          pathMatch: 'full'
        },
        {
          path:'supplier',
          component:SupplierProfileComponent
        }, 
        {
          path:'Activate-Supplier',
          component:ActivateProfileComponent 
        },
        {
          path:'supplier-profile',
          component:SupplierInformationComponent
        }
        
      ]
    }
  
  ]


@NgModule({
    declarations:[SupplierManagementComponent, SupplierProfileComponent, ActivateProfileComponent, DisclaimerComponent, SupplierInformationComponent, CommiqueSupplierComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      DataTablesModule,
      NgSelectModule,
      NgxMaskModule.forRoot({ validation: true }), // Ngx-mask
  
    
     

    ]
  })
  export class SupplierModule { }
  