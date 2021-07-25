/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
'use strict'

//#region Convert Date/Time to Local Date/Time
function toLocateDateTime(timestamp) {
    var enWeekDay = [1, 2, 3, 4, 5, 6, 0];
    var viWeekDay = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật']

    // request a weekday along with a long date
    var options = {
        weekday: 'short',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: 'UTC',
        timeZoneName: 'short'
    };

    var locateDateTime = (new Date(timestamp)).toLocaleDateString('vi-VN', options);
    var localDate = (new Date(timestamp)).toLocaleDateString('vi-VN');
    var localTime = (new Date(timestamp)).toLocaleTimeString('vi-VN');

    var weekday = viWeekDay[enWeekDay.indexOf((new Date(timestamp)).getDay())];

    var _date = localDate.split('/');
    var dd = _date[1];
    var mm = _date[0];
    var yyyy = _date[2];

    var _time = localTime;
    var ii = (_time.indexOf('AM') != -1 ? 'AM' : 'PM');
    _time = _time.replace(' ' + ii, '');
    var hrs = _time.split(':')[0];
    var min = _time.split(':')[1];
    var sec = _time.split(':')[2];

    return {
        'weekDay': weekday,
        'dd': dd,
        'mm': mm,
        'yyyy': yyyy,
        'hrs': hrs,
        'min': min,
        'sec': sec,
        'ii': ii
    }
}
//#endregion

//#region Get ISODate of myDate
function toISODate(myDate) {
    var today = new Date(myDate);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return {
        'start': yyyy + '-' + mm + '-' + dd + 'T00:00:00.000Z',
        'end': yyyy + '-' + mm + '-' + dd + 'T23:59:59.000Z'
    };
}
//#endregion

//#region Convert Date to String (dd/mm/yyyy)
function dateToString(myDate) {
    var today = new Date(myDate);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return dd + '/' + mm + '/' + yyyy;
}
//#endregion

//#region Convert Date/Time to String (dd/mm/yyyy vào lúc hh:min ii)
function dateTimeToString(myDate) {
    var day = toLocateDateTime(myDate);
    return day.dd + '/' + day.mm + '/' + day.yyyy + " vào lúc " + day.hrs + ":" + day.min + ":" + day.sec + ' ' + day.ii;
}

exports.dateTimeToStringWithoutAt = (myDate) => {
    var day = toLocateDateTime(myDate);
    return day.dd + '/' + day.mm + '/' + day.yyyy + " " + day.hrs + ":" + day.min + ":" + day.sec;
}

//#endregion
exports.weekDay = (myDate) => {
    var enWeekDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    var WeekDay = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var viWeekDay = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật']
    // request a weekday along with a long date
    var options = {
        weekday: 'short'
    }
    var locateDateTime = (new Date(myDate)).toLocaleDateString('vi-VN', options);

    var items = locateDateTime.split(', ');
    var weekday = WeekDay[enWeekDay.indexOf(items[0])];


    return weekday;
}

exports.getWeekRange = (myDate) => {
    var enWeekDay = [1, 2, 3, 4, 5, 6, 0];
    // request a weekday along with a long date

    var day = enWeekDay.indexOf((new Date(myDate)).getDay())
    let firstDay = ""
    let lastDate = ""
    switch (day) {
        case 0:
            firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 0)
            lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 6)
            break;
        case 1:
            firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 1)
            lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 5)
            break;
        case 2:
            firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 2)
            lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 4)
            break;
        case 3:
            firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 3)
            lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 3)
            break;
        case 4:
            firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 4)
            lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 2)
            break;
        case 5:
            firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 5)
            lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 1)
            break;
        case 6:
            firstDay = new Date(myDate).setDate(new Date(myDate).getDate() - 6)
            lastDate = new Date(myDate).setDate(new Date(myDate).getDate() + 0)
            break;
    }
    return {
        firstDay: toISODate(firstDay).start,
        lastDate: toISODate(lastDate).end
    };
}

//#region Convert Date/Time to ISODateString
exports.toISODateString = (myDate) => {
    var today = new Date(myDate);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var hrs = today.getHours();
    var min = today.getMinutes();
    var sec = today.getSeconds();

    var yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    if (hrs < 10) hrs = '0' + hrs;
    if (min < 10) min = '0' + min;
    if (sec < 10) sec = '0' + sec;

    return yyyy + '-' + mm + '-' + dd + 'T' + hrs + ':' + min + ':' + sec + '.000Z';
}
//#endregion

//#region Get ISODate of today - start
exports.getStartDay = () => {
    var today = toLocateDateTime((new Date()));

    if (today.dd.length == 1) { today.dd = '0' + today.dd }
    if (today.mm.length == 1) { today.mm = '0' + today.mm }

    return {
        $gte: new Date(today.yyyy + '-' + today.mm + '-' + today.dd + 'T00:00:00.000Z')
    };
}
//#endregion

