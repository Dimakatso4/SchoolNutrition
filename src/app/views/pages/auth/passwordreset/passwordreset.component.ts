import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { AuthService } from '../auth.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.scss']
})
export class PasswordresetComponent implements OnInit {

  error;
  userNumber;
  response;
  accountType;
  exisitingUser;
  credentials;

  constructor(
    private router: Router, 
    private userservice: UsersService, 
    private authservice: AuthService,
    private appservice: AppService) { }

  ngOnInit(): void {

    this.accountType = "employee";
    this.error = false;
  }

  fieldChange() {
    this.error = false;
  }


  verifyIDnumber() {

    this.error = false;
    console.log(this.userNumber)

    if (this.userNumber != "") {
      if (this.accountType == "employee") {
        //persal number

        this.userservice.getEmployeeByPersalOrIDNumber(this.userNumber).subscribe((res: any) => {

          this.exisitingUser = res;
          console.log(res)

          if (res == null) {
            this.error = true;
          } else {

            this.userservice.generatePasswordById(this.exisitingUser.id).subscribe(mail => {

              this.userservice.sendResetEmail(this.exisitingUser.firstname + " " + this.exisitingUser.surname, this.exisitingUser.id).subscribe(mail => {
                console.log(mail);

                //reset pass sms
                this.userservice.sendResetPasswordSMS(this.exisitingUser.firstname +" "+ this.exisitingUser.surname, this.exisitingUser.id).subscribe(mail =>{
                  console.log(mail);

                  localStorage.setItem('userNumber', this.userNumber);
                // localStorage.setItem('accounttype', this.accountType);
                  this.appservice.setLoggedInUserRole(this.accountType);
                  localStorage.setItem('cellnumber', this.response);
                  localStorage.setItem('userId', this.exisitingUser.id);
                  localStorage.setItem('mode', 'passwordreset');
                  this.router.navigate(['./auth/reset']);
                })
              
              }, err => {
                console.log(err);
              })



            }, err => {
              console.log(err);
            })
          }




        }, err => {
          console.log(err);
          this.error = true;
        });

      } else {
        //id number

        this.userservice.getSGBByIDNumber(this.userNumber).subscribe(res => {

          this.exisitingUser = res;
          // console.log(res)

          if (this.exisitingUser.emailAddress) {
            this.userservice.sendResetEmail(this.exisitingUser.emailAddress, this.exisitingUser.id).subscribe(mail => {
              console.log(mail);
              this.router.navigate(['./auth/reset']);
              localStorage.setItem('userNumber', this.userNumber);
              // localStorage.setItem('accounttype', this.accountType);
              this.appservice.setLoggedInUserRole(this.accountType);
              localStorage.setItem('cellnumber', this.response);
              localStorage.setItem('userId', this.exisitingUser.id);
              localStorage.setItem('mode', 'passwordreset');
              this.router.navigate(['/auth/reset'])


            }, err => {
              console.log(err)
            })
          } else {

            this.authservice.sendUserOTP(this.userNumber).subscribe(res => {

              this.response = res;
              localStorage.setItem('userNumber', this.userNumber);
              // localStorage.setItem('accounttype', this.accountType);
              this.appservice.setLoggedInUserRole(this.accountType);
              localStorage.setItem('cellnumber', this.response);
              localStorage.setItem('mode', 'passwordreset');
              this.router.navigate(['/auth/reset'])

            }, err => {
              console.log(err)
              this.error = true;
            })

          }



        }, err => {
          console.log(err)
          this.error = true;
        })

      }
    } else {
      this.error = true;
    }



  }

  Cancel() {
    this.router.navigate(['/auth/login'])
  }

}
