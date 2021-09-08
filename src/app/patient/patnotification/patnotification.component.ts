import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service'; 
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-patnotification',
  templateUrl: './patnotification.component.html',
  styleUrls: ['./patnotification.component.scss'],
  providers: [DatePipe],
})
export class PatnotificationComponent implements OnInit {
  
  approve: any=[];
  // announcement = [
  //   {
  //     id:1,
  //     name: "Dr. janagan .J",
  //     desc: "MBBS Skin Doctor",
  //     time:"Dec 15, 2021 11:45 AM",
  //     color:"success",
  //     announcementDetails:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, .",
  //       status:"Successfully your booking"
  //   },
  //   {
  //     id:2,
  //     name: "Dr. Veera manikandan",
  //     desc: "MBBS Skin Doctor",
  //     time:"Dec 15, 2021 11:45 AM",
  //     color:"danger",
  //     announcementDetails:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,.",
  //       status: "Your booking Rejected"
  //   }
  // ];

  myDate = Date();
  mess: any;
  messData: any;
  sample: string;
  listData: any;
  avalListData: any;
  constructor(private service:PatientserviceService,private datePipe: DatePipe) { 

   

    
    console.log('date',this.myDate);
    // this.announcement = this.announcement.map(item => ({
    //   ...item,
    //   showMore:false,
    // }));
  }

  ngOnInit() {
    this.userAppointementStatus();
   
  }
    trimString(string, length) {
      return string.length > length ? 
             string.substring(0, length) + '...' :
             string;

             
  }


  
  userAppointementStatus(){
  this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  let approveddoctor = {
    user_id: JSON.parse(localStorage.getItem('log')).id,
    date: this.myDate,
  };

    this.service.userAppointementStatus(approveddoctor).subscribe(data=>{
      this.approve = JSON.parse(JSON.stringify(data)).message;
  
    console.log("sample",this.approve);
    // this.getList('0'); 
  console.log('data',data);
  })
}
getList(i){
  this.listData = this.approve[i].list;
  console.log("datas",this.listData);
  this.getLists('0');

}
getLists(a){
this.avalListData = this.listData[a].availableList;
console.log("availablelst",this.avalListData);
}


}





