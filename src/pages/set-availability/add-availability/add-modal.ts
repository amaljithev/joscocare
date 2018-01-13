import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

import { LoginPage } from '../../login/login';

@Component({
  selector: 'add-modal',
  templateUrl: 'add-modal.html',
})
export class AddModalPage {

  all = false;
  shift = {
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
    allWeek: false,
    selectedShifts: {
      early: false,
      longday: false,
      late: false,
      night: false
    }
  };

  minDate = new Date().toISOString();

  constructor(public navCtrl: NavController, private navParams: NavParams, public viewCtrl: ViewController) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format('DD MMM YYYY');
    this.shift.startTime = preselectedDate;
    this.shift.endTime = preselectedDate;
  }

  ionViewWillEnter() {
    //make sure user is logged in
    if (!localStorage.getItem('auth_token')) {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  onCheckAll() {
    console.log(this.shift);
    if (this.all == true){
      this.shift.selectedShifts.early = true;
      this.shift.selectedShifts.longday = true;
      this.shift.selectedShifts.late = true;
      this.shift.selectedShifts.night = true;
    } else {
      this.shift.selectedShifts.early = false;
      this.shift.selectedShifts.longday = false;
      this.shift.selectedShifts.late = false;
      this.shift.selectedShifts.night = false;
    } 
  }

  cancel() {
    console.log(this.shift);    
    this.viewCtrl.dismiss();
  }

  save() {
    console.log(this.shift);    
    this.viewCtrl.dismiss(this.shift);
  }

}