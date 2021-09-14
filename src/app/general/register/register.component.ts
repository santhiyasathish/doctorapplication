import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ServiceService } from '../service.service';
import { AlertController } from '@ionic/angular';
import Validation from './validation';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  alertmessage: string;
  registerForm: FormGroup;
  submitted = false;
  mydate;
  hide = true;
  subscribe: any;

  constructor(private formBuilder: FormBuilder,
    private service: ServiceService,
    public alertCtrl: AlertController,
    private router: Router,
    private menu: MenuController,
    private platform: Platform
  ) {
    this.menu.enable(false);

    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "RegisterComponent") {
        window.location.href = "/login";
        // this.back();
      }
    });
  }

  ngOnInit() {
    if (localStorage.getItem('log') != null) {
      this.router.navigateByUrl('patient/docprofile/3');
    }
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      // email: ['', Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      // ])],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
      cpassword: ['', Validators.required],
      // usertype: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required]

    },
      {
        validators: [Validation.match('password', 'cpassword')]
      }

    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }




  async onSubmit(): Promise<void> {
    this.submitted = true;
    let data;
    data = {
      // email: this.registerForm.value.email,
      mobile: this.registerForm.value.mobile,
      username: this.registerForm.value.username,
      usertype: 'patient',
      password: this.registerForm.value.password,
      gender: this.registerForm.value.gender,
      dob: this.registerForm.value.dob.split('T')[0],
    }
    let alertMsg;
    this.service.register(data).subscribe(async data => {
      let response = JSON.parse(JSON.stringify(data));
      this.alertmessage = response.messages;
      if (response.success == true) {
        let logdata;
        alertMsg = response.messages;
        logdata = {
          mobile: this.registerForm.value.mobile,
          password: this.registerForm.value.password,
        }
        this.service.login(logdata).subscribe(data1 => {
          localStorage.setItem('log', JSON.stringify(JSON.parse(JSON.stringify(data1)).logData));
          if (JSON.parse(localStorage.getItem('log')).user_type == 'doctor') {
            window.location.href = "doctor/docprofileupdate";
            // this.router.navigateByUrl('doctor/docprofileupdate');
          }
          else if (JSON.parse(localStorage.getItem('log')).user_type == 'patient') {
            window.location.href = "patient/editprofile";
            // this.router.navigateByUrl('patient/editprofile');
          }
          else {
            window.location.href = "patient/docprofile/3";
            // this.router.navigateByUrl('patient/docprofile/3');
          }
        });
      }
      else {
        alertMsg = response.error_messages;
      }
      console.log("error_message", response.error_messages);
      let prompt = this.alertCtrl.create({

        message: alertMsg,

        buttons: [

          {
            text: 'Ok',
          }
        ]
      });
      (await prompt).present();

    });
    if (this.registerForm.invalid) {
      return;
    }
  }

}
