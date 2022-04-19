import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SupplierService} from '../supplier.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-disclaimer',
  templateUrl: './disclaimer.component.html',
  styleUrls: ['./disclaimer.component.scss']
})
export class DisclaimerComponent implements OnInit {
  results;
  reason;
  error = false;
  certificate;
  fullname;
  userId = this.route.snapshot.params['supplierId'];
  public vendNo:any
  public newVendNo:any
  public password: any
  public  newpassword:any
  public confirmpassword:any

  constructor(private router: Router, private route: ActivatedRoute,private supplierservice:SupplierService) { }

  ngOnInit(): void {
    this.supplierservice.getbyVendNo(this.vendNo).subscribe(res=>{
    },err=>{
      console.log(err)
    })
    this.results = document.getElementsByName('optionsRadios');

    this.fullname = localStorage.getItem('firstname') + " " + localStorage.getItem('surname');

    this.route.queryParams.subscribe(params => {

      if(params.userid != undefined) {
        this.userId = params.userid;
        localStorage.setItem("supplierId",this.userId);
      }

    });
    


  }


  decline() {

  }

  agree() {
    
    if (this.userId == undefined) {
      this.router.navigate(['Activate-Supplier']);
    } else {
      this.router.navigate(['Activate-Supplier']);
    }
    this.vendNo=664;
    this.supplierservice.getbyVendNo(this.vendNo).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err)
    })

  }

  scrollTo(element: any) {
    element.scrollIntoView({ behavior: 'smooth' });
  }

  hideError() {
    this.error = false;
  }

  submitResults() {
    this.error = false
//  console.log(this.re)
    if (this.results == "accept" || this.results == "decline") {

      if (this.results == "accept") {
        console.log("Proceed to create profile");
        this.router.navigate(['./createprofile']);
      } else {
        if (this.reason == '' || this.reason == undefined && this.results == "decline") {
          this.error = true;
        } else {
          console.log("Send Notification to principal");
          this.router.navigate(['./auth/login']);
        }
      }
    }

  }



}
