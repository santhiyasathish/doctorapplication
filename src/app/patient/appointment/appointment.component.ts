import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
morningtime:any[];
  afternoontime:any[];
  eveningtime:any[];
  doclist:any[];
  category: string = "all";
  isAndroid: boolean = false;
  docId: string;
  docDetail: any = [];
  constructor(public platform:Platform, 
    private menu:MenuController,
    private service:PatientserviceService,
    private route: ActivatedRoute) {
      this.isAndroid = platform.is('android');
     }

  ngOnInit() {
    this.morningtime=this.service.morningtime;
    this.afternoontime=this.service.afternoontime;
    this.eveningtime=this.service.eveningtime;
    this.doclist=this.service.doclist;
    this.docId = this.route.snapshot.paramMap.get('id');
    this.getAppointmentDetail(this.docId);                                                                           
    
    this.menu.enable(false);
  }
  slidesOptions={
    slidesPerView:2.5
  }

 bookAppointment(){
   let appointment = {
     doc_id: '',
     pat_id: '',
     time: '',
     date: '',
     session: ''
   }
   this.service.bookAppointment(appointment).subscribe(data=>{
    console.log(data);
   })
 }

  getAppointmentDetail(id){
    let passData = {
      doc_id: id
    }
    this.service.appointmentDetail(passData).subscribe(data=>{
      this.docDetail = JSON.parse(JSON.stringify(data)).data;
      console.log(data);
    })
  }
}
