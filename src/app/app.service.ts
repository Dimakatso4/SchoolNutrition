import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor() { }

  getLoggedInUserRole() {
    return localStorage.getItem("userRole");
  }
  setLoggedInUserRole(value) {
    localStorage.setItem("userRole", value);
  }

  getLoggedInSchoolLevel() {
    return localStorage.getItem("schoolLevel");
  }

  setLoggedInSchoolLevel(value) {
    localStorage.setItem("schoolLevel", value);
  }
  //2022/04/05
  getLoggedInOfficeLevel() {
    return localStorage.getItem("level");
  }

  setLoggedInOfficeLevel(value) {
    localStorage.setItem("level", value);
  }
  getLoggedInRegion() {
    return localStorage.getItem("region");
  }

  setLoggedInRegion(value) {
    localStorage.setItem("region", value);
  }

  getLoggedInEmisCode() {
    return localStorage.getItem("emisCode");
  }

  setLoggedInEmisCode(value) {
    localStorage.setItem("emisCode", value);
  }

  getLoggedInEmisNumber() {
    return localStorage.getItem("emisNumber");
  }

  setLoggedInPersalNumber(value) {
    localStorage.setItem("persal", value);
  }

  getLoggedInPersalNumber() {
    return localStorage.getItem("persal");
  }

  setLoggedInEmisNumber(value) {
    localStorage.setItem("emisNumber", value);
  }


  getLoggedInDistrictCode() {
    return localStorage.getItem("districtCode");
  }

  setLoggedInDistrictCode(value) {
    localStorage.setItem("districtCode", value);
  }

  getLoggedInDistrictName() {
    return localStorage.getItem("districtName");
  }

  setLoggedInDistrictName(value) {
    localStorage.setItem("districtName", value);
  }

  getLoggedInUserId() {
    return localStorage.getItem("userId");
  }

  setLoggedInUserId(value) {
    localStorage.setItem("userId", value);
  }
  GetLoggedEmployeeByPersalOrIDNumber(){
    return localStorage.getItem("Persal");
  }
  setLoggedEmployeeByPersalOrIDNumber(value){
    localStorage.setItem("Persal",value);
  }

  getLoggedInUserIdentity() {
    return localStorage.getItem("idnumber");
  }

  setLoggedInUserIdentity(value) {
    localStorage.setItem("idnumber", value);
  }

  getIsLoggedInUser() {

    if (localStorage.getItem("isLoggedIn"))
      return true;
    else {
      localStorage.setItem("isLoggedIn", "false");
      return false;
    }

    //return localStorage.getItem("isLoggedIn");
  }

  setIsLoggedInUser(value) {
    localStorage.setItem("isLoggedIn", value);
  }

  getIsLoggedInUsername() {
    return localStorage.getItem("username");
  }

  setIsLoggedInUsername(value) {
    localStorage.setItem("username", value);
  }
  

  getLoggedInParentId() {
    return localStorage.getItem("parentId");
  }

  setLoggedInParentId(value) {
    localStorage.setItem("parentId", value);
  }

  getUserHasMultipeRoles() {
    return localStorage.getItem("MultipleRoles");
  }

  setUserHasMultipeRoles(value) {
    localStorage.setItem("MultipleRoles", value);
  }

  getIsLoggedInSuppliername() {
    return localStorage.getItem("supplier");
  }

  setIsLoggedInSuppliername(value) {
    localStorage.setItem("supplier", value);
  }

}
function value(arg0: string, value: any) {
  throw new Error('Function not implemented.');
}

