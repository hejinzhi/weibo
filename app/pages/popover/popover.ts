import {Component} from '@angular/core';
import {NavParams, ViewController} from 'ionic-angular';
import {WeiboService} from '../service/weibo.service';

@Component({
	templateUrl: 'build/pages/popover/popover.html',
	providers: [WeiboService]
})
export class Popover  {

	id;
	constructor(private params: NavParams, private weiboService: WeiboService, private viewCtrl: ViewController) {
		this.id = params.get('id');
	}

	deleteWeibo(){
		this.weiboService.deleteWeibo(this.id).then(resp=>{
			if(resp.success==1){
				//console.log('delete success');
				this.viewCtrl.dismiss({ success: 1 });
			}else{
				console.log('delete error');
			}
		})
		
	}

}
