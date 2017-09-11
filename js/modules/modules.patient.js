/**
 * @Desc：
 * @Usage:
 * @Notify：obj.type类型--1.制约手术，2.亲友管理
 * @Depend：
 *
 * Created by qiangkailiang & wangjingrong on 2017/2/28
 */

modules.patient = function (obj) {
    var container = {
        init: function (obj) {
            obj.type == 1 && Q.go("first");
            this.relationList();//初始化患者关系
            this.setBrowseCount();
            this.getPatientsList();
            this.deletePatient();
            localStorage.removeItem("mHasSend");
            localStorage.removeItem("oHasSend");
            localStorage.removeItem("triageAssign");
            localStorage.removeItem("patientId");
            sessionStorage.removeItem("count");


            if (parseInt(common.getpara().customerId)===0){
                // common.alertBox({
                //     content: "非常抱歉，由于无法获取您的用户信息，请您取消关注后重新关注公众号。",
                //     ensure: "知道了"
                // })
            }else{
                localStorage.setItem("customerId", common.getpara().customerId);
            }
        },
        config: {
            listBox: $(".patient-list"),
            relationArr:["本人","配偶","子女","父亲","母亲","爷爷","奶奶","亲戚","朋友","邻居","其他"]
        },
        template: {
            patientItem: function (data) {
                return '<section class="patient-list-item" data-patientId="' + data.patientId + '" data-sex="' + data.patientSex + '" data-age="' + data.patientAge + '" data-rs="' + data.patientRelationId + '">' +
                    '<figcaption>' + data.patientName + '</figcaption>' +
                    '</section>';
            }
        },
        XHRList: {
            addPatient: "/mcall/customer/patient/relation/v1/create/",//增加患者
            deletePatient: "/mcall/customer/patient/relation/v1/update/",//修改和删除患者
            parientList: "/mcall/customer/patient/relation/v1/getMapList/",
            createCase: "/mcall/customer/patient/case/v1/create/",
            saveOperation: "/mcall/customer/patient/case/v1/createReservation/",//直约手术保存曾就诊信息
            caseList: "/mcall/customer/patient/case/v1/getCaseMapList/"
        },
        //初始化患者关系
        relationList:function () {
            var that = this;
                var hospitalData = [{
                    text: "本人",
                    value: "0"
                }, {
                    text: "配偶",
                    value: "1"
                }, {
                    text: "子女",
                    value: "2"
                }, {
                    text: "父亲",
                    value: "3"
                }, {
                    text: "母亲",
                    value: "4"
                }, {
                    text: "爷爷",
                    value: "5"
                }, {
                    text: "奶奶",
                    value: "6"
                }, {
                    text: "亲戚",
                    value: "7"
                }, {
                    text: "朋友",
                    value: "8"
                }, {
                    text: "邻居",
                    value: "9"
                }, {
                    text: "其他",
                    value: "10"
                }];
                var picker = new Picker({
                    data: [hospitalData]
                });
                $("#ev-relationship").on("click", function () {
                    picker.show();//点击时显示职称
                    // $(".select-hospital .select-icon-down").removeClass("select-icon-down").addClass("select-icon-up");
                });
                picker.on('picker.valuechange', function (e,selectedVal, selectedIndex) {//每次选择完职称触发相应职称的时间选择
                    // console.log(e);
                    // console.log(selectedVal);
                    // console.log(selectedIndex);
                    // var temp = ["本人","配偶","子女","父亲","母亲","爷爷","奶奶","亲戚","朋友","邻居","其他"];
                    // switch (selectedVal[0]){
                    //     case "0":
                    //         temp = "本人";
                    //         break;
                    // }
                    $("#ev-relationship").text(that.config.relationArr[selectedVal[0]]).attr("data-validate","true").attr("data-val",selectedVal[0]);
                    that.submitValidate();
                });
        },
        //    获取患者列表...
        getPatientsList: function (patientId) {
            var that = this;

            var param = {
                customerId: common.getpara().customerId,
                isValid: "1",
                firstResult: "0",
                maxResult: "9999"
            };
            $.ajax({
                url: that.XHRList.parientList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                data: {
                    paramJson: $.toJSON(param)
                },
                beforeSend: function () {
                    common.loading.show();
                }
            })
                .done(function (data) {
                    var dataList = data.responseObject.responseData.dataList;
                    //obj.type==2:亲友管理
                    if (obj && obj.type == 2) {
                        var noFriHtml = "";
                        if (dataList && dataList.length > 0) {
                            $('#ev-add-patient').show();
                            $('.add-patient-content-title').hide();
                            that.selectPatient();
                            that.config.listBox.html("").append('<section class="patient-list-item patient-list-item-plus"><figcaption></figcaption></section>');
                            $(dataList).each(function (index, element) {
                                that.config.listBox.prepend(that.template.patientItem(element));
                            });
                            if (patientId) {
                                $('.patient-list-item[data-patientId="' + patientId + '"]').trigger("click");
                            } else {
                                $('.patient-list-item').eq(0).trigger("click");
                            }
                        } else {
                            noFriHtml = '<section class="noFriendText">' +
                                '<p>您还没有任何记录</p>' +
                                '<p>添加关心的人，在线咨询预约，唯医为您开启全新的就医体验</p>' +
                                '</section>' +
                                '<section class="noFriendHref">' +
                                '<a href="//m.allinmed.cn/pages/patientConsult/add_patient.html?customerId=' + common.getpara().customerId + '">去咨询 &gt;</a>' +
                                '<a href="//m.allinmed.cn/pages/directOperation/direct_operation.html?customerId=' + common.getpara().customerId + '">直约手术 &gt;</a>' +
                                '</section>';
                            $("body").html(noFriHtml);
                        }
                    } else {// 第一次访问--未添加过用户--弹窗后提示添加用户

                        if (data.responseObject.responseMessage === "NO DATA") {
                            $(".patient-list-item-plus").hide();
                            that.selectPatient();
                            that.addPatient(0);
                            common.alertBox({
                                content: "嗨，我是小唯，请随我完善几个小问题以了解您的病情，回答的越仔细越有助于我们帮您更快康复哟",
                                ensure: "好的",
                                ensureCallback: function () {
                                    that.noPatientTips();
                                }
                            });

                            // 第N次访问--未添加过用户--提示添加用户
                        } else {
                            that.selectPatient();
                            $(dataList).each(function (index, element) {
                                that.config.listBox.prepend(that.template.patientItem(element));
                            })
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        //    记录用户访问次数---是否首次访问
        setBrowseCount: function () {
            var count = 0;
            if (!localStorage.getItem("browseCount")) {
                localStorage.setItem("browseCount", 1);
            } else {
                count = parseInt(localStorage.getItem("browseCount"));
                localStorage.setItem("browseCount", count + 1);
            }
        },
        //    无患者时提示
        noPatientTips: function () {
            common.topTips.show({
                class: "no-patient-tips",
                content: "您还未添加任何问诊人，请先添加"
            });
            setTimeout(function () {
                common.topTips.hide();
            }, 3000);
            $(".patient-list-item-plus").hide();
        },
        //    添加用户
        addPatient: function (hasPatient) {
            if (parseInt(hasPatient) === 1) {
                $("#ev-add-patient,#ev-add-patient-btn").show();
            } else {
                $("#ev-add-patient,#ev-no-patient-save").show();
            }
            this.formValidate();
            this.submitPatientMessage()
        },
        //    直约手术$(".patient-list-item")点击事件
        directOperaBtn: function () {
            var that = this;
            $('.patient-list').on('click', '.patient-list-item', function () {
                $(this).addClass("on").siblings().removeClass("on");
                if ($(this).hasClass("patient-list-item-plus")) {
                    that.addPatient(1);
                    $('#disease-info-next').hide();
                    $('.disease-info').hide();
                } else {

                    $("#ev-add-patient,#ev-add-patient-btn,#ev-no-patient-save").hide();
                    $('#disease-info-next').show();
                    $('.disease-info').show();
                }
            })
        },
        //    亲友管理$(".patient-list-item")点击事件
        friManage: function () {
            var that = this;
            $('.patient-list').on('click', '.patient-list-item', function () {
                $(this).addClass("on").siblings().removeClass("on");

                var friName = $(this).children("figcaption").text(),
                    friAge = $(this).attr("data-age"),
                    friSex = $(this).attr("data-sex"),
                    friRel = $(this).attr("data-rs");
                $("#ev-patient-name").val(friName).attr("data-validate", "true");//亲友姓名
                $("#ev-patient-age").val(friAge).attr("data-validate", "true");//亲友年龄
                $("#ev-relationship").text((that.config.relationArr[friRel] || "")).attr("data-validate", "true");//亲友关系
                if (friSex == 1 || !friSex) {//亲友性别
                    $(".add-patient-sex-selector").eq(0).addClass("on").siblings().removeClass("on")
                } else {
                    $(".add-patient-sex-selector").eq(1).addClass("on").siblings().removeClass("on")
                }
                if ($(this).hasClass("patient-list-item-plus")) {
                    $(".add-patient-content-title").show();
                    $("#ev-patient-name").removeAttr("readonly", "readonly");
                    $("#ev-add-patient-btn").show().siblings("#ev-delete-patient-btn").hide();
                    $(".validateTrue").attr("data-validate", "false");
                } else {
                    $(".add-patient-content-title").hide();
                    $("#ev-patient-name").attr("readonly", "readonly");
                    $("#ev-delete-patient-btn").show().siblings("#ev-add-patient-btn").hide();
                }
                that.addPatient();
            })
        },
        //    预约咨询$(".patient-list-item")点击事件
        ordeRefer: function () {
            var that = this;
            $(".patient-list").on("click", ".patient-list-item", function () {
                var t = this;
                var id=$(this).attr("data-patientid");
                $(this).addClass("on").siblings().removeClass("on");
                if ($(this).hasClass("patient-list-item-plus")) {
                    that.addPatient(1);
                } else {
                    $("#ev-add-patient,#ev-add-patient-btn").hide();

                    $.ajax({
                        url: that.XHRList.caseList,
                        type: 'POST',
                        dataType: 'json',
                        timeout: 10000,
                        beforeSend: function () {
                            common.loading.show();
                        },
                        data: {
                            paramJson: $.toJSON({
                                patientId: $(this).attr("data-patientid"),
                                caseType: 0
                            })
                        },
                    })
                        .done(function (data) {
                            console.log(data)
                            if (data.responseObject.responseData) {
                                var dataList = data.responseObject.responseData.dataList;
                                if (dataList && dataList.length !== 0) {
                                    common.btnBox({
                                        direction: "horizontal",
                                        btn: [{
                                            className: "btn-hollow",
                                            content: "新问诊",
                                            href: "select_parts.html?age=" + $(t).attr("data-age") + "&sex=" + $(t).attr("data-sex") + "&patientId=" + $(t).attr("data-patientid") + "&customerId=" + common.getpara().customerId,
                                        }, {
                                            className: "btn-hollow",
                                            content: "复诊",
                                            href: "//m.allinmed.cn/pages/patientConsult/case_list.html?customerId=" + common.getpara().customerId + "&patientId=" + $(t).attr("data-patientid")
                                        }]
                                    })
                                } else {
                                    window.location.href = "select_parts.html?age=" + $(t).attr("data-age") + "&sex=" + $(t).attr("data-sex") + "&patientId=" + $(t).attr("data-patientid") + "&customerId=" + common.getpara().customerId;
                                }
                            }
                            localStorage.setItem("patientId",id)
                            common.loading.hide();
                        })
                }
            })
        },
        //    选择用户
        selectPatient: function () {
            var that = this;

            //添加判断obj.type的类型，执行哪套流程。1--直约手术  预约咨询待定
            switch (obj.type) {
                case 1:
                    that.operationRooter();//直约手术的路由，控制返回
                    that.directOperaBtn();//患者列表事件
                    that.operationNext();//下一步点击
                    that.operationSearch();//搜寻事件等
                    modules.upLoadFiles({
                        backFunction: function () {
                            document.title = "直约手术";
                            $(".sticky-wrapper").show();
                            if ($(".patient-list-item.on").length > 0) {
                                $("#disease-info-next").show();
                            }
                            $(".search-box").remove();
                            // $(".tc-upLoadFile").hide();
                            // $(".he-upLoadGuide").hide();
                            $(".ev-fileUpHide").show();
                            $(".searchTypeSelect").html("");
                        },
                        route: "first",
                        imageType: '1',     // 上传资料类型
                        upLoadType: '2', //方法调用类型 （1-历史健康、2-直约手术、3-问诊单）
                        fileCallBack: function (picList) {
                            //回调函数返回文件主键PK串
                            that.config.picList = picList;
                            if (picList.length) {
                                $(".disease-info-item .ev-upLoadBtn").html("已上传");
                            } else {
                                $(".disease-info-item .ev-upLoadBtn").html("未上传");
                            }
                            $(".disease-info-item .ev-upLoadBtn").addClass("selected");
                        }
                    });//上传资料
                    that.inlineConsult();//在线咨询的点击事件
                    break;
                case 2:
                    that.friManage();
                    break;
                default:
                    that.ordeRefer();
            }
        },
        //    删除亲友
        deletePatient: function () {
            var that = this;
            $(".add-patient-submit").on('click', '.delete', function () {
                common.confirmBox({
                    title: "确定要删除吗？",
                    content: "相关问诊及预约记录仍会保留哦",
                    cancel: "确认",
                    ensure: "取消",
                    textCenter: "center",
                    cancelCallback: function () {
                        var patientMession = $(".patient-list .on");
                        var param = {
                            customerId: common.getpara().customerId,
                            //patientName:patientMession.children("figcaption").text(),
                            //patientAge:patientMession.attr("data-age"),
                            //patientSex:patientMession.attr("data-sex"),
                            isValid: 0,
                            patientId: patientMession.attr("data-patientId")
                        }
                        $.ajax({
                            url: that.XHRList.deletePatient,
                            timeout: 5000,
                            data: {
                                paramJson: $.toJSON(param)
                            },
                            dataType: "json",
                            success: function () {
                                common.popup({
                                    text: "删除成功"
                                });
                                patientMession.remove();
                                $(".patient-list .patient-list-item-plus").trigger("click");
                            },
                            error: function () {
                            }
                        })
                    },
                    ensureCallback: function () {

                    }
                });
            })
        },
        //    表单验证
        formValidate: function () {
            var that = this;
            var eleList = ["", "", ""];
            if ($('.validateTrue').length > 0) {
                $('.validateTrue').each(function (i) {
                    eleList[i] = $(this).attr("data-validate");
                })
                that.submitValidate();
            }
            $(".add-patient-sex-selector").on("click", function () {
                $(this).addClass("on").siblings().removeClass("on");
            });

            $("#ev-patient-name").on("blur", function () {
                $(this).validate({
                    errorEle: function (msg) {
                        common.popup({
                            text: msg
                        })
                    },
                    rules: [{
                        rule: "isNoEmpty",
                        msg: "请填写真实姓名"
                    }, {
                        rule: "maxLength:20",
                        msg: "请填写真实姓名"
                    }, {
                        rule: "special",
                        msg: "请填写真实姓名"
                    }, {
                        rule: "noNumber",
                        msg: "请填写真实姓名"
                    }, {
                        rule: "isEmoji",
                        msg: "请填写真实姓名"
                    }]
                });
                eleList[0] = $(this).attr("data-validate");
                that.submitValidate()
            });

            $("#ev-patient-age").on("blur", function () {
                $(this).validate({
                    errorEle: function (msg) {
                        common.popup({
                            text: msg
                        })
                    },
                    rules: [{
                        rule: "isNoEmpty",
                        msg: "请填写真实年龄"
                    }, {
                        rule: "maxNumber:150",
                        msg: "请填写真实年龄"
                    }, {
                        rule: "minNumber:0",
                        msg: "请填写真实年龄"
                    }, {
                        rule: "special",
                        msg: "请填写真实年龄"
                    }]
                });
                eleList[1] = $(this).attr("data-validate");
                that.submitValidate()
            });


            // $("#ev-relationship").on("change", function () {
            //     if (parseInt($(this).val()) !== "" && parseInt($(this).val()) >= 0) {
            //         $(this).attr("data-validate", true);
            //     } else {
            //         $(this).attr("data-validate", false);
            //     }
            //     eleList[2] = $(this).attr("data-validate");
            //     submitValidate()
            // });

            // function submitValidate() {
            //     var result;
            //     console.log(eleList)
            //     $(eleList).each(function (index, element) {
            //         if (element === "true") {
            //             result = "true";
            //         } else {
            //             result = "false";
            //             return false;
            //         }
            //     });
            //
            //     result === "true" ? $(".add-patient-submit").removeClass('off') : $(".add-patient-submit").addClass('off')
            //
            // }
        },
        //患者管理填写信息验证按钮是否置灰
        submitValidate:function () {
            if ($('.validateTrue').length == $('.validateTrue[data-validate="true"]').length) {
                $(".add-patient-submit").removeClass('off')
            } else {
                $(".add-patient-submit").addClass('off')
            }
        },
        //    提交患者信息
        submitPatientMessage: function () {
            var that = this;
            $("#ev-add-patient-btn").on("click",".cancel", function () {
                $("#ev-add-patient,#ev-add-patient-btn").hide();
                $('.patient-list-item-plus').removeClass("on");
                $("#ev-add-patient-btn").addClass("off");

                $("#ev-patient-name").val("");
                $("#ev-patient-age").val("");
                $("#ev-relationship").text("");
                $(".add-patient-sex-selector[data-sex='1']").addClass("on").siblings().removeClass("on");
            });
            $(".save").off("click").on("click", function () {
                var t = this;
                var param = {
                    customerId: common.getpara().customerId,
                    patientName: $("#ev-patient-name").val(),
                    patientAge: $("#ev-patient-age").val(),
                    patientSex: $("#ev-patient-sex .on").attr("data-sex"),
                    patientRelationId: $("#ev-relationship").attr("data-val")
                };
                if ($(this).parent().hasClass("off")) {
                    return false;
                } else {
                    $.ajax({
                        url: that.XHRList.addPatient,
                        type: 'POST',
                        dataType: "json",
                        timeout: 10000,
                        data: {paramJson: $.toJSON(param)},
                        beforeSend: function () {
                            common.loading.show();
                        }
                    })
                        .done(function (data) {
                            common.loading.hide();
                            //var dataList = data.responseData.dataList;
                            //$(".patient-list").append(that.template.patientItem(dataList));
                            $("patient-list-item-plus").show();
                            $("#ev-add-patient-btn").hide();
                            $("#ev-add-patient").hide();
                            $("#ev-no-patient-save").hide();

                            //添加保存后把新增患者信息添加到患者列表
                            $.extend(param, {
                                patientId: data.responseObject.responsePk
                            });
                            that.config.listBox.prepend(that.template.patientItem(param));

                            $(".patient-list-item-plus").removeClass("on");

                            $("#ev-patient-name").val("");
                            $("#ev-patient-age").val("");
                            $("#ev-patient-sex [data-sex='1']").addClass("on").siblings(".add-patient-sex-selector").removeClass("on");
                            $("#ev-relationship").text("");

                            $(".patient-list-item-plus").show();

                            if (obj.type == 1) {
                                $(".patient-list-item").eq(0).click();
                            } else {
                                window.location = "select_parts.html?age=" + param.patientAge + "&sex=" + param.patientSex + "&patientId=" + param.patientId + "&customerId=" + common.getpara().customerId;
                            }

                        })
                        .fail(function () {

                        });
                }

            });
            $(".revamp").off("click").on("click", function () {
                var t = this;
                if ($(".patient-list .on").hasClass("patient-list-item-plus")) {
                    var param = {
                        customerId: common.getpara().customerId,
                        patientName: $("#ev-patient-name").val(),
                        patientAge: $("#ev-patient-age").val(),
                        patientSex: $("#ev-patient-sex .on").attr("data-sex"),
                        patientRelationId: $("#ev-relationship").attr("data-val")
                    };
                    if ($(this).parent().hasClass("off")) {
                        return false;
                    } else {
                        $.ajax({
                            url: that.XHRList.addPatient,
                            type: 'POST',
                            dataType: "json",
                            timeout: 10000,
                            data: {paramJson: $.toJSON(param)},
                            beforeSend: function () {
                                common.loading.show();
                            }
                        })
                            .done(function (data) {
                                common.loading.hide();
                                //添加保存后把新增患者信息添加到患者列表
                                $.extend(param, {
                                    patientId: data.responseObject.responsePk
                                });
                                that.config.listBox.prepend(that.template.patientItem(param));
                                $(".patient-list-item").eq(0).click();
                                //if ($(t).parent().attr("id") === "ev-no-patient-save") {
                                //    window.location = "select_parts.html?age=" + param.patientAge + "&sex=" + param.patientSex + "&patientId=" + param.patientId;
                                //}
                            })
                    }
                } else {
                    var param = {
                        patientId: $(".patient-list .on").attr("data-patientid"),
                        patientAge: $("#ev-patient-age").val(),
                        patientSex: $("#ev-patient-sex .on").attr("data-sex"),
                        patientRelationId: $("#ev-relationship").attr("data-val")
                    };
                    if ($(this).parent().hasClass("off")) {
                        return false;
                    } else {
                        var onlyId = $(".patient-list .on").attr("data-patientid")
                        $.ajax({
                            url: that.XHRList.deletePatient,
                            timeout: 5000,
                            data: {
                                paramJson: $.toJSON(param)
                            },
                            dataType: "json",
                            beforeSend: function () {
                                common.loading.show();
                            }
                        })
                            .done(function (data) {
                                common.loading.hide();
                                that.getPatientsList(onlyId);
                            })
                    }
                }
            });

        },

        //直约手术中在线咨询的点击事件
        inlineConsult: function () {
            $("#go-consult").on("click", function () {
                var current = $(".patient-list .patient-list-item.on");
                window.location.href = "http://m.allinmed.cn/pages/patientConsult/select_parts.html?age=" + current.attr("data-age") + "&sex=" + current.attr("data-sex") + "&patientId=" + current.attr("data-patientid") + "&customerId=" + common.getpara().customerId;
            })
        },

        //    直约手术中提交按钮的事件,提交时先创建一个病例，再保存用户曾就诊信息
        operationNext: function () {
            var that = this;
            $('#disease-info-next').on('click', '.next', function () {
                var current = $(".patient-list .patient-list-item.on");//选中的当前的患者
                //加一个表单验证，判断用户是否填写了资料，填写则直接下一步，否则，提示用户
                //获取用户上传的资料
                if ($('.disease-info-item .disease-info-item-right.selected').length == 3) {
                    that.saveCase();//直接保存
                } else {
                    common.confirmBox({
                        title: "完善的就诊信息会得到更精准的帮助哦",
                        content: "",
                        cancel: "暂不填写",
                        ensure: "去填写",
                        cancelCallback: function () {
                            that.saveCase();//用户确定暂不填写，然后保存
                        },
                        ensureCallback: function () {

                        }
                    });
                }

            })
        },
        //直约手术中的下一步的保存函数
        saveCase: function () {
            var that = this;
            var patientInfo = {};//保存患者的一些信息，通过传参给下一个页面
            var data = {};//创建病例用的参数
            data.patientId = $('.patient-list-item.on').data('patientid');
            patientInfo.patientId = $('.patient-list-item.on').data('patientid');
            data.visitSiteId = "17";
            data.caseType = "2";
            data.customerId = common.getpara().customerId;

            data.treatmentHospitalId = $(".disease-info-item .hospital").data("id") == undefined ? "" : $(".disease-info-item .hospital").attr("data-id");
            data.treatmentHospital = $(".disease-info-item .hospital").data("name") || "";
            data.illnessHistoryId = $(".disease-info-item .disease").data("id") == undefined ? "" : $(".disease-info-item .disease").attr("data-id");
            data.illnessHistory = $(".disease-info-item .disease").data("name") || "";
            data.caseAttIdList = that.config.picList || "";
            var dataParams = {paramJson: $.toJSON(data)};
            $.ajax({
                url: that.XHRList.saveOperation,
                type: 'POST',
                dataType: "json",
                data: dataParams,
                beforeSend: function () {
                    common.loading.show();
                },
                success: function (rep) {
                    // console.log(rep);
                    common.loading.hide();
                    if (rep.responseObject.responseStatus) {
                        patientInfo.caseId = rep.responseObject.responsePk;
                        window.location.href = "http://m.allinmed.cn/pages/directOperation/scheduled_operation.html?caseId=" + patientInfo.caseId + "&patientId=" + patientInfo.patientId+ "&customerId=" + common.getpara().customerId;
                    }
                    // var params = {paramJson:$.toJSON(parameter)};
                    // $.ajax({
                    //     url: that.XHRList.saveOperation,
                    //     type: 'POST',
                    //     dataType: "json",
                    //     data: params,
                    //     success: function (data) {
                    //         if (data && data.responseObject.responseStatus) {
                    //         }
                    //     },
                    //     fail :function (data) {
                    //
                    //     }
                    // });
                },
                fail: function (data) {
                    common.loading.hide();
                }
            });
        },

        //直约手术的路由
        operationRooter: function () {
            $("#ev-add-patient").hide();
            $("#ev-add-patient-btn").hide();
            Q.reg('first', function () {
                console.log('进入了首页');
                // $(".sticky-wrapper").show();
                // if ($(".patient-list-item.on").length > 0) {
                //     $("#disease-info-next").show();
                // }
                // $(".search-box").remove();
                // // $(".tc-upLoadFile").hide();
                // // $(".he-upLoadGuide").hide();
                // $(".ev-fileUpHide").show();
                // $(".searchTypeSelect").html("");
            });
            Q.reg("hospital", function () {
                document.title = "选择医院";
                $(".ev-fileUpHide").hide();
                $("#disease-info-next").hide();
                modules.searchList({
                    targetEle: $(".disease-info-item-right.hospital"),
                    type: "hospital",
                    back: "first",
                    backCallback: function () {
                        $(".disease-info-item-right.hospital").addClass('selected');
                        $(".sticky-wrapper").show();
                        $("#disease-info-next").show();
                    }
                })
            });
            Q.reg("disease", function () {
                document.title = "选择疾病";
                $(".ev-fileUpHide").hide();
                $("#disease-info-next").hide();
                modules.searchList({
                    targetEle: $(".disease-info-item-right.disease"),
                    type: "disease",
                    back: "first",
                    backCallback: function () {
                        $(".disease-info-item-right.disease").addClass('selected');
                        $(".sticky-wrapper").show();
                        $("#disease-info-next").show();
                    }
                })
            });
            Q.init({
                index: 'first'/* 首页地址 */
            });
            // Q.go("first");
        },

        //直约手术中的搜索的事件
        operationSearch: function () {
            //搜寻医院
            $('.disease-info-item-right.hospital').on('click', function () {
                Q.go("hospital");
            });
            //搜寻疾病
            $(".disease-info-item-right.disease").on('click', function () {
                Q.go("disease");

            });
            //上传资料

        }
    };
    container.init(obj);
};
