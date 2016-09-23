import {Injectable} from '@angular/core';
import {App, NavOptions, ViewController} from 'ionic-angular';
import {PhotoViewer} from './photo-viewer';
import {ViewPortUtil} from './viewport-util';

export class PhotoViewerViewController extends ViewController {

  public isAlreadyDismissed: boolean;

  constructor(private app: App, opts: any = {}) {
    super(PhotoViewer, opts);
    this.isOverlay = true;

    this.fireOtherLifecycles = true;
  }

  getTransitionName(direction: string) {
    let key = 'photoViewer' + (direction === 'back' ? 'Leave' : 'Enter');
    return this._nav && this._nav.config.get(key);
  }

  static create(opts: any = {}) {
    return new PhotoViewerViewController(opts);
  }

  present(opts: NavOptions = {}) {
    this.app.present(this, opts);
  }

}

@Injectable()
export class PhotoViewerController {
  constructor(private app: App, private viewPortUtil: ViewPortUtil) {
  }

  create(opts: any = {}) {
    return new PhotoViewerViewController(this.app, opts);
  }


  imageClicked(imageEntity: string, event: Event) {
    let rect = (<HTMLElement>event.target).getBoundingClientRect();
    let modal = new PhotoViewerViewController(this.app, {
      imageEntity: imageEntity
    });
    modal.present({
      ev: {
        startX: rect.left,
        startY: rect.top,
        width: rect.width,
        height: rect.height,
        viewportHeight: this.viewPortUtil.getHeight(),
        viewportWidth: this.viewPortUtil.getWidth()
      }
    });
    event.stopPropagation();
  }

}
