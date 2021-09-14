import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
// import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Camera, CameraDirection, CameraResultType, CameraSource, ImageOptions } from '@capacitor/camera'
import { File } from '@ionic-native/file/ngx';
import { ActionSheetController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { PatientserviceService } from '../patientservice.service';
import { LoadingController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';
import { Platform } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnInit {
  form: FormGroup;
  editForm: FormGroup;
  submitted = false;
  detail: any = [];
  sample: string;
  name: string;
  getprofile: any = [];
  profileedit: any = [];
  buttontype = 'add';
  imgURL: any;

  images = "";
  value: 3000;
  loading: any;
  imgurl: any;
  subscribe: any;
  // backHidden: boolean=true;

  // croppedImagepath = "";
  // isLoading = true;

  // imagePickerOptions = {
  //   maximumImagesCount: 1,
  //   quality: 50
  // };

  constructor(
    private formBuilder: FormBuilder,
    private service: PatientserviceService,
    private alertCtrl: AlertController,
    // public camera:CameraResultType,
    private router: Router,
    public actionSheetController: ActionSheetController,
    private file: File,
    public loadingController: LoadingController,
    private network: Network,
    private plt: Platform,
    private menu: MenuController,
  ) {
    
    menu.enable(false);

    this.network.onDisconnect().subscribe(() => {
      setTimeout(() => {
        this.networkError();
      }, 2000);
    });

    this.plt.ready().then((rdy) => {

    });

    this.subscribe = this.plt.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "EditprofileComponent") {
        window.location.href = "patient/docprofile/3";
        // this.back();
      }
    });

  }
  ngOnInit() {
    this.presentLoading();

    let id = {
      'user_id': JSON.parse(localStorage.getItem('log')).id
    };
    this.service.getpatientprofile(id).subscribe(async data => {
      this.getprofile = JSON.parse(JSON.stringify(data)).data;
      if (JSON.parse(JSON.stringify(data)).success == true) {
        this.buttontype = 'edit';
        console.log(this.getprofile);
        this.editForm = this.formBuilder.group({
          firstname: [this.getprofile.name.split(' ')[0], Validators.required],
          lastname: [this.getprofile.name.split(' ')[1], Validators.required],
          contact_number: [this.getprofile.contact_number, Validators.required],
          email: [this.getprofile.email, [Validators.required, Validators.email]],
          gender: [this.getprofile.gender, Validators.required],
          dob: [this.getprofile.dob.split('T')[0], Validators.required],
          blood_group: [this.getprofile.blood_group.toLowerCase(), Validators.required],
          marital_status: [this.getprofile.marital_status, Validators.required],
          height: [this.getprofile.height, Validators.required],
          weight: [this.getprofile.weight, Validators.required],
          econtact: ['', Validators.required],
          location: [this.getprofile.location, Validators.required],
        });
        await this.loading.dismiss();
      }
      else {
        this.buttontype = 'add';
      }
    });
  
    this.editForm = this.formBuilder.group({
      firstname: [JSON.parse(localStorage.getItem('log')).name.split(' ')[0], Validators.required],
      lastname: [JSON.parse(localStorage.getItem('log')).name.split(' ')[1], Validators.required],
      contact_number: [JSON.parse(localStorage.getItem('log')).mobile, Validators.required],
      email: ['', [Validators.required, Validators.email
        // , Validators.pattern('^[a-zA-Z0-9_.+-]+[a-zA-Z0-9-]+$')
      ]],
      gender: [JSON.parse(localStorage.getItem('log')).gender, Validators.required],
      dob: [JSON.parse(localStorage.getItem('log')).dob, Validators.required],
      blood_group: ['', Validators.required],
      marital_status: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      econtact: ['', Validators.required],
      location: ['', Validators.required],

    })
  console.log(JSON.parse(localStorage.getItem('log')).gender);
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


    }



    // this.getappointmentAvailability();
  }
  get f(): {
    [key: string]: AbstractControl
  } {
    return this.editForm.controls;
  }
  // pickImage(sourceType) {
  //   this.file.checkDir(this.file.dataDirectory, 'mydir')
  //     .then(_ =>
  //       console.log('Directory exists'))
  //     .catch(err =>
  //       console.log('Directory doesn\'t exist'));
  //   const options: CameraOptions = {
  //     quality: 100,
  //     sourceType: sourceType,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE
  //   }
  //   this.camera.getPicture(options).then((imageData) => {
  //     // imageData is either a base64 encoded string or a file URI
  //     this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
  //     alert(this.croppedImagepath);
  //   }, (err) => {
  //     // Handle error
  //     alert(err);
  //   });
  // }
  // async selectImage() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Select Image source",
  //     buttons: [{
  //       text: 'Load from Library',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
  //       }
  //     },
  //     {
  //       text: 'Use Camera',
  //       handler: () => {
  //         this.pickImage(this.camera.PictureSourceType.CAMERA);
  //       }
  //     },
  //     {
  //       text: 'Cancel',
  //       role: 'cancel'
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }

  getCamera() {
    // var options: ImageOptions = {
    //   quality: 100,
    //   resultType: CameraResultType.DataUrl,
    //   // saveToGallery:true
    // }
    // Camera.getPhoto({options).then((result)=>{
    //   this.images=(result.dataUrl);

    // },(err)=>{
    //   this.router.navigate(['/patient/editprofile']);
    //   alert(JSON.stringify(err));
    // })
    Camera.getPhoto({
      quality: 100,
      width: 100,
      height: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
    }).then((result) => {
      this.images = (result.dataUrl);
    }, (err) => {

    });
  }

  onSubmit() {
    let firstname = this.editForm.value.firstname;
    let lastname = this.editForm.value.lastname;
    this.name = firstname + " " + (lastname);

    this.submitted = true;

    let data;
    data = {
      user_id: JSON.parse(localStorage.getItem('log')).id,
      name: this.name,
      contact_number: this.editForm.value.contact_number,
      email: this.editForm.value.email,
      gender: this.editForm.value.gender,
      dob: this.editForm.value.dob.split('T')[0],
      blood_group: this.editForm.value.blood_group,
      marital_status: this.editForm.value.marital_status,
      height: this.editForm.value.height,
      weight: this.editForm.value.weight,
      emergency_contact: this.editForm.value.econtact,
      location: this.editForm.value.location,
    }
    console.log(this.editForm);
    if (this.editForm.invalid) {
      return;
    }

    if (this.buttontype == 'add') {

      this.service.patientprofile(data).subscribe(async data => {
        this.detail = JSON.parse(JSON.stringify(data));
        this.failedAlert(this.detail.messages);
        console.log(data);
        await this.loading.dismiss();
      });

    }
    else {
      this.service.patinetprofileedit(data).subscribe(async data => {
        this.profileedit = JSON.parse(JSON.stringify(data));
        this.failedAlert(this.profileedit.messages);
        this.router.navigateByUrl('patient/docprofile/3');
        console.log(data);
        await this.loading.dismiss();
      })


    }
  }
  open(status) {

    this.buttontype = status;
  }

  async failedAlert(msg) {
    let alert = await this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'ok',
        }
      ]
    });
    alert.present();
  }
}
