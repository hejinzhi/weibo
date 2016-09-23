import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {SearchEngine} from '../searchengine/searchengine';
import {Home} from '../home/home';
import {Account} from '../account/account';
import {Msg} from '../msg/msg';
import {NewWeibo} from '../newWeibo/newWeibo';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root:any;

  constructor(private navCtrl:NavController) {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Home;
    this.tab2Root = Msg;
    this.tab3Root = SearchEngine;
    this.tab4Root = Account;
  }

  newWeibo(){
    this.navCtrl.push(NewWeibo);
  }
}
