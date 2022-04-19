import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierService } from '../supplier.service';
import * as moment from 'moment';

@Component({
  selector: 'app-activate-profile',
  templateUrl: './activate-profile.component.html',
  styleUrls: ['./activate-profile.component.scss']
})
export class ActivateProfileComponent implements OnInit {
  requiredForm: FormGroup;
  isFormSubmitted: Boolean;
  public VendorNo: any
  public newVendNo: any
  public password: any
  public newpassword: any
  public confirmpassword: any
  public info: any
  //
  public data: any

  public supplierName: any
  public email: any
  public telephone: any
  public Address1: any
  public Address2: any
  public town: any
  public City: any
  public Province: any
  public PostalCode: any
  public name: any
  public surname: any
  public csdNo: any
  public startDate: any
  public endDate: any
  public Status: any
  public assignedSchool: any
  public contactNo: any
  public venderNo: any
  public supplierId: any

  public districtCode: any
  public emisNumber: any
  public schools: any
  public districtName: any
  public code: any
  public list2: any
  public institution: any
  public schoolName: any

  lis = []
  li: any;
  noDisputes;
  districtNames: any;
  public status: any
  /* public venderNos: any 
   public supplierIds: any 
   public passwords: any */
  numChars: number = 2;
  public supplierStatus: any
  public provinceList: any
  public venderNos: any = "1234567893";
  public supplierIds: any = 1;
  public passwords: any = "@@";


  constructor(private fb: FormBuilder, private router: Router, private supplierservice: SupplierService) { }

  ngOnInit(): void {
    this.requiredForm = this.fb.group({

      VendorNo: ['', Validators.required],
      password:  ['',  [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*~-])[a-zA-Z0-9!@#$%^&*~-]{8,20}$')]],
      confirmpassword: ['', Validators.required]
    });


    this.isFormSubmitted = false;
    this.supplierservice.getSupplierByVendorNo(this.venderNos).subscribe(res => {
      console.log(res);
    })
  }
  get Form() {
    return this.requiredForm.controls;
  }

  formSubmit() {
    if (this.requiredForm.valid) {

    this.info = ({
      password: this.password,
      VendorNo: this.VendorNo
    
    })
    console.log(this.info)
    this.supplierservice.activateSupplier(this.info.VendorNo,this.info.password).subscribe(res => {
      console.log("success")
    });
    //email
    console.log(this.info.VendorNo)
    this.supplierservice.getSupplierByVendorNo(this.info.VendorNo).subscribe(res => {
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








      this.venderNos = this.venderNo,
        this.supplierIds = this.supplierId,
        this.passwords = this.password,
        console.log(this.venderNos);
      console.log(this.supplierIds);
      console.log(this.passwords);

      this.supplierservice.sendActivateEmail(this.venderNos, this.supplierIds, this.passwords).subscribe(res => {
        console.log("sucess new mail")
        console.log(res);
      })
    })


    Swal.fire({
      title: 'New LogIn Details Update?',
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

            this.router.navigate(['/auth/login']);
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



  }
  this.isFormSubmitted=true;
}


onSubmit(){
  //this.getFormValidationErrors();
if (this.requiredForm.valid ) {

  this.info = ({
    password: this.password,
    VendorNo: this.VendorNo
  
  })  

console.log(this.info);

Swal.fire({

title: 'Are you sure you want to Created Login Details',

text: 'A New Login Will Created',

icon: 'question',

showCancelButton: true,

confirmButtonText: 'Yes',

cancelButtonText: 'No'



}).

then((result) => {

if (result.value) {    

//nompumeleo



this.supplierservice.activateSupplier(this.info.VendorNo,this.info.password).subscribe(res => {
  console.log("success")
});

///Nompumelelo





      Swal.fire({

        timer: 5000,

        confirmButtonText: 'Ok',

        cancelButtonText: 'No',

        title: "Successful",

        text: 'New Login  has been successfully Created',

       

        icon: 'success'

      }).then(result => {

       // this.modalService.dismissAll();

        if (result.value || result.isDismissed  ) {
          this.router.navigate(['/auth/login']);
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
showPassword: boolean = false;

public togglePassword() {
  this.showPassword = !this.showPassword;
}
showConfirm: boolean = false;

public toggleConfirm() {
  this.showConfirm = !this.showConfirm;
}
}

