/**
 *  @Desc：  文件上传
 *  @Usage:
              modules.upLoadFilesPlus({
                 caseId:'',
                 data:'',           // 图集数组 （有历史图片数据需传图集数组）
                 picPkList:'',      //图片ID串 (IM入口需传)
                 route:'',          //路由
                 imageType:'1',     // 上传资料类型   0-就医辅助(检查资料) 1-视诊 2-初诊建议 3-检查检验 4-患处照片
                 upLoadType:'',      //方法调用类型  （1-咨询病情描述、2-直约手术<无caseId>、3-问诊单、4-IM入口、5-初诊建议）
                 manualTrigger:true, //true-手动触发  false-自动触发  （非必填 不填默认为自动触发）
                 fileCallBack:function(picList) {
                     //回调函数返回文件主键PK串
                 }
                 backFunction:function(){
                     //来源页路由里的方法事件
                 }
             });
 *            需在上传元素绑定: ".ev-upLoadBtn" 类名
 *            可视块容器(body下主容器)绑定:  ".ev-fileUpHide" 类名
 *
 *  @Notify：WeChat return is a super pit, Q.js is a big pit, especially in WeChat, accidentally got out of hand...
 *  @Depend：  css:
 *             "/js/third-party/swiper/css/showBigImg.css"        //查看大图css
 *              "/js/third-party/swiper/css/swiper.min.css"
 *             "/css/pages/patientConsult/file_upload.css"        //上传图片css
 *             js:
 *             "/js/third-party/jquery/jquery-2.1.0.min.js"
 *             "/js/third-party/jquery/jquery.json-2.4.js"
 *             "/js/third-party/swiper/js/swiper-3.4.2.jquery.min.js"    //查看大图
 *             "/js/common.js"
 *             "/js/common/commonString.js"
 *             "/js/third-party/q.js"                                    //rout
 *             "/js/third-party/uploadReplace.js"
 *             "/js/modules/modules.upLoadFile.js"
 *             "/js/third-party/swiper/js/showBigImg.js"                  //查看大图JS
 *
 *  Created by JuKun on 2017/3/1.
 */
