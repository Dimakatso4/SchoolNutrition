import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';
import { Roles } from './model/role';
import {DonationComponent} from './views/pages/donation/donation.component';
import { SdDeliveryModule } from './views/pages/sd-delivery-schedule/sd-delivery-schedule.module';
// import{NspnRegistrationComponent}from './views/pages/nspn-registration/nspn-registration.component';
// import { DistrictNsnpComponent } from './views/pages/nspn-registration/district-nsnp/district-nsnp.component';


const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'disclaimer', loadChildren: () => import('./views/pages/profile/acknowledgement/acknowledgement.module').then(m => m.AcknowledgementModule) },
  {
    path: 'createprofile',
    loadChildren: () => import('./views/pages/profile/sgb/sgb.module').then(m => m.SgbModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./views/pages/homepage/landing-page/landing-page.module').then(m => m.LandingPageModule)
  },
  // {
  //   path: 'nominations',
  //   loadChildren: () => import('./views/pages/nominations/nominations.module').then(m => m.NominationsModule)
  // },
  {
    path: 'activate-profile',
    loadChildren: () => import('./views/pages/first-login/first-login.module').then(m => m.FirstLoginModule)
  },
  ///Nompumelelo
  {
    path: 'supplier-disclamer',
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/pages/supplier-management/disclaimer/disclaimer.module').then(m => m.DisclaimerModule)
  },
  {
    path: 'Activate-Supplier',
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/pages/supplier-management/activate-profile/activate.module').then(m => m.ActivateProfileModule)
  },
  {
    path: 'Commuque-Supplier',
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/pages/supplier-management/commique-supplier/commique-supplier.module').then(m => m.CommiqueSupplierComponentModule)
  },///Nompumelelo
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [


      {path:'donation',component:DonationComponent},
      // {path:'NspnRegistration',component:NspnRegistrationComponent},
      // {path:'DistrictNsnpForm' ,component:DistrictNsnpComponent},
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'hodashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/dashboard2/dashboard2.module').then(m => m.Dashboard2Module)
      },
      {
        path: 'nominations',
        loadChildren: () => import('./views/pages/nominations/nominations.module').then(m => m.NominationsModule)
      },
      {
        path: 'deodashboard',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/deo-dashboard/deo-dashboard.module').then(m => m.DEODashboardModule)
      },
      {
        path: 'election-overview',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/seo-dashboard/seo-dashboard.module').then(m => m.SEODashboardModule)
      },

    



      {
        path: 'apps',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },
      {
        path: 'election',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/election/election.module').then(m => m.ElectionModule)
      },
      {
        path: 'schedule',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'inauguration',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/inauguration/inauguration.module').then(m => m.InaugurationModule)
      },
      {
        path: 'induction',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/induction/induction.module').then(m => m.InductionModule)
      },
      {
        path: 'training-session',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/training-session/training-session.module').then(m => m.TrainingSessionModule)
      },
      {
        path: 'verification',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/verification/verification.module').then(m => m.VerificationModule)
      },
      {
        path: 'nsnp-registration',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/nsnp-registration/nsnp-registration.module').then(m => m.NsnpRegistrationModule)
      },
      {
        path: 'ho-nsnp-registration',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/ho-nsnp-registration/ho-nsnp-registration.module').then(m => m.HONsnpRegistrationModule)
      },
      {
        path: 'send-nsnp',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/send-nsnp-registration/send-nsnp-registration.module').then(m => m.SendNsnpRegistrationModule)
      },
      {
        path: 'district-verification',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/district-verification/district-verification.module').then(m => m.DistrictVerificationModule)
      },      
      {
        path: 'ho-verification',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/ho-verification/ho-verification.module').then(m => m.HOVerificationModule)
      },
      {
        path: 'meeting',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/meeting/meeting.module').then(m => m.MeetingModule)
      },
      {

        path: 'handover',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/handover/handover.module').then(m => m.HandoverModule)
      },
      {
        path: 'queries',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/queries/queries.module').then(m => m.QueriesModule)

      },
      {
        path: 'disputes',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/disputes/disputes.module').then(m => m.DisputesModule)

      },
      {
        path: 'school-menu',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/school-menu/school-menu.module').then(m => m.SchoolMenuModule)

      },
      {
        path: 'management-plan',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/management-plan/management-plan.module').then(m => m.ManagementPlanModule)

      },
      {
        path: 'legislative-framework',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/legislation/legislation.module').then(m => m.LegislationModule)

      },
      {
        path: 'users',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/users/users.module').then(m => m.UsersModule)

      },
      {
        path: 'voters-roll',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/voters-roll/voters-roll.module').then(m => m.VotersRollModule)

      },
      {
        path: 'course',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/course/course.module').then(m => m.CourseModule)

      },
      {
        path: 'schools',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/schools/schools.module').then(m => m.SchoolsModule)
      },
      {
        path: 'memo',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/memo/memo.module').then(m => m.MemoModule)
      },
      {
        path: 'menu-calculator',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/menu-calculator/menu-calculator.module').then(m => m.MenuCalculatorModule)
      },
      {
        path: 'feeding-menu',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/feeding-menu/feeding-menu.module').then(m => m.FeedingMenuModule)
      },
      // Mzwakhe path
      {
        path: 'supplier-summary-report',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/delivery-schedule/delivery-schedule.module').then(m => m.DeliveryScheduleModule)
      },
       {
        path: 'supplier-summary-report',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/delivery-schedule/delivery-schedule.module').then(m => m.DeliveryScheduleModule)
      },
      {
        path: 'delivery-schedule',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/sd-delivery-schedule/sd-delivery-schedule.module').then(m => m.SdDeliveryModule)
      },
      {
        path: 'monthly-delivery-schedule',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/monthly-delieveries-schedules/monthly-delieveries-schedules.module').then(m => m.MonthlyDelieveriesSchedulesModule)
      },
      {
        path: 'school-delivery-schedule',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/school-delivery-schedule/school-delivery-schedule.module').then(m => m.SchoolDeliveryModule)
      },
      {
        path: 'school-delivery-schedule-queries',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/school-delivery-schedule-queries/school-delivery-schedule-queries.module').then(m => m.SchoolDeliveryQueriesModule)
      },
      {
        path: 'products-management',
        canActivate: [AuthGuard],
        loadChildren: () => import('./views/pages/products/products.module').then(m => m.ProductsModule)
      },
//

/// Nompumeleo path
{
  path: 'supplier-management',
  canActivate: [AuthGuard],
  loadChildren: () => import('./views/pages/supplier-management/supplier.module').then(m => m.SupplierModule)
},
{
  path: 'supplier-profile',
  canActivate: [AuthGuard],
  loadChildren: () => import('./views/pages/supplier-management/supplier-information/supplier-profile.module').then(m=>m.SupplierInformationModule)
},


// Banele
{
  path: 'monthlyreport',
  canActivate: [AuthGuard],
  loadChildren: () => import('./views/pages/monthlyreport/monthlyreport.module').then(m => m.MonthlyReportModule)
},

{
  path: 'feeding-calender',
  canActivate: [AuthGuard],
  loadChildren: () => import('./views/pages/calender/calender.module').then(m => m.CalenderModule)
}

      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      type: 404,
      title: 'Page Not Found',
      desc: 'Oopps!! The page you were looking for doesn\'t exist.'
    }

  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
