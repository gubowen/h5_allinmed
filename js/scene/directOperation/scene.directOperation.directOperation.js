/**
 * @name:
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/2/28
 * @author: lichenyang
 */

$(function () {
    var addPatient = {

    };

    /**
     * @param：openId校验
     */
    if (!common.checkOpenId()) {
        common.wxGetOpenId(1);    //获取openId
    }
    modules.patient({
    	type:1
    });
    localStorage.removeItem("caseId");
    localStorage.removeItem("patientId");
});