import { Component, OnInit } from '@angular/core';
import { DoctorserviceService } from '../doctorservice.service';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-docnotification',
  templateUrl: './docnotification.component.html',
  styleUrls: ['./docnotification.component.scss'],
})
export class DocnotificationComponent implements OnInit {

  message: any[];
  value: 3000;
  loading: any;
  imgurl: any;
  subscribe: any;
  // announcement = [
  //   {
  //     id: 1,
  //     name: "janagan J",
  //     time: "Dec 15, 2021 11:45 AM",
  //     session: "evening",
  //     announcementDetails:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, ."
  //   },
  //   {
  //     id: 2,
  //     name: "Veera mani kandan",
  //     time: "Dec 15, 2021 11:45 AM",
  //     session: "morning",
  //     announcementDetails:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,."
  //   }
  // ];
  // count: any;
  // private tutorialHidden: boolean = true;
  constructor(public service: DoctorserviceService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private network: Network,
    private plt: Platform,
    private menu: MenuController,
  ) {
    this.menu.enable(false);
    this.subscribe = this.plt.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "DocnotificationComponent") {
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

  ngOnInit() {
    this.presentLoading();

    // this.appointmentcount();
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
      this.pendingList();
      // this.approve('','');
    }
    // this.getappointmentAvailability();
  }

  trimString(string, length) {
    return string.length > length ?
      string.substring(0, length) + '...' :
      string;
  }

  pendingList() {
    let pending = {

      approvestatus: "pending",

    }
    this.service.doctorNotification(pending).subscribe(async data => {
      console.log("data", data);
      this.message = JSON.parse(JSON.stringify(data)).message;
      // this.getList('0');
      //  this.getlista('0');
      console.log("availabledata", this.message);
      await this.loading.dismiss();
      // window.location.href="doctor/docnotification/";
      // await this.loading.dismiss();
    });
  }

  // appointmentcount(){
  //   this.service.getappointmentcount().subscribe(data=>{
  //     this.count= JSON.parse(JSON.stringify(data)).category;
  //     console.log(data);
  //   })
  // }

  approve(id, status) {
    let postData = {
      id: id,
      approvestatus: status
    }
    this.service.approveApiCall(postData).subscribe(async data => {
      console.log(data);
      
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
          this.pendingList();
          window.location.href="doctor/docnotification/";
          // this.approve('','');
        }
        // this.getappointmentAvailability();
      
      // this.presentLoading();
      // this.pendingList();
      
      
    });
  }
}
