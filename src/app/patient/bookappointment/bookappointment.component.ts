import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute, UrlTree } from '@angular/router';
import { analyzeAndValidateNgModules, ThrowStmt } from '@angular/compiler';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoadingController } from '@ionic/angular';
import { DatePipe } from '@angular/common';


// import * as moment from 'moment';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { dismiss } from '@ionic/core/dist/types/utils/overlays';
import { DocprofileupdateComponent } from 'src/app/doctor/docprofileupdate/docprofileupdate.component';


// import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.scss'],
})
export class BookappointmentComponent implements OnInit {

  morningtime: any[];
  afternoontime: any[];
  eveningtime: any[];
  doclist: any[];
  category: string = "all";
  isAndroid: boolean = false;
  docId: string;
  docDetail: any = [];
  available: any = [];
  appoint: any = [];
  durId: string;
  list: any = [];
  doc: any = {
    name: 'Johnny Depp',
    professional: 'MBBS'
  }
  sam: any[];
  samu: any[];
  sample: any;
  avlist: any[];
  loading: any;
  hide: boolean = false;


  notifyTime: any;
  notifications: any[] = [];
  days: any[];
  chosenHours: number;
  chosenMinutes: number;
  // samplesss: {
  //   id: any; title: string; text: string; trigger: {
  //     // at: new Date(new Date().getTime() + ms)
  //     // at: new Date(new Date().getTime() + 5000),
  //     // in: 4,
  //     // at: firstNotificationTime,
  //     in: Date;
  //     // every: 'week',
  //     unit: ELocalNotificationTriggerUnit;
  //   }; data: string;
  // };
  bcount: any;
  scount: any;
  tscount: number;
  subscribe: any;
  disableButton: boolean = false;
  date: Number;
  datas = Date();
  sentTempTime: string;
  sentTime: any;
  formatTime: any;
  time: any;
  lo: boolean = true;
  secm: any[];
  sece: any;
  arraym: any;
  secmor: any;
  secmsa: any;
  arraye: any;
  // hide: boolean = false;
  // hides: boolean = false;
  sams: any;
  dates: any;
  aampm: number;
  campm: number;



