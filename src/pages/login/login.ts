import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

import { HttpService } from '../../services/http.service';
import { CourseDetailsPage } from '../course-details/course-details';
import { RegisterPage } from '../register/register';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  showError;
  showSuccess;
  deviceId : any;
  email : any;
  mpin : any;
  registerPage = RegisterPage;
  constructor(public navCtrl: NavController,
    private uniqueDeviceID: UniqueDeviceID,
    private httpService:HttpService,
    public navParams: NavParams) {
  }

  ionViewCanEnter() {
    if(!localStorage.getItem('auth_token')){
      this.uniqueDeviceID.get()
      .then((uuid: any) => this.deviceId = uuid);
      return true;
    }
    return false;
  }
  ionViewWillEnter(){
    if(this.navParams.get('type')=='error')
      this.showError = this.navParams.get('body');
    else if(this.navParams.get('type')=='success')
      this.showSuccess = this.navParams.get('body');
  }
  onLogin(){
    if(!this.email)
      this.showError=`Please enter a valid UserName.`;
    else if(!this.mpin)
      this.showError=`Please enter a valid MPin.<br>If you are new user, please register.`;
    else{
      this.httpService.login(this.email,this.mpin,this.deviceId)
        .subscribe(response => {
            let headers = response.headers;
            let res:any = response.json();
            if(res.ResponseID == 103)
              this.showError=`Incorrect User Name or Password!<br>Try again, or reset MPIN.<br>If you are new user,please register.`;
            else if(res.ResponseID == 100){
                localStorage.setItem('auth_token',headers.get('token'));
                this.httpService.setAuthToken(headers.get('token'));
                this.navCtrl.setRoot(CourseDetailsPage);
            }
          },
          err => { this.showError=`Login Request Failed!<br>Please check your Network Connection`; 
        });
      
    }
  }
}
