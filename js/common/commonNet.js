/**
 * @name:
 * @desc:网络，域名相关
 * @example:
 * @depend:
 * @date: 2017/1/22
 * @author: qiangkailiang
 */
//获取Url上的query
common.getpara = function (symbol) //获取参数的函数
{
    var url = window.location.origin + window.location.pathname + window.location.search;

    var param = {};
    var str, item;
    if (url.lastIndexOf(symbol ? symbol : "?") > 0) {
        str = url.substring(url.lastIndexOf(symbol ? symbol : "?") + 1, url.length);
        var arr = str.split("&");
        for (var i = 0; i < arr.length; i++) {
            item = arr[i].split("=");
            param[item[0]] = decodeURIComponent(item[1]);
        }
    }
    return param;
};
//键值对内容拼为query
common.buildAnchor = function (obj) {
    if (obj && obj != null && !$.isEmptyObject(obj)) {
        var a = window.location.pathname + location.search;
        if (a.indexOf("#") < 0) {
            a += "#";
        }
        for (var key in obj) {
            a += "&" + key + "=" + obj[key];
        }
        if (a.indexOf("share=app" > 0)) {
            a += "&share=app";
        }
        if (a.indexOf("visitSiteId") > 0) {
            var visitSiteId = common.getparaNew().visitSiteId;
            a += "&visitSiteId=" + visitSiteId;
        }
        window.location.href = a;
    } else {
        return;
    }
};
//获取参数的函数
common.getparaNew = function () {
    var url = document.URL;
    var param = {};
    var str, item;
    str = url;
    if (url.lastIndexOf("?") > 0) {
        str = url.substring(url.lastIndexOf("?") + 1, url.length);
    }
    if (url.lastIndexOf("#") > 0) {
        str = str.split("#")[0];
    }
    if (url.indexOf("=") == "-1") {
        return false;
    }
    if (str.length > 0) {
        var arr = str.split("&");
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                item = arr[i].split("=");
                param[item[0]] = decodeURIComponent(item[1]);
            }
            return param;
        }
        return false;
    }
    return false;
};


common.recognizeAppShareLink = function (callAppOptions) {
    if (common.getparaNew() && common.getparaNew().share && (common.getparaNew().share.toLowerCase() == "app")) {

        var $content = $(".content-page");
        if ($content.size() == 0) {
            $content = $("body");
        }
        $content.append("<div class='app_download_wx_jump_app'><div class='bg'></div><div class='center'><img src='/images/img50/callApp/share-app-popup.png' alt='' ></div></div>");

        var vp = document.querySelector('meta[name="viewport"]').getAttribute('content');

        var scale = vp.match(/initial\-scale=([\d\.]+)/) || vp.match(/maximum\-scale=([\d\.]+)/);
        if (scale != null && parseInt(scale[1]) == 1) {
            $(".app_download_wx_jump_app").addClass("viewport-small");
        }
        $("video,input,select,textarea,object").hide(); // 隐藏某些不受z-index控制的元素。    当前层 z-index 10050

        // 扩展之前页面上已存在的唤醒参数
        if (typeof callAppOptions != "undefined") { // 若存在定义
            callAppOptions = $.extend(callAppOptions, {el: ".app_download_wx_jump_app .center"});
        } else {
            var callAppOptions = {
                el: ".app_download_wx_jump_app .center",
                ios: "allinmdios://",
                ios9: "http://app.allinmd.cn/applinks.html",
                android: "allin://com.allin.social:75235"
            }
        }
        common.bindCallApp(callAppOptions);

        $("body").css("overflow", "hidden").on("mousemove touchmove", function (e) {
            return false;
        });
        return true; // 分享的链接          7-26      http://cooperation.allinmd.cn/redmine/issues/14431
    } else {
        return false; // 非分享的链接         7-26
    }
};
//Ajax请求方法
/*
 * options
 *       url 请求地址
 *       type 请求方式
 *       data 请求参数
 *       hasDataCallback 有数据的回调
 *       noDataCallback 无数据的回调
 *       successCallback 请求成功的回调
 *       failCallback 请求失败回调
 *
 *       tips：以上回调均是可传可不传的
 * */

