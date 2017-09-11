/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by lichenyang on 2017/5/31.
 */
$(function () {
    var controller = {
        init: function () {
            $(".search-box").css("display","block");
            modules.searchList({
                targetEle: $(".doctorName.show"),
                type: "doctor",
                beforeFun:function () {
                    $(".search-box").css("transform","translateX(0%)");
                },
                // backCallback:function () {
                //     var text = "";
                //     text += $(".doctorName.show").attr("data-hospital") && $(".doctorName.show").attr("data-hospital") + "-";
                //     text += $(".doctorName.show").attr("data-medicalTitle") && $(".doctorName.show").attr("data-medicalTitle") + "-";
                //     text += $(".doctorName.show").attr("data-name") && $(".doctorName.show").attr("data-name");
                //     $(".doctorName.show").html(text);
                //     document.title = "直约手术";
                //     // $(".doctorName .show").addClass('selected');
                //     // that.config.partId = $(".doctorName .show").attr('data-partid');
                //     // that.buttonClick();
                // },
                source:1,
                select:1
            })
        },
        config: {},
        template: {},
        path: {}
    };
    controller.init();
});
