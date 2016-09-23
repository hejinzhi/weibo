import {Injectable} from '@angular/core';

var minute = 1000 * 60;
var hour = minute * 60;
var day = hour * 24;
var halfamonth = day * 15;
var month = day * 30;

@Injectable()
export class Utils {
    constructor() {
    }

    getDateDiff(dateTimeStamp) {
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;
        var result;
        var monthC = Math.round(diffValue / month);
        var weekC = Math.round(diffValue / (7 * day));
        var dayC = Math.round(diffValue / day);
        var hourC = Math.round(diffValue / hour);
        var minC = Math.round(diffValue / minute);
        if (monthC >= 1) {
            result = monthC + "个月前";
        }
        else if (weekC >= 1) {
            result = weekC + "周前";
        }
        else if (dayC >= 1) {
            result = dayC + "天前";
        }
        else if (hourC >= 1) {
            result = hourC + "个小时前";
        }
        else if (minC >= 1) {
            result = minC + "分钟前";
        } else {
            result = "刚刚";
        }
        return result;
    };
}  