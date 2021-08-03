import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: String="";
  password: String="";
  constructor() { }

  ngOnInit() {}
  
  onSubmit(){
    alert(this.username+","+this.password)
  }
}
