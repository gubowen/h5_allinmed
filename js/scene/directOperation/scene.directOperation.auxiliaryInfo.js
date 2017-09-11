/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 2017/03/01
 */
$(function () {
    var controller = {
        init: function() {
            this.getUrlParam();//获取到当前url的参数
            this.listRouter();//页面路由控制
            this.getAnswerList();//前几道题的页面，并且连接路由
            this.getHistoryDom();//获取既往史DOM
            this.historyNext();//既往史的下一步按钮
            this.selectChange();//最后一题
            // that.getAnswersCache();//从本地保存的数据中获取
            this.symptomQuery();

            this.selectSymptom();
            this.confirmNext();//前几道题的保存按钮
            this.painLevel();//疼痛等级控制
            this.inputVerify();//最后一题的input验证
            this.cardTypeLoad();//最后一题的获取证件类型和社保类型的列表
            this.locationSelect();//最后一题的患者所在地、社保所在地的选择时间

            localStorage.setItem("caseId",common.getpara().caseId);
            localStorage.setItem("patientId",common.getpara().patientId);
        },
        config: {
            caseId: "",
            visitSiteId: "1",
            patientId: common.getpara().patientId,
            optionList: [],
            questionLength:'',//用来保存问题的长度
            infoView:""//保存一个信息的路由；
        },
        secondList: {},
        template: {
            symptomQuery: function (data) {
                return '<section class="symptom-detail-desc">' +
                    '<figure>' +
                    (function (iData) {
                        var result = "";
                        $(iData).each(function (index, element) {
                            result += '<img src="' + element.optionAttUrl + '" alt="">';
                        });
                        return result;

                    }(data.optionAttList)) +

                    '</figure>' +
                    '<figcaption>' + data.optionDesc + '</figcaption>' +
                    '</section>';
            },
            answersList: function (index, total, data) {
                var that = this;
                var _i = index;
                this.num = 0;
                return '<section class="symptom-desc-inner" data-prompt="' + (data.popupPrompt.length === 0 ? '' : data.popupPrompt) + '" data-sort="consult' + (parseInt(index) + 1) + '" data-id="' + data.questionId + '">' +
                    '<section class="symptom-desc-form">' +
                    '<header class="symptom-desc-title">' +
                    '<p><span class="num"><em>' + (parseInt(index) + 1) + '</em>/' + total + '</span>' + data.questionName + (parseInt(data.questionType) === 2 ? '<span class="tips">(可多选)</span></p>' : '</p>') + (parseInt(data.isAttachment) === 1 ? '<i class="icon-pain-detail"></i>' : "") +
                    '</header>' +
                    (function (data) {
                        var result = "";
                        switch (parseInt(data.questionType)) {
                            case 1:
                                result = '<section class="util-selector sSelector">' +
                                    (function (sData) {
                                        var result = "";
                                        $(sData).each(function (index, element) {

                                            result += that.answerItem(_i + 1, element, data.questionType, data);
                                        });
                                        return result;
                                    }(data.optionList1)) +
                                    '</section>';
                                break;
                            case 2:
                                result = '<section class="util-selector mSelector">' +
                                    (function (sData) {
                                        var result = "";
                                        $(sData).each(function (index, element) {

                                            result += that.answerItem(_i + 1, element, data.questionType, data);

                                        });
                                        return result;
                                    }(data.optionList1)) +
                                    '</section>';
                                break;
                            case 3:
                                break;
                            case 4:
                                result = that.timeSelector();
                                break;
                        }
                        return result;
                    }(data)) +

                    '</section>' +
                    '</section>';
            },
            answerItem: function (ii, data, type, pData) {
                var result = "", that = this;
                if (parseInt(data.isAttachment) === 2) {
                    result = '<section class="symptom-desc-item ' + (parseInt(type)===2?"multiple-choices":"single-choices") + '" data-role="selector" data-id="' + data.optionId + '">' +
                        '<article><i class="icon-select"></i><span>' + data.optionName + (parseInt(data.isAttachment) === 1 ? '<i class="icon-pain-detail"></i>' : '') + '</span></article>' +
                        '<section class="symptom-desc-form symptom-desc-second-form" data-role="selector">' +
                        '<section class="util-selector">' +
                        '<section class="symptom-desc-item">' +
                        '<textarea class="symptom-desc-others-content"  placeholder="请填写"></textarea>' +
                        '</section>' +
                        '</section>' +
                        '</section>' +
                        '</section>';

                } else {
                    switch (parseInt(type)) {
                        case 1:
                            result = '<section class="symptom-desc-item single-choices" data-role="selector" data-id="' + data.optionId + '">' +
                                '<article><i class=" icon-select"></i><span>' + data.optionName + (parseInt(data.isAttachment) === 1 ? '<i class="icon-pain-detail"></i>' : '') + '</span></article>' +
                                (function (qData) {
                                    var result = "";
                                    $(qData).each(function (index, element) {
                                        that.num++;
                                        result += that.childItem(ii, that.num, element)
                                    });
                                    return $.isEmptyObject(qData) ? "" : result;
                                }(data.questionList2)) +
                                '</section>';
                            break;
                        case 2:
                            result = '<section class="symptom-desc-item multiple-choices" data-role="selector" data-id="' + data.optionId + '">' +
                                '<article><i class=" icon-select"></i><span>' + data.optionName + '<i class="icon-arrow"></i></span></article>' +
                                (function (qData) {
                                    $(qData).each(function (index, element) {
                                        that.num++;
                                        result += that.childItem(ii, that.num, element)
                                    });
                                    return $.isEmptyObject(qData) ? "" : result;
                                }(data.questionList2)) +
                                '</section>';
                            break;

                    }
                }
                return result;
            },
            childItem: function (ii, index, data) {
                var that = this;
                var router = $("html").attr("view").substr(-1, 1);
                return '<section class="symptom-desc-form symptom-desc-second-form" data-role="selector" data-qid="' + data.questionId + '">' +
                    '<header class="symptom-desc-title">' +
                    '<h4>' + '<em>' + ii + "." + (parseInt(index) + 1) + '</em>' + data.questionName + '</h4>' +
                    '</header>' +
                    '<section class="util-selector ' + (parseInt(data.questionType) === 1 ? " sSelector" : "mSelector") + '">' +
                    (function (sData) {
                        var result = "";
                        switch (parseInt(data.questionType)) {
                            case 1:
                            case 2:
                                $(sData).each(function (index, element) {
                                    result += that.answerItem(ii, element, data.questionType);
                                });
                                break;
                            case 3:
                                // console.log(data)
                                result = "<section class='pain-level'>" +
                                    "<article class='pain-level-title'>" +
                                    "<h3>当前值：</h3>" +
                                    "<span class='num' data-level='0'><em class='level-tip'></em>（无痛）</span>" +
                                    "<span class='num' data-level='1'><em class='level-tip'></em>（有轻微的疼痛，可以忍受）</span>" +
                                    "<span class='num' data-level='2' style='display: inline;'><em class='level-tip'>5</em>（疼痛并影响睡眠，尚能忍受）</span>" +
                                    "<span class='num' data-level='3'><em class='level-tip'></em>（有渐强烈的疼痛，疼痛难忍）</span>" +
                                    "</article>" +
                                    "<input type='range' class='pain-level-select' max='9' min='0' step='1' value='5'/>" +
                                    "</section>";
                                break;
                        }
                        return result;
                    }(data.optionList2)) +
                    '</section>' +
                    '</section>';
            },
            //底部控制器的模板
            routerController: function (data) {
                return '<footer class="au-controller" data-sort="' + data.router + '">' +
                    '<a href="' + data.prevRouter + '" class="btn-hollow ' + data.prevClass + '">' + data.prevText + '</a>' +
                    '<a href="' + data.nextRouter + '" class="btn-primary ' + data.nextClass + '">' + data.nextText + '</a>' +
                    '</footer>';
            },
            //时间选择
            timeSelector: function (data) {
                return '<section class="util-selector sSelector time-selector">' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<article><i class=" icon-select"></i><span>一周內</span></article>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<article><i class=" icon-select"></i><span>一个月內</span></article>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<article><i class=" icon-select"></i><span>三个月内</span></p>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<article><i class=" icon-select"></i><span>三个月到一年</span></article>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<article><i class=" icon-select"></i><span>一到三年</span></article>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<article><i class=" icon-select"></i><span>三到五年</span></article>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<article><i class=" icon-select"></i><span>五年以上</span></article>' +
                    '</section>' +
                    '</section>';
            },
            //既往史的模板开始
            //既往史标签
            historyTagHtml:function (data) {
                var tempHtml = '';
                tempHtml = '<span class="symptom-desc-item symptom-desc-item-tag" data-role="selector" data-historyId="'+ data.historyId+'">'+ data.historyName+ '</span>';
                return tempHtml;
            },
            //既往史的模板结束
            cardTypeHtml: function (sv) {
                var _html = '';
                $.each(sv, function (i, val) {
                    _html += '<option value="'+val.certificateName+'" data-typeid="'+val.certificateId+'">'+val.certificateName+'</option>';
                });
                return _html;
            }

        },
        XHRList: {
            query: "/mcall/cms/part/question/relation/v1/getMapList/",//"",
            createMedicalRecord: "/mcall/customer/patient/case/v1/create/",
            submitMedicalRecord: "/mcall/customer/patient/case/option/v1/create/",
            symptomDetail: "/mcall/comm/data/symptom/option/v1/getMapById/",
            getTagMapList:"/mcall/cms/case/history/v1/getMapList/", //既往史标签查询
            getPatientMapList:"/mcall/customer/patient/case/history/v1/getMapList/",  //获取患者既往史
            savePatientHistory:"/mcall/customer/patient/case/history/v1/create/", //保存患者既往史
            cardType:'/mcall/comm/data/social/security/v1/getTotalMapList/', //证件类型
            baseInfo:'/mcall/customer/patient/baseinfo/v1/getMapList/',      //个人信息
            submit: '/mcall/customer/patient/baseinfo/v1/create/',            //保存患者信息
            updateInfo:"/mcall/customer/patient/baseinfo/v1/update/"//更新患者信息
        },
        //全页路由操作
        listRouter: function () {
            var that = this;

            Q.reg('consult1', function () {

            });
            Q.reg('consult2', function () {

            });
            Q.reg('consult3', function () {

            });
            Q.reg('consult4', function () {

            });
            Q.reg('consult5', function () {

            });
            Q.reg('consult6', function () {

            });
            Q.reg('consult7', function () {

            });
            Q.reg('consult8', function () {

            });
            Q.reg('consult9', function () {

            });
            Q.reg('consult10', function () {

            });
            Q.init({
                index: 'consult1'/* 首页地址 */,
                pop: function (L) {
                    that.getButtonUnfinish(L);
                    that.timeSelector();
                }
            });

        },
        //得到url参数保存起来
        getUrlParam: function () {
            var that = this;
            var params = common.getpara();
            $.extend(that.config,params);
            // console.log(that.config);
        },

        //铺前几道题的页面，并且连接路由
        getAnswerList: function () {
            var that = this;

            $.ajax({
                url: this.XHRList.query,
                type: 'POST',
                dataType: "json",
                data: {
                    paramJson: $.toJSON({
                        partId: common.getpara().partId,
                        isValid: "1",
                        sortType: "",
                        firstResult: "0",
                        maxResult: "999"
                    })
                },
                timeout: 10000,
                beforeSend: function () {
                    common.loading.show();
                }
            })
                .done(function (data) {
                    common.loading.hide();
                    if (data.responseObject.responseData) {
                        var dataList = data.responseObject.responseData.dataList;
                        if (dataList && dataList.length !== 0) {
                            var total = parseInt(dataList.length)+2;
                            that.config.questionLength = dataList.length;
                            $(dataList).each(function (index, element) {
                                $(".au-infoBox .cureHistory").before(that.template.answersList(index, total, element));
                                that.config.optionList.push({
                                    partId: common.getpara().partId,
                                    questionId: element.questionId,
                                    optionIdList: "",
                                    mainOptionId: ""
                                });
                                var data = {
                                    router: "consult" + (index + 1),
                                    prevRouter: (index === 0) ? "//m.allinmed.cn/pages/imScene/im_main_scene.html" : "#!consult" + index,
                                    nextRouter: "#!consult" + (index + 2),
                                    prevClass: "prev",
                                    nextClass: (index === total - 3) ? "sure" : "next",
                                    prevText: (index === 0) ? "返回" : "上一步",
                                    nextText: "下一步"
                                };
                                $(".au-main .cureHisControl").before(that.template.routerController(data));
                            });
                            //下一步的点击事件
                            $(".au-controller").on("click",".next",function () {
                                if ($(this).hasClass("unfinish")) {
                                    return false;
                                } else {
                                    return that.nextBtnValidate();
                                }
                            });
                            //上一步的点击事件
                            $(".au-controller").on("click",".prev", function () {
                                return that.backToLastRouter();
                            });
                            var historyTitle = "<em>"+ (parseInt(dataList.length)+1) +"</em>/" +(parseInt(dataList.length)+2);//既往史的标题数目
                            $(".cureHistory .symptom-desc-title .num").html(historyTitle);
                            $(".au-infoBox .cureHistory").attr('data-sort',"consult"+ (parseInt(dataList.length)+1) );//设置既往史内容的路由
                            $(".au-main .cureHisControl").attr('data-sort',"consult"+ (parseInt(dataList.length)+1) );//设置既往史控制器的路由
                            $(".au-main .cureHisControl .btn-hollow").attr("href","#!consult" + dataList.length);//设置既往史控制器的路由里的上一步
                            var infoTitle = "<em>"+ (parseInt(dataList.length)+2) +"</em>/" +(parseInt(dataList.length)+2);//最后一题基本信息的标题数目
                            $(".patientInfo .symptom-desc-title .num").html(infoTitle);
                            $(".au-infoBox .patientInfo").attr('data-sort',"consult"+ (parseInt(dataList.length)+2) );//最后一题基本信息内容的路由设置
                            $(".au-main .infoControl").attr('data-sort',"consult"+ (parseInt(dataList.length)+2) );//最后一题基本信息的控制器的路由设置
                            $(".au-main .infoControl .btn-hollow").attr("href","#!consult" + (parseInt(dataList.length)+1));//最后一题基本信息的控制器的路由里的上一步
                            $(".au-controller").eq(0).addClass("active");
                            $(".symptom-desc-inner").eq(0).addClass("active");
                            that.getButtonUnfinish($("html").attr("view"));
                            that.config.infoView = $(".patientInfo").data('sort');
                            that.lastRouterBack();//最后一题的路由返回设置

                            that.inputCountLimit();
                        }
                    }
                })
                .fail(function () {
                    common.loading.hide()
                });
        },

        //监测题目的选中情况并响应到按钮的置灰情况...
        getButtonUnfinish: function (router) {
            $(".symptom-desc-inner").removeClass('active');
            $(".au-controller").removeClass("active");
            $(".au-controller[data-sort='" + router + "']").addClass('active');
            $(".symptom-desc-inner[data-sort='" + router + "']").addClass('active');
            if ($(".symptom-desc-inner[data-sort='" + router + "']").find(".util-selector").eq(0).find(">.selected").size() === 0) {
                $(".au-controller[data-sort='" + router + "']").find(".next,.sure").addClass("unfinish");
            } else {
                $(".au-controller[data-sort='" + router + "']").find(".next,.sure").removeClass("unfinish");
            }
        },

        //铺既往史的页面
        getHistoryDom:function () {
            var that = this;
            var data = {};
            data.isValid = "1";//是否有效1-有效0-无效
            data.firstResult = "0";//分页参数
            data.maxResult = "999";//分页参数
            var params = {paramJson:$.toJSON(data)};
            $.ajax({
                url: that.XHRList.getTagMapList,
                type: 'POST',
                dataType: "json",
                data: params,
                timeout: 10000,
                beforeSend: function () {
                    common.loading.show();
                },
                success: function (rep) {
                    common.loading.hide();
                    if (rep && rep.responseObject.responseData.dataList) {
                        var data =rep.responseObject.responseData.dataList;
                        // console.log(data);
                        $(data).each(function (index,element) {
                            var tagHtml = that.template.historyTagHtml(element);
                            $('.au-cureHisItem[data-historyType='+element.historyType +'] .au-cureHisItemBottom').append(tagHtml);

                        })
                    };
                    that.historyTagClick();//既往史标签的点击事件
                    that.getHistoryInfo();//获取患者的既往史信息并在页面展示
                },
                fail :function (data) {
                    common.loading.hide();
                }
            })
        },

        //既往史的点击事件控制文本输入框显示隐藏
        historyTagClick: function () {
        	$('.symptom-desc-item-tag').on("click" , function (e) {
			    if ($(this).hasClass('selected') && !$(this).siblings().hasClass('selected')) {
			    	$(this).parent().siblings('.au-cureHisItemInfo').hide();
			    } else {
			    	$(this).parent().siblings('.au-cureHisItemInfo').show();
			    }
			});
        },

        //获取患者的既往史信息
        getHistoryInfo : function () {
            var that = this;
            var data = {};
            data.patientId = that.config.patientId;
            data.caseId = that.config.caseId;
            data.sortType = "2";//排序2-时间倒序
            data.isValid = "1";//是否有效1-有效0-无效
            data.firstResult = "0";//分页参数
            data.maxResult = "6";//分页参数
            data.operatorType = "0";//操作人类型0-患者1-医生
            var params = {paramJson:$.toJSON(data)};
            $.ajax({
                url: that.XHRList.getPatientMapList,
                type: 'POST',
                dataType: "json",
                data: params,
                timeout: 10000,
                beforeSend: function () {
                    common.loading.show();
                },
                success: function (rep) {
                    common.loading.hide();
                    if (rep && rep.responseObject.responseData.dataList) {
                        var data =rep.responseObject.responseData.dataList;
                        console.log(data);
                        $.each(data,function (index,element) {
                            var container = $(".au-cureHisItem[data-historyType='"+ element.caseHistoryType +"']");
                            container.attr("data-id",element.id);
                            var caseHistoryIdList = element.caseHistoryIdList.split(",");//标签id串
                            var caseHistoryDesc = element.caseHistoryDesc;//每个既往史下面的描述
                            //赋值六种病史下面的描述
                            if (element.caseHistoryIdList !== '') {
                                container.find('.au-cureHisItemInfo textarea').val(caseHistoryDesc);
                                container.find('.au-cureHisItemInfo').show();
                            }
                            $.each(caseHistoryIdList,function (index,element) {
                                container.find('.symptom-desc-item-tag[data-historyId='+ element +']').addClass('selected');
                            });
                        });
                    }
                },
                fail :function (data) {
                    common.loading.hide();
                }
            })
        },

        //既往史的下一步按钮
        historyNext: function () {
            var that = this;
            $(".cureHisControl .btn-primary").off("click").on("click",function () {
                var textArray = $('.au-cureHisItemBottom').find('.selected').parent().siblings('.au-cureHisItemInfo').children();
                if (0 === textArray.length) {
                    that.saveHistoryInfo();//保存既往史信息
                    location.hash = '#!consult'+ (parseInt(that.config.questionLength)+2);
                    return false;
                } else {
                    var isEmpty = 1;
                    $.each(textArray,function (index,element) {
                        console.log(element);
                        var textVal = $(element).val();
                        if ($.trim(textVal) == '') {
                            common.popup({
                                text:'请完善信息'
                            });
                            $(element).focus();
                            isEmpty = 0;
                            return false;
                        } else {

                        }
                    });
                    if (isEmpty) {
                        that.saveHistoryInfo();//保存既往史信息
                        location.hash = '#!consult'+ (parseInt(that.config.questionLength)+2);
                    }
                }
            })
        },

        //既往史的保存
        saveHistoryInfo: function () {
            //定义需要需要传的参数
            var that = this,
                data = {};
                data.caseId = that.config.caseId;
                data.patientId = that.config.patientId;
                data.operatorId = that.config.patientId;//操作人
                data.operatorType = "0";//操作人类型0-患者1-医生
                data.caseHistoryList = []; //保存既往史的数组

            $('.au-cureHisItem').each(function (index,element) {
                var obj = {};
                obj.id=$(element).attr("data-id") || "";
                obj.caseHistoryType = $(element).data('historytype');
                obj.caseHistoryDesc = $.trim($(element).find(".au-cureHisItemInfo textarea").val());
                obj.caseHistoryIdList = [];
                obj.caseHistoryName = [];
                $($(element).find('.au-cureHisItemBottom .selected')).each(function (ind ,ele) {
                    obj.caseHistoryName.push($(ele).text());
                    obj.caseHistoryIdList.push($(ele).data('historyid'));
                });
                obj.caseHistoryIdList = obj.caseHistoryIdList.join(",");
                obj.caseHistoryName = obj.caseHistoryName.join(",");
                data.caseHistoryList.push(obj);
            });
            data.caseHistoryList = JSON.stringify(data.caseHistoryList);
            console.log(data);
            var params = {paramJson:$.toJSON(data)};
            console.log(params);
            $.ajax({
                url: that.XHRList.savePatientHistory,
                type: 'POST',
                dataType: "json",
                data: params,
                beforeSend: function () {
                    common.loading.show();
                },
                success: function (data) {
                    common.loading.hide();
                    if (data && data.responseObject.responseStatus) {
                        console.log("既往史保存成功！！");
                    }
                },
                fail :function (data) {
                    common.loading.hide();
                }
            })
        },

        //获取最后一题的社保证件类型列表
        cardTypeLoad:function(){
            var _t = this;
            var _data={
                //patientId:"1441561678652",	     //string	是	患者id
                //isValid:"1",	    //string	是	是否有效1-有效0-无效
                firstResult:"0",	//string	是	分页参数
                maxResult:"9999"	//string	是	分页参数
            };
            _t.callAjax({
                path: _t.XHRList.cardType,
                data:_data,
                callBack:function(data){
                    //处理返回数据
                    if(data&&data.responseObject&&data.responseObject.responseData){
                        var _dataList=data.responseObject.responseData.dataList[0],
                            _social=_dataList.social,
                            _role=_dataList.role;
                        $('.au-perfectInfoItem').find('.cardTypeBox select').append(_t.template.cardTypeHtml(_role));    //证件类型
                        $('.au-perfectInfoItem').find('.protectTypeBox select').append(_t.template.cardTypeHtml(_social));  //社保类型
                        _t.baseInformation();
                    }
                }
            })
        },

        //获取个人信息
        baseInformation:function(){
            var _t = this;
            var _data={
                patientId: _t.config.patientId,	     //string	是	患者id
                firstResult:"0",	//string	是	分页参数
                maxResult:"1"	//string	是	分页参数
            };
            _t.callAjax({
                path: _t.XHRList.baseInfo,
                data:_data,
                callBack:function(data){
                    //处理返回数据
                    if (data&&data.responseObject&&data.responseObject.responseStatus) {
                        _t.config.message = data.responseObject.responseMessage;
                    }
                    if(data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList){
                        var _dataLists=data.responseObject.responseData.dataList;
                        if (_dataLists&&_dataLists.length>0) {
                            var _dataList = _dataLists[0],
                                patientName=_dataList.patientName,   //患者名称
                                patientId=_dataList.patientId,       //患者ID
                                certificateId=_dataList.certificateId,       //证件类型ID
                                certificateCode=_dataList.certificateCode,   //证件号码
                                mobile=_dataList.mobile,           //手机号码
                                province=_dataList.province,       //所在地省
                                provinceId=_dataList.provinceId,   //所在地省ID
                                city=_dataList.city,               //所在地市
                                cityId=_dataList.cityId,           //所在地市ID
                                district=_dataList.district,       //所在地区/县
                                districtId=_dataList.districtId,   //所在地区/县ID
                                socialId=_dataList.socialId,       //社保类型ID
                                socialProvince=_dataList.socialProvince,       //社保省
                                socialProvinceId=_dataList.socialProvinceId,   //社保省ID
                                socialCity=_dataList.socialCity,               //社保市
                                socialCityId=_dataList.socialCityId,           //社保市ID
                                socialDistrict=_dataList.socialDistrict,       //社保区/县
                                socialDistrictId=_dataList.socialDistrictId,   //社保区/县ID
                                remark=_dataList.remark;                        //备注
                                // socialText='';
                            //姓名
                            if(patientId != ""){
                                $('.au-perfectInfoList').find('.au-perfectInfoItem[data-type=1]').addClass('active').find('input').val(patientName).attr("data-patientId",patientId);
                            }
                            //证件类型
                            if(certificateId !== ""&&parseInt(certificateId)>0){
                                var _text=$('.au-perfectInfoItem[data-type=2]').find('option[data-typeid='+certificateId+']').val();
                                $('.au-perfectInfoItem[data-type=2]').find('.show').text(_text).addClass('selected');
                                $('.au-perfectInfoList').find('.au-perfectInfoItem[data-type=2]').addClass('active').attr("data-typeid",certificateId);
                            }
                            //证件号码
                            if(certificateCode != ""){
                                $('.au-perfectInfoList').find('.au-perfectInfoItem[data-type=3]').addClass('active').find('input').val(certificateCode);
                            }
                            //联系电话
                            if(mobile != ""){
                                $('.au-perfectInfoList').find('.au-perfectInfoItem[data-type=4]').addClass('active').find('input').val(mobile);
                            }
                            //患者所在地
                            if(province != ""){
                                $('.au-perfectInfoList').find('.au-perfectInfoItem[data-type=5]').addClass('active').find('span').text(province+ " " +city+ " " +district).attr({
                                    "data-provinceId":provinceId,"data-cityId":cityId,"data-districtId":districtId,
                                    "data-province":province,"data-city":city,"data-district":district
                                }).addClass("selected").closest('.au-perfectInfoItemRight').addClass('hasSelect');
                            }
                            //社保类型
                            if(socialId !== "0"){
                                var _socialText=$('.au-perfectInfoItem[data-type=6]').find('option[data-typeid='+socialId+']').val();
                                $('.au-perfectInfoItem[data-type=6]').find('.show').text(_socialText).addClass('selected');
                                $('.au-perfectInfoList').find('.au-perfectInfoItem[data-type=6]').addClass('active').attr("data-typeid",socialId);
                            }
                            //社保所在地
                            if(socialProvince != ""){
                                $('.au-perfectInfoList').find('.au-perfectInfoItem[data-type=7]').addClass('active').find('span').text(socialProvince+ " " +socialCity + " " +socialDistrict).attr({
                                    "data-provinceId":socialProvinceId,"data-cityId":socialCityId,"data-districtId":socialDistrictId,
                                    "data-province":socialProvince,"data-city":socialCity,"data-district":socialDistrict
                                }).addClass("selected").closest('.au-perfectInfoItemRight').addClass('hasSelect');
                            }
                            //备注
                            $(".au-perfectInfoItem").find(".remark textarea").val($.trim(remark));
                        }
                    }
                    _t.quesThreeCheck();
                    _t.savePatientInfo();
                }
            })
        },

        //判断最后一题页面的必填项是否填写
        quesThreeCheck:function(){
            var that=this,
                _requireActNum=$(".au-perfectInfoItem.active[data-required=1]"),  //必选已填总数
                _requireNum=$(".au-perfectInfoItem[data-required=1]");            //必选总数
            if(_requireActNum&&_requireNum&&_requireActNum.length==_requireNum.length){
                $('#saveInfoBtn').removeClass("disabled");
            }else{
                $('#saveInfoBtn').addClass("disabled");
            }
        },

        //最后一题中select的事件及验证
        selectChange: function () {
            var that =this;
            $('.au-perfectInfoItemRight.hasSelect select').on('change',function () {
                var selectVal = $(this).val(),
                    _optionEle=$(this).find('option:selected').data('typeid'),
                    _elType=$(this).data('check');
                $(this).siblings('.show').text(selectVal).addClass('selected');
                $(this).closest('.au-perfectInfoItem').addClass('active');
                switch (_elType){
                    case 1:
                        $('.au-perfectInfoItem[data-type=3]').removeClass('active').find('input').val("");
                        switch (_optionEle){
                            case 1:
                                $(this).closest('.au-perfectInfoItem').attr("data-typeid","1");
                                break;
                            case 2:
                                $(this).closest('.au-perfectInfoItem').attr("data-typeid","2");
                                break;
                            case 3:

                                $(this).closest('.au-perfectInfoItem').attr("data-typeid","5");
                                break;
                        }
                        break;
                    case 2:
                        $('.au-perfectInfoItem[data-type=7]').removeClass('active').find('input').val("");
                        switch (_optionEle){
                            case 1:
                                $(this).closest('.au-perfectInfoItem').attr("data-typeid","1");
                                break;
                            case 2:
                                $(this).closest('.au-perfectInfoItem').attr("data-typeid","2");
                                break;
                            case 3:
                                $(this).closest('.au-perfectInfoItem').attr("data-typeid","3");
                                break;
                            case 4:
                                $(this).closest('.au-perfectInfoItem').attr("data-typeid","4");
                                break;
                            case 5:
                                $(this).closest('.au-perfectInfoItem').attr("data-typeid","5");
                                break;
                        }
                        break;
                }
                that.quesThreeCheck();
            });
        },
        //最后一题的input的验证
        inputVerify : function () {
            var that = this;
            $('.au-perfectInfoList').find('input').blur(function(){
                var _quesType=$(this).closest('.au-perfectInfoItem').data('type'),
                    _cureName=$(this).val(),
                    _text='';
                //表单验证
                switch (_quesType){
                    case 1://姓名
                        if(_cureName.length>0){
                            $(this).validate({
                                errorEle: function(msg){
                                    common.popup({
                                        text:msg
                                    })
                                },
                                rules: [{
                                    rule: "normalString",
                                    msg: "请输入有效的姓名"
                                },{
                                    rule: "isNoEmpty",
                                    msg: "请填写真实姓名"
                                }, {
                                    rule: "maxLength:20",
                                    msg: "请填写真实姓名"
                                }, {
                                    rule: "special",
                                    msg: "请填写真实姓名"
                                },{
                                    rule: "nameSpace",
                                    msg: "请填写真实姓名"
                                },{
                                    rule: "noNumber",
                                    msg: "请填写真实姓名"
                                }]
                            });
                            if($(this).attr('data-validate')=="true"){
                                $(this).closest('.au-perfectInfoItem').addClass('active');
                            }else{
                                $(this).closest('.au-perfectInfoItem').removeClass('active');
                            }
                        }else{
                            $(this).closest('.au-perfectInfoItem').removeClass('active');
                        }
                        break;
                    case 2://证件类型，在select验证
                        break;
                    case 3:
                        _text="证件号不能为空";
                        var _cardType=$(this).closest('.au-perfectInfoItem').prev().attr('data-typeid');
                        switch (_cardType){
                            case "1":
                                $(this).validate({
                                    errorEle: function(msg){
                                        common.popup({
                                            text:msg
                                        })
                                    },
                                    rules: [{
                                        rule: "identityCard",
                                        msg: "身份证号码输入有误"
                                    }]
                                });
                                if($(this).attr('data-validate')=="true"){
                                    $(this).closest('.au-perfectInfoItem').addClass('active');
                                }else{
                                    $(this).closest('.au-perfectInfoItem').removeClass('active');
                                }
                                break;
                            case "2":
                                //军官证验证
                                if(_cureName.length>0){
                                    $(this).closest('.au-perfectInfoItem').addClass('active');
                                }else{
                                    $(this).closest('.au-perfectInfoItem').removeClass('active');
                                }
                                break;
                            case "3":
                                //护照验证
                                if(_cureName.length>0){
                                    $(this).closest('.au-perfectInfoItem').addClass('active');
                                }else{
                                    $(this).closest('.au-perfectInfoItem').removeClass('active');
                                }
                                break;
                        }
                        break;
                    case 4://手机号
                        if(_cureName.length>0){
                            $(this).validate({
                                errorEle: function(msg){
                                    common.popup({
                                        text:msg
                                    })
                                },
                                rules: [{
                                    rule: "isMobile",
                                    msg: "手机号码输入有误"
                                }]
                            });
                            if($(this).attr('data-validate')=="true"){
                                $(this).closest('.au-perfectInfoItem').addClass('active');
                            }else {
                                $(this).closest('.au-perfectInfoItem').removeClass('active');
                            }
                        }else{
                            $(this).closest('.au-perfectInfoItem').removeClass('active');
                        }
                        break;
                    case 5://患者所在地区
                        if(_cureName.length>0){
                            $(this).closest('.au-perfectInfoItem').addClass('active');
                            //if($(this).attr('data-validate')=="true"){
                            //    $(this).closest('.au-perfectInfoItem').addClass('active');
                            //}else {
                            //    $(this).closest('.au-perfectInfoItem').removeClass('active');
                            //}
                        }else{
                            $(this).closest('.au-perfectInfoItem').removeClass('active');
                        }
                        break;
                }
                that.quesThreeCheck();
            });
        },
        //最后一题的路由返回以及健康辅助信息返回置顶
        lastRouterBack : function () {
            var lastRouter = $(".patientInfo").attr("data-sort");
            Q.reg(lastRouter,function () {
                $(".he-main").show();
                $(".search-box").remove();
                $(".searchTypeSelect").html("");
                window.scrollTo(0,0);
            });
            //既往史的路由
            var cureHistoryRouter = $(".cureHistory").attr("data-sort");
            Q.reg(cureHistoryRouter,function () {
                window.scrollTo(0,0);
            });
        },
        //最后一题的患者所在地、社保所在地的选择时间
        locationSelect:function () {
            var that = this;
            //患者所在地
            Q.reg('city', function () {
                modules.searchList({
                    targetEle: $("#ev-go-to-select-city"),
                    type: "city",
                    level:"2",
                    finalLevel:"4",
                    back:that.config.infoView,
                    noResultCallback:function () {

                    },
                    backCallback:function(){
                        var _province=$("#ev-go-to-select-city").attr("data-province"),
                            _city=$("#ev-go-to-select-city").attr("data-city"),
                            _district=$("#ev-go-to-select-city").attr("data-district");
                        $("#ev-go-to-select-city").val(_province+_city+_district).addClass("selected").closest('.au-perfectInfoItemRight').addClass('hasSelect').closest(".au-perfectInfoItem").addClass("active");
                        that.quesThreeCheck();
                    }
                })
            });
            //社保所在地
            Q.reg('perfectCity', function () {
                modules.searchList({
                    targetEle: $("#ev-go-to-select-perfect"),
                    type: "city",
                    level:"2",
                    finalLevel:"4",
                    back:that.config.infoView,
                    noResultCallback:function () {

                    },
                    backCallback:function(){
                        var _province=$("#ev-go-to-select-perfect").attr("data-province"),
                            _city=$("#ev-go-to-select-perfect").attr("data-city"),
                            _district=$("#ev-go-to-select-perfect").attr("data-district");
                        $("#ev-go-to-select-perfect").val(_province+_city+_district).addClass("selected").closest('.au-perfectInfoItemRight').addClass("hasSelect").closest(".au-perfectInfoItem").addClass("active");
                        that.quesThreeCheck();
                    }
                })
            });



            //患者所在地
            $("#ev-go-to-select-city").on("click", function () {
                Q.go('city', function (a) {});
            });
            //社保所在地
            $("#ev-go-to-select-perfect").on("click", function () {
                Q.go('perfectCity', function (a) {});
            })
        },

        //最后一题的保存按钮
        savePatientInfo : function () {
            var that=this;
            $('#saveInfoBtn').on('click',function () {
                var _requireActNum=$(".au-perfectInfoItem.active[data-required=1]"),  //必选已填总数
                    _requireNum=$(".au-perfectInfoItem[data-required=1]");            //必选总数
                if(_requireActNum&&_requireNum&&_requireActNum.length==_requireNum.length){
                    var _data={
                        patientName:$('.au-perfectInfoItem[data-type=1]').find('input').val(),                  //患者名称
                        patientId:that.config.patientId,   //患者ID
                        certificateId:$('.au-perfectInfoItem[data-type=2]').attr("data-typeid")||"",                //证件类型ID
                        certificateCode:$('.au-perfectInfoItem[data-type=3]').find('input').val()||"",              //证件号码
                        mobile:$('.au-perfectInfoItem[data-type=4]').find('input').val(),                       //手机号码
                        province:$('.au-perfectInfoItem[data-type=5]').find('span').attr("data-province"),       //所在地省
                        provinceId:$('.au-perfectInfoItem[data-type=5]').find('span').attr("data-provinceId"),   //所在地省ID
                        city:$('.au-perfectInfoItem[data-type=5]').find('span').attr("data-city"),               //所在地市
                        cityId:$('.au-perfectInfoItem[data-type=5]').find('span').attr("data-cityId"),           //所在地市ID
                        district:$('.au-perfectInfoItem[data-type=5]').find('span').attr("data-district"),       //所在地区/县
                        districtId:$('.au-perfectInfoItem[data-type=5]').find('span').attr("data-districtId"),   //所在地区/县ID
                        socialId:$('.au-perfectInfoItem[data-type=6]').attr("data-typeid")||"",                       //社保类型ID
                        socialProvince:$('.au-perfectInfoItem[data-type=7].active').find('span').attr("data-province")||"",       //社保省
                        socialProvinceId:$('.au-perfectInfoItem[data-type=7].active').find('span').attr("data-provinceId")||"",   //社保省ID
                        socialCity:$('.au-perfectInfoItem[data-type=7].active').find('span').attr("data-city")||"",               //社保市
                        socialCityId:$('.au-perfectInfoItem[data-type=7].active').find('span').attr("data-cityId")||"",           //社保市ID
                        socialDistrict:$('.au-perfectInfoItem[data-type=7].active').find('span').attr("data-district")||"",       //社保区/县
                        socialDistrictId:$('.au-perfectInfoItem[data-type=7].active').find('span').attr("data-districtId")||"",    //社保区/县ID
                        caseRemark:$(".au-perfectInfoItem").find(".remark textarea").val(),          //备注
                        isShunt:1,
                        caseId:common.getpara().caseId
                    };
                    if (that.config.message) {
                        var sentUrl = that.XHRList.submit;
                    } else {
                        var sentUrl = that.XHRList.updateInfo;
                    }
                    console.log(sentUrl);
                    that.callAjax({
                        data:_data,
                        path:sentUrl,
                        callBack:function(rep){
                            if (rep.responseObject.responseStatus) {
                                window.location.href = "/pages/imScene/im_main_scene.html?from=op_help&caseId=" + common.getpara().caseId + "&patientId=" + common.getpara().patientId + "&customerId=" + common.getpara().customerId + "&shuntCustomerId=" + rep.responseObject.responseData.shuntCustomerId;
                            }
                        }
                    })
                }
            })
        },

        //症状选择
        selectSymptom: function () {
            $("body").on("click", '.util-selector [data-role="selector"]', function (e) {
                var selector = $(this).parent();
                var router = $("html").attr("view");
                e.stopPropagation();
                if (!$(e.target).hasClass("symptom-detail-desc") && $(e.target).parents(".symptom-detail-desc").size() === 0) {
                    $(this).find('.symptom-detail-desc').hide();
                } else if ($(e.target).hasClass("symptom-detail-desc") || $(e.target).parents(".symptom-detail-desc").size() !== 0) {
                    return false;
                }
                if (selector.hasClass('sSelector')) {
                    $(this).addClass('selected').siblings().removeClass('selected');
                } else if (selector.hasClass('mSelector')) {
                    $(this).toggleClass("selected");
                }

                if ($(".symptom-desc-inner[data-sort='" + router + "']").find(".util-selector").eq(0).find(">.selected").size() === 0) {
                    $(".au-controller[data-sort='" + router + "']").find(".next,.sure").addClass("unfinish");
                } else {
                    $(".au-controller[data-sort='" + router + "']").find(".next,.sure").removeClass("unfinish");
                }
            });
        },
        //显示症状详情
        symptomQuery: function () {
            var that = this;
            $("body").on("click", function (e) {
                if (!$(e.target).hasClass(".symptom-detail-desc") && $(e.target).parents(".symptom-detail-desc").size() === 0) {
                    $('.symptom-detail-desc').hide();
                } else if ($(e.target).hasClass(".symptom-detail-desc") || $(e.target).parents(".symptom-detail-desc").size() !== 0) {
                    return false;
                }
            });

            $("body").on("click", ".icon-pain-detail", function (e) {
                e.stopPropagation();
                var container = $(this).parents(".symptom-desc-item");
                var id = container.attr("data-id");
                $(".symptom-detail-desc").hide()
                if (container.find(".symptom-detail-desc").size() === 1) {
                    container.find(".symptom-detail-desc").is(":visible") ? container.find(".symptom-detail-desc").hide() : container.find(".symptom-detail-desc").show();
                } else {

                    that.queryMessage($(this), {
                        optionId: id,
                        isValid: "1",
                        sortType: ""
                    });
                }
            })
        },
        //获取症状详情
        queryMessage: function (ele, obj) {
            var that = this;
            $.ajax({
                url: that.XHRList.symptomDetail,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                data: {
                    paramJson: $.toJSON(obj)
                },
                beforeSend: function () {
                    common.loading.show()
                }
            })
                .done(function (data) {
                    common.loading.hide();
                    if (data.responseObject.responseData) {
                        if (data.responseObject.responseData.dataList && data.responseObject.responseData.dataList.length !== 0) {
                            var dataList = data.responseObject.responseData.dataList[0];
                            ele.parent().append(that.template.symptomQuery(dataList));
                            setTimeout(function () {
                                ele.parent().find(".symptom-detail-desc").show();
                            }, 300)
                        }
                    }
                })
                .fail(function () {
                    common.loading.hide()
                });
        }
        ,
        //前往下一步的验证...
        nextBtnValidate: function () {
            var that = this,
                router = $("html").attr("view"),
                container = $(".symptom-desc-inner[data-sort='" + router + "']");
            if (container.find(".selected .symptom-desc-second-form").size() !== 0) {
                var flag = true;
                container.find(".selected .symptom-desc-second-form").each(function (index, element) {
                    if (($(element).find(".pain-level").size() === 0 && $(element).find(".symptom-desc-others-content").size() === 0) && $(element).find(".selected").size() === 0) {
                        common.alertBox({
                            content: "您还有未完成的症状描述",
                            ensure: "确定",
                            ensureCallback: function () {
                                var a = $(element).offset().top;
                                $("body").animate({
                                    "scrollTop": a
                                }, 1000, "swing");
                            }
                        });
                        flag = false;
                    } else if ($(element).find(".symptom-desc-others-content").size() !== 0 && $(element).find(".symptom-desc-others-content").val().length === 0) {
                        common.alertBox({
                            content: "您还有未完成的症状描述",
                            ensure: "确定",
                            ensureCallback: function () {
                                return false;
                            }
                        });
                        flag = false;
                    }

                });
                if (flag) {
                    that.saveSelectAnswers(router);

                    return that.firstAnswerQuestion();
                }
                return flag;

            } else {
                that.saveSelectAnswers(router);

                return that.firstAnswerQuestion();
            }

        },
        //第一题中，存在主从症状的询问...
        firstAnswerQuestion: function () {
            var that = this;
            var router = $("html").attr("view");
            if (router === "consult1") {


                if ($(".symptom-desc-inner[data-sort='" + router + "']").find(".util-selector").eq(0).find(">.selected").size() > 1) {

                    var btnList = [];
                    $(".symptom-desc-inner[data-sort='consult1'] .selected").each(function (index, element) {
                        if ($(element).parents(".symptom-desc-second-form").size() === 0) {
                            btnList.push({
                                className: "btn-hollow main-symptom",
                                id: $(element).attr("data-id"),
                                content: $(element).find(">article>span").text(),
                                href: "javascript:void(0)"
                            })
                        }
                    });
                    common.btnBox({
                        title: $(".symptom-desc-inner[data-sort='" + router + "']").attr("data-prompt"),
                        direction: "horizontal",
                        btn: btnList
                    });

                    $(".main-symptom").on("click", function () {
                        that.config.optionList[0].mainOptionId = $(this).attr("id");
                        $(".btnBox-tips").remove();
                        if (that.config.questionLength == 1) {
                            that.submitSymptomMessage();
                        }
                        Q.go('consult2');
                    });
                    return false;

                } else if ($(".symptom-desc-inner[data-sort='" + router + "']").find(".util-selector").eq(0).find(">.selected").size() === 1) {
                    that.config.optionList[0].mainOptionId = $(".symptom-desc-inner[data-sort='" + router + "']").find(".util-selector").eq(0).find(">.selected").attr("data-id");
                }
            }
        },
        //保存前几道症状咨询的答案
        saveSelectAnswers: function (router) {
            var container = $(".symptom-desc-inner[data-sort='" + router + "']");
            var firstS = [], secondS = [];
            var list = [];
            var index = parseInt(router.substr(-1, 1)) - 1;

            var that = this;
            container.find(".selected").each(function (index, element) {
                if ($(element).parents(".symptom-desc-second-form").size() > 0) {
                    // if ($(element).parents(".symptom-desc-item").hasClass("selected")) {
                    //     list.push($(element).attr("data-id"));
                    // }
                } else {
                    list.push($(element).attr("data-id"));
                }
            });
            container.find(".selected .symptom-desc-second-form").each(function (index, element) {
                var sList = {}, sQ = [], sQId = "";

                $(element).find(".selected").each(function (index, element) {
                    sQ.push($(element).attr("data-id"));
                });

                that.secondList["s" + $(element).attr("data-qid")+$(element).parents(".symptom-desc-item").attr("data-id")] = {
                    questionId: $(element).attr("data-qid"),
                    partId: common.getpara().partId,
                    optionDesc: (function () {
                      if ($(element).find(".symptom-desc-others-content").size()>0){
                          return $(element).find(".symptom-desc-others-content").val();
                      }else{
                          return "";
                      }
                    }()),
                    refOptionId:$(element).parents(".symptom-desc-item.selected").attr("data-id")||"",
                    mainOptionId: "",
                    optionIdList: sQ.join(","),

                };
                sQid = $(element).parents(".symptom-desc-second-form").attr("data-qid");
                console.log(that.secondList)
            });
            if (container.find(".selected .pain-level-select").size() !== 0) {
                var level = $(".selected .pain-level-select").val();
                var levelId = $(".pain-level-title .num[data-level='" + level + "']").attr("data-id");
                this.config.optionList[index].optionDesc = level;

            }
            this.config.optionList[index].optionDesc = (function () {
                var result = "";
                if (container.find(".time-selector").size() !== 0) {
                    result = container.find(".time-selector .selected").text();
                } else if (container.find(".symptom-desc-others-content").size() !== 0 && container.find(".symptom-desc-others-content").val().length !== 0) {
                    result = container.find(".symptom-desc-others-content").val();
                } else if (container.find(".selected .pain-level-select").size() !== 0) {
                    var level = $(".selected .pain-level-select").val();
                    var levelId = $(".pain-level-title .num[data-level='" + level + "']").attr("data-id");
                    result = level;
                }
                return result;
            }());

            this.config.optionList[index].optionIdList = list.join(",");
            console.log(this.config.optionList);
            console.log(that.secondList)

        },
        //    假若返回上一步，当前页的答案清空，上一页保留...
        backToLastRouter: function () {
            var router = $("html").attr("view"),
                container = $(".symptom-desc-inner[data-sort='" + router + "']");
            container.find(".symptom-desc-item").each(function (index, element) {
                $(element).removeClass("selected");
            });
            container.find(".next").addClass("unfinish");
        },
        //根据缓存调取用户退出前作答的数据...
        getAnswersCache: function () {
            //新入用户，可能无作答记录...
            var router = $("html").attr("view");
            if (localStorage.getItem("answers")) {
                this.config.answers = JSON.parse(localStorage.getItem("answers"));
                for (var i in this.config.answers) {
                    $(this.config.answers[i]).each(function (index, element) {
                        if (element.first) {
                            var container = $(".symptom-desc-inner[data-sort='consult" + i + "']");
                            var first = element.first.split(",");
                            var second = element.second.split(",");

                            $(first).each(function (index, element) {
                                container.find(".util-selector>.symptom-desc-item[data-id='" + element + "']").addClass("selected");
                            });

                            $(second).each(function (index, element) {
                                container.find(".util-selector>.symptom-desc-item[data-id='" + element + "']").addClass("selected");
                            });
                        }
                    })
                }

                if ($(".symptom-desc-inner[data-sort='" + router + "']").find(".util-selector").eq(0).find(">.selected").size() === 0) {
                    $(".symptom-desc-controller[data-sort='" + router + "']").find(".next").addClass("unfinish");
                } else {
                    $(".symptom-desc-controller[data-sort='" + router + "']").find(".next").removeClass("unfinish");
                }
            }
        },
        //前几道题的保存按钮...
        confirmNext: function () {
            var that = this;
            $("body").on("click", ".sure", function () {
                if (that.nextBtnValidate() === false) {
                    return false;
                }

                //通过判断缓存是否存在CaseId确定提交的走向...
                var router = $("html").attr("view"),
                    container = $(".symptom-desc-inner[data-sort='" + router + "']");
                if (container.find(".selected").size() === 0) {
                    return false;
                }
                that.submitSymptomMessage(this);
                that.getButtonUnfinish(router);
                // var cache = localStorage.getItem("caseId");
                // if (cache) {
                //     window.location.href = "//m.allinmed.cn/pages/imScene/im_main_scene.html?caseId=" +cache+"&patientId="+common.getpara().patientId+"&from=symptom";
                // } else {
                //     common.btnBox({
                //         title: "您还有其他伴随症状吗？",
                //         direction: "horizontal",
                //         btn: [
                //             {
                //                 className: "btn-primary no-other-symptom",
                //                 id: "",
                //                 content: "没有了",
                //                 href: "//m.allinmed.cn/pages/imScene/im_main_scene.html"
                //             },
                //             {
                //                 className: "btn-hollow has-other-symptom",
                //                 id: "",
                //                 content: "有",
                //                 href: "select_parts.html?sex=" + common.getpara().sex + "&age=" + common.getpara().age + "&patientId=" + common.getpara().patientId + "&caseId=" + that.config.caseId
                //             }
                //         ]
                //     })
                // }
            });
            //没有其他症状...执行后跳转至IM
            // $("body").on("click", ".no-other-symptom", function (e) {
            //     e.preventDefault();
            //     that.allAnswerSubmit(this);
            // });
            //有其他症状...返回部位选择并记录次数为1
            //Q：次数谁来记录？
            // $("body").on("click", ".has-other-symptom", function (e) {
            //     e.preventDefault();
            //     that.allAnswerSubmit(this);
            // });
        },

        //前几道症状咨询的答案提交...
        // allAnswerSubmit: function (e) {
        //     var that = this;
        //     var data = {
        //         visitSiteId: 1,
        //         patientId: window.location.search.split("&")[1].split("=")[1],
        //         caseType: 0,
        //         customerId: "123"
        //     };
        //     $.ajax({
        //         url: this.XHRList.createMedicalRecord,
        //         type: 'POST',
        //         dataType: "json",
        //         data: {
        //             paramJson: $.toJSON(data)
        //         },
        //         timeout: 10000,
        //         beforeSend: function () {
        //             common.loading.show()
        //         }
        //     })
        //         .done(function (data) {
        //             common.loading.hide()
        //             if (data.responseObject.responseStatus) {
        //                 that.config.caseId = data.responseObject.responsePk;
        //                 that.submitSymptomMessage(e)
        //             }
        //         })
        //         .fail(function () {
        //             common.loading.hide()
        //         });
        // },
        submitSymptomMessage: function (e) {
            var that = this;
            for (var i in this.secondList) {
                this.config.optionList.push(this.secondList[i]);
            }
            console.log(this.config.optionList)

            that.config.optionList = JSON.stringify((this.config.optionList));
            var data = {};
            data.caseId = that.config.caseId;
            data.visitSiteId = "17";
            data.optionList = that.config.optionList;
            data.partId = that.config.partId;
            data.patientId = that.config.patientId;
            $.ajax({
                url: this.XHRList.submitMedicalRecord,
                type: 'POST',
                dataType: "json",
                data: {
                    paramJson: $.toJSON(data)
                },
                timeout: 10000,
                beforeSend: function () {
                    common.loading.show()
                }
            })
                .done(function (data) {
                    common.loading.hide();
                    if (data.responseObject.responseStatus) {
                        console.log("症状描述保存成功");
                    }
                    // if (data.responseObject.responseStatus) {
                    //     if ($(e).hasClass("has-other-symptom")) {
                    //         localStorage.setItem("caseId", that.config.caseId);
                    //         window.location.href = "select_parts.html?sex=" + common.getpara().sex + "&age=" + common.getpara().age + "&patientId=" + common.getpara().patientId + "&caseId=" + that.config.caseId;
                    //     } else if ($(e).hasClass("no-other-symptom")) {
                    //         window.location.href = "//m.allinmed.cn/pages/imScene/im_main_scene.html?caseId=" + that.config.caseId;
                    //     }
                    // }
                })
                .fail(function () {
                    common.loading.hide()
                });
        },

        //    输入字数限制
        inputCountLimit: function () {
            $("body").on("input propertychange", ".au-cureHisItemInfo textarea,.symptom-desc-others-content,.au-perfectInfoItem .remark textarea",function () {
                
                if ($(this).val().length > 500) {
                    $(this).val($(this).val().substring(0, 500));
                }
            })
        },
        //时间选择
        timeSelector: function () {

            $("body").on("blur", ".time-selector-input", function () {
                var router = $("html").attr("view");
                if ($(this).val().length !== 0) {
                    $(".symptom-desc-controller[data-sort='" + router + "'] .next").removeClass("unfinish");
                }
            });
        },
        painLevel: function () {

            $("body").on("change", ".pain-level-select", function () {
                var level = Math.round($(this).val());
                $(this).siblings(".pain-level-title").find(".num").hide();
                $(this).siblings(".pain-level-title").find(".level-tip").text(level)
                switch (level) {
                    case 0:
                        $(this).siblings(".pain-level-title").find(".num[data-level='0']").show();
                        break;
                    case 1:
                    case 2:
                    case 3:
                        $(this).siblings(".pain-level-title").find(".num[data-level='1']").show();
                        break;
                    case 4:
                    case 5:
                    case 6:
                        $(this).siblings(".pain-level-title").find(".num[data-level='2']").show();
                        break;
                    case 7:
                    case 8:
                    case 9:
                        $(this).siblings(".pain-level-title").find(".num[data-level='3']").show();
                        break;
                }
                $(".pain-level").attr("data-result", level);
            })
        },
        //公用Ajax数据请求
        callAjax: function (dv) {
            common.loading.show();
            var t = this,
                params = {paramJson: $.toJSON(dv.data)};
            $.ajax({
                url: dv.path,
                type: "POST",
                data: params,
                //time : 5000,
                success: function (data) {
                    common.loading.hide();
                    dv.callBack(data);
                },
                error: function () {
                    common.loading.hide();
                }
            });
        }
    };
    controller.init();
});
