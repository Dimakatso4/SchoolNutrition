import { Component, OnDestroy, OnInit, Injectable, QueryList, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { AppService } from 'src/app/app.service';
import { from, Subject } from 'rxjs';
import { NgbModal, NgbModalConfig, NgbActiveModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import * as moment from 'moment';
import { stringify } from '@angular/compiler/src/util';
import { DatePipe } from '@angular/common'
import { DataTableDirective } from 'angular-datatables';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
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
import { SchoolMenuService } from './school-menu.service';

@Component({
  selector: 'app-school-menu',
  templateUrl: './school-menu.component.html',
  styleUrls: ['./school-menu.component.scss']
})
export class SchoolMenuComponent implements AfterViewInit, OnDestroy, OnInit {
  public showOverlay = true;
  public isPageLoading: Boolean;
  public dtOptions: any = {};
  public weeklyMenu:any
  public daysOfTheWeek:any
  public day:any
  public menuOfTheWeek:any
  public menu:any
  public product:any
  public productList:any
  public schoolType:any
  public schoolTypeList:any

  public editday:any
  public editmenu:any
  public editproduct:any
  public editschoolType:any

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();
  validationForm: FormGroup;
  editvalidationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  editisCreateFormSubmitted: Boolean;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    public formBuilder: FormBuilder,
    private productService:ProductService,
    private deliveryScheduleService: SdDeliveryScheduleService,
    private schoolMenueService: SchoolMenuService,
    config: NgbModalConfig
  ) { 
      // customize default values of modals used by this component tree
      config.backdrop = 'static';
      config.keyboard = false;
      router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event)
      })
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      order: ['0', 'asc']
    };
    this.getResults()

    this.validationForm = this.formBuilder.group({
      day: ['', Validators.required],
      menu: ['', Validators.required],
      product: ['', Validators.required],
      schoolType:['', Validators.required]
    })

    this.isCreateFormSubmitted = false;

    this.editvalidationForm = this.formBuilder.group({
      editday: ['', Validators.required],
      editmenu: ['', Validators.required],
      editproduct: ['', Validators.required],
      editschoolType:['', Validators.required]
    })

    this.editisCreateFormSubmitted = false;

    this.schoolMenueService.daysOfWeek().subscribe((res: any) => {
      this.daysOfTheWeek = res
    })

    this.schoolMenueService.getAllMenues().subscribe((res: any) => {
      this.menuOfTheWeek = res
    })

    this.deliveryScheduleService.getProductShare().subscribe((res: any) => {
      let products 
      products = res.map((i) => { i.fullProduct = 'Food Group:  '+i.foodGroupDescription + '      '+ ' Food Type:  ' + i.typeDescription+ '   '+ 'Grammage:   ' + i.grammage; return i; })
      this.productList = res
    })

    this.schoolMenueService.getSchoolType().subscribe((res: any) => {
      this.schoolTypeList = res
    })

  }

  get createForm() {
    return this.validationForm.controls;
  }

  get editcreateForm() {
    return this.editvalidationForm.controls;
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

    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
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

   

    getResults() {
      
      this.schoolMenueService.getAllMenues().subscribe((res: any) => {
        this.isPageLoading = true;
        this.weeklyMenu = res
        this.isPageLoading = false;
        this.rerender();
      }, err => {
        console.log(err);
        this.isPageLoading = false;
      });
    }

    ClearMenuData(){
      this.day=""
      this.menu=""
      this.product=""

    }

    saveWeeklyMenu(){
      if (this.validationForm.valid) {
        Swal.fire({
          title: 'Save Menu?',
          text: 'Are you sure you want to save this Menu?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            this.isPageLoading = true;
           let data = {
            id: 0,
            day: this.day.day,
            menu: this.menu.menu,
            product: JSON.stringify(this.product),
            schoolType:this.schoolType.schoolType
          }
          console.log("Create"+JSON.stringify(data))
          

          this.productService.createProduct(data).subscribe((res: any) => {
           console.log("Product Created")
            this.isPageLoading = false;
          }, err => {
            console.log(err);
            this.isPageLoading = false;
          });
           
  
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Menu not saved',
              'error'
            )
          }
        })
        //this.activeModal.close()
        let debounceResize: number;
        debounceResize = window.setTimeout(() => {
  
           this.dtOptions = {
             pagingType: 'full_numbers',
             pageLength: 10,
             processing: true,
             searching: true,
             ordering: true,
             order: ['0', 'desc']
           };
   
           this.getResults()
        }, 5000);
        this.modalService.dismissAll();
      }
      this.isCreateFormSubmitted = true;
    }

    public menuId:any
    updateData(menu:any){

      this.menuId = menu.id

      let editday  = this.daysOfTheWeek.find(obj => {
        return obj.day === menu.day
      });
      this.editday = editday

      let editmenu = this.menuOfTheWeek.find(obj => {
        return obj.menu === menu.menu
      });
      this.editmenu = editmenu

      let editproduct = this.productList.find(obj => {
        return obj.unitDescription === menu.unitDescription
      });
      this.editproduct = editproduct

      let editschoolType = this.schoolTypeList.find(obj => {
        return obj.unitDescription === menu.unitDescription
      });
      this.editschoolType = editschoolType
     
    }

    editMenu(){
      if (this.editvalidationForm.valid) {
        Swal.fire({
          title: 'Save Meeting?',
          text: 'Are you sure you want to save this meeting?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            this.isPageLoading = true;
           let editdata = {
            id: this.menuId,
            day: this.editday,
            menu: this.editmenu,
            product: this.editproduct,
            schoolType:this.editschoolType
          }
  
         console.log("Edit Data:  "+JSON.stringify(editdata))

         this.productService.updateProduct(editdata).subscribe((res: any) => {
           console.log("Product Updated")
            this.isPageLoading = false;
          }, err => {
            console.log(err);
            this.isPageLoading = false;
          });
           
  
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Meeting not save}d',
              'error'
            )
          }
        })
        //this.activeModal.close()
        let debounceResize: number;
        debounceResize = window.setTimeout(() => {
  
           this.dtOptions = {
             pagingType: 'full_numbers',
             pageLength: 10,
             processing: true,
             searching: true,
             ordering: true,
             order: ['0', 'desc']
           };
   
           this.getResults()
        }, 5000);
        this.modalService.dismissAll();
      }
      this.isCreateFormSubmitted = true;
    }

  

}
