/*
create by lichenyang
* */
var Log = {};
var LogPageId = [{id: 1, desc: "浏览首页"}, {id: 2, desc: "浏览视频应用页"}, {id: 3, desc: "浏览文库应用页"}, {
	id: 4,
	desc: "浏览视频内容页"
}, {id: 5, desc: "浏览文库内容页"}, {id: 6, desc: "浏览个人主页"}, {id: 7, desc: "浏览个人首页"}, {id: 8, desc: "浏览个人资料页"}, {
	id: 9,
	desc: "浏览话题内容页"
}, {id: 10, desc: "浏览病例内容页"}];
/*
 window.onload=Log.createBrowse(1,"首页"); //	浏览日志
 window.onload=Log.createBrowse(2,"视频应用页"); //	浏览日志
 window.onload=Log.createBrowse(3,"文库应用页"); //	浏览日志
 window.onload=Log.createBrowse(4,"视频内容页"); //	浏览日志
 window.onload=Log.createBrowse(5,"文库内容页"); //	浏览日志
 window.onload=Log.createBrowse(6,"个人主页(个人中心)"); //	浏览日志
 window.onload=Log.createBrowse(7,"个人首页"); //	浏览日志
 window.onload=Log.createBrowse(8,"个人资料页"); //	浏览日志
 window.onload=Log.createBrowse(9,"话题内容页"); //	浏览日志
 window.onload=Log.createBrowse(10,"病例内容页"); //	浏览日志
 window.onload=Log.createBrowse(11,"会场页面"); //	浏览日志
 window.onload=Log.createBrowse(17, "视频列表页面"); //	浏览日志
 window.onload=Log.createBrowse(18, "文库列表页面"); //	浏览日志
 window.onload=Log.createBrowse(30,"医师频道页"); //	浏览日志
 window.onload=Log.createBrowse(31,"医师列表页"); //	浏览日志
 window.onload=Log.createBrowse(32,"搜索页"); //	浏览日志
 */

Log.urlList = {
	createBrowse: "/mcall/log/tocure/customer/browse/v1/createBrowse/",	// 创建浏览记录
	updateLeave: "/mcall/log/tocure/customer/browse/v1/updateLeave/"	// 更新浏览记录－离开页面时间
};
Log.logId = "";
Log.isClose = false;
Log.execute = function (funcName, paramJson) {
	var t = Log;
	var url = t.urlList[funcName];
	var responseData = null;
	var param = {};
	if (paramJson && paramJson != "") {
		param.paramJson = $.toJSON(paramJson);
	} else {
		//param.paramJson= "{}";
	}
	$.ajax({
		type: 'POST',
		url: url,
		data: param,
		dataType: "json",
		async: true,//(paramJson.async == true) ? true : false,
		timeout: 10000,
		success: function callback(rep) {
			if (rep && rep.responseObject) {
				responseData = rep.responseObject;
			} else {
				responseData = rep;
			}
			if (responseData)
				Log.logId = responseData.responseData.rowKey
		},
		error: function () {
		}
	});

	return responseData;
};

Log.getCookie = function (Name) {
	var cookieName = encodeURIComponent(Name) + "=",  //注cookie的名和值都是经过URL编码的,所有这里要用函数编码
	returnvalue = "",
	cookieStart = document.cookie.indexOf(cookieName),
	cookieEnd = null;
	if (cookieStart > -1) {
		cookieEnd = document.cookie.indexOf(";", cookieStart);
		if (cookieEnd == -1) {
			cookieEnd = document.cookie.length;
		}
		returnvalue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));  //对应的解码
	}
	return returnvalue;
};
// 获取系统信息
Log.getOS=function () {
    var ua = navigator.userAgent;
    if (ua.indexOf("Windows NT 5.1") != -1) return "Windows XP";
    if (ua.indexOf("Windows NT 6.0") != -1) return "Windows Vista";
    if (ua.indexOf("Windows NT 6.1") != -1) return "Windows 7";
    if (ua.indexOf("Windows NT 6.3") != -1) return "Windows 8";
    if (ua.indexOf("Windows NT 6.4") != -1) return "Windows 10";
    if (ua.indexOf("Windows NT 10.0") != -1) return "Windows 10";
    if (ua.indexOf("(Macintosh;") != -1) return "Macbook";
    if (ua.indexOf("iPhone") != -1) return "iPhone";
    if (ua.indexOf("iPad") != -1) return "iPad";
    if (ua.indexOf("Linux") != -1) {
        var index = ua.indexOf("Android");
        if (index != -1) {
//os以及版本
            var os = ua.slice(index, index + 13);
//手机型号
            var index2 = ua.indexOf("Build");
            var type = ua.slice(index + 1, index2);
            return type + os;
        } else {
            return "Linux";
        }
    }
    return "未知操作系统";
};
//获取时间
Log.localTime = function () {
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
};
Log.getPage = function (id) {
	var len = LogPageId.length;
	var page = null;
	for (var i = 0; i < len; i++) {
		var pageObj = LogPageId[i];
		if (pageObj != null && pageObj.id != null && pageObj.id == id) {
			page = pageObj;
		}
	}
	return page;
};

/**
 * 浏览记录
 * browseType:1-主页，2-视频应用页,3-文库应用页,4-视频内容页,5-文库内容页,6-个人主页,7-个人首页,8个人资料页
 */
