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
  doclist:any[];
  id = 1;
  slider: any = [];
  roundList:any=[];
  constructor(private activatedRoute: ActivatedRoute, private service:PatientserviceService,
    private menu: MenuController) {
      this.menu.enable(false, 'custom');
   }

  ngOnInit() {
    this.doclist = this.service.doclist;
    this.slider=this.service.slider;
    this.roundList=this.service.roundList;
    
  }
  slidesOptions = {
    slidesPerView: 2.5
  }
  slidesContents ={
    slidesPerView:4.5
  }

}
