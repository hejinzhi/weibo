import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {Login} from '../login/login';

@Component({
  templateUrl: 'build/pages/forgetPwd/forgetPwd.html'
})
export class ForgetPwd {
  constructor(private navCtrl: NavController) {
  }

  goBack() {
    this.navCtrl.pop();
  }
}