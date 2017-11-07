/**
 * Created by ALLIN on 2017/9/14.
 */
$(function () {
  $(".more").on("click", function () {
    console.log("111");
    $(".detail_message").toggle("on");
  });

  $(".apply_checkCode").on("click", function () {
            var  i = 60 ;
      $(".apply_checkCode").addClass("on").text(i);

  var time =   setInterval(function () {
      i--;
      $(".apply_checkCode").text(i + "S");
      if (i === 0) {
        clearInterval(time);
        $(".apply_checkCode").text("重新获取").removeAttr("disabled").removeClass("send");
        i = 60;
      }
    }, 1000);


  });

  $(".saveBtn").on('click',function(){
    popup({
      'text':'验证码已发送'
    })
  });


  $(".name").validate({
    errorEle: $(".nameErrorMessage"),
    rules: [{
      rule: "isNoEmpty",
      msg: "用户名不能为空"
    }, {
      rule: "isMobile",
      msg: "用户名格式不正确"
    }]
  });



   function popup(obj) {
    if ($(".popup").length == 0) {
      $("body").append('<section class="middle-tip-modal popup">' +

        '<figure class="middle-tip-box-text">' +
        (obj.hasImg ? '<img src="/image/img00/login/save_loading.png" alt="">' : '') +
        '<p class="popup-text">' + obj.text + '</p> ' +

        '</figure>' +
        '</section>');

      setTimeout(function () {
        $(".popup").addClass('show')
      }, 100);
    } else {
      $(".popup").addClass('show');
      $(".tipText").text(obj.text);
      if (!obj.hasImg) {
        $(".middle-tip-box-text img").hide();
      } else {
        $(".middle-tip-box-text img").show();
      }
    }
    setTimeout(function () {
      // $(".popup").removeClass('show');
      $(".popup").remove();
    }, 3000)
  };


});
