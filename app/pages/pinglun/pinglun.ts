import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeiboService} from '../service/weibo.service.ts';
import { OnInit } from '@angular/core';


@Component({
  templateUrl: 'build/pages/pinglun/pinglun.html',
  providers:[WeiboService]

  
})
export class Pinglun implements OnInit{

	plContent:string;
	
  constructor(private navCtrl: NavController,private weiboService:WeiboService) {
  	// this.notifyMsg=weiboService.getNotifyMsg();
  }

  goBack(){
  	this.navCtrl.pop();
  }

  ngOnInit(){
  	
  }

  sendPingLun(){
  	this.navCtrl.pop();
  }
}
