import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientserviceService {
  api : string = environment.apiUrl;
  doclist=[{
    id:1,
    head:'Dr. Raja',
    img:'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
    desc:'Heart Sergeon',
    place:'pondicherry -605107',
    about:'Dr K R Raja, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
    reviewv:'0.25',reviewb:'0.5',
    scorev:'0.25',scoreb:'0.5',
    satisv:'0.25',satisb:'0.5'
  },
    {
      id:2,
      head:'Dr.Raja Seker',
      img:'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
      desc:'Heart Sergeon',
      place:'pondicherry -605001',
      about:'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
      reviewv:'0.25',reviewb:'0.5',
      scorev:'0.25',scoreb:'0.5',
      satisv:'0.25',satisb:'0.5'
      
      },
      {
        id:3,
        head:'Dr. Raj',
        img:'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
        desc:'Heart Sergeon',
        place:'pondicherry -605001',
        about:'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
        reviewv:'0.25',reviewb:'0.5',
        scorev:'0.25',scoreb:'0.5',
        satisv:'0.25',satisb:'0.5'

        },
        {
          id:4,
          head:'Dr.David Kemp',
          img:'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
          desc:'Heart Sergeon',
          place:'pondicherry -605001',
          about:'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
          reviewv:'0.25',reviewb:'0.5',
          scorev:'0.25',scoreb:'0.5',
          satisv:'0.25',satisb:'0.5'

          },
          {
            id:5,
            head:'Dr.David Kemp',
            img:'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
            desc:'Heart Sergeon',
            place:'pondicherry -605001',
            about:'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
            reviewv:'0.25',reviewb:'0.5',
            scorev:'0.25',scoreb:'0.5',
            satisv:'0.25',satisb:'0.5'
            },
            {
              id:6,
              head:'Dr.David Kemp',
              img:'https://st4.depositphotos.com/12982378/23084/i/600/depositphotos_230843520-stock-photo-handsome-doctor-stethoscope-holding-glasses.jpg',
              desc:'Heart Sergeon',
              place:'pondicherry -605001',
              about:'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
              reviewv:'0.25',reviewb:'0.5',
              scorev:'0.25',scoreb:'0.5',
              satisv:'0.25',satisb:'0.5'
              },
              {
                id:7,
                head:'Dr.David Kemp',
                img:'https://st4.depositphotos.com/12982378/23084/i/600/depositphotos_230843520-stock-photo-handsome-doctor-stethoscope-holding-glasses.jpg',
                desc:'Heart Sergeon',
                place:'pondicherry -605001',
                about:'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
                reviewv:'0.25',reviewb:'0.5',
                scorev:'0.25',scoreb:'0.5',
                satisv:'0.25',satisb:'0.5'
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
}

