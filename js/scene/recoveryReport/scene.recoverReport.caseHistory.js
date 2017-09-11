/**
 * @Desc：问诊单浏览
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/3/9.
 */
$(function(){
   var container={
       op:{

       },
       path:{
           caseHistory:'/mcall/customer/patient/case/v1/getMapById/'  //问诊单详情url
       },
       init:function(){
           var _t=this;
           _t.firstLoad();
       },
       firstLoad:function(){
           var _t=this;
           _t.picAjax({
               data:{caseId:1489545287440},
               path:_t.path.caseHistory,
               callBack:function(data){
                   if(data&&data.responseObject&&data.responseObject.responseData&&data.responseObject.responseData.dataList){
                       var dataList=data.responseObject.responseData.dataList;
                       if(dataList.length>0){
                           console.log(dataList);
                           _t.dataDeal({data:dataList[0]});
                       }
                   }
               }
           })
       },
       //数据处理
       dataDeal:function(Rv){
           var _t = this,
               _data = Rv.data,
               _caseHistoryList = _data.caseHistoryList,  //既往史
               _patientCasemap = _data.patientCasemap,    //现病史 基本信息
               _resultAlongList = _data.resultAlongList,
               _resultMainList = _data.resultMainList;
           _t.baseInformation(_patientCasemap);
       },
       //基本信息
       baseInformation:function(Dv){

       },
       template:{

       },
       //通用Ajax
       picAjax:function(pv){
           var _t=this,
               params={paramJson: $.toJSON(pv.data)};
           common.loading.show();
           $.ajax({
               url:pv.path,
               data:params,
               type:"POST",
               dataType:"json",
               success:function(data){
                   common.loading.hide();
                   pv.callBack(data);
                   console.log(data);
               },
               error:function(){
                   common.loading.hide();
               }
           })
       }
   };
    container.init();
});