//#region Get ISODate of today - end
exports.getEndDay = () => {
    var today = toLocateDateTime((new Date()));

    if (today.dd.length == 1) { today.dd = '0' + today.dd }
    if (today.mm.length == 1) { today.mm = '0' + today.mm }

    return {
        $lte: new Date(today.yyyy + '-' + today.mm + '-' + today.dd + 'T23:59:59.000Z')
    };
}
//#endregion

//#region Get ISODate of today
exports.getNow = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    return {
        $gte: new Date(yyyy + '-' + mm + '-' + dd + 'T00:00:00.000Z'),
        $lte: new Date(yyyy + '-' + mm + '-' + dd + 'T23:59:59.000Z')
    };
}
//#endregion

//#region Get remain day 
exports.getRemainDay = (day) => {
    var today = new Date();
    var myDay = new Date(day);
    var timeDiff = Math.abs(myDay.getTime() - today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (diffDays == 0) {
        return "Diễn ra hôm nay";
    } else {
        if (diffDays <= 30) {
            return "Còn " + diffDays + " ngày nữa";
        } else {
            return "Ngày " + dateToString(myDay) + " sẽ diễn ra";
        }
    }
}
//#endregion

//#region Get exam do time elapsed 
exports.getExamTimeElapsed = (startDate, completeDate) => {
    return (completeDate.getTime() - startDate.getTime()) / 60000
}
//#endregion

//#region Get post time elapsed 
exports.getTimeElapsed = (ptime) => {
    var secsOf = {
        'min': 60,
        'hour': 60 * 60,
        'day': 60 * 60 * 24
    };
    var today = new Date();
    var pday = new Date(ptime);
    var timeDiff = Math.round((today.getTime() - pday.getTime()) / 1000, 0);

    if (timeDiff < 0) {
        return dateTimeToString(pday);
    } else {
        if (timeDiff < 60) return "Vừa mới xong";
        var d = Math.round(timeDiff / secsOf.day, 0);

        if (d >= 1) {
            if (d == 1) {
                return "Ngày hôm qua";
            } else {
                return dateTimeToString(pday);
            }
        } else {
            if (d < 0) {
                return dateTimeToString(pday);
            } else {
                var h = Math.round(timeDiff / secsOf.hour, 0);
                if (h >= 1) {
                    return h + " giờ trước";
                } else {
                    var m = Math.round(timeDiff / secsOf.min, 0);
                    if (m >= 1) {
                        return m + " phút trước";
                    } else {
                        return timeDiff + " giây trước";
                    }
                }
            }
        }
    }
}
//#endregion

//#region Format message timestamp
exports.formatMessageTimestamp = (timestamp) => {
    var today = new Date();
    var myDay = new Date(timestamp);
    var timeDiff = Math.abs(myDay.getTime() - today.getTime());
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    var weekDayString = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

    var locateTime = toLocateDateTime(timestamp); //console.log(locateTime);

    if (diffDays == 0) { // today
        return locateTime.hrs + ':' + locateTime.min + ' ' + locateTime.ii;
    } else {
        if (diffDays >= 1 && diffDays <= 7) {
            var weekDayId = myDay.getDay();
            return weekDayString[weekDayId] + ', ' + locateTime.hrs + ':' + locateTime.min + ' ' + locateTime.ii;
        } else {
            if (diffDays <= 365) {
                return locateTime.dd + '/' + locateTime.mm + ', ' + locateTime.hrs + ':' + locateTime.min + ' ' + locateTime.ii;
            } else {
                return locateTime.dd + '/' + locateTime.mm + '/' + locateTime.yyyy + ', ' + locateTime.hrs + ':' + locateTime.min + ' ' + locateTime.ii;
            }
        }
    }
}
//#endregion

//#region Format message timestamp
exports.formatEventTimestamp = (timestamp) => {
    var today = new Date();
    var myDay = new Date(timestamp);
    var timeDiff = Math.abs(myDay.getTime() - today.getTime());
    var diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    var weekDayString = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']

    var locateTime = toLocateDateTime(myDay);

    if (diffDays == 0) { // today
        return 'Ngày hôm nay, vào lúc ' + locateTime.hrs + ' giờ ' + locateTime.min + ' phút';
    } else {
        if (diffDays == 1) { // tomorrow
            return 'Ngày mai, vào lúc ' + locateTime.hrs + ' giờ ' + locateTime.min + ' phút';
        } else {
            var weekDayId = myDay.getDay();
            return weekDayString[weekDayId] + ', ' + locateTime.dd + '/' + locateTime.mm + '/' + locateTime.yyyy + ', vào lúc ' + locateTime.hrs + ':' + locateTime.min;
        }
    }
}
//#endregion

exports.toISODate = toISODate;
exports.dateTimeToString = dateTimeToString;
exports.dateToString = dateToString;