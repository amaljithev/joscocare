import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';

import { LoginPage } from '../login/login';
import { AddModalPage } from './add-availability/add-modal'

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
    title: 'Title for the event 2',
    startTime: new Date('Jan-10-2018 6:33:20'),
    endTime: new Date('Jan-10-2018 9:33:20'),
    color: 'longday'
  }];
  viewTitle: string;
  selectedDay = new Date();
  
  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController
  ) {
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

  onTimeSelected = (ev: Date) => {
    console.log('Currently time selected date: ' + JSON.stringify(ev));
  };

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
      
      let alert = this.alertCtrl.create({
        title: '' + event.title,
        subTitle: 'From: ' + start + '<br>To: ' + end,
        buttons: ['OK']
      })
      alert.present();
  }

  addEvent() {
    let modal = this.modalCtrl.create(AddModalPage, {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
 
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }


  ionViewWillEnter() {
    //make sure user is logged in
    if(!localStorage.getItem('auth_token')){
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
