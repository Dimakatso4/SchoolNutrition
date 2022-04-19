import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormControl, FormGroup,  Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-sd-delivery-schedule',
  templateUrl: './sd-delivery-schedule.component.html',
  styleUrls: ['./sd-delivery-schedule.component.scss']
})
export class SdDeliveryScheduleComponent implements OnInit {
  requiredForm: FormGroup;
  public supplierName: any
 public email: any
 public telephone: any
  public Address1: any
  public Address2: any
  public town:any
  public City: any
public  Province: any
public PostalCode:any
public name: any
public surname: any
public csdNo: any
public startDate:any
public endDate: any
public Status

  constructor(private modalService: NgbModal, private fb: FormBuilder,private router: Router) {  this.myForm(); }
   

  //Create required field validator for name
   myForm() {
    this.requiredForm = this.fb.group({

      supplierName: ['', Validators.required ],
      email: ['', Validators.required ],
      telephone: ['', Validators.required ],
      Address1: ['', Validators.required ],
      Address2: ['', Validators.required ],
      town: ['', Validators.required ],
      City: ['', Validators.required ],
     Province: ['', Validators.required ],
    PostalCode: ['', Validators.required ],
    name: ['', Validators.required ],
    surname: ['', Validators.required ],
    csdNo: ['', Validators.required ],
    startDate: ['', Validators.required ],
    endDate: ['', Validators.required ],
    Status: ['', Validators.required ]
    
    });
 }



//reviewModal
openEditModel3(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
  console.log("Modal closed" + result);
  
}).catch((res) => { });

  


 


}//
openEditModel1(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
  console.log("Modal closed" + result);
  
}).catch((res) => { });

}
///
///
openEditModel2(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
  console.log("Modal closed" + result);
  
}).catch((res) => { });

}
///
openEditModel4(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
  console.log("Modal closed" + result);
  
}).catch((res) => { });

}
 
 isActivityNameSelected:boolean;

 //Show and hide 
  selectInput(event){
    let selected = event.target.value;
    if(selected =="other"){
      this.isActivityNameSelected =true;
      
    }else{
      this.isActivityNameSelected =false;
    }

 }
 //
 //Show and hide 
 statusResults:boolean;
 selectStatus(event){
  let selected = event.target.value;
  if(selected =="Update"){
    this.statusResults=true;
    
  }else{
    this.statusResults=false;
  }

}
//
 //
// getActivity(){
  
  ngOnInit(){
  
    



 }
 //update

 saveReview()
 {
   
 Swal.fire({
  title: 'Are you sure?',
  text: "You wanna send this form!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText:'Yes, Send it!',
  cancelButtonText:'No, Cancel it!',
  reverseButtons: true
}).then((result) => {
  if (result.isConfirmed)
   {Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Your entry has been saved',
    showConfirmButton: false,
    timer: 1500
  }).then(result => {
    if (result.value || result.isDismissed) {

      this.router.navigate(['/review'])
    }
  });
  
  } else if (
    /* Read more about handling dismissals below */
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


 

}

