import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-docnotification',
  templateUrl: './docnotification.component.html',
  styleUrls: ['./docnotification.component.scss'],
})
export class DocnotificationComponent implements OnInit {

  announcement = [
    {
      id:1,
      name: "janagan J",
      time:"Dec 15, 2021 11:45 AM",
      announcementDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, ."
    },
    {
      id:1,
      name: "Veera mani kandan",
      time:"Dec 15, 2021 11:45 AM",
      announcementDetails:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,."
    }
  ];
// private tutorialHidden: boolean = true;
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
  // abrirTutorial(){

  //   if(this.tutorialHidden === true){

  //     this.tutorialHidden = false;
  //     document.getElementById("tutorial").hidden = false;
  //     document.getElementById("icon").hidden= true;
  //     document.getElementById("tutorials").hidden = true;
  //     document.getElementById("icons").hidden= false;

  //   }else if(this.tutorialHidden === false){

  //     this.tutorialHidden = true;
  //     document.getElementById("tutorial").hidden = true;
  //     document.getElementById("icon").hidden= false;
  //     document.getElementById("tutorials").hidden = false;
  //     document.getElementById("icons").hidden= true;



  //   }

  // }

   

}
