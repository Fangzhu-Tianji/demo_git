 $(function() {
     var $obj = $("#nav");
     
     $obj.find(".nav-tit").hover(function() {
         $(this).addClass("hover");
     }, function() {
         $(this).removeClass("hover");
     });

     $obj.find(".nav-tit.arrow").click(function() {
         var $div = $(this).siblings(".nav-body");
         if ($(this).parent().hasClass("selected")) {
             $div.slideUp(300);
             $(this).parent().removeClass("selected");
         }
         if ($div.is(":hidden")) {
             $("#nav li").find(".nav-body").slideUp(300);
             $("#nav li").removeClass("selected");
             $(this).parent().addClass("selected");
             $div.slideDown(300);

         } else {
             $div.slideUp(300);
         }
     });



     // $obj.find(".nav-body a").hover(function () {
     //     if ($(this).hasClass("on")) { return; }
     //     $(this).addClass("hover");
     // }, function () {
     //     if ($(this).hasClass("on")) { return; }
     //     $(this).removeClass("hover");
     // });
     // $obj.find(".nav-tit").click(function () {
     //     // alert(1);
     //     var $div = $(this).siblings(".nav-body");
     //     if ($(this).parent().hasClass("selected")) {
     //         $div.slideUp(300);
     //         $(this).parent().removeClass("selected");
     //     }
     //     if ($div.is(":hidden")) {
     //         $("#nav li").find(".nav-tit").slideUp(300);
     //         $("#nav li").removeClass("selected");
     //         $(this).parent().addClass("selected");
     //         $div.slideDown(300);

     //     } else {
     //         $div.slideUp(300);
     //     }
     // });





    var $info = $('.account_management');
     $info.find(".modify").click(function () {
         var $account = $(this).closest('.account_info').siblings(".account_input");
           // alert(1);
         if ($(this).parent().hasClass("current")) {

             $account.slideUp(300);
             $(this).parent().removeClass("current");
         }
         if ($account.is(":hidden")) {
             $(".account_management").find(".account_input").slideUp(300);
             $(".account_management").removeClass("current");
             $(this).parent().parent().addClass("current");
             $account.slideDown(300);

         } else {
             $account.slideUp(300);
         }
     });

     $(".topnav").find(".icon-weixin").hover(function () {
         $(this).next().show();
     }, function () {
         $(this).next().hide();
     });
     $(".topnav").find(".icon-qq").hover(function () {
         $(this).next().show();
     }, function () {
         $(this).next().hide();
     });
     $(".top-code-box").hover(function () {
         $(this).show();
     }, function () {
         $(this).hide();
     });


     $(".sidebar-tit").find("span").hover(function () {
         var index = $(this).index();
         $(".sidebar-body").find(".sidebar-code").eq(index).fadeIn().siblings().fadeOut();
     }, function () {
         $(".sidebar-body").find(".sidebar-code").fadeOut();
     });
    
 });