Log.createBrowse = function (browseType, browseDesc, url) {
	var t = Log;
	var broseUrl;
	if (url != undefined) {
		broseUrl = url;
	} else {
		broseUrl = window.location.href.substr(0, 250);
	}

	var param = {
        customerId:common.getpara().customerId || "",//用户id
	    browseUrl: broseUrl,//浏览url
        browseType: browseType,//浏览类型
        openTime:Log.localTime(),//打开时间
        browseDesc: browseDesc,//对应页面类型描述
        opAdvice:Log.getOS(),//设备(手机型号),系统版本号(android10),应用版本号
        deviceToken:"",//	设备token
        isValid:1//是否有效
	};
	var openPage = "";//t.getCookie("openPage");
	if (openPage == null || openPage == "") {
		t.execute("createBrowse", param);
		var exp = new Date();
		exp.setTime(exp.getTime() + 20 * 1000);
		document.cookie = "openPage=on;expires=" + exp.toGMTString();
	}

};

/**
 * 离开页面记录
 */
Log.updateLeave = function () {
	if (Log.logId && Log.logId != "") {
		var param = {rowKey: Log.logId, leaveTime: Log.localTime()};
		Log.execute("updateLeave", param);
		Log.logId = "";
	}
};

window.onbeforeunload = function (evt) {
	Log.updateLeave();
};

/*
 window.onload=function(evt){
 if(getCookie("openPage")=="" && pageId !="" ){
 var page=Log.getPage(pageId);
 if(page!=null && page.id!=null && page.id!=""){
 Log.createBrowse(page.id,page.desc); //	浏览日志
 document.cookie="openPage=on;"
 pageId="";
 }
 }

 }
 */
//加url不同加部分日志
(function addLog(){
     var url = window.location.href.split(':')[1];
     switch(url.split('?')[0]){ //防止加了sps之后带参数
		 case "//m.allinmd.cn/pages/personal/personal_browsed.html":
			 Log.createBrowse(98,'浏览记录');
			 break;
         case "//m.allinmd.cn/pages/personal/personal_myComment.html":
             Log.createBrowse(99,'我的评论');
             break;
         case '//m.allinmd.cn/pages/personal/customerInfoEdit.html':
             Log.createBrowse(102,'简介编辑页');
             break;
		 case '//m.allinmd.cn/pages/personal/authInfo.html':
			 Log.createBrowse(103,'认证信息编辑页');
			 break;
         case '//m.allinmd.cn/pages/personal/setting.html':
             Log.createBrowse(104,'设置页面');
             break;
         case '//m.allinmd.cn/pages/personal/securityAccount.html':
             Log.createBrowse(105,'账号安全');
             break;
         case '//m.allinmd.cn/pages/personal/bindMobile.html':
             Log.createBrowse(107,'绑定手机');
             break;
         case '//m.allinmd.cn/pages/personal/bindCAOS.html':
             Log.createBrowse(109,'绑定CAOS');
             break;
         case '//m.allinmd.cn/pages/personal/updatePassword.html':
             Log.createBrowse(110,'密码修改');
             break;
         case '//m.allinmd.cn/pages/discover/discover_sendMsg.html':
             Log.createBrowse(112,'专题反馈页');
             break;
         case '//m.allinmd.cn/pages/personal/feedBack.html':
             Log.createBrowse(113,'意见反馈页');
             break;
         case '//m.allinmd.cn/pages/discover/discover_addMaster.html':
             Log.createBrowse(114,'权威专家申请页');
             break;
         case '//m.allinmd.cn/pages/personal/friends_recommend.html':
             Log.createBrowse(123,'推荐医师');
             break;
         case '//m.allinmd.cn/pages/personal/sns.html?action=fans':
             Log.createBrowse(124,'粉丝列表');
             break;
         case '//m.allinmd.cn/pages/personal/sns.html?action=praise':
             Log.createBrowse(127,'点赞列表');
             break;
         case '//m.allinmd.cn/pages/personal/sns.html?action=follow':
             Log.createBrowse(126,'关注医师列表');
             break;
         case '//m.allinmd.cn/pages/service/service.html':
             Log.createBrowse(146,'服务条款');
             break;
         case '//m.allinmd.cn/pages/service/privacy.html':
             Log.createBrowse(145,'隐私声明');
             break;
         case '//m.allinmd.cn/pages/personal/about.html':
             Log.createBrowse(147,'关于我们');
             break;
     }

     if(/\/\/m.allinmd.cn\/pages\/personal\/updateEmail.html/.test(url)){
         Log.createBrowse(108,'绑定邮箱');
     }else if(/others_sns.html\?action=fans/.test(url)){
         Log.createBrowse(125,'TA的粉丝列表');
     }else if(/discover_tagFollowers.html\?tId/.test(url)){
         Log.createBrowse(130,'关注此标签的人');
     }else if(/regist_tag.html/.test(url)){
         Log.createBrowse(141,'兴趣标签选择');
     }else if(/works_details.html\?activityId/.test(url)){
         Log.createBrowse(81,'活动资源列表');
     }else if(/personal_center.html\?activityId/.test(url)){
         Log.createBrowse(82,'活动-我的作品');
     }else if(/activity_details.html\?activityId/.test(url)){
         Log.createBrowse(80,'活动介绍');
     }else if(/pages\/column\/data_cube2\/index.html/.test(url)){
         Log.createBrowse(158,'医师年终账单');
     }else if(/social.html/.test(url)){
         Log.createBrowse(138,'社会任职页');
     }else if(/education.html/.test(url)){
         Log.createBrowse(133,'教育背景页');
     }else if(/cEducation.html/.test(url)){
         Log.createBrowse(135,'继续教育页');
     }else if(/honor.html/.test(url)){
         Log.createBrowse(136,'获得荣誉页');
     }else if(/fund.html/.test(url)){
         Log.createBrowse(137,'科研基金页');
     }else if(/patent.html/.test(url)){
         Log.createBrowse(140,'发明专利页');
     }else if(/opus.html/.test(url)){
         Log.createBrowse(139,'学术专著页');
     }

 })();