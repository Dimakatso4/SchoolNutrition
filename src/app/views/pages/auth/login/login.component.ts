import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
import { LoadingHandler } from 'src/app/model/loading-handler';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loadingHandler = new LoadingHandler();

  returnUrl: any;
  accountType = "employee";

  public usernumber;
  public password;
  public  VendorNo;
  public id:any
  public emisNumber:any
  lis=[]
li:any;
  public data:any
  public contactPersonName:any
  public contactPersonSurname:any
  public roleName:any
  public districtCode:any
  response;
  error = false;
  public multipleRoles: Boolean;
  employee;
  role;
  public roles;
  public userRole = "";
  public isFormSubmitted: Boolean;
  public isRoleSelected: Boolean;
  public status:any
  public supplierStatus="";
  public supplier ="";

  public userStatus = "";
  arrayStatus = [];
  public distName : any;

  state: RouterStateSnapshot

  constructor(private router: Router, private route: ActivatedRoute, private authservice: AuthService, 
    private appService: AppService, private userService: UsersService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.appService.setIsLoggedInUser('false');
    sessionStorage.clear();
    this.isFormSubmitted = false;
    this.isRoleSelected = false;
    this.userRole = "";

    if (this.appService.getUserHasMultipeRoles() == "true") {
      this.authservice.getUserRoleById(this.appService.getLoggedInUserId()).subscribe(role => {
        this.multipleRoles = true;
        this.roles = role;
      }, err => {
        console.log(err);
        Swal.fire({
          title: 'Error',
          text: 'Sorry! there is no response from server, please try again later',
          icon: 'error'
        }).then((res) => {
          if (res.value || res.isDismissed) {
            this.router.navigate(['/auth/login']);
          }
        })
      })
    } else {
      this.multipleRoles = false;
    }

  }

  monitorLogin() {
    // sessionStorage.setItem('accountType', "monitor");
    // this.router.navigate(['/auth/userlogin']);
    this.router.navigate(['/auth/userlogin'], { queryParams: { login: 'monitor' } });
  }

  fieldChange() {
    this.error = false;
  }

  onLoggedin() {

    this.loadingHandler.start();
    this.error = false;
    
    if (this.usernumber && this.password) {
//Nompumelelo
      if(this.usernumber.length == 10)
      { this.emisNumber=123425;
        let loginUser = {
          VendorNo: this.usernumber,
          password: this.password
        

        }
       this.authservice.getSupplierByVendorNo(loginUser.VendorNo).subscribe(data=>{
        this.li=data;
        this.lis=this.li;
        this.supplierStatus=this.lis[0].status
        console.log(this.supplierStatus);
        this.contactPersonName=this.lis[0].contactPersonName
        this.contactPersonSurname=this.lis[0].contactPersonSurname
        this.roleName=this.lis[0].roleName
        this.supplier=this.lis[0].supplierName
        console.log(this.supplier);
       // this.districtCode=this.lis[0].districtCode
       // this.response =123432;
   
        console.log(data);
        console.log(this.contactPersonName);
        console.log(this.contactPersonSurname);
        this.appService.setLoggedInUserId(loginUser.VendorNo);
        console.log(loginUser.VendorNo);
        this.appService.setIsLoggedInUser('true');

        let name = this.contactPersonName;
        let surname = this.contactPersonSurname;

        if (!name || name == null) {
          name = "";
        }

        if (!surname || surname == null) {
          surname = "";
        }

        this.appService.setIsLoggedInUsername(this.contactPersonName + " " + this.contactPersonSurname);
        this.appService.setLoggedInUserRole(this.roleName);
        
       console.log(this.supplier);
        //console.log(this.districtCode);
     if(this.supplierStatus =='Suspended'||this.supplierStatus =='Deactivated')
     {
     console.log("suspect");
     this.router.navigate(['/Commuque-Supplier']);
         
       } else {
        //this.appService.setLoggedInDistrictCode(this.districtCode);
      
        this.router.navigate(['../../dashboard']);
         console.log("sucessful");
         
       } 

        }, err => {
          console.log(err)
          this.error = true;
       })
      }
//nompumelelo
      if (this.usernumber.length == 13) {
        let loginUser = {
          idNumber: this.usernumber,
          password: this.password
        }

        this.authservice.authenticateEmployeeByIDNumber(loginUser).subscribe(res => {
          this.response = res;
          console.log(res);
          this.appService.setLoggedInUserId(this.response.id);
          console.log(JSON.stringify(this.response.user));
          this.appService.setIsLoggedInUser('true');

          let name = this.response.firstname;
          let surname = this.response.surname;

          if (!name || name == null) {
            name = "";
          }

          if (!surname || surname == null) {
            surname = "";
          }

          this.appService.setIsLoggedInUsername(name + " " + surname);

          this.authservice.getUserRoleById(this.response.id).subscribe((role: any) => {
            console.log(role);
            this.roles = role;
            if (role.length > 1) {
              this.multipleRoles = true;
              this.router.navigate(['/auth/login'], { queryParams: { id: this.usernumber } });
            } else {
              this.appService.setLoggedInUserRole(this.roles.roleName);

              if (this.roles.emisCode) {
                this.appService.setLoggedInEmisCode(this.roles.emisCode);
              } else {
                this.appService.setLoggedInEmisCode(this.response.emisNumber);
              }

              if (this.roles.districtCode) {
                this.appService.setLoggedInDistrictCode(this.roles.districtCode);
              } else {
                this.appService.setLoggedInDistrictCode(this.response.districtCode);
              }
              this.router.navigate(['../../dashboard']);

            }


          }, err => {
            console.log(err);
            this.error = true;
          })

        }, err => {
          console.log(err)
          this.error = true;
        })

      } else {

        let loginUser = {
          persal: this.usernumber,
          password: this.password
        }


        this.authservice.authenticatePersal(loginUser).subscribe(res => {
          this.response = res;

          this.userStatus = this.response.status;
          if(this.userStatus == 'Deactivated'){
            Swal.fire(
                  'Account Deactivated',
                  'Your account is not active, Please contact system admin for assistance',
                  'info'
            ).then((res) => {
              if (res.value || res.isDismissed) {
                window.location.reload();
                this.router.navigate(['/auth/login']);
              }
            })
          }else{
            this.userStatus = this.response.status;
            console.log( this.userStatus);
  
            console.log(res);
            this.appService.setLoggedInUserId(this.response.id);
            this.appService.setIsLoggedInUser('true');
  
            let name = this.response.firstname;
            let surname = this.response.surname;
  
            if (!name || name == null) {
              name = "";
            }
  
            if (!surname || surname == null) {
              surname = "";
            }             
          
            this.appService.setIsLoggedInUsername(name + " " + surname);
            this.appService.setLoggedInUserRole(this.response.position);
            this.appService.setLoggedInEmisCode(this.response.emisCode);
            this.appService.setLoggedInEmisCode(this.response.emisNumber);
            this.appService.setLoggedInDistrictCode(this.response.districtCode);
            this.appService.setLoggedInPersalNumber(this.response.persal);
            this.appService.setLoggedInDistrictName(this.distName);
            this.appService.setLoggedInUserIdentity(this.response.idNumber);
            this.appService.setLoggedInOfficeLevel(this.response.level);
            this.appService.setLoggedInRegion(this.response.region);
            
            this.router.navigate(['../../dashboard']);
  
            this.loadingHandler.finish();
          }

        }, err => {
          
          console.log(err)
          this.error = true;
        })
      }

    }

    this.isFormSubmitted = true;
  }

  getDistrictName(districtCode){
    this.userService.getDistrictNameByCode(districtCode).subscribe((res:any) => {
      this.distName = res[0].districtName;
      console.log(this.distName)
    })
  }

  signup() {
    this.router.navigate(['/auth/userlogin']);
  }

  selectRole() {

    console.log(this.roles[this.userRole])
    if (this.userRole) {
      this.appService.setLoggedInUserRole(this.roles[this.userRole].roleName);
      this.appService.setLoggedInDistrictCode(this.roles[this.userRole].districtCode);
      this.appService.setLoggedInEmisCode(this.roles[this.userRole].emisCode);
      this.appService.setUserHasMultipeRoles('true')
      this.router.navigate(['/dashboard']);

    }
    this.isRoleSelected = true;
  }

  goBack() {
    sessionStorage.clear();
    localStorage.clear();
    this.multipleRoles = false;
    this.appService.setUserHasMultipeRoles('false');
    this.appService.setIsLoggedInUser('false');
    this.router.navigate(['/auth/login']);

  }

}
