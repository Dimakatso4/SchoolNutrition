import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SdDeliveryScheduleService {

  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;
  uploadLink = this.base_url + "api/Upload/Document";

  constructor(private http: HttpClient) { }
    getStatus()

  {

    return this.http.get("https://localhost:5001/api/Status/DocumentList");

  }

  saveDeliveryNote(deliveryNote){
    console.log(JSON.stringify(deliveryNote));
    return this.http.post(this.base_url + "api/SupplierSummary/SaveSupplierDelivery", deliveryNote, { headers: this.Header })
  }

  saveDocumentPath(electionDocs) {
    return this.http.post(this.base_url + "api/Document/Create", electionDocs, { headers: this.Header })
  }

  getDocumentById(id) {
    return this.http.get(this.base_url + "api/Document/DocumentList?Id=" + id)
  }

  getSupplierSummaryById(id)
  {
    return this.http.get(this.base_url + "api/SupplierSummary/GetSupplierSummaryById?Id=" + id)
  }


  getUserById(id) {
    return this.http.get(this.base_url +"api/User/GetById?id=" + id)//"api/Document/GetDocumentByUser?UserId=" 
  }

  getDocumentBySchool(emiscode, usertype) {
    return this.http.get(this.base_url + "api/User/GetListOfUsers?EmisCode=" + emiscode + "&UserType=" + usertype)
  }

  getDocumentByType(id) {
    return this.http.get(this.base_url + "api/Document/GetDocumentByType?DocumentTypeId=" + id)
  } 

  deleteDocument(id) {
    console.log(JSON.stringify(this.base_url + "api/Document/Delete?Id=" + id))
    return this.http.post(this.base_url + "api/Document/Delete?Id=" + id, { headers: this.Header });
  }

  getDocumentCount() {
    return this.http.get(this.base_url + "api/Document/Count");
  }

  getDocumentTypes() {
    return this.http.get(this.base_url + "api/ReferenceData/DocumentTypes");
  }

  uploadDocument(doc) {    
    return this.http.post(this.uploadLink, doc)
  }

 getProductShare() {    
    return this.http.get(this.base_url + "api/Product/GetProduct");
  }

  getAllQueries(){
    return this.http.get(this.base_url + "/api/SupplierSummary/GetAllQueries");
  }
 


}
