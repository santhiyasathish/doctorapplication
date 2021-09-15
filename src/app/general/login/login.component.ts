import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ServiceService } from '../service.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

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

  constructor(
    private formBuilder: FormBuilder, 
    private service: ServiceService, 
    private router: Router, 
    public alertCtrl: AlertController,
    private menu: MenuController,
    private plt :Platform,
    ) {
      
    this.menu.enable(false);
    this.subscribe = this.plt.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "LoginComponent") {
        window.location.href ="patient/docprofile/3";
      }
    });
    }

  ngOnInit() {
    if (localStorage.getItem('log') != null) {
      if (JSON.parse(localStorage.getItem('log')).user_type == 'doctor') {
        window.location.href ="doctor/docprofileupdate";
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

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    let logData = {
      mobile : this.loginForm.value.mobile,
      password : this.loginForm.value.password
    };
    let responseData;
    let alertMessage;
    this.service.login(logData).subscribe(async data=>{
      responseData = JSON.parse(JSON.stringify(data));
      if(responseData.success == true){
        alertMessage = responseData.messages;
        localStorage.setItem('log', JSON.stringify(responseData.logData));
        if (JSON.parse(localStorage.getItem('log')).user_type == 'doctor') {
          window.location.href = "doctor/home";
          // this.router.navigateByUrl('');
        }
        else if (JSON.parse(localStorage.getItem('log')).user_type == 'patient') {
          window.location.href = "patient/book/3";
          // this.router.navigateByUrl('');
        }
        else {
          window.location.href = "general/guest";
          // this.router.navigateByUrl('');
        }
      }
      else{
        alertMessage = responseData.error_messages;
        this.loginForm.reset();
      }
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
