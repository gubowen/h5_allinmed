/**
 * @Desc：
 * @Usage:
 * {
 *      type:"city/hospital/disease/illness
 * }
 *
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/3/5
 */

modules.searchInput = function (obj) {
    var container = {
        init: function () {
            this.config = obj;
            this.searchContent();
        },
        template: {
            hospitalList: function (data) {
                return '<a class="searchResultItem" href="javascript:void(0)" data-level="4" data-id="' + data.id + '" data-address="' + data.hospitalName + '">' + data.hospitalName + '</a>';
            },
            cityList: function (data) {
                return '<a class="searchResultItem" href="javascript:void(0)" data-id="' + data.regionId + '">' + data.regionName + '</a>';
            },
            diseaseList: function (data) {
                return '<a class="searchResultItem" href="javascript:void(0)" data-id="' + data.illnessId + '">' + data.illnessName + '</a>';
            },
            illnessList: function (data) {
                return '<a class="searchResultItem" href="javascript:void(0)" data-id="' + data.operationId + '">' + data.operationName + '</a>';
            },
            partList: function (data) {
                return '<a class="searchResultItem partItem" href="javascript:void(0)" data-id="' + data.partId + '" data-level="'+data.treeLevel+'">' + data.partName + '</a>'
            },
            //医生列表
            doctorList: function (data) {
                return '<li class="searchDoctorItem">' +
                    '<div class="searchDoctor-l">' +
                    '<a href="//m.allinmed.cn/pages/myServices/doc_main.html?caseType=2&caseId='+common.getpara().caseId+'&patientId='+common.getpara().patientId+'&type=0&customerId='+data.authMap.customerId+'"><img src="'+ (data.logoUrlMap.logoUrl || '/image/img00/doctorMain/doc_logo.png') +'" alt="医生头像"></a>' +
                    '</div>' +
                    '<div class="searchDoctor-r" data-medicalTitle="'+ data.authMap.medicalTitle +'" data-name="'+ data.authMap.fullName +'" data-doctorId="'+ data.authMap.customerId +'" data-hospital="'+ data.authMap.company +'" data-hospitalId="'+ data.authMap.companyId +'">' +
                    '<div class="searchDoctorInfo">' +
                    '<span class="searchDoctorName">'+ data.authMap.fullName +'</span>' +
                    '<span class="searchDoctorPost">' + data.authMap.medicalTitle + '</span>' +
                    '</div>' +
                    '<p class="searchDoctorHospital">'+ data.authMap.company +'</p>' +
                    '<p class="searchDoctorGood">' + (function () {
                        var tempHtml = '';
                        if (data.illnessMapList.length){
                            $.each(data.illnessMapList,function (index,element) {
                                tempHtml += element["illnessName"] + "、"
                            });
                            tempHtml = tempHtml.substr(0,tempHtml.length-1)
                        }
                        return tempHtml;
                    })() + '</p>' +
                    '</div>' +
                    '</li>';
            },
            //景荣进来的医生列表DOm
            doctorListTwo: function (data) {
                return '<li class="searchDoctorItem">' +
                    '<a href="//m.allinmed.cn/pages/myServices/doc_main.html?caseType=0&customerId='+data.authMap.customerId+ (common.getpara().caseId?('&caseId='+common.getpara().caseId):'') + (common.getpara().patientId?('&patientId='+common.getpara().patientId):'') +(common.getpara().patientCustomerId?('&patientCustomerId='+common.getpara().patientCustomerId):'') +'"><div class="searchDoctor-l">' +
                    '<img src="'+ (data.logoUrlMap.logoUrl || '/image/img00/doctorMain/doc_logo.png') +'" alt="医生头像">' +
                    '</div>' +
                    '<div class="searchDoctor-r" data-medicalTitle="'+ data.authMap.medicalTitle +'" data-name="'+ data.authMap.fullName +'" data-doctorId="'+ data.authMap.customerId +'" data-hospital="'+ data.authMap.company +'" data-hospitalId="'+ data.authMap.companyId +'">' +
                    '<div class="searchDoctorInfo">' +
                    '<span class="searchDoctorName">'+ data.authMap.fullName +'</span>' +
                    '<span class="searchDoctorPost">' + data.authMap.medicalTitle + '</span>' +
                    '</div>' +
                    '<p class="searchDoctorHospital">'+ data.authMap.company +'</p>' +
                    '<p class="searchDoctorGood">' + (function () {
                        var tempHtml = '';
                        if (data.illnessMapList.length){
                            $.each(data.illnessMapList,function (index,element) {
                                tempHtml += element["illnessName"] + "、"
                            });
                            tempHtml = tempHtml.substr(0,tempHtml.length-1)
                        }
                        return tempHtml;
                    })() + '</p>' +
                    '</div></a>' +
                    '</li>';
            },
            addResult: function () {
                return '<section class="no-result-item-add">' +
                    '<textarea class="add-result-item"></textarea>' +
                    '<button class="btn-primary unable add-result-item-btn" disabled="disabled">保存</button>' +
                    '</section>';
            }
        },
        XHRList: {
            cityList: "/mcall/comm/data/baseinfo/v1/getRegionList/",
            diseaseList: "/mcall/cms/part/illness/relation/v1/getMapList/",
            hospitalList: "/mcall/comm/data/baseinfo/v1/getHospitalList/",
            illnessList: "/mcall/cms/part/operation/relation/v1/getMapList/",
            partList: "/mcall/comm/data/part/v1/getMapSearchList/"
        },
        searchContent: function () {
            var that = this;
            $("body").on("focus", ".tc-searchCommInput", function (e) {
                $(".ev-initList").hide();
                $(".ev-searchList").show();
            });
            $("body").on("blur", ".tc-searchCommInput", function (e) {
                if ($(".tc-searchCommInput").val().length){
                    return;
                }
                if (!$(".tc-search-noResult").is(":visible")) {
                    setTimeout(function () {
                        $(".ev-initList").show();
                        $(".ev-searchList").hide();
                    },300)
                }
            });
            $("body").off("input propertychange").on("input propertychange", ".tc-searchCommInput", function (e) {
                // var t = this;
                // console.log($(this).val().length)
                // if ($(this).val().length === 0) {
                //     $(".ev-initList").show();
                //     $(".ev-searchList").hide();
                //     $(".tc-search-noResult").hide();
                // } else {
                //     clearTimeout(that.i);
                //     that.i = setTimeout(function () {
                //         if ($(t).val().length === 0) {
                //             return false;
                //         } else {
                //             $(".ev-initList").hide();
                //             $(".ev-searchList").show();
                //             that.getSearchResult(that.config.data);
                //         }
                //     }, 300);
                // }
                that.inputSearch(this);
            });
            $("body").on("compositionstart", ".tc-searchCommInput", function (e) {
                $("body").off("input propertychange",".tc-searchCommInput");
            });
            $("body").on("compositionend", ".tc-searchCommInput", function (e) {
                // var t = this;
                // console.log($(this).val().length)
                // if ($(this).val().length === 0) {
                //     $(".ev-initList").show();
                //     $(".ev-searchList").hide();
                //     $(".tc-search-noResult").hide();
                // } else {
                //     clearTimeout(that.i);
                //     that.i = setTimeout(function () {
                //         if ($(t).val().length === 0) {
                //             return false;
                //         } else {
                //             $(".ev-initList").hide();
                //             $(".ev-searchList").show();
                //             that.getSearchResult(that.config.data);
                //         }
                //     }, 300);
                // }
                that.inputSearch(this);
                $("body").on("input propertychange", ".tc-searchCommInput", function (e) {
                    // var t = this;
                    // console.log($(this).val().length)
                    // if ($(this).val().length === 0) {
                    //     $(".ev-initList").show();
                    //     $(".ev-searchList").hide();
                    //     $(".tc-search-noResult").hide();
                    // } else {
                    //     clearTimeout(that.i);
                    //     that.i = setTimeout(function () {
                    //         if ($(t).val().length === 0) {
                    //             return false;
                    //         } else {
                    //             $(".ev-initList").hide();
                    //             $(".ev-searchList").show();
                    //             that.getSearchResult(that.config.data);
                    //         }
                    //     }, 300);
                    // }
                    that.inputSearch(this);
                });
            });
        },
        //input 搜索事件
        inputSearch:function (current) {
            var that = this;
            var t = current;
            if ($(current).val().length === 0) {
                $(".ev-initList").show();
                $(".ev-searchList").hide();
                $(".tc-search-noResult").hide();
            } else {
                clearTimeout(that.i);
                that.i = setTimeout(function () {
                    if ($(t).val().length === 0) {
                        return false;
                    } else {
                        $(".ev-initList").hide();
                        $(".ev-searchList").show();
                        that.getSearchResult(that.config.data);
                    }
                }, 300);
            }
        },
        getSearchResult: function () {
            var that = this;
            $.ajax({
                url: this.config.XHR,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                async: false,
                data: {
                    paramJson: $.toJSON($.extend(this.config.data, {[that.config.input.searchName]: this.config.input.inputEle.val()}))
                },
                beforeSend: function () {
                    common.loading.show();
                }
            })
                .done(function (data) {
                    var list = [];
                    if (data.responseObject.responseData) {

                        var dataList = data.responseObject.responseData.dataList;
                        if (dataList && dataList.length !== 0) {
                            $(".tc-search-noResult").hide();
                            obj.container.children().remove();
                            $(dataList).each(function (index, element) {
                                if (that.config.source){
                                    obj.container.append(that.template["doctorListTwo"](element));

                                } else{
                                    obj.container.append(that.template[that.config.type + "List"](element));
                                }
                            });
                            that.config.successCallback && that.config.successCallback();
                            that.searchResultHighLight();
                        } else {
                            obj.container.children().remove();
                            $(".ev-initList").hide();

                            if (that.config.type === "disease" || that.config.type === "hospital" || that.config.type === "illness") {
                                that.noResultAdd();
                            } else {
                                if (that.config.input.searchName==="partName"){
                                    $(".ev-initList[data-role='partList']").siblings(".ev-searchList").append('<section class="tc-search-noResult" style="display: block;">' +
                                        '<p>暂未搜索到相关部位信息</p>' +
                                        '</section>' );
                                } else if (that.config.type === "doctor") {
                                    $(".ev-searchList").append('<section class="tc-search-noResult" style="display: block;">' +
                                        '<p>暂未搜索到相关医生、医院信息</p>' +
                                        '</section>' );
                                }
                            }
                            that.config.noResultCallback && that.config.noResultCallback();
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {

                });
        },
        searchResultHighLight: function () {
            var that = this;
            if (that.config.type === "doctor") {
                $(".ev-searchList .searchDoctorName").each(function (index, ele) {
                    var input = $('.tc-searchCommInput').val(),
                        place1 = $(ele).text().toLowerCase().indexOf(input.toLowerCase());
                    if (place1 != "-1") {
                        var replace1 = $(ele).text().splice(place1, 0, '<em>'),
                            result = replace1.splice(place1 + 4 + input.length, 0, '</em>');
                        $(ele).html(result);
                    }
                });
                $(".ev-searchList .searchDoctorHospital").each(function (index, ele) {
                    var input = $('.tc-searchCommInput').val(),
                        place1 = $(ele).text().toLowerCase().indexOf(input.toLowerCase());
                    if (place1 != "-1") {
                        var replace1 = $(ele).text().splice(place1, 0, '<em>'),
                            result = replace1.splice(place1 + 4 + input.length, 0, '</em>');
                        $(ele).html(result);
                    }
                });
            } else {
                $(".ev-searchList .searchResultItem").each(function (index, ele) {
                    var input = $('.tc-searchCommInput').val(),
                        place1 = $(ele).text().toLowerCase().indexOf(input.toLowerCase());
                    if (place1 != "-1") {
                        var replace1 = $(ele).text().splice(place1, 0, '<em>'),
                            result = replace1.splice(place1 + 4 + input.length, 0, '</em>');
                        $(ele).html(result);
                    }
                });
            }
        },
        noResultAdd: function () {
            var that = this;
            $(".tc-search-noResult").show();
            $(".tc-mainInner").on("click", "#ev-addResult", function () {
                $(".no-result-item-add").remove();
                $(".tc-searchContentInner").hide();
                $(this).parents(".tc-searchMain").append(that.template.addResult());
                that.addResult();
            })
        },
        addResult: function () {
            var that = this;
            $(".add-result-item").on("input", function () {
                if ($(this).val().length === 0) {
                    $(".add-result-item-btn").addClass("unable").attr("disabled","disabled");
                } else {
                    $(".add-result-item-btn").removeClass("unable").removeAttr("disabled");
                }
            });
        }
    };
    container.init();
};
