<template>
  <div style="width: 100%;height: 100%;">
    <div class="content">
      <div class="flagMessage">*请填写真实有效的信息</div>
      <ul>
        <li>
          <div>
            <span class="apply_title">姓名:</span>
            <span class="apply_text">
              <input class=" name" type="text" placeholder="填写真实姓名" maxlength="40"/>
            </span>
          </div>
          <p class="nameErrorMessage error-message"></p>
        </li>
        <li>
          <div>
            <span class="apply_title">医院:</span>
            <span class="apply_text">
              <input class="hospital" type="text" placeholder="填写所在的医院"/>
            </span>
          </div>
          <p class="nameHospitalMessage error-message"></p>
        </li>
        <li>
          <div>
            <span class="apply_title">职称:</span>
            <span class="apply_text">
              <select class="career apply_select">
                <option value="0">主任医生</option>
                <option value="1">副主任医生</option>
                <option value="2">主治医生</option>
              </select>
            </span>
          </div>
          <p class="nameCareerMessage error-message"></p>
        </li>
        <li>
          <div>
            <span class="apply_title">手机号码:</span>
            <span class="apply_text">
              <input class="apply_text mobile" type="text" placeholder="填写真实手机号码 "/>
            </span>
          </div>
          <p class="nameMobileMessage error-message"></p>
        </li>
        <li>
          <div>
            <span class="apply_title">验证码:</span>
            <span class="apply_text">
              <input class="apply_checkInput" type="text" placeholder="填写真实手机号码 "/>
              <a class="apply_checkCode">获取验证码</a>
            </span>
          </div>
          <p class="nameCheckMessage error-message"></p>
        </li>
      </ul>
      <div>
        <a class="saveBtn">提交</a>
      </div>
      <div class="apply_message">
        <p class="title">报名咨询</p>
        <p>电话：010-59007006</p>
        <p>微信：weiyi635</p>
        <p class="">报名成功后工作人员会在48小时内联系您，请耐心等待</p>
      </div>
      <div class="more">了解更多</div>
      <div class="detail_message activity">
        <div class="title">活动性情</div>
        <div class="content">
          请您填写报名页面的个人信息，我们的工作人员收到您的报名信息后，符合平台入驻要求的医生（医生职称为主治及以上），我们会尽快联系您，协助您完成平台入驻，有任何疑问可以拨打客服电话或添加客服微信进行咨询。
        </div>
      </div>
      <div class="detail_message duty">
        <div class="title">免责声明</div>
        <div class="content">
          1、 在报名页面请填写个人真实信息。
        </div>
        <div class="content">
          2、 唯医骨科尊重用户隐私，未经用户授权不公开、编辑或透露其个人资料，除非基于下述原因：根据中华人民共和国法律或行政法规、规章的要求；根据中华人民共和国国家安全机构、公安部门及其他权力机构的要求，或根据相应的法律程序的要求；为维护唯医骨科的商标权及其它合法权益；在紧急情况下竭力维护用户个人、其它社会个体和公众的安全；符合其他相关的要求。
        </div>
        <div class="content">
          3、 活动最终解释权归唯医骨科平台所有。
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  /**
   * @Desc：
   * @Usage:
   * @Notify：
   * @Depend：
   *
   * Created by Gubowen on 2017/9/14.
   */
  export default{
      data(){
        return {

        }
      },
      methods:{

      },
      mounted(){

      }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  @import "../../../scss/library/_common-modules";
</style>
