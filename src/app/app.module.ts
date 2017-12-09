import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
 
import { LoginPage } from '../pages/login/login';
import { UserCalendarPage } from '../pages/user-calendar/user-calendar';
import { SetAvailabilityPage } from '../pages/set-availability/set-availability';
import { CourseDetailsPage } from '../pages/course-details/course-details';
import { UpdateCourseDetailsPage } from '../pages/course-details/update-course-details/update-course-details';
import { ChangeMpinPage } from '../pages/change-mpin/change-mpin';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpService } from '../services/http.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UserCalendarPage,
    SetAvailabilityPage,
    CourseDetailsPage,
    UpdateCourseDetailsPage,
    ChangeMpinPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UserCalendarPage,
    SetAvailabilityPage,
    CourseDetailsPage,
    UpdateCourseDetailsPage,
    ChangeMpinPage
  ],
  providers: [
    StatusBar,
    UniqueDeviceID,
    SplashScreen,
    HttpService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
