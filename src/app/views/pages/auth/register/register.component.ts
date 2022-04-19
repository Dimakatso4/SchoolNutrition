import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { AuthService } from  '../auth.service';
import { FormBuilder, FormGroup } from "@angular/forms"
declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  returnUrl: any;
  inputUserId: any;
  inputEmail: any;
  inputPassword: any;
  idnumber: any;
  myStorage: any;
  response: any;
  error;

  constructor(private router: Router, 
    private route: ActivatedRoute, 
    private authService: AuthService,
    private formBuilder: FormBuilder
    ) { }
 
  form: FormGroup;

  ngOnInit(): void { 
    this.form = this.formBuilder.group({ 
      inputEmail: "" ,
      inputUserId : "",
      inputPassword : ""
    });
    this.error = false;
  }

  getOtp() {

    this.inputUserId = this.form.controls['inputUserId'].value;    
    this.inputPassword = this.form.controls['inputPassword'].value;
    this.error = false;

    
    this.authService.sendOTP(this.inputUserId).subscribe((res: any) => {
      this.response = res;
      console.log(res.length);

      if(res.length > 1){        
      localStorage.setItem('Cellnumber', res);
      localStorage.setItem('InputUserId', this.inputUserId);
      this.myStorage = localStorage.getItem("Cellnumber");
      this.router.navigate(['./auth/otp'])
      } else {
        console.log("error")
        this.error = true;      
      }
    })
  }

  // onRegister(e) {
  //   e.preventDefault();
  //   this.inputUserId = this.form.controls['inputUserId']?.value;   
  //   localStorage.setItem('isLoggedin', 'true');
  //   if (localStorage.getItem('isLoggedin')) {
  //     this.router.navigate(['/']);
  //   }
  // }

}
