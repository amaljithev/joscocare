import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { LoginPage } from '../../login/login';

@Component({
  selector: 'page-update-course-details',
  templateUrl: 'update-course-details.html',
})
export class UpdateCourseDetailsPage {

  title;
  desc;
  start;
  end;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController) {
      this.title = navParams.get('title');
      this.desc = navParams.get('description');
  }

  ionViewWillEnter() {
    //make sure user is logged in
    if(!localStorage.getItem('auth_token')){
      this.navCtrl.setRoot(LoginPage);
    }
  }

  onUpdateCourse(){
    console.log(this.start,this.end)
  }
  
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
