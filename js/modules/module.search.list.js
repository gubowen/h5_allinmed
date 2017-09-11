/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/3/2
 */
modules.searchList = function (obj) {
    var container = {
        init: function () {
            this.config = obj;
            this.element = obj.targetEle;
            this.switchSearchList();
        },
        template: {
            mainInner: function (data) {
                return '<section class="search-box tc-mainInner" data-alcode-mod="'+ data.alcode +'" data-alcode-item-selector=".searchResultItem,.searchDoctorItem">' +
                    '<section class="tc-searchCommFixedTop">' +
                    '<div class="tc-searchCommTop">' +
                    '<i class="tc-searchBtnPic"></i><input class="tc-searchCommInput" type="text" placeholder="请填写医院的名称">' +
                    '</div>' +
                    '</section>' +
                    '<section class="tc-searchMain">' +
                    '<section class="tc-search-noResult">' +
                    '<p>暂未搜索到相关疾病信息</p>' +
                    '<span class="icon-addResult" id="ev-addResult"><em>去添加</em></span>' +
                    '</section>' +
                    '<section class="tc-searchContentInner ev-initList">' +
                    '<header class="tc-searchDocArea">' +
                    '<i class="tc-searchDocAreaLeft" style="display: none;"></i><span class="tc-searchAreaName">' + data.header + '</span>' +
                    ' </header>' +
                    //    Lists...
                    '</section>' +
                    '<section class="tc-searchContentInner ev-searchList">' +
                    '</section>' +
                    '</section>' +
                    '</section>';
            },
            diseaseList: function (data,param) {
                return '<a class="searchResultItem" href="javascript:void(0)" data-id="' + data.illnessId + '" data-partId="'+param.partId+'" data-partName="'+param.partName+'">' + data.illnessName + '</a>';
            },
            illnessList: function (data) {
                return '<a class="searchResultItem" href="javascript:void(0)" data-id="' + data.operationId + '" >' + data.operationName + '</a>';

                //以下为二级结构……喵喵喵？？？
                // return '<section class="searchResult">' +
                //     '<header class="searchResultTitle" id="' + data.operationId + '">' + data.operationName + '</header>' +
                //     (function (sData) {
                //         var result = "";
                //         $(sData).each(function (index, element) {
                //             result += '<a class="searchResultItem" href="javascript:void(0)" data-id="' + element.operationId + '" data-partid="' + data.partId + '">' + element.operationName + '</a>';
                //         });
                //         return result;
                //     }(data.children)) +
                //     '</section>';
            },
            hospitalList: function (data) {
                return '<a class="searchResultItem" href="javascript:void(0)" data-id="' + data.id + '" data-address="' + data.hospitalAddress + '">' + data.hospitalName + '</a>';
            },
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
            //推荐医生列表DOm
            doctorListThree: function (data) {
                return '<li class="searchDoctorItem">' +
                    '<a href="//m.allinmed.cn/pages/myServices/doc_main.html?caseType=0&customerId='+data.customerId+ (common.getpara().caseId?('&caseId='+common.getpara().caseId):'') + (common.getpara().patientId?('&patientId='+common.getpara().patientId):'') +(common.getpara().patientCustomerId?('&patientCustomerId='+common.getpara().patientCustomerId):'') +'"><div class="searchDoctor-l">' +
                    '<img src="'+ (data.logoUrl || '/image/img00/doctorMain/doc_logo.png') +'" alt="医生头像">' +
                    '</div>' +
                    '<div class="searchDoctor-r" data-medicalTitle="'+ data.medicalTitle +'" data-name="'+ data.fullName +'" data-doctorId="'+ data.customerId +'" data-hospital="'+ data.company +'" data-hospitalId="'+ data.companyId +'">' +
                    '<div class="searchDoctorInfo">' +
                    '<span class="searchDoctorName">'+ data.fullName +'</span>' +
                    '<span class="searchDoctorPost">' + data.medicalTitle + '</span>' +
                    '</div>' +
                    '<p class="searchDoctorHospital">'+ data.company +'</p>' +
                    '<p class="searchDoctorGood">' + data.illnessNameList + '</p>' +
                    '</div></a>' +
                    '</li>';
            },
            doctorFooter: function () {
                return '<footer class="searchFooter">' +
                    '<div class="searchItem searchCity active"><span>按城市</span></div>' +
                    '<div class="searchItem searchOffice"><span>按科室</span></div>' +
                    '</footer>';
            },
            partList: function (data, pid) {
                return '<a class="searchResultItem partItem" href="javascript:void(0)" data-id="' + data.partId + '" data-level="' + data.treeLevel + '" data-pid="' + pid + '">' + data.partName + '</a>';
            }
        },
        XHRList: {
            cityList: "/mcall/comm/data/baseinfo/v1/getRegionList/",
            diseaseList: "/mcall/cms/part/illness/relation/v1/getMapList/",
            hospitalList: "/mcall/comm/data/baseinfo/v1/getHospitalList/",
            illnessList: "/mcall/cms/part/operation/relation/v1/getMapList/",
            doctorList: "/mcall/customer/auth/v1/getMapList/",//搜索医生的接口
            partList: "/mcall/comm/data/part/v1/getMapSearchList/",
            recommendDoctor:"/mcall/patient/recommend/v1/getMapList/"//推荐医生
        },
        switchSearchList: function () {

            switch (this.config.type) {
                case "city":
                    //参数Level:外部传入决定第一级为省/市
                    this.searchCity({
                        id: "",
                        level: this.config.level,
                        header: "选择城市",
                        alcode: 606
                    });
                    this.selectCity();

                    // modules.searchInput({
                    //     container: $(".ev-searchList"),
                    //     XHR: this.XHRList.cityList,
                    //     type: "city",
                    //     data: {
                    //         isValid: "1",
                    //         firstResult: "0",
                    //         maxResult: "20",
                    //     },
                    //     input: {
                    //         searchName: "regionName",
                    //         inputEle: $(".tc-searchCommInput")
                    //     },
                    //     successCallback: this.config.successCallback,
                    //     noResultCallback: this.config.noResultCallback
                    // });
                    $(".tc-searchCommTop").remove();
                    $(".tc-searchMain").css("padding-top", 0);
                    break;
                case "hospital":
                    this.searchCity({
                        id: "",
                        level: "3",
                        header: "选择医院所在城市",
                        alcode: 615
                    });
                    this.selectCity();

                    $(".tc-search-noResult > p").text("暂未搜索到相关医院信息");
                    $(".tc-searchCommInput").attr("placeholder", "请填写医院的名称");
                    $(".tc-searchCommTop").remove();
                    $(".tc-searchMain").css("padding-top", 0);
                    break;
                case "disease":
                    this.searchPartList({
                        level: 2,
                        alcode: 609
                    });


                    $(".tc-searchCommInput").attr("placeholder", "请填写部位的名称");
                    break;
                case "illness":
                    this.searchPartList({
                        level: 2,
                        alcode: 611
                    });
                    modules.searchInput({
                        container: $(".ev-searchList"),
                        type: "part",
                        XHR: this.XHRList.partList,
                        data: {
                            isValid: "1",
                            firstResult: "0",
                            maxResult: "1000",
                        },
                        input: {
                            searchName: "partName",
                            inputEle: $(".tc-searchCommInput")
                        },
                        successCallback: this.config.successCallback,
                        noResultCallback: this.config.noResultCallback
                    });

                    $(".tc-search-noResult > p").text("暂未搜索到相关手术信息");
                    $(".tc-searchCommInput").attr("placeholder", "请填写部位的名称");
                    break;
                case "doctor"://搜寻医生的步骤
                    this.searchDoctorList();
                    var data = {
                        container: $(".ev-searchList"),
                        type: "doctor",
                        XHR: this.XHRList.doctorList,
                        data: {
                            isValid: "1",
                            firstResult: "0",
                            maxResult: "9999",
                            state:"2",
                            logoUseFlag:3
                        },
                        input: {
                            searchName: "fullNameOrCompany",
                            inputEle: $(".tc-searchCommInput")
                        },
                        successCallback: this.config.successCallback,
                        noResultCallback: this.config.noResultCallback
                    };
                    this.config.source && $.extend(data,{"source":this.config.source});
                    modules.searchInput(data);
                    break;
            }
        },
        //搜索省市区...
        searchCity: function (data) {
            $("body").append(this.template.mainInner({
                header: data.header,
                alcode: data.alcode
            }));
            setTimeout(function () {
                $(".search-box").addClass("show");
            }, 100);
            $.ajax({
                url: this.XHRList.cityList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                // async: false,
                data: {
                    paramJson: $.toJSON({
                        parentId: data.id,
                        isValid: "1",
                        firstResult: "0",
                        maxResult: "9999",
                        treeLevel: data.level //1国2省3市4区
                    })
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
                            $(".he-main").hide();
                            $(".tc-mainInner").css("position", "static")
                            $(dataList).each(function (index, element) {
                                var item = {
                                    name: element.regionName,
                                    id: element.regionId,
                                    level: element.treeLevel
                                };
                                list.push(item);
                            });
                            new firstLetterPosition(list);
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {
                    common.loading.hide();
                });
        },
        //搜索医院...
        searchHospitalList: function (data) {
            var that = this;
            $("body").append(this.template.mainInner({
                header: data.header,
                alcode: data.alcode
            }));
            setTimeout(function () {
                $(".search-box").addClass("show");
            }, 100);
            modules.searchInput({
                container: $(".ev-searchList"),
                type: "hospital",
                XHR: this.XHRList.hospitalList,
                data: {
                    isValid: "1",
                    firstResult: "0",
                    maxResult: "9999",
                    cityId: data.id,
                },
                input: {
                    searchName: "hospitalName",
                    inputEle: $(".tc-searchCommInput")
                },
                successCallback: this.config.successCallback,
                noResultCallback: this.config.noResultCallback,
            });

                $(".tc-search-noResult > p").text("暂未搜索到相关医院信息");

            $.ajax({
                url: this.XHRList.hospitalList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                async: true,
                data: {
                    paramJson: $.toJSON({
                        cityId: data.id,
                        isValid: "1",
                        firstResult: "0",
                        maxResult: "9999",
                        treeLevel: data.level //1国2省3市4区
                    })
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
                            $(".he-main").hide();
                            $(".tc-mainInner").css("position", "static")
                            $(dataList).each(function (index, element) {
                                $(".ev-initList").append(that.template.hospitalList(element));
                            });
                            that.selectHospital();
                            that.addResult(function () {
                                $("#ev-go-to-select-hospital,.disease-info-item-right.hospital").addClass("selected");
                                Q.go("index");

                            });
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {
                    common.loading.hide();
                });
        },
        //获取部位列表
        searchPartList: function (param) {
            var that = this;
            if (this.config.type==="illness"){
                if (param.level==2){
                    $("body").append(this.template.mainInner({
                        header: " 请先选择需要手术的部位",
                        alcode: param.alcode
                    }));
                }else{
                    $("body").append(this.template.mainInner({
                        header: " 请确认需要手术的部位",
                        alcode: param.alcode
                    }));
                }

            }else {
                $("body").append(this.template.mainInner({
                    header: "请先选择您的患病部位",
                    alcode: param.alcode
                }));
            }

            setTimeout(function () {
                $(".search-box").addClass("show");
            }, 100);

            modules.searchInput({
                container: $(".ev-searchList"),
                type: "part",
                XHR: this.XHRList.partList,
                data: {
                    isValid: "1",
                    firstResult: "0",
                    maxResult: "9999",
                    treeLevel: param.level
                },
                input: {
                    searchName: "partName",
                    inputEle: $(".tc-searchCommInput")
                },
                successCallback: this.config.successCallback,
                noResultCallback: this.config.noResultCallback
            });
            $.ajax({
                url: this.XHRList.partList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                data: {
                    paramJson: $.toJSON({
                        isValid: "1",
                        firstResult: "0",
                        maxResult: "1000",
                        parentId: param && param.id,
                        treeLevel: param && param.level
                    })
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
                            console.log(dataList)
                            $(dataList).each(function (index, element) {
                                param ? $(".ev-initList").append(that.template.partList(element, param.id)) : $(".ev-initList").append(that.template.partList(element));
                                $(".ev-initList").attr("data-role", "partList");
                            });
                            that.selectPart();
                        }
                    }
                    common.loading.hide();
                })
                .fail(function () {
                    common.loading.hide();
                });
        },
        //搜索疾病
        searchDiseaseList: function (param) {
            var that = this;
            $("body").append(this.template.mainInner({
                header: "选择所患疾病",
                alcode: param.alcode
            }));
            setTimeout(function () {
                $(".search-box").addClass("show");
            }, 100);
            modules.searchInput({
                container: $(".ev-searchList"),
                type: "disease",
                XHR: that.XHRList.diseaseList,
                data: {
                    isValid: "1",
                    firstResult: "0",
                    maxResult: "9999",
                    partId: param.partId
                },
                input: {
                    searchName: "illnessNameQuery",
                    inputEle: $(".tc-searchCommInput").eq(1)
                },
                successCallback: that.config.successCallback,
                noResultCallback: that.config.noResultCallback
            });

            $.ajax({
                url: this.XHRList.diseaseList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                data: {
                    paramJson: $.toJSON({
                        isValid: "1",
                        firstResult: "0",
                        maxResult: "9999",
                        partId: param.partId
                    })
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
                            $(dataList).each(function (index, element) {
                                $(".ev-initList").append(that.template.diseaseList(element, param));
                            });
                        }
                    }

                    that.selectDisease();
                    that.addResult(function () {
                        $("#ev-go-to-select-disease,.disease-info-item-right.disease").addClass("selected");
                        Q.go("index");
                    });
                    $(".tc-search-noResult > p").text("暂未搜索到相关疾病信息");

                    common.loading.hide();
                })
                .fail(function () {
                    common.loading.hide();
                });
        },
        //搜索手术...
        searchIllenssList: function (param) {
            var lData = param;
            $("body").append(this.template.mainInner({
                header: "选择手术",
                alcode: param.alcode
            }));

            setTimeout(function () {
                $(".search-box").addClass("show");
            }, 100);
            modules.searchInput({
                container: $(".ev-searchList"),
                type: "illness",
                XHR: this.XHRList.illnessList,
                data: {
                    isValid: "1",
                    firstResult: "0",
                    maxResult: "1000",
                    partId: param.partId
                },
                input: {
                    searchName: "operationNameQuery",
                    inputEle: $(".tc-searchCommInput").eq(2)
                },
                successCallback: this.config.successCallback,
                noResultCallback: this.config.noResultCallback
            });
            var that = this;
            $.ajax({
                url: this.XHRList.illnessList,
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                data: {
                    paramJson: $.toJSON({
                        isValid: param.isValid,
                        firstResult: param.firstResult,
                        maxResult: param.maxResult,
                        partId: param.partId
                    })
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
                            $(dataList).each(function (index, element) {
                                $(".ev-initList").append(that.template.illnessList($.extend(element, {partId: param.partId})));
                            });
                            that.selectIllness(lData.partIId);
                        }
                    }
                    that.addResult(function () {
                        $("#ev-go-to-select-disease,.operationName .show").addClass("selected");
                        Q.go("index");
                    });
                    $(".tc-search-noResult > p").text("暂未搜索到相关手术信息");
                    common.loading.hide();
                })
                .fail(function () {
                    common.loading.hide();
                });
        },
        //搜索医生...
        searchDoctorList: function (data) {
            var that = this;
            document.title = "查找医生";
            $("body").append(this.template.mainInner({
                header: "选择医生",
                alcode: 614
            }));
            $(".tc-searchCommInput").attr("placeholder", "请输入医生姓名、医院");
            that.config.beforeFun?that.config.beforeFun():setTimeout(function () {$(".search-box").addClass("show");}, 100);
            window.scrollTo(0,0);
            // //请求医生列表起始参数
            that.config.firstResult = 0;
            // //医生列表是否还有数据
            that.config.hasDoctor = true;
            //医生列表懒加载
            if(that.config.source){
                if(that.config.select){
                    that.doctorScroll();
                }else{
                    that.config.recommendDoctor = [];
                    that.getRecommendDoctor();
                }
            }else {
                that.doctorScroll();
            }
            $(window).on("scroll", function () {
                // console.log($(".search-box").height());
                // console.log($(window).scrollTop() + jQuery(window).height());
                // console.log($(".searchDoctorItem").eq(0).height());
                // console.log($(".search-box").height() - Math.round($(".searchDoctorItem").eq(0).height()));
                // console.log($(window).scrollTop() + jQuery(window).height());
                if (that.config.hasDoctor == true && ($(".ev-initList").is(':visible'))) {
                    if ($(".search-box").height()== $(window).scrollTop() + jQuery(window).height()) {
                        that.config.hasDoctor = false;
                        that.doctorScroll();
                    }
                } else {
                    // $(window).off("scroll");
                }
            });
        },
        //医生列表懒加载
        doctorScroll:function () {
            var that =this;
            $.ajax({
                url:that.XHRList.doctorList ,//this.XHRList.cityList,//先用城市的接口代替测试
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                data: {
                    paramJson: $.toJSON({
                        // parentIdStr: data.id,
                        // customerId:1489998833435,
                        isValid: "1",
                        firstResult: that.config.firstResult,
                        // firstResult: "0",
                        maxResult: "20",
                        state:"2",
                        logoUseFlag:3
                        // fullNameOrCompany:"郭"
                        // treeLevel: 1 //1国2省3市4区
                    })
                },
                beforeSend: function () {
                    common.loading.show();
                    console.log("请求数据了！！");
                    // $(".ev-initList").hide();
                }
            })
                .done(function (data) {
                    console.log(data);
                    if (data.responseObject) {
                        $(".he-main").hide();
                        $(".tc-mainInner").css("position", "static");
                        // window.scrollTo(0,0);
                        var dataList = data.responseObject.responseData.dataList;
                        if (dataList && dataList.length !== 0) {
                            that.config.hasDoctor = true;
                            that.config.firstResult += 20;
                            // $.each(dataList, function (index, element) {
                            //     if (that.config.source) {
                            //         $(".ev-initList").append(that.template.doctorListTwo(element));//循环添加医生列表,来源页，景荣的
                            //     } else {
                            //         $(".ev-initList").append(that.template.doctorList(element));//循环添加医生列表
                            //         $(".ev-initList").show();
                            //     }
                            // });
                            if (that.config.source) {
                                $.each(dataList, function (index, element) {
                                    if (that.config.recommendDoctor && that.config.recommendDoctor.length && that.config.recommendDoctor.indexOf(element.authMap.customerId) != -1){
                                        that.config.recommendDoctor.splice(that.config.recommendDoctor.indexOf(element.authMap.customerId),1);
                                        return;
                                    }
                                    $(".ev-initList").append(that.template.doctorListTwo(element));//循环添加医生列表,来源页，景荣的
                                });
                                // that.getRecommendDoctor();
                            } else {
                                $(".ev-initList").show();
                                $.each(dataList, function (index, element) {
                                    $(".ev-initList").append(that.template.doctorList(element));//循环添加医生列表
                                });
                                that.selectDoctor();
                                common.loading.hide();
                            }
                            common.loading.hide();
                            // that.config.source?that.getRecommendDoctor():that.selectDoctor();//选择医生
                        } else {
                            that.config.hasDoctor = false;
                            common.loading.hide();
                        }
                        $(".ev-initList").show();
                    }
                    if ($(".searchFooter").length == 0) {
                        //底部筛选条件一期先不做
                        // $("body").append(that.template.doctorFooter());//添加搜寻医生筛选条件底部
                    } else {
                        $(".searchFooter").show();
                    }
                    //底部筛选条件一期先不做
                    // that.searchFootChange();//选择医生底部的点击事件
                })
                .fail(function () {
                    common.loading.hide();
                });
        },
        //获取推荐医生
        getRecommendDoctor:function () {
            var that = this;
            $.ajax({
                url:that.XHRList.recommendDoctor ,//this.XHRList.cityList,//先用城市的接口代替测试
                type: 'POST',
                dataType: "json",
                timeout: 10000,
                data: {
                    paramJson: $.toJSON({
                        diagnosisId:common.getpara().diagnosisId,
                        isValid:1,
                        firstResult:0,
                        maxResult:9999,
                        sortType:1})
                },
                beforeSend: function () {
                    common.loading.show();
                    $(".ev-initList").hide();
                    // console.log("请求数据了！！");
                }
            }).done(function (data) {
                if (data.responseObject.responseStatus){
                    if (data.responseObject.responseData.dataList) {
                        var dataList = data.responseObject.responseData.dataList;
                        console.log(dataList);
                        //之前的思路
                        // var dataListTemp = [];
                        // $.each(dataList,function (index,element) {
                        //     dataListTemp.unshift(element);
                        // });
                        // console.log(dataListTemp);
                        // $.each(dataListTemp,function (index,element) {
                        //     $(".searchDoctorItem").eq(0).before($(".searchDoctor-r[data-doctorId="+ element.customerId +"]").closest("li"))
                        // });
                        //之后的思路，先添加推荐医生DOM
                        $.each(dataList, function (index, element) {
                            $(".ev-initList").append(that.template.doctorListThree(element));//循环添加医生列表,来源页，景荣的
                            that.config.recommendDoctor.push(element.customerId);
                        });
                    }
                    // common.loading.hide();
                    that.doctorScroll();
                    // $(".ev-initList").show();
                }
            })
        },
        //选择医生底部的点击事件，底部筛选条件一期先不做
        searchFootChange: function () {
            $(".searchFooter").off("click").on("click", ".searchItem", function () {
                $(".searchItem").removeClass("active");
                $(this).addClass("active");
            })
        },
        //选择省市区...
        selectCity: function () {
            var that = this;
            var cityObj = {};
            //若为选择到指定的最后一级则继续搜索...
            $("body").off("click").on("click", ".searchResultItem", function () {
                $(window).scrollTop(0);
                //已到目标层级,目标元素获取信息...
                if (that.config.type === "city") {
                    switch (parseInt($(this).attr("data-level"))) {
                        case 2:
                            $.extend(cityObj, {
                                province: $(this).text(),
                                provinceId: $(this).attr("data-id"),
                            });
                            break;
                        case 3:
                            $.extend(cityObj, {
                                city: $(this).text(),
                                cityId: $(this).attr("data-id"),
                            });
                            break;
                        case 4:
                            $.extend(cityObj, {
                                district: $(this).text(),
                                districtId: $(this).attr("data-id"),
                            });
                            break;
                            $(".tc-searchCommInput").attr("placeholder", "请填写城市的名称");
                    }
                    if (parseInt($(this).attr("data-level")) === parseInt(that.config.finalLevel)) {
                        that.targetGetMessage($.extend(cityObj, {name: cityObj.province + " " + cityObj.city + " " + (cityObj.district ? cityObj.district : "")}));
                        that.hideSearchList();
                        $(".he-main").show();
                        $(".searchTypeSelect").children().remove();
                        if (that.config.back) {
                            Q.go(that.config.back);
                        } else {
                            Q.go('index');
                        }
                        that.config.backCallback && that.config.backCallback()
                        $(".tc-searchCommInput").attr("placeholder", "请填写城市的名称");
                    } else {
                        $(".tc-mainInner").remove();
                        $(".searchTypeSelect").children().remove();
                        that.searchCity({
                            id: $(this).attr("data-id"),
                            level: parseInt($(this).attr("data-level")) + 1,
                            header: $(this).text(),
                            alcode: ($(this).attr("data-level") == 2 ? 607:608)//动态添加埋点的模块
                        });
                        $(".tc-searchCommTop").remove();
                        $(".tc-searchMain").css("padding-top", 0);
                    }
                } else if (that.config.type === "hospital") {
                    if (parseInt($(this).attr("data-level")) === 4) {
                        that.targetGetMessage({
                            name: $(this).text(),
                            id: $(this).attr("data-id"),
                            address: $(this).attr("data-address")
                        });
                        that.hideSearchList();
                        $(".he-main").show();
                        if (that.config.back) {
                            Q.go(that.config.back);
                        } else {
                            Q.go('index');
                        }
                        that.config.backCallback && that.config.backCallback()
                    } else {
                        $(".tc-mainInner").remove();
                        $(".searchTypeSelect").children().remove();
                        that.searchHospitalList({
                            header: $(this).text(),
                            id: $(this).attr("data-id"),
                            alcode: 616
                        })
                    }
                }
            })
        },
        //选择医院...
        selectHospital: function () {
            var that = this;
            $("body").off("click").on("click", ".searchResultItem", function () {
                that.targetGetMessage({
                    name: $(this).text(),
                    id: $(this).attr("data-id"),
                    address: $(this).attr("data-address")
                });
                that.hideSearchList();
                $(".he-main").show();
                if (that.config.back) {
                    Q.go(that.config.back);
                } else {
                    Q.go('index');
                }
                that.config.backCallback && that.config.backCallback()
            })
        },
        //选择部位，联动疾病...
        selectPart: function () {
            var that = this;
            $("body").off("click").on("click", ".searchResultItem", function () {
                $(window).scrollTop(0);
                //不分场合，必须先搜疾病...
                if (that.config.type === "disease") {
                    that.searchDiseaseList({
                        isValid: "1",
                        firstResult: "0",
                        maxResult: "1000",
                        partId: $(this).attr("data-id"),
                        partName:$(this).text(),
                        alcode: 610
                    });
                    $(".tc-searchCommInput").attr("placeholder", "请填写疾病的名称");
                } else if (that.config.type === "illness") {
                    if (parseInt($(this).attr("data-level")) === 3) {
                        that.searchIllenssList({
                            isValid: "1",
                            firstResult: "0",
                            maxResult: "1000",
                            partId: $(this).attr("data-pid"),
                            partIId:$(this).attr("data-id"),
                            alcode: 613
                        });
                        $(".tc-searchCommInput").attr("placeholder", "请填写手术的名称");
                        if (that.config.type != "illness" &&that.config.backCallback) {
                            that.config.backCallback();
                        }
                    } else {
                        that.searchPartList({
                            isValid: "1",
                            firstResult: "0",
                            maxResult: "1000",
                            name: $(this).text(),
                            id: $(this).attr("data-id"),
                            level: 3,
                            alcode: 612
                        });
                        $(".tc-searchCommInput").attr("placeholder", "请填写部位的名称");
                        modules.searchInput({
                            container: $(".ev-searchList"),
                            type: "part",
                            XHR: that.XHRList.partList,
                            data: {
                                isValid: "1",
                                firstResult: "0",
                                maxResult: "9999",
                                treeLevel: 3,
                                parentId:$(this).attr("data-id"),
                            },
                            input: {
                                searchName: "partName",
                                inputEle: $(".tc-searchCommInput").eq(1)
                            },
                            successCallback: that.config.successCallback,
                            noResultCallback: that.config.noResultCallback
                        });
                    }



                }
            });
        },
        //选择疾病...
        selectDisease: function () {
            var that = this;

            $("body").off("click").on("click", ".searchResultItem", function () {
                $(window).scrollTop(0);
                //当前场景为搜索疾病...
                if (that.config.type === "disease") {
                    that.targetGetMessage({
                        name: $(this).text(),
                        id: $(this).attr("data-id"),
                        partName:$(this).attr("data-partName"),
                        partId:$(this).attr("data-partId")
                    });
                    that.hideSearchList();
                    if (that.config.back) {
                        Q.go(that.config.back);
                    } else {
                        Q.go('index');
                    }
                    that.config.backCallback && that.config.backCallback()
                } else if (that.config.type === "illness") {
                    //当前场景为搜索手术——疾病为先决条件...
                    that.searchIllenssList({
                        isValid: "1",
                        firstResult: "0",
                        maxResult: "9999",
                        illnessType: "2",
                        parentIdStr: $(this).attr("data-id"),
                    });

                }
            });

        },
        //选择手术...
        selectIllness: function (pId) {
            var that = this;
            $("body").off("click").on("click", ".searchResultItem", function () {
                $(window).scrollTop(0);
                that.targetGetMessage({
                    name: $(this).text(),
                    iId: $(this).attr("data-id"),
                    partId: pId
                });
                that.hideSearchList();
                if (that.config.back) {
                    Q.go(that.config.back);
                } else {
                    Q.go('index');
                }
                that.config.backCallback && that.config.backCallback()
            })
        },
        //选择医生...
        selectDoctor: function () {
            var that = this;
            var obj = {};
            $("body").off("click").on("click", ".searchDoctor-r", function () {
                that.targetGetMessage({
                    name: $(this).attr("data-name"),
                    doctorId: $(this).attr("data-doctorId"),
                    hospital: $(this).attr("data-hospital"),
                    medicalTitle: $(this).attr("data-medicalTitle"),
                    hospitalId: $(this).attr("data-hospitalId")
                });
                that.hideSearchList();
                $(".he-main").show();
                $(".searchFooter").hide();
                if (that.config.back) {
                    Q.go(that.config.back);
                } else {
                    Q.go('index');
                }
                $(window).off("scroll");
                that.config.backCallback && that.config.backCallback()
            })
        },
        //添加项目
        addResult: function (cb) {
            var that = this;
            $("body").on("click", ".add-result-item-btn", function () {

                that.targetGetMessage({
                    name: common.htmlToString($(".add-result-item").val()),
                    id: 0,
                });
                that.hideSearchList();
                $(".ev-fileUpHide").show();
                $(".searchTypeSelect .searchTypeSelectItem").remove();
                cb && cb();

                that.config.saveCallback&&that.config.saveCallback();
            })
        },
        //目标获取信息...
        targetGetMessage: function (data) {
            for (var i in data) {
                this.element.attr("data-" + i, data[i]);
            }
            this.element.text(data.name);
            setTimeout(function () {
                $(window).scrollTop($(".sticky-wrapper").outerHeight());
            }, 100);
        },
        //隐藏搜索页...
        hideSearchList: function () {
            $(".search-box").removeClass("show");
            $(".search-box").on("transitionend WebkitTransitionEnd", function () {
                $(this).remove();
            })
        },
    }

    container.init();
};
