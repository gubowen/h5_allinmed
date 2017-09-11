/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/3/6
 */

common.weixin = {
    //微信强制授权认证
    init: function () {
        this.getCode();
    },
    //联合重定向接口获取code...
    getCode: function () {
        if (this.isWXBrowse() === "androidWX") { //

            if (localStorage.getItem("wxBrowseAccessLockOn") === null) {
                localStorage.setItem("wxBrowseAccessLockOn", "on");
            }

            if (localStorage.getItem("wxBrowseAccessLockOn") == "on") {
                localStorage.setItem("wxBrowseAccessLockOn", "off");
                var appId = "wxaa5288ad7f627608";
                var toUrl = "http://m.allinmed.cn/mcall/wx/allin/interact/view/?url=" + location.href;
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(toUrl) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
            }
        } else if (this.isWXBrowse() === "iphoneWX") {

            //cookie
            $.getCookie = function (key, options) {
                options = options || {};
                var result, decode = options.raw ? function (s) {
                    return s;
                } : decodeURIComponent;
                return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
            };

            $.setCookie = function (key, value, options) {
                options = $.extend({}, {
                    domain: '',
                    path: '/'
                }, options);
                //删除cookie操作处理
                if (value === null) {
                    options.expires = -1;
                }
                //设置过期时间
                if (typeof options.expires === 'number') {
                    var seconds = options.expires,
                        t = options.expires = new Date();
                    t.setTime(t.getTime() + seconds * 1000); //* 1000 * 60 * 60
                }
                //强制转换为字符串格式
                value = '' + value;
                //设置cookie信息
                return (document.cookie = [
                    key, '=',
                    options.raw ? value : value,
                    options.expires ? '; expires=' + options.expires.toUTCString() : '',
                    options.path ? '; path=' + options.path : '',
                    options.domain ? '; domain=' + options.domain : '',
                    options.secure ? '; secure' : ''
                ].join(''));
            };


            if (localStorage.getItem("wxBrowseAccessLockOn") === null) {
                localStorage.setItem("wxBrowseAccessLockOn", "on");
            }

            if ((typeof $.getCookie("wxBrowseAccessLockOn")) == "undefined" || $.getCookie("wxBrowseAccessLockOn") == null) {
                $.setCookie("wxBrowseAccessLockOn", "on");
            }
            if (localStorage.getItem("wxBrowseAccessLockOn") == "on" || $.getCookie("wxBrowseAccessLockOn") == "on") {
                localStorage.setItem("wxBrowseAccessLockOn", "off");
                $.setCookie("wxBrowseAccessLockOn", "off");
                var appId = "wxaa5288ad7f627608";
                var toUrl = encodeURIComponent(location.href);
                window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appId + "&redirect_uri=" + encodeURIComponent(toUrl) + "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
            }
        }
    },
    //判断微信浏览器...
    isWXBrowse: function () {
        var ua = navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf("iphone") > 0) {
            return "iphoneWX";
        } else if (ua.match(/MicroMessenger/i) == "micromessenger" && ua.indexOf("android") > 0) {
            return "androidWX";
        }
        return "other";
    },
    getToken: function () {
        var data={
            appid:"wxaa5288ad7f627608",
            secret:"", //安全考虑secret不能前端处理
            code:"",
            grant_type:"authorization_code"
        };
        $.ajax({
            url: "https://api.weixin.qq.com/sns/oauth2/access_token",
            type: 'POST',
            dataType: "json",
            timeout: 10000,
            data: data,
            beforeSend: function () {
                common.loading.show()
            }
        })
            .done(function (data) {
                console.log(data);
            })
            .fail(function () {
                console.log("XHR error...");
            });
    },
    //用户基本信息
    getUserInfo:function () {
        var data={
            access_token:"",
            openid:"",
            lang:""
        };
        $.ajax({
            url: "https://api.weixin.qq.com/sns/userinfo",
            type: 'GET',
            dataType: "json",
            timeout: 10000,
            data: data,
            beforeSend: function () {
                common.loading.show()
            }
        })
            .done(function (data) {
                console.log(data);

            })
            .fail(function () {
                console.log("XHR error...");
            });
    },
    //禁用微信内置分享---(如果想开放分享，则在url中拼接ishare=1)
    forbidShare:function(){
        $.ajax({
            url: "/mcall/wx/api/v1/getJSConfig/",
            type: 'POST',
            dataType: "json",
            data: {
                paramJson: $.toJSON({
                    url: window.location.href
                })
            },
            timeout: 10000,
            success: function (data) {
                if (data.responseObject.responseData) {
                    var item = data.responseObject.responseData;

                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: item.appId, // 必填，公众号的唯一标识
                        timestamp: item.timestamp, // 必填，生成签名的时间戳
                        nonceStr: item.noncestr, // 必填，生成签名的随机串
                        signature: item.signature,// 必填，签名，见附录1
                        jsApiList: [
                            "onMenuShareTimeline",
                            "hideOptionMenu",
                            "showOptionMenu",
                            "getNetworkType",
                            "getLocation",
                            "openLocation",
                            "chooseImage",
                            "previewImage",
                            "uploadImage",
                            "getLocalImgData",
                            "scanQRCode",
                            "hideMenuItems"
                        ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function(){
                        wx.hideMenuItems({
                            menuList: [
                                "menuItem:share:appMessage",
                                "menuItem:share:timeline",
                                "menuItem:share:qq",
                                "menuItem:share:weiboApp",
                                "menuItem:share:facebook",
                                "menuItem:share:QZone"
                            ] // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
                        });
                    });
                    wx.error(function(res){
                        console.log(res);
                    });
                }
            }
        })
    }
};
