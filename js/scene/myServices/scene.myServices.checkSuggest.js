/**
 * @name: 初诊建议模块
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/3/6
 * @author: wangjingrong
 */
$(function () {
    var recover = {
        config: {
            fileName: [],
            //上传图片ID串
            checkInBox: {
                checkInList: [],
                checkInIdLists: ""
            }
        },
        path: {
            getCheckSuggestion: "/mcall/patient/case/diagnosis/v1/getMapList/",//预览初诊建议
            getRecommedDoctor: "/mcall/patient/recommend/v1/getMapList/",//推荐医生
            getToken: "/mcall/im/interact/v1/refreshToken/"
        },
        init: function () {
            var t = this;
            if (common.getpara().type == "native") {
                $(".tc-recommendDoctor,.tc-suggestCheckingUpBtn").remove();
            }
            t.addHtml();
            t.addDocHtml();
            t.appNative();
            t.routeInit();


        },
        //Dome结构模块
        template: {
            //基本信息HTML
            personalHtml: function (data) {
                //判断患者头像
                var sex = parseInt(data.patientSex),
                    age = parseInt(data.patientAge),
                    img = "";
                if (age <= 12) {
                    img = "/image/img00/myServices/chatting_portrait_child@2x.png";
                } else if (age > 12 && age <= 59) {
                    img = (sex === 1 ? "/image/img00/myServices/chatting_chatting_man@2x.png" : "/image/img00/myServices/chatting_portrait_woman@2x.png");
                } else if (age >= 60) {
                    img = (sex === 1 ? "/image/img00/myServices/chatting_portrait_old_man@2x.png" : "/image/img00/myServices/chatting_portrait_old_woman@2x.png");
                }
                var caseTime = data.caseDiagnosis.createTime.split(" ")[0],
                    _caseTime = caseTime.split('-')[0] + '年' + caseTime.split('-')[1] + '月' + caseTime.split('-')[2] + '日'
                return '<li class="tc-baseInfoItem">' +
                    '<div class="tc-baseInfoItemLeft"><img src="' + img + '" alt="">' +
                    '<span class="tc-personIcon"></span></div><div class="tc-baseInfoItemRight"><span class="tc-baseInfoName">' + common.getStrLen(data.patientName, 10) + '</span>' +
                    '<span class="tc-baseInfoDate">' + _caseTime + '</span></div><a href="/pages/directOperation/reservation_list.html?customerId=' + common.getpara().patientCustomerId + '&caseId=' + common.getpara().caseId + '&isOrder=0#!reservation" class="tc-goCase ' + (common.getpara().type == "native" ? "hide" : "") + '">问诊单</a></li>' +
                    '<li class="tc-baseInfoItem"><div class="tc-baseInfoItemLeft"><span>初步诊断</span></div><div class="tc-baseInfoItemRight">' +
                    '<span>' + data.caseDiagnosis.illnessName + '</span></div></li><li class="tc-baseInfoItem"><div class="tc-baseInfoItemLeft"><span>初诊医生</span>' +
                    '</div><div class="tc-baseInfoItemRight"><span>' + data.nickname + '</span></div></li>';
            },
            //推荐医生HTML
            doctorHtml: function (data) {
                var html = '', residuePep;
                if (data.adviceNum < 0) {
                    residuePep = '';
                } else {
                    residuePep = '<span class="tc-residuePep">仅剩<i>' + data.adviceNum + '</i>个名额</span>'
                }
                html = '<li class="tc-recommendDoctorItem">' +
                    '<div class="tc-recommendDoctor-l" data-docid="' + data.customerId + '">' +
                    '<a href="javascript:;"><img src="' + (data.logoUrl ? data.logoUrl : "/image/img00/doctorMain/doc_logo.png") + '" alt=""></a>' +
                    '</div>' +
                    '<div class="tc-recommendDoctor-r">' +
                    '<div class="tc-recommendDoctorInfo" data-docid="' + data.customerId + '">' +
                    '<span class="tc-recommendDoctorName">' + common.getStrLen(data.fullName, 10) + '</span>' +
                    '<span class="tc-recommendDoctorPostPosition">' + data.medicalTitle + '</span>' +
                    '<span class="tc-online ' + (data.adviceStatus == 1 ? "" : "rest") + '">' + (data.adviceStatus == 1 ? "在线" : "离线") + '</span>' +
                    '<div class="tc-recommendDoctorTipList" data-istop="' + data.isTop + '" data-isnearest="' + data.isNearest + '">' +
                    (data.isTop == 1 ? '<span>全国TOP10骨科医院</span>' : '') +
                    (data.isNearest == 1 ? '<span>距离最近</span>' : '') +
                    '</div>' +
                    '<p class="tc-recommendHospitalItem">' +
                    '<span class="tc-recommendDoctorHospital">' + (data.province ? (data.province + ' ') : "") + (data.city ? (data.city + ' ') : "") + (data.district ? data.district : "") + ' ' + (data.company ? data.company : "") + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<p class="tc-recommendDoctorGood">擅长：' + common.getStrLen(data.illnessNameList, 30) + '</p>' +
                    '<div class="tc-recommendDoctorOtherBox">' +
                    '<div class="tc-recommendMoney"><span class="tc-recommendMoneyNum"><i>￥</i>' + data.generalPrice + '</span><span class="tc-recommendText"><i>/</i>起</span>' + residuePep + '</div>' +
                    '<div class="tc-recommend"><a data-docid="' + data.customerId + '" href="javascript:;" class="tc-recommendConsultNow ' + (data.adviceNum == 0 ? "default" : "") + '">立刻咨询</a></div>' +
                    '</div>' +
                    '</div>' +
                    '</li>';
                return html;
            },
            //检查检验HTML
            checkHtml: function (data, name) {
                var html = '';
                html = '<li class="tc-suggestCheckingItem">' + data[name] + '<span class="' + (data.isAttachment == 0 ? "tc-suggestCheckingWait" : "tc-suggestCheckingOver") + '">' + (data.isAttachment == 0 ? "（待上传）" : "（已完成）") + '</span></li>';
                return html;
            },
            //患教知识HTML
            knowledgeHtml: function (data) {
                var html = '';
                html = '<a href="/pages/myServices/teaching_articles.html?id=' + data.knowledgeId + '&title=' + data.knowledgeName + '&customerId=' + common.getpara().patientCustomerId +'"><section class="tc-teachingKnowledgeList">' +
                    //'<figure class="tc-tc-teachingKnowledgePic">'+
                    //'<img src="'+data.knowledgeAttUrl+'">'+
                    //'</figure>'+
                    '<article class="tc-tc-teachingKnowledgeText">' +
                    '<p class="tc-teachingKnowledgeTitle">' + data.knowledgeName + '</p>' +
                    //'<p class="tc-teachingKnowledgeTime"><span>发表于</span><span>'+data.createTime.split(" ")[0].replace(/-/g,".")+'</span></p>'+
                    '</article>' +
                    '</section></a>';
                return html;
            },
            //处置建议HTML
            adviceHtml: function (data) {
                var html = '';
                html = '<li class="tc-disposalAdviceItem">' +
                    '<div class="tc-disposalAdvice-l">' + data.treatmentName + '</div>' +
                    '</li>'
                return html;
            }
        },
        //Q.js配置
        routeInit: function () {
            //初始化路由（上传图片插件需要）,搜索医生需要
            Q.reg("main", function () {
                document.title = "初诊建议";
            });
            Q.reg("doc", function () {
                modules.searchList({
                    targetEle: $(".doctorName.show"),
                    type: "doctor",
                    source: "1",
                    backCallback: function () {

                    }
                });
            });
            Q.init({
                index: 'main'
            });
        },
        //逻辑部分
        addHtml: function () {
            var t = this;
            var param = {
                caseId: common.getpara().caseId,
                diagnosisId: common.getpara().diagnosisId,
                diagnosisType: 1,
                isValid: 1,
                firstResult: 0,
                maxResult: 1,
                sortType: 1
            };
            $.ajax({
                url: t.path.getCheckSuggestion,
                timeout: 5000,
                type: "post",
                data: {paramJson: $.toJSON(param)},
                dataType: "json",
                success: function (data) {
                    if (data.responseObject.responseData.dataList) {
                        var items = data.responseObject.responseData.dataList[0];
                        //基本信息DOM添加
                        $(".tc-baseInfoList").append(t.template.personalHtml(items));
                        //检查检验DOM添加
                        if ((items.checkList && items.checkList.length > 0) || (items.inspectionList && items.inspectionList.length > 0)) {
                            var _checkInIdLists = "";
                            $(".tc-suggestChecking").show();
                            if (items.checkList.length > 0) {
                                $.each(items.checkList, function (index, element) {
                                    $(".tc-suggestCheckingList").append(t.template.checkHtml(element, "checkName"))
                                    t.config.checkInBox.checkInList.push({
                                        id: element.checkId,
                                        Name: element.checkName
                                    });
                                    _checkInIdLists += element.checkId + ","
                                })
                            }
                            if (items.inspectionList.length > 0) {
                                $.each(items.inspectionList, function (index, element) {
                                    $(".tc-suggestCheckingList").append(t.template.checkHtml(element, "inspectionName"))
                                    t.config.checkInBox.checkInList.push({
                                        id: element.inspectionId,
                                        Name: element.inspectionName
                                    });
                                    _checkInIdLists += element.inspectionId + ","
                                })
                            }
                            t.config.checkInBox.checkInIdLists = _checkInIdLists.substring(0, _checkInIdLists.length - 1);
                            t.foldAndUnfold(".tc-suggestCheckingList li", 4);
                            modules.upLoadFiles({
                                caseId: common.getpara().caseId,
                                data: t.config.checkInBox,
                                route: 'main',
                                imageType: '1',     // 上传资料类型
                                upLoadType: '5',
                                fileCallBack: function () {
                                    t.sendUploadMessage();
                                },
                                backFunction: function () {
                                    // window.location.reload();
                                }
                            });
                        }
                        //患教知识DOM添加
                        if (items.knowledgeList && items.knowledgeList.length > 0) {
                            $(".tc-teachingKnowledge").show();
                            $.each(items.knowledgeList, function (index, element) {
                                $(".tc-teachingKnowledgeBox").append(t.template.knowledgeHtml(element))
                            })
                            t.foldAndUnfold(".tc-teachingKnowledgeBox a", 2);
                        }
                        //处置建议DOM添加
                        if (items.treatmentList && items.treatmentList.length > 0) {
                            $(".tc-disposeSuggested").show();
                            $.each(items.treatmentList, function (index, element) {
                                $(".tc-disposeSuggestedList").append(t.template.adviceHtml(element));
                            })
                            t.foldAndUnfold(".tc-disposeSuggestedList li", 2);
                        }
                        //手术建议DOM添加
                        if (items.caseDiagnosis.operationName.length > 0) {
                            $(".tc-surgery").show();
                            $(".tc-surgeryList").append('<li class="tc-surgeryItem"><div class="tc-surgery-l">' + items.caseDiagnosis.operationName + '</div></li>');
                        }
                    }
                },
                error: function () {

                }
            })
        },
        addDocHtml: function () {
            var t = this;
            t.btnClick();
            var param = {
                diagnosisId: common.getpara().diagnosisId,
                isValid: 1,
                firstResult: 0,
                maxResult: 9999,
                sortType: 1,
                logoUseFlag: 3
            };
            $.ajax({
                url: t.path.getRecommedDoctor,
                timeout: 10000,
                type: "post",
                data: {paramJson: $.toJSON(param)},
                dataType: "json",
                success: function (data) {
                    if (data.responseObject.responseData.dataList) {
                        var items = data.responseObject.responseData.dataList;
                        //推荐医生DOM添加
                        if (common.getpara().type == "native") {
                            $(".tc-recommendDoctor,.tc-suggestCheckingUpBtn").remove();
                        } else {
                            $(".tc-recommendDoctor").show();
                            $.each(items, function (index, element) {
                                $(".tc-recommendDoctorList").append(t.template.doctorHtml(element));
                            })
                        }
                        t.foldAndUnfold(".tc-recommendDoctorList li", 2);
                    }
                },
                error: function () {

                }
            })
        },
        btnClick: function () {
            $(".tc-recommendDoctorList").on("click", ".tc-recommendConsultNow,.tc-recommendDoctor-l,.tc-recommendDoctorInfo", function (event) {
                event.stopPropagation();

                if ($(this).hasClass("default")) {


                } else {
                    var isTop = $(this).parents(".tc-recommendDoctorItem").find(".tc-recommendDoctorTipList").attr("data-istop"),
                        isNearest = $(this).parents(".tc-recommendDoctorItem").find(".tc-recommendDoctorTipList").attr("data-isnearest");
                    window.location.href = '/pages/myServices/doc_main.html?customerId=' + $(this).attr("data-docid") + '&patientId=' + common.getpara().patientId + '&caseId=' + common.getpara().caseId + '&patientCustomerId=' + common.getpara().patientCustomerId + '&type=2&top=' + isTop + '&near=' + isNearest + '&caseType=' + common.getpara().caseType;
                }
            });
            $(".tc-lookBySelf").on("click", function () {
                Q.go("doc");
            })
            $(".tc-surgeryCheck").on("click", function () {
                var scrollH = $(".tc-recommendDoctorTitle h3").offset().top;
                $("html,body").animate({
                    scrollTop: scrollH
                }, 500)
            })
        },
        //展开收起
        foldAndUnfold: function (element, num) {
            var _element = $(element);
            if (_element.length > num) {
                if (_element.parent().siblings(".tc-lookBySelf").length > 0) {
                    $(".tc-lookBySelf").hide();
                }
                var twoHeight = 0;
                _element.each(function (i, e) {
                    if (i >= num) {
                        $(e).addClass("hide");
                    }
                });
                _element.parent().after('<div class="tc-recommendLoadBtn tc-recommendLoadMoreBtn"></div>');
                _element.parent().siblings(".tc-recommendLoadBtn").on("click", function () {
                    if ($(this).hasClass("tc-recommendLoadMoreBtn")) {
                        $(this).removeClass("tc-recommendLoadMoreBtn").addClass("tc-recommendLoadLessBtn");
                        $(element + '.hide').addClass("show").removeClass("hide");
                        _element.parent().siblings(".tc-lookBySelf").show();
                    } else {
                        $(this).removeClass("tc-recommendLoadLessBtn").addClass("tc-recommendLoadMoreBtn");
                        $(element + '.show').addClass("hide").removeClass("show");
                        _element.parent().siblings(".tc-lookBySelf").hide();
                    }
                })
            }

        },
        appNative: function () {
            if (common.getpara().type && common.getpara().type == "native") {
                $(".tc-surgeryCheck").hide();
            }
            //window.onerror = function (err) {
            //    log('window.onerror: ' + err)
            //};
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

                bridge.registerHandler('returnCaseId', function (data, responseCallback) {
                    // log('ObjC called testJavascriptHandler with', data);
                    if (!common.getpara().caseId) {
                        window.location.href = '//m.allinmed.cn/pages/myServices/check_suggestion.html?caseId=' + JSON.parse(data).caseId + '&type=native';
                    }
                    var responseData = {'resourceUrl': '//m.allinmed.cn/pages/myServices/check_suggestion.html?caseId=' + JSON.parse(data).caseId + '&type=native'};
                    // log('JS responding with', responseData)
                    responseCallback(responseData)
                })
                /*注册getNativeInfoHandler方法，Native调用此方法传递参数给JS*/
                bridge.registerHandler('getNativeInfoHandler',
                    function (data, responseCallback) {
                        // log('getNativeInfoHandler', data)
                        var responseData = {'Javascript Says': 'Right back atcha!'}
                        responseCallback(responseData)
                    })
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

                document.body.appendChild(document.createElement('br'))

                var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
                callbackButton.innerHTML = 'Fire testObjcCallback'
                callbackButton.onclick = function (e) {
                    e.preventDefault()
                    // log('JS calling handler "testObjcCallback"')
                    /*
                     JS端调用OC端注册的公开API nativeHomepageViewController
                     1.nativeHomepageViewController：OC端注册的API name
                     2.{'foo': 'bar'}：JS端调用testObjcCallback时，传入的参数
                     3.function(response)：JS端调用完nativeHomepageViewController后，会提供一个回调函数，使OC端代码执行完后，有机会执行JS的一段代码
                     */
                    bridge.callHandler('aboutDialServiceNumber', {'mobile': '13552542393'}, function (response) {
                        // log('JS got response', response)
                    })
                }

                var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
                callbackButton.innerHTML = 'Fire testObjcCallback1'
                callbackButton.onclick = function (e) {
                    e.preventDefault()
                    // log('JS calling handler "testObjcCallback1"')
                    /*
                     JS端调用OC端注册的公开API nativeHomepageViewController
                     1.nativeHomepageViewController：OC端注册的API name
                     2.{'foo': 'bar'}：JS端调用testObjcCallback时，传入的参数
                     3.function(response)：JS端调用完nativeHomepageViewController后，会提供一个回调函数，使OC端代码执行完后，有机会执行JS的一段代码
                     */
                    bridge.callHandler('returnCommonParams', {'test': 'fengxia'}, function (response) {
                        // log('JS got response', response)
                    })
                }
            })
        },
        sendUploadMessage: function () {
            common.loading.show();
            $.ajax({
                url: this.path.getToken,
                type: 'POST',
                dataType: 'json',
                async: false,
                beforeSend: function () {

                },
                data: {
                    paramJson: $.toJSON({
                        accid: "0_" + common.getpara().caseId
                    })
                }
            })
                .done(function (data) {
                    console.log("success");
                    if (data.responseObject.responseStatus) {
                        var nim = NIM.getInstance({
                            appKey: '50c93d2ab7e207fd83231a245c07bfbc',
                            account: "0_" + common.getpara().caseId,
                            token: data.responseObject.responseData.token,
                            onconnect: function (data) {
                                console.log('连接成功');
                                common.loading.hide();
                                nim.sendText({
                                    scene: 'p2p',
                                    to: '1_doctor00001',
                                    text: "患者已上传视诊资料",
                                    done: function (error, obj) {
                                        window.location.reload();
                                    }
                                });
                            },
                        });

                    }
                });

        }


    };
    recover.init();
});
