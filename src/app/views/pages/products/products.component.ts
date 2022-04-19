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


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements AfterViewInit, OnDestroy, OnInit {

  public dtOptions: any = {};
  public isPageLoading: Boolean;
  public showOverlay = true;
  public products: any;
  public foodGroupDescription:any = []
  public typeDescription:any = []
  public grammage:any 
  public grammageSecondary:any
  public unitDescription:any = []

  public editfoodGroupDescription:any = []
  public edittypeDescription:any = []
  public editgrammage:any
  public editgrammageSecondary:any
  public editunitDescription:any = []

  public unitTypes = []
  public foodGroups = []
  public productTypes = []


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
      order: ['0', 'desc']
    };
    this.getResults()

    this.validationForm = this.formBuilder.group({
      foodGroupDescription: ['', Validators.required],
      typeDescription: ['', Validators.required],
      grammage: ['', Validators.required],
      grammageSecondary: ['', Validators.required],
      unitDescription: ['', Validators.required]
    })

    this.isCreateFormSubmitted = false;

    this.editvalidationForm = this.formBuilder.group({
      editfoodGroupDescription: ['', Validators.required],
      edittypeDescription: ['', Validators.required],
      editgrammage: ['', Validators.required],
      editgrammageSecondary: ['', Validators.required],
      editunitDescription: ['', Validators.required]
    })

    this.editisCreateFormSubmitted = false;

    this.productService.getFoodGroup().subscribe((res: any) => {
      this.isPageLoading = true;
      this.foodGroups = res
      this.isPageLoading = false;
    }, err => {
      let message = err
      Swal.fire(
        'Cancelled',
        message.message,
        'error'
      )
      this.isPageLoading = false;
    });

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

  get createForm() {
    return this.validationForm.controls;
  }

  get editcreateForm() {
    return this.editvalidationForm.controls;
  }

  openXlModal(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
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

    getResults() {
      
      this.deliveryScheduleService.getProductShare().subscribe((res: any) => {
        this.isPageLoading = true;
        this.products = res
        this.isPageLoading = false;
        this.rerender();
      }, err => {
        console.log(err);
        this.isPageLoading = false;
      });
    }

    clearCreateMeetingData() {
      this.foodGroupDescription = ""
      this.typeDescription = ""
      this.grammage = ""
      this.unitDescription = ""
    }

    clearModalData() {
      this.foodGroupDescription = ""
      this.typeDescription = ""
      this.grammage = "",
      this.unitDescription = ""
    }

    saveProduct() {
      if (this.validationForm.valid) {
        Swal.fire({
          title: 'Save Product?',
          text: 'Are you sure you want to save this Product?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            this.isPageLoading = true;
           let data = {
            productID: 0,
            typeID: this.typeDescription.typeID,
            typeDescription: this.typeDescription.typeDescription,
            unitID: this.unitDescription.unitID,
            unitDescription: this.unitDescription.unitDescription,
            foodGroupID: this.foodGroupDescription.foodGroupID,
            foodGroupDescription: this.foodGroupDescription.foodGroupDescription,
            grammage: parseFloat(this.grammage),
            grammageSecondary: parseFloat(this.grammageSecondary)
          }
          console.log("Create"+JSON.stringify(data))
          

          this.productService.createProduct(data).subscribe((res: any) => {
           console.log("Product Created")
            this.isPageLoading = false;
          }, err => {
            let message = err
            Swal.fire(
              'Cancelled',
              message.message,
              'error'
            )
            this.isPageLoading = false;
          });
           
  
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Meeting not saved',
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

    public editProductID:any
    updateData(product:any){
      this.isPageLoading = true;
      let debounceResize

      debounceResize = window.setTimeout(() => {
        this.editProductID = product.productID
        let editfoodGroupDescription = this.foodGroups.find(obj => {
          return obj.foodGroupDescription === product.foodGroupDescription
        });
        //alert(JSON.stringify(editfoodGroupDescription))
        this.editfoodGroupDescription = editfoodGroupDescription
        this.editproductType(editfoodGroupDescription)
      }, 1000);
      
      debounceResize = window.setTimeout(() => {
        let typeDescription = this.productTypes.find(obj => {
          return obj.typeDescription === product.typeDescription
        });
        this.edittypeDescription = typeDescription
        this.editproductUnit(this.edittypeDescription)
      }, 2000);
  
      debounceResize = window.setTimeout(() => {
        let unitDescription = this.unitTypes.find(obj => {
          return obj.unitDescription === product.unitDescription
        });
        this.editunitDescription = unitDescription
      }, 3000);

      this.editgrammage = product.grammage
      this.editgrammageSecondary = product.grammageSecondary
     
      this.isPageLoading = true;
    }

    editsaveProduct() {
      if (this.editvalidationForm.valid) {
        Swal.fire({
          title: 'Save Product?',
          text: 'Are you sure you want to save this meeting?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {
            this.isPageLoading = true;
           let editdata = {
            productID: this.editProductID,
            typeID:  this.edittypeDescription.typeID,
            typeDescription: this.edittypeDescription.typeDescription,
            unitID: this.editunitDescription.unitID,
            unitDescription: this.editunitDescription.unitDescription,
            foodGroupID: this.editfoodGroupDescription.foodGroupID,
            foodGroupDescription: this.editfoodGroupDescription.foodGroupDescription,
            grammage: parseFloat(this.editgrammage),
            grammageSecondary: parseFloat(this.editgrammageSecondary)
          }
  
         console.log("Edit Data:  "+JSON.stringify(editdata))

         this.productService.updateProduct(editdata).subscribe((res: any) => {
           console.log("Product Updated")
            this.isPageLoading = false;
          }, err => {
            let message = err
            Swal.fire(
              'Cancelled',
              message.message,
              'error'
            )
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


    productType(foodGroup){
    
      this.typeDescription = []
      this.edittypeDescription = []
      this.unitDescription = []
      this.editunitDescription = []
      this.grammage = []
      this.editgrammage = []
      this.editgrammageSecondary = []
      this.grammageSecondary = []

      this.productService.getProducType().subscribe((res: any) => {
        this.isPageLoading = true;
        this.productTypes = res
        let filtered:any
        filtered = this.productTypes.filter(function(e) {
          return [foodGroup.foodGroupID].includes(e.foodGroupId) 
        });
        
        this.productTypes = filtered
        this.isPageLoading = false;
      }, err => {
        console.log(err);
        this.isPageLoading = false;
      });
    }

  

    editproductType(foodGroup:any){
      
      this.productService.getProducType().subscribe((res: any) => {
        this.isPageLoading = true;
        this.productTypes = res
        
        let filtered:any

        filtered = this.productTypes.filter(function(e) {
          return [foodGroup.foodGroupID].includes(e.foodGroupId) 
        });
        
        this.productTypes = filtered
        //alert(JSON.stringify( this.productTypes))
        this.isPageLoading = false;
      }, err => {
        console.log(err);
        this.isPageLoading = false;
      });
    }


    productUnit(typeDescription){
      
      if(this.products.some(item => item.typeDescription === typeDescription.typeDescription)){
        Swal.fire(
          'Error!',
          'The product type exists on the product type list, please search for the product on the table and update!',
          'error'
        )

        this.typeDescription = []
        this.edittypeDescription = []
        this.unitDescription = []
        this.editunitDescription = []
        this.grammage = []
        this.editgrammage = []
        this.editgrammageSecondary = []
        this.grammageSecondary = []

      }else{

      
        this.unitDescription = []
        this.editunitDescription = []
        this.grammage = []
        this.editgrammage = []
        this.editgrammageSecondary = []
        this.grammageSecondary = []

        this.productService.getUnit().subscribe((res: any) => {
          this.isPageLoading = true
          this.unitTypes = res
          let filteredUnit:any
          filteredUnit = this.unitTypes.filter(function(e) {
            return [typeDescription.unitId].includes(e.unitID) 
          });
          this.unitTypes = filteredUnit
          this.isPageLoading = false;
        }, err => {
          console.log(err);
          this.isPageLoading = false;
        });
      }
    
    }

    editproductUnit(typeDescription){
        this.unitTypes = []
        this.productService.getUnit().subscribe((res: any) => {
          this.isPageLoading = true
          this.unitTypes = res
          let filteredUnit:any
          filteredUnit = this.unitTypes.filter(function(e) {
            return [typeDescription.unitId].includes(e.unitID) 
          });
          this.unitTypes = filteredUnit
         // alert(JSON.stringify(this.unitTypes))
          this.isPageLoading = false;
        }, err => {
          console.log(err);
          this.isPageLoading = false;
        });
    
    }


    filterInPlace(array, predicate){
      let end = 0;
  
      for (let i = 0; i < array.length; i++) {
          const obj = array[i];
  
          if (predicate(obj)) {
              array[end++] = obj;
          }
      }
  
      array.length = end;
  }
}
