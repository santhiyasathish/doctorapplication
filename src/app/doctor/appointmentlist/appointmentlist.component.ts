import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service';
import { DatePipe } from '@angular/common';
import { Data } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-appointmentlist',
  templateUrl: './appointmentlist.component.html',
  styleUrls: ['./appointmentlist.component.scss'],
  providers: [DatePipe],
})
export class AppointmentlistComponent implements OnInit {

  message: any[];
  // announcement = [
  //   {
  //     id: 1,
  //     name: "janagan J",
  //     time: "11:45 AM",
  //     session: "evening",
  //     announcementDetails:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, ."
  //   },
  //   {
  //     id: 2,
  //     name: "Veera mani kandan",
  //     time: "11:45 AM",
  //     session: "morning",
  //     announcementDetails:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,."
  //   }
  // ];
  myDate = Date();
  listdata: any[];
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

    
    this.menu.enable(false);
    this.subscribe = this.plt.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "AppointmentlistComponent") {
        window.location.href = "doctor/home";
        // this.back();
      }
    });
    this.network.onDisconnect().subscribe(() => {
      setTimeout(() => {
        this.networkError();
      }, 2000);
    });

    this.plt.ready().then((rdy) => {

    });


    // this.announcement = this.announcement.map(item => ({
    //   ...item,
    //   showMore: false,
    // }));
  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '...' :
      string;
  }
  ngOnInit() {
    // this.myDate = Date.now();
    // this.approvedListInDoctor();
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
  async presentLoading() {
    // Prepare a loading controller
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      duration: this.value,
      message: 'Please wait...',
      translucent: true,
      cssClass: '',
      backdropDismiss: true,
      mode: 'ios',
      keyboardClose: true,

    });
    // Present the loading controller

    if (this.value == 3000) {
      await this.loading.present();
      // this.networkError();
    } else {
      await this.loading.present();
      this.approvedListInDoctor();
      // this.getdoctorprofile();
      // this.getAppointmentCount();
      // this.approvedListindoctorcount();
      // this.menu.enable(true);
    }



    // this.getappointmentAvailability();
  }


  approvedListInDoctor() {
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log('dates', this.myDate);
    let approvedata = {

      date: this.myDate,

    }
    this.service.approvedListInDoctor(approvedata).subscribe(async data => {
      console.log("data", data);
      this.message = JSON.parse(JSON.stringify(data)).message;
      console.log("message", this.message);
      await this.loading.dismiss();

    });
  }
}
