import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientserviceService {
  api: string = environment.apiUrl;
 
  morningtime = [
    {
      id: 1,
      slot: '10:30 AM',
      disable:'true'
    },
    {
      id: 2,
      slot: '10:45 AM',
      disable:'false'
    },
    {
      id: 3,
      slot: '11:00 AM',
      disable:'false'
    },
    {
      id: 4,
      slot: '11:15 AM',
      disable:'false'
    },
    {
      id: 5,
      slot: '11:30 AM',
      disable:'false'
    },
    {
      id: 6,
      slot: '11:45 AM',
      disable:'true'
    },
  ];
  slider = [{
    id:1,
    header:'',
    title:'Chemist & druggist',
    text:'350+ Stores',
    class:'cardone',
    subclass:'cardonesub'

  },
  {
    id:1,
    header:'',
    title:'Covid-19 Specialist',
    text:'899+ Doctors',
    class:'cardtwo',
    subclass:'cardtwosub'

  },
  {
    id:1,
    header:'',
    title:'Cardiologist Specialist',
    text:'500+Doctors',
    class:'cardthree',
    subclass:'cardthreesub'
   
  },
  {
    id:1,
    header:'',
    title:'Dentist Specialist',
    text:'300+ Doctors',
    class:'cardtwo',
    subclass:'cardtwosub'
    
  }];
  roundList=[{
    id:1,
    icon: 'https://img.icons8.com/ios/50/fa314a/knee-joint.png'

  },
{
id:2,
icon: 'https://img.icons8.com/color/50/fa314a/medical-heart.png'
},
{
id:3,
icon: 'https://img.icons8.com/bubbles/50/fa314a/dental-crown.png'
},
{
  id:4,
  icon: 'https://img.icons8.com/doodle/50/fa314a/gastrointestinal-tract.png'
},
{
  id:5,
  icon: 'https://img.icons8.com/bubbles/50/fa314a/visible--v2.png'
},
{
  id:6,
  icon: 'https://img.icons8.com/bubbles/50/fa314a/embryo.png'
}
];
  constructor(private http:HttpClient) { }
  post (serviceName: string, data:any){

  }
  doctorType(){
    return this.http.get(this.api+'doctortype');
  }

  topDoctorList(data:any){
    return this.http.post(this.api+'topDoctorList', data);
  }

  viewDoctorProfile(data:any){
    return this.http.post(this.api+'getdoctorprofile', data);
  }
  
}
