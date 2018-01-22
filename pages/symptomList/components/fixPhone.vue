<template>
  <section class="main-inner symptom-list-wrapper fix-phone" style="height: 100%;">
    <section class="main-inner symptom-list fix">
      <section class="tc-caseContentBox">
        <section class="mask-mobile-box">
          <span>手机号码</span>
          <input type="number" class="mobile-number fix-phone" v-validate="'required|mobile'" name="phone" placeholder="便于接收回复提醒" v-model="phone" />
        </section>
        <!--<section id="ev-mainSymptom" class="tc-caseDescribe tc-module">-->
          <!--<ul class="tc-caseDescribeList">-->
            <!--<li class="tc-caseDescribeItem">-->
              <!--<span class="tc-caseDescribeItemLeft">手机号码</span>-->
              <!--<input type="text" class="fix-phone" placeholder="便于接收回复提醒" v-model="phone" />-->
            <!--</li>-->
          <!--</ul>-->
        <!--</section>-->
        <button class="btn-primary finish" @click="validate">确定修改</button>
        <button class="cancel" @click="cancelEvent">取消</button>

      </section>
    </section>
    <transition name="fade">
      <toast :content="errorMsg" v-if="errorShow"></toast>
    </transition>
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
    import toast from 'components/toast';

    export default{
      data(){
        return {
          phone: "",
          errorMsg: "fuck",//提示错误的字段
          errorShow: false,//是否提示错误
        }
      },
      mounted(){
        if (this.$route.params.phone) {
          this.phone = this.$route.params.phone;
        }
        this.$validator.updateDictionary({
          en: {
            custom: {
              //手机号的验证
              phone:{
                required: '请填写正确联系电话',
                mobile:'请填写正确联系电话',
              },
            }
          }
        });
      },
      components: {
        "toast": toast
      },
      methods: {
        cancelEvent(){
          this.$router.push({
            name: this.$route.params.from,
            query:this.$route.query
          })
        },
        validate() {
          this.$validator.validateAll().then(result => {
            console.log(result);
            if (result) {
              this.ensureEvent();
              this.errorShow = false;
            } else {
              console.log(this.$validator.errorBag.errors);
              this.errorMsg = this.$validator.errorBag.errors[0].msg;
              this.errorShow = true;
              setTimeout(() => {
                this.errorShow = false;
              }, 2000)
            }
          });
        },
        ensureEvent(){
          this.$router.push({
            name: this.$route.params.from,
            params:{
              phone:this.phone
            },
            query:this.$route.query
          })
        }
      }
    }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/library/_common-modules";
  .fix {
    .tc-caseContentBox {
      overflow: hidden;
      padding:0;
    }
    .mask-mobile-box{
      padding:rem(60px) rem(40px);
      margin:rem(32px) rem(32px) 0;
      background:#fff;
      border-radius: rem(16px);
      span{
        display:inline-block;
        margin-right:rem(60px);
        color:#aaaaaa;
        @include font-dpr(17px);
      }
      .fix-phone{
        display:inline-block;
        outline: none;
        border:none;
        color:#444;
        @include font-dpr(18px);
        @include placeholder(){
          color: #aaaaaa;
          @include font-dpr(17px)
        }
      }
    }
    .tc-caseDescribeList {
      background-color: #fff;
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
    height: 100%;
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
  .fix-phone{
    .medical-content {
      width: 100%;

      background-color: #fff;
      border-radius: rem(16px);
      padding: rem(30px) rem(64px);
      padding-bottom: 0;
      box-sizing: border-box;
      p {
        @include font-dpr(14px);
        color: #909090;
        overflow: hidden;
        padding-top: rem(44px);
        padding-bottom: rem(60px);
      }
      textarea {
        width: 100%;
        background-color: #fff;
        resize: none;
        outline: medium;
        border: none;
        border-radius: rem(16px);
        height: 2rem;
        margin: 0;
        @include font-dpr(18px);
        color: #333333;
        @include placeholder() {
          color: #AAAAAA;
        }
      }

    }

  }

  /*vue组件自定义动画开始*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0;
  }

</style>
