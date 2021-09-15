import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorserviceService {
  api : string = environment.apiUrl;

  headers = new HttpHeaders()
    .append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT"
    })
  };

  constructor(private http:HttpClient) { }


  doctorNotification(data:any){
    return this.http.post(this.api +'pendinglist', data, this.httpOptions);
  }

  approveApiCall(data: any){
    return this.http.post(this.api + 'acceptappointment', data, this.httpOptions);
  }
  approvedListInDoctor(data: any){
    return this.http.post(this.api +'approvedlistindoctor', data, this.httpOptions);
  }
  doctorprofile (data: any){
    return this.http.post(this.api+'doctorprofile',data);
  }
  
  doctorprofileedit (data: any){
    return this.http.post(this.api+'doctorprofileedit',data);
  }
  viewDoctorProfile (data: any){
    return this.http.post(this.api+'getdoctorprofile',data,this.httpOptions);
  }
  getAppointmentCount() {

    return this.http.get(this.api + 'getappointmentcount', this.httpOptions);
  }
  approvedListindoctorcount(data: any) {
    return this.http.post(this.api + 'approvedListindoctorcount', data, this.httpOptions);
  }
}
