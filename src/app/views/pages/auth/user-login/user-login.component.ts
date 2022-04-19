import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service'
declare var $: any;


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

  error;
  userNumber;
  response;
  accountType;

  constructor(private router: Router,
    private authservice: AuthService,
    private appservice: AppService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      // login: 'monitor'
      if (params.login == "monitor") {
        this.accountType = "monitor";
      } else {
        this.accountType = "employee";
      }

    });
    this.error = false;
  }

  fieldChange() {
    this.error = false;
  }


  verifyIDnumber() {

    this.error = false;

    if (this.userNumber != "") {
      if (this.accountType == "employee") {
        //persal number

        this.authservice.sendUserOTP(this.userNumber).subscribe(res => {

          this.response = res;

          localStorage.setItem('userNumber', this.userNumber);
          // localStorage.setItem('accountType', this.accountType);
          this.appservice.setLoggedInUserRole(this.accountType);
          localStorage.setItem('cellnumber', this.response);
          this.router.navigate(['/auth/verify-otp'])

        }, err => {
          console.log(err)
          this.error = true;
        })

      } else {
        //id number

        this.authservice.sendOTP(this.userNumber).subscribe(res => {

          this.response = res;
          localStorage.setItem('userNumber', this.userNumber);
          // localStorage.setItem('accountType', this.accountType);
          this.appservice.setLoggedInUserRole(this.accountType)
          localStorage.setItem('cellnumber', this.response);
          this.router.navigate(['/auth/verify-otp']);

        }, err => {
          console.log(err)
          this.error = true;
        })

      }
    } else {
      this.error = true;
    }



  }

}
