import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeiboService} from '../service/weibo.service.ts';
import { OnInit } from '@angular/core';


@Component({
  templateUrl: 'build/pages/msg/msg.html',
  providers:[WeiboService]

  
})
export class Msg implements OnInit{
	notifyMsg;
  constructor(private navCtrl: NavController,private weiboService:WeiboService) {
  	// this.notifyMsg=weiboService.getNotifyMsg();
  }

  ngOnInit(){
  	this.notifyMsg=this.weiboService.getNotifyMsg();
  }
}
