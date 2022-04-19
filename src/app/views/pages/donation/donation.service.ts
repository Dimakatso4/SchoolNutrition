import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product, SchoolDonation } from '../../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  private httpOptions: any;
  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;
  uploadLink = this.base_url + 'api/Upload/Document';

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  };
  }

  // postSchoolDonation(schoolDonationPayLoad: SchoolDonation): Observable<any> {
  //   return this.http.post<any>(this.base_url + 'api/Donation/Create', schoolDonationPayLoad, { headers: this.Header });
  // }

postSchoolDonation(schoolDonationPayLoad: SchoolDonation): Observable<any> {
    return this.http.post<any>(this.base_url + 'api/SchoolDonation/Create', schoolDonationPayLoad, { headers: this.Header });
  }
  getDocumentByType(id) {
    return this.http.get(this.base_url + 'api/Document/GetDocumentByType?DocumentTypeId=' + id)
  }

  deleteDocument(id) {
    console.log(JSON.stringify(this.base_url + 'api/Document/Delete?Id=' + id))
    return this.http.post(this.base_url + 'api/Document/Delete?Id=' + id, { headers: this.Header });
  }

  getDocumentCount() {
    return this.http.get(this.base_url + 'api/Document/Count');
  }
  // get donation list
  getDonationlist(): Observable<Product[]> {
    return this.http.get<Product[]>(this.base_url + 'api/ReferenceData/GetProductsList');
  }

 
  getSchoolDonationlist() {
    return this.http.get(this.base_url + 'api/SchoolDonation/GetDonationList');
  }


  //Get School Doanation Data

// getSchoolDonationlist(): Observable<Product[]> {
//     return this.http.get<Product[]>(this.base_url + 'api/ReferenceData/GetProductsList');
//   }

  // getSchoolDonationlist(): Observable<Product[]> {
  //   return this.http.get( 'api/SchoolDonation/GetDonationList');
  // }

  
  // Create(data) {
  //   return this.http.post(this.base_url + 'api/Donation/Create',data,{ headers: this.Header })
  // }

  // AddDonation(data)
  // {

  //   return this.http.post("https://localhost:5001/api/Donation/Create", data, { headers: this.Header })
  // }

  UpdateSupplier(
    DonationID
    , FoodGroup
    , Product
  , NumberofLearnerstobeFed
  ,DateCaptured
    ,ReasonForrequestingDonation
     , Quarantine
     , Quantity1
    )
  {
    return this.http.post(this.base_url + 'api/Donation/UpdateDonation?Id=' +DonationID+ '&FoodGroup=' +FoodGroup+ '&Product=' +Product+ '&NumberofLearnerstobeFed=' +NumberofLearnerstobeFed+ '&DateCaptured=' +DateCaptured+ '&ReasonForrequestingDonation=' +ReasonForrequestingDonation+ '&Quarantine=' +Quarantine+ '&Quantity1=' +Quantity1 , {headers: this.Header});
  }
  // getSupplierById(id)
  // {
  //   return this.http.get("https://localhost:5001/api/Supplier/GetSupplierByID?ID=" +id)
  // }

  Create1(data) {
    return this.http.post(this.base_url + 'api/Donation/Create',data,{ headers: this.Header })
  }
 
  sendActivateEmail(NumberofLearnerstobeFed, DonationID, pass) {
    return this.http.post(this.base_url + 'api/Mail/SendWelcomeEmailToSupplierAsync' + NumberofLearnerstobeFed + '&Id=' + DonationID + '&Pass=' + pass, { headers: this.Header })
  }

}


