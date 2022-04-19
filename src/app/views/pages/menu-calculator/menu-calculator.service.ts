import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product, SchoolDonation } from '../../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class MenuCalculatorService {

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    responseType: 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;
  uploadLink = this.base_url + 'api/Upload/Document';

  constructor(private http: HttpClient) { }
 
  getSchoolsBySchoolName(institution) {
    return this.http.get(this.base_url +'api/ReferenceData/GetDetailsBySchoolName?Institution=' + institution);//
  }
  getDistricts() {
    return this.http.get(this.base_url +'api/ReferenceData/Districts');//
  }

  getSchoolRollBySchoolName(school){
    return this.http.get(this.base_url +'api/ReferenceData/GetSchoolRollBySchoolName?Institution='+ school);
  }

  getSchools() {
    return this.http.get(this.base_url +'api/ReferenceData/GetSchools');//
  }

  getSchoolsByDistrict(id) {
    return this.http.get(this.base_url + 'api/ReferenceData/SchoolsByDistrictId?DistrictCode=' + id)
  }

  getFoodGroup(){
    return this.http.get(this.base_url + 'api/MenuCalculator/FoodGroup')
  }

  getBreakfast(){
    return this.http.get(this.base_url + 'api/MenuCalculator/Breakfast')
  }

  getBreakfastById(id){
    return this.http.get(this.base_url + 'api/MenuCalculator/BreakfastById?Id=' + id)
  }

  getStarch(){
    return this.http.get(this.base_url + 'api/MenuCalculator/Starch')
  }

  getStarchById(id){
    return this.http.get(this.base_url + 'api/MenuCalculator/StarchById?Id=' + id)
  }
  
  getProtein(){
    return this.http.get(this.base_url + 'api/MenuCalculator/Protein')
  }

  getProteinById(id){
    return this.http.get(this.base_url + 'api/MenuCalculator/ProteinById?Id=' + id)
  }

  getSeasoning(){
    return this.http.get(this.base_url + 'api/MenuCalculator/Seasoning')
  }

  getSeasoningById(id){
    return this.http.get(this.base_url + 'api/MenuCalculator/SeasoningById?Id=' + id)
  }

  getFruitOrVegitable(){
    return this.http.get(this.base_url + 'api/MenuCalculator/FruitOrVegitable')
  }

  getFruitOrVegitableById(id){
    return this.http.get(this.base_url + 'api/MenuCalculator/FruitOrVegitableById?Id=' + id)
  }

  getSchoolTypeData(){
    return this.http.get(this.base_url + 'api/MenuCalculator/GetSchoolType')
  }

  getSchoolTypeById(id){
    return this.http.get(this.base_url + 'api/MenuCalculator/GetSchoolTypeById?Id=' + id)
  }

  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNo=" + school)
  }

  getSchoolLevelBySchoolName(school){
    return this.http.get(this.base_url + "api/MenuCalculator/GetSchoolLevelBySchool?Institute=" + school)
  }

}
