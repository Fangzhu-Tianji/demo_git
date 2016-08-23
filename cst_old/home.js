/*
  网站首页
*/
$(function () {
    $(".friendlink").slide({
        titCell: ".hd li",
        delayTime: 0
    });
 
    var $list = $('.assign-list');
    $list.on('click', 'tbody tr', function () {
        var url = $(this).data('url');
        location.href = url;
    });
    $("img", "#frmLogin").click(function () {
        $(this).attr("src", "/img.html?rn=" + Math.random());
    })
    $("button", "#frmLogin").click(function () {
        var data = $("#frmLogin").serializeJson();
        if ($("#chkRemberme").is(":checked")) {
            $.cookie('_USERNAME', $("input[name=LoginName]", form).val(), { path: "/", expires: 30 });
        } else {
            $.cookie('_USERNAME', null, { path: "/", expires: -1 });
        }
        $.apiPost({
            Url: "login.html"/*tpa=http://cst58.com/login.html*/, Data: data, Async: false, CallBack: function (res) {
                if (res.IsSuccess) {
                    window.location.reload();
                }
                else {
                    $.errorAlert(res.Msg);
                }
            }
        });
        return false;
    });
    //读取用户名
    var _USERNAME = $.cookie('_USERNAME');
    if (_USERNAME != undefined && _USERNAME != null && _USERNAME != '') {
        $("input[name=LoginName]", "#frmLogin").val(_USERNAME);
        $("#chkRemberme").attr("checked", true);
    }
    else {
        $("input[name=LoginName]", "#frmLogin").val("");
    }
    //加载Banner
    Load(null, { Url: "/home/banners", ID: "#tmpBanners", TargetID: "#divBanners" }, function (res) {
        if (res.IsSuccess) {
            var len = $(".banner .hd li").length;
            var i = (1220 - 166 * len) / 2;
            if (i > 0) {
                $(".banner .hd ul").css({ padding: '0 ' + i + 'px' });
            }
            $(".banner").slide({
                titCell: ".hd li",
                mainCell: ".bd ul",
                effect: "fold",
                autoPlay: true,
                delayTime: 700
            });
            var $box = $('.banner-box');
            $('.reg-k-login').click(function () {
                $box.find('.b-box-reg').hide();
                $box.find('.b-box-login').show();
            });
        }
    });
    LoadBespokeCredits();//加载预约项目
    Load(null, { Url: "/home/credits", ID: "#tmpCredits", TargetID: "#divCredit" }); //投资项目
    Load(null, { Url: "/home/property", ID: "#tmpProperty", TargetID: "#divProperty" }); //产权交易
    Load(null, { Url: "/home/financemanager", ID: "#tmpFinanceManager", TargetID: "#ulFinanceManager" }); //理财经理
    Load(null, { Url: "/home/research", ID: "#tmpResearch", TargetID: "#ulResearch" }); //研投信息
    Load(null, { Url: "/home/topnewnotices", ID: "#tmpTopNewNotices", TargetID: "#ulNotice" }, function (res) {
        if (res.IsSuccess) {
            $(".list1").slide({
                mainCell: "ul",
                autoPage: true,
                effect: "topLoop",
                autoPlay: true
            });
        }
    });//加载最新公告

    Load(null, { Url: "/home/topOtherLink", ID: "#tmpTopNewNotices", TargetID: "#ulotherLink" }, function (res) {
        if (res.IsSuccess) {
            $(".list2").slide({
                mainCell: "ul",
                autoPage: true,
                effect: "topLoop",
                autoPlay: true
            });
        }
    });//加载外链公告

    Load(null, { Url: "/home/topmedia", ID: "#tmpTopNewInfo", TargetID: "#ulMedia" }, function (res) {
        if (res.IsSuccess) {
            $(".list3").slide({
                mainCell: "ul",
                autoPage: true,
                effect: "topLoop",
                autoPlay: true
            });
        }
    });//加载媒体公告

    Load(null, { Url: "/home/newspaper", ID: "#tmpNewspaper", TargetID: "#divNewspaper" }); //财经早报
    Load(null, { Url: "/home/partner", ID: "#tmpPartner", TargetID: "#ulPartner" }); //加载合作伙伴
    Load(null, { Url: "/home/links", ID: "#tmpPartner", TargetID: "#ulLinks" }); //加载友情链接
});

