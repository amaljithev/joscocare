import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
 
import { LoginPage } from '../pages/login/login';
import { UserCalendarPage } from '../pages/user-calendar/user-calendar';
import { SetAvailabilityPage } from '../pages/set-availability/set-availability';
import { CourseDetailsPage } from '../pages/course-details/course-details';
import { ChangeMpinPage } from '../pages/change-mpin/change-mpin';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    UserCalendarPage,
    SetAvailabilityPage,
    CourseDetailsPage,
    ChangeMpinPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    UserCalendarPage,
    SetAvailabilityPage,
    CourseDetailsPage,
    ChangeMpinPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
