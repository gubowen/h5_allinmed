/**
 * @name:
 * @desc:文件/上传相关
 * @example:
 * @depend:
 * @date: 2017/1/22
 * @author: qiangkailiang
 */
common.getFileSize = function (target) {
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var fileSize = 0;
    if (isIE && !target.files) {
        //          var filePath = target.value;
        //          var fileSystem = new ActiveXObject("Scripting.FileSystemObject");   ／／IE需要安全配置
        //
        //          if(!fileSystem.FileExists(filePath)){
        //             alert("附件不存在，请重新输入！");
        //             return;
        //          }
        //          var file = fileSystem.GetFile (filePath);
        //          fileSize = file.Size;
    } else {
        fileSize = target.files[0].size;
    }

    return fileSize;
};

common.file = {};
common.file.getFileSize = function (target) {
    var isIE = /msie/i.test(navigator.userAgent) && !window.opera;
    var fileSize = 0;
    if(target){
        if (isIE && !target.files) {
//            var filePath = target.value;
//            var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
//
//            if(!fileSystem.FileExists(filePath)){
//               alert("附件不存在，请重新输入！");
//               return;
//            }
//            var file = fileSystem.GetFile (filePath);
//            fileSize = file.Size;
        } else {
            fileSize = target.files[0].size;
        }
    }
    return fileSize  ;
};

//获取文件名不包括后缀
common.file.getName = function (obj) {
    var path = obj//obj.val();
    var pos1 = path.lastIndexOf('/');
    var pos2 = path.lastIndexOf("\\");
    var pos3 = Math.max(pos1, pos2);
    var pos4 = path.lastIndexOf(".");
    var fileName = path.substring(pos3 + 1, pos4);
    var suffixName = path.substring(pos4 + 1, path.length);
    return {
        "fileName": fileName,   //文件名
        "suffixName": suffixName //文件后缀
    };
};

/**
 * @Desc：绑定唤醒APP的按钮
 * @Usage:Common.bindCallApp({ios:"",android:"",ele:"#element"},{
        androidUrl:"http://a.app.qq.com/o/simple.jsp?pkgname=net.medplus.social",
        iosUrl:"https://itunes.apple.com/cn/app/yi-zhan/id1079377173?mt=8",
        androidImgPath :"//m.medplus.net/image/callApp/android.png",
        iosImgPath : "//m.medplus.net/image/callApp/ios.png"
    });
 * @Notify： options {Object,runAtOnce:true，android,ios,ios9,el} 表示地址。必须至少包含一个属性：ios,或 android,
 * @Depend：  jquery  下面注释的css样式内容,及对应的图片,修改对应的Scheme地址
 * Created by WangNing on 2017/3/15.
 */

///*app唤醒 微信 样式*/
//.app_download_wx {
//    width: 100%;
//    height: 100%;
//    background: #efeff4;
//    position: fixed;
//    top: 0;
//    left: 0;
//    z-index: 101;
//}
//.app_download_wx img {
//    width: 100%;
//    height:100%
//}

