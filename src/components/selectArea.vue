<template>
  <section class="search-box tc-mainInner selectArea">
    <section class="tc-searchCommFixedTop" v-show="!addTextarea">
      <div class="tc-searchCommTop">
        <i class="tc-searchBtnPic"></i>
        <input class="tc-searchCommInput" v-model="citySearch" :value="citySearch" type="text" :placeholder="placeholderText">
      </div>
    </section>
    <section class="tc-searchMain">
      <section class="tc-search-noResult" v-show="!searchResult">
        <p>{{noResultText}}</p>
        <span class="icon-addResult" id="ev-addResult" v-if="addResult" @click="addTextarea=true;$validator.validateAll()">
          <em>去添加</em>
        </span>
      </section>
      <section class="no-result-item-add" v-show="addTextarea">
        <textarea class="add-result-item" v-model="addContent" v-validate="'required'" name="addText"></textarea>
        <button class="btn-primary add-result-item-btn" :class="{'unable':errors.has('addText')}" :disabled="errors.has('addText')" @click="addresult">保存</button>
      </section>
      <section class="tc-searchContentInner ev-initList" v-show="searchResult">
        <header class="tc-searchDocArea">
          <!-- <i class="tc-searchDocAreaLeft"></i> -->
          <span class="tc-searchAreaName">{{cityTitle}}</span>
        </header>
        <section class="searchResult" v-for="(item,pIndex) in letterAreaList">
          <header class="searchResultTitle" :id="item.letter">{{item.letter}}</header>
          <p class="searchResultItem"
             v-for="(area,index) in item.citylist"
             @click="selectEvent(index,pIndex)">
            {{area.name}}
          </p>
        </section>
      </section>
      <section class="tc-searchContentInner ev-searchList"></section>
    </section>
    <aside class="letter-aside">
      <ul>
        <li v-for="item in letterAreaList" @click="naver(item.letter)">{{item.letter}} </li>
      </ul>
    </aside>
    <div id="tip" class="tips-text">
      {{tipString}}
    </div>
    <loading v-show="finish"></loading>
  </section>

</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang&lichenyang on 2017/7/19.
   */

  import api from 'common/js/util/util';
  import loading from 'components/loading';
  import {pinyin} from 'common/js/third-party/pinyin';
