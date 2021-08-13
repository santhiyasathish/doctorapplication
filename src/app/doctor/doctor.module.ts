import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoctorRoutingModule } from './doctor-routing.module';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewappiontmentComponent } from './viewappiontment/viewappiontment.component';
import { DocnotificationComponent } from './docnotification/docnotification.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoctorRoutingModule
  ],
  declarations: [
    HomeComponent,
    ProfileComponent,
    ViewappiontmentComponent,
    DocnotificationComponent
  ]
})
export class DoctorModule {}
