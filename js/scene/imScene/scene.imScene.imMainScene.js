/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/2/13
 */
$(function () {
  //通讯类
  var MessageCommunication = function () {
    common.loading.show();
  };
  MessageCommunication.prototype = {
    //通讯类加载...
    init: function () {
      var that = this;
      autosize($(".main-input-box-textarea"));
      if (!common.checkOpenId()) {
        common.wxGetOpenId(1);    //获取openId
      }
      this.nim = NIM.getInstance({
        // debug: true,
        appKey: '50c93d2ab7e207fd83231a245c07bfbc',
        account: controller.userData.account,
        token: controller.userData.token,
        onconnect: function (data) {
          console.log('连接成功');
        },
        onmyinfo: function (userData) {
          controller.getUserInfo(userData);
          that.getTargetAvatar();
          that.getMessageList();
          that.sendMessage();
          that.sendFile();
        },
        onwillreconnect: function (obj) {
          console.log("已重连" + obj.retryCount + "次，" + obj.duration + "后将重连...")
        },
        ondisconnect: function () {
          console.log("链接已中断...")
        },
        onerror: this.onError,
        onroamingmsgs: function (obj) {
          console.log("漫游消息...");
          // console.log(obj);
        },
        onofflinemsgs: function (obj) {
          console.log("离线消息...");
          // $(obj.msgs).each(function (index, element) {
          //   if ($("[data-clientid='" + element.idClient + "']").length === 0) {
          //     if (index === 0) {
          //       controller.beginTimestamp = element.time;
          //       controller.messageBox.append("<p class='time-stamp'>" + controller.transformMessageTime(controller.beginTimestamp) + "</p>");
          //     }
          //     controller.receiveMessage(element, "message")
          //   }
          // });

        },
        onmsg: function (msg) {
          if (msg.from === "1_doctor00001") {
            controller.receiveMessage(msg, "message");
          }
          common.loading.hide();
        }
      });

    },
    sendSpecial: function (t) {
      switch (common.getpara().from) {
        //  来自患者咨询流程，假装发送了咨询信息...
        case "symptom":
          $(".main-input-box").hide();
          $(".main-message").append(template.sendCaseList.first);
          setTimeout(function () {
            $(".main-message").append(template.sendCaseList.second);
          }, 1000);
          common.backToReferrer(document.referrer);
          common.loading.hide();
          break;
        //    来自手术预约流程，假装发送了预约信息，提示填写辅助信息...
        case "operation":
          $(".main-input-box").hide();
          $(".main-message").append(template.operationTips());
          common.backToReferrer(document.referrer);
          common.loading.hide();
          break;
        //    来自历史健康流程，发送完整病例单
        case "health":
        case "further":
          controller.triageDoctorAssign();

          if ($("[data-role='medicalReport']").size() === 0) {
            console.log(common.getpara().openId)
            console.log(localStorage.getItem("openId"))
            // if (common.getpara().openId || localStorage.getItem("openId")) {
            controller.getMedicalReport();
            t.nim.sendCustomMsg({
              scene: 'p2p',
              to: controller.targetData.account,
              content: JSON.stringify(controller.medicalReportData),
              done: function (error, msg) {
                controller.sendMedicalReport(error, msg);
              }
            });
            t.nim.sendCustomMsg({
              scene: 'p2p',
              to: controller.targetData.account,
              content: JSON.stringify({
                type: "new-" + common.getpara().from,
                data: $.extend(false, controller.medicalReportData.data, {
                  patientId: common.getpara().patientId,
                  consultationid: sessionStorage.getItem("orderSourceId"),
                  shuntCustomerId: common.getpara().shuntCustomerId
                })
              }),
              done: function (error, msg) {
                console.log("新用户提醒发送...");
              }
            })
            // }
          }
          Q.reg("index", function () {

          });
          Q.go("index");
          break;
        //    来自手术预约流程，发送手术预约单
        case "op_help":
          controller.triageDoctorAssign();
          if ($("[data-role='operationReport']").size() === 0) {
            if (common.getpara().openId || localStorage.getItem("openId")) {
              controller.getOperationData();
              t.nim.sendCustomMsg({
                scene: 'p2p',
                to: controller.targetData.account,
                content: JSON.stringify(controller.operationData),
                done: function (error, msg) {
                  controller.sendOperation(error, msg)
                }
              });
              t.nim.sendCustomMsg({
                scene: 'p2p',
                to: controller.targetData.account,
                content: JSON.stringify({
                  type: "new-" + common.getpara().from,
                  data: $.extend(false, controller.operationData.data, {
                    patientId: common.getpara().patientId,
                    consultationid: sessionStorage.getItem("orderSourceId"),
                    shuntCustomerId: common.getpara().shuntCustomerId
                  })
                }),
                done: function (error, msg) {
                  console.log("新用户提醒发送...");
                }
              })
            }
          }
          Q.reg("index", function () {

          });
          Q.go("index");
          break;
        case "refuse":
          controller.triageDoctorAssign();
          if ($(".main-message-content p:contains('医生拒绝了我的咨询，请重新为我推荐')").size() === 0) {
            t.nim.sendText({
              scene: 'p2p',
              to: controller.targetData.account,
              text: "医生拒绝了我的咨询，请重新为我推荐",
              done: function (error, obj) {
                $(".main-input-box-textarea").val('');
                controller.sendSingleMessage(error, obj);
              }
            });
          }
          Q.reg("index", function () {

          });
          Q.go("index");
          break;
        default:
          break;
      }
    },

    sendMessage: function () {
      var that = this;
      //单条消息发送
      $(".main-input-box-send").off("click").on("click", function () {

        that.nim.sendText({
          scene: 'p2p',
          to: controller.targetData.account,
          text: $(".main-input-box-textarea").val(),

          done: function (error, obj) {
            $(".main-input-box-textarea").val('');
            controller.sendSingleMessage(error, obj);
          }
        });
      });


      $(".main-input-box-textarea").off("input propertychange").on("input propertychange", function (e) {
        if ($(this).val().length !== 0) {
          $(".main-input-box-send").addClass("on");
        } else {
          $(".main-input-box-send").removeClass("on");
        }
        if ($(this).val().length >= 500) {
          $(this).val($(this).val().substring(0, 500));
          common.popup({
            text: "最多输入500个字"
          })
        }
        if (e.keyCode === 13) {
          e.preventDefault();

          that.nim.sendText({
            scene: 'p2p',
            to: controller.targetData.account,
            text: $(".main-input-box-textarea").val(),
            done: function (error, obj) {
              $(".main-input-box-textarea").val('');
              controller.sendSingleMessage(error, obj)
            }
          });
        }
      })
    },

    //获取历史消息……
    getMessageList: function () {
      var that = this;
      this.nim.getHistoryMsgs({
        scene: 'p2p',
        to: controller.targetData.account,
        done: function (error, obj) {

          controller.renderHistoryMessage(error, obj);
          controller.showBigPic();
          setTimeout(function () {
            that.sendSpecial(that);
          }, 1000);

        },
        limit: 100
      });
    },
    //修改用户名片...
    //尚不确定如何修改
    configUserInfo: function () {
      this.nim.updateMyInfo(controller.configUserInfo());
    },
    //获取对方名片
    getTargetAvatar: function () {
      this.nim.getUser({
        account: controller.targetData.account,
        done: controller.getTragetInfo
      });
    },
    //    发送视频/音频/文件等
    sendFile: function () {
      var fileInput = $("#ev-file-send"),
        that = this;
      fileInput.on("change", function (e) {
        var client = Math.random();
        $(".main-message").append(template.sendImage({
          url: window.URL.createObjectURL(e.target.files[0]),
          idClient: client
        }, false));

        $("[data-clientid='" + client + "'] .main-message-content .middle-tip-box").show();
        that.nim.previewFile({
          type: 'image',
          fileInput: document.getElementById("ev-file-send"),
          uploadprogress: function (obj) {
            $("html,body").scrollTop(Math.pow(10, 10));
            console.log($("[data-clientid='" + client + "']"));
            $("[data-clientid='" + client + "'] .main-message-content .middle-tip-box .progress p").text(obj.percentageText)
            console.log('文件总大小: ' + obj.total + 'bytes');
            console.log('已经上传的大小: ' + obj.loaded + 'bytes');
            console.log('上传进度: ' + obj.percentage);
            console.log('上传进度文本: ' + obj.percentageText);
          },
          done: function (error, file) {
            console.log('上传image' + (!error ? '成功' : '失败'));
            // show file to the user
            if (!error) {

              var msg = that.nim.sendFile({
                scene: 'p2p',
                to: controller.targetData.account,
                file: file,
                done: controller.sendImageDone(error, file)
              });
              $("[data-clientid='" + client + "'] .main-message-content .middle-tip-box").hide();
              console.log('正在发送p2p image消息, id=' + msg.idClient);
            }
            controller.showBigPic();
          }
        });
      })

    }
  };

  //操作类
  var Controller = function () {
    var that = this;
    this.messageBox = $(".main-message");
    this.takeCaseIdToGetToken();
    this.scrollFooter();
    $(".main-message").on("click", ".operation-record-list", function (e) {
      if (e.target.className === "fail-button") {
        return;
      }
      window.location.href = "/pages/directOperation/reservation_list.html?caseId=" + common.getpara().caseId + "&isOrder=1#!reservation"
    });
    $(".main-message").on("click", ".preview-suggestion", function () {
      window.location.href = "/pages/myServices/check_suggestion.html?caseId=" + $(this).parents(".main-message-box").attr("data-caseid") + "&diagnosisId=" + $(this).parents(".main-message-box").attr("data-diagnosisId") + "&patientCustomerId=" + common.getpara().customerId + "&patientId=" + common.getpara().patientId + '&caseType=' + that.getCaseType(common.getpara().from) + '&shuntCustomerId=' + common.getpara().shuntCustomerId;
    });
    $(".main-message").on("click", ".medical-record-list", function (e) {
      if (e.target.className === "fail-button") {
        return;
      }
      sessionStorage.setItem("medicalRecord", true);
      window.location.href = "/pages/directOperation/reservation_list.html?caseId=" + common.getpara().caseId + "&customerId=" + common.getpara().customerId + "&isOrder=0#!reservation";
    });


    this.updateCheckSuggestion();
    this.updateVideoTriage();

    this.beginTimestamp = 0;
  };
  Controller.prototype = {
    //基础用户数据...
    userData: {
      account: '',
      token: '',
      avatar: ""
    },
    //对话目标数据:
    targetData: {
      account: "1_doctor00001"
    },
    XHRList: {
      getToken: "/mcall/im/interact/v1/refreshToken/",
      getMedicalList: "/mcall/customer/patient/case/v1/getMapById/",
      updateMedicalList: "/mcall/customer/patient/case/v1/update/",
      triageAssign: "/mcall/customer/case/consultation/v1/create/",
      getTriageId: "/mcall/customer/case/consultation/v1/getMapById/",
      time: "/mcall/customer/case/consultation/v1/getConsultationFrequency/",
      refresh: "/mcall/customer/case/consultation/v1/update/",
      updateCount: "/mcall/customer/case/consultation/v1/updateFrequency/"
    },
    getUserLogo: function (param) {
      var sex = param.sexName,
        age = parseInt(param.age),
        img = "";
      if (age <= 12) {
        img = "https://img00.allinmed.cn/common/portrait_child_98.png";
      } else if (age > 12 && age <= 59) {
        img = (sex === "男" ? "https://img00.allinmed.cn/common/portrait_male_98.png" : "https://img00.allinmed.cn/common/portrait_female_98.png");
      } else if (age > 59) {
        img = (sex === "男" ? "https://img00.allinmed.cn/common/portrait_old_man_98.png" : "https://img00.allinmed.cn/common/portrait_old_woman_98.png");
      }
      this.userData.avatar = img;
    },
    //消息时间转换...
    transformMessageTime: function (time) {
      var format = function (num) {
        return num > 9 ? num : "0" + num;
      };
      var normalTime = function (time) {
        var d = new Date(time);
        var obj = {
          y: d.getFullYear(),
          m: d.getMonth() + 1,
          dd: d.getDate(),
          h: d.getHours(),
          mm: format(d.getMinutes())
        };
        return obj;
      };
      var result = "";
      var now = new Date().getTime(),
        day1 = normalTime(time).y + "-" + normalTime(time).m + "-" + normalTime(time).dd,
        day2 = normalTime(now).y + "-" + normalTime(now).m + "-" + normalTime(now).dd;
      if (day1 === day2) {
        result = normalTime(time).h + ":" + normalTime(time).mm;
      } else if (normalTime(time).y === normalTime(now).y) {
        result = normalTime(time).m + "月" + normalTime(time).dd + "日  " + normalTime(time).h + ":" + normalTime(time).mm;
      } else if (normalTime(time).y !== normalTime(now).y) {
        result = normalTime(time).y + "年" + normalTime(time).m + "月" + normalTime(time).dd + "日  " + normalTime(time).h + ":" + normalTime(time).mm;
      }
      return result;
    },
    //每超过5分钟打印一次时间戳...

    renderTimeStamp: function (time) {
      console.log(time, this.beginTimestamp)
      if ((time - this.beginTimestamp) / (5 * 60 * 1000) > 1) {
        this.messageBox.append("<p class='time-stamp'>" + this.transformMessageTime(time) + "</p>");
        this.beginTimestamp = time;
      }
    },

    scrollFooter: function () {
      var interval;
      $(".main-input-box .main-input-box-textarea").on("focus", function () {
        $("html,body").animate({
          "scrollTop": parseInt($("html,body").height()) + 1000 + "px"
        }, 300, "swing");
      });
      $(".main-input-box .main-input-box-textarea").on("blur", function () {
        // clearInterval((interval));
      })
    },
    takeCaseIdToGetToken: function () {
      var that = this;

      $.ajax({
        url: this.XHRList.getToken,
        type: 'POST',
        dataType: 'json',
        async: false,
        beforeSend: function () {
          common.loading.show();
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
            that.userData = {
              account: "0_" + common.getpara().caseId,
              token: data.responseObject.responseData.token
            }
          }

          common.loading.hide();
        })

    },
    sendErrorTips: function (msg) {
      $("[data-clientid='" + msg.idClient + "']").find(".fail-button").on("click", function (e) {
        var ele = $(this);
        e.stopPropagation();
        messageCommunication.nim.resendMsg({
          msg: msg,
          done: function (error) {
            if (!error) {
              ele.hide();
            }
            console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
          }
        })
      })
    },
    //发送单条数据...
    sendSingleMessage: function (error, msg) {
      var that = this;
      console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);

      $(".user-controller-input").val("");
      controller.renderTimeStamp(msg.userUpdateTime);
      if (!error) {
        that.messageBox.append(template.mine(msg, false));
        autosize.update($(".main-input-box-textarea"));
      } else {
        that.messageBox.append(template.mine(msg, true));
        autosize.update($(".main-input-box-textarea"));
        that.sendErrorTips(msg);
      }

      $("html,body").scrollTop(Math.pow(10, 10));
    },
    sendImageDone: function (error, msg) {
      console.log(error);
      console.log(msg);
      console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);

      // $(".main-message").append(template.sendImage(msg, error));
      if (!error || msg.status !== 'fail') {
        autosize.update($(".main-input-box-textarea"));
      } else {
        autosize.update($(".main-input-box-textarea"));
        this.sendErrorTips(msg);
      }
    },
    //获取病例单数据...
    getMedicalReport: function () {
      var that = this;
      $.ajax({
        url: this.XHRList.getMedicalList,
        type: "POST",
        dataType: "json",
        timeout: 10000,
        async: false,
        data: {
          paramJson: $.toJSON({
            caseId: common.getpara().caseId,//common.getpara().caseId
            isOrder: 0
          })
        }
      })
        .done(function (data) {
          console.log(data);
          if (data.responseObject.responseData) {
            var dataList = data.responseObject.responseData.dataList;
            if (dataList && dataList.length !== 0) {
              console.log(dataList[0].patientCasemap);
              that.medicalReportData = {
                data: {
                  caseId: common.getpara().caseId,  //问诊单 病例ID
                  patientName: dataList[0].patientCasemap.patientName, //患者姓名
                  sexName: dataList[0].patientCasemap.sexName, //患者性别
                  age: dataList[0].patientCasemap.age, //患者年龄
                  createDate: new Date().getTime(),
                  diagnoseConTent: "",
                  isAttachment: dataList[0].patientCasemap.isAttachment,
                  time: dataList[0].patientCasemap.caseTime
                },
                type: "medicalReport"  //自定义类型 问诊单
              };
              that.getUserLogo(that.medicalReportData.data);
              messageCommunication.configUserInfo();

            }
          }
        })
    },
    //发送病例..
    sendMedicalReport: function (error, msg) {
      console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
      this.renderTimeStamp(msg.userUpdateTime);
      this.messageBox.append(template.medicalRecord(this.medicalReportData.data, error, msg.idClient));

      if (!error || msg.status !== 'fail') {
        autosize.update($(".main-input-box-textarea"));
      } else {
        autosize.update($(".main-input-box-textarea"));
        this.sendErrorTips(msg);
      }
    },
    getOperationData: function () {
      var that = this;
      $.ajax({
        url: this.XHRList.getMedicalList,
        type: "POST",
        dataType: "json",
        timeout: 10000,
        async: false,
        data: {
          paramJson: $.toJSON({
            caseId: common.getpara().caseId,//common.getpara().caseId,
            isOrder: 1
          })
        }
      })
        .done(function (data) {
          console.log(data);
          if (data.responseObject.responseData) {
            var dataList = data.responseObject.responseData.dataList;
            if (dataList && dataList.length !== 0) {
              that.operationData = {
                data: {
                  caseId: common.getpara().caseId,
                  patientName: dataList[0].patientCasemap.patientName,
                  sexName: dataList[0].patientCasemap.sexName,
                  age: dataList[0].patientCasemap.age,
                  type: (function () {
                    if (dataList[0].reservationList[0].doctorId.length === 0 || parseInt(dataList[0].reservationList[0].doctorId) === 0) {
                      return 0;
                    } else {
                      return 1;
                    }
                  }()),
                  isAttachment: dataList[0].patientCasemap.isAttachment,
                  time: dataList[0].patientCasemap.caseTime
                },
                type: "operationReport"
              };

              that.getUserLogo(that.operationData.data);

              messageCommunication.configUserInfo();

            }
          }
        })
    },

    //发送手术预约..
    sendOperation: function (error, msg) {
      console.log(error)
      console.log('发送' + msg.scene + ' ' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
      this.renderTimeStamp(msg.userUpdateTime);
      this.messageBox.append(template.operation(this.operationData.data, error, msg.idClient));

      if (!error || msg.status !== 'fail') {
        autosize.update($(".main-input-box-textarea"));
      } else {
        autosize.update($(".main-input-box-textarea"));
        this.sendErrorTips(msg);
      }
    },

    //接受消息...
    receiveMessage: function (element, from) {
      if (element.content && element.content.length !== 0) {
        if (JSON.parse(element.content).type !== "penetrateMessage") {
          this.renderTimeStamp(element.time);
        }
      }
      switch (element.type) {
        case 'custom':
          //情况区分：病例？手术？康复报告？
          this.receiveCustomMessage(JSON.parse(element.content), from);
          break;
        case 'notification':
          // 处理群通知消息
          break;
        case "text":
          //单聊消息
          this.receiveSingleMessage(element);
          break;
        case "file":
          //文件信息
          this.receiveFileMessage(element);
          break;
        default:
          break;

      }
      setTimeout(function () {
        $("html,body").scrollTop(Math.pow(10, 10));
      }, 500)

    },
    //接受单条消息...
    receiveSingleMessage: function (msg) {
      this.messageBox.append(msg.from === this.userData.account ? template.mine(msg) : template.others(msg));
    },
    //接收文件消息...
    receiveFileMessage: function (msg) {
      var qualityUrl = messageCommunication.nim.viewImageQuality({
        url: msg.file.url,
        quality: 40
      });
      msg.file.url = qualityUrl;
      this.messageBox.append(msg.from === this.userData.account ? template.sendImage(msg.file) : template.getImage(msg.file));
    },
    //接受自定义消息 集中分配
    receiveCustomMessage: function (msg, from) {
      switch (msg.type) {
        case "medicalReport": //病例
          if ($("[data-role='medicalReport']").size() === 0) {
            this.messageBox.append(template.medicalRecord(msg.data));
          }
          break;
        case "operationReport": //手术预约
          this.messageBox.append(template.operation(msg.data));
          break;
        case "checkSuggestion": //检查检验
          this.messageBox.append(template.checkSuggestion(msg.data));
          if (sessionStorage.getItem("medicalRecord")) {
            sessionStorage.removeItem("medicalRecord");
            window.location.reload();
          }
          if (from === "message") {
            this.timeoutCountPaused();
          }
          break;
        case "previewSuggestion": //初诊建议
          this.messageBox.append(template.triageResult(msg.data[0]));
          break;
        case "videoTriage": //视诊
          this.messageBox.append(template.videoTriage(msg.data));
          break;
        case "ensureOperation":
          this.messageBox.append(template.ensureOperation(msg.data));
          break;
        case "payFinishTips": //历史消息提示
          this.messageBox.append(template.payFinishTips());
          break;
      }
    },
    //接收用户信息...
    getUserInfo: function (data) {
      this.userData = data;
      console.log(data)
    },
    //修改用户信息...
    //实际数据通过用户填写改变……并不在该页面
    configUserInfo: function () {
      return {
        nick: common.getpara().caseId,
        avatar: this.userData.avatar,
        sign: '',
        gender: 'unknown',
        email: 'unknown@unknown.com',
        birth: '1900-01-01',
        tel: '15000000000',
        done: function (error, user) {
          // console.log('更新我的名片' + (!error ? '成功' : '失败'));
          // console.log(error);
          // console.log(user);
        }
      }
    },

    //输出历史消息...
    renderHistoryMessage: function (error, obj) {
      var that = this;
      if (!error) {
        $(obj.msgs.reverse()).each(function (index, element) {
          if (index === 0) {
            that.beginTimestamp = element.time;
            that.messageBox.append("<p class='time-stamp'>" + that.transformMessageTime(that.beginTimestamp) + "</p>");
          }
          that.receiveMessage(element, "history")
        });
      }
    },
    //    分诊医生分流...
    triageDoctorAssign: function () {
      var that = this;
      $.ajax({
        url: this.XHRList.getTriageId,
        type: "POST",
        dataType: "json",
        timeout: 10000,
        async: false,
        data: {
          paramJson: $.toJSON({
            caseId: common.getpara().caseId,
            consultationType: 0,
            sortType: 1,
            firstResult: 0,
            maxResult: 9999
          })
        }
      })
        .done(function (data) {

          if (data.responseObject.responseMessage === "NO DATA") {
            $.ajax({
              url: that.XHRList.triageAssign,
              type: "POST",
              dataType: "json",
              timeout: 10000,
              async: false,
              data: {
                paramJson: $.toJSON({
                  caseId: common.getpara().caseId,
                  customerId: common.getpara().shuntCustomerId,
                  patientCustomerId: common.getpara().customerId,
                  patientId: common.getpara().patientId,
                  consultationType: 0,
                  consultationState: 0,
                  siteId: 17,
                  caseType: that.getCaseType(common.getpara().from)
                })
              }
            })
              .done(function (data) {
                if (data.responseObject.responseStatus) {
                  console.log("用户已分流...");
                  sessionStorage.setItem("orderSourceId", data.responseObject.responsePk);
                  controller.lostTimeLimit();
                }
              })
          } else {
            var dataList = data.responseObject.responseData.dataList;
            sessionStorage.setItem("orderSourceId", dataList[dataList.length - 1].consultationId);
            controller.lostTimeLimit();
          }
        });

    },
    getCaseType: function (type) {
      var result = "";
      if (type === "op_help") {
        result = 2;
      } else if (type === "health") {
        result = 0;
      } else if (type === "further") {
        result = 1;
      }
      return result;
    },
    // 上传检查检验
    updateCheckSuggestion: function () {
      var that = this;
      $(".main-message").on("click", ".check-suggestion[data-role='checkSuggestion']", function () {
        var dataList = [];
        $(this).find(".check-suggestion-item").each(function (index, element) {
          dataList.push({
            adviceId: $(element).attr("data-adviceid"),
            adviceName: $(element).text(),
            adviceType: $(element).attr("data-advicetype")
          });
        });
        Q.go("upLoad");
        modules.upLoadFiles({
          caseId: common.getpara().caseId,
          data: '',           // 图集数组
          picPkList: dataList,
          route: 'index',          //路由
          imageType: '1',     // 上传资料类型
          upLoadType: '4',     //方法调用类型 （1-历史健康、2-直约手术<无caseId>、3-问诊单、4-IM入口）
          fileCallBack: function (picList) {
            console.log(picList);
            messageCommunication.nim.sendText({
              scene: 'p2p',
              to: that.targetData.account,
              text: "患者已上传检查资料",
              done: function (error, obj) {
                $(".main-input-box-textarea").val('')
                that.sendSingleMessage(error, obj)
              }
            });
            $.ajax({
              url: that.XHRList.updateCount,
              type: 'POST',
              dataType: 'json',
              timeout: 10000,
              data: {
                paramJson: $.toJSON({
                  consultationId: sessionStorage.getItem("orderSourceId"),
                  frequency: "0",
                  frequencyType: "4",
                  consultationState: 0
                })
              }

            })
              .done(function (data) {
                if (data.responseObject.responseStatus) {
                  console.log("定时重新启动...");
                  that.timeoutCount(24 * 60 * 60 * 1000);
                }
              });
            $.ajax({
              url: that.XHRList.updateMedicalList,
              type: 'POST',
              dataType: 'json',
              timeout: 10000,
              data: {
                paramJson: $.toJSON({
                  caseId: common.getpara().caseId,
                  state: 1
                })
              }
            })
              .done(function (data) {
                if (data.responseObject.responseStatus) {
                  console.log("病例状态更新...")
                }
              })

          },
          backFunction: function () {
            //来源页路由里的方法事件
          }
        })
      })
    },
    // 上传视诊
    updateVideoTriage: function () {
      var that = this;
      Q.reg("upVideo", function () {

      });
      $(".main-message").on("click", ".check-suggestion[data-role='videoTriage']", function () {

        Q.go("upVideo");
        modules.videoUpLoad({
          route: "index",
          caseId: common.getpara().caseId,   //病例ID
          videoType: $(this).attr("data-type"),   //1-视频、2-图片
          upLoadDesc: $(this).find(".check-suggestion-item").text(),
          backFunction: function () {

          },
          upSaveFunction: function () {
            messageCommunication.nim.sendText({
              scene: 'p2p',
              to: that.targetData.account,
              text: "患者已上传视诊资料",
              done: function (error, obj) {
                $(".main-input-box-textarea").val('')
                that.sendSingleMessage(error, obj)
              }
            });
            $.ajax({
              url: that.XHRList.updateCount,
              type: 'POST',
              dataType: 'json',
              timeout: 10000,
              data: {
                paramJson: $.toJSON({
                  consultationId: sessionStorage.getItem("orderSourceId"),
                  frequency: "0",
                  frequencyType: "4",
                  consultationState: 0
                })
              }
            })
              .done(function (data) {
                if (data.responseObject.responseStatus) {
                  console.log("定时重新启动...");
                  that.timeoutCount(24 * 60 * 60 * 1000);
                }
              });
            $.ajax({
              url: that.XHRList.updateMedicalList,
              type: 'POST',
              dataType: 'json',
              timeout: 10000,
              data: {
                paramJson: $.toJSON({
                  caseId: common.getpara().caseId,
                  state: 1
                })
              }
            })
              .done(function (data) {
                if (data.responseObject.responseStatus) {
                  console.log("病例状态更新...")
                }
              })//上传成功保存后执行的回调
          }
        })
      })
    },
    //    剩余时间限制
    lostTimeLimit: function () {
      var that = this;
      $.ajax({
        url: this.XHRList.time,
        type: 'POST',
        dataType: 'json',
        async: false,
        beforeSend: function () {
          // common.loading.show();
        },
        data: {
          paramJson: $.toJSON({
            caseId: common.getpara().caseId,
            customerId: common.getpara().shuntCustomerId,
            isValid: 1,
            consultationType: 0,
            firstResult: 0,
            maxResult: 9999
          })
        },
      })
        .done(function (data) {
          console.log("success");
          $(".main-input-box").show();
          if (data.responseObject.responseStatus) {
            var dataList = data.responseObject.responseData.dataList;
            var time = parseInt(dataList.remainingTime);
            time = time > 24 * 60 * 60 * 1000 ? 24 * 60 * 60 * 1000 : time;
            if (dataList.consultationFrequency == "-1") {
              $(".main-message-time").hide();
            } else {
              if (time > 0) {
                that.timeoutCount(time);
              } else {
                that.timeoutToPay();
                $(".main-message-time").hide();
              }
            }
          }
          common.loading.hide();
        })
    },
    //    倒时
    timeoutCount: function (last) {

      var time = last, that = this;
      clearInterval(this.countTime);
      $(".main-message-time").show();
      this.countTime = setInterval(function () {
        if ($("[data-role='checkSuggestion']").size() !== 0 && $(".my-message .main-message-content p:contains('患者已上传检查资料')").size() === 0) {
          that.timeoutCountPaused();
        }
        time = time - 1000;

        if (time <= 0) {
          clearInterval(that.countTime);
          that.timeoutToPay()
        } else {
          $(".main-message-time span").text(MillisecondToDate(time));
        }
        that.lastTimeCount = time;
      }, 1000);
    },
    //倒数暂停
    timeoutCountPaused: function () {
      clearInterval(this.countTime);
      $(".main-message-time").hide();
    },
    //    到时需付费/IM通讯断链
    timeoutToPay: function () {
      var that = this;
      $(".main-input-box").append('<section class="prohibit-input">' +
        '<div>' +
        '<span>继续咨询</span>' +
        '</div>' +
        '</section>' +
        '<article class="over-tips">' +
        '<span>温馨提示：您购买的咨询服务超时已关闭，如需继续咨询请重新购买。</span>' +
        '</article>');
      $(".main-message-time").hide().find("span").text(0);

      $(".prohibit-input > div").on("click", function () {

        modules.createOrders({
          isTest: 0,
          data: {
            patientCustomerId: common.getpara().customerId, //	string	是	患者所属用户id
            patientId: common.getpara().patientId,         // 	string	是	患者id
            doctorId: common.getpara().shuntCustomerId,          //	string	是	医生id
            orderType: '1',                     //	string	是	订单类型  1-咨询2-手术3-门诊预约
            orderSourceId: sessionStorage.getItem("orderSourceId"),     //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
            orderSourceType: "1",                //	string	是	来源类型  问诊：1-普通2-特需3-加急 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
            orderAmount: 9.90,                  //	string	否	订单金额  （单位/元 保留两位小数）
            status: '1',                        //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
            body: '咨询',   //   string  否  订单描述 （微信支付展示用）
            isCharge: "true",                    //   string  是  true-收费  false-免费
            caseId: common.getpara().caseId
          },
          backCreateSuccess: function (_data) {
            //创建订单成功  （手术必选）
          },
          backCreateError: function (_data) {
            //创建订单失败  (必选)
          },
          wxPaySuccess: function (_data) {
            //支付成功回调  (问诊/门诊类型 必选)
            that.refreashOrderTime();
          },
          wxPayError: function (_data) {
            //支付失败回调  (问诊/门诊类型 必选)

          }
        });
      })
    },
    //支付成功...刷新页面并重置时间
    refreashOrderTime: function () {
      var that = this;

      $.ajax({
        url: this.XHRList.updateCount,
        type: 'POST',
        dataType: 'json',
        timeout: 10000,
        data: {
          paramJson: $.toJSON({
            consultationId: sessionStorage.getItem("orderSourceId"),
            frequency: "0",
            frequencyType: "2",
            consultationLevel: "1"
          })
        },
      })
        .done(function (data) {
          if (data.responseObject.responseData) {
            $(".prohibit-input").remove();
            $(".over-tips").remove();

            $(".main-message-time").show();
            that.timeoutCount(24 * 60 * 60 * 1000);
            messageCommunication.nim.sendCustomMsg({
              scene: 'p2p',
              to: that.targetData.account,
              content: JSON.stringify({
                type: "payFinishTips"
              }),
              done: function (error, msg) {
                if (!error) {
                  that.messageBox.append(template.payFinishTips());
                }
              }
            });
          }
        })

    },
    //查看大图功能
    showBigPic: function () {
      bigPicShow.init({
        domIdList: [".main-message-content"],
        imgClickCallBack: function () {
        },
        closeCallBack: function () {
        },
        topSwiperOptions: {
          isInit: true
        },
        bottomSwiperOptions: {
          isInit: true
        }
      });
    }
  };
  //策略类
  var Template = function () {
    var that = this;
  };
  Template.prototype = {
    others: function (data) {
      console.log(data)
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message" data-clientid="' + data.idClient + '">' +
        '<figure class="main-message-img">' +
        '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
        '</figure>' +
        '<figcaption class="main-message-content">' +
        '<p>' + data.text + '</p>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    mine: function (data, error) {

      return '<section class="main-message-box" >' +
        '<article class="main-message-box-item my-message" data-clientid="' + data.idClient + '">' +
        (function () {
          if (error) {
            return '<i class="fail-button" style="display:block;"><img src="/image/imScene/error_tips.png" alt=""></i>';
          } else {
            return '<i class="fail-button" style="display:none"><img src="/image/imScene/error_tips.png" alt=""></i>';
          }
        }()) +
        '<figcaption class="main-message-content">' +
        '<p>' + data.text + '</p>' +
        '</figcaption>' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.userData.avatar + '" alt="">' +
        '</figure>' +
        '</article>' +
        '</section>';
    },
    sendImage: function (data, error) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item my-message" data-clientid="' + (data.md5 || data.idClient) + '">' +
        (function () {
          if (error) {
            return '<i class="fail-button" style="display:block;width: 100%;"><img src="/image/imScene/error_tips.png" alt=""></i>';
          } else {
            return '<i class="fail-button" style="display:none"><img src="/image/imScene/error_tips.png" alt=""></i>';
          }
        }()) +
        '<figcaption class="main-message-content" style="padding: 0;position: relative">' +
        '<section class="middle-tip-box" style="display: none;">' +
        '<figure class="middle-tip-box-text">' +
        '<img class="notShow" src="/image/img00/patientConsult/symptom_photo_loading@2x.png" alt="loading...">' +
        '<figcaption class="progress">' +
        '<p>0%</p>' +
        '</figcaption>' +
        '</figure>' +
        '</section>' +
        '<img src="' + data.url + '" alt="" style="border-radius: 0.28rem">' +
        '</figcaption>' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.userData.avatar + '" alt="">' +
        (function () {
          setTimeout(function () {
            $(".main-message").scrollTop(Math.pow(10, 10));
          }, 700);
          return "";
        }()) +

        '</figure>' +
        '</article>' +
        '</section>';
    },
    sendCaseList: {
      first: '<section class="main-message-box">' +
      '<article class="main-message-box-item others-message">' +
      '<figure class="main-message-img">' +
      '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
      '</figure>' +
      '<figcaption class="main-message-content">' +
      '<p>您好，我们已收到您的基本情况。正在分析，请稍后···</p>' +
      '</figcaption>' +
      '</article>' +
      '</section>',
      second: '<section class="main-message-box">' +
      '<article class="main-message-box-item others-message">' +
      '<figure class="main-message-img">' +
      '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
      '</figure>' +
      '<figcaption class="main-message-content">' +
      '<p>根据您提交的症状描述，您还需要完善以下历史健康信息，这对您病情的诊断很重要，请您认真填写。<a class="main-message-href" href="/pages/healthInfo/health_info.html?caseId=' + common.getpara().caseId + '&patientId=' + common.getpara().patientId + '">填写历史健康信息> </a></p>' +
      '</figcaption>' +
      '</article>' +
      '</section>'

    },
    operationTips: function () {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
        '</figure>' +
        '<figcaption class="main-message-content">' +
        '<p>您好，医生已收到您的手术需求，为了更好的了解您的病情请您填写就医辅助信息，这对医生诊断很重要，要认真填写哦。<a class="main-message-href" href="/pages/directOperation/auxiliary_info.html?caseId=' + common.getpara().caseId + '&patientId=' + common.getpara().patientId + '&partId=' + common.getpara().partId + '&customerId=' + common.getpara().customerId + '">就医辅助信息 ></a></p>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    medicalRecord: function (data, error, idClient) {
      return '<section class="main-message-box" data-role="medicalReport">' +
        '<article class="main-message-box-item my-message" data-clientid="' + idClient + '">' +
        '<figcaption class="medical-record message-result medical-record-list">' +
        (error ? '<i class="fail-button"></i>' : '') +
        '<article class="message-result-item">' +
        '<header class="message-result-item-title">' +
        '问诊单' +
        '</header>' +
        '<section class="message-result-item-message">' +
        '<figure class="message-result-item-img">' +
        '<img src="/image/img00/patientConsult/dialogue_case@2x.png" alt="">' +
        '</figure>' +
        '<figcaption>' +
        '<h2>' +
        data.patientName + '问诊单' +
        '</h2>' +
        '<p>' +
        '<span class="sex">性别:' + data.sexName + '</span>' +
        '<span class="age">年龄:' + data.age + '</span>' +
        '</p>' +
        '</figcaption>' +
        '</section>' +
        '</article>' +
        '</figcaption>' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.userData.avatar + '" alt="">' +
        '</figure>' +
        '</article>' +
        '</section>' +
        '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
        '</figure>' +
        '<figcaption class="main-message-content">' +
        '<p>您好，分诊医生已收到您的问诊单，即将为您提供以下服务：</p>' +
        '<p>①  与您沟通分析病情</p>' +
        '<p>②  根据病情推荐对症专家</p>' +
        '<p>分诊医生通常会在5分钟内回复，请您耐心等候</p>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    triageResult: function (data) {
      return '<section class="main-message-box" data-caseId="' + data.caseId + '" data-customerId="' + data.customerId + '" data-diagnosisId="' + data.diagnosisId + '">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
        '</figure>' +
        '<figcaption class="check-suggestion message-result preview-suggestion">' +
        '<article class="message-result-item">' +
        '<header class="message-result-item-title">' +
        '初诊建议' +
        '</header>' +
        '<section class="message-result-item-message" style="padding-bottom: 0;">' +
        '<figure class="message-result-item-img">' +
        '<img src="/image/img00/patientConsult/dialogue_report@2x.png" alt="">' +
        '</figure>' +
        '<figcaption>' +
        '<h2>' +
        data.patientName + '&nbsp&nbsp&nbsp' + data.createTime +
        '</h2>' +
        '<p>' +
        '<span class="illness">初诊:' + (data.illnessName.length === 0 ? '暂不确定' : data.illnessName) + '</span>' +
        '</p>' +
        '</figcaption>' +
        '</section>' +
        '</article>' +
        '</figcaption>' +
        '</article>' +
        '</section>' +
        '<section class="preview-suggestion-tips">' +
        '<p>因不能面诊，无法全面了解病情，医生建议仅供参考，如有需要建议您预约医生沟通后进行面诊</p>' +
        '</section>';
    },
    operation: function (data, error, idClient) {
      return '<section class="main-message-box" data-role="operationReport">' +
        '<article class="main-message-box-item my-message" data-clientid="' + idClient + '">' +
        '<figcaption class="medical-record message-result operation-record-list">' +
        '<article class="message-result-item">' +
        (error ? '<i class="fail-button"></i>' : '') +
        '<header class="message-result-item-title">' +
        '手术预约单' +
        '</header>' +
        '<section class="message-result-item-message">' +
        '<figure class="message-result-item-img">' +
        '<img src="/image/img00/patientConsult/dialogue_case@2x.png" alt="">' +
        '</figure>' +
        '<figcaption>' +
        '<h2>' +
        data.patientName + '的预约单' +
        '</h2>' +
        '<p>' +
        '<span class="sex">性别:' + data.sexName + '</span>' +
        '<span class="age">年龄:' + data.age + '</span>' +
        '</p>' +
        '</figcaption>' +
        '</section>' +
        '</article>' +
        '</figcaption>' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.userData.avatar + '" alt="">' +
        '</figure>' +
        '</article>' +
        '</section>' +
        '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
        '</figure>' +
        '<figcaption class="main-message-content">' +
        (function (type) {
          console.log(data.type)
          if (type === 0) {
            return '<p>我们已收到您的全部信息，正在为您预约医生……</p>';
          } else if (type === 1) {
            return '<p>我们已收到您的手术需求，请稍后……</p>';
          }
        }(data.type)) +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    checkSuggestion: function (data) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
        '</figure>' +
        '<figcaption class="check-suggestion message-result ev-upLoadBtn" data-role="checkSuggestion">' +
        '<article class="message-result-item">' +
        '<header class="message-result-item-title">' +
        '检查/检验建议' +
        '</header>' +
        '<section class="message-result-item-message">' +
        (function (list) {
          var result = "";
          $(list).each(function (index, element) {
            console.log(element)
            result += '<p class="check-suggestion-item" data-adviceId="' + element.adviceId + '" data-adviceType="' + element.adviceType + '"><span>' + element.adviceName + '</span></p>';
          });
          return result;
        }(data)) +
        '</section>' +
        '</article>' +
        '</figcaption>' +
        '</article>' +
        '</section>' +
        '<section class="preview-suggestion-tips">' +
        '<p>因不能面诊，无法全面了解病情，医生建议仅供参考，如有需要建议您预约医生沟通后进行面诊</p>' +
        '</section>';

    },
    videoTriage: function (data) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
        '</figure>' +
        '<figcaption class="check-suggestion message-result" data-role="videoTriage" data-type="' + data.type + '">' +
        '<article class="message-result-item">' +
        '<header class="message-result-item-title">' +
        '视诊' +
        '</header>' +
        '<section class="message-result-item-message">' +
        '<p class="check-suggestion-item"><span>' + data.content + '</span></p>' +
        '</section>' +
        '</article>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    ensureOperation: function (data) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="/image/imScene/chatting_portrait_system@2x.png" alt="">' +
        '</figure>' +
        '<figcaption class="main-message-content">' +
        '<p>您好，由于手术安排需谨慎进行，请您先与' + data.doctorName + '医生进行线上沟通。<a class="main-message-href" href="/pages/myServices/doc_main.html?customerId=' + data.doctorId + '&caseId=' + common.getpara().caseId + '&patientId=' + common.getpara().patientId + '&patientCustomerId=' + common.getpara().customerId + '&caseType=' + controller.getCaseType(common.getpara().from) + '">立即咨询></a></p>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    payFinishTips: function () {
      return "<p class='time-stamp'>以上为历史纪录</p>"
    }
  };
  //HTML模板 策略类启动...
  var template = new Template();
  //全局控制方法启动...
  var controller = new Controller();

  //集中控制 网易云信核心通讯SDK启动...
  var messageCommunication = new MessageCommunication();

  // 全页面业务流启动...
  messageCommunication.init();
});
