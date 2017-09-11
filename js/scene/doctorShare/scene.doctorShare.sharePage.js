/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 2017/05/05
 */
$(function () {

    var controller = {
        init: function () {
            this.appNative();//app桥梁
            this.getBrowseType();//获取浏览器类型
            this.getUrlParam();//得到url参数保存起来
            this.addHtml();//加载DOM
            this.pageEvent();//页面事件
            //浏览器页面中让底部显示；
            this.config.isH5 && $(".main-footer").show();
        },
        config: {
          domainName:"//m.allinmed.cn",//app嵌套域名修改
        },
        template: {
            //获取医生信息dom
            doctorInfo:function (authMap,majorMapList,logoUrl) {
                var hospitalLevel = {
                    1:"三甲",
                    2:"三乙",
                    3:"三丙",
                    4:"二甲",
                    5:"二乙",
                    6:"二丙",
                    7:"一甲",
                    8:"一乙",
                    9:"一丙",
                    10:"一级"
                };
                return '<section class="info-left"><img class="doctor-icon" src="' + (logoUrl || "/image/img00/doctorShare/share_avatar_allin.png") +'" alt="医生头像"></section>'+
                    '<section class="info-right">'+
                    '<p class="info-top"><span class="doctor-name">' + (authMap.fullName || "") + '</span><span class="doctor-post">' + (authMap.medicalTitle || "") + '</span></p>'+
                    '<p class="info-middle"><span class="doctor-hospital">' + (authMap.company || "") + '</span>' + (parseInt(authMap.hospitalLevelId)&&'<span class="hospital-level">' + hospitalLevel[authMap.hospitalLevelId] + '</span>') + '</p>'+
                    // '<p class="info-bottom">' + (function () {
                    //     var tempHtml = '';
                    //     $.each(majorMapList,function (index,element) {
                    //         tempHtml += '<span class="subject-item">'+ element["majorName"] +'</span>'
                    //     });
                    //     return tempHtml;
                    // })() + '</p>'+
                    '</section>';
            }
        },
        path: {
            getDocMain:"/mcall/customer/auth/v1/getMapById/",//获取医生信息
            getHospital:"/mcall/customer/multipoint/practice/v1/getMapById2/",//获取医院
            getCode:"/mcall/wx/allinmed/interact/v1/createQrCodeTicket/"//获取医生二维码
        },
        //获取浏览器类型
        getBrowseType: function () {
            var that = this;
            that.config.browseType = common.weixin.isWXBrowse();
        },
        //得到url参数保存起来
        getUrlParam: function () {
            var that = this;
            var params = common.getpara();
            $.extend(that.config,params);
        },
        //加载DOM
        addHtml:function () {
            var that = this;
            //加载医生信息
            $.ajax({
                url: that.path.getDocMain,
                dataType:"json",
                type: "POST",
                data:{paramJson: $.toJSON({
                    customerId:that.config.customerId,
                    logoUseFlag:3
                })},
                success:function(data){
                    console.log(data);
                    // var items = data.responseObject.responseData.dataList;
                    if (data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList) {
                        var _dataList=data.responseObject.responseData.dataList[0];
                        console.log(_dataList);
                        //判断是否认证并且存起来给多点执政医院用
                        that.config.state = _dataList.authMap.state;
                        if(_dataList.authMap.state == 1 || _dataList.authMap.state == 2){
                            //把联系医生二维码存起来
                            // that.config.qrCodeUrl = _dataList.authMap.qrCodeUrl;
                            that.addCode();
                            //认证成功后查看时间按钮显示
                            $(".go-view-time").show();
                            //获取多点执医数据
                            that.addHospital();
                            document.title = _dataList.authMap.fullName + "医生";
                            // console.log(_dataList.authMap.fullName + "医生");
                            $(".doctor-info").append(that.template.doctorInfo(_dataList.authMap,_dataList.majorMapList,_dataList.logoUrlMap.logoUrl));
                            //擅长疾病详情
                            if (_dataList.illnessMapList) {
                                var illnessTemp = "";
                                $.each(_dataList.illnessMapList,function (index,element) {
                                    illnessTemp += element["illnessName"] + ";"
                                });
                                illnessTemp = illnessTemp.substr(0,illnessTemp.length-1) + "。";
                                $("#illnessDetail").html(illnessTemp);
                            }
                            //擅长手术详情
                            if (_dataList.operationMapList.length) {
                                var operationTemp = "";
                                $.each(_dataList.operationMapList,function (index,element) {
                                    operationTemp += element["operationName"] + ";"
                                });
                                operationTemp = operationTemp.substr(0,operationTemp.length-1) + "。";
                                $("#operationDetail").html(operationTemp);
                            }
                            //设置二维码链接和手术台数
                            if (_dataList.authMap){
                                //设置二维码
                                // $(".view-code img").attr("src",_dataList.authMap.qrCodeUrl);
                                //填写手术台数DOM
                                var dateTemp = new Date();
                                dateTemp.getFullYear()-1
                                var caseTemp = '<li class="operation-case-item"><span class="operation-case-year">'+ (dateTemp.getFullYear()-1) +  '手术病例数:</span><span class="operation-case-num">' + _dataList.authMap.yesteryearOperationNum + '台</span></li>'+
                                    '<li class="operation-case-item"><span class="operation-case-year">'+ (dateTemp.getFullYear()-2) +  '手术病例数:</span><span class="operation-case-num">' + _dataList.authMap.precedingYearOperationNum + '台</span></li>';
                                $(".operation-case-list").html(caseTemp);
                            }
                        } else {
                            that.addDefault();
                        }
                    } else if (data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseMessage=="NO DATA") {
                        that.config.state = "-1";
                        that.addDefault();
                    }

                },
                error:function(){

                }
            })

        },
        //添加默认数据
        addDefault:function () {
            //如果未认证，头部提示显示
            var that = this;
            document.title = "唯小宝";
            // if (that.config.state == -1) {
            //     $(".authentication-tips").show();
            //     //立即认证添加事件
            //     $("#goAuthentication").text("立即认证").on("click",function () {
            //         // window.location.href = "//m.toure.cn/pages/app_native/authentication.html?customerId=" + that.config.customerId;
            //     });
            // }
            that.config.state || that.config.state=="-1";
            switch (that.config.state) {
                case "-1":
                    $(".authentication-tips").show();
                    //立即认证添加事件
                    $("#goAuthentication").text("立即认证").on("click",function () {
                        // window.location.href = "//m.allinmed.cn/pages/app_native/authentication.html?customerId=" + that.config.customerId;
                    });
                    break;
                case "3":
                    $(".authentication-tips").show();
                    //立即认证添加事件
                    $("#goAuthentication").text("重新认证").on("click",function () {
                        // window.location.href = "//m.allinmed.cn/pages/app_native/authentication.html?customerId=" + that.config.customerId;
                    });
                    break;
                case "0":
                case "5":
                    $(".authentication-tips").show();
                    $(".in-authentication").css("display","block");
                    //立即认证添加事件
                    $("#goAuthentication").on("click",function () {
                        // window.location.href = "//m.allinmed.cn/pages/app_native/authentication.html?customerId=" + that.config.customerId;
                    });
                    break;
            }
            //医生的默认信息
            $(".doctor-info").append('<section class="info-left"><img class="doctor-icon" src="/image/img00/doctorShare/share_avatar_allin.png" alt="医生头像"></section>'+
                '<section class="info-right">'+
                '<p class="info-top"><span class="doctor-name">唯小宝</span><span class="doctor-post">副主任医师</span></p>'+
                '<p class="info-middle"><span class="doctor-hospital">唯医骨科智能分诊平台</span></p>'+
                // '<p class="info-bottom"><span class="subject-item">骨科</span></p>'+
                '</section>');
            //擅长疾病默认信息
            $("#illnessDetail").html("熟练掌握人工髋关节置换手术技术、人工膝关节置换手术技术；人工髋膝关节置换术后的翻修技术；股骨头坏死保关节直接有独到之处；人工髋关节置换术以及快速功能康复。");
            //擅长手术默认信息
            $("#operationDetail").html("熟练掌握人工髋关节置换手术技术、人工膝关节置换手术技术；人工髋膝关节置换术后的翻修技术；股骨头坏死保关节直接有独到之处；人工髋关节置换术以及快速功能康复。");
            //手术病例
            $(".operation-case-list").html('<li class="operation-case-item"><span class="operation-case-year">2016手术病例数:</span><span class="operation-case-num">100台</span></li>'+
                '<li class="operation-case-item"><span class="operation-case-year">2015手术病例数:</span><span class="operation-case-num">80台</span></li>');
            //添加默认执医
            $("#hospitalName").append('<p class="module-detail">唯医互联网骨科医院</p>');
        },
        //获取多点执医
        addHospital:function () {
            var that = this;
            //加载多点执政医院
            var para = {
                customerId:that.config.customerId,
                visitSiteId	: "17",//string	是	站点
                firsResult:"0",	//string	是
                maxResult:"9999"	//string	是
            };
            $.ajax({
                url: that.path.getHospital,
                dataType:"json",
                type: "POST",
                data:{paramJson: $.toJSON(para)},
                success:function (data) {
                    // console.log(data);
                    if (data.responseObject.responseStatus  && data.responseObject.responseData.dataList && data.responseObject.responseData.dataList.length) {
                        var _htmlTemp = "";
                        // if (data.responseObject.responseData.dataList[0].cooperationHospitalList.length) {
                        //     var _dataList = data.responseObject.responseData.dataList[0].cooperationHospitalList;
                        //     $.each(_dataList,function (index,element) {
                        //         _htmlTemp += '<p class="module-detail">' + element.hospitalName + '</p>'
                        //     })
                        // }
                        // if (data.responseObject.responseData.dataList[0].internetHospitalList.length) {
                        //     var _dataList = data.responseObject.responseData.dataList[0].internetHospitalList;
                        //     $.each(_dataList,function (index,element) {
                        //         _htmlTemp += '<p class="module-detail">' + element.hospitalName + '</p>'
                        //     })
                        // }
                        if (data.responseObject.responseData.dataList[0].totalHospitalList.length) {
                            var _dataList = data.responseObject.responseData.dataList[0].totalHospitalList;
                            $.each(_dataList,function (index,element) {
                                _htmlTemp += '<p class="module-detail">' + element.hospitalName + '</p>'
                            })
                        }
                        $("#hospitalName").append(_htmlTemp);
                    }
                },
                fail:function () {

                }
            })
        },
        //获取医生二维码
        addCode:function () {
            var that = this;
            //加载多点执政医院
            var para = {
                customerId:that.config.customerId,
                qrCodeType:"2",
                visitSiteId	: "17"//string	是	站点
            };
            $.ajax({
                url: that.path.getCode,
                dataType:"json",
                type: "POST",
                data:{paramJson: $.toJSON(para)},
                success:function (data) {
                    // console.log(data);
                    if (data.responseObject.responseStatus && data.responseObject.responseData.dataList.qrCodeUrl) {
                        $(".view-code img").attr("src",data.responseObject.responseData.dataList.qrCodeUrl);
                    } else {
                        $(".view-code img").attr("src","/image/img00/doctorShare/code_loading_failed.png");
                    }
                },
                fail:function () {
                    $(".view-code img").attr("src","/image/img00/doctorShare/code_loading_failed.png");
                }
            })
        },
        //页面事件
        pageEvent: function () {
            var that = this;
            //点击查看出诊时间
            $(".module-title").on("click",".go-view-time", function () {
                window.location.href = "/pages/doctorShare/view_time.html?customerId=" + that.config.customerId;
            });
            //点击咨询按钮
            $("#contactDoctor").on("click", function () {
                if (that.config.browseType == "other") {
                    window.location.href = "/pages/doctorShare/view_share.html?customerId=" + that.config.customerId;
                } else {
                    if ($(".view-code").length) {
                        // $(".view-code img").attr("src",that.config.qrCodeUrl);
                        $(".view-code").show();
                        $("body").css("overflow", "hidden");
                    }
                }
            });
            //点击其他地方，取消二维码框
            $(".view-code").on("click", function () {
                $(".view-code").hide();
                $("body").css("overflow", "auto");
            });
            $(".view-code figure").on("click", function () {
                return false;
            })
        },
        appNative: function () {
            var that = this;
            // window.onerror = function (err) {
            //     log('window.onerror: ' + err)
            // };
            /*这段代码是固定的，必须要放到js中*/
            function setupWebViewJavascriptBridge(callback) {

                if (window.WebViewJavascriptBridge) {
                    return callback(WebViewJavascriptBridge);
                }
                if (window.WVJBCallbacks) {
                    return window.WVJBCallbacks.push(callback);
                }
                window.WVJBCallbacks = [callback];

                var WVJBIframe = document.createElement('iframe');
                WVJBIframe.style.display = 'none';
                WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
                document.documentElement.appendChild(WVJBIframe);
                setTimeout(function () {
                    document.documentElement.removeChild(WVJBIframe)
                }, 0)
            }

            /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
            setupWebViewJavascriptBridge(function (bridge) {
                var uniqueId = 1;
                function log(message, data) {
                    var log = document.getElementById('log')
                    var el = document.createElement('div')
                    el.className = 'logLine'
                    el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
                    if (log.children.length) {
                        log.insertBefore(el, log.children[0])
                    }
                    else {
                        log.appendChild(el)
                    }
                }


                /* Initialize your app here */

                /*JS给ObjC提供公开的API（testJavascriptHandler），在ObjC端可以手动调用JS的这个API（调用方法如：[_bridge callHandler:@"testJavascriptHandler" data:@{ @"foo":@"before ready" }];）。
                 1.testJavascriptHandler：JS给ObjC提供公开的API name
                 2.参数data：接收ObjC传过来的参数（data为参数）
                 3.参数responseCallback：可以回调ObjC（responseCallback是OC提供的回调函数）
                 4.responseData：JS传给OC回调函数的参数
                 */
                bridge.callHandler('changeNavTitleAction',{'title': '分享我的名片'},function (response) {

                });
                bridge.registerHandler('returnCustomerId', function (data, responseCallback) {
                    // log('ObjC called testJavascriptHandler with', data);
                    if (!common.getpara().customerId) {
                        // that.config.customerId=JSON.parse(data).customerId;
                        //window.location.href = '//m.allinmed.cn/pages/doctorShare/share_page.html?customerId=' + JSON.parse(data).customerId;
                        var dateTemp = new Date();
                        window.location.replace(that.config.domainName + '/pages/doctorShare/share_page.html?customerId=' + JSON.parse(data).customerId + '&time='+Date.parse(dateTemp));
                    }
                    var responseData = {'resourceUrl': that.config.domainName + '/pages/doctorShare/share_page.html?customerId=' + JSON.parse(data).customerId};
                    // log('JS responding with', responseData)
                    responseCallback(responseData)
                });


                $(".go-view-time").on("click", function () {
                    bridge.callHandler('changeNavTitleAction',{'title': '查看初诊时间'},function (response) {

                    })
                });
                // if ( $("#goAuthentication").length ){
                $("#goAuthentication").on("click", function () {
                    bridge.callHandler('certificationAction',function (response) {

                    })
                });
                // }
                /*注册getNativeInfoHandler方法，Native调用此方法传递参数给JS*/
                bridge.registerHandler('getNativeInfoHandler',
                    function (data, responseCallback) {
                        // log('getNativeInfoHandler', data)
                        var responseData = {'Javascript Says': 'Right back atcha!'};
                        responseCallback(responseData)
                    });
                /*注册getJSRegisterInfoHandler方法，Native调用此方法获取需要注册的本地组件信息*/
                bridge.registerHandler('getJSRegisterInfoHandler',
                    function (data, responseCallback) {
                        // log('ObjC called testJavascriptHandler with', data)
                        var responseData = '{\"jsRegisterList\":[{\"scheme\":\"da-jxjy-app\",\"target\":\"Homepage\",\"action\":\"nativeHomepageViewController\",\"transformType\":\"0\"},{\"scheme\":\"da-jxjy-app\",\"target\":\"PaymentWeb\",\"action\":\"payTableViewController\",\"transformType\":\"1\"}]}'

                        var responseData = {
                            'jsRegisterList': [{
                                'scheme': 'da-jxjy-app',
                                'target': 'Homepage',
                                'action': 'nativeHomepageViewController',
                                'transformType': '0'
                            }, {
                                'scheme': 'da-jxjy-app',
                                'target': 'PaymentWeb',
                                'action': 'payTableViewController',
                                'transformType': '1'
                            }]
                        }

                        // log('JS responding with', responseData)
                        responseCallback(responseData)
                    })
            })
        }
    };
    controller.init();
});
