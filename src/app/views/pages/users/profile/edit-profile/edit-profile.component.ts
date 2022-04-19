import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from "../../users.service";
import { AppService } from '../../../../../app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {


  constructor(private modalService: NgbModal, private router: Router, private http: HttpClient, private userservice: UsersService, private appservice: AppService) { }
  public newUser: any = {};
  public data: any;
  public output: any;
  public firstname: any = "";
  public surname: any = "";
  public cellNumber: any = "";
  public emailAddress: any = "";
  public idNumber: any = "";
  public schoolName: any = "";
  public district: any = "";
  public disputeOfficialName: any;
  public emisNumber: any = "";
  public districtCode: any = "";
  public provinceID: any;
  public createdBy: any;
  public creationDate: any;
  public title: any;
  public persal: any;
  public persalNumberBoolean: boolean = false;
  public nationality: any = "South African";
  public gender: any;
  public informalsettlement = false;
  public houseNumber: any = "";
  public complex: any = "";
  public streetName: any = "";
  public suburb: any = "";
  public postalCode: any = "";
  public section: any = "";
  public city: any = "";
  public userType: any;
  public representative: any;
  public isEmployee: boolean;
  public isNominated: boolean;
  public roleId: any;
  public credentials: any;
  public electionScore: any;
  public isSeconded: any;
  public provinceId: any;
  public status: any;
  public createdDate: any;
  public updatedDate: any;
  public updatedBy: any;
  public aboutMe: any;
  public designation: any = "";
  public id: any;
  public qualification: any = "";
  public experience: any = "";
  //Sbu
  public level: any;
  public region: any;
  public distName: any;
  public school: any;
  public position: any;
  //Supplier
  public supplierName: any = "";
  public email: any = "";
  public telephone: any = "";
  public Address1: any = "";
  public Address2: any = "";
  public town: any = "";
  public City: any = "";
  public Province: any = "";
  public PostalCode: any = "";
  public name: any = "";
  public roleName: any;

  public csdNo: any = "";
  public startDate: any = "";
  public endDate: any = "";
  public Status: any = "";
  public assignedSchool: any = "";
  public contactNo: any = "";
  public venderNo: any = "";
  public supplierId: any = "";
  public info: any = "";
  public password: any = "";


  public districtName: any
  lis = []
  li: any;
  //End of Supplier

  userId;
  roles: any;
  userRole: any;
  districts: any;
  schools: any;
  userID: any;

  ngOnInit(): void {

    this.userID = this.appservice.getLoggedInUserId();
    this.roleName = this.appservice.getLoggedInUserRole();
    console.log(this.roleName);
    //supplier
    console.log(this.userID);
    if (this.userID.length == 10) {
      this.userservice.getSupplierByVendorNo(this.userID).subscribe(data => {
        this.li = data;
        this.lis = this.li;
        console.log(data);
        this.supplierName = this.lis[0].supplierName,
          this.districtName = this.lis[0].districtName,
          this.districtCode = this.lis[0].districtCode,
          this.assignedSchool = this.lis[0].assignedSchool,
          this.supplierId = this.lis[0].supplierId,
          this.venderNo = this.lis[0].vendorNo,
          this.email = this.lis[0].emailAddress,
          this.telephone = this.lis[0].telephoneNo,
          this.Address1 = this.lis[0].line1Address,
          this.Address2 = this.lis[0].line2Address,
          this.town = this.lis[0].town,
          this.City = this.lis[0].city,
          this.Province = this.lis[0].province,
          this.PostalCode = this.lis[0].postalCode,
          this.name = this.lis[0].contactPersonName,
          this.surname = this.lis[0].contactPersonSurname,
          this.contactNo = this.lis[0].contactNo,
          this.csdNo = this.lis[0].csdNumber,
          this.startDate = moment(this.lis[0].contractStartDate).format('YYYY-MM-DD'),
          this.endDate = moment(this.lis[0].contractEndDate).format('YYYY-MM-DD'),
          this.Status = this.lis[0].status,
          this.roleName = this.lis[0].roleName
        console.log(this.supplierName);
   





      })
      //asign new values


    }

    ///

    this.userservice.getUserById(this.userID).subscribe((res: any) => {
      this.data = res;
      
      
      this.roleId = this.data.roleID;
      this.newUser.title = this.data.title;
      this.provinceId = this.data.provinceId;      
      this.isNominated = this.data.isNominated;
      this.isSeconded = this.data.isSeconded;
      this.electionScore = this.data.electionScore;
      this.createdBy = this.data.createdBy;
      this.credentials = this.data.password;
         
      
      this.informalsettlement = this.data.isInformalSettlement;
      this.status = this.data.status;
  

      this.id = this.data.id;
      this.nationality = this.data.citizenship;
      this.persal = this.data.persal;
      this.gender = this.data.gender;
      this.idNumber = this.data.idNumber;
      this.firstname = this.data.firstname;
      this.surname = this.data.surname;
      this.districtCode = this.data.districtCode;
      this.emisNumber = this.data.emisNumber;
      this.isEmployee = this.data.isEmployee;  
      this.level = this.data.level;
      this.region = this.data.region;
      this.position = this.data.position;
      this.suburb = this.data.suburb;
      this.postalCode = this.data.postalCode;

      this.userservice.getDistrictNameByCode(this.districtCode).subscribe((res:any) => {
        this.distName = res[0].districtName;
      })

      this.userservice.getSchoolByEmisNumber(this.emisNumber).subscribe((res:any) => {
        this.school = res[0].institutionName
      })

      if (this.data.firstname && this.data.firstname != "undefined" && this.data.firstname != "null") {
        this.firstname = this.data.firstname;

      }
      if (this.data.surname && this.data.surname != "undefined" && this.data.surname != "null") {
        this.surname = this.data.surname;

      }
      if (this.data.cellNumber && this.data.cellNumber != "undefined" && this.data.cellNumber != "null") {
        this.cellNumber = this.data.cellNumber;

      }
      if (this.data.emailAddress && this.data.emailAddress != "undefined" && this.data.emailAddress != "null") {
        this.emailAddress = this.data.emailAddress;

      }

      if (this.data.houseNumber && this.data.houseNumber != "undefined" && this.data.houseNumber != "null") {
        this.houseNumber = this.data.houseNumber;

      }
      if (this.data.suburb && this.data.suburb != "undefined" && this.data.suburb != "null") {
        this.suburb = this.data.suburb;

      }
      if (this.data.streetName && this.data.streetName != "undefined" && this.data.streetName != "null") {
        this.streetName = this.data.streetName;

      }
      if (this.data.postalCode && this.data.postalCode != "undefined" && this.data.postalCode != "null") {
        this.postalCode = this.data.postalCode;

      }
      if (this.data.city && this.data.city != "undefined" && this.data.city != "null") {
        this.city = this.data.city;

      }
      if (this.data.designation && this.data.designation != "undefined" && this.data.designation != "null") {
        this.designation = this.data.designation;

      }
      if (this.data.experience && this.data.experience != "undefined" && this.data.experience != "null") {
        this.experience = this.data.experience;

      }
      if (this.data.qualification && this.data.qualification != "undefined" && this.data.qualification != "null") {
        this.qualification = this.data.qualification;

      }
      if (this.data.level && this.data.level != "undefined" && this.data.level != "null") {
        this.level = this.data.level;

      }
      if (this.data.region && this.data.region != "undefined" && this.data.region != "null") {
        this.region = this.data.region;

      }
      if (this.data.position && this.data.position != "undefined" && this.data.position != "null") {
        this.position = this.data.position;

      }

      this.userservice.getAllRoles().subscribe((res: any) => {
        this.roles = res;
      });

      this.userservice.getAllDistricts().subscribe(res => {
        this.districts = res;
      });

      this.userservice.getSchoolsByDistrict(this.districtCode).subscribe((res: any) => {
        this.schools = res;
      });

    }, err => {
      console.log(err);
      this.router.navigate(['/dashboard']);

    });

    this.userservice.getUserRoleById(this.userID).subscribe((res: any) => {
      console.log(res);
      let role = [];

      if (res.length > 0 || res) {
        for (var key = 0; key < res.length; key++) {

          if (res[key].roleName == "SCHOOL_PRINCIPAL" || res[key].roleName == "SCHOOL_COORDINATOR" || res[key].roleName == "SGB_CHAIRPERSON" || res[key].roleName == "PARENT") {
            // SCHOOL LEVEL
            if (res[key].emisCode) {
              role.push('"' + res[key].roleName + '":"' + res[key].emisCode + '"');

            } else {
              role.push('"' + res[key].roleName + '":"' + this.emisNumber + '"');

            }

          } else {
            // DISTRICT LEVEL OR HIGHER
            let isDistritUser = res[key].districtCode && res[key].districtCode != 'undefined' && res[key].districtCode != 'null' ? res[key].districtCode : "";

            if (!isDistritUser) {

              if (res[key].roleName == "DEO" || res[key].roleName == "MONITOR" || res[key].roleName == "OBSERVER") {
                role.push('"' + res[key].roleName + '":"' + this.districtCode + '"');
              } else {
                role.push('"' + res[key].roleName + '":"' + isDistritUser + '"');
              }

            } else {
              role.push('"' + res[key].roleName + '":"' + isDistritUser + '"');

            }
          }

        }
        //
      }

      this.userType = role;


    }, err => {
      console.log(err);
      this.router.navigate(['/dashboard']);

    });



  }

  cancel() {

    this.router.navigate(['/dashboard']);
  }


  saveUpdates() {
    Swal.fire({
      title: 'Are you sure you want to save User',
      text: 'A user will be edit',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        
        this.userservice.updateUserProfileEmployee(this.id, this.nationality, this.persal, this.idNumber, this.firstname, this.surname, this.gender,
            this.houseNumber, this.streetName, this.suburb, this.city, this.postalCode, this.informalsettlement, 
            this.cellNumber, this.emailAddress, this.districtCode, this.emisNumber, this.level,
             this.region, this.position) 
             .subscribe(res => {
            console.log(res);
          });


        Swal.fire(
          'Confirmation!',
          'User successfully edited.',
          'success'
        ).then(result => {
          this.modalService.dismissAll();
          if (result.value || result.isDismissed) {
            this.appservice.setIsLoggedInUsername(this.firstname +" "+ this.surname)
            this.router.navigate(['/users/edit-profile']);
            window.location.reload();
          }
        })    
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your entry was not save',
          'error'
        )
      }
    })
  }

  getSchools(e) {
    this.userservice.getSchoolsByDistrict(e).subscribe((res: any) => {
      this.schools = res;
    });

    // this.provinceID ="GP"
  }

  getEmisCode(e) {
    this.emisNumber = e;
  }

  showpersal(e) {

    if (e.target.checked) {
      this.persalNumberBoolean = true;
    } else {
      this.persalNumberBoolean = false;
    }
  }
  ///Nompumello
  updateSupplier() {

    this.info = ({
      supplierId: this.supplierId,
    // districtCode:this.districtName.split(' ').slice(0,2).map(n => n[0].toUpperCase()).join(''),
      districtCode: this.districtCode,
      districtName: this.districtName,
      supplierName: this.supplierName,
      vendorNo: this.venderNo,
      emailAddress: this.email,
      telephoneNo: this.telephone,
      line1Address: this.Address1,
      line2Address: this.Address2,
      town: this.town,
      city: this.City,
      province: this.Province,
      postalCode: this.PostalCode,
      contactPersonName: this.name,
      contactPersonSurname: this.surname,
      contactNo: this.contactNo,
      csdNumber: this.csdNo,
      contractStartDate: this.startDate,
      contractEndDate: this.endDate,
      status: this.Status,
      assignedSchool: this.assignedSchool

    })

    Swal.fire({
      title: 'Are you sure you want to save supplier edit',
      text: 'A supplier will updated',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes!',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.value) {
        this.userservice.UpdateSupplier(this.info).subscribe(res => {
          console.log("sucess");
          console.log(res);
         
         // console.log(this.supplierName);
        });


        Swal.fire(
          'Confirmation!',
          'Update saved.',
          'success'
        ).then
        this.router.navigate(['/users/edit-profile']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your entry was not save',
          'error'
        )
      }
    })
  }
  ///Nompumello

}

