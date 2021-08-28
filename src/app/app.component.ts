import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { PushNotificationService } from './push-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  email : string;
  public appPages = [
    { title: 'home', url: 'patient/docprofile/3', icon: 'mail' },
    { title: 'profile', url: 'patient/profile', icon: 'paper-plane' },
    { title: 'book appointment', url: 'patient/book/3', icon: 'paper-plane' },
    { title: 'Add Profile', url: 'patient/editprofile', ionc: 'paper-plane'},
    { title: 'Logout', icon: 'heart' }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router, 
    // private pushNotificationService: PushNotificationService
    ) {
    if (localStorage.getItem('log') != null) {
    this.email = JSON.parse(localStorage.getItem('log')).email;
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
}
