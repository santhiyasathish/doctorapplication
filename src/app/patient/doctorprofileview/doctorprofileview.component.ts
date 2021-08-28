import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MenuController } from '@ionic/angular';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-doctorprofileview',
  templateUrl: './doctorprofileview.component.html',
  styleUrls: ['./doctorprofileview.component.scss'],
})
export class DoctorprofileviewComponent implements OnInit {
  editData : any;
  profileId: string;
  docId: string;
  message: any;
  hideButton: boolean = true;
  hideButton1: boolean = true;
  hideButton2: boolean = true;
  hideButton3: boolean = true;
  hideButton4: boolean = true;
  
  constructor(public service:PatientserviceService,
    private route: ActivatedRoute,
    private menu:MenuController,
    private localNotification:LocalNotifications,
    private appComponent: AppComponent
    ) { }

  ngOnInit() {
    this.menu.enable(true,'custom');
    this.appComponent.appPages;
    this.profileId = this.route.snapshot.paramMap.get('id');
    this.docId = this.route.snapshot.paramMap.get('id');
    this.viewDoctorProfile(this.profileId);
    
    
  }
  registerNotification(seconds:number){
    
    this.localNotification.schedule({
      title: `my ${seconds} notification`,
      text:`my detailed description`,
      trigger: {
        // at: new Date(new Date().getTime() + ms)
        
        in: seconds,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },

    });
  }

  viewDoctorProfile(val){
    let id = {
      user_id: val
    }
    this.service.viewDoctorProfile(id).subscribe(data=>{
      this.editData = [JSON.parse(JSON.stringify(data)).data];
    })
  }

  approve() {
    if (this.hideButton == true) {
      this.hideButton = true;
      this.hideButton1 = true;
      this.hideButton2 = true;
      this.hideButton3 = true;
      this.hideButton4 = false;
      

    }
    this.message.alert("Congrats! Your account has been approved")
  }
  cancel() {
    if (this.hideButton) {
      this.hideButton = true;
    }
    this.message.alert("Sorry your account has not been approved")
  }
 
}
