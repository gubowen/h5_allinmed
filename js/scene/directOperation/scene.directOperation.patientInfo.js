/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 2017/04/26
 */
$(function () {
    var controller = {
        //初始化
        init:function () {
            this.routerControl();//页面路由操作
            this.getUrlParam();//得到url参数保存起来
            this.isOperation();//判断是否是直约手术进来的
            this.cardTypeLoad();//获取社保证件类型列表
            this.pageEvent();//页面事件函数
            this.selectVerify();//选择框select的事件及验证
            this.inputVerifyEvent();//输入框input的验证事件
        },
        //配置项
        config:{

        },
        //模板
        template:{
            //证件类型和社保类型选项
            cardTypeHtml: function (sv) {
                var _html = '';
                $.each(sv, function (i, val) {
                    _html += '<option value="'+val.certificateName+'" data-typeid="'+val.certificateId+'">'+val.certificateName+'</option>';
                });
                return _html;
            },
            //手术备注模板
            operationRemakHtml:function () {
                return '<section class="patientInfoOther">'+
                    '<section class="otherTop">'+
                    '<h3 class="otherTopTitle">备注</h3>'+
                    '</section>'+
                    '<section class="otherBottom">'+
                    '<textarea placeholder="请输入补充内容"></textarea>'+
                    '</section>'+
                    '</section>';
            },
            //其他底部模板
            healthBottomHtml:function () {
                return '<section class="patientInfoOther">'+
                    '<section class="otherTop">'+
                    '<h3 class="otherTopTitle">希望获得医生的什么帮助</h3>'+
                    '<ul class="helpList">'+
                    '<li class="helpItem on">治疗方法</li>'+
                    '<li class="helpItem">看片子</li>'+
                    '<li class="helpItem">开处方</li>'+
                    '<li class="helpItem">手术咨询</li>'+
                    '</ul>'+
                    '</section>'+
                    '<section class="otherBottom">'+
                    '<textarea placeholder="请输入补充内容"></textarea>'+
                    '</section>'+
                    '</section>';
            }
        },
        //接口
        path:{
            cardType:'/mcall/comm/data/social/security/v1/getTotalMapList/', //证件类型
            baseInfo:'/mcall/customer/patient/baseinfo/v1/getMapList/',      //个人信息
            submit: '/mcall/customer/patient/baseinfo/v1/create/',            //保存患者信息
            updateInfo:"/mcall/customer/patient/baseinfo/v1/update/"//更新患者信息
        },
        //页面路由操作
        routerControl:function () {
            var that = this;
            //进入首页
            Q.reg('patientInfo', function () {
                console.log("进入首页");
                $(".he-main").show();
                $(".search-box").remove();
                $(".searchTypeSelect").html("");
            });
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
                        $("#ev-go-to-select-city").val(_province+_city+_district).addClass("selected").closest('.patientInfoItemRight').addClass('hasSelect').closest(".patientInfoItem").addClass("active");
                        that.submitCheck();
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
                        $("#ev-go-to-select-perfect").val(_province+_city+_district).addClass("selected").closest('.patientInfoItemRight').addClass("hasSelect").closest(".patientInfoItem").addClass("active");
                        that.submitCheck();
                    }
                })
            });
            // Q.go("patientInfo");
            Q.init({
                index:"patientInfo"//首页地址
            })
        },
        //判断是否是直约手术进来的
        isOperation:function () {
            var that = this;
            if (parseInt(that.config.isOperation)) {
                $(".patientInfo").append(that.template.operationRemakHtml());
            } else {
                $(".patientInfo").append(that.template.healthBottomHtml());
                that.healthBottomEvent();
            }
        },
        //健康辅助信息进来的页面底部事件
        healthBottomEvent:function () {
            $(".helpList").on("click",".helpItem",function () {
                if ($(this).hasClass("on")) {
                    return
                } else{
                    $(".helpItem").removeClass("on");
                    $(this).addClass("on");
                }
            })
        },
        //页面事件函数
        pageEvent:function () {

            //患者所在地
            $("#ev-go-to-select-city").on("click", function () {
                Q.go('city', function (a) {});
            });
            //社保所在地
            $("#ev-go-to-select-perfect").on("click", function () {
                Q.go('perfectCity', function (a) {});
            })
        },
        //选择框select的事件及验证
        selectVerify:function () {
            var that =this;
            $('.patientInfoItemRight.hasSelect select').on('change',function () {
                var selectVal = $(this).val(),
                    _optionEle=$(this).find('option:selected').data('typeid'),
                    _elType=$(this).data('check');
                $(this).siblings('.show').text(selectVal).addClass('selected');
                $(this).closest('.patientInfoItem').addClass('active');
                switch (_elType){
                    case 1:
                        $('.patientInfoItem[data-type=3]').removeClass('active').find('input').val("");
                        switch (_optionEle){
                            case 1:
                                $(this).closest('.patientInfoItem').attr("data-typeid","1");
                                break;
                            case 2:
                                $(this).closest('.patientInfoItem').attr("data-typeid","2");
                                break;
                            case 3:

                                $(this).closest('.patientInfoItem').attr("data-typeid","5");
                                break;
                        }
                        break;
                    case 2:
                        $('.patientInfoItem[data-type=7]').removeClass('active').find('input').val("");
                        switch (_optionEle){
                            case 1:
                                $(this).closest('.patientInfoItem').attr("data-typeid","1");
                                break;
                            case 2:
                                $(this).closest('.patientInfoItem').attr("data-typeid","2");
                                break;
                            case 3:
                                $(this).closest('.patientInfoItem').attr("data-typeid","3");
                                break;
                            case 4:
                                $(this).closest('.patientInfoItem').attr("data-typeid","4");
                                break;
                            case 5:
                                $(this).closest('.patientInfoItem').attr("data-typeid","5");
                                break;
                        }
                        break;
                }
                that.submitCheck();
            });
        },
        //验证函数抽出来
        inputVerifyFun:function (current,popup) {
            var _quesType=$(current).closest('.patientInfoItem').data('type'),
                _cureName=$(current).val(),
                _text='',
                that = this;
            //表单验证
            switch (_quesType){
                case 1://姓名
                    if(_cureName.length>0){
                        console.log(_cureName.length);
                        $(current).validate({
                            errorEle: function(msg){
                                if (popup){
                                    common.popup({
                                        text:msg
                                    })
                                }
                            },
                            rules: [{
                                rule: "normalString",
                                msg: "请输入有效的姓名"
                            },{
                                rule: "isNoEmpty",
                                msg: "请填写真实姓名"
                            }, {
                                rule: "maxLength:10",
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
                        if($(current).attr('data-validate')=="true"){
                            $(current).closest('.patientInfoItem').addClass('active');
                        }else{
                            $(current).closest('.patientInfoItem').removeClass('active');
                        }
                    }else{
                        $(current).closest('.patientInfoItem').removeClass('active');
                    }
                    break;
                case 2://证件类型，在select验证
                    break;
                case 3:
                    _text="证件号不能为空";
                    var _cardType=$(current).closest('.patientInfoItem').prev().attr('data-typeid');
                    switch (_cardType){
                        case "1":
                            $(current).validate({
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
                            if($(current).attr('data-validate')=="true"){
                                $(current).closest('.patientInfoItem').addClass('active');
                            }else{
                                $(current).closest('.patientInfoItem').removeClass('active');
                            }
                            break;
                        case "2":
                            //军官证验证
                            if(_cureName.length>0){
                                $(current).closest('.patientInfoItem').addClass('active');
                            }else{
                                $(current).closest('.patientInfoItem').removeClass('active');
                            }
                            break;
                        case "3":
                            //护照验证
                            if(_cureName.length>0){
                                $(current).closest('.patientInfoItem').addClass('active');
                            }else{
                                $(current).closest('.patientInfoItem').removeClass('active');
                            }
                            break;
                    }
                    break;
                case 4://手机号
                    if(_cureName.length>0){
                        $(current).validate({
                            errorEle: function(msg){
                                if (popup){
                                    common.popup({
                                        text:msg
                                    })
                                }
                            },
                            rules: [{
                                rule: "isMobile",
                                msg: "手机号码输入有误"
                            }]
                        });
                        if($(current).attr('data-validate')=="true"){
                            $(current).closest('.patientInfoItem').addClass('active');
                        }else {
                            $(current).closest('.patientInfoItem').removeClass('active');
                        }
                    }else{
                        $(current).closest('.patientInfoItem').removeClass('active');
                    }
                    break;
                case 5://患者所在地区
                    if(_cureName.length>0){
                        $(current).closest('.patientInfoItem').addClass('active');
                    }else{
                        $(current).closest('.patientInfoItem').removeClass('active');
                    }
                    break;
            }
            that.submitCheck();
        },
        //输入框input的输入事件及验证
        inputVerifyEvent:function () {
            var that = this;
            $('.patientInfoList').find('input').on('input', function () {
                that.inputVerifyFun($(this));
            })
            $('.patientInfoList').find('input').on('compositionstart', function () {
                $(this).off("input");
            });
            $('.patientInfoList').find('input').on('compositionend', function () {
                that.inputVerifyFun($(this));
                $(this).on('input', function () {
                    that.inputVerifyFun($(this));
                })
            });
            $('.patientInfoList').find('input').on("blur",function () {
                that.inputVerifyFun($(this),"popup");
            })
        },
        //判断页面的必填项是否填写
        submitCheck:function(){
            var that=this,
                _requireActNum=$(".patientInfoItem.active[data-required=1]"),  //必选已填总数
                _requireNum=$(".patientInfoItem[data-required=1]");            //必选总数
            if(_requireActNum&&_requireNum&&_requireActNum.length==_requireNum.length){
                $('#saveInfoBtn').removeClass("disabled");
            }else{
                $('#saveInfoBtn').addClass("disabled");
            }
        },
        //得到url参数保存起来
        getUrlParam: function () {
            var that = this;
            var params = common.getparaNew();
            $.extend(that.config,params);
        },
        //获取社保证件类型列表
        cardTypeLoad:function(){
            var that = this;
            var _data={
                //patientId:"1441561678652",	     //string	是	患者id
                //isValid:"1",	    //string	是	是否有效1-有效0-无效
                firstResult:"0",	//string	是	分页参数
                maxResult:"9999"	//string	是	分页参数
            };
            that.callAjax({
                path: that.path.cardType,
                data:_data,
                callBack:function(data){
                    //处理返回数据
                    if(data&&data.responseObject&&data.responseObject.responseData){
                        var _dataList=data.responseObject.responseData.dataList[0],
                            _social=_dataList.social,
                            _role=_dataList.role;
                        $('.patientInfoItem').find('.cardTypeBox select').append(that.template.cardTypeHtml(_role));    //证件类型
                        $('.patientInfoItem').find('.protectTypeBox select').append(that.template.cardTypeHtml(_social));  //社保类型
                        that.getBaseInfo();
                    }
                }
            })
        },
        //获取个人信息
        getBaseInfo:function(){
            var that = this;
            var _data={
                patientId: that.config.patientId,	     //string	是	患者id
                firstResult:"0",	//string	是	分页参数
                maxResult:"1"	//string	是	分页参数
            };
            that.callAjax({
                path: that.path.baseInfo,
                data:_data,
                callBack:function(data){
                    //处理返回数据
                    if (data&&data.responseObject&&data.responseObject.responseStatus) {
                        that.config.message = data.responseObject.responseMessage;
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
                                $('.patientInfoList').find('.patientInfoItem[data-type=1]').addClass('active').find('input').val(patientName).attr("data-patientId",patientId);
                            }
                            //证件类型
                            if(certificateId != "0"){
                                var thatext=$('.patientInfoItem[data-type=2]').find('option[data-typeid='+certificateId+']').val();
                                $('.patientInfoItem[data-type=2]').find('.show').text(thatext).addClass('selected');
                                $('.patientInfoList').find('.patientInfoItem[data-type=2]').addClass('active').attr("data-typeid",certificateId);
                            }
                            //证件号码
                            if(certificateCode != ""){
                                $('.patientInfoList').find('.patientInfoItem[data-type=3]').addClass('active').find('input').val(certificateCode);
                            }
                            //联系电话
                            if(mobile != ""){
                                $('.patientInfoList').find('.patientInfoItem[data-type=4]').addClass('active').find('input').val(mobile);
                            }
                            //患者所在地
                            if(province != ""){
                                $('.patientInfoList').find('.patientInfoItem[data-type=5]').addClass('active').find('span').text(province+ " " +city+ " " +district).attr({
                                    "data-provinceId":provinceId,"data-cityId":cityId,"data-districtId":districtId,
                                    "data-province":province,"data-city":city,"data-district":district
                                }).addClass("selected").closest('.patientInfoItemRight').addClass('hasSelect');
                            }
                            //社保类型
                            if(socialId !== "0"){
                                var _socialText=$('.patientInfoItem[data-type=6]').find('option[data-typeid='+socialId+']').val();
                                $('.patientInfoItem[data-type=6]').find('.show').text(_socialText).addClass('selected');
                                $('.patientInfoList').find('.patientInfoItem[data-type=6]').addClass('active').attr("data-typeid",socialId);
                            }
                            //社保所在地
                            if(socialProvince != ""){
                                $('.patientInfoList').find('.patientInfoItem[data-type=7]').addClass('active').find('span').text(socialProvince+ " " +socialCity + " " +socialDistrict).attr({
                                    "data-provinceId":socialProvinceId,"data-cityId":socialCityId,"data-districtId":socialDistrictId,
                                    "data-province":socialProvince,"data-city":socialCity,"data-district":socialDistrict
                                }).addClass("selected").closest('.patientInfoItemRight').addClass('hasSelect');
                            }
                            //备注
                            $(".patientInfoItem").find(".remark textarea").val($.trim(remark));
                        }
                    }
                    that.submitCheck();
                    that.savePatientInfo();
                }
            })
        },
        //页面的提交按钮
        savePatientInfo : function () {
            var that=this;
            $('#saveInfoBtn').on('click',function () {
                var _requireActNum=$(".patientInfoItem.active[data-required=1]"),  //必选已填总数
                    _requireNum=$(".patientInfoItem[data-required=1]");            //必选总数
                if(_requireActNum&&_requireNum&&_requireActNum.length==_requireNum.length){
                    var _data={
                        patientName:$('.patientInfoItem[data-type=1]').find('input').val(),                  //患者名称
                        patientId:that.config.patientId,   //患者ID
                        certificateId:$('.patientInfoItem[data-type=2]').attr("data-typeid"),                //证件类型ID
                        certificateCode:$('.patientInfoItem[data-type=3]').find('input').val(),              //证件号码
                        mobile:$('.patientInfoItem[data-type=4]').find('input').val(),                       //手机号码
                        province:$('.patientInfoItem[data-type=5]').find('span').attr("data-province"),       //所在地省
                        provinceId:$('.patientInfoItem[data-type=5]').find('span').attr("data-provinceId"),   //所在地省ID
                        city:$('.patientInfoItem[data-type=5]').find('span').attr("data-city"),               //所在地市
                        cityId:$('.patientInfoItem[data-type=5]').find('span').attr("data-cityId"),           //所在地市ID
                        district:$('.patientInfoItem[data-type=5]').find('span').attr("data-district"),       //所在地区/县
                        districtId:$('.patientInfoItem[data-type=5]').find('span').attr("data-districtId"),   //所在地区/县ID
                        socialId:$('.patientInfoItem[data-type=6]').attr("data-typeid")||"",                       //社保类型ID
                        socialProvince:$('.patientInfoItem[data-type=7].active').find('span').attr("data-province")||"",       //社保省
                        socialProvinceId:$('.patientInfoItem[data-type=7].active').find('span').attr("data-provinceId")||"",   //社保省ID
                        socialCity:$('.patientInfoItem[data-type=7].active').find('span').attr("data-city")||"",               //社保市
                        socialCityId:$('.patientInfoItem[data-type=7].active').find('span').attr("data-cityId")||"",           //社保市ID
                        socialDistrict:$('.patientInfoItem[data-type=7].active').find('span').attr("data-district")||"",       //社保区/县
                        socialDistrictId:$('.patientInfoItem[data-type=7].active').find('span').attr("data-districtId")||"",    //社保区/县ID
                        caseRemark:$(".patientInfoItem").find(".remark textarea").val(),          //备注
                        isShunt:1,
                        caseId:common.getpara().caseId
                    };
                    if (that.config.message) {
                        var sentUrl = that.path.submit;
                    } else {
                        var sentUrl = that.path.updateInfo;
                    }
                    console.log(sentUrl);
                    that.callAjax({
                        data:_data,
                        path:sentUrl,
                        callBack:function(rep){
                            if (rep.responseObject.responseStatus) {
                                window.location.href = "/pages/imScene/im_main_scene.html?from=op_help&caseId=" + that.config.caseId + "&shuntCustomerId=" + rep.responseObject.responseData.shuntCustomerId;
                            }
                        }
                    })
                }
            })
        },
        //公用Ajax数据请求
        callAjax: function (obj) {
            common.loading.show();
            var that = this,
                params = {paramJson: $.toJSON(obj.data)};
            $.ajax({
                url: obj.path,
                type: "POST",
                data: params,
                //time : 5000,
                success: function (data) {
                    common.loading.hide();
                    obj.callBack(data);
                },
                error: function () {
                    common.loading.hide();
                }
            });
        }
    };
    controller.init();
});