
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {Roles} from '../../../core/util/user-roles/user-roles';
import { catchError, map } from 'rxjs/operators';
import { Roles } from 'src/app/model/role';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private appService: AppService) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });


  base_url = environment.base_url;
  userId;

  authenticatePersal(jsonData) {
    return this.http.post(this.base_url + "api/Login/AuthenticateOfficial", jsonData, { headers: this.Header })
  }

  authenticateEmployeeByIDNumber(jsonData) {
    return this.http.post(this.base_url + "api/Login/AuthenticateSGB", jsonData, { headers: this.Header })
  }

  authenticateIDNumber(jsonData) {

    return this.http.post(this.base_url + "api/Login/AuthenticateSGB", jsonData, { headers: this.Header })
  }

  AuthenticateOTP(idnumber, phonenumber, otp) {
    // console.log(this.base_url + "api/SMS/AuthenticateOTP?MobileNumber=" + phonenumber + "&OTP=" + otp)
    console.log(this.base_url + "api/Login/AuthenticateParent?IDNumber=" + idnumber + "&MobileNumber=" + phonenumber + "&OTP=" + otp)
    return this.http.post(this.base_url + "api/Login/AuthenticateParent?IDNumber=" + idnumber + "&MobileNumber=" + phonenumber + "&OTP=" + otp, { headers: this.Header })
  }

  sendOTP(IDnumber) {
    return this.http.get(this.base_url + "api/SMS/SendOTP?IDNumber=" + IDnumber)
  }

  sendUserOTP(persalNumber) {
    return this.http.get(this.base_url + "api/SMS/SendUserOTP?Persal=" + persalNumber)
  }

  resendOTP(id) {
    return this.http.get(this.base_url + "ResendOTP?Id=" + id, { headers: this.Header })
  }

  getSchoolByParentId(id) {
    return this.http.get(this.base_url + "api/Parent/GetChildrenSchoolByParentId?ParentId=" + id, { headers: this.Header })
  }

  getScheduledNominationByEmisCode(emisCode, date) {
    // console.log(this.base_url + "api/Nomination/GetScheduledNominationByEmisCode?EmisCode=" + emisCode + "&currentDate=" + date)
    return this.http.get(this.base_url + "api/Nomination/GetScheduledNominationByEmisCode?EmisCode=" + emisCode + "&currentDate=" + date)
  }

  public getSession(): Promise<boolean> {
    const session = this.appService.getIsLoggedInUser();
    return new Promise((resolve, reject) => {
      if (session) {
        return resolve(true);
      } else {
        return reject(false);
      }
    });
  }

  public getUserRoles(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      this.userId = this.appService.getLoggedInUserId();

      if (this.userId === null)
        return [];
      // else {

      //   this.http.get(`${this.base_url}api/User/UserRole?Id=${this.userId}`)
      //     .pipe(catchError((error: any, caught: any) => {
      //       reject(error);
      //       return caught;
      //     }),
      //       map((res: any) => res))
      //     .subscribe((role: any[]) => {
      //       console.log(role);
      //       if (role.length == 1) {
      //         this.appService.setLoggedInUserRole(role[0].roleName);
      //       }
      //       resolve(role);
      //     }, err => {
      //       console.log(err);
      //       return [];
      //     });
      // }

    });
  }

  public areUserRolesAllowed(userRoles: string[], allowedUserRoles: Roles[]): boolean {
    for (const role of userRoles) {
      for (const allowedRole of allowedUserRoles) {
        if (role.toLowerCase() === allowedRole.toLowerCase()) {
          return true;
        }
      }
    }
    return false;
  }

  checkIfParentNominated(id) {
    return this.http.get(this.base_url + "api/User/CheckIfParentNominatedSeconded?UserId=" + id);
  }

  IsParentRegistered(idnumber) {
    return this.http.get(this.base_url + "api/User/IsParentRegistered?IDNumber=" + idnumber);
  }

  AddParentToUsers(idnumber) {
    console.log(this.base_url + "api/User/AddParentToUsers?IDNumber=" + idnumber)
    return this.http.post(this.base_url + "api/User/AddParentToUsers?IDNumber=" + idnumber, { headers: this.Header });
  }


  getUserRoleById(id) {
    //return this.http.get(this.base_url + "api/User/UserRole?userId=" + id);
    return this.http.get(this.base_url + "api/User/UserRole?Id=" + id);
  }

  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?id=" + id);

  }
  //Nompumelelo
  activateSupplier(VendorNo,  password)
  {
  
   // console.log("this is vendor"+vendNo);
    //console.log("this new password"+password);
  
    return this.http.post(this.base_url+"api/Supplier/ActivateSupplierLoginProfile?VendorNo="+VendorNo+"&Password="+ password,{ headers: this.Header });
  }
  getSupplierById(id)
  {
    return this.http.get(this.base_url+"api/Supplier/GetSupplierByID?ID=" +id)
  }
  getSupplierByVendorNo(VendorNo)
  {
    return this.http.get(this.base_url+"api/Supplier/GetSupplierByVendorNo?vendorNo="+VendorNo)
  }
  //Nompumeleo


}
