
import { Component, OnInit, ViewChild } from '@angular/core';
import { SchoolDeliveryScheduleService } from './school-delivery-schedule.service';

import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-school-delivery-schedule', 
  templateUrl: './school-delivery-schedule.component.html',
  styleUrls: ['./school-delivery-schedule.component.scss']
})
export class SchoolDeliveryScheduleComponent implements OnInit {

  public list;
  public noDocuments;
  public userRole;


  constructor(
    private router: Router,
    private schooldeliveryScheduleService: SchoolDeliveryScheduleService,
    private appservice: AppService){

    };


  ngOnInit(): void {


    this.userRole = this.appservice.getLoggedInUserRole();
    
    this.schooldeliveryScheduleService.getDocumentSchoolSupplierSummaryByEmisNo(700220000).subscribe(res => {
      console.log(res);
      this.list = res;
      if (this.list.length == 0) {
        this.noDocuments = true;
      }

    }, err => {
      console.log(err);
      this.noDocuments = false;
    })

  }

  

  openDeliveryNote(supplierSummaryId) {
    sessionStorage.setItem("supplierSummaryId", supplierSummaryId)
    this.router.navigate(['/perishable-delivery-schedule']);

  }

}