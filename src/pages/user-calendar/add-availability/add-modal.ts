import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';
 
import { LoginPage } from '../../login/login';

@Component({
  selector: 'add-modal',
  templateUrl: 'add-modal.html',
})
export class AddModalPage {
 
  event = { startTime: new Date().toISOString(), endTime: new Date().toISOString(), allDay: false };
  minDate = new Date().toISOString();
 
  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format();
    this.event.startTime = preselectedDate;
    this.event.endTime = preselectedDate;
  }
  
  ionViewWillEnter() {
    //make sure user is logged in
    if(!localStorage.getItem('auth_token')){
      this.navCtrl.setRoot(LoginPage);
    }
  }

  cancel() {
    this.viewCtrl.dismiss();
  }
 
  save() {
    this.viewCtrl.dismiss(this.event);
  }
 
}