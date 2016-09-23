import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Animation, NavParams, ViewController } from 'ionic-angular';

import { PhotoViewerViewController } from './photo-viewer-view-controller';
import { getModalDimensions } from './photo-viewer-transition';
import { ViewPortUtil } from './viewport-util';


@Component({
  template: `
    <ion-content class="transparent" (click)="dismissView()">
        <ion-backdrop #backdrop></ion-backdrop>
        <div class="wrapper" #wrapper>
          <div class="contentContainer" #contentContainer></div>
          <!--<img class="scaled-image no-pointers" #scaledImage [src]="imageEntity?.mediumSizeUrl">-->
          <img class="scaled-image no-pointers" #scaledImage src={{imageEntity}}>
          <img class="non-scaled-image no-pointers" #nonScaledImage>
          <!--<div class="scaled-image no-pointers" #scaledImage style="background-color: red;"></div>
          <div class="non-scaled-image no-pointers" #nonScaledImage style="background-color: green;"></div>-->
        </div>
    </ion-content>
  `
})
export class PhotoViewer {

  private imageEntity: string;
  private contentContainerRect: any;
  // private panGesture: PanGesture;

  private initialTouch: TouchCoordinate;
  private mostRecentTouch: TouchCoordinate;
  private yTransformValue: number;

  private enabled: boolean;

  @ViewChild('backdrop') backdrop: ElementRef;
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('contentContainer') contentContainer: ElementRef;
  @ViewChild('btnContainer') btnContainer: ElementRef;
  @ViewChild('scaledImage') scaledImageEle: ElementRef;
  @ViewChild('nonScaledImage') nonScaledImageEle: ElementRef;

  constructor(private navParams: NavParams, private viewController: ViewController, private viewPortUtil: ViewPortUtil) {
    this.imageEntity = this.navParams.data.imageEntity;
  }

  ionViewDidEnter() {
    this.enabled = true;
    // give a short buffer to make sure the transition is done
    setTimeout( () => {
        // DOM READ
        this.contentContainerRect = this.contentContainer.nativeElement.getBoundingClientRect();
        // DOM READ, WRITE
        this.showHighResImage();
    }, 100);
  }

  showHighResImage() {
    // DOM READS
    let parentWidth = this.wrapper.nativeElement.clientWidth;
    let parentHeight = this.wrapper.nativeElement.clientHeight;
    let dimensions = getModalDimensions(this.viewPortUtil.getHeight(), this.viewPortUtil.getWidth());
    const WIDTH = dimensions.useableWidth;

    // DOM WRITES
    this.nonScaledImageEle.nativeElement.style.position = 'absolute';
    this.nonScaledImageEle.nativeElement.style.width = `${WIDTH}px`;
    this.nonScaledImageEle.nativeElement.style.height = `${WIDTH}px`;
    this.nonScaledImageEle.nativeElement.style.top = `${Math.floor(parentHeight / 2 - WIDTH / 2)}px`;
    this.nonScaledImageEle.nativeElement.style.left = `${Math.floor(parentWidth / 2 - WIDTH / 2)}px`;
    this.nonScaledImageEle.nativeElement.onload = () => {
      this.scaledImageEle.nativeElement.style.display = 'none';
    };
    // this.nonScaledImageEle.nativeElement.src = this.imageEntity.mediumSizeUrl;
    this.nonScaledImageEle.nativeElement.src = this.imageEntity;
  }

  dismissView(removeImageBeforeDismiss) {
      // DOM WRITES
      if ( removeImageBeforeDismiss ) {
        this.wrapper.nativeElement.removeChild(this.scaledImageEle.nativeElement);
      } else {
        this.scaledImageEle.nativeElement.style.display = '';
      }
      this.wrapper.nativeElement.removeChild(this.nonScaledImageEle.nativeElement);

      this.viewController.dismiss(null, null, {
        ev: {
          skipImageTransition: removeImageBeforeDismiss
        }
      });
  }

  doSwipeToDismissAnimation(viewPortHeight: number, differenceY: number, newYValue: number, velocity: number) {
    let animation = new Animation(this.nonScaledImageEle, {renderDelay: 0 });
    let to: number;
    if ( differenceY < 0 ) {
      to = 0 - viewPortHeight - 20;
      animation.fromTo('translateY', `${newYValue}px`, `${to}px`);
    } else {
      to = viewPortHeight + 20;
      animation.fromTo('translateY', `${newYValue}px`, `${to}px`);
    }
    animation.onFinish( () => {
      this.dismissView(true);
    });
    let distanceTraveled = Math.abs(to - newYValue);
    let time = distanceTraveled / velocity;
    if ( time > 300 ) {
      time = 300;
    }
    let backdropAnimation = new Animation(this.backdrop, {renderDelay: 0});
    backdropAnimation.fromTo('opacity', this.backdrop.nativeElement.style.opacity, `0.00`);
    animation.add(backdropAnimation);
    animation.duration(time).easing('ease').play();
  }

  doMoveAnimation(previousYValue: number, newYalue: number, percentDragged: number) {
    let animation = new Animation(this.backdrop, {renderDelay: 0});
    let backdropAnimation = new Animation(this.backdrop, {renderDelay: 0});
    backdropAnimation.fromTo('opacity', this.backdrop.nativeElement.style.opacity, `${1 - (percentDragged * 1.25)}`);
    let imageAnimation = new Animation(this.nonScaledImageEle, {renderDelay: 0});
    imageAnimation.fromTo('translateY', `${previousYValue}px`, `${newYalue}px`);
    animation.add(backdropAnimation).add(imageAnimation).play();
  }

  doResetAnimation(newYValue: number) {
    let animation = new Animation(this.backdrop, {renderDelay: 0});
    let backdropAnimation = new Animation(this.backdrop, {renderDelay: 0});
    backdropAnimation.fromTo('opacity', this.backdrop.nativeElement.style.opacity, '1.0');
    let buttonAnimation = new Animation(this.btnContainer, {renderDelay: 0});
    buttonAnimation.fromTo('translateY', `-100px`, `0px`);
    let imageAnimation = new Animation(this.nonScaledImageEle, {renderDelay: 0});
    imageAnimation.fromTo('translateY', `${newYValue}px`, `0px`);
    animation.duration(250).easing('ease').add(backdropAnimation).add(buttonAnimation).add(imageAnimation).play();
  }

  animateButtonContainerOut() {
    let animation = new Animation(this.btnContainer.nativeElement, {renderDelay: 0});
    animation.fromTo('translateY', `0px`, `-100px`);
    animation.easing('ease').duration(250).play();
  }

  @HostListener('body:keyup', ['$event'])
  private _keyUp(ev: KeyboardEvent) {
    if (this.enabled && this.viewController.isLast()) {
      if (ev.keyCode === KEY_CODE_ESCAPE) {
        this.dismissView(false);
      }
    }
  }
}

class TouchCoordinate {
    constructor(public x: number, public y: number) {
    }
}

const TOUCH_DISTANCE_TRAVELED_THRESHOLD: number = .40;
const VELOCITY_THRESHOLD: number = .2;
const KEY_CODE_ESCAPE = 27;
