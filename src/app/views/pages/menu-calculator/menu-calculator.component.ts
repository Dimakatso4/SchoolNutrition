import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuCalculatorService } from './menu-calculator.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { id } from '@swimlane/ngx-datatable';
import { School, Month } from '../../../model/school.model';
import { Product, SchoolDonation, ProductReq,SchoolDonationReq } from '../../../model/product.model';
import * as moment from 'moment';

@Component({
  selector: 'app-menu-calculator',
  templateUrl: './menu-calculator.component.html',
  styleUrls: ['./menu-calculator.component.scss']
})
export class MenuCalculatorComponent implements OnInit {
  validationForm: FormGroup;
  editvalidationForm: FormGroup;
  isCreateFormSubmitted: boolean;
  editisCreateFormSubmitted: boolean;
 
  constructor(private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private appService: AppService,
    public menuCalculatorService: MenuCalculatorService,
    public formBuilder: FormBuilder) {
    }


  public noDocuments;
  public documents;
  public userRole;
  

  newDocs: any = {};
  public docsTitle: any;
  public FileName: any;
  isFormSubmitted: boolean;
  public docPath = '';

  //
  public foodGroupList: any;
  public breakfastList: any
  public starchList: any;
  public proteinList: any
  public seasoningList: any;
  public fruitOrVegitableList: any
  public foodGroup: any;
  public noOfLearners: any;
  public foodGroupID: any;
  public nsnpAllocation: any  = "";
  public schoolTypeList: any;
  public schoolType: any;
  public primaryType: any;
  public secondaryType: any;
  public schoolName: any;
  public emisCode: any;
  public schoolLevel: any;
 

  public dtOptions: DataTables.Settings = {};
  uploadedDocument: File = null;
  dtTrigger: Subject<any> = new Subject<any>();


  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
 
  public config: DropzoneConfigInterface = {
    clickable: true,
    url: this.menuCalculatorService.uploadLink, // this.manageentplanservice.UploadNewDocument(),
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    maxFilesize: 50,
    acceptedFiles: 'image/*, application/*'
  };

  productForm: FormGroup;

  ngOnInit(): void {

     this.validationForm = this.formBuilder.group({
      noOfLearners: ['', Validators.required],
      nsnpAllocation: ['', Validators.required],
      schoolType: ['', Validators.required]
    })

    this.isCreateFormSubmitted = false;

    this.editvalidationForm = this.formBuilder.group({
      editquarter: ['', Validators.required]
      
    })

    this.menuCalculatorService.getFoodGroup().subscribe((res:any) => {
      this.foodGroupList = res;
      console.log(this.foodGroupList)
    })

    this.menuCalculatorService.getBreakfast().subscribe((res:any) => {
      this.breakfastList = res;
      console.log(this.breakfastList)
    })

    this.menuCalculatorService.getStarch().subscribe((res:any) => {
      this.starchList = res;
      console.log(this.starchList)
    })

    this.menuCalculatorService.getProtein().subscribe((res:any) => {
      this.proteinList = res;
      console.log(this.proteinList)
    })

    this.menuCalculatorService.getSeasoning().subscribe((res:any) => {
      this.seasoningList = res;
      console.log(this.seasoningList)
    })

    this.menuCalculatorService.getFruitOrVegitable().subscribe((res:any) => {
      this.fruitOrVegitableList = res;
      console.log(this.fruitOrVegitableList)
    })

    this.menuCalculatorService.getSchoolTypeData().subscribe((res:any) => {
      this.schoolTypeList = res;
      console.log(this.schoolTypeList)
    })

    this.emisCode = this.appService.getLoggedInEmisCode();
    this.menuCalculatorService.getSchoolByEmisNumber(this.emisCode).subscribe((res:any) =>{
      this.schoolName = res[0].institutionName;
      console.log(this.schoolName)

      this.menuCalculatorService.getSchoolLevelBySchoolName(this.schoolName).subscribe((res:any) => {
        this.schoolLevel = res[0].level;
        console.log(this.schoolLevel)
      })  
    })

     

    this.editisCreateFormSubmitted = false;

     this.dtTrigger.next();
     this.dtOptions = {
       pagingType: 'full_numbers',
       pageLength: 5,
       processing: true,
       searching: true,
       ordering: true,
       order: [[0, 'asc']]
     }
 
    this.userRole = this.appService.getLoggedInUserRole();

  }

  get createForm() {
    return this.validationForm.controls;
  }

  get editcreateForm() {
    return this.editvalidationForm.controls;
  }
 
  openLgModaledit(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log('Modal closed' + result);
    }).catch((res) => { });
  }

  openModal(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log('Modal closed' + result);
    }).catch((res) => { });
  }

  calculateQuantity(){  
    return alert("Banele!!!")
  }

}