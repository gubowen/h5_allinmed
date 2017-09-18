/**
 * @Desc：   使用七牛云存储上传视频
 * @Usage:   videoUpload({
 *              obj:'#demo',                         // 上传选择的点选按钮DOM ID，必需 （带#）
 *              multi_selection:false,               // 设置一次是否只能选择一个文件 默认(false)只能选择一个文件
 *              flash_swf_url:'/plupload/Moxie.swf', // 引入flash，相对路径
 *              dragdrop:true,                       // 开启可拖曳上传  默认（true）可以拖拽
 *              uptoken_url:'',                      // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
 *              domain:'',                           // bucket域名，下载资源时用到，必需
 *              max_file_size:2 * 1024,              // 文件上传最大多少M   number类型
 *              chunk_size:'4mb'                     // 分块上传时，每块的体积 默认'4mb'
 *              filesAdded:function(){},             // 文件添加进队列后,处理相关的事情
 *              pluploadEach:function(file){},       // 每个文件上传时处理函数  (可以获取file信息)
 *              beforeUpload:function(file){},       // 每个文件上传前,处理相关的事情 (可以获取file信息)
 *              uploadProgress:function(file){},     // 每个文件上传时,处理相关的事情 （可以获取上传进度等信息）
 *              uploadComplete:function(){},         // 队列文件处理完毕后,处理相关的事情
 *              fileUploaded:function(dataJSON){},   // 每个文件上传成功后,处理相关的事情(可获取key、persistentId两个参数需要传给我们的数据库)
 *              fileUploadError:function(){}         // 每个文件上传失败后,处理相关的事情
 *           })
 * @Notify： ★★注意1：obj是一个ID （带#）
 * @Depend： <script src="//paas.allinmd.cn/modules/video_upload/qiniu/qiniu.js"></script>
             <script src="//paas.allinmd.cn/modules/video_upload/qiniu/ui.js"></script>
             <script src="//paas.allinmd.cn/modules/video_upload/plupload/plupload.full.min.js"></script>
 *
 * Created by LiChunHui on 2017/3/15.
 */
