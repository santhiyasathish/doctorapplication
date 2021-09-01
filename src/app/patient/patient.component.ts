import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { Dialogs } from '@ionic-native/dialogs/ngx';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss'],
})
export class PatientComponent implements OnInit {

  constructor( private network:Network, private dialogs: Dialogs) {
    this.network.onDisconnect().subscribe(() => {
      this.dialogs.alert('network error');

    });
    this.network.onConnect().subscribe(() => {
      setTimeout(() => {
        this.dialogs.alert('we got a' + this.network.type + 'connecting, woohoo!');
      }, 2000);

    });
   }

  ngOnInit() {}
  

}
