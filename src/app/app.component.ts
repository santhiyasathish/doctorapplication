import { Component } from '@angular/core';
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
    { title: 'Logout', url: '/folder/Favorites', icon: 'heart' }
  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {

    this.email = JSON.parse(localStorage.getItem('log')).email;

  }
}
