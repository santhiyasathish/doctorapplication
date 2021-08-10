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


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  form: FormGroup;
  alertmessage: string; 
  registerForm:FormGroup;
  submitted = false;
  mydate;
 

  constructor(private formBuilder: FormBuilder, private service: ServiceService, public alertCtrl: AlertController) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      password: [
              '',
              [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(40)
              ]
            ],
     cpassword:['',Validators.required],
     usertype:['',Validators.required],
     gender:['',Validators.required],
     dob:['',Validators.required]
    
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
      email: this.registerForm.value.email,
      username: this.registerForm.value.username,
      usertype: this.registerForm.value.usertype,
      password: this.registerForm.value.password,
      gender : this.registerForm.value.gender,
      dob: this.registerForm.value.dob.split('T')[0],
      }
      
    this.service.register(data).subscribe(async data =>{
      this.alertmessage = JSON.parse(JSON.stringify(data)).error_messages; 
      console.log(JSON.parse(JSON.stringify(data)).error_messages);
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
    // console.log(JSON.stringify(this.registerForm.value, null, 2));
    
    // console.log(this.registerForm.value.dob.split('T')[0]);
  }

}
