import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service';
import { MenuController } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  getprofile: any = [];
  constructor(private service: PatientserviceService,
    private menu: MenuController) { 
      this.menu.enable(false);
    }

  ngOnInit() {
    let id = {
      user_id: JSON.parse(localStorage.getItem('log')).id
    };
    this.service.getpatientprofile(id).subscribe(async data => {
      this.getprofile = [JSON.parse(JSON.stringify(data)).data];
      console.log(this.getprofile);
  });

  }
}
