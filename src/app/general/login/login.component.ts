import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loginForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private service: ServiceService) {}

  ngOnInit() {
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
      email : this.loginForm.value.username,
      password : this.loginForm.value.password
    };


    this.service.login(logData).subscribe(data=>{
      localStorage.setItem('log', JSON.stringify(JSON.parse(JSON.stringify(data)).logData));
    });
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
  onClickLogIn(form){
    console.log(form);
  }
}