/**
 * @name: 患教知识和处置建议终端页
 * @desc:
 * @example:
 * @depend:
 * @date: 2017/4/13
 * @author: wangjingrong
 */
$(function () {
	var teachArtical={
		init:function () {
			var t = this;
			t.addHtml();
		},
		config:{

		},
		template:{

		},
		path:{
			getTeachingDetail:"/mcall/comm/data/knowledge/content/v1/getMapById/"
		},
		addHtml:function(){
			var t = this;
			$.ajax({
				url: t.path.getTeachingDetail,
				dataType: 'json',
				timeout: 10000,
				data: {
					paramJson: $.toJSON({
						isValid:1,
						firstResult:0,
						maxResult:999,
						knowledgeId:common.getpara().id
					})
				},
				beforeSend:function(){
					common.loading.show()
				},
				success:function(data){
					if(data.responseObject.responseData.dataList){
						var items = data.responseObject.responseData.dataList[0],
							createTime = items.createTime.split(" ")[0];
						var html='<h2 class="tc-articlTitle">'+common.getpara().title+'</h2>'+
							//'<p class="tc-articlOrigin"><span>来源/唯医大数据</span><span>'+createTime+'</span></p>'+
							'<section class="tc-articleMain">'+
							items.knowledgeContent+
							'</section>';
						$(".tc-articleDetails").html(html);
						common.loading.hide();
					}else{

					}
				},
				error:function(){

				}
			})
		}
	};
	teachArtical.init();
})