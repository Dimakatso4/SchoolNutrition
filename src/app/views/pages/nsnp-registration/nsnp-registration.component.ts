import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { NsnpRegistrationService } from './nsnp-registration.service';


@Component({
  selector: 'app-training-session',
  templateUrl: './nsnp-registration.component.html',
  styleUrls: ['./nsnp-registration.component.scss']
})
export class NsnpRegistrationComponent implements OnInit {

//Sbuda testing 26 Jan 2022
items = [
  {id:1, name:'Storage facilities'},
  {id:2, name:'Cooking facilities'},
  {id:3, name:'Washing up facilities'},
  {id:4, name:'Tap with running water'},
  {id:5, name:'Access to water'},
  {id:6, name:'Tuckshop'},
  {id:7, name:'Vendors'}
]
//Nompumelelo
lis = []
li: any;
//
  isNameSelected: boolean;
  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  isFormCreatedSubmitted:boolean;
  public schoolRoll: any;
  public Grade:any = "";
  public otherGrade:any;
  public majorityLive: any = "";
  public quintile: any = "";
  public NoOfLearners:any;
  public nsnpInfo:any;
  public noLearnersPerGradeInfo:any;;
  public lastInfo :any;
  public oldGradeInfo :any[ ];
  public listData:any;
  public data:any;
  public gradeList:any
  public facilityList:any
  public ListOfPlace:any
  public  facility:any
  public NSNPGrade1:any
  public index: any;
  public gradeEdit: any = "";

  public NoLearnersEdit: any;
  public gradeFilter: any;
  public parseList:any;

  public emisCode:any;
  public schoolName: any;
  public schoolList: any;
  public districtCode: any;
  public districtName: any;
  public learnersInfo: any;
  public nsnpList: any;

  public quintileEdit:any;
  public childrenLiveEdit:any;
  public schoolRollEdit:any;
  public facilitiesEdit:any;

 public leanerNumber: any;
 public nsnpLength: any;
  
  // productForm: FormGroup; 

  dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: DataTables.Settings = {};

  constructor(private modalService: NgbModal,private nsnpService: NsnpRegistrationService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private appService:AppService) { }

  ngOnInit(): void {

    this.getPrincipalSchool()
    this.lastInfo = []
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','asc']
    }

    this.validationForm = this.formBuilder.group({
      Grade: ['', Validators.required],
      NoOfLearners:['', Validators.required],
      quintile: ['', Validators.required],
      majorityLive: ['', Validators.required],
      schoolRoll: ['', Validators.required], 
      facility:[''],      
      QuestionInfo: this.formBuilder.array([]),     
    });
  

    this.isCreateFormSubmitted = false;

