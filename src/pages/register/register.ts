import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';


import { HttpService } from '../../services/http.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController,private httpService:HttpService) {
  }

  showError : any;
  email : any;

  ionViewCanEnter() {
    if(!localStorage.getItem('auth_token')){
      return true;
    }
    return false;
  }

  onRegister(){
    if(!this.email)
      this.showError=`Please enter a valid UserName.`;
    else{
      this.httpService.register(this.email)
        .subscribe(response => {
            let res:any = response.json();
            if(res.ResponseId == 2)
              this.showError=`User not found!<br>Please use your JoscoCare Id.<br>Contact support if problem persists.`;
            else if (res.ResponseId == 3){
              this.navCtrl.setRoot(LoginPage,{type:'error',body:'MPin has already been generated.<br>Please check your email.<br>'});
            }
            else if(res.ResponseId == 1){
              this.navCtrl.setRoot(LoginPage,{type:'success',body:'MPin has been generated.<br>Please check your email.'});
            }
          },
          err => { this.showError=`Request Failed!<br>Please check your Network Connection`; 
        });
    }
  }
}
