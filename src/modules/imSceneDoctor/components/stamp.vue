<template>
  <p class='time-stamp' v-if="!(msg.type==='custom' && JSON.parse(msg.content).type.includes('new-'))">{{transformTimeStamp(msg.time)}}</p>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by qiangkailiang on 2017/8/17.
   */
  export default{
    mounted(){
//      this.$emit("update:beginTimestamp", this.msg.time);
    },
    methods: {
      transformTimeStamp(time){
        let format = function (num) {
          return num > 9 ? num : "0" + num;
        };
        let normalTime = function (time) {
          let d = new Date(time);
          let obj = {
            y: d.getFullYear(),
            m: d.getMonth() + 1,
            dd: d.getDate(),
            h: d.getHours(),
            mm: format(d.getMinutes())
          };
          return obj;
        };
        let result = "";
        let now = new Date().getTime(),
          day1 = normalTime(time).y + "-" + normalTime(time).m + "-" + normalTime(time).dd,
          day2 = normalTime(now).y + "-" + normalTime(now).m + "-" + normalTime(now).dd;
        if (day1 === day2) {
          result = normalTime(time).h + ":" + normalTime(time).mm;
        } else if (normalTime(time).y === normalTime(now).y) {
          result = normalTime(time).m + "月" + normalTime(time).dd + "日  " + normalTime(time).h + ":" + normalTime(time).mm;
        } else if (normalTime(time).y !== normalTime(now).y) {
          result = normalTime(time).y + "年" + normalTime(time).m + "月" + normalTime(time).dd + "日  " + normalTime(time).h + ":" + normalTime(time).mm;
        }

        return result;
      }
    },
    props: {
      msg: {
        type: Object
      },
      beginTimestamp: {
        type: Number
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
