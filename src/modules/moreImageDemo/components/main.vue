<template>
  <div>
    <ul class="uploadImgBox">
      <li v-for="(item,index) in localIdList"><img :src="item"><i class="icon-delImg" @click="deleteImages(index)"></i></li>
    </ul>
    <button class="uploadImgBtn" @click="chooseImages">点击我上传图片</button>

    <!--<section style="height:100%;"></section>-->
    <!--<section class="imageLazyBox">-->
      <!--<ul class="uploadImgBox">-->
        <!--<li v-for="item in lazyImageList"><img v-lazy="item" alt=""></li>-->
      <!--</ul>-->
    <!--</section>-->

    <!--<section class="record">-->
      <!--<button class="record-start" @click="startRecord">录音开始</button>-->
      <!--<button class="record-end" @click="stopRecord">录音结束</button>-->
      <!--<button class="play" @click="playRecord">播放</button>-->
    <!--</section>-->
  </div>
</template>
<script type="text/ecmascript-6">
  import api from "common/js/util/util";
  import  "common/js/third-party/flexible";
  export default{
      data(){
        return {
          localIdList:[
            require("../../../common/image/arrow_back.png")
          ],
          serverIdList:[],
          lazyImageList:[
            require("../../../common/image/arrow_back.png"),
            require("../../../common/image/arrow_back.png"),
            require("../../../common/image/arrow_back.png"),
            require("../../../common/image/arrow_back.png"),
            require("../../../common/image/arrow_back.png"),
            require("../../../common/image/arrow_back.png"),
            require("../../../common/image/arrow_back.png"),
            require("../../../common/image/arrow_back.png"),
          ]
        }
      },
      mounted(){
        api.forbidShare();
      },
      methods:{
        chooseImages(){
          let that = this;
          wx.chooseImage({
              count: 1, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                console.log(res.localIds);
                that.localIdList = that.localIdList.concat(res.localIds); // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                console.log("选择图片成功");
                res.localIds.forEach(function (value) {
                  that.uploadImages(value);
                })
              }
            })
        },
        uploadImages(imageUrl){
          let that = this;
          wx.uploadImage({
            localId: imageUrl, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (data) {
              console.log(data.serverId);
//              that.serverIdList.push(data.serverId); // 返回图片的服务器端ID
              api.ajax({
                url: "/mcall/customer/patient/case/attachment/v1/createWx/",
                method: "post",
                data: {
                  customerId: "1508466840782",
                  imageType: "image",
                  mediaId: data.serverId,
                  fileName: "image",
                  extName: "png"
                },
                done(res) {
                  if (res.responseObject.responseStatus) {
                    console.log("上传成功");
                  }
                }
              })
            },
            fail:function (err) {
              console.log("上传失败");
              console.log(err);
            }
          });
        },
        deleteImages(index){
          this.localIdList.splice(index,1);
        }
      }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../../scss/base";
  .uploadImgBox{
    li{
      float:left;
      width:30%;
      height:rem(250px);
      margin: rem(20px) 1.5%;
      position:relative;
      img{
        width:100%;
        height:100%;
        display:block;
      }
      .icon-delImg{
        width:rem(50px);
        height:rem(50px);
        background:url("../../../common/image/img00/consult_V1.2/delete@2x.png") no-repeat;
        background-size: 100% 100%;
        position:absolute;
        top:0;
        right:0;
      }
    }
  }
  .uploadImgBtn{
    margin-top:rem(100px);
    width:100%;
    height:rem(250px);
    display:block;
    background:#ccc;
    text-align:center;
    @include font-dpr(20px);
  }

  .record {
    text-align: center;
    font-size: 0;
    margin-top: rem(50px);
    button{
      margin: 0 rem(20px);
      font-size: rem(36px);
    }

   }

</style>

