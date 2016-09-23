import {Component, ElementRef, ViewChild} from '@angular/core';
import {NavController, ModalController, PopoverController, NavParams, Events} from 'ionic-angular';
import {WeiboService} from '../service/weibo.service.ts'
import { OnInit } from '@angular/core';
import {HomeDetail} from '../home/home-detail.component';
import { Http } from '@angular/http';

import {LoginMsg} from '../AppGlobal/AppGlobal';
import {LargeImage} from '../home/largeImage';
import {Popover} from '../popover/popover';

import {PhotoViewerController} from '../viewer/photo-viewer-view-controller';
import {Utils} from '../../utils/utils';


@Component({
	templateUrl: 'build/pages/home/home.html',
	providers: [WeiboService]
})
export class Home implements OnInit {

	mainMsg: any[] = [];
	descImage: String[][];

	private imageSize: number;
	@ViewChild('content', { read: ElementRef }) contentRef: ElementRef;

	constructor(private navCtrl: NavController, private weiboService: WeiboService, private http: Http, private modalCtrl: ModalController,
		private popCtrl: PopoverController, private params: NavParams, private photoViewerController: PhotoViewerController, private events: Events,private utils:Utils) {

		// this.events.subscribe('weibo:add', (data) => {
		// 	console.log('dsadasd');
		// 	console.log(data);
		// 	this.mainMsg.push(data);
		// })
	}



	ionViewWillEnter() {
		this.setImageSize();

		// this.events.subscribe('weibo:add', (data) => {
		// 	console.log('dsadasd');
		// 	console.log(data);
		// 	this.mainMsg.push(data[0]);

		// });
	}

	setImageSize() {
		this.imageSize = this.setDimensions() - 5;
	}

	setDimensions() {
		let contentWidth = this.contentRef.nativeElement.offsetWidth;
		let potentialNumColumns = Math.floor(contentWidth / MIN_DESIRED_IMAGE_SIZE);
		let calculatedNumColumns = Math.min(MAX_NUM_COLUMNS, potentialNumColumns);
		let numColumns = Math.max(calculatedNumColumns, MIN_NUM_COLUMNS);
		return Math.floor(contentWidth / numColumns);
	}

	imageClicked(imageEntity: string, event: Event) {
		this.photoViewerController.imageClicked(imageEntity, event);
	}

	goToDetailPage(weibo) {
		this.navCtrl.push(HomeDetail, { paramWeibo: weibo }, { animate: true });

	}

	goLargeImage(img, event) {
		let modal = this.modalCtrl.create(LargeImage, { img: img });
		modal.present();
		event.stopPropagation();

	}

	//id:告訴popover要刪除那個item
	//index：用來告訴刪除畫面上哪個元素
	showPopover(id, index) {
		//console.log('aaa'+' '+id+' '+index);
		let pop = this.popCtrl.create(Popover, { id: id });
		pop.present();


		//當刪除完畢後，通知畫面刪除對應項
		pop.onDidDismiss((data) => {
			if (data) {
				//console.log( this.mainMsg[0]);
				this.mainMsg.splice(index, 1);
			}
		});
	}


	ngOnInit() {
		this.weiboService.getMainMsg(LoginMsg.id).then((mainMsg) => {
			//this.mainMsg = mainMsg;
			for (var i = 0; i < mainMsg.length; i++) {
				mainMsg[i].sendTime = this.utils.getDateDiff(mainMsg[i].sendTime);
				this.mainMsg.push(mainMsg[i]);
			}
		});


	}
}

const MIN_DESIRED_IMAGE_SIZE = 120;
const NUM_IMAGES: number = 500;
const MIN_NUM_COLUMNS: number = 3;
const MAX_NUM_COLUMNS: number = 5;
const MARGIN: number = 5;
