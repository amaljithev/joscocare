import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import * as moment from 'moment';

import { HttpService } from '../../../services/http.service';
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

  constructor(public navCtrl: NavController, private navParams: NavParams, 
    public viewCtrl: ViewController,
    private httpService: HttpService) {
    let preselectedDate = moment(this.navParams.get('selectedDay')).format('DD MMM YYYY');
    this.shift.startTime = preselectedDate;
    this.shift.endTime = preselectedDate;
  }

  ionViewWillEnter() {
    //make sure user is logged in
    if(!this.httpService.isLoggedin){
      this.navCtrl.setRoot(LoginPage);
    }
  }

  onCheckAll() {
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
    this.viewCtrl.dismiss();
  }

  save() {
    this.viewCtrl.dismiss(this.shift);
  }

}