import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
// import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Platform } from '@ionic/angular';

// import { PushNotificationService } from './push-notification.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  email: string;
  userType: string;
  togle: boolean = false;
  public appPages = [
    //patient
    { title: 'Home', url: 'patient/docprofile/3', icon: 'home', type: 'patient' },
    { title: 'book appointment', url: 'patient/book/3', icon: 'fitness', type: 'patient' },
    { title: 'Notification', url: 'patient/patnotification', icon: 'notifications-circle', type: 'patient' },
    { title: 'Profile', url: 'patient/editprofile', icon: 'person-circle', type: 'patient' },
    //doctor
    { title: 'Dashboard', url: 'doctor/home', icon: 'home', type: 'doctor' },
    { title: 'Confirmation', url: 'doctor/appointmentlist', icon: 'calendar', type: 'doctor' },
    { title: 'Notification', url: 'doctor/docnotification', icon: 'notifications-circle', type: 'doctor' },
    { title: 'Profile', url: 'doctor/docprofileupdate', icon: 'person-circle', type: 'doctor' },
    //guest

    { title: 'Book appointment', url: 'general/guest', icon: 'fitness', type: 'guest' },

    { title: 'Logout', url: 'doctor/home', icon: 'log-out', type: 'doctor' },
    { title: 'Logout', url: 'patient/docprofile/3', icon: 'log-out', type: 'patient' },
    { title: 'Logout', url: 'general/guest', icon: 'log-out', type: 'guest' },
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router,
    // private localNotifications: LocalNotifications,
    //  private pushNotificationService: PushNotificationService
    private alertCtrl: AlertController,
    private platform: Platform,
  ) {

    // this.seduleBasic();
    if (localStorage.getItem('log') != null) {
      this.togle = true;
      this.email = JSON.parse(localStorage.getItem('log')).email;
      this.userType = JSON.parse(localStorage.getItem('log')).user_type;
    }
    // this.pushNotificationService.register();

  }

  async logout(value) {
    // console.log(value);
    if (value == 'Logout') {
    const alert = await this.alertCtrl.create({

      subHeader: 'LogOut',
      message: 'Do you want to LogOut your Account?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: async data => {
            
              localStorage.clear();
              // alert("Logout Successfully");
              window.location.href='patient/docprofile/3';
            (await alert).present();
          }
        }

      ]
    });
    await alert.present();
    const result = await alert.onDidDismiss();
    console.log(alert);
  }
  }
  
  // async conform() {
  //     const alert = await this.alertCtrl.create({

  //       subHeader: 'Booking',
  //       message: 'Do you want to Logout your Account?',
  //       buttons: [
  //         {
  //           text: 'Cancel',
  //           role: 'cancel',
  //           handler: data => {
  //             console.log('Cancel clicked');
  //           }
  //         },
  //         {
  //           text: 'OK',
  //           handler: async data => {
              
  //             (await alert).present();
  //           }
  //         }

  //       ]
  //     });
  //     await alert.present();
  //     const result = await alert.onDidDismiss();
  //     console.log(alert);
  // }

  checkType(t): boolean {
    console.log(this.userType, t);
    return this.userType == t;
  }
  // seduleBasic() {
  //   this.localNotifications.schedule(
  //     {
  //       id: 1,
  //       title: 'Your Booking',
  //       text: 'Waiting for your Booking Confirmation',
  //       // sound: 'file://assets/sounds/bell.mp3',

  //       trigger: {
  //         // at: new Date(new Date().getTime() + ms)
  //         // at: new Date(new Date().getTime() + 5000),

  //         in: 1,
  //         unit: ELocalNotificationTriggerUnit.SECOND,
  //       },
  //       // data: 'sample data',
  //     }

  //   );
   

  // }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/bell.mp3'
    } else {
      return 'file://assets/sounds/bell.mp3'
    }
  }

}
