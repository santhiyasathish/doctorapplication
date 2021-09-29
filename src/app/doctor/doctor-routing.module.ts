import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewappiontmentComponent } from './viewappiontment/viewappiontment.component';
import { DocnotificationComponent } from './docnotification/docnotification.component';
import { AppointmentlistComponent } from './appointmentlist/appointmentlist.component';
import { DocprofileupdateComponent } from './docprofileupdate/docprofileupdate.component';
import { DoctorhistoryComponent } from './doctorhistory/doctorhistory.component';
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'view',
    component: ViewappiontmentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path:'docnotification',
  component:DocnotificationComponent
},
{
  path:'appointmentlist',
  component: AppointmentlistComponent
},{
  path:'docprofileupdate',
  component:DocprofileupdateComponent
},{
  path:'doctorhistory',
  component:DoctorhistoryComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
