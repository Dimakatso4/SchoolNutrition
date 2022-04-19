import { Component, OnInit,ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { DropzoneDirective, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder,FormArray, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-non-pdel',
  templateUrl: './non-pdel.component.html',
  styleUrls: ['./non-pdel.component.scss']
})
export class NonPDelComponent implements OnInit {


  public ProductType:boolean = false;
  public ConfirmProduct:boolean = false;
  public Onions:boolean = false;
  public tomato:boolean = false;
  public Quantity:boolean = false;
  public ConfirmQuantity:boolean = false;


  public rice:boolean = false;
  public samp:boolean = false;
  public buttonName:any = 'Show';


  validationForm: FormGroup;
  isCreateFormSubmitted: Boolean;
  public districtcode;

  public noDocuments;
  public documents;
  public userRole;
  public officialtitle;

  public assignedTo;

  newDocs: any = {};
  public docsTitle: any;
  public FileName: any;
  isFormSubmitted: Boolean;
  public docPath = "";
  uploadedDocument: File = null;


  @ViewChild(DropzoneDirective, { static: false }) directiveRef?: DropzoneDirective;

  constructor( private fb: FormBuilder,
    private modalService: NgbModal,
    // private sddeliveryScheduleService: SdDeliveryScheduleService,
    private appservice: AppService, 
    public formBuilder: FormBuilder,public router:Router) { this.productForm = this.fb.group({
      name: '',
      quantities: this.fb.array([]),
    });}

    public status = "";
    

  public parentname;
  public parentsurname;

  isSGB: boolean;
  isParent: boolean;

  public allRoles: any;
  public editUserRole;

  public user;
  userId;




  public config: DropzoneConfigInterface = {
    clickable: true,
    // url: this.sddeliveryScheduleService.uploadLink, //this.manageentplanservice.UploadNewDocument(),
    maxFiles: 1,
    autoReset: null,
    errorReset: null,
    cancelReset: null,
    addRemoveLinks: true,
    maxFilesize: 50,
    acceptedFiles: 'image/*, application/*'
  };

  ngOnInit(): void {

    this.validationForm = this.fb.group({

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
    school:['', Validators.required ],
    contactNo:['', Validators.required ],
    venderNo:['', Validators.required ],
    password:['', Validators.required ]
    
    });

    // if (this.appservice.getLoggedInUserRole() == "SEO") {
    //   this.assignedTo = "DEO"
    // } else {
    //   this.assignedTo = "SEO"
    // }

    // this.validationForm = this.formBuilder.group({
    //   parentname: ['', Validators.required],
    //   parentsurname: ['', Validators.required],
    //   officialname: ['', Validators.required],
    //   details: ['', Validators.required],
    //   officialtitle: [{ value: 'SEO', disabled: true }],
    //   district: [''],
    //   schoolname: [''],
    // });



    // this.isCreateFormSubmitted = false;
    // this.officialtitle = "SEO"
    // this.userId = this.appservice.getLoggedInUserId();
    // this.userRole = this.appservice.getLoggedInUserRole();

    // if (this.userRole == "SGB") {
    //   this.isSGB = true;
    // } else {
    //   this.isSGB = false
    // }

    // this.libraryservice.getUserById(this.userId).subscribe((user: any) => {
    //   console.log(user)
    //   this.user = user;

    //   this.districtcode = this.user.districtCode;

    //   if (this.userRole == "PARENT") {
    //     this.isParent = true;
    //     this.validationForm.controls["parentname"].setValue(user.firstname);
    //     this.validationForm.controls["parentname"].disable();
    //     this.validationForm.controls["parentsurname"].setValue(user.surname);
    //     this.validationForm.controls["parentsurname"].disable();

    //   } else if (this.isSGB) {
    //     this.parentname = this.user.firstname;
    //     this.parentsurname = this.user.surname;
    //     this.officialtitle = "SEO";
    //   } else if (this.userRole == "SEO") {

    //     // this.validationForm.controls["officialtitle"].setValue(user.emailAddress);
    //     this.validationForm.controls["officialname"].setValue(user.firstname + ' ' + user.surname);
    //     this.validationForm.controls["officialname"].disable();
    //   }



  }
  

 
 

  openFileBrowser(event: any) {
    event.preventDefault();
    let element: HTMLElement = document.querySelector("#fileUploadInputExample") as HTMLElement;
    element.click();

  }


  onmousedown = function (e) {
    var el = e.target;
    if (el.tagName.toLowerCase() == 'option' && el.parentNode.hasAttribute('multiple')) {
        e.preventDefault();

        // toggle selection
        if (el.hasAttribute('selected')) el.removeAttribute('selected');
        else el.setAttribute('selected', '');

        // hack to correct buggy behavior
        var select = el.parentNode.cloneNode(true);
        el.parentNode.parentNode.replaceChild(select, el.parentNode);
    }
}


