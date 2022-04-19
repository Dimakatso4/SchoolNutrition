import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from '../supplier.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.scss']
})
export class SupplierProfileComponent implements OnInit {

  title = 'my-app';
  ///date
  public data: any
  requiredForm: FormGroup;
  FormEdit:FormGroup;
  isFormSubmitted: Boolean;
  public supplierName: any
  public email: any
  public telephone: any
  public Address1: any
  public Address2: any
  public town: any
  public City: any
  public Province="";
  public PostalCode: any
  public name: any
  public surname: any
  public csdNo: any
  public startDate: any
  public endDate: any
  
  public assignedSchool: any
  public contactNo: any
  public venderNo: any
  public supplierId: any
  public info: any
 
  public districtCode="";
  public emisNumber: any
  public schools: any
  public districtName="";
  public code: any
  public list2: any
  public institution: any
  public schoolName: any
  public dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  lis = []
  li: any;
  noDisputes;
  districtNames: any;
  public Status="";
  public isNumberInvalid;
  public isTelephoneInvalid;

  numChars: number = 2;
  public supplierStatus:any
  public provinceList:any
 
  public districtCodeEdit:  any 
  public districtNameEdit="";
  public  supplierNameEdit:  any 
  public  emailEdit:  any 
  public telephoneEdit: any 
  public Address1Edit: any 
  public  Address2Edit:  any 
  public townEdit:  any 
  public CityEdit:   any 
  public ProvinceEdit="";
  public  PostalCodeEdit:  any 
  public nameEdit:   any 
  public surnameEdit:  any 
  public csdNoEdit: any 
  public startDateEdit:  any 
  public endDateEdit: any 
  public StatusEdit="";
  public assignedSchoolEdit: any 
  public contactNoEdit:  any 
  public venderNoEdit:  any 
  

  public institutionEdit: any
  public schoolNameEdit: any
  public passwordEdit:any
  public password:any



  constructor(private modalService: NgbModal, private fb: FormBuilder, private router: Router, private supplierservice: SupplierService) { }