modules.upLoadFilesPlus = function (Obj) {
    var container = {
        op: {
            files1:[],
            files2:[],
            files3:[],
            files4:[],
            files5:[],
            files6:[],
            files7:[],
            files8:[]
        },
        path: {
            sourceType: "/mcall/comm/data/upload/type/v1/getMapList/",          //上传文件类型
            upFile: "/mcall/customer/patient/case/attachment/v1/create/",        //上传图片
            checkOut:"/mcall/customer/patient/case/attachment/v1/getMapList/",   //检查检验图片集
            delHistoryPic:"/mcall/customer/patient/case/attachment/v1/update/"   //历史图片删除
        },
        init: function () {
            var _t = this;
            localStorage.setItem("isSubmit",0);
            //来源页路由
            Q.reg(Obj.route,function () {
                var _upListBox=$('.tc-upLoadBox').find('.ev-localReview.ev-imgList');
                if(_upListBox.length>0){
                    common.confirmBox({
                        title: "努力上传中",
                        textCenter:true,
                        content: '现在离开下次还要重新上传哦',
                        cancel: '离开',
                        ensure: '取消',
                        cancelCallback: function () {
                            $('.tc-upLoadFile').siblings('.ev-fileUpHide').show();
                            $('.tc-upLoadFile').remove();
                            Obj.backFunction();            //来源页路由里方法
                        },
                        ensureCallback: function () {
                            Q.go("upLoad");
                        }
                    })
                } else if($(".main-inner.tc-upLoadFile").length>0){
                    if( !$(".main-inner.tc-upLoadFile").is(":hidden")){
                        if($('.tc-upLoadItemList.ev-imgList').length>0){
                            if(localStorage.getItem("isSubmit") ==1 ){
                                common.confirmBox({
                                    //title: "努力上传中",
                                    content: '要提交上传的图片吗？',
                                    cancel: '暂不提交',
                                    ensure: '现在提交',
                                    cancelCallback: function () {
                                        //Q.go("upLoad");
                                        _t.indexRoute();
                                    },
                                    ensureCallback: function () {
                                        Q.go("upLoad");
                                        _t.submitBack();
                                    }
                                })
                            }else{
                                _t.indexRoute();
                            }
                        }else{
                            _t.indexRoute();
                        }
                    }else{
                        _t.indexRoute();
                    }
                }else{
                    _t.indexRoute();
                }
            });
            //指导页路由
            Q.reg('guidePage',function () {
                if ($('.he-upLoadGuide').length > 0) {
                    $('.he-upLoadGuide').show();
                    $('.ev-fileUpHide').hide();
                } else {
                    $('body').append(_t.template.upLoadGuidePage());
                    $('.ev-fileUpHide').hide();
                }
            });
            //查看大图路由
            Q.reg('reviewImg',function(){
               $('.ev-fileUpHide').hide();
               $('.main-inner.tc-upLoadFile').hide();
            });

            $('.ev-upLoadFilesTip').on("click",function(){
                Q.go("guidePage");
            });
            if(Obj.manualTrigger && Obj.manualTrigger==true){
                _t.op.treatmentType=$(this).attr("data-treatmenttype");  // (0-处置建议、1-检查建议、2-检验建议、3-患教知识、4-上传资料类型)
                _t.fileUpload();
            }else{
                $('.ev-fileUpHide').on("click",".ev-upLoadBtn", function () {
                    if($("#ev-scrollTop").length>0){
                        var scrollTop = $(this).offset().top;
                        $("#ev-scrollTop").val(scrollTop);
                    }
                    _t.op.treatmentType=$(this).attr("data-treatmenttype");  // (0-处置建议、1-检查建议、2-检验建议、3-患教知识、4-上传资料类型)
                    $(this).closest('.ev-fileUpHide').hide();
                    _t.fileUpload();
                });
            }
        },
        //upLoad template dome
        template:{
            fileUploadHtml: function (k) {
                var _t = this,
                    _listHtml = '';
                switch (parseInt(Obj.upLoadType)){
                    case 0:
                        //咨询上传
                        _listHtml += _t.consultHtml();
                        break;
                    case 1:
                        //复诊单
                        _listHtml += _t.subsequentVisitHtml();
                        break;
                }
                return _listHtml;
            },
            //咨询上传图片
            consultHtml:function(){
                return '<section class="tc-upLoadBox upLoadCommon-box-s">' +
                    '                    <form class="qu-upFormBox qu-upFormBox-s" action="">' +
                    '                        <figure class="qu-upLoadTitle qu-upLoadTitle-s">' +
                    '                            <p class="tc-upLoadTitleName" data-treatmentid="1" data-id="0">X光片、超声、CT、等检查资料</p>' +
                    '                            <p class="qu-upLoadTips">如何拍出清晰影像照片</p>' +
                    '                        </figure>' +
                    '                        <ul class="qu-upLoadItemBox qu-upLoadItemBox-s docInt">' +
                    '                            <li class="ev-upLoadAdd"></li>' +
                    '                            <input class="ev-upLoadInput" type="file">' +
                    '                        </ul>' +
                    '                    </form>' +
                    '                    <form class="qu-upFormBox qu-upFormBox-s" action="">' +
                    '                        <figure class="qu-upLoadTitle qu-upLoadTitle-s">' +
                    '                            <p class="tc-upLoadTitleName" data-treatmentid="2" data-id="4">患病处照片</p>' +
                    '                        </figure>' +
                    '                        <ul class="qu-upLoadItemBox qu-upLoadItemBox-s docInt">' +
                    '                            <li class="ev-upLoadAdd"></li>' +
                    '                            <input class="ev-upLoadInput" type="file">' +
                    '                        </ul>' +
                    '                    </form>' +
                    '                </section>';
            },
            //复诊单上传图片
            subsequentVisitHtml:function(){
                return '';
            },
            //历史数据
            hasHistoryHtml:function(tv){
                var _picListHtml = '';
                if(tv.length>0){
                    $.each(tv,function(k,kal){
                        _picListHtml+='<li class="qu-upLoadItemList-s ev-imgList success tc-historyImg" data-responsepk="'+kal.id+'"><img src="'+(kal.caseAttUrl)+'" alt=""><span class="tc-upLoadDel" style="display: inline"></span></li>';
                    });
                }
                return _picListHtml;
            },
            localReviewHtml:function(lRhv){
                return '<li class="qu-upLoadItemList qu-upLoadItemList-s ev-imgList ev-localReview" data-imagetype="">'+
                    '<img src="' + lRhv + '" alt="">'+
                    '<span class="qu-upLoadDel qu-upLoadDel-s" style="cursor: pointer; display: inline;"></span>'+
                    '<span class="qu-upLoading qu-upLoading-s"></span>'+
                    //'<span class="qu-upLoadAfresh qu-upLoadAfresh-s"></span>'+
                    //'<span class="qu-upLoadAfreshText qu-upLoadAfreshText-s">重新上传</span>'+
                    '<span class="qu-fileUpRefresh qu-fileUpRefresh-s"></span>'+
                    '<span class="qu-upLoadCover qu-upLoadCover-s"></span>'+
                    '</li>';
            },
            replaceInput:function(){
                return '<input class="ev-upLoadInput" type="file" style="display: none;font-size: 72px; cursor: pointer; position: absolute; right: 0px; opacity: 0; outline: none; width: 100%; height: 100%;">'
            },
            upLoadGuidePage:function(){
                return '<section class="he-upLoadGuide"><img src="/image/img00/patientConsult/modules.uploadfiles.png" alt=""></section>'
            },
        },
        //返回主页路由
        indexRoute:function(){
            //控制上传模块显示隐藏
            $('.tc-upLoadFile').siblings('.ev-fileUpHide').show();
            if(parseInt(Obj.upLoadType)==4){
                $('.tc-upLoadFile').remove();
            }else{
                $('.tc-upLoadFile').hide();
            }
            //教程模块控制显示隐藏
            if($('.he-upLoadGuide').length>0){
                $('.he-upLoadGuide').hide();
                $(".he-main.ev-fileUpHide").show();
            }
            //执行来源页路由方法
            if (typeof Obj.backFunction == "function" && Obj.backFunction) {
                Obj.backFunction();
            }
        },
        //模块加载 页面点击处理
        fileUpload: function (ev) {
            var _t = this,
                _imageType = '',
                _userYes = true;
            $(Obj.loadBox).html(_t.template.fileUploadHtml());  //上传模块模板加载
            if($('.tc-upLoadRightCover').length>0){
                $('.tc-upLoadRightCover').on("click",function(){return false});
            }
            _t.fileDel();
            _t.startUpLoad();         //input初始化
            //click add throw hidden file
            $('.ev-upLoadAdd').on("click",function(){
                var _this = $(this),
                    _inputYes = $(this).siblings().find('.ev-upLoadInput'),
                    _otherInputYes = $(this).closest('.qu-upFormBox').siblings().find("div");        //other typeOf input is init or not;
                _t.op.caseCategoryId = $(this).closest(".qu-upLoadItemBox").siblings(".qu-upLoadTitle").children(".tc-upLoadTitleName").attr("data-treatmentid");
                //上传类型判断
                switch (parseInt(Obj.upLoadType)){
                    case 0:
                        _t.op.imageType = 0;
                        break;
                    case 1:
                        break;
                    case 2:
                        break;
                    case 3:
                        _t.op.imageType = 0;
                        break;
                    case 4:
                        _t.op.imageType = 1;
                        break;
                }
                //替换input
                if(_inputYes.length>0){
                    _inputYes.parent().remove();
                    $(this).parent().append(_t.template.replaceInput());
                    if(_otherInputYes.length>0){
                        _otherInputYes.remove();
                        $(this).closest('.qu-upFormBox').siblings().find('.qu-upLoadItemBox').append(_t.template.replaceInput());
                    }
                    _t.startUpLoad();  //start upLoad
                }
                //网络检测
                if(_userYes){
                    _t.pop({
                        accessBack:function(_val){
                            if(_val){
                                _userYes = false;
                                $(_this).trigger("click");
                            }
                        }
                    });
                }else{
                    $(this).siblings().find('.ev-upLoadInput').trigger("click");
                }
            });
            //submit
            $('.tc-upLoadSubmit .tc-submitBtn').on("click", function () {
                _t.submitBack();
            })
        },
        //提交返回事件
        submitBack:function(){
            var _t = this;
            var _picPkList=[],
                _oldPicPkList=[],
                storeArr=[],
                _resultArr=[],
                _upListHistoryBox=$('.tc-upLoadItemBox').find('.ev-imgList.tc-historyImg'), //历史图片
                _upListBox=$('.tc-upLoadItemBox').find('.ev-imgList');                      //所有图片
            if(_upListBox.length>0){
                //所有图片
                for (var i=0;i<_upListBox.length;i++){
                    _picPkList.push($(_upListBox[i]).attr("data-responsepk"));
                }

                //历史图片
                if(_upListHistoryBox.length>0){
                    for (var j=0;j<_upListHistoryBox.length;j++){
                        _oldPicPkList.push($(_upListHistoryBox[j]).attr("data-responsepk"));
                    }

                    //去重
                    for(var k=0;k<_oldPicPkList.length;k++){
                        storeArr[_oldPicPkList[k]]=true;
                    }
                    for(var l=0;l<_picPkList.length;l++){
                        if(!storeArr[_picPkList[l]]){
                            _resultArr.push(_picPkList[l]);
                        }
                    }
                    _resultArr = _resultArr.join(",");
                    _oldPicPkList = _oldPicPkList.join(",");
                }else{
                    _picPkList = _picPkList.join(",");
                    _oldPicPkList="";
                    _resultArr=_picPkList;
                }
            }else{
                _oldPicPkList="";
                _resultArr="";
            }
            if(parseInt(Obj.upLoadType) ==3){
                Obj.fileCallBack({
                    oldPicList:_oldPicPkList,
                    newPicList:_resultArr
                });
            }else{
                Obj.fileCallBack(_picPkList);
            }
            localStorage.setItem("isSubmit",0);
            _t.indexRoute();
            history.back();
        },
        //历史图片处理（问诊单）
        upLoadHistory:function(){
            var _t = this,
                _data = Obj.data; //历史图片数组
            if(_data&&_data.length>0){
                $.each(_data,function(i,val){
                    var _uploadAttList = val.uploadAttList,
                        _picListHtml = '';
                    if(_uploadAttList.length>0){
                        _picListHtml = _t.template.hisToryHtml(_uploadAttList);
                        $('.tc-upLoadTitleName[data-treatmentid='+val.uploadId+']').parent().siblings('.tc-upLoadItemBox').show().find('.ev-upLoadAdd').before(_picListHtml);
                        _t.viewBigImg();
                    }
                });
            }
        },
        //start upLoad
        startUpLoad:function(){
            var _t = this,
                _caseId = '';
            switch(parseInt(Obj.upLoadType)){
                case 1:
                    //历史健康 (有CaseId，有保存)
                    _caseId = '';
                    break;
                case 2:
                    //直约手术  (无CaseId，有保存)
                    _caseId = '';
                    break;
                case 3:
                    //问诊单 （有CaseId，有保存）
                    _caseId = '';
                    break;
                case 4:
                    //IM检查检验入口 （有CaseId，无保存）
                    _caseId = Obj.caseId;
                    break;
                case 5:
                    //初诊建议 (有CaseId，无保存)
                    _caseId = Obj.caseId;
                    break;
            }
            czyx.uploadReplace('.ev-upLoadInput', {
                url:_t.path.upFile,                //file deal URL,
                data: {
                    paramJson: $.toJSON({
                        caseId: _caseId,
                        caseCategoryId: _t.op.caseCategoryId,
                        imageType: _t.op.imageType
                    })
                },
                uploadReplaceCss: {
                    //set upLoad btn image
                    display:'none',
                    background: 'url("/image/img00/patientConsult/upload photo_default@2x.png") center no-repeat',
                    backgroundSize: '100%',
                    width: "2.02667rem",             //上传按钮的宽度
                    height: "2.02667rem",              //上传按钮的高度
                    float: 'left'
                },
                uploadInputCss: {
                    width: "100%",             //上传按钮的宽度
                    height: "100%"             //上传按钮的高度
                },
                uploadBefore: function () {
                    //alert(this.value);
                    if (!/\.((JPEG)|(jpeg)(jpg)|(JPG)|(gif)|(GIF)|(png)|(PNG))$/i.test(this.value)) {
                        common.popup({text: '只允许上传.jpg .gif .png类型的图片文件'});
                        return false;
                    }else {
                        localStorage.setItem("isSubmit",1);
                        _t.localReview(this);
                        if($('.tc-upLoadBox').find(".ev-upLoadAdd").length>0){
                            $('.tc-upLoadBox').find(".ev-upLoadAdd").hide();
                        }
                        //if($('.tc-upLoadFile').find(".tc-upLoadRightCover").length>0){
                        //    $('.tc-upLoadFile').find(".tc-upLoadRightCover").show();
                        //}
                    }
                },
                uploadEnd: function (serverJson) {
                    //try {
                        //serverJson = $.parseJSON($(serverJson).html());
                    serverJson = JSON.parse(serverJson);
                    if (serverJson.responseObject.responseStatus) {
                        _t.upLoadSuccess({
                            data:serverJson,
                            element:$(this)
                        });
                    } else {
                        common.popup({text: '由于网络原因，上传失败'});
                        _t.upLoadError({
                            data:serverJson,
                            element:$(this)
                        });
                        return;
                    }
                    //} catch (e) {
                    //    common.popup({text: '由于网络原因，上传失败'});
                    //    _t.upLoadError({
                    //        data:serverJson,
                    //        element:$(this)
                    //    });
                    //    //return;
                    //}
                }
            });
        },
        loadImgBack:function(Lv){
          var _t = this;
            if (Lv.responseObject.responseStatus) {
                _t.upLoadSuccess({
                    data:Lv,
                    element:$(this)
                });
            } else {
                common.popup({text: '由于网络原因，上传失败'});
                _t.upLoadError({
                    data:Lv,
                    element:$(this)
                });
                return;
            }
        },
        //本地预览加载
        localReview:function(lRv){
            var _t=this;
            var fileList = lRv.files,
                previewSrc = '',
                _htmlList = '',
                imgPreviewBox = $($(lRv).closest('.qu-upFormBox')).find('.qu-upLoadItemBox'),  //图片容器
                imgList = $($(lRv).closest('.qu-upFormBox')).find('.qu-upLoadItemBox').children('.ev-imgList').length;  //已上传图片数量
            var _element=$(lRv).closest('.qu-upLoadItemBox').siblings('.qu-upLoadTitle').children('.tc-upLoadTitleName'),
                imgType='';
            debugger;
            if(Obj.upLoadType =="0" || Obj.upLoadType =="4"){
                imgType=_element.attr("data-id")
            }else{
                imgType=_element.attr("data-treatmentid")
            }
            switch (parseInt(imgType)){
                case 0:
                    _t.op.files1.push(fileList);
                    break;
                case 4:
                    _t.op.files4.push(fileList);
                    break;
            }
                if (fileList.length + imgList <= 9) {
                    $.each(fileList, function (i, val) {
                            previewSrc = window.URL.createObjectURL(val);
                            _htmlList +=_t.template.localReviewHtml(previewSrc);
                    });
                    imgPreviewBox.find('.ev-upLoadAdd').before(_htmlList);
                    //控制上传按钮显示
                    if (fileList.length + imgList == 9) {
                        imgPreviewBox.find('.ev-upLoadAdd').hide();
                    } else {
                        imgPreviewBox.find('.ev-upLoadAdd').show();
                    }
                } else {
                    common.popup({
                        text: "最多可上传9张"
                    });
                }
        },
        //检测网络环境
        pop:function(Pv){
            var _t=this;
            if (_t.getConnectType() == 1) {
                    Pv.accessBack(true);
                } else {
                common.confirmBox({
                    title: "当前WIFI未连接",
                    textCenter:true,
                    content: '确定要使用手机流量上传吗？',
                    cancel: '取消',
                    ensure: '确定',
                    cancelCallback: function () {
                        Pv.accessBack(false);
                    },
                    ensureCallback: function () {
                        Pv.accessBack(true);
                    }
                })
            }
        },
        //上传成功处理
        upLoadSuccess:function(sv){
            var _t=this,
                responsePk=sv.data.responseObject.responsePk,        //图片主键
                url=sv.data.responseObject.responseMessage.logoUrl,
                imageType=sv.data.responseObject.responseMessage.logoType;
            var _successEle=sv.element.closest('.qu-upLoadItemBox').find('.ev-localReview');
            $.each(_successEle,function(i,val){
                $(val).find('.qu-fileUpRefresh').remove();      //重传按钮
                //$(val).find('img').attr("src",url);           //返回图片Url
                $(val).attr({
                    "data-responsePk":responsePk,
                    "data-imageType":imageType
                });
                $(val).find('.qu-upLoading').remove();        //等待效果..
                $(val).find('.qu-upLoadAfreshText').remove(); //文本
                $(val).find('.qu-upLoadCover').remove();      //遮罩
                $(val).find('.qu-upLoadAfresh').remove();      //遮罩
                $(val).find('.qu-upLoadDel').show();          //删除按钮
            });
            _successEle.addClass('success').removeClass('ev-localReview');
            //控制上传按钮显示
            $.each(sv.element.closest('.tc-upLoadBox').find('.qu-upLoadItemBox'),function(i,val){
                if ( $(val).find('.qu-upLoadItemList').length == 9) {
                    $(val).find('.ev-upLoadAdd').hide();
                } else {
                    $(val).find('.ev-upLoadAdd').show();
                }
            });
            //查看大图
            _t.viewBigImg();
        },
        //上传失败处理
        upLoadError:function(eRv){
            var _t=this,
                _successEle=eRv.element.closest('.tc-upLoadItemBox').find('.ev-localReview');
            //$('.tc-upLoadFile').find(".ev-upLoadAdd").hide();
            //控制上传按钮显示
            $.each(eRv.element.closest('.tc-upLoadBox').find('.tc-upLoadItemBox'),function(i,val){
                if ( $(val).find('.tc-upLoadItemList').length == 9) {
                    $(val).find('.ev-upLoadAdd').hide();
                } else {
                    $(val).find('.ev-upLoadAdd').show();
                }
            });
            if($('.tc-upLoadFile').find(".tc-upLoadRightCover").length>0){
                $('.tc-upLoadFile').find(".tc-upLoadRightCover").hide();
            }
            //提交按钮控制
            $('.tc-upLoadSubmit').find('.tc-submitBtn').css("display","block").siblings('.tc-submitDisabled').hide();
            $.each(_successEle,function(i,val){
                $(val).find('.tc-upLoadCover').addClass('upFailed');          //遮罩
                $(val).find('.tc-upLoading').addClass('tc-upLoadAfresh').removeClass('tc-upLoading');       //等待效果..
                $(val).find('.tc-upLoadAfreshText').text("重新上传");         //文本
                $(val).append('<span class="ev-fileUpRefresh"></span>');      //set refresh Btn
                $(val).find('.ev-fileUpRefresh').on("click",function(){
                    //上传类型判断
                    if(parseInt(Obj.upLoadType) != 4){
                        if(parseInt(Obj.upLoadType) == 5){
                            _t.op.imageType = 2;
                        }else{
                            _t.op.imageType = 0;
                        }
                    }else{
                        _t.op.imageType = 1;
                        // var _imageTypeId = $(this).closest('.tc-upFormBox').find('.tc-upLoadTitleName').attr("data-adviceType");
                        // if(_imageTypeId == "1"){
                        //     //1-检查 2-检验
                        //     _t.op.imageType = 2;
                        // }else{
                        //     _t.op.imageType = 3;
                        // }
                    }
                    //重传事件
                    _t.upLoadPic({
                        element:$(this)
                    })
                })
            });
        },
        //重传图片
        upLoadPic: function (lv) {
            var _t = this,
                _files='',
                _imgType = '',
                _afreshIndex=lv.element.parent().index();
            if(Obj.upLoadType == "3" || Obj.upLoadType == "5"){
                _imgType= lv.element.closest('.tc-upLoadItemBox').siblings('.tc-upLoadTitle').children('.tc-upLoadTitleName').attr("data-id");  //初诊建议用ID
            }else{
                _imgType = lv.element.closest('.tc-upLoadItemBox').siblings('.tc-upLoadTitle').children('.tc-upLoadTitleName').attr("data-treatmentid");
            }
            var _historyListLength = lv.element.closest('.tc-upLoadItemBox').find('.tc-upLoadItemList.tc-historyImg').length;   //历史图片长度
            if(_historyListLength>0){
                //_afreshIndex=lv.element.parent().index(),
                _afreshIndex = _afreshIndex-_historyListLength;
            }
            switch (parseInt(_imgType)){
                case 1:
                    _files = _t.op.files1[_afreshIndex];
                    break;
                case 2:
                    _files = _t.op.files2[_afreshIndex];
                    break;
                case 3:
                    _files = _t.op.files3[_afreshIndex];
                    break;
                case 4:
                    _files = _t.op.files4[_afreshIndex];
                    break;
                case 5:
                    _files = _t.op.files5[_afreshIndex];
                    break;
                case 6:
                    _files = _t.op.files6[_afreshIndex];
                    break;
                case 7:
                    _files = _t.op.files7[_afreshIndex];
                    break;
                case 8:
                    _files = _t.op.files8[_afreshIndex];
                    break;
            }
            var _data = new FormData();
            _data.append('file', _files[0]);
            _data.append('paramJson', $.toJSON({caseId:parseInt(Obj.upLoadType) == 2?'':Obj.caseId,imageType:_t.op.imageType,caseCategoryId: _imgType}));
            $.ajax({
                url: _t.path.upFile,
                data: _data,
                type: "POST",
                dataType:'json',
                contentType: false,
                processData: false,             //此处是data的预处理，需要设置为false
                beforeSend: function (data) {
                    lv.element.siblings('.tc-upLoadAfreshText').hide();    //文本
                    //lv.element.siblings('.tc-upLoading').show();             //文本
                    lv.element.siblings('.tc-upLoadAfresh').addClass('tc-upLoading').removeClass('tc-upLoadAfresh');       //等待效果..
                    //上传Item不可点
                    if($('.tc-upLoadFile').find(".tc-upLoadRightCover").length>0){
                        $('.tc-upLoadFile').find(".tc-upLoadRightCover").show();
                    }
                },
                //xhr: function () {
                //    var xhr = jQuery.ajaxSettings.xhr();
                //    //xhr.upload.onload = function (data) {
                //    //    console.log(data);
                //    //};
                //    xhr.upload.onprogress = function (ev) {
                //        if (ev.lengthComputable) {
                //            var percent = parseInt(100 * ev.loaded / ev.total);  //当前进度
                //            lv.element.siblings('.tc-upLoadAfresh').text(percent+'%');
                //        }
                //    };
                //    return xhr;
                //},
                success: function (data) {
                    if (data.responseObject.responseStatus) {
                        lv.element.parent().attr({
                            "data-responsePk":data.responseObject.responsePk,
                            "data-imageType":data.responseObject.responseMessage.logoType
                        }).addClass('success').removeClass('ev-localReview');
                        //lv.element.siblings('img').attr("src",data.responseObject.responseMessage.logoUrl);   //返回图片Url
                        lv.element.siblings('.tc-upLoading').remove();        //重传效果..
                        lv.element.siblings('.tc-upLoadCover').remove();         //遮罩
                        lv.element.siblings('.tc-upLoadDel').show();             //删除按钮
                        lv.element.remove();                                     //删除重传按钮
                        //上传点击事件
                        if($('.tc-upLoadFile').find(".tc-upLoadRightCover").length>0){
                            $('.tc-upLoadFile').find(".tc-upLoadRightCover").hide();
                        }
                        _t.viewBigImg();
                    } else {
                        lv.element.siblings('.tc-upLoadAfreshText').show();    //文本
                        lv.element.siblings('.tc-upLoading').addClass('tc-upLoadAfresh').removeClass('tc-upLoading');       //等待效果..
                        common.popup({
                            text: "由于网络原因，上传失败"
                        });
                    }
                },
                error: function (data) {}
            });
        },
        //获取网络类型方法（1-WiFi 0-非WiFi）
        getConnectType: function () {
            var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {tyep: 'unknown'};
            var type_text = ['unknown', 'ethernet', 'wifi', '2g', '3g', '4g', 'none'];
            var _browseType = common.weixin.isWXBrowse(),
                userAgentInfo = navigator.userAgent;
            var checkKey = '';
            if (typeof(connection.type) == "number") {
                connection.type_text = type_text[connection.type];
            } else {
                if(_browseType === "androidWX"){
                    //Android通过返回type判断
                    if(connection.type !=="WIFI"||connection.type !=="wifi"){
                        if(userAgentInfo.indexOf("WIFI")>0){
                            connection.type_text = 'wifi';
                        }else{
                            connection.type_text = 'other';
                        }
                    }else{
                        connection.type_text = connection.type;
                    }
                }else if (_browseType === "iphoneWX"){
                    //ios没有返回type 通过设备类型里的NetType判断联网类型（尝试中 需测试）
                    if(userAgentInfo.indexOf("WIFI")>0){
                        connection.type_text = 'wifi';
                    }else{
                        connection.type_text = 'other';
                    }
                }else{
                    //除Android、ios微信浏览器之外的其他浏览器
                    if(connection.type!=="undefined"){
                        connection.type_text = connection.type;
                    }else{
                        //不识别网络或不兼容
                        connection.type_text = 'other';
                    }
                }
            }
            //通过Bandwidth判断网络类型（多数浏览器没有返回改字段）
            if (typeof(connection.bandwidth) == "number") {
                if (connection.bandwidth > 10) {
                    connection.type = 'wifi';
                } else if (connection.bandwidth > 2) {
                    connection.type = '3g';
                } else if (connection.bandwidth > 0) {
                    connection.type = '2g';
                } else if (connection.bandwidth == 0) {
                    connection.type = 'none';
                } else {
                    connection.type = 'unknown';
                }
            }
            //返回类型 (1-wifi、0-other)
            if (connection.type_text == 'wifi') {
                checkKey = 1;
            } else {
                checkKey = 0;
            }
            return checkKey;

        },
        //删除图片事件
        fileDel: function () {
            var _t = this;
            $('.ev-delete').on("click", ".tc-upLoadDel",function () {
                //历史图片删除走接口（问诊单-3、初诊建议-5）
                //无保存传CaseId上传删除走接口（IM入口-4、初诊建议-5）
                var _thisElem = $(this);
                if(Obj.upLoadType == "3" && $(this).parent().hasClass('tc-historyImg') || Obj.upLoadType == "4" || Obj.upLoadType == "5"){
                    _t.rcoAjax({
                        path:_t.path.delHistoryPic,
                        data:{
                            id:$(this).parent().attr("data-responsepk"),
                            isValid:0
                        },
                        callBack:function(data){
                            if(data&&data.responseObject&&data.responseObject.responseStatus){
                                if (_thisElem.closest('.tc-upLoadItemBox').find('.ev-imgList').length == 1) {
                                    _thisElem.closest('.tc-upLoadItemBox').hide();
                                }
                                _thisElem.parent().siblings('.ev-upLoadAdd').show();
                                localStorage.setItem("isSubmit",1);
                                _t.deleteImg(_thisElem);                   //数组中删除操作
                                _thisElem.parent().remove();               //前端删除图片
                                //提交按钮控制
                                $('.tc-upLoadSubmit').find('.tc-submitBtn').css("display","block").siblings('.tc-submitDisabled').hide();
                                _t.viewBigImg();                           //查看大图
                            }else {
                                common.popup({
                                    text:"删除失败"
                                })
                            }
                        }
                    })
                }else{
                    if ($(this).closest('.tc-upLoadItemBox').find('.ev-imgList').length == 1) {
                        $(this).closest('.tc-upLoadItemBox').hide();
                    }
                    $(this).parent().siblings('.ev-upLoadAdd').show();
                    localStorage.setItem("isSubmit",1);
                    _t.deleteImg(_thisElem);                    //数组中删除操作
                    $(this).parent().remove();                 //前端删除图片
                    //提交按钮控制
                    $('.tc-upLoadSubmit').find('.tc-submitBtn').css("display","block").siblings('.tc-submitDisabled').hide();
                    _t.viewBigImg();                            //查看大图
                }
            });
        },
        deleteImg:function(_thisElem){
            var _t = this,
                _index = _thisElem.closest('.tc-upLoadItemList').index(),
                _treatmentId;   //当前图片index
            //保存文件信息处理
            if(!_thisElem.closest('.tc-upLoadItemList').hasClass('tc-historyImg')){
                var _historyListLength = _thisElem.closest('.tc-upLoadItemBox').find('.tc-upLoadItemList.tc-historyImg').length;
                if(_historyListLength>0){
                    _index = _index-_historyListLength;
                }
                if(Obj.upLoadType == "3" || Obj.upLoadType == "5"){
                    _treatmentId= _thisElem.closest('.tc-upLoadItemBox').siblings('.tc-upLoadTitle').children('.tc-upLoadTitleName').data("id");  //初诊建议用ID
                }else{
                    _treatmentId = _thisElem.closest('.tc-upLoadItemBox').siblings('.tc-upLoadTitle').children('.tc-upLoadTitleName').data("treatmentid");
                }
                switch (_treatmentId){
                    case 1:
                        _t.op.files1.splice(_index,1);
                        break;
                    case 2:
                        _t.op.files2.splice(_index,1);
                        break;
                    case 3:
                        _t.op.files3.splice(_index,1);
                        break;
                    case 4:
                        _t.op.files4.splice(_index,1);
                        break;
                    case 5:
                        _t.op.files5.splice(_index,1);
                        break;
                    case 6:
                        _t.op.files6.splice(_index,1);
                        break;
                    case 7:
                        _t.op.files7.splice(_index,1);
                        break;
                    case 8:
                        _t.op.files8.splice(_index,1);
                        break;
                }
            }
        },
        //查看大图
        viewBigImg:function(){
            bigPicShow.init({
                /**
                 * 指定多个class|| ID
                 * */
                domIdList:[ ".docInt"],
                imgClickCallBack:function(){
                    Q.go('reviewImg');   //增加路由 用于微信返回
                },
                /**
                 * 关闭按钮回调函数
                 * */
                closeCallBack:function(){
                    history.back();
                },
                topSwiperOptions:{
                    isInit:true,
                    onTap:function(swiper,event){
                        $("#EV-swiper").remove();
                        history.back();
                        event.stopPropagation();
                        return false;
                    }
                },
                bottomSwiperOptions:{
                    isInit:true
                }
            });
        },
        //公用Ajax数据请求
        rcoAjax: function (dv) {
            var _t = this,
                params = {paramJson: $.toJSON(dv.data)};
            common.loading.show();
            $.ajax({
                url: dv.path,
                type: "POST",
                data: params,
                dataType:"json",
                //time : 5000,
                success: function (data) {
                    common.loading.hide();
                    dv.callBack(data);
                },
                error: function () {
                    common.loading.hide();
                }
            });
        }
    };
    container.init(Obj);
};