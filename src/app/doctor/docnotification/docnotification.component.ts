import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service';

@Component({
  selector: 'app-docnotification',
  templateUrl: './docnotification.component.html',
  styleUrls: ['./docnotification.component.scss'],
})
export class DocnotificationComponent implements OnInit {

  message: any[];
  announcement = [
    {
      id: 1,
      name: "janagan J",
      time: "Dec 15, 2021 11:45 AM",
      session: "evening",
      announcementDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, ."
    },
    {
      id: 2,
      name: "Veera mani kandan",
      time: "Dec 15, 2021 11:45 AM",
      session: "morning",
      announcementDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,."
    }
  ];
  // private tutorialHidden: boolean = true;
  constructor(public service: DoctorserviceService) {

    this.announcement = this.announcement.map(item => ({
      ...item,
      showMore: false,
    }));
  }

  ngOnInit() {

    this.pendingList();
  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '...' :
      string;
  }

  pendingList() {
    let pending = {

      approvestatus: "pending",

    }
    this.service.doctorNotification(pending).subscribe(data => {
      console.log("data", data);
      this.message = JSON.parse(JSON.stringify(data)).message;
      // this.getList('0');
      //  this.getlista('0');
      console.log("availabledata", this.message);
    })
  }
  approve(id, status){
    let postData={
      id: id,
      approvestatus: status
    }
    this.service.approveApiCall(postData).subscribe(data =>{
      console.log(data);
      this.pendingList();
    })
  }
}
