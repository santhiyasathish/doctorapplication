import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';

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
    private localNotification: LocalNotifications,
    //  private pushNotificationService: PushNotificationService
     ) {
    this.seduleBasic();
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


  seduleBasic() {
    this.localNotification.schedule({
      id: 1,
      title: 'J janagan',
      text: 'hai i am jana',

      trigger: {
        // at: new Date(new Date().getTime() + ms)

        in: 4,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
      data: 'sample data'
    });

  }
}
