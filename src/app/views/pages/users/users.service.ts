import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { compileDirectiveFromMetadata } from '@angular/compiler';
//import { receiveMessageOnPort } from 'worker_threads';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;




  createUser(newUser) {
    console.log(newUser);
    return this.http.post(this.base_url + "api/User/Create", newUser).subscribe(data => {
      console.log(data);
      console.log("new user created")
    }, error => {
      console.log(JSON.stringify(error.json()));
    });

  }

  ///////////////get user by id///////////////////////
  getUserById(id) {
    return this.http.get(this.base_url + "api/User/GetById?Id=" + id);

  }
  //////////////////////User role
  getUserRoleById(id) {
    return this.http.get(this.base_url + "api/User/UserRole?Id=" + id);

  }


  getRolesByUserRole(role) {
    return this.http.get(this.base_url + "api/ReferenceData/RolesByUserRole?Role=" + role)
  }


  //////////////Get all users//////////////api/User/UserRole
  getAllUsers() {
    return this.http.get(this.base_url + "api/User/UserList")

  }

  getUsersByRole(role) {
    return this.http.get(this.base_url + "api/User/GetUsersByRole?Role=" + role)
  }

  getPositionByOfficeLevel(level) {
    return this.http.get(this.base_url + "api/ReferenceData/GetPositionByOfficeLevel?level=" +level)
  }
  //////////////Update User Profile//////////////



  // updateUserProfileEmployee(id, Firstname, Surname, CellNumber, EmailAddress,
  //   House, Complex, Street, Section, City, experience, qualification, gender,
  //   designation, UserType, Persal) {

  //   console.log(this.base_url + "api/User/UpdateUserProfile?id=" + id + "&Firstname=" + Firstname + "&Surname=" + Surname + "&CellNumber=" + CellNumber + "&EmailAddress=" + EmailAddress + "&House=" + House + "&Complex=" + Complex + "&Street=" + Street + "&Section=" + Section + "&City=" + City + "&ProvinceId=" + 0 + "&Experience=" + experience + "&Qualification=" + qualification + "&Gender=" + gender + "&Designation=" + designation + "&UserType={" + UserType + "}&Persal=" + Persal);

  //   return this.http.post(this.base_url + "api/User/UpdateUserProfile?id=" + id + "&Firstname=" + Firstname + "&Surname=" + Surname + "&CellNumber=" + CellNumber + "&EmailAddress=" + EmailAddress + "&House=" + House + "&Complex=" + Complex + "&Street=" + Street + "&Section=" + Section + "&City=" + City + "&ProvinceId=" + 0 + "&Experience=" + experience + "&Qualification=" + qualification + "&Gender=" + gender + "&Designation=" + designation + "&UserType={" + UserType + "}&Persal=" + Persal, { headers: this.Header });

  // }

  updateUserProfileEmployee(Id, Nationality, Persal, IDNumber, Firstname, Surname, Gender,
    House, Street, Suburb, City, PostalCode, IsInformalSettlement, CellNumber, EmailAddress, 
    DistrictCode, EmisNumber, Level, Region, Position) 
  {
    console.log(this.base_url + "api/User/UpdateUserProfile?Id=" +Id+ "&Citizenship=" +Nationality+ "&Persal=" +Persal+"&IDNumber=" +IDNumber+ "&Firstname=" +Firstname+ "&Surname=" +Surname+ "&Gender=" +Gender+ "&HouseNumber=" +House+ "&StreetName=" +Street+ "&Suburb=" +Suburb+ "&City=" +City + "&PostalCode=" +PostalCode+ "&IsInformalSettlement=" +IsInformalSettlement+ "&CellNumber=" +CellNumber+ "&EmailAddress=" +EmailAddress+  "&DistrictCode=" +DistrictCode+ "&EmisNumber=" + EmisNumber + "&Level=" +Level+ "&Region=" + Region + "&Position=" + Position);
    return this.http.post(this.base_url + "api/User/UpdateUserProfile?Id=" +Id+ "&Citizenship=" +Nationality+ "&Persal=" +Persal+"&IDNumber=" +IDNumber+ "&Firstname=" +Firstname+ "&Surname=" +Surname+ "&Gender=" +Gender+ "&HouseNumber=" +House+ "&StreetName=" +Street+ "&Suburb=" +Suburb+ "&City=" +City + "&PostalCode=" +PostalCode+ "&IsInformalSettlement=" +IsInformalSettlement+ "&CellNumber=" +CellNumber+ "&EmailAddress=" +EmailAddress+ "&DistrictCode=" +DistrictCode+ "&EmisNumber=" + EmisNumber + "&Level=" +Level+ "&Region=" + Region + "&Position=" + Position, { headers: this.Header });
  }


  //////////////////Roles////////////////////////
  getAllRoles() {
    return this.http.get(this.base_url + "api/ReferenceData/Roles")

  }
  //////////////////Designations////////////////////////
  getAllDesignations() {
    return this.http.get(this.base_url + "api/ReferenceData/Designations")
  }
  //////////////////District////////////////////////
  getAllDistricts() {
    return this.http.get(this.base_url + "api/ReferenceData/Districts")

  }
  ////////////////school//////////////////////////
  getSchoolsByDistrict(id) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?DistrictCode=" + id)

  }
  ////////////////Create Profile//////////////////////
  saveUser(newUser) {
    return this.http.post(this.base_url + "api/User/UserProfile", newUser)
  }
  
  createNewSGB(Nationality, IDNumber, Firstname,
    Surname, Gender, House,
    Street, Suburb, City, PostalCode,
    InformalSettlement, CellNumber, EmailAddress,
    DistrictCode, EmisNumber, Level, Region, Position){
      return this.http.post(this.base_url + "api/User/UserProfileSGBViaUserMan?Citizenship=" +Nationality+ "&IDNumber=" + IDNumber +"&Firstname=" + Firstname +"&Surname=" + Surname +"&Gender=" + Gender + "&HouseNumber=" +House+"&StreetName=" +Street+"&Suburb=" +Suburb+"&City=" +City +"&PostalCode=" +PostalCode+ "&IsInformalSettlement=" +InformalSettlement+"&CellNumber=" +CellNumber+ "&EmailAddress=" +EmailAddress+ "&Password=" +null+ "&DistrictCode=" +DistrictCode+ "&EmisNumber=" + EmisNumber + "&Level=" + Level+ "&Region=" + Region+ "&Position=" + Position, { headers: this.Header });
    } 

  createNewEmployee(Nationality, Persal, IDNumber, Firstname,
    Surname, Gender, House,
    Street, Suburb, City, PostalCode,
    InformalSettlement, CellNumber, EmailAddress,
    DistrictCode, EmisNumber, IsEmployee, Level, Region, Position) {
     //console.log(this.base_url + "api/User/UserProfileEmployeeViaUserMan?Citizenship=" +Nationality+"&Persal=" +Persal+ "&IDNumber=" + IDNumber +"&Firstname=" + Firstname +"&Surname=" + Surname +"&Gender=" + Gender + "&HouseNumber=" +House+ "&ComplexName=" +Complex+"&StreetName=" +Street+"&Section=" +Section+"&City=" +City+ "&IsInformalSettlement=" +InformalSettlement+"&CellNumber=" +CellNumber+ "&EmailAddress=" +EmailAddress+ "&Password=" +null+ "&UserType={" + UserType + "}&DistrictCode=" +DistrictCode+ "&EmisNumber=" + EmisNumber);
     return this.http.post(this.base_url + "api/User/UserProfileEmployeeViaUserMan?Citizenship=" +Nationality+"&Persal=" +Persal+ "&IDNumber=" + IDNumber +"&Firstname=" + Firstname +"&Surname=" + Surname +"&Gender=" + Gender + "&HouseNumber=" +House+"&StreetName=" +Street+"&Suburb=" +Suburb+"&City=" +City+ "&PostalCode=" +PostalCode+ "&IsInformalSettlement=" +InformalSettlement+"&CellNumber=" +CellNumber+ "&EmailAddress=" +EmailAddress+ "&Password=" +null+ "&DistrictCode=" +DistrictCode+ "&EmisNumber=" +EmisNumber+ "&IsEmployee=" +IsEmployee+ "&Level=" +Level+ "&Region=" +Region+ "&Position=" +Position, { headers: this.Header });
  }


  generatePasswordById(Id) {
    return this.http.post(this.base_url + "api/User/ResetUserPassword?Id=" + Id, { headers: this.Header });
  }

  //////////////////Password Reset////////////////////////
  getEmployeeByPersalOrIDNumber(Id) {
    return this.http.get(this.base_url + "api/User/GetEmployeeByPersalOrIDNumber?Id=" + Id);
  }

  getSGBByIDNumber(Id) {
    return this.http.get(this.base_url + "api/User/getSGBByIDNumber?Id=" + Id);
  }

  getGenerateTempPassword(Id) {
    return this.http.get(this.base_url + "api/User/GenerateTempPasswordByUserId?Id=" + Id);
  }

  //////////////////Send email/SMS on success////////////////////////
  sendEmail(fullName,persal, id, pass) {
    return this.http.post(this.base_url + "api/Mail/SendWelcomeMail?UserName=" + fullName + "&Persal=" + persal + "&Id=" + id + "&Pass=" + pass, { headers: this.Header })
  }

  sendWelcomeSMS(fullName, id) {
    return this.http.post(this.base_url + "api/SMS/SendWelcomeSMS?UserName=" + fullName + "&Id=" + id, { headers: this.Header })
  }

  sendResetPasswordSMS(fullName, id) {
    return this.http.post(this.base_url + "api/SMS/SendResetPasswordSMS?UserName=" + fullName + "&Id=" + id, { headers: this.Header })
  }

  sendResetEmail(fullName, id) {
    return this.http.post(this.base_url + "api/Mail/SendResetMail?UserName=" + fullName + "&Id=" + id, { headers: this.Header })
  }

  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNo=" + school)
  }
 
  getDistrictByCode(code) {
    return this.http.get(this.base_url + "api/ReferenceData/DistrictByCode?Code=" + code)   
  }

  getDistrictNameByCode(code) {
    return this.http.get(this.base_url + "api/ReferenceData/DistrictNameByCode?Code=" + code)   
  }

  getDistrictCode(district) {
    return this.http.get(this.base_url + "api/ReferenceData/GetDistrictCodeByName?District=" + district)   
  }

  isCellnumberUnique(cellnumber) {
    return this.http.get(this.base_url + "api/User/IsCellphoneAvailable?Cellphonenumber=" + cellnumber);

  }

  isDuplicatePersal(persal){
    return this.http.get(this.base_url + "api/User/IsPersalAvailable?Persal=" + persal);
  }

  getUserByPersal(persal) {
    return this.http.get(this.base_url + "api/User/GetUserByPersaNumber?Persal=" + persal)
  }

  getUserByIDNumber(idNumber) {
    return this.http.get(this.base_url + "api/User/GetUserByIdNumber?IdNumber=" + idNumber)
  }

  //Get Levels
  getLevels()
  {
    return this.http.get(this.base_url + "api/ReferenceData/GetLevels")
  }

  //Get Regions
  getRegions()
  {
    return this.http.get(this.base_url + "api/ReferenceData/GetRegion")
  }

  //Get District
  getDistrictByRegion(region)
  {
    return this.http.get(this.base_url + "api/ReferenceData/GetDistrictByRegion?region=" + region)
  }



  createNewParent(EmisCode, District, Firstname,
    Lastname, Telephone, Email,
    IdNumber, Institution, TypeOfInstitution, Gender,
    Occupation, PostalAddress1, PostalAddress2,
    PostalAddress3, PostalCode, Relationship, StreetAddress1, StreetAddress2,
    StreetAddress3, StreetCode, ParentID) {
    // return this.http.post(this.base_url + "api/Parent/AddParent?&EmisCode=" + emisNumber + "&District=" + DistrictCode + "&Firstname=" + Firstname + "&Lastname=" + Surname + "&Telephone=" + CellNumber + "&Email=" + EmailAddress + "&IdNumber=" + IDNumber + "&Nationality=" + NationalityX + "&Gender=" + Gender + "&Informalsettlement=" + Informalsettlement + "&House=" + House + "&Complex=" + Complex + "&Street=" + Street + "&Section=" + Section + "&City=" + City + "&UserType=" + UserType + "&AboutMe=" + AboutMe + "&Experience=" + experience + "&Qualification=" + qualification, { headers: this.Header })
    return this.http.post(this.base_url + "api/Parent/AddParent?&EmisCode=" + EmisCode + "&District=" + District + "&Firstname=" + Firstname + "&Lastname=" + Lastname + "&Telephone=" + Telephone + "&Email=" + Email + "&IdNumber=" + IdNumber + "&Institution=" + Institution + "&TypeOfInstitution=" + TypeOfInstitution + "&Gender=" + Gender + "&Occupation=" + Occupation + "&PostalAddress1=" + PostalAddress1 + "&PostalAddress2 =" + PostalAddress2 + "&PostalAddress3=" + PostalAddress3 + "&PostalCode=" + PostalCode + "&Relationship=" + Relationship + "&StreetAddress1=" + StreetAddress1 + "&StreetAddress2=" + StreetAddress2 + "&StreetAddress3=" + StreetAddress3 + "&StreetCode=" + StreetCode + "&ParentID=" + ParentID, { headers: this.Header })


  }

  getAllParent() {
    // return this.http.get(this.base_url + "api/ReferenceData/Districts")

  }


  getHighestParentID(code) {
    return this.http.get(this.base_url + "api/Parent/GetMaxParentId?EmisCode=" + code);

  }
  //Nompumelelo
  getSupplierByVendorNo(VendorNo)
  {
    return this.http.get(this.base_url+"api/Supplier/GetSupplierByVendorNo?vendorNo="+VendorNo)
  }
  UpdateSupplier(info)    
  {
    return this.http.post(this.base_url+"api/Supplier/UpdateSupplier"+info, {headers: this.Header});
  }
  ////Nompumelelo

  //Deactivate user
  UpdateStatus(id, status)
  {
    return this.http.post(this.base_url + "api/User/UpdateInActiveUser?Id="+id+"&Status=" +status, {headers: this.Header})
  }

}
