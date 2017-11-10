<template>
  <div style="width: 100%;height: 100%;">
    <ul class="uploadImgBox">
      <!--<li v-for="item in localIdList"><img :src="item.url"></li>-->
    </ul>
    <button class="uploadImgBtn" @click="uploadImgs">点击我上传图片</button>
  </div>
</template>
<script type="text/ecmascript-6">
  import api from "common/js/util/util";
  import  "common/js/third-party/flexible";
  export default{
      data(){
        return {
          localIdList:[]
        }
      },
      mounted(){
        api.forbidShare();
      },
      methods:{
        uploadImgs(){
          wx.chooseImage({
              count: 9, // 默认9
              sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
              sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
              success: function (res) {
                let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                console.log(localIds);
                console.log("选择图片成功");
              }
            })
        }
      }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/base";
  .uploadImgBox{
    li{
      float:left;
      width:30%;
      height:rem(250px);
      margin: rem(20px) 1.5%;
      img{
        width:100%;
        height:100%;
        display:block;
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
</style>

