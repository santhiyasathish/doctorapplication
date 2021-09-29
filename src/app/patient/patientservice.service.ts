import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientserviceService {
  get(arg0: string, arg1: { timeout: number; }) {
    throw new Error('Method not implemented.');
  }
  api: string = environment.apiUrl;
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
  
  
  
  constructor(private http: HttpClient) {

    
  }

  post(serviceName: string, data: any) {

  }
  
  
  doctorType() {
    return this.http.get(this.api + 'doctortype', this.httpOptions);
  }

  topDoctorList(data: any) {
    return this.http.post(this.api + 'topDoctorList', data, this.httpOptions);
  }

  viewDoctorProfile(data: any) {
    return this.http.post(this.api + 'getdoctorprofile', data, this.httpOptions);
  }

  bookAppointment(data: any) {
    return this.http.post(this.api + 'bookappointment', data, this.httpOptions);
  }

  appointmentDetail(data: any) {
    return this.http.post(this.api + 'doctorviewappionment', data, this.httpOptions);
  }
  appointmentAvailability(data: any) {
    return this.http.post(this.api + 'appointmentavailability', data, this.httpOptions);
  }
  approvedlistindoctor(data: any) {
    return this.http.post(this.api + 'approvedlistindoctor', data, this.httpOptions);
  }
  userAppointementStatus(data: any){
    return this.http.post(this.api + 'userappointementstatus',data,this.httpOptions);
  }
  patientprofile(data: any) {
    return this.http.post(this.api + 'patientprofile', data);
  }
  patinetprofileedit(data: any){
    return this.http.post(this.api+'patinetprofileedit',data);
  }
  getpatientprofile(data: any){
    return this.http.post(this.api+'getpatientprofile',data,this.httpOptions);
  }
  docId(){
    return this.http.get(this.api+'doctorid', this.httpOptions);
  }
  cancelAppointment(data : any){
    return this.http.post(this.api+'cancelappointment',data,this.httpOptions);
  }
  doctorNotification(data:any){
    return this.http.post(this.api +'pendinglist', data, this.httpOptions);
  }
  patientHistory(data:any){
    return this.http.post(this.api +'patienthistory',data,this.httpOptions);
  }
  viewRatting(){
    return this.http.get(this.api + 'viewrating',this.httpOptions);
  }
  setRatting(data:any){
    return this.http.post(this.api +'rating',data, this.httpOptions);
  }
  fixRatting(data:any){
    return this.http.post(this.api +'getrating',data, this.httpOptions);
  }

}

