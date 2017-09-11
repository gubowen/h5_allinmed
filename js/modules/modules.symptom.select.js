/**
 * @Desc：
 * @Usage:
 * @Notify：
 * @Depend：
 *
 * Created by qiangkailiang on 2017/2/20
 */

modules.symptom_select = {
    init: function () {

    },
    config: {},
    template: {
        man: {
            front:'<img class="body-picture-img" src="/image/img00/patientConsult/body_man_front@2x.png" alt="" data-dir="front">',
            back:'<img class="body-picture-img" src="/image/img00/patientConsult/body_man_back@2x.png" alt="" data-dir="back">'
        },
        woman:{
            front:'<img class="body-picture-img" src="/image/img00/patientConsult/body_woman_front@2x.png" alt="" data-dir="front">',
            back:'<img class="body-picture-img" src="/image/img00/patientConsult/body_woman_back@2x.png" alt="" data-dir="back">'
        },
        kid:{
            front:'<img class="body-picture-img" src="/image/img00/patientConsult/body_kid_front@2x.png" alt="" data-dir="front">',
            back:'<img class="body-picture-img" src="/image/img00/patientConsult/body_kid_back@2x.png" alt="" data-dir="back">'
        }
    },
    pointList:  {
            front:[
                '1491806838222',
                '1491806838222',
                '1491806845477',
                '1491806845477',
                '1491806841841',
                '1491806841841',
                '1491806847001',
                '1491806847001',
                '1491806848305',
                '1491806848305'
            ],
            back:[
                '1491806850917',
                '1491806850917',
                '1491806850917',
                '1491806839523',
                '1491806839523'
            ]
    },
    hidePoint:{
        front:[
            '1491806839056',
            '1491806839056',
            '1491806840239',
            '1491806840239',
            '1491806846259',
            '1491806846259',
            '1491806847792',
            '1491806847792',
            '1491806851047',
            ''
        ],
        back:[
            '1491806851047',
            '1491806851047',
            '1491806850722',
            '1491806850722',
            ''
        ]
    },
    render: function (type) {
        var that=this;
        this.direction=$(".body-picture-overturn").data("dir");
        $(".body-picture").addClass(type+"-"+this.direction);
        for (var i in this.template[type]){
            $(".body-picture-content").prepend(this.template[type][i]);
        }
        this.symptomPoint("front");
        this.changeDirection(type);

    },
    symptomPoint:function (direction) {
        var that=this;
        $(".pain-point-box .pain-point").each(function (index, element) {
            $(element).removeAttr("data-id");
            $(element).attr("data-id",that.pointList[direction][index])
        });

        $(".hide-point-box .hide-point").each(function (index,element) {
            $(element).removeAttr("data-id");
            $(element).attr("data-id",that.hidePoint[direction][index])
        })
    },
    changeDirection:function (type) {
        var that=this;
        $(".body-picture-img[data-dir='"+this.direction+"']").show();

        $(".body-picture-overturn").on("click",function () {
            if (that.direction==="front"){
                $(".body-picture").removeClass(type+"-"+that.direction);
                that.direction="back";
                $(this).attr("data-dir","back");
                $(".body-picture").addClass(type+"-back");
                $(".body-picture-img").hide();
                $(".body-picture-img[data-dir='"+that.direction+"']").show();
                that.symptomPoint("back")
            }else{
                $(".body-picture").removeClass(type+"-"+that.direction);
                that.direction="front";
                $(this).attr("data-dir","front");
                $(".body-picture").addClass(type+"-front");
                $(".body-picture-img").hide();
                $(".body-picture-img[data-dir='"+that.direction+"']").show();
                that.symptomPoint("front")
            }
            $(".pain-point").removeClass("on")
        })
    }
};