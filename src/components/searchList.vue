<template>
  <section class="search-box tc-mainInner">
    <section class="tc-searchCommFixedTop">
      <div class="tc-searchCommTop">
        <!--<i class="tc-searchBtnPic"></i>-->
        <input class="tc-searchCommInput"
               ref="searchInput"
               v-model="searchText"
               type="text"
               :placeholder="placeholderText"
               @input="searchEvent"
        >
        <i class="search-cancel" @click="searchText='';noResult=false;messageList=[]" v-show="searchText.length>0">
          <img src="../common/image/img00/consult_V1.2/icon_searchCancel.png" alt="">
        </i>
      </div>
    </section>
    <section class="tc-searchMain">
      <section class="no-result-item-add" v-if="noResult">
        <button class="btn-primary add-result-item-btn"
                @click="backToPast({hospitalName:searchText,illnessName:searchText,id:-1,illnessId:-1})">
          确定
        </button>
      </section>
      <section class="tc-searchContentInner ev-initList">
        <section class="searchResult" ref="listBox">
          <p class="searchResultItem" v-for="item in messageList" @click="backToPast(item)">
            {{listType === "hospital" ? item.hospitalName : item.illnessName}}</p>
        </section>
      </section>
      <section class="tc-searchContentInner ev-searchList"></section>
    </section>
    <Loading v-if="finish"></Loading>

  </section>
