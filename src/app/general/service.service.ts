import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  api : string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  register(data){
    return this.http.post(this.api+'signup', data);
  }

}
