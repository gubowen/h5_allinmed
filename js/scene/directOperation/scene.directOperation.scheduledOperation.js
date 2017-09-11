/**
 * @name:
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/03/01
 * @author: lichenyang
 */
$(function() {
	var controller = {

		config: {

		},
		path: {
            saveOperation:'/mcall/customer/patient/reservation/v1/create/'
		},
		init: function() {
            var that = this;
            that.routeControl();
            that.getUrlParam();//获取到当前url的参数
            that.pageClick();
            document.title = "直约手术";
		},
        //页面路由控制
        routeControl : function () {
            var that = this;
            //跳转到搜寻医生的地方
            Q.reg("doctor",function () {
                modules.searchList({
                    targetEle: $(".doctorName.show"),
                    type: "doctor",
                    backCallback:function () {
                        var text = "";
                        text += $(".doctorName.show").attr("data-hospital") && $(".doctorName.show").attr("data-hospital") + "-";
                        text += $(".doctorName.show").attr("data-medicalTitle") && $(".doctorName.show").attr("data-medicalTitle") + "-";
                        text += $(".doctorName.show").attr("data-name") && $(".doctorName.show").attr("data-name");
                        $(".doctorName.show").html(text);
                        document.title = "直约手术";
                        // $(".doctorName .show").addClass('selected');
                        // that.config.partId = $(".doctorName .show").attr('data-partid');
                        // that.buttonClick();
                    }
                })
            });
            Q.reg('index', function () {
                console.log("进入主页...");
                $(".sc-main").show();
                $(".search-box").remove();
                $(".searchTypeSelect").html("");
                document.title = "直约手术";
            });
            // if (location.hash == "#!doctor") {
            //     Q.go("doctor");
            // } else {
            //     Q.go('index');
            // }

            //初始化路由
            Q.init({
                index: 'index'/* 首页地址 */,
            });
            Q.reg('city', function () {
                modules.searchList({
                    targetEle: $(".operationArea .show"),
                    type: "city",
                    level:"2",
                    finalLevel:"4",
                    backCallback:function () {
                        $(".operationArea .show").addClass('selected')
                    }
                })
            });
            //跳到选择疾病的路由该干的事
            Q.reg('illness', function () {
                modules.searchList({
                    targetEle: $(".operationName .show"),
                    type: "illness",
                    backCallback:function () {
                        $(".operationName .show").addClass('selected');
                        that.config.partId = $(".operationName .show").attr('data-partid');
                        that.buttonClick();
                    }
                })
            });
        },
        //得到url参数保存起来
        getUrlParam: function () {
            var that = this;
            var params = common.getpara();
            // console.log(params);
            $.extend(that.config,params);
            // console.log(that.config);
        },
        //页面点击函数
        pageClick: function() {
            var t =this;
            //询问是否看过医生添加点击事件
			$(".sc-infoAskConfirm").on("click",".sc-infoAskConfirmList",function() {
                //判断用户是否点击是，则弹出搜寻医生的步骤
                if ($(this).hasClass('sc-infoAskConfirmYes')){
                    if(!$(this).hasClass("on")) {
                        $('.sc-selectDoctor').show();
                        // console.log($(".doctorName .show"));
                        Q.go("doctor",function () {

                        })
                    }
                } else {
                    $('.sc-selectDoctor').hide();
                }
                //切换选中
                if($(this).hasClass('on')) {
                    return false;
                } else {
                    $(this).addClass('on');
                    $(this).siblings().removeClass('on');
				}
			});

            //选择手术名称的点击事件
            $('.sc-infoItem .operationName').on('click',function () {
                //调到选择手术的路由
                Q.go('illness', function () {

                });
            });

            // 期望手术时间select点击值付给span,并给span设置data-id
            $('.sc-infoItemRight.hasSelect select').on('change',function () {
                var selectVal = $(this).val();
                $(this).siblings('.show').text(selectVal).addClass('selected');
                $(this).siblings('.show').attr('data-id',$(this).find(':selected').data('id'));
                console.log($(this).find(':selected').data('id'));
                //判断提交按钮是否可以点击函数
                t.buttonClick();
            });

            //给选择医生里点击修改添加按钮
            $('.sc-selectDoctor .modify').on('click',function () {
                Q.go("doctor",function () {

                })
            });

            //选择期望手术地区的点击
            $('.sc-infoItem .operationArea').on('click',function () {
                Q.go('city', function () {

                });
            });

            //提交按钮的事件，表单验证给提交按钮添加disabled属性
            $('#infoBtn').on('click',function () {
                t.saveOperationInfo();
            })
		},

	    //添加判断按钮是否可以点击的函数
        buttonClick : function () {
            var requiredArray = $('.sc-infoItem[data-required="1"]').find('.sc-infoItemRight .show');
            var flag = 1;
            $.each(requiredArray,function (index,element) {
                if (!$(element).hasClass('selected')) {
                    flag = 0;
                }
            });
            if (flag) {
                $('#infoBtn').removeAttr('disabled');
            }
        },

        //保存页面信息
        saveOperationInfo : function () {
            var that = this;
            var data = {};
            data.patientId = that.config.patientId;
            data.caseId = that.config.caseId;
            data.operationId = $("[data-type='operationName'] .show").attr("data-iid");
            data.operationName = $("[data-type='operationName'] .show").text();
            data.expectedTime = $("[data-type='expectedTime'] .show").data('id');
            data.provinceId = $("[data-type='area'] .show").data("provinceid") || "";
            data.province = $("[data-type='area'] .show").data("province") || "";
            data.cityId = $("[data-type='area'] .show").data("cityid") || "";
            data.city = $("[data-type='area'] .show").data("city") || "";
            data.districtId = $("[data-type='area'] .show").data("districtid") || "";
            data.district = $("[data-type='area'] .show").data("district") || "";
            data.doctorId = $("[data-type='doctorId'] .show").data("doctorid") || "";
            data.hospitalId = $("[data-type='doctorId'] .show").data("hospitalid") || "";
            data.hospital = $("[data-type='doctorId'] .show").data("hospital") || "";
            // if ($(".sc-infoAskConfirm .sc-infoAskConfirmList.on").hasClass('sc-infoAskConfirmYes')) {
            //     data.doctorId = $("[data-type='doctor'] .show").data("doctorid");
            // }
            var params = {paramJson:$.toJSON(data)};
            $.ajax({
                url: that.path.saveOperation,
                type: 'POST',
                dataType: "json",
                data: params,
                beforeSend: function () {
                    common.loading.show();
                },
                success: function (data) {
                    common.loading.hide();
                    if (data && data.responseObject.responseStatus) {
                        window.location.href = "//m.allinmed.cn/pages/imScene/im_main_scene.html?from=operation&caseId=" + that.config.caseId + "&patientId=" + that.config.patientId + "&partId=" + that.config.partId+ "&customerId=" + that.config.customerId;
                    }

                },
                fail :function (data) {
                    common.loading.hide();
                }
            })
        }


	};

	controller.init();

});
