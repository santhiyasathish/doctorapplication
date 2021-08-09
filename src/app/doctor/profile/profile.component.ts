import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {}
ionViewDidEnter() {
    document.querySelector('#tab-button-tab3').shadowRoot.querySelector('.button-native').setAttribute('style', 'margin-top: -2px');
}
}
