import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  getprofile: any = [];
  subscribe: any;
  constructor(
    private service: PatientserviceService,
    private menu: MenuController,
    private platform: Platform,
    ) { 
      this.menu.enable(false);


    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "ProfileComponent") {
        window.location.href = "patient/docprofile/3";
        // this.back();
      }
    });
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
