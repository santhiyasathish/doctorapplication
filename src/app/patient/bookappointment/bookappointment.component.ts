import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

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


  constructor(
    private router: Router,
    public platform: Platform,
    private menu: MenuController,
    private service: PatientserviceService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    // private datePipe: DatePipe
  ) {
    this.isAndroid = platform.is('android');
  }

  ngOnInit() {
    this.morningtime = this.service.morningtime;
    this.afternoontime = this.service.afternoontime;
    this.eveningtime = this.service.eveningtime;
    this.doclist = this.service.doclist;
    // this.available=this.service.available;
    this.docId = this.route.snapshot.paramMap.get('id');
    this.durId = this.route.snapshot.paramMap.get('id');
    this.getAppointmentDetail(this.docId);
    this.getappointmentAvailability();
    // this.getapplication();    
    this.menu.enable(false);
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
      if (this.appoint == true){
        this.showAlert();
      }
      console.log("appointment",this.appoint);
    })
  }

  getappointmentAvailability() {
    let avalabledata = {
      dur_id: '1',
      date: '2021-08-13'
    }
    this.service.appointmentAvailability(avalabledata).subscribe(data => {
      this.available = JSON.parse(JSON.stringify(data)).data;
      this.getList('0');
      //  this.getlista('0');
      console.log("availabledata",this.available);
    })
  }

  getList(i) {
    console.log(i);
    this.list = this.available[i].list;
    this.sam = this.available[i].date;
    // this.samu = this.avalabledata.id;
    console.log("list",this.list);
    console.log("availabledate",this.sam);
    console.log("availableid",this.samu);
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
  showAlert() {

    this.alertCtrl.create({
      header: 'Appointment Booking',
      cssClass:'alertHeader',
      message: 'Waiting for your Approval .',
      buttons: ['OK' ]
    }).then(res => {

      res.present();
      this.router.navigateByUrl('/patient/docprofile/3');

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
                    console.log("data reson",Data.reson);
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
