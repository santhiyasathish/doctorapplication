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

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {
  sam: any[];
  appoint: any = [];

  list: any = [];

  docDetail: any = [];
  available: any = [];
  samu: any[];
  loading: any;
  docId: string;
  gForm: FormGroup;
  guestData: any;
  constructor(
    private router: Router,
    private service:ServiceService,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.docId = this.route.snapshot.paramMap.get('id');
    this.getAppointmentDetail(this.docId);
    this.presentLoading();
    this.gForm = this.formBuilder.group({
      name: ['', Validators.required],
      contact_number: ['', Validators.required],
      location: ['', Validators.required]
    });
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
      message: 'Loading...',
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
    console.log(this.gForm.value);
    this.service.guestUserApi(this.gForm.value).subscribe(data =>{
      console.log(data);
      this.guestData = JSON.parse(JSON.stringify(data));
      alert('Guest Added Successfully');
    })
  }
}
