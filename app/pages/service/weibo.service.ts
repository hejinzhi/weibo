import { Injectable } from '@angular/core';
import{MAINMSGS} from './main-msg-mock.ts'
import{NOTIFY} from './notify-mock';

import{SEARCH} from './search-mock';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

 @Injectable()
export class WeiboService {


	constructor(private http:Http) {

	}

	getMainMsg(){
		// return this.http.get('http://localhost/MobileDataServer/test/get').toPromise().then(resp=>{
		// 	console.log(resp.json().data) ;
		// 	return resp.json().data;
		// }).catch(this.handleError);



		return Promise.resolve(MAINMSGS);

	}

	getNotifyMsg(){
		return NOTIFY;
	}

	getSearchMsg(){
		return SEARCH;
	}


private handleError(error: any) {
  console.error('An error occurred', error);
  return Promise.reject(error.message || error);
}

}