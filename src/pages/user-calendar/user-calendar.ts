import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { HttpService } from '../../services/http.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user-calendar',
  templateUrl: 'user-calendar.html',
})
export class UserCalendarPage {

  shifts: string[] = ['early', 'longday', 'late', 'night'];
  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  eventSource = [{
    title: 'Title for the event',
    startTime: new Date('Jan-9-2018 6:33:20'),
    endTime: new Date('Jan-9-2018 9:33:20'),
   color: 'early'
  },{
    title: 'Title for the event',
    startTime: new Date('Jan-16-2018 6:33:20'),
    endTime: new Date('Jan-16-2018 9:33:20'),
   color: 'night'
  },{
    title: 'Title for the event',
    startTime: new Date('Jan-21-2018 6:33:20'),
    endTime: new Date('Jan-21-2018 9:33:20'),
   color: 'late'
  },{
    title: 'Title for the event 2',
    startTime: new Date('Jan-30-2018 6:33:20'),
    endTime: new Date('Jan-30-2018 9:33:20'),
    color: 'longday'
  }];
  viewTitle: string;
  selectedDay = new Date();
  
  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    private httpService: HttpService) {      
  }

  markDisabled = (date: Date) => {
    let cur = new Date();
    let plus30 = new Date(cur.setDate(cur.getDate() + 30));
    cur = new Date();
    return date < cur || date > plus30;
  };

  onViewTitleChanged = (title) => {
    this.viewTitle = title;
  };

  onTimeSelected = (ev) => {
    if( !ev.disabled )
      this.showAlert(ev);
  };

  showAlert(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
      
      let alert = this.alertCtrl.create({
        title: "Shift details",
        subTitle: 'From: ' + start + '<br>To: ' + end,
        buttons: ['OK']
      })
      alert.present();
  }

  ionViewWillEnter() {
    //make sure user is logged in
    if(!this.httpService.isLoggedin){
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