common.bindCallApp=function(options,config) {
    if (typeof options != "object") {
        log();
        return;
    }
    if (!options.hasOwnProperty("ios") && !options.hasOwnProperty("android")) {
        log();
        return;
    }
    var u = window.navigator.userAgent;
    var isWeixin = /MicroMessenger/.test(u);
    var isIOS9 = false;
    var isIOS9_0_or_1 = false;
    isIOS9 = Boolean(navigator.userAgent.match(/OS ([9]_[2-9]|[10|11][_\d])[_\d]* like Mac OS X/i)); // ios9.2之前的版本，
    isIOS9_0_or_1 = Boolean(navigator.userAgent.match(/OS ([9]_[0-1])[_\d]* like Mac OS X/i)); // ios9.2之前的版本，
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
    var isIphone = u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1;
    var isWeibo = u.indexOf('weibo') > -1 || u.indexOf('Weibo') > -1;
    var isQQBrowser = u.indexOf('QQ') > -1;
    var StartTime;
    var elements;
    var timeoutsArr = [];
    var url = getUrl();
    /**
     *  获取对应版本的 schema 地址
     * */
    function getUrl() {
        var url = "";
        var u = navigator.userAgent;
        if (isAndroid) {
            if (options.android != undefined) {
                url = options.android;
            }
        }
        if (isIphone) {
            if (options.ios != undefined) {
                url = options.ios;
            }
        }
        return url;
    }
    $(window).on("blur pagehide beforeunload", clearTimeouts);
    function clearTimeouts() {
        timeoutsArr.forEach(window.clearTimeout);
        timeoutsArr = [];
    }
    // 针对ios9 如果跳至中转页面,返回后仍然没有打开.则尝试用schema再打开一次,若再打不开,再跳转至下载页
    if (typeof common.getparaNew().ios9 != "undefined") {
        tryOpen(url);
    }
    /*尝试直接打开*/
    if (typeof options.runAtOnce == "boolean" && options.runAtOnce) {
        if (isIOS9) {
            locationOpen(options.ios9);
        } else {
            tryOpen(url);
        }
    }
    /* 需要绑定按钮 */
    if (typeof options.ele == "string") {

        elements = options.ele;
        bindIng();
    }
    function bindIng() {
        if (isAndroid) {
            if (isWeibo || isWeixin) {
                $(elements).on("click", function () {

                    showWeixinGuide("android");
                });
            } else {
                bindOpen();
            }
        }
        debugger;

        if (isIphone) {
            if (isIOS9) { // ios9直接显示加链接
                bindOpen(options.ios9);
            } else { //ios9以下 的话;          */
                if (isWeixin || isWeibo) {
                    $(elements).on("click", function () {
                        showWeixinGuide("ios");
                    });
                } else {
                    bindOpen(options.ios);
                }
            }
        }
    }
    function bindOpen(url) {

        $(elements).off("click").on("click", {url: url || ""}, function (event) {
            var url = event.data.url;
            StartTime = +(new Date);
            if (!url) {
                var url = getUrl();
            }
            tryOpen(url);
        });
    }
    /*尝试去打开*/
    function tryOpen(url) {
        if (!url)return;
        if (isIOS9) {
            locationOpen(url);
        } else {
            var u = url;
            window.setTimeout(function () {
                if (isIOS9_0_or_1) {
                    locationOpen(u);
                } else {
                    iframeOpen(u);
                }

            }, 0);
        }
        checkIfFail();
    }
    function iframeOpen(url) {
        var iframe = document.createElement("iframe");
        iframe.src = url;
        iframe.style.display = "none";
        document.body.appendChild(iframe);
        setTimeout(function () {
            document.body.removeChild(iframe);
            iframe = null
        }, 0);
    }
    function locationOpen(url) {
        window.location.href = url;
    }
    /**
     *  在不支持统一链接的微信内的话显示引导界面
     * */
    function showWeixinGuide(type) {
        var imgPath;
        if (type == "android") {
            imgPath =config.androidImgPath;
        } else {
            imgPath =config.iosImgPath;
        }
        var $content = $(".content-page");
        if ($content.length > 0) {
            $(".page-tips,.ad-tip-icon").show();
        } else {
            $(".page-tips,.ios-tip-icon").show();
        }
        $("body").css("overflow", "hidden").bind('touchmove', function (eve) {
            eve.preventDefault();
        });
        $(".app_download_wx").on("click", function () {
            $(this).remove();
            $("body").css("overflow", "auto").unbind('touchmove');
        });
    }
    /**
     * 检测是否失败
     * 失败后跳转到APP 下载
     * */
    function checkIfFail() {
        if (isAndroid) {
            timeoutsArr.push(window.setTimeout(function () {
                if (+(new Date) - StartTime < 3100) {
                    //window.location.href = "http://a.app.qq.com/o/simple.jsp?pkgname=net.medplus.social"; // app download url
                    window.location.href = config.androidUrl; // app download url
                }
            }, 3e3));
        } else {
            timeoutsArr.push(window.setTimeout(function () {
                console.log(Date.now() - StartTime);
                if (Date.now() - StartTime < 3100) {
                    if (isWeixin) {
                        window.location.href = config.androidUrl; // app download url
                    } else {
                        window.location.href = config.iosUrl; // app download url
                    }
                }
            }, 3e3));
        }
    }
    function log() {
        console.log("请传入要跳转的APP地址的参数对象，如：{ios:\"allinmdios://meettingBroadcast/meetInfo\",android:\"'allin://com.allin.social:75235?data=mydata\"}");
    }
};
