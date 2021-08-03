import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username: string ="";
  email: string="";
  password: string="";
  mobile: string="";
  constructor() { }

  ngOnInit() {}
  
  onSubmit(){
    alert(this.username+","+this.email+","+this.password+","+this.mobile)

  }
}
