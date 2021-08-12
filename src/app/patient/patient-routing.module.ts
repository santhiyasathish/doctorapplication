import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TopdoctorlistComponent } from './topdoctorlist/topdoctorlist.component';
import { DoctorprofileviewComponent } from './doctorprofileview/doctorprofileview.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AppointmentComponent } from './appointment/appointment.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'book/:id',
    component: BookappointmentComponent
  },
  {
    path: 'category/:key',
    component: CategorylistComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'toplist',
    component: TopdoctorlistComponent
  },
  {
    path: 'docprofile/:id',
    component: DoctorprofileviewComponent
  },
  {
    path: 'editprofile',
    component: EditprofileComponent
  },
  {
    path:'appointment',
    component: AppointmentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
