import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service';

@Component({
  selector: 'app-doctorprofileview',
  templateUrl: './doctorprofileview.component.html',
  styleUrls: ['./doctorprofileview.component.scss'],
})
export class DoctorprofileviewComponent implements OnInit {
  editData : any;
  constructor(public service:PatientserviceService) { }

  ngOnInit() {
    this.service.doclist.forEach(data=>{
      console.log(data)
        if(JSON.parse(JSON.stringify(data)).id == window.location.href.split('/')[5]){
          this.editData = [data];
        }
      });
      console.log(this.editData);
  }

}
