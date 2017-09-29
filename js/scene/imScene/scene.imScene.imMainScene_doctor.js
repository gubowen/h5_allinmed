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
      if (!common.checkOpenId()) {
        common.wxGetOpenId(1);    //获取openId
      }
      controller.takeCaseIdToGetToken();
      autosize($(".main-input-box-textarea"));
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
          that.getMessageList();

          that.sendMessage();
          that.sendFile();


          if (!localStorage.getItem("triageAssign")) {
            controller.triageDoctorAssign();
          }

          controller.lostTimeLimit();
          that.finishPayToNotice();

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
          console.log(obj);
        },
        onofflinemsgs: function (obj) {
          console.log("离线消息...");
          $(obj.msgs).each(function (index, element) {
            if (index === 0) {
              controller.beginTimestamp = element.time;
              controller.messageBox.append("<p class='time-stamp'>" + controller.transformMessageTime(controller.beginTimestamp) + "</p>");
            }
            controller.receiveMessage(element, "message")
          });
        },
        onmsg: function (msg) {
          console.log(msg);
          setTimeout(function () {
            if (msg.from.indexOf("2_") != "-1") {
              if (controller.targetData.account === msg.from) {
                controller.receiveMessage(msg, "message");
                if (msg.type === "text" || msg.type === "image" || msg.type === "audio") {
                  controller.doctorReceiveCount(msg);
                }
              }
            }
            common.loading.hide();
          }, 1000);

        }
      });
    },

    sendMedicalReport: function (t) {

      if ($("[data-role='medicalReport']").size() === 0) {
        controller.getMedicalReport();
        t.nim.sendCustomMsg({
          scene: 'p2p',
          to: controller.targetData.account,
          content: JSON.stringify(controller.medicalReportData),
          needPushNick: false,
          pushContent: "患者<" + controller.userData.nick + ">向您咨询，点击查看详情",
          pushPayload: JSON.stringify({
            "account": "0_" + common.getpara().caseId,
            "type": "1"
          }),
          done: function (error, msg) {
            controller.sendMedicalReport(error, msg);
          }
        });
      }
    },
    sendMessage: function () {
      var that = this;
      //单条消息发送
      $(".main-input-box-send").on("click", function () {
        that.nim.sendText({
          scene: 'p2p',
          to: controller.targetData.account,
          text: $(".main-input-box-textarea").val(),
          needPushNick: false,
          pushContent: "患者<" + controller.userData.nick + ">向您咨询，点击查看详情",
          pushPayload: JSON.stringify({
            "account": "0_" + common.getpara().caseId,
            "type": "1"
          }),
          done: function (error, obj) {
            controller.renderTimeStamp(obj.time);
            $(".main-input-box-textarea").val('');
            controller.sendSingleMessage(error, obj)
            console.log(obj)

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
            needPushNick: false,
            pushContent: "患者<" + controller.userData.nick + ">向您咨询，点击查看详情",
            pushPayload: JSON.stringify({
              "account": "0_" + common.getpara().caseId,
              "type": "1"
            }),
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
          console.log(obj);
          controller.renderHistoryMessage(error, obj);
          controller.showBigPic();
          setTimeout(function () {
            that.sendMedicalReport(that);
          }, 1500);
          // controller.checkLastMessageIsRefuse(obj.msgs);
        },
        limit: 100
      });
    },

    //获取对方名片
    getTargetAvatar: function () {
      this.nim.getUser({
        account: "2_" + common.getpara().doctorCustomerId,
        done: controller.getTargetInfo()
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
                done: controller.sendImageDone(error, file),
                needPushNick: false,
                pushContent: "患者<" + controller.userData.nick + ">向您咨询，点击查看详情",
                pushPayload: JSON.stringify({
                  "account": "0_" + common.getpara().caseId,
                  "type": "1"
                }),
                type: "image"
              });
              $("[data-clientid='" + client + "'] .main-message-content .middle-tip-box").hide();
              console.log('正在发送p2p image消息, id=' + msg.idClient);
            }
            controller.showBigPic();
          }
        });
      })

    },

    //支付完成通知医生端
    finishPayToNotice: function () {
      var that = this;
      $(".main-input-box").on("click", ".prohibit-input", function () {
        modules.payTypePopup({
          isTest:0,
          container: $(".main-message"),   //添加DOM外层类
          index: 0,               //问诊类型  0.普通  1.特需  2.加急
          caseId: common.getpara().caseId,                  //  string  是  caseId
          patientCustomerId: common.getpara().patientCustomerId,      //	string	是	患者所属用户id
          patientId: common.getpara().patientId,               // 	string	是	患者id
          doctorId: common.getpara().doctorCustomerId,                //  医生Id
          type: 1,                     //订单类型  1-咨询2-手术3-门诊预约
          successCallback: function () {

            controller.sendPayFinishTips($(".swiper-slide-active .go_payment").attr("data-times"));//支付成功后回调
          }
        })
      });
    },
  };

  //操作类
  var Controller = function () {
    var that = this;
    this.messageBox = $(".main-message");
    this.beginTimestamp = 0;

    this.scrollFooter();
    this.routerControl();

    if (common.getpara().orderType == 2 && common.getpara().orderSourceType == 1) {
      this.sendUpdateOperationList();
    }

    $(".main-message").on("click", ".medical-record-list", function () {
      window.location.href = "/pages/directOperation/reservation_list.html?caseId=" + common.getpara().caseId + "&customerId=" + common.getpara().customerId + "&isOrder=0#!reservation"
    });

    document.title = localStorage.getItem("doctorName") + "医生";
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
      account: '2_' + common.getpara().doctorCustomerId,
      avatar: localStorage.getItem("doctorLogo")
    },

    XHRList: {
      getToken: "/mcall/im/interact/v1/refreshToken/",
      getMedicalList: "/mcall/customer/patient/case/v1/getMapById/",
      triageAssign: "/mcall/customer/case/consultation/v1/create/",
      update: "/mcall/customer/case/consultation/v1/update/",
      time: "/mcall/customer/case/consultation/v1/getConsultationFrequency/",
      updateTime: "/mcall/customer/case/consultation/v1/updateFrequency/",
      getTriageId: "/mcall/customer/case/consultation/v1/getMapById/"
    },
    routerControl: function () {
      Q.reg('index', function () {

      });
      Q.reg('oDetail', function () {

      });
      Q.reg("caseList", function () {

      });
      Q.go("index");
      Q.init({
        index: 'index', /* 首页地址 如果访问到不能访问页面也会跳回此页 */
        pop: function (L) {/* 每次有url变更时都会触发pop回调 */
          switch (L) {
            case "index":
              $(".wx-main-inner").remove();
              $(".case-list").remove();
              break
          }
        }
      });
    },
    //手术支付完成，发送透传信息并取消次数限制
    sendUpdateOperationList: function () {
      this.setMessageToFree();
      /*            messageCommunication.nim.sendCustomMsg({
       scene: 'p2p',
       to: this.targetData.account,
       content: JSON.stringify({
       type: "penetrateMessage",
       data: {
       actionType: "3",
       actionDict: {
       resourceID: "12345678",
       resourceType: "1"
       }
       }
       }),
       done: function (error, msg) {
       console.log(msg);
       }
       });*/
    },

    getUserLogo: function (param) {
      var sex = param.sexName,
        age = parseInt(param.age),
        img = "";
      if (age <= 12) {
        img = "/image/img00/myServices/chatting_portrait_child@2x.png";
      } else if (age > 12 && age <= 59) {
        img = (sex === "男" ? "/image/img00/myServices/chatting_chatting_man@2x.png" : "/image/img00/myServices/chatting_portrait_woman@2x.png");
      } else if (age > 59) {
        img = (sex === "男" ? "/image/img00/myServices/chatting_portrait_old_man@2x.png" : "/image/img00/myServices/chatting_portrait_old_woman@2x.png");
      }
      this.userData.avatar = img;
    },
    checkLastMessageIsRefuse: function (list) {
      var lastEle = list[list.length - 1];
      if (lastEle.type === "custom") {
        var lData = JSON.parse(lastEle.content);
        var that = this;
        if (lData.type === "penetrateMessage" && parseInt(lData.data.actionType) === 2) {
          if (localStorage.getItem("imOpen")) {
            this.getMedicalReport();
            messageCommunication.nim.sendCustomMsg({
              scene: 'p2p',
              to: that.targetData.account,
              content: JSON.stringify(that.medicalReportData),
              needPushNick: false,
              pushContent: "患者<" + controller.userData.nick + ">向您咨询，点击查看详情",
              pushPayload: JSON.stringify({
                "account": "0_" + common.getpara().caseId,
                "type": "1"
              }),
              done: function (error, msg) {
                that.sendMedicalReport(error, msg);
              }
            });
            localStorage.removeItem("imOpen");
          } else {
            this.refusePatient(lData.data.actionDict);
          }
        } else {
          $(".refuse-tips").remove();
        }
      }
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
      if ((time - this.beginTimestamp) / (5 * 60 * 1000) > 1) {
        console.log(time)
        console.log(this.transformMessageTime(time))
        this.messageBox.append("<p class='time-stamp'>" + this.transformMessageTime(time) + "</p>");
        this.beginTimestamp = time;

      }
    },
    scrollFooter: function () {
      var interval;
      $(".main-input-box .main-input-box-textarea").on("focus", function () {
        // interval = setInterval(function () {
        //     document.body.scrollTop = document.body.scrollHeight
        // }, 100)
        $("html,body").animate({
          "scrollTop": parseInt($("html,body").height()) + 1000 + "px"
        }, 300, "swing");
      });
      $(".main-input-box .main-input-box-textarea").on("blur", function () {
        clearInterval((interval));

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
    //症状描述结束、提示填写历史健康信息...
    //tips:本次发送是装样子的，分诊台并不收到消息，是渲染template的假象

    //发送单条数据...
    sendSingleMessage: function (error, msg) {
      var that = this;

      console.log('发送' + msg.scene + '' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
      controller.renderTimeStamp(msg.userUpdateTime);

      if (!error || msg.status !== 'fail') {
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
      console.log('发送' + msg.scene + '' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
      if (!error) {
        // $(".main-message").append(template.sendImage(msg, error));
        $("body").scrollTop(Math.pow(10, 10));
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
                  caseUrl: "https://m.allinmed.cn/pages/app_native/reservation_list.html?caseId=" + common.getpara().caseId + "&isOrder=0"
                },
                type: "medicalReport"  //自定义类型 问诊单
              };
              that.getUserLogo(that.medicalReportData.data);
              that.userData.nick = dataList[0].patientCasemap.patientName;
              //手术预约单operationReport
              // that.medicalReportData=dataList

              messageCommunication.nim.updateMyInfo({
                nick: dataList[0].patientCasemap.patientName,
                avatar: that.userData.avatar,
                sign: 'newSign',
                gender: dataList[0].patientCasemap.sexName === "男" ? "male" : "female",
                email: '',
                birth: '',
                tel: '',
                done: function (data) {
                  console.log("名片更新完成...")
                }
              });

            }
          }
        })
    },
    //    分诊医生分流...
    triageDoctorAssign: function (pid) {
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
            consultationType: 1,
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
                  customerId: common.getpara().doctorCustomerId,
                  patientCustomerId: common.getpara().patientCustomerId,
                  patientId: common.getpara().patientId,
                  consultationType: 1,
                  consultationState: 0,
                  siteId: 17
                })
              }
            })
              .done(function (data) {
                if (data.responseObject.responseStatus) {
                  console.log("用户已分流...");
                  sessionStorage.setItem("orderSourceId", data.responseObject.responseData.dataList[0].consultationId);
                }
              })
          } else {
            localStorage.setItem("shuntCustomerId", data.responseObject.responseData.dataList[0].customerId);
            localStorage.setItem("caseType", data.responseObject.responseData.dataList[0].caseType)
          }
        })
    },
    //发送病例..
    sendMedicalReport: function (error, msg) {
      console.log('发送' + msg.scene + '' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
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
                  }())
                },
                type: "operationReport"
              };

              that.getUserLogo(that.operationData.data);
              if (common.getpara().shuntCustomerId) {
                if (!localStorage.getItem("triageAssign")) {
                  controller.triageDoctorAssign();
                }
              }
            }
          }
        })
    },

    //发送手术预约..
    sendOperation: function (error, msg) {
      console.log('发送' + msg.scene + '' + msg.type + '消息' + (!error ? '成功' : '失败') + ', id=' + msg.idClient);
      if (!error) {
        this.messageBox.append(template.operation(this.operationData.data));
        localStorage.setItem("oHasSend", 1);

      }
    },

    //接受消息...
    receiveMessage: function (element, type) {
      switch (element.type) {
        case 'custom':
          if (element.content && element.content.length !== 0) {
            if (JSON.parse(element.content).type !== "penetrateMessage") {
              this.renderTimeStamp(element.time);
              this.receiveCustomMessage(JSON.parse(element.content));
              if ($(".others-message").size() === 2 && $(".first-message-tips").size() === 0) {
                $(".main-message").append('<section class="preview-suggestion-tips first-message-tips">' +
                  '<p>因不能面诊，无法全面了解病情，医生建议仅供参考，如有需要可向医生提出预约门诊需求。</p>' +
                  '</section>');
              }
            } else {
              this.penetrateMessage(JSON.parse(element.content).data, type);
            }
          }
          //情况区分：病例？手术？康复报告？
          break;
        case 'notification':
          // 处理群通知消息
          break;
        case "text":
          //单聊消息
          this.renderTimeStamp(element.time);
          this.receiveSingleMessage(element);

          if ($(".others-message").size() === 2 && $(".first-message-tips").size() === 0) {
            $(".main-message").append('<section class="preview-suggestion-tips first-message-tips">' +
              '<p>因不能面诊，无法全面了解病情，医生建议仅供参考，如有需要可向医生提出预约门诊需求。</p>' +
              '</section>');
          }
          break;
        case "file":
          //文件信息
          this.receiveFileMessage(element);
          break;
        case "image":
          this.receiveFileMessage(element);
          break;
        case "audio":
          this.receiveAudioMessage(element.file)
          break;
        default:
          break;


      }
      $("html,body").scrollTop(Math.pow(10, 10));


    },
    receiveAudioMessage: function (audio) {
      this.messageBox.append(template.audioMessage(audio));

      $(".audio-message .voice-message").on("canplay", function () {
        tl = $('.voice-message').get(0).duration;
        console.log(tl)
      });
      $('.main-message').off("click").on("click", ".audio-message", function () {
        var audio = $(this).find(".voice-message").get(0);
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
          audio.currentTime = 0;
        }
      });
    },
    //接受单条消息...
    receiveSingleMessage: function (msg) {
      this.messageBox.append(msg.from === this.userData.account ? template.mine(msg) : template.others(msg));
    },
    //接收文件消息...
    receiveFileMessage: function (msg) {
      this.messageBox.append(msg.from === this.userData.account ? template.sendImage(msg.file) : template.getImage(msg.file));
    },
    //接受自定义消息 集中分配
    receiveCustomMessage: function (msg) {
      var that = this;
      switch (msg.type) {
        case "medicalReport": //病例单
          this.messageBox.append(template.medicalRecord(msg.data));
          break;
        case "surgicalDrape": //手术单
          this.messageBox.append(template.operationDetail(msg.data));
          // that.checkOperationDetail(msg.data);
          break;
        case "hospitalNotice": //住院通知单
          this.messageBox.append(template.hospitalNotice(msg.data));
          $(".ev-checkHospitalDetail").on("click", function () {
            that.checkHospitalDetail(msg.data);
          });
          break;
        case "prescription": //检查检验
          this.messageBox.append(template.outPatientDetail(msg.data));
          break;
        case "previewSuggestion": //初诊建议
          this.messageBox.append(template.triageResult(msg.data[0]));
          break;
        case "outpatientInvite": //门诊邀请
          this.messageBox.append(template.outpatientInvite(msg.data))
          break;
        case "payFinishTips": //历史消息记录
          this.messageBox.append(template.payFinishTips());
          break;
      }
    },
    //透传消息处理...
    penetrateMessage: function (data, type) {
      var that = this;

      switch (parseInt(data.actionType)) {
        case 1: //赠送咨询次数
          if (data.actionDict.updateType == 1) {
            if (type !== "history") {
              this.recoverCommuncation(3);
              that.messageBox.append(template.getSendCountTips({
                name: localStorage.getItem("doctorName")
              }));

              setTimeout(function () {
                $(".message-getSendCount-tips").addClass("show");
              });

              setTimeout(function () {
                $(".message-getSendCount-tips").removeClass("show");
                $(".message-getSendCount-tips").on("transitionend WebkitTransitionEnd", function () {
                  $(this).remove();
                });
              }, 3000);
            }
          } else if (data.actionDict.updateType == 2) {
            that.messageBox.append(template.payFinishTips());
          }
          break;
        case 2: //拒绝咨询

          this.refusePatient(data.actionDict);

          break;
        case 3: //拒绝咨询
          break;
        case 4: //患者更新手术单
          break;

      }
    },
    refusePatient: function (reason) {

      // var dataList = data.responseObject.responseData.dataList[0];
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
        },
        success: function (data) {
          if (!(data.responseObject.responseMessage === "NO DATA")) {
            localStorage.setItem("shuntCustomerId", data.responseObject.responseData.dataList[0].customerId);
          }
        }
      })
      $(".prohibit-input").remove();
      $(".main-input-box").append(
        '<section class="refuse-tips">' +
        '<div><span>温馨提示：您可选择<a class="connect-triage" href="/pages/imScene/im_main_scene.html?&caseId=' + common.getpara().caseId + '&patientId=' + common.getpara().patientId + '&customerId=' + common.getpara().patientCustomerId + '&shuntCustomerId=' + localStorage.getItem("shuntCustomerId") + '&from=' +
        (function () {
          var result = "";
          switch (parseInt(localStorage.getItem("caseType"))) {
            case 0:
              result = "health";
              break;
            case 1:
              result = "further";
              break;
            case 2:
              result = "op_help";
              break;
          }
          return result;
        }()) +
        '">联系小唯</a>为您匹配医生</span></div>' +
        '</div>' +
        '</section>');

      messageCommunication.nim.disconnect();
      $("html").attr("data-disconnect", 1);

      $(".main-message").append('<section class="preview-suggestion-tips first-message-tips">' +
        '<p>' +
        (function () {
          if (reason.resourceID == 1) {
            return "由于病情不符合" + reason.resourceType + "原因医生无法继续为您提供咨询服务。"
          } else {
            return "由于" + reason.resourceType + "原因医生无法继续为您提供咨询服务。"
          }
        }()) +
        '</p>' +
        '</section>');

      $(".select-other-doctor").on("click", function () {
        Q.go("doctor");
        modules.searchList({
          targetEle: $(".select-other-doctor"),
          type: "doctor",
          source: "1",
          select: "1",
          backCallback: function () {
            // Q.go("index");
          }
        });
      });
    },
    //接收用户信息...
    getUserInfo: function (data) {
      this.userData = data;
    },
    getTargetInfo: function (error, user) {
      console.log(user);
      controller.targetData = user;
    },

    //输出历史消息...
    renderHistoryMessage: function (error, obj) {
      var that = this;

      if (!error) {
        $(obj.msgs.reverse()).each(function (index, element) {

          if ($("html").attr("data-disconnect") == 1) {
            return false;
          }
          if (index === 0) {
            that.beginTimestamp = element.time;
            that.messageBox.append("<p class='time-stamp'>" + that.transformMessageTime(that.beginTimestamp) + "</p>");
          }

          that.receiveMessage(element, "history")
        });
      }
    },
    //展示手术单详情
    checkOperationDetail: function (data) {
      var that = this;
      $(".ev-operationDetialBtn").on("click", function () {
        Q.go('oDetail');
        that.messageBox.append(template.operationDetailList(data))
        $(".wx-surgical-commCenter").on("click", function () {
          $(this).addClass("wx-surgical-commSelect").siblings(".wx-surgical-commCenter").removeClass("wx-surgical-commSelect");
          if ($(".wx-surgical-compareMain .wx-surgical-commSelect").size() !== 0) {
            $(".wx-surgical-orderBtn").addClass("wx-orderSelected");
          }
        });
      });
    },
    //展示住院通知单详情
    checkHospitalDetail: function (data) {
      Q.go("caseList");
      this.messageBox.append(template.hospitalNoticeDetail(data));
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
            customerId: common.getpara().doctorCustomerId,
            isValid: 1,
            consultationType: 1,
            firstResult: 0,
            maxResult: 9999
          })
        },
      })
        .done(function (data) {
          console.log("success");
          $(".main-input-box").show();
          if (data.responseObject.responseData) {
            var dataList = data.responseObject.responseData.dataList;

            if (dataList) {
              var count = dataList.consultationFrequency;
              var time = dataList.remainingTime;
              that.consultationCount = count;
              that.consultationTime = time;
              that.timeoutCount();
              $(".talk-num-tips span").text(count);
              if (time > 0 && count > 0) {
                $(".talk-num-tips").removeClass("over");
              } else if (time <= 0 && count <= 0) {
                $(".talk-num-tips").addClass("over");
                that.timeoutToPay("time");
              } else {
                $(".talk-num-tips").addClass("over");
                if (time <= 0) {
                  that.timeoutToPay("time");
                } else if (count <= 0) {
                  that.timeoutToPay("count");
                }

              }
            }
          }
          common.loading.hide();
        })
    },
    //有效时间倒数
    timeoutCount: function (last) {
      var time = last, that = this;
      clearInterval(this.countTime);
      this.countTime = setInterval(function () {

        time = time - 1000;

        if (time <= 0) {
          clearInterval(that.countTime);
          that.timeoutToPay("time");
        }
        that.lastTimeCount = time;
      }, 1000);
    },
    //支付完成更新次数，发送透传信息
    sendPayFinishTips: function (count) {
      var that = this;

      $.ajax({
        url: this.XHRList.updateTime,
        type: 'POST',
        dataType: 'json',
        beforeSend: function () {
          common.loading.show();
        },
        data: {
          paramJson: $.toJSON({
            consultationId: sessionStorage.getItem("orderSourceId"),
            frequency: count,
            frequencyType: 2,
            consultationLevel: $(".swiper-slide-active .go_payment").attr("data-type")
          })
        }
      }).done(function (data) {
        console.log("success");
        if (data.responseObject.responseStatus) {
          common.loading.hide();
          messageCommunication.nim.sendCustomMsg({
            scene: 'p2p',
            to: that.targetData.account,
            needPushNick: false,
            pushContent: "患者<" + controller.userData.nick + ">向您咨询，点击查看详情",
            pushPayload: JSON.stringify({
              "account": "0_" + common.getpara().caseId,
              "type": "1"
            }),
            content: JSON.stringify({
              type: "penetrateMessage",
              data: {
                actionType: "1",
                actionDict: {
                  updateType: "2"
                }
              }
            }),
            done: function (error, msg) {
              console.log(msg);
              that.recoverCommuncation(count);
              that.messageBox.append(template.payFinishTips());
            }
          });
        }

      });

    },

    //    到时需付费/IM通讯断链
    timeoutToPay: function (type) {
      var that = this;
      $(".over-tips-bottom").remove();
      $(".main-input-box").append('<section class="prohibit-input">' +
        '<div>' +
        '<span>继续咨询</span>' +
        '</div>' +
        '</section>');
      setTimeout(function () {
        $(".main-message").append('<article class="over-tips-bottom" style="margin-bottom: 0.7rem">' +
          (function () {
            var result = "";
            if (type === "count") {
              result = '<span>温馨提示：亲，你购买的咨询服务次数已经用完了，新问题可以付费后继续提问哦！</span>';
            } else {
              result = '<span>温馨提示：您购买的咨询服务超时已关闭，如需继续咨询请重新购买。</span>';
            }

            return result;
          }()) +
          '</article>');
        $("body").scrollTop(Math.pow(10, 10));
      }, 1000);


      $(".main-input-box-textarea").blur();
      $("body").scrollTop(Math.pow(10, 10));
    },
    //获取赠送3次咨询/支付完成
    recoverCommuncation: function (count) {

      $(".prohibit-input,.over-tips-bottom").remove();
      $(".prohibit-input").remove();
      $(".talk-num-tips span").removeClass("over").text(count);
      this.consultationCount = count;
    },

    doctorReceiveCount: function (msg) {

      this.consultationCount--;
      if (this.consultationCount < 0) {
        this.consultationCount = 0;
      }
      $(".talk-num-tips span").text(this.consultationCount);

      if (this.consultationCount === 0) {
        this.timeoutToPay("count");
      }
    },        //沟通置入免费状态...
    setMessageToFree: function () {
      $(".talk-num-tips").remove();
      this.consultationCount = 99999;
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
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.targetData.avatar + '" alt="">' +
        '</figure>' +
        '<figcaption class="main-message-content">' +
        '<p>' + data.text + '</p>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    mine: function (data, error) {
      return '<section class="main-message-box">' +
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
        '<img src="/image/img00/patientConsult/symptom_photo_loading@2x.png" alt="loading...">' +
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
    getImage: function (data) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message" >' +

        '<figure class="main-message-img">' +
        '<img src="' + controller.targetData.avatar + '" alt="">' +
        '</figure>' +
        '<figcaption class="main-message-content" style="padding: 0">' +
        '<img src="' + data.url + '" alt="" class="message-img" style="border-radius: 0.28rem">' +
        (function () {
          setTimeout(function () {
            $("body").scrollTop(Math.pow(10, 10));
          }, 700);
          return "";
        }()) +

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
        '<figcaption class="first-message">' +
        '<p>已通知医生尽快接诊，医生回复将在唯医骨科官方公众号中即时通知，请保持关注，超时未回复平台将自动全额退款。</p>' +
        '</figcaption>' +
        '</article>' +
        '</section>';

    },
    operation: function (data) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item my-message">' +
        '<figcaption class="medical-record message-result operation-record-list">' +
        '<article class="message-result-item">' +
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
        '<img src="' + controller.targetData.avatar + '" alt="">' +
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
    operationDetail: function (data) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.targetData.avatar + '" alt="">' +
        '</figure>' +
        '<figcaption class="check-suggestion message-result doctor-special" data-role="operationDetail">' +
        '<article class="message-result-item">' +
        '<header class="message-result-item-title">' +
        '手术单' +
        '</header>' +
        '<section class="message-result-item-message">' +
        '<p class="check-suggestion-item"><span>手术医师：' + data.doctorName + '</span></p>' +
        '<p class="check-suggestion-item"><span>术前诊断：' + data.preoperativeDiagnosis + '</span></p>' +
        '<p class="check-suggestion-item"><span>手术名称：' + data.operationName + '</span></p>' +
        (function () {
          if (data.remarks && data.remarks.length !== 0) {
            return '<p class="check-suggestion-item"><span>医生叮嘱：' + data.remarks + '</span></p>';
          }
        }()) +
        '<footer class="message-result-item-bottom">' +
        '<a href="/pages/wxPay/procedure_wx_pay.html?caseId=' + common.getpara().caseId + '&patientCustomerId=' + common.getpara().patientCustomerId + '&operationOrderId=' + data.surgicalDrapeID + '&doctorCustomerId=' + common.getpara().doctorCustomerId + '&patientId=' + common.getpara().patientId + '#!procedure">查看详情</a>' +
        '</footer>' +
        '</section>' +
        '</article>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    operationDetailList: function (data) {
      return '<section class="wx-main-inner">' +
        '<section class="wx-main-content surgeryOrder">' +
        '<section class="wx-surgical-commBox">' +
        '<div class="wx-surgical-commTitle">手术单</div> ' +
        '<div class="wx-surgical-commCenter">' +
        '<div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
        '<span class="wx-surgical-commItemList-left wx-surgical-itemList">疾病诊断</span>' +
        '<span class="wx-surgical-commItemList-right wx-surgical-itemList">' + data.preoperativeDiagnosis + '</span>' +
        '</div>' +
        '<div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
        '<span class="wx-surgical-commItemList-left wx-surgical-itemList">手术名称</span>' +
        '<span class="wx-surgical-commItemList-right wx-surgical-itemList">' + data.preoperativeDiagnosis + '</span>' +
        '</div>' +
        '<div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
        '<span class="wx-surgical-commItemList-left wx-surgical-itemList">医生叮嘱</span>' +
        '<span class="wx-surgical-commItemList-right wx-surgical-itemList">' + data.remarks + '</span>' +
        '</div>' +
        '<div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
        '<span class="wx-surgical-commItemList-left wx-surgical-itemList">手术医师</span>' +
        '<span class="wx-surgical-commItemList-right wx-surgical-itemList">' + data.doctorName + '</span>' +
        '</div>' +
        '</div>' +
        '</section>' +
        '<section class="wx-surgical-commBox wx-surgical-compareMain">' +
        '<div class="wx-surgical-commTitle">手术对比</div>' +
        '<div class="wx-surgical-commCenter netHospital" data-type="1">' +
        '<div class="wx-surgical-commItemBox wx-surgical-compare-itemBox">' +
        '<div class="wx-surgical-compare-titleBox">' +
        '<p class="wx-surgical-compare-title">' +
        '<span class="wx-surgical-compare-logo"></span>' +
        '<span class="wx-surgical-compare-text">互联网手术</span>' +
        '<span class="wx-surgical-compare-tips">推荐</span>' +
        '</p>' +
        '</div>' +
        '<ul class="wx-surgical-compare-listBox">' +
        '<li class="wx-surgical-compare-listItem">可选手术医院</li>' +
        '<li class="wx-surgical-compare-listItem">床位供给充足</li>' +
        '<li class="wx-surgical-compare-listItem">费用低</li>' +
        '<li class="wx-surgical-compare-listItem">手术安排快速</li>' +
        '<li class="wx-surgical-compare-listItem">骨科专家任意选</li>' +
        '</ul>' +
        '<span class="wx-selectBtn-recommend"></span></div>' +
        '</div>' +
        '<div class="wx-surgical-commCenter publicHospital"  data-type="2">' +
        '<div class="wx-surgical-commItemBox wx-surgical-compare-itemBox">' +
        '<div class="wx-surgical-compare-titleBox">' +
        '<p class="wx-surgical-compare-title">' +
        '<span class="wx-surgical-compare-logo"></span>' +
        '<span class="wx-surgical-compare-text">公立医院手术</span>' +
        '</p>' +
        '</div>' +
        '<ul class="wx-surgical-compare-listBox">' +
        '<li class="wx-surgical-compare-listItem">可选手术医院</li>' +
        '<li class="wx-surgical-compare-listItem">床位供给充足</li>' +
        '<li class="wx-surgical-compare-listItem">费用低</li>' +
        '<li class="wx-surgical-compare-listItem">手术安排快速</li>' +
        '<li class="wx-surgical-compare-listItem">骨科专家任意选</li>' +
        '</ul>' +
        '<span class="wx-selectBtn-recommend"></span></div>' +
        '</div>' +
        '</section>' +
        '<section class="wx-surgical-commOrderBtnBox">' +
        '<button data-id=""' + data.surgicalDrapeID + '" class="wx-surgical-orderBtn">预约</button>' +
        '</section>' +
        '<section class="wx-surgical-commBottomTips">' +
        '<p class="surgical-bottomTextBox"> <span class="surgical-bottomText">什么是互联网手术</span></p>' +
        '<section class="wx-surgical-commTipsMain">' +
        '<section class="wx-surgical-commExplainBox"></section>' +
        '<section class="wx-surgical-commExplainCenter">' +
        '<section class="wx-surgical-commTipsBox">' +
        '    <p class="wx-surgical-commExplain-title">互联网手术</p>' +
        '    <p class="wx-surgical-commExplain-content">互联网手术是互联网手术是互联网手术是互联网手术是互联网手术互联网手术是互联网手术是互联网手' +
        '        术是互联网手术是互联网手术是互联网手术是互联网手术是互联网手术是互联网手术是互联网手术是互' +
        '        联网手术是互联网手术是互联网术是互联网手术是互联网手术是</p>' +
        '    <span class="wx-surgical-commTipsCloseBtn"></span>' +
        '</section>' +
        '</section>' +
        '</section>' +
        '</section>' +
        '</section>' +
        '</section>';
    },
    outPatientDetail: function (data) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.targetData.avatar + '" alt="">' +
        '</figure>' +
        '<figcaption class="check-suggestion message-result doctor-special" data-role="outPatientDetail">' +
        '<article class="message-result-item">' +
        '<header class="message-result-item-title">' +
        '处方' +
        '</header>' +
        '<section class="message-result-item-message">' +
        '<p class="check-suggestion-item"><span>初步诊断：' + data.tentativeDiagnosis + '</span></p>' +
        '<footer class="message-result-item-bottom">' +
        '<a href="javascript:void(0)">查看处方详情</a>' +
        '</footer>' +
        '</section>' +
        '</article>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    outpatientInvite: function (data) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.targetData.avatar + '" alt="">' +
        '</figure>' +
        '<figcaption class="check-suggestion message-result doctor-special" data-role="outPatientDetail">' +
        '<article class="message-result-item">' +
        '<header class="message-result-item-title">' +
        '门诊邀约' +
        '</header>' +
        '<section class="message-result-item-message">' +
        '<p class="check-suggestion-item"><span>医生建议您预约门诊，面诊后才能准确为您确诊病情。</span></p>' +
        '<footer class="message-result-item-bottom">' +
        '<a href="/pages/myServices/doc_main.html?caseId=' + common.getpara().caseId + '&customerId=' + common.getpara().doctorCustomerId + '&type=1&patientId=' + common.getpara().patientId + '&patientCustomerId=' + common.getpara().patientCustomerId + '">预约门诊</a>' +
        '</footer>' +
        '</section>' +
        '</article>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    hospitalNotice: function (data) {
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.targetData.avatar + '" alt="">' +
        '</figure>' +
        '<figcaption class="check-suggestion message-result doctor-special" data-role="hospitalNotice">' +
        '<article class="message-result-item">' +
        '<header class="message-result-item-title">' +
        '住院通知单' +
        '</header>' +
        '<section class="message-result-item-message">' +
        '<p class="check-suggestion-item"><span>手术医院：' + data.surgeryHospital + '</span></p>' +
        '<p class="check-suggestion-item"><span>入院时间：' + data.hospitalDate + '</span></p>' +
        '<footer class="message-result-item-bottom">' +
        '<a href="javascript:void(0)" class="ev-checkHospitalDetail">查看详情</a>' +
        '</footer>' +
        '</section>' +

        '</article>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },

    hospitalNoticeDetail: function (data) {

      return '<section class="case-list">' +
        '<article class="case-list-item">' +
        '<a class="time" href="javascript:void(0)">诊断</a>' +
        '<a class="case-list-item-name"  href="javascript:void(0)">' + data.diagnose + '</a>' +
        '</article>' +
        '<article class="case-list-item">' +
        '<a class="time" href="javascript:void(0)">拟执行手术</a>' +
        '<a class="case-list-item-name"  href="javascript:void(0)">' + data.surgery + '</a>' +
        '</article>' +
        '<article class="case-list-item">' +
        '<a class="time" href="javascript:void(0)">手术医院</a>' +
        '<a class="case-list-item-name"  href="javascript:void(0)">' + data.surgeryHospital + '</a>' +
        '</article>' +
        '<article class="case-list-item">' +
        '<a class="time" href="javascript:void(0)">入院时间</a>' +
        '<a class="case-list-item-name"  href="javascript:void(0)">' + data.hospitalDate + '</a>' +
        '</article>' +
        '<article class="case-list-item">' +
        '<a class="time" href="javascript:void(0)">手术时间</a>' +
        '<a class="case-list-item-name"  href="javascript:void(0)">' + data.surgeryDate + '</a>' +
        '</article>' +
        '<article class="case-list-item">' +
        '<a class="time" href="javascript:void(0)">病床</a>' +
        '<a class="case-list-item-name"  href="javascript:void(0)">' + data.sickbed + '</a>' +
        '</article>' +
        '<article class="case-list-item">' +
        '<a class="time" href="javascript:void(0)">术前叮嘱</a>' +
        '<a class="case-list-item-name"  href="javascript:void(0)">' + data.preoperativeAdvice + '</a>' +
        '</article>' +
        '<article class="case-list-item">' +
        '<a class="time" href="javascript:void(0)">备注</a>' +
        '<a class="case-list-item-name"  href="javascript:void(0)">' + data.remarks + '</a>' +
        '</article>' +
        '</section>';
    },
    getSendCountTips: function (data) {
      return '<article class="message-getSendCount-tips">' + data.name + '医生免费赠送给你3次免费问答机会</article>';
    },
    audioMessage: function (data) {
      console.log(data)
      return '<section class="main-message-box">' +
        '<article class="main-message-box-item others-message">' +
        '<figure class="main-message-img">' +
        '<img src="' + controller.targetData.avatar + '" alt="">' +
        '</figure>' +
        '<figcaption class="main-message-content audio-message">' +
        '<p> ' +
        '<audio class="voice-message">' +
        '<source src="' + data.mp3Url + '" type="audio/mpeg">' +
        '</audio>' +
        '<span>' +
        (function (time) {
          var result = "",
            fTime = Math.round(time / 1000);
          console.log(fTime)

          if (fTime < 10) {
            result = "0:0" + fTime;
          } else if (fTime >= 10 && fTime < 60) {
            result = "0:" + fTime;
          } else {
            result = "1:00";
          }
          return result;
        }(data.dur)) +
        '</span>' +
        '</p>' +
        '</figcaption>' +
        '</article>' +
        '</section>';
    },
    payFinishTips: function () {
      return "<p class='time-stamp'>以上为历史纪录</p>"
    },

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
