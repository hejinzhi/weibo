import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import { OnInit } from '@angular/core';
import {Pinglun} from '../pinglun/pinglun';

@Component({
	templateUrl: 'build/pages/home/home-detail-component.html',
})
export class HomeDetail implements OnInit {
	msg;
	IsOn: boolean = false;
	whatToShow: string = 'zhuanfa';

	//hard code数据测试
	pinglun: any[] = [{
		headFace: 'img/max.png',
		name: '小鸡蛋',
		date: '8-4',
		time: '17:35',
		content: '虽然水平不怎样，但态度绝对是业界良心',
		thumbNum: 1,
		thumbUp: false
	},
		{
			headFace: 'img/ben.png',
			name: '音乐台',
			date: '8-4',
			time: '18:10',
			content: '以后的机器人肯定可以代替人类',
			thumbNum: 5,
			thumbUp: false
		}, {
			headFace: 'img/max.png',
			name: '小鸡蛋',
			date: '8-4',
			time: '17:35',
			content: '虽然水平不怎样，但态度绝对是业界良心',
			thumbNum: 1,
			thumbUp: false
		},
		{
			headFace: 'img/ben.png',
			name: '音乐台',
			date: '8-4',
			time: '18:10',
			content: '以后的机器人肯定可以代替人类',
			thumbNum: 5,
			thumbUp: false
		}, {
			headFace: 'img/max.png',
			name: '小鸡蛋',
			date: '8-4',
			time: '17:35',
			content: '虽然水平不怎样，但态度绝对是业界良心',
			thumbNum: 1,
			thumbUp: false
		},
		{
			headFace: 'img/ben.png',
			name: '音乐台',
			date: '8-4',
			time: '18:10',
			content: '以后的机器人肯定可以代替人类',
			thumbNum: 5,
			thumbUp: false
		}];

	zhuanfa: any[] = [{
		headFace: 'img/max.png',
		name: '小鸡蛋',
		date: '8-4',
		time: '17:35',
		content: '虽然水平不怎样，但态度绝对是业界良心',
		thumbNum: 1,
		thumbUp: false
	},
		{
			headFace: 'img/ben.png',
			name: '音乐台',
			date: '8-4',
			time: '18:10',
			content: '以后的机器人肯定可以代替人类',
			thumbNum: 5,
			thumbUp: false
		}, {
			headFace: 'img/max.png',
			name: '小鸡蛋',
			date: '8-4',
			time: '17:35',
			content: '虽然水平不怎样，但态度绝对是业界良心',
			thumbNum: 1,
			thumbUp: false
		},
		{
			headFace: 'img/ben.png',
			name: '音乐台',
			date: '8-4',
			time: '18:10',
			content: '以后的机器人肯定可以代替人类',
			thumbNum: 5,
			thumbUp: false
		}, {
			headFace: 'img/max.png',
			name: '小鸡蛋',
			date: '8-4',
			time: '17:35',
			content: '虽然水平不怎样，但态度绝对是业界良心',
			thumbNum: 1,
			thumbUp: false
		},
		{
			headFace: 'img/ben.png',
			name: '音乐台',
			date: '8-4',
			time: '18:10',
			content: '以后的机器人肯定可以代替人类',
			thumbNum: 5,
			thumbUp: false
		}];

	zan: any[] = [{
		headFace: 'img/max.png',
		name: '小鸡蛋',
		date: '8-4',
		time: '17:35',
		content: '虽然水平不怎样，但态度绝对是业界良心',
		thumbNum: 1,
		thumbUp: false
	},
		{
			headFace: 'img/ben.png',
			name: '音乐台',
			date: '8-4',
			time: '18:10',
			content: '以后的机器人肯定可以代替人类',
			thumbNum: 5,
			thumbUp: false
		}, {
			headFace: 'img/max.png',
			name: '小鸡蛋',
			date: '8-4',
			time: '17:35',
			content: '虽然水平不怎样，但态度绝对是业界良心',
			thumbNum: 1,
			thumbUp: false
		},
		{
			headFace: 'img/ben.png',
			name: '音乐台',
			date: '8-4',
			time: '18:10',
			content: '以后的机器人肯定可以代替人类',
			thumbNum: 5,
			thumbUp: false
		}, {
			headFace: 'img/max.png',
			name: '小鸡蛋',
			date: '8-4',
			time: '17:35',
			content: '虽然水平不怎样，但态度绝对是业界良心',
			thumbNum: 1,
			thumbUp: false
		},
		{
			headFace: 'img/ben.png',
			name: '音乐台',
			date: '8-4',
			time: '18:10',
			content: '以后的机器人肯定可以代替人类',
			thumbNum: 5,
			thumbUp: false
		}];




	constructor(private viewCtrl: ViewController, private navCtrl: NavController, private navParams: NavParams) {
		this.msg = this.navParams.get('paramWeibo');
	}

	ngOnInit() {

	}

	goBack() {
		this.navCtrl.pop();
	}

	ionViewWillEnter() {
		this.viewCtrl.setBackButtonText('');
	}

	show(param) {
		this.whatToShow = param;
	}


	toggle(pinglun) {

		if (pinglun.thumbUp) {
			pinglun.thumbNum -= 1;
			pinglun.thumbUp = false;
		} else {
			pinglun.thumbNum += 1;
			pinglun.thumbUp = true;
		}
	}

	goToXiePingLun(){
		this.navCtrl.push(Pinglun);
	}


	doInfinite(infiniteScroll, whatToShow) {
		// console.log('Begin async operation');
		let target: any;
		if (whatToShow == 'pinglun') {
			target = this.pinglun;
		} else if (whatToShow == 'zhuanfa') {
			target = this.zhuanfa;
		} else if (whatToShow == 'zan') {
			target = this.zan;
		}

		setTimeout(() => {
			for (var i = 0; i < 30; i++) {
				target.push({
					headFace: 'img/ben.png',
					name: '音乐台',
					date: '8-4',
					time: '18:10',
					content: '以后的机器人肯定可以代替人类' + i,
					thumbNum: 5,
					thumbUp: false
				});
			}

			// console.log('Async operation has ended');
			infiniteScroll.complete();
		}, 500);
	}
}



