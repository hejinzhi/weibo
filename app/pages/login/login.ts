import {Component} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {Reg} from '../reg/reg';
import {ForgetPwd} from '../forgetPwd/forgetPwd';
import { Http } from '@angular/http';
import {WeiboService} from '../service/weibo.service.ts';
import {TabsPage} from '../tabs/tabs';
import {LoginMsg} from '../AppGlobal/AppGlobal';

@Component({
  templateUrl: 'build/pages/login/login.html',
  providers: [WeiboService]
})
export class Login {
  constructor(private navCtrl: NavController, private weiboService: WeiboService, private toastCtrl: ToastController) {
  }

  loginMsg: any = {
    username: 'jinzhi.he',
    password: '123'
  };

  Reg() {
    this.navCtrl.push(Reg);
  }

  forgetPassword() {
    this.navCtrl.push(ForgetPwd);
  }

  Login() {
    //console.log(this.loginMsg);
    this.weiboService.login(this.loginMsg).then(resp => {
      if (resp.id) {
        //this.loginMsg.id = resp.id;
        LoginMsg.headFace = resp.headFace;
        LoginMsg.nickname = resp.nickname;
        LoginMsg.id = resp.id;
        this.navCtrl.push(TabsPage);
        localStorage.setItem('loginMsg', JSON.stringify(this.loginMsg));
        //console.log(this.weiboService.LoginUser);
      } else {
        this.presentToast(resp.errorMsg, 3000, 'top');
      }

      // console.log(resp.id);
    });
  }


  presentToast(message, duration, position) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: duration,
      position: position
    });
    toast.present();
  }
}