/**
 * @name: 我的咨询
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/3/2
 * @author: wangjingrong
 */
$(function(){
    var orderHisList = {
        config:{

        },
        path:{
            getHisList:'/mcall/customer/case/consultation/v1/getMapList/', //咨询历史接口
	        getPicList:'/mcall/patient/recovery/advice/v1/getMapList/',//图片列表
	        getOrderDetails: "/mcall/cms/pay/order/v1/getMapById/",//获取订单详情
	        getVisitDetails: "/mcall/customer/advice/setting/v1/getMapById/",//获取医生问诊价格及次数
	        updateTime: "/mcall/customer/case/consultation/v1/updateFrequency/",//更新次数
	        updateConsultState:'/mcall/customer/patient/case/v1/update/'//更新上传成功后状态
        },
	      template:{
		    orderHisHtml:function(data){
			    var html,statusName,buttonBox = '',logoImg,fontGray = '';
			    //判断预约状态
			    if(data.consultationType==0){
				    //分诊医生
				    switch (Number(data.sortId)){
					    case 0:case 5:
						    statusName = '咨询中';
						    if(data.diagnosisId){
							    buttonBox = '<button class="btn-green">初诊建议</button>';
						    }else{
							    buttonBox = '';
						    }
						    break;
					    case 1:
						    statusName = '待上传资料';
						    buttonBox = '<button class="btn-green">上传片子</button>';
						    break;
					    case 2:
						    statusName = '待支付';
						    buttonBox = '<button class="btn-gray ev_btn_cancel">取消</button><button class="btn-green">去支付</button>';
						    break;
					    case 3:
						    statusName = '咨询完成';
						    buttonBox = '<button class="btn-green">继续咨询</button>'+(data.diagnosisId?'<button class="btn-green">初诊建议</button>':'');
                            fontGray = 'font-gray';
						    break;
					    case 4:
						    statusName = '已取消';
						    buttonBox = '';
                            fontGray = 'font-gray';
						    break;
				    }
				    //判断头像
				    if(data.logoUrl){
					    logoImg = data.logoUrl;
				    }else{
					    logoImg = "/image/img00/myServices/doctor_portrait.png";
				    }
			    }else{
				    //医生
				    switch (Number(data.sortId)){
					    case 0:
						    statusName = '咨询中';
						    buttonBox = '';
						    break;
					    case 1:
						    statusName = '';
						    buttonBox = '';
						    break;
					    case 2:
						    statusName = '待支付';
						    buttonBox = '<button class="btn-gray ev_btn_cancel">取消</button><button class="btn-green">去支付</button>';
						    break;
					    case 3:
						    statusName = '咨询完成';
						    buttonBox = '';
                            fontGray = 'font-gray';
						    break;
					    case 4:
						    statusName = '已取消';
						    buttonBox = '';
                            fontGray = 'font-gray';
						    break;
					    case 5:
						    statusName = '已拒绝';
						    buttonBox = '';
                            fontGray = 'font-gray';
						    break;
				    }
				    //判断头像
				    if(data.logoUrl){
					    logoImg = data.logoUrl;
				    }else{
					    logoImg = "/image/img00/doctorMain/doc_logo.png";
				    }
			    }
			    //判断门诊类型
			    var consultationLevel = '',payNum = '';
			    switch (Number(data.consultationLevel)){
				    case 0:
					    consultationLevel = "免费咨询";
					    break;
				    case 1:
					    consultationLevel = "普通咨询";
					    payNum = ' ￥' +data.payOrderAmount;
					    break;
				    case 2:
					    consultationLevel = "加急咨询";
					    payNum = ' ￥' +data.payOrderAmount;
					    break;
				    case 3:
					    consultationLevel = "特需咨询";
					    payNum = ' ￥' +data.payOrderAmount;
					    break;
			    }
			    html = '<section class="orderHistoryItem" data-diagnosisId="'+data.diagnosisId+'" data-patientId="'+data.patientId+'" data-consultationLevel="'+data.consultationLevel+'" data-caseId="'+data.caseId+'" data-outTradeNoId="'+data.payOutTradeNo+'" data-payOrderId="'+data.payOrderId+'" data-customerId="'+data.customerId+'" data-consultationtype="'+data.consultationType+'" data-casetype="'+data.caseType+'" data-consultationId="'+data.consultationId+'">'+
				    '<div class="orderHisItemTop">'+
				    '<div class="doctorInfo left">'+
				    '<img class="docHead" src="'+logoImg+'" alt="">'+
				    '<span class="docName">'+(data.consultationType==0?"唯医分诊医生":data.fullName)+'</span>'+
				    '<span class="">'+data.medicalTitle+'</span>'+
				    '</div>'+
				    '<div class="doctorState right '+fontGray+'">'+statusName+'</div>'+
				    '</div>'+
				    ((data.payTime>0&&data.sortId==2)?'<article class="countDown hide">支付剩余时间：<span class='+("countDownMin"+data.payOrderId)+'></span><span>分</span><span class='+("countDownSec"+data.payOrderId)+'></span><span>秒</span>超时将自动取消</article>':'')+
				    '<div class="orderHistoryItemCenter">'+
				    '<p class="">问诊人：<span>'+data.patientName+'</span></p>'+
				    '<p class="">问诊主诉：<span>'+data.mainContent.caseMain+'</span></p>'+
				    '</div>'+
				    '<div class="orderHistoryItemBottom">'+
				    '<div class="orderHisItemBottomLeft left">'+
				    '<span>'+data.createTime.slice(0,16)+'</span>'+
				    '<span>'+consultationLevel+payNum+'</span>'+
				    '</div>'+
				    '<div class="orderHisItemBottomRight right">'+
				    buttonBox+
				    '</div>'+
				    '</div>'+
				    '</section>';
			    return html;
		    }
	    },
        init:function(){
            var t = this;
            if (!common.checkOpenId()) {
              common.wxGetOpenId(1);    //获取openId
            }
            t.addHtml();
            //初始化，上传图片用
            Q.reg("main",function(){

            });
            Q.init({
              index: 'main'
            });
        },
        addHtml:function(){
            var t = this;
            $.ajax({
                url: t.path.getHisList,
                timeout:15000,
	            type: 'POST',
                data: {
	                paramJson:$.toJSON({
		                patientCustomerId:common.getpara().customerId,
		                isValid:1,
		                firstResult:0,
		                maxResult:20,
		                sortTye:1,
		                logoUseFlag:3
                    })
                },
	            beforeSend:function(){
		            common.loading.show();
	            },
                dataType:"json",
                success:function(data){
                    if(data&&data.responseObject.responseData&&data.responseObject.responseData.dataList){
                        var items = data.responseObject.responseData.dataList;
	                    $.each(items,function(index,element){
		                    $(".orderList").append(t.template.orderHisHtml(element));
		                    if(element.payTime>0&&element.sortId == 2){
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
	                    $(".orderList").addClass("bg-f").html('<section class="noFriendText"><p>您还没有任何记录</p><p>添加关心的人，在线咨询预约，唯医为您开启全新的就医体验</p></section><section class="noFriendHref"><a href="/dist/consult.html?customerId='+common.getpara().customerId+'#/addPatient">去咨询 &gt;</a></section>')
                    }
	                common.loading.hide();
	                t.btnClick();
                },
                error:function(){
                    console.log("数据错误")
                }
            })
        },
        btnClick:function(){
            var t = this;
	        $(".btn-green").on("click",function(event){
		        event.stopPropagation();
		        var btnText = $(this).text();
		        var container = $(this).parents(".orderHistoryItem");
		        switch(btnText){
			        case "初诊建议":
				        window.location.href='/pages/myServices/check_suggestion.html?caseId='+container.attr("data-caseid")+'&diagnosisId='+container.attr("data-diagnosisid")+'&patientCustomerId='+common.getpara().customerId+'&patientId='+container.attr("data-patientid")+'&caseType=0';
				        break;
			        case "继续咨询":
				        if(container.attr("data-consultationtype")==1){
					        //医生
					        window.location.href = '/pages/imScene/im_main_scene_doctor.html?caseId='+container.attr("data-caseid")+'&doctorCustomerId='+container.attr("data-customerid")+'&patientCustomerId='+common.getpara().customerId+'&patient='+container.attr("data-patientid")+'#!index'
				        }else{
					        //分诊医生
					        if(container.attr("data-casetype")==0){
						        //咨询历史
						        window.location.href = '/pages/imScene/im_main_scene.html?caseId='+container.attr("data-caseid")+'&shuntCustomerId='+container.attr("data-customerid")+'&customerId='+common.getpara().customerId+'&patient='+container.attr("data-patientid")+'&from=health'
					        }else{
						        //手术直约历史
						        window.location.href = '/pages/imScene/im_main_scene.html?caseId='+container.attr("data-caseid")+'&shuntCustomerId='+container.attr("data-customerid")+'&customerId='+common.getpara().customerId+'&patient='+container.attr("data-patientid")+'&from=op_help'
					        }
				        }
				        break;
			        case "上传片子":
				        //请求上传图片类型
				        $.ajax({
							url: t.path.getPicList,
					        timeout:10000,
					        type: 'POST',
					        data: {
						        paramJson:$.toJSON({
							        caseId:container.attr("data-caseid"),
							        customerId:container.attr("data-customerid"),
							        isValid:1,
							        firstResult:0,
							        maxResult:999,
							        type:0
						        })
					        },
					        dataType:"json",
					        success:function(data){
						        if(data.responseObject.responseData.dataList){
							        var items = data.responseObject.responseData.dataList[0];
							        var picPkList = [];
							        if(items.checkMap.length>0){
								        $.each(items.checkMap,function(index,element){
									        picPkList.push({
										        "adviceType":1,
										        "adviceId":element.checkId,
										        "adviceName":element.checkName
									        })
								        })
							        }
							        if(items.inspectionMap.length>0){
								        $.each(items.inspectionMap,function(inde,elemen){
									        picPkList.push({
										        "adviceType":1,
										        "adviceId":elemen.inspectionId,
										        "adviceName":elemen.inspectionName
									        })
								        })
							        }
							        $(".ev-fileUpHide").hide();
							        modules.upLoadFiles({
								        caseId: container.attr("data-caseid"),
								        data: '',           // 图集数组
								        picPkList: picPkList,
								        route: 'main',          //路由
								        imageType: '1',     // 上传资料类型
								        upLoadType: '4',     //方法调用类型 （1-历史健康、2-直约手术<无caseId>、3-问诊单、4-IM入口）
								        manualTrigger:true,
								        fileCallBack: function (picList) {
									        t.updateConsultState(container.attr("data-caseid"));
								        },
								        backFunction: function () {
									        //来源页路由里的方法事件
								        }
							        });
						        }
					        }
				        })
				        break;
			        case "去支付":
				        t.getOrderDetails({
					        caseId:container.attr("data-caseid"),
					        patientId:container.attr("data-patientid"),
					        customerId:container.attr("data-customerid"),
					        consultationId:container.attr("data-consultationid"),
					        consultationType:container.attr("data-consultationtype")
				        });
		        }
	        });
            $(".ev_btn_cancel").on('click',function(event){
	            var t = this,container = $(this).parents(".orderHistoryItem");
	            event.stopPropagation();
                common.confirmBox({
                    title:"您要放弃此次咨询吗？",
                    cancel:"确认",
                    ensure:"取消",
                    cancelCallback:function(){
	                    if(container.attr("data-consultationlevel")==0){
		                    modules.tcUpOrderStatus({
			                    isTest:0,                                               //  是否跳过支付
			                    operationType:4,    //操作类型        1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
			                    orderType:1,
			                    orderId:container.attr("data-payorderid"),          // 订单ID
			                    orderSourceId:container.attr("data-consultationid"),
			                    status:4,           //订单状态        1-待支付  2-已支付  3-已完成  4-已取消  5-退款中
			                    callBack:function(data){
				                    //更新成功
				                    window.location.reload();
			                    },
			                    errorCallBack:function(){
				                    //更新失败
			                    }
		                    });
	                    }else{
		                    modules.closeOrder({
			                    isTest:0,                                               //  是否跳过支付
			                    out_trade_no: container.attr("data-outtradenoid"), //微信支付订单号
			                    orderType:1,                     //订单类型     1-问诊 2-手术 3-门诊
			                    orderSourceType:container.attr("data-consultationlevel") ,    //来源类型     1-普通2-特需3-加急|手术：1-互联网2-公立|门诊1-普通2-专家',
			                    orderId:container.attr("data-payorderid"),                       // 订单ID
			                    refundReason:'',                  //拒绝描述
			                    refundReasonDesc:'',              //拒绝原因描述
			                    closeOrdersSuccess:function(){
				                    //更新订单状态
				                    modules.tcUpOrderStatus({
					                    isTest:0,                                               //  是否跳过支付
					                    operationType: '4',                                                //操作类型  1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
					                    orderId: container.attr("data-payorderid"),                                              // 订单ID
					                    orderType:1,
					                    orderSourceId:container.attr("data-consultationid"),      // 订单资源ID
					                    outTradeNo:container.attr("data-outtradenoid"),                                       //微信支付订单Id
					                    refundReason: '',              //拒绝描述
					                    refundReasonDesc: '',     //拒绝原因描述
					                    status: '4',                                                       //已取消    '订单状态1-待支付2-已支付3-已完成4-已取消5-退款中6-支付超时7-退款完成',
					                    charge: "true",
					                    callBack: function (data) {
						                    if (data && data.responseObject && data.responseObject.responseStatus) {
							                    //取消订单成功
							                    window.location.reload();
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
	                    }
                    },
                    ensureCallback:function(){

                    }
                })
            });
            $(".orderHistoryItem").on("click",function(){
	            //缓存orderSourceId
	            var oIds = $(this).attr("data-consultationid");
	            sessionStorage.setItem("orderSourceId", oIds);
	            //缓存医生信息
	            if($(this).attr("data-consultationtype")==1){
		            localStorage.setItem("doctorName",$(this).find(".docName").text());
		            localStorage.setItem("doctorLogo",$(this).find(".docHead").attr("src"));
	            }
                //调取历史沟通记录
				var t = this;
	            if($(this).attr("data-consultationtype")==1){
					//医生
		            window.location.href = '/pages/imScene/im_main_scene_doctor.html?caseId='+$(this).attr("data-caseid")+'&doctorCustomerId='+$(this).attr("data-customerid")+'&patientCustomerId='+common.getpara().customerId+'&patientId='+$(this).attr("data-patientid")+'#!index'
	            }else{
		            //分诊医生
		            if($(this).attr("data-casetype")==0){
			            //咨询历史
			            window.location.href = '/pages/imScene/im_main_scene.html?caseId='+$(this).attr("data-caseid")+'&shuntCustomerId='+$(this).attr("data-customerid")+'&customerId='+common.getpara().customerId+'&patientId='+$(this).attr("data-patientid")+'&from=health'
		            }else{
			            //手术直约历史
			            window.location.href = '/pages/imScene/im_main_scene.html?caseId='+$(this).attr("data-caseid")+'&shuntCustomerId='+$(this).attr("data-customerid")+'&customerId='+common.getpara().customerId+'&patientId='+$(this).attr("data-patientid")+'&from=op_help'
		            }
	            }
            });
        },
        //上传片子成功后更改状态
        updateConsultState:function(caseid){
          var t = this;
          $.ajax({
            url: t.path.updateConsultState,
            timeout: 10000,
            type: 'POST',
            data: {
              paramJson: $.toJSON({
                caseId: caseid,
                state: 0
              })
            },
            success:function(){
            console.log("success");
              window.location.reload();
            }
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
              //obj.container.siblings(".orderHistoryItemBottom").find(".btn-green").remove();
            }
          })
        },
        //获取订单详情
        getOrderDetails:function(obj){
          var t = this;
          $.ajax({
            url: t.path.getOrderDetails,
            type:"POST",
            dateType:"json",
            timeout:10000,
            data:{
              paramJson: $.toJSON({
                patientId: obj.patientId,
                doctorId: obj.customerId,
                orderType:1,
                orderSourceId:obj.consultationId,
                status:1,
                sortType:1,
                firstResult:0,
                maxResult:1
              })
            },
            success:function(data){
              if(data.responseObject.responseData.dataList){//有订单
                var items = data.responseObject.responseData.dataList[0],orderDescribe;
                switch(Number(items.orderSourceType)){
                  case 0:
                    orderDescribe = "免费问诊";
                    break;
                  case 1:
                    orderDescribe = "普通问诊";
                    break;
                  case 2:
                    orderDescribe = "加急问诊";
                    break;
                  case 3:
                    orderDescribe = "特需问诊";
                    break;
                }
                t.goToPay({
                  caseId:obj.caseId,
                  patientCustomerId:common.getpara().customerId,
                  patientId:obj.patientId,
                  doctorId:obj.customerId,
                  orderId:items.orderId,
                  orderSourceId:items.orderSourceId,
                  orderSourceType:items.orderSourceType,
                  orderAmount:items.orderAmount,
                  orderDescribe:orderDescribe,
                  consultationType:obj.consultationType
                });
              }else{//没有订单
              console.log("没有订单");
              }
            }

          })
        },
        //调取支付方法
        goToPay:function(obj){
          var t = this;
          modules.wxPay({
            isTest:0,                                               //  是否跳过支付
            orderId: obj.orderId,                                       //订单ID
            orderType: 1,                                     //订单类型  1-咨询2-手术3-门诊预约
            orderSourceId: obj.orderSourceId,                                 //来源id，对应 咨询id,手术单id，门诊预约id
            total_fee: obj.orderAmount,                                     //订单总金额 (单位/元)
            body: obj.orderDescribe,                              //订单描述
            callBack: function (data) {
              if (data.responseStatus == "true") {
                //支付成功
                if(obj.consultationType == 1){
                  t.getReferTimes({
                    doctorId:obj.doctorId,
                    consultationId:obj.orderSourceId,
                    consultationLevel:obj.orderSourceType
                  })
                }else{
                  t.updateOrderTimes({
                    consultationId:obj.orderSourceId
                  })
                }
              }
            }
          });
        },
        //获取咨询次数
        getReferTimes:function(obj){
          var t = this;
          $.ajax({
            url: t.path.getVisitDetails,
            type: "post",
            async:false,
            timeout: 10000,
            data: {
              paramJson: $.toJSON({
                customerId: obj.doctorId
              })
            },
            dataType: "json",
            success: function (data) {
              if (data.responseObject.responseData.dataList) {
                var items = data.responseObject.responseData.dataList[0],
                  referType =  Number(obj.consultationLevel),
                  referName;
                switch(referType){
                  case 1:
                    referName = items.generalTimes;
                    break;
                  case 2:
                    referName = items.urgentTimes;
                    break;
                  case 3:
                    referName = items.vipTimes;
                    break;
                }
                //更新咨询次数和类型
                t.updateOrderTimes({
                  consultationId:obj.consultationId,
                  frequency:referName,
                  consultationLevel:obj.consultationLevel
                });
              } else {

              }
            },
            error: function () {

            }
          })
        },
        //更改咨询次数
        updateOrderTimes:function(obj){
          var t = this;
          $.ajax({
              url: t.path.updateTime,
              type: 'POST',
              dataType: 'json',
              data: {
                paramJson: $.toJSON({
                  consultationId: obj.consultationId,
                  frequency: obj.frequency || "0",
                  frequencyType: 2,
                  consultationState:0,
                  consultationLevel:obj.consultationLevel || "1"
                })
              }
            })
            .done(function (data) {
              if (data.responseObject.responseStatus) {
                window.location.reload();
                //localStorage.setItem("doctorName",$(".docDetails > h3").text());
                //localStorage.setItem("doctorLogo",$(".docLogo").attr("src"));
                //localStorage.setItem("imOpen","open");
                //window.location.href = '/pages/imScene/im_main_scene_doctor.html?caseId=' + common.getpara().caseId + '&doctorCustomerId=' + common.getpara().customerId + '&patientCustomerId=' + common.getpara().patientCustomerId + '&patientId=' + common.getpara().patientId;
              }
            });
        }
    }
    orderHisList.init();
})
