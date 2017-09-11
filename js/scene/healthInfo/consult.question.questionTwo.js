/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/7/19.
 */
$(function(){
   var container = {
       init:function(){
           var _t =this;
           _t.load();
       },
       load:function(){
           var _t =this;
           $('.questionContain-PartTwo').find('.questionSelectBtn').on("click",function(){
               $(this).addClass('selected').siblings('.questionSelectBtn').removeClass('selected');
               if($(this).data('type')==1){
                   $(this).closest('.questionItem-common').find('.questionHiddenCommon').show();
                   switch ($(this).data('source')){
                       case 1:
                           //就诊医院
                           _t.choseHospital();
                           break;
                       case 2:
                           //上传资料
                           _t.upLoadFiles();
                           break;
                       case 3:
                           //服用药物
                           _t.takeMedicine();
                           break;
                   }
               }else {
                   $(this).closest('.questionItem-common').find('.questionHiddenCommon').hide();

               }
           })
       },
       choseHospital:function(){

       },
       upLoadFiles:function(){
           var _t = this;
           modules.upLoadFilesPlus({
               caseId:'',
               data:'',                   // 图集数组 （有历史图片数据需传图集数组）
               picPkList:'',              //图片ID串 (IM入口需传)
               route:'index',             //路由
               loadBox:$('.questionContain-PartTwo').find('.upLoadBox'),
               imageType:'0',         // 上传资料类型  （历史健康信息-0、初诊建议- 2、患者咨询问诊单：（0 ）直约手术：（0 ）（无CaseId）IM检查检验：（1   //2-检查/3-检验））
               upLoadType:'0',        // 方法调用类型   0-就医辅助(检查资料) 1-视诊 2-初诊建议 3-检查检验 4-患处照片
               manualTrigger:true,    // true-手动触发  false-自动触发  （非必填 不填默认为自动触发）
               fileCallBack:function(picList) {
               //回调函数返回文件主键PK串

               },
               backFunction:function(){
               //来源页路由里的方法事件

               }
           });
       },
       takeMedicine:function(){

       }
   };
   container.init();
});