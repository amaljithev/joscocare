import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { UpdateCourseDetailsPage } from './update-course-details/update-course-details';

import { LoginPage } from '../login/login';
@Component({
  selector: 'page-course-details',
  templateUrl: 'course-details.html',
})
export class CourseDetailsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl:ModalController) {
  }

  courses =[{
    title:'Test Course 1',
    description:'Do ver well witll test',
    hasExpired:true
  },{
    title:'Test Course 2',
    description:'Do very well with tests',
    expiry:'warning'
  },{
    title:'Test Course 3',
    description:'Do very well with tests',
    expiry:'success'
  }];
  ionViewWillEnter() {
    //make sure user is logged in
    if(!localStorage.getItem('auth_token')){
      this.navCtrl.setRoot(LoginPage);
    }
  }

  updateCourseModal(course) {
    const updateModal = this.modalCtrl.create(UpdateCourseDetailsPage, course);
    updateModal.present();
  }
 

}
