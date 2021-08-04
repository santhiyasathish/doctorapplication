import { Component, OnInit } from '@angular/core';
import { PatientserviceService } from '../patientservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-doctorprofileview',
  templateUrl: './doctorprofileview.component.html',
  styleUrls: ['./doctorprofileview.component.scss'],
})
export class DoctorprofileviewComponent implements OnInit {
  editData : any;
  profileId: string;
  constructor(public service:PatientserviceService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    this.profileId = this.route.snapshot.paramMap.get('id');
    this.viewDoctorProfile(this.profileId);
  }

  viewDoctorProfile(val){
    let id = {
      user_id: val
    }
    this.service.viewDoctorProfile(id).subscribe(data=>{
      this.editData = [JSON.parse(JSON.stringify(data)).data];
    })
  }

}
