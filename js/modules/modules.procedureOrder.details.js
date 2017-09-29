/**
 * @Desc： 订单详情 （2-手术 3-门诊）
 * @Usage:   modules.orderDetails({
                  addElement:$('.wx-main-inner'),        //dome加载元素   $('.wx-main-inner')
                  orderType:2,                       //订单类型   (2-手术 3-门诊)
                  proOrderType:2,               //订单收费类型   (1-免费 2-收费)
                  orderId:'',                           //订单ID
                  patientId:'',                         //患者ID
                  patientCustomerId:'';       //患者所属用户ID
                  initFunction:function(){
                      //初始化方法 （详情模块加载）
                      $('.wx-main-inner').find('.wx-main-content.orderDetails').siblings().hide();
                  }
              });
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/5/5.
 */
modules.orderDetails =function(Obj) {
    var container = {
        op:{},
        path:{
            getOrderDetail:"/mcall/cms/pay/order/v1/getMapById/",    //订单详情
            updateOrder:"/mcall/cms/pay/order/v1/update/",           //更新订单
            proOrderCost:"/mcall/comm/setting/operation/v1/getMapById/"    //获取支付金额
        },
        init:function(){
            var _t = this;
            _t.op.proOrderType = parseInt(Obj.proOrderType);              //详情单类型 （1-免费 2-收费）
            _t.op.orderId = parseInt(Obj.orderId);                        //详情单ID
            _t.op.patientCustomerId = parseInt(Obj.patientCustomerId);    //患者所属用户ID
            _t.op.patientId = parseInt(Obj.patientId);                    //患者ID
            //_t.op.patientCustomerId+'&patientId='+_t.op.patientId
            _t.firstLoad();
        },
        template:{
            //订单已取消
            orderIsClose:function(_text){
              return ' <section class="wx-comm-topSmall">'+
                  '            <section class="wx-comm-topCover"></section>'+
                  '            <section class="wx-comm-topText">'+
                  '                <p>'+_text.text+'</p>'+
                  '            </section>'+
                  '</section>';
            },
            //免费订单详情 （2-公立医院、3-免费门诊）
            freeDetailHtml:function(dataList){
                var _t = this,
                    _publicDetailHtml = '',
                    _freeOrderType = '',
                    _bottomRightBtn = '',
                    _freeOrderProcess = '',
                    _freeOrderBottomBtn = '',
                    _cureTime = '',
                    _timesList = '',
                    _orderStatus = '',
                    _orderStatusText = '',
                    _cureStatusText = '',
                    _hospitalAddress ='',                                       //医院地址
                    _cureArea ='',                                              //医院地址Dome片段
                    _hospitalName ='',
                    _orderType = parseInt(dataList.orderType),                  //订单类型
                    _status = parseInt(dataList.status),                        //订单状态 1-待支付2-已支付3-已完成4-已取消5-退款中6-支付超时7-退款完成',
                    _orderId = dataList.orderId,                                //订单ID
                    _orderSourceId = dataList.orderSourceId,                    //订单对应资源ID
                    _createTime = dataList.createTime?dataList.createTime.substring(0,dataList.createTime.length-2):'',  //订单创建时间
                    _mobile = dataList.patientMap.mobile,                       //患者电话
                    _patientName = dataList.patientMap.patientName,             //患者姓名
                    _doctorName =dataList.customerMap.fullName?dataList.customerMap.fullName:"";
                switch (_orderType){
                    case 2:
                        _freeOrderType = "公立医院手术";
                        _bottomRightBtn ="继续沟通";
                        _cureTime=dataList.operationOrderMap.operationTime;        //手术时间
                        _timesList =(_cureTime.length>0)? orderTimeDeals(_cureTime):"待定（入院前3天通知）";
                        _hospitalAddress=dataList.hospitalAddress;                 //医院地址
                        _hospitalName = dataList.operationOrderMap.hospitalName?dataList.operationOrderMap.hospitalName:'';   //医院名称
                        break;
                    case 3:
                        _orderStatus = dataList.clinicMap.status;
                        _freeOrderType = dataList.orderSourceType=="1"?"普通门诊":dataList.orderSourceType=="2"?"专家门诊":"特需门诊";
                        _cureTime = dataList.clinicMap.clinicTime;                       //手术时间
                        _bottomRightBtn = "去沟通";
                        _timesList =(_cureTime.length>0)? orderTimeDeals(_cureTime):"待定（入院前3天通知）";
                        _hospitalAddress = dataList.hospitalAddress;                     //医院地址
                        _hospitalName = dataList.clinicMap.hospitalName;                 //医院名称
                        switch (parseInt(_orderStatus)){
                            case 1:
                                _orderStatusText = "预约中";
                                _cureStatusText = "待就诊";
                                break;
                            case 2:
                                _orderStatusText = "已预约";
                                _cureStatusText = "待就诊";
                                break;
                            case 3:
                                _orderStatusText = "已预约";
                                _cureStatusText = "已就诊";
                                break;
                        }
                        break;
                }
                if(_status ==4){
                    _freeOrderProcess+='<section class="wx-commTopBox">'+_t.orderIsClose({text:"订单已取消"})+'</section> ';
                }else{
                    if(_orderType == 3){
                        //免费门诊展示进度条
                        _freeOrderProcess = '<section class="wx-orderProgressComm notHasTips">'+
                            '            <div class="wx-orderProgressCover"></div>'+
                            '            <div class="wx-progressBarBox">'+
                            '                <div class="wx-progressItemBox progress-hasBar">'+
                            '                    <div class="wx-progressItem '+(_orderStatus==1?"wx-waitPay":"wx-isPay")+'">'+
                            '                        <span class="wx-progressLine"></span>'+
                            '                        <span class="wx-progressText">'+_orderStatusText+'</span>'+
                            '                    </div>'+
                            '                </div>'+
                            '                <div class="wx-progressItemBox progress-hasBar">'+
                            '                    <div class="wx-progressItem '+(_orderStatus==1?"wx-notSurgical":(_orderStatus==2?"wx-waitSurgical":"wx-isSurgical"))+'">'+
                            '                        <span class="wx-progressLine"></span>'+
                            '                        <span class="wx-progressText">'+_cureStatusText+'</span>'+
                            '                    </div>'+
                            '                </div>'+
                            '                <div class="wx-progressItemBox">'+
                            '                    <div class="wx-progressItem '+(_orderStatus==3?"wx-payIsOver":"wx-payWaitOver")+'">'+
                            '                        <span class="wx-progressText">已完成</span>'+
                            '                    </div>'+
                            '                </div>'+
                            '            </div>'+
                            '        </section>';
                    }
                    if(_status == 1 || _status ==2 && _orderType ==2 ){
                        //公立医院底部btn
                        _freeOrderBottomBtn += '<section class="wx-comm-bottomBtn freeOrderDetail">'+
                        '            <button class="wx-comm-bottomBtnLeft wx-closeOrder">取消订单</button>'+
                        '            <button class="wx-comm-bottomBtnRight wx-goConsult">'+_bottomRightBtn+'</button>'+
                        '        </section>';
                    }else if(_status == 1 || _status == 2 && _orderStatus!=3 ){
                        //门诊底部btn
                        _freeOrderBottomBtn += '<section class="wx-comm-bottomBtn freeOrderDetail">'+
                            '    <button class="wx-comm-bottomBtnRight wx-closeBtnForDoor wx-closeOrder">取消订单</button>'+
                            '</section>';
                    }
                }
                if(_hospitalAddress.length>0){
                    _cureArea += '<ul class="wx-baseItemBox"><li class="wx-baseListLeft">就诊地点</li>'+
                        ' <li class="wx-baseListRight">'+_hospitalAddress+'</li></ul>';
                }
                _publicDetailHtml += '<section class="wx-commTopBox">'+((_orderType==3||_orderType==2)?_freeOrderProcess:"")+'</section><section class="wx-orderComm-baseBox">'+
                    '            <ul class="wx-baseItemBox">'+
                    '                <li class="wx-baseListLeft">医生姓名</li>'+
                    '                <li class="wx-baseListRight">'+_doctorName+'</li>'+
                    '            </ul>'+
                    '            <ul class="wx-baseItemBox">'+
                    '                <li class="wx-baseListLeft">订单类型</li>'+
                    '                <li class="wx-baseListRight">'+_freeOrderType+'</li>'+
                    '            </ul>'+
                    '            <ul class="wx-baseItemBox">'+
                    '                <li class="wx-baseListLeft">'+(_orderType==3?"就诊时间":"手术时间")+'</li>'+
                    '                <li class="wx-baseListRight">'+
                    (_cureTime.length>0 ? '<span class="wx-baseSurgicalTime">'+_timesList.years+'</span><span class="wx-baseSurgicalWeek">'+_timesList.week+'</span><span class="wx-baseSurgicalDate">'+_timesList.hour+'</span>':'<span class="wx-baseSurgicalTime">'+_timesList+'</span>')+
                    '                </li>'+
                    '            </ul>'+
                    '            <ul class="wx-baseItemBox">'+
                    '                <li class="wx-baseListLeft">就诊医院</li>'+
                    '                <li class="wx-baseListRight">'+_hospitalName+'</li>'+
                    '            </ul>'+_cureArea+'</section>'+
                    '        <section class="wx-orderComm-baseLine"></section>'+
                    '        <section class="wx-order-infoBase">'+
                    '            <ul class="wx-order-patientInfoBox">'+
                    '                <li class="wx-order-patientInfoItem">'+
                    '                    <span class="wx-patientNameLeft">患者姓名:</span><span class="wx-patientNameRight">'+_patientName+'</span>'+
                    '                </li>'+
                    '                <li class="wx-order-patientInfoItem">'+
                    '                    <span class="wx-patientNameLeft">联系电话:</span><span class="wx-patientNameRight">'+_mobile+'</span>'+
                    '                </li>'+
                    '                <li class="wx-order-patientInfoItem">'+
                    '                    <span class="wx-patientNameLeft">订单编号:</span><span class="wx-patientNameRight">'+_orderId+'</span>'+
                    '                </li>'+
                    '                <li class="wx-order-patientInfoItem">'+
                    '                    <span class="wx-patientNameLeft">提交时间:</span><span class="wx-patientNameRight">'+_createTime+'</span>'+
                    '                </li>'+
                    '            </ul>'+
                    '        </section>'+_freeOrderBottomBtn;
                return '<section class="wx-main-content no-marginTop publicOrderDetails" data-status="'+dataList.status+'" data-orderSourceId="'+_orderSourceId+'">'+_publicDetailHtml+'</section>';

            },
            //收费订单详情 （2-互联网医院、3-收费门诊）
            chargeDetailHtml:function(dataList){
                var _t = this,
                    _orderProcessHtml = '',
                    _orderComplateHtml = '',
                    _orderInfoHtml = '',
                    _hospitalAddressHtml = '',
                    _bottomRightBtn = '',
                    _cureStatusText = '',
                    _overStatusText = '',
                    _orderBottomBtn = '',
                    _orderExplainText = '',
                    _orderStatusText = '',
                    _orderTypeText = '',
                    _orderType = parseInt(dataList.orderType),  //订单类型
                    _orderStatus = parseInt(dataList.status),   //订单状态
                    _orderSourceType = parseInt(dataList.orderSourceType),   //订单对应资源类型
                    _orderSourceId = dataList.orderSourceId,    //订单对应资源
                    _orderId=dataList.orderId,  //订单ID
                    _doctorId=dataList.doctorId,  //医生ID
                    _createTime=dataList.createTime?dataList.createTime.substring(0,dataList.createTime.length-2):'',  //订单创建时间
                    _cureTime="",                                            //手术时间
                    _timesList ="",
                    _remainingTime = '',                                     //剩余支付时间
                    _hospitalAddress='',                                     //医院地址
                    _hospitalName = '',                                      //医院名称
                    _orderAmount="",                                         //订单金额
                    _mobile=dataList.patientMap.mobile,                      //患者电话
                    _patientName=dataList.patientMap.patientName;            //患者姓名
                switch (_orderType){
                    case 2:
                        //手术单
                        _bottomRightBtn = "术前咨询";
                        _orderAmount=(dataList.orderAmount>0)?common.formatMoney(dataList.orderAmount,2):"";       //订单金额
                        _orderTypeText = dataList.orderSourceType=="1"?"合作医院手术":"公立医院手术";
                        _cureTime=dataList.operationOrderMap.operationTime;        //手术时间
                        _timesList =(_cureTime.length>0)? orderTimeDeals(_cureTime):"待定（入院前3天通知）";
                        _hospitalAddress=dataList.hospitalAddress;                 //医院地址
                        _hospitalName = dataList.operationOrderMap.hospitalName;   //医院名称
                        break;
                    case 3:
                        //门诊
                        _bottomRightBtn = "术前咨询";
                        _orderAmount=(dataList.orderAmount>0)?common.formatMoney(dataList.orderAmount,2):"";       //订单金额
                        _orderTypeText = dataList.orderSourceType=="1"?"普通门诊":dataList.orderSourceType=="2"?"专家门诊":"特需门诊";
                        _cureTime=dataList.clinicMap.clinicTime;  //手术时间
                        _timesList =(_cureTime.length>0)? orderTimeDeals(_cureTime):"待定（入院前3天通知）";
                        _hospitalAddress=dataList.hospitalAddress;                     //医院地址
                        _hospitalName = dataList.clinicMap.hospitalName;               //医院名称
                        break;
                }
                switch (_orderStatus){
                    case 1:
                        //待支付
                        _orderStatusText = "待支付";
                        _cureStatusText = "待就诊";
                        _remainingTime = '<span>支付剩余时间：</span><span class="wx-remainingTime wx-remainingTimeMinute">0</span><span>分</span><span class="wx-remainingTime wx-remainingTimeSecond">0</span><span>秒，请尽快支付</span>';
                        break;
                    case 2:
                        //已支付
                        _orderStatusText = "已支付";
                        _cureStatusText = "待就诊";
                        if(_orderType ==2){
                            _remainingTime = dataList.operationOrderMap.orderStatus=="6"?"未确认就诊":"已确认就诊";
                        }else{
                            _remainingTime = dataList.clinicMap.status=="2"?"预约成功":"预约中";
                        }
                        break;
                    case 3:
                        //已完成
                        _orderStatusText = "已支付";
                        _cureStatusText = "已就诊";
                        break;
                    case 4:
                        //已取消
                        _orderStatusText = "待支付";
                        _orderExplainText = "订单已取消";
                        break;
                    case 5:
                        //退款中
                        _orderStatusText = "已支付";
                        _orderExplainText = "已退款"+'<span class="wx-isRefundForOrder">（7个工作日内退回，请注意查收）</span>';
                        break;
                    case 6:
                        //支付超时
                        _orderStatusText = "待支付";
                        _orderExplainText = "订单已取消";
                        break;
                    case 7:
                        //退款完成
                        _orderStatusText = "已支付";
                        _orderExplainText = "已退款"+'<span class="wx-isRefundForOrder">（7个工作日内退回，请注意查收）</span>';
                        break;
                }
                //订单状态判断
                //if(dataList.status==1&&parseInt(dataList.timeLeft)>0){
                //
                //}
                if(_orderStatus ==1 || _orderStatus ==2 || _orderStatus ==3){
                    //进度条
                    _orderComplateHtml = _orderStatus==3?"":'<div class="wx-progressTextBox">'+_remainingTime+'</div>';
                    _orderProcessHtml+= '<section class="wx-commTopBox"><section class="wx-orderProgressComm '+(_orderStatus==3?"notHasTips":"")+'">'+
                        '            <div class="wx-orderProgressCover"></div>'+
                        '            <div class="wx-progressBarBox">'+
                        '                <div class="wx-progressItemBox progress-hasBar">'+
                        '                    <div class="wx-progressItem '+(_orderStatus==1?"wx-waitPay":"wx-isPay")+'">'+
                        '                        <span class="wx-progressLine"></span>'+
                        '                        <span class="wx-progressText">'+_orderStatusText+'</span>'+
                        '                    </div>'+
                        '                </div>'+
                        '                <div class="wx-progressItemBox progress-hasBar">'+
                        '                    <div class="wx-progressItem '+(_orderStatus==1?"wx-notSurgical":(_orderStatus==2?"wx-waitSurgical":"wx-isSurgical"))+'">'+
                        '                        <span class="wx-progressLine"></span>'+
                        '                        <span class="wx-progressText">'+_cureStatusText+'</span>'+
                        '                    </div>'+
                        '                </div>'+
                        '                <div class="wx-progressItemBox">'+
                        '                    <div class="wx-progressItem '+(_orderStatus==3?"wx-payIsOver":"wx-payWaitOver")+'">'+
                        '                        <span class="wx-progressText">已完成</span>'+
                        '                    </div>'+
                        '                </div>'+
                        '            </div>'+_orderComplateHtml+
                        '        </section></section>';
                    //订单详情底部按钮
                    if(_orderType == 3 && _orderStatus == 2){
                        _orderBottomBtn =  '<section class="wx-comm-bottomBtn wx-surgical-commSubmitBox">'+
                            '    <button class="wx-comm-bottomBtnRight wx-closeBtnForDoor wx-refund">取消订单</button>'+
                            '</section>';
                    }else if(_orderStatus ==3){
                        _orderBottomBtn = '<section class="wx-comm-bottomBtn wx-surgical-commSubmitBox"><button class="wx-surgical-commSubmitBtn active">继续咨询</button></section>';
                    }else{
                        _orderBottomBtn =  '<section class="wx-comm-bottomBtn wx-surgical-commSubmitBox">'+
                            '    <button class="wx-comm-bottomBtnLeft '+(_orderStatus==1?"wx-closeOrder":"wx-refund")+'">'+(_orderStatus==1?"取消订单":"取消订单")+'</button>'+
                            '    <button class="wx-comm-bottomBtnRight '+(_orderStatus==1?"wx-goPay":"wx-goConsult")+'">'+(_orderStatus==1?"去支付":"术前咨询")+'</button>'+
                            '</section>';
                    }
                }else{
                    if(_orderStatus == 4 || _orderStatus == 6){
                        _orderBottomBtn = '<section class="wx-comm-bottomBtn wx-surgical-commSubmitBox"><button class="wx-surgical-commSubmitBtn active">重新预约</button></section>';
                    }
                    _orderProcessHtml+='<section class="wx-commTopBox">'+_t.orderIsClose({text:_orderExplainText})+'</section> ';
                }
                if(_hospitalAddress.length>0){
                    _hospitalAddressHtml+=  '            <ul class="wx-baseItemBox">'+
                        '                <li class="wx-baseListLeft">就诊地点</li>'+
                        '                <li class="wx-baseListRight">'+_hospitalAddress+'</li>'+
                        '            </ul>';
                }else{
                    _hospitalAddressHtml+='';
                }
                //订单正常状态
                _orderInfoHtml+='<section class="wx-orderComm-baseBox">'+
                    '            <ul class="wx-baseItemBox">'+
                    '                <li class="wx-baseListLeft">医生姓名</li>'+
                    '                <li class="wx-baseListRight">'+dataList.customerMap.fullName+'</li>'+
                    '            </ul>'+
                    '            <ul class="wx-baseItemBox">'+
                    '                <li class="wx-baseListLeft">订单类型</li>'+
                    '                <li class="wx-baseListRight">'+_orderTypeText+'</li>'+
                    '            </ul>'+
                    '            <ul class="wx-baseItemBox">'+
                    '                <li class="wx-baseListLeft">'+(_orderType==2?"手术时间":"就诊时间")+'</li>'+
                    '                <li class="wx-baseListRight">'+
                    (_cureTime.length>0 ? '<span class="wx-surgical-timesYear">'+_timesList.years+'</span><span class="wx-surgical-timeTips">'+_timesList.week+'</span><span class="wx-surgical-timeSeconds">'+_timesList.hour+'</span>':'<span class="surgical-timeWait">'+_timesList+'</span>')+
                    '                </li>'+
                    '            </ul>'+
                    '            <ul class="wx-baseItemBox">'+
                    '                <li class="wx-baseListLeft">就诊医院</li>'+
                    '                <li class="wx-baseListRight">'+_hospitalName+'</li>'+
                    '            </ul>'+_hospitalAddressHtml+
                    '            <ul class="wx-baseItemBox">'+
                    '                <li class="wx-baseListLeft">'+_orderStatusText+'</li>'+
                    '                <li class="wx-baseListRight">'+
                    '                    <span class="wx-payTotal"><span class="wx-payMark">￥</span>'+_orderAmount+'</span>'+
                    '                </li>'+
                    '            </ul>'+
                    '        </section>'+
                    '        <section class="wx-orderComm-baseLine"></section>'+
                    '        <section class="wx-order-infoBase">'+
                    '            <ul class="wx-order-patientInfoBox">'+
                    '                <li class="wx-order-patientInfoItem">'+
                    '                    <span class="wx-patientNameLeft">患者姓名:</span><span class="wx-patientNameRight">'+_patientName+'</span>'+
                    '                </li>'+
                    '                <li class="wx-order-patientInfoItem">'+
                    '                    <span class="wx-patientNameLeft">联系电话:</span><span class="wx-patientNameRight">'+_mobile+'</span>'+
                    '                </li>'+
                    '                <li class="wx-order-patientInfoItem">'+
                    '                    <span class="wx-patientNameLeft">订单编号:</span><span class="wx-patientNameRight">'+_orderId+'</span>'+
                    '                </li>'+
                    '                <li class="wx-order-patientInfoItem">'+
                    '                    <span class="wx-patientNameLeft">提交时间:</span><span class="wx-patientNameRight">'+_createTime+'</span>'+
                    '                </li>'+
                    '            </ul>'+
                    '        </section>'+_orderBottomBtn;

                return '<section class="wx-main-content no-marginTop orderDetails" data-orderSourceType="'+_orderSourceType+'" data-doctorId="'+_doctorId+'" data-orderType="'+_orderType+'" data-orderId="'+_orderId+'" data-orderSourceId="'+_orderSourceId+'" data-timeLeft="'+(dataList.status==1?dataList.timeLeft:"")+'" data-status="'+dataList.status+'" data-outTradeNo="'+dataList.outTradeNo+'">'+_orderProcessHtml+_orderInfoHtml+'</section>'
            }
        },
        firstLoad:function(){
            var _t = this;
            _t.commAjax({
                data:{
                    orderId: _t.op.orderId    //手术预约单-1494395198726   门诊预约单-1494395641184
                },
                path:_t.path.getOrderDetail,
                callBack:function(data){
                    if(data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList){
                        var _dataList = data.responseObject.responseData.dataList[0];
                        _t.op.caseId = _dataList.caseId;              //病历ID
                        _t.op.doctorCustomerId = _dataList.doctorId;  //医生ID
                        switch (parseInt(Obj.proOrderType)){
                            case 1:
                                //免费订单
                                Obj.addElement.append( _t.template.freeDetailHtml(data.responseObject.responseData.dataList[0]));
                                Obj.initFunction(); //方法初始化
                                _t.orderDetailClick();
                                break;
                            case 2:
                                //收费订单
                                _t.op.outTradeNo = _dataList.outTradeNo; //微信支付订单Id
                                Obj.addElement.append( _t.template.chargeDetailHtml(data.responseObject.responseData.dataList[0]));
                                Obj.initFunction(); //方法初始化
                                _t.orderDetailClick();
                                break;
                        }
                    }
                }
            });
        },
        orderDetailClick:function(){
            var _t = this;
            //剩余支付时间 倒计时
            if($('.wx-main-content.orderDetails').length>0){
                if($('.wx-main-content.orderDetails').data("status")==1){
                    var _lastTime = $('.wx-main-content.orderDetails').data("timeleft");
                    if(_lastTime>0){
                        common.countDown({
                            timeNum:_lastTime,
                            timeType:2,
                            day:$('#day_show'),
                            hour:$('#hour_show'),
                            minute:$('.wx-remainingTimeMinute'),
                            second:$('.wx-remainingTimeSecond'),
                            countDownEnd:function(){
                                $('.wx-main-content.orderDetails').find('.wx-commTopBox').html(_t.template.orderIsClose({text:"订单已取消"})).fadeIn().find('.wx-comm-bottomBtn').remove();
                                $('.wx-main-content.orderDetails').find('.wx-comm-bottomBtn').remove();
                            }
                        })
                    }
                }
            }
            //未支付 ==> 取消订单
            $('.wx-comm-bottomBtn').find('.wx-comm-bottomBtnLeft.wx-closeOrder').off("click").on("click",function(){
                if(parseInt(Obj.orderType)==2 || parseInt(Obj.orderType)==3){
                    if(parseInt(Obj.proOrderType)==2){
                        common.selectConfirmBox({
                            title:"请选择取消原因",
                            data:{
                                list:[{
                                    text:parseInt(Obj.orderType)==2?"已找其他医生":"等不及了",
                                    id:parseInt(Obj.orderType)==2?"4":"1"
                                }, {
                                    text:parseInt(Obj.orderType)==2?"路程远，就近找到其他医院":"不需要了",
                                    id:parseInt(Obj.orderType)==2?"5":"2"
                                }, {
                                    text:parseInt(Obj.orderType)==2?"个人原因":"临时有事",
                                    id:parseInt(Obj.orderType)==2?"6":"3"
                                }, {
                                    text:parseInt(Obj.orderType)==2?"不需要了":"已有其他医生",
                                    id:parseInt(Obj.orderType)==2?"2":"4"
                                }, {
                                    text:"其他原因",
                                    id:7
                                }],
                                input:true
                            },
                            cancel:"确定",
                            ensure:"暂不取消",
                            ensureCallback:function () {},
                            cancelCallback:function () {
                                var _closeSelectItem = $('.maskers.selectOrderClose').find('.confirmBox-select-item.selected'),
                                    _closeSelectItemId = _closeSelectItem.data('id'),   //取消原因ID
                                    //_closeSelectItemText = _closeSelectItem.text(),     //取消原因文案
                                    _closeSelectItemOtherText = '';                     //其他原因
                                if(_closeSelectItemId ==5){
                                    //有其他原因
                                    _closeSelectItemOtherText = $('.maskers.selectOrderClose').find('.confirmBox-textarea-box textarea').val();
                                    _t.closeOrders({
                                        closeText:_closeSelectItemId,
                                        closeOtherText:_closeSelectItemOtherText
                                    });
                                }else{
                                    _t.closeOrders(
                                        {
                                            closeText:_closeSelectItemId
                                        }
                                    );
                                }
                            }
                        });
                    }else{
                        _t.closeOrders();
                    }

                }else{
                    _t.closeOrders();
                }
                //取消订单选择及按钮
                $('.maskers.selectOrderClose').find('.confirmBox-cancelBtn').attr("disabled","disabled");
                $('.maskers.selectOrderClose').find('.confirmBox-select-item').off("click").on("click",function(ev){
                    ev.stopPropagation();
                    $('.maskers.selectOrderClose').find('.confirmBox-cancelBtn').removeAttr("disabled").removeClass('disabled');
                    $(this).addClass('selected').siblings().removeClass('selected');
                    if(parseInt($(this).attr("data-id"))==5){
                        $('.maskers.selectOrderClose').find('.confirmBox-textarea-box').show();
                        $('.maskers.selectOrderClose').find('.confirmBox-textarea-box textarea').off("click").on("click",function(ev){
                            ev.stopPropagation();
                        });
                    }else{
                        $('.maskers.selectOrderClose').find('.confirmBox-textarea-box').hide();
                    }
                });
                $('body').off("click").on("click",".maskers.selectOrderClose",function(){
                    $(this).remove();
                });
            });
            //免费门诊取消订单
            $('.wx-comm-bottomBtn').find('.wx-comm-bottomBtnRight.wx-closeOrder').off("click").on("click",function(){
               _t.closeOrders();
            });
            //已支付 ==> 取消订单(手术退款)
            $('.wx-comm-bottomBtn').find('.wx-comm-bottomBtnLeft.wx-refund').off("click").on("click",function(){
                //提示退款
                common.confirmBox({
                    title: "暂未开通退款功能,若取消订单请与客服联系为您退款。",
                    content: '010-5243669',
                    ensure: '知道了',
                    ensureCallback: function () {},
                    only:true,
                    textCenter:true,
                    contentColor:"#00BEAF"
                });
                //自动退款流程
                //common.confirmBox({
                //    title: "确定退款吗？",
                //    content: '现在退款要扣除5%手续费',
                //    textCenter:true,
                //    cancel: '退款',
                //    ensure: '再想想',
                //    cancelCallback: function () {
                //        _t.orderRefund();
                //    },
                //    ensureCallback: function () {
                //
                //    }
                //});
            });
            //已支付 ==> 取消订单(门诊退款)
            $('.wx-comm-bottomBtn').find('.wx-comm-bottomBtnRight.wx-refund').off("click").on("click",function(){
                //退款提示
                var _timeLeft = '';
                _t.commAjax({
                    data:{
                        orderId: _t.op.orderId     //手术预约单-1494395198726   门诊预约单-1494395641184
                    },
                    path:_t.path.getOrderDetail,
                    async:false,
                    callBack:function(data){
                        if(data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList){
                            _timeLeft = data.responseObject.responseData.dataList.clinicMap.timeLeft;
                        }
                    }
                });
                if(parseInt(_timeLeft)>0){
                    common.confirmBox({
                        title: "暂未开通退款功能，若取消订单请与客服联系为您退款。",
                        content: '010-5243669',
                        ensure: '知道了',
                        ensureCallback: function () {},
                        only:true,
                        textCenter:false,
                        contentColor:"#00BEAF"
                    });
                }else{
                    common.confirmBox({
                        title: "现在取消将不返还加号费用",
                        cancel: '坚持取消',
                        ensure: '再想想',
                        cancelCallback: function () {
                            _t.closeOrders();
                        },
                        ensureCallback: function () {

                        }
                    });
                }
                //自动退款流程
                //common.confirmBox({
                //    title: "确定退款吗？",
                //    content: '现在退款要扣除5%手续费',
                //    textCenter:true,
                //    cancel: '退款',
                //    ensure: '再想想',
                //    cancelCallback: function () {
                //        _t.orderRefund();
                //    },
                //    ensureCallback: function () {
                //
                //    }
                //});
            });
            //去支付
            $('.wx-comm-bottomBtn').find('.wx-comm-bottomBtnRight.wx-goPay').off("click").on("click",function(){
                //订单已创建 直接走支付接口
                var _orderContainer = $('.wx-main-content.orderDetails'),
                    _customerId = _orderContainer.data("doctorid"),
                    _orderId = _orderContainer.data("orderid"),
                    _orderType = _orderContainer.data("ordertype"),
                    _orderSourceId = _orderContainer.data("ordersourceid"),
                    _orderSourceType = _orderContainer.data("orderSourcetype"),
                    _body = '';
                switch (_orderId){
                    case 1:
                        break;
                    case 2:
                        _body = "唯医骨科-合作医院手术";
                        break;
                    case 3:
                        _body = _orderSourceType ==1?"唯医骨科-普通门诊":(_orderSourceType==2?"唯医骨科-专家门诊":"唯医骨科-特需门诊");
                        break;
                }
                _t.goPayOrder({
                    customerId:_customerId,       //医生ID
                    orderId:_orderId,          //订单ID
                    orderType:_orderType,        //订单类型  1-咨询2-手术3-门诊预约
                    orderSourceType:_orderSourceType,  //资源类型  1-普通2-加急3-特需|手术：1-互联网2-公立|门诊1-普通2-专家',
                    orderSourceId:_orderSourceId,    //订单资源ID  对应 咨询id,手术单id，门诊预约id
                    body:_body              //订单描述
                });
            });
            //咨询
            $('.wx-comm-bottomBtn').find('.wx-comm-bottomBtnRight.wx-goConsult').off("click").on("click",function(){
                if(parseInt(Obj.proOrderType)==2&&parseInt(Obj.orderType)==2){
                    window.location.href='/pages/imScene/im_main_scene_doctor.html?caseId='+_t.op.caseId+'&doctorCustomerId='+_t.op.doctorCustomerId+'&patientCustomerId='+_t.op.patientCustomerId+'&patientId='+_t.op.patientId+'&orderType='+Obj.orderType+'&orderSourceType=1';
                }else{
                    window.location.href='/pages/imScene/im_main_scene_doctor.html?caseId='+_t.op.caseId+'&doctorCustomerId='+_t.op.doctorCustomerId+'&patientCustomerId='+_t.op.patientCustomerId+'&patientId='+_t.op.patientId;
                }
            });
            $('.wx-main-content.orderDetails').find('.wx-surgical-commSubmitBtn.active').off("click").on("click",function(){
                if(parseInt(Obj.orderType)==2){
                    window.location.href='/pages/imScene/im_main_scene_doctor.html?caseId='+_t.op.caseId+'&doctorCustomerId='+_t.op.doctorCustomerId+'&patientCustomerId='+_t.op.patientCustomerId+'&patientId='+_t.op.patientId+"&rebook = 1";
                }
                window.location.href='/pages/imScene/im_main_scene_doctor.html?caseId='+_t.op.caseId+'&doctorCustomerId='+_t.op.doctorCustomerId+'&patientCustomerId='+_t.op.patientCustomerId+'&patientId='+_t.op.patientId;
            });
        },
        //去支付
        goPayOrder:function(pv){
            var _t = this,
                _orderSourceType ="";
            if(pv.orderType ==2){
                _orderSourceType = (pv.orderSourceType ==1)?"2":"3";
            }
            _t.netOrderCostGet({
                callBack:function(data){
                    modules.wxPay({
                        isTest:0, //0-线上 1-线下
                        orderId:pv.orderId,                                       //订单ID
                        orderType:pv.orderType,                                   //订单类型  1-咨询2-手术3-门诊预约
                        reservationStatus:_orderSourceType,                       //手术类型  2-合作医院  3-公立医院
                        orderSourceId:pv.orderSourceId,                           //来源id，对应 咨询id,手术单id，门诊预约id
                        total_fee: data,                                          //订单总金额 (单位为元)
                        body: pv.body,                                            //订单描述
                        callBack: function (data) {
                            if(data.responseStatus=="true"){
                                _t.goPaySuccess({orderId:pv.customerId});       //支付成功 => 订单详情
                            }
                        }
                    });
                }
            });
        },
        //支付成功
        goPaySuccess:function(){
            var _t =this;
            var _orderDetailHtml = ' <button class="wx-comm-bottomBtnLeft wx-refund">取消订单</button> ' +
                '<button class="wx-comm-bottomBtnRight wx-goConsult">术前咨询</button>';
            $('.wx-main-content.orderDetails').find('.wx-comm-bottomBtn.wx-surgical-commSubmitBox').html(_orderDetailHtml);
            $($('.wx-main-content.orderDetails').find('.wx-progressItemBox.progress-hasBar')[0]).find('.wx-progressItem').removeClass('wx-waitPay').addClass('wx-isPay');
            $($('.wx-main-content.orderDetails').find('.wx-progressItemBox.progress-hasBar')[0]).find('.wx-progressItem .wx-progressText').text("已支付");
            $('.wx-main-content.orderDetails').find('.wx-progressTextBox').html("待确认就诊");
            _t.orderDetailClick();
        },
        //获取支付金额
        netOrderCostGet:function(gv){
            var _t = this;
            _t.commAjax({
                data:{
                    orderId: _t.op.orderId    //手术预约单-1494395198726   门诊预约单-1494395641184
                },
                path:_t.path.getOrderDetail,
                callBack:function(data){
                    if(data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList){
                        var _dataList = data.responseObject.responseData.dataList[0],
                            _orderAmount = _dataList.orderAmount;
                        if(parseInt(_orderAmount)>0){
                            gv.callBack(parseFloat(_orderAmount).toFixed(2));            //返回金额
                        }
                    }
                }
            });
        },
        //取消订单
        closeOrders:function(cv){
            var _t =this;
            switch (parseInt(Obj.proOrderType)){
                case 1:
                    //免费
                    modules.tcUpOrderStatus({
                        isTest:0, //0-线上 1-线下
                        operationType:'4',                  //操作类型    1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
                        orderType:Obj.orderType,            //订单类型  1-咨询2-手术3-门诊预约
                        orderId:Obj.orderId,                //订单号
                        orderSourceId:$('.wx-main-content.publicOrderDetails').data("ordersourceid"),    //订单资源ID
                        status:'4',                         //订单状态  1-待支付2-已支付3-已完成4-已取消5-退款中
                        callBack:function(data){
                            if(data&&data.responseObject&&data.responseObject.responseStatus==true){
                                common.popup({
                                    text:"订单已取消"
                                });
                                $('.wx-comm-bottomBtn.freeOrderDetail').fadeOut();
                                setTimeout(function(){
                                    $('.wx-comm-bottomBtn.freeOrderDetail').remove();
                                    $('.wx-main-content.publicOrderDetails').find('.wx-commTopBox').html(_t.template.orderIsClose({text:"订单已取消"})).fadeIn();
                                },500);
                            }
                        },
                        errorCallBack:function(){

                        }
                    });     //更新订单状态
                    break;
                case 2:
                    //收费
                    modules.closeOrder({
                        isTest:0,
                        out_trade_no: _t.op.outTradeNo,     //订单号
                        closeOrdersSuccess:function(){
                            //更新订单状态
                            modules.tcUpOrderStatus({
                                isTest:0, //0-线上 1-线下
                                operationType: '4',                                                //操作类型  1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
                                orderId: Obj.orderId,                                              // 订单ID
                                orderType:Obj.orderType,
                                orderSourceId:$('.wx-main-content.orderDetails').data("ordersourceid"),      // 订单资源ID
                                outTradeNo:_t.op.outTradeNo,                                       //微信支付订单Id
                                refundReason: Obj.orderType == 2 ? cv.closeText : '',              //拒绝描述
                                refundReasonDesc: Obj.orderType == 2 ? cv.closeOtherText : '',     //拒绝原因描述
                                status: '4',                                                       //已取消    '订单状态1-待支付2-已支付3-已完成4-已取消5-退款中6-支付超时7-退款完成',
                                charge: "true",
                                callBack: function (data) {
                                    if (data && data.responseObject && data.responseObject.responseStatus) {
                                        //取消订单成功
                                        common.popup({
                                            text:"订单已取消"
                                        });
                                        //底部button更改
                                        if(parseInt(Obj.orderType)==2){
                                            //手术单可以重新预约
                                            $('.wx-surgical-commSubmitBox').html('<button class="wx-surgical-commSubmitBtn active">重新预约</button>');
                                        }else{
                                            //门诊移除底部button按钮
                                            $('.wx-main-content.orderDetails').find('.wx-comm-bottomBtn.wx-surgical-commSubmitBox').remove();
                                        }
                                        //进度条更改
                                        setTimeout(function(){
                                            $('.wx-main-content.orderDetails').find('.wx-commTopBox').html(_t.template.orderIsClose({text:"订单已取消"})).fadeIn();
                                        },500);
                                        $('.wx-main-content.orderDetails').find('.wx-surgical-commSubmitBtn.active').off("click").on("click",function(){
                                            if(parseInt(Obj.orderType)==2){
                                                window.location.href='/pages/imScene/im_main_scene_doctor.html?caseId='+_t.op.caseId+'&doctorCustomerId='+_t.op.doctorCustomerId+'&patientCustomerId='+_t.op.patientCustomerId+'&patientId='+_t.op.patientId+"&rebook = 1";
                                            }
                                            window.location.href='/pages/imScene/im_main_scene_doctor.html?caseId='+_t.op.caseId+'&doctorCustomerId='+_t.op.doctorCustomerId+'&patientCustomerId='+_t.op.patientCustomerId+'&patientId='+_t.op.patientId;
                                        });
                                    } else {
                                        common.popup({
                                            text: "取消失败"
                                        })
                                    }
                                },
                                errorCallBack: function () {
                                    common.popup({
                                        text: "取消失败"
                                    })
                                }
                            });
                        },
                        closeOrdersError:function(){

                        }
                    });
                    break;
            }
        },
        //退款
        orderRefund:function(){
            var _t=this;
            //modules.applyForRefund({
            //    out_trade_no: $('.wx-main-content.orderDetails').data("outTradeNo"),  //微信支付单号
            //    callBack:function(data){
            //        if(data){
            //            //退款成功
            //            setTimeout(function(){
            //                common.confirmBox({
            //                    title: "您的退款将会在7个工作日内原路退回至您的支付账号，请耐心等待",
            //                    ensure: '好的',
            //                    ensureCallback: function () {
            //
            //                    },
            //                    only:true
            //                });
            //            },500);
            //            $('.orderDetails').find('.wx-comm-bottomBtn').fadeOut();
            //            setTimeout(function(){
            //                $('.orderDetails').find('.wx-comm-bottomBtn').remove();
            //            },500);
            //        }
            //    }
            //});
            var data=true;
            if(data){
                //退款成功
                setTimeout(function(){
                    common.confirmBox({
                        title: "您的退款将会在7个工作日内原路退回至您的支付账号，请耐心等待",
                        ensure: '好的',
                        ensureCallback: function () {},
                        only:true
                    });
                },500);
                $('.orderDetails').find('.wx-comm-bottomBtn').fadeOut();
                setTimeout(function(){
                    $('.orderDetails').find('.wx-comm-bottomBtn').remove();
                },500);
            }else {
                //退款失败
            }
        },
        //公用Ajax数据请求
        commAjax: function (dv) {
            var _t = this,
                params = {paramJson: $.toJSON(dv.data)};
            common.loading.show();
            $.ajax({
                url: dv.path,
                type: "POST",
                data: params,
                dataType:"json",
                //time : 5000,
                success: function (data){
                    common.loading.hide();
                    dv.callBack(data);
                },
                error: function () {
                    common.loading.hide();
                    dv.errorCallBack();
                }
            });
        }
    };
    container.init(Obj);
};



/**
 *  <===============================================订单详情模块====================================================>
 */

//modules.orderDetails({
//    addElement:$('.wx-main-inner'),        //dome加载元素   $('.wx-main-inner')
//    orderType:2,                  //订单类型   (2-手术 3-门诊)
//    proOrderType:2,               //订单收费类型   (1-免费 2-收费)
//    operationOrderId:'',          //订单ID
//    initFunction:function(){
//        //初始化方法 （详情模块加载）
//    }
//});