  handleFileInput(event: any) {
    if (event.target.files.length) {
      let element: HTMLElement = document.querySelector("#fileUploadInputExample + .input-group .file-upload-info") as HTMLElement;
      let fileName = event.target.files[0].name;

      this.uploadedDocument = <File>event.target.files[0];
      element.setAttribute('value', fileName.substring(0, fileName.lastIndexOf(".")));
      this.FileName = fileName.substring(0, fileName.lastIndexOf("."));
    }
  }

  name = 'Angular';

  productForm: FormGroup;

  submit(){
    this.router.navigate(['NonPerishableDelivery'])
  }
  
  isActivityNameSelected:boolean;
  //Show and hide 
   selectInput(event){
     let selected = event.target.value;
     if(selected =="Unexpected" ){
       this.isActivityNameSelected=true;
     }else{
       this.isActivityNameSelected=false;
     }
 
  }

  isActivityNameSelectedGreen:boolean;
  //Show and hide 
   selectInputGreen(event){
     let selected = event.target.value;
     if(selected =="Unexpected" ){
       this.isActivityNameSelectedGreen=true;
     }else{
       this.isActivityNameSelectedGreen=false;
     }
 
  }

  isActivityNameSelectedYellow:boolean;
  //Show and hide 
   selectInputYellow(event){
     let selected = event.target.value;
     if(selected =="Unexpected" ){
       this.isActivityNameSelectedYellow=true;
     }else{
       this.isActivityNameSelectedYellow=false;
     }
 
  }


  isActivityNameSelectedC:boolean;
  //Show and hide 
   selectInputC(event){
     let selected = event.target.value;
     if(selected =="Unexpected" ){
       this.isActivityNameSelectedC=true;
     }else{
       this.isActivityNameSelectedC=false;
     }
 
  }
 

  
  isActivityNameSelectedOnions:boolean;
  //Show and hide 
   selectInputOnions(event){
     let selected = event.target.value;
     if(selected =="Unexpected" ){
       this.isActivityNameSelectedOnions=true;
     }else{
       this.isActivityNameSelectedOnions=false;
     }
 
  }

    
  isActivityNameSelectedT:boolean;
  //Show and hide 
   selectInputT(event){
     let selected = event.target.value;
     if(selected =="Unexpected" ){
       this.isActivityNameSelectedT=true;
     }else{
       this.isActivityNameSelectedT=false;
     }
 
  }



  isConfirmQ1:boolean;
  //Show and hide 
   selectInput1(event){
     let selected = event.target.value;
     if(selected =="No" ){
       this. isConfirmQ1 =true;
     }else{
       this. isConfirmQ1=false;
     }
 
  }

  isConfirmQ2:boolean;
  //Show and hide 
   selectInput2(event){
     let selected = event.target.value;
     if(selected =="No" ){
       this. isConfirmQ2=true;
     }else{
       this. isConfirmQ2=false;
     }
 
  }

  isConfirmQ3:boolean;
  //Show and hide 
   selectInput3(event){
     let selected = event.target.value;
     if(selected =="No" ){
       this. isConfirmQ3=true;
     }else{
       this. isConfirmQ3=false;
     }
 
  }

  isConfirmQ4:boolean;
  //Show and hide 
   selectInput4(event){
     let selected = event.target.value;
     if(selected =="No" ){
       this. isConfirmQ4=true;
     }else{
       this. isConfirmQ4=false;
     }
 
  }

  isConfirmQ5:boolean;
  //Show and hide 
   selectInput5(event){
     let selected = event.target.value;
     if(selected =="No" ){
       this. isConfirmQ5=true;
     }else{
       this. isConfirmQ5=false;
     }
 
  }


  isRating1:boolean;
  //Show and hide 
   selectInR1(event){
     let selected = event.target.value;
     if(selected =="Poor" ){
       this.isRating1 =true;
     }else{
       this.isRating1 =false;
     }
 
  }

  isRating2:boolean;
  //Show and hide 
   selectInR2(event){
     let selected = event.target.value;
     if(selected =="Poor" ){
       this.isRating2 =true;
     }else{
       this.isRating2 =false;
     }
 
  }


  isRating3:boolean;
  //Show and hide 
   selectInR3(event){
     let selected = event.target.value;
     if(selected =="Poor" ){
       this.isRating3 =true;
     }else{
       this.isRating3 =false;
     }
 
  }

  isRating4:boolean;
  //Show and hide 
   selectInR4(event){
     let selected = event.target.value;
     if(selected =="Poor" ){
       this.isRating4 =true;
     }else{
       this.isRating4 =false;
     }
 
  }

  isRating5:boolean;
  //Show and hide 
   selectInR5(event){
     let selected = event.target.value;
     if(selected =="Poor" ){
       this.isRating5 =true;
     }else{
       this.isRating5 =false;
     }
 
  }
  openEditModel1(content){  this.modalService.open(content, { size: 'lg' }).result.then((result) => {
    console.log("Modal closed" + result);
   
}).catch((res) => { });

 }
}


    // this.isFormSubmitted = true;
    // Swal.fire({
    //   timer: 3500,
    //   title: "Unsuccessful",
    //   text: 'Your entry was unsuccessful, please try again',
    //   icon: 'error'
    // });