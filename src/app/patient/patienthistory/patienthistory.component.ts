import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service';
import { LoadingController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-patienthistory',
  templateUrl: './patienthistory.component.html',
  styleUrls: ['./patienthistory.component.scss'],
})
export class PatienthistoryComponent implements OnInit {
  listData: any;
  list: any;
  loading: any;

  constructor(
    private service: PatientserviceService,
    private menu: MenuController,
    private loadingController: LoadingController,
    ) { }

  ngOnInit() {
    this.menu.enable(false);
    this.presentLoading();
    // this.patientHistory();
  }
  async presentLoading(){
    this.loading = await this.loadingController.create({
      spinner:'dots',
      message: 'Please wait...',
      translucent: true,
      backdropDismiss:false,
      mode:'ios',
      cssClass:'',
      keyboardClose:true,
    });
    await this.loading.present();
    this.patientHistory();
  }

  patientHistory() {

    let id = {
      user_id: '51',
    }

    this.service.patientHistory(id).subscribe(async data => {
      this.listData = [JSON.parse(JSON.stringify(data)).data];
      this.list = this.listData[0];
      console.log(this.list);
      await this.loading.dismiss();

    });
  }

}
