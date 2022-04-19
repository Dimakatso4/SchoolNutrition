import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { MonthlyFundRegister } from './monthlyfundregister.model';

@Injectable({
  providedIn: 'root'
})
export class MonthlyreportService {

  constructor(private http: HttpClient) { }
  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;
  readonly APIUrl="https://localhost:5001/api/";
  
  formData: MonthlyFundRegister = new MonthlyFundRegister();
  list: MonthlyFundRegister[];

   getfundRegList()
  {
    return this.http.get("https://localhost:5001/api/MonthlyFundRegister/GetfundRegById")
  }
  
  AddFundReg(data)
  {
    return this.http.post("api/MonthlyFundRegister/Create", data, { headers: this.Header })
  }

  UpdateFundReg(data)
  {
    return this.http.put("https://localhost:5001/api/MonthlyFundRegister/Update", data, { headers: this.Header })

  }
  DeleteFundRed(data)
  {
    return this.http.delete("https://localhost:5001/api/MonthlyFundRegister/Delete")

  }

  getMonList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'MonthlyFundRegister');
  }

  addMonthlyReport(val:any){
    return this.http.post(this.APIUrl+'/MonthlyFundRegister',val);
  }
  updateMonthlyReport(val:any){
    return this.http.put(this.APIUrl+'/MonthlyFundRegister',val);
  }
  deleteMonthlyReport(val:any){
    return this.http.delete(this.APIUrl+'/MonthlyFundRegister/'+val);
  }

  //New method
  postMonthlyFundRegister()
  {
     return this.http.post(this.base_url, this.formData);
  }
  putMonthlyFundRegister()
  {
     return this.http.put(`${this.base_url}/${this.formData.fundRegId}`, this.formData);
  }
   refreshlist(){
     this.http.get(this.base_url).toPromise()
     .then(res => this.list = res as MonthlyFundRegister[]);
   }

  



}
