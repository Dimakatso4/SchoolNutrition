import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { HOVerificationService } from './ho-verification.service';

// import { DataTable } from "simple-datatables";

@Component({
  selector: 'app-training-session',
  templateUrl: './ho-verification.component.html',
  styleUrls: ['./ho-verification.component.scss']
})
export class HOVerificationComponent implements OnInit {

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
  public Grade:any;
  public otherGrade:any;
  public majorityLive: any;
  public quintile: any;
  public NoOfLearners:any;
  public verificationInfo:any;
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

  public childrenLiveEdit:any;
  public schoolRollEdit:any;
  public facilitiesEdit:any;
  public quintileEdit:any;

  public parseList: any;

  noDispute;

  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  

  constructor(private modalService: NgbModal,private verificationService: HOVerificationService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

    this.lastInfo = []

    this.dtTrigger.next();    
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      ordering: true
    };

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

    this.verificationService.getVerification().subscribe(res=>{
      console.log(res)
      this.ListOfPlace = res;
      this.dtTrigger.next();
      // if(this.ListOfPlace > 0){
      //   this.noDispute = false;
      // }else{
      //   this.noDispute = true;
      // }
      console.log(this.ListOfPlace);
    }); 
}

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  
  get createForm() {
    return this.validationForm.controls;
  }  

  ///Nompumelelo
  selectInput(event) {
    if (this.Grade != 'other') {
      this.otherGrade = null;
    }
  }

  DeleteGrade(i)
  {
   this.lastInfo.splice(i, 1);
  }
  
  SaveGrade()
  {
   this.lastInfo[this.index]={ 'Grade': this.gradeEdit, 'NoOfLearners': this.NoLearnersEdit }
   this.modalService.dismissAll()
  }

  clearControls() 
  {
    this.Grade = "Select grade";
    this.NoOfLearners = "";
  }
  

  openSmModal(content) {
    this.modalService.open(content, {size: 'xl'}).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => {});
  }

  // openEditModal(editModal, obj, i) {
  //   this.index = i;
  //   this.modalService.open(editModal, { size: 'lg' }).result.then((result) => {
  //     console.log("Modal closed" + result);
  //   }).catch((res) => { });
  //   this.NoLearnersEdit = obj.NoOfLearners;
  //   this.gradeEdit = obj.Grade;    
  // }
  
  openEditModal(content,id,index)
  {
      this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
  }).catch((res) => { });
    console.log(this.ListOfPlace[index])
    let varSplit = this.ListOfPlace[index].learnersInfo.split(',');
    this.parseList = JSON.parse(varSplit)
    console.log(this.parseList) 
    this.schoolRollEdit = this.ListOfPlace[index].schoolroll 
    this.childrenLiveEdit = this.ListOfPlace[index].childrenLive  
    this.quintileEdit = this.ListOfPlace[index].quintile  
    this.facilitiesEdit = this.ListOfPlace[index].facility  
  }
}
