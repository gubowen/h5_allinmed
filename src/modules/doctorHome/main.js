/**
 * @Desc：医生主页 主入口文件
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by Qiangkailiang on 17/7/10.
 */
import Vue from 'vue';
import App from './App';
import VeeValidator, {Validator}  from 'vee-validate';
import VueRouter from 'vue-router';
import doctorMain from './components/doctorMain';
import individualInfo from './components/individualInfo';
import clinicDetails from './components/clinicDetails';
import vueg from 'vueg'
import 'vueg/css/transition-min.css'
import "static/css/base.css";
import  "../../common/js/third-party/jweixin-1.0.0.js"
import api from '../../common/js/util/util';
import fastclick from 'fastclick';
import WxPayCommon from '../../common/js/wxPay/wxComm';
// import vconsole from 'vconsole';
// import eruda from 'eruda'
fastclick.attach(document.body);


class Consult {
  constructor() {
    this.init();
  }

  init() {
    // eruda.init();
    //注册时数据最新
    // api.wxGetOpenId(1);    //获取openId

    //路由系统注册
    Vue.use(VeeValidator);
    Vue.use(VueRouter);
    //微信支付相关
    // let  data={
    //   caseId:'',                         //  string  是  caseId
    //   patientCustomerId:'1489998682602', //	string	是	患者所属用户id
    //   patientId:'1491471348694',         // 	string	是	患者id
    //   doctorId:'1234567890123',          //	string	是	医生id
    //   orderType:'2',                     //	string	是	订单类型  1-咨询2-手术3-门诊预约
    //   orderSourceId:'1493697450391',     //	string	是	来源id，  对应 咨询id,手术单id，门诊预约id
    //   orderSourceType:'',                //	string	是	来源类型  问诊：1-普通2-特需3-加急 | 手术：1-互联网2-公立 | 门诊：1-普通2-专家3-特需
    //   orderAmount:0.01,                  //	string	否	订单金额  （单位/元 保留两位小数）
    //   status:'1',                        //	string	否	订单状态: 1-待支付 2-已支付 3-已完成 4-已取消 5-退款中
    //   body:'唯医骨科线下预约手术支付',   //   string  否  订单描述 （微信支付展示用）
    //   isCharge:"true"                    //   string  是  true-收费  false-免费
    // };
    // WxPayCommon.wxCreateOrder({
    //   data:data,        //data为Object 参考下面给出格式
    //   backCreateSuccess:function(_data){
    //     //创建订单成功  （手术必选）
    //   },
    //   backCreateError:function(_data){
    //     //创建订单失败  (必选)
    //   },
    //   wxPaySuccess:function(_data){
    //     //支付成功回调  (问诊/门诊类型 必选)
    //   },
    //   wxPayError:function(_data){
    //     //支付失败回调  (问诊/门诊类型 必选)
    //   }
    // });
    // WxPayCommon.wxUpOrder({
    //   operationType:'2',    //操作类型        1-生成订单  2-已支付  3-支付失败  4-取消  5-退款 6-已完成
    //   orderId:'123131',          // 订单ID
    //   outTradeNo:'',       //微信支付订单Id  (免费订单非必填)
    //   status:'2',           //订单状态        1-待支付  2-已支付  3-已完成  4-已取消  5-退款中
    //   callBack:function(data){
    //     //更新成功
    //   },
    //   errorCallBack:function(){
    //     //更新失败
    //   }
    // });
    // WxPayCommon.wxPay({
    //   isTest:2,
    //   total_fee:0.01,
    //   body:"明天你好",
    //   orderSourceId:1,
    //   orderId:'',
    //   orderType:'1',
    //   reservationStatus:'2',
    //   callBack:(data)=>{console.log(data)}
    // });

    this.routerStart();
    this.registerRouter();
    this.goToRouter();
    // this.forbidShare();
    //Vue实例启动
    const app = new Vue({
      router: this.router,
      render: h => h(App)
    }).$mount("#doctorHome");
  }

