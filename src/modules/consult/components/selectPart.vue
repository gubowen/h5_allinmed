<template>
  <div data-alcode-mod='710' style="height:100%" :class="{'isMB':!isWeChat}">
    <section class="main-inner select-part" @click="secondShow=false;currentThreeLevel=0;imgArray=[]">
      <header class="part-select-title">
        <h3>点选最不适部位：</h3>
      </header>
      <section class="main-inner-content" :class="{'androidScale':!isIos&&dpr<2.5}">
        <section class="body-picture body-picture-f" :class="pointClassObject">
          <figure class="body-picture-content">
            <img class="body-picture-img" :src="patientBody" alt="">
            <!--<img class="body-picture-img" src="../../../common/image/img00/patientConsult/shoulders.png" alt="">-->
            <img v-for="item in imgArray" :src="item">
            <section class="pain-point-box">
              <div class="pain-point"
                   v-for="(item , pIndex) in pointList.front"
                   @click="selectPartToSecond(pIndex,'show')">
              </div>
            </section>
            <!--<section class="hide-point-box">-->
            <!--<div class="hide-point"-->
            <!--v-for="(item,hIndex) in hidePoint.front"-->
            <!--@click="selectPartToSecond(hIndex,'hide')"-->
            <!--:class="{on:currentHindex===hIndex}">-->
            <!--</div>-->
            <!--</section>-->
          </figure>
        </section>
        <button class="body-picture-overturn" @click="turnDirection" data-alcode='e125'></button>
      </section>

      <loading v-show="finish"></loading>
      <transition name="fade">
        <!--<section class="btnBox-tips maskers show" vertical="" v-if="secondShow" @click="secondShow=false">-->
        <section class="part-box" :class="clickDirection" v-if="secondShow" @click.stop="secondShow=true">
          <!--<article><h2>请再确认一下不适部位</h2></article>-->
          <a class="btnBox-btn btn-hollow" :class="{'on':index == currentThreeLevel}" v-for="(item,index) in secondList"
             @click="ensurePart(index)">{{item.partNameAlias}}</a>
          <a class="btnBox-btn btn-confirm" @click='surePart' data-alcode='e126'>确认</a>
        </section>
        <!--</section>-->
      </transition>
      <backPopup v-if="backPopupShow" :backPopupShow.sync="backPopupShow"
                 :backPopupParams="{patientParams:patientParams}"></backPopup>
    </section>
  </div>
  <!--@backSuccess="backSuccessBack" @docCallBack="docStatusChange"-->
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：部位选择
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang/lichenyang on 2017/7/20.
   */
  import loading from "components/loading";
  import api from "common/js/util/util";
  import backPopup from "components/backToastForConsult";
  import siteSwitch from '@/common/js/siteSwitch/siteSwitch';

  const XHRList = {
    partList: "/mcall/comm/data/part/v1/getMapSearchList/"
  };
  export default {

    data() {
      return {
        isWeChat: true, //是否是微信
        patientParams: {
          customerId: api.getPara().customerId,
          doctorId: api.getPara().doctorId,
        },
        dpr: window.devicePixelRatio,
        isIos: navigator.userAgent.toLowerCase().includes("iphone"),
        backPopupShow: '',
        clickDirection: "right",//用户点击的方向
        bodyImg: { //人体图像集合
          man: {
//            front: require('../../../common/image/img00/patientConsult/body_man_front.png'),
            front: require('../../../common/image/img00/patientConsult/man_front.png'),
//            back: require('../../../common/image/img00/patientConsult/body_man_back.png'),
            back: require('../../../common/image/img00/patientConsult/man_back.png'),
          },
          woman: {
//            front: require('../../../common/image/img00/patientConsult/body_woman_front.png'),
            front: require('../../../common/image/img00/patientConsult/woman_front.png'),
//            back: require('../../../common/image/img00/patientConsult/body_woman_back.png'),
            back: require('../../../common/image/img00/patientConsult/woman_back.png'),
          },
          kid: {
//            front: require('../../../common/image/img00/patientConsult/body_kid_front.png'),
            front: require('../../../common/image/img00/patientConsult/child_front.png'),
//            back: require('../../../common/image/img00/patientConsult/body_kid_back.png'),
            back: require('../../../common/image/img00/patientConsult/child_back.png'),
          }
        },
        pointList: {   //点集合...显示热区
          front: [
            '1502686180415',//1
            '1502686180415',//2
            '1502689695935',//3
            '1502689695935',//4
            '1502690198521',//5
            '1502690198521',//6
            '1502690439371',//7
            '1502690439371',//8
            '1502691077056',//9
            '1502691077056',//10
            '1502692059718',//11
            '1502692059718',//12
            '1502692884775',//13
            '1502692884775',//14
            '1502693114216',//15
            '1502693114216',//16
            '1502695666392',//17
            '1502695666392',//18
            '1502691850294',//19
            '1502691850294',//20
            '1502698164071',//21
            '1502698288786',//22
            '1502698892280',//23
          ],
          back: [
            '1502686180415',//1
            '1502686180415',//2
            '1502689695935',//3
            '1502689695935',//4
            '1502690198521',//5
            '1502690198521',//6
            '1502690439371',//7
            '1502690439371',//8
            '1502691077056',//9
            '1502691077056',//10
            '1502692059718',//11
            '1502692059718',//12
            '1502692884775',//13
            '1502692884775',//14
            '1502693114216',//15
            '1502693114216',//16
            '1502695666392',//17
            '1502695666392',//18
            '1502698288786',//19
            '1502698475475',//20
            '1502698641492',//21
            '1502698756885',//22
            '1502699009330',//23
          ],
        },
        imgArray: [],//选择部位热点图片数组
        patientMessage: {},  //患者基本信息...由Router.params传递
        direction: "back", //人体朝向...驱动点位切换
        finish: false,  //加载态
        currentType: "",//当前患者类型
        currentTwoLevel: -1,//当前二级部位
        currentThreeLevel: 0,//当前三级部位
        currentPindex: -1,//当前显示热区点
//        currentHindex: -1,//当前隐藏热区点
        secondShow: false,//二级问题显示状态钩子
        secondList: [] //二级问题数据集合
      }
    },
    mounted() {  //渲染启动...接收上一页携带路由参数体
      // 检测是否是微信
      siteSwitch.weChatJudge(() => {
        this.isWeChat = true;
      }, () => {
        this.isWeChat = false;
      });
      this.patientMessage = this.$route.query;
      document.title = "选择部位";
      this.currentType = this.patientType();
      localStorage.removeItem("hasCome");
      if (localStorage.getItem("PCIMLinks") !== null) {
        this.backPopupShow = true;
      } else {
        this.backPopupShow = false;
      }
      api.forbidShare();
    },
    computed: {
      patientBody() {   //反应数据驱动...获取人体性别年龄
        const age = parseInt(this.patientMessage.age);
        const sex = parseInt(this.patientMessage.sex);
        if (age <= 12) {
          return this.bodyImg["kid"][this.direction];
        } else {
          if (sex === 1) {
            return this.bodyImg["man"][this.direction];
          } else {
            return this.bodyImg["woman"][this.direction];
          }
        }
      },
      pointClassObject() {//反应数据驱动...热区点位定位
        return {
          "man-front front": this.patientType() === "man" && this.direction === "front",
          "woman-front front": this.patientType() === "woman" && this.direction === "front",
          "kid-front front": this.patientType() === "kid" && this.direction === "front",
          "man-back back": this.patientType() === "man" && this.direction === "back",
          "woman-back back": this.patientType() === "woman" && this.direction === "back",
          "kid-back back": this.patientType() === "kid" && this.direction === "back",
        }
      }
    },
    props: {},
    beforeRouteLeave(to, from, next) {
      if (to.name === "addPatient") {
        if (localStorage.getItem("PCIMLinks") !== null) {
          localStorage.removeItem("PCIMLinks");
          this.pageLeaveEnsure = true;
        }
      }
      next(this.pageLeaveEnsure)
    },
    methods: {
      patientType() { //患者基本类型
        const age = parseInt(this.patientMessage.age);
        const sex = parseInt(this.patientMessage.sex);
        if (age <= 12) {
          return "kid";
        } else {
          if (sex === 1) {
            return "man";
          } else {
            return "woman";
          }
        }
      },
      turnDirection() { //翻转图片
        this.imgArray = [];
        if (this.direction === "front") {
          this.direction = "back";
        } else {
          this.direction = "front";
        }
      },
      //获取用户点击屏幕左右还是右侧
      leftRightClick() {
        let frontFlag = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];//根据正面可点区域的顺序总结的；
        let backFlag = [1, 3, 5, 7, 9, 11, 13, 15, 17];//根据背面可点区域的顺序总结的；
        switch (this.direction) {
          case "front":
            frontFlag.indexOf(this.currentPindex) === -1 ? this.clickDirection = "right" : this.clickDirection = "left";
            break;
          case "back":
            backFlag.indexOf(this.currentPindex) === -1 ? this.clickDirection = "right" : this.clickDirection = "left";
            break;
          default:
            break;
        }
      },
      //获取左侧还是右侧部位
      leftRightPart() {
        let result = "0";//默认都需要传双侧；
        let frontFlag = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];//根据正面可点区域的顺序总结的；
        let backFlag = [1, 3, 5, 7, 9, 11, 13, 15, 17];//根据背面可点区域的顺序总结的；
        switch (this.direction) {
          case "front":
//            frontFlag.indexOf(this.currentPindex)?(return result + ",1"):(return result + ",2");
            if (frontFlag.indexOf(this.currentPindex) === -1) {
              return result + ",2"
            } else {
              return result + ",1"
            }
            break;
          case "back":
//            backFlag.indexOf(this.currentPindex)?(return result + ",2"):(return result + ",1");
            if (backFlag.indexOf(this.currentPindex) === -1) {
              return result + ",1"
            } else {
              return result + ",2"
            }
            break;
          default:
            break;
        }
      },
      selectPartToSecond(index, type) {//抓取二级部位数据
        const that = this;
        let result = "";
        if (type === "show") {
          this.currentPindex = index;
          this.currentHindex = -1;
          result = this.pointList[this.direction][this.currentPindex];
        } else {
          this.currentPindex = -1;
          this.currentHindex = index;
          result = this.hidePoint[this.direction][this.currentHindex];
        }
        that.leftRightClick();
        api.ajax({
          url: XHRList.partList,
          method: "POST",
          data: {
            parentId: result,
            isValid: "1",
            firstResult: "0",
            maxResult: "9999",
            directionId: that.direction === "front" ? "0" : "1",//string方向0-正面1-反面
            positionIdList: that.leftRightPart(),//	string位置0-双侧1-左侧2-右侧
          },
          beforeSend(config) {
            this.finish = true;
          },
          done(data) {
            this.finsh = false;
            that.secondShow = true;
            if (data.responseObject.responseData) {
              let dataList = data.responseObject.responseData.dataList;
              if (dataList && dataList.length !== 0) {
                that.secondList = dataList;
                that.partImg();
              }
            }
          },
          fail(err) {

          }
        })
      },
      partImg() {
        let that = this;
        that.imgArray = [];
        //初始的思路，图片全部展示
//        that.secondList.forEach((item) => {
//          that.imgArray.push(require('../../../common/image/img00/patientConsult/'+ that.currentType +'/'+ that.direction +'/'+ item.partId +".png"))
//        } )
        //之后的思路，默认第一个展示
        that.imgArray = [require('../../../common/image/img00/patientConsult/' + that.currentType + '/' + that.direction + '/' + that.secondList[0].partId + ".png")];
      },
      ensurePart(index) { //二级部位选取...路由数据驱动症状选择启动加载...
        let that = this;
        that.currentThreeLevel = index;
        that.imgArray = [require('../../../common/image/img00/patientConsult/' + that.currentType + '/' + that.direction + '/' + that.secondList[index].partId + ".png")];
//        this.$router.push({
//          name: "discription",
//          query: {
//            userId: this.patientMessage.userId,
//            sex: this.patientMessage.sex,
//            age: this.patientMessage.age,
//            patientId: this.patientMessage.patientId,
//            partId: this.secondList[index].partId,
//            count: this.$route.query.count,
//            from:this.$route.name
//          },
//        })
      },
      surePart() {
        localStorage.removeItem("selectList");
        localStorage.removeItem("secondList");
        localStorage.removeItem("questionList");
        this.$router.push({
          name: "discription",
          query: {
            userId: this.patientMessage.userId,
            sex: this.patientMessage.sex,
            age: this.patientMessage.age,
            patientId: this.patientMessage.patientId,
            partId: this.secondList[this.currentThreeLevel].partId,
            count: this.$route.query.count,
            from: this.$route.name
          },
        })
      },
    },
    components: {
      'loading': loading,
      backPopup
    }

  }

