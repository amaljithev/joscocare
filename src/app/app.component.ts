import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { UserCalendarPage } from '../pages/user-calendar/user-calendar';
import { SetAvailabilityPage } from '../pages/set-availability/set-availability';
import { CourseDetailsPage } from '../pages/course-details/course-details';
import { ChangeMpinPage } from '../pages/change-mpin/change-mpin';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  username: string = "Mr. John Doe";
  rootPage: any = LoginPage;
  isLoggedin : any;
  pages: Array<{title: string, icon:string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    this.isLoggedin = localStorage.getItem('auth_token');
    if(this.isLoggedin){
      //this.rootPage = UserCalendarPage;
      this.rootPage = CourseDetailsPage;
    }    
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'My Calendar', icon:'calendar',component: UserCalendarPage },
      { title: 'Set Availability',icon:'checkmark-circle-outline', component:SetAvailabilityPage },
      { title: 'Course Details',icon:'book', component: CourseDetailsPage },
      { title: 'Change MPin',icon:'key', component: ChangeMpinPage },
      { title: 'Logout',icon:'log-out', component: LoginPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title=="Logout")
    {
      localStorage.removeItem('auth_token');
      this.isLoggedin = false;
    }
    this.nav.setRoot(page.component);
    
  }
}
