/**
 * @name:
 * @desc:时间处理方法
 * @example:
 * @depend:
 * @date: 2017/1/22
 * @author: qiangkailiang
 */

common.date = {
    local_time: function() {
        var local = new Date();
        var year = local.getFullYear();
        var month = local.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        var day = local.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        var time = local.toTimeString().substr(0, 8);
        var local_time = year + "-" + month + "-" + day + " " + time;
        return local_time;
    },
    am_pm_data: function(ampm) {
        var year = ampm.substr(0, 4);
        var month = ampm.substr(5, 2);
        var day = ampm.substr(8, 2);
        var hour = ampm.substr(11, 2);
        var data_ampm, ampm;
        if (hour < 12) {
            day_ampm = "上午 ";
        } else if (hour == 12) {
            day_ampm = "中午 ";
        } else if (hour > 12) {
            day_ampm = "下午 ";
        }
        var minute = ampm.substr(14, 2);
        ampm = day_ampm + hour + ":" + minute + " " + year + "年" + month + "月" + day + "日";
        return ampm;
    },
    cut_date_msec: function(java_date) {
        java_date = java_date.substr(0, 19);
        return java_date;
    },
    isSameDay: function(day1, day2) {
        return day1.substr(0, 10) == day2.substr(0, 10);
    },
    diffDay_one: function(dateStrBefore, dateStrAfter) {
        var dateStrBefore1 = dateStrBefore.substr(0, 10); //发布时间
        var dateStrAfter1 = dateStrAfter.substr(0, 10); //传入系统时间
        var dateStrBefore2 = dateStrBefore1.replace(/\-/g, '/');
        var dateStrAfter2 = dateStrAfter1.replace(/\-/g, '/');
        var days = 1000 * 60 * 60 * 24;
        var day1 = Date.parse(dateStrBefore2);
        var day2 = Date.parse(dateStrAfter2);
        if (isNaN(day1)) {
            //alert(dateStrBefore + "格式不正确");
            return NaN;
        }
        if (isNaN(day2)) {
            //alert(dateStrAfter + "格式不正确");
            return NaN;
        }
        var d = (day2 - day1) / days;
        if (dateStrBefore1.substring(0,4)!==dateStrAfter2.substring(0,4)){
            return dateStrBefore2;
        }
        if (d < 1) { //秒分小时
            var dateStrB = new Date(dateStrBefore.replace(/\-/g, '/'));
            var dateStrA = new Date(dateStrAfter.replace(/\-/g, '/'));
            var A_B = (dateStrA.getTime() - dateStrB.getTime()) / 1000;
            if (A_B < 60) { //
                return "刚刚"; //A_B+"秒前";
            } else {
                A_B = parseInt(A_B / 60);
                if (A_B < 60) { //
                    return  A_B+"分钟前";
                } else {
                    A_B = parseInt(A_B / 60);
                    if (A_B < 60) {
                        return A_B+"小时前";
                    }
                }
            }
        } else {
            if (d <2) {
                return "昨天";
            } else if (d<365){
                return dateStrBefore.replace(/\-/g, '/').substring(5, 10); //显示日期
                //return dateStrBefore; //显示到秒
            }

        }
    },
    diffDay_two: function(dateStrBefore, dateStrAfter) {
        var dateStrBefore1 = dateStrBefore.substr(0, 10);
        var dateStrAfter1 = dateStrAfter.substr(0, 10);

        var dateStrBefore2 = dateStrBefore1.replace(/\-/g, '/');
        var dateStrAfter2 = dateStrAfter1.replace(/\-/g, '/');

        var days = 1000 * 60 * 60 * 24;
        var day1 = Date.parse(dateStrBefore2);
        var day2 = Date.parse(dateStrAfter2);
        if (isNaN(day1)) {
            //alert(dateStrBefore + "格式不正确");
            return NaN;
        }
        if (isNaN(day2)) {
            //alert(dateStrAfter + "格式不正确");
            return NaN;
        }
        var d = (day2 - day1) / days;
        if (d > 7) {
            //return dateStrBefore; //显示到秒
            return dateStrBefore.substr(0, 10); //显示日期
        } else {
            return "7天前";
        }
    },
    date_word: function(a) {
        var year = a.substr(0, 4);
        var month = a.substr(5, 2);
        var day = a.substr(8, 2);
        if (month < 10) {
            month = month.substr(1, 1);
        }
        if (day < 10) {
            day = day.substr(1, 1);
        }
        a = year + "年" + month + "月" + day + "日";
        return a;
    },
    datafomat: function(tar) {
        var obj = tar;
        var text;
        obj.each(function(i) {
            text = date_word(obj.eq(i).html());
            obj.eq(i).html(text.substring(text.indexOf('年') + 1));
        });
    },
    dateJoint: function(date1, date2, sign, middleJoint) { //date1开始时间，date2结束时间

        var result;
        var signal = (sign != undefined && sign != "") ? sign : '.'; //
        var mJoint = (middleJoint != undefined && middleJoint != "") ? middleJoint : "-";
        var d1 = date1.substring(0, 10).replace(/-/g, signal);
        var d1Arr = d1.toString().split(signal);
        var d2 = date2.substring(0, 10).replace(/-/g, signal);
        var d2Arr = d2.toString().split(signal);
        if (parseInt(d2Arr[0]) > parseInt(d1Arr[0])) { //如果跨年
            result = d1 + mJoint + d2;
        } else { //同一年
            if (parseInt(d2Arr[1]) > parseInt(d1Arr[1])) { //如果结束月份大于开始月份
                result = d1 + mJoint + d2.substring(5, 10);
            } else {
                result = d1 + mJoint + d2.substring(8, 10);
            }
        }
        return result;
    }
};


