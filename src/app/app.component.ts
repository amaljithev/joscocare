import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { UserCalendarPage } from '../pages/user-calendar/user-calendar';
import { SetAvailabilityPage } from '../pages/set-availability/set-availability';
import { CourseDetailsPage } from '../pages/course-details/course-details';
import { ChangeMpinPage } from '../pages/change-mpin/change-mpin';
import { HttpService } from '../services/http.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{title: string, icon:string, component: any}>;

  constructor(public platform: Platform, 
    public statusBar: StatusBar,
    private httpService:HttpService,
    public splashScreen: SplashScreen) {

      this.initializeApp();
      if(this.httpService.isLoggedin){
        this.rootPage = UserCalendarPage;
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
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    console.log(page);
    if(page.title=="Logout")
    {
      this.httpService.logout().subscribe((response) => {
        let res = response.json();
      });
      localStorage.removeItem('auth_token');
      localStorage.removeItem('username');
      localStorage.removeItem('userId');
      this.httpService.isLoggedin = false;
      this.httpService.logout();
      this.nav.setRoot(LoginPage);
    }
    else{
      this.nav.setRoot(page.component);  
    }
  }
}