  constructor(
    private router: Router,
    public platform: Platform,
    private menu: MenuController,
    private service: PatientserviceService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private appComponents: AppComponent,
    private loadingController: LoadingController,
    private localNotifications: LocalNotifications,
    private datepipe: DatePipe

    // private datePipe: DatePipe
  ) {
    // this.platform.ready().then(() => {
    //   this.localNotifications.on('click').subscribe(res => {
    //     let msg = res.data ? res.data.mydata : '';
    //     // this.showAlert(res.title, res.text, msg);
    //   });
    //   this.localNotifications.on('trigger').subscribe(res => {
    //     let msg = res.data ? res.data.mydata : '';
    //     // this.showAlert(res.title, res.text, msg);

    //   });

    // });


    this.schedule();
    this.menu.enable(false);
    // console.log("sample");
    // if()

    // const minutesf = minutes[1]; //11
    // const ampm = hours[1] >= 12 ? 'AM' : 'PM'; //22 >=12 yes == pm
    // const hoursf = hours[1] >= 12 ? hours[1] - 12 : hours[1]; //22 >= 12 ? 22-12=10 


    // this.seduleBasic();
    // this.appComponents.seduleBasic();

    const dateObject = new Date();
    const dateString = dateObject.toLocaleTimeString();
    const dam = dateString.split(' ');
    const cont = dateString.split(':');
    const h = cont[0];
    const m = cont[1];
    const ampm = dam[1];
    this.time = h + ":" + m + " " + ampm;
    console.log('time', this.time);


    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "BookappointmentComponent") {
        window.location.href = "patient/docprofile/3";
        // this.back();
      }
    });
    // this.notifyTime = moment(new Date()).format();
    this.chosenHours = new Date().getHours();
    this.chosenMinutes = new Date().getMinutes();
    this.days = [
      { title: 'Monday', dayCode: 1, checked: false },
      { title: 'Tuesday', dayCode: 2, checked: false },
      { title: 'Wednesday', dayCode: 3, checked: false },
      { title: 'Thursday', dayCode: 4, checked: false },
      { title: 'Friday', dayCode: 5, checked: false },
      { title: 'Saturday', dayCode: 6, checked: false },
      { title: 'Sunday', dayCode: 0, checked: false }
    ];
    // this.isAndroid = platform.is('android');
  }
  ionViewDidLoad() {
  }


  // truthClick() { 
  //   this.disableButton = true; 
  // }
  back() {
    // this.router.navigate('patient/docprofile/3');
    this.router.navigateByUrl('patient/docprofile/3');
  }
  timeChange(time) {
    this.chosenHours = time.hour.value;
    this.chosenMinutes = time.minute.value;
  }
  // async addNotifications() {
  //   let currentDate = new Date();
  //   let currentDay = currentDate.getDay(); // Sunday = 0, Monday = 1, etc.
  //   for (let day of this.days) {
  //     if (day.checked) {
  //       let firstNotificationTime = new Date();
  //       let dayDifference = day.dayCode - currentDay;
  //       if (dayDifference < 0) {
  //         dayDifference = dayDifference + 7; // for cases where the day is in the following week
  //       }
  //       firstNotificationTime.setHours(firstNotificationTime.getHours() + (24 * (dayDifference)));
  //       firstNotificationTime.setHours(this.chosenHours);
  //       firstNotificationTime.setMinutes(this.chosenMinutes);

  //       let notification =
  //       {
  //         id: 1,
  //         title: 'Attention',
  //         text: 'Simons Notification',
  //         data: { mydata: 'My hidden message this is' },
  //         at: new Date(new Date().getTime() + 5 * 1000)
  //       };
  //       // {
  //       //   id: day.dayCode,
  //       //   title: 'J janagan',
  //       //   text: 'hai i am jana',

  //       //   trigger: {
  //       //     // at: new Date(new Date().getTime() + ms)
  //       //     // at: new Date(new Date().getTime() + 5000),
  //       //     // in: 4,
  //       //     // at: firstNotificationTime,
  //       //     in: firstNotificationTime,
  //       //     // every: 'week',
  //       //     unit: ELocalNotificationTriggerUnit.SECOND,
  //       //   },
  //       //   data: 'sample data'
  //       // };
  //       // alert(notification);
  //       // {

  //       //   id: day.dayCode,
  //       //   title: 'Hey!',
  //       //   text: 'You just got notified :)',

  //       //   at: firstNotificationTime,
  //       //   // every: 'week'
  //       // };
  //       this.notifications.push(notification);
  //     }
  //   }
  //   console.log("Notifications to be scheduled: ", this.notifications);
  //   if (this.platform.is('cordova')) {
  //     // Cancel any existing notifications
  //     this.localNotifications.cancelAll().then(async () => {
  //       // Schedule the new notifications
  //       this.localNotifications.schedule(this.notifications);
  //       this.notifications = [];
  //       const alert = await this.alertCtrl.create({
  //         header: 'Notification ?',
  //         message: 'notification Set',
  //         cssClass: 'customalert',
  //         buttons: ['ok']
  //       },
  //       );

  //       await alert.present();
  //       // let alert = this.alertCtrl.create({


  //       //   buttons: ['Ok']
  //       // });
  //       // await alert.present();
  //     });
  //   }
  // }
  // async cancelAll() {
  //   // this.localNotifications.cancelAll();
  //   const alert = await this.alertCtrl.create({
  //     header: 'Notification ?',
  //     message: 'Notifications cancelled',
  //     cssClass: 'customalert',

  //     buttons: ['ok']
  //   },
  //   );

  //   await alert.present();


  //   // let alert = this.alertCtrl.create({
  //   //   title: 'Notifications cancelled',
  //   //   buttons: ['Ok']
  //   // });
  //   // alert.present();
  // }
  ngOnInit() {
    // this.seduleBasic();

    // this.available=this.service.available;
    this.docId = this.route.snapshot.paramMap.get('id');
    this.durId = this.route.snapshot.paramMap.get('id');

    // this.getappointmentAvailability();
    // this.getapplication();  
    this.getAppointmentDetail(this.docId);
    this.presentLoading();
    this.menu.enable(false);
    // this.seduleBasic();
  }

