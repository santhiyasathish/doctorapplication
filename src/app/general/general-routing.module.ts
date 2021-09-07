import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestComponent } from './guest/guest.component';
import { SplashComponent } from './splash/splash.component';

const routes: Routes = [
  {
    path: 'guest',
    component: GuestComponent
  },{
    path: 'splash',
    component: SplashComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
