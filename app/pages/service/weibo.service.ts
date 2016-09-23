import { Injectable } from '@angular/core';
import {MAINMSGS} from './main-msg-mock.ts'
import {NOTIFY} from './notify-mock';
import {SEARCH} from './search-mock';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import {LoginMsg} from '../AppGlobal/AppGlobal';

@Injectable()
export class WeiboService {

	private url: String = 'http://localhost:3000/';
	//private url: string = 'http://10.86.21.19:3000/';


	public LoginUser: any = {};

	constructor(private http: Http) {
	}

	getMainMsg(userID) {
		//被註釋的那段是獲取某個用戶的微博，暫時先默認全部人互相關注，把所有微博刷出來
		// return this.http.get(this.url + 'weibo/' + userID).toPromise().then(resp => {
		// 	return resp.json();
		// }).catch(this.handleError);
		return this.http.get(this.url + 'weibo').toPromise().then(resp => {
			return resp.json();
		}).catch(this.handleError);
	}

	regNewUser(reg) {
		return this.http.get(this.url + 'reg/' + JSON.stringify(reg)).toPromise().then(resp => {
			return resp.json();
		}).catch(this.handleError);

	}

	sendNewWeibo(weibo) {
		return this.http.post(this.url + 'newWeibo', JSON.stringify(weibo)).toPromise().then(resp => {
			return resp.json();
		}).catch(this.handleError);
	}

	login(loginMsg) {

		return this.http.post(this.url + 'login', JSON.stringify(loginMsg)).toPromise().then(resp => {
			let respObj = resp.json();
			//console.log(respObj);
			return respObj;
		}).catch(this.handleError);

		// return this.http.get(this.url+'login/'+JSON.stringify(loginMsg)).toPromise().then(resp=>{
		// 	let respObj = resp.json();
		// 	LoginMsg.headFace = respObj.headFace;
		// 	LoginMsg.nickname = respObj.nickname;
		// 	LoginMsg.id = respObj.id;
		// 	return respObj;
		// }).catch(this.handleError);


	}

	deleteWeibo(id) {
		return this.http.get(this.url + 'delete/' + id).toPromise().then(resp => {
			let respObj = resp.json();
			return respObj;
		}).catch(this.handleError);
	}

	// login(loginMsg) {
	// 	let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
	// 	let options = new RequestOptions({ headers: headers });

	// 	return this.http.post(this.url + 'login', JSON.stringify(loginMsg), options).toPromise().then(resp => {
	// 		let respObj = resp.json();
	// 		LoginMsg.headFace = respObj.headFace;
	// 		LoginMsg.nickname = respObj.nickname;
	// 		LoginMsg.id = respObj.id;
	// 		return respObj;
	// 	}).catch(this.handleError);
	// }

	getNotifyMsg() {
		return NOTIFY;
	}

	getSearchMsg() {
		return SEARCH;
	}


	private handleError(error: any) {
		console.error('An error occurred', error);
		return Promise.reject(error.message || error);
	}

}