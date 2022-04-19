import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirstLoginService } from '../../first-login/first-login.service';
import swal from 'sweetalert2'
import { Router, ActivatedRoute } from '@angular/router';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-confirmreset',
  templateUrl: './confirmreset.component.html',
  styleUrls: ['./confirmreset.component.scss']
})
export class ConfirmresetComponent implements OnInit {

  public temporarypassword;
  public confirmpassword;
  public password;
  validationForm1: FormGroup;
  //usernumber;
  userId;
  isForm1Submitted: Boolean;
  isPasswordValid

  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private loginservice: FirstLoginService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.validationForm1 = this.formBuilder.group({
      temporarypassword: ['', Validators.required],
      password: ["", Validators.required],
      confirmpassword: ['', Validators.required]
    });

    this.route.queryParams.subscribe(params => {

      if (params.userid != undefined) {
        this.userId = params.userid;
        localStorage.setItem("UserId", this.userId);
      }

    });

    if (!localStorage.getItem('userId')) {
      this.router.navigate[('/auth/forgot')]
    } else {

      this.userId = localStorage.getItem('userId');
    }

    this.isForm1Submitted = false;

  }

  fieldChange() {
    this.isPasswordValid = true;

  }

  form1Submit() {
    console.log(localStorage.getItem('userId'))
    if (this.validationForm1.valid) {



      //Check if password is correct

      this.loginservice.validatePassword(this.userId, this.temporarypassword).subscribe(isValid => {
        console.log(isValid)
        this.isPasswordValid = isValid

        if (isValid) {
          //Reset User Password 
          this.loginservice.updateUserPassword(this.userId, this.confirmpassword).subscribe(res => {

            swal.fire({ showConfirmButton: false, timer: 5000, title: 'Password changed successfully', text: "You can now login", icon: 'success' });
            localStorage.clear()
            this.router.navigate(['../auth/login']);

          }, err => {
            console.log(err);
            swal.fire({ showConfirmButton: false, timer: 5000, title: 'Unsuccessfully', text: "There was a problem with activating resetting your password, Please try again", icon: 'error' });

          })

        } else {
          // this.isPasswordValid = true;
        }

      });

      // if (this.userId) {
      //   console.log(this.userId);


      // } 

    }

    this.isForm1Submitted = true;
  }

  get form1() {
    return this.validationForm1.controls;
  }


}
