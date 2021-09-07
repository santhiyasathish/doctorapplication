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

  constructor(private formBuilder: FormBuilder, private service: ServiceService, 
    private router: Router, public alertCtrl: AlertController) {}

  ngOnInit() {
    if (localStorage.getItem('log') != null) {
      this.router.navigateByUrl('patient/docprofile/3');
    }
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
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
      mobile : this.loginForm.value.username,
      password : this.loginForm.value.password
    };
    let responseData;
    let alertMessage;
    this.service.login(logData).subscribe(async data=>{
      responseData = JSON.parse(JSON.stringify(data));
      if(responseData.success == true){
        alertMessage = responseData.messages;
        localStorage.setItem('log', JSON.stringify(responseData.logData));
        this.router.navigateByUrl('patient/docprofile/3');
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
