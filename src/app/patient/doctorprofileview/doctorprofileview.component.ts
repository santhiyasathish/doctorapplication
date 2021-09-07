import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AlertController, MenuController, Platform } from '@ionic/angular';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
// import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';
import { Network } from '@ionic-native/network/ngx';
// import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

import { EmailComposer } from '@ionic-native/email-composer/ngx';

// import { Events } from '@ionic/angular'
import Swal from 'sweetalert2/dist/sweetalert2.js';


import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { State } from 'ionicons/dist/types/stencil-public-runtime';
// import { Plugins } from '@capacitor/core';
// const { LocalNotifications } = Plugins;
// import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-doctorprofileview',
  templateUrl: './doctorprofileview.component.html',
  styleUrls: ['./doctorprofileview.component.scss'],
})
export class DoctorprofileviewComponent implements OnInit {
  editData: any;
  profileId: string;
  docId: string;
  message: any;
  hideButton: boolean = true;
  hideButton1: boolean = true;
  hideButton2: boolean = true;
  hideButton3: boolean = true;
  hideButton4: boolean = true;
  ionicButton: boolean = false;
  loading: any;
  value: 3000;
  data: any;
  email: any;
  location: any;
  state: any;
  sta: any;
  city: any;
  locat: any;
  addressl1: any;
  addressl2: any;

  zip: any;
  subscribe: any;
  imgurl: any;
  answer: any = 4;
  a: any;
  col: any;
  

  constructor(public service: PatientserviceService,
    private route: ActivatedRoute,
    private menu: MenuController,
    private network: Network,
    // private localNotification:LocalNotifications,
    // private localNotification: LocalNotifications,
    private plt: Platform,
    private appComponent: AppComponent,
    public dialogs: Dialogs,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private callNumber:CallNumber,
    private emailComposer: EmailComposer,
    private router:Router
  ) {
    this.subscribe= this. plt.backButton.subscribeWithPriority(666666,()=>{
      if (this.constructor.name =="DoctorprofileviewComponent"){
        if(window.confirm("Do you want to exit")){
          navigator["app"].exitApp();
        }
      }
    }) 

    this.network.onDisconnect().subscribe(() => {
      setTimeout(() => {
        this.networkError();
      }, 2000);
    });

    this.plt.ready().then((rdy) => {

    });

    this.menu.enable(true);
  }
  onClickone( id: any) {
    this.answer=id;
    
    for(this.a = this.answer; this.a>= 1;this.a--) {
      
        
          console.log("a value",this.a);
      
    }
  }
 
 
  ngOnInit() {
    // this.menu.enable(true, 'custom');
    this.appComponent.appPages;
    this.profileId = this.route.snapshot.paramMap.get('id');
    this.docId = this.route.snapshot.paramMap.get('id');
    this.viewDoctorProfile(this.profileId);
    this.network.onConnect().subscribe(() => {

      this.handleButtonClick();
      // this.dialogs.alert('we got a' + this.network.type + 'connecting, woohoo!');
      // this.presentLoading();

    });
    this.presentLoading();
    
  }
  callnumber(){
    this.callNumber.callNumber(this.data, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
    console.log("number",this.data);
  }

  appointment(){
    this.router.navigateByUrl('/patient/book/3');

  }
  emailcomposer(){
    
    let email = {
      to: 'janapsp1997@gmail.com',
      cc: 'santhiya.duskcoder@gmail.com',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }

    // Send a text message using default options
    this.emailComposer.open(email);
  }

  async networkError() {
    await this.loading.dismiss();
    const alert = await this.alertController.create({
      header: 'Network error ?',
      message: 'your boor net connection?',
      cssClass: 'customalert',

      buttons: [{
        text: 'ok',
        role: 'ok',
        handler: data => {
          console.log('ok clicked', data);
          this.presentLoading();

        }
      }
      ]
    },
    );

    await alert.present();
  }


  async handleButtonClick() {
    await this.loading.dismiss();
    this.imgurl = "../../../assets/splash_screen.gif";
    const alert = await this.alertController.create({
      header: 'Network error ?',
      message: `<img src="${this.imgurl}" alt="g-maps" style="border-radius: 2px">` ,
   
      cssClass: 'customalert',

      buttons: [{
        text: 'ok',
        role: 'ok',
        handler: data => {
          console.log('ok clicked', data);
          this.presentLoading();

        }
      }
      ]
    },
    );

    await alert.present();
  }






  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      duration: this.value,
      translucent: true,
      
      backdropDismiss: true,
      cssClass:'loadercustom'
      
    });
    // Present the loading controller

    if (this.value == 3000) {
      await this.loading.present();
      // this.networkError();
    } else {
      await this.loading.present();
      this.viewDoctorProfile('3');
      this.menu.enable(true);
    }



    // this.getappointmentAvailability();
  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.presentLoading();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete(() => {
        
      });
    }, 2000);
  }
  seduleAdvance() {

  }
  // registerNotification(seconds:number){

  //   this.localNotification.schedule({
  //     title: `my ${seconds} notification`,
  //     text:`my detailed description`,
  //     trigger: {
  //       // at: new Date(new Date().getTime() + ms)

  //       in: seconds,
  //       unit: ELocalNotificationTriggerUnit.SECOND,
  //     },

  //   });
  // }

  async viewDoctorProfile(val) {

    let id = {
      user_id: val
    }

    this.service.viewDoctorProfile(id).subscribe(async data => {

      this.editData = [JSON.parse(JSON.stringify(data)).data];
      this.data = this.editData[0].contact_number;
      this.location=this.editData[0].location;
      // this.state=this.location;
      this.locat = JSON.parse(this.location);
      this.state=this.locat.state;
      this.city = this.locat.city;
      this.addressl1 = this.locat.addressl1;
      this.addressl2 = this.locat.addressl2;
      this.zip = this.locat.zip;

      console.log("locat", this.locat);
      console.log("city", this.city); 
      console.log("state",this.state);
      console.log("location",this.location);
      console.log("number1",this.data);
      await this.loading.dismiss();
    });

  }

  approve() {
    // if (this.hideButton == true) {
    //   this.hideButton = true;
    
    // }
    // this.message.alert("Congrats! Your account has been approved")
  }
  // cancel() {
  //   if (this.hideButton) {
  //     this.hideButton = true;
  //   }
  //   this.message.alert("Sorry your account has not been approved")
  // }

}
