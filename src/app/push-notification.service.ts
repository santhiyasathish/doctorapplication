import { Injectable,OnInit } from '@angular/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';


@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  constructor() { }

  register(){
    PushNotifications.register();

    PushNotifications.addListener('registration', (token: Token) => {
      // console.log('Push registration success, token: ' + token.value);
      // alert('Push registration success, token: ' + token.value);
    });
    PushNotifications.addListener('registrationError', (error: any) => {
      alert('Error on registration: ' + JSON.stringify(error));
    });

    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        alert('Push received: ' + JSON.stringify(notification));
      },
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        alert('Push action performed: ' + JSON.stringify(notification));
      },
    );

  }
}
