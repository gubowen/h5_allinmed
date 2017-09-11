/**
 * Created by ALLIN on 2017/3/20.
 */
/**
 * @name:
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/03/20
 * @author: lichenyang
 */

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
					'<span class="tc-personIcon"></span>' +
					'</div>' +
					'<div class="tc-baseInfoItemRight">' +
					'<span class="tc-baseInfoName">' + data.patientName + '</span>' +
					'<span class="tc-baseInfoSex">' + data.sexName + '</span>' +
					'<span class="tc-baseInfoAge">' + data.age + '</span>' +
					'</div>' +
					'</li>' +
					'<li class="tc-baseInfoItem">' +
					'<div class="tc-baseInfoItemLeft tc-caseAreaLeft">' +

					(common.getpara().isOrder == 0 ? '<span>问诊日期</span>' : '<span>预约日期</span>') +
					'</div>' +
					'<div class=" tc-caseAreaRight">' +
					'<span>' + _caseTime + '</span>' +
					'</div></li>' +
					'<li class="tc-baseInfoItem">' +
					'<div class="tc-baseInfoItemLeft tc-caseTimeLeft">' +
					'<span>主诉</span>' +
					'</div>' +
					'<div class="tc-caseTimeRight">' +
					'<span>' + data.caseMain + (data.caseAlong && "伴随" + data.caseAlong) + '</span>' +
					'</div>' +
					'</li>' +
					'</ul>' +
					'</section>';
				return tempHtml;
			},
			//预约手术信息
			scheduledOperationHtml: function (data) {
				var tempHtml = "";
				tempHtml = '<section class="tc-caseDescribe tc-module">' +
					'<section class="tc-caseDescribeTitle title">' +
					'<h3>预约手术信息</h3>' +
					'</section>' +
					'<ul class="tc-caseDescribeList">' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">所需手术</span><span class="tc-caseDescribeItemRight">' + data.operationName + '</span>' +
					'</li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">期望手术时间</span><span class="tc-caseDescribeItemRight">' + (function () {
						switch (data.expectedTime) {
							case "0":
								return "尽快";
								break;
							case "1":
								return "一周内";
								break;
							case "2":
								return "一月内";
								break;
							case "3":
								return "一年内";
								break;
							case "4":
								return "一年以上";
								break;
						}
					})() + '</span>' +
					'</li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">期望手术地区</span><span class="tc-caseDescribeItemRight">' + ($.trim(data.provinceName + " " + data.cityName + " " + data.districtName) || "无") + '</span></li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">心仪医生</span><span class="tc-caseDescribeItemRight">' + (data.doctorName || "无") + '</span>' +
					'</li>' +
					'</ul>' +
					'</section>';
				return tempHtml;
			},
			//症状描述
			symptomDescHtml: function (data, alongList) {
				var tempHtml = "";
				tempHtml = '<section class="tc-caseDescribe tc-module">' +
					'<section class="tc-caseDescribeTitle title">' +
					'<h3>' + (alongList ? "伴随症状" : "症状描述") + '</h3>' +
					'</section>' +
					'<ul class="tc-caseDescribeList">' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">' + (alongList ? "不适部位" : "主要不适部位") + '</span><span class="tc-caseDescribeItemRight">' + data[0].partName + '</span>' +
					'</li>' +
					(function () {
						var result = "";
						$.each(data, function (index, element) {
							var questionDesc = element.questionDesc;
							if (questionDesc == "主要症状" && alongList) {
								questionDesc = "伴随症状";
							}
							// console.log(element);
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
										secondArray.push(ele.symptomOptions[0].optionName);
									})
								}
								var secondString = secondArray.join("-");
								firstArry.push(secondString);
							});
							var firstString = firstArry.join(",");
							result += '<li class="tc-caseDescribeItem">' +
								'<span class="tc-caseDescribeItemLeft">' + questionDesc + '</span><span class="tc-caseDescribeItemRight">' + firstString + '</span>' +
								'</li>'
						});
						return result
					})() +
					'</ul>' +
					'</section>';
				return tempHtml;
			},
			//现病史
			presentIllnessHtml: function (data) {
				var tempHtml = "";
				tempHtml = '<section class="tc-caseDescribe tc-module">' +
					'<section class="tc-caseDescribeTitle title">' +
					'<h3>现病史</h3>' +
					'</section>' +
					'<ul class="tc-caseDescribeList">' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">曾就诊医院</span><span class="tc-caseDescribeItemRight">' + (data.treatmentName || "无") + '</span>' +
					'</li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">确认疾病名称</span><span class="tc-caseDescribeItemRight">' + (data.illnessName || "无") + '</span>' +
					'</li>' +
					'<li class="tc-caseDescribeItem '+ (data.attachmentList.length > 0 ? "hasAfter" : "") + '">' +
					'<span class="tc-caseDescribeItemLeft">检查资料<i>(X光片等)</i></span><span class="tc-caseDescribeItemRight ev-imageShowBtn ' + '" data-type="' + (data.attachmentList.length > 0 ? "0" : "1") + ' ">' + (data.attachmentList.length > 0 ? "已上传" : "未上传") + '</span>' +
					'</li>' +
					'</ul>' +
					'</section>';
				return tempHtml;
			},
			//疾病史
			historyIllnessHtml: function (data) {
				var tempHtml = "";
				tempHtml = '<section class="tc-caseDescribe tc-module">' +
					'<section class="tc-caseDescribeTitle title">' +
					'<h3>既往史</h3>' +
					'</section>' +
					'<ul class="tc-caseDescribeList">' +
					(function () {
						var result = "";
						if (data.length) {
							$.each(data, function (index, element) {
								var tempArray = [];
								var typeName = element.typeName;
								$.each(element.customerHistory, function (ind, ele) {
									tempArray.push(ele.historyName);
								});
								var tempString = tempArray.join("、");
								result += '<li class="tc-caseDescribeItem">' +
									'<span class="tc-caseDescribeItemLeft">' + typeName + '</span><span class="tc-caseDescribeItemRight">' + tempString + '</span>' +
									'</li>';
							})
						} else {
							result = '<li class="tc-caseDescribeItem">' +
								'<span class="tc-caseDescribeItemLeft">无</span><span class="tc-caseDescribeItemRight"></span>' +
								'</li>';
						}
						return result;
					})() +
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
					'<span class="tc-caseDescribeItemLeft">患者所在地</span><span class="tc-caseDescribeItemRight">' + data.provinceName + " " + data.cityName + " " + data.districtName + '</span>' +
					'</li>' +
					'<li class="tc-caseDescribeItem">' +
					'<span class="tc-caseDescribeItemLeft">手机号码</span><span class="tc-caseDescribeItemRight">' + data.mobile + '</span>' +
					'</li>' +
					//'<li class="tc-caseDescribeItem">' +
					//'<span class="tc-caseDescribeItemLeft">社保类型</span><span class="tc-caseDescribeItemRight">' + (data.socialName || "无") + '</span></li>' +
					//'<li class="tc-caseDescribeItem">' +
					//'<span class="tc-caseDescribeItemLeft">社保所在地</span><span class="tc-caseDescribeItemRight">' + ($.trim(data.socialProvinceName + " " + data.socialCityName + " " + data.socialDistrictName) || "无") + '</span>' +
					//'</li>' +
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
			this.appNative();
			this.addReservationHtml();
			this.routerControl();


			if (parseInt(common.getpara().isOrder) == 0) {
				document.title = "问诊单";
			} else {
				document.title = "手术预约单";
			}
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
		routerControl: function () {
			// var that = this;
			Q.reg('reservation', function () {
				console.log("进入主页...");

			});
			Q.go("reservation");
			// Q.reg("reservation",function () {
			//     $(".main-inner").show();
			// });
			Q.init({
				index: 'reservation'/* 首页地址 */
			});
		},
		addReservationHtml: function () {
			var that = this;
			var data = {
				attUseFlag:1,
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
						//添加预约手术信息
						// if (data.reservationList.length > 0) {
						//     container.append(that.template.scheduledOperationHtml(data.reservationList[0]));
						// }
						//添加症状描述
						if (data.resultMainList.length > 0) {
							container.append(that.template.symptomDescHtml(data.resultMainList));
						}
						//添加伴随症状
						// if (data.resultAlongList.length > 0) {
						//     container.append(that.template.symptomDescHtml(data.resultAlongList, "alongList"));
						// }
						//添加现病史
						if (data.patientCasemap) {
							container.append(that.template.presentIllnessHtml(data.patientCasemap));
							if (data.patientCasemap.attachmentList.length) {
								modules.upPicReview({
									data: data.patientCasemap.attachmentList,
									content: $('.main-inner'),   //要隐藏掉的容器
									picElem: $('.ev-imageShowBtn'),  //查看图片列表的元素
									route: "reservation"
								});
							}
						}
						//添加疾病史
						// container.append(that.template.historyIllnessHtml(data.caseHistoryList));
						//添加基本信息
						if (data.patientCasemap.provinceName && data.patientCasemap.mobile) {
							container.append(that.template.baseInfoHtml(data.patientCasemap));
						}
						//判断是否添加备注（手术预约单的备注）
						// if (data.patientCasemap.caseRemark) {
						//     container.append(that.template.remarkHtml(data.patientCasemap.caseRemark));
						// }
						//判断是否添加备注
						if (data.patientCasemap.remark) {
							container.append(that.template.remarkHtml(data.patientCasemap.remark));
						}
					}
				}
			})
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
