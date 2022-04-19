import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchoolMenuService {

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

  getAllMenues(){
    return this.http.get(this.base_url +'api/MenuCalculator/GetSchoolMenu');
  }

  createMenu(){
    return this.http.get(this.base_url +'api/MenuCalculator/CreateSchoolMenu');
  }

  updateMenu(){
    return this.http.get(this.base_url +'api/MenuCalculator/UpdateSchoolMenu');
  }

  daysOfWeek(){
    return this.http.get(this.base_url +'api/MenuCalculator/WeekDays');
  }

  daysOfMenu(){
    return this.http.get(this.base_url +'api/MenuCalculator/Menu');
  }

  getSchoolType(){
    return this.http.get(this.base_url +'api/MenuCalculator/GetSchoolType');
  }
}