common.ymd=function(opt) {
    var monthArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //出始化年
    var dDate = new Date(),
        dCurYear = dDate.getFullYear(),
        str = "";

    if (opt.default1) {
        opt.year.css(opt.css);

    }
    for (var i = dCurYear; i >= (opt.startYear ? opt.startYear : 1930); i--) {
        if (i == (opt.order ? 1970 : dCurYear)) {
            str = "<option value=" + i + " selected=true>" + i + "</option>";
        } else {
            str = "<option value=" + i + ">" + i + "</option>";
        }
        opt.year.append(str);
        if (opt.defaultYear) {
            opt.year.val(opt.defaultYear)
        }
    }
    //出始化月
    if (opt.defaultMonth) {
        opt.month.css(opt.css);
    }

    if (opt.month) {
        for (var i = (opt.startMonth ? opt.startMonth : 1); i <= (opt.endMonth ? opt.endMonth : 12); i++) {
            if (i == (opt.order ? 7 : (dDate.getMonth() + 1))) {
                str = "<option value=" + (i < 10 ? "0" + i : i) + " selected=true>" + (opt.en ? monthArr[i - 1] : (i < 10 ? "0" + i : i)) + "</option>";
            } else {
                str = "<option value=" + (i < 10 ? "0" + i : i) + ">" + (opt.en ? monthArr[i - 1] : (i < 10 ? "0" + i : i)) + "</option>";
            }
            opt.month.append(str);
        }
    }
    if (opt.defaultMonth) {
        opt.month.val(opt.defaultMonth);
    }
    //调用函数出始化日
    if (opt.day) {
        TUpdateCal(opt);
        opt.year.bind("change", function() {
            if (opt.month.val() != "0") {

                TUpdateCal(opt);
            }
        });
        opt.month.bind("change", function() {
            TUpdateCal(opt);

        });
    }
    if (opt.defaultDay) {
        opt.day.val(opt.defaultDay);
    }
    function TGetDaysInMonth(year, month) {
        month = parseInt(month, 10);
        var dPrevDate = new Date(year, month, 0);
        return dPrevDate.getDate();
    }

    function TUpdateCal(opt) {
        var dDate = new Date();
        daysInMonth = TGetDaysInMonth(opt.year.val(), opt.month.val());
        str = "";
        n = "";
        $("option", opt.day).each(function(i, em) {

            if ($(em).attr("selected")) {
                n = $(em).val();
                if (n < 10) {
                    n = n.substring(1);
                }
                return;
            }
        })
        // opt.day.empty();
        if (opt.default1) {
            opt.day.css(opt.css);

        }

        for (var d = ((opt.month.val() == 05 && opt.startDay) ? opt.startDay : 1); d <= ((opt.month.val() == 10 && opt.endDay) ? 30 : parseInt(daysInMonth)); d++) {

            if (d == (n ? n : (opt.order ? 1 : dDate.getDate()))) {
                str = "<option value=" + (d < 10 ? "0" + d : d) + " selected=true>" + (d < 10 ? "0" + d : d) + "</option>";
            } else {
                str = "<option value=" + (d < 10 ? "0" + d : d) + ">" + (d < 10 ? "0" + d : d) + "</option>";
            }
            opt.day.append(str);
        }
    }
}


