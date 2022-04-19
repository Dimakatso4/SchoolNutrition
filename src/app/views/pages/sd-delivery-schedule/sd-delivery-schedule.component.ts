
import { Component, OnDestroy, OnInit, Injectable, QueryList, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { SdDeliveryScheduleService } from './sd-delivery-schedule.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { NgbAccordionConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { from, Subject } from 'rxjs';


@Component({
  selector: 'app-sd-delivery-schedule', 
  templateUrl: './sd-delivery-schedule.component.html',
  styleUrls: ['./sd-delivery-schedule.component.scss']
})
export class SdDeliveryScheduleComponent implements AfterViewInit, OnDestroy, OnInit {

  public oil:boolean = false;
  public salt:boolean = false;
  public milk:boolean = false;
  public tomato:boolean = false;
  public mince:boolean = false;
  public beans:boolean = false;
  public vanilla:boolean = false;
  public strawberry:boolean = false;
  public sorghum:boolean = false;
  public meal:boolean = false;
  public rice:boolean = false;
  public samp:boolean = false;
  public buttonName:any = 'Show';
  
  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  public districtcode;

  public noDocuments;
  public supplierSummary;
  public perishableList;
  public documents;
  public userRole;
  public officialtitle;
  public emisNumber :any = this.appService.getLoggedInEmisCode()

  public assignedTo;
  public schoolName:any
  public supplierName:any
  public emisNo:any
  public nsnpAllocation:any
  public districtName:any
  public numberOfLearners:any
  public todaysDate = sessionStorage.getItem("dateOfDelievery")
  newDocs: any = {};
  public docsTitle: any;
  public FileName: any;
  isFormSubmitted: Boolean;
  public docPath = "";
  uploadedDocument: File = null;


  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor( 
    private fb: FormBuilder,
    private router: Router,
    public appService: AppService,
    private sddeliveryScheduleService: SdDeliveryScheduleService,
    private appservice: AppService, 
    config: NgbAccordionConfig,
    public formBuilder: FormBuilder) { 
      config.closeOthers = true;
      config.type = 'primary';
    }

    public status = "";
    

  public parentname;
  public parentsurname;

  isSGB: boolean;
  isParent: boolean;

  public allRoles: any;
  public editUserRole;
  public sddeliveryScheduleID:any

  public user;
  userId;

  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  public config: DropzoneConfigInterface = {
    clickable: true,
    url: 'https://sgbelectionapi-qa.azurewebsites.net/api/Upload/Document', //this.manageentplanservice.UploadNewDocument(),
    maxFiles: 5,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    maxFilesize: 50,
    acceptedFiles: 'image/*'
  };


  ngOnInit(): void {
    const d = new Date(this.todaysDate);
    let day = d.getDay()
 
    this.userRole = this.appservice.getLoggedInUserRole();
    this.validationForm = this.formBuilder.group({
      status: ['', Validators.required],
      quantities: ['', Validators.required],
      parentname: ['', Validators.required],
      parentsurname: ['', Validators.required],
      schoolName: ['', Validators.required],
      supplierName: ['', Validators.required],
      emisNo: ['', Validators.required],
      nsnpAllocation: ['', Validators.required],
      districtName: ['', Validators.required],
      numberOfLearners: ['', Validators.required]
    });

    this.sddeliveryScheduleID = sessionStorage.getItem('passSupplierSummaryID')
    this.sddeliveryScheduleService.getSupplierSummaryById(this.sddeliveryScheduleID ).subscribe(res => {
      
      this.supplierSummary = res
      this.schoolName = this.supplierSummary.schoolName
      this.supplierName = this.supplierSummary.supplierName
      this.emisNo = this.supplierSummary.emisNo
      this.nsnpAllocation = this.supplierSummary.nsnpAllocation
      this.districtName = this.supplierSummary.districtName
      this.numberOfLearners = this.supplierSummary.numberOfLearners
      
      if (this.supplierSummary.perishablesList.length == 0) {
        this.noDocuments = true;
      }else if(this.supplierSummary.perishablesList.length > 0){
        setTimeout(() => {
        for(let i = 0; i < this.supplierSummary.perishablesList.length; i++ ){
        
          this.supplierSummary.perishablesList[i].quantityRecieved =   this.supplierSummary.perishablesList[i].quantity
          this.supplierSummary.perishablesList[i].isProductWrong = false
          this.supplierSummary.perishablesList[i].isQuantityWrong = false
          this.supplierSummary.perishablesList[i].isQualityWrong = false
          this.supplierSummary.perishablesList[i].itemDelieveryDate = this.todaysDate
          this.supplierSummary.perishablesList[i].emisNumber = this.emisNumber
          
        }
      }, 3000)
        this.perishableList = this.supplierSummary.perishablesList;
        console.log("Supplier Summery" + JSON.stringify(this.perishableList));
      }
      
      let filter
      if(day === 2){
        filter = this.perishableList .filter(function (e) {
          return (e['foodGroupId'] == 5);
        });
        this.perishableList = filter 
      }else if(day === 0 || day=== 1 || day=== 3 || day === 4 || day=== 5 || day=== 6){
        filter = this.perishableList .filter(function (e) {
          return (e['foodGroupId'] == 0 || e['foodGroupId'] == 6 || e['foodGroupId'] == 4 || e['foodGroupId'] == 3 || e['foodGroupId'] == 2 || e['foodGroupId'] == 1);
        });
        this.perishableList = filter 
      }
        

    }, err => {
      console.log(err);
      this.noDocuments = false;
    })

    this.isFormSubmitted = false;

    
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
 

  customQuantity(index: number, obj: any): any {
    return index;
  }

  removeDocument(i) {
    console.log(this.documents[i])
    Swal.fire({
      title: 'Are you sure you want to remove this document?',
      text: 'You will not be able to undo this change',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {

        this.sddeliveryScheduleService.deleteDocument(this.documents[i].id).subscribe(res => {
          console.log(res);

          Swal.fire({
            timer: 5000,
            title: "Confirmation",
            text: 'Document successfully removed',
            icon: 'success'
          }).then(result => {

            if (result.value || result.isDismissed) {
              window.location.reload();
            }
          });

        }, err => {
          console.log(err);
          Swal.fire({
            timer: 5000,
            title: "Unsuccessful",
            text: 'Your entry was unsuccessful, please try again',
            icon: 'error'
          });
        })

      }
    })

  }


  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  public multiDocs = []
  onUploadSuccess(event: any,i): void {
   
    console.log('onUploadSuccess:', event);
    
    this.docPath = event[1].path;
    this.multiDocs.push(this.docPath)
    console
    this.supplierSummary.perishablesList[i].documentPath =  this.multiDocs.toString();
    /*var index = this.docPath.lastIndexOf("/");
    var rawTitle = this.docPath.substr(index + 1)
    var re = /%20/gi;
    var newTitle = rawTitle.replace(re, " ");
    this.docsTitle = newTitle;*/

  }

  public multiDocs1 = []
  onUploadSuccess1(event: any,i): void {
   
    console.log('onUploadSuccess:', event);
    
    this.docPath = event[1].path;
    this.multiDocs1.push(this.docPath)
    console
    this.supplierSummary.perishablesList[i].documentPath1 =  this.multiDocs1.toString();
    /*var index = this.docPath.lastIndexOf("/");
    var rawTitle = this.docPath.substr(index + 1)
    var re = /%20/gi;
    var newTitle = rawTitle.replace(re, " ");
    this.docsTitle = newTitle;*/

  }

  public multiDocs2 = []
  onUploadSuccess2(event: any,i): void {
   
    console.log('onUploadSuccess:', event);
    
    this.docPath = event[1].path;
    this.multiDocs2.push(this.docPath)
    console
    this.supplierSummary.perishablesList[i].documentPath2 =  this.multiDocs2.toString();
    /*var index = this.docPath.lastIndexOf("/");
    var rawTitle = this.docPath.substr(index + 1)
    var re = /%20/gi;
    var newTitle = rawTitle.replace(re, " ");
    this.docsTitle = newTitle;*/

  }


 


  SubmitDeliveryResults()
  {
     Swal.fire({
      title: 'Save Delivery Schedule Form?',
      text: 'Are you sure you want to save this changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      console.log("Text :" + JSON.stringify(this.supplierSummary.perishablesList));
      for (let i = 0; i < this.supplierSummary.perishablesList.length; i++) {
        //console.log("Text :" +this.supplierSummary.perishablesList[i]);

        if (this.supplierSummary.perishablesList[i].isProductWrong==="true")
          this.supplierSummary.perishablesList[i].isProductWrong=true;
        else
          this.supplierSummary.perishablesList[i].isProductWrong = false;

        if (this.supplierSummary.perishablesList[i].isQualityWrong === "true")
          this.supplierSummary.perishablesList[i].isQualityWrong = true; 
        else
          this.supplierSummary.perishablesList[i].isQualityWrong = false; 
        
        if (this.supplierSummary.perishablesList[i].isQuantityWrong === "true")
          this.supplierSummary.perishablesList[i].isQuantityWrong = true;
        else if (this.supplierSummary.perishablesList[i].isQuantityWrong === "false")
          this.supplierSummary.perishablesList[i].isQuantityWrong = false;
        
         this.sddeliveryScheduleService.saveDeliveryNote(this.supplierSummary.perishablesList[i]).subscribe(res => {
            console.log(res);
  
          }, err =>{
            console.log(err);
          });

          Swal.fire({
            timer: 5000,
            title:  'Confirmation',
            text:   'Delivery Schedule Save',
            icon:   'success'
          }).then(result => {

            if (result.value || result.isDismissed) {
              //window.location.reload();
            }
          });
  
      }
      console.log("Payload: "+ JSON.stringify(this.supplierSummary.perishablesList))
      sessionStorage.setItem("passSupplierSummaryID", this.sddeliveryScheduleID);
      //this.router.navigate(['/school-delivery-schedule-queries']);  
     
      
    })
  
  
  }
  
  toggle() {
    this.oil = !this.oil;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.oil)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  toggleSalt() {
    this.salt = !this.salt;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.salt)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleMilk() {
    this.milk = !this.milk;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.milk)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleTomato() {
    this.tomato = !this.tomato;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.tomato)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleMince() {
    this.mince = !this.mince;

    // CHANGE THE NAME OF THE BUTTON.
    if(this.mince)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  toggleBeans() {
    this.beans = !this.beans;
    if(this.beans)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleVanilla() {
    this.vanilla = !this.vanilla;
    if(this.vanilla)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleStrawberry() {
    this.strawberry = !this.strawberry;
    if(this.strawberry)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleSorghum() {
    this.sorghum = !this.sorghum;
    if(this.sorghum)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleMeal() {
    this.meal = !this.meal;
    if(this.meal)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleRice() {
    this.rice = !this.rice;
    if(this.rice)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }
  toggleSamp() {
    this.samp = !this.samp;
    if(this.samp)  
      this.buttonName = "Hide";
    else
      this.buttonName = "Show";
  }

  openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#fileUploadInputExample") as HTMLElement;
    element.click();

  }


  onmousedown = function (e) {
    var el = e.target;
    if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
        e.preventDefault();

        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        // hack to correct buggy behavior
        var select = el.parentNode.cloneNode(true);
        el.parentNode.parentNode.replaceChild(select, el.parentNode);
    }
}


  handleFileInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#fileUploadInputExample + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;

      this.uploadedDocument = <File>event.target.files[0];
      element.setAttribute('value', fileName.substring(0, fileName.lastIndexOf(".")));
      this.FileName = fileName.substring(0, fileName.lastIndexOf("."));
    }
  }

  name = 'Angular';

  productForm: FormGroup;


  isActivityNameSelected:boolean;
  //Show and hide 
   selectProductTypeInput(event){
     
     let selected = event.target.value;
     if(selected =="No" ){
       this.isActivityNameSelected =true;
     }else{
       this.isActivityNameSelected =false;
     }
 
  }

  isQuantitySelected: boolean;
  //Show and hide 
  selectQuantityInput(event) {

    let selected = event.target.value;
    if (selected == "No") {
      this.isQuantitySelected = true;
    } else {
      this.isQuantitySelected = false;
    }

  }

  isRating:boolean;
  //Show and hide 
   selectIn(event){
     let selected = event.target.value;
     if(selected =="Poor" ){
       this.isActivityNameSelected =true;
     }else{
       this.isActivityNameSelected =false;
     }
 
  }

getSchoolName(schoolObject){
  let school = JSON.parse(schoolObject)
  console.log(schoolObject)
  return school.institutionName
 }

 getDistrictName(districtObject){
  let district = JSON.parse(districtObject)
  console.log(districtObject)
  return district.district_Name
 }

 goBack(){
  this.router.navigate(['/monthly-delivery-schedule']);
}


}
