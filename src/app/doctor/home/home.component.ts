import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DoctorserviceService } from '../doctorservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe],
})
export class HomeComponent implements OnInit {

  
  dates=[
    {
      date:'20-08-2021',
      time:'10:20 AM'
    }
  ];
 

constructor(private service:DoctorserviceService, public datePipe: DatePipe) {

  }
  ngOnInit() {

  }
 
 
}
