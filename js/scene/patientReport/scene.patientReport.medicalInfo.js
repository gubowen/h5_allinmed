/**
 * @name:
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/09/30
 * @author: gubowen
 */
$(function () {
  var controller = {
    config: {
      visitStage: ["首次复诊", "第二次复诊", "第三次复诊", "三次以上"]//复诊阶段对应数组
    },
    path: {
      patientReport: "/mcall/patient/report/v1/create/" //患者报道
    },
    template: {},
    init: function () {
      window.onload = Log.createBrowse(2, '就诊信息');
      // this.forceRefresh();
      var AppIMLinksFlag = localStorage.getItem("APPIMLinks");


      if(AppIMLinksFlag){
        common.confirmBox({
          textCenter: true,
          removeFlag:true,
          content: '您已报到成功无需重复操作',
          cancel: '返回首页',
          ensure: '去沟通',
          cancelCallback: function () {
            localStorage.removeItem('APPIMLinks');
            window.location.href='/dist/patientReport.html?customerId='+common.getpara().customerId+'&doctorId='+common.getpara().doctorId+'#/patientInfo';
          },
          ensureCallback: function () {
            window.location.href=localStorage.getItem('APPIMLinks');
            localStorage.removeItem('APPIMLinks');
          }
        })
      }


      var _sesCustomerId = common.getpara().customerId;//会员id
      if ($('#sesCustomerId').length > 0) {
        $('#sesCustomerId').attr("value", _sesCustomerId);
      } else {
        $('body').append('<input type="hidden" id="sesCustomerId" value="' + _sesCustomerId + '">');
      }
      this.routerControl();//页面路由控制
      this.outpatientAfterEvent();//门诊后中的事件函数
      this.inHospitalEvent();//住院中的事件函数
      this.leaveHospitalEvent();//已出院的事件函数
      this.operationVisitEvent();//术后复诊中的事件函数
      this.mainEventFun();//页面总的事件函数
    },
    //页面路由控制
    routerControl: function () {
      var that = this;
      //进入主页
      Q.reg('index', function () {
        console.log("进入主页...");
        document.title = "填写就诊信息";
        $(".he-main").show();
        $(".search-box").remove();
        $(".searchTypeSelect").html("");
      });
      Q.go('index');
      //初始化路由
      Q.init({
        index: 'index'/* 首页地址 */
      });
      //选择疾病
      Q.reg("disease", function () {
        document.title = "选择疾病";
        modules.searchList({
          targetEle: $(".info-ill-right.disease"),
          type: "disease",
          back: "first",
          backCallback: function () {
            $(".info-ill-right.disease").addClass('selected').text($(".info-ill-right.disease").attr("data-partname") + " " + $(".info-ill-right.disease").attr("data-name"));
            that.footerBtnCheck();
            document.title = "填写就诊信息";
          }
        })
      });
      //住院中的手术名称选择路由
      Q.reg("inHospitalOperation", function () {
        document.title = "选择手术";
        modules.searchList({
          targetEle: $("#inHospitalOperation"),
          type: "illness",
          backCallback: function () {
            $("#inHospitalOperation").addClass('selected');
            that.footerBtnCheck();
          }
        })
      });
      //已出院的手术名称选择路由
      Q.reg("leaveHospitalOperation", function () {
        document.title = "选择手术";
        modules.searchList({
          targetEle: $("#leaveHospitalOperation"),
          type: "illness",
          backCallback: function () {
            $("#leaveHospitalOperation").addClass('selected');
            that.footerBtnCheck();
          }
        })
      });
      //术后复诊的手术名称选择路由
      Q.reg("operationVisitOperation", function () {
        document.title = "选择手术";
        modules.searchList({
          targetEle: $("#operationVisitOperation"),
          type: "illness",
          backCallback: function () {
            $("#operationVisitOperation").addClass('selected');
            that.footerBtnCheck();
          }
        })
      });
    },
    //页面总的事件函数
    mainEventFun: function () {
      var that = this;
      //选择疾病
      $(".info-ill-right.disease").on("click", function () {
        Q.go('disease');
      });
      //导航切换
      $(".info-nav-list").on("click", ".info-nav-item", function () {
        if (!$(this).hasClass("on")) {
          $(".info-nav-item").removeClass("on");
          $(this).addClass("on");
          var dataType = $(this).data("type");
          $(".info-description").removeClass("on");
          $(".info-description[data-type='" + dataType + "']").addClass("on");
          that.footerBtnCheck();
        }
      });
      //单选事件
      $(".first-selector").on("click", ".single-choices", function () {
        if ($(this).hasClass("selected")) {
          return false;
        } else {
          $(this).addClass("selected").siblings(".single-choices").removeClass("selected");
          if ($(this).find(".second-selector").length) {
            $(this).find(".second-selector").show().attr("data-required", "1");
          } else {
            $(this).siblings(".single-choices").find(".second-selector").hide().attr("data-required", "0").find(".single-choices").removeClass("selected");
          }
          if ($(this).closest(".first-selector").find(".info-desc-desc").length) {
            if ($(this).next(".info-desc-desc").length) {
              $(this).next(".info-desc-desc").show().attr("data-required", "1");
            } else {
              $(this).closest(".first-selector").find(".info-desc-desc").hide().attr("data-required", "0");
            }
          }
          that.footerBtnCheck();
        }
      });
      //报到提交按钮；
      $("#footerBtn").on("click", function () {
        console.log("我要报到了");
        that.patientReportFun();
      });
      //页面的选择时间年的事件验证；
      $(".year").on("change", function () {
        var monthVal = $(this).closest(".has-time").find(".month").val();
        var dayVal = $(this).closest(".has-time").find(".day").val();
        var newDate = new Date();
        var timestamp = Date.parse(newDate.toLocaleDateString());
        if (monthVal && dayVal) {
          var dateTemp = $(this).val() + "/" + monthVal + "/" + dayVal;
          dateTemp = Date.parse(dateTemp);
          if (timestamp < dateTemp) {
            common.popup({
              text: "时间须早于当前时间"
            });
            return;
          } else {
            var nextTime = $(this).closest(".has-time").nextAll(".has-time");
            var prevTime = $(this).closest(".has-time").prevAll(".has-time");
            if (nextTime.length) {
              var nextYear = nextTime.find(".year").val();
              var nextMonth = nextTime.find(".month").val();
              var nextDay = nextTime.find(".day").val();
              if (nextYear && nextMonth && nextDay) {
                var dateNextTemp = nextYear + "/" + nextMonth + "/" + nextDay;
                dateNextTemp = Date.parse(dateNextTemp);
                if (dateTemp >= dateNextTemp) {
                  var dataType = $(this).closest(".info-description").attr("data-type");
                  var textTemp = "";
                  switch (dataType) {
                    case "3":
                      textTemp = "入院时间应早于出院时间";
                      break;
                    case "4":
                      textTemp = "手术时间应早于本次复诊时间";
                      break;
                  }
                  common.popup({
                    text: textTemp
                  });
                  return;
                } else {
                  nextTime.find("dd").addClass("selected");
                }
              }
            }
            if (prevTime.length) {
              var prevYear = prevTime.find(".year").val();
              var prevMonth = prevTime.find(".month").val();
              var prevDay = prevTime.find(".day").val();
              if (prevYear && prevMonth && prevDay) {
                var datePrevTemp = prevYear + "/" + prevMonth + "/" + prevDay;
                datePrevTemp = Date.parse(datePrevTemp);
                if (dateTemp <= datePrevTemp) {
                  var dataType = $(this).closest(".info-description").attr("data-type");
                  var textTemp = "";
                  switch (dataType) {
                    case "3":
                      textTemp = "出院时间应晚于入院时间";
                      break;
                    case "4":
                      textTemp = "本次复诊时间应晚于手术时间";
                      break;
                  }
                  common.popup({
                    text: textTemp
                  });
                  return;
                } else {
                  prevTime.find("dd").addClass("selected");
                }
              }
            }
            $(this).closest("dd").addClass("selected");
          }
        } else {
          $(this).closest("dd").removeClass("selected");
        }
        that.footerBtnCheck();
      });
      //页面的选择时间月的事件验证；
      $(".month").on("change", function () {
        var yearVal = $(this).closest(".has-time").find(".year").val();
        var dayVal = $(this).closest(".has-time").find(".day").val();
        var newDate = new Date();
        var timestamp = Date.parse(newDate.toLocaleDateString());
        if (yearVal && dayVal) {
          var dateTemp = yearVal + "/" + $(this).val() + "/" + dayVal;
          dateTemp = Date.parse(dateTemp);
          if (timestamp < dateTemp) {
            common.popup({
              text: "时间须早于当前时间"
            });
            return;
          } else {
            var nextTime = $(this).closest(".has-time").nextAll(".has-time");
            var prevTime = $(this).closest(".has-time").prevAll(".has-time");
            if (nextTime.length) {
              var nextYear = nextTime.find(".year").val();
              var nextMonth = nextTime.find(".month").val();
              var nextDay = nextTime.find(".day").val();
              if (nextYear && nextMonth && nextDay) {
                var dateNextTemp = nextYear + "/" + nextMonth + "/" + nextDay;
                dateNextTemp = Date.parse(dateNextTemp);
                if (dateTemp >= dateNextTemp) {
                  var dataType = $(this).closest(".info-description").attr("data-type");
                  var textTemp = "";
                  switch (dataType) {
                    case "3":
                      textTemp = "入院时间应早于出院时间";
                      break;
                    case "4":
                      textTemp = "手术时间应早于本次复诊时间";
                      break;
                  }
                  common.popup({
                    text: textTemp
                  });
                  return;
                } else {
                  nextTime.find("dd").addClass("selected");
                }
              }
            }
            if (prevTime.length) {
              var prevYear = prevTime.find(".year").val();
              var prevMonth = prevTime.find(".month").val();
              var prevDay = prevTime.find(".day").val();
              if (prevYear && prevMonth && prevDay) {
                var datePrevTemp = prevYear + "/" + prevMonth + "/" + prevDay;
                datePrevTemp = Date.parse(datePrevTemp);
                if (dateTemp <= datePrevTemp) {
                  var dataType = $(this).closest(".info-description").attr("data-type");
                  var textTemp = "";
                  switch (dataType) {
                    case "3":
                      textTemp = "出院时间应晚于入院时间";
                      break;
                    case "4":
                      textTemp = "本次复诊时间应晚于手术时间";
                      break;
                  }
                  common.popup({
                    text: textTemp
                  });
                  return;
                } else {
                  prevTime.find("dd").addClass("selected");
                }
              }
            }
            $(this).closest("dd").addClass("selected");
          }
        } else {
          $(this).closest("dd").removeClass("selected");
        }
        that.footerBtnCheck();
      });
      //页面的选择时间日的事件验证；
      $(".day").on("change", function () {
        var yearVal = $(this).closest(".has-time").find(".year").val();
        var monthVal = $(this).closest(".has-time").find(".month").val();
        var newDate = new Date();
        var timestamp = Date.parse(newDate.toLocaleDateString());
        if (yearVal && monthVal) {
          var dateTemp = yearVal + "/" + monthVal + "/" + $(this).val();
          dateTemp = Date.parse(dateTemp);
          if (timestamp < dateTemp) {
            common.popup({
              text: "时间须早于当前时间"
            });
            return;
          } else {
            var nextTime = $(this).closest(".has-time").nextAll(".has-time");
            var prevTime = $(this).closest(".has-time").prevAll(".has-time");
            if (nextTime.length) {
              var nextYear = nextTime.find(".year").val();
              var nextMonth = nextTime.find(".month").val();
              var nextDay = nextTime.find(".day").val();
              if (nextYear && nextMonth && nextDay) {
                var dateNextTemp = nextYear + "/" + nextMonth + "/" + nextDay;
                dateNextTemp = Date.parse(dateNextTemp);
                if (dateTemp >= dateNextTemp) {
                  var dataType = $(this).closest(".info-description").attr("data-type");
                  var textTemp = "";
                  switch (dataType) {
                    case "3":
                      textTemp = "入院时间应早于出院时间";
                      break;
                    case "4":
                      textTemp = "手术时间应早于本次复诊时间";
                      break;
                  }
                  common.popup({
                    text: textTemp
                  });
                  return;
                } else {
                  nextTime.find("dd").addClass("selected");
                }
              }
            }
            if (prevTime.length) {
              var prevYear = prevTime.find(".year").val();
              var prevMonth = prevTime.find(".month").val();
              var prevDay = prevTime.find(".day").val();
              if (prevYear && prevMonth && prevDay) {
                var datePrevTemp = prevYear + "/" + prevMonth + "/" + prevDay;
                datePrevTemp = Date.parse(datePrevTemp);
                if (dateTemp <= datePrevTemp) {
                  var dataType = $(this).closest(".info-description").attr("data-type");
                  var textTemp = "";
                  switch (dataType) {
                    case "3":
                      textTemp = "出院时间应晚于入院时间";
                      break;
                    case "4":
                      textTemp = "本次复诊时间应晚于手术时间";
                      break;
                  }
                  common.popup({
                    text: textTemp
                  });
                  return;
                } else {
                  prevTime.find("dd").addClass("selected");
                }
              }
            }
            $(this).closest("dd").addClass("selected");
          }
        } else {
          $(this).closest("dd").removeClass("selected");
        }
        that.footerBtnCheck();
      });
    },
    //门诊后中的事件函数
    outpatientAfterEvent: function () {
      //门诊后中就诊时间的初始化
      ymd({
        year: $("#outpatientAfterYear"),
        month: $("#outpatientAfterMonth"),
        day: $("#outpatientAfterDay"),
        default1: 1//有默认选择项
      })
    },
    //住院中的事件函数
    inHospitalEvent: function () {
      //住院中的手术名称选择
      $("#inHospitalOperation").on("click", function () {
        Q.go('inHospitalOperation');
      });
      //住院中的入院时间的初始化
      ymd({
        year: $("#inHospitalInYear"),
        month: $("#inHospitalInMonth"),
        day: $("#inHospitalInDay"),
        default1: 1//有默认选择项
      })
    },
    //已出院的事件函数
    leaveHospitalEvent: function () {
      var that = this;
      //复诊建议弹起选择
      //已出院的入院时间的初始化
      ymd({
        year: $("#leaveHospitalInYear"),
        month: $("#leaveHospitalInMonth"),
        day: $("#leaveHospitalInDay"),
        default1: 1//有默认选择项
      });
      //已出院的出院时间的初始化
      ymd({
        year: $("#leaveHospitalOutYear"),
        month: $("#leaveHospitalOutMonth"),
        day: $("#leaveHospitalOutDay"),
        default1: 1//有默认选择项
      });
      $("#visitAdvice").on("click", function () {
        $(".visit-advice-box").show();
        $("body").css("overflow", "hidden");
      });
      //复诊建议中选项
      $(".visit-advice-list").on("click", ".visit-advice-item span", function () {
        if ($(this).hasClass("without")) {
          $(".visit-advice-item").removeClass("on");
        } else if ($(".without").closest(".visit-advice-item").hasClass("on")) {
          $(".without").closest(".visit-advice-item").removeClass("on");
        }
        $(this).closest(".visit-advice-item").toggleClass("on");
      });
      //复诊建议中选项中其他的事件
      $("#visitAdviceOther span").on("click", function () {
        $(".visit-advice-select").hide();
        $(".visit-advice-write").show();
        return false;
      });
      //其他复诊建议添加按钮
      $(".visit-advice-write .visit-advice-write-btn").on("click", function () {
        var value = $.trim($(".visit-advice-write .visit-advice-write-input").val());
        if (value.length == 0) {
          common.popup({
            text: "添加的内容不能为空"
          })
        } else if (value.length > 8) {
          common.popup({
            text: "最多可输入8个字"
          })
        } else {
          $(".visit-advice-select").show();
          $(".visit-advice-write").hide();
          $("#visitAdviceOther").before("<li class='visit-advice-item other on'><span>" + value + "</span></li>");
          $(".visit-advice-write .visit-advice-write-input").val("");
          if ($(".without").closest(".visit-advice-item").hasClass("on")) {
            $(".without").closest(".visit-advice-item").removeClass("on");
          }
          //第一次需求，其他最多点两次，然后更改取消掉
          // var dataTimes = $("#visitAdviceOther").attr("data-times");
          // if (dataTimes > 0) {
          //     $("#visitAdviceOther").remove();
          // } else {
          //     $("#visitAdviceOther").attr("data-times",(parseInt(dataTimes) +1));
          // }
          $("#visitAdviceOther").remove();
        }
      });
      //复诊建议盒子的取消按钮
      $(".visit-advice-cancel").on("click", function () {
        if ($('.visit-advice-select').is(':hidden')) {
          $(".visit-advice-select").show();
          $(".visit-advice-write").hide();
          $(".visit-advice-write .visit-advice-write-input").val("");
        } else {
          $(".visit-advice-box").hide();
          $("body").css("overflow", "auto");
        }
      });
      //点击蒙板，复诊建议盒子取消
      $(".visit-advice-box").on("click", function () {
        $(".visit-advice-box").hide();
        $("body").css("overflow", "auto");
      });
      $(".visit-advice-container").on("click", function () {
        return false;
      });
      //复诊建议盒子的确认按钮
      $(".visit-advice-select .visit-advice-btn").on("click", function () {
        if ($(".visit-advice-item.on span").length) {
          var tempValue = "";
          $(".visit-advice-item.on span").each(function (index, element) {
            tempValue += $(element).text() + "、"
          });
          tempValue = tempValue.substring(0, tempValue.length - 1);
          $("#visitAdvice").html(tempValue).addClass("selected");
          that.footerBtnCheck();
        }
        $(".visit-advice-box").hide();
        $("body").css("overflow", "auto");
      });
      //已出院的手术名称选择
      $("#leaveHospitalOperation").on("click", function () {
        Q.go('leaveHospitalOperation');
      })
    },
    //术后复诊中的事件函数
    operationVisitEvent: function () {
      var that = this;
      //复诊阶段select框选择赋值
      // $("#visitStage").on("change",function () {
      //     var selectVal = $(this).val();
      //     $(this).siblings('.show').text(selectVal).closest(".info-operation-right").addClass('selected');
      //     // $(this).siblings('.show').attr('data-id',$(this).find(':selected').data('id'));
      //     // console.log($(this).find(':selected').data('id'));
      //     that.footerBtnCheck();
      // });
      //复诊阶段的仿ios框
      var stateData = [{
        text: "首次复诊",
        value: "1"
      }, {
        text: "第二次复诊",
        value: "2"
      }, {
        text: "第三次复诊",
        value: "3"
      }, {
        text: "三次以上",
        value: "4"
      }];
      var picker = new Picker({
        data: [stateData]
      });
      $("#visitStage").on("click", function () {
        picker.show();//点击时显示职称
        // $(".select-hospital .select-icon-down").removeClass("select-icon-down").addClass("select-icon-up");
      });
      picker.on('picker.valuechange', function (e, selectedVal, selectedIndex) {//每次选择完职称触发相应职称的时间选择
        $("#visitStage").text(that.config.visitStage[selectedVal[0]]).attr("data-type", selectedVal[0]).addClass('selected');
      });
      //术后复诊的手术名称选择
      $("#operationVisitOperation").on("click", function () {
        Q.go('operationVisitOperation');
      });
      //术后复诊的手术时间的初始化
      ymd({
        year: $("#operationVisitOperationYear"),
        month: $("#operationVisitOperationMonth"),
        day: $("#operationVisitOperationDay"),
        default1: 1//有默认选择项
      });
      //术后复诊的本次复诊时间的初始化
      ymd({
        year: $("#operationVisitVisitYear"),
        month: $("#operationVisitVisitMonth"),
        day: $("#operationVisitVisitDay"),
        default1: 1//有默认选择项
      });
    },
    //报到按钮是否可以点击的验证
    footerBtnCheck: function () {
      var flag = 0;
      //必填数
      var requiredNum = $(".info-description.on").find("[data-required = '1']").length;
      //已填数
      var filledNum = $(".info-description.on").find("[data-required = '1']>.selected").length;
      if ($(".info-description.on").length) {
        if (requiredNum == filledNum) {
          if ($(".info-ill .info-ill-right").hasClass("selected")) {
            flag = 1;
          }
        }
      }
      if (flag) {
        $("#footerBtn").removeClass("disabled").removeAttr("disabled", "disabled");
      } else {
        $("#footerBtn").addClass("disabled").attr("disabled", "disabled");
      }
    },
    //报到按钮提交函数
    patientReportFun: function () {
      $("#footerBtn").addClass("disabled").attr("disabled", "disabled");
      var that = this;
      var diseaseTarget = $(".info-ill-right.disease");//疾病选择的目标盒子
      var stateTarget = $(".info-description.on");//当前状态的目标盒子
      var doctorSuggestVal = stateTarget.find(".doctorSuggest>.selected").data("type") || "";//医生建议字段
      if (doctorSuggestVal == "5") {
        doctorSuggestVal += "_" + stateTarget.find(".second-selector>.selected").data("type");
      }
      var revisitSuggestIdVal = "";//复诊建议字段
      var revisitSuggestDescVal = "";//其他选项时的复诊建议字段
      if ($(".visit-advice-item.on[data-type]").length) {
        $(".visit-advice-item.on").each(function (index, element) {
          $(element).hasClass("other") || (revisitSuggestIdVal += $(element).data("type") + ",");
        });
        revisitSuggestIdVal = revisitSuggestIdVal.substring(0, revisitSuggestIdVal.length - 1);
      }
      if ($(".visit-advice-item.other").length) {
        revisitSuggestDescVal = $(".visit-advice-item.other span").text();
        revisitSuggestIdVal.length ? revisitSuggestIdVal += ",8" : revisitSuggestIdVal += "8";
      }
      var data = {};
      data.patientId = common.getpara().patientId;//患者id
      data.doctorId = common.getpara().doctorId;//医生id
      data.customerId = common.getpara().customerId;//会员id
      data.caseType = "10";//病例类型
      data.partId = diseaseTarget.attr("data-partid");//部位ID
      data.partName = diseaseTarget.attr("data-partname");	//部位名称(冗余)
      data.illnessId = diseaseTarget.attr("data-id");	//string	是	疾病ID
      data.illnessName = diseaseTarget.attr("data-name");	//string	是	疾病名称(冗余)
      data.state = $(".info-nav-item.on").attr("data-type");//string	是	当前状态：默认0，1-门诊后，2-住院中，3-已出院，4-术后复诊
      data.doctorSuggest = doctorSuggestVal;	//string	是	医生建议
      data.visitTime = stateTarget.find(".visitTime").length ? stateTarget.find(".visitTime .year").val() + "-" + stateTarget.find(".visitTime .month").val() + "-" + stateTarget.find(".visitTime .day").val() : "";	//string	是	就诊时间
      data.enterTime = stateTarget.find(".enterTime").length ? stateTarget.find(".enterTime .year").val() + "-" + stateTarget.find(".enterTime .month").val() + "-" + stateTarget.find(".enterTime .day").val() : "";	//string	是	入院时间
      data.leaveTime = stateTarget.find(".leaveTime").length ? stateTarget.find(".leaveTime .year").val() + "-" + stateTarget.find(".leaveTime .month").val() + "-" + stateTarget.find(".leaveTime .day").val() : ""; //	string	是	出院时间
      data.treatMethod = stateTarget.find(".treatMethod>.selected").data("type") || "";	//string	是	治疗方式
      data.revisitSuggestId = revisitSuggestIdVal;	//string	是	复诊建议可多选：默认0，1-出院后三天复查，2-出院后一周复查，3-出院后两周复查，4-出院后一月复查，5-出院后三月复查，6-出院后半年复查，7-出院后一年复查，8-其他，9-无需复诊
      data.revisitSuggestDesc = revisitSuggestDescVal;//string	是	其他选项时的复诊建议
      data.operationTime = stateTarget.find(".operationTime").length ? stateTarget.find(".operationTime .year").val() + "-" + stateTarget.find(".operationTime .month").val() + "-" + stateTarget.find(".operationTime .day").val() : "";	//string	是	手术时间
      data.revisitType = (parseInt(stateTarget.find("#visitStage").attr("data-type")) + 1) || "";	//string	是	复诊阶段：1-首次复诊、2-第二次复诊、3-第三次复诊、4-三次以上
      data.revisitTime = stateTarget.find(".revisitTime").length ? stateTarget.find(".revisitTime .year").val() + "-" + stateTarget.find(".revisitTime .month").val() + "-" + stateTarget.find(".revisitTime .day").val() : "";//string	是	当前复诊时间
      data.isValid = "1";	//string	是	是否有效
      data.siteId = "17";//string	是	发送渠道
      data.operationId = stateTarget.find(".operation[data-required='1'] dd").attr("data-iid") || "";	//string	是	手术ID
      data.operationName = stateTarget.find(".operation[data-required='1'] dd").attr("data-name") || "";
      data.consultationType = "1";
      data.consultationLevel = '3';
      $.ajax({
        url: that.path.patientReport,
        type: 'POST',
        dataType: 'json',
        timeout: 10000,
        data: {
          paramJson: $.toJSON(data)
        },
        beforeSend: function () {
          $("#footerBtn").text("");
          $(".medical-info-footer .loading").show();
        }
      }).done(function (rep) {
        $("#footerBtn").text("报到");
        $(".medical-info-footer .loading").hide();
        if (rep.responseObject.responseStatus) {
          common.popup({
            text: "报到成功"
          });
          localStorage.setItem("noMR",1);
          setTimeout(function(){
            common.confirmBox({
              textCenter:true,
              removeFlag:true,
              content: '您已报到成功无需重复操作',
              cancel: '返回首页',
              ensure: '去沟通',
              cancelCallback: function () {
                localStorage.removeItem('APPIMLinks');
                window.location.href='/dist/patientReport.html?customerId='+common.getpara().customerId+'&doctorId='+common.getpara().doctorId+'#/patientInfo';
              },
              ensureCallback: function () {
                window.location.href='/dist/imSceneDoctor.html?caseId='+rep.responseObject.responsePk +'&doctorCustomerId='+common.getpara().doctorId +'&patientCustomerId='+common.getpara().customerId +'&patientId='+common.getpara().patientId +'&from=report';
                localStorage.removeItem('APPIMLinks');
              }
            });
               window.location.href='/dist/imSceneDoctor.html?caseId='+rep.responseObject.responsePk +'&doctorCustomerId='+common.getpara().doctorId +'&patientCustomerId='+common.getpara().customerId +'&patientId='+common.getpara().patientId +'&from=report';
          },2000)

        } else {
          common.popup({
            text: "报到失败"
          })
          setTimeout(function() {
            $("#footerBtn").removeClass("disabled").removeAttr("disabled", "disabled");
          },2000);
        }
      })
    }


  };
  controller.init();
});
