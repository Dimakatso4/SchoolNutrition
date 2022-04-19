import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{CalenderComponent} from './calender.component';
import { DataTablesModule } from 'angular-datatables';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

FullCalendarModule.registerPlugins([
    dayGridPlugin,
    timeGridPlugin,
    listPlugin,
    interactionPlugin
  
  ])
const routes: Routes = [
    {
      path: '',
      component: CalenderComponent,
      children: [
        {
          path: 'feeding-calender',
          redirectTo: 'calender',
          pathMatch: 'full'
        }
      
     
       
      ]
    }
  
  ]

@NgModule({
    declarations: [CalenderComponent],
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      FormsModule,
      ReactiveFormsModule,
      DataTablesModule,
      FullCalendarModule
    

    ]
  })
  export class CalenderModule { }
  