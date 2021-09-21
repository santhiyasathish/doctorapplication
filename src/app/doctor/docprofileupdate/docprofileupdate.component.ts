import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupName,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Camera, CameraDirection, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera'
import { DoctorserviceService } from '../doctorservice.service';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { MenuController } from '@ionic/angular';
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
  // contact_number: string;
  location: string;
  value: 3000;
  loading: any;
  imgurl: any;
  subscribe: any;
  selectedFile;
 images = "";
  dob: string;

  constructor(private formBuilder: FormBuilder, 
    private service: DoctorserviceService,
    private alertCtrl: AlertController,
    public loadingController: LoadingController,
    private network: Network,
    private plt: Platform,
    private menu: MenuController,
    ) {
    this.menu.enable(false);
      
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
     gotoNextField(nextElement) {
      var nextinput = this.doctprofileupdateForm.value.dd;
      // var nextinputtwo = this.registerForm.value.mm;
      if (nextinput.length === 2) {
        nextElement.setFocus();
      }
    
      // nextElement.setFocus();
    }
    gotoNextFields(nextElement) {
      var nextinput = this.doctprofileupdateForm.value.mm;
      // var nextinputtwo = this.registerForm.value.mm;
      if (nextinput.length === 2) {
        nextElement.setFocus();
      }
    
      // nextElement.setFocus();
    } 

  ngOnInit() {

    this.presentLoading();
    this.getDoctorProfile();
    
   
    this.doctprofileupdateForm = this.formBuilder.group({

      firstname: [ JSON.parse(localStorage.getItem('log')).name.split(' ')[0], Validators.required],
      lastname: [ JSON.parse(localStorage.getItem('log')).name.split(' ')[1], Validators.required],
      email: ['', [Validators.required,Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]],
      contact_number: [JSON.parse(localStorage.getItem('log')).mobile, Validators.required],
      gender: [JSON.parse(localStorage.getItem('log')).gender, Validators.required],
      dd:[JSON.parse(localStorage.getItem('log')).dob.split('-')[2],[Validators.required, Validators.pattern("^(0[1-9]$|[1-9]$|^[1-2][0-9]$|^3[0-1])$")]],
      mm:[JSON.parse(localStorage.getItem('log')).dob.split('-')[1],[Validators.required, Validators.pattern("^(0[1-9]$|[1-9]$|1[0-2])$")]],
      yyyy:[JSON.parse(localStorage.getItem('log')).dob.split('-')[0],[Validators.required, Validators.pattern("^19(0[0-9]|[1-9][0-9])$|20(0[0-9]|[1-9][0-9])$")]],
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

getDoctorProfile(){
  let id = {
    'user_id': JSON.parse(localStorage.getItem('log')).id
  };
  this.service.viewDoctorProfile(id).subscribe(async data => {
    this.getprofile = JSON.parse(JSON.stringify(data)).data;
    if (JSON.parse(JSON.stringify(data)).success == true) {
      this.buttontype = 'edit';
      this.address = JSON.parse(this.getprofile.location);
      await this.loading.dismiss();
      
      this.images = this.getprofile.image;
      this.doctprofileupdateForm = this.formBuilder.group({
        firstname: [this.getprofile.name.split(' ')[0], Validators.required],
        lastname: [this.getprofile.name.split(' ')[1], Validators.required],
        email: [this.getprofile.email, [Validators.required,Validators.pattern(/^(\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3}))$/)]],
        contact_number: [this.getprofile.contact_number, Validators.required],
        gender: [this.getprofile.gender, Validators.required],
        // dob: [this.dob, Validators.required],
        dd: [this.getprofile.dob.split('-')[2],[Validators.required, Validators.pattern("^(0[1-9]$|[1-9]$|^[1-2][0-9]$|^3[0-1])$")]],
        mm: [this.getprofile.dob.split('-')[1],[Validators.required,Validators.pattern("^(0[1-9]$|[1-9]$|1[0-2])$")]],
        yyyy: [this.getprofile.dob.split('-')[0],[ Validators.required, Validators.pattern("^19(0[0-9]|[1-9][0-9])$|20(0[0-9]|[1-9][0-9])$")]],
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
}

  get f(): {
    [key: string]: AbstractControl
  } {
    return this.doctprofileupdateForm.controls;
  }
  getCamera() {
     Camera.getPhoto({
      quality: 100,
      width: 100,
      height: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
    }).then((result) => {
      
      this.images = (result.dataUrl);
      console.log('image',this.images);
    }, (err) => {

    });
  }
  fileChangeEvent(event: any): void {
      this.selectedFile = event.target.files[0];
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
      // this.pendingList()
    }
    // this.getappointmentAvailability();
  }

  onSubmit() {
    // this.email = this.doctprofileupdateForm.value.email;
  
    // if (this.email.split('@').length == 2) {
    //   this.email= this.doctprofileupdateForm.value.email;
    //   console.log('samcheck', this.email);

    // }
    // else {
    //   this.email=this.doctprofileupdateForm.value.email + '@gmail.com';
    //   console.log('add', this.doctprofileupdateForm.value.email + '@gmail.com');
    // }
    let firstname = this.doctprofileupdateForm.value.firstname;
    let lastname = this.doctprofileupdateForm.value.lastname;
    this.name = firstname + " " + (lastname);
    let dd = this.doctprofileupdateForm.value.dd;
    let mm = this.doctprofileupdateForm.value.mm;
    let yyyy = this.doctprofileupdateForm.value.yyyy;
    this.dob = yyyy + "-" + mm+"-"+dd;
    


   
    this.submitted = true;
     // let data;
    let formData: FormData = new FormData();

  //  this.contact_number =JSON.stringify( this.doctprofileupdateForm.value.contact_number);
    this.location = JSON.stringify(this.doctprofileupdateForm.value.address);

    if (this.selectedFile != undefined) {
      // console.log(this.selectedFile.name);
      formData.append('image', this.selectedFile, this.selectedFile.name);
    }
 formData.append('user_id', JSON.parse(localStorage.getItem('log')).id);
    formData.append('name', this.name);
    formData.append('contact_number', this.doctprofileupdateForm.value.contact_number);
    formData.append('email',this.doctprofileupdateForm.value.email);
    formData.append('gender', this.doctprofileupdateForm.value.gender);
    formData.append('dob', this.dob);
    formData.append('institute', this.doctprofileupdateForm.value.institute);
    formData.append('description', this.doctprofileupdateForm.value.description);
    formData.append('qualification', this.doctprofileupdateForm.value.qualification);
    formData.append('professional', this.doctprofileupdateForm.value.speciality);
    formData.append('emergency_contact', this.doctprofileupdateForm.value.emergency_contact);
    formData.append('location',  this.location);
    formData.append('experience', this.doctprofileupdateForm.value.experience);
    formData.append('consolidatefees', this.doctprofileupdateForm.value.consolidatefees);
    formData.append('about', this.doctprofileupdateForm.value.about);


    if (this.doctprofileupdateForm.invalid) {
      this.failedAlert('please fill all  the field');
      console.log(this.doctprofileupdateForm);
      return;

    }

    if (this.buttontype == 'add') {

      this.service.doctorprofile(formData).subscribe(async data => {
        this.detail = JSON.parse(JSON.stringify(data));
        this.failedAlert(this.detail.messages);
        await this.loading.dismiss();
        this.getDoctorProfile();
        console.log(data);
      });

    }
    else {
      this.service.doctorprofileedit(formData).subscribe(async data => {
        this.profileedit = JSON.parse(JSON.stringify(data));
        this.failedAlert(this.profileedit.messages);
        this.getDoctorProfile();
        await this.loading.dismiss();
      });

    }
  }
  async open(status) {
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
      // this.pendingList()
      this.buttontype = status;
    }

   
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
