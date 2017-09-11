/**
 * @name:
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/04/06
 * @author: lichenyang
 */

$(function () {
    var controller = {
        config:{
            isCreate:1 ,//用于判断保存接口用哪个 1-创建；0-更新
            patientId:"" //用来保存患者id后面使用
        },
        path:{
            getPatientList:"/mcall/customer/patient/relation/v1/getMapList/",//获取患者列表
            sendValidate: "/mcall/customer/send/code/v1/create/",//获取验证码
            validateCodeValidate:"/mcall/customer/send/code/v1/update/",//验证码的验证
            baseInfo:'/mcall/customer/patient/baseinfo/v1/getMapList/',//获取患者信息
            createInfo:"/mcall/customer/patient/relation/v1/create/",//创建患者信息
            updateInfo: '/mcall/customer/patient/baseinfo/v1/update/'//更新患者信息
        },
        template:{
            patientItem:function (data) {
                return '<li class="patient-item" data-patientId="' + data.patientId + '" data-sex="' + data.patientSex + '" data-age="' + data.patientAge + '" data-rs="' + data.patientRelationId + '">' +
                    data.patientName +
                    '</li>';
            }
        },
        init:function () {
            window.onload = Log.createBrowse(1, '患者信息');
            var _sesCustomerId = common.getpara().customerId;//会员id
            if($('#sesCustomerId').length>0){
                $('#sesCustomerId').attr("value",_sesCustomerId);
            }else{
                $('body').append('<input type="hidden" id="sesCustomerId" value="'+_sesCustomerId+'">');
            }
            this.routerControl();//页面路由控制
            this.pagesInit();//页面初始化
            this.eventFun();//页面的事件函数
            this.inputVerify();//输入框验证
        },
        //页面路由控制
        routerControl:function () {
            var that = this;
            //进入主页
            Q.reg('info', function () {
                console.log("进入主页...");
                $(".patient-info-box").show();
                $(".patient-list-box").hide();
                $(".he-main").show();
                $(".search-box").remove();
                $(".searchTypeSelect").html("");
            });
            Q.reg("patient", function () {
                $(".patient-info-box").hide();
                $(".patient-list-box").show();
            });
            //患者所在地
            Q.reg('city', function () {
                modules.searchList({
                    targetEle: $("#goToCity"),
                    type: "city",
                    level:"2",
                    finalLevel:"4",
                    // back:that.config.infoView,
                    noResultCallback:function () {

                    },
                    backCallback:function(){
                        $("#goToCity").addClass("show").closest('.info-item').addClass('required');
                        that.nextBtnCheck();
                        Q.go("info");
                    }
                })
            });
            //初始化路由

        },
        //页面初始化
        pagesInit:function () {
            var that = this;
            var param = {
                customerId: common.getpara().customerId,
                isValid: "1",
                firstResult: "0",
                maxResult: "9999"
            };
            $.ajax({
                url: that.path.getPatientList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                data: {
                    paramJson: $.toJSON(param)
                },
                beforeSend: function () {
                    common.loading.show();
                }
            }).done(function (data) {
                var dataList = data.responseObject.responseData.dataList;
                common.loading.hide();
                if (data && data.responseObject.responseStatus) {
                    // $(".patient-list").prepend(patientItemHtml);
                    // Q.go('info');
                    if ( data.responseObject.responseMessage != "NO DATA" ) {
                        Q.init({
                            index: 'patient'/* 首页地址 */
                        });
                        // Q.go("patient");
                        // var patientItemHtml = "";
                        $.each(dataList,function (index,element) {
                            // patientItemHtml += that.template.patientItem(element);
                            $(".patient-list").prepend(that.template.patientItem(element));
                        });
                    } else {
                        Q.init({
                            index: 'info'/* 首页地址 */
                        });
                    }
                }
            }).fail(function () {
                common.loading.hide();
                common.popup({
                    text:"获取患者列表失败"
                })
            })
        },
        //页面的事件函数
        eventFun:function () {
            var that = this;
            //患者性别的点击切换
            $(".sex-option").on("click",function () {
                $(".sex-option").removeClass("selected");
                $(this).addClass("selected");
                $(this).closest(".info-item").hasClass("required") || $(this).closest(".info-item").addClass("required");
            });
            //选择已添加患者事件
            $(".select-patient").on("click",function () {
                Q.go('patient');
            });
            //点击患者列表的事件
            $(".patient-list").on("click",".patient-item",function () {
                console.log("点击了患者");
                if ($(this).hasClass("add")){
                    that.emptyBaseInfo();//点击添加按钮清空填写信息
                } else {
                    that.patientBaseInfo($(this));//填充患者的信息
                }
                $(".send-validate-code").text("获取验证码").removeClass("disabled").removeClass("send");
                clearInterval(that.config.time);
                Q.go('info');
            });
            //患者所在地
            $("#goToCity").on("click",function () {
                Q.go('city');
            });
            //获取验证码事件
            $(".send-validate-code").on("click",function () {
                if ($(this).hasClass("disabled")) {
                    return false;
                } else {
                    that.sendValidateCode();//获取验证码函数
                }
            });
            //下一步按钮提交信息
            $("#nextSubmit").on("click",function () {
                that.nextBtnFun();//点击下一步按钮执行的函数
            });
        },
        //点击添加按钮清空填写信息
        emptyBaseInfo:function () {
            var that= this;
            that.config.isCreate=1;//用于判断保存信息接口
            that.config.patientId = 0;
            $("[data-type='name'] input").val("").removeAttr("data-patientId").closest('.info-item').removeClass('required');
            $("[data-type='age'] input").val("").closest('.info-item').removeClass('required');
            $(".sex-option").removeClass("selected").closest('.info-item').removeClass('required');
            $("[data-type='telephone'] input").val("").closest('.info-item').removeClass('required');
            $("#goToCity").text("请选择地区").removeClass("show").closest('.info-item').removeClass('required');
        },
        //获取患者信息并且展示
        patientBaseInfo:function (ele) {
            var that = this;
            that.config.isCreate=0;//用于判断保存信息接口
            var data={
                patientId:ele.attr("data-patientId"),  //string	是	患者id
                firstResult:"0",	        //string	是	分页参数
                maxResult:"1"	            //string	是	分页参数
            };
            $.ajax({
                url: that.path.baseInfo,
                type: 'POST',
                dataType: 'json',
                timeout: 10000,
                data: {
                    paramJson: $.toJSON(data)
                },
                beforeSend: function () {
                    common.loading.show()
                }
            }).done(function (data) {
                common.loading.hide();
                if (data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList) {
                    var _dataList = data.responseObject.responseData.dataList[0];
                    console.log(_dataList);

                    var patientName=_dataList.patientName,             //患者名称
                        patientId=_dataList.patientId,                 //患者ID
                        age=_dataList.patientAge,                      //患者年龄
                        sex=_dataList.patientSex,                      //患者性别
                        mobile=_dataList.mobile,                       //手机号码
                        province=_dataList.province,                   //所在地省
                        provinceId=_dataList.provinceId,               //所在地省ID
                        city=_dataList.city,                           //所在地市
                        cityId=_dataList.cityId,                       //所在地市ID
                        district=_dataList.district,                   //所在地区/县
                        districtId=_dataList.districtId;               //所在地区/县ID
                    that.config.patientId = patientId || "";
                    if (patientName) {
                        $("[data-type='name'] input").val(patientName).attr("data-patientId",patientId).closest('.info-item').addClass('required');
                    } else {
                        $("[data-type='name'] input").val("").attr("data-patientId",patientId).closest('.info-item').removeClass('required');
                    }
                    if (age) {
                        $("[data-type='age'] input").val(age).closest('.info-item').addClass('required');
                    } else {
                        $("[data-type='age'] input").val("").closest('.info-item').removeClass('required');
                    }
                    if (sex) {
                        $(".sex-option").removeClass("selected")
                        $(".sex-option[data-sex='"+ sex +"']").addClass("selected").closest('.info-item').addClass('required');
                    } else {
                        $(".sex-option").removeClass("selected").closest('.info-item').removeClass('required');
                    }
                    if (mobile) {
                        $("[data-type='telephone'] input").val(mobile).closest('.info-item').addClass('required');
                    } else {
                        $("[data-type='telephone'] input").val("").closest('.info-item').removeClass('required');
                    }
                    if(province){
                        $("#goToCity").text(province+" "+city+" "+district).attr({
                            "data-provinceId":provinceId,"data-cityId":cityId,"data-districtId":districtId,
                            "data-province":province,"data-city":city,"data-district":district
                        }).addClass("show").closest('.info-item').addClass('required');
                    } else {
                        $("#goToCity").text("请选择地区").removeClass("show").closest('.info-item').removeClass('required');
                    }
                  that.nextBtnCheck();
                } else {
                    $("[data-type='name'] input").val("").attr("data-patientId",patientId).closest('.info-item').removeClass('required');
                    $("[data-type='age'] input").val("").closest('.info-item').removeClass('required');
                    $(".sex-option").removeClass("selected").closest('.info-item').removeClass('required');
                    $("[data-type='telephone'] input").val("").closest('.info-item').removeClass('required');
                    $("#goToCity").text("请选择地区").removeClass("show").closest('.info-item').removeClass('required');
                }
            }).fail(function (data) {
                common.loading.hide();
            })
        },
        //获取验证码函数
        sendValidateCode: function () {
            var that = this;
            //获取验证码之前的验证；
            if ($(".info-item-right[data-type = 'telephone']").closest(".info-item").hasClass("required")) {
                var data = {};//获取验证码的参数
                data.account = $("#validateTelephone").val();
                data.typeId = "4";
                data.codeLength = "4";
                data.accountType = "0";//0-手机 1-邮箱
                $.ajax({
                    url: that.path.sendValidate,
                    type: 'POST',
                    dataType: 'json',
                    timeout: 10000,
                    data: {
                        paramJson: $.toJSON(data)
                    }
                }).done(function (data) {
                    console.log(data);
                    if (data.responseObject.responseStatus) {
                        $("#validateCode").attr("data-id",data.responseObject.responsePk);
                        var i = 60;
                        $(".send-validate-code").removeClass("send").addClass("disabled").text(i + "S后重新获取");
                        that.config.time = setInterval(function () {
                            i--;
                            $(".send-validate-code").text(i + "S后重新获取");
                            if (i === 0) {
                                clearInterval(that.config.time);
                                $(".send-validate-code").text("重新获取").removeClass("disabled").addClass("send");
                                i = 60;
                            }
                        }, 1000);
                    } else if (data.responseObject.responseCode == "SMS0003"){
                        $(".send-validate-code").text("重新获取").addClass("send");
                        common.popup({
                            text:"24小时最多获取三次"
                        })
                    }
                })
            } else {
                common.popup({
                    text:"需输入正确格式手机号"
                })
            }
        },
        //输入框验证
        inputVerify:function () {
            var that = this;
            $(".info-item-right input").on("blur",function () {
                var dataType = $(this).closest(".info-item-right").data("type");
                var value = $(this).val();
                switch (dataType){
                    case "name":
                        if(value.length>0){
                            $(this).validate({
                                errorEle: function(msg){
                                    common.popup({
                                        text:msg
                                    })
                                },
                                rules: [{
                                    rule: "maxLength:5",
                                    msg: "请填写正确姓名"
                                }, {
                                    rule: "normalString",
                                    msg: "请填写正确姓名"
                                },{
                                    rule: "nameSpace",
                                    msg: "请填写正确姓名"
                                },{
                                    rule: "noNumber",
                                    msg: "请填写正确姓名"
                                }]
                            });
                            if($(this).attr('data-validate')=="true"){
                                $(this).closest('.info-item').addClass('required');
                            }else{
                                $(this).closest('.info-item').removeClass('required');
                            }
                        }else {
                            $(this).closest('.info-item').removeClass('required');
                        }
                        break;
                    case "age":
                        if(value.length>0){
                            $(this).validate({
                                errorEle: function(msg){
                                    common.popup({
                                        text:msg
                                    })
                                },
                                rules: [{
                                    rule: "maxNumber:150",
                                    msg: "请填写正确年龄"
                                }, {
                                    rule: "minNumber:0",
                                    msg: "请填写正确年龄"
                                }]
                            });
                            if($(this).attr('data-validate')=="true"){
                                $(this).closest('.info-item').addClass('required');
                            }else{
                                $(this).closest('.info-item').removeClass('required');
                            }
                        }else {
                            $(this).closest('.info-item').removeClass('required');
                        }
                        break;
                    case "telephone":
                        if(value.length>0){
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
                                $(this).closest('.info-item').addClass('required');
                            }else{
                                $(this).closest('.info-item').removeClass('required');
                            }
                        }else {
                            $(this).closest('.info-item').removeClass('required');
                        }
                        break;
                    case "code":
                        if(value.length>0){
                            $(this).validate({
                                errorEle: function(msg){
                                    common.popup({
                                        text:msg
                                    })
                                },
                                rules: [{
                                    rule: "valueLength:4",
                                    msg: "请输入四位验证码"
                                }]
                            });
                            if($(this).attr('data-validate')=="true"){
                                $(this).closest('.info-item').addClass('required');
                            }else{
                                $(this).closest('.info-item').removeClass('required');
                            }
                        }else {
                            $(this).closest('.info-item').removeClass('required');
                        }
                        break;
                }
                that.nextBtnCheck();
            })
        },
        //检查下一步按钮是否可以置灰
        nextBtnCheck:function () {
            var questionLength = $(".info-item").length;
            var requireLength = $(".info-item.required").length;
            if (questionLength == requireLength){
                $("#nextSubmit").removeClass("disabled");
            } else {
                $("#nextSubmit").addClass("disabled");
            }
        },
        //点击下一步按钮执行的函数
        nextBtnFun:function () {
            var that = this;
            if ($("#nextSubmit").hasClass("disabled")) {
                // that.saveInfo();
                return false;
            } else {
              that.saveInfo();

            }
                //初始版本的验证验证码步骤；现在注销掉
            //     var data = {};
            //     data.validCode = $("#validateCode").val();	//string	是	验证码CODE
            //     data.id = $("#validateCode").attr("data-id");	//string	是	验证码主键
            //     data.isValid = "1"; //修改验证码信息
            //     data.account = $("#validateTelephone").val();
            //     $.ajax({
            //         url: that.path.validateCodeValidate,
            //         type: 'POST',
            //         dataType: 'json',
            //         beforeSend: function () {
            //             common.loading.show();
            //             // $("#ev-validate-submit").text("提交中");
            //         },
            //         timeout: 10000,
            //         data: {
            //             paramJson: $.toJSON(data)
            //         }
            //     })
            //         .done(function (data) {
            //             console.log(data);
            //             // $("#ev-validate-submit").text("提交");
            //             common.loading.hide();
            //             if (data.responseObject.responseStatus){
            //                 if (data.responseObject.responseCode == 'success'){
            //                     that.saveInfo();
            //                 } else {
            //                     common.popup({
            //                         text:data.responseObject.responseMessage
            //                     });
            //                     return false;
            //                 }
            //             } else {
            //                 //验证失败的处理
            //                 common.popup({
            //                     text:"验证码验证失败！"
            //                 })
            //             }
            //         })
            //         .fail(function (data) {
            //             common.loading.hide();
            //         })
            // }
        },
        //验证码通过后的保存函数
        saveInfo:function () {
            var that = this;
            var dateArray = $("#goToCity").text().split(" ");
            var urlTemp = that.config.isCreate?that.path.createInfo:that.path.updateInfo;
            var data = {};
            data.customerId=common.getpara().customerId;
            data.patientName = $("[data-type='name'] input").val();
            data.patientId = $("[data-type='name'] input").attr("data-patientId") || "";
            data.patientAge = $("[data-type='age'] input").val();
            data.patientSex = $(".sex-option.selected").attr("data-sex");
            data.mobile = $("[data-type='telephone'] input").val();
            data.province=dateArray[0];
            data.provinceId = $("#goToCity").attr("data-provinceId");
            data.city=dateArray[1];
            data.cityId = $("#goToCity").attr("data-cityId");
            data.district=dateArray[2];
            data.districtId = $("#goToCity").attr("data-districtId");
            $.ajax({
                url: urlTemp,
                type: 'POST',
                dataType: 'json',
                beforeSend: function () {
                    common.loading.show();
                    // $("#ev-validate-submit").text("提交中");
                },
                timeout: 10000,
                data: {
                    paramJson: $.toJSON(data)
                }
            })
                .done(function (data) {
                    common.loading.hide()
                    console.log(data);
                    // $("#ev-validate-submit").text("提交");
                    // common.loading.hide();
                    if (data.responseObject.responseStatus){
                        window.location.href='/pages/patientReport/medical_info.html?patientId='+ (that.config.patientId || data.responseObject.responsePk) + "&doctorId=" + common.getpara().doctorId + "&customerId=" +common.getpara().customerId;
                        // var goUrl = '/pages/patientReport/medical_info.html?patientId='+ (that.config.patientId || data.responseObject.responsePk);
                        // window.open(goUrl);
                        // window.open(goUrl,'_self','');
                        // location.replace(goUrl);
                    } else {
                        //验证失败的处理
                        common.popup({
                            text:"保存信息失败！"
                        })
                    }
                }).fail(function (data) {
                common.loading.hide();
                common.popup({
                    text:"保存信息失败！"
                })
            })
        }
    };
    controller.init();
});
