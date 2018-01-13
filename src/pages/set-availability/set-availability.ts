import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import * as moment from 'moment';


import { AddModalPage } from './add-availability/add-modal';
import { LoginPage } from '../login/login';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'page-set-availability',
  templateUrl: 'set-availability.html',
})
export class SetAvailabilityPage {

  
  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private httpService: HttpService) {
  }
  
  shifts: string[] = ['early', 'longday', 'late', 'night'];
  
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  eventSource = [];
  viewTitle: string;
  selectedDay;

  markDisabled = (date: Date) => {
    let cur = new Date();
    let plus30 = new Date(cur.setDate(cur.getDate() + 30));
    cur = new Date();
    return date <= cur || date > plus30;
  };

  onViewTitleChanged = (title) => {
    this.viewTitle = title;
  };

  onTimeSelected = (ev) => {
    if( !ev.disabled ){
      this.selectedDay = moment(ev.selectedTime).format('DD MMM YYYY');      
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
    if(!this.httpService.isLoggedin){
      this.navCtrl.setRoot(LoginPage);
    }
  }
}
