/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 2017/5/15.
 */
$(function () {
    var controller = {
        init: function () {
            this.getBrowseType();//获取浏览器类型
            this.downloadBtn();//点击下载按钮
            // this.appWakeUp();
            // $(".header-icon").text(navigator.userAgent.toLowerCase());
            // $(".footer-icon").text(this.config.browseType + "1");
            // alert();
        },
        config: {},
        template: {},
        path: {},
        //获取浏览器类型
        getBrowseType: function () {
            var that = this;
            that.config.browseType = common.weixin.isWXBrowse();
        },
        //点击下载按钮
        downloadBtn: function () {
            var that = this;
            $(".page-button").on("click", function () {
                var download = {
                    other: that.otherEvent,
                    androidWX: that.androidEvent,
                    iphoneWX: that.iosEvent
                };
                download[that.config.browseType]();
            })


        },
        //android上的点击事件
        androidEvent: function () {
            $(".ad-tip-icon").show();
            $(".page-tips").show();
        },
        //ios上的点击事件
        iosEvent: function () {
            $(".ios-tip-icon").show();
            $(".page-tips").show();
        },
        //跳转app或者下载app
        otherEvent: function () {
            //公共的app启动的方法
            common.bindCallApp({
                ios: "tocuredt://cn.tocure.dt",
                android: "tocuredt://cn.tocure.dt",
                ele: ".page-button"
            }, {
                androidUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=cn.tocure.dt",
                iosUrl: "https://itunes.apple.com/cn/app/%E5%94%AF%E5%8C%BB%E4%BC%9A%E8%AF%8A/id1186165348?mt=8",
                androidImgPath: "/image/img00/downloadPage/ad-icon.png",
                iosImgPath: "/image/img00/downloadPage/ios-icon.png"
            });
        },
        // appWakeUp: function () {
        //     common.bindCallApp({
        //         ios: "tocuredt://cn.allinmed.dt",
        //         android: "tocuredt://cn.allinmed.dt",
        //         ele: ".page-button"
        //     }, {
        //         androidUrl: "http://a.app.qq.com/o/simple.jsp?pkgname=net.medplus.social",
        //         iosUrl: "https://itunes.apple.com/cn/app/yi-zhan/id1079377173?mt=8",
        //         androidImgPath: "/image/img00/downloadPage/ad-icon.png",
        //         iosImgPath: "/image/img00/downloadPage/ios-icon.png"
        //     });
        // }

    };
    controller.init();
});
