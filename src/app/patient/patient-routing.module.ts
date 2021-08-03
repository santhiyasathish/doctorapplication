import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { CategorylistComponent } from './categorylist/categorylist.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TopdoctorlistComponent } from './topdoctorlist/topdoctorlist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'book',
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
