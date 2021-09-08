import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userName: string;
  public folder: string;
  doclist: any[];
  id = 1;
  slider: any = [];
  roundList:any=[];
  catList: any[];
  isAndroid: boolean = false;
  
  constructor(private activatedRoute: ActivatedRoute,
     private service:PatientserviceService,
      private menu: MenuController,
      private platform: Platform) {
      this.isAndroid = platform.is('android');
      this.menu.enable(false, 'custom');
   }

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem('log')).name;
    console.log(this.userName);
   this.selectCatagory('all');
   this.doctorCatList();
   
    
  }
  slidesOptions = {
    slidesPerView: 2.5
  }
  slidesContents ={
    slidesPerView:4.5
  }

  selectCatagory(type:string){
    let cat = {
      cat_type: type
    }
   this.service.topDoctorList(cat).subscribe(data =>{
     console.log(data);
     this.doclist = JSON.parse(JSON.stringify(data)).list;
   });
  }

  doctorCatList(){
    this.service.doctorType().subscribe(data=>{
      this.catList = JSON.parse(JSON.stringify(data)).category;
      console.log(data);
 
    });
  }

}
