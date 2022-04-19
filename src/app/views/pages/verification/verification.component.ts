import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
//import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { DeliveryScheduleService } from '../delivery-schedule/delivery-schedule.service';
import { MenuCalculatorService } from '../menu-calculator/menu-calculator.service';
import { SdDeliveryScheduleService } from '../sd-delivery-schedule/sd-delivery-schedule.service';
import { VerificationService } from './verification.service';
import {Router, Event as RouterEvent, NavigationStart,  NavigationEnd, NavigationCancel, NavigationError } from '@angular/router'


@Component({
  selector: 'app-training-session',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

//Sbuda testing 26 Jan 2022

//Nompumelelo
lis = []
li: any;
//
  isNameSelected: boolean;
  validationForm: FormGroup;
  validationFormEdit: FormGroup;
  isCreateFormSubmitted: Boolean;
  isFormCreatedSubmitted:boolean;
  public schoolRoll: any;
  public Grade:any = "";
  public otherGrade:any;
  public majorityLive: any = "";
  public quintile: any = "";
  public NoOfLearners:any;
  public verificationInfo:any;
  public noLearnersPerGradeInfo:any;;
  public lastInfo :any;
  public oldGradeInfo :any[ ];
  public listData:any;
  public data:any;
  public gradeList:any;
  public facilityList:any;
  public ListOfPlace:any;
  public  facility:any = "";
  public NSNPGrade1:any;
  public index: any;
  public products:any=[]

  public gradeEdit: any = "";
  public NoLearnersEdit: any;
  public schoolRollEdit:any;
  public childrenLiveEdit:any;
  public facilitiesEdit:any;
  public quintileEdit:any;
  public verificationId:any;

  public emisCode:any;
  public districtName:any;
  public schoolName: any;
  public schoolList: any;
  public LearnersInfo:any;
  public districtCode:any;
  public leanerNumber:number;

  public verificationList:any;
  public verificationLength:any;
  public gradeFilter: any;
  public parseList:any;
  public schoolLevel:any

  public clicked:any;

  public isPageLoading:Boolean;
  public isLoading:Boolean;

  public showOverlay: boolean = true;

  
  
  // productForm: FormGroup; 

  dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: DataTables.Settings = {};

  constructor( 
    private deliveryScheduleService:SdDeliveryScheduleService, 
    private sddeliveryScheduleService:DeliveryScheduleService,
    private modalService: NgbModal,
    private verificationService: VerificationService, 
    private formBuilder: FormBuilder, 
    private menuCalculatorService: MenuCalculatorService,
    private router: Router, private http: HttpClient, 
    private appService:AppService,
    config: NgbModalConfig ) {
       // customize default values of modals used by this component tree
        config.backdrop = 'static';
        config.keyboard = false;
        router.events.subscribe((event: RouterEvent) => {
        this.navigationInterceptor(event)
      })
     }
  
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

  ngOnInit(): void {

    this.getPrincipalSchool()
    this.lastInfo = []
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','desc']
    }

    this.validationForm = this.formBuilder.group({
      Grade: ['', Validators.required],
      otherGrade: [''],
      NoOfLearners:['', Validators.required],
      quintile: ['', Validators.required],
      majorityLive: ['', Validators.required],
      schoolRoll: [''], 
      facility:[''],      
      QuestionInfo: this.formBuilder.array([]),     
    });

    this.validationFormEdit = this.formBuilder.group({
      gradeEdit:['',Validators.required],
      NoLearnersEdit:['',Validators.required],
      quintileEdit:['',Validators.required],
      childrenLiveEdit:['',Validators.required],
      schoolRollEdit:[''],
      facilitiesEdit:['',Validators.required]
    })
  

    this.isCreateFormSubmitted = false;

    this.emisCode = this.appService.getLoggedInEmisCode();
    this.menuCalculatorService.getSchoolByEmisNumber(this.emisCode).subscribe((res:any) =>{
      this.schoolName = res[0].institutionName;
      console.log(this.schoolName)

      this.verificationService.getSchoolLevelBySchoolName(this.schoolName).subscribe((res:any) => {
        this.schoolLevel = res[0].level;
        console.log("School"+this.schoolLevel)
      })  
    })

    this.verificationService.getVerification().subscribe(res=>{
      console.log(res)
      this.verificationList = res;
      //
      let xx = this.appService.getLoggedInEmisCode();
      //alert(xx)

      let filtered = this.verificationList.filter(function (e) {
        return [xx] == (e.emisNumber)        
      });
      this.verificationList = filtered

      this.verificationLength = this.verificationList.length
      this.dtTrigger.next();  
      console.log(this.verificationList);
    });

this.verificationService.getChildreanPlace().subscribe(res=>{
  console.log(res)
  this.ListOfPlace=res;
  console.log(this.ListOfPlace);
});
this.verificationService.grtGrades().subscribe(data=>{
  this.gradeList=data;
  console.log(this.gradeList)
});
this.verificationService.getFacilities().subscribe(result=>{
  this.facilityList=result;
  console.log(this.facilityList);
});
  }

  getPrincipalSchool(){
    this.emisCode = this.appService.getLoggedInEmisCode();
    console.log(this.emisCode)
    
    this.verificationService.getSchoolByEmisNumber(this.emisCode).subscribe((res:any) =>{
      this.schoolName = res[0].institutionName  
      console.log(this.schoolName) 
    })

    this.districtCode = this.appService.getLoggedInDistrictCode();
    console.log(this.districtCode)

    this.verificationService.getDistrictByCode(this.districtCode).subscribe((res:any) =>{
      this.districtName = res[0].district_Name
      console.log(this.districtName)
    })    
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  Cancel(){
    this.isCreateFormSubmitted = false;
    //this.modalService.dismissAll();
    this.quintile = "";
    this.schoolRoll = "";
    this.majorityLive = "";
    this.facility = "";
  }
  
  get createForm() {
    return this.validationForm.controls;
  }

  openLgModal(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).
      catch((res) => {
      });
  }
  
  selectInput(event) {
    let selected = event.target.value;
    if (selected == "Other") {
      this.isNameSelected = true;

      this.validationForm = this.formBuilder.group({
        otherGrade:['', Validators.required]
      });

      this.Grade = this.otherGrade;
  
      this.isCreateFormSubmitted = false;

    } else {
      this.isNameSelected = false;
      this.Grade = selected;
    }
    console.log(selected)
  }
  ///Nompumelelo
  // selectInput(event) {
  //   if (this.Grade != 'other') {
  //     this.otherGrade = null;
  //   }
  // }

  DeleteGrade(i)
  {  
    this.leanerNumber = 0;  
    Swal.fire({
      title: 'Delete record?',
      text: 'Are you sure you want to delete this record?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.lastInfo.splice(i, 1);
        for(let i = 0; i < this.lastInfo.length; i ++ ){
          this.leanerNumber =  this.lastInfo[i].NoOfLearners - this.leanerNumber
        }
        Swal.fire(
          'Success',
          'Record deleted',
          'success'
        )

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Record not deleted',
          'error'
        )
      }
    })
   
  }
  
  SaveGrade()
  {
   this.lastInfo[this.index]={ 'Grade': this.gradeEdit, 'NoOfLearners': this.NoLearnersEdit }
  // this.modalService.dismissAll()   
  }


  clearControls() 
  {
    this.Grade = "Select grade";
    this.NoOfLearners = "";
  }

  filterGrade(Grade)
  {    
    let filtered:any;
    filtered = this.lastInfo.filter(function (e) {
      return [Grade] == (e.Grade)
    });
    this.gradeFilter = filtered.length;
    if(filtered.length > 0){
      Swal.fire(
        'Cancelled',
        'Grade with name: '+this.Grade+' exists please choose another name',
        'error'
      )
      this.Grade = "";
    }
  }
  
  AddNSNPgrade() 
  {
    this.isFormCreatedSubmitted = true;    
    if (this.Grade && this.NoOfLearners || this.Grade == 'other' && this.otherGrade && this.NoOfLearners)
    {    
      this.lastInfo.push({ 'Grade': this.Grade, 'NoOfLearners': this.NoOfLearners })

      this.NoOfLearners =0;
      this.Grade = "Select Grade";
      this.otherGrade = "";
      this.isFormCreatedSubmitted = false;
    }
  }

  getQuantity(){
    this.leanerNumber = 0;
    for(let i = 0; i < this.lastInfo.length; i ++ ){
        this.leanerNumber =  this.leanerNumber + this.lastInfo[i].NoOfLearners 
    }
   
    this.deliveryScheduleService.getProductShare().subscribe((res: any) => {
      let quantity
      for(let i = 0; i<res.length; i++){
        quantity =  parseFloat(this.schoolLevel == 'PRIMARY SCHOOL'?  res[i].grammage : res[i].grammageSecondary) * Number(this.leanerNumber)
        res[i].quantity = quantity
      }
      this.products = res;
      console.log("Products:  "+JSON.stringify(this.products))
  
    })
  } 
 
  submitVerification()
  {
    console.log(this.lastInfo)
    // let learnesInfo:any
    // learnesInfo = JSON.stringify(this.lastInfo)    
    // console.log(learnesInfo)
    // let objLearnerInfo = JSON.parse(learnesInfo)
    // console.log(JSON.stringify(objLearnerInfo))

    console.log(this.validationForm)
    if (this.validationForm.valid) {
      
      this.verificationService.sendEmailToDistrict("Verifier","1","JS","Testing").subscribe((res:any)=>{
        console.log(res)
      })

    Swal.fire({
      title: 'Save Verification Form?',
      text: 'Are you sure you want to save this changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
 
        this.verificationInfo = {
          quintile: this.quintile,
          childrenLive: this.majorityLive,
          schoolroll: this.leanerNumber,
          facility: this.facility.toString(),
          schoolName: this.schoolName,
          districtName: this.districtName,
          emisNumber: this.appService.getLoggedInEmisCode(),  
          LearnersInfo: JSON.stringify(this.lastInfo)      
        }

        console.log(JSON.stringify(this.verificationInfo));
        this.verificationService.createVerificationForm(this.verificationInfo);   
        
        let productStructure = []
        let productObj
        
        for(let i = 0; i< this.products.length;i++){
          productObj = {
           productId: this.products[i].productID, 
           foodGroupId: this.products[i].foodGroupID, 
           typeId: this.products[i].typeID, 
           quantity: parseInt(this.products[i].quantity),
           unit: this.products[i].unitDescription,
           grammage: this.products[i].grammage,
           quantityRecieved: this.products[i].quantity,
           isProductWrong : false,
           isQuantityWrong : false,
           isQualityWrong : false
          }
          productStructure.push(productObj)
        }
       

        let data = {
          supplierSummaryId : 0,
          quarter: "Quarter1",
          startDate:"2022-03-03T10:31:20.148Z",
          endDate:"2022-03-03T10:31:20.148Z",
          supplierName: "Test",
          nsnpAllocation: "Test",
          districtName: this.districtName,
          numberOfLearners : this.leanerNumber,
          SchoolName: this.schoolName,
          month: "January",
          emisNo: this.appService.getLoggedInEmisCode(),
          circuitNos: 2,
          clusterNos: 2,
          PerishablesList: productStructure
        }

        console.log("posted delievery note: " + JSON.stringify(data))
        this.sddeliveryScheduleService.createSupplierSummary(data).subscribe(res=> {
          console.log("posted delievery note")
        })
         
        Swal.fire(
          'Success',
          'Verification Form',
          'success'
        ).then(result => {
          this.modalService.dismissAll();
            if (result.value || result.isDismissed) {
              window.location.reload();              
            }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Verification Form not submited',
          'error'
        )
      }
    })
  }
  this.isCreateFormSubmitted = true;

  }

  updateVerification()
  {
    console.log(this.lastInfo)

    console.log(this.validationFormEdit)
    if (this.validationFormEdit.valid) {    

    Swal.fire({
      title: 'Update Verification Form?',
      text: 'Are you sure you want to update this changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {       

        
        let productStructure = []
        let productObj
        
        for(let i = 0; i< this.products.length;i++){
          productObj = {
           foodGroupId: this.products[i].foodGroupID,
           productId: this.products[i].typeID, 
           quantity: parseInt(this.products[i].quantity),
           unit: this.products[i].unitDescription,
           grammage: this.products[i].grammage,

          }
          productStructure.push(productObj)
        }

        let data = {
          supplierSummaryId : 0,
          quarter: "Quarter1",
          startDate:"2022-03-03T10:31:20.148Z",
          endDate:"2022-03-03T10:31:20.148Z",
          supplierName: "Test",
          nsnpAllocation: "Test",
          districtName: this.districtName,
          numberOfLearners : this.leanerNumber,
          SchoolName: this.schoolName,
          month: "January",
          emisNo: this.appService.getLoggedInEmisCode(),
          circuitNos: 2,
          clusterNos: 2,
          PerishablesList: productStructure
        }

        console.log("posted delievery note: " + JSON.stringify(data))
        this.sddeliveryScheduleService.createSupplierSummary(data).subscribe(res=> {
          console.log("posted delievery note")
        })
         
        Swal.fire(
          'Success',
          'Verification Form',
          'success'
        ).then(result => {
          this.modalService.dismissAll();
            if (result.value || result.isDismissed) {
              window.location.reload();              
            }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Verification form not updated',
          'error'
        )
      }
    })
  }
  this.isCreateFormSubmitted = true;
  }

  editVerification(i)
  {    
    console.log(this.verificationList[i])    
    let varSplit = this.verificationList[i].learnersInfo.split(',');
    this.parseList = JSON.parse(varSplit)

    this.quintileEdit = this.verificationList[i].quintile;
    this.childrenLiveEdit = this.verificationList[i].childrenLive;
    this.schoolRollEdit = this.verificationList[i].schoolroll;
    this.facilitiesEdit = this.verificationList[i].facility.split(',');

    console.log(this.facilitiesEdit)
  }


  openSmModal(content) {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  openEditModal(editModal, obj, i) {
    this.index = i;
    this.modalService.open(editModal, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
    this.NoLearnersEdit = obj.NoOfLearners;
    this.gradeEdit = obj.Grade;
  }

   openViewModal(lgViewModel,obj, i) {
    this.index = i;
    this.modalService.open(lgViewModel, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
    //this.verificationId = id;
    let varSplit = this.verificationList[i].learnersInfo.split(',');
    this.parseList = JSON.parse(varSplit)
    console.log(this.parseList)
    this.NoLearnersEdit = obj.NoOfLearners;
    this.gradeEdit = obj.Grade;
    this.quintileEdit = this.verificationList[i].quintile;
    this.childrenLiveEdit = this.verificationList[i].childrenLive;
    this.schoolRollEdit = this.verificationList[i].schoolroll;
    this.facilitiesEdit = this.verificationList[i].facility;
  }

  openEditViewModal(content) {   
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
    
  }

  flag() {
    this.clicked = false;
  }  
 
}
