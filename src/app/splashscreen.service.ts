import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SplashscreenService {

  constructor(public loadingController: LoadingController) { }
  showHideAutoLoader() {
    this.loadingController.create({
      spinner:null,
    duration: 1000,
    message: '<div class="loaderr"><ion-img src="../../assets/heart-animation2.gif"></ion-img></div>',
    translucent: true,
      cssClass:'loading-wrapper'
    }).then((res) => {
      res.present();
  
      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds');
      });
    });
  }
}