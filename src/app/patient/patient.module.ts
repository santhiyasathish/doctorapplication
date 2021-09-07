import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { PatientRoutingModule } from './patient-routing.module';

import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TopdoctorlistComponent } from './topdoctorlist/topdoctorlist.component';
import { DoctorprofileviewComponent } from './doctorprofileview/doctorprofileview.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AppointmentComponent } from './appointment/appointment.component';
import { PatnotificationComponent } from './patnotification/patnotification.component';
import {  ReactiveFormsModule  } from '@angular/forms';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { CallNumber} from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';






@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PatientRoutingModule,
  
  
  
  ],
  declarations: [
    BookappointmentComponent,
    CategorylistComponent,
    HomeComponent,
    ProfileComponent,
    TopdoctorlistComponent,
    DoctorprofileviewComponent,
    EditprofileComponent,
    AppointmentComponent,
    PatnotificationComponent
  ],
  providers : [DatePipe,Camera,File,CallNumber,EmailComposer]
})
export class PatientModule {}
