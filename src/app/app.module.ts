import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
 
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { UserCalendarPage } from '../pages/user-calendar/user-calendar';
import { AddModalPage } from '../pages/user-calendar/add-availability/add-modal';
import { SetAvailabilityPage } from '../pages/set-availability/set-availability';
import { CourseDetailsPage } from '../pages/course-details/course-details';
import { UpdateCourseDetailsPage } from '../pages/course-details/update-course-details/update-course-details';
import { ChangeMpinPage } from '../pages/change-mpin/change-mpin';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { NgCalendarModule  } from 'ionic2-calendar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpService } from '../services/http.service';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    RegisterPage,
    UserCalendarPage,
    SetAvailabilityPage,
    CourseDetailsPage,
    UpdateCourseDetailsPage,
    ChangeMpinPage,
    AddModalPage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    RegisterPage,
    UserCalendarPage,
    SetAvailabilityPage,
    CourseDetailsPage,
    UpdateCourseDetailsPage,
    ChangeMpinPage,
    AddModalPage
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
