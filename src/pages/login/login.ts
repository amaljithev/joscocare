import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewCanEnter() {
    if(!localStorage.getItem('auth_token')){
      return true;
    }
    return false;
  }

}
