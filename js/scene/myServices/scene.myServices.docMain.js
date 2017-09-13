/**
 * @Desc：医生主页模块
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by wangjingrong on 2017/4/11.
 */
$(function () {
  var docMain = {
    config: {
      hospitalName: ''
    },
    path: {
      getDocMain: "/mcall/customer/auth/v1/getMapById/",//医生信息
      getCloseTime: "/mcall/customer/clinic/close/v1/getMapList/",//停诊时间
      getVisitDetails: "/mcall/customer/advice/setting/v1/getMapById/",//问诊详情
      getEducationList: "/mcall/customer/auth/v1/getAuthSupplement/",//教育
      getHospitalList: "/mcall/customer/multipoint/practice/v1/getMapById2/",//医院列表
      saveOrderClinic: "/mcall/customer/clinic/v1/create/",//保存预约门诊
      changeOrderClinic: "/mcall/customer/clinic/v1/update/",//改变患者状态,
      updateTime: "/mcall/customer/case/consultation/v1/updateFrequency/",//更新次数
      getConsultantInfo: "/mcall/customer/case/consultation/v1/getMapById/",//获取会诊信息
      triageAssign: "/mcall/customer/case/consultation/v1/create/",//创建会诊信息
      getConsultationId: "/mcall/customer/case/consultation/v1/getConsultationFrequency/",//获取问诊Id
      getOrderDetails: "/mcall/cms/pay/order/v1/getMapById/",//获取订单详情
      getCurrentByCustomerId: "/mcall/customer/advice/setting/v1/getCurrentByCustomerId/",//获取剩余人数和状态
      todayIsHasOrder: "/mcall/cms/pay/order/v1/getMapByCustomerId/"//是否当天已经预约过门诊
    },
    template: {
      //医生个人信息
      docIntroHtml: function (data) {
        var docIntro = data.authMap;
        var newYear = new Date().getFullYear();
        //判断医生头像
        var logoImg = '/image/img00/doctorMain/doc_logo.png';//默认头像
        if (data.logoUrlMap.logoUrl) {
          logoImg = data.logoUrlMap.logoUrl
        }
        //初诊建议入口判断匹配理由是否显示
        var topNear = '';
        if (common.getpara().top && common.getpara().top == 1 && common.getpara().near && common.getpara().near == 1) {
          topNear = '<section class="matchReasonListTop"><h3>匹配理由：</h3><p><span>距离近</span><span>全国top10骨科医院</span></p></section>'
        } else if (common.getpara().top && common.getpara().top == 1) {
          topNear = '<section class="matchReasonListTop"><h3>匹配理由：</h3><p><span>全国top10骨科医院</span></p></section>'
        } else if (common.getpara().near && common.getpara().near == 1) {
          topNear = '<section class="matchReasonListTop"><h3>匹配理由：</h3><p><span>距离近</span></p></section>'
        }
        var html = '<figure class="docDetails">' +
          '<img class="docLogo" src="' + logoImg + '">' +
          '<h3>' + docIntro.fullName + '</h3>' +
          '<p class="docProfession"><span>' + docIntro.medicalTitle + '</span></p>' +
          '<p class="docHospital"><span>' + docIntro.company + '</span></p>' +
          '</figure>' +
          '<figure class="matchReason">' +
          '<section class="radar">' +
          '<div class="radarTitle on">专业</div>' +
          '<div class="radarTitle">手术</div>' +
          '<div class="radarTitle">履历</div>' +
          '<div class="radarTitle">教育</div>' +
          '<div class="radarTitle">医院</div>' +
          '</section>' +
          '<artical class="matchReasonList">' +
          topNear +
          '<section class="matchReasonListBottom">' +
          '<div class="radarItems show" data-index="0">' +
          '<h3>专业：</h3>' +
          '<p>' +
          (function () {
            var majorhtml = '';
            $.each(data.majorMapList, function (index, element) {
              majorhtml += element.majorName + '，'
            });
            return majorhtml.slice(0, majorhtml.length - 1);
          })() +
          '</p>' +
          '</div>' +
          '<div class="radarItems" data-index="1">' +
          '<h3>手术：</h3>' +
          '<dl>' +
          '<dt>' + (newYear - 1) + '年 ' + docIntro.yesteryearOperationNum + '台</dt>' +
          '<dt>' + (newYear - 2) + '年 ' + docIntro.precedingYearOperationNum + '台</dt>' +
          '</dl>' +
          '</div>' +
          '<div class="radarItems" data-index="2">' +
          '<h3>履历：</h3>' +
          '<dl>' +
          (function () {
            var medicalHtml = '', medicalNum;
            //显示两条
            if (data.medicalTitleMapList.length > 2) {
              for (var i = 0; i < 2; i++) {
                var startTime = (data.medicalTitleMapList)[i].startTime.slice(0, 4) + "年",
                  endTime = (data.medicalTitleMapList)[i].endTime ? "-" + (data.medicalTitleMapList)[i].endTime.slice(0, 4) + "年" : " 至今";
                medicalHtml += '<dt>' + (data.medicalTitleMapList)[i].medicalTitle + '</dt><dd>' + startTime + endTime + '</dd>'
              }
            } else {
              $.each(data.medicalTitleMapList, function (index, element) {
                var startTime = element.startTime.slice(0, 4) + "年",
                  endTime = element.endTime ? "-" + element.endTime.slice(0, 4) + "年" : " 至今";
                medicalHtml += '<dt>' + element.medicalTitle + '</dt><dd>' + startTime + endTime + '</dd>'
              });
            }
            return medicalHtml;
          })() +
          '</dl>' +
          (data.medicalTitleMapList.length > 2 ? '<button class="docInfoMore">查看更多</button>' : '') +
          '</div>' +
          '<div class="radarItems radarEducation" data-index="3">' +
          '<h3>教育：</h3>' +
          '</div>' +
          '<div class="radarItems radarHospital" data-index="4">' +
          '<h3>医院：</h3>' +
          '<dl>' +
          '<dt>' + docIntro.company + '</dt>' +
          '</dl>' +
          '</div>' +
          '</section>' +
          '</artical>' +
          '</figure>'
        return html;
      },
      //医生专业擅长
      majorTraitHtml: function (data) {
        var html = '<ul>' +
          '            <li>' +
          '                <h4 class="icon-illness">疾病</h4>' +
          '                <p class="majorTraitIntro majorTraitIntro_illness">' +
          (function () {
            var illnessHtml = '';
            $.each(data.illnessMapList, function (index, element) {
              illnessHtml += element.illnessName + "，"
            })
            return (illnessHtml.length > 0 ? illnessHtml.substring(0, illnessHtml.length - 1) : '');
          })() +
          '                </p>' +
          '            </li>' +
          '            <li>' +
          '                <h4 class="icon-operation">手术</h4>' +
          '                <p class="majorTraitIntro majorTraitIntro_operation">' +
          (function () {
            var operationHtml = '';
            $.each(data.operationMapList, function (index, element) {
              operationHtml += element.operationName + "，"
            })
            return (operationHtml.length > 0 ? operationHtml.substring(0, operationHtml.length - 1) : '');
          })() +
          '                </p>' +
          '            </li>' +
          '        </ul>';
        return html;
      },
      //网上问诊
      onlineVisitHtml: function (data, isHasFree) {
        //问诊状态 0：关 1：开
        var state = data.state,
          stateName = '';
        if (state == 0) {
          stateName = '暂关闭问诊'
        } else {
          stateName = '去问诊'
        }
        //普通问诊是否前三次免费
        var generalPrice = data.generalPrice + '元',
            generalTime = data.generalTimes

        var html = '<dl><dt>网上问诊条件</dt>' +
          '<dd class="onlineCriteria">' +
          (function () {
            var criteriaHtml = '';
            $.each(data.illnessList, function (index, element) {
              criteriaHtml += element.illnessName + ','
            })
            if (data.illnessDesc && criteriaHtml) {
              return criteriaHtml + data.illnessDesc;
            } else if (data.illnessDesc) {
              return data.illnessDesc;
            } else if (criteriaHtml) {
              return criteriaHtml.substring(0, criteriaHtml.length - 1)
            } else {
              return '';
            }
          })() +
          '</dd>' +
          '</dl>' +
          '<section class="goInquiryBox">' +
          '<figure>' +
          '<h3 class="inquiryType inquiryType_urgent">免费问诊<span class="free_questionIcon"></span></h3>' +
          '<a href="javascript:;" class="goInquiry ' + (state == 0 || common.getpara().type == 0 || data.freeTimes<=0  ? "forbid" : "") + '" data-type="2">' + (data.freeTimes<=0?"暂关闭问诊":stateName) + '</a>' +
          '</figure>' +
          '<section class="inquiryTrait">' +
          '<span>本人回复</span>' +
          '</section>' +
          '<ul>' +
          '<li>患者拥有一次免费问诊机会，可获得<span class="red-tipsForQues">3次</span>医生答复</li>' +
          '</ul>' +
          '</section>' +
          '<section class="goInquiryBox">' +
          '<figure>' +
          '<h3 class="inquiryType inquiryType_normal">普通问诊<span>' + generalPrice + '</span></h3>' +
          '<a href="javascript:;" class="goInquiry ' + (state == 0 || common.getpara().type == 0 ? "forbid" : "") + '" data-type="0">' + stateName + '</a>' +
          '</figure>' +
          '<section class="inquiryTrait">' +
          '<span>本人回复</span><span>可退款</span>' +
          '</section>' +
          '<ul>' +
          '<li>可获得<span class="red-tipsForQues">' + generalTime + '次</span>医生答复</li>' +
          '<li>医生<span class="red-tipsForQues">48小时</span>未接诊全额退款</li>' +
          '</ul>' +
          '</section>' +
          '<section class="goInquiryBox">' +
          '<figure>' +
          '<h3 class="inquiryType inquiryType_special">特需问诊<span>' + data.vipPrice + '元</span></h3>' +
          '<a href="javascript:;" class="goInquiry ' + (state == 0 || common.getpara().type == 0 ? "forbid" : "") + '" data-type="1">' + stateName + '</a>' +
          '</figure>' +
          '<section class="inquiryTrait">' +
          '<span>本人回复</span><span>可退款</span>' +
          '</section>' +
          '<ul>' +
          '<li>可获得<span class="red-tipsForQues">' + data.vipTimes + '次</span>医生答复</li>' +
          '<li>医生<span class="red-tipsForQues">12小时</span>内未接诊全额退款</li>' +
          '</ul>' +
          '</section>'
        return html;
      },
      //停诊信息
      stopVisitHtml: function (data) {
        var html = '<section>' +
          (function () {
            if (data.length == 1) {
              var single = data[0];
              return '<p class="stopVisit_rest" data-begaintime="' + single.startTime + '" data-endtime="' + single.endTime + '"><span>' + orderTimeDeals(single.startTime).year + '至' + orderTimeDeals(single.endTime).year + '</span><span class="stop_reason">' + single.closeReason + '</span></p>' +
                '<p class="stopVisit_normal">' + orderTimeDeals(single.endTime).year + '以后正常接诊</p>'
            } else {
              var stopHtml = '';
              $.each(data, function (index, element) {
                stopHtml += '<p class="stopVisit_rest" data-begaintime="' + element.startTime + '" data-endtime="' + element.endTime + '"><span>' + orderTimeDeals(element.startTime).year + '至' + orderTimeDeals(element.endTime).year + '</span> <span>' + element.closeReason + '</span></p>'
              })
              return stopHtml
            }
          })() +
          '<span class="stopVisit_hint">此消息由医生本人发布</span>' +
          '</section>';
        return html;
      },
      //雷达图点击弹层-教育
      educationHtml: function (data) {
        var html = '<div class="mask_layer">' +
          '    <section class="docDetails_mask">' +
          '        <div class="scroll_bar education_more">' +
          '            <section class="docDetails_box">' +
          '                <h3 class="docDetails_title">教育</h3>' +
          '                <figure class="normal_educate">' +
          (function () {
            var normalHtml = '';
            $.each(data.educationMapList, function (index, element) {
              var startTime = element.startTime.slice(0, 4) + "年" + (element.startTime.slice(5, 7) >= 10 ? element.startTime.slice(5, 7) : element.startTime.slice(6, 7)) + "月",
                endTime = element.endTime.slice(0, 4) + "年" + (element.endTime.slice(5, 7) >= 10 ? element.endTime.slice(5, 7) : element.endTime.slice(6, 7)) + "月";
              normalHtml += '<dl class="all_lists"><dt>' + element.university + '</dt><dd><span>' + element.education + ' ' + element.major + '</span></dd><dd><span>' + startTime + '-' + endTime + '</span></dd></dl>'
            })
            return normalHtml;
          })() +
          '                </figure>' +
          '                <figure class="continue_educate">' +
          '                    <figcaption>继续教育</figcaption>' +
          (function () {
            var continueHtml = '';
            $.each(data.continuingEducationMapList, function (index, element) {
              var startTime = element.startTime.slice(0, 4) + "年" + (element.startTime.slice(5, 7) >= 10 ? element.startTime.slice(5, 7) : element.startTime.slice(6, 7)) + "月",
                endTime = element.endTime.slice(0, 4) + "年" + (element.endTime.slice(5, 7) >= 10 ? element.endTime.slice(5, 7) : element.endTime.slice(6, 7)) + "月";
              continueHtml += '<div>' + element.organization + '</div><div>' + element.certificate + '</div><div>' + element.cmeDesc + '</div><div>' + startTime + '-' + endTime + '</div>'
            })
            return continueHtml;
          })() +
          '                </figure>' +
          '                <figure class="learn_undergo">' +
          '                    <figcaption>进修经历</figcaption>' +
          (function () {
            var continueHtml = '';
            $.each(data.fellowshipMapList, function (index, element) {
              var startTime = element.startTime.slice(0, 4) + "年" + (element.startTime.slice(5, 7) >= 10 ? element.startTime.slice(5, 7) : element.startTime.slice(6, 7)) + "月",
                endTime = element.endTime.slice(0, 4) + "年" + (element.endTime.slice(5, 7) >= 10 ? element.endTime.slice(5, 7) : element.endTime.slice(6, 7)) + "月";
              continueHtml += '<div>' + element.fellowshipInstitutions + '</div><div>' + element.fellowshipDesc + '</div><div>' + startTime + '-' + endTime + '</div>'
            })
            return continueHtml;
          })() +
          '                </figure>' +
          '            </section>' +
          '        </div>' +
          '        <button class="icon_close_docDetails"></button>' +
          '    </section>' +
          '</div>';
        return html;
      },
      //雷达图点击弹层-履历
      docDetailsHtml: function (data) {
        var html = '<div class="mask_layer">' +
          '    <section class="docDetails_mask">' +
          '        <div class="scroll_bar record_more">' +
          '            <section class="docDetails_box">' +
          '                <h3 class="docDetails_title">履历</h3>' +
          '                <ul class="record_lists">' +
          (function () {
            var medicalHtml = '';
            $.each(data.medicalTitleMapList, function (index, element) {
              var startTime = element.startTime.slice(0, 4) + "年",
                endTime = element.endTime ? "-" + element.endTime.slice(0, 4) + "年" : " 至今";
              medicalHtml += '<li><h4>' + element.medicalTitle + '</h4><p>' + startTime + endTime + '</p></li>'
            });
            return medicalHtml;
          })() +
          '                </ul>' +
          '            </section>' +
          '        </div>' +
          '        <button class="icon_close_docDetails"></button>' +
          '    </section>' +
          '</div>';
        return html;
      },
      //雷达图点击弹层-医院
      hospitaHtml: function (data, hospitalName) {
        var t = this;
        var html = '<div class="mask_layer">' +
          '    <section class="docDetails_mask">' +
          '        <div class="scroll_bar hospital_more">' +
          '            <section class="docDetails_box">' +
          '                <h3 class="docDetails_title">医院</h3>' +
          '                <figure class="hospital_lists ' + (data.cooperationHospitalList.length > 0 ? "" : "hide") + '">' +
          '                    <figcaption>执业医院</figcaption>' +
          '                    <p class="practice_hospital_name">' + hospitalName + '</p>' +
          '                </figure>' +
          '                <figure class="hospital_lists">' +
          '                    <figcaption>合作医院</figcaption>' +
          '                    <ul class="internet_hospital_list">' +
          (function () {
            var cooperationHtml = '';
            if (data.cooperationHospitalList.length > 0) {
              $.each(data.cooperationHospitalList, function (index, element) {
                cooperationHtml += '<li>' + element.hospitalName + '</li>'
              });
            }
            return cooperationHtml;
          })() +
          '                    </ul>' +
          '                </figure>' +
          '                <figure class="hospital_lists ' + (data.internetHospitalList.length > 0 ? "" : "hide") + '">' +
          '                    <figcaption>互联网医院</figcaption>' +
          '                    <ul class="internet_hospital_list">' +
          (function () {
            var internetHtml = '';
            if (data.internetHospitalList.length > 0) {
              $.each(data.internetHospitalList, function (index, element) {
                internetHtml += '<li>' + element.hospitalName + '</li>'
              });
            }
            return internetHtml;
          })() +
          '                    </ul>' +
          '                </figure>' +
          '            </section>' +
          '        </div>' +
          '        <button class="icon_close_docDetails"></button>' +
          '    </section>' +
          '</div>';
        return html;
      },
      //预约门诊弹层
      orderClinic: function (data) {
        var clinicType = data.children("i").attr("data-clinictype"),
          index = Number(clinicType) - 1,
          isFree = $(".money").eq(index).attr("data-price");
        var html = '<div class="mask_layer">' +
          '    <section class="orderVisit_mask">' +
          '        <h2 class="moudle_title"><span>预约门诊</span><i class="icon_close_mask"></i></h2>' +
          '        <p class="visit_tiny_tip">' + data.parents(".content").attr("remark") + '</p>' +
          '        <p class="cutLine_remark">此处仅为加号费用，医生利用休息时间为您看病，按劳取酬，让付出更有价值， 让您更快恢复健康。</p>' +
          '        <h3 class="order_time" data-timetype="' + data.attr("timeType") + '" data-time="' + data.siblings(".dayWeekBox").find(".day").attr("data-time") + '"><div class="dataBox"><span>' + data.siblings(".dayWeekBox").find(".day").attr("data-day") + '</span><span class="weekTime">' + data.siblings(".dayWeekBox").children(".week").text() + '(' + data.attr("timeType") + ')</span></div><div class="priceBox ' + (isFree == "免费" ? "" : "on") + '"><span>' + $(".money").eq(index).attr("data-price") + '</span></div></h3>' +
          '        <figure class="cancel_indent_rule">' +
          '            <figcaption>取消订单规则</figcaption>' +
          '            <ul>' +
          '                <li><span>就诊前一天取消</span><span>(全额退款)</span></li>' +
          '                <li><span>就诊当天取消</span><span>(不退款)</span></li>' +
          '                <li><span>爽约</span><span>(不退款)</span></li>' +
          '                <li><span>准时赶赴，医生拒诊</span><span>(全额退款)</span></li>' +
          '            </ul>' +
          '        </figure>' +
          '        <a class="to_payment" clinicId="' + data.attr("data-clinicid") + '" isClinic="' + data.attr("data-isclinic") + '" clinicType="' + clinicType + '" type="' + (isFree == "免费" ? "1" : "0") + '">' + (isFree == "免费" ? "去预约" : "去支付") + '</a>' +
          '    </section>' +
          '</div>';
        return html
      }
    },
    init: function () {
      var t = this;
      if (!common.checkOpenId()) {
        common.wxGetOpenId(1);    //获取openId
      }
      window.onresize = function () {
        window.location.reload();
      }
      modules.dateDiagrame();
      t.addHtml();
      t.goInquiry();
      t.gOrderClinic();
      t.questionStatus({
        callBack: function (data) {
          // console.log(data);
          t.checkPatientState({dataList: data});
        }
      });
    },
    //医生信息
    addHtml: function (num) {
      var t = this;
      $.ajax({
        url: t.path.getDocMain,
        dataType: "json",
        type: 'POST',
        async: false,
        data: {
          paramJson: $.toJSON({
            customerId: common.getpara().customerId,
            logoUseFlag: 3
          })
        },
        beforeSend: function () {
          common.loading.show();
        },
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var items = data.responseObject.responseData.dataList[0];
            if (items.medicalTitleMapList.length > 2 && num == 1) {
              $(".docMain").append(t.template.docDetailsHtml(items));
              common.loading.hide();
            } else {
              $(".docIntro").append(t.template.docIntroHtml(items));
              //渲染五边形教育和医院
              t.addEducationHtml("1");
              t.addHospitaHtml();
              $(".majorTrait").append('<h2 class="moudle_title">专业擅长</h2>');
              $(".majorTrait").append(t.template.majorTraitHtml(items));
              t.isHasMore({
                element: ".majorTraitIntro_illness",
                numOne: 65,
                numTwo: 105,
                numThree: 185
              });
              t.isHasMore({
                element: ".majorTraitIntro_operation",
                numOne: 65,
                numTwo: 105,
                numThree: 185
              });
              t.foldAndUnfold();
              t.config.hospitalName = items.authMap.company;
              t.radarTab();
              t.popupMore();
              common.loading.hide();
            }
          }
        },
        error: function () {

        }
      });
      //加载停诊信息
      $.ajax({
        url: t.path.getCloseTime,
        dataType: "json",
        type: 'POST',
        data: {
          paramJson: $.toJSON({
            customerId: common.getpara().customerId,
            isAll: 0
          })
        },
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var items = data.responseObject.responseData.dataList;
            $(".stopVisit").show().find("article").html(t.template.stopVisitHtml(items));
          } else {
            $(".stopVisit").hide();
          }
        },
        error: function () {

        }
      });
    },
    //医生教育信息
    addEducationHtml: function (num) {
      var t = this;
      $.ajax({
        url: t.path.getEducationList,
        dataType: "json",
        type: 'POST',
        async: false,
        data: {paramJson: $.toJSON({customerId: common.getpara().customerId})},
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var items = data.responseObject.responseData.dataList[0];
            if (num == 1) {
              //正统教育  or  继续教育  or   进修经历
              if (items.educationMapList && items.educationMapList.length > 0) {
                var itemsOne = items.educationMapList[0],
                  startTime = itemsOne.startTime.slice(0, 4) + "年" + itemsOne.startTime.slice(6, 7) + "月",
                  endTime = itemsOne.endTime.slice(0, 4) + "年" + itemsOne.endTime.slice(6, 7) + "月";
                $('.radarItems[data-index="3"]').append('<dl class="edu_lists"><dt>' + itemsOne.university + '</dt><dd>' + itemsOne.education + ' ' + itemsOne.major + '</dd><dd>' + startTime + '-' + endTime + '</dd></dl>');
              } else if (items.continuingEducationMapList && items.continuingEducationMapList.length > 0) {
                var itemsTwo = items.continuingEducationMapList[0],
                  startTime = itemsTwo.startTime.slice(0, 4) + "年" + itemsTwo.startTime.slice(6, 7) + "月",
                  endTime = itemsTwo.endTime.slice(0, 4) + "年" + itemsTwo.endTime.slice(6, 7) + "月";
                $('.radarItems[data-index="3"]').append('<dl class="edu_lists"><dt>' + itemsTwo.organization + '</dt><dd>' + itemsTwo.certificate + '</dd><dd>' + itemsTwo.cmeDesc + '</dd><dd>' + startTime + '-' + endTime + '</dd></dl>');
              } else if (items.continuingEducationMapList && items.continuingEducationMapList.length > 0) {
                var itemsThree = items.fellowshipMapList[0],
                  startTime = itemsThree.startTime.slice(0, 4) + "年" + itemsThree.startTime.slice(6, 7) + "月",
                  endTime = itemsThree.endTime.slice(0, 4) + "年" + itemsThree.endTime.slice(6, 7) + "月";
                $('.radarItems[data-index="3"]').append('<dl class="edu_lists"><dt>' + itemsThree.fellowshipInstitutions + '</dt><dd>' + itemsThree.fellowshipDesc + '</dd><dd>' + startTime + '-' + endTime + '</dd></dl>');
              }
              //是否有更多教育
              if ((items.educationMapList.length + items.fellowshipMapList.length + items.continuingEducationMapList.length) > 1) {
                $('.radarItems[data-index="3"]').append('<button class="docInfoMore">查看更多</button>');
              }
            } else {
              $(".docMain").append(t.template.educationHtml(items));
            }
          } else {
            if (num == 1) {
              $('.radarItems[data-index="3"]').append("<span class='noEdu'>医生未填写教育背景</span>");
            }
          }
        },
        error: function () {

        }
      });
    },
    //医生医院信息
    addHospitaHtml: function (num) {
      var t = this;
      var hospitalName = t.config.hospitalName;
      $.ajax({
        url: t.path.getHospitalList,
        dataType: "json",
        type: 'POST',
        async: false,
        data: {
          paramJson: $.toJSON({
            customerId: common.getpara().customerId,
            visitSiteId: 17,
            firsResult: 0,
            maxResult: 9999
          })
        },
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var items = data.responseObject.responseData.dataList[0],
              itemsLength = items.cooperationHospitalList.length + items.internetHospitalList.length;
            if (num == 1) {
              $(".docMain").append(t.template.hospitaHtml(items, hospitalName));
            } else {
              if (items.cooperationHospitalList.length > 0) {
                $('.radarItems[data-index="4"] dl').append('<dd>' + items.cooperationHospitalList[0].hospitalName + '</dd>');
              } else if (items.internetHospitalList.length > 0) {
                $('.radarItems[data-index="4"] dl').append('<dd>' + items.internetHospitalList[0].hospitalName + '</dd>');
              }
              if (itemsLength > 1) {
                $('.radarItems[data-index="4"]').append('<button class="docInfoMore">查看更多</button>');
              }
            }
          }
        },
        error: function () {

        }
      });
    },
    //雷达图切换
    radarTab: function () {
      var t = this;
      $(".radarTitle").on("click", function () {
        var i = $(this).index();
        $(this).addClass("on").siblings().removeClass("on");
        $(".radarItems").eq(i).addClass("show").siblings(".radarItems").removeClass("show");
      })
    },


    //是否有更多
    isHasMore: function (obj) {
      var element = $(obj.element),
        eH = element.height(),
        dpr = $("html").attr("data-dpr");
      if ((dpr == 1 && eH > obj.numOne) || (dpr == 2 && eH > obj.numTwo) || (dpr == 3 && eH > obj.numThree)) {
        element.addClass("overText");
        element.after('<dd class="icon-more showHide"></dd>');
      }
    },
    //展开收起
    foldAndUnfold: function () {
      $(".showHide").off("click").on("click", function () {
        var thisPrev = $(this).prev();
        thisPrev.toggleClass("overText");
        if ($(this).hasClass("icon-more")) {
          $(this).removeClass("icon-more").addClass("icon-less");
        } else {
          $(this).removeClass("icon-less").addClass("icon-more");
        }
      })
    },


    //点击显示更多弹层查看所有
    popupMore: function () {
      var t = this;
      $(".docInfoMore").on("click", function () {
        $(".mask_layer").remove();
        var index = $(this).parents(".radarItems.show").attr("data-index");
        if (index == 3) {
          t.addEducationHtml();
        } else if (index == 2) {
          t.addHtml("1");
        } else if (index == 4) {
          t.addHospitaHtml("1");
        }
        setTimeout(function () {
          $(".mask_layer").addClass("show").css("touch-action", "none");
          $("html,body").css({
            "overflow": "hidden",
            "height": "100%"
          });
        });
        t.closeMask();
      });
    },
    closeMask: function () {
      $(".icon_close_docDetails,.icon_close_mask").on('click', function () {
        $(".mask_layer").removeClass("show");
        $(".mask_layer").on("transitionend WebkitTransitionEnd", function () {
          $(".mask_layer").remove();
        })
        $("html,body").css({
          "overflow": "scroll",
          "height": "auto"
        });
      })
    },


    //去问诊
    goInquiry: function () {
      var t = this;
      //加载问诊信息
      $.ajax({
        url: t.path.getVisitDetails,
        dataType: "json",
        async: false,
        type: 'POST',
        data: {
          paramJson: $.toJSON({
            customerId: common.getpara().customerId
          })
        },
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var items = data.responseObject.responseData.dataList[0];
            $(".onlineVisit").append('<h2 class="moudle_title">网上问诊 <span class="netVisitIcon_onLine"></span><span class="netVisitText_onLine"></span></h2>');
            t.isHasFreeChat(items);
            t.isHasMore({
              element: ".onlineCriteria",
              numOne: 45,
              numTwo: 85,
              numThree: 165
            });
            t.foldAndUnfold();
            $(".orderVisit").after('<a href="javascript:;" class="goRefer ' + (items.state == 0 || common.getpara().type == 0 ? "forbid" : "") + '" data-type="0">' + (items.state == 0 ? "暂不接诊" : "去问诊") + '</a>');
          } else {

          }
        },
        error: function () {

        }
      });

      $(".docMain").off("click").on("click", '.goInquiry:not(".forbid"),.goRefer:not(".forbid")', function () {
        var type = $(this).attr("data-type");
        t.questionStatus({
          callBack: function (data) {
            t.questionCheck({
              dataList: data,
              isOpenQuestion: function (data) {
                //未开启问诊
                common.confirmBox({
                  title: "暂未开启问诊服务",
                  content: '医生暂不能为您提供帮助，请医生开启问诊服务后再来沟通。',
                  textCenter: true,
                  cancel: '取消',
                  ensure: '确定',
                  contentColor: "#777777",
                  cancelCallback: function () {
                  },
                  ensureCallback: function () {
                  }
                });
              },
              remainNumBack: function (data) {
                //有剩余名额 0-无沟通中数据 1-有
                if (data == 1) {
                  common.confirmBox({
                    title: "您与该医生有正在进行中的问诊服务，现在去继续沟通吗？",
                    // content: '医生今日的名额已全部预约，请改日再来',
                    textCenter: true,
                    cancel: '取消',
                    ensure: '去沟通',
                    cancelCallback: function () {
                    },
                    ensureCallback: function () {
                      window.location.href = '/dist/imSceneDoctor.html?caseId=' + common.getpara().caseId + '&doctorCustomerId=' + common.getpara().customerId + '&patientCustomerId=' + common.getpara().patientCustomerId + '&patientId=' + common.getpara().patientId;
                    }
                  });
                } else {
                  //问诊类型弹层
                  t.payTypeCommonTag({type: type});
                }
              },
              notRemainBack: function (data) {
                //没有剩余名额
                common.confirmBox({
                  title: "问诊名额已满",
                  content: '医生今日的名额已全部预约 请改日再来',
                  textCenter: true,
                  cancel: '取消',
                  ensure: '确定',
                  contentColor: "#777777",
                  cancelCallback: function () {
                  },
                  ensureCallback: function () {
                  }
                });
              }
            });
          }
        });
      });
    },
    //点击商品服务检测状态和剩余人数
    questionCheck: function (qct) {
      var _remainNum = qct.dataList.remainNum, //剩余人数
        _state = qct.dataList.state,           //开关：0-关，1-开
        _conState = qct.dataList.conState;     //有无沟通 0-无 1-有
      if (_state == 1) {  //_state==1
        //开启问诊
        if (_remainNum !== 0) {      //_remainNum!==0  (-1次数无限)
          //剩余人数>0
          qct.remainNumBack(_conState);  //可咨询回调
          if (_remainNum > 0) {
            var _text = "剩余名额" + _remainNum + "人";
            $('.onlineVisit .moudle_title').find('.netVisitIcon_onLine').addClass('lastNumTotal').siblings().text(_text).addClass('isLastNum');
          }
        } else {
          //无剩余名额
          qct.notRemainBack();  //无剩余名额回调
          $('.onlineVisit .moudle_title').find('.netVisitIcon_onLine').addClass('lastNumNull').siblings().text("今日名额已用完").addClass('isNullNum');
          $('.onlineVisit .goInquiryBox').find('.inquiryType').siblings().addClass('forbid');
          $('.goRefer').addClass('forbid');
        }
      } else {
        //未开启问诊
        qct.isOpenQuestion();  //未开启问诊回调
        $('.onlineVisit .moudle_title').find('.netVisitIcon_onLine').addClass('isOpenQuestion').siblings().text("医生未开启问诊").addClass('isNotOpenQues');
        $('.onlineVisit .goInquiryBox').find('.inquiryType').siblings().text("暂不接诊").addClass('forbid');
        $('.goRefer').addClass('forbid');
      }
    },
    //商品类型组件调用
    payTypeCommonTag: function (tgr) {
      var t = this;
      common.loading.show();

      modules.payTypePopup({
        isTest: 0,
        container: $(".docMain"),
        index: tgr.type,
        caseId: common.getpara().caseId,                         //  string  是  caseId
        patientCustomerId: common.getpara().patientCustomerId, //	string	是	患者所属用户id
        patientId: common.getpara().patientId,         // 	string	是	患者id
        doctorId: common.getpara().customerId,
        type: 1,
        successCallback: function (oT) {
          if (oT && oT.isFree == 0 && oT.isNoSource == 0) {
            t.creatLastCount({
              finishCallBack: function (orderSourceId) {
                modules.tcUpOrderStatus({
                  operationType: 2,    //操作类型        1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
                  orderId: oT.orderId,          // 订单ID
                  orderSourceId: orderSourceId,
                  outTradeNo: '',       //微信支付订单Id  (免费订单非必填)
                  status: 2,           //订单状态        1-待支付  2-已支付  3-已完成  4-已取消  5-退款中
                  callBack: function (data) {
                    //更新成功
                    console.log("更新成功")
                    t.updateOrderTimes({
                      consultationId: orderSourceId,
                      frequency: $(".swiper-slide-active .go_payment").attr("data-times"),
                      consultationLevel: $(".swiper-slide-active .go_payment").attr("data-type")
                    });
                  },
                  errorCallBack: function () {
                    //更新失败
                    console.log("更新失败")
                  }
                });
              }
            })
          } else {
            t.updateOrderTimes({
              consultationId: sessionStorage.getItem("orderSourceId"),
              frequency: $(".swiper-slide-active .go_payment").attr("data-times"),
              consultationLevel: $(".swiper-slide-active .go_payment").attr("data-type")
            });
          }
        }
      })
    },
    //判断是否已经创建过免费聊天
    isHasFreeChat: function (isfc) {
      var t = this;
      // $.ajax({
      //   url: t.path.getConsultationId,
      //   type: "post",
      //   async: false,
      //   timeout: 10000,
      //   data: {
      //     paramJson: $.toJSON({
      //       caseId: common.getpara().caseId,
      //       customerId: common.getpara().customerId || common.getpara().doctorCustomerId,
      //       isCreate: 1,
      //       isValid: 1,
      //       consultationType: 1,
      //       firstResult: 0,
      //       maxResult: 999
      //     })
      //   },
      //   dataType: "json",
      //   success: function (data) {
      //     if (data.responseObject.responseData.dataList) {
      //       if (data.responseObject.responseData.dataList.consultationId) {//已经创建过问诊
      //         var _consultationId = data.responseObject.responseData.dataList.consultationId;
      //       } else {//没有创建过问诊
      //         $(".onlineVisit").append(t.template.onlineVisitHtml(isfc, 0));
      //       }
      //     } else {
      //       common.popup({
      //         text: "数据错误"
      //       })
      //     }
      //   }
      // })
      $.ajax({
        url: t.path.getOrderDetails,
        type: "POST",
        async: false,
        dateType: "json",
        timeout: 10000,
        data: {
          paramJson: $.toJSON({
            patientId: common.getpara().patientId,
            doctorId: common.getpara().customerId || common.getpara().doctorCustomerId,
            orderType: 1,
            // orderSourceId: _consultationId,
            orderSourceType: 0,
            sortType: 2
          })
        },
        success: function (data) {
          if (data.responseObject.responseData.dataList) {
            var orderAmount = data.responseObject.responseData.dataList[0].orderAmount;
            if (orderAmount > 0) {
              //未使用免费问诊
              $(".onlineVisit").append(t.template.onlineVisitHtml(isfc, 0));
            } else {
              //已使用免费问诊
              $(".onlineVisit").append(t.template.onlineVisitHtml(isfc, 1));
              $(".onlineVisit .goInquiryBox").find('.inquiryType_urgent').siblings("a").text("已使用").addClass('forbid').attr("disabled", "disabled");
            }
          } else {
            $(".onlineVisit").append(t.template.onlineVisitHtml(isfc, 0));
          }
        }

      })
    },

    //更改咨询次数
    updateOrderTimes: function (obj) {
      var t = this;
      $.ajax({
        url: t.path.updateTime,
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {
          paramJson: $.toJSON({
            consultationId: obj.consultationId,
            frequency: obj.frequency,
            frequencyType: 2,
            consultationState: -1,
            consultationLevel: obj.consultationLevel
          })
        }
      })
        .done(function (data) {
          if (data.responseObject.responseStatus) {
            localStorage.setItem("doctorName", $(".docDetails > h3").text());
            localStorage.setItem("doctorLogo", $(".docLogo").attr("src"));
            localStorage.setItem("imOpen", "open");
            window.location.href = '/dist/imSceneDoctor.html?caseId=' + common.getpara().caseId + '&doctorCustomerId=' + common.getpara().customerId + '&patientCustomerId=' + common.getpara().patientCustomerId + '&patientId=' + common.getpara().patientId;
          }
        });
    },

    //咨询支付成功后创建问诊id
    creatLastCount: function (opt) {
      var t = this;
      //获取是否已经存在问诊id
      $.ajax({
        url: t.path.getConsultantInfo,
        type: "POST",
        async: false,
        dataType: "json",
        timeout: 10000,
        data: {
          paramJson: $.toJSON({
            caseId: common.getpara().caseId,
            customerId: common.getpara().customerId,
            consultationType: 1,
            siteId: 17
          })
        },
        success: function (data) {
          if (data.responseObject.responseMessage == "NO DATA") {
            //如果没有问诊id，创建问诊id
            $.ajax({
              url: t.path.triageAssign,
              type: "POST",
              dataType: "json",
              timeout: 10000,
              async: false,
              data: {
                paramJson: $.toJSON({
                  caseId: common.getpara().caseId,
                  customerId: common.getpara().customerId,
                  patientCustomerId: common.getpara().patientCustomerId,
                  patientId: common.getpara().patientId,
                  consultationType: 1,
                  consultationState: -1,
                  consultationLevel: $(".swiper-slide-active .go_payment").attr("data-type"),
                  siteId: 17,
                  caseType: common.getpara().caseType
                })
              },
              success: function (d) {
                if (d.responseObject.responseStatus) {
                  sessionStorage.setItem("orderSourceId", d.responseObject.responsePk);
                  opt.finishCallBack(d.responseObject.responsePk);
                }
              }
            })
          }
        },
        error: function (data) {

        }
      })
    },
    //是否开启问诊及剩余咨询人数
    questionStatus: function (Obj) {
      var _t = this;
      $.ajax({
        url: _t.path.getCurrentByCustomerId,
        dataType: "json",
        type: 'POST',
        async: false,
        data: {
          paramJson: $.toJSON({
            customerId: common.getpara().customerId,
            caseId: common.getpara().caseId
          })
        },
        beforeSend: function () {
          common.loading.show();
        },
        success: function (data) {
          common.loading.hide();
          if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList) {
            var _dataList = data.responseObject.responseData.dataList;
            Obj.callBack(_dataList);
            // _t.checkPatientState({dataList:_dataList});
          }
        },
        error: function () {
          common.loading.hide();
        }
      })
    },
    checkPatientState: function (cps) {
      var _remainNum = cps.dataList.remainNum,
        _state = cps.dataList.state,
        _conState = cps.dataList.conState;
      if (_state == 1) {
        //开启问诊
        if (_remainNum !== 0) {    //_remainNum!==0 (-1次数无限)
          //剩余人数>0
          if (_remainNum > 0) {
            var _text = "剩余名额" + _remainNum + "人";
            $('.onlineVisit .moudle_title').find('.netVisitIcon_onLine').addClass('lastNumTotal').siblings().text(_text).addClass('isLastNum');
          }
        } else {
          //无剩余名额
          $('.onlineVisit .moudle_title').find('.netVisitIcon_onLine').addClass('lastNumNull').siblings().text("今日名额已用完").addClass('isNullNum');
          $('.onlineVisit .goInquiryBox').find('.inquiryType').siblings().addClass('forbid');
          $('.goRefer').addClass('forbid');
        }
      } else {
        //未开启问诊
        $('.onlineVisit .moudle_title').find('.netVisitIcon_onLine').addClass('isOpenQuestion').siblings().text("医生未开启问诊").addClass('isNotOpenQues');
        $('.onlineVisit .goInquiryBox').find('.inquiryType').siblings().text("暂不接诊").addClass('forbid');
        $('.goRefer').addClass('forbid');
      }
    },
    //预约门诊停诊时间判断
    gOrderClinic: function () {
      var t = this;
      if (common.getpara().type != 1) {
        $(".data-diagram").addClass("off");
      } else {
        window.scrollTo(0, document.body.scrollHeight);
      }
      $(".data-diagram").off("click").on("click", ".content li", function () {
        var that = this;
        if ($(".data-diagram").hasClass("off")) {

        } else {
          if ($(that).children().length > 0 && $(that).find("i").hasClass("on")) {
            //比较停诊时间和门诊时间，在停诊时间内提示弹层
            if ($(".stopVisit .stopVisit_rest").length > 0) {
              var todayTime = $(that).siblings(".dayWeekBox").children(".day").attr("data-time").replace(/-/g, '/'),
                _todayTime = Date.parse(todayTime);
              var flag = false;
              $(".stopVisit .stopVisit_rest").each(function (index, element) {
                var stopBegainTime = Date.parse($(element).attr("data-begaintime").substring(0, 19).replace(/-/g, '/')),
                  stopEndTime = Date.parse($(element).attr("data-endtime").substring(0, 19).replace(/-/g, '/'));
                if (_todayTime >= stopBegainTime && _todayTime <= stopEndTime) {
                  common.popup({
                    text: "该医生" + todayTime + "停诊，请悉知。"
                  });
                  flag = true;
                }
              });
              if (!flag) {
                $(".mask_layer").remove();
                $(".docMain").append(t.template.orderClinic($(that)));
                setTimeout(function () {
                  $(".mask_layer").addClass("show");
                  $("html,body").css("overflow", "hidden");
                });
                t.closeMask();
                t.toPayMent();
              }
            } else {
              $(".mask_layer").remove();
              $(".docMain").append(t.template.orderClinic($(that)));
              setTimeout(function () {
                $(".mask_layer").addClass("show");
                $("html,body").css("overflow", "hidden");
              });
              t.closeMask();
              t.toPayMent();
            }
          }
        }
      })
    },
    //去支付
    toPayMent: function () {
      var t = this;
      $(".to_payment").off("click").on("click", function () {
        var that = this,
          orderTime,
          type = $(that).attr("type"),//判断是去支付还是去预约
          clinicDate = $(that).siblings(".order_time").attr("data-time"),//判断是否有订单
          clinicType = $(that).attr("clinictype"), clinicTitle,//门诊类型
          timeType = $(that).siblings(".order_time").attr("data-timetype"),//门诊时间
          clinicAmount = $(that).siblings(".order_time").find(".priceBox span").text(),
          clinicAmountNum = parseFloat(clinicAmount.substring(0, clinicAmount.length - 1)).toFixed(2);
        if (timeType == "上午") {
          orderTime = "08:30:00"
        } else if (timeType == "下午") {
          orderTime = "14:00:00"
        } else if (timeType == "晚上") {
          orderTime = "19:30:00"
        }
        switch (Number(clinicType)) {
          case 1:
            clinicTitle = "普通门诊";
            break;
          case 2:
            clinicTitle = "专家门诊";
            break;
          case 3:
            clinicTitle = "特需门诊";
            break;
        }

        //判断是否有重复订单
        t.getClinicOrderDetail({
          type: type,
          hospitalId: $("#selectHospital").attr("data-hosid"),
          hospitalName: $("#selectHospital").text(),
          clinicTime: clinicDate + ' ' + orderTime,
          clinicTitle: clinicTitle,
          clinicType: clinicType,
          clinicAmountNum: clinicAmountNum
        })
      })
    },
    //判断是否有门诊重复订单
    getClinicOrderDetail: function (obj) {
      var t = this;
      $.ajax({
        url: t.path.todayIsHasOrder,
        type: "POST",
        async: false,
        dateType: "json",
        timeout: 10000,
        data: {
          paramJson: $.toJSON({
            patientId: common.getpara().patientId,
            customerId: common.getpara().customerId || common.getpara().doctorCustomerId,
            clinicDate: obj.clinicTime
          })
        },
        success: function (data) {
          if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList) {
            var items = data.responseObject.responseData.dataList[0], orderTitle;
            switch (Number(items.orderSourceType)) {
              case 1:
                orderTitle = "普通门诊";
                break;
              case 2:
                orderTitle = "专家门诊";
                break;
              case 3:
                orderTitle = "特需门诊";
                break;
            }
            t.hasHistoryOrder({
              orderId: items.orderId,
              clinicId: items.orderSourceId,
              clinicType: items.orderSourceType,
              clinicAmountNum: items.orderAmount,
              clinicTitle: orderTitle
            })
          } else {
            t.saveClinicOrder({
              type: obj.type,
              hospitalId: obj.hospitalId,
              hospitalName: obj.hospitalName,
              clinicTime: obj.clinicTime,
              clinicTitle: obj.clinicTitle,
              clinicType: obj.clinicType,
              clinicAmountNum: obj.clinicAmountNum
            })
          }
        }

      })
    },
    //没有订单生成订单
    saveClinicOrder: function (obj) {
      var t = this;
      //保存门诊预约
      $.ajax({
        url: t.path.saveOrderClinic,
        dataType: "json",
        type: 'POST',
        async: false,
        data: {
          paramJson: $.toJSON({
            customerId: common.getpara().customerId,
            patientId: common.getpara().patientId,
            caseId: common.getpara().caseId,
            hospitalId: obj.hospitalId,
            hospitalName: obj.hospitalName,
            clinicTime: obj.clinicTime,
            isValid: 1,
            visitSiteId: 17,
            status: 0
          })
        },
        success: function (data) {
          //门诊Id
          if (data.responseObject.responsePk) {
            var orderSourceId = data.responseObject.responsePk;
            t.goPayClinic({
              type: obj.type,
              clinicId: orderSourceId,
              clinicTitle: obj.clinicTitle,
              clinicType: obj.clinicType,
              clinicAmountNum: obj.clinicAmountNum
            })
            localStorage.removeItem("triageAssign");
          }
        }
      })
    },
    //去支付门诊
    goPayClinic: function (obj) {
      var t = this;
      if (obj.type == "0") {//去支付
        //取消弹层
        $(".mask_layer").removeClass("show");
        $(".mask_layer").on("transitionend WebkitTransitionEnd", function () {
          $(".mask_layer").remove();
        })
        $("html,body").css("overflow", "scroll");
        //门诊支付
        modules.createOrders({
          isTest: 0,
          data: {
            caseId: common.getpara().caseId,                         //  string  是  caseId
            patientCustomerId: common.getpara().patientCustomerId, //	string	是	患者所属用户id
            patientId: common.getpara().patientId,         // 	string	是	患者id
            doctorId: common.getpara().customerId,          //	string	是	医生id
            orderType: '3',                     //	string	是	订单类型  1-咨询2-手术3-门诊预约
            orderSourceId: obj.clinicId,     //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
            orderSourceType: obj.clinicType,                //	string	是	来源类型  问诊：1-普通2-特需3-加急 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
            orderAmount: obj.clinicAmountNum,                  //	string	否	订单金额  （单位/元 保留两位小数）
            status: '1',                        //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
            body: obj.clinicTitle,     //   string  否  订单描述 （微信支付展示用）
            isCharge: "true"                    //   string  是  true-收费  false-免费
          },
          backCreateSuccess: function (_data) {
            //创建订单成功  （手术必选）
          },
          backCreateError: function (_data) {
            //创建订单失败  (必选)
          },
          wxPaySuccess: function (_data) {
            //支付成功回调  (问诊/门诊类型 必选)
            t.changeStatus(obj.clinicId);
            window.location.href = '/dist/imSceneDoctor.html?caseId=' + common.getpara().caseId + '&doctorCustomerId=' + common.getpara().customerId + '&patientCustomerId=' + common.getpara().patientCustomerId + '&patientId=' + common.getpara().patientId;
            localStorage.removeItem("triageAssign");
          },
          wxPayError: function (_data) {
            //支付失败回调  (问诊/门诊类型 必选)

          }
        });
      } else {//去预约
        modules.createOrders({
          data: {
            caseId: common.getpara().caseId,                //  string  是  caseId
            patientCustomerId: common.getpara().patientCustomerId, //	string	是	患者所属用户id
            patientId: common.getpara().patientId,         // 	string	是	患者id
            doctorId: common.getpara().customerId,          //	string	是	医生id
            orderType: 3,                     //	string	是	订单类型  1-咨询2-手术3-门诊预约
            orderSourceId: obj.clinicId,     //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
            orderSourceType: obj.clinicType,                //	string	是	来源类型  问诊：1-普通2-加急3-特需 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
            orderAmount: 0,                  //	string	否	订单金额  （单位/元 保留两位小数）$(this).attr("data-price")
            status: '2',                        //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
            body: '免费门诊',   //   string  否  订单描述 （微信支付展示用）
            isCharge: "false"                    //   string  是  true-收费  false-免费
          },
          backCreateSuccess: function (_data) {
            //创建订单成功  （手术必选）
            t.changeStatus(obj.clinicId);
            $(".mask_layer").removeClass("show");
            $(".mask_layer").on("transitionend WebkitTransitionEnd", function () {
              $(".mask_layer").remove();
            })
            common.alertBox({
              title: "",
              content: "预约中，等待医生审核，请注意查看订单状态",
              ensure: "我知道了",
              ensureCallback: function () {
              }
            })
          },
          backCreateError: function (_data) {
            //创建订单失败  (必选)
          },
          wxPaySuccess: function (_data) {
            //支付成功回调  (问诊/门诊类型 必选)
          },
          wxPayError: function (_data) {
            //支付失败回调  (问诊/门诊类型 必选)

          }
        });
      }
    },
    //有历史订单
    hasHistoryOrder: function (obj) {
      var t = this;
      $(".mask_layer").removeClass("show");
      $(".mask_layer").on("transitionend WebkitTransitionEnd", function () {
        $(".mask_layer").remove();
      })
      common.confirmBox({
        content: "您有一份相同订单尚未过期，可直接支付",
        cancel: "取消",
        ensure: "去支付",
        cancelCallback: function () {

        },
        ensureCallback: function () {
          //直接支付
          modules.wxPay({
            isTest: 0,
            orderId: obj.orderId,                                       //订单ID
            orderType: 3,                                     //订单类型  1-咨询2-手术3-门诊预约
            orderSourceId: obj.clinicId,                                 //来源id，对应 咨询id,手术单id，门诊预约id
            total_fee: obj.clinicAmountNum,                                     //订单总金额 (单位/元)
            body: obj.clinicTitle,                              //订单描述
            callBack: function (data) {
              if (data.responseStatus == "true") {
                //支付成功
                t.changeStatus(obj.clinicId);
                window.location.href = '/dist/imSceneDoctor.html?caseId=' + common.getpara().caseId + '&doctorCustomerId=' + common.getpara().customerId + '&patientCustomerId=' + common.getpara().patientCustomerId + '&patientId=' + common.getpara().patientId;
              }
            }
          });
        }
      })
    },
    //门诊支付成功改变状态
    changeStatus: function (id) {
      var t = this;
      $.ajax({
        url: t.path.changeOrderClinic,
        dataType: "json",
        type: 'POST',
        data: {
          paramJson: $.toJSON({
            clinicId: id,
            status: 1,//需我批准
            customerId: common.getpara().customerId,
            caseId: common.getpara().caseId
          })
        },
        success: function () {
          console.log("状态改变")
        }
      })
    }
  };
  docMain.init();
});

