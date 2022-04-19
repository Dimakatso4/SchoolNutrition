import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { SendNsnpRegistrationService } from './send-nsnp-registration.service';


@Component({
  selector: 'app-training-session',
  templateUrl: './send-nsnp-registration.component.html',
  styleUrls: ['./send-nsnp-registration.component.scss']
})
export class SendNsnpRegistrationComponent implements OnInit {

//Sbuda testing 26 Jan 2022

//Nompumelelo
lis = []
li: any;
//
  isNameSelected: boolean;
  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  isFormCreatedSubmitted:boolean;
 
  public nsnpInfo:any;  
  public index: any; 

  public emisCode:any;
  public schoolName: any;
  public schoolList: any;
  public districtCode: any;
  public districtName: any;
  public learnersInfo: any;
  public nsnpList: any;
  public districtList: any;
  public district: any = "";
  public school: any;
  public email: any;

  public quintileEdit:any;
  public childrenLiveEdit:any;
  public schoolRollEdit:any;
  public facilitiesEdit:any;
  
  // productForm: FormGroup; 

  dtTrigger: Subject<any> = new Subject<any>();
  public dtOptions: DataTables.Settings = {};

  constructor(private modalService: NgbModal,private nsnpService: SendNsnpRegistrationService, private formBuilder: FormBuilder, private router: Router, private http: HttpClient, private appService:AppService) { }

  ngOnInit(): void {

    this.getPrincipalSchool()

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      searching: true,
      ordering:  true,
      order: ['0','asc']
    }

    this.validationForm = this.formBuilder.group({
     district:['',Validators.required],
     school: ['',Validators.required],   
    });
  

    this.isCreateFormSubmitted = false;

    this.nsnpService.getAllDistricts().subscribe((res:any) =>{
      this.districtList = res;
    })

    this.nsnpService.getSendNSNP().subscribe(res=>{
      console.log(res)
      this.nsnpList = res;
      this.dtTrigger.next();  
      console.log(this.nsnpList);
    });

  }

  getPrincipalSchool(){
    this.emisCode = this.appService.getLoggedInEmisCode();
    console.log(this.emisCode)
    // this.nsnpService.getSchoolByEmisNumber(this.emisCode).subscribe((res:any) =>{
    //   this.schoolName = res[0].institutionName  
    //   console.log(this.schoolName) 
    // })

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
    this.school = "";
    this.district = "";
    //this.modalService.dismissAll();
  }

  getSchoolByDistrict(event){
    console.log(event)
    this.nsnpService.getSchoolEmailsByDistrict(event).subscribe((res:any) => {
      this.schoolList = res
      console.log(this.schoolList)
    })
  }

  openLgModal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).
      catch((res) => {
      });
  }
  
  submitNSNPForm()
  { 
    
    console.log(this.validationForm)
    if (this.validationForm.valid) {    

    Swal.fire({
      title: 'Send NSNP Registration Form?',
      text: 'Are you sure you want to send this form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
 
        this.nsnpInfo = {
          
          schoolName: this.school,
          districtName: this.district,
          schoolEmail: this.schoolList.schoolEmail

        }

        console.log(JSON.stringify(this.nsnpInfo));
        
        this.nsnpService.createSendNSNP(this.nsnpInfo);

        this.nsnpService.sendEmailToSchool("Verifier","1","JS","Testing");       
         
        Swal.fire(
          'Success',
          'Send NSNP Registration Form',
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
          'Send NSNP Registration Form not submited',
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

  openEditModal(lgViewModel, obj, i) {
    this.index = i;
    this.modalService.open(lgViewModel, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

    this.quintileEdit = this.nsnpList[i].quintile;
    this.childrenLiveEdit = this.nsnpList[i].childrenLive;
    this.schoolRollEdit = this.nsnpList[i].schoolroll;
    this.facilitiesEdit = this.nsnpList[i].facility;
  }
 
}
