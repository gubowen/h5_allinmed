/**
 * @Desc：IM手术单
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/5/3.
 */
$(function () {
    var container = {
        op: {},
        path: {
            proOrderGetPath: "/mcall/customer/operation/order/v1/update/",           //手术单更新
            proOrderDetailPath: "/mcall/customer/operation/order/v1/getMapById/",    //互联网手术单详情获取
            proOrderCost: "/mcall/comm/setting/operation/v1/getMapById/",            //支付金额获取
            proOrderDetail: "/mcall/cms/pay/order/v1/getMapById/"                    //支付订单查询
        },
        init: function () {
            var _t = this;
            //common.backToReferrer(document.referrer);
            //Q.reg("procedure", function () {
            //    document.title = "手术单";
            //    $('.wx-main-content.surgeryOrder').show().siblings().hide();
            //    if ($('.wx-main-content.submitPublicOrder').length > 0) {
            //        $('.wx-main-content.submitPublicOrder').remove();
            //    }
            //    if ($('.wx-main-content.netSurgeryOrder').length > 0) {
            //        $('.wx-main-content.netSurgeryOrder').remove();
            //    }
            //});
            //Q.go('procedure');
            //Q.init({
            //    index: 'procedure'     /* 手术单首页地址 */
            //});
            _t.firstLoad();
        },
        template: {
            //手术单模板
            surgicalDrapeHtml: function (k) {
                var _htmlList = '',
                    _doctorRemark = '',
                    _htmlTotal = '';
                var _remark = $.trim(k.remark),                                //医生叮嘱
                    _operationName = k.operationMapList[0].operationName,       //手术名称
                    _fullName = k.authMapList[0] ? k.authMapList[0].fullName : '', //医师姓名
                    _illnessName = k.diagnosisMapList[0].illnessName;           //术前诊断
                if (_remark.length > 0) {
                    _doctorRemark += '<div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                        '     <span class="wx-surgical-commItemList-left wx-surgical-itemList">医生叮嘱</span>' +
                        '     <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _remark + '</span>' +
                        '</div>';
                }
                _htmlList += '<div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '     <span class="wx-surgical-commItemList-left wx-surgical-itemList">术前诊断</span>' +
                    '     <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _illnessName + '</span>' +
                    '</div>' +
                    '<div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '     <span class="wx-surgical-commItemList-left wx-surgical-itemList">手术名称</span>' +
                    '     <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _operationName + '</span>' +
                    '</div>' + _doctorRemark + '<div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '     <span class="wx-surgical-commItemList-left wx-surgical-itemList">手术医师</span>' +
                    '     <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _fullName + '</span>' +
                    '</div>';

                _htmlTotal += '<section class="wx-surgical-commBox procedureOrderSelect" data-operationType="' + k.operationType + '">' +
                    '       <div class="wx-surgical-commTitle">手术单</div>' +
                    '       <div class="wx-surgical-commCenter">' + _htmlList + '</div>' +
                    '</section>';
                return _htmlTotal;
            },
            compareHtml: function (v) {
                var _htmlTotal = '';
                _htmlTotal += ' <section class="wx-surgical-commBox wx-surgical-compareMain">' +
                    '<div class="wx-surgical-commTitle">手术对比</div>' +
                    '    <div class="wx-surgical-commCenter netHospital wx-surgical-commSelect">' +
                    '        <div class="wx-surgical-commItemBox wx-surgical-compare-itemBox">' +
                    '            <div class="wx-surgical-compare-titleBox">' +
                    '                <p class="wx-surgical-compare-title">' +
                    '                    <span class="wx-surgical-compare-logo"></span><span class="wx-surgical-compare-text">合作医院手术</span><span class="wx-surgical-compare-tips">推荐</span>' +
                    '                </p>' +
                    '            </div>' +
                    '            <ul class="wx-surgical-compare-listBox">' +
                    '                <li class="wx-surgical-compare-listItem">费用阳光</li>' +
                    '                <li class="wx-surgical-compare-listItem">床位充足</li>' +
                    '                <li class="wx-surgical-compare-listItem">快速安排手术</li>' +
                    '                <li class="wx-surgical-compare-listItem">医院就近安排，免奔波</li>' +
                    '                <li class="wx-surgical-compare-listItem">更优良的环境</li>' +
                    '            </ul>' +
                    '            <span class="wx-selectBtn-recommend"></span>' +
                    '        </div>' +
                    '    </div>' +
                    '    <div class="wx-surgical-commCenter publicHospital">' +
                    '        <div class="wx-surgical-commItemBox wx-surgical-compare-itemBox">' +
                    '            <div class="wx-surgical-compare-titleBox">' +
                    '                <p class="wx-surgical-compare-title">' +
                    '                    <span class="wx-surgical-compare-logo"></span><span class="wx-surgical-compare-text">公立医院手术</span>' +
                    '                </p>' +
                    '            </div>' +
                    '            <ul class="wx-surgical-compare-listBox">' +
                    '                <li class="wx-surgical-compare-listItem">费用高</li>' +
                    '                <li class="wx-surgical-compare-listItem">床位紧张</li>' +
                    '                <li class="wx-surgical-compare-listItem">手术安排速度较慢</li>' +
                    '                <li class="wx-surgical-compare-listItem">无选择手术医院权利</li>' +
                    '                <li class="wx-surgical-compare-listItem">环境一般</li>' +
                    '            </ul>' +
                    '            <span class="wx-selectBtn-recommend"></span>' +
                    '        </div>' +
                    '    </div>' +
                    '    </section>' +
                    '    <section class="wx-surgical-commOrderBtnBox">'+
                    '        <button class="wx-surgical-orderBtn">预约</button>'+
                    '    </section>'+
                    '    <section class="wx-surgical-commBottomTips">'+
                    '        <p class="surgical-bottomTextBox"><span class="surgical-bottomText">什么是合作医院手术</span></p>'+
                    '        <section class="wx-surgical-commTipsMain">'+
                    '            <section class="wx-surgical-commExplainBox"></section>'+
                    '            <section class="wx-surgical-commExplainCenter">'+
                    '                <section class="wx-surgical-commTipsBox">'+
                    '                    <p class="wx-surgical-commExplain-title">合作医院手术</p>'+
                    '                    <p class="wx-surgical-commExplain-content">合作医院手术是便捷高效，有利于患者的一种手术方式，医生打破传统手术方式，在同样高水准医生，高水准团队的情况下，患者可以选择就近地点进行手术，避免舟车劳顿，不再求人找医生并可享受更优惠手术价格</p>'+
                    '                    <span class="wx-surgical-commTipsCloseBtn"></span>'+
                    '                </section>'+
                    '            </section>'+
                    '        </section>'+
                    '    </section>';
                return _htmlTotal;
            },
            //公里医院预约
            publicOrderHtml: function (dataList) {
                var _html = '',
                    _htmlList = '',
                    _timesList = '',
                    _cureTime = '',
                    _cureArea = '',
                    _customerId = dataList.customerId,              //医生ID
                    _doctorName = dataList.authMapList[0] ? dataList.authMapList[0].fullName : "", //医生姓名
                    _patientId = dataList.patientId,                //患者ID
                    _operationOrderId = dataList.operationOrderId,  //手术单ID
                    _hospitalId = '',                               //医院ID
                    _hospitalName = '',                             //医院名称
                    _hospitalAddress = '';                          //医院地址
                //公立医院手术单
                if (dataList.operationType == "2") {
                    _hospitalId = dataList.hospitalMapList[0].hospitalId;
                    _hospitalName = dataList.hospitalMapList[0].hospitalName;
                    _cureTime = dataList.hospitalMapList[0].operationTime;
                    _hospitalAddress = dataList.hospitalMapList[0].hospitalAddress;
                } else {
                    _hospitalId = dataList.authMapList[0] ? dataList.authMapList[0].companyId : '';
                    _hospitalName = dataList.authMapList[0] ? dataList.authMapList[0].company : '';
                    _hospitalAddress = dataList.authMapList[0] ? dataList.authMapList[0].companyAddress : '';
                    _cureTime = '';
                }
                if (_hospitalAddress.length > 0) {
                    _cureArea += '<ul class="wx-baseItemBox"><li class="wx-baseListLeft">就诊地点</li>' +
                        ' <li class="wx-baseListRight">' + _hospitalAddress + '</li></ul>';
                }
                _timesList = (_cureTime.length > 0) ? orderTimeDeals(_cureTime) : "待定（入院前3天通知）";
                _html += '<section class="wx-main-content no-marginTop submitPublicOrder" data-customerId="' + _customerId + '" data-patientId="' + _patientId + '" data-operationOrderId="' + _operationOrderId + '" data-hospitalId="' + _hospitalId + '" data-hospitalName="' + _hospitalName + '" data-operationType="' + dataList.operationType + '" data-operationTime="' + _cureTime + '">' +
                    '        <section class="wx-orderComm-baseBox">' +
                    '            <ul class="wx-baseItemBox">' +
                    '                <li class="wx-baseListLeft">医生姓名</li>' +
                    '                <li class="wx-baseListRight">' + _doctorName + '</li>' +
                    '            </ul>' +
                    '            <ul class="wx-baseItemBox">' +
                    '                <li class="wx-baseListLeft">订单类型</li>' +
                    '                <li class="wx-baseListRight">公立医院手术</li>' +
                    '            </ul>' +
                    '            <ul class="wx-baseItemBox">' +
                    '                <li class="wx-baseListLeft">手术时间</li>' +
                    '                <li class="wx-baseListRight">' +
                    (_cureTime.length > 0 ? '<span class="wx-baseSurgicalTime">' + _timesList.years + '</span><span class="wx-baseSurgicalWeek">' + _timesList.week + '</span><span class="wx-baseSurgicalDate">' + _timesList.hour + '</span>' : '<span class="wx-baseSurgicalTime">' + _timesList + '</span>') +
                    '                </li>' +
                    '            </ul>' +
                    '            <ul class="wx-baseItemBox">' +
                    '                <li class="wx-baseListLeft">就诊医院</li>' +
                    '                <li class="wx-baseListRight">' + _hospitalName + '</li>' +
                    '            </ul>' + _cureArea + '</section>' +
                    '        <!--隔行灰底-->' +
                    '        <section class="wx-orderComm-baseLine"></section>' +
                    '        <section class="wx-public-hospital">' +
                    '            <p class="wx-public-hospitalLeft">注：</p>' +
                    '            <p class="wx-public-hospitalRight">预约成功后，请耐心等待医生的入院通知并注意接收' +
                    '                短信及电话。如病情严重或急需手术的者，请速往医' +
                    '                院治疗，勿拖延时间。</p>' +
                    '        </section>' +
                    '        <section class="wx-comm-bottomBtn">' +
                    '            <!--<button class="wx-comm-bottomBtnLeft">-->' +
                    '                <!--<span class="wx-needPay">需支付</span><span class="wx-payTotal"><span class="wx-payMark">￥</span>10,000.00</span>-->' +
                    '            <!--</button>-->' +
                    '            <!--<button class="wx-comm-bottomBtnRight wx-goPay">去支付</button>-->' +
                    '            <button class="wx-comm-bottomBtnOver">提交预约</button>' +
                    '        </section>' +
                    '    </section>';
                return _html;
            },
            publicOrderSuccessHtml: function (pov) {
                return '<section class="wx-main-content no-marginTop publicOrderSubmitSuccess">' +
                    '        <section class="wx-appointment-submitMain">' +
                    '            <div class="wx-submit-successLogo">' +
                    '                <span></span>' +
                    '            </div>' +
                    '            <p class="wx-submit-successText">手术预约提交成功</p>' +
                    '            <p class="wx-submit-successContent">' +
                    '                请耐心等待医生通知住院时间，公立医院床位紧缺，如病情严重，请速往医院救诊。' +
                    '            </p>' +
                    //'            <p class="wx-waitInform">请耐心等待通知</p>'+
                    '            <div class="wx-continueConsult">' +
                    '                <p class="wx-goContinueConsult" data-caseId="' + pov.caseId + '" data-customerId="' + pov.customerId + '"><span class="wx-continueConsult-text">继续咨询<span class="wx-continueConsult-right"></span></span></p>' +
                    '            </div>' +
                    '            <div class="wx-continueConsult">' +
                    '                <p class="wx-viewPublicOrder" data-orderId="' + pov.orderId + '"><span class="wx-continueConsult-text">查看订单<span class="wx-continueConsult-right"></span></span></p>' +
                    '            </div>' +
                    '        </section>' +
                    '    </section>';
            },
            //互联网医院预约
            netOrderHtml: function (list) {
                var _t = this,
                    _htmlList = '',
                    _htmlList2 = '',
                    _htmlList3Item = '',
                    _doctorRemark = '',
                    _htmlTotal = '';
                var _doctorName = list.authMapList[0] ? list.authMapList[0].fullName : "",      //医生姓名
                    _customerId = list.customerId,                                            //医生ID
                    _patientId = list.patientId,                                              //患者ID
                    _aidesStatus = parseInt(list.aidesStatus),                                //医师助手标志 1-待定2-选择已有助手',
                    _aidesMapList = list.aidesMapList,                                         //医师助手列表
                    _aidesMapNameList = '',                                                    //医师助手拼接
                    _metachysisStatus = parseInt(list.metachysisStatus),                         //输血助手标志 1-待定2-选择已有医师3-不需要',
                    _metachysisMapList = list.metachysisMapList,                                 //输血助手列表
                    _metachysisMapNameList = '',                                                       //输血助手拼接
                    _isAnaesthesia = parseInt(list.isAnaesthesia),                               //麻醉        1-待定2-半麻3-局麻4-全麻',
                    _isQuarantine = parseInt(list.isQuarantine),                                 //隔离        0-正常1-隔离',
                    _duration = list.duration,                                                   //手术持续时间
                    _operationNum = list.operationNum,                                           //当天台次
                    _isEmergency = parseInt(list.isEmergency),                                   //紧急程度     0-不急1-急',
                    _remark = list.remark,                                                       //医生叮嘱
                    _diagnosisMapList = list.diagnosisMapList[0] ? list.diagnosisMapList[0] : '',    //诊断列表
                    _operationName = list.operationMapList[0] ? list.operationMapList[0].operationName : "",         //手术名称
                    _operationId = _diagnosisMapList.operationId,                                //手术ID
                    _illnessName = _diagnosisMapList.illnessName ? _diagnosisMapList.illnessName : "",               //疾病名称
                    _illnessId = _diagnosisMapList.illnessId,                                    //疾病ID
                    _hospitalMapList = list.hospitalMapList ? list.hospitalMapList : '';             //医院列表
                if (_aidesStatus == 2) {
                    $.each(_aidesMapList, function (i, val) {
                        _aidesMapNameList += '<span class="wx-netOrderNameList">' + val.aidesName + '</span>'
                    });
                }
                if (_metachysisStatus == 2) {
                    $.each(_metachysisMapList, function (i, val) {
                        _metachysisMapNameList += '<span class="wx-netOrderNameList">' + val.aidesName + '</span>'
                    });
                }
                if (_remark.length > 0) {
                    _doctorRemark += ' <div class="wx-surgical-commItemBox wx-surgical-itemBox"><span class="wx-surgical-commItemList-left wx-surgical-itemList">医生叮嘱</span>' +
                        '<span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _remark + '</span></div>';
                }
                //诊断列表
                _htmlList2 += ' <section class="wx-surgical-commBox wx-surgical-aboutNet">' +
                    '            <div class="wx-surgical-commCenter">' +
                    '                <div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-surgical-itemList">术前诊断</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _illnessName + '</span>' +
                    '                </div>' +
                    '                <div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-surgical-itemList">手术名称</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _operationName + '</span>' +
                    '                </div>' + _doctorRemark + '</div>' +
                    '        </section>';
                //手术列表
                _htmlList += '<section class="wx-surgical-commBox wx-surgical-aboutNet">' +
                    '            <div class="wx-surgical-commCenter">' +
                    '                <div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-surgical-itemList">手术医师</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _doctorName + '</span>' +
                    '                </div>' +
                    '                <div class="wx-surgical-commItemBox wx-multiLine-textBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-multiLine-textLeft wx-surgical-itemList">手术医助</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-multiLine-textRight wx-surgical-itemList">' + (_aidesStatus == 1 ? "待定" : _aidesMapNameList) + '</span>' +
                    '                </div>' +
                    '                <div class="wx-surgical-commItemBox wx-multiLine-textBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-multiLine-textLeft wx-surgical-itemList">输血医助</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-multiLine-textRight wx-surgical-itemList">' + (_metachysisStatus == 1 ? "待定" : (_metachysisStatus == 2 ? _metachysisMapNameList : "不需要")) + '</span>' +
                    '                </div>' +
                    '                <div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-surgical-itemList">麻醉方法</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + (_isAnaesthesia == 1 ? "待定" : (_isAnaesthesia == 2 ? "半麻" : (_isAnaesthesia == 3 ? "局麻" : "全麻"))) + '</span>' +
                    '                </div>' +
                    '                <div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-surgical-itemList">隔离标志</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + (_isQuarantine == 0 ? "正常" : "隔离" ) + '</span>' +
                    '                </div>' +
                    '                <div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-surgical-itemList">预计手术持续时间</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _duration + '</span>' +
                    '                </div>' +
                    '                <div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-surgical-itemList">台次</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + _operationNum + '</span>' +
                    '                </div>' +
                    '                <div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                    '                    <span class="wx-surgical-commItemList-left wx-surgical-itemList">紧急程度</span>' +
                    '                    <span class="wx-surgical-commItemList-right wx-surgical-itemList">' + (_isEmergency == 0 ? "不急" : "急") + '</span>' +
                    '                </div>' +
                    '</div>' +
                    '        </section>';

                //就诊医院列表
                $.each(_hospitalMapList, function (i, val) {
                    var _hospitalAddress = (val.hospitalAddress.length > 0) ? val.hospitalAddress : '';
                    _htmlList3Item += '<div class="wx-surgical-commItemBox wx-hospitalInfo-itemBox netOrderSelectList" data-hospitalName="' + val.hospitalName + '" data-hospitalAddress="' + _hospitalAddress + '" data-hospitalId="' + val.hospitalId + '" data-operationTime="' + val.operationTime + '" >' +
                        '     <span class="wx-commHospitalBtn-right "><span class="wx-commHospitalBtn-left"></span>' + val.hospitalName + '</span>' +
                        '</div>';
                });
                _htmlTotal += ' <section class="wx-surgical-commBox wx-net-selectHospital">' +
                    '            <div class="wx-surgical-commTitle">选择就诊医院</div>' +
                    '            <div class="wx-surgical-commCenter">' + _htmlList3Item + '</div>' +
                    '            <div class="netOrderCureArea">' +
                    '                <div class="wx-surgical-commTitle wx-surgical-commArea">就诊地点</div>' +
                    '                <div class="wx-surgical-commCenter surgical-commAreaBox">' +
                    '                <div class="wx-surgical-commItemBox surgical-commAreaBoxItem">' +
                    '                    <span class="wx-commHospitalBtn-right wx-commAreaLogo-right"><span class="wx-commHospitalBtn-left"></span><span class="wx-surgical-address"></span></span>' +
                    '                </div>' +
                    '                </div>' +
                    '            </div>' +
                    '            <div class="netOrderCureTime">' +
                    '                <div class="wx-surgical-commTitle wx-surgical-commTime">手术时间</div>' +
                    '                <div class="wx-surgical-commCenter">' +
                    '                <div class="wx-surgical-commItemBox wx-hospitalInfo-itemBox surgical-timeBox">' +
                    '                    <span class="wx-commHospitalBtn-right wx-commTimeLogo-right"><span class="wx-commHospitalBtn-left"></span>' +
                    '                    <span class="surgical-timeWait">待定</span>' +
                    '                    <span class="wx-surgical-timesYear"></span><span class="wx-surgical-timeTips"></span><span class="wx-surgical-timeSeconds"></span></span>' +
                    '                </div>' +
                    '                 </div>' +
                    '            </div>' +
                    '        </section>';

                //提示列表
                var _tipHtml = '<section class="wx-surgical-commBox wx-surgical-mainBox">' +
                    '            <div class="wx-surgical-commTitle wx-see-instructions">就诊须知</div>' +
                    '            <div class="wx-surgical-commCenter">' +
                    '               <p class="surgical-instructions-close">取消订单规则：</p>' +
                    '                <ul class="surgical-closeRolesBox">' +
                    '                    <li class="surgical-rolesItemLeft">接受住院手术安排前取消</li>' +
                    '                    <li class="surgical-rolesItemRight">收取<span class="order-costPercent">5%</span>手续费</li>' +
                    '                    <li class="surgical-rolesItemLeft">接受住院手术安排后爽约</li>' +
                    '                    <li class="surgical-rolesItemRight">收取<span class="order-costPercent">10%</span>手续费</li>' +
                    '                </ul>' +
                    '                <p class="surgical-instructions-close">温馨提示：</p>' +
                    '                <ul class="surgical-closeRolesBox">' +
                    '                    <li class="surgical-hootTips">' +
                    '                        <span class="surgical-hootTips-number">1.</span>' +
                    '                        <p class="surgical-hootTips-text">手术订单支付成功后，待唯医互联网医院核实，等待医院安排床位。</p>' +
                    '                    </li>' +
                    '                    <li class="surgical-hootTips">' +
                    '                        <span class="surgical-hootTips-number">2.</span>' +
                    '                        <p class="surgical-hootTips-text">手术订单支付成功后，等待医院安排床位，如住院有床位，会给您发送短信及系统通知住院手术。</p>' +
                    '                    </li>' +
                    '                </ul>' +
                    '            </div>' +
                    '        </section>' +
                    '        <section class="wx-surgical-commSubmitBox">' +
                    '            <button class="wx-surgical-commSubmitBtn netOrderSubmitBtn">提交订单</button>' +
                    '        </section>';

                return ' <section class="wx-main-content netSurgeryOrder" data-customerId="' + _customerId + '" data-patientId="' + _patientId + '" data-doctorname="' + _doctorName + '" data-operationType="' + list.operationType + '" data-reservationStatus="' + list.reservationStatus + '">' + _htmlList2 + _htmlList + _htmlTotal + _tipHtml + '</section>'
            },
            newListItemHtml: function (dataList) {
                var _htmlListItem = '',
                    _htmlList = '';
                $.each(dataList, function (i, val) {
                    _htmlListItem += '<div class="wx-surgical-commItemBox wx-surgical-itemBox">' +
                        '      <span class="wx-surgical-commItemList-left wx-surgical-itemList">疾病诊断</span>' +
                        '      <span class="wx-surgical-commItemList-right wx-surgical-itemList">骨头坏死</span>' +
                        '</div>';
                });
                _htmlList += '<section class="wx-surgical-commBox wx-surgical-aboutNet">' +
                    '            <div class="wx-surgical-commCenter">' + _htmlListItem + '</div>' +
                    '        </section>';
                return _htmlList;
            },
            reviewOrderHtml: function (rov) {
                var _htmlList = '',
                    _amount = (rov.orderCost > 0) ? common.formatMoney(rov.orderCost, 2) : "",
                    _timesList = (rov.cureTime.length > 0) ? orderTimeDeals(rov.cureTime) : "待定（入院前3天通知）";
                _htmlList += '<section class="wx-orderComm-baseBox">' +
                    '            <ul class="wx-baseItemBox">' +
                    '                <li class="wx-baseListLeft">医生姓名</li>' +
                    '                <li class="wx-baseListRight">' + rov.doctorName + '</li>' +
                    '            </ul>' +
                    '            <ul class="wx-baseItemBox">' +
                    '                <li class="wx-baseListLeft">订单类型</li>' +
                    '                <li class="wx-baseListRight">' + rov.orderType + '</li>' +
                    '            </ul>' +
                    '            <ul class="wx-baseItemBox">' +
                    '                <li class="wx-baseListLeft">就诊医院</li>' +
                    '                <li class="wx-baseListRight">' + rov.cureHospital + '</li>' +
                    '            </ul>' +
                    '            <ul class="wx-baseItemBox">' +
                    '                <li class="wx-baseListLeft">手术时间</li>' +
                    '                <li class="wx-baseListRight">' +
                    (rov.cureTime.length > 0 ? '<span class="wx-baseSurgicalTime">' + _timesList.years + '</span><span class="wx-baseSurgicalWeek">' + _timesList.week + '</span><span class="wx-baseSurgicalDate">' + _timesList.hour + '</span>' : '<span class="wx-baseSurgicalTime">' + _timesList + '</span>') +
                    '                </li>' +
                    '            </ul>' +
                    '            <ul class="wx-baseItemBox">' +
                    '                <li class="wx-baseListLeft">订单金额</li>' +
                    '                <li class="wx-baseListRight">' +
                    '                    <span class="wx-payTotal"><span class="wx-payMark">￥</span>' + _amount + '</span>' +
                    '                </li>' +
                    '            </ul>' +
                    '        </section>' +
                    '        <section class="wx-comm-bottomBtn">' +
                    '            <button class="wx-comm-bottomBtnLeft">' +
                    '                <span class="wx-needPay">需支付</span><span class="wx-payTotal"><span class="wx-payMark">￥</span>' + _amount + '</span>' +
                    '            </button>' +
                    '            <button class="wx-comm-bottomBtnRight wx-procedureGoPay">去支付</button>' +
                    '        </section>';
                return '<section class="wx-main-content no-marginTop reviewNetOrder">' + _htmlList + '</section>';
            }
        },
        firstLoad: function () {
            var _t = this,
                _param = common.getpara();
            //common.date.local_time();
            _t.op.caseId = _param.caseId;                          //caseID  "1493697450391"
            _t.op.patientId = _param.patientId;                    //患者ID  ""
            _t.op.patientCustomerId = _param.patientCustomerId;    //患者所属用户ID  "1489998682602"
            _t.op.operationOrderId = _param.operationOrderId;      //手术单ID  "1493777047483"
            _t.op.doctorCustomerId = _param.doctorCustomerId;      //医生ID  "1495762174307"

            _t.orderDetailInfo({
                operationOrderId: _t.op.operationOrderId,	    //string	是	手术单id	1489545287440
                caseId: _t.op.caseId,	                        //string	是	病历单id
                infoBack: function (_dataList) {
                    if (_dataList.length > 0) {
                        if (_dataList[0].operationType == "1") {
                            _t.op._public = 1;  //互联网手术
                        } else {
                            _t.op._public = 2;  //公立医院手术
                        }
                        _t.checkIsCreateOrder({
                            orderSourceType:_t.op._public,
                            callBack:function(data){
                                console.log(data);

                                if(data && parseInt(data.status) !== 1){
                                    //已支付订单 => 订单详情
                                    var _orderId = data.orderId; //订单ID
                                    if(parseInt(data.orderSourceType) == 2){
                                        _t.publicEventCenter.publicOrderDetail({
                                            isOrdered:1,            //是否预约过 0-未预约 1-预约过
                                            orderId:_orderId,
                                            patientCustomerId: _t.op.patientCustomerId,
                                            patientId: _t.op.patientId
                                        })
                                    }else{
                                        _t.netEventCenter.netOrderDetails({
                                            isOrdered:1,       //0-未预约过 1-预约过
                                            orderId: _orderId,
                                            patientCustomerId: _t.op.patientCustomerId,
                                            patientId: _t.op.patientId
                                        });   //支付成功 => 订单详情
                                    }
                                }else{
                                    //未支付订单 => 手术单
                                    Q.reg("procedure", function () {
                                        document.title = "手术单";
                                        $('.wx-main-content.surgeryOrder').show().siblings().hide();
                                        if ($('.wx-main-content.submitPublicOrder').length > 0) {
                                            $('.wx-main-content.submitPublicOrder').remove();
                                        }
                                        if ($('.wx-main-content.netSurgeryOrder').length > 0) {
                                            $('.wx-main-content.netSurgeryOrder').remove();
                                        }
                                        $('.wx-main-content.surgeryOrder').html(_t.template.surgicalDrapeHtml(_dataList[0]) + _t.template.compareHtml(_dataList[0]));
                                        _t.hospitalTypeLoad();
                                    });
                                    Q.go('procedure');
                                    Q.init({
                                        index: 'procedure'     /* 手术单首页地址 */
                                    });
                                    //$('.wx-main-content.surgeryOrder').html(_t.template.surgicalDrapeHtml(_dataList[0]) + _t.template.compareHtml(_dataList[0]));
                                    //_t.hospitalTypeLoad();
                                }
                            }
                        });

                    }
                }
            });
            this.publicEventCenter.linkToIm();
            this.netEventCenter.linkToIm();
        },
        //是否创建过支付订单
        checkIsCreateOrder:function(cv){
            var _t = this,
                _data={
                    "patientId":_t.op.patientId,            //患者ID
                    "orderType":2,                          //订单类型    2-手术 3-门诊
                    "orderSourceId":_t.op.operationOrderId, //手术单ID
                    "orderSourceType":cv.orderSourceType,   //来源类型    手术：1-互联网  2-公立
                    "sortType":2,
                    "maxResult":1
                };
            _t.commAjax({
                data:_data,
                path:_t.path.proOrderDetail,
                callBack:function(data){
                    if(data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList){
                        cv.callBack(data.responseObject.responseData.dataList[0]);
                    }else {
                        cv.callBack();
                    }
                },
                errorCallBack:function(){
                    common.popup({text:'数据错误'})
                }
            })
        },
        //手术单详情获取
        orderDetailInfo: function (info) {
            var _t = this;
            _t.commAjax({
                data: {
                    operationOrderId: _t.op.operationOrderId,	    //string	是	手术单id	1489545287440
                    caseId: _t.op.caseId,	                   //string	是	病历单id
                    isValid: "1",	                        //	string	是	是否有效
                    firstResult: "0",	                    //	string	是
                    maxResult: "9999"	                    //	string	是
                },
                path: _t.path.proOrderDetailPath,
                callBack: function (data) {
                    if (data && data.responseObject && data.responseObject.responseData && data.responseObject.responseData.dataList) {
                        var _dataList = data.responseObject.responseData.dataList;
                        info.infoBack(_dataList);
                    }
                },
                errorCallBack: function (data) {

                }
            });
        },
        //医院类型选择
        hospitalTypeLoad: function () {
            var _t = this;
            if (_t.op._public == 2) {
                //公立医院
                $('.wx-surgical-commOrderBtnBox').find('.wx-surgical-orderBtn').attr("disabled", "disabled"); //预约按钮禁止
                $('.wx-surgical-commCenter.netHospital').addClass('wx-surgical-not-recommend').removeClass('wx-surgical-commSelect').siblings().on("click", function () {
                    $(this).toggleClass('wx-surgical-commSelect');
                    if ($(this).hasClass('wx-surgical-commSelect')) {
                        $('.wx-surgical-commOrderBtnBox').find('.wx-surgical-orderBtn').addClass('wx-orderSelected').removeAttr("disabled"); //预约按钮激活
                    } else {
                        $('.wx-surgical-commOrderBtnBox').find('.wx-surgical-orderBtn').removeClass('wx-orderSelected').attr("disabled", "disabled"); //预约按钮禁止
                    }
                })
            } else {
                $('.wx-surgical-commOrderBtnBox').find('.wx-surgical-orderBtn').addClass('wx-orderSelected').removeAttr("disabled").text("预约并支付"); //预约按钮激活
                //医院类型选择
                $('.wx-surgical-commCenter').on("click", function () {
                    $(this).addClass('wx-surgical-commSelect').siblings().removeClass('wx-surgical-commSelect');
                    if ($(this).hasClass('publicHospital')) {
                        _t.op._public = 2;
                        $(this).parent().siblings('.wx-surgical-commOrderBtnBox').find('.wx-surgical-orderBtn').text("预约"); //预约按钮
                    } else {
                        _t.op._public = 1;
                        $(this).parent().siblings('.wx-surgical-commOrderBtnBox').find('.wx-surgical-orderBtn').text("预约并支付"); //预约按钮
                    }
                })
            }
            //弹层
            $('.wx-surgical-commBottomTips .surgical-bottomTextBox').on("click", function () {
                $(this).siblings().show();
            });
            //关闭按钮
            $('.wx-surgical-commBottomTips .wx-surgical-commTipsMain').find('.wx-surgical-commTipsCloseBtn').on("click", function () {
                $(this).closest('.wx-surgical-commTipsMain').hide();
            });
            //预约按钮
            $('.wx-surgical-orderBtn').on("click", function () {
                switch (_t.op._public) {
                    case 2:
                        Q.go("publicHospital");
                        Q.reg("publicHospital", function () {
                            console.log("公立医院预约");
                            document.title = "公立医院手术";
                            //预约成功模块
                            if ($('.wx-main-content.publicOrderSubmitSuccess').length > 0) {
                                $('.wx-main-content.publicOrderSubmitSuccess').remove();
                            }
                            //公立医院预约模块
                            if ($('.wx-main-content.submitPublicOrder').length > 0) {
                                $('.wx-main-content.submitPublicOrder').show();
                            }
                        });
                        _t.publicHospitalLoad();
                        break;
                    case 1:
                        Q.go("netHospital");
                        Q.reg("netHospital", function () {
                            console.log("合作医院手术单");
                            $(window).scrollTop(0);
                            document.title = "合作医院手术单";
                            if ($('.wx-main-content.netSurgeryOrder').length > 0) {
                                $('.wx-main-content.netSurgeryOrder').show();
                            }
                            if ($('.wx-main-content.orderDetails').length > 0) {
                                $('.wx-main-content.orderDetails').remove();
                            }
                            if ($('.wx-main-content.reviewNetOrder').length > 0) {
                                $('.wx-main-content.reviewNetOrder').remove();
                            }
                        });
                        _t.netHospitalLoad();
                        break;
                }
            });
        },
        //公立医院预约模块
        publicHospitalLoad: function () {
            var _t = this;
            _t.orderDetailInfo({
                operationOrderId: _t.op.operationOrderId,	    //string	是	手术单id	1489545287440
                caseId: _t.op.caseId,	                        //string	是	病历单id
                infoBack: function (_dataList) {
                    if (_dataList.length > 0) {
                        $('.wx-main-inner').append(_t.template.publicOrderHtml(_dataList[0])).find('.submitPublicOrder').siblings().hide();
                        _t.publicEventCenter.init(_t);
                    }
                }
            });
        },
        publicEventCenter: {
            op: {},
            init: function (_t) {
                var _this = this;
                _this.op.tmpl = _t;
                console.log(_t);
                _this.submitPublicOrder();
            },
            XHRList:{
                getToken: "/mcall/im/interact/v1/refreshToken/"
            },
            submitPublicOrder: function () {
                var _this = this;
                $('.wx-main-content.submitPublicOrder').find('.wx-comm-bottomBtn').on("click", function () {
                    var _hospitalId = $('.wx-main-content.submitPublicOrder').data("hospitalid"),
                        _hospitalName = $('.wx-main-content.submitPublicOrder').data("hospitalname"),
                        _orderType = $('.wx-main-content.submitPublicOrder').data("operationtype"),
                        _operationTime = $('.wx-main-content.submitPublicOrder').data("operationtime");
                    var _data = {
                        operationOrderId: _this.op.tmpl.op.operationOrderId,  //	string	是	手术预约单id
                        operationType: 2,                          //	string	否	手术类型1-互联网手术2-公立医院
                        hospitalId: _hospitalId,                   //	string	是	医院id
                        hospitalName: _hospitalName,               //	string	是	医院名称
                        //reservationStatus: 3,                       //	string	是	预约状态1-待患者确认2-互联网医院3-公立医院4-已完成
                        orderStatus: 3                            //	string	是	没时间 传4  有时间 3
                    };
                    if (_operationTime.length > 0) {
                        _data.orderStatus = 3;                            //	string	是	没时间 传4  有时间 3
                    } else {
                        _data.orderStatus = 4;
                    }
                    if (_orderType == 2) {
                        //_operationTime = $('.wx-surgical-commCenter.publicHospital').data("operationtime");
                        if (_operationTime.length > 0) {
                            _data.operationTime = $('.wx-main-content.submitPublicOrder').data("operationtime");
                        }
                    }
                    //提交手术单
                    _this.op.tmpl.commAjax({
                        data: _data,
                        path: _this.op.tmpl.path.proOrderGetPath,
                        callBack: function (data) {
                            if (data && data.responseObject && data.responseObject.responseStatus) {
                                _this.publicCreateOrder();
                                _this.linkMessageToSend();
                            } else {
                                common.popup({text: "提交预约失败"})
                            }
                        },
                        errorCallBack: function () {
                            common.popup({
                                text: "提交预约失败"
                            })
                        }
                    });

                })
            },
            //公立医院创建订单
            publicCreateOrder: function () {
                var _this = this;
                var data = {
                    caseId: _this.op.tmpl.op.caseId,
                    patientCustomerId: _this.op.tmpl.op.patientCustomerId, //	string	是	患者所属用户id
                    patientId: $('.wx-main-content.submitPublicOrder').data("patientid"),         // 	string	是	患者id
                    doctorId: $('.wx-main-content.submitPublicOrder').data("customerid"),          //	string	是	医生id
                    orderType: '2',                            //	string	是	订单类型1-咨询2-手术3-门诊预约
                    orderSourceId: $('.wx-main-content.submitPublicOrder').data("operationorderid"),     //	string	是	来源id，对应咨询id,手术单id，门诊预约id
                    orderSourceType: '2',                     //	string	是	来源类型 1-普通2-特需3-加急|手术：1-互联网2-公立|门诊1-普通2-专家3-特需
                    reservationStatus: '3',                       //	string	是	预约状态1-待患者确认2-互联网医院3-公立医院4-已完成
                    status: '2',                              //	string	是	订单状态1-待支付2-已支付3-已完成4-已取消5-退款中
                    isCharge: "false"                         //  string  是  true-收费  false-免费
                };
                modules.createOrders({
                    data: data,        //data为Object
                    backCreateSuccess: function (_data) {
                        //创建订单成功
                        Q.go("publicSubmitSuccess");
                        Q.reg("publicSubmitSuccess", function () {
                            document.title = "预约提交成功";
                            if ($('.wx-main-inner').find('.wx-main-content.publicOrderSubmitSuccess').length > 0) {
                                $('.wx-main-inner').find('.wx-main-content.publicOrderSubmitSuccess').show();
                            }
                            //订单详情模块
                            if ($('.wx-main-inner').find('.wx-main-content.publicOrderDetails').length > 0) {
                                $('.wx-main-inner').find('.wx-main-content.publicOrderDetails').remove();
                            }
                        });
                        $('.wx-main-inner').append(_this.op.tmpl.template.publicOrderSuccessHtml({
                            caseId: _this.op.tmpl.op.caseId,                                                     //caseID
                            customerId: $('.wx-main-content.submitPublicOrder').data("customerid"),              //医生ID
                            orderId: _data,                                                                      //订单ID
                            operationOrderId: $('.wx-main-content.submitPublicOrder').data("operationorderid")   //手术单ID
                        })).find('.publicOrderSubmitSuccess').siblings().hide();
                        _this.publicOrderClick();
                    },
                    backCreateError: function (_data) {
                        //创建订单失败  (必选)
                        common.popup({
                            text: "订单失败！"
                        })
                    }
                });
            },
            publicOrderClick: function () {
                //继续咨询
                var _this = this;
                $('.publicOrderSubmitSuccess .wx-goContinueConsult').on("click", function () {
                    var _caseId = $(this).data("caseid"),
                        _customerId = $(this).data("customerid");
                    window.location.href = '/pages/imScene/im_main_scene_doctor.html?caseId=' + _caseId + '&doctorCustomerId=' + _customerId + '&patientCustomerId=' + _this.op.tmpl.op.patientCustomerId + '&patientId=' + _this.op.tmpl.op.patientId;
                });
                //查看公立医院订单详情
                $('.publicOrderSubmitSuccess .wx-viewPublicOrder').on("click", function () {
                    _this.publicOrderDetail({
                        isOrdered:0,         //0-未预约 1-预约过
                        orderId:$(this).data("orderid"),
                        patientCustomerId: _this.op.tmpl.op.patientCustomerId,
                        patientId: _this.op.tmpl.op.patientId
                    });
                    //Q.go("publicDetail");
                    //Q.reg("publicDetail", function () {
                    //    document.title = "订单详情";
                    //});
                    //var _orderId = $(this).data("orderid");
                    //modules.orderDetails({
                    //    addElement: $('.wx-main-inner'), //dome加载元素   $('.wx-main-inner')
                    //    orderType: 2,                    //订单类型   (2-手术 3-门诊)
                    //    proOrderType: 1,                 //订单收费类型   (1-免费 2-收费)
                    //    orderId: _orderId,               //订单ID
                    //    patientCustomerId: _this.op.tmpl.op.patientCustomerId,
                    //    patientId: _this.op.tmpl.op.patientId,
                    //    initFunction: function () {
                    //        //初始化方法
                    //        $('.wx-main-inner').find('.wx-main-content.publicOrderDetails').siblings().hide();
                    //    },
                    //    backFunction: function () {
                    //        //支付回调
                    //    }
                    //});
                });
            },
            publicOrderDetail:function(dv){
                Q.go("publicDetail");
                Q.reg("publicDetail", function () {
                    document.title = "订单详情";
                });
                if(dv.isOrdered ==1){
                    Q.init({
                        index: 'publicDetail'     /* 手术单首页地址 */
                    });
                }
                modules.orderDetails({
                    addElement: $('.wx-main-inner'), //dome加载元素   $('.wx-main-inner')
                    orderType: 2,                    //订单类型   (2-手术 3-门诊)
                    proOrderType: 1,                 //订单收费类型   (1-免费 2-收费)
                    orderId: dv.orderId,               //订单ID
                    patientCustomerId: dv.patientCustomerId,
                    patientId: dv.patientId,
                    initFunction: function () {
                        //初始化方法
                        $('.wx-main-inner').find('.wx-main-content.publicOrderDetails').siblings().hide();
                    },
                    backFunction: function () {
                        //支付回调
                    }
                });
            },
            //Im联通...
            linkToIm: function () {
                var that = this;
                $.ajax({
                    url: that.XHRList.getToken,
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
                            that.nim = NIM.getInstance({
                                appKey: '50c93d2ab7e207fd83231a245c07bfbc',
                                account: "0_" + common.getpara().caseId,
                                token: data.responseObject.responseData.token,
                                onconnect: function (data) {
                                    console.log('连接成功');

                                },
                            });
                        }
                    });
            },
            //    IM联通...发送透传信息
            linkMessageToSend: function () {
                var that = this;
                this.nim.sendCustomMsg({
                    scene: 'p2p',
                    to: "2_" + common.getpara().doctorCustomerId,
                    needPushNick: false,
                    pushContent: "患者<" + controller.userData.nick + ">向您咨询，点击查看详情",
                    pushPayload: JSON.stringify({
                        "account": "0_" + common.getpara().caseId,
                        "type": "1"
                    }),
                    content: JSON.stringify({
                        type: "penetrateMessage",
                        data: {
                            actionType: "3",
                            actionDict: {
                                resourceID: common.getpara().operationOrderId,
                                resourceType: that.op.tmpl.op._public
                            }
                        }
                    }),
                    done: function (error, msg) {
                        if (!error) {
                            console.log("发送通知...")
                        }
                    }
                });
            }
        },
        //互联网医院模块
        netHospitalLoad: function () {
            var _t = this;
            _t.orderDetailInfo({
                operationOrderId: _t.op.operationOrderId,	    //string	是	手术单id	1489545287440
                caseId: _t.op.caseId,	                        //string	是	病历单id
                infoBack: function (_dataList) {
                    if (_dataList.length > 0) {
                        $('.wx-main-inner').append(_t.template.netOrderHtml(_dataList[0])).find('.netSurgeryOrder').siblings().hide();
                        _t.netEventCenter.init(_t);
                    }
                }
            });
        },
        netEventCenter: {
            op: {},
            init: function (_t) {
                var _this = this;
                _this.hospitalSelect(_t);
                _this.op.tmpl = _t;
            },
            XHRList:{
                getToken: "/mcall/im/interact/v1/refreshToken/"
            },
            hospitalSelect: function (_t) {
                var _this = this;
                $('.netSurgeryOrder').find('.netOrderSelectList').on("click", function () {
                    var _hospitalId = $(this).attr("data-hospitalid"),
                        _hospitalName = $(this).attr("data-hospitalName"),
                        _hospitalAddress = $(this).attr("data-hospitalAddress"),
                        _procedureTime = $(this).attr("data-operationtime"),
                        _reservationStatus = $(this).closest('.netSurgeryOrder').attr("data-reservationStatus"),
                        _doctorName = $(this).closest('.netSurgeryOrder').data("doctorname");
                    //医院选择激活切换
                    $(this).find('.wx-commHospitalBtn-left').addClass('selected');
                    $(this).siblings().find('.wx-commHospitalBtn-left').removeClass('selected');
                    //手术时间
                    var _operationTime = $(this).attr("data-operationTime"),
                        _timesList = (_operationTime.length > 0) ? orderTimeDeals(_operationTime) : "待定（入院前3天通知）";
                    if (_operationTime.length > 0) {
                        $(this).closest('.wx-surgical-commCenter').siblings('.netOrderCureTime').show().find('.surgical-timeWait').hide();
                        $(this).closest('.wx-surgical-commCenter').siblings('.netOrderCureTime').show().find('.wx-surgical-timesYear').show().text(_timesList.year);  //就诊时间
                        $(this).closest('.wx-surgical-commCenter').siblings('.netOrderCureTime').find('.wx-surgical-timeTips').show().text(_timesList.week);
                        $(this).closest('.wx-surgical-commCenter').siblings('.netOrderCureTime').find('.wx-surgical-timeSeconds').show().text(_timesList.hour); //就诊时间
                    } else {
                        $(this).closest('.wx-surgical-commCenter').siblings('.netOrderCureTime').show().find('.surgical-timeWait').show().text(_timesList).nextAll().hide();  //就诊时间
                    }
                    if (_hospitalAddress.length > 0) {
                        //所选医院有地点数据
                        $(this).closest('.wx-surgical-commCenter').siblings('.netOrderCureArea').show().find('.wx-surgical-address').text(_hospitalAddress);
                    } else {
                        $(this).closest('.wx-surgical-commCenter').siblings('.netOrderCureArea').hide();
                    }
                    //激活提交按钮
                    $(this).closest('.netSurgeryOrder').find('.wx-surgical-commSubmitBtn.netOrderSubmitBtn').addClass('active').off("click").on("click", function () {
                        //提交手术单
                        var _data = {
                            operationOrderId: _t.op.operationOrderId,  //	string	是	手术预约单id
                            operationType: 1,                          //	string	否	手术类型1-互联网手术2-公立医院
                            hospitalId: _hospitalId,                   //	string	是	医院id
                            hospitalName: _hospitalName,               //	string	是	医院名称
                            //reservationStatus: 2                       //	string	是	预约状态1-待患者确认2-互联网医院3-公立医院4-已完成
                        };
                        if (_procedureTime.length > 0) {
                            _data.operationTime = _procedureTime;    //	string	是	手术时间
                            _data.orderStatus = 3;                   //	string	是	待手术
                        } else {
                            _data.orderStatus = 4;                    //	string	是	手术时间待定
                        }
                        _t.commAjax({
                            data: _data,
                            path: _t.path.proOrderGetPath,
                            callBack: function (data) {
                                if (data && data.responseObject && data.responseObject.responseStatus) {
                                    _this.createOrdersBack({
                                        doctorName: _doctorName,           // string  是  医生姓名
                                        hospitalName: _hospitalName,       //	string	是	医院名称
                                        operationTime: _procedureTime      //	string	是	手术时间
                                    });
                                } else {
                                    common.popup({text: "提交订单失败"})
                                }
                            },
                            errorCallBack: function () {
                                common.popup({
                                    text: "提交订单失败"
                                })
                            }
                        });
                    });
                })
            },
            //创建订单
            createOrdersBack: function (orderList) {
                var _this = this;
                var data = {
                    caseId: _this.op.tmpl.op.caseId,
                    patientCustomerId: _this.op.tmpl.op.patientCustomerId,    //    string	是	患者所属用户id
                    patientId: $('.netSurgeryOrder').data("patientid"),       //    string	是	患者id
                    doctorId: $('.netSurgeryOrder').data("customerid"),       //	string	是	医生id
                    orderType: '2',                                           //	string	是	订单类型1-咨询2-手术3-门诊预约
                    orderAmount: '',                                          //	string	是	金额
                    orderSourceId: _this.op.tmpl.op.operationOrderId,         //	string	是	来源id，  对应咨询id,手术单id，门诊预约id
                    orderSourceType: '1',                                     //	string	是	来源类型  1-普通2-特需3-加急|手术：1-互联网2-公立|门诊1-普通2-专家'
                    status: '1',                                              //	string	是	订单状态  1-待支付2-已支付3-已完成4-已取消5-退款中
                    isCharge: "true"                                          //    string  是  true-收费  false-免费
                };
                _this.netOrderCostGet({
                    customerId: _this.op.tmpl.op.doctorCustomerId,  //医生ID
                    operationType: '1',
                    callBack: function (dataList) {
                        data.orderAmount = dataList;   //订单金额赋值
                        //创建订单
                        modules.createOrders({
                            data: data,
                            backCreateSuccess: function (_data) {
                                //创建订单成功 生成支付预览单  （手术必选）
                                _this.viewNetOrders({
                                    orderId: _data,
                                    doctorName: $('.netSurgeryOrder').data("doctorname"),  //医生姓名
                                    orderType: "合作医院手术",                             //订单类型
                                    cureHospital: orderList.hospitalName,                  //就诊医院
                                    cureTime: orderList.operationTime,                     //手术时间
                                    orderAmount: _this.op.tmpl.op.orderAmount              //订单金额
                                });
                            },
                            backCreateError: function (_data) {
                                //创建订单失败  (必选)
                                common.popup({
                                    text: "订单提交失败！"
                                })
                            }
                        });
                    }
                });
            },
            //订单预览
            viewNetOrders: function (dv) {
                var _this = this;
                Q.reg("netOrderViews", function () {
                    document.title = "订单支付";
                    if ($('.wx-main-content.reviewNetOrder').length > 0) {
                        $('.wx-main-content.reviewNetOrder').show();
                    }
                    if ($('.wx-main-content.orderDetails').length > 0) {
                        $('.wx-main-content.orderDetails').remove();
                    }
                });
                Q.go("netOrderViews");
                _this.netOrderCostGet({
                    customerId: _this.op.tmpl.op.doctorCustomerId,  //医生ID
                    operationType: '1',
                    callBack: function (data) {
                        dv.orderCost = data;
                        $('.wx-main-inner').append(_this.op.tmpl.template.reviewOrderHtml(dv)).find('.reviewNetOrder').siblings().hide();
                        _this.netOrderGoPay(dv.orderId);
                    }
                });
            },
            //获取支付金额
            netOrderCostGet: function (gv) {
                var _this = this;
                _this.op.tmpl.commAjax({
                    data: {
                        visitSiteId: "17",                        //	string	是	站点
                        customerId: gv.customerId,                //	string	是	医生id
                        operationType: gv.operationType           //	string	是	类型1-互联网手术定金
                    },
                    path: _this.op.tmpl.path.proOrderCost,
                    callBack: function (data) {
                        if (data && data.responseObject && data.responseObject.responseData) {
                            var _orderCost = data.responseObject.responseData.dataList[0].price;
                            gv.callBack(parseFloat(_orderCost).toFixed(2));   //返回金额
                        }
                    },
                    errorCallBack: function (data) {

                    }
                });

            },
            //去支付
            netOrderGoPay: function (gv) {
                var _this = this;
                $('.wx-main-content.reviewNetOrder').find('.wx-comm-bottomBtn .wx-procedureGoPay').off("click").on("click", function () {
                    _this.netOrderCostGet({
                        customerId: _this.op.tmpl.op.doctorCustomerId,  //医生ID
                        operationType: '1',
                        callBack: function (data) {
                            modules.wxPay({
                                isTest:0,                                          //0-线上 1-线下
                                orderId: gv,                                       //订单ID
                                orderType: "2",                                    //订单类型  1-咨询2-手术3-门诊预约
                                reservationStatus: "2",                            //手术类型  2-互联网  3-公立医院
                                orderSourceId: _this.op.tmpl.op.operationOrderId,  //来源id，对应 咨询id,手术单id，门诊预约id
                                total_fee: data,                                   //订单总金额 (单位为元)
                                body: "合作医院手术",                             //订单描述
                                callBack: function (data) {
                                    if (data.responseStatus == "true") {
                                        _this.netOrderDetails({
                                            isOrdered:0,       //0-未预约过 1-预约过
                                            orderId: gv,
                                            patientCustomerId: _this.op.tmpl.op.patientCustomerId,
                                            patientId: _this.op.tmpl.op.patientId
                                        });   //支付成功 => 订单详情
                                        _this.linkMessageToSend();
                                    } else {

                                    }
                                }
                            });
                        }
                    });
                    //_this.netOrderDetails({orderId:gv});   //支付成功 => 订单详情
                });
            },
            //订单详情
            netOrderDetails: function (dv) {
                Q.reg("netOrderDetails", function () {
                    document.title = "订单详情";
                });
                Q.go("netOrderDetails");
                if(dv.isOrdered ==1){
                    Q.init({
                        index: 'netOrderDetails'     /* 手术单首页地址 */
                    });
                }
                modules.orderDetails({
                    addElement: $('.wx-main-inner'),   //dome加载元素   $('.wx-main-inner')
                    orderType: 2,                      //订单类型   (2-手术 3-门诊)
                    proOrderType: 2,                   //订单收费类型   (1-免费 2-收费)
                    orderId: dv.orderId,               //手术单ID
                    patientCustomerId: dv.patientCustomerId,
                    patientId: dv.patientId,
                    initFunction: function () {
                        //初始化方法
                        $('.wx-main-inner').find('.wx-main-content.orderDetails').siblings().hide();
                    }
                });
            },
            //Im联通...
            linkToIm: function () {
                var that = this;
                $.ajax({
                    url: that.XHRList.getToken,
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
                            that.nim = NIM.getInstance({
                                appKey: '50c93d2ab7e207fd83231a245c07bfbc',
                                account: "0_" + common.getpara().caseId,
                                token: data.responseObject.responseData.token,
                                onconnect: function (data) {
                                    console.log('连接成功');

                                },
                            });
                        }
                    });
            },
            //    IM联通...发送透传信息
            linkMessageToSend: function () {
                var that = this;
                this.nim.sendCustomMsg({
                    scene: 'p2p',
                    to: "2_" + common.getpara().doctorCustomerId,
                    needPushNick: false,
                    pushContent: "患者<" + controller.userData.nick + ">向您咨询，点击查看详情",
                    pushPayload: JSON.stringify({
                        "account": "0_" + common.getpara().caseId,
                        "type": "1"
                    }),
                    content: JSON.stringify({
                        type: "penetrateMessage",
                        data: {
                            actionType: "3",
                            actionDict: {
                                resourceID: common.getpara().operationOrderId,
                                resourceType: that.op.tmpl.op._public
                            }
                        }
                    }),
                    done: function (error, msg) {
                        if (!error) {
                            console.log("发送通知...")
                        }
                    }
                });
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
                dataType: "json",
                //time : 5000,
                success: function (data) {
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
    container.init();
});
