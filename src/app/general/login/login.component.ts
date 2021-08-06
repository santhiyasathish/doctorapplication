import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('username'),
      password: new FormControl('password')
    });
  }

  onClickLogIn(form){
    console.log(form)
    // localStorage.setItem('key',)
    // this.authService.login(form.value).subscribe((res)=>{
    // });
    // form.reset();
  }
}