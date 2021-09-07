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

  constructor(private formBuilder: FormBuilder, private service: ServiceService, public alertCtrl: AlertController, private router: Router) { }

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
      mobile:['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
      cpassword: ['', Validators.required],
      usertype: ['', Validators.required],
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
      usertype: this.registerForm.value.usertype,
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
          if (JSON.parse(localStorage.getItem('log')).usertype == 'doctor') {
            this.router.navigateByUrl('doctor/docprofileupdate');
          }
          else if (JSON.parse(localStorage.getItem('log')).usertype == 'patient') {
            this.router.navigateByUrl('patient/editprofile');
          }
          else {
            this.router.navigateByUrl('patient/docprofile/3');
          }
        });
      }
      else {
        alertMsg = response.error_messages;
      }
      let prompt = this.alertCtrl.create({

        message: this.alertmessage,

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
