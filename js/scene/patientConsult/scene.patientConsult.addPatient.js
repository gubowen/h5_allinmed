/**
 * @Desc：添加患者
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/2/27
 */

$(function () {

    /**
     * @param：openId校验
     */
     if (!common.checkOpenId()) {
         common.wxGetOpenId(1);    //获取openId
     }
    modules.patient(1);

    $(".add-patient-content input").val("");
    $(".add-patient-sex-selector").removeClass("on");
    $(".add-patient-sex-selector[data-sex='1']").addClass("on");
    $("#ev-relationship").val();

    localStorage.removeItem("caseId");
});