//  let pinyin = require("common/js/third-party/pinyin").pinyin;

  const XHRList = {
    cityList: "/mcall/comm/data/baseinfo/v1/getRegionList/",
    diseaseList: "/mcall/cms/part/illness/relation/v1/getMapList/",
    hospitalList: "/mcall/comm/data/baseinfo/v1/getHospitalList/",
    illnessList: "/mcall/cms/part/operation/relation/v1/getMapList/",
    doctorList: "/mcall/customer/auth/v1/getMapList/",//搜索医生的接口
    partList: "/mcall/comm/data/part/v1/getMapSearchList/",
    recommendDoctor: "/mcall/patient/recommend/v1/getMapList/"//推荐医生
  };
  let cityLists = [];
  let cityNames = [];
  let cityNamesFilter = [];
  let letter = [];
  let countPage = 0;
  let tipLetter = '';
  let citySearch = '';
  let showCity = [];
  let showCityList = [];
  let showCityTemp;
  export default{
    data(){
      return {
        citySearch: "",//搜索字段
        responseParam:"",//响应参数
        tempList:null,//筛选存储过滤的列表
        placeholderText:"",//输入框默认提示文本
        searchResult:true,//搜索是否有结果
        addResult:false,//是否有添加按钮
        noResultText:"",//搜索没有结果时的话术
        addTextarea:false,//患者自己添加文本框是否显示
        addContent:"",//添加的内容
        cityTitle: "选择省份",
        finish: false,
        level:"",
        letterAreaList: [],
        result: "",
        hospitalList: [],
        finalObj: {
          provinceId: "",
          province: "",
          cityId: "",
          city: "",
          districtId: "",
          district: "",
          result: ""
        },
        status: "",
        tipString: "",
        returnRouter:"",//选择完成返回去的路由
      }
    },
//    props: {
//      show: {
//        type: Boolean
//      },
//      level: {
//        type: Number
//      },
//      areaParam: {
//        type: Object
//      },
//      listType: {
//        type: String
//      }
//    },
    mounted() {
      this.returnRouter = this.$route.params.from;
      this.listType = this.$route.params.listType;
      this.level = this.$route.params.level;
      this.finish = true;
//      this.$el.querySelectorAll(".ev-loading")[0].style.display = "none";
//      switch (this.listType) {
//        case "city":
//          this.getCountry({
//            id: "",
//            level: this.level
//          });
//          break;
//        case "hospital":
//          this.cityTitle = "选择城市";
//          this.getCountry({
//            id: "",
//            level: 3
//          });
//          break;
//        case "disease":
//          this.getPartList();
//          break;
//      }
    },
    activated(){
//      初始化城市的返回结果
      this.finish = false;
      this.finalObj= {
        provinceId: "",
          province: "",
          cityId: "",
          city: "",
          districtId: "",
          district: "",
          result: ""
      };
      if (this.$route.params.from) {
        this.returnRouter = this.$route.params.from;
      }
      if (this.$route.params.listType) {
        this.listType = this.$route.params.listType;
      }
      if (this.$route.params.level) {
        this.level = this.$route.params.level;
      }


      switch (this.listType) {
        case "city":
          this.getCountry({
            id: "",
            level: this.level
          });
          break;
        case "hospital":
          this.cityTitle = "选择城市";
          this.getCountry({
            id: "",
            level: 3
          });
          break;
        case "disease":
          this.getPartList();
          break;
      }
    },
    //路由进入的钩子
//    beforeRouteEnter (to, from, next) {
//      // 在渲染该组件的对应路由被 confirm 前调用
//      // 不！能！获取组件实例 `this`
//      // 因为当钩子执行前，组件实例还没被创建
//
//    },
    //路由离开时的钩子
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      this.letterAreaList = [];
      this.status = "";
      next();
    },
    watch: {
      citySearch: function (value, oldValue) {  //citySearch是input中输入的值
        this.cityFilter(this.tempList, this.responseParam);
      }
    },
    computed: {},
    methods: {
      getPartList() {
        let that = this;
        this.cityTitle = "选择部位";
        this.status = "part";
        api.ajax({
          url: XHRList.partList,
          method: "POST",
          data: {
            treeLevel: "2",
            isValid: "1",
            firstResult: "0",
            maxResult: "9999"
          },
          beforeSend(config) {
            that.finish = true;
          },
          done(param) {
            that.partList = param.responseObject.responseData.dataList;
            that.partList.forEach((element, index) => {
              cityNames.push(element.hospitalName)
            });
            cityNamesFilter = cityNames;
            that.placeholderText = "请填写部位的名称";
            that.noResultText="暂未搜索到相关部位信息";
            that.cityFilter(that.partList, "part");
            that.tempList = that.partList;
            that.responseParam = "part";
            that.citySearch = "";
            that.letterAreaList = showCity;
            that.finish = false;
          },
          fail(err) {

          }
        })
      },
      naver(id){
        this.tipString = id;
        let obj = document.getElementById(id);
        let oPos = obj.offsetTop;
        let oTitle=document.querySelector(".tc-searchCommFixedTop").clientHeight;
        return window.scrollTo(0, oPos - oTitle)
      },
      getHospital(data) {
        let that = this;
        this.cityTitle = "选择医院";
        api.ajax({
          url: XHRList.hospitalList,
          method: "POST",
          data: {
            cityId: data,
            isValid: "1",
            firstResult: "0",
            maxResult: "9999"
          },
          beforeSend(config) {
            this.finish = false;
          },
          done(param) {
            window.scrollTo(0, 0);
            that.areaList = param.responseObject.responseData.dataList;
            that.areaList.forEach((element, index) => {
              cityNames.push(element.hospitalName)
            });
            that.noResultText="暂未搜索到相关医院信息";
            that.addResult = true;
            cityNamesFilter = cityNames;
            that.cityFilter(that.areaList, "hospital");
            that.placeholderText = "请填写医院的名称";
            that.tempList = that.areaList;
            that.responseParam = "hospital";
            that.citySearch = "";
            that.letterAreaList = showCity;
            that.status = "hospital";
          },
          fail(err) {

          }
        })
      },
      getDisease(data) {
        let that = this;
        this.cityTitle = "选择疾病";
        api.ajax({
          url: XHRList.diseaseList,
          method: "POST",
          data: {
            partId: data,
            isValid: "1",
            firstResult: "0",
            maxResult: "9999"
          },
          beforeSend(config) {
            that.finish = false;
          },
          done(param) {
            window.scrollTo(0, 0);
            that.illnessList = param.responseObject.responseData.dataList;
            that.illnessList.forEach((element, index) => {
              cityNames.push(element.illnessName)
            });
            that.placeholderText = "请填写疾病的名称";
            that.addResult = true;
            that.noResultText="暂未搜索到相关疾病信息";
            cityNamesFilter = cityNames;
            that.cityFilter(that.illnessList, "illness");
            that.tempList = that.illnessList;
            that.responseParam = "illness";
            that.citySearch = "";
            that.letterAreaList = showCity;
            that.status = "illness";
            that.finish = false;
          },
          fail(err) {

          }
        })
      },
      getCountry(data){
        let that = this;

        api.ajax({
          url: XHRList.cityList,
          method: "POST",
          data: {
            parentId: data.regionId,
            isValid: "1",
            firstResult: "0",
            maxResult: "9999",
            treeLevel: data.level //1国2省3市4区
          },
          beforeSend(config) {
            that.finish = false;
          },
          done(param) {

            window.scrollTo(0, 0);
            that.areaList = param.responseObject.responseData.dataList;
            that.areaList.forEach((element, index) => {
              cityNames.push(element.regionName)
            });
            that.noResultText="暂未搜索到相关城市信息";
            that.placeholderText = "请填写城市的名称";
            cityNamesFilter = cityNames;
            that.cityFilter(that.areaList, "region");
            that.tempList = that.areaList;
            that.responseParam = "region";
            that.citySearch = "";
            that.letterAreaList = showCity;
//            document.body
          },
          fail(err) {

          }
        })
      },
      getFirstLetter (str) { //  得到城市第一个字的首字母
        return pinyin.getCamelChars(str)[0].toUpperCase();
      },
      buildLetter () {  // 构建字母项
        letter = [];
        for (let i = 0; i < 26; i++) {
          let obj = {};
          obj.letter = String.fromCharCode((65 + i));
          obj.citylist = [];
          letter.push(obj)
        }
      },
      buildItem (param, listType) {  // 构建城市
        this.buildLetter();
        let _this = this;
        for (let i = 0; i < 26; i++) {
          letter[i].citylist = []
        }
        for (let i = 0; i < param.length; i++) {
          let _index = Number(_this.getFirstLetter(param[i][listType + "Name"]).charCodeAt() - 65);
          if (_index >= 0 && _index < 26) {
            letter[_index].citylist.push({
              name: param[i][listType + "Name"],
              regionId: param[i][listType + "Id"],
              parentId: param[i].parentId,
              level: param[i].treeLevel,
              id: param[i].id,
              partId: param[i].partId
            })
          }
        }
        // 如果letter中citylist中没有值的话，过滤这一项
        showCity = showCityTemp = letter.filter(function (value) {
          return value.citylist.length > 0;
        })

      },
      cityFilter: function (city, listType) {  // 城市搜索筛选
        let that = this;
        let showCityListTemp;
//        debugger;
        this.buildItem(city, listType);
        this.letterAreaList = showCityTemp;
        this.letterAreaList = this.letterAreaList.filter(function (value) {
          showCityList = value.citylist;
          showCityListTemp = showCityList.filter(function (val) {
            return (val.name.indexOf(that.citySearch) > -1)
          });
          value.citylist = showCityListTemp;
          return value.citylist.length > 0
        });
        this.showCity = this.letterAreaList;
        if (this.letterAreaList.length === 0) {
//          let _showCityContent = document.getElementById('showCityContent');
          this.searchResult = false;
//          _showCityContent.innerText = '查询不到结果';
//          _showCityContent.setAttribute('class', 'tipShow')
        } else {
          this.searchResult = true;
//          document.getElementById('showCityContent').innerText = ''
        }
      },
      addresult () {
//        this.letterAreaList = [];
        switch(this.listType){
          case "hospital":
            this.$router.push({
              name:this.returnRouter,
              params: {
                hospitalMessage: {
                  name:this.addContent,
                  id:"0",
                },
                level:2,
              },
              query:this.$route.query
            });
            break;
          case "disease":
            this.$router.push({
              name:this.returnRouter,
              params: {
                diseaseMessage: {
                  name:this.addContent,
                  id:"0",
                },
                level:2,
              },
              query:this.$route.query
            });
            break;
        }
      },
      selectEvent(index, pIndex) {
        switch (this.listType) {
          case "city":
          case "hospital":
//            debugger;
            if (this.status === "hospital") {
              this.selectHospital(index, pIndex);
            } else {
              this.selectArea(index, pIndex);
            }
            break;
          case "disease":
            this.selectPart(index, pIndex);
            break;
        }
      },
      selectPart(index, pIndex) {
        if (this.status === "illness") {
          this.selectDisease(index, pIndex)
        } else if (this.status === "part") {
          this.getDisease(this.letterAreaList[pIndex].citylist[index].partId);
        }

      },
      selectDisease(index, pIndex) {
//        this.$emit('update:areaParam', this.letterAreaList[pIndex].citylist[index]);
//        this.$emit('update:show', false);
//        this.$emit('update:level', 2);
        let letterAreaListTemp = this.letterAreaList;
//        this.letterAreaList = [];
        this.$router.push({
          name:this.returnRouter,
          params: {
            diseaseMessage: letterAreaListTemp[pIndex].citylist[index],
            level:2,
          },
          query:this.$route.query
        });
      },
      // 选择 进入下一级
      selectArea(index, pIndex) {
//        debugger;
        let param = this.letterAreaList[pIndex].citylist[index];
        let result = "";

        switch (parseInt(param.level)) {
          case 2:
            this.finalObj.provinceId = param.regionId;
            this.finalObj.province = param.name;
            this.cityTitle = "选择城市";
            break;
          case 3:
            if (this.listType === "hospital") {
//              debugger
              this.getHospital(param.regionId);
            } else {
              this.finalObj.cityId = param.regionId;
              this.finalObj.city = param.name;
              this.cityTitle = "选择区域";
            }
            break;
          case 4:
            this.finalObj.districtId = param.regionId;
            this.finalObj.district = param.name;
        }
        if (param.level == 4) {
          this.finalObj.result += this.result + " " + param.name;
//          this.$emit('update:areaParam', this.finalObj);
//          this.$emit('update:show', false);
//          this.$emit('update:level', 2);
//          let letterAreaListTemp = this.letterAreaList;
//          this.letterAreaList = [];
          this.$router.push({
            name:this.returnRouter,
            params: {
              areaParam: this.finalObj,
              level:2,
            },
            query:this.$route.query
          });
//          this.finalObj.result = '';
        } else if (this.listType === "city") {
          param.level = parseInt(param.level) + 1;
          this.finalObj.result += param.name + " ";
          this.getCountry(param);
        }

      },
      selectHospital(index, pIndex) {
//        this.$emit('update:areaParam', this.letterAreaList[pIndex].citylist[index]);
//        this.$emit('update:show', false);
//        this.$emit('update:level', 2);
        let letterAreaListTemp = this.letterAreaList;
//        this.letterAreaList = [];
        this.$router.push({
          name:this.returnRouter,
          params: {
            hospitalMessage: letterAreaListTemp[pIndex].citylist[index],
            level:2,
          },
          query:this.$route.query
        });
      }
    },

    components: {
      'loading': loading
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  /*@import "../../scss/modules/_searchCommTop";*/
  @import "../../scss/library/_common-modules";
  /*@import "../../scss/modules/_searchResult";*/
  .search-box.selectArea{
    overflow: hidden;
    /*transform:translateX(100%);*/
    transition:transform 0.2s ease-in-out;
    /*position: fixed;*/
    /*top: 0;*/
    /*right: 0;*/
    /*bottom: 0;*/
    /*left: 0;*/
    /*z-index: 4;*/
    background-color: #fff;
    &.show{
      transform:translateX(0);
    }
    .tc-searchMain{
      $colorTwo:#222222;
      $colorFive:#555555;
      padding-top: 1.3rem;
      height: 100%;
      box-sizing: border-box;
      overflow: auto;
      .main-header{
        display: flex;
        position: fixed;
        top:0;
        .tc-searchBackBtn{
          @include font-dpr(16px);
          line-height: rem(60px);
          color: #000;
        }
      }
      //医生列表
      .tc-searchContentInner{
        //margin-top: rem(198px);
        .tc-searchDocArea{
          padding:rem(12px) rem(40px);
          box-sizing: border-box;
          border-bottom: 1px solid #DFDFDF;
          //position: fixed;
          width: 100%;
          //margin-top:1.3rem;
          background: #FFF;
          .tc-searchDocAreaLeft{
            display: inline-block;
            width: rem(10px);
            height:rem(18px);
            background: url(../common/image/img00/patientConsult/searchAreaLeft.png);
            background-size: 100% 100%;
          }
          .tc-searchAreaName{
            @include font-dpr(13px);
            color: #909090;
            // padding-left: rem(10px);
            &.tc-selectIllnessName{
              padding-left: 0;
            }
          }
        }

        //padding-top: rem(56px);
        .searchResultTitle{
          @include font-dpr(14px);
          color: $colorFive;
          background: #F9FBFC;
          padding:rem(10px) 0 rem(12px) rem(40px);
        }
        .searchResultItem{
          @include font-dpr(16px);
          color: $colorTwo;
          display: block;
          padding:rem(24px) rem(40px);
          line-height: rem(32px);
          cursor: pointer;
          &.selected{
            background-color: #F9FBFB;
          }
          & > em{
            color: #00BEAF;
            font-style: normal;
          }

        }
        .tc-searchListBoxIllness{
          max-height: 100%;
          .tc-searchDocKeyWord{
            max-height: 100%;
          }
          .tc-searchDocListItem{
            max-height: 100%;
          }
        }
      }
      //未找到相关结果 添加
      .tc-searchCommFixedBottom{
        bottom:0;
        position: fixed;
        width: 100%;
        height: rem(98px);
        background-color: #ffffff;
        border-top:1px solid #DFDFDF;
        text-align: center;
        @include font-dpr(13px);
        .tc-searchNoResult{
          display: inline-block;
          color: #B3B9C4;
        }
        .tc-searchAddBtn{
          display: inline-block;
          color: #00BEAF;
          padding:rem(12px) rem(18px);
          -webkit-border-radius: 100px;
          -moz-border-radius: 100px;
          border-radius: 100px;;
          border: 1px solid #00BEAF;
          margin: rem(24px) 0 rem(24px) rem(12px);
          vertical-align: middle;
        }
      }
      //搜索无结果
      .tc-searchCommNoResult{
        text-align: center;
        padding-top: rem(60px);
        .tc-searchNoResultText{
          display: inline-block;
          @include font-dpr(15px);
          color: #909090;
          padding-top: rem(80px);
        }
      }
      //手动添加医院
      .tc-searchAddBySelf{
        .tc-searchAddTextArea{
          textarea{
            @include font-dpr(16px);
            width: rem(668px);
            height: rem(200px);
            color: $colorFive;
            padding:rem(40px);
            background-color: #F9FBFB;
            border-style: none;
            line-height: rem(32px);
            -webkit-box-shadow: inset 0px -3px 4px 0 #F4F8FD;
            -moz-box-shadow: inset 0px -3px 4px 0 #F4F8FD;
            box-shadow: inset 0px -3px 4px 0 #F4F8FD;
          }
        }
        .tc-searchAddHosBtn{
          padding-top: rem(100px);
          span{
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
            margin:0 auto;
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
    .tc-search-noResult{
      text-align: center;
      padding-top:rem(200px);
      box-sizing: border-box;
      display: none;
      & > p{
        @include font-dpr(15px);
        color: #909090;;
      }
      & > span{
        display: block;
        margin-top:rem(60px);
        @include font-dpr(16px);
        color: #00BEAF;
        em{
          font-style: normal;
        }
      }
    }

    .icon-addResult:after{
      content: '';
      display: inline-block;
      vertical-align: middle;
      width:rem(14px);
      height:rem(14px);
      background: url("/image/img00/healthInfo/dialog_overtime_arrow.png");
      background-size:contain;
      margin-left:rem(12px);
    }

    .no-result-item-add{
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: #fff;
      z-index:4;
      .add-result-item{
        background: #F9FBFB;
        padding:rem(40px);
        color: #555555;
        width: 100%;
        border: none;
        resize: none;
        @include font-dpr(16px);
        box-sizing: border-box;
        box-shadow: 0px rem(-3px) rem(4px) 0px #F4F8FD;
      }
      .add-result-item-btn{
        width:rem(570px);
        display: block;
        margin:0 rem(90px);
        margin-top:rem(100px);
        &.unable{
          color: #fff;
          background: #DFDFDF;
        }
      }
    }

    //医生列表
    $colorTwo: #222222;
    $colorFive: #555555;

      .tc-searchCommFixedTop{
        position: fixed;
        //top:rem(101px);
        width: 100%;
      }
      .tc-search-noResult{
        display: block;
      }
      .tc-searchCommTop{
        padding: rem(20px);
        background-color: #F3F6F7;
        position: relative;
        width: 100%;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        .tc-searchCommInput{
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          @include font-dpr(15px);
          color: #555555;
          width:100%;
          height: rem(58px);
          padding-left: rem(60px);
          margin:0 auto;
          outline: none;
          border-style: none;
          -webkit-border-radius: rem(8px);
          -moz-border-radius: rem(8px);
          border-radius: rem(8px);
        }
        .tc-searchBtnPic{
          display: inline-block;
          width: rem(30px);
          height: rem(30px);
          background: url(../common/image/img00/patientConsult/inquire_search@2x.png) no-repeat;
          background-size:100% 100%;
          position: absolute;
          left: rem(40px);
          top: 50%;
          margin-top: rem(-15px);
        }
      }

    .tc-searchCommFixedTop{
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
          // padding-left: rem(10px);
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
        padding: rem(24px) rem(40px);
        line-height: rem(32px);
        cursor: pointer;
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
    .tips-text{
      display: none;
    }
  }

</style>
