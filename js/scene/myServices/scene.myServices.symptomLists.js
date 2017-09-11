/**
 * @name:
 * @desc:
 * @example:
 * @depend: modules.searchList()，modules.upLoadFiles()
 * @date: 2017/4/13
 * @author: wangjingrong
 */
$(function () {
    var reviceSymptom = {
        config: {
            customerId: common.getpara().customerId,
            patientId: common.getpara().patientId,
            caseId: common.getpara().caseId,
            attachmentList: []
        },
        path: {
            getInquiryPage: '/mcall/customer/patient/case/v1/getMapById/',           //问诊单
            returnVisitSubmit: '/mcall/customer/patient/case/v1/createVisitCase/',   //提交复诊
            getDesList: '/mcall/cms/part/question/relation/v1/getMapList/',          //症状问答
            baseInfo: '/mcall/customer/patient/baseinfo/v1/getMapList/'             //个人信息
        },
        template: {
	        baseInformHtml:function (data) {
		        //问诊单生成时间
		        var caseTime = data.caseTime.split(' ')[0],
			        _caseTime = caseTime.split('-')[0] + '年' + caseTime.split('-')[1] + '月' + caseTime.split('-')[2] + '日'
		        //判断患者头像
		        var sex = data.sexName,
			        age = parseInt(data.age),
			        img = "";
		        if (age <= 12) {
			        img = "/image/img00/myServices/chatting_portrait_child@2x.png";
		        } else if (age > 12 && age <= 59) {
			        img = (sex === "男" ? "/image/img00/myServices/chatting_chatting_man@2x.png" : "/image/img00/myServices/chatting_portrait_woman@2x.png");
		        } else if (age >= 60) {
			        img = (sex === "男" ? "/image/img00/myServices/chatting_portrait_old_man@2x.png" : "/image/img00/myServices/chatting_portrait_old_woman@2x.png");
		        }
                var baseInformHtml = '<section id="ev-baseInfom" class="tc-baseInfo" data-patientId="' + data.patientId + '" data-patientName="' + data.patientName + '">' +
	                '<ul class="tc-baseInfoList">' +
	                '<li class="tc-baseInfoItem">' +
	                '<div class="tc-baseInfoItemLeft">' +
	                '<img src="' + img + '">' +
	                '</div>' +
	                '<div class="tc-baseInfoItemRight">' +
	                '<span class="tc-baseInfoName">' + data.patientName + '</span>' +
	                '<span class="tc-baseInfoSex">' + data.sexName + '</span>' +
	                '<span class="tc-baseInfoAge">' + data.age + '岁</span>' +
	                '</div>' +
	                '</li>' +
	                '<li class="tc-baseInfoItem">' +
	                '<div class="tc-baseInfoItemLeft">问诊日期</div>' +
	                '<div class="tc-baseInfoItemRight">'+ _caseTime + '</div>' +
	                '</li>' +
	                '</ul>' +
	                '<section class="tc-baseInfoItem">'+
	                '<div class="tc-baseInfoItemLeft">主诉</div>'+
	                '<div class="tc-baseInfoItemRight tc-recommendUserMain">'+data.caseMain.caseMain+'</div>'+
	                '</section>'+
	                '</section>';
		        return baseInformHtml;
	        },
	        mainSymptomHtml:function (data) {
                var mainSymptomHtml = '<section id="ev-mainSymptom" class="tc-caseDescribe tc-module">' +
	                '<section class="tc-caseDescribeTitle title">' +
	                '<h3>症状描述</h3>' +
	                '</section>' +
	                '<ul class="tc-caseDescribeList">' +
	                '<li class="tc-caseDescribeItem">' +
	                '<span class="tc-caseDescribeItemLeft">不适部位</span><span class="tc-caseDescribeItemRight tc-noRevice" id="ev-parts" data-partid="' + data[0].partId + '">' + data[0].partName + '</span>' +
	                '</li>' +
	                (function () {
		                //症状描述列表
		                var result = "";
		                $.each(data, function (index, element) {
			                //外层问题描述
			                var questionDesc = element.questionDesc,
				                questionId = element.questionId,
				                mainOptionId = "",
				                otherDes = "";
			                var firstArry = [],
				                optionIdListArray = [],
				                mainOptionIdArray = [];
			                $.each(element.symptomOptions, function (inde, eleme) {
				                //内层各个问题详情
				                var secondArray = [];
				                //是否是主要问题
				                if (eleme.isMain == 1) {
					                mainOptionIdArray.push(eleme.optionId)
				                }
				                //判断问题是否是--其他
				                if (eleme.isAttachment == 2) {
					                secondArray.push(eleme.optionDesc);
				                } else {
					                secondArray.push(eleme.optionName);
				                }
				                optionIdListArray.push(eleme.optionId);
				                //第三层问题---疼痛分级
				                if (eleme.refQuestionList.length > 0) {
					                $.each(eleme.refQuestionList, function (ind, ele) {
						                secondArray.push(ele.symptomOptions[0].optionName);
						                optionIdListArray.push(ele.symptomOptions[0].optionId);
					                })
				                }
				                var secondString = secondArray.join("-");
				                firstArry.push(secondString);
				                otherDes += (eleme.optionDesc ? eleme.optionDesc + ',' : '');
			                });
			                var firstString = firstArry.join("、"),
				                optionIdList = optionIdListArray.join(",");
			                //判断其他问题是否存在
			                if (otherDes.length > 0) {
				                var _otherDes = otherDes.substring(0, otherDes.length - 1)
			                } else {
				                var _otherDes = otherDes;
			                }
			                mainOptionIdArray.length > 0 ? mainOptionId = mainOptionIdArray[0] : "";
			                result += '<li class="tc-caseDescribeItem" data-type>' +
				                '<span class="tc-caseDescribeItemLeft">' + questionDesc + '</span><span class="tc-caseDescribeItemRight" data-mainoptionid="' + mainOptionId + '" data-partid="' + element.partId + '" data-questionid="' + questionId + '" data-optionidlist="' + optionIdList + '" otherText="' + firstString + '" data-otherdes="' + _otherDes + '">' + firstString + '</span>' +
				                '</li>'
		                });
		                return result
	                })() +
	                '</ul>' +
	                '</section>'
                return mainSymptomHtml;
	        },
            nowDiseaseHtml:function (data) {
                var nowDiseaseHtml = '<section id="ev-nowHistory" class="tc-caseDescribe tc-module">' +
	                '<section class="tc-caseDescribeTitle title">' +
	                '<h3>现病史</h3>' +
	                '</section>' +
	                '<ul class="tc-caseDescribeList">' +
	                '<li class="tc-caseDescribeItem">' +
	                '<span class="tc-caseDescribeItemLeft">曾就诊医院</span>' +
	                '<span class="tc-caseDescribeItemRight" id="ev-choose-hospital" data-name="' + data.treatmentName + '" data-id="' + data.treatmentId + '">' + (data.treatmentName || "无") + '</span>' +
	                '</li>' +
	                '<li class="tc-caseDescribeItem">' +
	                '<span class="tc-caseDescribeItemLeft">确诊疾病</span>' +
	                '<span class="tc-caseDescribeItemRight" id="ev-choose-disease" data-name="' + data.illnessName + '" data-id="' + data.illnessId + '">' + (data.illnessName || "无") + '</span>' +
	                '</li>' +
	                '<li class="tc-caseDescribeItem ev-datumUpload">' +
	                '<span class="tc-caseDescribeItemLeft">检查资料</span>' +
	                '<span class="tc-caseDescribeItemRight tc-noRevice">未上传</span>' +
	                '</li>' +
	                '<li class="tc-caseDescribeItem">' +
	                '<span class="tc-caseDescribeItemLeft">患处照片</span>' +
	                '<span class="tc-caseDescribeItemRight tc-noRevice">未上传</span>' +
	                '</li>' +
	                '<li class="tc-caseDescribeItem">' +
	                '<span class="tc-caseDescribeItemLeft">服用药物</span>' +
	                '<span class="tc-caseDescribeItemRight">'+(data.takeMedicine || "无")+'</span>' +
	                '</li>' +
	                '</ul>' +
	                '</section>';
                return nowDiseaseHtml;
            },
	        detailInformHtml:function (data) {
                var detailInformHtml = '<section id="ev-detailInform" class="tc-caseDescribe tc-module">' +
	                '<section class="tc-caseDescribeTitle title">' +
	                '<h3>基本信息</h3>' +
	                '</section>' +
	                '<ul class="tc-caseDescribeList">' +
	                '<li class="tc-caseDescribeItem">' +
	                '<span class="tc-caseDescribeItemLeft">患者所在地</span>' +
	                '<span id="ev-choose-address" class="tc-caseDescribeItemRight patientLocation" data-provinceid="' + data.provinceId + '" data-cityid="' + data.cityId + '" data-districtid="' + data.districtId + '" data-province="' + data.provinceName + '" data-city="' + data.cityName + '" data-district="' + data.districtName + '">' + (data.provinceName + data.cityName + data.districtName) + '</span>' +
	                '</li>' +
	                '<li class="tc-caseDescribeItem">' +
	                '<span class="tc-caseDescribeItemLeft">手机号码</span><span class="tc-caseDescribeItemRight patientTel">' + data.mobile + '</span>' +
	                '</li>' +
	                '</ul>' +
	                '</section>'
                return detailInformHtml;
	        },
	        submitBtnHtml:function (data) {
		        var submitBtnHtml = '<section id="ev-comment" class="tc-caseDescribe tc-module tc-comment">' +
			        '<section class="tc-caseDescribeTitle title">' +
			        '<h3>备注</h3>' +
			        '</section>' +
			        '<ul class="tc-caseDescribeList tc-caseOtherBox">' +
			        '<textarea class="tc-caseDesOther" cols="30" rows="10" placeholder="填写要描述的内容">' + data.remark + '</textarea>' +
			        '</ul>' +
			        '</section>' +
			        '<section class="submit_symptom_box">' +
                    '<button class="submit_symptom">提交复诊单</button>' +
                    '</section>';
		        return submitBtnHtml;
	        }
        },
        init: function () {
            var t = this;
            t.addHtml();
            t.route();
            t.baseInformation();
            t.inputVerify();
            t.backStick();
        },
        addHtml: function () {
            var t = this;
            $.ajax({
                url: t.path.getInquiryPage,
                type: "POST",
                timeout: 5000,
                data: {
                    paramJson: $.toJSON({
                        caseId: t.config.caseId,
                        attUseFlag:1,
                        isOrder: 0
                    })
                },
                dataType: "json",
                beforeSend: function () {
                    common.loading.show()
                },
                success: function (data) {
                    if (data && data.responseObject && data.responseObject.responseData) {
                        var items = data.responseObject.responseData.dataList[0];
                        var caseContentBox = $(".tc-caseContentBox");
                        //个人信息
                        if(items.patientCasemap){
	                        caseContentBox.append(t.template.baseInformHtml(items.patientCasemap))
                        }
                        //症状描述
	                    if(items.resultMainList && items.resultMainList.length>0){
		                    caseContentBox.append(t.template.mainSymptomHtml(items.resultMainList))
	                    }
	                    //现病史
	                    if(items.patientCasemap){
		                    caseContentBox.append(t.template.nowDiseaseHtml(items.patientCasemap))
	                    }
	                    //基本信息
	                    if (items.patientCasemap && items.patientCasemap.mobile && items.patientCasemap.provinceName) {
		                    caseContentBox.append(t.template.detailInformHtml(items.patientCasemap))
	                    }
	                    //提交按钮
	                    if(items.patientCasemap){
		                    caseContentBox.append(t.template.submitBtnHtml(items.patientCasemap))
	                    }
	                    t.btnClick();
                    }
                    common.loading.hide();
                }
            })
        },
        route: function () {
            var t = this;
            //路由首页
            Q.reg('main', function () {
            });
            //路由手机号更改
            Q.reg('mobile',function () {

            });
            //路由症状修改
            Q.reg('symptomChange', function () {
                var questionId = localStorage.getItem("questionId"),
                    optionidLists = localStorage.getItem("optionidLists");
                //获取症状问答
                var param = {
                    partId: localStorage.getItem("partId"),
                    isValid: 1,
                    //sortType: 1,
                    questionId: questionId
                }
                $.ajax({
                    url: t.path.getDesList,
                    type: "POST",
                    timeout: 5000,
                    dataType: "json",
                    data: {paramJson: $.toJSON(param)},
                    success: function (data) {
                        if (data && data.responseObject && data.responseObject.responseData) {
                            var items = data.responseObject.responseData.dataList[0], quesListBox = '', quesList1 = '';
                            for (var i = 0; i < items.optionList1.length; i++) {
                                var itemsList = (items.optionList1)[i], quesList2Box = '';
                                if (itemsList.questionList2.length > 0) {
                                    for (var j = 0; j < itemsList.questionList2.length; j++) {
                                        var itemsList2 = itemsList.questionList2[j];
                                        var quesList2_2Box = '',
                                            quesList2_2 = '';
                                        if (itemsList2.optionList2.length > 0) {
                                            for (var k = 0; k < itemsList2.optionList2.length; k++) {
                                                var itemsList2_2 = itemsList2.optionList2[k];
                                                switch (parseInt(itemsList2.questionType)) {
                                                    case 3:
                                                        quesList2_2 = "<section class='pain-level'>" +
                                                            "<article class='pain-level-title'>" +
                                                            "<h3>当前值：</h3>" +
                                                            "<span class='num' data-level='0'><em class='level-tip'></em>（无痛）</span>" +
                                                            "<span class='num' data-level='1'><em class='level-tip'></em>（有轻微的疼痛，可以忍受）</span>" +
                                                            "<span class='num' data-level='2'><em class='level-tip'></em>（疼痛并影响睡眠，尚能忍受）</span>" +
                                                            "<span class='num' data-level='3'><em class='level-tip'></em>（有渐强烈的疼痛，疼痛难忍）</span>" +
                                                            "</article>" +
                                                            "<input type='range' class='pain-level-select' max='9' min='0' step='1'/>" +
                                                            "</section>";
                                                        break;
                                                    default:
                                                        quesList2_2 += '<section class="symptom-desc-item single-choices" data-role="selector" data-id="' + itemsList2_2.optionId + '">' +
                                                            '<p><i class="icon-select"></i><span>' + itemsList2_2.optionName + '<i></i></span></p>' +
                                                            '</section>'
                                                }
                                            }
                                            quesList2_2Box = '<section class="symptom-desc-form symptom-desc-second-form" data-role="selector">' +
                                                '<header class="symptom-desc-title"><h4>' + itemsList2.questionName + '</h4></header>' +
                                                '<section class="util-selector ' + (parseInt(itemsList2.questionType) === 1 ? "sSelector" : "mSelector") + '">' +
                                                quesList2_2 +
                                                '</section>' +
                                                '</section>'
                                        }
                                        quesList2Box += quesList2_2Box;
                                    }
                                }
                                if (itemsList.isAttachment == 2) {
                                    quesList1 += '<section class="symptom-desc-item ' + (parseInt(items.questionType) === 1 ? "single-choices" : "multiple-choices") + '" data-role="selector" data-id="' + itemsList.optionId + '">' +
                                        '<p><i class="icon-select"></i><span>' + itemsList.optionName + '</span></p>' +
                                        '<section class="symptom-desc-form symptom-desc-second-form" data-role="selector">' +
                                        '<section class="util-selector">' +
                                        '<section class="symptom-desc-item">' +
                                        '<textarea class="symptom-desc-others-content" placeholder="请描述您的不适症状"></textarea>' +
                                        '</section>' +
                                        '</section>' +
                                        '</section>' +
                                        '</section>'
                                } else {
                                    quesList1 += '<section class="symptom-desc-item ' + (parseInt(items.questionType) === 1 ? "single-choices" : "multiple-choices") + '" data-role="selector" data-id="' + itemsList.optionId + '">' +
                                        '<p><i class="icon-select"></i><span>' + itemsList.optionName + '<i></i></span></p>' +
                                        quesList2Box +
                                        '</section>'
                                }
                            }
                            quesListBox = '<header class="symptom-desc-title" isPopup="' + items.isPopup + '"><p>' + items.questionName + '</p></header>' +
                                '<section class="util-selector ' + (parseInt(items.questionType) === 1 ? "sSelector" : "mSelector") + '">' +
                                quesList1 +
                                '</section>'
                        }
                        $(".sticky-wrapper .symptom-desc-form").html(quesListBox);
                        //精确定位展开项
                        var optionidList = optionidLists.split(",");
                        $.each(optionidList, function (index, element) {
                            var othersContent = $(".sticky-wrapper .symptom-desc-item[data-id=" + element + "]").find(".symptom-desc-others-content");
                            $(".sticky-wrapper .symptom-desc-item[data-id=" + element + "]").addClass("selected");
                            if (othersContent.length > 0) {
                                var otherText = $(".ev-symptom-change .tc-caseDescribeItemRight").attr("otherText");
                                if (otherText.indexOf("、") >= 0) {
                                    var _otherText = otherText.split("、");
                                    othersContent.val(_otherText[_otherText.length - 1]);
                                } else {
                                    othersContent.val(otherText)
                                }
                            }
                        });
                        $(".sticky-wrapper .mSelector .single-choices.selected").each(function (i, e) {
                            if ($(e).parents(".symptom-desc-item.selected").length <= 0) {
                                $(e).removeClass("selected");
                            }
                        });
                        //选择症状单选or多选判断
                        $(".util-selector").on("click", '[data-role="selector"]', function (e) {
                            e.stopPropagation();
                            var selector = $(this).parent();
                            if (selector.hasClass('sSelector')) {
                                $(this).addClass('selected').siblings().removeClass('selected');
                            } else if (selector.hasClass('mSelector')) {
                                $(this).toggleClass("selected");
                                $(this).find(".symptom-desc-item").removeClass("selected");
                            }
                            if ($(".sticky-wrapper").find(".selected").length === 0) {
                                $(".symptom-desc-controller").find(".btn-primary").addClass("disabled");
                            } else {
                                $(".symptom-desc-controller").find(".btn-primary").removeClass("disabled");
                            }
                        });
                    }
                });
                $(".symptom-list").hide().siblings(".symptom-list-mask").show().children(".sticky-wrapper").show().end().find(".symptom-desc-controller").addClass("active");
            });
            //路由医院选择
            Q.reg('hospital', function () {
                $(".symptom-list").hide();
                modules.searchList({
                    targetEle: $("#ev-choose-hospital"),
                    type: "hospital",
                    backCallback: function () {
                        setTimeout(function () {
                            $(window).scrollTop($("#ev-nowHistory").offset().top);
                        }, 100);

                    }
                })

            });
            //路由疾病选择
            Q.reg('disease', function () {
                $(".symptom-list").hide();
                modules.searchList({
                    targetEle: $("#ev-choose-disease"),
                    type: "disease",
                    backCallback: function () {
                        setTimeout(function () {
                            $(window).scrollTop($("#ev-nowHistory").offset().top);
                        }, 100)
                    }
                })
            });
            //路由所在地选择
            Q.reg('homecity', function () {
	            $(".symptom-list").hide();
                modules.searchList({
                    targetEle: $("#ev-choose-address"),
                    type: "city",
                    level: 2,
                    finalLevel: 4,
	                backCallback: function () {
		                setTimeout(function () {
			                $(window).scrollTop($("#ev-detailInform").offset().top);
		                }, 100);

	                }
                });
            });
            //路由改变后首页
            Q.reg('sureIndex', function () {
                var symptomText = "", pastHis = "", baseInformText = "";
                //症状替换
                if ($(".sticky-wrapper").is(":visible")) {
                    if ($(".sticky-wrapper .multiple-choices.selected").length > 1 && $("#ev-choiceList .symptom-desc-title").attr("ispopup") == 1) {
                        var btnList = [];
                        $(".sticky-wrapper .selected").each(function (index, element) {
                            if ($(element).parents(".symptom-desc-second-form").size() === 0) {
                                btnList.push({
                                    className: "btn-hollow main-symptom",
                                    id: $(element).attr("data-id"),
                                    content: $(element).find(">p>span").text(),
                                    href: "javascript:void(0)"
                                })
                            }
                        });
                        common.btnBox({
                            title: "哪种不适最明显？",
                            direction: "horizontal",
                            btn: btnList
                        });
                        $(".main-symptom").on("click", function () {
                            var mainOptionId = $(this).attr("id"),
                                optionIdList = "";
                            $(".btnBox-tips").remove();
                            $(".sticky-wrapper .selected").each(function (i, e) {
                                if ($(e).find(".symptom-desc-others-content").length > 0) {
                                    symptomText += $(e).find(".symptom-desc-others-content").val() + "、"
                                    $(".ev-symptom-change").find(".tc-caseDescribeItemRight").attr("data-otherdes", $(e).find(".symptom-desc-others-content").val())
                                } else {
                                    symptomText += $(e).children("p").find("span").text() + "、"
                                }
                                optionIdList += $(e).data("id") + ","
                            });
                            $(".sticky-wrapper .symptom-desc-form").html("");
                            $(".symptom-list").show().siblings(".symptom-list-mask").hide();
                            $(".symptom-list-mask").children().not(".symptom-desc-controller").hide().siblings(".symptom-desc-controller").removeClass("active");
                            $(".au-main").find(".symptom-desc-form").hide();
                            $(".ev-symptom-change").find(".tc-caseDescribeItemRight").text(symptomText.slice(0, symptomText.length - 1)).attr({
                                "data-mainOptionId": mainOptionId,
                                "data-optionIdList": optionIdList.slice(0, optionIdList.length - 1)
                            });
                            $(".tc-caseDescribeItem").removeClass("ev-symptom-change");
                            $('html, body').scrollTop($("#ev-scrollTop").val());
                        });
                    } else {
                        var optionIdList = '', mainOptionId = '';
                        $(".sticky-wrapper .selected").each(function (i, e) {
                            if ($(e).find(".symptom-desc-others-content").length > 0) {
                                symptomText += $(e).find(".symptom-desc-others-content").val() + "、"
                                $(".ev-symptom-change").find(".tc-caseDescribeItemRight").attr("data-otherdes", $(e).find(".symptom-desc-others-content").val())
                            } else {
                                symptomText += $(e).children("p").find("span").text() + "、"
                            }
                            optionIdList += $(e).data("id") + ","
                        })
                        $(".ev-symptom-change").find(".tc-caseDescribeItemRight").text(symptomText.slice(0, symptomText.length - 1)).attr({
                            "data-mainOptionId": mainOptionId,
                            "data-optionIdList": optionIdList
                        });
                        $(".sticky-wrapper .symptom-desc-form").html("");
                        $(".au-main").find(".symptom-desc-form").hide();
                        $(".symptom-list").show().siblings(".symptom-list-mask").hide();
                        $(".symptom-list-mask").children().not(".symptom-desc-controller").hide().siblings(".symptom-desc-controller").removeClass("active");
                        $(".tc-caseDescribeItem").removeClass("ev-symptom-change");
                        $('html, body').scrollTop($("#ev-scrollTop").val());
                    }
                }
                if ($(".au-baseInform").is(":visible")) {
                    baseInformText = '<li class="tc-caseDescribeItem">' +
                        '<span class="tc-caseDescribeItemLeft">患者所在地</span><span class="tc-caseDescribeItemRight patientLocation" data-provinceid="' + $("#ev-choose-homeadd").attr("data-provinceid") + '" data-cityid="' + $("#ev-choose-homeadd").attr("data-cityid") + '" data-districtid="' + $("#ev-choose-homeadd").attr("data-districtid") + '" data-province="' + $("#ev-choose-homeadd").attr("data-province") + '" data-city="' + $("#ev-choose-homeadd").attr("data-city") + '" data-district="' + $("#ev-choose-homeadd").attr("data-district") + '">' + $("#ev-choose-homeadd").text() + '</span>' +
                        '</li>' +
                        '<li class="tc-caseDescribeItem">' +
                        '<span class="tc-caseDescribeItemLeft">手机号码</span><span class="tc-caseDescribeItemRight patientTel">' + $("#ev-change-tel").val() + '</span>' +
                        '</li>' +
                        '<li class="tc-caseDescribeItem">' +
                        '<span class="tc-caseDescribeItemLeft">社保类型</span><span class="tc-caseDescribeItemRight socialType" data-socialid="' + $("#ev-choose-socialType").attr("data-typeid") + '">' + ($("#ev-choose-socialType").text() || "无") + '</span></li>' +
                        '<li class="tc-caseDescribeItem">' +
                        '<span class="tc-caseDescribeItemLeft">社保所在地</span><span class="tc-caseDescribeItemRight socialLocation" data-provinceid="' + $("#ev-choose-socialadd").attr("data-provinceid") + '" data-cityid="' + $("#ev-choose-socialadd").attr("data-cityid") + '" data-districtid="' + $("#ev-choose-socialadd").attr("data-districtid") + '" data-province="' + $("#ev-choose-socialadd").attr("data-province") + '" data-city="' + $("#ev-choose-socialadd").attr("data-city") + '" data-district="' + $("#ev-choose-socialadd").attr("data-district") + '">' + ($("#ev-choose-socialadd").text() || "无") + '</span>' +
                        '</li>'
                    $("#ev-baseInform").find(".tc-caseDescribeList").html(baseInformText);
                }

                if (!$(".btnBox-tips").length) {
                    $(".sticky-wrapper .symptom-desc-form").html("");
                    $(".searchTypeSelect").html("");
                    $(".symptom-list").show().siblings(".symptom-list-mask").hide();
                    $(".symptom-list-mask").children().not(".symptom-desc-controller").hide().siblings(".symptom-desc-controller").removeClass("active");
                    $(".au-main").find(".symptom-desc-form").hide();
                    $(".search-box").remove();
                    $('html, body').scrollTop($("#ev-scrollTop").val());
                }
            });
            Q.init({
                index: 'main'
            });
        },

        //个人信息更改
        //获取个人信息
        baseInformation: function () {
            var t = this;
            var param = {
                patientId: t.config.patientId,
                firstResult: 0,
                maxResult: 9999
            };
            $.ajax({
                url: t.path.baseInfo,
                type: "POST",
                data: {paramJson: $.toJSON(param)},
                timeout: 5000,
                success: function (data) {
                    if (data && data.responseObject && data.responseObject.responseData) {
                        var _dataList = data.responseObject.responseData.dataList[0],
                            mobile = _dataList.mobile,           //手机号码
                            province = _dataList.province,       //所在地省
                            provinceId = _dataList.provinceId,   //所在地省ID
                            city = _dataList.city,               //所在地市
                            cityId = _dataList.cityId,           //所在地市ID
                            district = _dataList.district,       //所在地区/县
                            districtId = _dataList.districtId    //所在地区/县ID
                        //联系电话
                        if (mobile !== "") {
                            $('.au-perfectInfoList').find('.au-perfectInfoItem[data-type=4]').addClass('active').find('input').val(mobile);
                        }
                        //患者所在地
                        if (provinceId !== "") {
                            $('.au-perfectInfoList').find('.au-perfectInfoItem[data-type=5]').addClass('active').find('span').text(province + city + district).attr({
                                "data-provinceId": provinceId, "data-cityId": cityId, "data-districtId": districtId,
                                "data-province": province, "data-city": city, "data-district": district
                            });
                        }
                    }
                }
            })
            t.selectChange();
        },
        //判断必填项是否填写
        quesThreeCheck: function () {
            var t = this,
                _requireActNum = $(".au-perfectInfoItem.active[data-required=1]"),  //必选已填总数
                _requireNum = $(".au-perfectInfoItem[data-required=1]");            //必选总数
            if (_requireActNum && _requireNum && _requireActNum.length == _requireNum.length) {
                $('.symptom-desc-controller').find('.btn-primary').removeClass("disabled");
            } else {
                $('.symptom-desc-controller').find('.btn-primary').addClass("disabled");
            }
        },
        //个人信息中select的事件及验证
        selectChange: function () {
            var t = this;
            $('.au-perfectInfoItemRight.hasSelect select').on('change', function () {
                var selectVal = $(this).val()
                $(this).siblings('.show').text(selectVal).addClass('selected');
                $(this).closest('.au-perfectInfoItem').addClass('active').find("#ev-choose-socialType").attr("data-typeid", $(this).find('option:selected').attr('data-typeid'));
                t.quesThreeCheck();
            });
        },
        //个人信息的input的验证
        inputVerify: function () {
            var t = this;
            $('.au-perfectInfoList').find('#ev-change-tel').blur(function () {
                var _cureName = $(this).val()
                //表单验证
                if (_cureName.length > 0) {
                    $(this).validate({
                        errorEle: function (msg) {
                            common.popup({
                                text: msg
                            })
                        },
                        rules: [{
                            rule: "isMobile",
                            msg: "手机号码输入有误"
                        }]
                    });
                    if ($(this).attr('data-validate') == "true") {
                        $(this).closest('.au-perfectInfoItem').addClass('active');
                    } else {
                        $(this).closest('.au-perfectInfoItem').removeClass('active');
                    }
                } else {
                    $(this).closest('.au-perfectInfoItem').removeClass('active');
                }
                t.quesThreeCheck();
            });
        },

        //点击路由
        btnClick: function () {
            var t = this, isClick = 0;
            //主要症状和伴随症状点击弹层
            $("#ev-mainSymptom .tc-caseDescribeItem[data-type]").on("click", function () {
                $(this).addClass("ev-symptom-change");
                localStorage.setItem("questionId",$(".ev-symptom-change").find(".tc-caseDescribeItemRight").attr("data-questionid"));
                localStorage.setItem("optionidLists",$(".ev-symptom-change").find(".tc-caseDescribeItemRight").attr("data-optionidlist"));
                localStorage.setItem("partId",$(".ev-symptom-change").parents(".tc-caseDescribeList").find(".tc-caseDescribeItemRight[data-partid]").attr("data-partid"));
                Q.go('symptomChange');
            });

            //点击更改手机号
	        $("#ev-change-mobile").on("click",function () {
		        Q.go('mobile');
	        });

            //点击选择医院
            $("#ev-choose-hospital").on("click",function () {
                Q.go('hospital');
            });
            //点击选择疾病
            $("#ev-choose-disease").on("click", function () {
                Q.go('disease')
            });
            //点击患者所在地
            $("#ev-choose-address").on("click", function () {
                Q.go('homecity');
            });
            //点击取消选择列表
            $(".btn-hollow").on("click", function () {
                Q.go('main');
            });
            //点击确定替换问诊单
            $(".btn-primary").on("click", function () {
                if (!$(this).hasClass("disabled")) {
	                Q.go('sureIndex');
                }
            });
            //点击提交复诊单
            $(".submit_symptom").on("click",function () {
                if (isClick == 0) {
                    isClick = 1;
                    var optionList = [];
                    $(".tc-caseDescribeItemRight[data-mainoptionid]").each(function (i, e) {
                        var questionId = $(e).attr("data-questionid"),
                            optionIdList = $(e).attr("data-optionidlist"),
                            otherDes = $(e).attr("data-otherdes") ? $(e).attr("data-otherdes") : "";
                        optionList.push({
                            partId: $(e).attr("data-partid"),
                            mainOptionId: $(e).attr("data-mainoptionId"),
                            optionIdList: optionIdList,
                            questionId: questionId,
                            optionDesc: otherDes
                        });
                    });
                    var param = {
                        patientId: common.getpara().patientId,
                        caseId: common.getpara().caseId,
                        operatorId: common.getpara().patientId,
                        operatorType: 0,
                        caseType: 1,
                        customerId: common.getpara().customerId,
                        visitSiteId: 17,
                        optionList: JSON.stringify(optionList),
                        caseHistoryList: $("#ev-pastHistory").attr("data-casehistorylist"),
                        patientName: $("#ev-baseInfom").data("patientName"),
                        provinceId: $(".patientLocation").attr("data-provinceid"),
                        province: $(".patientLocation").attr("data-province"),
                        cityId: $(".patientLocation").attr("data-cityid"),
                        city: $(".patientLocation").attr("data-city"),
                        districtId: $(".patientLocation").attr("data-districtid"),
                        district: $(".patientLocation").attr("data-district"),
                        socialProvinceId: $(".socialLocation").attr("data-provinceid"),
                        socialProvince: $(".socialLocation").attr("data-province"),
                        socialCityId: $(".socialLocation").attr("data-cityid"),
                        socialCity: $(".socialLocation").attr("data-city"),
                        socialDistrictId: $(".socialLocation").attr("data-districtid"),
                        socialDistrict: $(".socialLocation").attr("data-district"),
                        socialId: $(".socialType").attr("data-typeid"),
                        oldCaseAttIdList: $("#ev-to-upload").attr("data-oldcaseattidlist"),
                        caseAttIdList: $("#ev-to-upload").attr("data-caseAttIdList"),
                        treatmentHospitalId: $("#ev-choose-hospital").attr("data-id"),
                        treatmentHospital: $("#ev-choose-hospital").attr("data-name"),
                        illnessHistoryId: $("#ev-choose-disease").attr("data-id"),
                        illnessHistory: $("#ev-choose-disease").attr("data-name"),
                        remark: $(".tc-caseDesOther").val()
                    };
                    $.ajax({
                        url: t.path.returnVisitSubmit,
                        type: "POST",
                        timeout: 50000,
                        dataType: "json",
                        data: {paramJson: JSON.stringify(param)},
                        beforeSend:function(){
                            common.loading.show();
                        },
                        success: function (data) {
                            if (data.responseObject.responsePk) {
                                isClick = 0;
                                var shuntCustomerId = data.responseObject.responseData.shuntCustomerId;
                                common.loading.hide();
                                window.location.href = 'http://m.allinmed.cn/pages/imScene/im_main_scene.html?caseId=' + data.responseObject.responsePk + '&from=further&shuntCustomerId=' + shuntCustomerId + '&customerId=' + common.getpara().customerId + '&patientId=' + common.getpara().patientId;
                            }
                        }
                    })
                }
            });
        },
        //返回置顶
        backStick: function () {
            $(".symptom-list").on("click", ".tc-caseDescribeItem,.tc-caseDescribeBtn", function () {
                if ($(this).find(".ev-upLoadBtn").length <= 0) {
                    var scrollTop = $(this).offset().top;
                    $("#ev-scrollTop").val(scrollTop);
                }
            })
        }

    }
    reviceSymptom.init();
})

