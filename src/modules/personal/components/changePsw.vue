<template>
  <section class="allinmed-personal-changePsw">
    <section class="allinmed-personal-tableModule">
      <article class="allinmed-personal-tableModuleItem">
        <h3>当前密码</h3>
        <figure class="allinmed-tableModuleItemInput">
          <input type="password" placeholder="请输入当前密码" id="password">
          <i class="icon-searchCancel"></i>

        </figure>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <h3>新密码</h3>
        <figure class="allinmed-tableModuleItemInput">
          <input type="password" placeholder="请输入当前密码" id="newPassword">
          <i class="eye ev_toggleEye eyeClose" style="right:0;margin-right:0;"></i>

        </figure>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <h3>确认新密码</h3>
        <figure class="allinmed-tableModuleItemInput">
          <input type="password" placeholder="请输入当前密码" id="password">
          <i class="icon-searchCancel"></i>

        </figure>
      </article>
      <article class="allinmed-personal-tableModuleItem">
        <button class="btn-primary-lg allinmed-personal-msgWriting" id="save" on="false">确认</button>
      </article>
    </section>
  </section>
</template>
<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../../../scss/library/_common-modules.scss";

  .allinmed-personal-changePsw {
    position: absolute;
    top: rem(20px);
    left: rem(20px);
    width: rem(710px);
    background: #fff;
    border-radius:rem(16px);
    .allinmed-personal-tableModule{
        position: relative;
        min-height:rem(454px);
        height:auto;
        .allinmed-personal-tableModuleItem{
          margin: 0 rem(28px);
          padding: rem(30px) 0;
          position:relative;
          box-sizing: border-box;
          border-bottom: 2px solid #EAEAEA;

          height:rem(101px);
          h3{
            float: left;
            font-size: rem(30px);
            color: #555;
            font-weight: 400;
            display: inline-block;
            line-height:rem(38px);
          }
        .allinmed-tableModuleItemInput{
          color: #aaa;
          position: absolute;
          left: rem(156px);
          font-size: rem(30px);
          display: inline-block;

            & > input {
                border: none;
                background: none;
                font-family: "Microsoft Yahei";
                padding: 0;
                margin: 0;
              }
        }

          &:nth-last-child(1){
             border-bottom: none;
           }
        }
        .btn-primary-lg {
          display: block;
          width: 100%;
          text-align: center;
          height: rem(90px);
          line-height: rem(90px);
          background-color: #2899e6;
          border-radius: rem(20px);
          color: #fff;
          font-size: rem(40px);
        }
        .allinmed-personal-msgWriting{
          opacity: .5;
        }
    }
  }
</style>
