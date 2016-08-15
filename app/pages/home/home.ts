import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeiboService} from '../service/weibo.service.ts'
import { OnInit } from '@angular/core';
import {HomeDetail} from '../home/home-detail.component';

@Component({
	templateUrl: 'build/pages/home/home.html',
	providers: [WeiboService]
})
export class Home implements OnInit {

	mainMsg;
	constructor(private navCtrl: NavController, private weiboService: WeiboService) {
	}

	goToDetailPage(weibo) {
		this.navCtrl.push(HomeDetail, { paramWeibo: weibo },{animate:true});
	}


	ngOnInit() {
		this.weiboService.getMainMsg().then((mainMsg) => {
			this.mainMsg = mainMsg;
		});

	}
}
