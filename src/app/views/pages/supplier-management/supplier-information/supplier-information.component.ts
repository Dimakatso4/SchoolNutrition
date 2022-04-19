import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup,  Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SupplierService} from '../supplier.service';
import { Subject } from 'rxjs';
import * as moment from 'moment';

import { UsersService } from "../../users/users.service";
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-supplier-information',
  templateUrl: './supplier-information.component.html',
  styleUrls: ['./supplier-information.component.scss']
})
export class SupplierInformationComponent implements OnInit {
////date


  ///enddate
  public userID:any
  public roleName:any
  public data:any
  requiredForm: FormGroup;
  isFormSubmitted: Boolean;
  public supplierName: any
 public email: any
 public telephone: any
  public Address1: any
  public Address2: any
  public town:any
  public City: any
public  Province: any
public PostalCode:any
public name: any
public surname: any
public csdNo: any
public startDate:any
public endDate: any
public Status:any
public assignedSchool:any
public contactNo: any
public venderNo: any
public supplierId :any
public info :any
public  password:any
public districtCode:any
public emisNumber:any
public schools :any
public districtName:any
public code:any
public list2 :any
public institution:any
public schoolName:any
public dtOptions: DataTables.Settings = {};
dtTrigger: Subject<any> = new Subject<any>();
lis=[]
li:any;
noDisputes;
districtNames :any;
public status:any
numChars: number = 2;

  constructor(private modalService: NgbModal, private fb: FormBuilder,private router: Router,private supplierservice:SupplierService,private userservice: UsersService, private appservice: AppService) { }
   

  ngOnInit(): void {
    this.requiredForm = this.fb.group({
      districtCode:[''],
      districtName:[''],
      supplierName: ['', Validators.required ],
      email: ['', Validators.required ],
      telephone: ['', Validators.required ],
      Address1: ['', Validators.required ],
      Address2: ['', Validators.required ],
      town: ['', Validators.required ],
      City: ['', Validators.required ],
     Province: ['', Validators.required ],
    PostalCode: ['', Validators.required ],
    name: ['', Validators.required ],
    surname: ['', Validators.required ],
    csdNo: ['', Validators.required ],
    startDate: ['', Validators.required ],
    endDate: ['', Validators.required ],
    Status: ['', Validators.required ],
    assignedSchool:['', Validators.required ],
    contactNo:['', Validators.required ],
    venderNo:['', Validators.required ],
    password:['', Validators.required ],
   
    institution:[''],
    schoolName:['']

    
    });

    this.userID = this.appservice.getLoggedInUserId();
    this.roleName=this.appservice.getLoggedInUserRole();
    console.log(this.roleName);
    //supplier
    console.log(this.userID);
    if (this.userID.length==10) {
      this.userservice.getSupplierByVendorNo(this.userID).subscribe(data =>{ 
        this.li=data;
        this.lis=this.li;
        console.log(data);
        this.supplierName=this.lis[0].supplierName,
        this.districtName=this.lis[0].districtName,
        this.districtCode=this.lis[0].districtCode,
        this.assignedSchool = this.lis[0].assignedSchool.replaceAll(',','\n');
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
   
    ///

  }
  editprofile() {
    this.router.navigate(['../users/edit-profile']);
  }

}
