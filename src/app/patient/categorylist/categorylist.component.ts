import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service';

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.scss'],
})
export class CategorylistComponent implements OnInit {
  slider: any[];
  constructor(private service: PatientserviceService) {}

  ngOnInit() {
    this.slider = this.service.slider;
  }

  slidesOptions = {
    slidesPerView: 2.5,
  };
}
