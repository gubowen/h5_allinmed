/**
 * @Desc：视诊模块
 * @Usage:     modules.videoUpLoad({
                    route: "index",
                    caseId:1489545287440,   //病例ID
                    videoType:1,             //1-视频、2-图片
                    upLoadDesc:"",          //上传描述
                    backFunction: function () {

                    },
                    upSaveFunction: function (){
                       //上传成功保存后执行的回调
                    }
                });
 * @Notify：
 * @Depend：css:
 *          "/js/third-party/swiper/css/showBigImg.css"
 *          "/css/pages/patientConsult/videos_upload.css"
 *          js:
 *          "/js/third-party/jquery/jquery-2.1.0.min.js"
 *          "/js/third-party/jquery/jquery.json-2.4.js"
 *          "/js/third-party/uploadReplace.js"
 *          "/js/third-party/swiper/js/swiper-3.4.2.jquery.min.js"
 *          "/js/third-party/q.js"
 *          "/js/third-party/qiniu/qiniu.js"
 *          "/js/third-party/qiniu/ui.js"
 *          "/js/third-party/plupload/plupload.full.min.js"
 *          "/js/third-party/swiper/js/showBigImg.js"
 *          "/js/plugins/videoUpload.js"
 *
 * Created by JuKun on 2017/3/20.
 */
