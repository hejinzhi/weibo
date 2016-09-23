import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {LoginMsg} from '../AppGlobal/AppGlobal';

@Component({
  templateUrl: 'build/pages/account/account.html'
})
export class Account {
  loginMsg;
  constructor(private navCtrl: NavController) {
    this.loginMsg = LoginMsg;
  }
}