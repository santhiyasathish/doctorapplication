import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { GeneralModule } from './general/general.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DatePipe } from '@angular/common';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Network} from '@ionic-native/network/ngx';
import { Dialogs} from '@ionic-native/dialogs/ngx';

// import { LocalNotifications } from '@ionic-native/local-notifications/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    CommonModule, 
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(), AppRoutingModule, HttpClientModule, 
    
  ],
  exports: [GeneralModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, 
    DatePipe, 
    LocalNotifications,
    Camera,
    File,
    Network,
    Dialogs],
  bootstrap: [AppComponent],
})
export class AppModule {}



