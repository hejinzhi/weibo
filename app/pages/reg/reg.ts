import {Component} from '@angular/core';
import {NavController,ToastController} from 'ionic-angular';
import {Login} from '../login/login';
import { Http } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Headers, RequestOptions } from '@angular/http';
import {WeiboService} from '../service/weibo.service.ts';
import 'rxjs/add/operator/toPromise';
// import './rxjs-operators';
// import 'rxjs/add/observable/throw';

// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/debounceTime';
// import 'rxjs/add/operator/distinctUntilChanged';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/switchMap';
// import 'rxjs/add/operator/toPromise';

@Component({
  templateUrl: 'build/pages/reg/reg.html',
  providers: [WeiboService]
})
export class Reg {
  constructor(private navCtrl: NavController, private http: Http,private toastCtrl: ToastController,private weiboService:WeiboService) {
  }

  private url: String = 'http://localhost:3000/';
  //記錄form上的數據   
  reg = {};

  goBack() {
    this.navCtrl.pop();
  }

  //注册新的帐号  
  Reg() {

      this.weiboService.regNewUser(this.reg).then(resp=>{
        if(resp.success==1){
          this.presentToast();
        }
      })

    // this.http.get(this.url+'reg/'+JSON.stringify(this.reg)).toPromise().then(resp=>{
    //   let respObj=resp.json();
    //   if (respObj.success==1){
    //     this.presentToast();
    //   }
    // });


  }


  presentToast() {
    let toast = this.toastCtrl.create({
      message: '注册成功！请登录',
      duration: 1000,
      position: 'top'
    });

    toast.onDidDismiss(() => {
      this.navCtrl.pop();
    });

    toast.present();
  }

  // private handleError(error: any) {
  //   console.error('An error occurred', error);
  //  // return Promise.reject(error.message || error);
  // }

  //   private handleError (error: any) {
  //   let errMsg = (error.message) ? error.message :
  //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
  //   console.error(errMsg); // log to console instead
  //   return Observable.throw(errMsg);
  // }

  


}