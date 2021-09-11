import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DoctorserviceService } from '../doctorservice.service';
import { JsonpClientBackend } from '@angular/common/http';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DatePipe],
})
export class HomeComponent implements OnInit {


  dates = [
    {
      date: '20-08-2021',
      time: '10:20 AM'
    }
  ];
  editDatas: any;

  counts: any;
  comcount: any;
  location: any;
  locat: any;
  state: any;
  city: any;
  addressl1: any;
  addressl2: any;
  zip: any;
  date: number;
  time: any;
  da: string;
  currDate: any;
  myDate = Date();
  value: 3000;
  loading: any;
  imgurl: any;
  subscribe: any;

  constructor(private service: DoctorserviceService,
    public datePipe: DatePipe,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private network: Network,
    private plt: Platform,
    private menu: MenuController,


  ) {

    this.subscribe = this.plt.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "HomeComponent") {
        if (window.confirm("Do you want to exit")) {
          navigator["app"].exitApp();
        }
      }
    });

    this.network.onDisconnect().subscribe(() => {
      setTimeout(() => {
        this.networkError();
      }, 2000);
    });

    this.plt.ready().then((rdy) => {

    });

    this.menu.enable(true);


    this.currDate = new Date();
    this.date = new Date().getTime();
    console.log("Current Date ", this.currDate);
    console.log("ccdate", this.myDate);
    // console.log("Current Date ", datess);
    // console.log('date', this.myDate);




    console.log("dateee", this.da);

  }
  ngOnInit() {
    this.presentLoading();

  }
  async handleButtonClick() {
    await this.loading.dismiss();
    this.imgurl = "../../../assets/splash_screen.gif";
    const alert = await this.alertController.create({
      header: 'Network error ?',
      message: `<img src="${this.imgurl}" alt="g-maps" style="border-radius: 2px">`,

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
  doRefresh(event) {
    console.log('Begin async operation');
    this.presentLoading();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete(() => {

      });
    }, 2000);
  }

  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      message: 'Loading...',
      duration: this.value,
      translucent: true,

      backdropDismiss: true,
      cssClass: 'loadercustom'

    });
    // Present the loading controller

    if (this.value == 3000) {
      await this.loading.present();
      
      // this.networkError();
    } else {
      await this.loading.present();
      this.getdoctorprofile();
      this.getAppointmentCount();
      this.approvedListindoctorcount();
      this.menu.enable(true);
    }


    
    
    
    // this.getappointmentAvailability();
  }

  getdoctorprofile() {
    let id = {
      user_id: JSON.parse(localStorage.getItem('log')).id
    }
    this.service.viewDoctorProfile(id).subscribe(async data => {
      this.editDatas = [JSON.parse(JSON.stringify(data)).data];
      this.location = this.editDatas[0].location;
      // this.state=this.location;
      this.locat = JSON.parse(this.location);
      this.state = this.locat.state;
      this.city = this.locat.city;
      this.addressl1 = this.locat.addressl1;
      this.addressl2 = this.locat.addressl2;
      this.zip = this.locat.zip;
      console.log(this.editDatas);
      await this.loading.dismiss();
    });
  }
  getAppointmentCount() {
    this.service.getAppointmentCount().subscribe(data => {
      this.counts = JSON.parse(JSON.stringify(data)).count;
      console.log("count", this.counts);
    });
  }
  approvedListindoctorcount() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log("dta", this.myDate);
    let cdata = {
      date: this.myDate
    }
    this.service.approvedListindoctorcount(cdata).subscribe(data => {
      this.comcount = JSON.parse(JSON.stringify(data)).count;
    })
  }
}
