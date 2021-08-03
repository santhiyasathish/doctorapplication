import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewappiontmentComponent } from './viewappiontment/viewappiontment.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'view',
    component: ViewappiontmentComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
