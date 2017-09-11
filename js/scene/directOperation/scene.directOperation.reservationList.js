$(function () {
	var controller = {
		config: {},
		path: {
			getReservationInfo: "/mcall/customer/patient/case/v1/getMapById/"
		},
		template: {
			//概要信息
			mainInfoHtml: function (data) {

				var caseTime = data.caseTime.split(' ')[0]
				if (caseTime) {
					var _caseTime = caseTime.split('-')[0] + '年' + caseTime.split('-')[1] + '月' + caseTime.split('-')[2] + '日'
				} else {
					_caseTime = "";
				}
				var tempHtml = '';
				tempHtml = '<section class="tc-baseInfo">' +
					'<ul class="tc-baseInfoList">' +
					'<li class="tc-baseInfoItem">' +
					'<div class="tc-baseInfoItemLeft">' +
					'<img src="' + controller.config.avatar + '" alt="">' +
					'</div>' +
					'<div class="tc-baseInfoItemRight">' +
					'<span class="tc-baseInfoName">' + common.getStrLen(data.patientName,10) + '</span>' +
					'<span class="tc-baseInfoSex">' + data.sexName + '</span>' +
					'<span class="tc-baseInfoAge">' + data.age + '岁</span>' +
					'</div>' +
					'</li>' +
					'<li class="tc-baseInfoItem">' +
					'<div class="tc-baseInfoItemLeft">问诊日期</div>' +
					'<div class="tc-baseInfoItemRight">'+ _caseTime + '</div>' +
					'</li>' +
					'</ul>' +
					'<section class="tc-baseInfoItem">'+
					'<div class="tc-baseInfoItemLeft">主诉</div>'+
					'<div class="tc-baseInfoItemRight tc-recommendUserMain">'+data.caseMain.caseMain+'</div>'+
					'</section>'+
					'</section>';
				return tempHtml;
			},
			//症状描述
			symptomDescHtml: function (data,date) {
				var tempHtml = "";
				tempHtml = '<section class="tc-caseDescribe tc-module">' +
					'<section class="tc-caseDescribeTitle title">' +
					'<h3>症状描述</h3>' +
					'</section>' +
					'<ul class="tc-caseDescribeList">' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">不适部位</span><span class="tc-caseDescribeItemRight tc-noRevice">' + data[0].partName + '</span>' +
					'</li>' +
					(function () {
						var result = "";
						$.each(data, function (index, element) {
							var questionDesc = element.questionDesc;
							var firstArry = [];
							$.each(element.symptomOptions, function (inde, eleme) {
								var secondArray = [];
								if (eleme.isAttachment == 2) {
									secondArray.push(eleme.optionDesc);
								} else {
									secondArray.push(eleme.optionName);
								}
                if (eleme.refQuestionList.length > 0) {
                  $.each(eleme.refQuestionList, function (ind, ele) {
                    if(ele.symptomOptions.length>0){
                      $.each(ele.symptomOptions,function (i,e) {
                        secondArray.push(e.optionName + e.optionDesc);
                      })
                    }
                  })
                }
								var secondString = secondArray.join("-");
								firstArry.push(secondString);
							});
							var firstString = firstArry.join("、");
							result += '<li class="tc-caseDescribeItem">' +
								'<span class="tc-caseDescribeItemLeft">' + questionDesc + '</span><span class="tc-caseDescribeItemRight tc-noRevice">' + firstString + '</span>' +
								'</li>'
						});
						return result
					})() +
          '<li class="tc-caseDescribeItem">' +
          '<span class="tc-caseDescribeItemLeft">其他症状</span><span class="tc-caseDescribeItemRight tc-noRevice">' + (date.caseMain.caseAlong || "无") + '</span>' +
          '</li>' +
					'</ul>' +
					'</section>';
				return tempHtml;
			},
			//现病史
			presentIllnessHtml: function (data) {
				var tempHtml = "";
				//图片分类
				var checkImgHtml = '',checkImgName='未上传',checkImgLists='',//检查资料图片
					partImgHtml = '',partImgName = '未上传',partImgLists='';//患处照片图片
				if(data.attachmentList.length>0){
					$.each(data.attachmentList,function (index,element) {
						if(element.caseAttSource == 0){
							checkImgHtml += '<li><img src="'+element.caseAttUrl+'"></li>';
						}else if(element.caseAttSource == 4){
							partImgHtml += '<li><img src="'+element.caseAttUrl+'"></li>';
						}
					})
					//某一个类型未上传
					if(checkImgHtml.length>0){
						checkImgName = '&nbsp;&nbsp;';
						checkImgLists = '<ul class="uploadListsBox">'+checkImgHtml+'</ul>';
					}
					if(partImgHtml.length>0){
						partImgName = '&nbsp;&nbsp;';
						partImgLists = '<ul class="uploadListsBox">'+partImgHtml+'</ul>';
					}
				}
				tempHtml = '<section class="tc-caseDescribe tc-module">' +
					'<section class="tc-caseDescribeTitle title">' +
					'<h3>诊治经过</h3>' +
					'</section>' +
					'<ul class="tc-caseDescribeList">' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">曾就诊医院</span><span class="tc-caseDescribeItemRight tc-noRevice">' + (data.treatmentName || "无") + '</span>' +
					'</li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">确诊疾病</span><span class="tc-caseDescribeItemRight tc-noRevice">' + (data.illnessName || "无") + '</span>' +
					'</li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">检查资料</span>' +
					'<span class="tc-caseDescribeItemRight tc-noRevice">' + checkImgName + '</span>' +
					checkImgLists+
					'</li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">患处照片</span>' +
					'<span class="tc-caseDescribeItemRight tc-noRevice">' + partImgName + '</span>' +
					partImgLists+
					'</li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">服用药物</span><span class="tc-caseDescribeItemRight tc-noRevice">'+(data.takeMedicine || "无")+'</span>' +
					'</li>' +
					'</ul>' +
					'</section>';
				return tempHtml;
			},
			//基本信息
			baseInfoHtml: function (data) {
				var tempHtml = "";
				tempHtml = '<section class="tc-caseDescribe tc-module">' +
					'<section class="tc-caseDescribeTitle title">' +
					'<h3>基本信息</h3>' +
					'</section>' +
					'<ul class="tc-caseDescribeList">' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">患者所在地</span><span class="tc-caseDescribeItemRight tc-noRevice">' + data.provinceName + " " + data.cityName + " " + data.districtName + '</span>' +
					'</li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">手机号码</span><span class="tc-caseDescribeItemRight tc-noRevice">' + data.mobile + '</span>' +
					'</li>' +
					'</ul>' +
					'</section>';
				return tempHtml;
			},
			//备注
			remarkHtml: function (data) {
				var tempHtml = "";
				tempHtml = '<section class="tc-caseDescribe tc-module">' +
					'<section class="tc-caseDescribeTitle title">' +
					'<h3>备注</h3>' +
					'</section>' +
					'<ul class="tc-caseDescribeList tc-caseOtherBox">' +
					'<p class="tc-caseDesOther">' + data + '</p>' +
					'</ul>' +
					'</section>';
				return tempHtml;
			}
		},
		init: function () {
			this.addReservationHtml();
		},
		getUserLogo: function (param) {

			var sex = param.sexName,
				age = parseInt(param.age),
				img = "";
			if (age <= 12) {
				img = "/image/img00/myServices/chatting_portrait_child@2x.png";
			} else if (age > 12 && age <= 59) {
				img = (sex === "男" ? "/image/img00/myServices/chatting_chatting_man@2x.png" : "/image/img00/myServices/chatting_portrait_woman@2x.png");
			} else if (age >= 60) {
				img = (sex === "男" ? "/image/img00/myServices/chatting_portrait_old_man@2x.png" : "/image/img00/myServices/chatting_portrait_old_woman@2x.png");
			}
			controller.config.avatar = img;

		},
		addReservationHtml: function () {
			var that = this;
			var data = {
				attUseFlag:1
			};
			data.caseId = common.getpara().caseId;
			data.isOrder = common.getpara().isOrder;
			var params = {paramJson: $.toJSON(data)};
			$.ajax({
				url: that.path.getReservationInfo,
				type: "POST",
				dataType: "json",
				data: params,
				success: function (rep) {
					if (rep.responseObject.responseStatus) {
						var data = rep.responseObject.responseData.dataList[0];
						that.getUserLogo(data.patientCasemap)
						var container = $(".tc-caseContentBox");
						//添加概要信息
						if (data.patientCasemap) {

							container.append(that.template.mainInfoHtml(data.patientCasemap));
						}
						//添加症状描述
						if (data.resultMainList.length > 0) {
							container.append(that.template.symptomDescHtml(data.resultMainList,data.patientCasemap));
						}
						//添加现病史
						if (data.patientCasemap) {
							container.append(that.template.presentIllnessHtml(data.patientCasemap));
						}
						//添加基本信息
						if (data.patientCasemap.provinceName && data.patientCasemap.mobile) {
							container.append(that.template.baseInfoHtml(data.patientCasemap));
						}
						//判断是否添加备注
						if (data.patientCasemap.remark) {
							container.append(that.template.remarkHtml(data.patientCasemap.remark));
						}
						that.showBigPic();
            that.appNative();
					}
				}
			})
		},
		//查看大图功能
		showBigPic:function () {
			bigPicShow.init({
				domIdList:[ ".uploadListsBox"],
				imgClickCallBack:function(){},

        closeCallBack:function(){
          $(".main-inner").show();
        },
				topSwiperOptions:{
					isInit:true,
          onInit:function(){
            $(".main-inner").hide();
          },
				},
				bottomSwiperOptions:{
					isInit:true
				}
			});
		},
		appNative: function () {

			/*这段代码是固定的，必须要放到js中*/
			function setupWebViewJavascriptBridge(callback) {

				if (window.WebViewJavascriptBridge) {
					return callback(WebViewJavascriptBridge);
				}
				if (window.WVJBCallbacks) {
					return window.WVJBCallbacks.push(callback);
				}
				window.WVJBCallbacks = [callback];

				var WVJBIframe = document.createElement('iframe');
				WVJBIframe.style.display = 'none';
				WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
				document.documentElement.appendChild(WVJBIframe);
				setTimeout(function () {
					document.documentElement.removeChild(WVJBIframe)
				}, 0)
			}

			/*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
			setupWebViewJavascriptBridge(function (bridge) {
				var uniqueId = 1;

				function log(message, data) {
					var log = document.getElementById('log')
					var el = document.createElement('div')
					el.className = 'logLine'
					el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
					if (log.children.length) {
						log.insertBefore(el, log.children[0])
					}
					else {
						log.appendChild(el)
					}
				}


				/* Initialize your app here */

				/*JS给ObjC提供公开的API（testJavascriptHandler），在ObjC端可以手动调用JS的这个API（调用方法如：[_bridge callHandler:@"testJavascriptHandler" data:@{ @"foo":@"before ready" }];）。
				 1.testJavascriptHandler：JS给ObjC提供公开的API name
				 2.参数data：接收ObjC传过来的参数（data为参数）
				 3.参数responseCallback：可以回调ObjC（responseCallback是OC提供的回调函数）
				 4.responseData：JS传给OC回调函数的参数
				 */

				bridge.registerHandler('returnCaseId', function (data, responseCallback) {
					// log('ObjC called testJavascriptHandler with', data);
					if (!common.getpara().caseId){
						window.location.href='//m.allinmed.cn/pages/directOperation/reservation_list.html?caseId='+JSON.parse(data).caseId+'&isOrder=0';
					}
					var responseData = {'resourceUrl': '//m.allinmed.cn/pages/directOperation/reservation_list.html?caseId='+JSON.parse(data).caseId+'&isOrder=0'};
					// log('JS responding with', responseData)
					responseCallback(responseData)
				})
				/*注册getNativeInfoHandler方法，Native调用此方法传递参数给JS*/
				bridge.registerHandler('getNativeInfoHandler',
					function (data, responseCallback) {
						// log('getNativeInfoHandler', data)
						var responseData = {'Javascript Says': 'Right back atcha!'}
						responseCallback(responseData)
					})
				/*注册getJSRegisterInfoHandler方法，Native调用此方法获取需要注册的本地组件信息*/
				bridge.registerHandler('getJSRegisterInfoHandler',
					function (data, responseCallback) {
						// log('ObjC called testJavascriptHandler with', data)
						var responseData = '{\"jsRegisterList\":[{\"scheme\":\"da-jxjy-app\",\"target\":\"Homepage\",\"action\":\"nativeHomepageViewController\",\"transformType\":\"0\"},{\"scheme\":\"da-jxjy-app\",\"target\":\"PaymentWeb\",\"action\":\"payTableViewController\",\"transformType\":\"1\"}]}'

						var responseData = {
							'jsRegisterList': [{
								'scheme': 'da-jxjy-app',
								'target': 'Homepage',
								'action': 'nativeHomepageViewController',
								'transformType': '0'
							}, {
								'scheme': 'da-jxjy-app',
								'target': 'PaymentWeb',
								'action': 'payTableViewController',
								'transformType': '1'
							}]
						}

						// log('JS responding with', responseData)
						responseCallback(responseData)
					})

				document.body.appendChild(document.createElement('br'))

				var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
				callbackButton.innerHTML = 'Fire testObjcCallback'
				callbackButton.onclick = function (e) {
					e.preventDefault()
					// log('JS calling handler "testObjcCallback"')
					/*
					 JS端调用OC端注册的公开API nativeHomepageViewController
					 1.nativeHomepageViewController：OC端注册的API name
					 2.{'foo': 'bar'}：JS端调用testObjcCallback时，传入的参数
					 3.function(response)：JS端调用完nativeHomepageViewController后，会提供一个回调函数，使OC端代码执行完后，有机会执行JS的一段代码
					 */
					bridge.callHandler('aboutDialServiceNumber', {'mobile': '13552542393'}, function (response) {
						// log('JS got response', response)
					})
				}

				var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
				callbackButton.innerHTML = 'Fire testObjcCallback1'
				callbackButton.onclick = function (e) {
					e.preventDefault()
					// log('JS calling handler "testObjcCallback1"')
					/*
					 JS端调用OC端注册的公开API nativeHomepageViewController
					 1.nativeHomepageViewController：OC端注册的API name
					 2.{'foo': 'bar'}：JS端调用testObjcCallback时，传入的参数
					 3.function(response)：JS端调用完nativeHomepageViewController后，会提供一个回调函数，使OC端代码执行完后，有机会执行JS的一段代码
					 */
					bridge.callHandler('returnCommonParams', {'test': 'fengxia'}, function (response) {
						// log('JS got response', response)
					})
				}
			})
		}
	};
	controller.init();
});
