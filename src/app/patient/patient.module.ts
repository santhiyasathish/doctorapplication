import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientRoutingModule } from './patient-routing.module';

import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TopdoctorlistComponent } from './topdoctorlist/topdoctorlist.component';
import { DoctorprofileviewComponent } from './doctorprofileview/doctorprofileview.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientRoutingModule
  ],
  declarations: [
    BookappointmentComponent,
    CategorylistComponent,
    HomeComponent,
    ProfileComponent,
    TopdoctorlistComponent,
    DoctorprofileviewComponent
  ]
})
export class PatientModule {}
