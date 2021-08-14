import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';
import { Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AlertController } from '@ionic/angular';
import { getLocaleFirstDayOfWeek } from '@angular/common';
// import { DatePipe } from '@angular/common';

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
  available:any=[];
  durId: string;
  list: any = [];
  doc : any = {
    name : 'Johnny Depp',
    professional : 'MBBS'
  }
  sam :any [];
  samu: any[];
  sample: any;
  avlist: any[];


  constructor(public platform:Platform, 
    private menu:MenuController,
    private service:PatientserviceService,
    private route: ActivatedRoute,
    private alertCtrl: AlertController, 
    // private datePipe: DatePipe
    ) {
    this.isAndroid = platform.is('android');
   }

  ngOnInit() {
    this.morningtime=this.service.morningtime;
    this.afternoontime=this.service.afternoontime;
    this.eveningtime=this.service.eveningtime;
    this.doclist=this.service.doclist;
    // this.available=this.service.available;
    this.docId = this.route.snapshot.paramMap.get('id');
    this.durId = this.route.snapshot.paramMap.get('id');
    this.getAppointmentDetail(this.docId);  
    this.getappointmentAvailability();   
    this.getapplication();    
                                                                    
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

 getappointmentAvailability(){
   let avalabledata ={
     dur_id: '1',
     date: '2021-08-13'
   }
   this.service.appointmentAvailability(avalabledata).subscribe(data=>{
     this.available = JSON.parse(JSON.stringify(data)).data;
     this.getList('0');
    //  this.getlista('0');
     console.log(this.available);
   })
 }

 getList(i){
   console.log(i);
   this.list = this.available[i].list;
   this.sam = this.available[i].date;
   this.samu= this.available[i].id;
   console.log(this.list);
   console.log(this.sam);
   console.log(this.samu);
 }
//  getlista(a){
//  console.log(a);
//    this.avlist = this.list[a].availableList;
//    console.log(this.avlist);
//  }
 
  getAppointmentDetail(id){
    let passData = {
      doc_id: id
    }
    this.service.appointmentDetail(passData).subscribe(data=>{
      this.docDetail = JSON.parse(JSON.stringify(data));
      console.log(data);
    })
  }
  getapplication() {
    let datas = {
      dur_Id :'1',
      date: '2021-08-13' ,
      id : '1',
      time: '9:45 AM'
    }
    this.service.appointmentAvailability(datas).subscribe(data=>{
      this.avlist = JSON.parse(JSON.stringify(data));
      this.getList('0');
      console.log(this.avlist);
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
        
        name: 'reson',
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
        handler: Data => { //takes the data 
        console.log(Data.reson);
        console.log(this.sam);
          
        }
        
       
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

  // getAppointment(){
  //   let myDate = new Date();
  //   this.datePipe.transform(myDate, 'dd-mm-yyyy');
  //   let postData = {
  //     dur_id: '1',
  //     date: myDate
  //   };
  //   console.log(postData);
  //   this.service.getAppointmentList(postData).subscribe(data=>{

  //   });
  // }

}
