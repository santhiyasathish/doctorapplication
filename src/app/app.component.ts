import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';

// import { PushNotificationService } from './push-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  email : string;
  userType: string;
  togle: boolean = false;
  public appPages = [
    //patient
    { title: 'Home', url: 'patient/docprofile/3', icon: 'home', type: 'patient' },
    { title: 'book appointment', url: 'patient/book/3', icon: 'fitness', type: 'patient' },
    { title: 'Notification', url: 'patient/patnotification', icon: 'notifications-circle', type: 'patient'},
    { title: 'Profile', url: 'patient/editprofile', icon: 'person-circle', type: 'patient' },
    //doctor
    { title: 'Dashboard', url: 'doctor/home', icon: 'home', type: 'doctor' },
    { title: 'Confirmation', url: 'doctor/appointmentlist', icon: 'calendar', type: 'doctor'},
    { title: 'Notification', url: 'doctor/docnotification', icon: 'notifications-circle', type: 'doctor' },
    { title: 'Profile', url: 'doctor/docprofileupdate', icon: 'person-circle', type: 'doctor' },
    //guest
    
    { title: 'Book appointment', url: 'general/guest', icon: 'fitness', type: 'guest' },

    { title: 'Logout', url: '', icon: 'log-out', type: 'doctor' },
    { title: 'Logout', url: '', icon: 'log-out', type: 'patient' },
    { title: 'Logout', url: '', icon: 'log-out', type: 'guest' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router,
    // private localNotification: LocalNotifications,
    //  private pushNotificationService: PushNotificationService
     ) {
 
    if (localStorage.getItem('log') != null) {
      this.togle = true;
    this.email = JSON.parse(localStorage.getItem('log')).email;
    this.userType =  JSON.parse(localStorage.getItem('log')).user_type;
    }
    // this.pushNotificationService.register();

  }

  logout(value){
    console.log(value);
    if(value == 'Logout'){
      localStorage.clear();
      this.router.navigateByUrl('patient/docprofile/3');
    }
  

  }
  checkType(t): boolean{
    console.log(this.userType, t);
      return this.userType == t; 
  }

  
}
