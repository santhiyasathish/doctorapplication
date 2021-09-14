import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {
  sam: any[];
  appoint: any = [];
 alertmessage: string;
  list: any = [];
 submitted = false;
  docDetail: any = [];
  available: any = [];
  samu: any[];
  loading: any;
  docId: string;
  gForm: FormGroup;
  guestData: any;
  subscribe: any;

  constructor(
    private router: Router,
    private service:ServiceService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder,
    private platform:Platform,) {

    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "GuestComponent") {
        if (window.confirm("Do you want to exit")) {
          navigator["app"].exitApp();
        }
      }
    });
     }

  ngOnInit() {
    this.docId = this.route.snapshot.paramMap.get('id');
    this.getAppointmentDetail(this.docId);
    this.presentLoading();
    this.gForm = this.formBuilder.group({
      name:['', Validators.required],
      contact_number:['', Validators.required],
      location:['', Validators.required]
    });
    
  }
   get f(): { [key: string]: AbstractControl } {
    return this.gForm.controls;
  }
  slidesOptions = {
    slidesPerView: 2.5
  }


  async getappointmentAvailability() {
    let avalabledata = {
      dur_id: '1',
      date: '2021-08-13'
    }
    this.service.appointmentAvailability(avalabledata).subscribe(async data => {
      this.available = JSON.parse(JSON.stringify(data)).data;
      this.getList('0');
      //  this.getlista('0');
      console.log("availabledata", this.available);
      await this.loading.dismiss();
    });

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
    await this.loading.present();
    // this.getappointmentAvailability();
    this.getappointmentAvailability();
  }

  getList(i) {
    console.log(i);
    this.list = this.available[i].list;
    this.sam = this.available[i].date;
    // this.samu = this.avalabledata.id;
    console.log("list", this.list);
    console.log("availabledate", this.sam);
    console.log("availableid", this.samu);
  }
  getAppointmentDetail(id) {
    let passData = {
      doc_id: id
    }
    this.service.appointmentDetail(passData).subscribe(data => {
      this.docDetail = JSON.parse(JSON.stringify(data));
      console.log(data);
    })
  }


  getbookAppointment(reson, id) {
    let appointment = {
      app_id: id,
      date: this.sam,
      reason: reson,
      user_id: this.guestData.data.id,
      status: 'true',
      approvestatus: 'accept'
    };
    console.log(appointment);
    this.service.bookAppointment(appointment).subscribe(data => {
      this.appoint = JSON.parse(JSON.stringify(data)).success;
      if (this.appoint == true) {
        this.showAlert();
      }
      console.log("appointment", this.appoint);
    })
  }


  showAlert() {

    this.alertCtrl.create({
      header: 'Appointment Booking',
      cssClass: 'alertHeader',
      message: 'Waiting for your Approval .',
      buttons: ['OK']
    }).then(res => {

      
      this.presentLoading();
      res.present();
      // this.seduleBasic();
      // this.router.navigateByUrl('/general/guest');

    });

  }

  async conform(id) {
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
                  placeholder: 'Reason'
                }
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

  onGuest(){
    this.submitted = true;
     let data;
    data = {
        // user_id: JSON.parse(localStorage.getItem('log')).id,
        name:this.gForm.value.name,
        contact_number:this.gForm.value.contact_number,
         location:this.gForm.value.location,
    }
    console.log(data);
     let responseData;
      let alertMessage;
    this.service.guestUserApi(data).subscribe( async data =>{
       let response = JSON.parse(JSON.stringify(data));
      this.alertmessage = response.messages;
      if(response.success == true){
     alertMessage = response.message;
      }
      else{
         alertMessage = response.error_messages;
      }
      console.log(response.success);

      console.log("data",data);
      this.guestData = JSON.parse(JSON.stringify(data));
      // alert('Guest Added Successfully');
       let prompt = this.alertCtrl.create({
      
      message: alertMessage,
     
      buttons: [
        
        {
          text: 'Ok',
          
        }
      ]
    });
    (await prompt).present();
      
    });
  }
}
