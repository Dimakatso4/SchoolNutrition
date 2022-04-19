import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {


  //
  constructor(private http: HttpClient) { }
  Header: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'responseType': 'json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
  });

  base_url = environment.base_url;
  getSuppliers()
  {
    return this.http.get( this.base_url+"api/Supplier/GetSupplierList")

  }
  AddSupplier(data)
  {
    
    return this.http.post(this.base_url+"api/Supplier/CreateSupplier", data, { headers: this.Header })
  }
newSupplier(data)
{console.log(data)
  return this.http.post(this.base_url+"api/Supplier/CreateSupplierWithDefaultStatus", data, { headers: this.Header })
}
  UpdateSupplier(data)
  {
    console.log(data);
    return this.http.post(this.base_url +"api/Supplier/UpdateSupplier" ,data ,{headers: this.Header});
  }
  getSupplierById(id)
  {
    return this.http.get(this.base_url+"api/Supplier/GetSupplierByID?ID=" +id)
  }
  sendActivateEmail(vendNo, supplierId, pass) {

    return this.http.post( this.base_url + "api/Mail/SendWelcomeEmailToSupplierAsync?UserName=" +vendNo+"&Id="+supplierId+"&Pass="+pass ,{ headers: this.Header })
  }
  getbyVendNo(vendNo){

    return this.http.get(this.base_url+"api/Supplier/GetSupplierByVendorNo?vendorNo="+vendNo)
  }

  activateSupplier(VendorNo, Password)
{

 // console.log("this is vendor"+vendNo);
  //console.log("this new password"+password);

  return this.http.post(this.base_url+"api/Supplier/ActivateSupplierLoginProfile?VendorNo="+VendorNo+"&Password="+Password,{ headers: this.Header });
}
 //////////////////District////////////////////////
 getAllDistricts() {
  return this.http.get(this.base_url + "api/ReferenceData/Districts")

}
////////////////school//////////////////////////
getSchoolsByDistrict(id) {
  return this.http.get(this.base_url + "api/ReferenceData/SchoolsByDistrictId?DistrictCode=" + id)

}
getSupplierByVendorNo(VendorNo)
  {
    return this.http.get(this.base_url+"api/Supplier/GetSupplierByVendorNo?vendorNo="+VendorNo)
  }
  supplierStatus()
  {
    return this.http.get(this.base_url+"api/SupplierStatus/GetStatusList")
  }
  getProvince()
  {
    return this.http.get(this.base_url+"api/Province/GetProvinceList")
  }
  tellExist(telephoneNo)
  {
    return this.http.get(this.base_url+"api/Supplier/IsCellphoneAvailable?TelephoneNo="+telephoneNo)
  
}
VendoExist(venderNo)
{
  return this.http.get(this.base_url+"api/Supplier/IsSupplierVendorNumberAvailable?VendorNo="+venderNo)

}
getSchoolEmailsByDistrict(district)

{

  return this.http.get(this.base_url + "api/ReferenceData/GetSchoolsEmailByDistrict?district=" + district)

}


getSchoolByEmisNumber(school) {
  return this.http.get(this.base_url + "api/ReferenceData/SchoolsByEmisNo?EmisNo=" + school)
}

}
