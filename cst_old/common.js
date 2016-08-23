  var len = $(".banner .hd li").length;
  var i = (1220 - 166 * len)/2;
  if( i > 0) {
    $(".banner .hd ul").css({padding:'0 '+i+'px'});
  }
  $(".banner").slide({ 
    titCell:".hd li", 
    mainCell:".bd ul", 
    effect:"fold",
    autoPlay:true,
    delayTime:700
  });
  //var $box = $('.banner-box');
  //$box.on('click','.reg-k-login',function(){
  //  $box.find('.b-box-reg').addClass('hide');
  //  $box.find('.b-box-login').removeClass('hide');
  //}).on('click','.b-box-login button',function(){
  //  $box.find('.b-box-login,.b-box-reg').addClass('hide');
  //  $box.find('.b-box-logged').removeClass('hide');
  //  return false;
  //});
  
  $(".notice-list").slide({
    mainCell:"ul",
    autoPage:true,
    effect:"topLoop",
    autoPlay:true
  });
  
  $(".friendlink").slide({
    titCell:".hd li",
    delayTime:0
  });
  
  $(".detail-main-dec").slide({
		mainCell:".tab-bd",
	    titCell:".hd li",
	    delayTime: 0,

	  });
  
 var $list = $('.assign-list');
 $list.on('click','tbody tr',function(){
    var url = $(this).data('url');
    location.href = url;
 });


 

 


