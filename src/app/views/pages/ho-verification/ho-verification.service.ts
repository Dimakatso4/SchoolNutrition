import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HOVerificationService {

  localStorage: Storage;

  base_url = environment.base_url;

  changes$ = new Subject();

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  constructor(private http: HttpClient) { 
    this.localStorage   = window.localStorage;
  }

  getSSEInstrument()
  {
    return this.http.get(this.base_url + "api/VerificationForm/GetLastVerification");
  }
  
  getVerification()
  {
    return this.http.get(this.base_url + "api/VerificationForm/GetVerificationList");
  }
  //
  getFacilicities()
  {
    return this.http.get(this.base_url + "/api/ReferenceData/GetFacilities");

    //https://localhost:5001/api/ReferenceData/GetFacilities
  }
  //


  createGradeVerification(gradeInfo)
  {
    return this.http.post(this.base_url + "api/GradeVerification/CreateGradeVerification",gradeInfo,{ headers: this.Header })
  }

  CreateNSNPGrade(AddNSNPgrade)
  {
    return this.http.post(this.base_url + "api/NSNP/CreateNSNPGrade",AddNSNPgrade,{ headers: this.Header })
    
  }
//
getNsnp()
  {
    return this.http.get(this.base_url + "api/NSNP/GetNSNP");

  }
//

getStatus()
{

  return this.http.get(this.base_url + "api/NSNP/GetNSNPStatus");
}
//
getNsnpG()
{

  return this.http.get(this.base_url + "/api/NSNP/GetNSNPGrade");
}
//
getNsnpById(id)
  {
    return this.http.get(this.base_url + "api/NSNP/GetNSNPById?Id" + id);

  }
//


  //
  getSchoolByEmisNumber(school) {

    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNo=" + school)

  }
  sendEmailToDistrict(username,id,district,school)
  {
    return this.http.post(this.base_url + "api/Mail/SendMailToDistrict?UserName="+username+"&Id="+id+"&District="+district+"&School="+school,{ headers: this.Header })
  }
}
