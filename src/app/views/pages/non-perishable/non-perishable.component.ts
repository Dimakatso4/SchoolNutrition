
import { Component, OnInit, ViewChild } from '@angular/core';
//import { NonPerishableService } from './non-perishable.service';

import { AppService } from 'src/app/app.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import {Subject} from 'rxjs';
import { NonPerishableService } from './non-perishable.service';

@Component({
  selector: 'app-non-perishable',
  templateUrl: './non-perishable.component.html',
  styleUrls: ['./non-perishable.component.scss']
})
export class NonPerishableComponent implements OnInit {

  public oil:boolean = false;
  public salt:boolean = false;
  public milk:boolean = false;
  public tomato:boolean = false;
  public mince:boolean = false;
  public beans:boolean = false;
  public vanilla:boolean = false;
  public strawberry:boolean = false;
  public sorghum:boolean = false;
  public meal:boolean = false;
  public rice:boolean = false;
  public samp:boolean = false;
  

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
 public surname: any
 public csdNo: any
 public startDate:any
 public endDate: any
 public Status
public supplier: any;


  

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor(private fb: FormBuilder,
    private modalService: NgbModal,
    private appservice: AppService,
    public formBuilder: FormBuilder) {
   
  }



  public Green:boolean = false;
  public Yellow:boolean=false;
  public Carrots:boolean=false;
  public Onions :boolean=false;
  public Tomatoes :boolean=false;
  public buttonName:any = 'Show';

 

  ngOnInit(): void {
       

   
  }

   toggleGreen() {

   this.Green = !this.Green;

    // CHANGE THE NAME OF THE BUTTON.

    if(this.Green)  

    this.buttonName = "Hide";

  else

   this.buttonName = "Show";
 }

 //
 toggleYellow() {

  this.Yellow = !this.Yellow;

   // CHANGE THE NAME OF THE BUTTON.

   if(this.Yellow)  

   this.buttonName = "Hide";

 else

  this.buttonName = "Show";
}
//
toggleCarrots() {

  this.Carrots = !this.Carrots;

   // CHANGE THE NAME OF THE BUTTON.

   if(this.Carrots ) 

   this.buttonName = "Hide";

 else

  this.buttonName = "Show";
}
//

toggleOnions() {

  this.Onions = !this.Onions;

   // CHANGE THE NAME OF THE BUTTON.

   if(this.Onions ) 

   this.buttonName = "Hide";

 else

  this.buttonName = "Show";
}
//


toggleTomatoes() {

  this.Tomatoes = !this.Tomatoes;

   // CHANGE THE NAME OF THE BUTTON.

   if(this.Tomatoes ) 

   this.buttonName = "Hide";

 else

  this.buttonName = "Show";
}
  openEditModel1(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
     console.log("Modal closed" + result);
    
 }).catch((res) => { });

  }

  openEditModel2(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
   console.log("Modal closed" + result);
    
   }).catch((res) => { });

   }
  }
    // this.isFormSubmitted = true;
    // Swal.fire({
    //   timer: 3500,
    //   title: "Unsuccessful",
    //   text: 'Your entry was unsuccessful, please try again',
    //   icon: 'error'
    // });