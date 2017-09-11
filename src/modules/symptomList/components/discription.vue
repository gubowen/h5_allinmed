<template>
  <section class="consult-main-inner">
    <section class="consult-wrapper">
      <section class="consult-inner">
        <section class="consult-total" v-for="(question , pIndex) in renderList" :data-qId="question.questionId">
          <header class="consult-inner-title">
            <h2>
              <span>{{question.questionName}}</span>
              <em v-if="question.questionType==2">(可多选)</em>
            </h2>
          </header>
          <section class="consult-question-inner"
                   :class="{mSelector:question.questionType==2,sSelector:question.questionType==1}"
                   v-for="(item , index) in question.optionList1" :data-oId="item.optionId">
            <article class="consult-question-item"
                     :class="{'dark':index%2==0,'selected':questionList[pIndex].optionList[index].isSelected}"
                     @click="selectEvent(question.questionType==2,pIndex,index)"
            >
              <p>{{item.optionName}}</p>
              <i class="icon-select"></i>
              <figure class="input-area" v-if="item.isAttachment==2&&questionList[pIndex].optionList[index].isSelected"
                      @click.stop="">
              <textarea class="input-textarea" placeholder="填写其他情况"
                        @input="otherReason(pIndex,index,$event)"
                        v-model="questionList[pIndex].optionList[index].optionDesc">
              </textarea>
                <!--<p class="text-num-tips" v-show="questionList[pIndex].optionList[index].optionDesc.length>400">-->
                  <!--{{questionList[pIndex].optionList[index].optionDesc.length}}</p>-->
              </figure>
              <transition name="fade" v-if="painLevelRender(item)">
                <section class="pain-level-wrapper" @click.stop="" v-if="showPainProgress">
                  <section class="pain-level-box">
                    <h3>告诉我您的疼痛程度</h3>
                    <p class="pain-level-content">
                      {{painProgress[painValue].optionName}}{{painProgress[painValue].optionDesc}}
                    </p>
                    <ul class="pain-level-progress-tips">
                      <li class="tips first">0</li>
                      <li>1</li>
                      <li>2</li>
                      <li>3</li>
                      <li>4</li>
                      <li>5</li>
                      <li>6</li>
                      <li>7</li>
                      <li>8</li>
                      <li>9</li>
                      <li class="tips last">10</li>
                    </ul>
                    <input type="range" class="pain-level-progress" :class="painLevelClass" @change="painLevel" step="1"
                           max="10" min="0" :value="painValue">
                    <button class="btn-primary pain-level-ensure" @click.stop="getPainLevelData(item,painValue)">好的





                    </button>
                  </section>
                </section>
              </transition>
              <section class="pain-level-secondList"
                       :class="{mSelector:scItem.questionType==2,sSelector:scItem.questionType==1}"
                       @click.stop=""
                       v-if="item.questionList2&&item.questionList2.length!==0&&questionList[pIndex].optionList[index].isSelected"
                       v-for="(scItem,scIndex) in item.questionList2"
                       :data-qId="scItem.questionId">
                <section class="pain-level-title-box">
                  <header class="pain-level-title-content" v-if="scItem.questionType==3" :class="painLevelClass"
                          @click.stop="showPainProgress=true">
                    <i class="icon-pain-level-tips"></i>
                    <p>疼痛等级：<span>{{painProgress[painValue].optionName}}{{painProgress[painValue].optionDesc}}</span>
                    </p>
                  </header>
                </section>
                <header class="consult-inner-title" v-if="scItem.questionType!=3">
                  <h2>
                    <span>{{scItem.questionName}}</span>
                  </h2>
                </header>
                <article
                  v-if="scItem.questionType!=3" class="consult-question-item"
                  v-for="(scoItem,scoIndex) in scItem.optionList2"
                  @click.stop="secondClickEvent(scItem.questionType==2,scIndex,scoIndex,index,pIndex)"
                  :class="{'selected':questionList[pIndex].optionList[index].questionList[scIndex].optionList[scoIndex].isSelected }"
                  :data-oId="scoItem.optionId"
                >
                  <p>{{scoItem.optionName}}</p>
                  <i class="icon-select"></i>
                </article>
              </section>
            </article>
          </section>
        </section>
      </section>
      <button class="btn-primary finish" @click="ensureEvent">确定修改</button>
      <button class="cancel" @click="cancelEvent">取消</button>
      <transition name="fade">
        <toast :content="errorMsg" v-if="errorShow"></toast>
      </transition>
      <loading :show="finish"></loading>
    </section>
  </section>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：症状描述
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/7/21.
   */
  import api from 'common/js/util/util';
  import loading from 'components/loading';
  import toast from 'components/toast';
  import confirm from 'components/confirm';
  const XHRList = {
    query: "/mcall/cms/part/question/relation/v1/getMapList/",
    createMedicalRecord: "/mcall/customer/patient/case/v1/create/",
    submitMedicalRecord: "/mcall/customer/patient/case/option/v1/create/",
    symptomDetail: "/mcall/comm/data/symptom/option/v1/getMapById/"
  };
  export default{
    data (){
      return {
        patientMessage: {},
        finish: false,
        complication: "",
        renderList: [],
        questionList: [],
        isSelected: false,
        firstConsult: false,
        painProgress: [],
        painQuestion: "",
        painValue: "2",
        count: 0,
        showPainProgress: false,
        hasSelectedLevel: false,
        painSecondList: [],
        secondQuestionList: {},
        secondOptionsList: [],
        selectList: [],
        resultParam: {
          caseId: "",
          visitSiteId: 13,
          optionList: [],
          patientId: "",
          optionDesc: "",
          complication: ""
        },
        errorMsg: "",
        errorShow: false,
        levelShow: false,
        pageLeaveEnsure: false,
        complicationFlag: false
      }
    },
    mounted(){
      if (this.$route.query.complicationFlag) {
        this.selectList = [];
        this.complicationFlag = this.$route.query.complicationFlag;
        this.finish = false;

      } else {
        this.getQuestionList();

      }
    },
    computed: {

      painLevelClass() {
        let className = "";
        switch (parseInt(this.painValue)) {
          case 0:
            className = "pain0";
            break;
          case 1:
          case 2:
            className = "pain1";
            break;
          case 3:
          case 4:
            className = "pain2";
            break;
          case 5:
          case 6:
            className = "pain3";
            break;
          case 7:
          case 8:
            className = "pain4";
            break;
          case 9:
          case 10:
            className = "pain5";
            break;
        }
        return className;
      }
    },

    methods: {
      secondClickEvent(type, scIndex, scoIndex, index, pIndex) {

        const optionId = this.questionList[pIndex].optionList[index].questionList[scIndex].optionList[scoIndex].optionId;
        const optionName = this.questionList[pIndex].optionList[index].questionList[scIndex].optionList[scoIndex].optionName;
        const refOptionId = this.questionList[pIndex].optionList[index].optionId;
        const questionId = this.questionList[pIndex].optionList[index].questionList[scIndex].questionId;
        const slutParam = questionId + refOptionId;
        if (type) {
          this.questionList[pIndex].optionList[index].questionList[scIndex].optionList[scoIndex].isSelected = !this.questionList[pIndex].optionList[index].questionList[scIndex].optionList[scoIndex].isSelected
          if (this.questionList[pIndex].optionList[index].questionList[scIndex].optionList[scoIndex].isSelected) {
            if (!this.secondQuestionList[slutParam]) {
              this.secondQuestionList[slutParam] = {
                refOptionId: refOptionId,
                questionId: questionId,
                optionIdList: [],
                optionName: [],
                partId: this.patientMessage.partId
              };
            }
            this.secondQuestionList[slutParam].optionIdList.push(optionId);
            this.secondQuestionList[slutParam].optionName.push(optionName);
            api.removeDub(optionId);
            api.removeDub(optionName)
          } else {
            this.secondQuestionList[slutParam].optionIdList.removeByValue(optionId);
            this.secondQuestionList[slutParam].optionName.removeByValue(optionName);
          }
        } else {
          this.questionList[pIndex].optionList[index].questionList[scIndex].optionList.forEach((element, i) => {
            if (i === scoIndex) {
              return;
            } else {
              element.isSelected = false;
            }
          });
          this.questionList[pIndex].optionList[index].questionList[scIndex].optionList[scoIndex].isSelected = true;
          if (!this.secondQuestionList[slutParam]) {
            this.secondQuestionList[slutParam] = {
              refOptionId: refOptionId,
              questionId: questionId,
              optionIdList: [],
              optionName: [],
              partId: this.patientMessage.partId,
              level: 2,
            };
          }
          this.secondQuestionList[slutParam].optionIdList = [];
          this.secondQuestionList[slutParam].optionIdList.push(optionId);
          this.secondQuestionList[slutParam].optionName = [];
          this.secondQuestionList[slutParam].optionName.push(optionName);
          api.removeDub(optionId);
          api.removeDub(optionName);
        }
      },
      getQuestionList() {
        const that = this;
        api.ajax({
          url: XHRList.query,
          method: "POST",
          data: {
            partId: this.$route.query.partId,
            isValid: "1",
            firstResult: "0",
            maxResult: "9999",
            sortType: "",
            questionId: this.$route.query.questionId
          },
          beforeSend(config) {
            this.finish = true;
          },
          done(data) {
            this.finsh = false;
            if (data.responseObject.responseData) {
              let dataList = data.responseObject.responseData.dataList;
              if (dataList && dataList.length !== 0) {
                that.renderList = dataList;
                that.getBaseIdList(dataList)
              }
            }
          },
          fail(err) {

          }
        })
      },
      getBaseIdList(dataList) {
        dataList.forEach((element) => {
          this.questionList.push({
            questionId: element.questionId,
            optionList: (function () {
              let result = [];
              element.optionList1.forEach((cElement) => {
                result.push({
                  optionId: cElement.optionId,
                  isSelected: false,
                  optionDesc: "",
                  optionName: cElement.optionName,
                  questionList: (function () {
                    let result = [];
                    if (cElement.questionList2.length !== 0) {
                      cElement.questionList2.forEach((eElement) => {
                        result.push({
                          questionId: eElement.questionId,
                          optionList: (function () {
                            let result = [];
                            eElement.optionList2.forEach((eeElement) => {
                              result.push({
                                optionId: eeElement.optionId,
                                isSelected: false,
                                optionDesc: "",
                                optionName: eeElement.optionName,
                              })
                            });
                            return result;
                          }())
                        })
                      })
                    }
                    return result;
                  }())
                })
              });
              return result;
            }())
          });

        });
        this.getSymptomList2();
      },
      selectEvent(type, pIndex, index) {
        console.log(this.questionList)
        if (type) {
          this.questionList[pIndex].optionList[index].isSelected = !this.questionList[pIndex].optionList[index].isSelected;
          if (this.questionList[pIndex].optionList[index].isSelected) {
            console.log(this.questionList[pIndex].optionList[index].optionName.includes("其他"))
            this.selectList[pIndex].optionIdList.push(this.questionList[pIndex].optionList[index].optionId);
//            if (!this.questionList[pIndex].optionList[index].optionName.includes("其他")) {
            this.selectList[pIndex].optionName.push(this.questionList[pIndex].optionList[index].optionName);
//            }
            api.removeDub(this.selectList[pIndex].optionIdList);
            api.removeDub(this.selectList[pIndex].optionName);
          } else {
            this.selectList[pIndex].optionIdList.removeByValue(this.questionList[pIndex].optionList[index].optionId);
            this.selectList[pIndex].optionName.removeByValue(this.questionList[pIndex].optionList[index].optionName);
          }
        } else {
          this.selectList[pIndex].optionIdList = [];
          this.selectList[pIndex].optionName = [];
          this.questionList[pIndex].optionList.forEach((element, i) => {
            if (i === index) {
              return;
            } else {
              element.isSelected = false;
            }
          });

          this.questionList[pIndex].optionList[index].isSelected = true;
          this.selectList[pIndex].optionIdList.push(this.questionList[pIndex].optionList[index].optionId);
          this.selectList[pIndex].optionName.push(this.questionList[pIndex].optionList[index].optionName);
          api.removeDub(this.selectList[pIndex].optionIdList);
          api.removeDub(this.selectList[pIndex].optionName);
        }

        if (this.renderList[pIndex].optionList1[index].questionList2 && this.renderList[pIndex].optionList1[index].questionList2.length !== 0) {
          let secondList = this.renderList[pIndex].optionList1[index].questionList2;
          secondList.forEach((element) => {
            if (parseInt(element.questionType) === 3 && this.questionList[pIndex].optionList[index].isSelected) {
              if (!this.hasSelectedLevel) {
                this.showPainProgress = true;
                this.hasSelectedLevel = true;
              }
            }
          })
        }
      },
      painLevel(e){
        this.painValue = e.target.value;
      },
      painLevelRender(data) {
        let flag = false;
        if (data.questionList2 && data.questionList2.length !== 0) {
          data.questionList2.forEach((element) => {
            if (parseInt(element.questionType) === 3) {
              flag = true;
              this.painProgress = element.optionList2;
              this.painQuestion = element.questionId;
            }
          })
        }
        return flag;
      },
      otherReason(pIndex, index, e) {
        let content = this.questionList[pIndex].optionList[index].optionDesc;
        if (content.length > 500) {
          this.questionList[pIndex].optionList[index].optionDesc = content.substring(0, 500);
          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          this.errorMsg = "您已超过500字了";
          return false;
        }
        this.selectList[pIndex].optionDesc = content;

      },
      getPainLevelData(item, value) {
        this.showPainProgress = false;
        this.secondQuestionList[this.painQuestion + item.optionId] = {
          optionName: [],
          optionIdList: [],
          partId: this.patientMessage.partId,
          questionId: this.painQuestion,
          refOptionId: item.optionId,
          level: 2,
        };
        this.secondQuestionList[this.painQuestion + item.optionId].optionIdList.push(this.painProgress[value].optionId);
        this.secondQuestionList[this.painQuestion + item.optionId].optionName.push(this.painProgress[value].optionName + this.painProgress[value].optionDesc);
      },

      answerValidator() {
        let errorMsg = ['请选择怎么不舒服', '请选择持续多久了', '请选择加重多久了'];

        for (let index = 0; index < this.selectList.length; index++) {
          if (this.selectList[index].optionIdList.length === 0 || (this.selectList[index].optionDesc && this.selectList[index].optionDesc.length === 0)) {
            this.errorShow = true;
            setTimeout(() => {
              this.errorShow = false;
            }, 2000);
            this.errorMsg = errorMsg[index];
            document.body.scrollTop = this.$el.querySelectorAll(".consult-total")[index].offsetTop;
            return false;
          } else {
            if (this.$el.querySelectorAll(".consult-question-item.selected")[index].querySelectorAll(".consult-question-item").length && this.$el.querySelectorAll(".consult-question-item.selected")[index].querySelectorAll(".selected").length === 0) {
              this.errorShow = true;
              setTimeout(() => {
                this.errorShow = false;
              }, 2000);
              this.errorMsg = "请选择疼痛的性质";
              document.body.scrollTop = this.$el.querySelectorAll(".consult-total")[index].offsetTop;
              return false;
            } else if (this.$el.querySelectorAll(".consult-question-item.selected")[index].querySelectorAll("textarea")[0] && this.$el.querySelectorAll(".consult-question-item.selected")[index].querySelectorAll("textarea")[0].value.length === 0) {
              this.errorShow = true;
              setTimeout(() => {
                this.errorShow = false;
              }, 2000);
              this.errorMsg = "请填写其他情况 ";
              document.body.scrollTop = this.$el.querySelectorAll(".consult-total")[index].offsetTop;
              return false;
            }
          }
        }
        return true;
      },
      cancelEvent() {
        this.$router.go(-1);
      },
      ensureEvent() {
        const that = this;
        let flag = false;
        for (let i in this.secondQuestionList) {
          if (this.$el.querySelectorAll("[data-oid='" + this.secondQuestionList[i].refOptionId + "'] .pain-level-secondList").length !== 0) {
            this.selectList.push(this.secondQuestionList[i])
          }
        }

        this.selectList[0].optionName.forEach((element, index) => {
          if (element.includes("其他")) {
            flag = true;
//            that.selectList[0].optionName[index]="";
          }
        });
        if (!flag) {
          this.selectList[0].optionDesc = "";
        }

        this.$router.push({
          name: this.$route.query.from,
          params: {
            illnessName: this.selectList,
            type: this.$route.query.type,
            secondList: (function () {
              if (that.$el.querySelectorAll(".pain-level-secondList").length!==0&&that.secondQuestionList.length !== 0) {
                return that.secondQuestionList
              } else {
                return false;
              }
            }())
          },
          query: this.$route.query.query,

        })
      },
      getSymptomList2(){
        const that = this;
        if (!sessionStorage.getItem("symptomList")) {
          sessionStorage.setItem("symptomList", JSON.stringify(this.$route.params.symptomList));
        }
        if (!sessionStorage.getItem("secondList")) {
          sessionStorage.setItem("secondList", JSON.stringify(this.$route.params.secondList));
        }
        let symptomList = JSON.parse(sessionStorage.getItem("symptomList"));
        let secondList = (sessionStorage.getItem("secondList") !== "undefined") ? JSON.parse(sessionStorage.getItem("secondList")) : "";

        //获取选中项数据表
        console.log(symptomList);
        console.log(secondList);
        let index = "";
        switch (this.$route.query.type) {
          case "illness":
            index = 0;
            break;
          case "illnessTime":
            index = 1;
            break;
          case "heavyTime":
            index = 2;
            break;
          default:
            break;
        }
        //获取选中项数据表

        let selectListFn = function (list) {
          let result = {
            partId: symptomList.partId,
            optionIdList: [],
            optionName: [],
            optionDesc: []
          };

          list.optionIdList.forEach((element, index) => {
            result.optionIdList.push(element.optionId);
            result.questionId = list.questionId;
            result.optionName.push(element.optionName);
            if(element.optionDesc && element.optionDesc.length>0){
              result.optionDesc.push(element.optionDesc)
            }
          });


          that.selectList.push({
            partId: symptomList.partId,
            optionIdList: result.optionIdList,
            questionId: result.questionId,
            optionName: result.optionName,
            optionDesc: result.optionDesc.join(","),
            level: 1
          });

        };
        selectListFn(symptomList);
        let cycle = function (list1, list2) {
          list1.optionIdList.forEach((element, index) => {
            list2.optionList.forEach((eElement, eIndex) => {
              if (eElement.optionId == element.optionId) {
                eElement.isSelected = true;
                if (element.optionName.includes("其他")) {
                  eElement.optionDesc = element.optionDesc;
                }
              }
            });
          });
        };
        cycle(symptomList, that.questionList[0]);
        if (secondList) {
          for (let i in secondList) {
            that.secondQuestionList[i] = {
              optionIdList: (function () {
                let result = [];
                secondList[i].optionIdList.forEach((element, index) => {
                  result.push(element.optionId);
                });
                return result;
              }()),
              optionName: (function () {
                let result = [];
                secondList[i].optionIdList.forEach((element, index) => {
                  if (element.optionName.includes("分")) {
                      if (element.optionName.substring(0,2)==10){
                        that.painValue = element.optionName.substring(0, 2)
                      }else{
                        that.painValue = element.optionName.substring(0, 1)
                      }

                  }
                  result.push(element.optionName);
                });
                return result;
              }()),
              questionId: secondList[i].questionId,
              partId: secondList[i].partId,
              refOptionId: secondList[i].refOptionId
            };
            that.questionList[0].optionList.forEach((cElement, cIndex) => {
              if (cElement.questionList.length !== 0) {
                cElement.questionList.forEach((rElement, rIndex) => {
                  cycle(secondList[i], rElement);
                })
              }
            })
          }
        }
      },
    },
    components: {
      loading,
      toast,
      confirm
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .consult-main-inner {

    background-color: #f2f2f2;
    box-sizing: border-box;
  }

  .consult-wrapper {
    padding: rem(30px);
    background: #E6E6ED;
    .finish {
      box-shadow: 0 rem(4px) rem(12px) 0 rgba(47, 197, 189, 0.40);
      margin: 0 auto;
      margin-top: rem(78px);
      margin-bottom: rem(52px);
      height: rem(100px);
      width: rem(560px);
      display: block;
    }
    .cancel {
      @include font-dpr(18px);
      text-align: center;
      color: #909090;
      width: 100%;
    }
  }

  .consult-total {
    .selected .input-area {
      margin: 0 rem(-60px);
      margin-top: rem(20px);
      margin-bottom: rem(-20px);
    }
    .input-area {
      background-color: #fff;
      position: relative;
      padding: rem(25px) rem(60px);
      .text-num-tips {
        position: absolute;
        right: rem(60px);
        bottom: 0;
        color: #0ab375;
        @include font-dpr(12px);
      }
      & > textarea {
        outline: medium;
        resize: none;
        width: 100%;
        height: 1.6rem;
        border: none;
        background: none;
        @include font-dpr(18px);
        color: #333333;
        @include placeholder() {
          @include font-dpr(16px);
          color: #909090;
        }
      }

    }
  }

  body, html {

  }

  .consult-inner {
    background: #FFFFFF;
    border-radius: rem(8px);

    .consult-page {
      position: absolute;
      right: 0;
      top: 0;
      width: rem(86px);
      height: rem(64px);
      &.page-one {
        background: url("../../../common/image/img00/consult_V1.2/page number@2x.png");
        background-size: contain;
      }
      &.page-two {
        background: url("../../../common/image/img00/consult_V1.2/pagenumber02@2x.png");
        background-size: contain;
      }
    }
  }

  .consult-total {
    .consult-inner-title {
      padding: rem(60px) rem(60px);
      padding-bottom: rem(50px);
      & > h2 {
        @include font-dpr(20px);
        color: #222222;
        position: relative;
        &:before {
          content: '';
          position: absolute;
          @include circle(rem(16px), #2FC5BD)
          top: 50%;
          margin-top: rem(-8px);
          margin-left: rem(-32px);
        }
        span {
          vertical-align: middle;
        }
        & > em {
          @include font-dpr(16px);
          color: #666666;
          font-style: normal;
          font-weight: normal;
          vertical-align: middle;
        }
      }
    }
  }

  .consult-question-inner {

    &.mSelector {
      .selected {
        & > .icon-select {
          background: url("../../../common/image/img00/consult_V1.2/multiplechoice_on@2x.png");
          background-size: contain;
        }
      }
      .icon-select {
        background: url("../../../common/image/img00/consult_V1.2/multiplechoice_off@2x.png");
        background-size: contain;
      }
    }
    &.sSelector {
      .selected {
        & > .icon-select {
          background: url("../../../common/image/img00/consult_V1.2/radio_on@2x.png");
          background-size: contain;
        }
      }
      .icon-select {
        background: url("../../../common/image/img00/consult_V1.2/radio_off@2x.png");
        background-size: contain;
      }
    }
    .consult-question-item {
      &.selected > p {
        color: #07B6AC;
      }
      padding: rem(20px) rem(60px);
      &.dark {
        background-color: rgba(239, 239, 239, 0.30);
      }
      & > .icon-select {
        width: rem(48px);
        height: rem(48px);
        float: right;
      }
      & > p {
        @include font-dpr(18px);
        color: #333333;
        display: inline-block;
        max-width: 80%;
        @include ellipsis();
      }
    }
  }

  .welcome-tips {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.80);
    text-align: center;
    z-index: 5;
    &:before {
      content: '';
      display: inline-block;
      vertical-align: middle;
      height: 100%;
    }
    & > figure {
      display: inline-block;
      vertical-align: middle;
      width: rem(716px);
      height: rem(760px);
      position: relative;
      & > img {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
      .welcome-tips-ensure {
        width: 66.7%;
        position: absolute;
        bottom: rem(96px);
        left: 50%;
        transform: translateX(-50%);

      }
    }
  }

  .pain-level-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.80);
    text-align: center;
    z-index: 5;
  }

  .pain-level-box {
    background: #FFFFFF;
    border-radius: rem(8px);
    box-sizing: border-box;
    z-index: 5;
    position: absolute;
    width: rem(690px);
    left: 50%;
    margin-left: rem(-345px);
    top: 50%;
    transform: translateY(-50%);
    padding-bottom: rem(172px);
    .pain-level-ensure {
      width: rem(500px);
      height: rem(100px);
      position: absolute;
      bottom: rem(-50px);
      left: 50%;
      margin-left: rem(-250px);
      box-shadow: 0 rem(8px) rem(24px) 0 rgba(74, 74, 74, 0.50);
    }
    & > h3 {
      @include font-dpr(15px);
      text-align: left;
      color: #909090;
      font-weight: normal;
      padding-left: rem(40px);
      padding-top: rem(40px);

    }
    & > p {
      padding: rem(30px) 0;
      @include font-dpr(16px);
      color: #333333;
      background: rgba(239, 239, 239, 0.30);
      margin: rem(40px) 0;
    }
    .pain-level-progress {
      -webkit-appearance: none;
      position: relative;
      width: rem(682px);
      height: rem(116px);
      &.pain0 {
        background: url(../../../common/image/img00/consult_V1.2/scale00@2x.png) no-repeat;
        background-size: contain;
        &::-webkit-slider-thumb {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression00@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &.pain1 {
        background: url(../../../common/image/img00/consult_V1.2/scale02@2x.png) no-repeat;
        background-size: contain;
        &::-webkit-slider-thumb {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression02@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &.pain2 {
        background: url(../../../common/image/img00/consult_V1.2/scale03@2x.png) no-repeat;
        background-size: contain;
        &::-webkit-slider-thumb {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression03@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &.pain3 {
        background: url(../../../common/image/img00/consult_V1.2/scale05@2x.png) no-repeat;
        background-size: contain;
        &::-webkit-slider-thumb {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression05@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &.pain4 {
        background: url(../../../common/image/img00/consult_V1.2/scale08@2x.png) no-repeat;
        background-size: contain;
        &::-webkit-slider-thumb {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression08@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &.pain5 {
        background: url(../../../common/image/img00/consult_V1.2/scale09@2x.png) no-repeat;
        background-size: contain;
        &::-webkit-slider-thumb {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression09@2x.png) no-repeat;
          background-size: contain;
        }
      }

      &::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: none;
        width: rem(160px);
        height: rem(160px);
        display: block;
      }
    }
  }

  .pain-level-progress-tips {
    text-align: center;
    font-size: 0;
    position: relative;
    white-space: nowrap;
    left: 5%;
    & > li {
      display: inline-block;
      @include font-dpr(14px);
      padding-right: 0.52rem;
      color: #909090;
      &.tips {
        position: relative;
        &:before {
          content: '';
          @include font-dpr(12px);
          color: #AAAAAA;
          position: absolute;
          top: rem(-35px);
        }
        &.first:before {
          content: '不痛';
          left: -25%;
        }
        &.last:before {
          content: '巨痛';
          left: -10%;
        }
      }
    }
  }

  .consult-question-item .pain-level-secondList {
    margin: 0 rem(-60px);
    margin-bottom: rem(-20px);
    margin-top: rem(20px);
    background: #e5e5e5;
    overflow: hidden;
    &.mSelector {
      .selected {
        & > .icon-select {
          background: url("../../../common/image/img00/consult_V1.2/multiplechoice_on@2x.png");
          background-size: contain;
        }
      }
      .icon-select {
        background: url("../../../common/image/img00/consult_V1.2/multiplechoice_off@2x.png");
        background-size: contain;
      }
    }
    &.sSelector {
      .selected {
        & > .icon-select {
          background: url("../../../common/image/img00/consult_V1.2/radio_on@2x.png");
          background-size: contain;
        }
      }
      .icon-select {
        background: url("../../../common/image/img00/consult_V1.2/radio_off@2x.png");
        background-size: contain;
      }
    }
    .consult-inner-title h2 {
      @include font-dpr(16px);
      color: #333333;
    }
    .consult-question-item {
      @include font-dpr(16px);
    }
  }

  .pain-level-title-content {
    background: #FFFFFF;
    border-radius: rem(9999px);
    width: rem(564px);
    margin: 0 auto;
    padding: rem(28px) rem(16px);
    box-sizing: border-box;
    margin-top: rem(54px);
    &.pain0 .icon-pain-level-tips {
      background: url(../../../common/image/img00/consult_V1.2/secondary_expression00@2x.png) no-repeat;
      background-size: contain;
    }
    &.pain1 .icon-pain-level-tips {
      background: url(../../../common/image/img00/consult_V1.2/secondary_expression02@2x.png) no-repeat;
      background-size: contain;
    }
    &.pain2 .icon-pain-level-tips {
      background: url(../../../common/image/img00/consult_V1.2/secondary_expression03@2x.png) no-repeat;
      background-size: contain;
    }
    &.pain3 .icon-pain-level-tips {
      background: url(../../../common/image/img00/consult_V1.2/secondary_expression05@2x.png) no-repeat;
      background-size: contain;
    }
    &.pain4 .icon-pain-level-tips {
      background: url(../../../common/image/img00/consult_V1.2/secondary_expression08@2x.png) no-repeat;
      background-size: contain;
    }
    &.pain5 .icon-pain-level-tips {
      background: url(../../../common/image/img00/consult_V1.2/secondary_expression09@2x.png) no-repeat;
      background-size: contain;
    }

    & > .icon-pain-level-tips {
      width: rem(60px);
      height: rem(60px);
      display: inline-block;
      vertical-align: middle;
    }

    & > p {
      @include font-dpr(16px);
      color: #222222;
      vertical-align: middle;
      display: inline-block;
      @include ellipsis();
      width: 6rem;
      span {
        color: #07B6AC;
      }
    }
  }

  .consult-total {
    .input-area {
      margin: 0 auto;
    }
  }

  .to-second {
    box-shadow: 0 rem(4px) rem(12px) 0 rgba(47, 197, 189, 0.40);
    margin: 0 auto;
    margin-top: rem(78px);
    margin-bottom: rem(100px);
    height: rem(100px);
    width: rem(560px);
    display: block;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }
</style>
