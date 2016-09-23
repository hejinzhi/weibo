import {Component} from '@angular/core';
import {NavController,ViewController,NavParams} from 'ionic-angular';


@Component({
	templateUrl: 'build/pages/home/largeImage.html',
})
export class LargeImage  {

	img: String ;

	constructor(private viewCtrl: ViewController, params: NavParams) {
		this.img = params.get('img');
	}

	closeModal(){
		this.viewCtrl.dismiss();
	}
}
