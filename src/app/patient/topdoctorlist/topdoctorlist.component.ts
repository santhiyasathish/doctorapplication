import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';

@Component({
  selector: 'app-topdoctorlist',
  templateUrl: './topdoctorlist.component.html',
  styleUrls: ['./topdoctorlist.component.scss'],
})
export class TopdoctorlistComponent implements OnInit {

  category: string = "all";
  isAndroid: boolean = false;
  doclist : any[];
  id=1;

  constructor(platform: Platform,private service:PatientserviceService) {
    this.isAndroid = platform.is('android');
   }
   ngOnInit(){
     this.doclist =this.service.doclist;
   }

   slidesOptions = {
    slidesPerView: 3.5
  }
}