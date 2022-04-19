import { Component, OnDestroy, OnInit, Injectable, QueryList, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { DataTable } from "simple-datatables";
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService } from "../users.service";
import { AuthService } from '../../auth/auth.service';
import { AppService } from 'src/app/app.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { NgbModal, NgbModalConfig, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { DataTableDirective } from 'angular-datatables';
import {
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
import { LoadingHandler } from 'src/app/model/loading-handler';


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements AfterViewInit, OnDestroy, OnInit {

  loadingHandler = new LoadingHandler();

  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;

  validationFormEdit: FormGroup;
  isEditFormSubmitted: Boolean;

  basicModalCloseResult: string = '';

  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: null,
    uploadMultiple: false,
    addRemoveLinks: true,
    autoReset: null,
    errorReset: null,
    cancelReset: null
  };
  uploadEvent: any;
  activeModal: any;
  selectedReport: any;
  docPath: any;
  docsTitle: any;
  newDocs: { title: any; documentTypeId: number; documentPath: any; uploadedBy: any; emisCode: string; schoolName: any; districtCode: string; districtName: any; reportType: any; };
  schoolname: any;
  handOverService: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private http: HttpClient,
    private userservice: UsersService,
    private authService: AuthService,
    private appService: AppService,
    config: NgbModalConfig,
    public formBuilder: FormBuilder) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
    router.events.subscribe((event: RouterEvent) => {
      this.navigationInterceptor(event)
    })
  }


  public newUser: any = {};
  public data: any;
  public output: any;
  public firstname: any;
  public surname: any;
  public cellNumber: any;
  public emailAddress: any;
  public idNumber: any;
  public passport: any;
  public schoolName: any;
  public parentSchool: any;
  public districtName: any;
  public disputeOfficialName: any;
  public emisNumber = "";
  public districtCode = "";
  public provinceID: any;
  public createdBy: any;
  public creationDate: any;
  public title: any;
  public persal: any;
  public persalNumberBoolean: boolean = false;
  public nationality = "";
  public gender = "";
  public informalsettlement = false;
  public house: any;
  public complex: any;
  public street: any;
  public section: any;
  public city: any;
  public userType = "";
  public representative: any;
  public isEmployee = false;
  public isNominated: boolean;
  public roleId: any;
  public electionScore: any;
  public isSeconded: any;
  public provinceId: any;
  public qualification: any;
  public experience: any;
  public designation = "";
  public userinfo: any;
  public isBlacklisted: any;
  public Relationship: any = "";
  public TypeOfInstitution: any = "";
  public StreetAddress1: any;
  public StreetAddress2: any;
  public StreetAddress3: any;
  public StreetCode: any;
  public PostalAddress1: any;
  public PostalAddress2: any;
  public PostalAddress3: any;
  public PostalCode: any;
  public seoDistrictCode: any = "";
  public seoEmisNumber: any = "";
  public seoSchoolName: any;
  public invalidIdNumber: Boolean;
  public invalidEditIdNumber: Boolean;
  public reportType: any;
  public showOverlay = true;

  public postalCode: any;
  public suburb: any;


  public regionLists: any;
  public levelLists: any;

  public region: any = "";
  public level: any = "";
  public position: any = "";
  public district: any;
  public school: any;
  public districtList: any;
  public status: any;

  public isRegion: boolean;
  public isDistrict: boolean;
  public isSchool: boolean;
  public isLevel: boolean;

  public isPersalDuplicate: boolean;
  public isIDNumberExist: boolean;
  public isDuplicate: any;

  public isEditRegion: boolean;
  public isEditDistrict: boolean;
  public isEditSchool: boolean;
  public isEditLevel: boolean;

  public editRegion: any;
  public editLevel: any;
  public editPosition: any;
  public editDistrict: any;
  //public editSchool:any;

  public editIsEmployee: any;
  public editGender: any;
  public editIdNumber: any;
  public editPassport: any;
  public editPersal: any;
  public editDistrictCode: any;
  public editEmisNumber: any;
  public editQualification: any;
  public editExperience: any;
  // public editSchool: any = "";
  public editDesignation: any = "";
  public editinformalsettlement: any;
  public edituserType: any;
  public editNationality: any;
  public editSeoEmisNumber: any = "";
  public noEditIDnumber;
  public noIDNumber;
  public emptyEditUsernumber: any;
  public emptyUsernumber: any;
  public editName: any;
  public editSurname: any;
  public editHouse: any;
  public editComplex: any;
  public editStreet: any;
  public editSection: any;
  public editCity: any;
  public editCellNumber: any;
  public editEmail: any;
  public editId: any;
  public isPageLoading: Boolean;

  public editPostalCode: any;
  public editSuburb: any;

  public allRoles: any;
  public editUserRole;

  public roleList: any;
  public distCode: any;

  userId;
  roles: any;
  numRules: any;
  designations: any;
  userRole: any;
  districts: any;
  schools: any;
  seoSchools: any;
  selectedUser: any;
  roleToSelect = [];
  parentID = 0;
  public roleSelected;
  //public editPosition;
  public rolev;
  public isShown: boolean;
  public isCellnumberDuplicate = false;
  public iseditCellnumberDuplicate = false;
  public loggedInRole;
  public isPersalIdEmpty;
  public isNumberInvalid;
  public iseditNumberInvalid;
  

  @ViewChild('closeAddExpenseModal') closeAddExpenseModal: ElementRef;
  @ViewChild('basicModal') basicModal: any;
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject<any>();

  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {


    this.isPageLoading = true;
    this.loggedInRole = this.appService.getLoggedInUserRole()

    this.levelList()
    this.regionList();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      processing: true,
      searching: true,
      ordering: true,
      destroy: true,
      order: ['0', 'asc']
    };
    // this.getResults()

    this.validationForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      surname: ['', Validators.required],
      gender: ['', Validators.required],
      idnumber: [''],
      passport: [''],
      persal: [''],
      cellNumber: ['', Validators.required],
      emailAddress: ['', Validators.required],
      districtCode: [''],
      seoDistrictCode: [''],
      userType: [''],
      emisNumber: [''],
      seoEmisNumber: [''],
      designation: [''],
      informalsettlement: [false],
      isEmployee: [false],
      qualification: [''],
      experience: [''],
      house: [''],
      complex: [''],
      street: [''],
      section: [''],
      city: ['', Validators.required],
      Relationship: [''],
      TypeOfInstitution: [''],
      StreetAddress1: [''],
      StreetAddress2: [''],
      StreetAddress3: [''],
      StreetCode: [''],
      PostalAddress1: [''],
      PostalAddress2: [''],
      PostalAddress3: [''],
      PostalCode: [''],
      isBlacklisted: [false],
      // roleSelected: ['', Validators.required],
      nationality: ['', Validators.required],
      level: [''],
      region: [''],
      position: ['', Validators.required],
      district: [''],
      school: [''],
      postalCode: ['', Validators.required],
      suburb: ['', Validators.required]

    });

    this.validationFormEdit = this.formBuilder.group({
      editName: ['', Validators.required],
      editSurname: ['', Validators.required],
      editGender: [''],
      editDistrictCode: [''],
      editPersal: [''],
      editCellNumber: ['', Validators.required],
      editEmail: ['', Validators.required],
      editEmisNumber: [''],
      editSeoEmisNumber: [''],
      edituserType: [''],
      editIdNumber: [''],
      editPassport: [''],
      editDesignation: [''],
      editinformalsettlement: [false],
      editIsEmployee: [false],
      editQualification: [''],
      editExperience: [''],
      editHouse: [''],
      editSuburb: [''],
      editStreet: [''],
      editPostalCode: [''],
      editCity: ['', Validators.required],
      editPosition: [''],
      editisBlacklisted: [false],
      editNationality: [''],
      editRegion: [''],
      editLevel: ['']

      // editDistrict: [''],
      // editSchool: [''],
      // editPosition: ['']
    });

    this.isEditFormSubmitted = false;
    this.isCreateFormSubmitted = false;



    // this.userservice.getAllUsers().subscribe((res: any) => {

    //   let parentid = this.appService.getLoggedInParentId();
    //   const NominatedParent = parents.filter(function (parent) {
    //     return [parentid].includes(parent.parentID)
    //   });

    //   console.log(res)
    // if (this.appService.getLoggedInUserRole() === "Administrator" || this.appService.getLoggedInUserRole() === "HO" || this.appService.getLoggedInUserRole() === "PEO") {
    //   this.data = res;

    // }

    //   this.dtTrigger.next();
    // }, err => {
    //   console.log(err);
    // });

    this.userservice.getAllUsers().subscribe((res: any) => {
      // this.data = res;
      console.log(res)

      if (this.appService.getLoggedInUserRole() === "Administrator" || this.appService.getLoggedInUserRole() === "Head Office Administrator" || this.appService.getLoggedInUserRole() === "Head Office Director" || this.appService.getLoggedInUserRole() === "Head Office Coordinator" || this.appService.getLoggedInUserRole() === "Provincial Monitor") {
        //get all users in the system
        this.data = res;        
        this.rerender();

      } else if (this.appService.getLoggedInUserRole() === "School Principal" || this.appService.getLoggedInUserRole() === "School Coordinator" || this.appService.getLoggedInUserRole() === "SGB" || this.appService.getLoggedInUserRole() === "PARENT") {
        // get list of parents in a school
        let emiscode = this.appService.getLoggedInEmisCode();

        const parents: any = res.filter(function (parent) {
          return ["School Principal", "School Coordinator", "Food Handler", "SGB"].includes(parent.position);
        });

        const users = parents.filter(function (user) {
          return [emiscode].includes(user.emisNumber)
        });


        this.userservice.getSchoolByEmisNumber(emiscode).subscribe((res: any) => {
          this.parentSchool = res[0].institutionName;
        }, err => {
          this.parentSchool = null;
        })

        // console.log(parents)
        // console.log(users)
        this.data = users;
        this.rerender();
        console.log(this.data)
      } else if (this.appService.getLoggedInUserRole() === "District Administrator" || this.appService.getLoggedInUserRole() === "District Director" || this.appService.getLoggedInUserRole() === "District Coordinator" || this.appService.getLoggedInUserRole() === "District Monitor"|| this.appService.getLoggedInUserRole() === "District CES") {
        // get list if user in a district
        let districtcode = this.appService.getLoggedInDistrictCode();
        const schoolusers = res.filter(function (schooluser) {
          // return ["PARENT", "School Coordinator", "SGB", "School Principal"].includes(schooluser.position);
          return ["District Administrator","District Director", "District Coordinator", "District CES", "District Monitor", "School Principal"].includes(schooluser.position);
        })

        const users = schoolusers.filter(function (user) {
          return [districtcode].includes(user.districtCode)
        })

        // console.log(schoolusers)
        // console.log(users)
        this.data = users;
        this.rerender();
      } else {
        this.data = res;
        this.rerender();
        this.loggedInRole = "SGB";
      }

      this.isPageLoading = false;      
      // this.rerender();
    }, err => {
      this.isPageLoading = false;
      console.log(err);
    });

    this.isShown = false;

    this.userservice.getRolesByUserRole(this.appService.getLoggedInUserRole()).subscribe((res: any) => {
      let userRole = this.appService.getLoggedInUserRole();
      this.numRules = res.length
      console.log(res)
      this.roles = res.filter(function (user) {

        if (userRole == "School Principal") {
          return !["SGB"].includes(user.roleName)
        } else {
          return !["SGB"].includes(user.roleName) && !["PARENT"].includes(user.roleName)
        }
      });

      // for(let x = 0; x < this.roles.length; x ++)
      // {
      //   this.roles[x] = {id: this.roles[x].id, roleName: this.getFilterRoleName(this.roles.roleName)}
      // }

    });

    this.userservice.getAllDesignations().subscribe(res => {
      this.designations = res;
    });





    this.userservice.getAllDistricts().subscribe(res => {
      this.districts = res;
      console.log(res);

      if (this.loggedInRole == "District Administrator") {
        this.isRegion = true;
        this.isDistrict = true;
        

        this.districtCode = this.appService.getLoggedInDistrictCode();
        this.userservice.getDistrictNameByCode(this.districtCode).subscribe((res:any) => {
          this.districtCode = res[0].districtName;
          console.log(this.districtCode)         
          //alert(this.districtCode)
          this.validationForm.controls["districtCode"].setValue(this.districtCode);
          this.validationForm.controls["districtCode"].disable();
        })

        this.level = this.appService.getLoggedInOfficeLevel();
        this.validationForm.controls["level"].setValue(this.appService.getLoggedInOfficeLevel());
        this.validationForm.controls["level"].enable();
        this.userservice.getPositionByOfficeLevel(this.level).subscribe((res:any) =>{
          this.roleList = res;
        })
       
        this.region = this.appService.getLoggedInRegion();
        this.validationForm.controls["region"].setValue(this.appService.getLoggedInRegion());
        this.validationForm.controls["region"].disable();

        this.userservice.getSchoolsByDistrict(this.districtCode).subscribe((school: any) => {
          this.schools = school;
          this.emisNumber = this.appService.getLoggedInEmisCode();
          this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());
          this.validationForm.controls["emisNumber"].enable();
        })

      } else if (this.loggedInRole == "School Coordinator" || this.loggedInRole == "School Principal" ) {
        this.isRegion = true;
        this.isDistrict = true;
        this.isSchool = true;
        
        this.districtCode = this.appService.getLoggedInDistrictCode();        
        this.userservice.getDistrictNameByCode(this.districtCode).subscribe((res:any) => {
          this.districtCode = res[0].districtName;
          console.log(this.districtCode)         
          //alert(this.districtCode)
          this.validationForm.controls["districtCode"].setValue(this.districtCode);
          this.validationForm.controls["districtCode"].disable();
        })
        
        this.level = this.appService.getLoggedInOfficeLevel();
        this.validationForm.controls["level"].setValue(this.appService.getLoggedInOfficeLevel());
        this.validationForm.controls["level"].disable();
        this.userservice.getPositionByOfficeLevel(this.level).subscribe((res:any) =>{
          this.roleList = res;
        })
       
        this.region = this.appService.getLoggedInRegion();
        this.validationForm.controls["region"].setValue(this.appService.getLoggedInRegion());
        this.validationForm.controls["region"].disable();
        
        this.userservice.getDistrictByCode(this.districtCode).subscribe((res:any) =>{
          this.districtName = res;
        })

        this.userservice.getSchoolsByDistrict(this.districtCode).subscribe((school: any) => {
          this.schools = school;
          this.emisNumber = this.appService.getLoggedInEmisCode();
          this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());
          this.validationForm.controls["emisNumber"].disable();
        }, err => {
          console.log(err);
          this.router.navigate(['/dashbaord']);
        });

      }
    });


  }

  getResults() {
    this.userservice.getAllUsers().subscribe((res: any) => {
      // this.data = res;

      if (this.appService.getLoggedInUserRole() === "Administrator" || this.appService.getLoggedInUserRole() === "Head Office Administrator" ||  this.appService.getLoggedInUserRole() === "Head Office Director" || this.appService.getLoggedInUserRole() === "Head Office Coordinator" || this.appService.getLoggedInUserRole() === "Provincial Monitor") {
        //get all users in the system
        this.data = res;        
        // this.rerender();

      } else if (this.appService.getLoggedInUserRole() === "School Principal" || this.appService.getLoggedInUserRole() === "School Coordinator" || this.appService.getLoggedInUserRole() === "SGB Chairperson" || this.appService.getLoggedInUserRole() === "PARENT") {
        // get list of parents in a school
        let emiscode = this.appService.getLoggedInEmisCode();
        const parents: any = res.filter(function (parent) {
          return ["School Principal"].includes(parent.userType);
        });

        const users = parents.filter(function (user) {
          return [emiscode].includes(user.emisNumber)
        });


        this.userservice.getSchoolByEmisNumber(emiscode).subscribe((res: any) => {
          this.parentSchool = res[0].institutionName;
        }, err => {
          this.parentSchool = null;
        })

        // console.log(parents)
        // console.log(users)
        this.data = users;
      } else if (this.appService.getLoggedInUserRole() === "District Administrator" || this.appService.getLoggedInUserRole() === "District Director" || this.appService.getLoggedInUserRole() === "District Coordinator" || this.appService.getLoggedInUserRole() === "District Monitor"|| this.appService.getLoggedInUserRole() === "District CES") {
        // get list if user in a district
        let districtcode = this.appService.getLoggedInDistrictCode();
        const schoolusers = res.filter(function (schooluser) {
          //return ["PARENT", "School Coordinator", "SGB", "School Principal"].includes(schooluser.userType);
          return ["District Administrator","District Director","District Coordinator","District CES","District Monitor", "School Coordinator", "SGB", "School Principal"].includes(schooluser.userType);
        })

        const users = schoolusers.filter(function (user) {
          return [districtcode].includes(user.districtCode)
        })

        // console.log(schoolusers)
        // console.log(users)
        this.data = users;
      } else {
        this.data = res;
        this.loggedInRole = "SGB";
      }

      // this.rerender();
    }, err => {
      console.log(err);
    });

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Call the dtTrigger to rerender again
      this.dtTrigger.next();
    });
  }


  onUploadError(event: any): void {
    console.log('onUploadError:', event);
  }

  openBasicModal(content) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      this.basicModalCloseResult = "Modal closed" + result
    }).catch((res) => { });
  }


  onComplete(event: any): void {

    this.openBasicModal(this.basicModal);
    console.log('onAddedFile:', event);
    this.uploadEvent = event;

    // this.onUploadSuccess(event);
  }

  resetDropzoneUploads() {

  }

  //Duplicate
  resetFlag() {
    if (this.isDuplicate) {
      this.isDuplicate = false;
    }
  }

  checkPersalExist(persal) {
    if (persal) {
      if (persal.length >= 8) {
        this.userservice.getUserByPersal(persal).subscribe((res: any) => {
          if (res) {
            this.isDuplicate = true;
            console.log(this.isDuplicate)
          } else {
            this.isDuplicate = false;
            console.log(this.isDuplicate)
          }
        }, err => {
          console.log(err);
          this.isDuplicate = false;
          console.log(this.isDuplicate)
        })
      }
    }
  }

  checkIdNumberExist(idNumber) {
    if (idNumber) {
      if (idNumber.length >= 13) {
        this.userservice.getUserByIDNumber(idNumber).subscribe((res: any) => {
          if (res) {
            this.isDuplicate = true;
            console.log(this.isDuplicate)
          } else {
            this.isDuplicate = false;
            console.log(this.isDuplicate)
          }
        }, err => {
          console.log(err);
          this.isDuplicate = false;
          console.log(this.isDuplicate)
        })
      }
    }
  }

  //Show hide
  showHideDiv(event) {

    const selected = event.target.value;

    if (selected === 'Head Office') {
      this.isSchool = false;
      this.isDistrict = false;
      this.isRegion = false;
    } else if (selected === 'District') {
      this.isDistrict = true;
      this.isRegion = true;
      this.isSchool = false;
    }
    else if (selected === 'School') {
      this.isDistrict = true;
      this.isRegion = true;
      this.isSchool = true;
      //this.isPosition = true;               
    }
  }




  fieldChange() {

    if (this.isCellnumberDuplicate) {
      this.isCellnumberDuplicate = false;

    }

    if (this.cellNumber[0] != "0") {
      this.isNumberInvalid = true;
    } else {
      this.isNumberInvalid = false;
    }

  }

  editfieldChange() {
    if (this.iseditCellnumberDuplicate) {
      this.iseditCellnumberDuplicate = false
    }

    if (this.editCellNumber[0] != "0") {
      this.iseditNumberInvalid = true;
    } else {
      this.iseditNumberInvalid = false;
    }

  }

  ////////////////// CREATE USER  ////////////////

  selectCode(event) {
    console.log(event)
    this.userservice.getDistrictByRegion(event).subscribe((res: any) => {
      let districtData = this.uniqueByKey(res, 'districtName')
      this.districtList = districtData
      console.log(this.districtList)
    })
  }

  regionList() {
    this.userservice.getRegions().subscribe((res: any) => {
      
      this.regionLists = res
      console.log(this.region)
    })
  }

  levelList() {
    this.userservice.getLevels().subscribe((res: any) => {
        this.levelLists = res     
        console.log(this.level)
      let filtered
      if (this.loggedInRole == "District Administrator") {
        filtered = res.filter(function (e) {
          return ['District','School'].includes(e.description)
        });
        this.levelLists = filtered
        this.level = this.levelLists[0].description;      
      
      }else{
        this.levelLists = res
      }      
    })
  }

  officeLevelRoleList(event) {
    console.log(event);
    //new position/role
    let filtered;
    let currentLevel = this.appService.getLoggedInOfficeLevel();
    this.userservice.getPositionByOfficeLevel(event).subscribe((res: any) => {
          this.roleList = res
          console.log(this.roleList)
    })
  }

  validateDistrict() {
    let userRole = this.validationForm.controls["userType"].value;
    let districtCode = this.validationForm.controls["districtCode"].value;
    let role = [];

    // for (var key in this.roleSelected) {
    //   if (this.roleSelected.hasOwnProperty(key)) {
    //     role.push(this.roleSelected[key].roleName);
    //   }
    // }


    if (role.includes('Head Office Director') || role.includes('Head Office Administrator') || role.includes('Head Office Coordinator') || role.includes('Provincial Monitor')) {
      this.validationForm.controls["districtCode"].setValue("");
      this.schools = [];
      this.seoSchools = [];
    }


    if (role.includes('PARENT') || role.includes('SGB') || role.includes('School Coordinator') || role.includes('District Administrator') || role.includes('District Director') || role.includes('School Principal') || role.includes('District Monitor') || role.includes('District Coordinator')) {
      this.validationForm.controls["districtCode"].setValidators([Validators.required]);
      this.validationForm.controls["districtCode"].updateValueAndValidity();

    } else {
      this.validationForm.controls["districtCode"].clearValidators();
      this.validationForm.controls["districtCode"].updateValueAndValidity();

    }


    if (role.includes('PARENT') || role.includes('SGB') || role.includes('School Coordinator') || role.includes('School Principal')) {

      if (districtCode) {
        this.userservice.getSchoolsByDistrict(districtCode).subscribe((res: any) => {

          if (this.loggedInRole == "SGB" || this.loggedInRole == "School Coordinator" || this.loggedInRole == "School Principal") {

            this.districtCode = this.appService.getLoggedInDistrictCode();
            this.validationForm.controls["districtCode"].setValue(this.appService.getLoggedInDistrictCode());
            this.validationForm.controls["districtCode"].disable();

            this.emisNumber = this.appService.getLoggedInEmisCode();
            this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());
            this.validationForm.controls["emisNumber"].disable();


          } else {
            this.schools = res;
            this.validationForm.controls["emisNumber"].setValue("");
            console.log('execute');

          }
        });
      }

      this.validationForm.controls["emisNumber"].setValidators([Validators.required]);
      this.validationForm.controls["emisNumber"].updateValueAndValidity();


    } else {
      this.validationForm.controls["emisNumber"].clearValidators();
      this.validationForm.controls["emisNumber"].updateValueAndValidity();
      if (this.loggedInRole != "School Principal" || this.loggedInRole != "School Coordinator") {
        this.schools = []

      }

    }


    // if (role.includes('SEO') || role.includes('PEM') || role.includes('HO') || role.includes('DEO') || role.includes('PRINCIPAL')) {
    //   this.isEmployee = true;
    // } else {
    //   this.isEmployee = false;
    // }

    if (role.includes('PARENT')) {
      this.validationForm.controls["TypeOfInstitution"].setValidators([Validators.required]);
      this.validationForm.controls["TypeOfInstitution"].updateValueAndValidity();
      this.validationForm.controls["Relationship"].setValidators([Validators.required]);
      this.validationForm.controls["Relationship"].updateValueAndValidity();

      this.validationForm.controls["informalsettlement"].setValue(false);
      this.validationForm.controls["house"].setValue('');
      this.validationForm.controls["complex"].setValue('');
      this.validationForm.controls["street"].setValue('');
      this.validationForm.controls["section"].setValue('');
      this.validationForm.controls["city"].setValue('');


    } else {
      this.validationForm.controls["TypeOfInstitution"].clearValidators();
      this.validationForm.controls["TypeOfInstitution"].updateValueAndValidity();
      this.validationForm.controls["TypeOfInstitution"].setValue('');
      this.validationForm.controls["Relationship"].clearValidators();
      this.validationForm.controls["Relationship"].updateValueAndValidity();
      this.validationForm.controls["Relationship"].setValue('');

      this.validationForm.controls["StreetAddress1"].setValue('');
      this.validationForm.controls["StreetAddress2"].setValue('');
      this.validationForm.controls["StreetAddress3"].setValue('');
      this.validationForm.controls["StreetCode"].setValue('');
      this.validationForm.controls["PostalAddress1"].setValue('');
      this.validationForm.controls["PostalAddress2"].setValue('');
      this.validationForm.controls["PostalAddress3"].setValue('');
      this.validationForm.controls["PostalCode"].setValue('');
    }

    if (role.includes('School Coordinator') && role.includes('School Principal')) {

      this.validationForm.controls["seoEmisNumber"].setValidators([Validators.required]);
      this.validationForm.controls["seoEmisNumber"].updateValueAndValidity();
    } else {
      this.validationForm.controls["seoEmisNumber"].clearValidators();
      this.validationForm.controls["seoEmisNumber"].updateValueAndValidity();
      this.validationForm.controls["seoEmisNumber"].setValue('');
    }

  }

  validatePersal() {
    if (this.isEmployee && (this.validationForm.controls["idnumber"].value == "" || this.validationForm.controls["idnumber"].value == undefined)) {
      this.validationForm.controls["persal"].setValidators([Validators.required]);
      this.validationForm.controls["persal"].updateValueAndValidity();
    } else {
      this.validationForm.controls["persal"].clearValidators();
      this.validationForm.controls["persal"].updateValueAndValidity();
    }
  }

  clearIDValidation() {
    if (this.validationForm.controls["persal"].status == "VALID" && this.validationForm.controls["persal"].value != "") {
      this.validationForm.controls["idnumber"].clearValidators();
      this.validationForm.controls["idnumber"].updateValueAndValidity();
      console.log("take persal")
    } else {
      this.validationForm.controls["idnumber"].setValidators([Validators.required]);
      this.validationForm.controls["idnumber"].updateValueAndValidity();
      console.log("else")
    }
  }

  clearPersalValidation() {
    if (this.validationForm.controls["idnumber"].status == "VALID" && this.validationForm.controls["idnumber"].value != "") {
      this.validationForm.controls["persal"].clearValidators();
      this.validationForm.controls["persal"].updateValueAndValidity();
    } else {
      this.validationForm.controls["persal"].setValidators([Validators.required]);
      this.validationForm.controls["persal"].updateValueAndValidity();
    }
  }

  clearValidation() {

    console.log("ID: " + this.validationForm.controls["idnumber"].status)
    console.log("persal: " + this.validationForm.controls["persal"].status)

    if (this.validationForm.controls["persal"].status == "VALID" && this.validationForm.controls["persal"].value != "") {
      this.validationForm.controls["idnumber"].clearValidators();
      this.validationForm.controls["idnumber"].updateValueAndValidity();
    } else if (this.validationForm.controls["idnumber"].status == "VALID" && this.validationForm.controls["idnumber"].value != "") {
      this.validationForm.controls["persal"].clearValidators();
      this.validationForm.controls["persal"].updateValueAndValidity();
    } else {
      this.validationForm.controls["persal"].setValidators([Validators.required]);
      this.validationForm.controls["persal"].updateValueAndValidity();
      this.validationForm.controls["idnumber"].setValidators([Validators.required]);
      this.validationForm.controls["idnumber"].updateValueAndValidity();
      console.log("reset")
    }
  }


  get createForm() {
    return this.validationForm.controls;
  }

  get editForm() {
    return this.validationFormEdit.controls;
  }

  validateIDnumber() {
    this.invalidIdNumber = false;
    if (this.idNumber) {

      if (this.idNumber.length == 13) {
        let birthMonth = parseInt(this.idNumber.substring(2, 4))
        let birthDay = parseInt(this.idNumber.substring(4, 6))

        // SOUTH AFRICAN ID NUMBER VALIDATION
        let evenSingleNumber = this.idNumber[1] + this.idNumber[3] + this.idNumber[5] + this.idNumber[7] + this.idNumber[9] + this.idNumber[11];
        let product = parseInt(evenSingleNumber) * 2;
        let oddSum = parseInt(this.idNumber[0]) + parseInt(this.idNumber[2]) + parseInt(this.idNumber[4]) + parseInt(this.idNumber[6]) + parseInt(this.idNumber[8]) + parseInt(this.idNumber[10]);
        let sum = 0;
        evenSingleNumber = product.toString();
        for (let x = 0; x < evenSingleNumber.length; x++) {
          sum = sum + parseInt(evenSingleNumber[x]);

        }
        let aggregateSum = sum + oddSum;
        let secondChar = aggregateSum.toString();
        let finalResult = 10 - parseInt(secondChar[1]);


        // console.log("oddSum: " + oddSum)
        // console.log("evenSingleNumber: " + evenSingleNumber)
        // console.log("sum: " + sum)
        // console.log("aggregateSum: " + aggregateSum)
        console.log("finalResult: " + finalResult)
        // console.log(finalResult == parseInt(this.idNumber[12]))

        if (finalResult != parseInt(this.idNumber[12]) || birthMonth == 0 || birthMonth > 12 || birthDay == 0 || birthDay > 31) {
          this.invalidIdNumber = true;
        }


        if (parseInt(this.idNumber.substring(6, 10)) < 5000) {
          this.gender = "Female"
        } else if (parseInt(this.idNumber.substring(6, 10)) >= 5000) {
          this.gender = "Male"

        }

      }
    }


    if (this.isCreateFormSubmitted) {
      if (this.isEmployee && !this.idNumber && !this.persal || !this.isEmployee && !this.idNumber) {
        this.emptyUsernumber = true;
        console.log("error field");

      } else {
        this.emptyUsernumber = false;
        console.log("success");

      }

      if (!this.isEmployee && !this.idNumber) {
        this.noIDNumber = true;

      } else {
        this.noIDNumber = false;

      }

    }


    if (this.nationality == "South African" && this.isCreateFormSubmitted) {
      if (this.isEmployee && !this.idNumber && !this.persal || !this.isEmployee && !this.idNumber) {

        if (this.modalService.hasOpenModals()) {
          this.emptyUsernumber = true;
        }

      } else {
        this.emptyUsernumber = false;

      }
    } else if (this.nationality == "Non South African") {
      if (this.passport && this.persal || this.passport && !this.idNumber && !this.persal || !this.passport && this.isEmployee && this.persal) {
        this.emptyUsernumber = false
      } else {
        this.emptyUsernumber = true
      }

    }


    if (!this.isEmployee && !this.idNumber && this.nationality == "South African") {
      this.noIDNumber = true;
    } else if (this.nationality == "Non South African" && !this.passport && !this.isEmployee) {
      this.noIDNumber = true;
    } else {
      this.noIDNumber = false;
    }

    if (!this.isEmployee) {
      this.persal = "";

    }


    console.log(this.emptyUsernumber, this.invalidIdNumber)


  }

  saveNewUser() {
    let role = [];
    let roleOutput = [];
    // let isNumberValid = false;
    let emiscode = this.appService.getLoggedInEmisCode();
    let xCode = this.appService.getLoggedInDistrictCode();
    let yCode
    if(xCode != "null" && xCode != ""){
      yCode = xCode
    }else{
      yCode = this.districtCode
    }
    //alert(yCode)

    if (emiscode && emiscode != "null") {
      if (this.appService.getLoggedInUserRole() == "School Principal" || this.appService.getLoggedInUserRole() == "School Coordinator") {


        this.userservice.getHighestParentID(emiscode).subscribe((id: any) => {
          console.log(id);
          this.parentID = id + 1;
        }, err => {
          console.log(err);

        })
      }
    }


    if (this.idNumber) {
      if (this.idNumber.length == 13) {
        let birthMonth = parseInt(this.idNumber.substring(2, 4))
        let birthDay = parseInt(this.idNumber.substring(4, 6))

        // SOUTH AFRICAN ID NUMBER VALIDATION
        let evenSingleNumber = this.idNumber[1] + this.idNumber[3] + this.idNumber[5] + this.idNumber[7] + this.idNumber[9] + this.idNumber[11];
        let product = parseInt(evenSingleNumber) * 2;
        let oddSum = parseInt(this.idNumber[0]) + parseInt(this.idNumber[2]) + parseInt(this.idNumber[4]) + parseInt(this.idNumber[6]) + parseInt(this.idNumber[8]) + parseInt(this.idNumber[10]);
        let sum = 0;
        evenSingleNumber = product.toString();
        for (let x = 0; x < evenSingleNumber.length; x++) {
          sum = sum + parseInt(evenSingleNumber[x]);

        }
        let aggregateSum = sum + oddSum;
        let secondChar = aggregateSum.toString();
        let finalResult = 10 - parseInt(secondChar[1]);

        if (finalResult != parseInt(this.idNumber[12]) || birthMonth == 0 || birthMonth > 12 || birthDay == 0 || birthDay > 31) {
          this.invalidIdNumber = true;
        }
      }
    }

    if (this.nationality == "South African") {
      if (this.isEmployee && !this.idNumber && !this.persal || !this.isEmployee && !this.idNumber) {

        if (this.modalService.hasOpenModals()) {
          this.emptyUsernumber = true;
        }

      } else {
        this.emptyUsernumber = false;

      }
    } else if (this.nationality == "Non South African") {
      if (this.passport && this.persal || this.passport && !this.idNumber && !this.persal || !this.passport && this.isEmployee && this.persal) {
        this.emptyUsernumber = false
      } else {
        this.emptyUsernumber = true
      }

    }


    if (!this.isEmployee && !this.idNumber && this.nationality == "South African") {
      this.noIDNumber = true;
    } else if (this.nationality == "Non South African" && !this.passport && !this.isEmployee) {
      this.noIDNumber = true;
    } else {
      this.noIDNumber = false;
    }

    console.log(this.validationForm)
    console.log(this.modalService.hasOpenModals(), this.validationForm.valid, !this.noIDNumber, !this.emptyUsernumber, !this.invalidIdNumber)
    console.log(this.nationality == "Non South African" && !this.passport && !this.isEmployee)
    console.log(!this.isEmployee && !this.idNumber && this.nationality == "South African")


    if (this.modalService.hasOpenModals() && this.validationForm.valid && !this.noIDNumber && !this.emptyUsernumber && !this.invalidIdNumber) {

      this.loadingHandler.start();

      if (this.cellNumber[0] == "0") {

        this.userservice.isCellnumberUnique(this.cellNumber).subscribe((result: boolean) => {
          this.isCellnumberDuplicate = !result;
 
          if (result) {
            Swal.fire({
              title: 'Are you sure you want to save this user?',
              text: 'Your user will be processed',
              icon: 'question',
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No'
            }).then((result) => {
              if (result.value) {

                if (this.isEmployee) {
                 
                  this.userservice.createNewEmployee(this.nationality, this.persal, this.idNumber,
                    this.firstname, this.surname, this.gender, this.house,
                    this.street, this.suburb, this.city, this.postalCode,
                    this.informalsettlement, this.cellNumber, this.emailAddress, yCode,
                    this.emisNumber, this.isEmployee, this.level, this.region, this.position).subscribe((userid: any) => {
                      console.log(userid)
                      let testVar = userid.split(":");
                      this.userId = userid;
                      console.log("is Employee")

                      this.loadingHandler.finish()

                      Swal.fire({
                        // timer: 5000,
                        title: "Successful",
                        text: 'User has been successfully created',
                        icon: 'success'
                      }).then(result => {
                        this.modalService.dismissAll();
                        if (result.value || result.isDismissed) {
                          this.router.navigate(['/users/new-user']);
                          window.location.reload()
                        }
                      });

                      this.userservice.sendEmail(this.firstname + " " + this.surname, this.persal, testVar[0], testVar[1]).subscribe(mail => {

                        //Send SMS
                        this.userservice.sendWelcomeSMS(this.firstname + " " + this.surname, testVar[0]).subscribe(mail => {
                          console.log(mail);
                          // Swal.fire({
                          //   // timer: 5000,
                          //   title: "Successful",
                          //   text: 'User has been successfully created',
                          //   icon: 'success'
                          // }).then(result => {
                          //   this.modalService.dismissAll();
                          //   if (result.value || result.isDismissed) {
                          //     window.location.reload()
                          //   }
                          // });


                        }, err => {
                          console.log(err)
                        })


                      }, err => {
                        console.log(err)
                      })



                    }, err => {
                      console.log(err);
                    })


                  let debounceResize: number;
                  debounceResize = window.setTimeout(() => {
                    this.dtOptions = {
                      pagingType: 'full_numbers',
                      pageLength: 10,
                      processing: true,
                      searching: true,
                      ordering: true,
                      destroy: true,
                      order: ['0', 'desc']
                    };

                    this.getResults()
                  }, 5000);
                  this.modalService.dismissAll();

                } else {
                  alert("new SGB")
                  this.userservice.createNewSGB(this.nationality, this.idNumber,
                    this.firstname, this.surname, this.gender, this.house,
                    this.street, this.suburb, this.city, this.postalCode,
                    this.informalsettlement, this.cellNumber, this.emailAddress, this.districtCode,
                    this.emisNumber, this.level, this.region, this.position).subscribe((userid: any) => {

                      let testVar = userid.split(":");
                      console.log(userid);
                      this.userId = userid;

                      this.userservice.sendEmail(this.firstname + " " + this.surname, this.idNumber, testVar[0], testVar[1]).subscribe(mail => {
                        console.log(mail);
                        Swal.fire({
                          // timer: 5000,
                          title: "Successful",
                          text: 'User has been successfully created',
                          icon: 'success'
                        }).then(result => {
                          this.modalService.dismissAll();
                          //if (result.value || result.isDismissed) {
                          this.modalService.dismissAll();
                          this.dtOptions = {
                            pagingType: 'full_numbers',
                            pageLength: 10,
                            processing: true,
                            searching: true,
                            ordering: true,
                            destroy: true,
                            order: ['0', 'desc']
                          };

                          this.getResults()
                          // }
                        });

                      }, err => {
                        console.log(err)
                        Swal.fire({
                          timer: 5000,
                          title: "Error!",
                          text: 'Your entry was unsuccessful, please try again',
                          icon: 'error'
                        });
                      })

                    });

                  let debounceResize: number;
                  debounceResize = window.setTimeout(() => {
                    this.dtOptions = {
                      pagingType: 'full_numbers',
                      pageLength: 10,
                      processing: true,
                      searching: true,
                      ordering: true,
                      destroy: true,
                      order: ['0', 'desc']
                    };

                    this.getResults()
                  }, 5000);
                  this.modalService.dismissAll();

                }

              }else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                  'Cancelled',
                  'Your entry was not save',
                  'error'
                )
              }
            })
          }

        }, err => {
          console.log(err);
          this.cellNumber = "";
        })

      } else {
        this.isNumberInvalid = true;

      }


    }else{
      Swal.fire(
        'Fields required',
        'One or More of the required fields is empty on your form, Please check the fields and update them',
        'info'
      )
    }

    if (this.modalService.hasOpenModals()) {
      this.isCreateFormSubmitted = true;

    }

    // this.isCreateFormSubmitted = true;

  }

  clearPersal() {

    let editIsEmployee = this.validationForm.controls["editIsEmployee"].value;
    let isEmployee = this.validationForm.controls["isEmployee"].value;

    if (!isEmployee) {
      this.validationForm.controls["persal"].setValue("");
    }

    if (!editIsEmployee) {
      this.validationForm.controls["editPersal"].setValue("");
    }


  }

  openLgModal(content) {
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);

    }).
      catch((res) => {
      });

  }

  openLgModaledit(content) {

    if (!this.isEmployee && !this.idNumber) {
      this.noIDNumber = true;

    } else {
      this.noIDNumber = false;

    }
    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      console.log("Modal closed" + result);
    }).catch((res) => { });

  }


  getSchools(e, isSEO) {

    let role = [];    
    if (isSEO) {
      // secondary district and school

      this.userservice.getSchoolsByDistrict(e).subscribe((seo: any) => {
        this.seoSchools = seo;
        this.validationForm.controls["seoEmisNumber"].setValue("");
      })    
    } else {
      // main district and school

      this.validationForm.controls["emisNumber"].setValue("");
      this.userservice.getSchoolsByDistrict(e).subscribe((res: any) => {
        this.schools = res;
        this.seoSchools = res;
        this.validationForm.controls["emisNumber"].setValue("");
      }) 
    }

  }


  editUser(i) {
    let maskIdNumber;
    let role = [];

    console.log(this.data[i]);
    if (this.data[i].idNumber) {
      if (this.data[i].idNumber == null || this.data[i].idNumber == undefined || this.data[i].idNumber == "undefined") {
        maskIdNumber = "";
      } else {
        maskIdNumber = this.data[i].idNumber.substring(0, 6) + "*******";
      }
    } else {
      maskIdNumber = ""
    }

    this.noEditIDnumber = false;
    this.emptyEditUsernumber = false;
    this.selectedUser = this.data[i];
    this.editId = this.data[i].id;
    this.editCity = this.data[i].city;
    this.editComplex = this.data[i].complexName;
    // this.editDesignation = this.data[i].designation;
    this.editEmail = this.data[i].emailAddress;
    // this.editExperience = this.data[i].experience
    this.editGender = this.data[i].gender;
    this.editHouse = this.data[i].houseNumber;
    this.editIdNumber = this.data[i].idNumber;
    this.editPassport = this.data[i].idNumber;
    this.editIdNumber = maskIdNumber
    this.edituserType = this.data[i].userType;

    
    //console.log(this.data[i].userType)
    console.log(this.data[i].position)
    console.log(this.data[i].districtCode)
   
    this.editIsEmployee = this.data[i].isEmployee;
    this.editName = this.data[i].firstname;
    this.editCellNumber = this.data[i].cellNumber;
    this.editPersal = this.data[i].persal;
    // this.editQualification = this.data[i].qualification;
    this.editinformalsettlement = this.data[i].isInformalSettlement;
    this.editSection = this.data[i].section;
    this.editStreet = this.data[i].streetName;
    this.editNationality = this.data[i].citizenship;
    this.editSurname = this.data[i].surname;
    //this.editUserRole = this.data[i].userType;
    this.editEmisNumber = this.data[i].emisNumber
    this.editDistrictCode = this.data[i].districtCode;
    //this.editComplex = this.data[i].complexName;
    this.editLevel = this.data[i].level;
    this.editRegion = this.data[i].region;
    this.editSuburb = this.data[i].suburb;
    this.editPostalCode = this.data[i].postalCode;
    this.editPosition = this.data[i].position;


    if (this.editIdNumber == "undefined" || this.data[i].idNumber == "null" || this.data[i].idNumber == "undefined") {
      this.editIdNumber = "";
      this.editPassport = "";


    }
    if (this.editHouse == "undefined" || this.editHouse == "null") {
      this.editHouse = "";

    }
    if (this.editCity == "undefined" || this.editCity == "null") {
      this.editCity = "";

    }
    if (this.editComplex == "undefined" || this.editComplex == "null") {
      this.editComplex = "";

    }
    if (this.editSection == "undefined" || this.editSection == "null") {
      this.editSection = "";

    }
    if (this.editStreet == "undefined" || this.editStreet == "null") {
      this.editStreet = "";

    }
    if (this.editExperience == "undefined" || this.editExperience == "null") {
      this.editExperience = "";

    }
    if (this.editQualification == "undefined" || this.editQualification == "null") {
      this.editQualification = "";
    }

    if (this.editPosition.includes('School Coordinator') && this.editPosition.includes('School Principal')) {
      // the selected user is assigned to 2 schools
      this.userservice.getUserRoleById(this.editId).subscribe((res: any) => {

        console.log(res)

        let seoRole = res.filter(function (data) {
          return ["School Coordinator"].includes(data.roleName)
        });
        this.editSeoEmisNumber = seoRole[0].emisCode;
        console.log(seoRole[0].emisCode);
      })
    }

    console.log(this.editEmisNumber)



    if (this.editEmisNumber && this.editEmisNumber != "undefined" && this.editEmisNumber != "null") {
      this.userservice.getSchoolByEmisNumber(this.editEmisNumber).subscribe((res: any) => {
        console.log(res)
        this.schoolName = res[0].institutionName
      }, err => {
        console.log(err);
        this.schoolName = ""
      })
    }

    if (this.editDistrictCode && this.editDistrictCode != "undefined" && this.editDistrictCode != "null") {

      this.userservice.getSchoolsByDistrict(this.editDistrictCode).subscribe((seo: any) => {
        this.seoSchools = seo;
      });

      this.userservice.getDistrictByCode(this.editDistrictCode).subscribe((res: any) => {
        console.log(res)
        this.districtName = res[0].district_Name;

      }, err => {
        console.log(err);
        this.districtName = "";
      })
    }

    if (this.editLevel != null && this.editLevel == "District") {
      this.isEditRegion = true;
      this.isEditDistrict = true;
    } else if (this.editLevel != null && this.editLevel == "School") {
      this.isEditRegion = true;
      this.isEditDistrict = true;
      this.isEditSchool = true;
    } else {
      this.isEditRegion = false;
      this.isEditDistrict = false;
      this.isEditSchool = false;
    }


    if (this.editIsEmployee && !this.editIdNumber && !this.editPersal || !this.editIsEmployee && !this.editIdNumber) {
      this.emptyEditUsernumber = true;

    } else {
      this.emptyEditUsernumber = false;

    }

    if (!this.editIsEmployee && !this.editIdNumber) {
      this.noEditIDnumber = true;
    } else {
      this.noEditIDnumber = false;
    }



    if (this.isEmployee && !this.idNumber && !this.persal || !this.isEmployee && !this.idNumber) {
      this.emptyUsernumber = true;

    } else {
      this.emptyUsernumber = false;

    }

    if (!this.isEmployee && !this.idNumber) {
      this.noIDNumber = true;

    } else {
      this.noIDNumber = false;

    }

  }


  validateEditIDnumber() {
    this.noEditIDnumber = false;
    this.emptyEditUsernumber = false;
    this.invalidEditIdNumber = false;

    if (this.editIdNumber) {
      if (this.editIdNumber.length == 13) {
        let birthMonth = parseInt(this.editIdNumber.substring(2, 4))
        let birthDay = parseInt(this.editIdNumber.substring(4, 6))


        if (birthMonth == 0 || birthMonth > 12 || birthDay == 0 || birthDay > 31) {
          this.invalidEditIdNumber = true;
        }
      }
    }


    if (this.editIdNumber.length == 13) {

      if (parseInt(this.editIdNumber.substring(6, 10)) < 5000) {
        this.editGender = "Female"
      } else if (parseInt(this.editIdNumber.substring(6, 10)) >= 5000) {
        this.editGender = "Male"

      }
    }

    if (this.editIsEmployee && !this.editIdNumber && !this.editPersal || !this.editIsEmployee && !this.editIdNumber) {
      this.emptyEditUsernumber = true;
      console.log("error field");

    } else {
      this.emptyEditUsernumber = false;
      console.log("success");

    }

    if (!this.editIsEmployee && !this.editIdNumber) {
      this.noEditIDnumber = true;
    } else {
      this.noEditIDnumber = false;
    }
  }


  updateUser() {
    this.noEditIDnumber = false;
    this.emptyEditUsernumber = false;
    let role = [];
    let roleOutput = [];

    if (this.editIdNumber.length == 13) {
      let birthMonth = parseInt(this.editIdNumber.substring(2, 4))
      let birthDay = parseInt(this.editIdNumber.substring(4, 6))


      if (birthMonth == 0 || birthMonth > 12 || birthDay == 0 || birthDay > 31) {
        this.invalidEditIdNumber = true;
      }
    }


    if (this.editIsEmployee && !this.editIdNumber && !this.editPersal || !this.editIsEmployee && !this.editIdNumber) {
      this.emptyEditUsernumber = true;
      // console.log("error field");

    } else {
      this.emptyEditUsernumber = false;
      // console.log("success");

    }


    if (!this.editIsEmployee && !this.editIdNumber) {
      this.noEditIDnumber = true;
      // console.log("error field");
    } else {
      this.noEditIDnumber = false;
      // console.log("success");
    }

    console.log(this.validationFormEdit);

    if (this.modalService.hasOpenModals() && this.validationFormEdit.valid && !this.emptyEditUsernumber && !this.noEditIDnumber && !this.invalidEditIdNumber) {

      if (this.editCellNumber[0] == "0") {

        // this.userservice.isCellnumberUnique(this.editCellNumber).subscribe((result: Boolean) => {
        //   this.iseditCellnumberDuplicate = !result;

        //   if (result) {
        //   }

        // }, err => {
        //   console.log(err)
        // })

        for (var key in this.editPosition) {
          if (this.editPosition.hasOwnProperty(key)) {
            role.push(this.editPosition[key].roleName);
          }
        }

        if (!role[0] || role == undefined) {
          for (var key in this.editPosition) {
            if (this.editPosition.hasOwnProperty(key)) {
              role.push(this.editPosition[key]);
            }
          }

        }
        Swal.fire({
          title: 'Are you sure you want to save user',
          text: 'A user will be updated',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
          if (result.value) {


            let idnumber;
            if (!this.selectedUser.idNumber || this.editIdNumber.includes('*') && this.selectedUser.idNumber.substring(0, 6) + "*******" == this.editIdNumber.substring(0, 6) + "*******") {
              idnumber = this.selectedUser.idNumber;
            } else {
              idnumber = this.editIdNumber;
            }
            // let roletest = '"HO":"","DEO":"TN","PEO":""'roleOutput

            if (role.includes('School Coordinator') && role.includes('School Principal')) {
              roleOutput.push('"School Principal":"' + this.editEmisNumber + '"')
              roleOutput.push('"School Coordinator":"' + this.editSeoEmisNumber + '"')

            }
            if (role.includes('School Coordinator') && !role.includes('School Principal')) {
              roleOutput.push('"School Coordinator":"' + this.editEmisNumber + '"')

            }
            if (!role.includes('School Coordinator') && role.includes('School Principal')) {
              roleOutput.push('"School Principal":"' + this.editEmisNumber + '"')

            }
            if (role.includes('District Director')) {
              roleOutput.push('"District Director":"' + this.editDistrictCode + '"')

            }
            if (role.includes('District Administrator')) {
              roleOutput.push('"District Administrator":"' + this.editDistrictCode + '"')

            }
            if (role.includes('Provincial Monitor')) {
              roleOutput.push('"Provincial Monitor":""');

            }
            if (role.includes('Head Office Director')) {
              roleOutput.push('"Head Office Director":""');

            }
            if (role.includes('Head Office Administrator')) {
              roleOutput.push('"Head Office Administrator":""');

            }
            if (role.includes('Head Office Coordinator')) {
              roleOutput.push('"Head Office Coordinator":""');

            }         
            if (role.includes('District Coordinator')) {
              roleOutput.push('"District Coordinator":"' + this.editDistrictCode + '"');

            }
            if (role.includes('District Monitor')) {
              roleOutput.push('"District Monitor":"' + this.editDistrictCode + '"');

            }

            // this.userservice.updateUserProfileEmployee(this.editId, this.editName, this.editSurname,
            //   this.editCellNumber, this.editEmail, this.editHouse, this.editComplex, this.editStreet, this.editSection,
            //   this.editCity, this.editExperience, this.editQualification, this.editGender, this.editDesignation, roleOutput, this.editPersal
            // )
            this.userservice.updateUserProfileEmployee(this.editId, this.editNationality, this.editPersal, this.editIdNumber, this.editName, this.editSurname, this.editGender,
              this.editHouse, this.editStreet, this.editSuburb, this.editCity, this.editPostalCode, this.editinformalsettlement, this.editCellNumber,
               this.editEmail, this.editDistrictCode, this.editEmisNumber, this.editLevel, this.editRegion, this.editPosition)
              .subscribe(res => {
                console.log(res);
                Swal.fire({
                  // timer: 5000,
                  title: "Successful",
                  text: 'User has been successfully updated',
                  icon: 'success'
                }).then((results) => {
                  if (results.value || results.isDismissed) {
                    this.modalService.dismissAll();
                    this.dtOptions = {
                      pagingType: 'full_numbers',
                      pageLength: 10,
                      processing: true,
                      searching: true,
                      ordering: true,
                      destroy: true,
                      order: ['0', 'desc']
                    };

                    this.getResults()
                    this.router.navigate(['/users/new-user']);
                    window.location.reload()
                    
                  }
                })
              }, err => {
                console.log(err);
                Swal.fire({
                  timer: 5000,
                  title: "Error!",
                  text: 'Your entry was unsuccessful, please try again',
                  icon: 'error'
                });

              });

          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire(
              'Cancelled',
              'Your entry was not save',
              'error'
            )
          }
        })



      } else {
        this.iseditNumberInvalid = true;
      }


    }
    this.isEditFormSubmitted = true;


  }

  Cancel() {

    this.router.navigate(['/dashboard']);

    this.isCreateFormSubmitted = false;
    this.emptyEditUsernumber = false;
    this.modalService.dismissAll();

    this.validationForm.controls["firstname"].setValue("");
    this.validationForm.controls["surname"].setValue("");
    this.validationForm.controls["isEmployee"].setValue(false);
    this.validationForm.controls["gender"].setValue("");
    this.validationForm.controls["idnumber"].setValue("");
    this.validationForm.controls["persal"].setValue("");
    this.validationForm.controls["userType"].setValue("");
    this.validationForm.controls["designation"].setValue("");
    this.validationForm.controls["informalsettlement"].setValue(false);
    this.validationForm.controls["house"].setValue("");
    this.validationForm.controls["complex"].setValue("");
    this.validationForm.controls["street"].setValue("");
    this.validationForm.controls["section"].setValue("");
    this.validationForm.controls["city"].setValue("");
    this.validationForm.controls["cellNumber"].setValue("");
    this.validationForm.controls["emailAddress"].setValue("");
    this.validationForm.controls["isBlacklisted"].setValue(false);
    this.validationForm.controls["qualification"].setValue("");
    this.validationForm.controls["experience"].setValue("");
    //this.validationForm.controls["roleSelected"].setValue("");
    this.validationForm.controls["nationality"].setValue("");

    this.validationForm.controls["level"].setValue("");
    this.validationForm.controls["region"].setValue("");
    //this.validationForm.controls[""].setValue("");

    if (this.loggedInRole == "District Director" || this.loggedInRole == "District Administrator") {
      this.validationForm.controls["districtCode"].setValue(this.appService.getLoggedInDistrictCode());
      this.validationForm.controls["emisNumber"].setValue("");
      this.validationForm.controls["seoEmisNumber"].setValue("");
      this.seoSchools = [];
      this.schools = [];

      if (false) {
        this.validationForm.controls["districtCode"].setValue(this.appService.getLoggedInDistrictCode());
      }

    } else if (this.loggedInRole == "SGB" || this.loggedInRole == "School Principal" || this.loggedInRole == "PARENT" || this.loggedInRole == "School Coordinator") {
      this.validationForm.controls["districtCode"].setValue(this.appService.getLoggedInDistrictCode());
      this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());

      if (false) {
        this.validationForm.controls["seoDistrictCode"].setValue(this.appService.getLoggedInDistrictCode());
        this.validationForm.controls["seoEmisNumber"].setValue(this.appService.getLoggedInEmisCode());

      }

    } else {
      this.validationForm.controls["districtCode"].setValue("");
      this.validationForm.controls["seoDistrictCode"].setValue("");
      this.validationForm.controls["emisNumber"].setValue("");
      this.validationForm.controls["seoEmisNumber"].setValue("");
      this.seoSchools = [];
      this.schools = [];

    }


  }

  //Get District Name
  getDistrictName(code) {

    if (code) {

      let district = this.districts.filter(function (data) {

        return code == data.districtCode;
      });
      if (district) {

        return district[0].districtName;

      }

    } else {

      return null;
    }
  }

  //Removing underscore
  getFilterRoleName(role) {

    if (role) {

      return role.replace('_', ' ').replace('_', ' ').replace('_', ' ');

    }

  }
  //new Feb
  uniqueByKey(array, key) {
    return [...new Map(array.map((x) => [x[key], x])).values()];
  }

  getSchoolName(emisNumber, isSEO) {


    if (isSEO) {
      // secondary district and school
      this.userservice.getSchoolByEmisNumber(emisNumber).subscribe((res: any) => {
        this.seoSchoolName = res[0].institution;
      }, err => {
        this.seoSchoolName = null;
      })
    } else {
      // main district and school

      this.userservice.getSchoolByEmisNumber(emisNumber).subscribe((res: any) => {
        this.parentSchool = res.institution;
      }, err => {
        this.parentSchool = null;
      })
    }

  }


  showHide(flag) {
    let role = [];

    if (flag == "seo") {
      // show additional school and district fields
      // for (var key in this.roleSelected) {
      //   if (this.roleSelected.hasOwnProperty(key)) {
      //     role.push(this.roleSelected[key].roleName);
      //   }
      // }

      if (role || role.length > 0) {
        return role.includes('School Coordinator') && role.includes('School Principal');
      } else {
        return false;
      }

    } else if (flag == "parent") {
      //
      // for (var key in this.roleSelected) {
      //   if (this.roleSelected.hasOwnProperty(key)) {
      //     role.push(this.roleSelected[key].roleName);
      //   }
      // }

      if (role.includes('PARENT') || this.loggedInRole == "School Principal") {
        return true;
      } else {
        return false;
      }

    } else if (flag == "notparent") {
      // show additional school and district fields
      // for (var key in this.roleSelected) {
      //   if (this.roleSelected.hasOwnProperty(key)) {
      //     role.push(this.roleSelected[key].roleName);
      //   }
      // }


      if (this.loggedInRole != "School Principal") {
        return true;
      } else {
        return false;
      }

    } else if (flag == "district") {
      // show additional school and district fields
      // for (var key in this.roleSelected) {
      //   if (this.roleSelected.hasOwnProperty(key)) {
      //     role.push(this.roleSelected[key].roleName);
      //   }
      // }


      if (role.includes('SGB') || role.includes('School Coordinator') || role.includes('District Administrator') || role.includes('District Director') || role.includes('School Principal') || role.includes('District Monitor') || role.includes('District Coordinator') || this.loggedInRole == "School Principal") {
        return true;
      } else {
        return false;
      }

    } else if (flag == "school") {
      // show additional school and district fields
      // for (var key in this.roleSelected) {
      //   if (this.roleSelected.hasOwnProperty(key)) {
      //     role.push(this.roleSelected[key].roleName);
      //   }
      // }

      if (role.includes('SGB') || role.includes('School Coordinator') || role.includes('School Principal') || role.includes('PARENT') || this.loggedInRole == "School Principal") {
        return true;
      } else {
        return false;
      }

    } else if (flag == "districtupdate") {
      // on edit form show hide district
      for (var key in this.editPosition) {
        if (this.editPosition.hasOwnProperty(key)) {
          role.push(this.editPosition[key].roleName);
        }
      }

      if (!role[0] || role == undefined) {
        for (var key in this.editPosition) {
          if (this.editPosition.hasOwnProperty(key)) {
            role.push(this.editPosition[key]);
          }
        }

      }


      if (role.includes('SGB') || role.includes('School Coordinator') || role.includes('District Administrator') || role.includes('District Director') || role.includes('School Principal') || role.includes('District Monitor') || role.includes('District Coordinator') || role.includes('PARENT')) {
        return true;
      } else {
        return false;
      }

    } else if (flag == "schoolupdate") {
      // on edit form show hide school
      for (var key in this.editPosition) {
        if (this.editPosition.hasOwnProperty(key)) {
          role.push(this.editPosition[key].roleName);
        }
      }

      if (!role[0] || role == undefined) {
        for (var key in this.editPosition) {
          if (this.editPosition.hasOwnProperty(key)) {
            role.push(this.editPosition[key]);
          }
        }

      }

      // console.log(role)
      if (role.includes('SGB') || role.includes('School Coordinator') || role.includes('School Principal') || role.includes('PARENT')) {
        return true;
      } else {
        return false;
      }

    } else if (flag == "seoupdate") {
      // show additional school and district fields
      for (var key in this.editPosition) {
        if (this.editPosition.hasOwnProperty(key)) {
          role.push(this.editPosition[key].roleName);
        }
      }
      if (!role[0] || role == undefined) {
        for (var key in this.editPosition) {
          if (this.editPosition.hasOwnProperty(key)) {
            role.push(this.editPosition[key]);
          }
        }

      }

      // console.log(role)
      if (role && role.length > 0) {
        return role.includes('School Coordinator') && role.includes('School Principal');
      } else {
        return false;
      }

    } else if (flag == "blacklist") {
      // show blacklist option base on the logged in user role
      for (var key in this.editPosition) {
        if (this.editPosition.hasOwnProperty(key)) {
          role.push(this.editPosition[key]);
        }
      }
      return false
    } {
      return false;
    }

  }


  resetPassportNumber() {
    this.validationForm.controls["passport"].setValue("");
    this.validationForm.controls["idnumber"].setValue("");
    this.emptyUsernumber = false;

    if (this.nationality == "South African" && this.isCreateFormSubmitted) {
      if (this.isEmployee && !this.idNumber && !this.persal || this.isCreateFormSubmitted && !this.isEmployee && !this.idNumber) {

        if (this.modalService.hasOpenModals()) {
          this.emptyUsernumber = true;
        }

      } else {
        this.emptyUsernumber = false;

      }
    } else if (this.nationality == "Non South African") {
      if (this.passport && !this.idNumber && !this.persal || !this.passport && this.isEmployee && this.persal) {
        this.emptyUsernumber = false
      } else {
        this.emptyUsernumber = true
      }

    }


    if (!this.isEmployee && !this.idNumber && this.nationality == "South African") {
      this.noIDNumber = true;
    } else if (this.nationality == "Non South African" && !this.passport && !this.isEmployee) {
      this.noIDNumber = true;
    } else {
      this.noIDNumber = false;

    }
  }

  validateEditDistrict() {
    let districtCode = this.validationFormEdit.controls["editDistrictCode"].value;
    let role = [];

    for (var key in this.editPosition) {
      if (this.editPosition.hasOwnProperty(key)) {
        role.push(this.editPosition[key].roleName);
      }
    }
    console.log(this.editPosition)


    if (role.includes('Provincial Monitor') || role.includes('Head Office Coordinator') || role.includes('Head Office Administrator') || role.includes('Head Office Director')) {
      // this.validationFormEdit.controls["editDistrictCode"].setValue("");
      this.schools = [];
      this.seoSchools = [];
    }


    if (role.includes('PARENT') || role.includes('SGB') || role.includes('School Coordinator') || role.includes('District Administrator') || role.includes('District Director') || role.includes('School Principal') || role.includes('District Coordinator') || role.includes('District Monitor')) {
      // this.validationFormEdit.controls["editDistrictCode"].setValidators([Validators.required]);
      // this.validationFormEdit.controls["editDistrictCode"].updateValueAndValidity();

    } else {
      // this.validationFormEdit.controls["editDistrictCode"].clearValidators();
      // this.validationFormEdit.controls["editDistrictCode"].updateValueAndValidity();

    }


    if (role.includes('PARENT') || role.includes('SGB') || role.includes('School Coordinator') || role.includes('School Principal')) {

      if (districtCode) {
        this.userservice.getSchoolsByDistrict(districtCode).subscribe((res: any) => {

          if (this.loggedInRole == "SGB" || this.loggedInRole == "School Coordinator" || this.loggedInRole == "School Principal") {

            this.districtCode = this.appService.getLoggedInDistrictCode();
            this.validationFormEdit.controls["editDistrictCode"].setValue(this.appService.getLoggedInDistrictCode());
            this.validationFormEdit.controls["editDistrictCode"].disable();

            this.editEmisNumber = this.appService.getLoggedInEmisCode();
            this.validationFormEdit.controls["editEmisNumber"].setValue(this.appService.getLoggedInEmisCode());
            this.validationFormEdit.controls["editEmisNumber"].disable();

            // this.userservice.getSchoolsByDistrict(this.appService.getLoggedInDistrictCode()).subscribe((school: any) => {
            //   this.schools = school;
            //   this.emisNumber = this.appService.getLoggedInEmisCode();
            //   this.validationForm.controls["emisNumber"].setValue(this.appService.getLoggedInEmisCode());
            //   this.validationForm.controls["emisNumber"].disable();
            // }, err => {
            //   console.log(err);
            //   this.router.navigate(['/dashbaord'])
            // });

          } else {
            this.schools = res;
            // this.validationFormEdit.controls["editEmisNumber"].setValue("");

          }
        }, err => {
          console.log(err);
        });
      }

      // this.validationFormEdit.controls["editEmisNumber"].setValidators([Validators.required]);
      // this.validationFormEdit.controls["editEmisNumber"].updateValueAndValidity();


    } else {
      // this.validationFormEdit.controls["editEmisNumber"].clearValidators();
      // this.validationFormEdit.controls["editEmisNumber"].updateValueAndValidity();
      if (this.loggedInRole != "School Principal" || this.loggedInRole != "School Coordinator") {
        this.schools = []

      }

    }


    if (role.includes('School Coordinator') || role.includes('Provincial Monitor') || role.includes('Head Office Coordinator') || role.includes('District Administrator') || role.includes('District Director') || role.includes('School Principal')) {
      this.editIsEmployee = true;
    } else {
      this.editIsEmployee = false;
    }

    // if (role.includes('PARENT')) {
    //   this.validationFormEdit.controls["TypeOfInstitution"].setValidators([Validators.required]);
    //   this.validationFormEdit.controls["TypeOfInstitution"].updateValueAndValidity();
    //   this.validationFormEdit.controls["Relationship"].setValidators([Validators.required]);
    //   this.validationFormEdit.controls["Relationship"].updateValueAndValidity();

    //   this.validationFormEdit.controls["informalsettlement"].setValue(false);
    //   this.validationFormEdit.controls["house"].setValue('');
    //   this.validationFormEdit.controls["complex"].setValue('');
    //   this.validationFormEdit.controls["street"].setValue('');
    //   this.validationFormEdit.controls["section"].setValue('');
    //   this.validationFormEdit.controls["city"].setValue('');


    // } else {
    //   this.validationFormEdit.controls["TypeOfInstitution"].clearValidators();
    //   this.validationFormEdit.controls["TypeOfInstitution"].updateValueAndValidity();
    //   this.validationFormEdit.controls["TypeOfInstitution"].setValue('');
    //   this.validationFormEdit.controls["Relationship"].clearValidators();
    //   this.validationFormEdit.controls["Relationship"].updateValueAndValidity();
    //   this.validationFormEdit.controls["Relationship"].setValue('');

    //   this.validationFormEdit.controls["StreetAddress1"].setValue('');
    //   this.validationFormEdit.controls["StreetAddress2"].setValue('');
    //   this.validationFormEdit.controls["StreetAddress3"].setValue('');
    //   this.validationFormEdit.controls["StreetCode"].setValue('');
    //   this.validationFormEdit.controls["PostalAddress1"].setValue('');
    //   this.validationFormEdit.controls["PostalAddress2"].setValue('');
    //   this.validationFormEdit.controls["PostalAddress3"].setValue('');
    //   this.validationFormEdit.controls["PostalCode"].setValue('');
    // }

    if (role.includes('School Coordinator') && role.includes('School Principal')) {

      // this.validationFormEdit.controls["editSeoEmisNumber"].setValidators([Validators.required]);
      // this.validationFormEdit.controls["editSeoEmisNumber"].updateValueAndValidity();
    } else {
      // this.validationFormEdit.controls["editSeoEmisNumber"].clearValidators();
      // this.validationFormEdit.controls["editSeoEmisNumber"].updateValueAndValidity();
      this.validationFormEdit.controls["editSeoEmisNumber"].setValue('');
    }

  }

  // isParent() {

  //   let role = [];
  //   for (var key in this.roleSelected) {
  //     if (this.roleSelected.hasOwnProperty(key)) {
  //       //  console.log(this.selectedPeople[key].id);
  //       role.push(this.roleSelected[key].roleName);
  //     }
  //   }

  //   if (role.includes(''))
  // }
  public roleName: any = [];
  public docuTypeRole: any;
  // viewRolesShowUpload(role){
  //   this.roleName = false
  //   for(let i = 0; i<role.length; i++){
  //     if(role[i].roleName.includes('Provincial Monitor') || role[i].roleName.includes('District Director') || role[i].roleName.includes('School Coordinator') || role[i].roleName.includes('District Monitor')|| role[i].roleName.includes('DISTRICT_OBSERVER') || role[i].roleName.includes('Provincial Monitor') || role[i].roleName.includes('OFFICE_BEARER')||role[i].roleName.includes('PROVINCIAL_OBSERVER') || role[i].roleName.includes('DISTRICT_ELECTORAL_TEAM') || role[i].roleName.includes('School Coordinator') || role[i].roleName.includes('District Monitor')|| role[i].roleName.includes('SCHOOL_TASK_TEAM') || role[i].roleName.includes('INTER_PROVINCIAL_TASK_ TEAM'))
  //     this.roleName = true
  //     this.docuTypeRole = role[i].roleName
  //     }
  //     //alert(this.docuTypeRole)
  // }

  public appointmentLetter = []
  onUpload() {
    this.activeModal.close();
    console.log('onUploadSuccess:', this.uploadEvent);
    if (this.docuTypeRole == "Provincial Monitor") {
      this.selectedReport = "Provincial Electoral Officer Appointment Letter"
    } else if (this.docuTypeRole == "District Director") {
      this.selectedReport = "District Electoral Officer Appointment Letter"
    }
    else if (this.docuTypeRole == "District Administrator") {
      this.selectedReport = "District Electoral Officer Appointment Letter"
    }
    else if (this.docuTypeRole == "School Coordinator") {
      this.selectedReport = "School Electoral Officer Appointment Letter"
    }
    else if (this.docuTypeRole == "District Monitor") {
      this.selectedReport = "District Monitor Appointment Letter"
    }
    else if (this.docuTypeRole == "DISTRICT_OBSERVER") {
      this.selectedReport = "District Observer Appointment Letter"
    }
    else if (this.docuTypeRole == "Provincial Monitor") {
      this.selectedReport = "Provincial Monitor Appointment Letter"
    }
    else if (this.docuTypeRole == "PROVINCIAL_OBSERVER") {
      this.selectedReport = "Provincial Observer Appointment Letter"
    }
    else if (this.docuTypeRole == "DISTRICT_ELECTORAL_TEAM") {
      this.selectedReport = "Provincial Electoral Team Appointment Letter"
    }
    else if (this.docuTypeRole == "SCHOOL_TASK_TEAM") {
      this.selectedReport = "School Task Team Appointment Letter"
    }
    else if (this.docuTypeRole == "INTER_PROVINCIAL_TASK_ TEAM") {
      this.selectedReport = "Inter Provincial Task Team Appointment Letter"
    }



    this.newDocs = {
      "title": this.selectedReport,
      "documentTypeId": 4,
      "documentPath": this.docPath,
      "uploadedBy": this.appService.getLoggedInUserId(),
      "emisCode": this.emisNumber,
      "schoolName": this.schoolname,
      "districtCode": this.districtCode,
      "districtName": this.districtName,
      "reportType": this.selectedReport
    }
    this.appointmentLetter.push(this.newDocs)
    console.log(JSON.stringify(this.newDocs))
    //alert(JSON.stringify(this.newDocs))

  }

  //Activate user
  ActivateStatus(id, firstname, surname, persal) {
    console.log(id);
    this.userId = id;
    this.firstname = firstname;
    this.surname = surname;
    this.persal = persal;
    this.status = "Active";

    Swal.fire({
      title: 'Are you sure you want to  Activate save user' + "  " + this.firstname + " " + this.surname + " " + " With  User Name  " + this.persal,
      text: 'A user will be activated',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {
        this.userservice.UpdateStatus(this.userId, this.status).subscribe(res => {

          Swal.fire({
            timer: 5000,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            title: "Successful",
            text: this.firstname + ' has been successfully activated',
            icon: 'success'
          }).then(result => {

            this.modalService.dismissAll();
            if (result.value || result.isDismissed) {
              this.dtOptions = {
                pagingType: 'full_numbers',
                pageLength: 10,
                processing: true,
                searching: true,
                ordering: true,
                destroy: true,
                order: ['0', 'desc']
              };

              this.getResults()
            }
          });
        }, err => {
          console.log(err);
        })
      }
    });
  }

  //Deactivate user
  DeactivateStatus(id, firstname, surname, persal) {
    console.log(id);
    this.userId = id;
    this.firstname = firstname;
    this.surname = surname;
    this.persal = persal;
    this.status = "Deactivated";

    Swal.fire({
      title: 'Are you sure you want to  deactivate user' + "  " + this.firstname + " " + this.surname + " " + " With  User Name  " + this.persal,
      text: 'A user will be deactivated',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No'
    }).then((result) => {

      if (result.value) {
        this.userservice.UpdateStatus(this.userId, this.status).subscribe(res => {

          Swal.fire({
            timer: 5000,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            title: "Successful",
            text: this.firstname + ' has been successfully deactivated',
            icon: 'success'
          }).then(result => {

            this.modalService.dismissAll();
            if (result.value || result.isDismissed) {
              this.dtOptions = {
                pagingType: 'full_numbers',
                pageLength: 10,
                processing: true,
                searching: true,
                ordering: true,
                destroy: true,
                order: ['0', 'desc']
              };
              this.getResults()
            }
          });
        }, err => {
          console.log(err);
        })
      }
    });
  }

  // Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showOverlay = true;
    }
    if (event instanceof NavigationEnd) {
      this.showOverlay = false;
    }

    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.showOverlay = false;
    }
    if (event instanceof NavigationError) {
      this.showOverlay = false;
    }
  }


}
