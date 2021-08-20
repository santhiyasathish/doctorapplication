import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { PatientserviceService } from '../patientservice.service';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss'],
})
export class EditprofileComponent implements OnInit {
  form: FormGroup;
  editForm: FormGroup;
  submitted = false;
  detail: any = [];
  sample: string;
  name: string;

  constructor(private formBuilder: FormBuilder, private service: PatientserviceService) { }
  ngOnInit() {
    
    this.editForm = this.formBuilder.group({
      firstname: ['sasmitha', Validators.required],
      lastname: ['', Validators.required],
      contact_number: ['', Validators.required],
      email: ['', [Validators,Validators.email]],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      bloodgroup: ['', Validators],
      mstatus: ['', Validators],
      height: ['', Validators],
      weight: ['', Validators],
      econtact: ['', Validators],
      location: ['', Validators.required],

    })
  }
  get f(): {
     [key: string]: AbstractControl 
    } {
    return this.editForm.controls;
  }

  onSubmit() {
    let firstname = this.editForm.value.firstname;
    let lastname = this.editForm.value.lastname;
    this.name = firstname + " " + (lastname);

    this.submitted = true;

    let data;
    data = {
      user_id: JSON.parse(localStorage.getItem('log')).id,
      name: this.name,
      contact_number: this.editForm.value.contact_number,
      email: this.editForm.value.email,
      gender: this.editForm.value.gender,
      dob: '2020-12-12',
      bloodgroup: this.editForm.value.bloodgroup,
      mstatus: this.editForm.value.mstatus,
      height: this.editForm.value.height,
      weight: this.editForm.value.weight,
      econtact: this.editForm.value.econtact,
      location: this.editForm.value.location,
    }
    this.service.patientprofile(data).subscribe(data => {
      this.detail = JSON.parse(JSON.stringify(data));
      console.log(data);
    })

    if (this.editForm.invalid) {
      return;
    }

  }
}
