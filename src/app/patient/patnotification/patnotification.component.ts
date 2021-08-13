import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-patnotification',
  templateUrl: './patnotification.component.html',
  styleUrls: ['./patnotification.component.scss'],
})
export class PatnotificationComponent implements OnInit {

  announcement = [
    {
      id:1,
      name: "Dr. janagan .J",
      desc: "MBBS Skin Doctor",
      time:"Dec 15, 2021 11:45 AM",
      color:"success",
      announcementDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, .",
        status:"Successfully your booking"
    },
    {
      id:2,
      name: "Dr. Veera manikandan",
      desc: "MBBS Skin Doctor",
      time:"Dec 15, 2021 11:45 AM",
      color:"danger",
      announcementDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,.",
        status: "Your booking Rejected"
    }
  ];

  constructor() { 
    this.announcement = this.announcement.map(item => ({
      ...item,
      showMore:false,
    }));
  }

  ngOnInit() {}
  trimString(string, length) {
      return string.length > length ? 
             string.substring(0, length) + '...' :
             string;
  }

}
