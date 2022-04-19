import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SdDeliveryScheduleComponent } from './sd-delivery-schedule.component';
import { NgbAccordionModule, NgbActiveModal, NgbModule, NgbModal } from "@ng-bootstrap/ng-bootstrap";

// Ngx-dropzone-wrapper
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper'

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  /*url: 'https://sgbelectionapi-qa.azurewebsites.net/api/Upload/Document',
  maxFilesize: 50,
  acceptedFiles: 'image/*,application/*'*/
};


const routes: Routes = [
    {
      path: '',
      component: SdDeliveryScheduleComponent,
      children: [
        {
          path: 'sd-delivery-schedule',
          redirectTo: 'sd-delivery-schedule',
          pathMatch: 'full'
        },
        {
          path: 'sd-delivery-schedule',
          component:SdDeliveryScheduleComponent 
        },
     
       
      ]
    }
  
  ]


@NgModule({
    declarations: [SdDeliveryScheduleComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      DropzoneModule, // Ngx-dropzone-wrapper
      ReactiveFormsModule,
      DataTablesModule,
      NgbAccordionModule
    ],
    providers: [
      {
        provide: DROPZONE_CONFIG,
        useValue: DEFAULT_DROPZONE_CONFIG
      },
    ],
  bootstrap: [SdDeliveryScheduleComponent]
  })
  export class SdDeliveryModule { }
  