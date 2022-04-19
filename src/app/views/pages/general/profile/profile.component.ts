import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProfileService } from "../profile.service";
import { Router } from '@angular/router';
import { AppService } from '../../../../app.service';
import { SupplierService } from '../../supplier-management/supplier.service';
import * as moment from 'moment';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public userinfo: any;
  public supplierInfo: any;

  public fullname: any;
  public userID: any;
  public  roleName:any
  // PARENT PROFILE
  public relationship = "";
  public typeOfSchool = "";
  public address1 = "";
  public address2 = "";
  public address3 = "";
  public addressPostalCode = "";
  public postal1 = "";
  public postal2 = "";
  public postal3 = "";
  public postalCode = "";
  //Supplier
public supplierName: any = "";
public email: any = "";
public telephone:  any = "";
 public Address1:  any = "";
 public Address2:  any = "";
 public town: any = "";
 public City:  any = "";
public  Province:  any = "";
public PostalCode: any = "";
public name:  any = "";
public surname:any="";
public districtCode:any ="";
public csdNo:  any = "";
public startDate: any = "";
public endDate:  any = "";
public Status: any = "";
public assignedSchool: any = "";
public contactNo: any = "";
public venderNo: any = "";
public supplierId : any = "";
public info : any = "";
public  password: any = "";

public school: any;
public distName: any;
public position: any;
public emisNumber: any;

public districtName:any
lis=[]
li:any;
//End of Supplier

  constructor(
    private http: HttpClient,
    private userservice: ProfileService,
    private router: Router,
    private appservice: AppService,
    private SupplierService: SupplierService,
    private userService: UsersService
  ) { 
    this.roleName=this.appservice.getLoggedInUserRole();
    console.log(this.roleName);
  }

  ngOnInit(): void {
    
    this.userID = this.appservice.getLoggedInUserId();
    this.roleName=this.appservice.getLoggedInUserRole();
    console.log(this.roleName);
    console.log(this.userID);
    if (this.userID.length==10) {
      this.userservice.getSupplierByVendorNo(this.userID).subscribe(data =>{ 
        this.li=data;
        this.lis=this.li;
        console.log(data);
        this.supplierName=this.lis[0].supplierName,
        this.districtName=this.lis[0].districtName,
        this.districtCode=this.lis[0].districtCode,
        this.assignedSchool=this.lis[0].assignedSchool,
        this.supplierId=this.lis[0].supplierId,
        this.venderNo= this.lis[0].vendorNo,
        this.email=this.lis[0].emailAddress,
       this.telephone=this.lis[0].telephoneNo,
       this.Address1=this.lis[0].line1Address,
       this.Address2=this.lis[0].line2Address,
      this.town=this.lis[0].town,
      this.City=this.lis[0].city,
      this.Province=this.lis[0].province,
      this.PostalCode=this.lis[0].postalCode,
      this.name=this.lis[0].contactPersonName,
      this.surname=this.lis[0].contactPersonSurname,
       this.contactNo=this.lis[0].contactNo,
       this.csdNo=this.lis[0].csdNumber,
       this.startDate=moment(this.lis[0].contractStartDate).format('YYYY-MM-DD'),
       this.endDate=moment(this.lis[0].contractEndDate).format('YYYY-MM-DD'),
       this.Status=this.lis[0].status,
       this.roleName=this.lis[0].roleName
        console.log(this.supplierName);
        console.log(this.districtName);
        console.log(this.districtCode);
        console.log(this.assignedSchool);
        console.log(this.supplierId);
        console.log(this.venderNo);
        console.log(this.email);
        console.log(this.telephone);
        console.log(this.Address1);
        console.log(this.Address2);
        console.log(this.town);
        console.log(this.Province);
        console.log(this.City);
        console.log(this.PostalCode);
        console.log(this.name);
        console.log(this.surname);
        console.log(this.contactNo);
        console.log(this.csdNo);
        console.log(this.startDate);
        console.log(this.endDate);
        console.log(this.roleName);
      
       
    
      

   })
      //asign new values
     

    }
      //endof if
    this.userservice.getSupplierByVendorNo(this.appservice.getLoggedInUserId()).subscribe((res: any) => {
     // console.log(res);
      this.supplierInfo=res
      console.log(this.supplierInfo);
      console.log(this.supplierInfo.supplierName);
    })
    this.userinfo = {
      cellNumber: "",
      city: "",
      complex: "",
      designation: "",
      districtCode: "",
      emailAddress: "",
      emisNumber: "",
      experience: "",
      firstname: "",
      gender: "",
      house: "",
      idNumber: "",
      informalsettlement: false,
      nationality: "",
      persal: "",
      provinceId: "",
      qualification: "",
      section: "",
      street: "",
      surname: "",
    }

    this.userID = this.appservice.getLoggedInUserId();
    this.fullname = this.appservice.getIsLoggedInUsername();
    this.roleName=this.appservice.getLoggedInUserRole();
    this.districtCode = this.appservice.getLoggedInDistrictCode();
    this.emisNumber = this.appservice.getLoggedInEmisCode();

    console.log(this.roleName);

    this.userService.getDistrictNameByCode(this.districtCode).subscribe((res:any) => {
      this.distName = res[0].districtName;
    })

    this.userService.getSchoolByEmisNumber(this.emisNumber).subscribe((res:any) => {
      this.school = res[0].institutionName;
    })


    this.userservice.getUserById(this.appservice.getLoggedInUserId()).subscribe((res: any) => {
      this.userinfo = res
      console.log(this.userinfo);
      console.log(this.userinfo.emailAddress);
    }, err => {
      console.log(err);
      this.router.navigate(['/dashbaord']);
    });
  }


  editprofile() {
    this.router.navigate(['../users/edit-profile']);
  }


}
