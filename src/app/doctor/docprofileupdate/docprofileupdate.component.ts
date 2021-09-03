import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupName,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { DoctorserviceService } from '../doctorservice.service';
@Component({
  selector: 'app-docprofileupdate',
  templateUrl: './docprofileupdate.component.html',
  styleUrls: ['./docprofileupdate.component.scss'],
})
export class DocprofileupdateComponent implements OnInit {
  form: FormGroup;
  doctprofileupdateForm: FormGroup;
  name: string;
  submitted = false;
  getprofile: any = [];
  buttontype = "add";
  profileedit: any = [];
  detail: any = [];
  email: string;
  address: any = [];
  contact_number: string;
  location: string;


  constructor(private formBuilder: FormBuilder, private service: DoctorserviceService) { }

  ngOnInit() {

    // let location;
    //  location ={
    //    addressl1 : this.doctprofileupdateForm.value.addressl1 =[],
    //    addressl2 : this.doctprofileupdateForm.value.addressl2 =[],
    //    city : this.doctprofileupdateForm.value.city =[],
    //    state : this.doctprofileupdateForm.value.state =[],
    //   zip : this.doctprofileupdateForm.value.zip =[],
    //  };
    let id = {
      'user_id': "10"
    };
    this.service.getdoctorprofile(id).subscribe(data => {
      this.getprofile = JSON.parse(JSON.stringify(data)).data;
      if (JSON.parse(JSON.stringify(data)).success == true) {
        this.buttontype = 'edit';
        this.address = JSON.parse(this.getprofile.location);

        this.doctprofileupdateForm = this.formBuilder.group({
          firstname: [this.getprofile.name.split(' ')[0], Validators.required],
          lastname: [this.getprofile.name.split(' ')[1], Validators.required],
          email: [this.getprofile.email, [Validators.required, Validators.email]],
          contact_number: [this.getprofile.contact_number, Validators.required],
          gender: [this.getprofile.gender, Validators.required],
          dob: [this.getprofile.dob ? this.getprofile.dob.split('T')[0] : " ", Validators.required],
          institute: [this.getprofile.institute, Validators.required],
          qualification: [this.getprofile.qualification, Validators.required],
          description: [this.getprofile.description, Validators.required],
          speciality: [this.getprofile.professional, Validators.required],
          experience: [this.getprofile.experience, Validators.required],
          address: this.formBuilder.group({
            addressl1: [this.address.addressl1, Validators.required],
            addressl2: [this.address.addressl2, Validators.required],
            city: [this.address.city, Validators.required],
            state: [this.address.state, Validators.required],
            zip: [this.address.zip, Validators.required]
          }),
          consolidatefees: [this.getprofile.consolidatefees, Validators.required],
          emergency_contact: [this.getprofile.emergency_contact, Validators.required],
          about: [this.getprofile.about, Validators.required]
        });
      }
      else {
        this.buttontype = 'add';
      }
    });
    this.doctprofileupdateForm = this.formBuilder.group({

      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contact_number: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      institute: ['', Validators.required],
      qualification: ['', Validators.required],
      description: ['', Validators.required],
      speciality: ['', Validators.required],
      experience: ['', Validators.required],
      address: this.formBuilder.group({
        addressl1: ['', Validators.required],
        addressl2: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.required]
      }),
      consolidatefees: ['', Validators.required],
      emergency_contact: ['', Validators.required],
      about: ['', Validators.required]
    })

  }
  get f(): {
    [key: string]: AbstractControl
  } {
    return this.doctprofileupdateForm.controls;
  }
  onSubmit() {

    let firstname = this.doctprofileupdateForm.value.firstname;
    let lastname = this.doctprofileupdateForm.value.lastname;
    this.name = firstname + " " + (lastname);
    if (this.doctprofileupdateForm.value.email.split('@').length == 2) {
      this.doctprofileupdateForm.value.email;

    }
    else {
      this.doctprofileupdateForm.value.email + '@gmail.com'
    }

    
    this.submitted = true;

    let data;
    this.contact_number =JSON.stringify( this.doctprofileupdateForm.value.contact_number);
    this.location = JSON.stringify(this.doctprofileupdateForm.value.address);
    data = {
      user_id: "3",
      name: this.name,
      contact_number:this.contact_number,
      gender: this.doctprofileupdateForm.value.gender,
      email: this.doctprofileupdateForm.value.email,
      dob: this.doctprofileupdateForm.value.dob.split('T')[0],
      institute: this.doctprofileupdateForm.value.institute,
      description: this.doctprofileupdateForm.value.description,
      qualification: this.doctprofileupdateForm.value.qualification,
      professional: this.doctprofileupdateForm.value.speciality,
      location:  this.location,
      experience: this.doctprofileupdateForm.value.experience,
      consolidatefees: this.doctprofileupdateForm.value.consolidatefees,
      emergency_contact: this.doctprofileupdateForm.value.emergency_contact,
      about: this.doctprofileupdateForm.value.about
    }

    console.log(this.doctprofileupdateForm.value.email);
    // console.log(data, "data");


    if (this.doctprofileupdateForm.invalid) {
      console.log(this.doctprofileupdateForm);
      return;

    }

    if (this.buttontype == 'add') {
      this.service.doctorprofile(data).subscribe(data => {
        this.detail = JSON.parse(JSON.stringify(data));
        console.log(data);
      });

    }
    else {
      this.service.doctorprofileedit(data).subscribe(data => {
        this.profileedit = JSON.parse(JSON.stringify(data));
        console.log(data);
      })

    }
  }
  open(status) {

    this.buttontype = status;
  }
}