  ngOnInit(): void {

    //table
    this.dtTrigger.next();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      order: [0, 'desc']
      //paging: true,
      //  responsive: true,


    };
    this.requiredForm = this.fb.group({
      districtCode: [''],
      districtName: [''],
      supplierName: ['',  [Validators.required, Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      email: ['', Validators.required ],
      telephone: ['', Validators.required],
      Address1: ['', Validators.required],
      Address2: [''],
      town: ['',  [Validators.required, Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      City:  ['',  [Validators.required, Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      Province: ['', Validators.required],
      PostalCode: ['', Validators.required],
      name:  ['',  [Validators.required, Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      surname: ['',  [Validators.required, Validators.pattern('^([A-Z][a-z]*((\\s[A-Za-z])?[a-z]*)*)$')]],
      csdNo: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      Status: [''],
      assignedSchool: [''],
      contactNo: ['', Validators.required],
      venderNo: ['', Validators.required],
      password: [''],

      institution: [''],
      schoolName: ['']


    });
    this.FormEdit= this.fb.group({
      districtCodeEdit: [''],
      districtNameEdit: [''],
      supplierNameEdit: [''],
      emailEdit: [''],
      telephoneEdit: [''],
      Address1Edit: [''],
      Address2Edit: [''],
      townEdit: [''],
      CityEdit:  [''],
      ProvinceEdit: [''],
      PostalCodeEdit: [''],
      nameEdit:  [''],
      surnameEdit: [''],
      csdNoEdit: [''],
      startDateEdit: [''],
      endDateEdit: [''],
      Status: [''],
      assignedSchool: [''],
      contactNoEdit: [''],
      venderNoEdit: [''],
      

      institution: [''],
      schoolName: ['']


    });

    this.isFormSubmitted = false;
    //districtList
    this.supplierservice.getAllDistricts().subscribe(res => {
      this.districtNames = res;

      console.log(res);

    })
    //endDstricgetlist
    //statuslist
    this.supplierservice.supplierStatus().subscribe(res =>{
      this.supplierStatus=res;
      console.log(res);
    })
    //end of status list

    

    //province list
    this.supplierservice.getProvince().subscribe(res =>{
      this.provinceList=res;
      console.log(res);
    })

    ///

    //suppliersgetlist
    this.supplierservice.getSuppliers().subscribe(data => {
      console.log(data);

      this.li = data;
    
      this.lis = this.li;
      this.Status = this.lis[0].Status;
      console.log(this.lis);
      this.dtTrigger.next();
      if (this.lis.length > 0) {
        this.noDisputes = false;
      } else {
        this.noDisputes = true;
      }

    }, err => {
      console.log(err);
      this.noDisputes = true;
    })
  }
  //suppliersgetlist







  //create supplier Modal
  openEditModel3(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });
    //end of create supplier modal






  }//view per supplier modal
  openEditModel2(content, id, index) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);


    }).catch((res) => { });
    console.log(this.lis[index])
    this.supplierservice.getSupplierById(id).subscribe(data => {
    console.log(data);
    this.supplierId = id;
    this.districtCodeEdit = data[0].districtCode
    
    this.supplierNameEdit = data[0].supplierName
    this.venderNoEdit = data[0].vendorNo
    this.emailEdit = data[0].emailAddress
    this.telephoneEdit = data[0].telephoneNo
    this.Address1Edit =data[0].line1Address
    this.Address2 = data[0].line2Address
    this.townEdit = data[0].town
    this.CityEdit = data[0].city
    this.ProvinceEdit =data[0].province
    this.PostalCodeEdit = data[0].postalCode
    this.nameEdit = data[0].contactPersonName
    this.surnameEdit = data[0].contactPersonSurname
    this.contactNoEdit = data[0].contactNo
    this.csdNoEdit = data[0].csdNumber
    this.startDateEdit = moment(data[0].contractStartDate).format('YYYY-MM-DD');
    this.endDateEdit = moment(data[0].contractEndDate).format('YYYY-MM-DD');
    this.Status = data[0].status;
    this.assignedSchool = data[0].assignedSchool.split(',')
    if( data[0].districtName )
    {
      this.districtNameEdit=data[0].districtName 
    }
    })
    
  }

  ///// End view per supplier modal

  ///update per supplier modal
  openEditModel1(content, id, index) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });

    this.supplierservice.getSupplierById(id).subscribe(data => {
      this.supplierId = id
      this.districtCode = data[0].districtCode
      this.districtName = data[0].districtName
      this.supplierName = data[0].supplierName
      this.venderNo = data[0].vendorNo
      this.email = data[0].emailAddress
      this.telephone = data[0].telephoneNo
      this.Address1 = data[0].line1Address
      this.Address2 = data[0].line2Address
      this.town = data[0].town
      this.City = data[0].city
      this.Province = data[0].province
      this.PostalCode = data[0].postalCode
      this.name = data[0].contactPersonName
      this.surname = data[0].contactPersonSurname
      this.contactNo = data[0].contactNo
      this.csdNo = data[0].csdNumber
      this.startDate = moment(data[0].contractStartDate).format('YYYY-MM-DD');
      this.endDate = moment(data[0].contractEndDate).format('YYYY-MM-DD');
      this.Status = data[0].status
      this.assignedSchool = data[0].assignedSchool.replaceAll(',','\n');
      console.log(this.districtName);


    })

    //////update per supplier modal

    ///

  }
