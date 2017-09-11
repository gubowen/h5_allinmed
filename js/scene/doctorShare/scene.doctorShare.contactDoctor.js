/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 2017/5/5.
 */
$(function () {
    var controller = {
        init: function () {
            this.pageEvent();//页面函数
            this.getUrlParam();//得到url参数保存起来
            this.addHtml();//加载DOM
        },
        config: {},
        template: {
            //获取医生信息dom
            doctorInfo:function (authMap,majorMapList,logoUrl) {
                var hospotalLevel = {
                    1:"三甲",
                    2:"三乙",
                    3:"三丙",
                    4:"二甲",
                    5:"二乙",
                    6:"二丙",
                    7:"一甲",
                    8:"一乙",
                    9:"一丙",
                    10:"一级"
                };
                return '<section class="info-left"><img class="doctor-icon" src="' + (logoUrl || "/image/img00/doctorMain/doc_logo.png") +'" alt="医生头像"></section>'+
                    '<section class="info-right">'+
                    '<p class="info-top"><span class="doctor-name">' + (authMap.fullName || "") + '</span><span class="doctor-post">' + (authMap.medicalTitle || "") + '</span></p>'+
                    '<p class="info-middle"><span class="doctor-hospital">' + (authMap.company || "") + '</span>' + (parseInt(authMap.hospitalLevelId)&&'<span class="hospital-level">' + hospotalLevel[authMap.hospitalLevelId] + '</span>') + '</p>'+
                    '<p class="info-bottom">' + (function () {
                        var tempHtml = '';
                        $.each(majorMapList,function (index,element) {
                            tempHtml += '<span class="subject-item">'+ element["majorName"] +'</span>'
                        });
                        return tempHtml;
                    })() + '</p>'+
                    '</section>';
            }
        },
        path: {
            getDocMain:"/mcall/customer/auth/v1/getMapById/"
        },
        //得到url参数保存起来
        getUrlParam: function () {
            var that = this;
            var params = common.getpara();
            $.extend(that.config,params);
        },
        //加载DOM
        addHtml:function () {
            var that = this;
            //加载医生信息
            $.ajax({
                url: that.path.getDocMain,
                dataType:"json",
                type: "POST",
                data:{paramJson: $.toJSON({
                    customerId:that.config.doctorId,
                    logoUseFlag:3
                })},
                success:function(data){
                    console.log(data);
                    // var items = data.responseObject.responseData.dataList;
                    if (data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList) {
                        var _dataList=data.responseObject.responseData.dataList[0];
                        console.log(_dataList);
                        document.title = "联系" + _dataList.authMap.fullName + "医生";
                        $(".doctor-info").append(that.template.doctorInfo(_dataList.authMap,_dataList.majorMapList,_dataList.logoUrlMap.logoUrl));
                    }
                },
                error:function(){

                }
            })
        },
        //页面函数
        pageEvent:function (){
            //去问诊
            $("#goInquiry").on("click",function () {
                console.log("去问诊");
                window.location = "/dist/consult.html?customerId="  + common.getpara().customerId;
            });
            //诊后报道
            $("#goReport").on("click",function () {
                console.log("去诊后报到");
                window.location = "/pages/patientReport/patient_info.html?customerId="  + common.getpara().customerId + "&doctorId=" + common.getpara().doctorId;
            });
        }
    };
    controller.init();
});
