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

import { PatientserviceService } from '../patientservice.service';
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

  images="";

  // croppedImagepath = "";
  // isLoading = true;

  // imagePickerOptions = {
  //   maximumImagesCount: 1,
  //   quality: 50
  // };

  constructor(
    private formBuilder: FormBuilder,
    private service: PatientserviceService,
    // public camera:CameraResultType,
    
    private router:Router,
    public actionSheetController: ActionSheetController,
    private file: File) { }
  ngOnInit() {

    let id = {
      'user_id': JSON.parse(localStorage.getItem('log')).id
    };
    this.service.getpatientprofile(id).subscribe(data => {
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
      }
      else {
        this.buttontype = 'add';
      }
    });
    this.editForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      contact_number: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9_.+-]+[a-zA-Z0-9-]+$')]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      blood_group: ['', Validators.required],
      marital_status: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      econtact: ['', Validators.required],
      location: ['', Validators.required],

    })

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
    height:100,
    source:CameraSource.Photos,
      resultType: CameraResultType.DataUrl,
    }).then((result)=>{
      this.images = (result.dataUrl);
    },(err)=>{
      
    })
    // this.camera.getPicture({
    //   quality:100,
    //   sourceType: this.camera.PictureSourceType.CAMERA,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE,

    // }).then((res)=>{
    //   this.imgURL = 'data:image/jpeg;base64,'+ res;
    //   alert(this.imgURL);

    // }).catch(e=>{
    //   alert(e);
    // })
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
      econtact: this.editForm.value.econtact,
      location: this.editForm.value.location,
    }

    if (this.editForm.invalid) {
      return;
    }

    if (this.buttontype == 'add') {

      this.service.patientprofile(data).subscribe(data => {
        this.detail = JSON.parse(JSON.stringify(data));
        console.log(data);
      });

    }
    else {
      this.service.patinetprofileedit(data).subscribe(data => {
        this.profileedit = JSON.parse(JSON.stringify(data));
        console.log(data);
      })


    }
  }
  open(status) {

    this.buttontype = status;
  }


}
