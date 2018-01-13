import { Component } from '@angular/core';
import { NavController, AlertController, NavParams, ViewController } from 'ionic-angular';

import { LoginPage } from '../../login/login';
import { HttpService } from '../../../services/http.service';


@Component({
  selector: 'page-update-course-details',
  templateUrl: 'update-course-details.html',
})
export class UpdateCourseDetailsPage {

  title;
  desc;
  start;
  end;
  today = new Date();
  minDate;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private httpService: HttpService,    
    private alertCtrl: AlertController) {
    this.title = navParams.get('title');
    this.desc = navParams.get('description');
    let cur = new Date();
    this.minDate = new Date(cur.setDate(cur.getDate() - 90));
    this.minDate = this.minDate.getFullYear() +'-'+ ((this.minDate.getMonth()+1)>=10?(this.minDate.getMonth()+1):'0'+(this.minDate.getMonth()+1))+'-'+ ((this.minDate.getDate()+1)>=10?(this.minDate.getDate()+1):'0'+(this.minDate.getDate()+1))
    if(navParams.get('start'))
      this.start = navParams.get('start');
    if(navParams.get('end'))
      this.end = navParams.get('end');
  }

  ionViewWillEnter() {
    //make sure user is logged in
    if(!this.httpService.isLoggedin){
      this.navCtrl.setRoot(LoginPage);
    }
  }

  onUpdateCourse() {
    if (!this.start || !this.end || new Date(this.end) <= new Date(this.start) ) {
      let alert = this.alertCtrl.create({
        title: "Invalid date",
        subTitle: 'Please select valid start and end dates',
        buttons: ['OK']
      })
      alert.present();
    } else {
      let data = {
        CeId: this.navParams.get('CeId'),
        CourseId: this.navParams.get('CourseId'),
        IsEdit: this.navParams.get('IsEdit'),
        Coursename: this.title,
        StartDate: this.start,
        Enddate: this.end,
        ValidationInDays: Math.ceil(Math.abs(new Date(this.start).getTime() - new Date(this.end).getTime()) / (1000 * 3600 * 24))
      };
      this.httpService.updateCourse(data).subscribe(response => {
        let res = response.json();
        if (res.Message == "Authorization has been denied for this request.") {
          localStorage.removeItem('auth_token');
          this.httpService.isLoggedin = false;
          this.navCtrl.setRoot(LoginPage, { type: 'error', body: 'Your session has expired, please login!' });
        }
        else {
          let alert;
          if (res.ResponseId == 100) {
            alert = this.alertCtrl.create({
              title: "Success",
              subTitle: 'The changes are saved. Please wait for admin approval.',
              buttons: [{
                text: 'OK',
                role: 'cancel',
                handler: () => {
                  this.viewCtrl.dismiss(true);
                  alert.dismiss(); 
                  return false;
                }
              }]
            });
            alert.present();
          } else {
            alert = this.alertCtrl.create({
              title: "Error",
              subTitle: 'Sorry, the details could not be updated, please try again!',
              buttons: ['OK']
            });
            alert.present();
          }
        }
      }, err => {
        this.alertCtrl.create({
          title: "Network Error",
          subTitle: 'Please check your internet connection!',
          buttons: ['OK']
        }).present();
      });
    }
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
