import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.scss'],
})
export class BookappointmentComponent implements OnInit {
  morningtime:any[];
  afternoontime:any[];
  eveningtime:any[];
  doclist:any[];
  category: string = "all";
  isAndroid: boolean = false;

  constructor(public platform:Platform, private menu:MenuController,private service:PatientserviceService) {
    this.isAndroid = platform.is('android');
   }

  ngOnInit() {
    this.morningtime=this.service.morningtime;
    this.afternoontime=this.service.afternoontime;
    this.eveningtime=this.service.eveningtime;
    this.doclist=this.service.doclist;
    
    this.menu.enable(false);
  }
  slidesOptions={
    slidesPerView:2.5
  }

}
