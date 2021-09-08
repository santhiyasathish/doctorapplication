import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss'],
})
export class CategorylistComponent implements OnInit {
  slider: any[];
  catList: any[];
  constructor(private service: PatientserviceService) {}

  ngOnInit() {

    this.doctorCatList();
  }

  slidesOptions = {
    slidesPerView: 2.5,
  };

  doctorCatList(){
    this.service.doctorType().subscribe(data=>{
      this.catList = JSON.parse(JSON.stringify(data)).category;
      console.log(data);
    });
  }
}