//时间匹配
function gettime(obj, time) {
    if (time) {
        obj.find("option").each(function(i, val) {
            if ($(val).val() == time) {
                $(val).attr("selected", true);
                return;
            }
        });
    }

};
//时间判断
function checkEndTime(startTime, endTime) {
    //var start=new Date(startTime.replace(/\-/g, "\/"));
    //var end=new Date(endTime.replace(/\-/g, "\/"));
    if (endTime) {
        var start = new Date(startTime.substring(0, 4), startTime.substring(5, 7), startTime.substring(8, 10), "", "", "");
        var end = new Date(endTime.substring(0, 4), endTime.substring(5, 7), endTime.substring(8, 10), "", "", "");
        if (end < start) {
            return false;
        }
    }
    return true;
}
//格式化英文的月份
function getEnTime(opt) {
    year = monthEn = day = '';
    if (opt.date) {
        year = opt.date.substring(0, 4);
        month = opt.date.substring(5, 7);
        if (month < 10) {
            monthEn = monthArr[month.substring(1) - 1];
        } else {
            monthEn = monthArr[month - 1];
        }
        day = opt.date.length > 7 ? opt.date.substring(8, 10) : 01;

    }
    return {
        'year': year,
        'month': monthEn,
        'day': day
    }
}
 //时间 2017年05月08日 星期一 14:20
function orderTimeDeals(op){
    var _operationTime = ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
        _timeDeal = op.substring(0,10).replace(/\-/g, "\/"),
        _timesList = new Date(_timeDeal).getDay(),
        _timeCompare =op.substring(0,4)+"年"+op.substring(5,7)+"月"+op.substring(8,10)+"日", //  2017年05月08日 星期一 14:20
        _timeCompares =op.substring(5,7)+"月"+op.substring(8,10)+"日",                       //  05月08日 星期一 14:20
        _week = _operationTime[_timesList],
        _hours = op.substring(11,16);
    return {year:_timeCompare,years:_timeCompares,week:_week,hour:_hours};
}

function MillisecondToDate(msd) {
    var time = parseFloat(msd) /1000;
    if (null!= time &&""!= time) {
        if (time >60&& time <60*60) {
            time = parseInt(time /60.0) +"分钟";//+ parseInt((parseFloat(time /60.0) -parseInt(time /60.0)) *60) +"秒";
        }else if (time >=60*60&& time <60*60*24) {
          time = parseInt(time / 3600.0) + "小时"
            // time = parseInt(time /3600.0) +"小时"+ parseInt((parseFloat(time /3600.0) -
            //         parseInt(time /3600.0)) *60) +"分钟";//+
                // parseInt((parseFloat((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60) -
                //     parseInt((parseFloat(time /3600.0) - parseInt(time /3600.0)) *60)) *60) +"秒";
        }else {
            time = parseInt(time) +"秒";
        }
    }else{
        time = "0 时 0 分0 秒";
    }
    return time;

}

//时间倒计时
common.countDown=function (Obj){
    var inn=window.setInterval(function(){
        var day=0,
            hour=0,
            minute=0,
            second=0;//时间默认值
        if(Obj.timeNum > 0){
            day = Math.floor(Obj.timeNum / (60 * 60 * 24));
            hour = Math.floor(Obj.timeNum / (60 * 60)) - (day * 24);
            minute = Math.floor(Obj.timeNum / 60) - (day * 24 * 60) - (hour * 60);
            second = Math.floor(Obj.timeNum) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
        } else {
            Obj.countDownEnd();
            clearInterval(inn);
        }
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        switch (Obj.timeType){
            case 1:
                Obj.second.text(second);
                break;
            case 2:
                Obj.minute.text(minute);
                Obj.second.text(second);
                break;
            case 3:
                Obj.hour.text(hour);
                Obj.minute.text(minute);
                Obj.second.text(second);
                break;
            case 4:
                Obj.day.text(day);
                Obj.hour.text(hour);
                Obj.minute.text(minute);
                Obj.second.text(second);
                break;
        }
        Obj.timeNum--;
    }, 1000);
};
