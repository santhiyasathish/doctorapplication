import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public folder: string;
  doclist: any[];
  id = 1;
  slider: any = [];
  roundList:any=[];
  catList: any[];
  constructor(private activatedRoute: ActivatedRoute, private service:PatientserviceService,
    private menu: MenuController) {
      this.menu.enable(false, 'custom');
   }

  ngOnInit() {
   this.selectCatagory('all');
   this.doctorCatList();
    this.slider=this.service.slider;
    this.roundList=this.service.roundList;
    
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
 
    },   (error) => {                              //Error callback
          alert('error caught in component');
    
          //throw error;   //You can also throw the error to a global error handler
        });
        
        
  }

}
