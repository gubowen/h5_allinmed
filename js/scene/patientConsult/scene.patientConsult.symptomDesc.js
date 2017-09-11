/**
 * @Desc：症状描述
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/2/28
 */
$(function () {
    var symptomDesc = {
        init: function () {

            this.listRouter();
            this.getAnswerList();
            this.confirmNext();
            this.painLevel();
        },
        config: {
            caseId: "",
            visitSiteId: "1",
            patientId: common.getpara().patientId,
            optionList: [],
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
                    result = '<section class="symptom-desc-item ' + (parseInt(type) === 2 ? "multiple-choices" : "single-choices") + '" data-role="selector" data-id="' + data.optionId + '">' +
                        '<p><i class=" icon-select"></i><span>' + data.optionName + (parseInt(data.isAttachment) === 1 ? '<i class="icon-pain-detail"></i>' : '') + '</span></p>' +
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
                                '<p><i class=" icon-select"></i><span>' + data.optionName + (parseInt(data.isAttachment) === 1 ? '<i class="icon-pain-detail"></i>' : '') + '</span></p>' +
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
                                '<p><i class=" icon-select"></i><span>' + data.optionName + '</span></p>' +
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
                    '<h4>' + '<em>' + ii + "." + (parseInt(index) + 0) + '</em>' + data.questionName + '</h4>' +
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
            routerController: function (data) {
                return '<footer class="symptom-desc-controller" data-sort="' + data.router + '">' +
                    '<a href="' + data.prevRouter + '" class="btn-hollow ' + data.prevClass + '">' + data.prevText + '</a>' +
                    '<a href="' + data.nextRouter + '" class="btn-primary ' + data.nextClass + '">' + data.nextText + '</a>' +
                    '</footer>';
            },
            timeSelector: function (data) {
                return '<section class="util-selector sSelector time-selector">' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<p><i class=" icon-select"></i><span>一周內</span></p>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<p><i class=" icon-select"></i><span>一个月內</span></p>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<p><i class=" icon-select"></i><span>三个月内</span></p>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<p><i class=" icon-select"></i><span>三个月到一年</span></p>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<p><i class=" icon-select"></i><span>一到三年</span></p>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<p><i class=" icon-select"></i><span>三到五年</span></p>' +
                    '</section>' +
                    '<section class="symptom-desc-item single-choices" data-role="selector">' +
                    '<p><i class=" icon-select"></i><span>五年以上</span></p>' +
                    '</section>' +
                    '</section>';
            }
        },
        XHRList: {
            query: "/mcall/cms/part/question/relation/v1/getMapList/",//"",
            createMedicalRecord: "/mcall/customer/patient/case/v1/create/",
            submitMedicalRecord: "/mcall/customer/patient/case/option/v1/create/",
            symptomDetail: "/mcall/comm/data/symptom/option/v1/getMapById/"
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

            Q.go("consult1");
            Q.init({
                index: 'consult1'/* 首页地址 */,
                pop: function (L) {
                    that.getButtonUnfinish(L);
                    that.timeSelector();
                }
            });
            $("body").on("click", ".next", function () {
                if ($(this).hasClass("unfinish")) {
                    return false;
                } else {
                    return that.nextBtnValidate();
                }

            });
            $("body").on("click", ".prev", function () {
                return that.backToLastRouter();
            });
        },
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
                        maxResult: "9999"
                    })
                },
                timeout: 10000,
                beforeSend: function () {
                    common.loading.show()
                }
            })
                .done(function (data) {
                    common.loading.hide();
                    if (data.responseObject.responseData) {
                        var dataList = data.responseObject.responseData.dataList;
                        if (dataList && dataList.length !== 0) {
                            var total = dataList.length;
                            $(dataList).each(function (index, element) {
                                $(".main-inner-content").append(that.template.answersList(index, total, element));
                                that.config.optionList.push({
                                    partId: common.getpara().partId,
                                    questionId: element.questionId,
                                    optionIdList: "",
                                    mainOptionId: ""
                                });
                                var data = {
                                    router: "consult" + (index + 1),
                                    prevRouter: (index === 0) ? document.referrer : "#!consult" + index,
                                    nextRouter: (index === total - 1) ? "javascript:void(0)" : "#!consult" + (index + 2),
                                    prevClass: "prev",
                                    nextClass: (index === total - 1) ? "sure" : "next",
                                    prevText: (index === 0) ? "上一步" : "上一步",
                                    nextText: (index === total - 1) ? "提交" : "下一步"
                                };
                                $("body").append(that.template.routerController(data));

                            });

                            $(".symptom-desc-controller").eq(0).addClass("active");
                            $(".symptom-desc-inner").eq(0).addClass("active");
                            that.selectSymptom();
                            that.getButtonUnfinish($("html").attr("view"))
                            that.symptomQuery();

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
            $(".symptom-desc-controller").removeClass("active");
            $(".symptom-desc-controller[data-sort='" + router + "']").addClass('active');
            $(".symptom-desc-inner[data-sort='" + router + "']").addClass('active');
            if ($(".symptom-desc-inner[data-sort='" + router + "']").find(".util-selector").eq(0).find(">.selected").size() === 0) {
                $(".symptom-desc-controller[data-sort='" + router + "']").find(".next,.sure").addClass("unfinish");
            } else {
                $(".symptom-desc-controller[data-sort='" + router + "']").find(".next,.sure").removeClass("unfinish");
            }
        },
        //症状选择
        selectSymptom: function () {
            $(".util-selector").on("click", " [data-role='selector']", function (e) {
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
                    $(".symptom-desc-controller[data-sort='" + router + "']").find(".next,.sure").addClass("unfinish");
                } else {
                    $(".symptom-desc-controller[data-sort='" + router + "']").find(".next,.sure").removeClass("unfinish");
                }
            });
        },
        //显示症状详情
        symptomQuery: function () {
            var that = this;
            /*            $("body").on("click", function (e) {
             if (!$(e.target).hasClass(".symptom-detail-desc") && $(e.target).parents(".symptom-detail-desc").size() === 0) {
             $('.symptom-detail-desc').hide();
             } else if ($(e.target).hasClass(".symptom-detail-desc") || $(e.target).parents(".symptom-detail-desc").size() !== 0) {
             return false;
             }
             });*/

            $(".icon-pain-detail").on("click", function (e) {
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
                                content: $(element).find(">p>span").text(),
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
                        //当全流程仅有一道题，且有N个选项时不再走向下一步....
                        if ($(".symptom-desc-inner").size() !== 1) {
                            Q.go('consult2');
                        }
                    });
                    return false;

                } else if ($(".symptom-desc-inner[data-sort='" + router + "']").find(".util-selector").eq(0).find(">.selected").size() === 1) {
                    that.config.optionList[0].mainOptionId = $(".symptom-desc-inner[data-sort='" + router + "']").find(".util-selector").eq(0).find(">.selected").attr("data-id");
                }
            }
        },
        //保存本页选择的答案...
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
        //确认下一题或有伴随症状...
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
                    return;
                }
                var cache = localStorage.getItem("caseId");

                if (cache) {
                    that.config.caseId = cache;
                    that.submitSymptomMessage();

                    localStorage.removeItem("caseId");
                    window.location.href = "//m.allinmed.cn/pages/imScene/im_main_scene.html?caseId=" + cache + "&patientId=" + common.getpara().patientId + "&from=symptom";
                } else {
                    common.btnBox({
                        title: "您还有其他伴随症状吗？",
                        direction: "horizontal",
                        btn: [
                            {
                                className: "btn-primary no-other-symptom",
                                id: "",
                                content: "没有了",
                                href: "//m.allinmed.cn/pages/imScene/im_main_scene.html"
                            },
                            {
                                className: "btn-hollow has-other-symptom",
                                id: "",
                                content: "有",
                                href: "select_parts.html?sex=" + common.getpara().sex + "&age=" + common.getpara().age + "&patientId=" + common.getpara().patientId + "&caseId=" + that.config.caseId + "&customerId=" + common.getpara().customerId
                            }
                        ]
                    })
                }
            });
            //没有其他症状...执行后跳转至IM
            $("body").on("click", ".no-other-symptom", function (e) {
                e.preventDefault();
                common.loading.show()
                that.allAnswerSubmit(this);
            });
            //有其他症状...返回部位选择并记录次数为1
            $("body").on("click", ".has-other-symptom", function (e) {
                e.preventDefault();
                common.loading.show()
                that.allAnswerSubmit(this);

            });
        },
        //答案提交...
        allAnswerSubmit: function (e) {
            if (parseInt($(e).attr("disable")) === 1) {
                return false;
            }
            $(e).attr("disable", 1);
            var that = this;
            var data = {
                visitSiteId: 1,
                patientId: common.getpara().patientId,
                caseType: 0,
                customerId: common.getpara().customerId
            };
            $.ajax({
                url: this.XHRList.createMedicalRecord,
                type: 'POST',
                dataType: "json",
                data: {
                    paramJson: $.toJSON(data)
                },
                timeout: 50000,
                beforeSend: function () {
                    common.loading.show()
                }
            })
                .done(function (data) {

                    if (data.responseObject.responseStatus) {
                        that.config.caseId = data.responseObject.responsePk;
                        that.submitSymptomMessage(e)
                    }
                })
                .fail(function () {

                });
        },
        submitSymptomMessage: function (e) {
            var that = this;
            for (var i in this.secondList) {
                this.config.optionList.push(this.secondList[i]);
            }

            this.config.optionList = JSON.stringify((this.config.optionList));

            $.ajax({
                url: this.XHRList.submitMedicalRecord,
                type: 'POST',
                dataType: "json",
                data: {
                    paramJson: $.toJSON(that.config)
                },
                timeout: 50000,
                beforeSend: function () {
                    common.loading.show()
                }
            })
                .done(function (data) {
                    common.loading.hide();
                    if (data.responseObject.responseStatus) {
                        if (e) {
                            if ($(e).hasClass("has-other-symptom")) {
                                localStorage.setItem("caseId", that.config.caseId);
                                window.location.href = "select_parts.html?sex=" + common.getpara().sex + "&age=" + common.getpara().age + "&patientId=" + common.getpara().patientId + "&caseId=" + that.config.caseId + "&customerId=" + common.getpara().customerId + "&partId=" + common.getpara().partId;
                            } else if ($(e).hasClass("no-other-symptom")) {
                                window.location.href = "//m.allinmed.cn/pages/imScene/im_main_scene.html?caseId=" + that.config.caseId + "&patientId=" + common.getpara().patientId + "&from=symptom";
                            }
                        } else {
                            window.location.href = "//m.allinmed.cn/pages/imScene/im_main_scene.html?caseId=" + that.config.caseId + "&patientId=" + common.getpara().patientId + "&from=symptom";
                        }
                    }
                })
                .fail(function () {
                    common.loading.hide()
                });
        },

        //    输入字数限制
        inputCountLimit: function () {
            $(".symptom-desc-others-content").on("input propertychange", function () {
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
        }
    };
    symptomDesc.init();
});
