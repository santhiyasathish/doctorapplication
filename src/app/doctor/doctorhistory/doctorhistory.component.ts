import { JsonpClientBackend } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service';

@Component({
  selector: 'app-doctorhistory',
  templateUrl: './doctorhistory.component.html',
  styleUrls: ['./doctorhistory.component.scss'],
})
export class DoctorhistoryComponent implements OnInit {
  dataList: any;

  constructor(
    private service: DoctorserviceService,
  ) { }

  ngOnInit() {
    this.doctorHistory();
   }

  doctorHistory() {
    this.service.doctorHistory().subscribe(data => {
      this.dataList = JSON.parse(JSON.stringify(data)).data;
      console.log(this.dataList)
    });
  }

}
