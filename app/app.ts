import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';

import {TabsPage} from './pages/tabs/tabs';
import {Pinglun} from './pages/pinglun/pinglun';
import {Login} from './pages/login/login';
import {Reg} from './pages/reg/reg';
import {ForgetPwd} from './pages/forgetPwd/forgetPwd';
import {WeiboService} from './pages/service/weibo.service.ts';

import {TRANSITION_IN_KEY, TRANSITION_OUT_KEY} from './pages/viewer/photo-viewer-transition';
import { ViewPortUtil } from './pages/viewer/viewport-util';
import { PhotoViewerController } from './pages/viewer/photo-viewer-view-controller';
import {LoginMsg} from './pages/AppGlobal/AppGlobal';

import { Utils } from './utils/utils';

@Component({
    template: '<ion-nav [root]="rootPage"></ion-nav>',
    providers: [WeiboService]
})

export class MyApp {

    private rootPage: any;


    constructor(private platform: Platform, private weiboService: WeiboService) {
        // this.rootPage = TabsPage;
        // console.log('cons');
        let loginMsg: string;
        let autoLoginObj;
        loginMsg = localStorage.getItem('loginMsg');
        if (loginMsg) {
            autoLoginObj = JSON.parse(loginMsg);
            if (autoLoginObj.autoLogin) {
                this.weiboService.login(autoLoginObj).then(resp => {
                    if (resp.success == 1) {
                        this.rootPage = TabsPage;
                        LoginMsg.headFace = resp.headFace;
                        LoginMsg.nickname = resp.nickname;
                        LoginMsg.id = resp.id;
                    }
                    else {
                        localStorage.removeItem('loginMsg');
                        this.rootPage = Login;
                    }
                });
            } else {
                this.rootPage = Login;
            }
        } else {
            this.rootPage = Login;
        }

        platform.ready().then(() => {
            StatusBar.styleDefault();
        });


    }
}

// ionicBootstrap(MyApp, [], {
//     backButtonText: 'Go Back',
//     iconMode: 'ios',
//     modalEnter: 'modal-slide-in',
//     modalLeave: 'modal-slide-out',
//     tabbarPlacement: 'bottom',
//     pageTransition: 'ios',
// });

ionicBootstrap(MyApp, [ViewPortUtil, PhotoViewerController,Utils], {
    backButtonText: 'Go Back',
    iconMode: 'ios',
    modalEnter: 'modal-slide-in',
    modalLeave: 'modal-slide-out',
    tabbarPlacement: 'bottom',
    pageTransition: 'ios',
    tabsHideOnSubPages: "true",
    photoViewerEnter: TRANSITION_IN_KEY,
    photoViewerLeave: TRANSITION_OUT_KEY,
    prodMode: true
});