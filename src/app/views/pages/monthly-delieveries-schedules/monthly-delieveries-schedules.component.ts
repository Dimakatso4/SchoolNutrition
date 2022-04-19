import { Component, OnDestroy, OnInit, Injectable, QueryList, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { from, Subject } from 'rxjs';
import { NgbModal, NgbModalConfig, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import * as moment from 'moment';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common'
import { DataTableDirective } from 'angular-datatables';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import {MonthlyDelieveriesSchedulesService } from './monthly-delieveries-schedules.service'
import { NgbDateStruct, NgbCalendar, NgbDate, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { SdDeliveryScheduleService } from '../sd-delivery-schedule/sd-delivery-schedule.service';
import {ProductService} from '../products/product.service'
import { DeliveryScheduleService } from '../delivery-schedule/delivery-schedule.service';

@Component({
  selector: 'app-monthly-delieveries-schedules',
  templateUrl: './monthly-delieveries-schedules.component.html',
  styleUrls: ['./monthly-delieveries-schedules.component.scss']
})
export class MonthlyDelieveriesSchedulesComponent implements AfterViewInit, OnDestroy, OnInit {
  public showOverlay:any
  public dtOptions: any = {};
  public isPageLoading: Boolean;
  public delieveryDates:any;
  public perishableSchedule:any
  public nonPerishableSchedule:any
  public weeklyDate:any
  public weeklyDateArray:any = []
  public monthlyDate:any
  public startDate = new Date(2000, 0, 2);
  public daysSelected: any[] = [];
  public perishabledaysSelected: any[] = [];
  public event: any;
  public emisNumber :any = this.appService.getLoggedInEmisCode()
  public userRole:any = this.appService.getLoggedInUserRole()
  public sddeliveryScheduleID = sessionStorage.getItem('passSupplierSummaryID')
  public supplierName:any = this.appService.getIsLoggedInSuppliername()
  
  //@ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  validationForm: FormGroup;
  editvalidationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  editisCreateFormSubmitted: Boolean;


  selectedDate = new Date();
  startAt = new Date();
  minDate = new Date();
  maxDate = new Date(this.selectedDate.getFullYear());
  year: any;
  DayAndDate: string;
  public calendarData:any = []


  @ViewChild('externalEvents', { static: true }) externalEvents: ElementRef;

  calendarOptions: CalendarOptions;
  currentEvents: EventApi[] = [];

  constructor(
    private modalService: NgbModal,
    config: NgbModalConfig,
    public monthlyDelieveriesDateService:MonthlyDelieveriesSchedulesService,
    public formBuilder: FormBuilder,
    private router: Router,
    private deliveryScheduleService: DeliveryScheduleService,
    private appService: AppService
  
  ) { 
     // customize default values of modals used by this component tree
     config.backdrop = 'static';
     config.keyboard = false;
     router.events.subscribe((event: RouterEvent) => {
       this.navigationInterceptor(event)
     })
     //this.onSelect(this.selectedDate);
  }

  ngOnInit(): void {
    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      order: ['0', 'desc']
    };

    this.validationForm = this.formBuilder.group({
      
      weeklyDate: ['', Validators.required],
      monthlyDate: ['', Validators.required],
    
    })
  
    this.monthlyDelieveriesDateService.getAllDates().subscribe((res: any) => {
      this.isPageLoading = true
      for (let i = 0; i < res.length; i++) {
        let eventDetails = {
          title: res[i].productType,
          start: res[i].deliveryDates,
          end: res[i].deliveryDates
        }
        this.calendarData.push(eventDetails)
      }
      this.isPageLoading = false
    })
   
    setTimeout(() => {
      this.calendarOptions = {
        headerToolbar: {
          left: 'prev,today,next',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        initialView: 'dayGridMonth',
        dateClick: this.handleDateClick.bind(this),
        weekends: true,
        editable: true,
        displayEventTime: false,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: false,
        lazyFetching: true,
        nowIndicator: true,
        events: this.calendarData

      };
    }, 3000)
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  

  public supplierSummeryID:any
  handleDateClick(arg) {
 
    let calender = []
    for(let i = 0; i< this.calendarData.length; i++){
      this.calendarData[i].start = this.calendarData[i].start.substring(0, 10);
      this.calendarData[i].end = this.calendarData[i].end.substring(0, 10);
      calender.push(this.calendarData[i].start.substring(0, 10))
    }

    let date = this.toISOLocalDate(arg.date)
    let calenderDate = new Date()
    let todayDate = this.toISOLocalDate(calenderDate)
   
   if(this.userRole == 'School Principal'){
      if(calender.includes(date) && date >= todayDate){

            const d = new Date(arg.date);
            let day = d.getDay()

            if(day === 2){
              Swal.fire(
                'Delivery',
                'Perishable products are expected for delivery on this date ',
                'info'
              )
            }else{
              Swal.fire(
                'Delivery',
                'Non-Perishable products are expected for delivery on this date ',
                'info'
              )
            }
          

            if(this.userRole == "School Principal"){
                this.deliveryScheduleService.getSupplierSummary().subscribe((res: any) => {
                  console.log("Test "+JSON.stringify(res))
              
                  let filter:any
                
                    let emisNumber = this.emisNumber
                    filter = res.filter(function (e) {
                      return (e['emisNo'] == emisNumber);
                    });
                  
                    this.supplierSummeryID = filter[0]
                    if( this.supplierSummeryID == undefined){
                      Swal.fire(
                        'Cancelled',
                        'The school you have selected has not been vetted please select another school or Please consult head office to Vett your school',
                        'error'
                      )
                    }else{
                      
                      sessionStorage.setItem("passSupplierSummaryID", this.supplierSummeryID.supplierSummaryId );
                      sessionStorage.setItem("dateOfDelievery", arg.dateStr );
                      this.router.navigate(['/delivery-schedule']);
                    }
                    
                    
                });
              }else if(this.userRole == "Head Office Director" &&  this.sddeliveryScheduleID == null){
              
                sessionStorage.setItem("passSupplierSummaryID", this.sddeliveryScheduleID );
                sessionStorage.setItem("dateOfDelievery", arg.dateStr );
                this.router.navigate(['/delivery-schedule']);

              }else if(this.userRole == "SUPPLIER"){
                this.deliveryScheduleService.getSupplierSummary().subscribe((res: any) => {
                  console.log("Test "+JSON.stringify(res))
                })
                //sessionStorage.setItem("passSupplierSummaryID", this.sddeliveryScheduleID );
                //sessionStorage.setItem("dateOfDelievery", arg.dateStr );
                //this.router.navigate(['/delivery-schedule']);
              }else{
                Swal.fire(
                  'Cancelled',
                  'The school you have selected has not been vetted please select another school or Please consult head office to Vett your school',
                  'error'
                )
              }

      }else if(date < todayDate){
          Swal.fire(
            'Delievery Date Passed',
            'The Date you have selected has already Passed',
            'error'
          )
      }else{
            Swal.fire(
              'No Scheduled Delievery',
              'The Date you have selected has no scheduled delivery',
              'error'
            )
      }
    }
   }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }

  openXlModal(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

    
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 1 && day !== 3 && day !==4 && day !== 5  && day !== 6;
  };

  myFilterMonthly = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 2 ;
  };

  myDateFilter = (d: Date): boolean => {
    const day = d.getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && day !== 2;
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }

   isSelected = (event: any) => {
    const date =
      ("00" + event.getDate()).slice(-2)
      +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      event.getFullYear()
      ;
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  perishableisSelected =  (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.perishabledaysSelected.find(x => x == date) ? "selected" : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);

    calendar.updateTodaysDate();
  }

  NonperishableSelect(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" + 
      ("00" + event.getDate()).slice(-2);
      const index = this.perishabledaysSelected.findIndex(x => x == date);
      if (index < 0) this.perishabledaysSelected.push(date);
      else this.perishabledaysSelected.splice(index, 1);

      calendar.updateTodaysDate();
  }

  onSelect(event , calendar: any) {
    console.log(event);
    const date =
    event.getFullYear()
    +
    "-" +
    ("00" + (event.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + event.getDate()).slice(-2)
    const index = this.perishabledaysSelected.findIndex(x => x == date);
    if (index < 0) this.perishabledaysSelected.push(date);
    else this.perishabledaysSelected.splice(index, 1);

    calendar.updateTodaysDate();

    
  }

  public allDays:any = []
  createDate(){

    Swal.fire({
      title: 'Save Delievery Dates?',
      text: 'Are you sure you want to save this delievery dates?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
        if (result.value) {
          this.isPageLoading = true
          for(let i = 0; i < this.daysSelected.length; i++){
            let dates = {
              "id": 0,
              "productType":"Perishable prouducts expected for delievery on this date ",
              "deliveryDates" :this.daysSelected[i]
            }
            this.allDays.push(dates)
          }

          for(let i = 0; i < this.perishabledaysSelected.length; i++){
            let nonPerishable = {
              "id": 0,
              "productType":"Non-Perishable prouducts expected for delievery on this date",
              "deliveryDates" :this.perishabledaysSelected[i]
            }
            this.allDays.push(nonPerishable)
          }
        
          console.log("Payload: "+JSON.stringify(this.allDays))
          for(let j = 0; j < this.allDays.length; j++){
            this.monthlyDelieveriesDateService.addNewDelieveryDate(this.allDays[j]).subscribe((res: any) => {
             console.log("new delievery date added")
             location.reload();
          
            }, err => {
              let message = err
              Swal.fire(
                'Cancelled',
                message.message,
                'error'
              )
              this.isPageLoading = false;
            });

            setTimeout(() => {
              this.monthlyDelieveriesDateService.getAllDates().subscribe((res: any) => {
               this.isPageLoading = true
               for (let i = 0; i < res.length; i++) {
                 let eventDetails = {
                   title: res[i].productType,
                   start: res[i].deliveryDates,
                   end: res[i].deliveryDates
                 }
                
               }
               this.isPageLoading = false
             })
           }, 3000)
             
          }
          this.isPageLoading = false
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelled',
            'Meeting not saved',
            'error'
          )
        }
    })

    this.monthlyDelieveriesDateService.getAllDates().subscribe((res: any) => {
      this.isPageLoading = true
      for (let i = 0; i < res.length; i++) {
        let eventDetails = {
          title: res[i].productType,
          start: res[i].deliveryDates,
          end: res[i].deliveryDates
        }
       
      }
      this.isPageLoading = false
    })

    
  }

  goBack(){
    this.router.navigate(['/supplier-summary-report']);
  }

  findValue(o, value) {
    for (var prop in o) {
        if (o.hasOwnProperty(prop) && o[prop] === value) {
            return prop;
        }
    }
    return null;
  }

  toISOLocalDate(d) {
    var z  = n =>  ('0' + n).slice(-2);
    var zz = n => ('00' + n).slice(-3);
    var off = d.getTimezoneOffset();
    var sign = off < 0? '+' : '-';
    off = Math.abs(off);
  
    return d.getFullYear() + '-'
           + z(d.getMonth()+1) + '-' +
           z(d.getDate())
  }
         
 
}
