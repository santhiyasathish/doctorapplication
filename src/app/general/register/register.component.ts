import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { ServiceService } from '../service.service';
import { AlertController } from '@ionic/angular';
import Validation from './validation';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  alertmessage: string;
  registerForm: FormGroup;
  submitted = false;
  // mydate;
  hide = true;
  subscribe: any;
  dob: string;
  value: 3000;
  loading: any;
  errory: boolean = false;
  errord: boolean = false;
  type: number;
  leap: boolean;
  // contact_number: any;

  constructor(private formBuilder: FormBuilder,
    private service: ServiceService,
    public alertCtrl: AlertController,
    public loadingController: LoadingController,
    private router: Router,
    private menu: MenuController,
    private platform: Platform
  ) {
    this.menu.enable(false);

    this.subscribe = this.platform.backButton.subscribeWithPriority(666666, () => {
      if (this.constructor.name == "RegisterComponent") {
        window.location.href = "/login";
        // this.back();
      }
    });
  }
  //  move(e:any,p:any,c:any,n:any){
  //    console.log(e);
  //      var length = c.value.length;
  //      var maxLength = c.getAttribute("maxLength");
  //      console.log(maxLength);
  //      if(length == maxLength){
  //        if(n!= " "){
  //         n.focus();
  //        }
  //      }
  //      if(e.key === "Backspace"){
  //        if(p! = " "){
  //         p.focus();
  //        }
  //      }
  //  }
  gotoNextField(nextElement) {
    var nextinput = this.registerForm.value.dd;
    // var nextinputtwo = this.registerForm.value.mm;
    if (nextinput.length === 2) {
      nextElement.setFocus();
    }

    // nextElement.setFocus();
  }
  gotoNextFields(nextElement) {
    var nextinput = this.registerForm.value.mm;
    // var nextinputtwo = this.registerForm.value.mm;
    if (nextinput.length === 2) {
      nextElement.setFocus();
    }

    // nextElement.setFocus();
  }

  ngOnInit() {


    if (localStorage.getItem('log') != null) {
      this.router.navigateByUrl('patient/docprofile/3');
    }
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      // email: ['', Validators.compose([
      //   Validators.required,
      //   Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      // ])],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40)
        ]
      ],
      cpassword: ['', Validators.required],
      // usertype: ['', Validators.required],
      gender: ['', Validators.required],
      // dob: ['', Validators.required],
      dd: ['', [Validators.required, Validators.pattern("^(0[1-9]$|[1-9]$|^[1-2][0-9]$|^3[0-1])$")]],
      mm: ['', [Validators.required, Validators.pattern("^(0[1-9]$|[1-9]$|1[0-2])$")]],
      yyyy: ['', [Validators.required, Validators.pattern("^19(0[0-9]|[1-9][0-9])$|20(0[0-9]|[1-9][0-9])$")]],
    },
      {
        validators: [Validation.match('password', 'cpassword')]
      }

    );
  }
  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }




  async onSubmit(): Promise<void> {
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      duration: this.value,
      message: 'Please wait...',
      translucent: true,
      cssClass: '',
      backdropDismiss: true,
      mode: 'ios',
      keyboardClose: true,

    });
    // Present the loading controller

    if (this.value == 3000) {
      await this.loading.present();
      // this.networkError();
    } else {
      await this.loading.present();
      // this.pendingList()
      this.submitted = true;
    }


    // this.presentLoading();


    let dd = this.registerForm.value.dd;
    let mm = this.registerForm.value.mm;
    let yyyy = this.registerForm.value.yyyy;
    // this.dob = dd +'-'+mm+'-'+yyyy;
    this.dob = yyyy + "-" + mm + "-" + dd;
    console.log(this.dob);
    
    if(this.errory || this.errord){
      return;
    }

    // this.contact_number = JSON.stringify(this.registerForm.value.mobile);
    let data;
    data = {

      // email: this.registerForm.value.email,
      mobile: this.registerForm.value.mobile,
      username: this.registerForm.value.username,
      usertype: 'patient',
      password: this.registerForm.value.password,
      gender: this.registerForm.value.gender,
      dob: this.dob,
    }
    let alertMsg;

    this.service.register(data).subscribe(async data => {
      let response = JSON.parse(JSON.stringify(data));
      await this.loading.dismiss();
      this.alertmessage = response.messages;
      if (response.success == true) {
        let logdata;
        alertMsg = response.messages;
        logdata = {
          mobile: this.registerForm.value.mobile,
          password: this.registerForm.value.password,
        }

        this.service.login(logdata).subscribe(async data1 => {
          localStorage.setItem('log', JSON.stringify(JSON.parse(JSON.stringify(data1)).logData));
          if (JSON.parse(localStorage.getItem('log')).user_type == 'doctor') {
            // await this.loading.dismiss();
            window.location.href = "/doctor/docprofileupdate";
            // this.router.navigateByUrl('doctor/docprofileupdate');
          }
          else if (JSON.parse(localStorage.getItem('log')).user_type == 'patient') {
            // await this.loading.dismiss();
            window.location.href = "/patient/editprofile";
            // this.router.navigateByUrl('patient/editprofile');
          }
          else {
            window.location.href = "/patient/docprofile/3";
            // await this.loading.dismiss();
            // this.router.navigateByUrl('patient/docprofile/3');
          }


        });
        // await this.loading.dismiss();
      }

      else {
        alertMsg = response.error_messages;
      }
      console.log("error_message", response.error_messages);


      let prompt = this.alertCtrl.create({

        message: alertMsg,

        buttons: [

          {
            text: 'Ok',
          }
        ]
      });
      (await prompt).present();

    });

    if (this.registerForm.invalid) {
      return;
    }
  }

  checkyear(formvalue) {
   
    let y, m, d;;
    //  m, d;
    y = parseInt(formvalue.yyyy);
    m = parseInt(formvalue.mm);
    d = parseInt(formvalue.dd);

    // m, d
    if (y <= 2021) {
      if (y % 4 == 0) {
        this.leap = true;
        console.log(this.leap);
      }
      else {
        this.leap = false;

      }

      this.errory = false;

    }
    else {
      this.errory = true;

    }

    this.chackmonth(m, d);
  }
 

  chackmonth(m, d) {
    if ((m == 1) || (m == 3) || (m == 5) || (m == 7) || (m == 8) || (m == 10) || (m == 12)) {
      this.type = 1
    }

    else if (m == 2) {
      this.type = 2
    }

    else {
      this.type = 3
    }

    this.chackdate(d);
  }




  chackdate(d) {
    console.log(this.type, this.errord);
    switch (this.type) {
      case 1:
        if (d <= 31) {
          this.errord = false;
        }
        else {
          this.errord = true;
        }
        break;

      case 2:
        if (this.leap == true) {
          if (d <= 29) {
            this.errord = false;
          }
          else {
            this.errord = true;
          }
        }
        else {
          if (d <= 28) {
            this.errord = false;
          }
          else {
            this.errord = true;
          }
        }
        break;
      case 3:
        if (d <= 30) {
          this.errord = false;
        }
        else {
          this.errord = true;
        }
        break;
    }


  }
 

  submit(dob: { value: { yyyy: any; mm: any; dd: any; }; }) {
    let y = dob.value.yyyy
    let m = dob.value.mm
    let d = dob.value.dd

    console.log('stest', y, m, d);
  }

}

function mobile(mobile: any): string {
  throw new Error('Function not implemented.');
  
}
