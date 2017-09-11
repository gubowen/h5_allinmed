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
            this.addHtml();//加载DOM
            // this.hospitalList();//初始化医院列表的数据
            //处理异步执行；
            var promise = new Promise(function () {
                modules.dateDiagrame();
            });
            promise.then(this.pageEvent());//页面事件
        },
        config: {},
        template: {
            //停诊信息
            stopVisitHtml:function(data){
                var html = '<section>' +
                    (function () {
                        if (data.length == 1) {
                            var single = data[0];
                            return '<p class="stopVisit_rest" data-begaintime="'+single.startTime+'" data-endtime="'+single.endTime+'"><span>' + orderTimeDeals(single.startTime).year + '至' + orderTimeDeals(single.endTime).year + '</span><span class="stop_reason">' + single.closeReason + '</span></p>' +
                                '<p class="stopVisit_normal">' + orderTimeDeals(single.endTime).year + '以后正常接诊</p>'
                        } else {
                            var stopHtml = '';
                            $.each(data, function (index, element) {
                                stopHtml += '<p class="stopVisit_rest" data-begaintime="'+element.startTime+'" data-endtime="'+element.endTime+'"><span>' + orderTimeDeals(element.startTime).year + '至' + orderTimeDeals(element.endTime).year + '</span> <span>' + element.closeReason + '</span></p>'
                            })
                            return stopHtml
                        }
                    })() +
                    '<span class="stopVisit_hint">此消息由医生发布</span>' +
                    '</section>';
                return html;
            }
        },
        path: {
            getDocMain:"/mcall/customer/auth/v1/getMapById/",
            getWXSign:"/mcall/wx/api/v1/getJSConfig/",
            getCloseTime:"/mcall/customer/clinic/close/v1/getMapList/"
        },
        //加载DOM
        addHtml:function(){
            var that = this;
            //加载医生信息
            // $.ajax({
            //     url: t.path.getDocMain,
            //     dataType:"json",
            //     data:{paramJson: $.toJSON({customerId:1489998833435})},
            //     success:function(data){
            //         console.log(data)
            //         var items = data.responseObject.responseData.dataList;
            //
            //     },
            //     error:function(){
            //
            //     }
            // })
            //加载停诊信息
            $.ajax({
                url: that.path.getCloseTime,
                dataType:"json",
                data:{paramJson: $.toJSON({
                    customerId:common.getpara().customerId,
                    isAll:0
                })},
                success:function(data){
                    var items = data.responseObject.responseData.dataList;
                    if (items) {
                        $(".stopVisit").show();
                        $(".stopVisit article").html(that.template.stopVisitHtml(items));
                    } else {
                        $(".stopVisit").hide();
                    }
                    // that.pageEvent();
                },
                error:function(){

                }
            })
        },
        //页面事件
        pageEvent:function () {
            // console.log("aaa");
            $(".stopVisit").on("click",".showHide",function(){
                var thisPrev = $(this).prev();
                thisPrev.toggleClass("overText");
                if($(this).hasClass("icon-more")){
                    $(this).removeClass("icon-more").addClass("icon-less");
                }else{
                    $(this).removeClass("icon-less").addClass("icon-more");
                }
            })
        },
        //初始化医院列表的数据
        // hospitalList:function () {
        //     var that = this;
        //     var hospitalData = [{
        //         text: "新绛生产第二附属医院石子大学总医院附属第二医院",
        //         value: "新绛生产第二附属医院石子大学总医院附属第二医院"
        //     }, {
        //         text: "主治医师",
        //         value: "主治医师"
        //     }, {
        //         text: "副主任医师",
        //         value: "副主任医师"
        //     }, {
        //         text: "主任医师",
        //         value: "主任医师"
        //     }];
        //     var picker = new Picker({
        //         data: [hospitalData]
        //     });
        //     $("#selectHospital").on("click", function () {
        //         picker.show();//点击时显示职称
        //         $(".select-hospital .select-icon-down").removeClass("select-icon-down").addClass("select-icon-up");
        //     });
        //     picker.on('picker.valuechange', function (selectedVal, selectedIndex) {//每次选择完职称触发相应职称的时间选择
        //         console.log(selectedVal);
        //         console.log(selectedIndex);
        //         $("#selectHospital").html(selectedVal[0]);
        //         $(".select-hospital .select-icon-up").removeClass("select-icon-up").addClass("select-icon-down");
        //
        //     });
        // }
    };
    controller.init();
});