</template>
<script>
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/9/11.
   */
  import api from "common/js/util/util";
  import Loading from "components/loading";

  const XHRList = {
    hospital: "/mcall/comm/data/baseinfo/v1/getHospitalList/",
    disease: "/mcall/comm/data/illness/v1/getMapList/",
  };
  export default{
    data(){
      return {
        messageList: [],
        searchFlag: true,
        searchText: '',
        placeholderText: "",
        finish: false,
        noResult: false,
        over: false
      }
    },
    mounted(){
      let page = 0;
      this.listType = this.$route.params.listType;
      this.returnRouter = this.$route.params.from;
      this.$refs.searchInput.focus();

      document.body.scrollTop = 0;

      window.addEventListener("scroll", () => {
        clearTimeout(this.scrollTimeTip);
        if (this.$refs.listBox.children.length > 1) {
          if (document.body.scrollTop + document.body.clientHeight >= document.body.scrollHeight) {
            this.scrollTimeTip=setTimeout(()=>{
              page++;
              this.getMessageList(this.searchText, page)
            }, 100);
          }
        }
      });

      this.getPlaceHolder(this.listType);
      this.limitChinese();

    },
    methods: {
      getPlaceHolder(type){
        switch (type) {
          case "hospital":
            this.placeholderText = "请输入就诊医院名称";
            document.title="就诊医院";
            break;
          case "disease":
            this.placeholderText = "请输入疾病名称";
            document.title="确诊疾病";
            break;
          default:
            break;
        }
      },

      limitChinese(){
        setTimeout(() => {
          this.$refs.searchInput.addEventListener("compositionstart", () => {
            this.searchFlag = false;
          });
          this.$refs.searchInput.addEventListener("compositionend", () => {
            this.searchFlag = true;
          });
        }, 20);
      },

      getMessageList(searchContent, page){
        const that = this;
        this.finish = true;
        let url = "";
        let firstResult = 0 + (page * 20);
        let maxResult = 20 + (page * 20);
        let searchData = {};
        switch (this.listType) {
          case "hospital":
            searchData = {
              hospitalName: searchContent
            };
            url = XHRList.hospital;
            break;
          case "disease":
            searchData = {
              searchParam: searchContent
            };
            url = XHRList.disease;
            break;
          default:
            break;
        }

        let data = Object.assign({}, {
          isValid: "1",
          firstResult: firstResult,
          maxResult: 20,
          cityId: "",
          isSolr:1
        }, searchData);
        if (!this.over) {
          api.ajax({
            url: url,
            method: "POST",
            data: data,
            done(param) {
              if (param.responseObject.responseData) {
                let dataList = param.responseObject.responseData.dataList;
                if (dataList && dataList.length !== 0) {
                  if (page === 0) {
                    that.messageList = dataList;
                  } else {
                    dataList.forEach((element, index) => {
                      that.messageList.push(element);
                    });
                  }
                  that.noResult = false;
                  that.loading = false;
                } else {
                  that.over = true;
                  if (page === 0) {
                    that.messageList = [];
                    that.noResult = true;
                  }
                }
              }
            },
            fail(err) {

            }
          })
        }
      },
      backToPast(item){
        if (this.listType === "hospital") {
          this.$router.push({
            name: this.returnRouter,
            params: {
              baseMessage: {
                name: item.hospitalName,
                id: item.id,
              },
              from: "hospital"
            },
            query: this.$route.query
          });
        } else if (this.listType === "disease") {
          this.$router.push({
            name: this.returnRouter,
            params: {
              baseMessage: {
                name: item.illnessName,
                id: item.illnessId,
              },
              from: "disease"
            },
            query: this.$route.query
          });
        }
      },
      searchEvent(){
        if (this.searchText.length === 0) {
          this.messageList=[];
          this.noResult=false;
          return false;
        } else if (api.getByteLen(this.searchText) > 60) {
          this.searchText = api.getStrByteLen(this.searchText, 60);

          this.getMessageList(this.searchText, 0);
        } else {
          clearTimeout(this.searchTimeout);
          this.searchTimeout = setTimeout(() => {
            if (this.searchText.trim().length > 0) {
              this.over = false;
              this.getMessageList(this.searchText, 0);
            }
          }, 300);
        }
      }
    },
    props: {},
    components: {
      Loading
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  /*@import "../../scss/modules/_searchCommTop";*/
  @import "../../scss/library/_common-modules";
  /*@import "../../scss/modules/_searchResult";*/
  .search-box {
    overflow: hidden;
    /*transform:translateX(100%);*/
    transition: transform 0.2s ease-in-out;
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*z-index: 4;*/
    background-color: #fff;
    &.show {
      transform: translateX(0);
    }
  }

  .tc-searchMain {
    $colorTwo: #222222;
    $colorFive: #555555;
    padding-top: rem(140px);
    height: 100%;
    box-sizing: border-box;
    overflow: auto;
    .main-header {
      display: flex;
      position: fixed;
      top: 0;
      .tc-searchBackBtn {
        @include font-dpr(16px);
        line-height: rem(60px);
        color: #000;
      }
    }
    //医生列表
    .tc-searchContentInner {
      //margin-top: rem(198px);
      .tc-searchDocArea {
        padding: rem(12px) rem(40px);
        box-sizing: border-box;
        border-bottom: 1px solid #DFDFDF;
        //position: fixed;
        width: 100%;
        //margin-top:1.3rem;
        background: #FFF;
        .tc-searchDocAreaLeft {
          display: inline-block;
          width: rem(10px);
          height: rem(18px);
          background: url(../common/image/img00/patientConsult/searchAreaLeft.png);
          background-size: 100% 100%;
        }
        .tc-searchAreaName {
          @include font-dpr(13px);
          color: #909090;
          padding-left: rem(10px);
          &.tc-selectIllnessName {
            padding-left: 0;
          }
        }
      }

      //padding-top: rem(56px);
      .searchResultTitle {
        @include font-dpr(14px);
        color: $colorFive;
        background: #F9FBFC;
        padding: rem(10px) 0 rem(12px) rem(40px);
      }
      .searchResultItem {
        @include font-dpr(17px);
        color: $colorTwo;
        display: block;
        padding: rem(24px) rem(50px);
        line-height: rem(32px);
        cursor: pointer;
        @include ellipsis();
        &.selected {
          background-color: #F9FBFB;
        }
        & > em {
          color: #00BEAF;
          font-style: normal;
        }

      }
      .tc-searchListBoxIllness {
        max-height: 100%;
        .tc-searchDocKeyWord {
          max-height: 100%;
        }
        .tc-searchDocListItem {
          max-height: 100%;
        }
      }
    }
    //未找到相关结果 添加
    .tc-searchCommFixedBottom {
      bottom: 0;
      position: fixed;
      width: 100%;
      height: rem(98px);
      background-color: #ffffff;
      border-top: 1px solid #DFDFDF;
      text-align: center;
      @include font-dpr(13px);
      .tc-searchNoResult {
        display: inline-block;
        color: #B3B9C4;
      }
      .tc-searchAddBtn {
        display: inline-block;
        color: #00BEAF;
        padding: rem(12px) rem(18px);
        -webkit-border-radius: 100px;
        -moz-border-radius: 100px;
        border-radius: 100px;;
        border: 1px solid #00BEAF;
        margin: rem(24px) 0 rem(24px) rem(12px);
        vertical-align: middle;
      }
    }
    //搜索无结果
    .tc-searchCommNoResult {
      text-align: center;
      padding-top: rem(60px);
      .tc-searchNoResultText {
        display: inline-block;
        @include font-dpr(15px);
        color: #909090;
        padding-top: rem(80px);
      }
    }
    //手动添加医院
    .tc-searchAddBySelf {
      .tc-searchAddTextArea {
        textarea {
          @include font-dpr(16px);
          width: rem(668px);
          height: rem(200px);
          color: $colorFive;
          padding: rem(40px);
          background-color: #F9FBFB;
          border-style: none;
          line-height: rem(32px);
          -webkit-box-shadow: inset 0px -3px 4px 0 #F4F8FD;
          -moz-box-shadow: inset 0px -3px 4px 0 #F4F8FD;
          box-shadow: inset 0px -3px 4px 0 #F4F8FD;
        }
      }
      .tc-searchAddHosBtn {
        padding-top: rem(100px);
        span {
          @include font-dpr(16px);
          color: #ffffff;
          display: block;
          width: rem(570px);
          height: rem(72px);
          line-height: rem(72px);
          text-align: center;
          background-color: #00D6C6;
          -webkit-border-radius: 100px;
          -moz-border-radius: 100px;
          border-radius: 100px;
          margin: 0 auto;
        }
      }
    }
  }

  .searchTypeSelect {
    position: fixed;
    z-index: 5;
    right: 0;
    top: rem(225px);
    padding: rem(10px) 0 rem(5px) 0;
  }

  .searchTypeSelectItem {
    display: block;
    @include font-dpr(13px);
    color: #B3B9C4;
    text-align: center;
    position: relative;
    background-color: #fff;
    padding-left: rem(10px);
    padding-right: rem(10px);
    border-right: rem(20px) solid transparent;
    border-left: 2rem solid transparent;
    background-clip: padding-box;
    &:before {
      content: attr(data-toolTips);
      visibility: hidden;
      opacity: 0;
      position: absolute;
      left: rem(-140px);
      top: 55%;
      width: rem(104px);
      margin-top: rem(-32px);
      height: rem(62px);
      line-height: rem(62px);
      /*background: transparent url('/image/img00/healthInfo/tips_bg.png') center center no-repeat;*/
      /*background-size: 100% 100%;*/
      font-weight: bold;
      @include font-dpr(20px);
      color: #3598db;
    }
  }

  .searchTypeSelectItem.selected {
    color: #3598db;
    &:before {
      visibility: visible;
      opacity: 1;
    }
  }

  //.tc-selectIllnessMain{
  //  $colorTwo:#222222;
  //  $colorFive:#555555;
  //  .main-header{
  //    display: flex;
  //    position: fixed;
  //    top:0;
  //    .tc-searchBackBtn{
  //      @include font-dpr(16px);
  //      line-height: rem(60px);
  //      color: #000;
  //    }
  //  }
  //}
  .tc-search-noResult {
    text-align: center;
    padding-top: rem(200px);
    box-sizing: border-box;
    display: none;
    & > p {
      @include font-dpr(15px);
      color: #909090;;
    }
    & > span {
      display: block;
      margin-top: rem(60px);
      @include font-dpr(16px);
      color: #00BEAF;
      em {
        font-style: normal;
      }
    }
  }

  .icon-addResult:after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    width: rem(14px);
    height: rem(14px);
    background: url("/image/img00/healthInfo/dialog_overtime_arrow.png");
    background-size: contain;
    margin-left: rem(12px);

  }

  .no-result-item-add {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 4;
    .add-result-item {
      background: #F9FBFB;
      padding: rem(40px);
      color: #555555;
      width: 100%;
      border: none;
      resize: none;
      @include font-dpr(16px);
      box-sizing: border-box;
      box-shadow: 0px rem(-3px) rem(4px) 0px #F4F8FD;
    }
    .add-result-item-btn {
      width: rem(360px);
      height: rem(100px);
      display: block;
      margin: 0 auto;
      margin-top: rem(302px);
      &.unable {
        color: #fff;
        background: #DFDFDF;
      }
    }
  }

  //医生列表
  $colorTwo: #222222;
  $colorFive: #555555;
  .tc-mainInner {
    .tc-searchCommFixedTop {
      position: fixed;
      //top:rem(101px);
      width: 100%;
    }
    .tc-search-noResult {
      display: block;
    }
    .tc-searchCommTop {
      padding: rem(20px);
      background-color: #F3F6F7;
      position: relative;
      width: 100%;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      .tc-searchCommInput {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        @include font-dpr(18px);

        width: 100%;
        height: rem(100px);
        padding-left: rem(30px);
        padding-right: rem(100px);
        margin: 0 auto;
        outline: none;
        border-style: none;
        -webkit-border-radius: rem(8px);
        -moz-border-radius: rem(8px);
        border-radius: rem(8px);
        @include placeholder() {
          color: #CCCCCC;
        }
      }
      .tc-searchBtnPic {
        display: inline-block;
        width: rem(30px);
        height: rem(30px);
        background: url(../common/image/img00/patientConsult/inquire_search@2x.png) no-repeat;
        background-size: 100% 100%;
        position: absolute;
        left: rem(40px);
        top: 50%;
        margin-top: rem(-15px);
      }
    }
  }

  .tc-searchCommFixedTop {
    z-index: 5;
  }

  .tc-searchContentInner {
    //margin-top: rem(198px);
    .tc-searchDocArea {
      padding: rem(12px) rem(40px);
      box-sizing: border-box;
      border-bottom: 1px solid #DFDFDF;
      //position: fixed;
      width: 100%;
      //margin-top:1.3rem;
      background: #FFF;
      .tc-searchDocAreaLeft {
        display: inline-block;
        width: rem(10px);
        height: rem(18px);
        background: url(../common/image/img00/patientConsult/searchAreaLeft.png);
        background-size: 100% 100%;
      }
      .tc-searchAreaName {
        @include font-dpr(13px);
        color: #909090;
        padding-left: rem(10px);
        &.tc-selectIllnessName {
          padding-left: 0;
        }
      }
    }

    //padding-top: rem(56px);
    .searchResultTitle {
      @include font-dpr(14px);
      color: $colorFive;
      background: #F9FBFC;
      padding: rem(10px) 0 rem(12px) rem(40px);
    }
    .searchResultItem {
      @include font-dpr(16px);
      color: $colorTwo;
      display: block;
      padding: rem(24px) rem(50px);
      line-height: rem(32px);
      cursor: pointer;
      &:active{
        background-color: #F9FBFB;
      }
      &.selected {
        background-color: #F9FBFB;
      }
      & > em {
        color: #00BEAF;
        font-style: normal;
      }

    }
    .tc-searchListBoxIllness {
      max-height: 100%;
      .tc-searchDocKeyWord {
        max-height: 100%;
      }
      .tc-searchDocListItem {
        max-height: 100%;
      }
    }
  }

  .letter-aside {
    position: fixed;
    z-index: 5;
    right: 0;
    top: 3rem;
    padding: 0.13333rem 0 0.06667rem 0;
    li {
      display: block;
      @include font-dpr(13px);
      color: #B3B9C4;
      text-align: center;
      position: relative;
      background-color: #fff;
      padding-left: 0.13333rem;
      padding-right: 0.13333rem;
      border-right: 0.26667rem solid transparent;
      border-left: 2rem solid transparent;
      background-clip: padding-box;
    }
  }

  .tips-text {
    display: none;
  }

  .search-cancel {
    width: rem(60px);
    height: rem(60px);
    display: block;
    position: absolute;
    right: rem(28px);
    top: 50%;
    margin-top: rem(-16px);
    & > img {
      width: rem(32px);
      height: rem(32px);
      vertical-align: top;
    }
  }
</style>
