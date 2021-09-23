import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service'; 
import { DatePipe } from '@angular/common';
import { Platform } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-patnotification',
  templateUrl: './patnotification.component.html',
  styleUrls: ['./patnotification.component.scss'],
  providers: [DatePipe],
})
export class PatnotificationComponent implements OnInit {
  
  approve: any=[];
  // announcement = [
  //   {
  //     id:1,
  //     name: "Dr. janagan .J",
  //     desc: "MBBS Skin Doctor",
  //     time:"Dec 15, 2021 11:45 AM",
  //     color:"success",
  //     announcementDetails:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, .",
  //       status:"Successfully your booking"
  //   },
  //   {
  //     id:2,
  //     name: "Dr. Veera manikandan",
  //     desc: "MBBS Skin Doctor",
  //     time:"Dec 15, 2021 11:45 AM",
  //     color:"danger",
  //     announcementDetails:
  //       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,.",
  //       status: "Your booking Rejected"
  //   }
  // ];

  myDate = Date();
  mess: any;
  messData: any;
  sample: string;
  listData: any;
  avalListData: any;
  subscribe: any;
  value: 3000;
  loading: any;
  imgurl: any;
  constructor(private service:PatientserviceService,
    private datePipe: DatePipe,
    private platform:Platform,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private network: Network,
  
    private menu: MenuController,
    ) { 
    this.menu.enable(false);

    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "PatnotificationComponent") {
        window.location.href = "patient/docprofile/3";
        // this.back();
      }
    });

    this.network.onDisconnect().subscribe(() => {
      setTimeout(() => {
        this.networkError();
      }, 2000);
    });

    this.platform.ready().then((rdy) => {

    });

    this.menu.enable(false);

    
    console.log('date',this.myDate);
    // this.announcement = this.announcement.map(item => ({
    //   ...item,
    //   showMore:false,
    // }));
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
      spinner: 'dots',
      duration: this.value,
      message: 'Please wait...',
      translucent: true,
      cssClass: '',
      backdropDismiss: false,
      mode: 'ios',
      keyboardClose: true,

    });
    // Present the loading controller

    if (this.value == 3000) {
      await this.loading.present();

      // this.networkError();
    } else {
      await this.loading.present();
      this.userAppointementStatus();
      // this.getdoctorprofile();
      // this.getAppointmentCount();
      // this.approvedListindoctorcount();
      // this.menu.enable(true);
    }





    // this.getappointmentAvailability();
  }
    trimString(string, length) {
      return string.length > length ? 
             string.substring(0, length) + '...' :
             string;

             
  }


  
  userAppointementStatus(){
  this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
  let approveddoctor = {
    user_id: JSON.parse(localStorage.getItem('log')).id,
    // date: this.myDate,
  };

    this.service.userAppointementStatus(approveddoctor).subscribe(async data=>{
      this.approve = JSON.parse(JSON.stringify(data)).message;
      await this.loading.dismiss();
  
    console.log("sample",this.approve);
    // this.getList('0'); 
  console.log('data',data);
  })
}
getList(i){
  this.listData = this.approve[i].list;
  console.log("datas",this.listData);
  this.getLists('0');

}
getLists(a){
this.avalListData = this.listData[a].availableList;
console.log("availablelst",this.avalListData);
}


}





