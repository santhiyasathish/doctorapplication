import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginForm: FormGroup;
  submitted = false;
  hide = true;
  subscribe: any;
  value: number;
  loading: any;
  alertMessage: any;
  alertmessages: any;

  constructor(
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router,
    public loadingController: LoadingController,
    public alertCtrl: AlertController,
    private menu: MenuController,
    private plt: Platform,
    private location: Location,

  ) {

    this.menu.enable(false);
    this.subscribe = this.plt.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "LoginComponent") {
        window.location.href = "patient/docprofile/3";
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('log') != null) {
      if (JSON.parse(localStorage.getItem('log')).user_type == 'doctor') {
        window.location.href = "doctor/docprofileupdate";
        // this.router.navigateByUrl('');
      }
      else if (JSON.parse(localStorage.getItem('log')).user_type == 'patient') {
        
        window.location.href = "patient/editprofile";
        // this.router.navigateByUrl('');
      }
      else {
        window.location.href = "patient/docprofile/3";
        // this.router.navigateByUrl('patient/docprofile/3');
      }
    }
    this.loginForm = this.formBuilder.group({
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
    });


  }
  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

  async onSubmit(): Promise<void> {
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
      // this.pendingList()
      this.submitted = true;
    }

    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    let logData = {
      mobile: this.loginForm.value.mobile,
      password: this.loginForm.value.password
    };


    // let responseData;
    let alertMessage;
    this.service.login(logData).subscribe(async data => {
      let responseData = JSON.parse(JSON.stringify(data));
      this.alertmessages = responseData.messages;
      if (responseData.success == true) {
        await this.loading.dismiss();
        alertMessage = responseData.messages;
        // let prompt = this.alertCtrl.create({

        //   message: alertMessage,
        //   mode:'ios',
  
        //   buttons: [
  
        //     {
        //       text: 'Ok',
  
        //     }
        //   ]
        // });
        // (await prompt).present();
        
        console.log('log', alertMessage);
        localStorage.setItem('log', JSON.stringify(responseData.logData));
        if (JSON.parse(localStorage.getItem('log')).user_type == 'doctor') {
  
          window.location.href = "doctor/home";
          // this.router.navigateByUrl('');
        }
        else if (JSON.parse(localStorage.getItem('log')).user_type == 'patient') {
          if (window.history.state.navigationId > 1) {
            console.log("len", window.history.state.navigationId);
            window.location.href = "patient/book/3";
           
          }else{
            window.location.href = "patient/docprofile/3";
          }
          // if (window.history.length > 1) {
          //   this.location.back();
          //   // this.doctorprofile.presentLoading();
          // } else {

          // }
          // window.location.href = "patient/book/3";
          // this.router.navigateByUrl('');
        }
        else {
       
          window.location.href = "general/guest";
          // this.router.navigateByUrl('');
        }
      }
      else {
        alertMessage = responseData.error_messages;
        this.loginForm.reset();
      }
      let prompt = this.alertCtrl.create({

        message: alertMessage,
        mode:'ios',

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