update(){
  let relDoc = [];

 /* for (var key in this.assignedSchool) {

    if (this.assignedSchool.hasOwnProperty(key)) {

      relDoc.push(this.assignedSchool[key].institutionName)

    }

  } */
 //this.assignedSchool=relDoc.toString();
 console.log(this.assignedSchool);
 this.getFormValidationErrorsEdit()
 if(this.FormEdit.valid){

 
 this.info = ({
  supplierId: this.supplierId,
// districtCode:this.districtName.split(' ').slice(0,2).map(n => n[0].toUpperCase()).join(''),
  districtCode: this.districtCodeEdit,
  districtName: this.districtNameEdit,
  supplierName: this.supplierNameEdit,
  vendorNo: this.venderNoEdit,
  emailAddress: this.emailEdit,
  telephoneNo: this.telephoneEdit,
  line1Address: this.Address1Edit,
  line2Address: this.Address2Edit,
  town: this.townEdit,
  city: this.CityEdit,
  province: this.ProvinceEdit,
  postalCode: this.PostalCodeEdit,
  contactPersonName: this.nameEdit,
  contactPersonSurname: this.surnameEdit,
  contactNo: this.contactNoEdit,
  csdNumber: this.csdNoEdit,
  contractStartDate: this.startDateEdit,
  contractEndDate: this.endDateEdit,
  status: this.Status,
  assignedSchool:this.assignedSchool.toString()

});

Swal.fire({

  title: 'Are you sure you want to Update Supplier',

  text: 'A Supplier Will Updated',

  icon: 'question',

  showCancelButton: true,

  confirmButtonText: 'Yes',

  cancelButtonText: 'No'



}).

then((result) => {

  if (result.value) {    

  //nompumeleo



 // this.supplierservice.AddSupplier(data).subscribe(res => {
   // console.log("success")

 // });
 
 this.supplierservice.UpdateSupplier(this.info).subscribe(res => {
  //email
  console.log("success")
 })



Swal.fire({
 title: 'New Supplier Update?',
 text: "You wanna send this form!",
 icon: 'question',
 showCancelButton: true,
 confirmButtonText: 'Yes',
 cancelButtonText: 'No'
}).then((result) => {
 if (result.isConfirmed) {
   Swal.fire({
     position: 'center',
     icon: 'success',
     title: 'Your entry has been saved'

   }).then(result => {
     if (result.value || result.isDismissed) {

     window.location.reload();
     }
   });

 } else if (

   result.dismiss === Swal.DismissReason.cancel
 ) {
   Swal.fire(
     'Cancelled',
     'Your entry was cancelled:)',
     'error'
   )
 }
})



///Nompumelelo





        Swal.fire({

          timer: 5000,

          confirmButtonText: 'Ok',

          cancelButtonText: 'No',

          title: "Successful",

          text: 'A Supplier  Will be successfully Updated',

         

          icon: 'success'

        }).then(result => {

          this.modalService.dismissAll();

          if (result.value || result.isDismissed  ) {

           window.location.reload()

          }

        });

   



 

   

    }

})

} else if (this.FormEdit.invalid) {
console.log("Activity not created");

}

this.isFormSubmitted = true;
}
  ///update supplier
  //////end of update supplier

  ///
  openEditModel4(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });

  }

 
 
  //get school list
  selectCode(event) {
    let selected = event.target.value;
    this.assignedSchool="";
   // selected ;
  
    console.log(selected)

    this.supplierservice.getSchoolEmailsByDistrict(selected).subscribe((list: any) => {
    this.list2=list;
     
    })
     

   




    


  }
  //End get school list

  //get formcontrol validation
  get Form() {
    return this.requiredForm.controls;
  }
  get Forms() {
    return this.FormEdit.controls;
  }
  //  //get formcontrol validation
 getFormValidationErrorsEdit() {

    // console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

    let totalErrors = 0;

    Object.keys(this.FormEdit.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.FormEdit.get(key).errors;
      if (controlErrors != null) {
        totalErrors++;
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });

    console.log('Number of errors: ', totalErrors);
  }
  //create new supplier submit
  getFormValidationErrors() {

    // console.log('%c ==>> Validation Errors: ', 'color: red; font-weight: bold; font-size:25px;');

    let totalErrors = 0;

    Object.keys(this.requiredForm.controls).forEach(key => {
      const controlErrors: ValidationErrors = this.requiredForm.get(key).errors;
      if (controlErrors != null) {
        totalErrors++;
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });

    console.log('Number of errors: ', totalErrors);
  }
  //End create new supplier submit
  onSubmit(){
      this.getFormValidationErrors();
    if (this.requiredForm.valid && this.uniqueCellNumber==false && this.uniqueVendorNo==false) {
    
     
  let data = {  

    
    supplierName: this.supplierName,
    vendorNo: this.venderNo,
    emailAddress: this.email,
    telephoneNo: this.telephone,
    line1Address: this.Address1,
    line2Address: this.Address2,
    town: this.town,
    city: this.City,
    province: this.Province,
    postalCode: this.PostalCode,
    contactPersonName: this.name,
    contactPersonSurname: this.surname,
    contactNo: this.contactNo,
    csdNumber: this.csdNo,
    contractStartDate: this.startDate,
    contractEndDate: this.endDate

 

   

  };  

  console.log(data);

Swal.fire({

    title: 'Are you sure you want to Add New Supplier',

    text: 'A New Supplier Will Created',

    icon: 'question',

    showCancelButton: true,

    confirmButtonText: 'Yes',

    cancelButtonText: 'No'



  }).

  then((result) => {

    if (result.value) {    

    //nompumeleo

 

    this.supplierservice.AddSupplier(data).subscribe(res => {
      console.log("success")

    });

    this.supplierservice.getbyVendNo(this.venderNo).subscribe(res => {
      console.warn(res);
      this.li = res;
      this.lis = this.li;
      this.supplierId = this.lis[0].supplierId,
        this.supplierName = this.lis[0].supplierName,
        this.districtName = this.lis[0].districtName,
        this.districtCode = this.lis[0].districtCode,
        this.assignedSchool = this.lis[0].assignedSchool,
        this.supplierId = this.lis[0].supplierId,
        this.venderNo = this.lis[0].vendorNo,
        this.email = this.lis[0].emailAddress,
        this.telephone = this.lis[0].telephoneNo,
        this.Address1 = this.lis[0].line1Address,
        this.Address2 = this.lis[0].line2Address,
        this.town = this.lis[0].town,
        this.City = this.lis[0].city,
        this.Province = this.lis[0].province,
        this.PostalCode = this.lis[0].postalCode,
        this.name = this.lis[0].contactPersonName,
        this.surname = this.lis[0].contactPersonSurname,
        this.contactNo = this.lis[0].contactNo,
        this.csdNo = this.lis[0].csdNumber,
        this.startDate = moment(this.lis[0].contractStartDate).format('YYYY-MM-DD'),
        this.endDate = moment(this.lis[0].contractEndDate).format('YYYY-MM-DD'),
        this.Status = this.lis[0].status,
        this.password = this.lis[0].password


      this.supplierservice.sendActivateEmail(this.venderNo, this.supplierId, this.password).subscribe(res => {
        console.log("sucess new mail")
        console.log(res);
      })
    })

  ///Nompumelelo

 



          Swal.fire({

            timer: 5000,

            confirmButtonText: 'Ok',

            cancelButtonText: 'No',

            title: "Successful",

            text: 'New Supplier  has been successfully Created',

           

            icon: 'success'

          }).then(result => {

            this.modalService.dismissAll();

            if (result.value || result.isDismissed  ) {

              window.location.reload()

            }

          });

     



   

     

      }

  })

} else if (this.requiredForm.invalid) {
  console.log("Activity not created");

}

this.isFormSubmitted = true;

}
getday(): string {
     
  this.startDate=this.startDate
 // this.minDate=new this.minDate().toISOString().split('T')[0] 
  return this.startDate
}
getdayEdit(): string {
     
  this.startDateEdit=this.startDateEdit
 // this.minDate=new this.minDate().toISOString().split('T')[0] 
  return this.startDateEdit
}
fieldChange() {


  
  if (this.contactNo[0] != "0") {
    this.isNumberInvalid = true;
  } else {
    this.isNumberInvalid = false;
  }
  
  if (this.contactNoEdit[0] != "0") {
    this.isNumberInvalid = true;
  } else {
    this.isNumberInvalid = false;
  }

}
NumberChange() {


  
  if (this.telephone[0] != "0") {
    this.isTelephoneInvalid = true;
  } else {
    this.isTelephoneInvalid = false;
  }
   
  if (this.telephoneEdit[0] != "0") {
    this.isTelephoneInvalid = true;
  } else {
    this.isTelephoneInvalid = false;
  }

}
  //test etheral email
 
  //End test etheral email
  uniqueCellNumber:boolean;
  uniqueMailAdress:boolean;
  uniqueVendorNo:boolean;
 public  checkResult:boolean;

  uniqueCell(telephone) {

   
this.supplierservice.tellExist(telephone).subscribe((result:boolean)=>
  {
    this.checkResult= result;
      if(this.checkResult==true){
        this.uniqueCellNumber=false;

      }else{
        this.uniqueCellNumber=true;
      }
    
    

  })





  }
  uniqueCellEdit(telephoneEdit) {

   
    this.supplierservice.tellExist(telephoneEdit).subscribe((result:boolean)=>
      {
        this.checkResult= result;
          if(this.checkResult==true){
            this.uniqueCellNumber=false;
    
          }else{
            this.uniqueCellNumber=true;
          }
        
        
    
      })
    
    
    
    
    
      }
    

  //Unique email

  uniqueemail(email) {

    let filtered;



    filtered = this.lis.filter(function (e) {

      return [email] == (e.emailAddress)

    });



    if (filtered.length > 0) {

      this.uniqueMailAdress = true;

      /*  Swal.fire(

          'Confirmation!',

          'Handover Checklist saved.',

          'success'

        )*/



    } else {

      this.uniqueMailAdress == false;



    }

    




  }
  uniqueVendEdit(venderNoEdit){
    this.supplierservice.VendoExist(venderNoEdit).subscribe((result:boolean)=>{
     
      this.checkResult= result;
      if(this.checkResult==true){
        this.uniqueVendorNo=false;

      }else{
        this.uniqueVendorNo=true;
      }
    
      console.log(this.uniqueVendorNo);

    })
 

  }

  //Unique Vendor
  uniqueVende(venderNo){
    this.supplierservice.VendoExist(venderNo).subscribe((result:boolean)=>{
     
      this.checkResult= result;
      if(this.checkResult==true){
        this.uniqueVendorNo=false;

      }else{
        this.uniqueVendorNo=true;
      }
    
      console.log(this.uniqueVendorNo);

    })
 

  }
  Cancel() {
    this.requiredForm.reset();
    this.isFormSubmitted = false;

    this.modalService.dismissAll();
    this.requiredForm.controls["supplierName"].setValue("");
    this.requiredForm.controls["venderNo"].setValue("");
    this.requiredForm.controls["email"].setValue("");
    this.requiredForm.controls["telephone"].setValue("");
    this.requiredForm.controls["Address1"].setValue("");
    this.requiredForm.controls["Address2"].setValue("");
    this.requiredForm.controls["town"].setValue("");
    this.requiredForm.controls["name"].setValue("");
    this.requiredForm.controls["City"].setValue("");
    this.requiredForm.controls["Province"].setValue("");
    this.requiredForm.controls["PostalCode"].setValue("");
    this.requiredForm.controls["name"].setValue("");
    this.requiredForm.controls["surname"].setValue("");
  
    this.requiredForm.controls["contactNo"].setValue("");
    this.requiredForm.controls["csdNo"].setValue("");
    this.requiredForm.controls["startDate"].setValue("");
    this.requiredForm.controls["endDate"].setValue("");
    this.requiredForm.controls["districtName"].setValue("");
    this.requiredForm.controls["Status"].setValue("");
    this.requiredForm.controls["assignedSchool"].setValue("");
  }
  CancelEdit() {
    this.FormEdit.reset();
    this.isFormSubmitted = false;

    this.modalService.dismissAll();
    this.FormEdit.controls["supplierNameEdit"].setValue("");
    this.FormEdit.controls["venderNoEdit"].setValue("");
    this.FormEdit.controls["emailEdit"].setValue("");
    this.FormEdit.controls["telephoneEdit"].setValue("");
    this.FormEdit.controls["Address1Edit"].setValue("");
    this.FormEdit.controls["Address2Edit"].setValue("");
    this.FormEdit.controls["townEdit"].setValue("");
    this.FormEdit.controls["nameEdit"].setValue("");
    this.FormEdit.controls["CityEdit"].setValue("");
    this.FormEdit.controls["ProvinceEdit"].setValue("");
    this.FormEdit.controls["PostalCodeEdit"].setValue("");
    this.FormEdit.controls["nameEdit"].setValue("");
    this.FormEdit.controls["surnameEdit"].setValue("");
  
    this.FormEdit.controls["contactNoEdit"].setValue("");
    this.FormEdit.controls["csdNoEdit"].setValue("");
    this.FormEdit.controls["startDateEdit"].setValue("");
    this.FormEdit.controls["endDateEdit"].setValue("");
    this.FormEdit.controls["assignedSchool"].setValue("");
    this.FormEdit.controls["Status"].setValue("");
  }

  clearSchool(assignedSchool)
  {
     this.assignedSchool="";
  }
  


}