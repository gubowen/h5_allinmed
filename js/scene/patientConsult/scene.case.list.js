/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/3/22
 */
$(function () {
    var container = {
        init: function () {
            this.getCaseList();
        },
        XHRList: {
            getList: "/mcall/customer/patient/case/v1/getCaseMapList/"
        },

        template: {
            listItem: function (data) {
                return '<article class="case-list-item icon-rightArrow">' +
                    '                <a class="time" href="//m.allinmed.cn/dist/symptomList.html#/mainSymptom?patientId='+common.getpara().patientId+'&caseId='+data.caseId+'&customerId='+common.getpara().customerId+'">'+data.createTime.substring(0,10).replace(/-/,"年").replace(/-/,"月")+'日'+'</a>' +
                    '                <a class="case-list-item-name" href="//m.allinmed.cn/dist/symptomList.html#/mainSymptom?patientId='+common.getpara().patientId+'&caseId='+data.caseId+'&customerId='+common.getpara().customerId+'">'+(data.mainContent.caseMain.length>10?data.mainContent.caseMain.substring(0,8)+"...":data.mainContent.caseMain)+'</a>' +
                    '            </article>';
            }
        },
        getCaseList: function () {
            var that=this;
            $.ajax({
                url: this.XHRList.getList,
                type: 'POST',
                dataType: 'json',
                timeout:10000,
                beforeSend:function () {
                  common.loading.show();
                },
                data: {
                    paramJson:$.toJSON({
                        patientId:common.getpara().patientId,
                        caseType:"0,1"
                    })
                }
            })
                .done(function(data) {
                    console.log("success");
                    if (data.responseObject.responseData){
                        var dataList=data.responseObject.responseData.dataList;
                        if (dataList && dataList.length!==0){
                            $(dataList.reverse()).each(function (index,element) {
                                if (element.mainContent.caseMain.length>0){
                                    $(".case-list").append(that.template.listItem(element))
                                }
                            });

                        }
                    }
                    localStorage.removeItem("mHasSend");
                    localStorage.removeItem("oHasSend");

                    common.loading.hide();
                })
        }
    };
    container.init();
});
