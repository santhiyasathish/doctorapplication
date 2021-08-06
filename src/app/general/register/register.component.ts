import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private service: ServiceService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('santhiya'),
      email: new FormControl('santhiya.duskcoder@gmail.com'),
      usertype: new FormControl('doctor'),
      password: new FormControl('12345678'),
      cpassword: new FormControl('12345678'),
      gender: new FormControl('female'),
      dob: new FormControl('1996-02-22'),
    });
  }
  
  onSubmit(){
    let data;
    data = {
      email: "santhiya.duskcoder@gmail.com",
      username: "santhiya",
      usertype: "doctor/patient",
      password: "sdjkfsdj",
      gender : "female",
      dob: "22/02/1996"
      }
      
    this.service.register(data).subscribe(data =>{
      console.log(data);
    });
  }

  onClickLogIn(form){
    console.log(form)
    let data;
    data = {
      email: form.email,
      username: form.username,
      usertype: form.usertype,
      password: form.password,
      gender : form.gender,
      dob: form.dob,
      }
      
    this.service.register(data).subscribe(data =>{
      console.log(data);
    });
  }
}
