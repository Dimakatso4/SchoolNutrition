import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup,  Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import { DonationService } from './donation.service';
import { MatDialog } from '@angular/material/dialog';
import { Product, SchoolDonation, ProductReq, SchoolDonationReq } from '../../../model/product.model';

@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent  implements OnInit {
  requiredForm: FormGroup;
  productReq: ProductReq;
  schoolDonationReq: SchoolDonationReq;
  products: Product[] = [];
  // SchoolDonation: SchoolDonation[] = [];
  SchoolDonation: any = [];
  selectedProduct: Product[] = [];
  schoolDonation: SchoolDonation = {
    products: [],
    NoLearners: 0,
    Reason: ''
  };

  schoolDonation1: SchoolDonation = {
    products: [],
    NoLearners: 0,
    Reason: ''
  };
  constructor(private modalService: NgbModal,
              private fb: FormBuilder,
              private donationService: DonationService) {
                this.productReq = new ProductReq();
                this.schoolDonationReq =  new SchoolDonationReq();
              }

  ngOnInit(): void {
    this.myForm();
    this.getProdoctList();
  }

  myForm() {
    this.requiredForm = this.fb.group({
      Quantity1: ['', Validators.required ],
      DateCaptured: ['', Validators.required ],
      NoOfLearners: ['', Validators.required ],
      Reason: ['', Validators.required ],
      Quarantine: ['', Validators.required ],
      Product: ['', Validators.required ],
      FoodGroup: ['', Validators.required ]
    });
 }

getProdoctList(){
  this.donationService.getDonationlist().subscribe((res)=>{
    this.products = res;
    console.log('product list', this.products);
  });
}
 /////GetSchoolDonation
getSchoolDonation(){
  this.donationService.getSchoolDonationlist().subscribe((res)=>{
    this.SchoolDonation = res;
  })
}

// reviewModal
openEditModel3(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
  console.log('Modal closed' + result);

}).catch((res) => { });}


onSubmit() 




{
    if (this.schoolDonation.otherReason) {
      this.schoolDonation.Reason = this.schoolDonation.otherReason;
      this.schoolDonation.otherReason = '';
   }
   this.getSelectedProducts();

   this.postSchoolDonation();

}

postSchoolDonation() {
  this.donationService.postSchoolDonation(this.schoolDonation)
   .subscribe(res => {
     console.log('school donation posted', res);
   }, err => {
     console.log('school donation failed', err);
   });
}

getSelectedProducts() {

  for (const product of this.products) {
    if (product.Quantity > 0) {
      this.selectedProduct.push(product);

      this.productReq = {
        TypeID: product.typeID,
        UnitID: product.unitID,
        FoodGroupID: product.foodGroupID,
        Quantity: product.Quantity,
      }
      this.schoolDonation.products.push(this.productReq);

    }
  }

  if (this.schoolDonation.products.length === 0) {
    Swal.fire({
      title: 'Quantity',
      text: 'Enter atleast one quantity',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  } else {
    console.log('products in not null');
  }

  console.log('selected products', this.schoolDonation);
}


}



// const req: SchoolDonationReq = {
//   FoodGroup: product.foodGroupID,
//   Product: product.typeID,
//   Quantity: product.quantity,
//   Unit: product.unitID,
//   NoLearners: this.schoolDonation.numberOfLeaners,
//   Reason: this.schoolDonation.reason,
//   CaseNo: this.schoolDonation.caseNumber,
// };