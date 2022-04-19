import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonthlyDelieveriesSchedulesService {

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

  getAllDates() {
    return this.http.get(this.base_url +'/api/SupplierSummary/GetMonthlyDelieveryDates');
  }

  addNewDelieveryDate(json){
    return this.http.post(this.base_url +'/api/SupplierSummary/AddMonthlyDelieveryDates',json, { headers: this.Header });
  }
}
