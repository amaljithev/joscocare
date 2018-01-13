import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'page-change-mpin',
  templateUrl: 'change-mpin.html',
})
export class ChangeMpinPage {

  showError;
  showSuccess;
  old_mpin;
  new_mpin1;
  new_mpin2;
  
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private httpService:HttpService) {
  }

  ionViewWillEnter() {
    //make sure user is logged in
    if(!localStorage.getItem('auth_token')){
      this.navCtrl.setRoot(LoginPage);
    }
  }

  onChangeMPin(){
    if(!this.old_mpin)
      this.showError=`Please enter a valid old password.`;
    else if(!this.new_mpin1)
      this.showError=`New password cannot be empty!`;
    else if(this.new_mpin1 != this.new_mpin2)
      this.showError=`New passwords do not match!`;
    else{
      this.httpService.changeMPIN(this.old_mpin,this.new_mpin1)
        .subscribe(response => {
            let res:any = response.json();
            if(res.Message == "Authorization has been denied for this request."){
              localStorage.removeItem('auth_token');
              this.httpService.isLoggedin = false;
              this.navCtrl.setRoot(LoginPage,{type:'error',body:'Your session has expired, please login!'});
            }
            else if(res.StatusCode == 104){
              localStorage.removeItem('auth_token');
              this.showSuccess=`MPin changes successfully!`;
            }
            else if(res.StatusCode == 105){
              this.showError=`Wrong MPin. Try again!`;
            }
          },
          err => { this.showError=`Login Request Failed!<br>Please check your Network Connection`; 
        });
      
    }
  }

}
