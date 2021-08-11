import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-bookappointment',
  templateUrl: './bookappointment.component.html',
  styleUrls: ['./bookappointment.component.scss'],
})
export class BookappointmentComponent implements OnInit {
  morningtime:any[];
  afternoontime:any[];
  eveningtime:any[];
  doclist:any[];
  category: string = "all";
  isAndroid: boolean = false;
  docId: string;
  docDetail: any = [];


  constructor(public platform:Platform, 
    private menu:MenuController,
    private service:PatientserviceService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController) {
    this.isAndroid = platform.is('android');
   }

  ngOnInit() {
    this.morningtime=this.service.morningtime;
    this.afternoontime=this.service.afternoontime;
    this.eveningtime=this.service.eveningtime;
    this.doclist=this.service.doclist;
    this.docId = this.route.snapshot.paramMap.get('id');
    this.getAppointmentDetail(this.docId);                                                                           
    
    this.menu.enable(false);
  }
  slidesOptions={
    slidesPerView:2.5
  }

 bookAppointment(){
   let appointment = {
     doc_id: '',
     pat_id: '',
     time: '',
     date: '',
     session: ''
   }
   this.service.bookAppointment(appointment).subscribe(data=>{
    console.log(data);
   })
 }

  getAppointmentDetail(id){
    let passData = {
      doc_id: id
    }
    this.service.appointmentDetail(passData).subscribe(data=>{
      this.docDetail = JSON.parse(JSON.stringify(data)).data;
      console.log(data);
    })
  }
  async conform(){
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
        
        name: 'text',
        placeholder: 'Reason'
      }
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Submit',
        // handler: data => {
        //   if (User.isValid(data.username, data.password)) {
        //     // logged in!
        //   } else {
        //     // invalid login
        //     return false;
        //   }
        // }
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
