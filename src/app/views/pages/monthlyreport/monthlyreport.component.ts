import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { HttpClient } from '@angular/common/http';
import { MonthlyreportService } from './monthlyreport.service';
import {  CurrencyPipe } from '@angular/common';
import { MonthlyFundRegister } from './monthlyfundregister.model';


@Component({
  selector: 'app-monthlyreport',
  templateUrl: './monthlyreport.component.html',
  styleUrls: ['./monthlyreport.component.scss']
})
export class MonthlyreportComponent implements OnInit {

  curdate: Date = new Date();

  values = [];
  values2 = [];
  price=[];
  itemName = [];
  itemPrice = [];

  public sum: any;

  banele: String = '';

  requiredForm: FormGroup;
  isFormSubmitted: Boolean;
  public purchasedDate: any
  public item: any
 
  public balance: any
  public income: any
  public listData:string[];
  
  public btnAmount: Boolean= false;


  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router,
     private formBuilder: FormBuilder,private route: ActivatedRoute, private http: HttpClient,
      private monthlyreport: MonthlyreportService,private currencyPipe:CurrencyPipe, private appservice:AppService) {
        
    
  }
  @Input() mon:any;
  

  fundRegId:string="";
  currentMonth:string="";
   monthlyFund:string=""; 
   
   
   datePurchased :string="";
   items:string="";
   supplier:string="";
   total:string="";
   uploadInvoice:string="";
   rep:any;


  myForm() {
    this.requiredForm = this.fb.group({
      currentMonth:['', Validators.required],
      monthlyFund: ['', Validators.required],
      datePurchased: ['', Validators.required],
      items: ['', Validators.required],
      supplier: ['', Validators.required],
      total: ['', Validators.required],
      uploadInvoice: ['', Validators.required]

    });
  }


  ngOnInit(): void { 
    this.monthlyreport.refreshlist();

    // this.refreshListMonList();
    // this.fundRegId=this.fundRegId,
    //  this.currentMonth=this.currentMonth,this.monthlyFund=this.currentMonth,
    //   this.datePurchased=this.datePurchased,this.items=this.items,this.supplier=this.supplier,
    //   this.total=this.total,this.uploadInvoice=this.uploadInvoice
  }
  populateForm(selectedRecord:MonthlyFundRegister){
    this.monthlyreport.formData = Object.assign({},selectedRecord);
  }
  
  removevalue(i) {
    this.values.splice(i, 1);
  }
  
  addvalue(){
    this.values.push({value:""});
    
  }
  
  addvalues(){
    this.values2.push({value:""});
  }
//SUB-tOTAL
  calcSum()
  {
    for(let i =0; i<this.itemPrice.length;i++)
    {

    }
    return this.itemPrice.length;
  }
  // TEST
  
  saveReview() 
  {
    
  Swal.fire({
   title: 'Are you sure?',
   text: "You have captured the correct amount!",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonText:'Yes',
   cancelButtonText:'No',
   reverseButtons: true
 }).then((result) => {
   if (result.isConfirmed)
    {Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'Your entry has been captured!',
     showConfirmButton: false,
     timer: 1000
   }).then(result => {
     if (result.value || result.isDismissed) {
      
       //this.modalService.close();
       //this.menuItems
     }
   });
   
   } else if (
     /* Read more about handling dismissals below */
     result.dismiss === Swal.DismissReason.cancel
   ) {
     Swal.fire(
       'Cancelled',
       'Your entry was cancelled:)',
       'error',
     )
   }
 
 })
   
 }
 
  public marksDistributionList:[];

  transformAmount(element){
    this.monthlyFund = this.currencyPipe.transform(this.monthlyFund,'R');

    element.target.value = this.monthlyFund;
}




isDisabled:boolean = false;
disable(){
  this.isDisabled = true;
}

public num1:number;
public num2:number;
public num3:number;
public num4: number;
public num5: number;



// num5:string=""; 

public item1:string;
public item2:string;
public item3:string;
public item4:string;


add()
{ 
    this.num5 = this.num1 + this.num2 + this.num3 +this.num4;
}

public showMyMessage = false
showMessageSoon() {
  setTimeout(() => {
    this.showMyMessage = true
  }, 10)
}

public showAddMessage= false
showAddFields(){
  setTimeout(() => {
    this.showAddMessage = true
  }, 100)
}
clicked = false;

  actionMethod() {
    console.log("actionMethod was called!");
  }
//API
MonthlyFundList: any=[];

refreshListMonList()
{
  this.monthlyreport.getfundRegList().subscribe(data=>{
    this.MonthlyFundList=data;
  });
}




  btnVal = "Edit Monthly Statement"
  changeText() {
    this.btnVal = "View Monthly Budget";

  }
  fileToUpload: File | null = null;

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  openEditModel1(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  openEditModel(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  openEditModel2(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }


  openEditModel3(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });
  }

  //API AND CONNECTION
  
  addMonthlyReport(){ 
    var val ={fundRegId:this.fundRegId,
      currentMonth:this.currentMonth,monthlyFund:this.currentMonth,
      datePurchased:this.datePurchased,items:this.items,supplier:this.supplier,
      total:this.total,uploadInvoice:this.uploadInvoice
    };
      this.monthlyreport.AddFundReg(val).subscribe(res=>{
        alert(res.toString());
      });
  }
 
  updateMonthlyReport(){
    var val ={fundRegId:this.fundRegId,
      currentMonth:this.currentMonth,monthlyFund:this.currentMonth,
      datePurchased:this.datePurchased,items:this.items,supplier:this.supplier,
      total:this.total,uploadInvoice:this.uploadInvoice
    };
      this.monthlyreport.UpdateFundReg(val).subscribe(res=>{
        alert(res.toString());
      });
  }
  addClick()
  {
    this.rep={
      fundRegId:0,
      currentMonth:"",
      monthlyFund:"",
      datePurchased:"",
      items:"",
      supplier:"",
      total:0,
      uploadInvoice:""
    }
  }
  editClick(item:any)
  {
    this.rep=item;
  }

  onSubmit(form:NgForm)
  {
    if(this.monthlyreport.formData.fundRegId ==0)
    {
      this.insertRecord(form);
    }
    else
    {
      this.updateRecord(form);
    }
  }

  insertRecord(form:NgForm)
  {
    this.monthlyreport.postMonthlyFundRegister().subscribe(res =>{
      this.resetForm(form);
    }, err =>{console.log(err);});
  }
  updateRecord(form:NgForm)
  {
    this.monthlyreport.putMonthlyFundRegister().subscribe(res =>{
      this.resetForm(form);
    }, err =>{console.log(err);});
  }

  resetForm(form:NgForm){
    form.form.reset();
    this.monthlyreport.formData = new MonthlyFundRegister();
  }
  saveReview2() 
  {
    
  Swal.fire({
   title: 'Are you sure?',
   text: "Have you captured all the fields correct",
   icon: 'warning',
   showCancelButton: true,
   confirmButtonText:'Yes',
   cancelButtonText:'No',
   reverseButtons: true
 }).then((result) => {
   if (result.isConfirmed)
    {Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'Your entry has been captured!',
     showConfirmButton: false,
     timer: 1500
   }).then(result => {
     if (result.value || result.isDismissed) {
      
       
       //this.menuItems
     }
   });
   
   } else if (
     /* Read more about handling dismissals below */
     result.dismiss === Swal.DismissReason.cancel
   ) {
     Swal.fire(
       'Cancelled',
       'Your entry was cancelled:)',
       'error',
     )
   }
 
 })
   
 }


 

}
