<template>
  <div data-alcode-mod='711'>
    <section class="consult-main-inner" @click="showSymptomDetail=false">
      <progerssBar :progerssBarParams="{progerssParams:'2'}"></progerssBar>
      <transition name="fade">
        <section class="consult-wrapper" v-show="finish">
          <section class="consult-inner">
            <span class="consult-page page-one"></span>
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
                         @click="selectEvent(question.questionType==2,pIndex,index,item,$event)"
                >
                  <p>{{item.optionName}}</p>
                  <i class="icon-select"></i>
                  <figure class="input-area"
                          v-if="item.isAttachment==2&&questionList[pIndex].optionList[index].isSelected"
                          @click.stop="">
                  <textarea class="input-textarea"
                            placeholder="填写其他情况"
                            @input="otherReason(pIndex,index,$event)"
                            v-model="questionList[pIndex].optionList[index].optionDesc"
                            ref="otherEle"
                  >
                  </textarea>
                    <p class="text-num-tips"
                       v-show="getByteLen(questionList[pIndex].optionList[index].optionDesc)<=500"
                    >
                      {{getByteLen(questionList[pIndex].optionList[index].optionDesc)}}/500</p>
                  </figure>
                  <transition name="fade" v-if="painLevelRender(item)">
                    <section class="pain-level-wrapper" @click.stop="showSymptomDetail=false" v-if="showPainProgress">
                      <section class="pain-level-box">
                        <h3>告诉我您的疼痛程度</h3>
                        <p class="pain-level-content">
                          {{painProgress[painValue].optionName}}{{painProgress[painValue].optionDesc}}
                        </p>
                        <vue-slider
                          ref="slider"
                          v-model="painValue"
                          :piecewise-label="true"
                          :max="10"
                          :min="0"
                          :value="2"
                          :dot-size="dotSize"
                          :tooltip="false"
                          :class="painLevelClass"
                          class="pain-level-progress"
                          :label-style="labelStyle"
                        ></vue-slider>
                        <button class="btn-primary pain-level-ensure" @click.stop="getPainLevelData(item,painValue)">选好了

                        </button>
                      </section>
                    </section>
                  </transition>
                </article>
                <transition name="fadeDown">
                  <section class="second-wrapper"
                           v-if="item.questionList2&&item.questionList2.length!==0&&questionList[pIndex].optionList[index].isSelected">
                    <section class="pain-level-secondList"
                             :class="{mSelector:scItem.questionType==2,sSelector:scItem.questionType==1}"
                             @click.stop="showSymptomDetail=false"
                             v-if="item.questionList2&&item.questionList2.length!==0&&questionList[pIndex].optionList[index].isSelected"
                             v-for="(scItem,scIndex) in item.questionList2"
                             :data-qId="scItem.questionId">
                      <section class="pain-level-title-box" @click.stop="">
                        <header class="pain-level-title-content" v-if="scItem.questionType==3" :class="painLevelClass"
                                @click.stop="showPainProgress=true;showSymptomDetail=false">
                          <i class="icon-pain-level-tips"></i>
                          <p>
                            <em>疼痛等级：</em><span>{{painProgress[painValue].optionName}}{{painProgress[painValue].optionDesc}}</span>
                          </p>
                        </header>
                      </section>
                      <header class="consult-inner-title" v-if="scItem.questionType!=3">
                        <h2>
                          <span>{{scItem.questionName}}（必选）</span>
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
                        <span class="detail-tips" v-if="scoItem.isAttachment==1"
                              @click.stop="showQueryDetail(scoItem.optionId)">什么是{{scoItem.optionName}}</span>
                        <section class="symptom-detail-desc" v-if="showSymptomDetail && scoItem.isAttachment==1">
                          <figure>
                            <img :src="symptomDetail.img" alt="">
                          </figure>
                          <figcaption>{{symptomDetail.content}}</figcaption>
                        </section>
                        <i class="icon-select"></i>
                      </article>
                    </section>
                  </section>
                </transition>
              </section>
            </section>

            <section class="consult-total">
              <header class="consult-inner-title">
                <h2>
                  <span>这种情况多久了？</span>
                </h2>
              </header>
              <section class="consult-question-inner select-item">
                <article class="consult-question-item dark" @click.stop="delayTimePicker.show()">
                  <p>{{delayTimeContent}}</p>
                  <i class="icon-select"></i>
                </article>
              </section>
            </section>
            <section class="consult-total">
              <header class="consult-inner-title">
                <h2>
                  <span>最近一次加重是什么时候？</span>
                </h2>
              </header>
              <section class="consult-question-inner select-item">
                <article class="consult-question-item dark" @click.stop="heavyTimePicker.show()">
                  <p>{{heavyTimeContent}}</p>
                  <i class="icon-select"></i>
                </article>
              </section>
            </section>
            <section class="consult-total">
              <header class="consult-inner-title">
                <h2>
                  <span>您还有其他补充吗？</span>
                </h2>
              </header>

              <figure class="input-area">
              <textarea class="input-textarea" placeholder="可补充其他伴随症状或疾病相关情况" v-model="complication"
                        @input="complicationLimit"></textarea>
                <p class="text-num-tips" v-show="getByteLen(complication)<=100">
                {{getByteLen(complication)}}</p>
              </figure>
            </section>
            <transition name="fade">
              <section class="welcome-tips" v-if="firstConsult" @click="firstConsult=false">
                <figure @click.stop="firstConsult=true">
                  <img src="../../../common/image/img00/consult_V1.2/popups@2x.png" alt="">
                  <button class="btn-primary welcome-tips-ensure" @click.stop="firstConsult=false">好的</button>
                </figure>
              </section>
            </transition>

          </section>
          <button data-alcode='e127' class="btn-primary to-second" @click="paramsInstall">继续下一页</button>
          <transition name="fade">
            <toast :content="errorMsg" v-if="errorShow"></toast>
          </transition>
          <transition name="fade">
            <confirm
              :confirmParams="{
          'ensure':'离开',
          'cancel':'取消',
          'title':'您还未提交\n现在离开还需重新填写'
          }" v-if="levelShow" :showFlag.sync="levelShow" @cancelClickEvent="cancelEvent"
              @ensureClickEvent="ensureEvent">
            </confirm>
          </transition>
        </section>
      </transition>
      <loading :show="!finish"></loading>
      <backPopup v-if="backPopupShow" :backPopupShow.sync="backPopupShow"
                 :backPopupParams="{patientParams:patientParams}"></backPopup>
    </section>
  </div>
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
  import api from "common/js/util/util";
  import loading from "components/loading";
  import toast from "components/toast";
  import confirm from "components/confirm";
  import vueSlider from "vue-slider-component";
  import autosize from "autosize";
  import backPopup from "components/backToastForConsult";
  import progerssBar from "../components/progressBar";
  import Picker from "better-picker";

  import * as dateData from "../api/datePickerData";

  const XHRList = {
    query: "/mcall/cms/part/question/relation/v1/getMapList/",
    createMedicalRecord: "/mcall/customer/patient/case/v1/create/",
    submitMedicalRecord: "/mcall/customer/patient/case/option/v1/create/",
    symptomDetail: "/mcall/comm/data/symptom/option/v1/getMapById/"
  };
  export default {
    data() {
      return {
        labelStyle: {
          display: "inline-block",
          fontSize: "0.37rem",
          color: "#909090",
          top: "-1.5rem"
        },
        patientParams: {
          customerId: api.getPara().customerId,
          doctorId: api.getPara().doctorId
        },
        patientMessage: {},
        customerId: "",
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
        hasSecondQuestionId: "", //拥有二级问题的选项目前是疼痛；
        secondQuestionList: {},
        secondOptionsList: [],
        selectList: [],
        resultParam: {
          caseId: "",
          visitSiteId: 17,
          optionList: [],
          patientId: "",
          optionDesc: "",
          complication: ""
        },
        symptomDetail: {
          img: "",
          content: ""
        },
        showSymptomDetail: false,
        errorMsg: "",
        errorShow: false,
        levelShow: false,
        pageLeaveEnsure: false,
        backPopupShow: false,
        heavyTimePicker: null,
        heavyTimeContent: "最近几天开始",
        delayTimePicker: null,
        delayTimeContent: "最近几天开始",
      };
    },
    mounted() {
      document.title = "描述病情";
      this.patientMessage = this.$route.query;
      this.getQuestionList();
      this.finish = false;
      this.customerId = api.getPara().customerId;

      this.createTimePicker();

      setTimeout(() => {
        document.body.scrollTop = 20;
      }, 300);
      if (!api.getPara().doctorId) {
        if (this.$route.query.count == 0) {
          if (
            !localStorage.getItem("hasCome") ||
            localStorage.getItem("hasCome") != 0
          ) {
            this.firstConsult = true;
          }
        }
      }

      this.$nextTick(() => {
        setTimeout(() => {
          Array.from(
            this.$el.querySelectorAll("textarea")
          ).forEach((element, index) => {
            autosize(element);
            autosize.update(element);
          });
        }, 1000);
      });

      if (localStorage.getItem("PCIMLinks") !== null) {
        this.backPopupShow = true;
      } else {
        this.backPopupShow = false;
      }
      api.forbidShare();
    },
    computed: {
      dotSize() {
        let dpr = document.documentElement.getAttribute("data-dpr");
        let result = "";
        console.log(dpr);
        switch (parseInt(dpr)) {
          case 3:
            result = 240;
            break;
          case 2:
            result = 160;
            break;
          case 1:
            result = 80;
            break;
        }
        return result;
      },
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
    beforeRouteLeave(to, from, next) {
      if (to.name === "selectPart") {
        if (localStorage.getItem("PCIMLinks") !== null) {
          this.backPopupShow = true;
          this.pageLeaveEnsure = true;
        } else {
          this.backPopupShow = false;
          this.levelShow = true;
        }
      } else {
        this.pageLeaveEnsure = true;
      }
      next(this.pageLeaveEnsure);
    },
    methods: {
      createTimePicker() {
        const dataType = [{
          text: "天",
          value: "1",
        }, {
          text: "周",
          value: "2",
        }, {
          text: "月",
          value: "3",
        }, {
          text: "年",
          value: "4",
        }];
        this.heavyTimePicker = new Picker({
          data: [dateData.dataDay, dataType],
          selectedIndex: [0, 0]
        });
        this.delayTimePicker = new Picker({
          data: [dateData.dataWeek, dataType.slice(1,4)],
          selectedIndex: [0, 0]
        });
        this.heavyTimePicker.on('picker.select', (selectedValue, selectedIndex) => {
          this.heavyTimeContent = `${selectedValue[0]}${dataType[selectedIndex[1]].text}`
        });
        this.delayTimePicker.on('picker.select', (selectedValue, selectedIndex) => {
          this.delayTimeContent = `${selectedValue[0]}${dataType[selectedIndex[1]].text}`
        });
        this.heavyTimePicker.on("picker.change", (index, selectedIndex) => {
          console.log(index, selectedIndex);
          if (index === 1) {
            switch (selectedIndex) {
              case 0:
                this.heavyTimePicker.refillColumn(0, dateData.dataDay);
                break;
              case 1:
                this.heavyTimePicker.refillColumn(0, dateData.getList(4));
                break;
              case 2:
                this.heavyTimePicker.refillColumn(0, dateData.getList(12));
                break;
              case 3:
                this.heavyTimePicker.refillColumn(0, dateData.getList(50));
                break;
              default:
                break;
            }
          }
        });
        this.delayTimePicker.on("picker.change", (index, selectedIndex) => {
          console.log(index, selectedIndex);
          if (index === 1) {
            switch (selectedIndex) {
              case 0:
                this.delayTimePicker.refillColumn(0, dateData.getList(4));
                break;
              case 1:
                this.delayTimePicker.refillColumn(0, dateData.getList(12));
                break;
              case 2:
                this.delayTimePicker.refillColumn(0, dateData.getList(50));
                break;
              default:
                break;
            }
          }
        })
      },
      secondClickEvent(type, scIndex, scoIndex, index, pIndex) {
        const optionId = this.questionList[pIndex].optionList[index].questionList[
          scIndex
          ].optionList[scoIndex].optionId;
        const refOptionId = this.questionList[pIndex].optionList[index].optionId;
        const questionId = this.questionList[pIndex].optionList[index]
          .questionList[scIndex].questionId;
        const slutParam = questionId + refOptionId;
        if (type) {
          this.questionList[pIndex].optionList[index].questionList[
            scIndex
            ].optionList[scoIndex].isSelected = !this.questionList[pIndex]
            .optionList[index].questionList[scIndex].optionList[scoIndex]
            .isSelected;
          if (
            this.questionList[pIndex].optionList[index].questionList[scIndex]
              .optionList[scoIndex].isSelected
          ) {
            if (!this.secondQuestionList[slutParam]) {
              this.secondQuestionList[slutParam] = {
                refOptionId: refOptionId,
                questionId: questionId,
                optionIdList: [],
                partId: this.patientMessage.partId
              };
            }
            this.secondQuestionList[slutParam].optionIdList.push(optionId);
            api.removeDub(optionId);
          } else {
            this.secondQuestionList[slutParam].optionIdList.removeByValue(
              optionId
            );
          }
        } else {
          this.questionList[pIndex].optionList[index].questionList[
            scIndex
            ].optionList.forEach((element, i) => {
            if (i === scoIndex) {
              return;
            } else {
              element.isSelected = false;
            }
          });
          this.questionList[pIndex].optionList[index].questionList[
            scIndex
            ].optionList[scoIndex].isSelected = true;
          if (!this.secondQuestionList[slutParam]) {
            this.secondQuestionList[slutParam] = {
              refOptionId: refOptionId,
              questionId: questionId,
              optionIdList: [],
              partId: this.patientMessage.partId
            };
          }
          this.secondQuestionList[slutParam].optionIdList[0] = optionId;
          api.removeDub(optionId);
        }
      },
      getQuestionList() {
        const that = this;
        api.ajax({
          url: XHRList.query,
          method: "POST",
          data: {
            partId: this.patientMessage.partId,
            isValid: "1",
            firstResult: "0",
            maxResult: "9999",
            sortType: ""
          },
          beforeSend(config) {
          },
          done(data) {
            if (data.responseObject.responseData) {
              let dataList = data.responseObject.responseData.dataList;
              if (dataList && dataList.length !== 0) {
                that.renderList = dataList;
                that.hasSecondQuestionId = dataList[0].optionList1[0].optionId;
                that.getBaseIdList(dataList);
              }
            }
            that.finish = true;
            if (localStorage.getItem("selectList")) {
              that.painValue = localStorage.getItem("painValue");
              that.selectList = JSON.parse(localStorage.getItem("selectList"));
              that.secondQuestionList = JSON.parse(
                localStorage.getItem("secondList")
              );
              that.questionList = JSON.parse(
                localStorage.getItem("questionList")
              );
              that.complication = localStorage.getItem("complication");
            }
          },
          fail(err) {
          }
        });
      },
      getBaseIdList(dataList) {
        dataList.forEach(element => {
          this.questionList.push({
            questionId: element.questionId,
            optionList: (function () {
              let result = [];
              element.optionList1.forEach(cElement => {
                result.push({
                  optionId: cElement.optionId,
                  isSelected: false,
                  optionDesc: "",
                  questionList: (function () {
                    let result = [];
                    if (cElement.questionList2.length !== 0) {
                      cElement.questionList2.forEach(eElement => {
                        result.push({
                          questionId: eElement.questionId,
                          optionList: (function () {
                            let result = [];
                            eElement.optionList2.forEach(eeElement => {
                              result.push({
                                optionId: eeElement.optionId,
                                isSelected: false,
                                optionDesc: ""
                              });
                            });
                            return result;
                          })()
                        });
                      });
                    }
                    return result;
                  })()
                });
              });
              return result;
            })()
          });

          this.selectList.push({
            questionId: element.questionId,
            optionIdList: [],
            partId: this.patientMessage.partId,
            optionDesc: ""
          });
        });
      },
      selectEvent(type, pIndex, index, item, $event) {
        if (type) {
          // debugger;
          this.questionList[pIndex].optionList[index].isSelected = !this
            .questionList[pIndex].optionList[index].isSelected;
          if (this.questionList[pIndex].optionList[index].isSelected) {
            // debugger;
            console.log(this.questionList[pIndex].optionList[index].optionId);
            if (
              this.questionList[pIndex].optionList[index].optionId ==
              this.hasSecondQuestionId
            ) {
              this.selectList[pIndex].optionIdList.unshift(
                this.questionList[pIndex].optionList[index].optionId
              );
            } else {
              this.selectList[pIndex].optionIdList.push(
                this.questionList[pIndex].optionList[index].optionId
              );
            }
            api.removeDub(this.selectList[pIndex].optionIdList);
          } else {
            // debugger;
            this.selectList[pIndex].optionIdList.removeByValue(
              this.questionList[pIndex].optionList[index].optionId
            );
          }
        } else {
          this.selectList[pIndex].optionIdList = [];
          this.questionList[pIndex].optionList.forEach((element, i) => {
            if (i === index) {
              return;
            } else {
              element.isSelected = false;
            }
          });
          this.questionList[pIndex].optionList[index].isSelected = true;
          this.selectList[pIndex].optionIdList.push(
            this.questionList[pIndex].optionList[index].optionId
          );
          api.removeDub(this.selectList[pIndex].optionIdList);
        }

        if (
          this.renderList[pIndex].optionList1[index].questionList2 &&
          this.renderList[pIndex].optionList1[index].questionList2.length !== 0
        ) {
          let secondList = this.renderList[pIndex].optionList1[index]
            .questionList2;
          secondList.forEach(element => {
            if (
              parseInt(element.questionType) === 3 &&
              this.questionList[pIndex].optionList[index].isSelected
            ) {
              if (!this.hasSelectedLevel) {
                this.showPainProgress = true;
                this.hasSelectedLevel = true;
              }
            }
          });
        }

        if (item.isAttachment == 2) {
          if ($event.currentTarget.className.indexOf("selected") < 0) {
            console.log($event.currentTarget);
            const ele = $event.currentTarget;
            // 此物在IOS下似乎不能顺利好使
            // 以后再说
            setTimeout(() => {
              ele.querySelector("textarea").focus();
            }, 100);
          }
        }

        setTimeout(() => {
          autosize(this.$el.querySelector("textarea"));
        }, 100);
      },
      showQueryDetail(id) {
        let that = this;
        this.showSymptomDetail = !this.showSymptomDetail;
        if (this.showSymptomDetail) {
          api.ajax({
            url: XHRList.symptomDetail,
            method: "POST",
            data: {
              optionId: id,
              isValid: "1",
              sortType: ""
            },
            beforeSend(config) {
            },
            done(data) {
              that.finish = true;
              if (data.responseObject.responseData) {
                let dataList = data.responseObject.responseData.dataList;
                if (dataList && dataList.length !== 0) {
                  let imgList = dataList[0].optionAttList[0].optionAttUrl;
                  that.symptomDetail = {
                    content: dataList[0].optionDesc,
                    img: imgList
                  };
                }
              }
            },
            fail(err) {
            }
          });
        }
      },
      painLevel(e) {
        this.painValue = e.target.value;
      },
      painLevelRender(data) {
        let flag = false;
        if (data.questionList2 && data.questionList2.length !== 0) {
          data.questionList2.forEach(element => {
            if (parseInt(element.questionType) === 3) {
              flag = true;
              this.painProgress = element.optionList2;
              this.painQuestion = element.questionId;
            }
          });
        }
        return flag;
      },
      otherReason(pIndex, index, e) {
        let ranges = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;

        if (ranges.test(this.questionList[pIndex].optionList[index].optionDesc)) {
          this.questionList[pIndex].optionList[
            index
            ].optionDesc = this.questionList[pIndex].optionList[
            index
            ].optionDesc.replace(ranges, "");
        }
        let content = this.questionList[pIndex].optionList[index].optionDesc;
        if (api.getByteLen(content) > 1000) {
          this.questionList[pIndex].optionList[
            index
            ].optionDesc = api.getStrByteLen(content, 1000);
          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          this.errorMsg = "最多只能输入500字";
          return false;
        }
        this.selectList[pIndex].optionDesc = content;
      },
      getPainLevelData(item, value) {
        this.showPainProgress = false;
        this.secondQuestionList[item.optionId] = {
          optionDesc: "",
          optionIdList: [],
          partId: this.patientMessage.partId,
          questionId: this.painQuestion,
          refOptionId: item.optionId
        };
        this.secondQuestionList[item.optionId].optionIdList.push(
          this.painProgress[value].optionId
        );
        this.secondQuestionList[item.optionId].optionDesc =
          this.painProgress[value].optionName +
          this.painProgress[value].optionDesc;
      },
      //数据装载...
      paramsInstall() {
        if (!this.answerValidator()) {
          return false;
        }
        localStorage.setItem("selectList", JSON.stringify(this.selectList));
        localStorage.setItem(
          "secondList",
          JSON.stringify(this.secondQuestionList)
        );
        localStorage.setItem("questionList", JSON.stringify(this.questionList));
        localStorage.setItem("painValue", this.painValue);
        localStorage.setItem("complication", this.complication);
        let finalSubmitParam = {
          userId: this.$route.query.userId,
          optionList: this.selectList,
          patientId: this.patientMessage.patientId,
          complication: this.complication,
          count: this.$route.query.count
        };
        for (let i in this.secondQuestionList) {
          if (
            this.$el.querySelectorAll(
              "[data-oid='" +
              this.secondQuestionList[i].refOptionId +
              "'] .pain-level-secondList"
            ).length !== 0
          ) {
            finalSubmitParam.optionList.push(this.secondQuestionList[i]);
          }
        }

        for (let j = 0; j < finalSubmitParam.optionList.length; j++) {
          if (finalSubmitParam.optionList[j].optionIdList.length === 0) {
            break;
          } else {
            finalSubmitParam.optionList[
              j
              ].optionIdList = finalSubmitParam.optionList[j].optionIdList.join(
              ","
            );
          }
        }
        this.pageLeaveEnsure = true;

        localStorage.removeItem("submitParams");

        this.$router.push({
          name: "history",
          params: finalSubmitParam
        });
      },
      answerValidator() {
        let errorMsg = ["您还有问题未完善", "您还有问题未完善", "您还有问题未完善"];
        let flag = false;
        for (let index = 0; index < this.selectList.length; index++) {
          if (
            this.selectList[index].optionIdList.length ===
            0 /*|| this.selectList[index].optionDesc.length === 0*/
          ) {
            this.errorShow = true;
            setTimeout(() => {
              this.errorShow = false;
            }, 2000);
            this.errorMsg = errorMsg[index];
            document.body.scrollTop = this.$el.querySelectorAll(".consult-total")[
              index
              ].offsetTop;
            flag = false;
            break;
          } else {
            if (
              this.$el
                .querySelectorAll(".consult-total")
                [index].querySelector(".second-wrapper") &&
              !this.$el
                .querySelectorAll(".consult-total")
                [index].querySelector(".second-wrapper .selected")
            ) {
              this.errorShow = true;
              setTimeout(() => {
                this.errorShow = false;
              }, 2000);
              this.errorMsg = "您还有问题未完善";
              document.body.scrollTop = this.$el.querySelectorAll(
                ".consult-total"
              )[index].offsetTop;
              flag = false;
              break;
            } else if (
              this.$el
                .querySelectorAll(".consult-total")
                [index].querySelector(
                ".consult-question-item.selected textarea"
              ) &&
              this.$el
                .querySelectorAll(".consult-total")
                [index].querySelector(".consult-question-item.selected textarea")
                .value.length === 0
            ) {
              this.errorShow = true;
              setTimeout(() => {
                this.errorShow = false;
              }, 2000);
              this.errorMsg = "您还有问题未完善 ";
              document.body.scrollTop = this.$el.querySelectorAll(
                ".consult-total"
              )[index].offsetTop;
              flag = false;
              break;
            } else {
              flag = true;
            }
          }
        }
        return flag;
      },
      complicationLimit() {
        let ranges = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi;

        if (ranges.test(this.complication)) {
          this.complication = this.complication.replace(ranges, "");
        }
        let content = this.complication;
        if (api.getByteLen(content) > 1000) {
          this.complication = api.getStrByteLen(content, 1000);
          this.errorShow = true;
          setTimeout(() => {
            this.errorShow = false;
          }, 2000);
          this.errorMsg = "最多只能输入500字";
          return false;
        }
      },
      cancelEvent() {
        this.levelShow = false;
        this.pageLeaveEnsure = false;
      },
      ensureEvent() {
        localStorage.setItem("isSubmit", "1");
        this.levelShow = false;
        this.pageLeaveEnsure = true;
        this.$router.go(-1);
      },
      getByteLen(len) {
        return 1000 - api.getByteLen(len);
      }
    },
    components: {
      loading,
      toast,
      confirm,
      vueSlider,
      backPopup,
      progerssBar
    },
    activated() {
      this.levelShow = false;
      this.pageLeaveEnsure = false;
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  .consult-main-inner {
    background: url("../../../common/image/background_wave.png") no-repeat bottom center #f2f2f2;
    background-size: 100% rem(272px);
    box-sizing: border-box;
  }

  .consult-wrapper {
    padding: rem(30px);
  }

  .consult-total {
    .selected > .input-area {
      margin: 0 rem(-60px);
      margin-top: rem(20px);
      margin-bottom: rem(-40px);
      padding: 0.333rem 0.8rem;
      .text-num-tips {
        right: rem(60px);
      }
    }
    .input-area {
      background-color: #fff;
      position: relative;
      padding: rem(25px) 0;
      .text-num-tips {
        position: absolute;
        right: rem(0px);
        bottom: 0;
        color: #0ab375;
        @include font-dpr(12px);
      }
      & > textarea {
        outline: medium;
        resize: none;
        width: 100%;
        height: 0.6rem;
        max-height: 1.7rem;
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

  body,
  html {
  }

  .consult-inner {
    background: #ffffff;
    border-radius: rem(16px);
    padding-bottom: rem(100px);
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
          content: "";
          position: absolute;
          @include circle(rem(16px), #2fc5bd);
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
    .detail-tips {
      @include font-dpr(14px);
      color: #07b6ac;
      vertical-align: middle;
      &:before {
        content: "";
        display: inline-block;
        vertical-align: middle;
        width: rem(48px);
        height: rem(48px);
        background: url(../../../common/image/img00/consult_V1.2/doubt2@2x.png);
        background-size: contain;
        margin-left: rem(28px);
      }
    }
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
    &.select-item {
      .icon-select {
        width: rem(36px);
        height: rem(36px);
        background: url("../../../common/image/img00/consult_V1.2/arrow@2x.png");
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
        color: #07b6ac;
      }
      padding: rem(38px) rem(60px);
      &.dark {
        background-color: rgba(239, 239, 239, 0.3);
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
        vertical-align: middle;
      }
    }
  }

  .welcome-tips {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    z-index: 5;
    &:before {
      content: "";
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
        padding: rem(30px) 0;
        left: 50%;
        transform: translateX(-50%);
        box-shadow: 0 rem(4px) rem(12px) 0 rgba(74, 74, 74, 0.5);
      }
    }
  }

  .pain-level-wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    text-align: center;
    z-index: 5;
  }

  .pain-level-box {
    background: #ffffff;
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
      box-shadow: 0 rem(8px) rem(24px) 0 rgba(74, 74, 74, 0.5);
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
      background: rgba(239, 239, 239, 0.3);
      margin: rem(40px) 0;
    }
    .pain-level-progress {
      -webkit-appearance: none;
      position: relative;
      top: 0.9rem;
      width: rem(682px);
      height: rem(116px);
      .vue-slider {
        background: none;
      }
      .vue-slider-process {
        background: none;
      }
      .vue-slider-piecewise {
        li {
          &:before {
            content: "";
            @include font-dpr(12px);
            color: #aaaaaa;
            position: absolute;
            top: rem(-150px);
            left: -0.25rem;
            white-space: nowrap;
          }
          &:nth-child(1) {
            &:before {
              content: "不痛";
            }
          }
          &:nth-last-child(1) {
            &:before {
              content: "巨痛";
            }
          }
        }
      }
      .vue-slider-dot {
        /*width:rem(160px) !important;*/
        /*height:rem(160px) !important;*/
        box-shadow: none;
        background: url(../../../common/image/img00/consult_V1.2/Popups_expression00@2x.png) no-repeat;
        background-size: contain;
      }
      &.pain0 {
        background: url(../../../common/image/img00/consult_V1.2/scale00@2x.png) no-repeat;
        background-size: contain;
        .vue-slider-dot {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression00@2x.png) no-repeat;
          background-size: contain;
          position: absolute;
          top: 0;
        }
      }
      &.pain1 {
        background: url(../../../common/image/img00/consult_V1.2/scale02@2x.png) no-repeat;
        background-size: contain;
        .vue-slider-dot {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression02@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &.pain2 {
        background: url(../../../common/image/img00/consult_V1.2/scale03@2x.png) no-repeat;
        background-size: contain;
        .vue-slider-dot {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression03@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &.pain3 {
        background: url(../../../common/image/img00/consult_V1.2/scale05@2x.png) no-repeat;
        background-size: contain;
        .vue-slider-dot {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression05@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &.pain4 {
        background: url(../../../common/image/img00/consult_V1.2/scale08@2x.png) no-repeat;
        background-size: contain;
        .vue-slider-dot {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression08@2x.png) no-repeat;
          background-size: contain;
        }
      }
      &.pain5 {
        background: url(../../../common/image/img00/consult_V1.2/scale09@2x.png) no-repeat;
        background-size: contain;
        .vue-slider-dot {
          background: url(../../../common/image/img00/consult_V1.2/Popups_expression09@2x.png) no-repeat;
          background-size: contain;
        }
      }
    }
  }

  .vue-slider {
    background: none !important;
  }

  .pain-level-progress-tips {
    text-align: center;
    font-size: 0;
    position: relative;
    white-space: nowrap;
    left: 5%;
    margin-bottom: rem(20px);
    & > li {
      display: inline-block;
      @include font-dpr(14px);
      padding-right: 0.52rem;
      color: #909090;
      &.tips {
        position: relative;
        &:before {
          content: "";
          @include font-dpr(12px);
          color: #aaaaaa;
          position: absolute;
          top: rem(-35px);
        }
        &.first:before {
          content: "不痛";
          left: -25%;
        }
        &.last:before {
          content: "巨痛";
          left: -10%;
        }
      }
    }
  }

  .second-wrapper {
    padding-bottom: rem(65px);
    padding-top: rem(20px);
    background: #e5e5e5;
    transform-origin: 0 0;
    .consult-inner-title {
      padding: 0;
      padding-top: rem(64px);
      padding-bottom: rem(28px);
      margin-left: rem(106px);
      margin-right: rem(60px);
    }
    .consult-question-item {
      padding: rem(40px) 0;
      margin-left: rem(106px);
      margin-right: rem(60px);
      /*border-bottom: rem(1px) solid #D5D5D5;*/
      border-top: rem(1px) solid #d5d5d5;
      box-sizing: border-box;
      color: #666;
      p {
        color: #666;
        @include font-dpr(16px);
      }
    }
    .pain-level-secondList {
      /*    margin-bottom: rem(-20px);
              margin-top: rem(20px);*/

      /*overflow: hidden;*/

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
  }

  .pain-level-title-content {
    background: #ffffff;
    border-radius: rem(9999px);
    width: rem(564px);
    margin: 0 auto;
    padding: rem(14px) rem(16px);
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
      position: relative;
      width: 6rem;
      em {
        font-style: normal;
        vertical-align: middle;
      }
      span {
        @include ellipsis();
        color: #07b6ac;
        width: 3rem;
        display: inline-block;
        vertical-align: middle;

        &:after {
          content: "";
          display: inline-block;
          vertical-align: middle;
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: rem(-18px);
          @include square(rem(36px));
          background: url("../../../common/image/img00/consult_V1.2/arrow@2x.png");
          background-size: contain;
        }
      }
    }
  }

  .consult-total {
    .input-area {
      margin: 0 0.8rem;
      border-bottom: rem(2px) solid #f4f4f4;
    }
  }

  .to-second {
    box-shadow: 0 rem(4px) rem(12px) 0 rgba(47, 197, 189, 0.4);
    margin: 0 auto;
    margin-top: rem(78px);
    margin-bottom: rem(100px);
    height: rem(100px);
    width: rem(560px);
    display: block;
  }

  .symptom-detail-desc {
    $w: rem(540px);
    position: absolute;
    width: $w;
    left: 50%;
    margin-left: -$w/2;
    background: #ffffff;
    border-radius: rem(12px);
    padding: rem(60px) rem(50px);
    box-shadow: 0 rem(2px) rem(10px) 0 rgba(0, 190, 175, 0.25);
    box-sizing: border-box;
    margin-top: 0.2rem;
    &:after {
      content: "";
      display: block;
      @include triangle(rem(20px), #fff, up);
      position: absolute;
      top: -0.236666rem;
      left: 33%;
    }
    & > figure {
      width: 100%;
      img {
        width: 100%;
        vertical-align: top;
      }
    }
    & > figcaption {
      margin-top: rem(60px);
      @include font-dpr(15px);
      color: #555;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .fadeDown-enter-active,
  .fadeDown-leave-active {
    opacity: 1;
    transition: all ease-in-out 0.4s;
  }

  .fadeDown-enter,
  .fadeDown-leave-to {
    opacity: 0;
  }
</style>
