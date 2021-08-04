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
  catList: any[];
  id=1;

  constructor(platform: Platform,private service:PatientserviceService) {
    this.isAndroid = platform.is('android');
   }
   ngOnInit(){
  
    this.selectCatagory('all');
     this.doctorCatList();

   }

   doctorCatList(){
     this.service.doctorType().subscribe(data=>{
       this.catList = JSON.parse(JSON.stringify(data)).category;
       console.log(data);
     });
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

   slidesOptions = {
    slidesPerView: 3.5
  }

}