nodataFound(i, date){
//  setTimeout(function(){
   if (this.datepipe.transform(new Date(), 'yyyy-MM-dd') == date) {
     return document.getElementById(i).childElementCount == 0;
   }
   else {
     return false;
   }
}

  slidesOptions = {
    slidesPerView: 2.5
  }

  getbookAppointment(reson, id) {
    let appointment = {
      app_id: id,
      date: this.sam,
      reason: reson,
      user_id: JSON.parse(localStorage.getItem('log')).id,
      status: 'true',
      approvestatus: 'pending'
    };
    console.log(appointment);
    this.service.bookAppointment(appointment).subscribe(data => {
      this.appoint = JSON.parse(JSON.stringify(data)).success;
      // this.seduleBasic();
      if (this.appoint == true) {

        this.showAlert();

      }

      console.log("appointment", this.appoint);
    })
  }
  async presentLoading() {

    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      // duration: this.value,
      message: 'Please wait...',
      translucent: true,
      cssClass: '',
      backdropDismiss: true,
      mode: 'ios',
      keyboardClose: true,
    });
    // Present the loading controller
    // this.seduleBasic();
    await this.loading.present();
    // this.getappointmentAvailability();
    this.getappointmentAvailability();
  }

  async getappointmentAvailability() {
    let avalabledata = {
      dur_id: '1',
      date: '2021-08-13'
    }
    this.service.appointmentAvailability(avalabledata).subscribe(async data => {
      this.available = JSON.parse(JSON.stringify(data)).data;
      this.schedule();
      this.getList('0');
      console.log("bcount", this.bcount);
      //  this.getlista('0');

      await this.loading.dismiss();
    });

  }

  checkValid(time, date) {

    // this.sams = this.available['0'].date;
    // console.log("rgfff", this.sams);
    if (this.datepipe.transform(new Date(), 'yyyy-MM-dd') == date) {
      let atime = time.split(' ');
      this.aampm = atime[1] == 'AM' ? 0 : 12;
      atime = atime[0].split(':');
      let ctime = this.time.split(':');
      this.campm = ctime[1].split(' ')[1].toUpperCase() == 'AM' ? 0 : 12;

      if (this.campm > this.aampm) {
        this.hide = true;
        console.log("ddddds");
      }

      if (ctime[0] == 12) {
        this.campm = 0;
        if (atime[0] == atime[0]) {
          let atime = time.split(' ');
          let aampms = atime[1] == 'AM' ? 0 : 12;
          this.lo = false;
          console.log("no data");
          this.aampm = aampms;
        }
      }
      let ct = ctime[0] * 60 + parseInt(ctime[1]) + this.campm * 60;
      let at = atime[0] * 60 + parseInt(atime[1]) + this.aampm * 60;
      // console.log('atime', at);
      // console.log('ctime', ct);
      return ct < at;
    }

    else {
      return true;
    }
  }
  async getList(i) {
    this.schedule();
    // this.presentLoading();
    console.log("first data", i);
    this.list = this.available[i].list;
    this.secmsa = this.list['0'];
    this.secm = this.list['0'].session;
    this.sece = this.list['1'].session;
    this.sam = this.available[i].date;
    this.arraym = this.list['0'].availableList;
    this.arraye = this.list['1'].availableList;
    this.dates = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    // if (this.dates !== this.sam) {
    //   console.log("jana", this.dates);
    //   this.hide = false;

    // }
    // else {
    //   if (this.dates == this.sam) {
    //     if (this.campm > this.aampm) {
    //       this.hide = true;
    //       console.log("ddddd");
    //     }
    //   }

    // }
    await this.loading.dismiss();


  }
  getAppointmentDetail(id) {
    let passData = {
      doc_id: id
    }
    this.service.appointmentDetail(passData).subscribe(data => {
      this.docDetail = JSON.parse(JSON.stringify(data));
      console.log("details", data);

      let a = 30;
      let b = 20;
      console.log("first value a", a);
      console.log("first value b", b);
      let c = a;
      let d = b;
      console.log("second value a", d);
      console.log("second value b",c);


    });
  }
  // back(){
  //   this.router.navigateByUrl('/login');
  // }
  showAlert() {
    // this.seduleBasic();
    this.alertCtrl.create({
      header: 'Appointment Booking',
      cssClass: 'alertHeader',
      message: 'Waiting for your Approval .',
      buttons: ['OK']
    }).then(res => {
      res.present();
      window.location.href = "patient/docprofile/3";

    });

  }

  schedule() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'simons notification',
      data: 'myhidden',
      lockscreen: true,
      trigger: {
        in: 5,
        unit: ELocalNotificationTriggerUnit.SECOND,
      },
    });
  }

  // seduleBasic() {
  //   this.localNotifications.schedule(
  //     {
  //       id: 1,
  //       title: 'Your Booking',
  //       text: 'Waiting for your Booking Confirmation',
  //       // sound:'file://assets/sounds/bell.mp3',
  //       // foreground: true,
  //       // lockscreen: true,
  //       trigger: {
  //         // at: new Date(new Date().getTime() + ms),
  //         // at: new Date(new Date().getTime()),
  //         in:4,
  //         unit: ELocalNotificationTriggerUnit.SECOND,
  //       },
  //       data: 'sample data'
  //     });
  // }
  setSound() {
    if (this.platform.is('android')) {
      return 'file://assets/sounds/bell.mp3'
    } else {
      return 'file://assets/sounds/bell.mp3'
    }
  }
  async conform(id) {

    if (localStorage.getItem('log') == null) {
      this.router.navigateByUrl('/login');
    }
    else {
      const alert = await this.alertCtrl.create({

        subHeader: 'Booking',
        message: 'Do you want to booking your Appointment',
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
              let alert = this.alertCtrl.create({
                message: 'Reason?',
                inputs: [
                  {
                    name: 'reson',
                    placeholder:'reason'
                  },
                ],
                buttons: [
                  {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: data => {
                      console.log('Cancel clicked', data);
                    }
                  },
                  {
                    text: 'Submit',
                    handler: Data => { //takes the data 
                      console.log("data reson", Data.reson);
                      this.getbookAppointment(Data.reson, id);

                    }
                  }
                ]
              });
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



}
