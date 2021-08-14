import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service';
import { DatePipe } from '@angular/common';
import { Data } from '@angular/router';

@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.scss'],
  providers: [DatePipe],
})
export class AppointmentlistComponent implements OnInit {

  message: any[];
  announcement = [
    {
      id: 1,
      name: "janagan J",
      time: "11:45 AM",
      session: "evening",
      announcementDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, ."
    },
    {
      id: 2,
      name: "Veera mani kandan",
      time: "11:45 AM",
      session: "morning",
      announcementDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,."
    }
  ];
  myDate =  Date();
  

  

  constructor(private service: DoctorserviceService, public datePipe: DatePipe) {

    

 

    this.announcement = this.announcement.map(item => ({
      ...item,
      showMore: false,
    }));
  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '...' :
      string;
  }
  ngOnInit() {
    // this.myDate = Date.now();
    this.approvedListInDoctor();

  }


  approvedListInDoctor() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log('dates', this.myDate);
    let approvedata = {

      date: '2021-08-14',

    }
    this.service.approvedListInDoctor(approvedata).subscribe(data => {
      console.log("data", data);
      // this.message = JSON.parse(JSON.stringify(data));
      
    })
  }
}
