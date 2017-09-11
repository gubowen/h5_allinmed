/**
 * @Desc：门诊预约模块
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by gubowen、wangjingrong on 2017/4/11.
 */

modules.dateDiagrame = function(){
	var container = {
		template:{
			outerBox:function(){
				return  '    <h2 class="moudle_title">预约门诊</h2>'+
					'        <section class="select-hospital">'+
					'            <span class="select" id="selectHospital"></span>'+
					'            <i class="select-icon-down"></i>'+
					'        </section>'+
					'        <article class="data-diagram">'+
					'            <header>'+
					'                <dl>'+
					'                    <dd>门诊</dd>'+
					'                    <dd>上午</dd>'+
					'                    <dd>下午</dd>'+
					'                    <dd>晚上</dd>'+
					'                </dl>'+
					'            </header>'+
					'            <section class="content">'+
					'                <div></div>'+
					'            </section>'+
					'            <section class="explain"></section>'+
					'        </article>'
			},
			content: function (data) {
				var week,
					clinicType,
					allDayData = data.data,
					nowDate = new Date().getTime();
				//处理日期（周？）
				switch(Number(data.dateType)){
					case 1:
						week = "周一";
						break;
					case 2:
						week = "周二";
						break;
					case 3:
						week = "周三";
						break;
					case 4:
						week = "周四";
						break;
					case 5:
						week = "周五";
						break;
					case 6:
						week = "周六";
						break;
					case 7:
						week = "周日";
						break;
				}
				//处理时间
				var dateTime = data.dateTime.split("-");

				var html = '<article>' +
					'<ul>' +
					'<li class="dayWeekBox">' +
					'<div class="day" data-time="'+data.dateTime+'" data-day="'+dateTime[1]+"月"+dateTime[2]+"日"+'">'+dateTime[1]+"."+dateTime[2]+'</div>' +
					'<div class="week">'+week+'</div>' +
					'</li>' +
					(function(){
						var allDayHtml1 = '<li timeType="上午"></li>';
						var allDayHtml2 = '<li timeType="下午"></li>';
						var allDayHtml3 = '<li timeType="晚上"></li>';
						for(var i=0;i<3;i++){
							if(allDayData[i]&&allDayData[i].timeType == 1){

								var orderTime = " 08:30:00",
									frontTime = Date.parse((allDayData[i].dateTime+orderTime).replace(/-/g, "/"));
								//处理门诊类型（普、专、特）
								switch(Number(allDayData[i].clinicType)){
									case 1:
										if(allDayData[i].remainNum<=0 || frontTime < nowDate){
											clinicType = "good";
										}else{
											clinicType = "good on";
										}
										break;
									case 2:
										if(allDayData[i].remainNum<=0 || frontTime < nowDate){
											clinicType = "better";
										}else{
											clinicType = "better on";
										}
										break;
									case 3:
										if(allDayData[i].remainNum<=0 || frontTime < nowDate){
											clinicType = "best";
										}else{
											clinicType = "best on";
										}
										break;
								}
								allDayHtml1 = '<li timeType="上午" data-isClinic="'+allDayData[i].isClinic+'" data-clinicid="'+allDayData[i].clinicId+'">' +
									'<i class="'+clinicType+'" data-clinicType="'+allDayData[i].clinicType+'"></i><div>余 '+(allDayData[i].remainNum<=0?"0":allDayData[i].remainNum)+' 人</div>'+
									'</li>'
							}else if(allDayData[i]&&allDayData[i].timeType == 2){
								var orderTime = " 14:00:00",
									frontTime = Date.parse((allDayData[i].dateTime+orderTime).replace(/-/g, "/"));
								//处理门诊类型（普、专、特）
								switch(Number(allDayData[i].clinicType)){
									case 1:
										if(allDayData[i].remainNum<=0 || frontTime < nowDate){
											clinicType = "good";
										}else{
											clinicType = "good on";
										}
										break;
									case 2:
										if(allDayData[i].remainNum<=0 || frontTime < nowDate){
											clinicType = "better";
										}else{
											clinicType = "better on";
										}
										break;
									case 3:
										if(allDayData[i].remainNum<=0 || frontTime < nowDate){
											clinicType = "best";
										}else{
											clinicType = "best on";
										}
										break;
								}
								allDayHtml2 = '<li timeType="下午" data-isClinic="'+allDayData[i].isClinic+'" data-clinicid="'+allDayData[i].clinicId+'">' +
									'<i class="'+clinicType+'" data-clinicType="'+allDayData[i].clinicType+'"></i><div>余 '+(allDayData[i].remainNum<=0?"0":allDayData[i].remainNum)+' 人</div>'+
									'</li>'
							}else if(allDayData[i]&&allDayData[i].timeType == 3){
								var orderTime = " 19:30:00",
									frontTime = Date.parse((allDayData[i].dateTime+orderTime).replace(/-/g, "/"));
								//处理门诊类型（普、专、特）
								switch(Number(allDayData[i].clinicType)){
									case 1:
										if(allDayData[i].remainNum<=0 || frontTime < nowDate){
											clinicType = "good";
										}else{
											clinicType = "good on";
										}
										break;
									case 2:
										if(allDayData[i].remainNum<=0 || frontTime < nowDate){
											clinicType = "better";
										}else{
											clinicType = "better on";
										}
										break;
									case 3:
										if(allDayData[i].remainNum<=0 || frontTime < nowDate){
											clinicType = "best";
										}else{
											clinicType = "best on";
										}
										break;
								}
								allDayHtml3 = '<li timeType="晚上" data-isClinic="'+allDayData[i].isClinic+'" data-clinicid="'+allDayData[i].clinicId+'">' +
									'<i class="'+clinicType+'" data-clinicType="'+allDayData[i].clinicType+'"></i><div>余 '+(allDayData[i].remainNum<=0?"0":allDayData[i].remainNum)+' 人</div>'+
									'</li>'
							}
						}
						return allDayHtml1 + allDayHtml2 + allDayHtml3;
					})()+
					'</ul>' +
					'</article>';
				return html;
			},
			explain: function (data) {
				var price = data.hospitalList[0].costStandard,generalPriceNum,expertPriceNum,specialPriceNum;
				//判断各个门诊价格
				if(price.ordinary){
					if(price.ordinary==0){
						generalPriceNum = "免费";
					}else{
						generalPriceNum = price.ordinary+"元";
					}
				}else{
					generalPriceNum = "未设置";
				}
				if(price.expert){
					if(price.expert==0){
						expertPriceNum = "免费";
					}else{
						expertPriceNum = price.expert+"元";
					}
				}else{
					expertPriceNum = "未设置"
				}
				if(price.special){
					if(price.special==0){
						specialPriceNum = "免费"
					}else{
						specialPriceNum = price.special+"元"
					}
				}else{
					specialPriceNum = "未设置"
				}
				var html = '<ul>' +
					'<li>' +
					'<div><i class="good on"></i>普通门诊</div>' +
					'<div class="money" data-price="'+generalPriceNum+'">（'+generalPriceNum+'）</div>' +
					'</li>' +
					'<li>' +
					'<div><i class="better on"></i>专家门诊</div>' +
					'<div class="money" data-price="'+expertPriceNum+'">（'+expertPriceNum+'）</div>' +
					'</li>' +
					'<li>' +
					'<div><i class="best on"></i>特需门诊</div>' +
					'<div class="money" data-price="'+specialPriceNum+'">（'+specialPriceNum+'）</div>' +
					'</li>' +
					'</ul>';
				return html;
			}
		},
		config:{

		},
		path:{
			getDocHospital:"/mcall/customer/clinic/setting/v1/getMapList/",//医院列表
			getClinicDetails:"/mcall/customer/clinic/setting/v1/getMapById/"//门诊详情
		},
		init: function () {
			var t = this;
			$(".orderVisit").html(t.template.outerBox());
			t.hospitalList();
		},
		//初始化医院列表的数据
		hospitalList:function () {
			var t = this;
			var param = {
				customerId:common.getpara().customerId
			};
			$.ajax({
				url: t.path.getDocHospital,
				timeout:10000,
				type: 'POST',
				async:false,
				data:{paramJson: $.toJSON(param)},
				dataType:"json",
				success:function(data){
					if(data.responseObject.responseData.dataList){
						var items = data.responseObject.responseData.dataList;
						var hospitalData = [];
						$.each(items,function(index,element){
							hospitalData.push({
								text: element.hospital,
								value: element.hospital,
								id:element.hospitalId
							})
						});
						//加载医院名称
						if(hospitalData.length>0){
							if(hospitalData.length==1){
								$(".select-hospital .select-icon-down").remove();
							}
							$("#selectHospital").text(hospitalData[0].text);
							$("#selectHospital").attr("data-hosId",hospitalData[0].id);
							//加载门诊详情
							t.addHtml(hospitalData[0].id);
							//仿IOS医院选择
							var picker = new Picker({
								data: [hospitalData]
							});
							$(".wheel-item").each(function(index,element){
								$(element).attr("data-id",hospitalData[index].id);
							});
							$("#selectHospital").on("click", function () {
								picker.show();//点击时显示职称
								$(".select-hospital .select-icon-down").removeClass("select-icon-down").addClass("select-icon-up");
							});
							picker.on('picker.valuechange', function (selectedVal, selectedIndex) {//每次选择完职称触发相应职称的时间选择
								$("#selectHospital").html(selectedVal[0]);
								$("#selectHospital").attr("data-hosId",$(".wheel-item").eq(selectedIndex).attr("data-id"));
								t.addHtml($(".wheel-item").eq(selectedIndex).attr("data-id"));
								$(".select-hospital .select-icon-up").removeClass("select-icon-up").addClass("select-icon-down");
							});
						}else{

						}
					}else{
						$(".select-hospital .select-icon-down").remove();
						$(".content>div").html("<p class='notClinic'>暂无门诊安排</p>");
					}
				},
				error:function(){}
			});
		},
		//初始化门诊时间
		addHtml:function(id){
			var t = this;
			var param = {
				customerId:common.getpara().customerId,
				hospitalId:id
			};

			$.ajax({
				url:t.path.getClinicDetails,
				timeout:5000,
				type: 'POST',
				async:false,
				data:{paramJson: $.toJSON(param)},
				dataType:"json",
				success:function(data){
					if(data.responseObject.responseData.dataList){
						var items = data.responseObject.responseData.dataList[0];
						//门诊预约条件
						if((items.clinicRemark&&items.clinicRemark.length>0) || (items.illnessList&&items.illnessList.length>0)){
							//疾病加备注
							var remarkHtml = '<dl class="orderCon">' +
								'<dt>门诊预约条件</dt>' +
								'<dd class="orderCondition">'+
								(function () {
									var remarkHtml_illness = '';
									$.each(items.illnessList, function (index, element) {
										remarkHtml_illness += element.illnessName + ','
									})
									if(items.clinicRemark && remarkHtml_illness){
										return remarkHtml_illness + items.clinicRemark;
									}else if(items.clinicRemark){
										return items.clinicRemark;
									}else if(remarkHtml_illness){
										return remarkHtml_illness.substring(0,remarkHtml_illness.length-1)
									}else{
										return '';
									}
								})() +
								'</dd>' +
								'</dl>';

							$(".bookingConditions").html(remarkHtml);
						}
						t.isHasMore({
							element:".orderCondition",
							numOne:45,
							numTwo:85,
							numThree:165
						});
						$(".showHide").off("click").on("click",function () {
							var thisPrev = $(this).prev();
							thisPrev.toggleClass("overText");
							if ($(this).hasClass("icon-more")) {
								$(this).removeClass("icon-more").addClass("icon-less");
							} else {
								$(this).removeClass("icon-less").addClass("icon-more");
							}
						})
						//预约须知
						$(".content").attr("remark",items.hospitalList[0].remark);
						$(".content>div").html("").css("width", (items.hospitalList[0].clinicTime.length) * (148 / 75 +0.03) + 'rem');
						$.each(items.hospitalList[0].clinicTime,function(index,element){
							$(".content>div").append(t.template.content(element));
						});
						$(".data-diagram .explain").html(t.template.explain(items));
					}else{
						$(".content>div").html("<p class='notClinic'>暂无门诊安排</p>");
					}
				},
				error:function(){
					$(".content>div").html("<p class='notClinic'>暂无门诊安排</p>");
				}
			})
		},
		//是否有更多
		isHasMore:function(obj){
			var element = $(obj.element),
				eH = element.height(),
				dpr = $("html").attr("data-dpr");
			if((dpr==1&&eH>obj.numOne) || (dpr==2&&eH>obj.numTwo) || (dpr==3&&eH>obj.numThree)){
				element.addClass("overText");
				element.after('<dd class="icon-more showHide"></dd>');
			}
		}
	}
	container.init();
};