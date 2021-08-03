import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
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
  constructor(private service: ServiceService) { }

  ngOnInit() {}
  
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
    alert(this.username+","+this.email+","+this.password+","+this.mobile)

  }
}
