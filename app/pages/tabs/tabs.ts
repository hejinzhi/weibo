import {Component} from '@angular/core';
import {SearchEngine} from '../searchengine/searchengine';
import {Home} from '../home/home';
import {Account} from '../account/account';
import {Msg} from '../msg/msg';

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab1Root: any;
  private tab2Root: any;
  private tab3Root: any;
  private tab4Root:any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab1Root = Home;
    this.tab2Root = Msg;
    this.tab3Root = SearchEngine;
    this.tab4Root = Account;
  }
}
