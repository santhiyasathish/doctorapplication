import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupName,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { DoctorserviceService } from '../doctorservice.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-docprofileupdate',
  templateUrl: './docprofileupdate.component.html',
  styleUrls: ['./docprofileupdate.component.scss'],
})
export class DocprofileupdateComponent implements OnInit {
  form: FormGroup;
  doctprofileupdateForm: FormGroup;
  name: string;
  submitted = false;
  getprofile: any = [];
  buttontype = "add";
  profileedit: any = [];
  detail: any = [];
  email: string;
  address: any = [];
  contact_number: string;
  location: string;
  value: 3000;
  loading: any;
  imgurl: any;
  subscribe: any;
 


  constructor(private formBuilder: FormBuilder, 
    private service: DoctorserviceService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private network: Network,
    private plt: Platform,
    ) {
      
    this.subscribe = this.plt.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "DocprofileupdateComponent") {
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
     }

  ngOnInit() {

    this.presentLoading();
    
    let id = {
      'user_id': JSON.parse(localStorage.getItem('log')).id
    };
    this.service.viewDoctorProfile(id).subscribe(async data => {
      this.getprofile = JSON.parse(JSON.stringify(data)).data;
      if (JSON.parse(JSON.stringify(data)).success == true) {
        this.buttontype = 'edit';
        this.address = JSON.parse(this.getprofile.location);
        await this.loading.dismiss();

        this.doctprofileupdateForm = this.formBuilder.group({
          firstname: [this.getprofile.name.split(' ')[0], Validators.required],
          lastname: [this.getprofile.name.split(' ')[1], Validators.required],
          email: [this.getprofile.email, [Validators.required, Validators.email]],
          contact_number: [this.getprofile.contact_number, Validators.required],
          gender: [this.getprofile.gender, Validators.required],
          dob: [this.getprofile.dob ? this.getprofile.dob.split('T')[0] : " ", Validators.required],
          institute: [this.getprofile.institute, Validators.required],
          qualification: [this.getprofile.qualification, Validators.required],
          description: [this.getprofile.description, Validators.required],
          speciality: [this.getprofile.professional, Validators.required],
          experience: [this.getprofile.experience, Validators.required],
          address: this.formBuilder.group({
            address1: [this.address.address1, Validators.required],
            address2: [this.address.address2, Validators.required],
            city: [this.address.city, Validators.required],
            state: [this.address.state, Validators.required],
            zip: [this.address.zip, Validators.required]
          }),
          consolidatefees: [this.getprofile.consolidatefees, Validators.required],
          emergency_contact: [this.getprofile.emergency_contact, Validators.required],
          about: [this.getprofile.about, Validators.required]
        });
        
      }
      else {
        this.buttontype = 'add';
      }
    });
    
   
    this.doctprofileupdateForm = this.formBuilder.group({

      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_number: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      institute: ['', Validators.required],
      qualification: ['', Validators.required],
      description: ['', Validators.required],
      speciality: ['', Validators.required],
      experience: ['', Validators.required],
      address: this.formBuilder.group({
        address1: ['', Validators.required],
        address2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      consolidatefees: ['', Validators.required],
      emergency_contact: ['', Validators.required],
      about: ['', Validators.required]
    });
    

  }
  get f(): {
    [key: string]: AbstractControl
  } {
    return this.doctprofileupdateForm.controls;
  }

  async handleButtonClick() {
    await this.loading.dismiss();
    this.imgurl = "../../../assets/splash_screen.gif";
    const alert = await this.alertCtrl.create({
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
    const alert = await this.alertCtrl.create({
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
      // this.pendingList()
    }
    // this.getappointmentAvailability();
  }

  onSubmit() {

    let firstname = this.doctprofileupdateForm.value.firstname;
    let lastname = this.doctprofileupdateForm.value.lastname;
    this.name = firstname + " " + (lastname);
    if (this.doctprofileupdateForm.value.email.split('@').length == 2) {
      this.doctprofileupdateForm.value.email;

    }
    else {
      this.doctprofileupdateForm.value.email + '@gmail.com'
    }

    
    this.submitted = true;

    let data;
    this.contact_number =JSON.stringify( this.doctprofileupdateForm.value.contact_number);
    this.location = JSON.stringify(this.doctprofileupdateForm.value.address);
    data = {
      user_id: JSON.parse(localStorage.getItem('log')).id,
      name: this.name,
      contact_number:this.contact_number,
      gender: this.doctprofileupdateForm.value.gender,
      email: this.doctprofileupdateForm.value.email,
      dob: this.doctprofileupdateForm.value.dob.split('T')[0],
      institute: this.doctprofileupdateForm.value.institute,
      description: this.doctprofileupdateForm.value.description,
      qualification: this.doctprofileupdateForm.value.qualification,
      professional: this.doctprofileupdateForm.value.speciality,
      location:  this.location,
      experience: this.doctprofileupdateForm.value.experience,
      consolidatefees: this.doctprofileupdateForm.value.consolidatefees,
      emergency_contact: this.doctprofileupdateForm.value.emergency_contact,
      about: this.doctprofileupdateForm.value.about
    }

    
    console.log(this.doctprofileupdateForm.value.email);
    // console.log(data, "data");


    if (this.doctprofileupdateForm.invalid) {
      this.failedAlert('Address field is required');
      console.log(this.doctprofileupdateForm);
      return;

    }

    if (this.buttontype == 'add') {

      this.service.doctorprofile(data).subscribe(async data => {
        this.detail = JSON.parse(JSON.stringify(data));
        this.failedAlert(this.detail.messages);
        await this.loading.dismiss();
       if(this.location == null){
        this.failedAlert('Address field is required');
       }
       else{

       }
        console.log(data);
      });

    }
    else {
      this.service.doctorprofileedit(data).subscribe(async data => {
        this.profileedit = JSON.parse(JSON.stringify(data));
        this.failedAlert(this.profileedit.messages);
        console.log(data);
        await this.loading.dismiss();
      });

    }
  }
  open(status) {

    this.buttontype = status;
  }
  
  async failedAlert(msg) {
    let alert = await this.alertCtrl.create({
      message:msg,
      buttons: [
        {
          text: 'ok',
        }                                                 
      ]
    });
      alert.present();
    }
}
