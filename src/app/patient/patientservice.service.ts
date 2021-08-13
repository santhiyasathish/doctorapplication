import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PatientserviceService {
  api: string = environment.apiUrl;
  headers = new HttpHeaders()
    .append('Strict-Transport-Security', 'max-age=63072000; includeSubDomains');

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token, Accept, Authorization, X-Request-With",
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Methods": "GET, POST, DELETE, PUT, OPTIONS, TRACE, PATCH, CONNECT"
    })
  };
  morningtime = [
    {
      id: 1,
      slot: '10:30 AM',
      disable: 'true'
    },
    {
      id: 2,
      slot: '10:45 AM',
      disable: 'false'
    },
    {
      id: 3,
      slot: '11:00 AM',
      disable: 'false'
    },
    {
      id: 4,
      slot: '11:15 AM',
      disable: 'false'
    },
    {
      id: 5,
      slot: '11:30 AM',
      disable: 'false'
    },
    {
      id: 6,
      slot: '11:45 AM',
      disable: 'true'
    },
  ];
  afternoontime = [
    {
      id: 1,
      slot: '12:00 PM',
      disable: 'true'
    },
    {
      id: 2,
      slot: '12:15 PM',
      disable: 'false'
    },
    {
      id: 3,
      slot: '12:30 PM',
      disable: 'false'
    },
    {
      id: 4,
      slot: '12:45 PM',
      disable: 'false'
    },
    {
      id: 5,
      slot: '01:00 PM',
      disable: 'false'
    },
    {
      id: 6,
      slot: '01:15 PM',
      disable: 'true'
    },
  ];
  eveningtime = [
    {
      id: 1,
      slot: '05:15 PM',
      disable: 'true'
    },
    {
      id: 2,
      slot: '05:30 PM',
      disable: 'false'
    },
    {
      id: 3,
      slot: '05:45 PM',
      disable: 'false'
    },
    {
      id: 4,
      slot: '06:00 PM',
      disable: 'false'
    },
    {
      id: 5,
      slot: '06:15 PM',
      disable: 'false'
    },
    {
      id: 6,
      slot: '06:30 PM',
      disable: 'true'
    },
    {
      id: 7,
      slot: '06:45 PM',
      disable: 'false'
    },
    {
      id: 8,
      slot: '07:00 PM',
      disable: 'false'
    },
    {
      id: 9,
      slot: '07:15 PM',
      disable: 'false'
    }
  ];
  doclist = [
    {
      id: 1,
      head: 'Dr. Raja',
      img: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
      desc: 'Heart Sergeon',
      place: 'pondicherry -605107',
      about:
        'Dr K R Raja, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
      reviewv: '0.25',
      reviewb: '0.5',
      scorev: '0.25',
      scoreb: '1.5',
      satisv: '1.25',
      satisb: '0',
    },
    {
      id: 2,
      head: 'Dr.Raja Seker',
      img: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
      desc: 'Heart Sergeon',
      place: 'pondicherry -605001',
      about:
        'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
      reviewv: '0.25',
      reviewb: '0.5',
      scorev: '0.25',
      scoreb: '0.5',
      satisv: '0.25',
      satisb: '0.5',
    },
    {
      id: 3,
      head: 'Dr. Raj',
      img: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
      desc: 'Heart Sergeon',
      place: 'pondicherry -605001',
      about:
        'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
      reviewv: '0.25',
      reviewb: '0.5',
      scorev: '0.25',
      scoreb: '0.5',
      satisv: '0.25',
      satisb: '0.5',
    },
    {
      id: 4,
      head: 'Dr.David Kemp',
      img: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
      desc: 'Heart Sergeon',
      place: 'pondicherry -605001',
      about:
        'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
      reviewv: '0.25',
      reviewb: '0.5',
      scorev: '0.25',
      scoreb: '0.5',
      satisv: '0.25',
      satisb: '0.5',
    },
    {
      id: 5,
      head: 'Dr.David Kemp',
      img: 'https://t4.ftcdn.net/jpg/02/60/04/09/360_F_260040900_oO6YW1sHTnKxby4GcjCvtypUCWjnQRg5.jpg',
      desc: 'Heart Sergeon',
      place: 'pondicherry -605001',
      about:
        'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
      reviewv: '0.25',
      reviewb: '0.5',
      scorev: '0.25',
      scoreb: '0.5',
      satisv: '0.25',
      satisb: '0.5',
    },
    {
      id: 6,
      head: 'Dr.David Kemp',
      img: 'https://st4.depositphotos.com/12982378/23084/i/600/depositphotos_230843520-stock-photo-handsome-doctor-stethoscope-holding-glasses.jpg',
      desc: 'Heart Sergeon',
      place: 'pondicherry -605001',
      about:
        'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
      reviewv: '0.25',
      reviewb: '0.5',
      scorev: '0.25',
      scoreb: '0.5',
      satisv: '0.25',
      satisb: '0.5',
    },
    {
      id: 7,
      head: 'Dr.David Kemp',
      img: 'https://st4.depositphotos.com/12982378/23084/i/600/depositphotos_230843520-stock-photo-handsome-doctor-stethoscope-holding-glasses.jpg',
      desc: 'Heart Sergeon',
      place: 'pondicherry -605001',
      about:
        'Dr K R Janagan, Chairman - Institute of Cardiac Sciences |  Director - Institute of Heart and Lung Transplant & Mechanical Circulatory Support, MGM Healthcare, is one of India s leading cardiothoracic surgeons and heart-lung transplant specialists with over 30 years of experience in his expert hands.',
      reviewv: '0.25',
      reviewb: '0.5',
      scorev: '0.25',
      scoreb: '0.5',
      satisv: '0.25',
      satisb: '0.5',
    },
  ];
  available= [
    {
      "date": "2021-08-13",
      "list": [
        {
          "availableList": [
            {
              "id": "1",
              "time": "9:00 AM",
              "status": "false"
            },
            {
              "id": "2",
              "time": "9:15 AM",
              "status": "false"
            }
          ],
          "session": "morning"
        },
        {
          "availableList": [
            {
              "id": "3",
              "time": "9:45 AM",
              "status": "false"
            },
            {
              "id": "4",
              "time": "10:00 AM",
              "status": "false"
            }
          ],
          "session": "evening"
        }
      ],
      "scount": 4,
      "bookedCount": 0
    },
    {
      "date": "2021-08-14",
      "list": [
        {
          "availableList": [
            {
              "id": "1",
              "time": "9:00 AM",
              "status": "false"
            },
            {
              "id": "2",
              "time": "9:15 AM",
              "status": "false"
            }
          ],
          "session": "morning"
        },
        {
          "availableList": [
            {
              "id": "3",
              "time": "9:45 AM",
              "status": "false"
            },
            {
              "id": "4",
              "time": "10:00 AM",
              "status": "false"
            }
          ],
          "session": "evening"
        }
      ],
      "scount": 4,
      "bookedCount": 0
    },
    {
      "date": "2021-08-15",
      "list": [
        {
          "availableList": [
            {
              "id": "1",
              "time": "9:00 AM",
              "status": "false"
            },
            {
              "id": "2",
              "time": "9:15 AM",
              "status": "false"
            }
          ],
          "session": "morning"
        },
        {
          "availableList": [
            {
              "id": "3",
              "time": "9:45 AM",
              "status": "false"
            },
            {
              "id": "4",
              "time": "10:00 AM",
              "status": "false"
            }
          ],
          "session": "evening"
        }
      ],
      "scount": 4,
      "bookedCount": 0
    }
  ];


  slider = [
    {
      id: 1,
      header: '',
      title: 'Chemist & druggist',
      text: '350+ Stores',
      class: 'cardone',
      subclass: 'cardonesub',
    },
    {
      id: 1,
      header: '',
      title: 'Covid-19 Specialist',
      text: '899+ Doctors',
      class: 'cardtwo',
      subclass: 'cardtwosub',
    },
    {
      id: 1,
      header: '',
      title: 'Cardiologist Specialist',
      text: '500+Doctors',
      class: 'cardthree',
      subclass: 'cardthreesub',
    },
    {
      id: 1,
      header: '',
      title: 'Dentist Specialist',
      text: '300+ Doctors',
      class: 'cardtwo',
      subclass: 'cardtwosub',
    },
  ];
  roundList = [
    {
      id: 1,
      icon: 'https://img.icons8.com/ios/50/fa314a/knee-joint.png',
    },
    {
      id: 2,
      icon: 'https://img.icons8.com/color/50/fa314a/medical-heart.png',
    },
    {
      id: 3,
      icon: 'https://img.icons8.com/bubbles/50/fa314a/dental-crown.png',
    },
    {
      id: 4,
      icon: 'https://img.icons8.com/doodle/50/fa314a/gastrointestinal-tract.png',
    },
    {
      id: 5,
      icon: 'https://img.icons8.com/bubbles/50/fa314a/visible--v2.png',
    },
    {
      id: 6,
      icon: 'https://img.icons8.com/bubbles/50/fa314a/embryo.png',
    },
  ];
  constructor(private http: HttpClient) {
  }
  post(serviceName: string, data: any) {

  }
  doctorType() {
    return this.http.get(this.api + 'doctortype', this.httpOptions);
  }

  topDoctorList(data: any) {
    return this.http.post(this.api + 'topDoctorList', data, this.httpOptions);
  }

  viewDoctorProfile(data: any) {
    return this.http.post(this.api + 'getdoctorprofile', data, this.httpOptions);
  }

  bookAppointment(data: any) {
    return this.http.post(this.api + 'bookappointment', data, this.httpOptions);
  }

  appointmentDetail(data: any) {
    return this.http.post(this.api + 'doctorviewappionment', data, this.httpOptions);
  }
  appointmentAvailability(data: any) {
    return this.http.post(this.api + 'appointmentavailability', data, this.httpOptions);
  }
}
