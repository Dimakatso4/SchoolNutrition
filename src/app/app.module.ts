import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './views/layout/layout.module';
import { AuthGuard } from './core/guard/auth.guard';
import { AppComponent } from './app.component';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';
import { TrainingComponent } from './views/pages/training/training.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { DataTablesModule } from 'angular-datatables';
import { MonthlyreportComponent } from './views/pages/monthlyreport/monthlyreport.component';
import { DonationComponent } from './views/pages/donation/donation.component'
import { UserRegistrationComponent } from './user-registration/user-registration.component';
//import{NspnRegistrationComponent}from './views/pages/nspn-registration/nspn-registration.component';
import { AddNewDonationComponent } from './shared/add-new-donation/add-new-donation.component';
import { NonPerishableComponent } from './views/pages/non-perishable/non-perishable.component';
import{  NonPDeliveryComponent} from './views/pages/non-p-delivery/non-p-delivery.component';
import { NonPDelComponent } from './views/pages/non-pdel/non-pdel.component';
//import { DistrictNsnpComponent } from './views/pages/nspn-registration/district-nsnp/district-nsnp.component';



// import { LegislationComponent } from './views/pages/legislation/legislation.component';
// import { ManagementPlanComponent } from './views/pages/management-plan/management-plan.component';
// import { ScheduledTrainingComponent } from './views/pages/profile/scheduled-training/scheduled-training.component';
// import { AcknowledgementComponent } from './views/pages/profile/acknowledgement/acknowledgement.component';
//import { InductionComponent } from './views/pages/induction/induction.component';


@NgModule({
  declarations: [
  
    AppComponent,
    ErrorPageComponent,
    TrainingComponent,
    MonthlyreportComponent,
    DonationComponent,
   // NspnRegistrationComponent,
    AddNewDonationComponent,
    // paymentcomponent,
    NonPerishableComponent,
    //NsnpRegistrationComponent,
    NonPDeliveryComponent,
    NonPDelComponent,
    //DistrictNsnpComponent,
   
   
    // LegislationComponent,
    // ManagementPlanComponent,
    // ScheduledTrainingComponent,
    // AcknowledgementComponent,
    //InductionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    CommonModule,
    NgSelectModule
    
  
  ],
  providers: [
    AuthGuard,
    {
      provide: HIGHLIGHT_OPTIONS, // https://www.npmjs.com/package/ngx-highlightjs
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          xml: () => import('highlight.js/lib/languages/xml'),
          typescript: () => import('highlight.js/lib/languages/typescript'),
          scss: () => import('highlight.js/lib/languages/scss'),
        }
      }
    },
    CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
