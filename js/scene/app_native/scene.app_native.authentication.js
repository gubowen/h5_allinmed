/**
 * Created by ALLIN on 2017/6/1.
 */
$(document).ready(function(){
    var util = {
        timeList: function (options) {
            var data1 = [], data2 = [], data3 = [],
                _y = new Date().getFullYear()+1,
                _m = 0,
                _d = 0;
            for (var i = 0; i < 110; i++) {
                _y--;
                data1.push({
                    text: _y,
                    value: _y
                })
            }

            for (var i = 0; i < 12; i++) {
                _m++;
                data2.push({
                    text: (function () {
                        if (_m < 10) {
                            return "0" + _m;
                        } else {
                            return _m;
                        }
                    }()),
                    value: _m
                })
            }

            for (var i = 0; i < 31; i++) {
                _d++;
                data3.push({
                    text: (function () {
                        if (_d < 10) {
                            return "0" + _d;
                        } else {
                            return _d;
                        }
                    }()),
                    value: _d
                })
            }
            return {
                data1: data1,
                data2: data2,
                data3: data3
            }
        }
    };
    var parameter = {
        isUpdate:1,
        postSurgery:[],
        visitSiteId:(common.browser.android)?"19":"20",
        customerId:"",
        // customerId:"",
        moreMaterial:[],
        scrollTop:0,
        nowIndex: 0,//标注显示认证的界面的索引,
        cityType:"hospital",
        localFirstData:[],
        localSecondtData:[]
    };
    var ajaxPort = {
        academic:"//m.allinmed.cn/mcall/comm/data/fellowship/institutions/v1/getMapList/",
        subject: "//m.allinmed.cn/mcall/comm/data/baseinfo/v1/getMajorList/",//专业，第二步
        "eduLevel": "//m.allinmed.cn/mcall/comm/data/baseinfo/v1/getEducationList/",
        submitTwo: "//m.allinmed.cn/mcall/customer/auth/v1/saveAuthSupplement/",
        submitOne: "//m.allinmed.cn/mcall/customer/auth/v1/createAuth/",
        "education": "//m.allinmed.cn/mcall/customer/auth/v1/getAuthSupplement/",
        userInfo: "//m.allinmed.cn/mcall/customer/auth/v1/getMapById/",
        illnessList: "//m.allinmed.cn/mcall/comm/data/illness/v1/getMapList/",//擅长疾病
        professional:"//m.allinmed.cn/mcall/comm/data/major/v1/getMapSearchList/",
        hospital:"//m.allinmed.cn/mcall/comm/data/baseinfo/v1/getHospitalList/",
        school:"//m.allinmed.cn/mcall/comm/data/baseinfo/v1/getSchoolList/",//学校
        city:"//m.allinmed.cn/mcall/comm/data/baseinfo/v1/getRegionList/",
        province:"//m.allinmed.cn/mcall/comm/data/baseinfo/v1/getRegionList/",
        surgeryInner: "//m.allinmed.cn/mcall/comm/data/operation/v1/getMapList/",//真数据
        "surgery": "//m.allinmed.cn/mcall/cms/major/operation/relation/v1/getMapListByMajor/",
        certificate:"//m.allinmed.cn/mcall/comm/data/baseinfo/v1/getRoleConfigList/"
    };
    var element = {
        jump:$(".btn-top"),
        "next": $(".next-path"),
        "pre": $(".main-index-back"),
        "contentBox": $(".main-inner"),
        "illsearchResult": $(".enjoy-ill-search"),
        "illSearchInput": $(".enjoy-ill-input-text"),
        "illList": $(".enjoy-ill-list"),
        returnBack: $(".back"),
        name: $(".aut-list-item-name-input"),
        sex: $(".aut-list-sex-input"),
        age: $(".aut-list-age-input"),
        hospital: $(".aut-list-hospital-input"),
        searchList:$(".search-text"),
        disease:$(".aut-list-disease"),
        major: $(".aut-list-professional-input"),
        surgery: $(".illness-inner"),
        billNum: $(".illness-number"),
        accident: $(".aut-list-accident-input"),
        medical: $("#ev-medicalTitleSelector"),
        postImage: $(".aut-list-post-image"),
        moreMedical:$(".aut-list-more-input"),
        addEdu:$(".add-edu-backdrop"),
        addEduContinue:$(".add-edu-continue"),
        addFellowEdu:$(".add-edu-engage"),
        hasFellow:$(".has-selector-Fellow"),
        hasContinue:$(".has-selector-continue"),
        dialog:{
            hospital:$("#ev-hospital"),
            professional:$("#ev-professional"),
            disease:$("#ev-disease"),
            surgery:$("#ev-illness"),
            subject:$("#ev-subject"),
            academic:$("#ev-academic"),
            school:$("#ev-school"),
            province:$("#ev-province"),
            city:$("#ev-city")
        }
    };
    var template = {
        produce: function (type, data) {
            /*
             * 函数名称：produce
             * 描述：产生html字符串，不做任何逻辑判断
             * 参数说明：
             * -------1、type,规定要产生的模板类型，string,必须
             * -------2、data，动态数据，array,必须
             * 返回值说明：
             *  -------1、htmlStr，返回相应类型的html字符串，string
             * */
            //调用示例：produce("pay",data)
            var str = "";
            for (var typeNum = 0; typeNum < type.length; typeNum++) {
                str += this.demo[type[typeNum]];
            }
            String.prototype.temp = function (obj) {
                return this.replace(/\$\w+\$/gi, function (matchs) {
                    var returns = obj[matchs.replace(/\$/g, "")];
                    return (returns + "") == "undefined" ? "" : returns;
                });
            };
            var htmlStr = "";
            for (var i = 0; i < data.length; i++) {
                htmlStr += str.temp(data[i]);
            }
            return htmlStr;
        },
        demo: {
            "area":'<article class=\"selector-dialog-item selector-dialog-area\"  data-area="$id$" data-treelevel="$treeLevel$" data-parentId="$parentId$"  data-regionId="$regionId$"   data-regionName="$regionName$">' +
            '<span>$regionName$</span>' +
            "</article>",
            "city":'<article class=\"selector-dialog-item selector-dialog-city  city-list-item\"  data-city="$id$" data-treelevel="$treeLevel$" data-parentId="$parentId$"  data-regionId="$regionId$"   data-regionName="$regionName$">' +
            '<span>$regionName$</span>' +
            "</article>",
            "school": "<article class=\"selector-dialog-item selector-dialog-school school-list-item\" data-id='$id$'>" +
            "<span>$schoolName$</span>" +
            "</article>",
            "academicList": "<article class=\"selector-dialog-item  academic-list-item\" data-academicId='$fellowshipInstitutionsId$'>" +
            "<span>$fellowshipInstitutions$</span>" +
            "</article>",
            "majorList": "<i class='majorListShow' data-majorId='$majorId$'>$name$</i>",
            "surgeryShow": "<i class='surgeryShow' data-operationId='$operationId$'>$operationName$</i>",
            "surgeryList": "<article class=\"selector-dialog-item \"  data-operationInnerId='$operationId$'>" +
            "  <span>$operationName$</span>" +
            " </article>",
            "surgery": "<li><article class=\"selector-dialog-item surgerylist-item selector-dialog-title\" data-operationParentId='$parentId$' data-operationId='$operationId$' data-children='$children$'>" +
            "<span>$operationName$</span>" +
            "<i></i>" +
            "</article>" +
            "</li>",
            "selcetIllness": "<li class=\"enjoy-ill-item\" data-illListId='$illId$'><span>$illName$</span><i>x</i></li>",
            "illnessShow": "<i class='illNessShow' data-illId='$illId$'>$illName$</i>",
            "engage": "<section class=\"aut-list-second\">" +
            "<article class=\"aut-list-item\">" +
            "<figcaption class=\"aut-list-item-title\"><span>地点</span></figcaption>" +
            '<figure class="aut-list-item-input aut-list-country-input">'+
            '<section class="aut-sex-selector icon-aut-selector" data-type="2"><span>国内</span></section>'+
            '<section class="aut-sex-selector icon-aut-selector" data-type="1"><span>国外</span></section>'+
            '</figure>'+
            "</article>" +
            "<article class=\"aut-list-item\">" +
            "<figcaption class=\"aut-list-item-title\"><span>机构</span></figcaption>" +
            "<figure class=\"aut-list-item-input aut-list-academic-input icon-right-arrow\">" +
            "<span class=\"modal-inner aut-list-academic \">请选择学术机构</span>" +
            "</figure>" +
            "</article>" +
            "<article class=\"aut-list-item\">" +
            "<figcaption class=\"aut-list-item-title\">" +
            "<span>时间</span>" +
            "</figcaption>" +
            "<figure class=\"aut-list-item-input\">" +
            "<span class=\"title-time-selector\">开始时间</span>" +
            "<span class=\"hr-text\">至</span>" +
            "<span class=\"title-time-selector\">结束时间</span>" +
            "</figure>" +
            "</article>" +
            "<article class=\"aut-list-item\"><figcaption class=\"aut-list-item-title\"><span>进修说明</span>" +
            "</figcaption>" +
            "<figure class=\"aut-list-item-input \">" +
            "<input type=\"text\" placeholder=\"请输入进修内容\" class='aut-list-input-text aut-list-input-academic'>" +
            '<span class="aut-list-input-explain"></span>' +
            "</figure>" +
            "</article>" +
            "</section>",
            "continueEdu": "<section class=\"aut-list-second\">" +
            "<article class=\"aut-list-item aut-list-continue\">" +
            "<figcaption class=\"aut-list-item-title\">" +
            "<span>机构</span>" +
            "</figcaption>" +
            "<figure class=\"aut-list-item-input icon-right-arrow\">" +
            "<input type=\"text\" placeholder=\"请输入学术机构\" class='aut-list-input-text'>" +
            '<span class="aut-list-input-explain"></span>' +
            "</figure>" +
            "</article>" +
            "<article class=\"aut-list-item aut-list-continue\">" +
            "<figcaption class=\"aut-list-item-title\">" +
            "<span>时间</span>" +
            "</figcaption>" +
            "<figure class=\"aut-list-item-input\">" +
            '<span class="title-time-selector">开始时间</span>' +
            "<span class=\"hr-text\">至</span>" +
            '<span class="title-time-selector">结束时间</span>' +
            "</figure>" +
            "</article>" +
            "<article class=\"aut-list-item aut-list-continue\">" +
            "<figcaption class=\"aut-list-item-title\">" +
            "<span>获得证书</span>" +
            "</figcaption>" +
            "<figure class=\"aut-list-item-input icon-right-arrow\">" +
            "<input type=\"text\" placeholder=\"请输入获得证书或荣誉\" class='aut-list-input-text'>" +
            '<span class="aut-list-input-explain"></span>' +
            "</figure>" +
            "</article>" +
            "<article class=\"aut-list-item aut-list-continue\">" +
            "<figcaption class=\"aut-list-item-title\">" +
            "<span>培训内容</span>" +
            "</figcaption>" +
            '<figure class="aut-list-item-input icon-right-arrow">'+
            '<input type="text" placeholder="请输入培训内容" class="aut-list-input-text">'+
            '<span class="aut-list-input-explain"></span>'+
            '</figure>'+
            "</article>" +
            "</section>",
            "edu": "<article class=\"aut-list-item aut-list-item-edu\">" +
            "<figcaption class=\"aut-list-item-title\">" +
            "<span>学历</span>" +
            "</figcaption>" +
            "<figure class=\"aut-list-item-input icon-right-arrow aut-list-select-edu\">" +
            "<span class=\"modal-inner\">请选择学历</span>" +
            "</figure>" +
            "</article>" +
            "<article class=\"aut-list-item aut-list-item-edu\">" +
            "<figcaption class=\"aut-list-item-title\">" +
            "<span>学校</span>" +
            "</figcaption>" +
            "<figure class=\"aut-list-item-input icon-right-arrow\">" +
            "<span class=\"modal-inner aut-list-select-school\">请选择学校或机构</span>" +
            "</figure>" +
            "</article>" +
            "<article class=\"aut-list-item aut-list-item-edu\">" +
            "<figcaption class=\"aut-list-item-title\">" +
            "<span>专业</span>" +
            "</figcaption>" +
            "<figure class=\"aut-list-item-input icon-right-arrow\">" +
            "<span class=\"modal-inner aut-list-select-major\">请选择专业</span>" +
            "</figure>" +
            "</article>" +
            "<article class=\"aut-list-item aut-list-item-edu\">" +
            "<figcaption class=\"aut-list-item-title\">" +
            "<span>时间</span>" +
            "</figcaption>" +
            "<figure class=\"aut-list-item-input\">" +
            "<section class=\"aut-list-item-time aut-list-item-year aut-list-start-year\">" +
            "开始时间" +
            "</section>" +
            "<span class=\"hr-text\">至</span>" +
            "<section class=\"aut-list-item-time aut-list-item-year aut-list-end-year\">" +
            "结束时间" +
            "</section>" +
            "</figure>" +
            "</article>",
            "goodAtIllness": "<span class='al-good-ill-item' data-illnessId='$illnessId$'>$illnessName$</span>",
            "illness": "<li class=\"enjoy-search-item\" data-illId='$illnessId$'>$illnessName$</li>",
            "schoolList":'<article class="selector-school-result" data-schoolid="$id$">'+
            '<span>$schoolName$</span>'+
            '</article>',
            "hospitalList":'<article class="selector-hospital-result" data-hospitalid="$id$">'+
            '<span>$hospitalName$</span>'+
            '</article>',
            "hospital": "<article class=\"selector-dialog-item selector-dialog-hospital hospital-list-item\">" +
            "<span data-id='$id$'>$hospitalName$</span>" +
            "</article>",
            "subject": "<article class=\"selector-dialog-item subject-list-item\" data-subjectId='$majorId$'>" +
            "<span>$majorTitle$</span>" +
            "</article>",
            "professional": "<article class=\"selector-dialog-item selector-dialog-professional professional-list-item\"" +
            " data-projectId='$majorId$'" +
            " data-treeLevel='$treeLevel$'>" +
            "<span>$majorName$</span>" +
            "<section class=\"selector-dialog-content second\">" +
            "</section>" +
            "</section>" +
            "</article>"
        },
        fellowEdu:function(id){
            var timeId = Date.parse(new Date());
            return '<section class="aut-list-second aut-list-continue-engage" data-add-fellow="'+id+'" style="display: block;">'+
                '<article class="aut-list-item" data-timeId="'+timeId+'">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>地点</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input aut-list-country-input">'+
                '<section class="icon-aut-selector" data-type="2"><span>国内</span></section>'+
                '<section class="icon-aut-selector" data-type="1"><span>国外</span></section>'+
                '</figure>'+
                '</article>'+
                '<article class="aut-list-item">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>机构</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input aut-list-academic-input icon-right-arrow">'+
                '<span class="modal-inner aut-list-academic">请选择学术机构</span>'+
                '</figure>'+
                '</article>'+
                '<article class="aut-list-item">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>时间</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input">'+
                '<span class="title-time-selector">开始时间</span>'+
                '<span class="hr-text">至</span>'+
                '<span class="title-time-selector">结束时间</span>'+
                '</figure>'+
                '</article>'+
                '<article class="aut-list-item">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>进修说明</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input ">'+
                '<input type="text" placeholder="请输入进修内容" class="aut-list-input-text aut-list-input-academic">'+
                '<span class="aut-list-input-explain"></span>'+
                '</figure>'+
                '</article>'+
                '</section>';
        },
        continueEdu:function(id){
            var timeId = Date.parse(new Date());
            return '<section class="aut-list-second aut-list-continue-edu" data-add-continue="'+id+'" style="display: block;">'+
                '<article class="aut-list-item aut-list-continue"  data-timeId="'+timeId+'">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>机构</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input icon-right-arrow">'+
                '<input type="text" placeholder="请输入学术机构" class="aut-list-input-text">'+
                '<span class="aut-list-input-explain"></span>'+
                '</figure>'+
                '</article>'+
                '<article class="aut-list-item aut-list-continue">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>时间</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input">'+
                '<span class="title-time-selector">开始时间</span>'+
                '<span class="hr-text">至</span>'+
                '<span class="title-time-selector">结束时间</span>'+
                '</figure>'+
                '</article>'+
                '<article class="aut-list-item aut-list-continue">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>获得证书</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input icon-right-arrow">'+
                '<input type="text" placeholder="请输入获得证书或荣誉" class="aut-list-input-text">'+
                '<span class="aut-list-input-explain"></span>'+
                '</figure>'+
                '</article>'+
                '<article class="aut-list-item aut-list-continue">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>培训内容</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input icon-right-arrow">'+
                '<input type="text" placeholder="请输入培训内容" class="aut-list-input-text">'+
                '<span class="aut-list-input-explain"></span>'+
                '</figure>'+
                '</article>'+
                '</section>';
        },
        edu:function(id){
            var timeId = Date.parse(new Date());
            return '<article class="aut-list-item aut-list-item-edu" data-edu-count="'+id+'"   data-timeId="'+timeId+'">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>学历</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input icon-right-arrow aut-list-select-edu">'+
                '<span class="modal-inner">请选择学历</span>'+
                '</figure>'+
                '</article>'+
                '<article class="aut-list-item aut-list-item-edu" data-edu-count="'+id+'">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>学校</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input icon-right-arrow aut-list-select-school">'+
                '<span class="modal-inner">请选择学校或机构</span>'+
                '</figure>'+
                '</article>'+
                '<article class="aut-list-item aut-list-item-edu" data-edu-count="'+id+'">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>专业</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input icon-right-arrow">'+
                '<span class="modal-inner aut-list-select-major">请选择专业</span>'+
                '</figure>'+
                '</article>'+
                '<article class="aut-list-item aut-list-item-edu" data-edu-count="'+id+'">'+
                '<figcaption class="aut-list-item-title">'+
                '<span>时间</span>'+
                '</figcaption>'+
                '<figure class="aut-list-item-input aut-list-max-input">'+
                '<section class="aut-list-item-time aut-list-item-year aut-list-start-year">'+
                '<span class="title-time-selector">开始时间</span>'+
                '</section>'+
                '<span class="hr-text">至</span>'+
                '<section class="aut-list-item-time aut-list-item-year aut-list-end-year">'+
                '<span class="title-time-selector">结束时间</span>'+
                '</section>'+
                '</figure>'+
                '</article>'
        },
        noSearchResult:function(){
            return '<article class="selector-no-result">'+
                '<article class="selector-no-icon">'+
                "<img src=\"/image/img00/app_native/no%20content@2x.png\" alt=\"\">"+
                '</article>'+
                '<article class="selector-no-text">'+
                '<p>'+
                '	搜索无结果'+
                '</p>'+
                '<p>'+
                '	换个关键词试试'+
                '</p>'+
                '</article>'+
                '</article>';
        },
        province:function(data){
            var str = "";
            var key = "";
            for(var i = 0;i<data.length;i++){
                if(key!=data[i].pinyin){
                    key=data[i].pinyin;
                    str+='<header class="selector-dialog-major-title">'+key+'</header>';
                }
                str+='<article class="selector-dialog-item selector-dialog-province  province-list-item " data-provinceId="'+data[i].id+'" data-treelevel="'+data[i].treeLevel+'" data-parentId="'+data[i].parentId+'"  data-regionId="'+data[i].regionId+'"   data-regionName="'+data[i].regionName+'"><span>'+data[i].regionName+'</span></article>';
            }
            return str;
        },
        "moreMedical":function(titleImg,uploadid,url,id){
            var imgUrl = "/image/img00/app_native/upload_photo.png";
            var containerstr = "";
            if(url.length>0){
                imgUrl = url;
                 containerstr = "<section class=\"aut-img-post-container\"><i class=\"au-list-img-close\">X</i><img src=\""+imgUrl+"\" alt=\"\"></section>";
            }
            return "<header class=\"aut-list-item-header\">" + titleImg + "</header>" +
                '<article class="aut-list-item aut-list-post-image aut-list-post-more">' +
                '<figure class="aut-list-item-upload-input">' +
                '<section class="aut-list-upload-file">' +
                '<form class="uploadIcon uploadPic" method="POST" enctype="multipart/form-data">' +
                '	图片' +
                '	<input type="file" class="postPicButton" name="file" data-uploadid="' + uploadid + '" accept="image/*">' +
                '</form>' +
                '</section>' +
                "<article class=\"aut-upload-tool\"  data-uploadid=\'" + uploadid + "\' data-typeid='"+id+"'>" +
                "<img src=\"/image/img00/app_native/upload_photo.png\" alt=\"\">" +
                "<p>" +
                "	上传图片" +
                "</p>" +
                "</article>" +
                    containerstr+
                '</figure>' +
                '</article>';
        },
        surgeryShow: function (data) {
            var id = 0;
            var str = "";
            $.each(data, function (index, value) {
                str += "<i class='surgeryShow'  data-operationId='" + value.operationId + "'>" + value.operationName + "</i>";
            });
            return str;
        },
        imgPost:function(imgUrl){
            return "<section class=\"aut-img-post-container\" >" +
                "<i class=\"au-list-img-close\" >X</i>" +
                "<img src=\"" + imgUrl + "\" alt=\"\" >" +
                "</section>";
        }
    };
    var manageData = {
        postSurgery:function(data){
            var majorList = data;
            var majorId = "";
            var dataList = [];
            $.each(majorList, function (i, v) {
                if (v.majorId != majorId) {
                    majorId = v.majorId;
                    dataList.push({
                        "majorId": v.majorId,
                        "majorName": v.majorName,
                        "operationIdList": "",
                        operationNameList: ""
                    });
                }
            });
            $.each(dataList, function (i, v) {
                $.each(majorList, function (si, sv) {
                    if (sv.majorId == v.majorId) {
                        v.operationIdList += sv.operationId + ",";
                        v.operationNameList += sv.operationName + ",";
                    }
                });
                v.operationIdList = v.operationIdList.substring(0, v.operationIdList.lastIndexOf(","));
                v.operationNameList = v.operationNameList.substring(0,v.operationNameList.lastIndexOf(","))
            });
            return dataList;
        },
        disposeSurgery:function(data){
            var listData = data.responseObject.responseData.dataList;
            var surgeryData = [];
            var majorId = "";
            var majorList = [];
            $.each(listData,function(i,v){
                if(v.majorId!=majorId){
                    majorId = v.majorId;
                    majorList.push({"majorId":v.majorId,"majorName":v.majorName,"children":[]});
                }
            });
            $.each(majorList,function(index,val){
                $.each(listData,function(i,v){
                    if(val.majorId==v.majorId){
                        val.children.push({operationId: v.operationId,operationName: v.operationName});
                    }
                });
            });
            var dealMajorList=[];
            $.each(majorList,function(i,v){
                var same = true;
                $.each(dealMajorList,function(si,sv){
                    if(v.majorId==sv.majorId){
                        same = false;
                    }
                });
                if(same){
                    dealMajorList.push(v);
                }
            });
            return dealMajorList;
        },
        applyData: function (options) {
            var postType = (options.get) ? "GET" : "POST";//默认是post方式，除非特别传参指名要get方式。
            var postData = {"paramJson": $.toJSON(options.postData)};
            $.ajax({
                url: options.port,    //请求的url地址
                dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                data: postData,    //参数值
                type: postType,   //请求方式
                beforeSend: function () {
                    //请求前的处理
                },
                success: function (data) {
                    //请求成功时处理
                    if(data){
                        var realNoData = ((data.responseObject.responseMessage) == "NO DATA");
                        var realStatus = data.responseObject.responseStatus;
                        if (realNoData || !realStatus) {
                            options.failed && options.failed();
                        } else {
                            options.success && options.success(data);
                        }
                    }else{
                        options.failed && options.failed();
                    }


                },
                complete: function () {
                    //请求完成的处理
                },
                error: function () {
                    //请求出错处理
                }
            });
        },
        deleteData: function (data, condi, id) {
            var newData = JSON.parse(JSON.stringify(data));
            var dealData = [];
            for (var ci = 0; ci < newData.length; ci++) {
                if (newData[ci][condi] != id) {
                    dealData.push(newData[ci]);
                }
            }
            return dealData;
        }
    };
    function setupWebViewJavascriptBridge(callback) {

        if (window.WebViewJavascriptBridge) {
            return callback(WebViewJavascriptBridge);
        }
        if (window.WVJBCallbacks) {
            return window.WVJBCallbacks.push(callback);
        }
        window.WVJBCallbacks = [callback];

        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function () {
            document.documentElement.removeChild(WVJBIframe)
        }, 0)
    }

    /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
    setupWebViewJavascriptBridge(function (bridge) {
        var uniqueId = 1;
        function log(message, data) {
            var log = document.getElementById('log')
            var el = document.createElement('div')
            el.className = 'logLine'
            el.innerHTML = uniqueId++ + '. ' + message + ':<br/>' + JSON.stringify(data)
            if (log.children.length) {
                log.insertBefore(el, log.children[0])
            }
            else {
                log.appendChild(el)
            }
        }


        /* Initialize your app here */

        /*JS给ObjC提供公开的API（testJavascriptHandler），在ObjC端可以手动调用JS的这个API（调用方法如：[_bridge callHandler:@"testJavascriptHandler" data:@{ @"foo":@"before ready" }];）。
         1.testJavascriptHandler：JS给ObjC提供公开的API name
         2.参数data：接收ObjC传过来的参数（data为参数）
         3.参数responseCallback：可以回调ObjC（responseCallback是OC提供的回调函数）
         4.responseData：JS传给OC回调函数的参数
         */
        var auth = {
            init:function(){
                var t = this;
                t.getCorrelation().getUserInfo().inputName().selectSex().selectAge().selectTime().selectHospital().selectSchool().selectMajor().goodAtIll().inputIllNum().selectAccident().selectMedical().postImg().moreMedical().addSurgery().addEdu().addContinueEdu().addFellowEdu().hasEdu().changeIndex().explain().submit();
                return t;
            },
            submit:function(){
                var t = this;
                $(".img-upload-submit").off("click").on("click",function(){
                    if($(this).hasClass("on")){
                        parameter.isUpdate = 0;
                        t.submitOne();
                        t.submitTwo();
                        bridge.callHandler("authFinished", function (response) {

                        });
                    }
                });
                return t;
            },
            explain:function(){
                var t = this;
                $(".aut-list-input-text").off("blur").on("blur",function(){
                    $(".main-inner").eq(1).attr({"data-changeindex":"true"});//启动第二步操作标志
                    element.next.addClass("on");
                    var onOff = ($(this).val().length < 21) && ($(this).val().length > 0);
                    if (onOff) {
                        $(this).hide();
                        $(this).next().html($(this).val()).show();

                    } else {
                        if ($(this).val().length > 0) {
                            common.popup({
                                "text": "20字以内"
                            });
                            var str = $(this).val();
                            $(this).val(str.substring(0, 20));
                        } else {
                            common.popup({
                                "text": "内容为空"
                            });
                        }
                    }
                });
                $(".aut-list-input-explain").unbind("click").bind("click", function () {
                    $(this).hide();
                    $(this).prev().show();
                });
                return t;
            },
            hasEdu:function(){
                var t = this;
                element.hasFellow.off("click").on("click",function(){
                    $(this).addClass("on").siblings().removeClass("on");
                    $(this).parent().nextAll().show();
                    if($(this).text()=="无"){
                        $("[data-add-fellow]").remove();
                        $("[data-fellow-count]").attr({"data-fellow-count":"0"}).trigger("click").hide();
                        $("[data-add-fellow]").hide();
                    }
                });
                element.hasContinue.off("click").on("click",function(){
                    $(this).addClass("on").siblings().removeClass("on");
                    $(this).parent().nextAll().show();
                    if($(this).text()=="无"){
                        $("[data-add-continue]").remove();
                        $("[data-continue-count]").attr({"data-continue-count":"0"}).trigger("click").hide();
                        $("[data-add-continue]").hide();
                    }
                });
                return t;
            },
            dealSecond:function(data){
                var t = this;
                var duringTime = function(str){
                    if(str.length>0){
                        var res = str.split("-");
                        return res[0]+"年"+res[1]+"月";
                    }else{
                        return str;
                    }

                };
                if(data.responseObject.responseData.dataList){
                    var dealLocalData = [];
                    parameter.localSecondtData = data.responseObject.responseData.dataList;
                    $(".main-inner").eq(1).attr({"data-getEducation":"true","data-changeindex":"true"});
                    $.each(data.responseObject.responseData.dataList[0].fellowshipMapList,function(i,v) {
                        v.timeId = Date.parse(new Date())+i;
                        $(".has-selector-Fellow").eq(0).trigger("click");
                        if (i > 0) {
                            element.addFellowEdu.trigger("click");
                        }
                        var fellowNum = 1+i;
                        var fellowObj = $("[data-add-fellow='" + fellowNum + "']");
                        var countyrObj = fellowObj.find(".aut-list-item").eq(0).attr({"data-timeId":v.timeId});
                        var partment = fellowObj.find(".aut-list-item").eq(1).find(".aut-list-academic");
                        var timeObj = fellowObj.find(".aut-list-item").eq(2);
                        var startObj = timeObj.find(".title-time-selector").eq(0);
                        var endObj = timeObj.find(".title-time-selector").eq(1);
                        var des = fellowObj.find(".aut-list-item").eq(3);
                        if (v.fellowshipType.length > 0) {
                            countyrObj.find(".icon-aut-selector").trigger("click");
                        }
                        if ((v.fellowshipInstitutionsId.length > 0)) {
                            partment.attr({"data-fellowshipinstitutionsid": v.fellowshipInstitutionsId});
                        }
                        if ((v.fellowshipInstitutions.length > 0) && (v.fellowshipInstitutions != "请选择学术机构")) {
                            partment.html(v.fellowshipInstitutions).addClass("selected");
                        }
                        if ((v.fellowshipDesc.length > 0) && (v.fellowshipDesc != "请输入进修描述")) {
                            des.find(".aut-list-input-text").val(v.fellowshipDesc).trigger("blur");
                        }
                        if ((v.startTime.length > 0) && (v.startTime != "开始时间")) {
                            startObj.html(duringTime(v.startTime)).addClass("selected");
                        }
                        if ((v.endTime.length > 0) && (v.endTime != "结束时间")) {
                            endObj.html(duringTime(v.endTime)).addClass("selected");
                        }
                    });
                    $.each(data.responseObject.responseData.dataList[0].continuingEducationMapList,function(i,v){
                        v.timeId = Date.parse(new Date())+11+i;
                        $(".has-selector-continue").eq(0).trigger("click");
                        if(i>0){
                            element.addEduContinue.trigger("click");
                        }
                        var num = i+1;
                        var continueEduObj = $("[data-add-continue='"+num+"']");
                        var oganization = continueEduObj.find(".aut-list-continue").eq(0).attr({"data-timeId":v.timeId}).find(".aut-list-input-text");
                        var oganizationTime = continueEduObj.find(".aut-list-continue").eq(1);
                        var startTime = oganizationTime.find(".title-time-selector").eq(0);
                        var endTime = oganizationTime.find(".title-time-selector").eq(1);
                        var oganizationCer = continueEduObj.find(".aut-list-continue").eq(2).find(".aut-list-input-text");
                        var oganizationDes = continueEduObj.find(".aut-list-continue").eq(3).find(".aut-list-input-text");
                        if((v.organization.length>0)&&(v.organization!="请输入学术机构")){
                            oganization.val(v.organization).trigger("blur");
                        }
                        if((v.certificate.length>0)&&(v.certificate!="请输入获得证书或荣誉")){
                            oganizationCer.val(v.certificate).trigger("blur");
                        }
                        if((v.cmeDesc.length>0)&&(v.cmeDesc!="请输入培训内容")){
                            oganizationDes.val(v.cmeDesc).trigger("blur");
                        }
                        if((v.startTime.length>0)&&(v.startTime!="开始时间")){
                            startTime.html(duringTime(v.startTime)).addClass("selected");
                        }
                        if((v.endTime.length>0)&&(v.startTime!="结束时间")){
                            endTime.html(duringTime(v.endTime)).addClass("selected");
                        }
                    });
                    $.each(data.responseObject.responseData.dataList[0].educationMapList,function(i,v){
                        v.timeId = Date.parse(new Date())+41+i;
                        if(i>0){
                            element.addEdu.trigger("click");
                        }
                        var num = i+1;
                        var educationObj = $("[data-edu-count='"+num+"']").eq(0).attr({"data-timeId":v.timeId}).find(".modal-inner");//
                        var universityObj = $("[data-edu-count='"+num+"']").eq(1).find(".modal-inner");
                        var timeObj = $("[data-edu-count='"+num+"']").eq(3);
                        var startObj =timeObj.find(".title-time-selector").eq(0);
                        var endObj = timeObj.find(".title-time-selector").eq(1);
                        var majorObj = $("[data-edu-count='"+num+"']").eq(2).find(".modal-inner")
                        if(v.educationId.length>0){
                            educationObj.attr({"data-educationid":v.educationId});
                        }
                        if((v.education.length>0)&&(v.education!="请选择学历")){
                            educationObj.html(v.education).addClass("selected");
                        }
                        if((v.endTime.length>0)&&(v.endTime!="结束时间")){

                            endObj.html(duringTime(v.endTime)).addClass("selected");
                        }
                        if((v.startTime.length>0)&&(v.startTime!="开始时间")){
                            startObj.html(duringTime(v.startTime)).addClass("selected");
                        }
                        if((v.university.length>0)&&(v.university!="请选择学校或机构")){
                            universityObj.html(v.university).addClass("selected");
                        }
                        if(v.universityId.length>0){
                            universityObj.attr({"data-universityId":v.universityId});
                        }
                        if((v.major.length>0)&&(v.major!="请选择专业")){
                            majorObj.html(v.major).addClass("selected");
                        }
                        if((v.majorId.length>0)){
                            majorObj.attr({"data-majorid":v.majorId});
                        }
                    });
                }
                return t;
            },
            dealFirst:function(data){
                var t = this;
                var userInfo = data.responseObject.responseData.dataList[0].authMap;
                var illNess = [];
                var illnessIdList = "";
                var illnessNameList = "";
                var areasExpertise="";
                $.each(data.responseObject.responseData.dataList[0].illnessMapList, function (i, v) {
                    $(".main-inner").eq(0).attr({"data-userInfo":"true"});
                    var jsonItem = {
                        illId: v.illnessId,
                        illName: v.illnessName
                    };
                    illnessIdList+=v.illnessId+",";
                    illnessNameList+=v.illnessName+",";
                    illNess.push(jsonItem);
                });
                var surgery = [];
                var operationIdList = "";
                var operationNameList = "";
                parameter.postSurgery = data.responseObject.responseData.dataList[0].authMajorMapList;
                $.each(data.responseObject.responseData.dataList[0].operationMapList, function (i, v) {
                    $(".main-inner").eq(0).attr({"data-userInfo":"true"});
                    var jsonItem = {
                        operationId: v.operationId,
                        operationName: v.operationName,
                        majorId:v.majorId,
                        majorName:v.majorName
                    };
                    operationIdList+=v.operationId+",";
                    operationNameList+=v.operationName+",";
                    surgery.push(jsonItem);
                });
                var majorIdList = "";
                var majorData = [];
                var authAttList = data.responseObject.responseData.dataList[0].attMapList;
                $.each(data.responseObject.responseData.dataList[0].majorMapList, function (i, v) {
                    $(".main-inner").eq(0).attr({"data-userInfo":"true"});
                    var jsonItem = {
                        majorId: v.majorId,
                        name: v.majorName
                    };
                    areasExpertise+=v.majorId+"_"+v.majorName+","
                    majorIdList+=v.majorId+",";
                    majorData.push(jsonItem);
                });
                var medicalTitle = [];
                $.each(data.responseObject.responseData.dataList[0].medicalTitleMapList,function(i,v){
                    v.medicalTitle = v.medicalTitle.replace(/(^\s*)|(\s*$)/g, "");
                    medicalTitle.push(v);
                });
                parameter.localFirstData = {
                    visitSiteId:parameter.visitSiteId,
                    customerId: parameter.customerId,//存在
                    fullName: userInfo.fullName,//存在
                    sexId: userInfo.sexId,//存在
                    sex: $("[data-sexId='" + userInfo.sexId + "']").text(),//存在
                    birthday: userInfo.birthday,//存在
                    companyId: userInfo.companyId,//可获取
                    company: userInfo.company,//可获取
                    isMalpractice: userInfo.isMalpractice,//存在
                    yesteryearOperationNum: userInfo.yesteryearOperationNum,//存在
                    precedingYearOperationNum: userInfo.precedingYearOperationNum,//存在
                    areasExpertise: areasExpertise.substring(0,areasExpertise.lastIndexOf(",")),
                    medicalTitle: $("[data-jobType='"+userInfo.medicalTitle+"']").parent().attr("data-refid") + "_" + userInfo.medicalTitle,//存在
                    medicalTitleId: $("[data-jobType='"+userInfo.medicalTitle+"']").parent().attr("data-refid"),//存在
                    illnessIdList: auth.lastNoNeed(illnessIdList,","),
                    illnessNameList: auth.lastNoNeed(illnessNameList,","),
                    operationIdList: auth.lastNoNeed(operationIdList,","),
                    operationNameList: auth.lastNoNeed(operationNameList,","),
                    majorIdList: auth.lastNoNeed(majorIdList,","),//存在
                    majorList: data.responseObject.responseData.dataList[0].authMajorMapList,//存在
                    //updateMajorList: JSON.stringify(updateMajorList),//不存在
                    medicalTitleList: medicalTitle,//存在
                    //delMajorIdList: JSON.stringify(delMajorIdList),//不存在
                    authAttList: authAttList,//图片接口有问题
                    //delAttIdList: JSON.stringify(delAttIdList)//无删除操作
                };
                var duringTime = function (str) {
                    if ((str.length > 0) && (str != "至今")) {
                        var res = str.split("-");
                        if (Number(res[1]) < 10) {
                            return res[0] + "年0" + Number(res[1]) + "月";
                        } else {
                            return res[0] + "年" + res[1] + "月";
                        }

                    } else {
                        return str;
                    }
                };
                if (majorData.length > 0) {
                    $("#ev-professional-select").html(template.produce(["majorList"], majorData)).addClass("selected");
                    element.major.parent().attr({"data-firstOnOff":"true"});
                    t.collectFirstData();
                }else{
                    element.major.parent().attr({"data-firstOnOff":"false"});
                    t.collectFirstData();
                }
                if (illNess.length > 0) {
                    $(".disease-inner").html(template.produce(["illnessShow"], illNess)).addClass("selected");
                    t.addDot($(".illNessShow"));
                    $(".aut-list-second-surgery-ill").show();
                    $(".aut-list-good").attr({"data-firstOnOff":"true"});
                    t.collectFirstData();
                }else{
                    $(".aut-list-good").attr({"data-firstOnOff":"false"});
                    t.hideIllNess();
                    t.collectFirstData();
                }
                if (surgery.length > 0) {
                    $(".illness-inner").html(template.surgeryShow(surgery)).addClass("selected");
                    t.addDot($(".surgeryShow"));
                    $(".aut-list-surgery").attr({"data-firstOnOff":"true"});
                    $(".aut-list-second-surgery-ill").show();
                    t.collectFirstData();
                }else{
                    $(".aut-list-surgery").attr({"data-firstOnOff":"false"});
                    t.hideIllNess();
                    t.collectFirstData();
                }
                var illNessNum = $(".illness-number");
                //if(parseInt(userInfo.yesteryearOperationNum))
                illNessNum.eq(0).val(userInfo.yesteryearOperationNum).trigger("blur");
                illNessNum.eq(1).val(userInfo.precedingYearOperationNum).trigger("blur");
                element.name.val(userInfo.fullName);
                if(userInfo.fullName.length>0){
                    $(".aut-list-name").attr({"data-firstonoff":"true"});
                    t.collectFirstData();
                }else{
                    $(".aut-list-name").attr({"data-firstonoff":"false"});
                    t.collectFirstData();
                }
                $("[data-judge='"+userInfo.isMalpractice+"']").trigger("click");
                $("[data-sexId='" + userInfo.sexId + "']").trigger("click");
                if(userInfo.birthday.length>0){
                    parameter.ageStr = userInfo.birthday;
                    userInfo.birthday = new Date().getFullYear()-parseInt(userInfo.birthday.split('-')[0]);
                    $("#ev-ageSelector").html(userInfo.birthday).addClass("selected");
                    element.age.parent().attr({"data-firstonoff":"true"});
                    t.collectFirstData();
                }else{
                    element.age.parent().attr({"data-firstonoff":"false"});
                    t.collectFirstData();
                }
                if(userInfo.companyId.length>0){
                    $("#ev-selectHospitalInner").addClass("selected").html(userInfo.company).attr({"data-id": userInfo.companyId});
                    $(".aut-list-hospital").attr({"data-firstOnOff":"true"});
                    t.collectFirstData();
                }else{
                    $(".aut-list-hospital").attr({"data-firstOnOff":"false"});
                    t.collectFirstData();
                }
                if(userInfo.medicalTitle.length>0){
                    $("#ev-medicalTitleSelector").attr({"data-firstonoff":"true"}).find("span").addClass("selected").html(userInfo.medicalTitle);
                    t.collectFirstData();
                }else{
                    $("#ev-medicalTitleSelector").attr({"data-firstonoff":"false"});
                    t.collectFirstData();
                }
                if (data.responseObject.responseData.dataList[0].medicalTitleMapList.length > 0) {
                    var maxTitle = 0;
                    var maxTitleStr = "";
                    var titleIdCtn={};
                    $.each(parameter.jobData,function(ji,jv){
                        switch (jv.refValue){
                            case "住院医师":
                                titleIdCtn[jv.refId]=0;
                                break;
                            case "主治医师":
                                titleIdCtn[jv.refId]=1;
                                break;
                            case "副主任医师":
                                titleIdCtn[jv.refId]=2;
                                break;
                            case "主任医师":
                                titleIdCtn[jv.refId]=3;
                                break;
                            default:
                                break;

                        }
                    });
                    var titleCtn = {"住院医师":0,"主治医师":1,"副主任医师":2,"主任医师":3};
                    var titleNum = ["住院医师","主治医师","副主任医师","主任医师"];
                    $.each(data.responseObject.responseData.dataList[0].medicalTitleMapList, function (i, v) {/*.aut-list-job-edg*/
                        $("[data-jobType='主任医师']").parent().hide();
                        var title = v.medicalTitle.replace(/(^\s*)|(\s*$)/g, "");
                        if(title.indexOf("_")>-1){
                            title=title.split("_")[1];
                        }
                        if(title.indexOf("医生")>-1){
                            title = title.replace("医生","医师");
                        }
                        if(titleCtn[title]==undefined){
                            title = titleIdCtn[v.medicalTitleId];
                        }
                        if(titleCtn[title]>maxTitle){
                            maxTitle = titleCtn[title];
                            maxTitleStr = title;
                        }else{
                            maxTitleStr=titleNum[maxTitle];
                        }
                        var jobObj = $("[data-refid='" + v.medicalTitleId + "']");
                        jobObj.find(".aut-list-start-time span").html(((v.startTime.length > 0) ? duringTime(v.startTime) : "开始时间")).addClass(((v.startTime.length > 0) ? "selected" : ""));
                        jobObj.find(".aut-list-end-time span").html(((v.endTime.length > 0) ? duringTime(v.endTime) : "结束时间")).addClass(((v.endTime.length > 0) ? "selected" : ""));

                    });
                    $(".aut-list-job").each(function(){
                        if($(this).find(".aut-list-item-title").attr("data-jobtype")==maxTitleStr){
                            if($(this).find(".aut-list-start-time span").hasClass("selected")){
                                $(this).find(".aut-list-end-time span").html("至今").addClass("selected");
                            }
                            $(this).show().nextAll().show();
                        }
                        if($(this).css("display")=="block"){
                            var titleObj = $(this).find(".aut-list-item-title");
                            var titleStr = titleObj.attr("data-jobtype");
                            titleObj.find("span").html(titleStr);
                            if($(this).find(".selected").length==2){
                                $(this).attr({"data-firstonoff":"true"});
                            }else{
                                $(this).attr({"data-firstonoff":"false"});
                            }

                        }else{
                            $(this).removeAttr("data-firstonoff");
                        }
                        t.collectFirstData();
                    });
                }
                var jsonItem = {};
                var jsonItemLen = 0;
                $.each(data.responseObject.responseData.dataList[0].attMapList, function (i, v) {
                    /*$("[data-typeid='"+v.attType+"']").find("img").attr({"src":v.attPath})*/
                    if (jsonItem[v.attType] == undefined) {
                        jsonItem[v.attType] = "";
                    }
                    jsonItem[v.attType] += v.attPath + "|";
                    jsonItemLen++;
                });
                for (var jsonKey in jsonItem) {
                    var imgListObj = $("[data-typeid='" + jsonKey + "']");
                    if (imgListObj.length > 0) {
                        var imgUp = jsonItem[jsonKey].split("|")[0];
                        var imgDown = jsonItem[jsonKey].split("|")[1];
                        if (imgUp.length > 0) {
                            var imgObjUp = imgListObj.eq(0);
                            imgObjUp.parent().find(".aut-img-post-container").remove();
                            imgObjUp.parent().append("<section class=\"aut-img-post-container\">" +
                                "<i class=\"au-list-img-close\"  >X</i>" +
                                "<img src=\"" + jsonItem[jsonKey].split("|")[0] + "\" alt=\"\" >" +
                                "</section>");
                            imgListObj.parent().parent().attr({"data-firstonoff":"true"});
                        }
                        if (imgDown.length > 0) {
                            var imgObjDown = imgListObj.eq(1);
                            imgObjDown.parent().find(".aut-img-post-container").remove();
                            imgObjDown.parent().append("<section class=\"aut-img-post-container\">" +
                                "<i class=\"au-list-img-close\"  >X</i>" +
                                "<img src=\"" + jsonItem[jsonKey].split("|")[1] + "\" alt=\"\"  >" +
                                "</section>");
                            imgListObj.parent().parent().attr({"data-firstonoff":"true"});
                        }
                        t.collectFirstData();
                    } else {
                        var InfoJson = {};
                        $.each(parameter.moreMaterial, function (i, v) {
                            if (Number(jsonKey) == v.refId) {
                                InfoJson.title = v.refValue;
                                InfoJson.id = v.refId;
                                InfoJson.selectedIndex = i;
                            }
                        });
                        var credentialBox = $(".au-doctor-cer-list");
                        var uploadid = "12" + InfoJson.selectedIndex;
                        var titleImg = InfoJson.title;
                        var idImg = InfoJson.id;
                        credentialBox.append(template.moreMedical(titleImg, uploadid, jsonItem[jsonKey].split("|")[0],idImg));//添加更多证书上传dom
                        t.postImg();
                        var moreList = $("input[data-uploadid]");
                        if (moreList.length == 8) {
                            $(".aut-list-more").hide();
                        }
                    }
                }
                t.magnifyImg();
                t.closeImg();
                return t;
            },
            closeImg:function(){
                var t = this;
                $(".au-list-img-close").off("click").on("click",function(){
                    if($(this).parents(".aut-list-post-image").attr("data-firstonoff")){
                        $(this).parents(".aut-list-post-image").attr({"data-firstonoff":"false"});
                        t.collectFirstData();
                    }
                    $(this).parent().remove();
                });
                return t;
            },
            addFellowEdu:function(){
                var t = this;
                var selectFellow = function(){
                    $(".icon-aut-selector[data-type]").off("click").on("click",function(){
                        $(this).addClass("on").siblings().removeClass("on");
                        $(".main-inner").eq(1).attr({"data-changeindex":"true"});//启动第二步操作标志
                        element.next.addClass("on");
                        $(this).parent().addClass("selected");
                    });
                    $(".aut-list-academic-input").off("click").on("click",function(){
                        $(this).find("span").attr({"data-academic":"true"});
                        t.showDialog("academic",{
                            isValid: "1",//	string	是		1
                            firstResult: "0",//	string	是	分页参数
                            maxResult: "40",//	string	是	分页参数
                            fellowshipInstitutions: ""//	string	否	进修机构名称（搜索用）
                        },function(data){
                            var listdata = data.responseObject.responseData.dataList;
                            element.dialog.academic.find(".selector-dialog-content").html(template.produce(["academicList"], listdata));
                        },function(){

                            $(".academic-list-item").off("click").on("click", function () {
                                element.dialog.academic.find(".back").trigger("click");
                                $("[data-academic]").html($(this).text()).addClass("selected").attr({"data-fellowshipInstitutionsId": $(this).attr("data-academicId")});
                                $(".main-inner").eq(1).attr({"data-changeindex":"true"});//启动第二步操作标志
                                element.next.addClass("on");

                            });
                            element.dialog.academic.find(".back").off("click").on("click",function(){
                                t.hideDialog(element.dialog.academic) ;
                            });
                        });
                    });

                };
                selectFellow();
                element.addFellowEdu.off("click").on("click",function(){
                    var count = parseInt($(this).attr("data-fellow-count"));
                    if (count > 9) {
                        common.popup({"text": "最多添加十组进修经历"});
                        return false;
                    } else {
                        count++;
                        $(this).before(template.fellowEdu(count)).attr({"data-fellow-count": count});//添加继续教育经历
                        t.selectTime();
                        t.explain();
                        selectFellow();
                    }
                });
                return t;
            },
            addContinueEdu:function () {
                var t = this;
                element.addEduContinue.off("click").on("click",function(){
                    var count = parseInt($(this).attr("data-continue-count"));
                    if (count > 9) {
                        common.popup({"text": "最多添加十组继续教育经历"});
                        return false;
                    } else {
                        count++;
                        $(this).before(template.continueEdu(count)).attr({"data-continue-count": count});//添加继续教育经历
                        var selectObj = $(this).parent().find(".btn-select");
                        t.selectTime();
                        t.explain();
                    }
                });
                return t;
            },
            addEdu:function(){
                var t = this;
                var eduPicker = null;
                var eduData = [];
                manageData.applyData({
                    port: ajaxPort.eduLevel,
                    get: true,
                    postData: {
                        visitSiteId:parameter.visitSiteId,
                        isValid: "1",//	string	是		1
                        firstResult: "0",//	string	是	分页参数
                        maxResult: "300",//	string	是	分页参数
                        majorTitle: ""//	string	否	学科专业名称
                    },
                    success: function (data) {
                        var listdata = data.responseObject.responseData.dataList;
                        $.each(listdata, function (i, v) {
                            var json = {
                                text: v.educationName,
                                value: v.educationName + "-" + v.id
                            };
                            eduData.push(json);
                        });
                        eduPicker = new Picker({
                            data: [eduData]
                        });
                        eduPicker.on('picker.select', function (selectedVal, selectedIndex) {
                            var contentStr = selectedVal[0];
                            var name = contentStr.split("-")[0];
                            var id = contentStr.split("-")[1];
                            var levelObj = $('[data-educationBg]');
                            levelObj.find("span").html(name).addClass("selected").attr({"data-educationId": id});
                            levelObj.removeAttr("data-educationBg");
                            $(".main-inner").eq(1).attr({"data-changeindex":"true"});//启动第二步操作标志
                            element.next.addClass("on");

                        });
                        selectEduLevel();
                    },
                    failed: function () {
                    }
                });
                var selectEduLevel = function () {
                    $(".aut-list-select-edu").off("click").on("click touchend",function () {
                        //alert("点击结束");
                        var isThis = $(this).attr({"data-educationBg":"1"});//教育背景，学历选择
                        eduPicker.show();
                    });
                };
                var selectEduMajor = function () {//教育里选择专业
                    $(".aut-list-select-major").off("click").on("click", function () {
                        var isThis = $(this);
                        isThis.attr({"data-subject":'true'});//20170602
                        t.showDialog("subject",{
                            isValid: "1",//	string	是		1
                            firstResult: "0",//	string	是	分页参数
                            maxResult: "100",//	string	是	分页参数
                            majorTitle: ""//	string	否	学科专业名称
                        },function(data){
                            var listdata = data.responseObject.responseData.dataList;
                            element.dialog.subject.find(".selector-dialog-content").html(template.produce(["subject"], listdata));
                        },function(){
                            $(".subject-list-item").off("click").on("click",function(){
                                $("[data-subject]").html($(this).text()).addClass("selected").attr({"data-majorId": $(this).attr("data-subjectid")});
                                $(".main-inner").eq(1).attr({"data-changeindex":"true"});//启动第二步操作标志
                                element.next.addClass("on");
                                $("[data-subject]").removeAttr("data-subject");
                                t.hideDialog(element.dialog.subject);
                            });
                            element.dialog.subject.find(".back").off("click").on("click",function(){
                                t.hideDialog(element.dialog.subject);
                            })
                        });
                    });
                };
                element.addEdu.off("click").on("click",function(){
                    var count = parseInt($(this).attr("data-edu-add"));
                    if (count > 9) {
                        common.popup({"text": "最多添加十组教育经历"});
                        return false;
                    } else {
                        count++;
                        $(this).attr({"data-edu-add": count});
                        $(this).before(template.edu(count));//添加教育背景
                        selectEduMajor();
                        selectEduLevel();
                        t.selectSchool();
                        t.selectTime();
                    }
                });
                selectEduMajor();
                selectEduLevel();
                return t;
            },
            updateList:function(data,name){
                var t = this;
                var duringTime = function(str){
                    if(str.length>0){
                        var res = str.split("-");
                        return res[0]+"年"+res[1]+"月";
                    }else{
                        return str;
                    }

                };
                if(parameter.localSecondtData.length>0){
                    var compareData = parameter.localSecondtData[0][name];
                    var upDatereturnData = [];
                    var bridgeData = [];
                    var createData = [];
                    if(data.length==0){
                        return {update:[],create:[]};
                    }else{
                        if(compareData.length>0){
                            var dataCompare = [];
                            $.each(data,function(i,v){
                                var imCreate = true;
                                $.each(compareData,function(si,sv){
                                    if(sv.timeId==v.timeId){
                                        var dataJson = {
                                            "newData":v,
                                            "oldData":sv
                                        };
                                        imCreate = false;
                                        dataCompare.push(dataJson);
                                    }
                                });
                                if(imCreate){
                                    createData.push(v);
                                }
                            });
                            $.each(dataCompare,function(i,v){
                                for(var key in v.newData){
                                    var isSame = false;
                                    var oldVal = "";
                                    var newVal = "";
                                    if((key=="endTime")||(key=="startTime")){
                                        oldVal = duringTime(v.oldData[key]+"");
                                        newVal = duringTime(v.newData[key]+"");
                                    }else{
                                        oldVal = v.oldData[key];
                                        newVal = v.newData[key];
                                    }
                                    if(oldVal!=newVal){
                                        isSame = true;
                                    }
                                    if(isSame){
                                        upDatereturnData.push(v.newData);
                                        break;
                                    }
                                }
                            });
                        }else{
                            createData = data;
                        }
                        return {update:upDatereturnData,create:createData};
                    }
                }else{
                    return {update:[],create:data};
                }

            },
            collectSecondData:function(save){
                var t = auth;
                var educationList = [];
                var continuingList = [];
                var fellowshipList = [];
                var jsonString = function(arr){
                    if(arr.length>0){
                        return JSON.stringify(arr);
                    }else{
                        return "";
                    }
                };
                for(var i = 0;i<Number($("[data-edu-add]").attr("data-edu-add"));i++){
                    var num = i+1;
                    var eduObj = $("[data-edu-count='"+num+"']");
                    var educationObj = eduObj.find(".selected");
                    var selectNone = false;
                    eduObj.each(function(){
                        if($(this).find(".selected").length>0){
                            selectNone = true;
                        }
                    });
                    if(selectNone){
                        var dataJson = {};
                        var education = eduObj.eq(0).find(".modal-inner");
                        var university = eduObj.eq(1).find(".modal-inner");
                        var major = eduObj.eq(2).find(".modal-inner");
                        var timeObj = eduObj.eq(3).find(".title-time-selector");
                        var startObj =timeObj.eq(0);
                        var endObj = timeObj.eq(1);
                        if(education.attr("data-educationid")&&(education.attr("data-educationid").length>0)){
                            dataJson.educationId = education.attr("data-educationid");
                        }
                        if((education.text()!="请选择学历")&&(education.text().length>0)){
                            dataJson.education = education.text();
                        }
                        if(university.attr("data-universityid")&&(university.attr("data-universityid").length>0)){
                            dataJson.universityId = university.attr("data-universityid");
                        }
                        if((university.text()!="请选择学校或机构")&&(university.text().length>0)){
                            dataJson.university = university.text();
                        }
                        if(major.attr("data-majorid")&&(major.attr("data-majorid").length>0)){
                            dataJson.majorId = major.attr("data-majorid");
                        }
                        if((major.text()!="请选择专业")&&(major.text().length>0)){
                            dataJson.major = major.text();
                        }
                        if((startObj.text()!="开始时间")){
                            dataJson.startTime =t.changeDateStyle(startObj.text());
                        }
                        if((endObj.text()!="结束时间")){
                            dataJson.endTime = t.changeDateStyle(endObj.text());
                        }
                        if((dataJson.startTime)&&(dataJson.endTime)){
                            if(save){
                                var duringOnOff = t.duringTime({beginStr: startObj.text(), endStr:endObj.text()});
                                if (!duringOnOff) {
                                    common.popup({"text": "请选择正确的履历时间"});
                                }
                            }
                        }

                        dataJson.timeId = eduObj.eq(0).attr("data-timeId");
                        educationList.push(dataJson);
                    }
                }
                $("[data-add-continue]").each(function(){
                    if($(this).find(".selected").length>0){
                        var dataJosn = {};
                        var organizationObj = $(this).find(".aut-list-continue").eq(0).find(".aut-list-input-explain");
                        var timeObj = $(this).find(".aut-list-continue").eq(1);
                        var startObj = timeObj.find(".title-time-selector").eq(0);
                        var endObj = timeObj.find(".title-time-selector").eq(1);
                        var certificate = $(this).find(".aut-list-continue").eq(2).find(".aut-list-input-explain");
                        var cmeDesc = $(this).find(".aut-list-continue").eq(2).find(".aut-list-input-explain");
                        if((organizationObj.text().length>0)&&(organizationObj.text()!="请输入学术机构")){
                            dataJosn.organization = organizationObj.text();
                        }
                        if((certificate.text().length>0)&&(certificate.text()!="请输入获得证书或荣誉")){
                            dataJosn.certificate = certificate.text();
                        }
                        if((cmeDesc.text().length>0)&&(cmeDesc.text()!="请输入培训内容")){
                            dataJosn.cmeDesc = cmeDesc.text()
                        }
                        if((startObj.text().length>0)&&(startObj.text()!="开始时间")){
                            dataJosn.startTime = t.changeDateStyle(startObj.text());
                        }
                        if((endObj.text().length>0)&&(endObj.text()!="结束时间")){
                            dataJosn.endTime = t.changeDateStyle(endObj.text());
                        }
                        if((dataJson.startTime)&&(dataJson.endTime)){
                            if(save){
                                var duringOnOff = t.duringTime({beginStr: startObj.text(), endStr:endObj.text()});
                                if (!duringOnOff) {
                                    common.popup({"text": "请选择正确的履历时间"});
                                }
                            }
                        }
                        dataJosn.timeId = $(this).find(".aut-list-continue").eq(0).attr("data-timeId");
                        continuingList.push(dataJosn);
                    }
                });
                $("[data-add-fellow]").each(function(){
                    if($(this).find(".selected").length>0) {
                        var dataJson = {};
                        var fellowshipType = $(this).find(".aut-list-item").eq(0);
                        var fellowshipInstitutions = $(this).find(".aut-list-item").eq(1).find(".modal-inner");
                        var timeObj = $(this).find(".aut-list-item").eq(2).find(".title-time-selector");
                        var startObj = timeObj.eq(0);
                        var endObj = timeObj.eq(1);
                        var fellowshipDesc = $(this).find(".aut-list-item").eq(3).find(".aut-list-input-explain");
                        if (fellowshipType.find(".on").length > 0) {
                            dataJson.fellowshipType = fellowshipType.find(".on").attr("data-type");
                        }
                        if ((fellowshipInstitutions.text().length > 0) && (fellowshipInstitutions.text() != "请选择学术机构")) {
                            dataJson.fellowshipInstitutions = fellowshipInstitutions.text();
                        }
                        if ((fellowshipInstitutions.attr("data-fellowshipinstitutionsid")) && (fellowshipInstitutions.attr("data-fellowshipinstitutionsid").length > 0)) {
                            dataJson.fellowshipInstitutionsId = fellowshipInstitutions.attr("data-fellowshipinstitutionsid");
                        }
                        if((startObj.text()!="开始时间")&&(startObj.text().length>0)){
                            dataJson.startTime = t.changeDateStyle(startObj.text());
                        }
                        if((endObj.text()!="结束时间")&&(endObj.text().length>0)){
                            dataJson.endTime = t.changeDateStyle(endObj.text());
                        }
                        if(fellowshipDesc.text().length>0){
                            dataJson.fellowshipDesc = fellowshipDesc.text();
                        }
                        dataJson.timeId = fellowshipType.eq(0).attr("data-timeId");
                        fellowshipList.push(dataJson);
                        if((dataJson.startTime)&&(dataJson.endTime)){
                            if(save){
                                var duringOnOff = t.duringTime({beginStr: startObj.text(), endStr:endObj.text()});
                                if (!duringOnOff) {
                                    common.popup({"text": "请选择正确的履历时间"});
                                }
                            }
                        }
                    }
                });
                var postDataJson = {};/*update:upDatereturnData,create:createData*/
                if($(".main-inner").eq(1).attr("data-geteducation")){
                    var sFellowshipList = t.updateList(fellowshipList,"fellowshipMapList");
                    var sEducationList = t.updateList(educationList,"educationMapList");
                    var sContinuingList = t.updateList(continuingList,"continuingEducationMapList");
                    if(sFellowshipList.update.length>0){
                        postDataJson.updateFellowshipList = jsonString(sFellowshipList.update);
                    }
                    if(sEducationList.update.length>0){
                        postDataJson.updateEducationList = jsonString(sEducationList.update);
                    }
                    if(sContinuingList.update.length>0){
                        postDataJson.updateContinuingList = jsonString(sContinuingList.update);
                    }
                    if(sFellowshipList.create.length>0){
                        postDataJson.fellowshipList =jsonString(sFellowshipList.create);
                    }
                    if(sEducationList.create.length>0){
                        postDataJson.educationList =jsonString(sEducationList.create);
                    }
                    if(sContinuingList.create.length>0){
                        postDataJson.continuingList = jsonString(sContinuingList.create);
                    }

                }else{
                    postDataJson = {
                        customerId:parameter.customerId,
                        fellowshipList: jsonString(fellowshipList),
                        educationList: jsonString(educationList),
                        continuingList: jsonString(continuingList)
                    }
                }
                postDataJson.customerId = parameter.customerId;
                postDataJson.visitSiteId = parameter.visitSiteId;
                return postDataJson;

            },
            collectFirstData:function(save){
                var t = auth;
                var fullName = element.name.val();
                var sexObj = $(".on[data-sexId]");
                var sexId = sexObj .attr("data-sexId");
                var sex = sexObj.text();
                var birthday = (element.age.find("#ev-ageSelector").text()=="请选择年龄")?"":element.age.find("#ev-ageSelector").text();
                var  yesteryearOperationNum= $(".illness-number").eq(0).next().attr("data-illNum");
                var precedingYearOperationNum = $(".illness-number").eq(1).next().attr("data-illNum");
                var hospital = element.hospital.find(".modal-inner");
                var company = (hospital.text()=="请选择医院")?"":hospital.text();
                var companyId = hospital.attr("data-id");
                var isMalpractice = $(".icon-aut-selector.on[data-judge]").attr("data-judge");
                var illnessId = "";
                var illnessIdList = "";
                var illnessNameList = "";
                var illnessName = "";
                var areasExpertise = "";
                var jsonString = function(arr){
                    if(arr.length>0){
                        return JSON.stringify(arr);
                    }else{
                        return "";
                    }
                };
                $(".illNessShow").each(function () {
                    illnessId += $(this).attr("data-illid") + ",";
                    illnessName += $(this).text() + ",";
                });
                illnessIdList = illnessId.substring(0, illnessId.lastIndexOf(","));
                illnessNameList = illnessName.substring(0, illnessName.lastIndexOf(","));
                var operationId = "";
                var operationName = "";
                var operationIdList = "";
                var operationNameList = "";
                $(".surgeryShow").each(function () {
                    operationId += $(this).attr("data-operationid") + ",";
                    operationName += $(this).text() + ',';
                });
                operationIdList = operationId.substring(0, operationId.lastIndexOf(","));
                operationNameList = operationName.substring(0, operationName.lastIndexOf(","));
                var majorList = "";
                $(".majorListShow").each(function () {
                    majorList += $(this).attr("data-majorid") + ",";
                    areasExpertise+=$(this).attr("data-majorid")+"_"+$(this).text()+","
                });
                areasExpertise = areasExpertise.substring(0, areasExpertise.lastIndexOf(","));
                majorList = majorList.substring(0, majorList.lastIndexOf(","));
                var medicalData = [];
                $('.aut-list-job').each(function(){
                    var endTime = ($(this).find(".aut-list-end-time .title-time-selector").text() == "至今") ? "" : ($(this).find(".aut-list-end-time .title-time-selector").text());
                    if($(this).attr("data-firstonoff")){
                        if(JSON.parse($(this).attr("data-firstOnOff"))){
                            var dataJson = {
                                medicalTitleId: $(this).attr("data-refid"),
                                medicalTitle: $(this).find(".aut-list-item-title").text().replace(/(^\s*)|(\s*$)/g, ""),
                                startTime: t.changeDateStyle($(this).find(".aut-list-start-time .title-time-selector").text()),
                                endTime: t.changeDateStyle(endTime)
                            };
                            medicalData.push(dataJson);
                        }else{
                            var startTimeL = "";
                            if($(this).find(".aut-list-start-time .title-time-selector").text()!="开始时间"){
                                startTimeL = $(this).find(".aut-list-start-time .title-time-selector").text();
                            }
                            var dataJsonL = {
                                medicalTitleId: $(this).attr("data-refid"),
                                medicalTitle: $(this).find(".aut-list-item-title").text().replace(/(^\s*)|(\s*$)/g, ""),
                                startTime: t.changeDateStyle(startTimeL),
                                endTime: t.changeDateStyle(endTime)
                            };
                            medicalData.push(dataJsonL);
                        }
                    }

                    if(endTime.length>0){
                        var startTime = "";
                        var endJobTime = "";
                        if ($(this).find(".aut-list-start-time .title-time-selector").hasClass("selected") && $(this).find(".aut-list-end-time .title-time-selector").hasClass("selected")) {
                            startTime = $(this).find(".aut-list-start-time .title-time-selector").text();
                            endJobTime = $(this).find(".aut-list-end-time .title-time-selector").text();
                            var duringOnOff = t.duringTime({beginStr: startTime, endStr: endJobTime});
                            if (!duringOnOff) {
                                if (save) {
                                    common.popup({"text": "请选择正确的履历时间"});
                                }
                            }
                        }
                    }
                });
                var authAttList = [];
                $(".aut-upload-tool").each(function () {
                    var jsonItem = {};
                    jsonItem.attType = $(this).attr("data-typeid");
                    jsonItem.attCode = "";
                    jsonItem.attPath = $(this).next().find("img").attr("src");
                    jsonItem.isValid = "1";
                    if(jsonItem.attPath&&jsonItem.attPath.length>0){
                        authAttList.push(jsonItem);
                    }
                });
                var delMajorIdList = majorList;
                var delAttIdList = authAttList;
                var medicalTitleType = $("#ev-medicalTitleSelector span").html();
                var medicalObj = $("[data-jobType='"+medicalTitleType+"']");
                var postJson = {};
                var medicalTitle = "";
                var medicalTitleId = "";
                if(medicalObj.length!=0){
                    medicalTitle = medicalObj.parent().attr("data-refid") + "_" + medicalTitleType;
                    medicalTitleId = medicalObj.parent().attr("data-refid");
                }
                var majorListData = manageData.postSurgery(parameter.postSurgery);
                $.each(majorListData,function(i,v){
                    for(var mkey in v){
                        if(v[mkey]=="undefined"){
                            majorListData = parameter.postSurgery;
                            return false;
                        }
                    }
                });
                // console.log(majorListData)
                if($(".main-inner").eq(0).attr("data-userInfo")){
                    postJson = {
                        visitSiteId:parameter.visitSiteId,
                        customerId: parameter.customerId,//存在
                        fullName: element.name.val(),//存在
                        sexId: sexId,//存在
                        sex: sex,//存在
                        birthday: parameter.ageStr,//存在
                        companyId: companyId,//可获取
                        company: company,//可获取
                        isMalpractice: isMalpractice,//存在
                        yesteryearOperationNum: yesteryearOperationNum,//存在
                        precedingYearOperationNum: precedingYearOperationNum,//存在
                        areasExpertise: areasExpertise,
                        medicalTitle: medicalTitle,//存在
                        medicalTitleId: medicalTitleId,//存在
                        illnessIdList: illnessIdList,
                        illnessNameList: illnessNameList,
                        majorIdList: majorList,//存在
                        majorList: majorListData,//存在
                        //updateMajorList: JSON.stringify(updateMajorList),//不存在
                        medicalTitleList: medicalData,
                        authAttList: authAttList//图片接口有问题
                    };
                    // console.log(manageData.postSurgery(parameter.postSurgery))
                    // console.log(parameter.postSurgery);
                    postJson = t.compareFirstData(postJson);
                    postJson.customerId = parameter.customerId;
                    postJson.isUpdate = parameter.isUpdate;
                }else{
                    postJson = {
                        visitSiteId:parameter.visitSiteId,
                        customerId: parameter.customerId,//存在
                        fullName: element.name.val(),//存在
                        sexId: sexId,//存在
                        sex: sex,//存在
                        birthday: parameter.ageStr,//存在
                        companyId: companyId,//可获取
                        company: company,//可获取
                        isMalpractice: isMalpractice,//存在
                        yesteryearOperationNum: yesteryearOperationNum,//存在
                        precedingYearOperationNum: precedingYearOperationNum,//存在
                        areasExpertise: areasExpertise,
                        medicalTitle: medicalTitle,//存在
                        medicalTitleId: medicalTitleId,//存在
                        illnessIdList: illnessIdList,
                        illnessNameList: illnessNameList,
                        majorIdList: majorList,//存在
                        majorList: jsonString(manageData.postSurgery(parameter.postSurgery)),//存在
                        //updateMajorList: JSON.stringify(updateMajorList),//不存在
                        medicalTitleList: jsonString(medicalData),
                        // delMajorIdList: delMajorIdList,//不存在
                        authAttList: jsonString(authAttList)//图片接口有问题
                        // delAttIdList: delAttIdList//无删除操作
                    };
                    postJson.isUpdate = parameter.isUpdate;
                }

                var rightOnnOff = true;
                if(save){
                    $("[data-firstOnOff]").each(function(){
                        if(!JSON.parse($(this).attr("data-firstOnOff"))){
                            common.popup({"text":"您还有信息未编辑"});
                            rightOnnOff = false;
                        }
                    });
                    if(rightOnnOff){
                        $(".next-path").addClass("on");
                        $(".img-upload-btn").addClass("on");
                        return postJson;
                    }else{
                        $(".next-path").removeClass("on");
                        $(".img-upload-btn").removeClass("on");
                        return postJson;
                    }
                }else{
                    $("[data-firstOnOff]").each(function(){
                        if(!JSON.parse($(this).attr("data-firstOnOff"))){
                            rightOnnOff = false;
                        }
                    });
                    if(rightOnnOff){
                        $(".next-path").addClass("on");
                        $(".img-upload-btn").addClass("on");
                        return postJson;
                    }else{
                        $(".img-upload-btn").removeClass("on");
                        $(".next-path").removeClass("on");
                        return postJson;
                    }
                }


            },
            upDateMedicalTitleList:function(newData,oldData){
                var t = this;
                var returnData = {};
                returnData.medicalTitleList = [];
                returnData.updateMedicalTitleList = [];
                if(oldData.length>0){
                    if(newData.length>0){
                        $.each(newData,function(i,v){
                            var same = true;
                            $.each(oldData,function(si,sv){
                                if(v.medicalTitle==sv.medicalTitle){
                                    same = false;
                                    for(var key in v){
                                        if(v[key]!=sv[key]){
                                            returnData.updateMedicalTitleList.push(v);
                                            break;
                                        }
                                    }
                                }
                            });
                            if(same){
                                returnData.medicalTitleList.push(v);
                            }
                        });
                        var deleteIdStr = "";
                        $.each(oldData,function(delI,delV){
                            var deleteHas = true;
                            $.each(newData,function(sdelI,sdelV){
                                if(delV.medicalTitle==sdelV.medicalTitle){
                                    deleteHas = false;
                                }
                            });
                            if(deleteHas){
                                deleteIdStr+=delV.medicalTitleId+",";
                            }
                        });
                        if(deleteIdStr.length>0){
                            returnData.delMedicalIdList = deleteIdStr.substring(0, deleteIdStr.lastIndexOf(","));
                        }
                        return returnData;
                    }else{
                        var deleteId = "";
                        $.each(oldData,function(delI,delV){
                            deleteId+=delV.medicalTitleId+",";
                        });
                        if(deleteId.length>0){
                            returnData.delMedicalIdList = deleteId.substring(0, deleteId.lastIndexOf(","));
                        }
                        return returnData;
                    }
                }else{
                    if(newData.length>0){
                        returnData.medicalTitleList =newData;
                    }
                    return returnData;
                }

            },
            compareFirstIdList:function(newStr,oldStr){
                var t = this;
                if(oldStr.length>0){
                    if(newStr.length>0){
                        var newData = newStr.split(",");
                        var oldData = oldStr.split(",");
                        var returnsStr = "";
                        if(newData.length==oldData.length){
                            var allOnOff = true;
                            $.each(newData,function(i,v){
                                $.each(oldData,function(si,sv){
                                    if(v!=sv){
                                        allOnOff = false;
                                    }
                                });
                            });
                            if(!allOnOff){
                                return newStr;
                            }else{
                                return "";
                            }
                        }else{
                            return newStr;
                        }
                    }else{
                        return newStr;
                    }
                }else{
                    return newStr;
                }
            },
            compareAuthAttList:function(newData,oldData){
                var t = this;
                var returnData = {};
                var deleteStr = "";
                returnData.authAttList = [];
                $.each(oldData,function(i,v){
                    var same = true;
                    $.each(newData,function(si,sv){
                        if(v.attPath==sv.attPath){
                            same = false;
                        }
                    });

                    if(same){
                        deleteStr+=v.id+",";
                    }
                });
                returnData.delAttIdList = deleteStr.substring(0, deleteStr.lastIndexOf(","));
                $.each(newData,function(i,v){
                    var same = true;
                    $.each(oldData,function(si,sv){
                        if(v.attPath==sv.attPath){
                            same = false;
                        }
                    });

                    if(same){
                        if(v.attPath){
                            if(v.attPath.length>0){
                                returnData.authAttList.push(v);
                            }
                        }

                    }
                });
                return returnData;

            },
            compareIdStr:function(newStr,oldStr){
                var t = this;
                if(newStr.length>0){
                    if(oldStr.length>0){
                        var newData = newStr.split(",");
                        var oldData = oldStr.split(",");
                        if(newData.length==oldData.length){
                            var same = [];
                            $.each(newData,function(i,v){
                                $.each(oldData,function(si,sv){
                                    if(v==sv){
                                        same.push(true);
                                    }
                                });
                            });
                            return !(same.length==newData.length);
                        }else{
                            return true;
                        }
                    }else{
                        return true;
                    }
                }else{
                    return false;
                }

            },
            compareMajorList:function(newData,oldData){
                var t = this;
                var returnData = {};
                returnData.majorList = [];
                var deleteStr = "";
                // console.log(newData,oldData)
                if(newData){
                    $.each(newData,function(i,v){
                        var same = true;
                        if(v.operationIdList){
                            if(v.operationIdList.length==0){
                                deleteStr+=v.id+",";
                            }
                        }else{
                            deleteStr+=v.id+",";
                        }
                        $.each(oldData,function(ii,iv){
                            if(v.majorId==iv.majorId){
                                same = false;
                                // console.log(v.operationIdList,iv.operationIdList)
                                if(t.compareIdStr(v.operationIdList,iv.operationIdList)){
                                    returnData.majorList.push(v);
                                }
                            }
                        });
                        if(same){
                            returnData.majorList.push(v);
                        }
                    });
                    $.each(oldData,function(i,v){
                        var same = true;
                        $.each(newData,function(si,sv){
                            if(v.majorId==sv.majorId){
                                same = false;
                            }
                        });
                        if(same){
                            deleteStr+=v.id+",";
                        }
                    });
                    returnData.delMajorIdList = deleteStr.substring(0, deleteStr.lastIndexOf(","));
                    // console.log(returnData)
                    return returnData;
                }else{
                    returnData.delMajorIdList = deleteStr;
                }
            },
            compareFirstData:function(data){
                var t = this;
                var postJson = {};
                for(var key in data){
                    switch (key){
                        case "illnessIdList":
                        case "illnessNameList":
                        case "majorIdList":
                        case "areasExpertise":
                            if(t.compareIdStr(data[key],parameter.localFirstData[key])){
                                postJson[key] = data[key];

                            }
                            break;
                        case "authAttList":
                            var returnAttData = t.compareAuthAttList(data[key],parameter.localFirstData[key]);
                            for(var postKey in returnAttData){
                                if(returnAttData[postKey].length>0){
                                    postJson[postKey] = $.isArray(returnAttData[postKey])?JSON.stringify(returnAttData[postKey]):returnAttData[postKey];
                                }else{
                                    postJson[postKey] = "";
                                }
                            }
                            break;
                        case "majorList":
                            var returnMajorListData = t.compareMajorList(data[key],parameter.localFirstData[key]);
                            for(var postKey in returnMajorListData){
                                if(returnMajorListData[postKey].length>0){
                                    postJson[postKey] = $.isArray(returnMajorListData[postKey])?JSON.stringify(returnMajorListData[postKey]):returnMajorListData[postKey];
                                }else{
                                    postJson[postKey] = "";
                                }
                            }
                            break;
                        case "medicalTitleList":
                            var returnData = t.upDateMedicalTitleList(data[key],parameter.localFirstData[key]);
                            for(var postKey in returnData){
                                if(returnData[postKey].length>0){
                                    postJson[postKey] = $.isArray(returnData[postKey])?JSON.stringify(returnData[postKey]):returnData[postKey];
                                }else{
                                    postJson[postKey] = "";
                                }
                            }
                            break;
                        default:
                            if(data[key]!=parameter.localFirstData[key]){
                                if(data[key]){
                                    if(data[key].length>0){
                                        postJson[key] = data[key];
                                    }
                                }
                            }
                            break;
                    }

                }
                return postJson;
            },
            changeIndex:function(){
                var t = auth;
                element.next.off("click").on("click", function () {
                    if(parameter.nowIndex == 0){
                        t.collectFirstData(true);
                    }else{
                        t.collectSecondData(true);
                    }
                    if ($(this).hasClass("on")){
                        if (parameter.nowIndex == 0) {
                            var secondCtn = $(".main-inner").eq(1);
                            if(secondCtn.attr("data-getEducation")){
                                if (parameter.nowIndex < 2) {
                                    parameter.nowIndex++;
                                }
                                element.contentBox.hide();
                                element.contentBox.eq(parameter.nowIndex).show();
                                if(parameter.nowIndex==1){
                                    $("html,body").animate({scrollTop: 0}, 100);
                                    if(secondCtn.attr("data-changeindex")){

                                    }else{
                                        element.next.removeClass("on");

                                    }
                                }
                            }else{
                                manageData.applyData({//教育背景进入专业界面
                                    port: ajaxPort.education,
                                    postData: {
                                        isvalid:"1",
                                        customerId: parameter.customerId,	//string	是	医生id
                                        visitSiteId: parameter.visitSiteId//	string	是	站点
                                    },
                                    success: function (data) {
                                        t.dealSecond(data);
                                        if (parameter.nowIndex < 2) {
                                            parameter.nowIndex++;
                                        }
                                        element.contentBox.hide();
                                        element.contentBox.eq(parameter.nowIndex).show();
                                        if(parameter.nowIndex==1){
                                            $("html,body").animate({scrollTop: 0}, 100);
                                            if(secondCtn.attr("data-changeindex")){

                                            }else{
                                                element.next.removeClass("on");
                                            }
                                        }
                                    },
                                    failed: function () {
                                        if (parameter.nowIndex < 2) {
                                            parameter.nowIndex++;
                                        }
                                        element.contentBox.hide();
                                        element.contentBox.eq(parameter.nowIndex).show();
                                    }
                                })
                            }
                        }else{
                            if (parameter.nowIndex < 2) {
                                parameter.nowIndex++;
                            }
                            element.contentBox.hide();
                            element.contentBox.eq(parameter.nowIndex).show();
                        }
                    }else{
                        if(parameter.nowIndex == 0){
                            common.popup({"text":"您还有信息未编辑"});
                        }
                    }
                });
                element.pre.unbind("click").bind("click", function () {
                    var stepOne = $(".main-inner").eq(0);
                    if ($(this).index(".main-index-back") > -1) {
                        parameter.nowIndex--;
                    }
                    if(parameter.nowIndex<0){
                        var allWrong = false;
                        $("[data-firstOnOff]").each(function () {
                            if (JSON.parse($(this).attr("data-firstOnOff"))) {
                                allWrong = true;
                            }
                        });
                        if (!allWrong) {
                            bridge.callHandler("authFinished", function (response) {

                            });
                        } else {
                            var data = [
                                {
                                    "text": "保存并退出",
                                    "value": "保存并退出"
                                },
                                {
                                    "text": "放弃认证",
                                    "value": "放弃认证"
                                }
                            ];
                            var picker = new Picker({
                                data: [data]
                            });
                            picker.show();
                            picker.on('picker.select', function (selectedVal, selectedIndex) {
                                if(selectedIndex[0]==0){
                                    parameter.isUpdate =1;
                                    t.submitOne();
                                    t.submitTwo();
                                    bridge.callHandler("authFinished", function (response) {

                                    });
                                }else{
                                    bridge.callHandler("authFinished", function (response) {

                                    });
                                }

                            });
                        }
                        parameter.nowIndex = 0;
                    }
                    element.contentBox.hide();
                    element.contentBox.eq(parameter.nowIndex).show();
                    if(parameter.nowIndex == 0){
                        t.collectFirstData();
                    }
                    if (parameter.nowIndex == 1) {
                        $("html,body").animate({scrollTop: 0}, 100);
                    }

                });
                element.jump.off("click").on("click",function(){
                    if(parameter.nowIndex==1){
                        element.next.trigger("click");
                    }else{
                        bridge.callHandler("authFinished", function (response) {

                        });
                    }
                });
                return auth;
            },
            submitTwo: function () {
                var t = this;
                manageData.applyData({//教育背景进入专业界面
                    port: ajaxPort.submitTwo,
                    postData: t.collectSecondData(),
                    success: function (data) {

                    },
                    failed: function () {
                    }
                });
                return t;
            },
            submitOne: function () {
                var t = this;
                manageData.applyData({//教育背景进入专业界面
                    port: ajaxPort.submitOne,
                    postData: t.collectFirstData(),
                    success: function (data) {
                        common.popup({"text": "我们会在3天内审核，请耐心等待"});
                    },
                    failed: function () {
                        common.popup({"text": "我们会在3天内审核，请耐心等待"});
                    }
                });
                return t;
            },
            selectMajor:function(){
                var t = this;
                element.major.off("click").on("click",function () {
                    t.showDialog("professional", {
                        customerId: parameter.customerId,
                        "parentId": "",	//string	否	专业ID
                        "isValid": "1",	//string	是		1
                        "firstResult": "0",//	string	是	分页参数
                        "maxResult": "999",	//string	是	分页参数
                        "majorName": ""	//string	是	专业名称})
                    },function (data) {
                        var listdata = data.responseObject.responseData.dataList;
                        element.dialog.professional.find(".selector-dialog-content").html(template.produce(["professional"], listdata));
                    },function(){
                        $(".selector-dialog-professional").off("click").on("click",function(e){
                            e.stopPropagation();
                            $(this).toggleClass("active al-professional-select");
                            t.highLightFinish(element.dialog.professional.find(".selector-dialog-content"),".al-professional-select",element.dialog.professional);
                        });
                    })
                });
                $(".main-header-professional").on("click",".back",function(){
                    var selectData = [];
                    $(".al-professional-select").each(function () {
                        if ($(this).hasClass("active")) {
                            var jsonItem = {
                                "treeLevel": $(this).attr("data-treeLevel"),
                                "majorId": $(this).attr("data-projectId"),
                                "name": $(this).text()
                            };
                            selectData.push(jsonItem);
                        }
                    });
                    if(selectData.length>0){
                        element.major.find("#ev-professional-select").html(template.produce(["majorList"], selectData)).addClass("selected");
                        element.major.parent().attr({"data-firstOnOff":"true"});
                        t.collectFirstData();
                        $(".aut-list-second-surgery-ill").show();
                        t.addDot($(".majorListShow"));
                    }else{
                        element.major.find("#ev-professional-select").html("请选择专业").removeClass("selected");
                        element.major.parent().attr({"data-firstOnOff":"false"});
                        t.hideIllNess();
                        t.collectFirstData();
                    }
                    t.hideDialog(element.dialog.professional);
                });
                $(".main-header-professional").on("click",".finish",function(){
                    $(this).parent().find(".back").trigger("click");
                });
                return t;
            },
            hideIllNess:function(){
                var t = this;
                $(".aut-list-second-surgery-ill").hide();
                $(".disease-inner").html("请添加疾病").removeClass("selected");
                $(".illness-inner").html("请添加手术").removeClass("selected");
                return t;
            },
            changeDateStyle: function (str) {
                var t = this;
                var reg = /\年/ig;
                if (reg.test(str)) {
                    var str1 = str.replace("年", "-");
                    var str2 = str1.replace("月", "");
                    if (Number(str2.split("-")[1]) < 10) {
                        return str1.split("-")[0] + "-0" + Number(str2.split("-")[1]);
                    } else {
                        return str2;
                    }
                } else {
                    return "";
                }
            },
            goodAtIll:function(){
                var t = this;
                element.disease.off("click").on("click",function () {
                    if ($(this).find(".illNessShow").length > 0) {
                        var majorDisease = [];
                        $(this).find(".illNessShow").each(function () {
                            var jsonItem = {
                                illId: $(this).attr("data-illid"),
                                illName: $(this).text()
                            };
                            majorDisease.push(jsonItem);
                        });
                        element.illList.html(template.produce(["selcetIllness"], majorDisease));
                        t.highLightFinish(element.illList,".enjoy-ill-item",element.dialog.disease);
                    }
                    parameter.scrollTop = $("body").scrollTop();
                    $(".main-inner").eq(parameter.nowIndex).hide();
                    element.dialog.disease.addClass("show");
                    element.illSearchInput.off("input").on("input", function () {
                        var val = $(this).val();
                        if(val.length>0){
                            manageData.applyData({
                                port: ajaxPort.illnessList,
                                get: true,
                                postData: {
                                    visitSiteId:parameter.visitSiteId,
                                    "isValid": 1,	//string	是		1
                                    "firstResult": 0,	//string	是	分页参数
                                    "maxResult": 999,	//string	是	分页参数
                                    "illnessName": encodeURI(val),	//string	否	疾病名称（搜索用）
                                    "parentId": "",	//string	是	父级id
                                    "treeLevel": ""	//string	是
                                },
                                success: function (data) {
                                    var listdata = data.responseObject.responseData.dataList;
                                    element.illsearchResult.html(template.produce(["illness"], listdata));
                                    $(".enjoy-search-item").off("click").on("click",function(){
                                        if (element.illList.find("[data-illListId='" + $(this).attr("data-illid") + "']").length == 0) {
                                            element.illList.append("<li class=\"enjoy-ill-item\" data-illListId='" + $(this).attr("data-illid") + "'><span>" + $(this).text() + "</span><i>x</i></li>");
                                        }
                                        t.highLightFinish(element.illList,".enjoy-ill-item",element.dialog.disease)
                                    });
                                },
                                failed: function () {
                                    element.illsearchResult.html("");
                                }
                            });
                        }else{
                            element.illSearchInput.trigger("blur");
                            element.illsearchResult.html("");
                        }
                    });
                    $(".enjoy-ill-details").on("click",".enjoy-ill-item i",function(){
                        $(this).parent().remove();
                        t.highLightFinish(element.illList,".enjoy-ill-item",element.dialog.disease);
                    });
                    var saveIll = function(){
                        var diseaseData = [];
                        $(".enjoy-ill-item").each(function(){
                            var jsonItem = {
                                "illId": $(this).attr("data-illListId"),
                                illName: $(this).find("span").text()
                            };
                            diseaseData.push(jsonItem);
                        });
                        if(diseaseData.length>0){
                            $(".disease-inner").html(template.produce(["illnessShow"], diseaseData)).addClass("selected");
                            t.addDot($(".illNessShow"));
                            $(".aut-list-good").attr({"data-firstOnOff":"true"});
                            t.collectFirstData();
                        }else{
                            $(".disease-inner").html("请添加疾病").removeClass("selected");
                            $(".aut-list-good").attr({"data-firstOnOff":"false"});
                            t.collectFirstData();
                        }
                        element.illList.html("");
                        element.illSearchInput.val("");
                        element.illsearchResult.html("");
                        t.hideDialog(element.dialog.disease);
                    };
                    $(".main-header-disease").off("click").on("click",".back",function(){
                        saveIll();
                    });
                    element.dialog.disease.off("click").on("click",".finish",function(){
                        saveIll();
                    });
                });
                return t;
            },
            inputName:function(){
                var t = this;
                element.name.off("blur").on("blur",function(){
                    var len = $(this).val().length;
                    var str = $(this).val();
                    var s = str;
                    if (len > 20) {
                        $(this).val(str.substring(0, 20));
                        /*$(this).attr({"data-validate": "false"});*/
                        $(".aut-list-name").attr({"data-firstOnOff":"false"});
                        common.popup({"text": "请填写真实姓名"});
                        t.collectFirstData();
                        //少错误提示
                    } else {
                        if (len > 0) {
                            if(/^\s|^\.|^\▪|^\·|\s$|\.$|\▪$|\·$/.test(s)){
                                /*姓名错误*/
                                $(".aut-list-name").attr({"data-firstOnOff":"false"});
                                common.popup({"text": "请填写真实姓名"});
                            }else {
                                if(/^[\u4e00-\u9fa5\s\.\▪\·]{1,25}$|^[A-Za-z\s\.\▪\·]{1,50}$|^([A-Za-z\s\.\▪\·]|[\u4e00-\u9fa5\s\.\▪\·]){1,50}$/.test(s)){
                                    for(var i=0;i<s.length;i++){
                                        if(s[i]==' '&&s[i+1]==' '){
                                            /*姓名错误*/
                                            $(".aut-list-name").attr({"data-firstOnOff":"false"});
                                            common.popup({"text": "请填写真实姓名"});
                                            return ;

                                        }
                                    }
                                    $(".aut-list-name").attr({"data-firstOnOff":"true"});
                                }else {
                                    /*姓名错误*/
                                    $(".aut-list-name").attr({"data-firstOnOff":"false"});
                                    common.popup({"text": "请填写真实姓名"});
                                }
                            }
                            t.collectFirstData();
                        } else {
                            $(".aut-list-name").attr({"data-firstOnOff":"false"});
                            common.popup({"text": "请填写真实姓名"});
                            t.collectFirstData();
                        }
                    }
                    t.collectFirstData();
                });
                return t;
            },
            lastNoNeed:function(str,sign){
                var resultStr = "";
                if(str.length>0){
                    resultStr = str.substring(0, str.lastIndexOf(sign))
                }
                return resultStr;

            },
            addDot:function(list){
                var lenS = list.length;
                list.each(function (i) {
                    if (i != lenS - 1) {
                        $(this).after("<em>、</em>")
                    }
                });
            },
            hideDialog:function(obj){
                var t = this;
                obj.removeClass("show");
                $(".main-inner").eq(parameter.nowIndex).show();
                $("html,body").animate({scrollTop: parameter.scrollTop}, 100);
                return t;
            },
            showDialog:function(type,data,successBack,callBack,need){
                var  t = this;
                var classType = "";
                if(need==undefined){
                    classType = type;
                }
                parameter.scrollTop = $("body").scrollTop();
                if(element.dialog[type].find("."+classType+"-list-item").length==0){
                    manageData.applyData({
                        port: ajaxPort[type],
                        get: true,
                        postData:data,
                        success: function (data) {
                            successBack&&successBack(data);
                            callBack&&callBack();
                            $(".main-inner").eq(parameter.nowIndex).hide();
                            element.dialog[type].addClass("show");
                        },
                        failed: function () {
                        }
                    });
                }else{
                    callBack&&callBack();
                    $(".main-inner").eq(parameter.nowIndex).hide();
                    element.dialog[type].addClass("show");
                }
                return t;
            },
            addSurgery:function(){
                var t = this;
                $(".main-header-surgery").on("click", ".back", function () {
                    var selectItem = element.dialog["surgery"].find(".selector-dialog-content .selector-dialog-major .active[data-operationinnerid]");
                    if (selectItem.length > 0) {
                        var data = [];
                        parameter.postSurgery = [];
                        selectItem.each(function () {
                            var jsonItem = {
                                "operationId": $(this).attr("data-operationinnerid"),
                                operationName: $(this).text(),
                                "majorId": $(this).parent().parent().prev().attr("data-majorid"),
                                majorName: $(this).parent().parent().prev().text()
                            };
                            parameter.postSurgery.push(jsonItem);
                            data.push(jsonItem);
                        });
                        $(".illness-inner").html(template.surgeryShow(data)).addClass("selected");
                        t.addDot($(".surgeryShow"));
                        $(".aut-list-surgery").attr({"data-firstOnOff":"true"});
                        t.collectFirstData();
                    }else{
                        $(".illness-inner").html("请添加手术").removeClass("selected");
                        $(".aut-list-surgery").attr({"data-firstOnOff":"false"});
                        t.collectFirstData();
                    }
                    t.hideDialog(element.dialog["surgery"]);
                });
                $(".main-header-surgery").on("click", ".finish", function () {
                    $(this).parent().find(".back").trigger("click");
                });
                element.surgery.off("click").on("click", function () {
                    t.showDialog("surgery", {
                        majorIdList: t.getMajorListId(),	//string	否	专业ID
                        isValid: "1",	//string	是		1
                        firstResult: "0",//	string	是	分页参数
                        maxResult: "200",	//string	是	分页参数
                        operationName: ""//	string	是	手术名称
                    }, function (data) {
                        var surgeryStr = "";
                        $.each(manageData.disposeSurgery(data), function (i, v) {
                            surgeryStr += "<header class=\"selector-dialog-major-title\" data-majorId='" + v.majorId + "'>" + v.majorName + "</header><ul>" + template.produce(["surgery"], v.children) + "</ul>";
                        });
                        element.dialog["surgery"].find(".selector-dialog-content .selector-dialog-major").html(surgeryStr);
                        t.selectSurgery();
                    });
                });
                return t;
            },
            highLightFinish:function(container,name,dialog){
                var t = this;
                if(container.find(name).length>0){
                    dialog.find(".save").addClass("finish");
                }else{
                    dialog.find(".save").removeClass("finish");
                }
                return t;
            },
            selectSurgery:function(){//选择手术
                var t = this;
                var selectInnerDease = function(){
                    $(".selector-dialog-item[data-operationinnerid]").off("click").on("click",function(){
                        $(this).toggleClass("active");
                        var lenTh = $(this).parent().find(".selector-dialog-item[data-operationinnerid]").length;
                        var selectLen = $(this).parent().find(".active[data-operationinnerid]").length;
                        if(lenTh==selectLen){
                            $(this).parent().find(".selector-all").addClass("active");
                        }else{
                            $(this).parent().find(".selector-all").removeClass("active");
                        }
                        t.highLightFinish(element.dialog["surgery"].find(".selector-dialog-content .selector-dialog-major"),".active",element.dialog["surgery"]);
                    });
                };
                var selectListItem = function(obj){
                    if(!obj.hasClass("selector-up")){
                        obj.nextAll().removeClass("active");
                        t.highLightFinish(element.dialog["surgery"].find(".selector-dialog-content .selector-dialog-major"),".active",element.dialog["surgery"]);
                    }
                    selectInnerDease();
                    $(".selector-all").off("click").on("click",function(){
                        $(this).toggleClass("active");
                        if($(this).hasClass("active")){
                            $(this).nextAll().addClass("active");
                        }else{
                            $(this).nextAll().removeClass("active");
                        }
                        t.highLightFinish(element.dialog["surgery"].find(".selector-dialog-content .selector-dialog-major"),".active",element.dialog["surgery"]);
                    });
                };
                element.dialog.surgery.find(".selector-dialog-title").off("click").on("click",function(){
                    var isThis = $(this);
                    if ($(this).nextAll().length == 0) {
                        manageData.applyData({
                            port: ajaxPort.surgeryInner,
                            get: true,
                            postData: {
                                visitSiteId:parameter.visitSiteId,
                                isValid: "1",//string	是		1
                                firstResult: "0",//string	是	分页参数
                                maxResult: "200",//string	是	分页参数
                                operationName: "",//	string	否	手术名称（搜索用）
                                parentId: isThis.attr("data-operationid"),//string	是	父级id
                                treeLevel: ""//	string	是
                            },
                            success: function (data) {
                                var listdata = data.responseObject.responseData.dataList;
                                if(isThis.parent().find(".selector-all").length==0){
                                    isThis.parent().append("<article class=\"selector-all selector-dialog-item\">" +
                                        "   <span>全部</span>" +
                                        "</article>" + template.produce(["surgeryList"], listdata));
                                    isThis.toggleClass("selector-up");
                                    isThis.nextAll().toggle();
                                    if(isThis.hasClass("selector-up")){
                                        selectInnerDease();
                                        $(".surgeryShow").each(function(){
                                            var operId=$(this).attr("data-operationid");
                                            var parentObj = $(".selector-dialog-item[data-operationinnerid='"+operId+"']");
                                            parentObj.each(function(){
                                                if($(this).hasClass("active")){
                                                    return ;
                                                }else{
                                                    $(this).trigger("click");
                                                }
                                            });
                                        });
                                    }
                                    selectListItem(isThis);
                                }

                            },
                            failed: function () {
                            }
                        });
                    } else {
                        isThis.toggleClass("selector-up");
                        selectListItem(isThis);
                        isThis.nextAll().toggle();
                    }
                });
                return t;
            },
            getMajorListId:function(){
                var majorList = "";
                $(".majorListShow").each(function () {
                    majorList += $(this).attr("data-majorid") + ",";
                });
                majorList = majorList.substring(0, majorList.lastIndexOf(","));
                return majorList;
            },
            moreMedical:function(){
                var t = this;
                element.moreMedical.off("click").on("click",function(){
                    var data = [];
                    $.each(parameter.moreMaterial, function (i, v) {
                        var jsonItem = {
                            text: v.refValue,
                            value: v.refValue + "-" + v.refId
                        };
                        data.push(jsonItem);
                    });
                    var picker = new Picker({
                        data: [data]
                    });
                    picker.show();
                    picker.on('picker.select', function (selectedVal, selectedIndex) {
                        var credentialBox = $(".au-doctor-cer-list");
                        var uploadid = "12" + selectedIndex;
                        var nameImg = selectedVal[0].split("-");
                        var titleImg = nameImg[0];
                        var idImg = nameImg[1];
                        var addImg = $("[data-uploadid='"+uploadid+"']");
                        if(addImg.length==0){
                            credentialBox.append(template.moreMedical(titleImg,uploadid,"",idImg));//添加更多证书上传dom
                            t.postImg();
                        }
                        var moreList = $("input[data-uploadid]");
                        if(moreList.length==8){
                            $(".aut-list-more").hide();
                        }

                    });
                });
                return t;
            },
            postImg:function(){
                var t = this;
                $(".aut-list-post-image").each(function(){
                    var imgObj = $(this);
                    $(this).find("input").off("change").on("change",function(){
                        var isThis = this;
                        var _isThis = $(this);
                        var oFReader = new FileReader();
                        var oFile = isThis.files[0];
                        var fileContent = oFReader.readAsDataURL(oFile);
                        var imgName = this.value;
                        var imgType = imgName.substring(imgName.lastIndexOf(".") + 1);
                        $(".tc-upLoading-box").remove();
                        var imgContainer = null;
                        if (_isThis.attr("data-uploadId")) {
                            imgContainer = $(".aut-upload-tool[data-uploadId=" + _isThis.attr("data-uploadId") + "]")
                        } else {
                            imgContainer = $(".img-upload-head");
                        }
                        imgContainer.append("<span class=\"tc-upLoading-box\"><span class=\"tc-upLoading\"></span></span>");
                        oFReader.onload = function (oFREvent) {
                            var postData = {
                                isvalid:"1",
                                customerId: parameter.customerId,//	string	是	用户id
                                "imageType": _isThis.hasClass("postPicButtonLogo") ? "1" : "3",
                                "visitSiteId": parameter.visitSiteId,
                                uploadType: _isThis.hasClass("postPicButtonLogo") ? "1" : ""
                            };
                            postData = {paramJson: $.toJSON(postData)};
                            _isThis.parent().ajaxSubmit({//上传图片
                                url: "//m.allinmed.cn/mcall/tocure/upload/attachment/v1/upload/",
                                dataType: 'text',
                                data: postData,
                                type: "POST",
                                clearForm: true,
                                success: function (data) {
                                    $(".tc-upLoading-box").remove();
                                    var resultStr = $.parseJSON(data.replace(/<.*?>/ig, ""));
                                    var imgUrl = "";
                                    imgUrl = resultStr.responseObject.responseData.filePath;
                                    imgContainer.parent().find(".aut-img-post-container").remove();
                                    if (_isThis.hasClass("postPicButtonLogo")) {
                                        imgUrl =resultStr.responseObject.responseData.dataList.filePath;
                                        imgContainer.find("img").attr({"src": imgUrl});
                                    } else {
                                        imgContainer.parent().append(template.imgPost(imgUrl));
                                        if(imgObj.attr("data-firstonoff")){
                                            imgObj.attr({"data-firstonoff":"true"});
                                        }
                                        t.collectFirstData();
                                    }
                                    // imgContainer.attr({"data-edit": "true"});
                                    t.magnifyImg();
                                    t.closeImg();
                                },
                                failed: function () {
                                    if(imgObj.attr("data-firstonoff")){
                                        imgObj.attr({"data-firstonoff":"false"});
                                    }
                                    t.collectFirstData();
                                    $(".tc-upLoading-box").remove();
                                    imgContainer.find("p").html("重新上传");
                                }

                            });
                        };
                    });
                });
                return t;
            },
            magnifyImg:function(){
                var t = this;
                bigPicShow.init({
                    /**
                     * 指定多个class|| ID
                     * domIdList和ajaxoptions 只能留一个,可注释一个进行切换
                     * */
                    domIdList: ".aut-img-post-container",
                    closeCallBack: function () {
                    }
//        swiperToggle:".detials_doc",
                });
                return t;
                return t;
            },
            selectMedical:function(){
                var t = this;
                element.medical.off("click").on("click",function(){
                    var data = [{
                        text: "住院医师",
                        value: "住院医师"
                    }, {
                        text: "主治医师",
                        value: "主治医师"
                    }, {
                        text: "副主任医师",
                        value: "副主任医师"
                    }, {
                        text: "主任医师",
                        value: "主任医师"
                    }];
                    var picker = new Picker({
                        data: [data]
                    });
                    picker.show();
                    picker.on('picker.select', function (selectedVal, selectedIndex) {
                        $(".aut-list-job").hide();
                        var firstObj = $("[data-jobtype='"+selectedVal+"']").parent();
                        element.medical.find(".modal-inner").html(selectedVal).addClass("selected");
                        $("#ev-medicalTitleSelector").attr({"data-firstonoff":"true"});
                        $("[data-jobType='主任医师']").find("span").html("主任医师");
                        $("[data-jobType='主任医师']").parent().hide();
                        firstObj.show().nextAll().show();
                        $("[data-lastMedicalTime]").html("结束时间").removeAttr("data-lastMedicalTime").removeClass("selected");
                        $(".aut-list-end-time span").each(function(){
                            if($(this).text()=="至今"){
                                $(this).text("结束时间").attr({"data-lastMedicalTime":"false"}).removeClass("selected");
                            }
                        });
                        firstObj.find(".aut-list-end-time span").html("至今").attr({"data-lastMedicalTime":"true"}).addClass("selected");
                        $(".aut-list-job").each(function(){
                            if($(this).css("display")=="block"){
                                if($(this).find(".selected").length!=2){
                                    $(this).attr({"data-firstonoff":"false"});
                                }else{
                                    $(this).attr({"data-firstonoff":"true"});
                                }
                            }else{
                                $(this).removeAttr("data-firstonoff");
                            }
                        });
                    });
                });
                return t;
            },
            selectTime:function(){
                var t = this;
                var timeList = util.timeList();
                var timePicker = new Picker({
                    data: [timeList.data1, timeList.data2]
                });
                $(".title-time-selector").off("click").on("click",function(){
                    $(this).attr({"data-nowTimeSelect":"true"});
                    timePicker.show();
                });
                timePicker.on('picker.select', function (v, selectedIndex) {
                    var isThis = $("[data-nowTimeSelect]");
                    if(isThis.hasClass("title-time-medical")){
                        if(isThis.text()=="至今"){
                            isThis.html("至今").addClass("selected");
                        }else{
                            var month = (v[1]<10)?("0"+v[1]):v[1];
                            isThis.html(v[0] + "年" + month + "月").addClass("selected");
                            if(isThis.attr("data-timeSelectId")){
                                $('[data-timeSelectId="'+isThis.attr("data-timeSelectId")+'"]').html(v[0] + "年" + month + "月").addClass("selected");
                            }
                            $(".aut-list-job").each(function(){
                                var startTime = $(this).find(".title-time-selector").eq(0);
                                var endJobTime = $(this).find(".title-time-selector").eq(1);
                                if(startTime.hasClass("selected")&&endJobTime.hasClass("selected")&&(endJobTime.text()!="至今")&&(endJobTime.text()!="结束时间")){
                                    var duringOnOff = t.duringTime({beginStr: startTime.text(), endStr: endJobTime.text()});
                                    if (!duringOnOff) {
                                        common.popup({"text": "请选择正确的履历时间"});
                                        $(this).attr({"data-firstonoff":"false"});
                                    }else{
                                        $(this).attr({"data-firstonoff":"true"});
                                    }
                                }else if(startTime.hasClass("selected")&&(endJobTime.text()=="至今")){
                                    $(this).attr({"data-firstonoff":"true"});
                                }
                            });
                        }
                        isThis.removeAttr("data-nowTimeSelect");
                    }else{
                        isThis.html(v[0] + "年" + v[1] + "月").addClass("selected");
                        $(".main-inner").eq(1).attr({"data-changeindex":"true"});//启动第二步操作标志
                        element.next.addClass("on");
                        var startTime = isThis.parent().parent().find(".title-time-selector").eq(0);
                        var endJobTime = isThis.parent().parent().find(".title-time-selector").eq(1);
                        if(startTime.hasClass("selected")&&endJobTime.hasClass("selected")&&(endJobTime.text()!="至今")&&(endJobTime.text()!="结束时间")){
                            var duringOnOff = t.duringTime({beginStr: startTime.text(), endStr: endJobTime.text()});
                            if (!duringOnOff) {
                                common.popup({"text": "请选择正确的履历时间"});
                                isThis.parent().attr({"data-timeOnOff":"false"});
                            }else{
                                isThis.parent().removeAttr("data-timeOnOff");
                            }
                        }
                        isThis.removeAttr("data-nowTimeSelect");
                    }
                });
                return t;
            },
            duringTime: function (options) {
                var beginDateStr = options.beginStr.replace("年", "-");
                var beginDateStrR = beginDateStr.replace("月", "");
                var endDateStr = options.endStr.replace("年", "-");
                var endDateStrR = endDateStr.replace("月", "");
                var beginDate = beginDateStrR;
                var endDate = endDateStrR;
                var beginTime = beginDateStrR.split("-");
                var endTime = endDateStrR.split("-");
                if (beginDateStrR == endDateStrR) {
                    return false;
                }
                for (var i = 0; i < beginTime.length; i++) {
                    if (i == 0) {
                        if (beginTime[i] > endTime[i]) {
                            return false;
                        } else {
                            return true;
                        }
                    } else {
                        if (beginTime[0] == endTime[0]) {
                            if (beginTime[i] >= endTime[i]) {
                                return false;
                            } else {
                                return true
                            }
                        }
                    }
                }
            },
            selectAccident:function(){
                var t = this;
                element.accident.find(".icon-aut-selector").off("click").on("click",function(){
                    $(this).addClass("on").siblings().removeClass("on");
                    element.accident.attr({"data-firstonoff":"true"});
                    t.collectFirstData();
                });
                return t;
            },
            scrollPage:function(id){
                var t = this;
                var scrollOption = {
                    /*请求地址*/
                    'contentPage': ajaxPort.hospital,
                    /*refid习题id*/
                    'contentData': $.extend({
                        hospitalName:"",	//string	否	医院名称
                        isValid:"1",	//string	是	是否有效
                        firstResult:"0",
                        maxResult:"10",
                        provinceId:"",//	string	否	省id
                        cityId:id//	string	否	市id
                    }, {
                        firstResult:function(){
                            var isPage = parseInt(element.dialog.hospital.attr("data-page"));
                            isPage++;
                            element.dialog.hospital.attr({"data-page":isPage});
                            return isPage*10;
                        }
                    }),
                    'scrollTarget': $(window),
                    'heightOffset': 0,
                    'delaytime': 1000,
                    'type': "post",
                    'beforeLoad': function () {

                    },
                    'afterLoad': function (elementsLoaded) {

                    },
                    'loader': function (data) {
                        var realNoData = ((data.responseObject.responseMessage) == "NO DATA");
                        var realStatus = data.responseObject.responseStatus;
                        var len = data.responseObject.responseData.dataList.length;
                        if (realNoData || !realStatus||len==0) {
                            $("body,html").off("scroll");
                            $(window).off("scroll");
                        }else{
                            element.dialog.hospital.find('.selector-dialog-content').append(template.produce(["hospital"],data.responseObject.responseData.dataList));
                            t.submitHospital();
                        }

                    }
                };

                $(window).off("scroll");
                $("body,html").scrollPagination(scrollOption);
                return t;
            },
            citySelectInit:function(){
                var t = this;
                element.searchList.off("input").on("input",function(){
                    var showObj = $(".show").find(".selector-dialog-content");
                    var isThis = $(this);
                    var InajaxPort = "";
                    var ajaxData = {};
                    if(parameter.cityType=="school"){
                        InajaxPort = ajaxPort.school;
                        ajaxData = {
                            visitSiteId:parameter.visitSiteId,
                            isValid:"1",//	string	是		1
                            firstResult:"0",//	string	是	分页参数
                            maxResult:"999",//	string	是	分页参数
                            schoolName:encodeURI(isThis.val())//	string	否	手术名称（搜索用）
                        };
                    }else{
                        InajaxPort = ajaxPort.hospital;
                        ajaxData = {
                            visitSiteId:parameter.visitSiteId,
                            hospitalName:encodeURI(isThis.val()),	//string	否	医院名称
                            isValid:"1",	//string	是	是否有效
                            firstResult:"0",	//string	是	分页参数
                            maxResult:"999"	//string	是	分页参数
                            //cityId:isThis.attr("data-regionId")//	string	否	市id
                        };
                    }
                    if($(this).val().length>0){
                        showObj.hide();
                        isThis.show();
                        manageData.applyData({
                            port: InajaxPort,
                            get: true,
                            postData: ajaxData,
                            success: function (data) {
                                if(data.responseObject.responseData.dataList.length>0){
                                    if(parameter.cityType=="school"){
                                        if(isThis.val().length>0){
                                            isThis.next().html(template.produce(["schoolList"],data.responseObject.responseData.dataList)).show();
                                        }else{
                                            isThis.next().html(template.noSearchResult()).hide();
                                            showObj.show();
                                        }
                                        $(".selector-school-result").off("click").on("click",function () {
                                            var schoolObj = $("[data-onSelect]");
                                            schoolObj.html($(this).text()).addClass("selected").attr({"data-universityId": $(this).attr("data-schoolid")});
                                            $(".main-inner").eq(1).attr({"data-changeindex":"true"});//启动第二步操作标志
                                            element.next.addClass("on");
                                            schoolObj.removeAttr("data-onSelect");
                                            t.hideDialog($(".show"));
                                        })
                                    }else{
                                        if(isThis.val().length>0){
                                            isThis.next().html(template.produce(["hospitalList"],data.responseObject.responseData.dataList)).show();
                                        }else{
                                            isThis.next().html(template.noSearchResult()).hide();
                                            showObj.show();
                                        }
                                        $(".selector-hospital-result").off("click").on("click",function () {
                                            var isThis = $(this);
                                            element.hospital.find(".modal-inner").html(isThis.text()).attr({"data-id":isThis.find("span").attr("data-id")}).addClass("selected");
                                            $(".aut-list-hospital").attr({"data-firstOnOff":"true"});
                                            t.collectFirstData();
                                            t.hideDialog($(".show"));
                                        })
                                    }

                                }else{
                                    isThis.next().html(template.noSearchResult()).hide();
                                    showObj.show();
                                }
                            },
                            failed: function () {
                                if(showObj.css("display")=="block"){
                                    isThis.next().html(template.noSearchResult()).hide();
                                }else{
                                    isThis.next().html(template.noSearchResult()).show();
                                }
                            }
                        });
                    }else{
                        isThis.next().hide();
                        showObj.show();
                    }
                });
                t.showDialog("province", {
                    "parentId": "",
                    "isValid": "1",
                    "firstResult": "0",
                    "maxResult": "9999",
                    "treeLevel": "2"
                }, function (data) {
                    element.dialog.province.find(".selector-dialog-content").html(template.province(t.filtrateProvince(data)));
                },function () {
                    element.searchList.val("");
                    element.dialog.province.find(".selector-dialog-content").show();
                    $(".search-result").hide();
                    element.dialog.province.find(".back").off("click").on("click",function(){//退出省份
                        //var showObj = $(".show").find(".selector-dialog-content");
                        t.hideDialog(element.dialog.province);
                    });
                    $(".selector-dialog-province").off("click").on("click",function () {
                        var isThis = $(this);
                        element.dialog.province.removeClass("show");
                        t.showDialog("city", {
                            "parentId": isThis.attr("data-regionid"),
                            "isValid": "1",
                            "firstResult": "0",
                            "maxResult": "9999",
                            "treeLevel": "3"
                        }, function (data) {
                            element.dialog.city.find(".selector-dialog-content").html(template.produce(["city"],data.responseObject.responseData.dataList));
                        },function(){
                            element.searchList.val("");
                            element.dialog.city.find(".selector-dialog-content").show();
                            $(".search-result").hide();
                            element.dialog.province.removeClass("province");
                            element.dialog.city.find(".main-header-item").eq(1).html(isThis.text());
                            element.dialog.city.find(".back").off("click").on("click",function(){//退出城市
                                element.dialog.city.removeClass("show");
                                element.dialog.province.addClass("show");
                            });
                            $(".selector-dialog-city").off("click").on("click",function() {
                                var cityIsThis = $(this);
                                if(parameter.cityType=="school"){
                                    t.showDialog("school", {
                                        isValid: "1",	//string	是		1
                                        firstResult: "0",	//string	是	分页参数
                                        maxResult: "999",	//string	是	分页参数
                                        cityId: cityIsThis.attr("data-regionid"),//	string	否	手术名称（搜索用）
                                        treeLevel: ""//	string	是
                                    }, function (data) {
                                        var listdata = data.responseObject.responseData.dataList;
                                        element.dialog.school.find(".selector-dialog-content").html(template.produce(["school"], listdata));
                                    },function(){
                                        element.searchList.val("");
                                        element.dialog.school.find(".selector-dialog-content").show();
                                        $(".search-result").hide();
                                        element.dialog.city.removeClass("show");
                                        element.dialog.province.removeClass("show");
                                        $(".selector-dialog-school").off("click").on("click",function(){
                                            var schoolObj = $("[data-onSelect]");
                                            schoolObj.html($(this).html()).addClass("selected").attr({"data-universityId": $(this).attr("data-id")});
                                            schoolObj.removeAttr("data-onSelect");
                                            t.hideDialog(element.dialog.school);
                                        });
                                        element.dialog.school.find(".back").off("click").on("click",function(){
                                            t.hideDialog(element.dialog.school);
                                        });
                                    },true);
                                }else{
                                    t.showDialog("hospital", {
                                        hospitalName:"",	//string	否	医院名称
                                        isValid:"1",	//string	是	是否有效
                                        pageIndex:"0",
                                        pageSize:"10",
                                        provinceId:"",//	string	否	省id
                                        cityId:cityIsThis.attr("data-regionId")//	string	否	市id
                                        //cityId:isThis.attr("data-regionId")//	string	否	市id
                                    }, function (data) {
                                        element.dialog.hospital.find('.selector-dialog-content').html(template.produce(["hospital"],data.responseObject.responseData.dataList));
                                        element.dialog.hospital.attr({"data-page":"0"});
                                        $("body,html").off("scroll");
                                        $(window).off("scroll");
                                        t.scrollPage(cityIsThis.attr("data-regionId"));
                                    },function(){
                                        t.submitHospital();
                                    },true);
                                }
                            });

                        },true)

                    });
                });
                return t;
            },
            submitHospital:function(){
                var t = this;
                element.searchList.val("");
                element.dialog.hospital.find(".selector-dialog-content").show();
                $(".search-result").hide();
                element.dialog.city.removeClass("show");
                element.dialog.province.removeClass("show");
                $(".selector-dialog-hospital").off("click").on("click",function(){
                    var isThis = $(this);
                    $("body,html").off("scroll");
                    $(window).off("scroll");
                    element.hospital.find(".modal-inner").html(isThis.text()).attr({"data-id":isThis.find("span").attr("data-id")}).addClass("selected");
                    $(".aut-list-hospital").attr({"data-firstOnOff":"true"});
                    t.collectFirstData();
                    t.hideDialog(element.dialog.hospital);
                });
                element.dialog.hospital.find(".back").off("click").on("click",function(){
                    t.hideDialog(element.dialog.hospital);
                });
                return t;
            },
            filtrateProvince:function(data){
                var returnData = [];
                $.each(data.responseObject.responseData.dataList,function(i,v){
                    var pinYinHead = makePy(v.regionName)[0][0];
                    var dataJosn = {
                        firstResult: v.firstResult,
                        id: v.id,
                        ids: v.ids,
                        isValid: v.isValid,
                        maxResult: v.maxResult,
                        page: v.page,
                        pageSize: v.pageSize,
                        parentId: v.parentId,
                        regionId: v.regionId,
                        regionName: v.regionName,
                        regionNameEn: v.regionNameEn,
                        sortType: v.sortType,
                        treeLevel: v.treeLevel
                    };
                    dataJosn.pinyin = pinYinHead;
                    returnData.push(dataJosn);
                });
                function JsonSort(json,key){
                    for(var j=1,jl=json.length;j < jl;j++){
                        var temp = json[j],
                            val  = temp[key],
                            i    = j-1;
                        while(i >=0 && json[i][key]>val){
                            json[i+1] = json[i];
                            i = i-1;
                        }
                        json[i+1] = temp;

                    }
                    return json;
                }
                return JsonSort(returnData,"pinyin");
            },
            inputIllNum:function(){
                var t = this;
                element.billNum.each(function () {
                    $(this).off("input").on("input", function () {
                        var reg = /^\d{1,}$/;
                        if (reg.test($(this).val())) {
                            if ($(this).val().length > 3) {
                                var str = $(this).val();
                                $(this).val(str.substring(0, 3));
                            }
                        } else {
                            $(this).val("");
                        }
                    });
                    $(this).off("blur").on("blur", function () {
                        if ($(this).val().length > 0) {
                            if ($(this).val().length < 4) {
                                $(this).hide().parent().attr({"data-firstOnOff":"true"});
                                t.collectFirstData();
                                $(this).next().html($(this).val() + "例").show().attr({"data-illNum":$(this).val()});
                            } else {
                                //少错误提示
                            }
                        } else {
                            $(this).show();
                            $(this).next().hide().html("");
                        }
                    });
                });
                $(".illtips").off("click").on("click", function () {
                    $(this).hide();
                    var valueStr = ($(this).html()).match(/\d{1,}/ig);
                    $(this).prev().val(valueStr[0]).show().trigger("focus");
                });
                return t;
            },
            selectSchool:function(){
                //选择学校
                var t = this;
                $(".aut-list-select-school").off("click").on("click",function(){
                    parameter.cityType = "school";
                    $(this).find("span").attr({"data-onSelect":"true"});
                    element.searchList.attr({"placeholder":"请输入学校名称"}).val("").next().html("").parent().next().show();
                    t.citySelectInit();
                });
                return t;
            },
            selectHospital:function(){
                //选择医院
                var t = this;
                element.hospital.off("click").on("click",function(){
                    parameter.cityType = "hospital";
                    element.searchList.attr({"placeholder":"请输入医院名称"}).val("").next().html("").parent().next().show();
                    t.citySelectInit();
                });
                return t;
            },
            selectSex:function(){
                var t = this;
                element.sex.find(".aut-sex-selector").off("click").on("click",function(){
                    $(this).addClass("on").siblings().removeClass("on");
                    element.sex.attr({"data-firstonoff":"true"});
                    t.collectFirstData();
                });
                return t;
            },
            selectAge:function(){
                var t = this;
                element.age.off("click").on("click",function(){
                    var picker1 = new Picker({
                        data: [util.timeList().data1, util.timeList().data2, util.timeList().data3]
                    });
                    picker1.show();
                    picker1.on('picker.select', function (selectedVal, selectedIndex) {
                        var yearChange = function(val){
                            var yearStr = "";
                            var tenUp = function(num){
                                if(num<10){
                                    return "0"+num;
                                }else{
                                    return num
                                }
                            };
                            yearStr = val[0]+"-"+tenUp(val[1])+"-"+tenUp(val[2]);
                            return yearStr;
                        };
                        parameter.ageStr = yearChange(selectedVal);
                        element.age.find("#ev-ageSelector").addClass("selected").text(new Date().getFullYear() - util.timeList().data1[selectedIndex[0]].text);
                        var age = new Date().getFullYear() - util.timeList().data1[selectedIndex[0]].text;
                        if (age < 20 || age > 110) {
                            common.popup({"text": "请填写真实年龄"});
                            element.age.parent().attr({"data-firstonoff":"false"});
                            t.collectFirstData();
                        }else{
                            element.age.parent().attr({"data-firstonoff":"true"});
                            t.collectFirstData();
                        }
                    });
                });
                return t;
            },
            getCorrelation:function(){
                //获取医师职称的相关信息
                var t = this;
                manageData.applyData({
                    port: ajaxPort.certificate,
                    postData: {//获取职业资格证书数据
                        isValid: "1",
                        visitSiteId: parameter.visitSiteId,
                        firstResult: "0",
                        maxResult: "10",
                        typeId: "2"
                    },
                    success: function (data) {
                        var listData = data.responseObject.responseData.dataList;
                        $.each(listData, function (i, v) {
                            if ($("[data-status='" + v.refValue + "']").length > 0) {
                                var headObj = $("[data-status='" + v.refValue + "']");
                                headObj.each(function(){
                                    $(this).find(".aut-upload-tool").attr({
                                        "data-typeid": v.refId
                                    });
                                });
                            } else {
                                parameter.moreMaterial.push(this);
                            }
                        });
                    },
                    failed: function () {
                    }
                });
                manageData.applyData({//获取医师职称的相关数据
                    port: ajaxPort.certificate,
                    postData: {
                        isValid: "1",
                        visitSiteId: parameter.visitSiteId,
                        firstResult: "0",
                        maxResult: "10",
                        typeId: "1"
                    },
                    success: function (data) {
                        var listData = data.responseObject.responseData.dataList;
                        $.each(listData, function (i, v) {
                            $("[data-jobType='" + v.refValue + "']").parent().attr({"data-refid":v.refId});
                        });
                        parameter.jobData=listData;
                    },
                    failed: function () {
                    }
                });
                return t;
            },
            getUserInfo:function(){
                //获取用户的相关信息
                var t = this;
                manageData.applyData({
                    port: ajaxPort.userInfo,
                    postData: {
                        customerId: parameter.customerId,
                        isValid: "1",
                        visitSiteId: parameter.visitSiteId,
                        firstResult: "0",
                        maxResult: "999",
                        isAuth:"1"
                    },
                    success: function (data) {
                        if (data.responseObject.responseData.dataList) {
                            t.dealFirst(data);
                        }
                    },
                    failed: function () {
                    }
                });
                return t;
            }
        };
        bridge.registerHandler('returnCustomerId', function (data, responseCallback) {
            // log('ObjC called testJavascriptHandler with', data);
            //     window.location.href = '//m.allinmed.cn/pages/app_native/authentication.html?customerId=' + JSON.parse(data).customerId+"&UrlTime="+timestamp;
            // var responseData = {'resourceUrl': '//m.allinmed.cn/pages/app_native/authentication.html?customerId=' + JSON.parse(data).customerId+"&UrlTime="+timestamp};
            parameter.customerId =JSON.parse(data).customerId;
            auth.init();
            // log('JS responding with', responseData)
            responseCallback(responseData)
        });
        /*$(".img-upload-submit").on("click", function () { ///////喵？

         });*/
        /*注册getNativeInfoHandler方法，Native调用此方法传递参数给JS*/
        bridge.registerHandler('getNativeInfoHandler',
            function (data, responseCallback) {
                // log('getNativeInfoHandler', data)
                var responseData = {'Javascript Says': 'Right back atcha!'}
                responseCallback(responseData)
            });
        /*注册getJSRegisterInfoHandler方法，Native调用此方法获取需要注册的本地组件信息*/
        bridge.registerHandler('getJSRegisterInfoHandler',
            function (data, responseCallback) {
                // log('ObjC called testJavascriptHandler with', data)
                var responseData = '{\"jsRegisterList\":[{\"scheme\":\"da-jxjy-app\",\"target\":\"Homepage\",\"action\":\"nativeHomepageViewController\",\"transformType\":\"0\"},{\"scheme\":\"da-jxjy-app\",\"target\":\"PaymentWeb\",\"action\":\"payTableViewController\",\"transformType\":\"1\"}]}'

                var responseData = {
                    'jsRegisterList': [{
                        'scheme': 'da-jxjy-app',
                        'target': 'Homepage',
                        'action': 'nativeHomepageViewController',
                        'transformType': '0'
                    }, {
                        'scheme': 'da-jxjy-app',
                        'target': 'PaymentWeb',
                        'action': 'payTableViewController',
                        'transformType': '1'
                    }]
                }

                // log('JS responding with', responseData)
                responseCallback(responseData)
            })

        // document.body.appendChild(document.createElement('br'))
        //
        // var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
        // callbackButton.innerHTML = 'Fire testObjcCallback'
        // callbackButton.onclick = function (e) {
        //     e.preventDefault()
        //     // log('JS calling handler "testObjcCallback"')
        //     /*
        //      JS端调用OC端注册的公开API nativeHomepageViewController
        //      1.nativeHomepageViewController：OC端注册的API name
        //      2.{'foo': 'bar'}：JS端调用testObjcCallback时，传入的参数
        //      3.function(response)：JS端调用完nativeHomepageViewController后，会提供一个回调函数，使OC端代码执行完后，有机会执行JS的一段代码
        //      */
        //     bridge.callHandler('aboutDialServiceNumber', {'mobile': '13552542393'}, function (response) {
        //         // log('JS got response', response)
        //     })
        // }
        //
        // var callbackButton = document.getElementById('buttons').appendChild(document.createElement('button'))
        // callbackButton.innerHTML = 'Fire testObjcCallback1'
        // callbackButton.onclick = function (e) {
        //     e.preventDefault();
        //     // log('JS calling handler "testObjcCallback1"')
        //     /*
        //      JS端调用OC端注册的公开API nativeHomepageViewController
        //      1.nativeHomepageViewController：OC端注册的API name
        //      2.{'foo': 'bar'}：JS端调用testObjcCallback时，传入的参数
        //      3.function(response)：JS端调用完nativeHomepageViewController后，会提供一个回调函数，使OC端代码执行完后，有机会执行JS的一段代码
        //      */
        //     bridge.callHandler('returnCommonParams', {'test': 'fengxia'}, function (response) {
        //         // log('JS got response', response)
        //     })
        // };
    })
});
