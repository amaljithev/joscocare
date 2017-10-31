import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { LoginPage } from '../../login/login';

@Component({
  selector: 'page-update-course-details',
  templateUrl: 'update-course-details.html',
})
export class UpdateCourseDetailsPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController) {
  }

  ionViewWillEnter() {
    //make sure user is logged in
    if(!localStorage.getItem('auth_token')){
      this.navCtrl.setRoot(LoginPage);
    }
  }
 

}