  //路由实例化生成
  registerRouter() {
    const options={
      duration: '0.3',              //转场动画时长，默认为0.3，单位秒
      firstEntryDisable: false,     //值为true时禁用首次进入应用时的渐现动画，默认为false
      firstEntryDuration: '.6',     //首次进入应用时的渐现动画时长，默认为.6
      forwardAnim: 'fadeInRight',   //前进动画，默认为fadeInRight
      backAnim: 'fadeInRight',       //后退动画，默认为fedeInLeft
      sameDepthDisable: false,      //url深度相同时禁用动画，默认为false
      tabs: [{
        name:'home'
      },{
        name:'my'
      }],                       //默认为[]，name对应路由的name,以实现类似app中点击tab页面水平转场效果，如tab[1]到tab[0]，会使用backAnim动画，tab[1]到tab[2]，会使用forwardAnim动画
      tabsDisable: false,           //值为true时，tabs间的转场没有动画，默认为false
      disable: false,               //禁用转场动画，默认为false，嵌套路由默认为true
    };
    this.router = new VueRouter({
      routes: this.routes,
      scrollBehavior (to, from, savedPosition) {
        return {x: 0, y: 0}
      }
    });
    // Vue.use(vueg, this.router,options);
  }

  //路由注册
  routerStart() {
    this.routes = [
      {
        path:"/",
        redirect:"/doctorMain"
      },
      {
        path: "/doctorMain",
        name: "doctorMain",
        component: doctorMain,
        meta: {
          keepAlive: true
        },
      },
      {
        path: "/clinicDetails",
        name: "clinicDetails",
        component: clinicDetails,
        meta: {
          keepAlive: false
        },
      },
      {
        path: "/individualInfo",
        name: "individualInfo",
        component: individualInfo,
        meta: {
          keepAlive: true
        },
      }
    ];
  }

  //抓取缓存跳转当前路由页
  //Vue-router自身带有保存机制，参数通过query传递即可
  goToRouter() {
    // const path=localStorage.getItem("currentPath")?localStorage.getItem("currentPath"):"addPatient";
    // this.router.push("addPatient");
  }

  //禁用微信内置分享---(如果想开放分享，则在url中拼接ishare=1)
  forbidShare(){
    api.ajax({
      url: "/mcall/wx/api/v1/getJSConfig/",
      method: 'POST',
      data: {
          url: window.location.href
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      done: function (data) {
        if (data.responseObject.responseData && data.responseObject.responseStatus) {
          let item = data.responseObject.responseData;
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: item.appId, // 必填，公众号的唯一标识
            timestamp: item.timestamp, // 必填，生成签名的时间戳
            nonceStr: item.noncestr, // 必填，生成签名的随机串
            signature: item.signature,// 必填，签名，见附录1
            jsApiList: [
              "onMenuShareTimeline",
              "hideOptionMenu",
              "showOptionMenu",
              "getNetworkType",
              "getLocation",
              "openLocation",
              "chooseImage",
              "previewImage",
              "uploadImage",
              "getLocalImgData",
              "scanQRCode",
              "hideMenuItems"
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
          });
          wx.ready(function(){
            console.log("成功了");
            wx.hideOptionMenu();
          });
          wx.error(function(res){
            console.log(res);
          });
        }
      },
      fail:function (err) {
        document.querySelector(".ev-loading").style.display="none";
      }
  })
}
}


let consult = new Consult();

Validator.extend('mobile', {
  messages: {
    en: (field, args) => {
      return "请填写真实手机号码"
    },
    cn: (field, args) => {
      return "请填写真实手机号码"
    }
  },
  validate: value => {
    return value.length == 11 && (/^(127|13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/).test(value)
  }
});

Validator.extend('special', {
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
  },
  validate: value => {
    return !(/[`~!！？@#$%^&*()_+<>?:"{},，。.\/;'[\] ]/).test(value)
  }
});

Validator.extend('max_length', {
  messages: {
    en: field => '请填写真实姓名',
  },
  validate: (value,args) => {
    let len = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i].match(/[^\x00-\xff]/ig) !== null){
        len += 2;
      }
      else{
        len += 1;
      }
    }
    return len <= parseInt(args[0]);
  }
});

Validator.extend('isEmoji', {
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
  },
  validate: value => {
    return !(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g).test(value)
  }
});
Validator.extend('noNumber', {
  messages: {
    en: field => '请填写真实姓名，不能输入数字及特殊符号',
  },
  validate: value => {
    return !(/^(?=.*\d.*\b)/).test(value)
  }
});
