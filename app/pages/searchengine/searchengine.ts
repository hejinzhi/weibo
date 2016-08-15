import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { OnInit } from '@angular/core';
import {Slides} from 'ionic-angular';
import {ViewChild} from '@angular/core';
import   {WeiboService} from '../service/weibo.service'


@Component({
	templateUrl: 'build/pages/searchengine/searchengine.html',
	providers:[WeiboService]
})
export class SearchEngine implements OnInit {

	@ViewChild('mySlider') slider: Slides;
		searchMsg;


	mySlideOptions = {
		initialSlide: 0,
		loop: true,
		pager: true,
		speed: 300
	};

	constructor(private navCtrl: NavController,private weiboService:WeiboService) {

		setInterval(()=>{this.slideNext()},3000);
	}

	slideNext() {
		// this.slider.slideTo(2, 500);
		this.slider.slideNext();
	}

	ngOnInit(){
		this.searchMsg=this.weiboService.getSearchMsg();
	}




}
