import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GeneralRoutingModule } from './general-routing.module';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GuestComponent } from './guest/guest.component';
import { SplashComponent } from './splash/splash.component';
import { SplitInterpolation } from '@angular/compiler';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule,
    GeneralRoutingModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    GuestComponent,
    SplashComponent

    
  ]
})
export class GeneralModule {}