    this.nsnpService.getNSNP().subscribe(res=>{
      console.log(res)
      this.nsnpList = res;
      let xx = this.appService.getLoggedInEmisCode();
      //alert(xx)

      let filtered = this.nsnpList.filter(function (e) {
        return [xx] == (e.emisNumber)        
      });
      this.nsnpList = filtered

      this.nsnpLength = this.nsnpList.length
      this.dtTrigger.next();  
      console.log(this.nsnpList);
    });

this.nsnpService.getChildreanPlace().subscribe(res=>{
  console.log(res)
  this.ListOfPlace=res;
  console.log(this.ListOfPlace);
});
this.nsnpService.grtGrades().subscribe(data=>{
  this.gradeList=data;
  console.log(this.gradeList)
});
this.nsnpService.getFacilities().subscribe(result=>{
  this.facilityList=result;
  console.log(this.facilityList);
});
  }

  getPrincipalSchool(){
    this.emisCode = this.appService.getLoggedInEmisCode();
    console.log(this.emisCode)
    this.nsnpService.getSchoolByEmisNumber(this.emisCode).subscribe((res:any) =>{
      this.schoolName = res[0].institutionName  
      console.log(this.schoolName) 
    })

    this.districtCode = this.appService.getLoggedInDistrictCode();
    console.log(this.districtCode)

    this.nsnpService.getDistrictByCode(this.districtCode).subscribe((res:any) =>{
      this.districtName = res[0].district_Name
      console.log(this.districtName)
    })
    
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  get createForm() {
    return this.validationForm.controls;
  }

  Cancel(){
    this.isCreateFormSubmitted = false;
    //this.modalService.dismissAll();
    this.quintile = "";
    this.schoolRoll = "";
    this.majorityLive = "";
    this.facility = "";
  }
  
  // selectInput(event) {
  //   let selected = event.target.value;
  //   if (selected == "other") {
  //     this.isNameSelected = true;

  //     this.validationForm = this.formBuilder.group({
  //       otherGrade:['', Validators.required]
  //     });

  //     this.Grade = this.otherGrade;
  
  //     this.isCreateFormSubmitted = false;

  //   } else {
  //     this.isNameSelected = false;
  //     this.Grade = selected;
  //   }
  //   console.log(selected)
  // }
  ///Nompumelelo
  selectInput(event) {
    if (this.Grade != 'other') {
      this.otherGrade = null;
    }
  }

  openLgModal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).
      catch((res) => {
      });
  }

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
  
  SaveGrade()
  {
   this.lastInfo[this.index]={ 'Grade': this.gradeEdit, 'NoOfLearners': this.NoLearnersEdit }
   //this.modalService.dismissAll()
  }

  clearControls() 
  {
    this.Grade = "Select grade";
    this.NoOfLearners = "";
  }

  
  // filterGrade(Grade)
  // {    
  //   let filtered:any;
  //   filtered = this.lastInfo.filter(function (e) {
  //     return [Grade] == (e.Grade)
  //   });
  //   this.gradeFilter = filtered.length;
  //   if(filtered.length > 0){
  //     Swal.fire(
  //       'Cancelled',
  //       'Grade with name: '+this.Grade+' exists please choose another name',
  //       'error'
  //     )
  //     this.Grade = "";
  //   }
  // }
  
  AddNSNPgrade() 
  {
    this.isFormCreatedSubmitted = true;
    this.leanerNumber = 0;

    if (this.Grade && this.NoOfLearners || this.Grade == 'other' && this.otherGrade && this.NoOfLearners)
    {
      this.lastInfo.push({ 'Grade': this.Grade, 'NoOfLearners': this.NoOfLearners })
      
      for(let i = 0; i < this.lastInfo.length; i ++ ){
        this.leanerNumber =  this.leanerNumber + this.lastInfo[i].NoOfLearners 
      }

      this.NoOfLearners =0;
      this.Grade = "Select Grade";
      this.otherGrade = "";
      this.isFormCreatedSubmitted = false;
    }
  }
 
  submitNSNP()
  {
    console.log(this.AddNSNPgrade)

    console.log(this.validationForm)
    if (this.validationForm.valid) {
      
      this.nsnpService.sendEmailToDistrict("Verifier","1","JS","Testing").subscribe((res:any)=>{
        console.log(res)
      })

    Swal.fire({
      title: 'Save NSNP Registration Form?',
      text: 'Are you sure you want to save this changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {     
         
        this.nsnpInfo = {
          quintile: this.quintile,
          childrenLive: this.majorityLive,
          schoolroll: this.leanerNumber,
          facility: this.facility.toString(),
          schoolName: this.schoolName,
          districtName: this.districtName,
          emisNumber: this.appService.getLoggedInEmisCode(),
          learnersInfo: JSON.stringify(this.lastInfo)           
        }

        console.log(JSON.stringify(this.nsnpInfo));

        this.nsnpService.createNSNP(this.nsnpInfo);       
         
        Swal.fire(
          'Success',
          'NSNP Registration Form',
          'success'
        ).then(result => {
          this.modalService.dismissAll();
            if (result.value || result.isDismissed) {
              window.location.reload()
            }
        })

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'NSNP Registration Form not submited',
          'error'
        )
      }
    })
  }
  this.isCreateFormSubmitted = true;

  }


  openSmModal(content) {
    this.modalService.open(content, {size: 'lg'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  openEditModal(editModal, obj, i) {
    this.index = i;
    this.modalService.open(editModal, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
    this.NoLearnersEdit = obj.NoOfLearners;
    this.gradeEdit = obj.Grade;
  }

  openViewModal(lgViewModel,obj, i) {
    
    this.index = i;
    this.modalService.open(lgViewModel, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
    //this.verificationId = id;
    let varSplit = this.nsnpList[i].learnersInfo.split(',');
    this.parseList = JSON.parse(varSplit)
    console.log(this.parseList)
    // this.NoLearnersEdit = obj.NoOfLearners;
    // this.gradeEdit = obj.Grade;
    this.quintileEdit = this.nsnpList[i].quintile;
    this.childrenLiveEdit = this.nsnpList[i].childrenLive;
    this.schoolRollEdit = this.nsnpList[i].schoolroll;
    this.facilitiesEdit = this.nsnpList[i].facility;

    
  }
 
}
