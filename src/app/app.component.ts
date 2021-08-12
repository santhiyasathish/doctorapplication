import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  email : string;
  public appPages = [
    { title: 'home', url: 'patient/docprofile/4', icon: 'mail' },
    { title: 'profile', url: 'patient/docprofile/4', icon: 'paper-plane' },
    { title: 'book appointment', url: 'patient/book', icon: 'paper-plane' },
    { title: 'Logout', url: '', icon: 'heart' }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private router: Router) {
    if (localStorage.getItem('log') != null) {
    this.email = JSON.parse(localStorage.getItem('log')).email;
    }
  }

  logout(value){
    console.log(value);
    if(value == 'Logout'){
      localStorage.clear();
      this.router.navigateByUrl('login');
    }

  }
}
