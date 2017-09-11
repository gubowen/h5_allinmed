/**
 * @Desc：查看上传图片列表
 * @Usage:  modules.upPicReview({
 *               data:'',                    // 图集数组
 *               route:'',                   //来源页路由
 *               content:$('.main-inner'),   //要隐藏掉的容器
 *               picElem:$('.ev-picUpView') //查看图片列表的元素
 *               backFunction:function(){
 *                     //来源页路由里的方法事件
 *                   }
 *               });
 * @Notify：
 * @Depend：
 *
 * Created by JuKun on 2017/3/9.
 */
modules.upPicReview = function(Obj){
    var container = {
        op:{},
        init:function(){
            var _t=this;
            Q.reg(Obj.route,function(){
                $('.tc-upLoadBox.ev-picUpReview').hide();
                Obj.content.show();
                $(window).scrollTop(_t.op.scrollTop);
                //执行来源页路由方法
                if (typeof Obj.backFunction == "function" && Obj.backFunction) {
                    Obj.backFunction();
                }
            });
            Q.reg('upLoadReview',function(){
                if($('.ev-picUpReview').length>0){
                    $('.ev-picUpReview').show();
                    Obj.content.hide();
                }else{
                    _t.pageOnLoad();
                }
            });
            //查看大图路由
            Q.reg('reviewImg',function(){
                $('.ev-fileUpHide').hide();
                $('.main-inner.tc-upLoadFile').hide();
            });
            Obj.picElem.on("click",function(){
                _t.op.scrollTop = $(window).scrollTop();
                Q.go('upLoadReview');
            });
        },
        template:function(tv){
            var _t=this,
                _picHtml='';
            $.each(tv,function(i,val){
                var _uploadAttList = val.uploadAttList?val.uploadAttList:"",
                    _picListHtml = '';
                if(_uploadAttList.length>0){
                    $.each(_uploadAttList,function(k,kal){
                        _picListHtml+='<li class="tc-upLoadItemList"><img src="'+(kal.caseAttUrl)+'" alt=""></li>';
                    });
                }
                _picHtml+= '<section class="tc-upLoadList">'+
                    '    <figure class="tc-upLoadTitle">'+
                    '        <span class="tc-upLoadTitleName">'+val.uploadName+'</span>'+
                    '    </figure>'+
                    '    <ul class="tc-upLoadItemBox docInt" style="display: '+(_uploadAttList.length>0?"block":"none")+'">'+_picListHtml+'</ul>'+
                    '</section>';
            });
            return '<section class="tc-upLoadBox ev-picUpReview">'+_picHtml+'</section>';
        },
        pageOnLoad:function(){
            var _t=this,
                _data = Obj.data;
            if(_data && _data.length>0){
                var _html=_t.template(_data);
                $('body').append(_html);
                _t.viewBigImg();
                Obj.content.hide();
            }
        },
        //查看大图
        viewBigImg:function(){
            bigPicShow.init({
                /**
                 * 指定多个class|| ID
                 * */
                domIdList:[ ".docInt"]
            });
        }
    };
    container.init(Obj);
};


//modules.upPicReview({
//    data:'',
//    route:'',
//    content:$('.main-inner'),   //要隐藏掉的容器
//    picElem:$('.ev-picUpView')  //查看图片列表的元素
//    backFunction:function(){
//       //来源页路由事件
//    }
//});