import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { DonationService } from 'src/app/views/pages/donation.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-donation',
  templateUrl: './add-new-donation.component.html',
  styleUrls: ['./add-new-donation.component.scss']
})

export class AddNewDonationComponent implements OnInit {

  public Quantity: any
  public FoodGroup: any
  public Product: any
  public Unit: any

  constructor(private modalService: NgbModal,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddNewDonationComponent>,) {


  }




  ngOnInit(): void {



  }

  openEditModel3(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });







  }//
  openEditModel1(content, id, index) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);


    }).catch((res) => { });

  }

  openEditModel2(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });

  }
  ///
  openEditModel4(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).catch((res) => { });

  }




}

