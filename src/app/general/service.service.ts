import { Injectable } from '@angular/core'

import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
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
  constructor(private http: HttpClient) { }

  register(data){
    return this.http.post(this.api+'signup', data);
  }

  login(data){
    return this.http.post(this.api+'login', data);
  }
  appointmentAvailability(data: any) {
    return this.http.post(this.api + 'appointmentavailability', data, this.httpOptions);
  }
  appointmentDetail(data: any) {
    return this.http.post(this.api + 'doctorviewappionment', data, this.httpOptions);
  }
  bookAppointment(data: any) {
    return this.http.post(this.api + 'bookappointment', data, this.httpOptions);
  }
  guestUserApi(data: any) {
    return this.http.post(this.api + 'guestuser', data, this.httpOptions);
  }
}
