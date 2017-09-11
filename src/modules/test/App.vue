<template>
  <div>
    <ul class="qu-upLoadItemBox qu-upLoadItemBox-s docInt">
      <li class="tc-upLoadItemList ev-imgList success">
        <img alt="" src="">
        <span class="tc-upLoadDel" style="cursor: pointer;"></span>
      </li>
      <li class="ev-upLoadAdd">
        <input accept="image/gif,image/jpeg,image/jpg,image/png" type="file" class="ev-upLoadInput" @change="onFileChange($event)">
      </li>
    </ul>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {

      }
    },
    methods: {
      onFileChange(e){
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
          this.upLoadPic(files);
        }
      }
    },

  }
</script>
<style lang="scss" rel="stylesheet/scss"></style>

