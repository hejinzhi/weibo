import {Component, ViewChild, ElementRef, OnInit} from '@angular/core';
import {NavController, ViewController, Events} from 'ionic-angular';
import { ImagePicker, Base64ToGallery, Camera } from 'ionic-native';
import {WeiboService} from '../service/weibo.service.ts';
import {PhotoViewerController} from '../viewer/photo-viewer-view-controller';
import {LoginMsg} from '../AppGlobal/AppGlobal';
import {TabsPage} from '../tabs/tabs';

// declare var cordova: any;
// const fs: string = cordova.file.dataDirectory;

@Component({
  templateUrl: 'build/pages/newWeibo/newWeibo.html'
})



export class NewWeibo {
  constructor(private navCtrl: NavController, private viewCtrl: ViewController, private photoViewerController: PhotoViewerController, private weiboService: WeiboService,
    private events: Events) {
  }

  imgs: string = 'http://10.86.0.18/newportal/resource/3.jpg';
  //設置uploadImagesTemp的原因是當圖片多選時，圖片load完的時間不確定，如果直接往uploadImages塞數據，會導致畫面佈局計算的長寬不准確。每個文件
  //load完後先塞uploadImagesTemp臨時存儲。當檢查到uploadImagesTemp的長度等於file的長度，再賦值給uploadImages，一次性把畫面渲染出來
  uploadImagesTemp: string[] = [];
  uploadImages: string[] = [];

  images_list = [];
  base64Image: any;
  weiboDesc;

  private imageSize: number;
  @ViewChild('content', { read: ElementRef }) contentRef: ElementRef;


  goBack() {
    this.navCtrl.pop();
  }

  sendWeibo() {
    var weibo = {
      "name": LoginMsg.nickname,
      "sendTime": Date.now(),
      "sendMachine": "Iphone 6S",
      "headFace": LoginMsg.headFace,
      "resendNum": 0,
      "descImage": this.uploadImages,
      "commentNum": 0,
      "thumbNum": 0,
      "desc": this.weiboDesc,
      "userID": LoginMsg.id
    };
    this.weiboService.sendNewWeibo(weibo).then(resp => {
      this.events.publish('weibo:add', weibo);
      // this.navCtrl.pop();
      this.navCtrl.push(TabsPage);
    });
  }

  pickImage() {

    // ImagePicker.getPictures({ outputType: 1 }).then((results) => {
    //   for (var i = 0; i < results.length; i++) {
    //     this.imgs = 'data:image/png;' + results[i];
    //     Base64ToGallery.base64ToGallery(results[i], 'img_').then(
    //       res => console.log("Saved image to gallery ", res),
    //       err => console.log("Error saving image to gallery ", err)
    //     );

    //     this.convertFileToDataURLviaFileReader(results[i], function (base64Data) {
    //       this.imgs = base64Data;
    //       console.log(base64Data);
    //     });
    //     console.log(results[i]);
    //     this.toDataUrl(results[i], function (base64Img) {
    //       console.log(base64Img);
    //       this.imgs = base64Img;
    //     }, 'image/jpg');
    //   }

    // }, (err) => { console.log(err) });


    // this.toDataUrl('https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/pie.png', function (base64Img) {
    //   console.log(base64Img);
    // }, 'image/png');


    // this.imgURLToDataURL('https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/pie.png').then((dataURL) => {
    //   console.log(dataURL);
    //   this.base64Image = dataURL;
    // });

    // ImagePicker.getPictures({ outputType: 1 }).then((imageData) => {
    //   this.base64Image = "data:image/jpeg;base64," + imageData; 
    //   console.log(this.base64Image);
    // }, (err) => {
    //   console.log(err); 
    // });



    //this.imgs = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
    //  http://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png

    //   this.imgURLToDataURL('img/max.png')
    // .then(function(dataURL){
    //   //console.log( dataURL);
    //   this.imgs = dataURL;
    // });

    /* Camera.getPicture({}).then((imageData) => {
       // imageData is a base64 encoded string
       this.base64Image = "data:image/jpeg;base64," + imageData;
       console.log(this.base64Image);
     }, (err) => {
       console.log(err);
     });*/


  }

  loadImageFile(event) {
    for (var i = 0; i < event.srcElement.files.length; i++) {
      var file = event.srcElement.files[i];
      this.readFile(file, event.srcElement.files.length);
    }
  }

  readFile(file, length) {
    var fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      let result = fileReader.result;
      //this.uploadImages.push(result);
      this.uploadImagesTemp.push(result);
    }
    fileReader.onloadend = (e) => {
      if (this.uploadImagesTemp.length == length && length > 1)  //  && length > 1
      {
        for (var i = 0; i < length; i++) {
          this.uploadImages.push(this.uploadImagesTemp[i]);
        }
        this.uploadImagesTemp = [];
      }
      else if (length == 1) {
        this.uploadImages.push(this.uploadImagesTemp[0]);
        this.uploadImagesTemp = [];
      }
    }

  }


  ionViewWillEnter() {
    this.viewCtrl.setBackButtonText('');
    this.setImageSize();
  }

  imageClicked(imageEntity: string, event: Event) {
    this.photoViewerController.imageClicked(imageEntity, event);
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


  convertFileToDataURLviaFileReader(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
  }

  toDataUrl(src, callback, outputFormat) {
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
      var canvas = <HTMLCanvasElement>document.createElement('CANVAS');
      var ctx = canvas.getContext('2d');
      var dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      //console.log('dataUrl: ' + dataURL);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
  }

  imgURLToDataURL(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL('image/png', 0.9);
        resolve(dataURL);
        canvas = null;
      };
      img.src = url;
      if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = url;
      }
    });
  }

}


const MIN_DESIRED_IMAGE_SIZE = 120;
const NUM_IMAGES: number = 500;
const MIN_NUM_COLUMNS: number = 3;
const MAX_NUM_COLUMNS: number = 5;
const MARGIN: number = 5;
