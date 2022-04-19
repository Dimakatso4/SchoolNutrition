
import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryScheduleQueriesService } from './school-delivery-schedule-queries.service';

import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import { SdDeliveryScheduleService } from '../sd-delivery-schedule/sd-delivery-schedule.service';

@Component({
  selector: 'app-school-delivery-schedule-queries', 
  templateUrl: './school-delivery-schedule-queries.component.html',
  styleUrls: ['./school-delivery-schedule-queries.component.scss']
})
export class DeliveryScheduleQueriesComponent implements OnInit {

  public list;
  public queryList:any = [] 
  public noDocuments;
  public userRole;
  public sddeliveryScheduleID:any
  public emisNumber = this.appservice.getLoggedInEmisCode()
  public supplierSummaryID  = sessionStorage.getItem("passSupplierSummaryID");
  public deliveryNoteList:any
  public todaysDate = sessionStorage.getItem("dateOfDelievery")



  constructor(
    private router: Router,
    private sddeliveryScheduleService: SdDeliveryScheduleService,
    private schooldeliveryScheduleQueriesService: DeliveryScheduleQueriesService,
    private appservice: AppService){

    };


  ngOnInit(): void {
    
    this.sddeliveryScheduleID = sessionStorage.getItem('passSupplierSummaryID')
    this.userRole = this.appservice.getLoggedInUserRole();
    
    this.schooldeliveryScheduleQueriesService.getQueryByID(this.sddeliveryScheduleID).subscribe(res => {
      console.log(res);
      this.list = res;
      if (this.list.length == 0) {
        this.noDocuments = true;
      }

    }, err => {
      console.log(err);
      this.noDocuments = false;
    })

    this.sddeliveryScheduleService.getSupplierSummaryById(this.supplierSummaryID ).subscribe(res => {
      this.deliveryNoteList = res
      console.log("delivery "+ JSON.stringify(this.deliveryNoteList))
      if(this.userRole == 'School Principal'){
        let filter:any
        let emisNumber = this.emisNumber
        filter = this.deliveryNoteList.filter(function (e) {
          return (e['emisNumber'] == emisNumber && e['itemDelieveryDate'] == this.todaysDate);
        });
        this.deliveryNoteList = filter
        
      }
      console.log("Y" + JSON.stringify(this.deliveryNoteList))
    })

    this.schooldeliveryScheduleQueriesService.getAllQueries().subscribe(res => {
      this.queryList = res
      
      for (let i = 0; i < this.queryList.length; i++) {
        //console.log("Text :" +this.supplierSummary.perishablesList[i]);

        if (this.queryList[i].isProductWrong=== true)
          this.queryList[i].isProductWrong='true';
        else
          this.queryList[i].isProductWrong = 'false';

        if (this.queryList[i].isQualityWrong === true)
          this.queryList[i].isQualityWrong = 'true'; 
        else
          this.queryList[i].isQualityWrong = 'false'; 
        
        if (this.queryList[i].isQuantityWrong === true)
          this.queryList[i].isQuantityWrong = 'true';
        else if (this.queryList[i].isQuantityWrong === false)
          this.queryList[i].isQuantityWrong = 'false';
      }
      
      if(this.userRole == 'School Principal'){
        let filter:any
        let emisNumber = this.emisNumber
        filter = this.queryList.filter(function (e) {
          return (e['emisNumber'] == emisNumber && e['itemDelieveryDate'] == this.todaysDate);
        });
        this.queryList = filter
        
      }
    })

  }

  openDeliveryNote(supplierSummaryId) {
    sessionStorage.setItem("supplierSummaryId", supplierSummaryId)
    this.router.navigate(['/perishable-delivery-schedule']);

  }

  convertDocsToJSON(docs){
    let documents 
    console.log("Documents" + docs)
    if(docs == null){
      documents = ['https://gdeelectionsstorage.blob.core.windows.net/sktcontainer/11687_1457099901_noevidence2.jpg']
    }else{
      documents = docs.split(',');
    }

    //alert(documents)
    return documents
  }

}