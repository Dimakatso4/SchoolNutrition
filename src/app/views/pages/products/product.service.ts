import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
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

  getUnit() {
    return this.http.get(this.base_url +'/api/ReferenceData/GetUnit');
  }

  getFoodGroup() {
    return this.http.get(this.base_url +'api/MenuCalculator/FoodGroup');
  }

  getProducType() {
    return this.http.get(this.base_url +'/api/ReferenceData/GetType');
  }

  createProduct(productJSON){
    return this.http.post(this.base_url +'api/Product/CreateProduct',productJSON, { headers: this.Header });
  }

  updateProduct(productJSON){
    return this.http.post(this.base_url +'api/Product/UpdateProduct',productJSON, { headers: this.Header });
  }

  getStarch(){
    return this.http.get(this.base_url +'/api/MenuCalculator/Starch');
  }

  getBreakfast(){
    return this.http.get(this.base_url +'/api/MenuCalculator/Breakfast');
  }

  getProtein(){
    return this.http.get(this.base_url +'/api/MenuCalculator/Protein');
  }

  getSeasoning(){
    return this.http.get(this.base_url +'/api/MenuCalculator/Seasoning');
  }

}