var videoUpload=function(options){
    var container={};
    container={
        init:function(options){
            this.options = {};
            var o = {
                multi_selection : false,
                flash_swf_url : '/plupload/Moxie.swf',
                dragdrop : true,
                max_file_size : 80,
                chunk_size: '4mb'
            };
            this.options = $.extend(o, options);
            this.upload();
        },
        getName : function (obj) {
            var path = obj;
            var pos1 = path.lastIndexOf('/');
            var pos2 = path.lastIndexOf("\\");
            var pos3 = Math.max(pos1, pos2);
            var pos4 = path.lastIndexOf(".");
            var fileName = path.substring(pos3 + 1, pos4);
            var suffixName = path.substring(pos4 + 1, path.length);
            return {
                "fileName": fileName,   //文件名
                "suffixName": suffixName //文件后缀
            };
        },
        upload:function(){
            var _t=this;

            var uploader = Qiniu.uploader({
                runtimes: 'html5,flash,html4',
                browse_button: _t.options.obj.substring(1),         // 上传选择的点选按钮DOM ID，必需
                container: $(_t.options.obj).parent().attr("id"),   // 上传区域DOM ID，默认是browser_button的父元素
                drop_element: $(_t.options.obj).parent().attr("id"),// 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
                multi_selection: _t.options.multi_selection,        // 设置一次只能选择一个文件
                flash_swf_url: _t.options.flash_swf_url,            //引入flash，相对路径
                dragdrop: _t.options.dragdrop,                      // 开启可拖曳上传
                chunk_size: _t.options.chunk_size,                  // 分块上传时，每块的体积
                uptoken_url: _t.options.uptoken_url,                // Ajax请求uptoken的Url，强烈建议设置（服务端提供）
                domain: _t.options.domain,                          // bucket域名，下载资源时用到，必需
                get_new_uptoken: false,                             // 设置上传文件的时候是否每次都重新获取新的uptoken
                filters: {
                    mime_types: [                                   //只允许上传video
                        {title: "video", extensions: "mp4,mov,avi,wmv,flv"}
                    ],
                    prevent_duplicates: true                        //不允许选取重复文件
                },
                auto_start: true,                                   // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
                init: {
                    'FilesAdded': function (up, files) {
                        _t.options.filesAdded&&_t.options.filesAdded(up,files); // 文件添加进队列后,处理相关的事情
                        plupload.each(files, function (file) {
                            var progress = new FileProgress(file, 'fsUploadProgress');
                            progress.setStatus("等待...");
                            progress.bindUploadCancel(up);

                            _t.options.pluploadEach&&_t.options.pluploadEach(up,file);  //每个文件上传时处理函数
                        });
                    },
                    'BeforeUpload': function (up, file) {          // 每个文件上传前,处理相关的事情
                        var name=_t.getName(file.name);
                        var fileName = name.fileName;
                        var suffix = name.suffixName;
                        if ((/(mp4)|(mov)|(avi)|(wmv)|(flv)$/i.test(suffix))) {
                            var fileSize = file.size;
                            if (fileSize > _t.options.max_file_size * 1048576) {
                                //alert("视频过大，请联系在线客服寻求帮助");
                                common.topTips.show({
                                    class: "videoSize-tips",
                                    content: "上传视频请控制在60M以内"
                                });
                                $('.videoSize-tips').css("z-index","5");
                                setTimeout(function(){
                                    $('.videoSize-tips').remove();
                                },3000);
                                uploader.removeFile(uploader.getFile(file.id));
                                return false;
                            } else {

                            }
                        } else {
                            common.popup({
                                text:"请上传mp4、mov、avi、wmv、flv格式视频"
                            });
                            //alert("格式不支持，请选择mov、mp4、avi、wmv、flv");
                            uploader.removeFile(uploader.getFile(file.id));
                            return false;
                        }
                        _t.options.beforeUpload&&_t.options.beforeUpload(up,file);   // 每个文件上传前,处理相关的事情
                        var progress = new FileProgress(file, 'fsUploadProgress');
                        var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                        if (up.runtime === 'html5' && chunk_size) {
                            progress.setChunkProgess(chunk_size);
                        }
                    },
                    'UploadProgress': function (up, file) {// 每个文件上传时,处理相关的事情
                        var progress = new FileProgress(file, 'fsUploadProgress');
                        var chunk_size = plupload.parseSize(this.getOption('chunk_size'));
                        //progress.setProgress(file.percent + "%", file.speed, chunk_size);

                        _t.options.uploadProgress&&_t.options.uploadProgress(up,file);   // 每个文件上传时,处理相关的事情
                    },
                    'UploadComplete': function () { //队列文件处理完毕后,处理相关的事情
                        _t.options.uploadComplete&&_t.options.uploadComplete(); //队列文件处理完毕后,处理相关的事情
                    },
                    'FileUploaded': function (up, file, info) { // 每个文件上传成功后,处理相关的事情
                        var progress = new FileProgress(file, 'fsUploadProgress');
                        progress.setComplete(up, info);

                        if(info){
                            var dataJSON = JSON.parse(info);
                            //t.key=dataJSON.key;
                            //t.persistentId=dataJSON.persistentId;
                            _t.options.fileUploaded&&_t.options.fileUploaded(up,file,dataJSON); // 每个文件上传成功后,处理相关的事情
                        }

                    },
                    'Error': function (up, err, errTip) {// 每个文件上传失败后,处理相关的事情
                        _t.options.fileUploadError&&_t.options.fileUploadError();
                        var progress = new FileProgress(err.file, 'fsUploadProgress');
                        progress.setError();
                        progress.setStatus(errTip);
                    }

                }
            });
            uploader.bind('FilesAdded', function(uploader, file){
                if(!_t.options.multi_selection){
                    if(uploader.files.length>1){ // 最多上传1个视频
                        uploader.splice(1,999);
                    }
                }

            });
            uploader.bind('FileUploaded', function () {
                //console.log('hello man,a file is uploaded');
            });
        }
    };
    container.init(options);
}
