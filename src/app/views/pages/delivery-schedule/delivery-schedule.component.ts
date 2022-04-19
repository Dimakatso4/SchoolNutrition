import { Component, OnInit, ViewChild } from '@angular/core';
import { DeliveryScheduleService } from './delivery-schedule.service';
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

import { DataTableDirective } from 'angular-datatables';
import { SdDeliveryScheduleService } from '../sd-delivery-schedule/sd-delivery-schedule.service';
import { SchoolDeliveryQueriesModule } from '../school-delivery-schedule-queries/school-delivery-schedule-queries.module';
import { DeliveryScheduleQueriesService } from '../school-delivery-schedule-queries/school-delivery-schedule-queries.service';
import { SupplierService } from '../supplier-management/supplier.service';

@Component({
  selector: 'app-delivery-schedule',
  templateUrl: './delivery-schedule.component.html',
  styleUrls: ['./delivery-schedule.component.scss']
})
export class DeliveryScheduleComponent implements OnInit {

  validationForm: FormGroup;
  editvalidationForm: FormGroup;
  isCreateFormSubmitted: boolean;
  editisCreateFormSubmitted: boolean;
  productReq: ProductReq;
  schoolDonationReq: SchoolDonationReq;
  public products:any = [];

  
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private appservice: AppService,
    private sddeliveryScheduleService: SdDeliveryScheduleService,
    public deliveryScheduleService: DeliveryScheduleService,
    public supplierService:SupplierService,
    public formBuilder: FormBuilder,
    public schooldeliveryScheduleQueriesService: DeliveryScheduleQueriesService
    ) {}

  public emisNumber :any = this.appservice.getLoggedInEmisCode()
  public userRole:any = this.appservice.getLoggedInUserRole()
  public districtName:any = this.appservice.getLoggedInDistrictName()
  public districtCode:any = this.appservice.getLoggedInDistrictCode()
  public supplierName:any = this.appservice.getIsLoggedInUsername()

  public noDisputes:any;

  public data: any;
  public schoolroll:any

  public quarter: any;
  public month: any;

  public circuitNo: any;
  public viewNSNPAllocation: any;

  public productsInfoAdded = []
  
  public selectedQuarter:any;

  public startDate: any
  public endDate: any
  public ClusterNo: any;
  public Status
  public supplier: any;
  public noOfLearners: any;
  public list3:any;
  public list66:any;
  public list5:any;
  public list4: any
  public listMonth:any = []

  public getId:any;
  public editSupplierSummaryId:any;
  theCheckbox = true;
  public schoolSupplier: any;
  public schoolSum:any;
  public districtcode;
  public circuitNos:any;

  public noDocuments;
  public documents;
  public officialtitle;

  public noEditSupplierSummaryId;
  public noSupplierSummaryId;
  public editQuarter: any;
  public editMonth: any;
  public editDistrict: any;
  public editSchoolName: any;
  public editsupplierName:any;
  public editEmisNo : any;
  public editStartDate: any;
  public editEndDate: any;
  public editCircuitNo: any;
  public editClusterNo: any;
  public editNoOfLearners: any;
  public editNsnpAllocation : any;
  public editschoolroll:any
  public editcircuitNos:any

  public NsnpInfo: any;


  public assignedTo;

  
  
  public startDates: any
  public endDates: any
  public clusterNo: any;
  
  public emisNo: any
  public districtNames: any = ""
  public nsnpAllocation: any
  public supplierNames: any


  public Sstrawberry: boolean
  public supplierSummaryId: any;


  public email: any
  public telephone: any
  public Address1: any
  public Address2: any
  public schoolName: any = ""
  public info: any
  public EmisNo: any

  public name: any
  public DistrictName: any
  public SchoolName: any
  public NSNPAllocation: any

  schoolsMainData: any;
  schoolsMain: any;
  regionsData:any;
  districtsData:any;
  circuitsData:any;
  clustersData:any;
  regionsDatas:any;
  districtsDatas:any;
  circuitsDatas:any;
  clustersDatas:any;

  public SupplierName: any
  public schoolNames: any
  public SupplierSummaryId: any;

  newDocs: any = {};
  public docsTitle: any;
  public FileName: any;
  isFormSubmitted: boolean;
  public docPath = '';
  list = []
  public list1:any;
  lis1 = []
  list2 = []
  list6 = []

  public dtOptions: DataTables.Settings = {};
  uploadedDocument: File = null;
  dtTrigger: Subject<any> = new Subject<any>();


  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  public status = '';


  public parentname;
  public parentsurname;

  isSGB: boolean;
  isParent: boolean;

  public allRoles: any;
  public editUserRole;

  public user;
  userId;
  public supo;




  public config: DropzoneConfigInterface = {
    clickable: true,
    url: this.deliveryScheduleService.uploadLink, // this.manageentplanservice.UploadNewDocument(),
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
    //alert(this.supplierName)
     this.validationForm = this.formBuilder.group({
      quarter: ['', Validators.required],
      month: ['', Validators.required],
      districtNames:['', Validators.required],
      schoolNames: ['', Validators.required],
      schoolroll: ['', Validators.required],
      clusterNo: ['', Validators.required],
      emisNo:['', Validators.required],
      NSNPAllocation: ['', Validators.required],
      supplierName: ['', Validators.required],
      circuitNos: ['', Validators.required]
    })

    this.isCreateFormSubmitted = false;

    this.editvalidationForm = this.formBuilder.group({
      editquarter: ['', Validators.required],
      editmonth: ['', Validators.required],
      editdistrictNames:['', Validators.required],
      editschoolNames: ['', Validators.required],
      editschoolroll:['', Validators.required],
      editclusterNo: ['', Validators.required],
      editemisNo:['', Validators.required],
      editNsnpAllocation: ['', Validators.required],
      editsupplierName: ['', Validators.required],
      editcircuitNos: ['', Validators.required]
    })

    this.editisCreateFormSubmitted = false;

     this.dtOptions = {
       pagingType: 'full_numbers',
       pageLength: 10,
       processing: true,
       searching: true,
       ordering: true,
       order: ['0', 'asc']
     }
     //this.selectCode4(event);

    this.deliveryScheduleService.getSupplierSummary().subscribe((res: any) => {
      console.log("Test "+JSON.stringify(res))
      //alert(this.userRole)
      //schoolName
      //emisNo
      let filter:any
      if(this.userRole == "School Principal" || this.userRole =="School Coordinator" || this.userRole =="Food Handler" || this.userRole =="SGB"){
        let emisNumber = this.emisNumber
        filter = res.filter(function (e) {
          return (e['emisNo'] == emisNumber);
        });
        this.list = filter
      }else if (this.userRole == "Supplier" ){
        let supplier = this.supplierName
        this.list = res
      }else{
        this.list = res
      }
     
      console.log("list: " +JSON.stringify(this.list));
      this.dtTrigger.next();
    });
   
    this.deliveryScheduleService.getDistricts().subscribe((res: any) => {
      this.list1 = res;
      console.log(this.list1);
     
    })

    this.deliveryScheduleService.getSchools().subscribe((res: any) => {

      this.list2 = res;
      console.log(this.list2);
    });

    this.deliveryScheduleService.getQuarters().subscribe((res: any) => {
      this.lis1 = res;
      console.log(this.lis1);
    });

    this.deliveryScheduleService.getQuarterId(id).subscribe((res: any) => {
      this.list6 = res;
      console.log(this.list6);
     
    });

 
    this.userRole = this.appservice.getLoggedInUserRole();

  }

  get createForm() {
    return this.validationForm.controls;
  }

  get editcreateForm() {
    return this.editvalidationForm.controls;
  }


  selectCode(event){
   let selected = event;
   //alert(JSON.stringify(selected))
   this.deliveryScheduleService.getSchoolsByDistrict(selected.district_Code).subscribe((data: any) => {
    this.list3 = data;
     console.log(data);
    })
  }

  selectCode2(event){
    
    let selected = event.institutionName
    //alert(JSON.stringify(event))
    this.deliveryScheduleService.getRoll(selected).subscribe((data:any) => {
   
      if(data.length > 0){
            this.schoolroll = data[0].schoolroll;
            this.deliveryScheduleService.getSchoolsBySchoolName(selected).subscribe((data: School[]) => {
              this.list4 = data[0];
              this.clusterNo = this.list4.clusterNo
              this.NSNPAllocation = this.list4.level
              this.circuitNos = this.list4.circuitNo
              this.emisNo = this.list4.emisNumber
              console.log('selected school', this.list4.clusterNo);
              });

              this.deliveryScheduleService.getSupplier(selected).subscribe((res: any) => {
                this.supplierName = res[0].supplierName
              })

              this.deliveryScheduleService.getProductShare().subscribe((res: any) => {
                let quantity
                for(let i = 0; i<res.length; i++){
                  quantity =  parseFloat(res[i].grammage) * Number(this.schoolroll)
                  res[i].quantity = quantity
                }
                this.products = res;
        
              })

          }else{
            Swal.fire(
              'Cancelled',
              'The school you have selected has not been vetted please select another school or Please consult head office to Vett your school',
              'error'
            )

            this.districtNames = ''
            this.schoolNames = ''
          }

        });

    }

    editselectCode2(event){
    
      let selected = event.institutionName
      //alert(JSON.stringify(event))
      this.deliveryScheduleService.getRoll(selected).subscribe((data:any) => {
     
        if(data.length > 0){
              this.editschoolroll = data[0].schoolroll;
              this.deliveryScheduleService.getSchoolsBySchoolName(selected).subscribe((data: School[]) => {
                this.list4 = data[0];
                this.editclusterNo = this.list4.clusterNo
                this.editNsnpAllocation = this.list4.level
                this.editclusterNo = this.list4.circuitNo
                this.editemisNo = this.list4.emisNumber
                console.log('selected school', this.list4.clusterNo);
                });
  
                this.deliveryScheduleService.getSupplier(selected).subscribe((res: any) => {
                  this.editsupplierName = res[0].supplierName
                })
  
                this.deliveryScheduleService.getProductShare().subscribe((res: any) => {
                  let quantity
                  for(let i = 0; i<res.length; i++){
                    quantity =  parseFloat(res[i].grammage) * Number(this.schoolroll)
                    res[i].quantity = quantity
                  }
                  this.products = res;
          
                })
  
            }else{
              Swal.fire(
                'Cancelled',
                'The school you have selected has not been vetted please select another school or Please consult head office to Vett your school',
                'error'
              )
  
              this.districtNames = ''
              this.schoolNames = ''
            }
  
          });
  
      }

    selectCode3(event){

      let selected = event.target.value;
      selected=selected.split(' ').slice(0,2).map(n => n[0].toUpperCase()).join('');
  
      console.log(selected)
     this.deliveryScheduleService.getMonthByQuarter(selected).subscribe((data: any) => {
      this.list5 = data;
       console.log(data);
      })
    }

  
    selectCode4(event){
      console.log(event)
      //const selected = event.target.value;
      // TODO:: this service must r eturn school object not an array
    
      this.deliveryScheduleService.getMonthByQuarter(event).subscribe((data: any) => {
        //let quarterMonth = 
        this.listMonth = data;
       console.log('selected quarter', this.listMonth);
  
      })
  
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

  public editdistrictNames: any
  public editemisNo:any
  public editschoolNames:any
  public editsupplierNames:any
  public editquarter:any
  public editmonth:any
  public editcircuitNo:any
  public editclusterNo:any
  public editstartDates:any
  public editendDates:any
  public editnsnpAllocation:any
  public editnoOfLearners:any
  public editproducts:any = []
  openEditModal(content, id, index) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);


    }).catch((res) => { });

  
    this.supplierSummaryId = id;
    this.editdistrictNames = JSON.parse(this.list[index].districtName)
    this.selectCode(this.editdistrictNames)
    this.editemisNo = this.list[index].emisNo
    this.editschoolNames = JSON.parse(this.list[index].schoolName)
    this.editselectCode2(this.editschoolNames)
    
    this.editsupplierNames = this.list[index].supplierName
    this.editquarter = this.list[index].quarter
    this.selectCode4( this.editquarter)
    this.editmonth = this.list[index].month
    this.editcircuitNo = this.list[index].circuitNo
    this.editclusterNo = this.list[index].clusterNo

    this.editnsnpAllocation = this.list[index].nsnpAllocation
    this.editnoOfLearners = this.list[index].noOfLearners
    this.sddeliveryScheduleService.getSupplierSummaryById(this.supplierSummaryId ).subscribe(res => {
      console.log("Supplier Summery" + JSON.stringify(res));
      this.editproducts = res;

    })
    console.log(this.districtNames)
  }

  onSubmit(products)
  {
    
    if (this.validationForm.valid) {

    Swal.fire({
      title: 'Save Delivery Schedule Form?',
      text: 'Are you sure you want to save this changes?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        let productStructure = []
        let productObj
        
        for(let i = 0; i< products.length;i++){
          productObj = {

           foodGroupId: products[i].foodGroupID,
           productId: products[i].typeID, 
           quantity: parseInt(products[i].quantity),
           unit: products[i].unitDescription,
           grammage: products[i].grammage,

          }
          productStructure.push(productObj)
        }

        let data = {
          supplierSummaryId : 0,
          quarter: this.quarter,
          startDate: "2022-03-03T10:31:20.148Z",
          endDate: "2022-03-03T10:31:20.148Z",
          supplierName: this.supplierName,
          nsnpAllocation: this.list4.level,
          districtName: JSON.stringify(this.districtNames),
          numberOfLearners : this.schoolroll,
          SchoolName: JSON.stringify(this.schoolNames),
          month: this.month,
          emisNo: this.list4.emisNumber,
          circuitNos: this.list4.circuitNo,
          clusterNos: this.list4.clusterNo,
          PerishablesList: productStructure
        }

        console.log("posted delievery note: " + JSON.stringify(data))
        this.deliveryScheduleService.createSupplierSummary(data).subscribe(res=> {
          console.log("posted delievery note")
        })

      Swal.fire(
        'Success',
        'Delivery Schedule Form',
        'success'
      ).then(result => {

        if (result.value || result.isDismissed) {
            let debounceResize: number;
            debounceResize = window.setTimeout(() => {
           // window.location.reload();
            }, 5000);
    
        }
    
      });
    
    } else if (result.dismiss === Swal.DismissReason.cancel) {

      Swal.fire(
        'Cancelled',
        'Delivery Schedule Form not submitted',
        'error'
      )

    }

  })
  this.isFormSubmitted = true;
  console.log("test")
} else if (this.validationForm.invalid) {
   Swal.fire({
    title: 'Summary Supplier',
     text: 'Please fill in all the required fields',
     icon: 'error',
  });
    console.log('Activity not created');


}
this.isCreateFormSubmitted = true;

 }


 Cancel(){

 }

 passSupplierSummaryID(id){
  
  sessionStorage.setItem("passSupplierSummaryID", id);
  this.router.navigate(['/perishable-delivery-schedule']);
 }
 
 changeLearnersNumber(schoolroll){
     this.schoolroll = schoolroll
     this.deliveryScheduleService.getProductShare().subscribe((res: any) => {
        
        let quantity
        for(let i = 0; i<res.length; i++){
          quantity =  parseFloat(res[i].grammage) * Number(this.schoolroll)
          res[i].quantity = quantity
        }
        this.products = res;
        //alert(JSON.stringify(this.products))
      });
 }

 getSchoolName(schoolObject){
   let school = JSON.parse(schoolObject)
    return school.institutionName
 }

 public report:any
 reportData(view){
 
  this.sddeliveryScheduleService.getSupplierSummaryById(view.supplierSummaryId).subscribe(res => {
    this.report = res
    console.log("audit "+JSON.stringify(this.report))
  })
 
 }

 getdelieveryDates(id){
   sessionStorage.setItem("passSupplierSummaryID", id);
    this.router.navigate(['/monthly-delivery-schedule']);
  }

  public deliveryNoteList:any
  getdelieveryNote(id){
    this.sddeliveryScheduleService.getSupplierSummaryById(id).subscribe(res => {
      this.deliveryNoteList = res
    })

  }

  public queryList:any
  getdelieveryQuery(data){
   // alert(JSON.stringify(data.emisNo))
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
        filter = this.queryList.filter(function (e) {
          return (e['emisNumber'] == data.emisNo);
        });
        this.queryList = filter
        
      }
    })
  }

  convertDocsToJSON(docs){
    let documents = docs.split(',');
    //alert(documents)
    return documents
  }

}