/**
 * @name: 预约历史
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/3/2
 * @author: wangjingrong
 */
$(function(){
    var bookingHisList = {
        config:{
            customerId:common.getpara().customerId
        },
        path:{
            getHisList:'/mcall/customer/clinic/v1/getMapListByCustomer/'//预约历史接口
        },
        template:{
            //预约历史列表
            historyList:function(data){
                var html,imgUrl,orderName,buttonBox,statusName,proOrdertype = '';
                //判断 1门诊预约 2手术直约
                if(data.orderType == 1){
                    imgUrl = '/image/img00/myServices/clinic_order@2x.png';
                    orderName = '门诊预约';
                }else{
                    imgUrl = '/image/img00/myServices/directOperation.png';
                    orderName = '手术直约';
                }
                //判断预约状态
                var orderStatus = Number(data.orderStatus);
                switch (orderStatus){
                    case 1:
                        statusName = '待支付';
                        //buttonBox = '<button class="btn-gray ev_btn_cancel">取消</button><button class="btn-green">待支付</button>';
                        break;
                    case 2:
                        statusName = '待就诊';
                        //if(data.payStatus == 2){
                        //    buttonBox = '<button class="btn-green">退款</button>';
                        //}else{
                        //    buttonBox = '<button class="btn-gray ev_btn_cancel">取消</button>';
                        //}
                        break;
                    case 3:
                        statusName = '已完成';
                        //buttonBox = '<button class="btn-green">继续咨询</button>';
                        break;
                    case 4:
                        statusName = '已取消';
                        //buttonBox = '';
                        break;
                    case 5:
                        statusName = '已退款';
                        //buttonBox = '';
                        break;
                    case 6:
                        statusName = '已超时';
                        //buttonBox = '';
                        break;
                }
                html = '<section class="orderHistoryItem" data-ordertype="'+(data.orderType==1?"3":data.orderType)+'" data-proOrdertype="'+(data.payOrderAmount == 0?"1":"2")+'" data-orderid="'+data.payOrderId+'" data-caseid="'+data.caseId+'" data-patientid="'+data.patientId+'">'+
                    '<div class="bookingHisItemTop">'+
                    '<div class="doctorInfo left">'+
                    '<img src="'+imgUrl+'">'+
                    '<span>'+orderName+'</span>'+
                    '</div>'+
                    '<div class="doctorState right '+(orderStatus==3||orderStatus==4||orderStatus==5?"font-gray":"")+'">'+statusName+'</div>'+
                    '</div>'+
                    ((data.payTime>0&&data.orderStatus==1)?'<article class="countDown hide">支付剩余时间：<span class='+("countDownMin"+data.payOrderId)+'></span><span>分</span><span class='+("countDownSec"+data.payOrderId)+'></span><span>秒</span>超时将自动取消</article>':'')+
                    '<div class="bookingHistoryItemCenter">'+
                    '<p>'+data.hospitalName+'</p>'+
                    '<p><span class="bookingDocName">'+data.customerName+'</span></p>'+
                    '</div>'+
                    '<div class="bookingHistoryItemBottom">'+
                    '<div class="orderHisItemBottomLeft left">'+
                    '<p><span>就诊人：</span><span>'+data.patientName+'</span></p>'+
                    '<p><span>'+data.createTime.slice(0,16)+'</span></p>'+
                    '</div>'+
                    '<div class="orderHisItemBottomRight right">'+
                    '<button class="btn-green">查看详情</button>'+
                    '</div>'+
                    '</div>'+
                    '</section>';
                return html;
            },
            //没有预约历史
            nohistoryList:function(){
                return '<section class="noFriendText">'+
                    '<p>您还没有任何记录</p>'+
                    '<p>添加关心的人，在线咨询预约，唯医为您开启全新的就医体验</p>'+
                    '</section>'+
                    '<section class="noFriendHref">'+
                    '<a href="/dist/consult.html?customerId='+common.getpara().customerId+'#/addPatient">去咨询 &gt;</a>'+
                    // '<a href="//m.allinmed.cn/pages/directOperation/direct_operation.html?customerId='+common.getpara().customerId+'">直约手术 &gt;</a>'+
                    '</section>'
            }
        },
        init:function(){
            var t = this;
            if (!common.checkOpenId()) {
                common.wxGetOpenId(1);    //获取openId
            }
            t.addHtml();
        },
        addHtml:function(){
            var t = this;
            $.ajax({
                url: t.path.getHisList,
                type:"post",
                timeout:10000,
                data:{
                    paramJson: $.toJSON({customerId:t.config.customerId})
                },
                dataType:"json",
                success:function(data){
                    if(data&&data.responseObject.responseData&&data.responseObject.responseData.dataList){
                        var items = data.responseObject.responseData.dataList;
                        $.each(items,function(index,element){
                            $(".orderList").append(t.template.historyList(element));
                            if(element.payTime>0&&element.orderStatus == 1){
                                t.countDown({
                                    container:$('.countDown'+element.payOrderId),
                                    time:element.payTime,
                                    countDownMin:$('.countDownMin'+element.payOrderId),
                                    countDownSec:$('.countDownSec'+element.payOrderId)
                                })
                                setTimeout(function(){
                                    $(".countDown").removeClass("hide");
                                },100)
                            }
                        });
                    }else{
                        $(".orderList").addClass("bg-f").append(t.template.nohistoryList());
                    }
                    t.btnClick();
                },
                error:function(){

                }
            })
        },
        btnClick:function(){
            var t = this;
            //跳转详情
            $(".orderHistoryItem").on("click",function(){
                var orderType = $(this).attr('data-ordertype'),
                    proOrderType = $(this).attr('data-proOrdertype'),
                    orderId = $(this).attr('data-orderid'),
                    caseId = $(this).attr('data-caseid'),
                    patientId = $(this).attr('data-patientid');
                localStorage.setItem("doctorName",$(this).find(".bookingDocName").text());
                window.location.href = "/pages/myServices/booking_details.html?orderType="+orderType+"&proOrderType="+proOrderType+"&orderId="+orderId+"&caseId="+caseId+"&patientId="+patientId+"&patientCustomerId="+common.getpara().customerId;
            })
        },
        //倒计时
        countDown:function(obj){
            common.countDown({
                timeNum:obj.time,
                timeType:2,
                day:$('#day_show'),
                hour:$('#hour_show'),
                minute:obj.countDownMin,
                second:obj.countDownSec,
                countDownEnd:function(){
                    //obj.container.addClass("hide");
                    //obj.container.siblings(".bookingHisItemTop").find(".doctorState").text("已取消");
                }
            })
        }
    }
    bookingHisList.init();
})
