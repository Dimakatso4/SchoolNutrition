import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Product, SchoolDonation } from '../../../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class DeliveryScheduleService {

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
  getStatus()
  {
    return this.http.get(this.base_url + 'api/Status/DocumentList');
  }
  getQuarterId(id) {
    return this.http.get(this.base_url + 'api/FeedingQuarter/GetMonthByQuarter' + id)//
  }
  getSchoolsBySchoolName(institution) {
    return this.http.get(this.base_url +'api/ReferenceData/GetDetailsBySchoolName?Institution=' + institution);//
  }
  getMonthByQuarter(quarter) {
    return this.http.get(this.base_url +'api/FeedingQuarter/GetMonthByQuarter?quarter=' + quarter);
  }

  getMonths() {
    return this.http.get(this.base_url +'api/FeedingMonth/GetMonthList');
  }

  getSupplierSummary() {
    return this.http.get(this.base_url +'api/SupplierSummary/GetSupplierSummary');
  }

  getDistricts() {
    return this.http.get(this.base_url +'api/ReferenceData/Districts');//
  }

  getSupplierBySchoolName(school){
    return this.http.get(this.base_url +'api/ReferenceData/GetSupplierBySchoolName?Institution='+ school);
  }

  getSchoolRollBySchoolName(school){
    return this.http.get(this.base_url +'api/ReferenceData/GetSchoolRollBySchoolName?Institution='+ school);
  }
//   appfactorywholeschoolimprovementdev.database.windows.net



// afadmin



// t8Yd7vhhEpRs!FC
  getSupplierSummaryById(id) {
    return this.http.get(this.base_url +'api/SupplierSummary/GetSupplierSummaryById?Id=' + id)//
  }
    
  getSchools() {
    return this.http.get(this.base_url +'api/ReferenceData/GetSchools');//
  }

  getSchoolsByDistrict(id) {

  return this.http.get(this.base_url + 'api/ReferenceData/SchoolsByDistrictId?DistrictCode=' + id)
}


createSupplierSummary(data)
{console.log(data)
  return this.http.post(this.base_url + 'api/SupplierSummary/CreateSupplierSummary', data, { headers: this.Header })
}

createPerishableProduct(data)
{console.log(data)
  return this.http.post(this.base_url + 'api/PerishableProduct/CreatePerishableProduct', data, { headers: this.Header })
}
// getSchoolDonationlist() {
//   return this.http.get(this.base_url + 'api/SchoolDonation/GetDonationList');
// }
getSchoolDonationlist() {
  return this.http.get(this.base_url + 'api/SchoolDonation/GetDonationList');
}

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

postSchoolDonation(schoolDonationPayLoad: SchoolDonation): Observable<any> {
    return this.http.post<any>(this.base_url + 'api/SchoolDonation/Create', schoolDonationPayLoad, { headers: this.Header });
  }
  // postSchoolDonation(schoolDonationPayLoad: SchoolDonation): Observable<any> {
  //   return this.http.post<any>('https://localhost:5001/api/SchoolDonation/Create', schoolDonationPayLoad, { headers: this.Header });
  // }
updateUserProfileEmployee(SupplierSummaryId, Quarter, Month, StartDate, EndDate, District, SchoolName) {

  console.log(this.base_url + 'api/Users/UpdateUser?SupplierSummaryId=' + SupplierSummaryId + '&Quarter=' + Quarter + '&Month=' + Month + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&District=' + District + '&SchoolName=' + SchoolName);

  return this.http.post(this.base_url + 'api/Users/UpdateUser?SupplierSummaryId=' + SupplierSummaryId + '&Quarter=' + Quarter + '&Month=' + Month + '&StartDate=' + StartDate + '&EndDate=' + EndDate + '&District=' + District + '&SchoolName=' + SchoolName, { headers: this.Header });

}
  // get donation list
  getDonationlist() {
    return this.http.get(this.base_url + 'api/ReferenceData/GetProductsList');
  }

  updateSupplierSummary(supplierSummaryId, quarter, month, startDate, endDate, districtName, 
    circuitNo, clusterNo,supplierName, nsnpAllocation,noOfLearners,schoolName,emisNo)
  {
    console.log(districtName);
    return this.http.post(this.base_url+"api/SupplierSummary/UpdateSupplierSummary?Id=" +supplierSummaryId
    + "&quarter="+quarter+"&month="+month+"&startDate=" +startDate+ "&endDate=" +endDate+
     "&circuitNo=" +circuitNo+ "&clusterNo="
     +clusterNo +circuitNo+ "&supplierName="
     +supplierName+ "&nsnpAllocation=" +nsnpAllocation+ "&noOfLearners="
     +noOfLearners,"&schoolName=" +schoolName+"&emisNo=" +emisNo, {headers: this.Header});
  }
  
   getQuarters() {
    return this.http.get(this.base_url + "api/Quarter/GetQuarterList");// 
  }

  getProductShare() {    
    return this.http.get(this.base_url + "api/Product/GetProduct");
  }

  getRoll(schoolName:any){
    return this.http.get(this.base_url + "api/ReferenceData/GetSchoolRollBySchoolName?institution="+schoolName, {headers: this.Header});
  }

  getSupplier(schoolName:any){
    return this.http.get(this.base_url + "api/ReferenceData/GetSupplierBySchoolName?institution="+schoolName, {headers: this.Header});
  }
}