</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";

  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/2/23
   */
  /*新版本三级选项样式*/
  .isMB {
    padding-bottom: rem(100px);
  }

  .part-box {
    background-color: rgba(255, 255, 255, 0);
    position: absolute;
    top: rem(130px);
    &.left {
      left: rem(24px);
    }
    &.right {
      right: rem(24px);
    }
    .btnBox-btn {
      display: block;
      width: rem(200px);
      padding: rem(24px) 0;
      text-align: center;
      opacity: 0.7;
      background: #FFFFFF;
      border: 1px solid #E0E0E0;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.10);
      border-radius: rem(8px);
      line-height: 1;
      @include font-dpr(15px);
      color: #555555;
      &.on {
        border: 1px solid rgba(7, 182, 172, 0.50);
        color: #07B6AC;
        font-weight: bold;
      }
      &.btn-confirm {
        background: #2FC5BD;
        color: #ffffff;
        border: 1px solid #2FC5BD;
        opacity: 1;
      }
    }
    .btnBox-btn + .btnBox-btn {
      margin-top: rem(8px);
    }
  }

  .main-inner {
    height: 100%;
  }

  .main-inner.select-part {
    background-color: #fff;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }

  .main-inner-content {
    border: none;
    display: block;
    &.androidScale {
      transform: translateY(5%) scale(0.9);
    }

  }

  .part-select-title {
    position: absolute;
    background: #FAFAFA;
    border-top-right-radius: rem(9999px);
    border-bottom-right-radius: rem(9999px);
    h3 {
      line-height: 1;
      padding: rem(28px) rem(50px);
      @include font-dpr(14px);
      color: #07B6AC;
      font-weight: normal;
    }
  }

  .body-picture {
    margin-top: rem(0px);
    height: 100%;
    &.front {
      background: url("../../../common/image/img00/patientConsult/front_bg.png") no-repeat left bottom;
      background-size: cover;
    }
    &.back {
      background: url("../../../common/image/img00/patientConsult/back_bg.png") no-repeat left bottom;
      background-size: cover;
    }
    &-content {
      position: relative;
      border: none;
      height: 100%;
      & > img {
        position: absolute;
        bottom: 0;
        width: 100%;
        vertical-align: top;
      }
    }
  }

  .body-picture-overturn {
    @include square(rem(120px));
    background: url("../../../common/image/img00/patientConsult/body_button.png") no-repeat;
    position: fixed;
    right: rem(54px);
    bottom: rem(100px);
    background-size: contain;
    &:active {
      background: url("../../../common/image/img00/patientConsult/body_button_on.png") no-repeat;
      background-size: contain;
    }
  }

  .pain-point-box {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .pain-point, .hide-point {
    @include circle(rem(80px), transparent);
    /*background-color: red;*/
    position: absolute;
    -webkit-appearance: none;

  }

  //男 正面
  .man-front {
    .body-picture-content {

      width: 100%;
    }
    .pain-point {
      &.on {
        background: transparent url("../../../common/image/img00/patientConsult/body_activation@2x.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(1) {
        left: 3rem;
        bottom: 11.2rem;
      }
      &:nth-child(2) {
        right: 3rem;
        bottom: 11.2rem;
      }
      &:nth-child(3) {
        left: 2.7rem;
        bottom: 10.3rem;
      }
      &:nth-child(4) {
        right: 2.7rem;
        bottom: 10.3rem;
      }
      &:nth-child(5) {
        left: 2.4rem;
        bottom: 9.4rem;
      }
      &:nth-child(6) {
        right: 2.4rem;
        bottom: 9.4rem;
      }
      &:nth-child(7) {
        left: 2.0rem;
        bottom: 8.5rem;
      }
      &:nth-child(8) {
        right: 2.0rem;
        bottom: 8.5rem;
      }
      &:nth-child(9) {
        left: 1.4rem;
        width: 1.4rem;
        height: 1.4rem;
        bottom: 7.3rem;
      }
      &:nth-child(10) {
        right: 1.4rem;
        width: 1.4rem;
        height: 1.4rem;
        bottom: 7.3rem;
      }
      &:nth-child(11) {
        left: 3.8rem;
        height: 1.8rem;
        bottom: 5.7rem;
      }
      &:nth-child(12) {
        right: 3.8rem;
        height: 1.8rem;
        bottom: 5.7rem;
      }
      &:nth-child(13) {
        left: 3.8rem;
        bottom: 4.6rem;
      }
      &:nth-child(14) {
        right: 3.8rem;
        bottom: 4.6rem;
      }
      &:nth-child(15) {
        left: 3.8rem;
        height: 2.2rem;
        bottom: 2.3rem;
      }
      &:nth-child(16) {
        right: 3.8rem;
        height: 2.2rem;
        bottom: 2.3rem;
      }
      &:nth-child(17) {
        left: 3.5rem;
        bottom: 1.2rem;
        width: 1.2rem;
      }
      &:nth-child(18) {
        right: 3.5rem;
        bottom: 1.2rem;
        width: 1.2rem;
      }
      &:nth-child(19) {
        left: 3.5rem;
        bottom: 7.5rem;
      }
      &:nth-child(20) {
        right: 3.5rem;
        bottom: 7.5rem;
      }
      &:nth-child(21) {
        left: 50%;
        margin-left: rem(-40px);
        bottom: 8rem;
      }
      &:nth-child(22) {
        left: 50%;
        margin-left: rem(-40px);
        bottom: 11.6rem;
      }
      &:nth-child(23) {
        left: 50%;
        margin-left: -1rem;
        bottom: 9.1rem;
        width: 2rem;
        height: 2.5rem;
      }
    }
    .hide-point-box {
      .hide-point {
        &:nth-child(1) {
          left: 2.6rem;
          bottom: 10.1rem;
        }
        &:nth-child(2) {
          right: 2.6rem;
          bottom: 10.1rem;
        }
        &:nth-child(3) {
          left: 2.1rem;
          bottom: 8.7rem;
        }
        &:nth-child(4) {
          right: 2.1rem;
          bottom: 8.7rem;
        }
        &:nth-child(5) {
          left: 3.7rem;
          bottom: 6.1rem;
        }
        &:nth-child(6) {
          right: 3.7rem;
          bottom: 6.1rem;
        }
        &:nth-child(7) {
          left: 3.7rem;
          bottom: 3.1rem;
        }
        &:nth-child(8) {
          right: 3.7rem;
          bottom: 3.1rem;
        }
        &:nth-child(9) {
          left: 50%;
          margin-left: -1rem;
          bottom: 9.6rem;
          width: 2rem;
          height: 2rem;
        }
      }
    }
  }

  //男 反面
  .man-back {
    .body-picture-content {
      width: 100%;

    }
    .pain-point {
      &.on {
        background: transparent url("../../../common/image/img00/patientConsult/body_activation@2x.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(1) {
        left: 3rem;
        bottom: 11.2rem;
      }
      &:nth-child(2) {
        right: 3rem;
        bottom: 11.2rem;
      }
      &:nth-child(3) {
        left: 2.7rem;
        bottom: 10.3rem;
      }
      &:nth-child(4) {
        right: 2.7rem;
        bottom: 10.3rem;
      }
      &:nth-child(5) {
        left: 2.4rem;
        bottom: 9.4rem;
      }
      &:nth-child(6) {
        right: 2.4rem;
        bottom: 9.4rem;
      }
      &:nth-child(7) {
        left: 2.0rem;
        bottom: 8.5rem;
      }
      &:nth-child(8) {
        right: 2.0rem;
        bottom: 8.5rem;
      }
      &:nth-child(9) {
        left: 1.4rem;
        width: 1.4rem;
        height: 1.4rem;
        bottom: 7.3rem;
      }
      &:nth-child(10) {
        right: 1.4rem;
        width: 1.4rem;
        height: 1.4rem;
        bottom: 7.3rem;
      }
      &:nth-child(11) {
        left: 3.8rem;
        height: 1.8rem;
        bottom: 5.7rem;
      }
      &:nth-child(12) {
        right: 3.8rem;
        height: 1.8rem;
        bottom: 5.7rem;
      }
      &:nth-child(13) {
        left: 3.8rem;
        bottom: 4.6rem;
      }
      &:nth-child(14) {
        right: 3.8rem;
        bottom: 4.6rem;
      }
      &:nth-child(15) {
        left: 3.8rem;
        height: 2.2rem;
        bottom: 2.3rem;
      }
      &:nth-child(16) {
        right: 3.8rem;
        height: 2.2rem;
        bottom: 2.3rem;
      }
      &:nth-child(17) {
        left: 3.8rem;
        bottom: 1.2rem;
      }
      &:nth-child(18) {
        right: 3.8rem;
        bottom: 1.2rem;
      }
      &:nth-child(19) {
        left: 50%;
        margin-left: rem(-40px);
        bottom: 12.1rem;
      }
      &:nth-child(20) {
        left: 50%;
        margin-left: -1rem;
        bottom: 9.7rem;
        width: 2rem;
        height: 1.4rem;
      }
      &:nth-child(21) {
        left: 50%;
        margin-left: -1rem;
        bottom: 8.7rem;
        width: 2.0rem;
      }
      &:nth-child(22) {
        left: 50%;
        margin-left: -1.1rem;
        bottom: 7rem;
        width: 2.2rem;
        height: 1.8rem;
      }
      &:nth-child(23) {
        left: 50%;
        margin-left: -1rem;
        bottom: 11.1rem;
        width: 2.0rem;
      }
    }
    .hide-point-box {
      .hide-point {
        &:nth-child(1) {
          left: 3.2rem;
          bottom: 11rem;
        }
        &:nth-child(2) {
          right: 3.2rem;
          bottom: 11rem;
        }
        &:nth-child(3) {
          left: 3.4rem;
          bottom: 8.2rem;
        }
        &:nth-child(4) {
          right: 3.4rem;
          bottom: 8.2rem;
        }
      }
    }
  }

  //女正面
  .woman-front {
    .body-picture-content {
      width: 100%;

    }
    .pain-point {
      &.on {
        background: transparent url("../../../common/image/img00/patientConsult/body_activation@2x.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(1) {
        left: 3.2rem;
        bottom: 11.3rem;
      }
      &:nth-child(2) {
        right: 3.2rem;
        bottom: 11.3rem;
      }
      &:nth-child(3) {
        left: 3rem;
        bottom: 10.4rem;
      }
      &:nth-child(4) {
        right: 3rem;
        bottom: 10.4rem;
      }
      &:nth-child(5) {
        left: 2.7rem;
        bottom: 9.6rem;
      }
      &:nth-child(6) {
        right: 2.7rem;
        bottom: 9.6rem;
      }
      &:nth-child(7) {
        left: 2.3rem;
        bottom: 8.6rem;
      }
      &:nth-child(8) {
        right: 2.3rem;
        bottom: 8.6rem;
      }
      &:nth-child(9) {
        left: 1.7rem;
        width: 1.4rem;
        height: 1.4rem;
        bottom: 7rem;
      }
      &:nth-child(10) {
        right: 1.7rem;
        width: 1.4rem;
        height: 1.4rem;
        bottom: 7rem;
      }
      &:nth-child(11) {
        left: 3.8rem;
        height: 1.8rem;
        bottom: 5.6rem;;
      }
      &:nth-child(12) {
        right: 3.8rem;
        height: 1.8rem;
        bottom: 5.6rem;;
      }
      &:nth-child(13) {
        left: 3.9rem;
        bottom: 4.5rem;
      }
      &:nth-child(14) {
        right: 3.9rem;
        bottom: 4.5rem;
      }
      &:nth-child(15) {
        left: 3.9rem;
        height: 2.2rem;
        bottom: 2.3rem;
      }
      &:nth-child(16) {
        right: 3.9rem;
        height: 2.2rem;
        bottom: 2.3rem;
      }
      &:nth-child(17) {
        left: 3.7rem;
        bottom: 1.1rem;
        width: 1.2rem;
      }
      &:nth-child(18) {
        right: 3.7rem;
        bottom: 1.1rem;
        width: 1.2rem;
      }
      &:nth-child(19) {
        left: 3.5rem;
        bottom: 7.5rem;
      }
      &:nth-child(20) {
        right: 3.5rem;
        bottom: 7.5rem;
      }
      &:nth-child(21) {
        left: 50%;
        margin-left: rem(-40px);
        bottom: 8rem;
      }
      &:nth-child(22) {
        left: 50%;
        margin-left: rem(-40px);
        bottom: 11.8rem;
      }
      &:nth-child(23) {
        left: 50%;
        margin-left: -0.9rem;
        bottom: 9.1rem;
        width: 1.8rem;
        height: 2.6rem;
      }
    }
    .hide-point-box {
      .hide-point {
        &:nth-child(1) {
          left: 3rem;
          top: 3rem;
        }
        &:nth-child(2) {
          left: 6rem;
          top: 3rem;
        }
        &:nth-child(3) {
          left: 2.5rem;
          top: 4.5rem;
        }
        &:nth-child(4) {
          left: 6.4rem;
          top: 4.5rem;
        }
        &:nth-child(5) {
          left: 3.8rem;
          top: 7rem;
        }
        &:nth-child(6) {
          left: 5.1rem;
          top: 7rem;
        }
        &:nth-child(7) {
          left: 3.8rem;
          top: 10rem;
        }
        &:nth-child(8) {
          left: 5.1rem;
          top: 10rem;
        }
        &:nth-child(9) {
          left: 4.3rem;
          top: 3rem;
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }

  //女 反面
  .woman-back {
    .body-picture-content {
      width: 100%;
    }
    .pain-point {
      &.on {
        background: transparent url("../../../common/image/img00/patientConsult/body_activation@2x.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(1) {
        left: 3.2rem;
        bottom: 11.3rem;
      }
      &:nth-child(2) {
        right: 3.2rem;
        bottom: 11.3rem;
      }
      &:nth-child(3) {
        left: 3rem;
        bottom: 10.4rem;
      }
      &:nth-child(4) {
        right: 3rem;
        bottom: 10.4rem;
      }
      &:nth-child(5) {
        left: 2.7rem;
        bottom: 9.6rem;
      }
      &:nth-child(6) {
        right: 2.7rem;
        bottom: 9.6rem;
      }
      &:nth-child(7) {
        left: 2.3rem;
        bottom: 8.6rem;
      }
      &:nth-child(8) {
        right: 2.3rem;
        bottom: 8.6rem;
      }
      &:nth-child(9) {
        left: 1.7rem;
        width: 1.4rem;
        height: 1.4rem;
        bottom: 7rem;
      }
      &:nth-child(10) {
        right: 1.7rem;
        width: 1.4rem;
        height: 1.4rem;
        bottom: 7rem;
      }
      &:nth-child(11) {
        left: 3.8rem;
        height: 1.7rem;
        bottom: 5.5rem;
      }
      &:nth-child(12) {
        right: 3.8rem;
        height: 1.7rem;
        bottom: 5.5rem;
      }
      &:nth-child(13) {
        left: 3.9rem;
        bottom: 4.5rem;
      }
      &:nth-child(14) {
        right: 3.9rem;
        bottom: 4.5rem;
      }
      &:nth-child(15) {
        left: 3.9rem;
        height: 2.2rem;
        bottom: 2.3rem;
      }
      &:nth-child(16) {
        right: 3.9rem;
        height: 2.2rem;
        bottom: 2.3rem;
      }
      &:nth-child(17) {
        left: 3.9rem;
        bottom: 1.2rem;
      }
      &:nth-child(18) {
        right: 3.9rem;
        bottom: 1.2rem;
      }
      &:nth-child(19) {
        left: 50%;
        margin-left: rem(-40px);
        bottom: 12.1rem;
      }
      &:nth-child(20) {
        left: 50%;
        margin-left: -1rem;
        bottom: 9.7rem;
        width: 2rem;
        height: 1.4rem;
      }
      &:nth-child(21) {
        left: 50%;
        margin-left: -1rem;
        bottom: 8.7rem;
        width: 2.0rem;
      }
      &:nth-child(22) {
        left: 50%;
        margin-left: -1.2rem;
        bottom: 7rem;
        width: 2.4rem;
        height: 1.7rem;
      }
      &:nth-child(23) {
        left: 50%;
        margin-left: -0.9rem;
        bottom: 11.1rem;
        width: 1.8rem;
      }
    }
    .hide-point-box {
      .hide-point {
        &:nth-child(1) {
          left: 3.3rem;
          top: 2.3rem;
        }
        &:nth-child(2) {
          left: 5.5rem;
          top: 2.3rem;
        }
        &:nth-child(3) {
          left: 3.4rem;
          top: 5rem;
        }
        &:nth-child(4) {
          left: 5.6rem;
          top: 5rem;
        }
      }
    }
  }

  //儿童 正面
  .kid-front {
    /*margin-top:rem(120px);*/
    .body-picture-content {
      width: 100%;

    }
    .pain-point {
      height: rem(70px);
      &.on {
        background: transparent url("../../../common/image/img00/patientConsult/body_activation@2x.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(1) {
        left: 3.1rem;
        bottom: 9.4rem;
      }
      &:nth-child(2) {
        right: 3.1rem;
        bottom: 9.4rem;
      }
      &:nth-child(3) {
        left: 2.8rem;
        bottom: 8.6rem;
      }
      &:nth-child(4) {
        right: 2.9rem;
        bottom: 8.5rem;
      }
      &:nth-child(5) {
        left: 2.6rem;
        bottom: 7.8rem;
      }
      &:nth-child(6) {
        right: 2.6rem;
        bottom: 7.8rem;
      }
      &:nth-child(7) {
        left: 2.3rem;
        bottom: 7.1rem;
      }
      &:nth-child(8) {
        right: 2.3rem;
        bottom: 7.1rem;
      }
      &:nth-child(9) {
        left: 1.7rem;
        width: 1.4rem;
        height: 1.6rem;
        bottom: 5.6rem;
      }
      &:nth-child(10) {
        right: 1.7rem;
        width: 1.4rem;
        height: 1.6rem;
        bottom: 5.6rem;
      }
      &:nth-child(11) {
        left: 3.4rem;
        width: 1.5rem;
        height: 1rem;
        bottom: 5.3rem;
      }
      &:nth-child(12) {
        right: 3.4rem;
        width: 1.5rem;
        height: 1rem;
        bottom: 5.3rem;
      }
      &:nth-child(13) {
        left: 3.3rem;
        width: 1.5rem;
        bottom: 4.35rem;
      }
      &:nth-child(14) {
        right: 3.3rem;
        width: 1.5rem;
        bottom: 4.35rem;
      }
      &:nth-child(15) {
        left: 3.4rem;
        height: 1.5rem;
        bottom: 2.8rem;
      }
      &:nth-child(16) {
        right: 3.4rem;
        height: 1.5rem;
        bottom: 2.8rem;
      }
      &:nth-child(17) {
        left: 2.8rem;
        width: 1.4rem;
        height: 1.2rem;
        bottom: 1.7rem;
      }
      &:nth-child(18) {
        right: 2.8rem;
        width: 1.4rem;
        height: 1.2rem;
        bottom: 1.7rem;
      }
      &:nth-child(19) {
        left: 3.3rem;
        bottom: 6.3rem;
      }
      &:nth-child(20) {
        right: 3.3rem;
        bottom: 6.3rem;
      }
      &:nth-child(21) {
        left: 50%;
        margin-left: -0.9rem;
        width: 1.8rem;
        bottom: 6.8rem;
      }
      &:nth-child(22) {
        left: 50%;
        margin-left: rem(-40px);
        bottom: 10rem;
      }
      &:nth-child(23) {
        left: 50%;
        margin-left: -1rem;
        bottom: 7.7rem;
        width: 2rem;
        height: 2.3rem;
      }
    }
    .hide-point-box {
      .hide-point {
        width: rem(70px);
        height: rem(70px);
        &:nth-child(1) {
          left: 3.2rem;
          top: 3.2rem;
        }
        &:nth-child(2) {
          left: 5.7rem;
          top: 3.2rem;
        }
        &:nth-child(3) {
          left: 3rem;
          top: 4rem;
        }
        &:nth-child(4) {
          left: 6rem;
          top: 4rem;
        }
        &:nth-child(5) {
          left: 4rem;
          top: 5.7rem;
        }
        &:nth-child(6) {
          left: 5.2rem;
          top: 5.7rem;
        }
        &:nth-child(7) {
          left: 3.8rem;
          top: 7.2rem;
        }
        &:nth-child(8) {
          left: 5.3rem;
          top: 7.2rem;
        }
        &:nth-child(9) {
          left: 4.3rem;
          top: 3rem;
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }

  //儿童 反面
  .kid-back {
    /*margin-top:rem(100px);*/
    .body-picture-content {
      width: 100%;

    }
    .pain-point {
      &.on {
        background: transparent url("../../../common/image/img00/patientConsult/body_activation@2x.png") no-repeat;
        background-size: contain;
      }
      &:nth-child(1) {
        left: 3.1rem;
        bottom: 9.4rem;
      }
      &:nth-child(2) {
        right: 3.1rem;
        bottom: 9.4rem;
      }
      &:nth-child(3) {
        left: 2.8rem;
        bottom: 8.6rem;
      }
      &:nth-child(4) {
        right: 2.9rem;
        bottom: 8.5rem;
      }
      &:nth-child(5) {
        left: 2.6rem;
        bottom: 7.8rem;
      }
      &:nth-child(6) {
        right: 2.6rem;
        bottom: 7.8rem;
      }
      &:nth-child(7) {
        left: 2.3rem;
        bottom: 7.1rem;
      }
      &:nth-child(8) {
        right: 2.3rem;
        bottom: 7.1rem;
      }
      &:nth-child(9) {
        left: 1.7rem;
        width: 1.4rem;
        height: 1.6rem;
        bottom: 5.6rem;
      }
      &:nth-child(10) {
        right: 1.7rem;
        width: 1.4rem;
        height: 1.6rem;
        bottom: 5.6rem;
      }
      &:nth-child(11) {
        left: 3.4rem;
        width: 1.5rem;
        height: 1rem;
        bottom: 5.2rem;
      }
      &:nth-child(12) {
        right: 3.4rem;
        width: 1.5rem;
        height: 1rem;
        bottom: 5.2rem;
      }
      &:nth-child(13) {
        left: 3.3rem;
        width: 1.5rem;
        bottom: 4.2rem;
      }
      &:nth-child(14) {
        right: 3.3rem;
        width: 1.5rem;
        bottom: 4.2rem;
      }
      &:nth-child(15) {
        left: 3.4rem;
        height: 1.5rem;
        bottom: 2.8rem;
      }
      &:nth-child(16) {
        right: 3.4rem;
        height: 1.5rem;
        bottom: 2.8rem;
      }
      &:nth-child(17) {
        left: 2.8rem;
        width: 1.4rem;
        height: 1.2rem;
        bottom: 1.7rem;
      }
      &:nth-child(18) {
        right: 2.8rem;
        width: 1.4rem;
        height: 1.2rem;
        bottom: 1.7rem;
      }
      &:nth-child(19) {
        left: 50%;
        margin-left: -0.53333rem;
        height: 0.8rem;
        bottom: 10.3rem;
      }
      &:nth-child(20) {
        left: 50%;
        margin-left: -1rem;
        bottom: 7.8rem;
        width: 2rem;
        height: 1.4rem;
      }
      &:nth-child(21) {
        left: 50%;
        margin-left: -1.2rem;
        bottom: 7rem;
        width: 2.4rem;
        height: 0.8rem;
      }
      &:nth-child(22) {
        left: 50%;
        margin-left: -1.4rem;
        bottom: 6rem;
        width: 2.8rem;
        height: 1.1rem;
      }
      &:nth-child(23) {
        left: 50%;
        margin-left: -0.9rem;
        bottom: 9.2rem;
        width: 1.8rem;
      }
    }
    .hide-point-box {
      .hide-point {
        width: rem(70px);
        height: rem(70px);
        &:nth-child(1) {
          left: 3.5rem;
          top: 2.7rem;
        }
        &:nth-child(2) {
          left: 5.5rem;
          top: 2.7rem;
        }
        &:nth-child(3) {
          left: 3.7rem;
          top: 5rem;
        }
        &:nth-child(4) {
          left: 5.6rem;
          top: 5rem;
        }
      }
    }
  }

</style>