modules.videoUpLoad = function(Obj){
    var container = {
        op:{
            files:[]
        },
        path:{
            imagePath:'/mcall/customer/patient/case/attachment/v1/create/',  //图片上传URL
            saveVideo:'/mcall/qiniu/storage/v1/saveVideoInfo/',               //视频保存
            saveImage:'/mcall/customer/patient/case/attachment/v1/update/'   //视频上传URL
        },
        init:function(){
            var _t = this;
            _t.firstLoad();  //初始化加载
            _t.fileDel();    //删除事件代理
            _t.reBack();     //返回事件
        },
        template:{
            //videoHtml:function(){
            //    return '<section class="he-videoUpHide ev-videosUpHide">'+
            //        '    <section class="he-videoUpLoadBox">'+
            //        '        <section data-type="1" class="he-videosMain">'+
            //        '            <p class="he-loadTitle">为了进一步确诊，请拍摄患者走路的视频，视频需要能看清腿部动作</p>'+
            //        '            <ul class="he-loadFiles">'+
            //        '                <li class=" he-videoAddBtn" id="container1">'+
            //        //'                    <a href="javascript:;" id="videoUpBtn"></a>'+
            //        '                    <input type="file" id="videoUpBtn" style="z-index: 1">'+
            //        '                </li>'+
            //        '                <li class="he-loadVideoItem">'+
            //        '                   <video id="he-videoId" src="" width="100%" height="100%"></video><span class="he-videoDelBtn"></span>'+
            //        '                   <span class="he-videoLoading"></span><span id="he-videoPlayBtn" class="he-videoPlayBtn"></span><span class="he-videoCover"></span>' +
            //        '                </li>'+
            //        '            </ul>'+
            //        '            <section class="he-videosSubmit">'+
            //        '                <button class="usable downBtn">提交</button>'+
            //        '                <button class="unusable">提交</button>'+
            //        '            </section>'+
            //        '        </section>'+
            //        '    </section>'+
            //        '</section>';
            //},
            videoHtml:function(){
                return '<section class="he-videoUpHide ev-videosUpHide">'+
                    '    <section class="he-videoUpLoadBox">'+
                    '        <section data-type="1" class="he-videosMain">'+
                    '            <p class="he-loadTitle">'+Obj.upLoadDesc+'</p>'+
                    '            <ul class="he-loadFiles">'+
                    '                <li class="he-videoAddFirstBtn">'+
                    '                    <a href="javascript:;"  class="he-videoFirstLoadBtn"></a>'+
                    '                </li>'+
                    '                <li class="he-videoAddBtn ev-videoLoadHide" id="container1">'+
                    '                    <a href="javascript:;" id="videoUpBtn" class="he-videoFirstLoadBtn"></a>'+
                    '                </li>'+
                    '            </ul>'+
                    '            <section class="he-videosSubmit">'+
                    '                <button class="usable downBtn">提交</button>'+
                    '                <button class="unusable">提交</button>'+
                    '            </section>'+
                    '        </section>'+
                    '    </section>'+
                    '</section>';
            },
            videoSuccessHtml:function(){
                return '            <li class="he-loadVideoSuccess">' +
                    '                    <span class="he-loadVideoSuccessBox">' +
                    '                         <span class="he-loadSuccessTip"></span>' +
                    //'                         <span class="he-loadSuccessPercent"></span>' +
                    '                         <span class="he-loadSuccessText">已上传</span>' +
                    '                    </span>'+
                    '                </li>';
            },
            videoReloadHtml:function(){
                return '<li class="he-videoAddBtn he-loadSuccessTextBox">'+
                    '         <a href="javascript:;" class="he-reLoadText">重新上传</a>'+
                    '    </li>' +
                    '    <li class="he-videoAddBtn he-loadSuccessTextBoxBtn" id="container1" style="display: none;">'+
                    '         <a href="javascript:;" id="videoUpBtn" class="he-reLoadText">重新上传</a>'+
                    '    </li>';
            },
            videoLoadingHtml:function(){
                return '<section class="ev-videoUpLoading"><div class="tc-videoLoadingImg">' +
                    '<img src="/image/img00/patientConsult/symptom_photo_loading@2x.png" alt="">' +
                    '</div><p class="tc-videoLoadingText">上传中...</p></section>'
            },
            videoLoadDefeatHtml:function(){
                return '<li class="he-videoAddFirstBtn">'+
                    '         <a href="javascript:;"  class="he-videoFirstLoadBtn"></a>'+
                    '     </li>'+
                    '     <li class="he-videoAddBtn ev-videoLoadHide" id="container1">'+
                    '       <a href="javascript:;" id="videoUpBtn" class="he-videoFirstLoadBtn"></a>'+
                    '     </li>';
            },
            //图片Dome相关
            imageHtml:function(){
                return '<section class="he-videoUpHide ev-videoImgUpHide">'+
                    '    <section class="he-videoUpLoadBox">'+
                    '        <section data-type="1" class="he-videosMain">'+
                    '            <p class="he-loadTitle">'+Obj.upLoadDesc+'</p>'+
                    '            <ul class="he-loadFiles he-videoImageBox docInt">'+
                    '                <li class="tc-imageUpLoadAdd">'+
                    '                    <a href="javascript:;"><span class="tc-upLoadAddMore"></span></a>'+
                    '                </li>'+
                    '                <input class="tc-upLoadInput" type="file">'+
                    '            </ul>'+
                    '            <section class="he-videosSubmit ev-submitUpData">'+
                    '                <button class="usable downBtn">提交</button>'+
                    '                <button class="unusable">提交</button>'+
                    '            </section>'+
                    '        </section>'+
                    '    </section>'+
                    '</section>';
            },
            localReviewHtml:function(lRhv){
                return '<li class="tc-imageItemList ev-imgList ev-localReview"><img src="' + lRhv + '" alt=""><span class="tc-upLoadCover"></span>' +
                    '<span class="tc-upLoading"></span><span class="tc-upLoadDel"></span><span class="tc-upLoadAfreshText">等待上传</span></li>';
            },
            replaceInput:function(){
                return '<input class="tc-upLoadInput" type="file" style="display: none;font-size: 72px; cursor: pointer; position: absolute; right: 0px; opacity: 0; outline: none; width: 100%; height: 100%;">'
            }
        },
        firstLoad:function(){
            var _t = this,
                _userYes = true;
            switch (parseInt(Obj.videoType)){
                case 1:
                    //if($('.ev-videosUpHide').length>0){
                    //    $('.ev-videosUpHide').show();
                    //}else{
                        $("body").append(_t.template.videoHtml());
                        common.topTips.show({
                            class: "videoUpLoad-tips",
                            content: "请拍摄30秒以内的视频，超时会影响上传哦"
                        });
                        $('.videoUpLoad-tips').css("z-index","5");
                        setTimeout(function(){
                            $('.videoUpLoad-tips').remove();
                        },3000);
                        _t.videoUpStart();      //七牛
                        $('.ev-videosUpHide').find('.he-videoAddFirstBtn').on("click",function(){
                            if(_userYes){
                                //check net
                                _t.pop({
                                    accessBack:function(_val){
                                        if(_val){
                                            _userYes = false;
                                            $('.he-videoUpHide.ev-videosUpHide').find('.he-videoAddBtn').find('input').trigger("click");
                                        }
                                    }
                                });
                            }else{
                                $('.he-videoUpHide.ev-videosUpHide').find('.he-videoAddBtn').find('input').trigger("click");
                                //$(_input).siblings().find('.tc-upLoadInput').trigger("click");
                            }
                        });
                        _t.op.isSubmitTv = 1;

                    break;
                case 2:
                    //if ($('.ev-videoImgUpHide').length>0){
                    //    $('.ev-videoImgUpHide').show();
                    //}else{
                        $("body").append(_t.template.imageHtml());
                        _t.imageUpStart();     //img load start
                        _t.op.isSubmitPic = 1;
                    //}
                    break;
            }
        },
        //上传视频
        videoUpStart:function(){
            var _t = this;
            videoUpload({
                obj:'#videoUpBtn',                                   // 上传选择的点选按钮DOM ID，必需 （带#）
                multi_selection:false,                              // 设置一次是否只能选择一个文件 默认(false)只能选择一个文件
                flash_swf_url:'/js/third-party/plupload/Moxie.swf',  // 引入flash，相对路径
                dragdrop:true,                                      // 开启可拖曳上传  默认（true）可以拖拽
                uptoken_url: '/mcall/qiniu/storage/v1/getToken/',    // Ajax请求uptoken的Url，强烈建议设置(服务端提供)
                domain:'medPlus',                                    // bucket域名，下载资源时用到，必需
                max_file_size:60,                                   // 文件上传最大多少M   number类型
                chunk_size:'4mb',                                    // 分块上传时，每块的体积 默认'4mb'
                filesAdded:function(up,files){
                },  // 文件添加进队列后,处理相关的事情
                pluploadEach:function(file){
                    //_t.videoReview(file);
                },       // 每个文件上传时处理函数  (可以获取file信息)
                beforeUpload:function(file){
                    if($('.ev-videoUpLoading').length>0){
                        $('.ev-videoUpLoading').show();
                    }else{
                        $('body').append(_t.template.videoLoadingHtml());
                    }
                    if($('.he-loadVideoSuccess').length>0){
                        $('.he-loadVideoSuccess').remove();
                        $('.he-loadFiles').append('<li class="he-videoAddFirstBtn"><a href="javascript:;"  class="he-videoFirstLoadBtn"></a></li>');
                    }
                    if($('.he-videoAddBtn.he-loadSuccessTextBox').length>0){
                        $('.he-videoAddBtn.he-loadSuccessTextBox').remove();
                    }
                    if($('.he-videoAddBtn.he-loadSuccessTextBoxBtn').length>0){
                        $('.he-videoAddBtn.he-loadSuccessTextBoxBtn').remove();
                    }
                },   // 每个文件上传前,处理相关的事情 (可以获取file信息)
                uploadProgress:function(file){
                    $('.he-loadFiles').addClass('ev-localReview');
                    $('.he-loadSuccessPercent').text(file.files[0].percent + '%');
                },  // 每个文件上传时,处理相关的事情 （可以获取上传进度等信息）
                uploadComplete:function(file){

                },  // 队列文件处理完毕后,处理相关的事情
                fileUploaded:function(up,file,info){
                    _t.op.videoName = file.name;              //视频名
                    _t.op.key = info.key;                     //PK
                    _t.op.persistentId = info.persistentId;   //七牛id
                    common.popup({
                        text:"上传成功"
                    });
                    $('.ev-videosUpHide').find('.he-videoAddBtn').remove();       //删除初始化按钮
                    $('.ev-videosUpHide').find('.he-videoAddFirstBtn').remove();  //删除默认上传按钮
                    $('.ev-videoUpLoading').hide();                               //隐藏Loading上传效果
                    if ($('.he-loadVideoSuccess').length>0){
                        $('.he-loadVideoSuccess').show();
                        $('.he-loadSuccessPercent').hide();
                        $('.he-loadSuccessTip').css("display","block");
                        $('.he-loadSuccessText').css("display","block");
                    }else {
                        $('.ev-videosUpHide').find('.he-loadFiles').append(_t.template.videoSuccessHtml());
                    }
                    $('.ev-videosUpHide').find('.he-loadFiles').append(_t.template.videoReloadHtml());      //初始重新上传Dome
                    _t.videoUpStart();                                                                       //初始化重新上传
                    if($('.he-videoAddBtn.he-loadSuccessTextBox').length>0){
                        $('.he-loadSuccessTextBox').off("click").on("click",function(){
                            common.confirmBox({
                                title: "重新上传后",
                                textCenter:true,
                                content: '原有视频将被替换',
                                cancel: '替换',
                                ensure: '取消',
                                cancelCallback: function () {
                                    $('.he-loadSuccessTextBoxBtn').find("input").trigger("click");
                                },
                                ensureCallback: function () {
                                    return;
                                }
                            })
                        });
                    }
                    $('.he-videosSubmit .downBtn').show().siblings().hide();                                 //提交按钮状态控制
                    $('.ev-videosUpHide').find('.he-loadFiles').addClass('ev-success').removeClass('ev-localReview').attr("isSubmit","0");  //上传成功标示
                    //视频提交保存
                    $('.he-videoUpHide.ev-videosUpHide').off("click").on("click",".he-videosSubmit .downBtn",function(){
                        $('.he-videoUpLoadBox').find('.unusable').show().siblings().hide();
                        _t.saveVideoBtn();
                    });
                },  // 每个文件上传成功后,处理相关的事情(可获取key、persistentId两个参数需要传给我们的数据库)
                fileUploadError:function(data){
                    $('.ev-videoUpLoading').hide();   //隐藏Loading上传效果
                    $('.he-videoUpHide.ev-videosUpHide').find('.he-loadFiles').html(_t.template.videoLoadDefeatHtml());
                    _t.videoUpStart();
                    var _userYes = true;
                    $('.ev-videosUpHide').find('.he-videoAddFirstBtn').on("click",function(){
                        if(_userYes){
                            //check net
                            _t.pop({
                                accessBack:function(_val){
                                    if(_val){
                                        _userYes = false;
                                        $('.he-videoUpHide.ev-videosUpHide').find('.he-videoAddBtn').find('input').trigger("click");
                                    }
                                }
                            });
                        }else{
                            $('.he-videoUpHide.ev-videosUpHide').find('.he-videoAddBtn').find('input').trigger("click");
                            //$(_input).siblings().find('.tc-upLoadInput').trigger("click");
                        }
                    });
                    common.popup({
                        text:"上传失败"
                    });
                }   // 每个文件上传失败后,处理相关的事情
            });
        },
        //视频保存事件
        saveVideoBtn:function(){
            var _t = this,
                _data = '';
            switch (parseInt(Obj.videoType)){
                case 1:
                    _data={
                        videoName:_t.op.videoName,         //	string	是	视频名称
                        key:_t.op.key,                     //	string	是	key
                        persistentId:_t.op.persistentId,   //	string	是	七牛id
                        caseId:Obj.caseId,                  //	string	是	病例id
                        refType:1
                    };
                    break;
                case 2:
                    var _picPkList=[],
                        _upListBox=$('.he-videoImageBox').find('.ev-imgList');
                    if(_upListBox.length>0){
                        for (var i=0;i<_upListBox.length;i++){
                            _picPkList.push($(_upListBox[i]).attr("data-responsepk"));
                        }
                        _picPkList = _picPkList.join(",");
                    }
                    _data ={
                        caseId:Obj.caseId,	    //string	是	病例id
                        idList:_picPkList	    //string	是	附件id串
                    };
                    break
            }
            _t.submitBack({
                data:_data,
                subType:Obj.videoType
            });
        },
        //保存上传资料
        submitBack:function(sal){
            var _t = this;
            switch (parseInt(sal.subType)){
                case 1:
                    _t.commAjax({
                        data:sal.data,
                        path:_t.path.saveVideo,
                        callBack: function (data) {
                            $('.ev-videosUpHide').find('.he-loadFiles').attr("isSubmit","1");
                            if (typeof Obj.upSaveFunction == "function" && Obj.upSaveFunction) {
                                Obj.upSaveFunction();
                            }
                            $('.he-videoUpLoadBox').find('.unusable').hide().siblings().show();
                            _t.indexRoute();
                            history.back();
                        },
                        errorCallBack:function(data){
                            $('.he-videoUpLoadBox').find('.unusable').hide().siblings().show();
                            common.popup({
                                text:"保存失败"
                            })
                        }
                    });
                    break;
                case 2:
                    _t.commAjax({
                        data:sal.data,
                        path:_t.path.saveImage,
                        callBack: function (data) {
                            _t.op.isSubmit = 1;
                            if (typeof Obj.upSaveFunction == "function" && Obj.upSaveFunction) {
                                Obj.upSaveFunction();
                            }
                            _t.indexRoute();
                            history.back();
                        },
                        errorCallBack:function(data){
                            common.popup({
                                text:"保存失败"
                            })
                        }
                    });
                    break;
            }
        },
        //上传图片
        imageUpStart:function(){
            var _t = this;
            _t.startUpLoad();
            //click add throw hidden file
            $('.tc-imageUpLoadAdd').attr("disabled","disabled");
            $('.tc-imageUpLoadAdd').on("click",function(){
                var _inputYes = $(this).parent().find(".tc-upLoadInput");
                //_t.op.caseCategoryId = $(this).closest(".tc-upLoadItemBox").siblings(".tc-upLoadTitle").children(".tc-upLoadTitleName").attr("data-treatmentid");
                _t.op.caseCategoryId = 1;
                if(_inputYes.length>0){
                    _inputYes.parent().remove();  //input 父元素div 删除
                    $(this).parent().append(_t.template.replaceInput()); //替换当前input
                }
                _t.startUpLoad();  //input 初始化 start upLoad
                $(this).siblings().find('.tc-upLoadInput').trigger("click");
            });
        },
        //图片上传插件方法处理
        startUpLoad:function(){
            var _t = this;
            czyx.uploadReplace('.tc-upLoadInput', {
                url:_t.path.imagePath,                //file deal URL,
                data: {
                    paramJson: $.toJSON({
                        caseId: Obj.caseId,
                        caseCategoryId: '',   //_t.op.caseCategoryId, X光片(视诊模块传空)
                        imageType: 1          //Obj.imageType   上传资料图片
                    })
                },
                uploadReplaceCss: {
                    //set upLoad btn image
                    display:'none',
                    background: 'url("/image/img00/patientConsult/upload photo_default@2x.png") center no-repeat',
                    backgroundSize: '100%',
                    width: "2.02667rem",       //上传按钮的宽度
                    height: "2.02667rem",      //上传按钮的高度
                    float: 'left'
                },
                uploadInputCss: {
                    width: "100%",             //上传按钮的宽度
                    height: "100%"             //上传按钮的高度
                },
                uploadBefore: function () {
                    if (!/\.((JPEG)|(jpeg)(jpg)|(JPG)|(gif)|(GIF)|(png)|(PNG))$/i.test(this.value)) {
                        common.popup({text: '只允许上传.jpg .gif .png类型的图片文件'});
                        return false;
                    }else {
                        $('.he-videosSubmit').find('.unusable').show().siblings().hide();  //上传时提交按钮置灰
                        _t.localReview(this);
                        if($('.he-videoUpHide.ev-videoImgUpHide').find(".tc-imageUpLoadAdd").length>0){
                            $('.he-videoUpHide.ev-videoImgUpHide').find(".tc-imageUpLoadAdd").hide();
                        }
                    }
                },
                uploadEnd: function (serverJson) {
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
                }
            });
        },
        //本地预览加载
        localReview:function(lRv){
            var _t=this;
            var fileList = lRv.files,
                previewSrc = '',
                _htmlList = '',
                imgPreviewBox = $(lRv).closest('.he-videoImageBox'),  //图片容器
                imgList = $(lRv).closest('.he-videoImageBox').children('.ev-imgList').length;  //已上传图片数量
            _t.op.files.push(fileList);
            if (fileList.length + imgList <= 9) {
                $.each(fileList, function (i, val) {
                    previewSrc = window.URL.createObjectURL(val);
                    _htmlList +=_t.template.localReviewHtml(previewSrc);
                });
                $(imgPreviewBox).find('.tc-imageUpLoadAdd').before(_htmlList);
                //控制上传按钮显示
                if (fileList.length + imgList == 9) {
                    $(imgPreviewBox).find('.tc-imageUpLoadAdd').hide();
                } else {
                    $(imgPreviewBox).find('.tc-imageUpLoadAdd').show();
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
                responsePk=sv.data.responseObject.responsePk,    //图片主键
                url=sv.data.responseObject.responseMessage.logoUrl,
                imageType=sv.data.responseObject.responseMessage.logoType;
            var _successEle=sv.element.closest('.he-videoImageBox').find('.ev-localReview');
            $.each(_successEle,function(i,val){
                $(val).find('.ev-fileUpRefresh').remove();      //重传按钮
                //$(val).find('img').attr("src",url);           //返回图片Url
                $(val).attr({
                    "data-responsePk":responsePk,
                    "data-imageType":imageType
                });
                $(val).find('.tc-upLoading').remove();        //等待效果..
                $(val).find('.tc-upLoadAfreshText').remove(); //文本
                $(val).find('.tc-upLoadCover').remove();      //遮罩
                $(val).find('.tc-upLoadDel').show();          //删除按钮
            });
            _successEle.addClass('success').removeClass('ev-localReview');
            //控制上传图片按钮显示

            if($(sv.element).parent().siblings('.tc-imageUpLoadAdd').length>0){
                if ( $(sv.element).closest('.he-videoImageBox').find('.tc-imageItemList').length == 9) {
                    $(sv.element).parent().siblings('.tc-imageUpLoadAdd').hide();
                } else {
                    $(sv.element).parent().siblings('.tc-imageUpLoadAdd').show();
                }
                //$(sv.element).parent().siblings('.tc-upLoadItemList').show();
                //$(sv.element).parent().show();
            }
            //控制提交按钮显示
            $('.he-videosSubmit').find('.unusable').hide().siblings().show();
            //保存上传图片
            $('.he-videosSubmit').off("click").on("click",".downBtn", function(){
                $('.he-videoUpLoadBox').find('.unusable').show().siblings().hide();
                _t.saveVideoBtn();
            });
            //查看大图
            _t.viewBigImg();
        },
        //上传失败处理
        upLoadError:function(eRv){
            var _t=this,
                _successEle=eRv.element.closest('.he-videoImageBox').find('.ev-localReview');
            if($(eRv.element).parent().siblings('.tc-imageUpLoadAdd').length>0){
                if ( $(eRv.element).closest('.he-videoImageBox').find('.tc-imageItemList').length == 9) {
                    $(eRv.element).parent().siblings('.tc-imageUpLoadAdd').hide();
                } else {
                    $(eRv.element).parent().siblings('.tc-imageUpLoadAdd').show();
                }
            }
            $.each(_successEle,function(i,val){
                $(val).find('.tc-upLoadCover').addClass('upFailed');          //遮罩
                $(val).find('.tc-upLoading').addClass('tc-upLoadAfresh').removeClass('tc-upLoading');       //等待效果..
                $(val).find('.tc-upLoadAfreshText').text("重新上传");         //文本
                $(val).append('<span class="ev-fileUpRefresh"></span>');      //set refresh Btn
                $(val).find('.ev-fileUpRefresh').on("click",function(){
                    //重传事件
                    _t.upLoadPic({
                        element:$(this),
                        parseEle:eRv.element
                    })
                })
            });
        },
        //重传图片
        upLoadPic: function (lv) {
            var _t = this,
                _afreshIndex=lv.element.parent().index(),
                _imgType=1;
            var _files = _t.op.files[_afreshIndex],
                _data = new FormData();
            _data.append('file', _files[0]);
            _data.append('paramJson', $.toJSON({caseId:3,imageType:1,caseCategoryId: _imgType}));
            $.ajax({
                url: _t.path.imagePath,
                data: _data,
                type: "POST",
                dataType:'json',
                contentType: false,
                processData: false,             //此处是data的预处理，需要设置为false
                beforeSend: function (data) {
                    lv.element.siblings('.tc-upLoadAfresh').addClass('tc-upLoading').removeClass('tc-upLoadAfresh');        //等待效果..
                    lv.element.siblings('.tc-upLoadAfreshText').text("等待上传");
                    $('.he-videosSubmit').find('.unusable').show().siblings().hide();   //上传时提交按钮置灰
                    if($('.he-videoUpHide.ev-videoImgUpHide').find(".tc-imageUpLoadAdd").length>0){
                        $('.he-videoUpHide.ev-videoImgUpHide').find(".tc-imageUpLoadAdd").hide();
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
                    if (data.responseObject.responseStatus&&data.responseObject.responsePk!==0) {
                        _t.op.isSubmit = 0;
                        lv.element.siblings('.tc-upLoadAfreshText').remove();    //文本
                        lv.element.parent().attr({
                            "data-responsePk":data.responseObject.responsePk,
                            "data-imageType":data.responseObject.responseMessage.logoType
                        }).addClass('success').removeClass('ev-localReview');
                        //lv.element.siblings('img').attr("src",data.responseObject.responseMessage.logoUrl);   //返回图片Url
                        lv.element.siblings('.tc-upLoading').remove();           //等待效果..
                        lv.element.siblings('.tc-upLoadCover').remove();         //遮罩
                        lv.element.siblings('.tc-upLoadDel').show();             //删除按钮
                        lv.element.remove();                                     //删除重传按钮
                        $('.he-videosSubmit').find('.unusable').hide().siblings().show();  //上传成功提交按钮可点
                        if($('.he-videoUpHide.ev-videoImgUpHide').find('.tc-imageUpLoadAdd').length>0){
                            if ( $('.he-videoUpHide.ev-videoImgUpHide').find('.tc-imageItemList').length == 9) {
                                $('.he-videoUpHide.ev-videoImgUpHide').find('.tc-imageUpLoadAdd').hide();
                            } else {
                                $('.he-videoUpHide.ev-videoImgUpHide').find('.tc-imageUpLoadAdd').show();
                            }
                        }
                        _t.viewBigImg();
                    } else {
                        if($('.he-videoUpHide.ev-videoImgUpHide').find('.tc-imageUpLoadAdd').length>0){
                            if ( $('.he-videoUpHide.ev-videoImgUpHide').find('.tc-imageItemList').length == 9) {
                                $('.he-videoUpHide.ev-videoImgUpHide').find('.tc-imageUpLoadAdd').hide();
                            } else {
                                $('.he-videoUpHide.ev-videoImgUpHide').find('.tc-imageUpLoadAdd').show();
                            }
                        }
                        common.popup({
                            text: "由于网络原因，上传失败"
                        });
                        _t.upLoadError({
                            data:data,
                            element:lv.parseEle
                        });
                    }
                },
                error: function (data) {
                    _t.upLoadError({
                        data:data,
                        element:lv.parseEle
                    });
                }
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
            $('.he-videoImageBox').on("click", ".tc-upLoadDel", function () {
                //if ($(this).closest('.he-videoImageBox').find('.ev-imgList').length == 1) {
                //    $(this).closest('.he-videoImageBox').hide();
                //}
                var _index = $(this).closest('.tc-imageItemList').index();  //当前图片index
                _t.op.files.splice(_index,1);  //从数组中移除删除图片的对象
                _t.op.isSubmit = 0;
                $(this).parent().siblings('.tc-imageUpLoadAdd').show();
                $(this).parent().remove();
                _t.viewBigImg();
            });
        },
        //查看大图
        viewBigImg:function(Iv){
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
                    onClick:function(swiper,event){
                        $("#EV-swiper").remove();
                        Q.go('upVideo');
                        event.stopPropagation();
                        return false;
                    }
                },
                bottomSwiperOptions:{
                    isInit:true
                }
            });
        },
        //微信返回处理
        reBack:function(){
            var _t = this;
            Q.reg(Obj.route,function(){
                if($('.he-videoUpHide').length>0){
                    switch (parseInt(Obj.videoType)){
                        case 1:
                            var _upListBox=$('.he-videoUpHide.ev-videosUpHide').find('.he-loadFiles.ev-localReview');
                            if(_upListBox.length>0){
                                common.confirmBox({
                                    title: "努力上传中",
                                    textCenter:true,
                                    content: '现在离开下次还要重新上传哦',
                                    cancel: '离开',
                                    ensure: '取消',
                                    cancelCallback: function () {
                                        $('.he-videoUpHide.ev-videosUpHide').siblings('.main-inner').show();
                                        $('.he-videoUpHide.ev-videosUpHide').remove();
                                        Obj.backFunction();            //来源页路由里方法
                                    },
                                    ensureCallback: function () {
                                        Q.go("upVideo");
                                    }
                                })
                            } else if($(".he-videoUpHide.ev-videosUpHide").length>0){
                                if( !$(".he-videoUpHide.ev-videosUpHide").is(":hidden")){
                                    if($('.he-loadFiles.ev-success').length>0){
                                        var _isSubmit = $('.ev-videosUpHide').find('.he-loadFiles').attr("isSubmit");
                                        if(_isSubmit ==0 ){
                                            common.confirmBox({
                                                title: "要提交上传的视频吗?",
                                                textCenter:true,
                                                //content: '要提交上传的视频吗？',
                                                cancel: '暂不提交',
                                                ensure: '现在提交',
                                                cancelCallback: function () {
                                                    _t.indexRoute();
                                                },
                                                ensureCallback: function () {
                                                    Q.go("upVideo");
                                                    _t.saveVideoBtn();
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
                            break;
                        case 2:
                            var _upListBox=$('.he-videoUpHide.ev-videoImgUpHide').find('.ev-imgList.ev-localReview');
                            if(_upListBox.length>0){
                                common.confirmBox({
                                    title: "努力上传中",
                                    textCenter:true,
                                    content: '现在离开下次还要重新上传哦',
                                    cancel: '离开',
                                    ensure: '取消',
                                    cancelCallback: function () {
                                        $('.he-videoUpHide.ev-videoImgUpHide').siblings('.main-inner').show();
                                        $('.he-videoUpHide.ev-videoImgUpHide').remove();
                                        Obj.backFunction();            //来源页路由里方法
                                    },
                                    ensureCallback: function () {
                                        Q.go("upVideo");
                                    }
                                })
                            } else if($(".he-videoUpHide.ev-videoImgUpHide").length>0){
                                if( !$(".he-videoUpHide.ev-videoImgUpHide").is(":hidden")){
                                    if($('.tc-imageItemList.ev-imgList').length>0){
                                        if(_t.op.isSubmit ==0 ){
                                            common.confirmBox({
                                                content: '要提交上传的图片吗？',
                                                cancel: '暂不提交',
                                                ensure: '现在提交',
                                                cancelCallback: function () {
                                                    _t.indexRoute();
                                                },
                                                ensureCallback: function () {
                                                    Q.go("upVideo");
                                                    _t.saveVideoBtn();
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
                            break;
                    }
                }
            });
            Q.reg('upVideo',function () {
                document.title = "上传资料";
                //判断上传模块是否存在
                //if ($('.main-inner.tc-upLoadFile').length > 0) {
                //    $('.main-inner.tc-upLoadFile').show();
                //    $(window).scrollTop(0);
                //} else {
                //    _t.perInfo();
                //}
                $('.main-inner.ev-fileUpHide').hide();
                //控制大图显示隐藏
                if($('#EV-swiper').length>0){
                    $('#EV-swiper').remove();
                }
                //if( $('.he-videoUpHide.ev-videoImgUpHide').length>0){
                //    $('.he-videoUpHide.ev-videoImgUpHide').remove();
                //}
            });
            //Q.reg('reviewImg',function(){
            //    $('.ev-fileUpHide').hide();
            //    $('.he-videoUpHide.ev-videoImgUpHide').hide();
            //});
        },
        //返回主页路由
        indexRoute:function(){
            //控制上传模块显示隐藏
            $('.he-videoUpHide').siblings('.main-inner').show();

            if($('.he-videoUpHide.ev-videosUpHide').length>0){
                $('.he-videoUpHide.ev-videosUpHide').remove();
            }
            if($('.he-videoUpHide.ev-videoImgUpHide').length>0){
                $('.he-videoUpHide.ev-videoImgUpHide').remove();
            }

            //执行来源页路由方法
            if (typeof Obj.backFunction == "function" && Obj.backFunction) {
                Obj.backFunction();
            }
        },
        //公用Ajax数据请求
        commAjax: function (dv) {
            var _t = this,
                params = {paramJson: $.toJSON(dv.data)};
            common.loading.show();
            $.ajax({
                url: dv.path,
                type: "POST",
                data: params,
                dataType:"json",
                //time : 5000,
                success: function (data){
                    common.loading.hide();
                    dv.callBack(data);
                },
                error: function () {
                    common.loading.hide();
                    dv.errorCallBack();
                }
            });
        }
    };
    container.init(Obj);
};


//modules.videoUpLoad({
//    caseId:1489545287440,   //病例ID
//    videoType:1,             //1-视频、2-图片
//    upLoadDesc:""            //上传描述
//});