function LoadBespokeCredits() { //加载预约项目
    $.apiGet({
        Url: "/home/bespokecredits",CallBack: function (res) {
            if (res.IsSuccess) {
                var tpl = $("#tmpBespoke").html();
                if (res.Data.Fund!=null) {
                    $("#divFund").empty().append($(juicer(tpl, {Data:res.Data.Fund,Url:"/fund"})));
                }
                if (res.Data.Fund != null) {
                    $("#divPrivate").empty().append($(juicer(tpl, { Data: res.Data.Private, Url: "/private" })));
                }
                if (res.Data.Fund != null) {
                    $("#divTrust").empty().append($(juicer(tpl, { Data: res.Data.Trust, Url: "/trust" })));
                }
                if (res.Data.Fund != null) {
                    $("#divInsurance").empty().append($(juicer(tpl, { Data: res.Data.Insurance, Url: "/insurance" })));
                }
                if (res.Data.Assets != null) { 
                    $("#divAssets").empty().append($(juicer(tpl, { Data: res.Data.Assets, Url: "/assets" })));
                }
               
            }
        }
    });
}

//预约理财经理
function BespokeFM(id) {
    if ($IsLogin) {
        var postData = { FinanceManagerID: id };
        $.apiPost({
            Url: "bespokefm.html"/*tpa=http://cst58.com/bespokefm.html*/, Data: postData, Async: false, CallBack: function (res) {
                if (res.IsSuccess) {
                    $.successAlert("您的申请已提交成功，我们会尽快与您联系。", function () { window.location.reload(); });
                }
                else { $.errorAlert(res.Msg); }
            }
        });
    }
    else {
        $("img", "#dialog-bespoke").click(function () {
            $(this).attr("src", "/img.html?rn=" + Math.random());
        });
        $('#frmBespoke', "#dialog-bespoke").validate({
            errorElement: 'div',
            errorClass: 'validate-txt fz14 validat-special2',
            focusInvalid: false,
            ignore: "",
            messages: {
                Mobile: { required: "请输入手机号码。"},
                ImageCode: { required: "请输入图片验证码。" },
                Name: { required: "请输入姓名。" }
            },
            rules: {
                Mobile: {
                    required: true,
                    isMobile: true
                },
                ImageCode: { required: true },
                Name: { required: true }
            },
            highlight: function (element) { },
            unhighlight: function (element) { },
            success: function (label, element) { $(label).remove(); },
            submitHandler: function (form) {
                var postData = $.extend({ FinanceManagerID: id }, $(form).serializeJson());
                $.apiPost({
                    Url: "bespokefm.html"/*tpa=http://cst58.com/bespokefm.html*/, Data: postData, Async: false, CallBack: function (res) {
                        if (res.IsSuccess) {
                            $(".l-window-mask").hide();
                            $(".l-dialog-win").hide();
                            $("#form-request").hide();
                            $.successAlert("您的申请已提交成功，我们会尽快与您联系。", function () { window.location.reload(); });
                        }
                        else { $.errorAlert(res.Msg); }
                    }
                });
            }
        });
        //确认注册
        $(".btnSave", "#dialog-bespoke").click(function () {
            $('#frmBespoke', "#dialog-bespoke").submit();
        });
        $.ligerDialog.open({ target: $("#dialog-bespoke"), title: '预约理财经理', width: 500, modal: true, allowClose: true });
    }
}

//手机号验证
$.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");