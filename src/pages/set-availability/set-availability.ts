import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';


import { AddModalPage } from './add-availability/add-modal';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-set-availability',
  templateUrl: 'set-availability.html',
})
export class SetAvailabilityPage {

  
  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController
  ) {
  }
  
  shifts: string[] = ['early', 'longday', 'late', 'night'];
  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  
  markDisabled = (date: Date) => {
    let cur = new Date();
    let plus30 = new Date(cur.setDate(cur.getDate() + 30));
    cur = new Date();
    return date <= cur || date > plus30;
  };

  onViewTitleChanged = (title) => {
    this.viewTitle = title;
  };

  onCurrentDateChanged = (ev) => {
    console.log(ev);
    if( !ev.disabled ){
      this.selectedDay = ev.selectedTime;
      this.addEvent();
    }
  };

  addEvent() {
    let modal = this.modalCtrl.create(AddModalPage, {selectedDay: this.selectedDay});
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        console.log(data);
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
