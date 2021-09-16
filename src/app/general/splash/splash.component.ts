import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements OnInit {

  constructor(private router: Router) 
  {

    setTimeout(()=>{
      window.location.href ="/patient/docprofile/3";
      // this.router.navigateByUrl('');
    },4000);
   }

  ngOnInit() {}

}
