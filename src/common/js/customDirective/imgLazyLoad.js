let imgLazyLoad = {
  install(Vue, options = {}){
    let init = {
      img:options.loadingImg || require('../../image/loading.gif')
    };
    let imgDomList = [],
      seeHeight = document.documentElement.clientHeight; //可见区域高度
    let imgListsListening = function (el,binding) {
      let imgOffsetTop = el.getBoundingClientRect().top; //图片距离顶部高度
      if(imgOffsetTop<seeHeight + 20){
        el.src = binding.value;
      }else{
        el.src = init.img;
        imgDomList.push({
          el:el,
          imgSrc:binding.value,
          imgOffsetTop:imgOffsetTop
        })
      }
      scrollListening();
    };
    let scrollListening = function(){
      window.addEventListener('scroll',function(){
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //滚动条距离顶部高度
        imgDomList.forEach(function (value) {
          if(seeHeight + scrollTop > value.imgOffsetTop + 50){
            let image = new Image();
            image.src = value.imgSrc;
            image.onload = function(){
              value.el.src = value.imgSrc;
            }
          }
        })
      });
    }


    Vue.directive('laload',{
      inserted:imgListsListening
    });
  }
};

export default imgLazyLoad;
