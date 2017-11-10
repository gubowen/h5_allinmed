<template>
  <section class="main-inner symptom-list-wrapper">
    <section class="main-inner symptom-list ev-fileUpHide">
      <section class="tc-caseContentBox">
        <section id="ev-baseInfom" class="tc-baseInfo">
          <ul class="tc-baseInfoList">
            <li class="tc-baseInfoItem">
              <div class="tc-baseInfoItemLeft">
                <img :src="logoUrl">
              </div>
              <div class="tc-baseInfoItemRight">
                <span class="tc-baseInfoName">{{patientCasemap.patientName.length > 5 ? patientCasemap.patientName.substring(0, 5) + "..." : patientCasemap.patientName}}</span>
                <span class="tc-baseInfoSex"> {{patientCasemap.sexName}}</span>
                <span class="tc-baseInfoAge">{{patientCasemap.age}}  岁</span>
              </div>
            </li>
            <li class="tc-baseInfoItem">
              <div class="tc-baseInfoItemLeft">问诊日期</div>
              <div class="tc-baseInfoItemRight">{{caseTime}}</div>
            </li>
          </ul>
          <section class="tc-baseInfoItem">
            <div class="tc-baseInfoItemLeft">主诉</div>
            <div class="tc-baseInfoItemRight tc-recommendUserMain">{{patientCasemap.caseMain.caseMain}}</div>
          </section>
        </section>
        <section id="ev-mainSymptom" class="tc-caseDescribe tc-module">
          <section class="tc-caseDescribeTitle title"><h3>症状描述</h3></section>
          <ul class="tc-caseDescribeList">
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">不适部位</span>
              <span class="tc-caseDescribeItemRight tc-noRevice">{{partName}}</span>
            </li>
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">主要症状</span>
              <span class="tc-caseDescribeItemRight" @click="goToFixIllness">{{illnessName || "无"}}</span>
            </li>
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">持续时间</span>
              <span class="tc-caseDescribeItemRight" @click="goToFixIllnessTime">{{illnessTime}}</span>
            </li>
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">加重时间</span>
              <span class="tc-caseDescribeItemRight" @click="goToFixHeavyTime">{{heavyTime}}</span>
            </li>
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">其他症状</span>
              <span class="tc-caseDescribeItemRight" @click="goToFixComplication">{{complication || "无"}}</span>
            </li>
          </ul>
        </section>
        <section id="ev-nowHistory" class="tc-caseDescribe tc-module">
          <section class="tc-caseDescribeTitle title"><h3>现病史</h3></section>
          <ul class="tc-caseDescribeList">
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">曾就诊医院</span>
              <span class="tc-caseDescribeItemRight" id="ev-choose-hospital"
                    @click="goToSelectHospital">{{hospitalMessage.name || "无"}}</span>
            </li>
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">确诊疾病</span>
              <span class="tc-caseDescribeItemRight" id="ev-choose-disease"
                    @click="goToSelectDisease">{{diseaseMessage.name || "无"}}</span>
            </li>
            <li class="tc-caseDescribeItem ev-datumUpload">
              <span class="tc-caseDescribeItemLeft">检查资料</span>
              <span class="tc-caseDescribeItemRight tc-noRevice">&nbsp;&nbsp;</span>
              <ul class="imgList-box imgList1">
                <li class="tc-upLoadItemList success" v-for="(item,index) in imgList1">
                  <img alt="" @click="showBigImg(item,index,1)" :src="item.url">
                  <span class="tc-upLoadDel" style="cursor: pointer" @click="imgDelete(item,index,1)"
                        v-show="item.finish"></span>
                  <loading v-if="item.uploading"></loading>
                  <figure class="upload-fail" v-if="item.fail">
                    <p>重新上传</p>
                    <input class="ev-upLoadInput" accept="image/*" type="file"
                           @change="onFileChange($event,1,index)">
                  </figure>
                </li>
                <li class="ev-upLoadAdd" v-if="uploading1===false&&imgList1.length<9">
                  <input type="file" class="ev-upLoadInput" accept="image/*"
                         @change="onFileChange($event,1)">
                </li>
              </ul>
            </li>
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">患处照片</span>
              <span class="tc-caseDescribeItemRight tc-noRevice">&nbsp;&nbsp;</span>
              <ul class="imgList-box imgList2">
                <li class="tc-upLoadItemList success" v-for="(item,index) in imgList2">
                  <img alt="" @click="showBigImg(item,index,2)" :src="item.url">
                  <span class="tc-upLoadDel" style="cursor: pointer" @click="imgDelete(item,index,2)"
                        v-show="item.finish"></span>
                  <loading v-if="item.uploading"></loading>
                  <figure class="upload-fail" v-if="item.fail">
                    <p>重新上传</p>
                    <input class="ev-upLoadInput" accept="image/*" type="file"
                           @change="onFileChange($event,2,index)">
                  </figure>
                </li>
                <li class="ev-upLoadAdd" v-if="uploading2 ===false&&imgList2.length<9">
                  <input type="file" class="ev-upLoadInput" accept="image/*"
                         @change="onFileChange($event,2)">
                </li>
              </ul>
            </li>
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">服用药物</span>
              <span class="tc-caseDescribeItemRight" @click="goToFixMedical">{{medicalMessage || "无"}}</span>
            </li>
          </ul>
        </section>
        <section id="ev-detailInform" class="tc-caseDescribe tc-module">
          <section class="tc-caseDescribeTitle title"><h3>基本信息</h3></section>
          <ul class="tc-caseDescribeList">
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">患者所在地</span>
              <span id="ev-choose-address" class="tc-caseDescribeItemRight patientLocation"
                    @click="goToSelectArea">{{areaParam.province + " " + areaParam.city + " " + areaParam.district}}</span>
            </li>
            <li class="tc-caseDescribeItem">
              <span class="tc-caseDescribeItemLeft">手机号码</span>
              <span class="tc-caseDescribeItemRight patientTel" @click="goToFixPhone">{{phone}}</span>
            </li>
          </ul>
        </section>
        <section id="ev-comment" class="tc-caseDescribe tc-module tc-comment">
          <section class="tc-caseDescribeTitle title"><h3>备注</h3></section>
          <ul class="tc-caseDescribeList tc-caseOtherBox">
          <textarea class="tc-caseDesOther" cols="30" rows="10" placeholder="填写要描述的内容"
                    v-model="remarkContent" @input="contentLimit"></textarea>
            <p class="text-num-tips" v-show="getByteLen(remarkContent)<=100">
              {{getByteLen(remarkContent)}}</p>
          </ul>
        </section>
        <section class="submit_symptom_box">
          <button class="submit_symptom" @click="submitAllParams">提交复诊单</button>
        </section>
      </section>
      <loading :show="finish"></loading>
      <transition name="fade">
        <toast :content="errorMsg" v-if="errorShow"></toast>
      </transition>
    </section>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/1.
   */
  import selectArea from 'components/selectArea';
  import api from "common/js/util/util";
  import loading from "components/loading";
  import axios from "axios";
  import toast from "components/toast";
  const XHRList = {
    getInquiryPage: '/mcall/customer/patient/case/v1/getMapById/',           //问诊单
    returnVisitSubmit: '/mcall/customer/patient/case/v1/createVisitCase/',   //提交复诊
    getDesList: '/mcall/cms/part/question/relation/v1/getMapList/',          //症状问答
    baseInfo: '/mcall/customer/patient/baseinfo/v1/getMapList/',            //个人信息
    upload: "/mcall/customer/patient/case/attachment/v1/create/",
  };
  export default{
    data(){
      return {
        finish: false,
        patientCasemap: {
          patientName: "",
          caseMain: "",
          attachmentList: ""
        },
        remarkContent: "",
        caseTime: "",
        resultMainList: [],
        logoUrl: "",
        illnessName: "",
        heavyTime: "",
        illnessTime: "",
        partName: "",
        complication: "",
        delImgList:[],
        imgList1: [],
        imgList2: [],
        oldCaseAttIdList: [],
        caseAttIdList: [],
        uploading1: false,
        uploading2: false,
        medicalMessage: "",
        phone: "",
        topNum: 0,
        errorShow: false,
        areaParam: {},
        hospitalMessage: {},
        diseaseMessage: {},
        selectList: [],
        selectList2: [],
        secondList: {},
        finalSubmitParams: {}
      }
    },
    activated(){
      let that = this;
      sessionStorage.removeItem("symptomList");
      sessionStorage.removeItem("secondList");
      document.title = "复诊单";
      this.goToTop();
      if (this.$route.params.type) {
        console.log(this.$route.params)
        switch (this.$route.params.type) {
          case "illness":

            let secondList = this.$route.params.secondList;
            this.illnessName = "";
            this.selectList[0].optionIdList = (function () {
              let result = [];
              that.$route.params.illnessName[0].optionIdList.forEach((element, index) => {
                result.push({
                  optionId: element,
                  optionName: that.$route.params.illnessName[0].optionName[index]
                })
              });
              return result;
            }());
            this.$route.params.illnessName.forEach((element) => {
              if (element.optionDesc && element.optionDesc.length !== 0) {
                this.selectList[0].optionIdList.optionDesc = element.optionDesc;
                this.selectList[0].optionDesc = element.optionDesc;
                this.selectList[0].optionIdList[0].optionDesc = element.optionDesc;
              }

              if (element.level == 1) {
                if (element.optionDesc && element.optionDesc.length !== 0) {
                  this.illnessName += element.optionDesc + "、";
                }

                element.optionName.forEach((e)=>{
                   if (e.includes("其他")){
                       element.optionName.splice(0,1);
                   }
                });
              }
            });
            //拼接疼痛
            this.$route.params.illnessName[0].optionName.forEach((element)=>{
                if(element == "疼痛"){
                    this.illnessName += element;
                    for(let i in this.$route.params.secondList){
                      this.illnessName += "-" + this.$route.params.secondList[i].optionName[0];
                    }
                    this.illnessName += "、"
                }else{
                  if (!(element.includes("其他"))){
                    this.illnessName += element + "、";
                  }
                }
            })
            this.illnessName = this.illnessName.substring(0,this.illnessName.length-1);
            for (let i in secondList) {
              this.secondList[i].optionIdList = (function () {
                let result = [];
                secondList[i].optionIdList.forEach((element, index) => {
                  result.push({
                    optionId: element,
                    optionDesc: "",
                    optionName: secondList[i].optionName[index]
                  });
                });

                return result;
              }())

            }
            break;
          case "illnessTime":
            this.illnessTime = "";
            this.selectList[1].optionIdList[0] = {
              optionId: this.$route.params.illnessName[0].optionIdList.join(","),
              optionName: this.$route.params.illnessName[0].optionName.join(","),
            };
            this.$route.params.illnessName.forEach((element) => {
              if (element.optionDesc && element.optionDesc.length !== 0) {
                this.illnessTime = element.optionDesc;
                this.selectList[1].optionDesc = element.optionDesc;
                this.selectList[1].optionIdList[0].optionDesc = element.optionDesc;
              } else {
                this.illnessTime += element.optionName.join(",")
              }
            });
            break;
          case "heavyTime":
            this.heavyTime = "";
            this.selectList[2].optionIdList[0] = {
              optionId: this.$route.params.illnessName[0].optionIdList.join(","),
              optionName: this.$route.params.illnessName[0].optionName.join(","),
            };
            this.$route.params.illnessName.forEach((element) => {
              if (element.optionDesc && element.optionDesc.length !== 0) {
                this.heavyTime = element.optionDesc;
                this.selectList[2].optionDesc = element.optionDesc;
                this.selectList[2].optionIdList[0].optionDesc = element.optionDesc;
              } else {
                this.heavyTime += element.optionName.join(",")
              }
            });
            break;
          default:
            break;
        }

      }
      if (this.$route.params.diseaseMessage) {
        this.diseaseMessage = this.$route.params.diseaseMessage;
      }
      if (this.$route.params.hospitalMessage) {
        this.hospitalMessage = this.$route.params.hospitalMessage;
      }

      if (this.$route.params.areaParam) {
        this.areaParam = this.$route.params.areaParam;
      }
      if (typeof this.$route.params.medicalMessage !== "undefined") {
        this.medicalMessage = this.$route.params.medicalMessage;
      }
      if (typeof this.$route.params.phone !== "undefined") {
        this.phone = this.$route.params.phone;
      }
      if (typeof this.$route.params.complication !== "undefined") {
        this.complication = this.$route.params.complication;
      }
    },
    mounted (){
      this.getMedicalReport();
    },

    methods: {
      getMedicalReport() {
        const that = this;
        api.ajax({
          url: XHRList.getInquiryPage,
          method: "POST",
          data: {
            caseId: this.$route.query.caseId,
            attUseFlag: 1,
            isOrder: 0
          },
          beforeSend(config) {
            that.finish = true;
          },
          done(data) {
            if (data.responseObject && data.responseObject.responseData) {

              let _data = data.responseObject.responseData.dataList[0];
              that.patientCasemap = data.responseObject.responseData.dataList[0].patientCasemap;
              that.resultMainList = data.responseObject.responseData.dataList[0].resultMainList;
              let caseTime = that.patientCasemap.caseTime.split(' ')[0];

              that.caseTime = caseTime.split('-')[0] + '年' + caseTime.split('-')[1] + '月' + caseTime.split('-')[2] + '日'
              that.illnessTime = ((that.resultMainList[1].symptomOptions[0].optionDesc && that.resultMainList[1].symptomOptions[0].optionDesc.length > 0) ? that.resultMainList[1].symptomOptions[0].optionDesc : that.resultMainList[1].symptomOptions[0].optionName);
              that.heavyTime = ((that.resultMainList[2].symptomOptions[0].optionDesc && that.resultMainList[2].symptomOptions[0].optionDesc.length > 0) ? that.resultMainList[2].symptomOptions[0].optionDesc : that.resultMainList[2].symptomOptions[0].optionName);
              that.partName = that.resultMainList[0].partName;
              that.complication = that.patientCasemap.caseMain.caseAlong;

              that.getSelectList();
              that.getIllnessName();
              that.getLogoUrl();
              that.getImageList();
              that.getSelectParams();
            }
            that.finish = false;
          }
        })
      },
      getSelectList() {
        const that = this;
        let cycle = function (ele, pEle, level) {
          that.selectList.push({
            questionId: ele.questionId,
            partId: ele.partId,
            optionDesc: (function (list1) {
              let result = "";
              list1.forEach((element1, index1) => {
                if (element1.optionDesc) {
                  result = element1.optionDesc;
                  return ;
                }
              });
              return result;
            }(ele.symptomOptions)),
            optionIdList: (function (list1) {
              let result = [];
              list1.forEach((element1, index1) => {
                result.push({
                  optionId: element1.optionId,
                  optionName: (level == 2 ? element1.optionName + element1.optionDesc : element1.optionName),
                  optionDesc: element1.optionDesc
                });
              });
              return result;
            }(ele.symptomOptions)),
            refOptionId: (function (parent) {
              if (parent) {
                return parent.optionId;
              }
            }(pEle))
          })
        };
        this.resultMainList.forEach((element, index) => {
          cycle(element);
        });
        this.resultMainList.forEach((element, index) => {
          element.symptomOptions.forEach((sElement, sIndex) => {
            if (sElement.refQuestionList.length !== 0) {
              sElement.refQuestionList.forEach((eElement, eIndex) => {
                cycle(eElement, sElement, 2);
              })
            }
          });
        })
        if (this.selectList[3]) {
          this.secondList[this.selectList[3].questionId + this.selectList[3].refOptionId] = {
            refOptionId: this.selectList[3].refOptionId,
            questionId: this.selectList[3].questionId,
            optionIdList: this.selectList[3].optionIdList,
            partId: this.selectList[3].partId
          }
        }

        if (this.selectList[4]) {
          this.secondList[this.selectList[4].questionId + this.selectList[4].refOptionId] = {
            refOptionId: this.selectList[4].refOptionId,
            questionId: this.selectList[4].questionId,
            optionIdList: this.selectList[4].optionIdList,
            partId: this.selectList[4].partId
          }
        }
        this.selectList.splice(3);
        this.selectList.splice(4);
      },
      getSubSelectList() {
        for (let i in this.secondList) {
          this.selectList.push(this.secondList[i]);
        }
        console.log(this.selectList)
        this.selectList.forEach((element, index) => {
          let opList = [];
          element.optionIdList.forEach((eElement, iIndex) => {
            opList.push(eElement.optionId);
          });
          this.selectList2.push({
            optionDesc: (element.optionDesc && element.optionDesc.length > 0) ? element.optionDesc : "",
            optionIdList: opList.join(","),
            partId: element.partId,
            questionId: element.questionId,
            refOptionId: element.refOptionId
          })
        })
      },
      goToFixPhone(event){
        document.title = "手机号码";
        this.recordTheTop(event);
        this.$router.push({
          name: 'fixPhone',
          params: {
            phone: this.phone,
            from: this.$route.name,
          },
          query: this.$route.query
        })
      },
      getSelectParams() {
        this.areaParam = {
          provinceId: this.patientCasemap.provinceId,
          province: this.patientCasemap.provinceName,
          cityId: this.patientCasemap.cityId,
          city: this.patientCasemap.cityName,
          districtId: this.patientCasemap.districtId,
          district: this.patientCasemap.districtName,
        };

        this.hospitalMessage = {
          name: this.patientCasemap.treatmentName,
          id: this.patientCasemap.treatmentId
        };

        this.diseaseMessage = {
          name: this.patientCasemap.illnessName,
          id: this.patientCasemap.illnessId
        };

        this.medicalMessage = this.patientCasemap.takeMedicine;
        this.phone = this.patientCasemap.mobile;
      },
      getImageList(){
        let that = this;
        this.patientCasemap.attachmentList.forEach((element) => {
          that.oldCaseAttIdList.push(element.id);
          if (element.caseAttSource == 0) {
            this.imgList1.push({
              id: element.id,
              url: element.caseAttUrl,
              uploading: false,
              fail: false,
              finish: true
            })
          } else {
            this.imgList2.push({
              id: element.id,
              url: element.caseAttUrl,
              uploading: false,
              fail: false,
              finish: true
            })
          }
        });
      },
      getIllnessName(){
        let result = [];
        this.resultMainList[0].symptomOptions.forEach((element, index) => {
          let resultTwo = [];
          if (element.isAttachment == 2) {
            resultTwo.push(element.optionDesc);
          } else {
            resultTwo.push(element.optionName);
          }
          if (element.refQuestionList.length > 0) {
            element.refQuestionList.forEach((elemen, inde) => {
              if (elemen.symptomOptions.length > 0) {
                elemen.symptomOptions.forEach((eleme, ind) => {
                  resultTwo.push(eleme.optionName + eleme.optionDesc);
                })
              }
            })

          }
          result.push(resultTwo.join("-"))
        });
        this.illnessName = result.join("、");
      },
      getLogoUrl() {
        let sex = this.patientCasemap.sexName,
          age = parseInt(this.patientCasemap.age),
          img = "";
        if (age <= 12) {
          img = require('../../../common/image/img00/myServices/chatting_portrait_child@2x.png');
        } else if (age > 12 && age <= 59) {
          img = (sex === "男" ? require('../../../common/image/img00/myServices/chatting_chatting_man@2x.png') : require('../../../common/image/img00/myServices/chatting_portrait_woman@2x.png'));
        } else if (age >= 60) {
          img = (sex === "男" ? require('../../../common/image/img00/myServices/chatting_portrait_old_man@2x.png') : require('../../../common/image/img00/myServices/chatting_portrait_old_woman@2x.png'));
        }
        this.logoUrl = img;
      },
      goToFixIllness(event) {
        document.title = "主要症状";
        this.recordTheTop(event);
        this.$router.push({
          name: "discription",
          query: {
            questionId: this.resultMainList[0].questionId,
            partId: this.resultMainList[0].partId,
            from: this.$route.name,
            query: this.$route.query,
            type: "illness"
          },
          params: {
            symptomList: this.selectList[0],
            secondList: this.secondList
          }
        })
      },
      goToFixIllnessTime(event) {
        document.title = "主要症状";
        this.recordTheTop(event);
        console.log(this.selectList)
        this.$router.push({
          name: "discription",
          query: {
            questionId: this.selectList[1].questionId,
            partId: this.selectList[1].partId,
            from: this.$route.name,
            query: this.$route.query,
            type: "illnessTime"
          },
          params: {
            symptomList: this.selectList[1]
          }
        })
      },
      goToFixHeavyTime(event) {
        document.title = "主要症状";
        this.recordTheTop(event);
        this.$router.push({
          name: "discription",
          query: {
            questionId: this.resultMainList[2].questionId,
            partId: this.resultMainList[2].partId,
            from: this.$route.name,
            query: this.$route.query,
            type: "heavyTime"
          },
          params: {
            symptomList: this.selectList[2]
          }
        })
      },
      goToFixComplication(event) {
        document.title = "主要症状";
        this.recordTheTop(event);
        this.$router.push({
          name: "complication",
          params: {
            complication: this.complication,
            from: this.$route.name,
            query: this.$route.query
          }
        })
      },
      goToSelectHospital(event){
        this.recordTheTop(event);
        this.$router.push({
          name: 'selectArea',
          params: {
            listType: 'hospital',
            level: 2,
            from: this.$route.name,
          },
          query: this.$route.query
        })
      },
      goToFixMedical(event){
        document.title = "药物名称";
        this.recordTheTop(event);
        this.$router.push({
          name: 'fixMedical',
          params: {
            content: this.medicalMessage,
            from: this.$route.name,
          },
          query: this.$route.query
        })
      },
      goToSelectArea(event) {
        this.recordTheTop(event);
        this.$router.push({
          name: 'selectArea',
          params: {
            listType: 'city',
            level: 2,
            from: this.$route.name,
          },
          query: this.$route.query
        })
      },
      goToSelectDisease(event){
        this.recordTheTop(event);
        this.$router.push({
          name: 'selectArea',
          params: {
            listType: 'disease',
            level: 2,
            from: this.$route.name,
          },
          query: this.$route.query
        })
      },
      onFileChange(e, type,index) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) {
          return;
        }
        if (files[0].size > 1024 * 1024 * 5) {
          this.errorShow = true;
          this.errorMsg = "图片不能超过5M";
          setTimeout(() => {
            this.errorMsg = '';
            this.errorShow = false
          }, 3000);
        } else {
          this.upLoadPic(files, type,index);
        }
      },
      upLoadPic: function (files, type, index) {
        let that = this,
          _files = files,
          _imageType = '',
          _data = new FormData();
        switch (type) {
          case 1:
            _imageType = 0;
            break;
          case 2:
            _imageType = 4;
            break;
        }
        _data.append('file', _files[0]);
        _data.append('paramJson', JSON.stringify({
          caseId: "",
          imageType: _imageType,
          caseCategoryId: ''
        }));
        let blob = window.URL.createObjectURL(_files[0]);

        this["uploading" + type] = true;

        if (typeof index !== "undefined") {
          that["imgList" + type][index] = {
            blob: blob,
            id: "",
            uploading: true,
            fail: false
          };
        } else {
          that["imgList" + type].push({
            blob: blob,
            id: "",
            uploading: true,
            fail: false
          });
        }
        axios({
          url: XHRList.upload,
          method: "post",
          data: _data,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          timeout: 30000,
        }).then((res) => {
          if (res.data.responseObject.responseStatus) {
            that.caseAttIdList.push(res.data.responseObject.responsePk);
            console.log(that.caseAttIdList)
            let num = index ? index : that["imgList" + type].length - 1;
            that["imgList" + type][num].id = res.data.responseObject.responsePk;
            that["imgList" + type][num].uploading = false;
            that["imgList" + type][num].fail = false;
            that["imgList" + type][num].finish = true;
            that["uploading" + type] = false;
            that["imgList" + type][num].url = res.data.responseObject.responseMessage.logoUrl;
          } else {
            let num = index ? index : that["imgList" + type].length - 1;
            that["imgList" + type][num].uploading = false;
            that["imgList" + type][num].fail = true;
            that["imgList" + type][num].finish = false;
            that["uploading" + type] = false;
            that["imgList" + type][num].url = res.data.responseObject.responseMessage.logoUrl;
          }
        }).then((err) => {

        });
      },
      imgDelete(item, index, type){
        this.delImgList = [];
        this.delImgList.push(this["imgList" + type][index].id);
        this.getOldCaseAttIdList();
        this["imgList" + type].splice(index, 1);
      },
      getOldCaseAttIdList(){
          //删除老图片
          if(this.delImgList.length>0 && this.oldCaseAttIdList.length>0) {
            this.oldCaseAttIdList.forEach((element, index) => {
              if (this.delImgList[0] == element) {
                this.oldCaseAttIdList.splice(index, 1);
              }
            })
          }
            console.log(this.oldCaseAttIdList);
            //删除新图片
            if(this.delImgList.length>0 && this.caseAttIdList.length>0){
              this.caseAttIdList.forEach((element,index)=>{
                if(this.delImgList[0] == element){
                  this.caseAttIdList.splice(index,1);
                }
              })
              console.log(this.caseAttIdList);
          }
      },
      contentLimit(){
        let content = this.remarkContent;
        if (api.getByteLen(content) > 1000) {
          this.remarkContent = api.getStrByteLen(content, 1000);
          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          this.errorMsg = "您已超过500字了";
          return false;
        }
      },
      getByteLen(str){
        return 1000 - api.getByteLen(str)
      },
      paramsInstall(){
        this.getSubSelectList();
        console.log(this.selectList2)
        this.finalSubmitParams = {
          patientId: this.$route.query.patientId,
          caseType: 1,
          customerId: this.$route.query.customerId,
          visitSiteId: 17,
          mobile: this.phone,
          optionList: JSON.stringify(this.selectList2),
          patientName: this.patientCasemap.patientName,
          provinceId: this.areaParam.provinceId,
          province: this.areaParam.province,
          cityId: this.areaParam.cityId,
          city: this.areaParam.city,
          districtId: this.areaParam.districtId,
          district: this.areaParam.district,
          oldCaseAttIdList: this.oldCaseAttIdList.join(","),
          caseAttIdList: this.caseAttIdList.join(","),
          treatmentHospitalId: this.hospitalMessage.id,
          treatmentHospital: this.hospitalMessage.name,
          illnessHistoryId: this.diseaseMessage.id,
          illnessHistory: this.diseaseMessage.name,
          remark: this.remarkContent,
          takeMedicine: this.medicalMessage,
          complication: this.complication
        }
        console.log(this.finalSubmitParams)
      },
      submitAllParams(){
        const that = this;
        this.paramsInstall();
        api.ajax({
          url: XHRList.returnVisitSubmit,
          method: "POST",
          data: this.finalSubmitParams,
          beforeSend(config) {
            this.finish = true;
          },
          done(data) {
            this.finsh = false;
            if (data.responseObject.responsePk != 0) {
              let shuntCustomerId = data.responseObject.responseData.shuntCustomerId;
              debugger;
             window.location.href = 'http://m.allinmed.cn/pages/imScene/im_main_scene.html?caseId=' + data.responseObject.responsePk + '&from=further&shuntCustomerId=' + shuntCustomerId + '&customerId=' + that.$route.query.customerId + '&patientId=' + that.$route.query.patientId;
            }
          },
          fail(err) {

          }
        })
      },
      recordTheTop(event){
          this.topNum = event.target.offsetTop;
          console.log(this.topNum)
      },
      goToTop(){
        document.documentElement.scrollTop = document.body.scrollTop = this.topNum;
      },
    },
    components: {
      selectArea,
      loading,
      toast
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .main-inner {
    //基本信息以下模块样式
    .tc-caseContentBox {
      background: #E6E6ED;
      padding: rem(30px);
      .tc-baseInfo {
        margin-bottom: rem(16px);
        border-radius: rem(16px);
        background: #ffffff;
        .tc-baseInfoList {
          padding-top: rem(40px);
          background: url("../../../common/image/img00/myServices/interrogation_bg.png") no-repeat;
          background-size: 100%;
        }
        .tc-baseInfoItem {
          padding-bottom: rem(50px);
          @include clearfix();
          &:first-child {
            padding-bottom: rem(90px);
          }
          .tc-baseInfoItemLeft {
            width: rem(170px);
            padding-left: rem(32px);
            @include font-dpr(17px);
            float: left;
            color: #AAA;
            img {
              display: block;
              width: rem(120px);
              height: rem(120px);
              margin: 0 auto;
            }
          }
          .tc-baseInfoItemRight {
            margin-left: rem(230px);
            margin-right: rem(30px);
            color: #222222;
            @include font-dpr(18px);
            span {
              display: inline-block;
              margin-top: rem(44px);
            }
            .tc-baseInfoName {
              @include font-dpr(20px);
              margin-right: rem(32px);
              font-weight: bold;
            }
            .tc-baseInfoSex {
              margin-right: rem(28px);
            }
            .tc-baseInfoDate {
              display: block;
              @include font-dpr(13px);
              line-height: rem(26px);
              color: #909090;
              margin-top: rem(16px);
            }
            .tc-goCase {
              @include font-dpr(14px);
              position: absolute;
              right: rem(70px);
              top: rem(46px);
              color: #78849C;
              line-height: rem(28px);
              &::after {
                display: inline-block;
                content: "";
                width: rem(12px);
                height: rem(20px);
                position: absolute;
                top: 50%;
                margin-top: rem(-14px);
                right: rem(-27px);
                background: url("/image/img00/patientConsult/arrow_right.png") no-repeat center;
                background-size: 100% 100%;
              }
            }
            &.tc-recommendUserMain {
              line-height: rem(52px);
            }
          }
        }
      }
      .tc-module {
        margin-bottom: rem(16px);
        border-radius: rem(16px);
        background-color: #ffffff;
        .title {
          padding: rem(40px) 0 rem(40px) rem(30px);
          border-bottom: 2px solid #F8F8F8;
          h3 {
            font-weight: 600;
            color: #666666;;
            @include font-dpr(18px);
            &:before {
              display: inline-block;
              content: '';
              width: rem(4px);
              height: rem(20px);
              margin-right: rem(10px);
              background: #4CD3C6;
              vertical-align: middle;
            }
          }
        }
        .tc-recommendRightComm {
          @include font-dpr(14px);
          position: absolute;
          right: 0;
          top: 0;
          display: block;
          width: rem(200px);
          text-align: right;
          color: #9798A6;
          padding-right: rem(24px);
          &:after {
            position: absolute;
            content: '';
            top: 50%;
            right: 0;
            margin-top: rem(-8px);
            display: inline-block;
            width: rem(20px);
            height: rem(20px);
            background: url("../../../common/image/img00/recoveryReport/suggestion_enter@2x.png");
            background-size: 100% 100%;
            vertical-align: middle;
          }
        }
        .tc-caseDescribeList {
          .tc-caseDescribeItem {
            @include clearfix();
            padding: rem(40px) 0;
            .tc-caseDescribeItemLeft {
              float: left;
              width: rem(170px);
              @include font-dpr(17px);
              color: #AAAAAA;
              padding-left: rem(32px);
            }
            .tc-caseDescribeItemRight {
              word-wrap: break-word;
              word-break: break-all;
              position: relative;
              display: block;
              margin-left: rem(230px);
              margin-right: rem(30px);
              @include font-dpr(18px);
              color: #444444;
              &:after {
                display: inline-block;
                position: absolute;
                content: '';
                width: rem(20px);
                height: rem(20px);
                background: url("../../../common/image/img00/recoveryReport/suggestion_enter@2x.png");
                background-size: 100% 100%;
                right: 0;
                top: 50%;
                margin-top: rem(-8px);
              }
            }
            .tc-noRevice {
              &:after {
                display: none;
              }
            }
          }
        }
        .tc-caseOtherBox {
          position: relative;
        }
        .text-num-tips {
          position: absolute;
          right: rem(60px);
          bottom: 0;
          color: #0ab375;
          @include font-dpr(12px);
        }
        //输入框 备注
        .tc-caseDesOther {
          width: 100%;
          height:rem(340px);
          padding: rem(60px) rem(32px);
          box-sizing: border-box;
          border-style: none;
          border-bottom:1px solid #F4F4F4;
          @include font-dpr(18px);
          @include placeholder(){
            color: #aaaaaa;
          }
        }
      }
      .tc-comment {
        padding-bottom: rem(60px);
      }
      .submit_symptom_box {
        padding: rem(70px) 0 rem(100px);
        .submit_symptom {
          display: block;
          width: rem(560px);
          line-height: rem(100px);
          text-align: center;
          color: #FFF;
          background: #00d6c6;
          margin: 0 auto;
          border-radius: 100px;
          @include font-dpr(18px)
        }
      }
      //上传图片
      .imgList-box {
        padding: rem(50px) 0 0 rem(32px);
      }

      .tc-upLoadItemList {
        width: rem(180px);
        height: rem(180px);
        display: inline-block;
        position: relative;
        vertical-align: top;
        margin: 0 rem(20px) rem(20px) 0;

        & > img {
          display: block;
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }

      .ev-upLoadInput {
        opacity: 0;
        width: 100%;
        height: 100%;
      }

      .ev-upLoadAdd {
        width: rem(180px);
        height: rem(180px);
        text-align: center;
        position: relative;
        display: inline-block;
        vertical-align: top;
        margin: 0 rem(20px) rem(20px) 0;
        //padding:rem(8px);
        background: url("../../../common/image/img00/consult_V1.2/addto@2x.png") center;
        background-size: contain;
        //span{
        //  display: block;
        //  width: rem(136px);
        //  height: rem(136px);
        //  background: url("/image/img00/patientConsult/addto@2x.png");
        //  background-size: 100% 100%;
        //
        //}
      }

      .tc-upLoadDel {
        position: absolute;
        width: 0.8rem;
        height: 0.8rem;
        top: 0;
        right: 0;
        background: url(../../../common/image/img00/patientConsult/symptom_photo_delete@2x.png) no-repeat;
        background-position: top right;
        background-size: 0.50667rem 0.50667rem;
        z-index: 1;
      }

      .tc-upLoadItemList {
        position: relative;

        .ev-loading {
          position: absolute;
          opacity: 0.83;
          background: #545454;
          .middle-tip-modal {
            position: absolute;
          }
        }
      }

      .upload-fail {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        opacity: 0.83;
        background: #545454;
        & > input {
          opacity: 0;
          width: 100%;
          height: 100%;
        }
        & > p {
          @include font-dpr(12px);
          color: #FFFFFF !important;
          text-align: center;
          position: absolute;
          top: 50%;
          width: 100%;
          left: 50%;
          transform: translate(-50%, -50%)

        }
      }
    }
  }

  .au-main {
    min-height: 100%;
    height: auto;
    //position: relative;
    box-sizing: border-box;
    padding-bottom: rem(184px);
    .au-infoBox {
      //第六题样式
      .au-cureHisList {
        padding-top: rem(52px);
        li li {
          margin-top: rem(72px);
        }
        .au-cureHisItem {
          .au-cureHisItemTop {
            color: #222222;
            @include font-dpr(16px);
            line-height: 1;
            padding: 0 rem(48px);
          }
          .au-cureHisItemBottom {
            padding: 0 rem(48px);
            @include clearfix();
            font-size: 0;
            span {
              //box-sizing: border-box;
              border: rem(1px) solid #BDBDBD;
              border-radius: 100px;
              display: table;
              float: left;
              margin-right: rem(18px);
              margin-top: rem(32px);
              @include font-dpr(14px);
              color: #808080;
              padding: rem(10px) rem(22px);
              line-height: 1;
              &.selected {
                color: #5BD7CF;
                border: rem(1px) solid #5BD7CF;
                background: #E4FDFC;
              }
            }
          }
          .au-cureHisItemInfo {
            display: none;
            width: 100%;
            height: rem(284px);
            box-sizing: border-box;
            margin-top: rem(46px);
            background-color: #F9FBFB;
            padding: rem(40px) rem(48px);
            textarea {
              width: 100%;
              height: 100%;
              border: none;
              text-align: justify;
              @include font-dpr(15px);
              color: #222;
              line-height: 1.5;
              background-color: #F9FBFB;
            }
          }
        }
      }

      //第七题样式
      .au-perfectInfoList {
        padding-top: rem(52px);
        .au-perfectInfoItem {
          padding: 0 rem(48px);
          display: table;
          height: rem(120px);
          @include font-dpr(15px);
          .au-perfectInfoItemLeft {
            display: table-cell;
            width: rem(248px);
            color: #222;
            vertical-align: top;

          }
          .au-perfectInfoItemRight {
            display: table-cell;
            width: rem(405px);
            color: #CCCCCC;
            position: relative;
            .fontGray {
              color: #ccc;
            }
            .ev-change-city {
              color: #222;
              &:after {
                display: inline-block;
                position: absolute;
                content: '';
                width: 0.26667rem;
                height: 0.26667rem;
                background: url(/image/img00/recoveryReport/suggestion_enter@2x.png);
                background-size: 100% 100%;
                right: 0;
                top: 10%;
              }
            }
            &.hasSelect {
              span.show {
                position: absolute;
                z-index: 1;
                &.selected {
                  color: #555555;
                }
              }
              select {
                position: absolute;
                z-index: 2;
                opacity: 0;
                display: block;
                height: 50%;
                width: 100%;
              }
            }
          }
          .au-perfectInfoItemTop {

          }
          .au-perfectInfoItemBottom {
            margin-top: rem(38px);
            margin-bottom: rem(50px);
            background-color: #F9FBFB;
            width: rem(654px);
            height: rem(276px);
            box-sizing: border-box;
            padding: rem(40px);
            textarea {
              display: block;
              height: 100%;
              background-color: #F9FBFB;
            }
          }
          input, textarea, span {
            border: none;
            display: block;
            width: 100%;
          }
        }
      }
    }
  }

  .symptom-desc-title {

    color: #222;
    @include font-dpr(17px);
    padding: 0 rem(48px);
    //line-height: 1;
    & > h4 {
      font-weight: normal;
    }
    .num {
      padding-right: rem(8px);
      em {
        color: #00bedf;
        font-style: normal;
      }
    }
    .tips {
      color: #7f858e;
      @include font-dpr(15px);
    }
  }

  .symptom-desc-item {
    &.multiple-choices {
      margin: rem(40px) 0;
      box-sizing: border-box;
    }
    &.single-choices {
      margin: rem(40px) 0;
      box-sizing: border-box;
    }
    .icon-select {
      margin-right: rem(24px);
    }
    &.selected.multiple-choices {
      & > p {
        .icon-select {
          background: url("/image/img00/patientConsult/symptom_square_sel@2x.png") no-repeat center;
          background-size: contain;
        }
        .icon-arrow {
          display: block;
        }
      }

    }
    &.selected.single-choices {
      & > p {
        .icon-select {
          background: url("/image/img00/patientConsult/symptom_circle_sel@2x.png") no-repeat center;
          background-size: contain;
        }
        .icon-arrow {
          display: block;
        }
      }
    }
    &.selected .symptom-desc-second-form {

      display: block;
    }
    & > p {
      color: #555;
      padding-left: rem(84px);
      @include font-dpr(15px);
      @include clearfix();
      .icon-arrow {
        float: right;
        background: url("/image/img00/patientConsult/symptom_pack up@2x.png") no-repeat;
        @include square(rem(28px));
        display: none;
      }
      & > span {
        vertical-align: text-top;
        display: inline-block;
        width: 81%;
        word-break: break-all;
      }
    }
    &.selected > p {
      color: #63C7BF;
    }

  }

  //选择列表弹层
  #ev-choiceList {
    display: block;
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 1;
    margin-top: 0;
    background: #fff;
  }

  section.symptom-list {
    padding-bottom: 0;
  }

  .symptom-desc-controller .disabled {
    background: #ccc;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
</style>
