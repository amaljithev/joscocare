import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  constructor(public navCtrl: NavController) {
  }

  ionViewCanEnter() {
    if(!localStorage.getItem('auth_token')){
      return true;
    }
    return false;
  }

}
