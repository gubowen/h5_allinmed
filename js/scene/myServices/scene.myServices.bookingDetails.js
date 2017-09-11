

//从预约历史跳转此页面---预约单详情

$(function(){
	modules.orderDetails({
		addElement:$('.wx-main-inner'),        //dome加载元素   $('.wx-main-inner')
		orderType:common.getpara().orderType,                  //订单类型   (2-手术 3-门诊)
		proOrderType:common.getpara().proOrderType,               //订单收费类型   (1-免费 2-收费)
		orderId:common.getpara().orderId,                   //订单ID
		caseId:common.getpara().caseId,                    //caseID
		patientId:common.getpara().patientId,            //patientId
		patientCustomerId:common.getpara().patientCustomerId, //patientCustomerId
		initFunction:function(){}
	});
})