common.ajax = function (options) {
    $.ajax({
        url: options.url,
        type: options.type,
        dataType: 'json',
        data: options.data,
        timeout: 10000,
        beforeSend: function () {
            common.loading.show();
        }
    })
        .done(function (data) {
            console.log("success");
            if (!$.isEmptyObject(data.responseObject.responseData)) {
                options.hasDataCallback && options.hasDataCallback();
            } else {
                options.noDataCallback && options.noDataCallback();
            }
            options.successCallback && options.successCallback();
        })
        .fail(function () {
            console.log("XHR error...");
            common.loading.hide();
            options.failCallback && options.failCallback();
        });
};
//是否江浙沪地区
common.checkJiangZheHu = function () {
    if (this.cache) {
        return this.cache;
    } else {
        var rst = false;
        var cookieLogin = $.cookie("accessLoginVersion");
        if (cookieLogin == "" || cookieLogin == null) {
            $.ajax({
                url: "/call/log/op/location/getIpArea/",
                async: false,
                success: function (data) {
                    if (data && data.responseObject && data.responseObject.responseData) {
                        //if ("zhejiang,jiangsu,shanghai".indexOf(data.responseObject.responseData.city.toLowerCase()) > 0) {
                        if (data.responseObject.responseData.isNew == "1") {
                            rst = true;
                            $.cookie("accessLoginVersion", "planB");
                        } else {
                            $.cookie("accessLoginVersion", "planA");
                        }

                    }
                }
            });
        } else {
            if (cookieLogin == "planB") {
                rst = true;
            }
        }
        this.cache = rst;
        return rst;
    }
};
//是否你国地区
common.checkIsChina = function () {
    if (this.cache) {
        return this.cache;
    } else {
        var rst = false;
        var cookieLogin = $.cookie("accessLoginCountry");
        if (cookieLogin == "" || cookieLogin == null) {
            $.ajax({
                url: "/mcall/log/op/location/getIpArea/",
                async: false,
                success: function (data) {
                    if (data && data.responseObject && data.responseObject.responseData) {
                        //if ("zhejiang,jiangsu,shanghai".indexOf(data.responseObject.responseData.city.toLowerCase()) > 0) {
                        if (data.responseObject.responseData.countryCode == "CN") {
                            rst = true;
                            $.cookie("accessLoginCountry", "CN");
                        } else {
                            $.cookie("accessLoginCountry", "NotCN");
                        }
                    }
                }
            });
        } else {
            if (cookieLogin == "CN") {
                rst = true;
            }
        }
        this.cache = rst;
        return rst;
    }
};

//Localstorate操作方法
var TempCache = {
    cache: function (value) {
        localStorage.setItem("EasyWayTempCache", value);
    },
    getCache: function () {
        return localStorage.getItem("EasyWayTempCache");
    },
    setItem: function (key, value) {
        localStorage.setItem(key, value);
    },
    getItem: function (key) {
        var item = localStorage.getItem(key);
        if (key && key == "fromPage") // 来源页面只能获取一次
            localStorage.removeItem(key);
        return item;
    },
    removeItem: function (key) {
        return localStorage.removeItem(key);
    },
    clear: function () {
        var wxBrowseAccessLockOn = localStorage.getItem("wxBrowseAccessLockOn");
        localStorage.clear();
        localStorage.setItem("wxBrowseAccessLockOn", wxBrowseAccessLockOn);
    }
};

//百度数据统计
(common.baiduData = function () {
    var _hmt = _hmt || [];
    (function () {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?0777718947202f393a9c7b7b449a3fd5";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
})();




common.getparaNew=function () {//获取参数的函数
    var url = document.URL;
    var param = {};
    var str, item;
    str = url;
    if (url.lastIndexOf("?") > 0) {
        str = url.substring(url.lastIndexOf("?") + 1, url.length);
    }
    if (url.lastIndexOf("#") > 0) {
        str = str.split("#")[1];
    }
    if (url.indexOf("=") == "-1") {
        return false;
    }
    if (str.length > 0) {
        var arr = str.split("&");
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                item = arr[i].split("=");
                param[item[0]] = decodeURI(item[1]);
            }
            return param;
        }
        return false;
    }
    return false;
};