import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NsnpRegistrationService {

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
    return this.http.get(this.base_url + "api/NSNP/GetLastVerification");
  }

  createNSNP(nsnpInfo)
  {
      return this.http.post(this.base_url + "api/NSNP/CreateNSNP",nsnpInfo).subscribe(data => {
    }, error => {
      alert("creation unsuccesful")
    });
  }
  grtGrades()
  {
    return this.http.get(this.base_url + "api/NSNP/GetGrade")
  }
  getFacilities()
  {
    return this.http.get(this.base_url + "api/ReferenceData/GetFacilities")
  }
  getChildreanPlace()
  {
    return this.http.get(this.base_url + "api/ReferenceData/GetChildLivePlace")
  }
  CreateNSNPGrade(AddNSNPgrade)
  {
    return this.http.post(this.base_url + "api/NSNP/CreateNSNPGrade",AddNSNPgrade,{ headers: this.Header })
  }
  //02 March
  updateNSNPStatus(NSNPform)
  {
    return this.http.post(this.base_url + "api/NSNP/UpdateNSNP",NSNPform,{ headers: this.Header })
  }
  sendEmailToDistrict(username,id,district,school)
  {
    return this.http.post(this.base_url + "api/Mail/SendMailToDistrict?UserName="+username+"&Id="+id+"&District="+district+"&School="+school,{ headers: this.Header })
  }

  getSchoolByEmisNumber(school) {
    return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNo=" + school)
  }

  getDistrictByCode(code) {
    return this.http.get(this.base_url + "api/ReferenceData/DistrictByCode?Code=" + code)
  }

  getNSNP()
  {
    return this.http.get(this.base_url + "api/NSNP/GetNSNP");
  }
}
