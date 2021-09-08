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
  public appPages = [
    //patient
    { title: 'Home', url: 'patient/docprofile/3', icon: 'mail', type: 'patient' },
    { title: 'book appointment', url: 'patient/book/3', icon: 'paper-plane', type: 'patient' },
    // { title: 'Notification', url: 'patient/patnotification', ionc: 'paper-plane', type: 'patient'},
    { title: 'Profile', url: 'patient/editprofile', icon: 'heart', type: 'patient' },
    //doctor
    { title: 'Dashboard', url: 'doctor/home', icon: 'mail', type: 'doctor' },
    { title: 'Confirmation', url: 'doctor/appointmentlist', ionc: 'paper-plane', type: 'doctor'},
    { title: 'Notification', url: 'doctor/docnotification', icon: 'paper-plane', type: 'doctor' },
    { title: 'Profile', url: 'doctor/docprofile', icon: 'paper-plane', type: 'doctor' },
    //guest
    
    { title: 'Book appointment', url: 'patient/docprofile/3', icon: 'mail', type: 'guest' },

    { title: 'Logout', url: 'patient/docprofile/3', icon: 'mail', type: 'doctor' },
    { title: 'Logout', url: 'patient/docprofile/3', icon: 'mail', type: 'patient' },
    { title: 'Logout', url: 'patient/docprofile/3', icon: 'mail', type: 'guest' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router,
    // private localNotification: LocalNotifications,
    //  private pushNotificationService: PushNotificationService
     ) {
 
    if (localStorage.getItem('log') != null) {
    this.email = JSON.parse(localStorage.getItem('log')).email;
    this.userType =  JSON.parse(localStorage.getItem('log')).user_type;
    }
    // this.pushNotificationService.register();

  }

  logout(value){
    console.log(value);
    if(value == 'Logout'){
      localStorage.clear();
      this.router.navigateByUrl('login');
    }
  

  }
  checkType(t): boolean{
    console.log(this.userType, t);
      return this.userType == t; 
  }

  
}
