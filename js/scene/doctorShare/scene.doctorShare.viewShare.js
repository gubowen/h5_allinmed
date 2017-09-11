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
            this.getUrlParam();//得到url参数保存起来
            this.getCodeUrl();//获取二维码链接
        },
        config: {},
        template: {},
        path: {
            getDocMain:"/mcall/customer/auth/v1/getMapById/",
            getCode:"/mcall/wx/allinmed/interact/v1/createQrCodeTicket/"//获取医生二维码
        },
        //得到url参数保存起来
        getUrlParam: function () {
            var that = this;
            var params = common.getpara();
            $.extend(that.config,params);
        },
        //获取二维码链接
        getCodeUrl:function () {
            var that = this;
            //加载医生信息
            $.ajax({
                url: that.path.getCode,
                dataType:"json",
                type: "POST",
                data:{paramJson: $.toJSON({customerId:that.config.customerId,qrCodeType:"2"})},
                success:function(data){
                    console.log(data);
                    // var items = data.responseObject.responseData.dataList;
                    // if (data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList) {
                    //     var _dataList=data.responseObject.responseData.dataList[0];
                    //     //设置二维码链接
                    //     if (_dataList.authMap){
                    //         $(".main-header img").attr("src",_dataList.authMap.qrCodeUrl);
                    //     }
                    // }
                    if (data.responseObject.responseStatus && data.responseObject.responseData.dataList.qrCodeUrl) {
                        $(".main-header img").attr("src",data.responseObject.responseData.dataList.qrCodeUrl);
                    } else {
                        $(".main-header img").attr("src","/image/img00/doctorShare/code_loading_failed.png");
                    }
                },
                error:function(){
                    $(".main-header img").attr("src","/image/img00/doctorShare/code_loading_failed.png");
                }
            })
        }
    };
    controller.init();
});
