import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { UpdateCourseDetailsPage } from './update-course-details/update-course-details';

import { LoginPage } from '../login/login';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'page-course-details',
  templateUrl: 'course-details.html',
})
export class CourseDetailsPage {

  courses = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private httpService: HttpService) {
    this.refreshCourses();
  }

  refreshCourses() {
    this.courses = [];
    this.httpService.getCourseDetails().subscribe((response) => {
      let res = response.json();
      if (res.Message == "Authorization has been denied for this request.") {
        localStorage.removeItem('auth_token');
        this.httpService.isLoggedin = false;
        this.navCtrl.setRoot(LoginPage, { type: 'error', body: 'Your session has expired, please login!' });
      }
      else {
        res.forEach(course => this.courses.push({
          title: course.Coursename,
          CeId: course.CeId,
          CourseId: course.CourseId,
          IsEdit: course.IsEdit,
          start: course.StartDate,
          end: course.Enddate,
          validity: course.ValidationInDays,
          description: course.Description,
          hasExpired: course.ValidationInDays <= 0,
          expiry: course.ValidationInDays < 15 ? 'warning' : 'success'
        }));
      }
    });
  }

  ionViewWillEnter() {
    //make sure user is logged in
    if (!localStorage.getItem('auth_token')) {
      this.navCtrl.setRoot(LoginPage);
    }
  }

  updateCourseModal(course) {
    const updateModal = this.modalCtrl.create(UpdateCourseDetailsPage, course);
    updateModal.onDidDismiss((data) => {
      if (data) {
        this.refreshCourses();
      }
    });
    updateModal.present();
  }
}
