/*
发送短信验证码
*/
$(function () {
    $(".btnSmsCode").bind("click", SendSmsCode);
})

function SendSmsCode() {
    var $this = $(this);
    var dialogId = "#dialog-smscode";
    $(dialogId).remove();
    var mobile = "";
    if ($this.attr("data-target")) {
        mobile = $($this.attr("data-target")).val() || "";
        if (mobile.length < 11) {
            $.errorAlert('请输入手机号码');
            return false;
        }
    }
    var tpl = $("#tmpSms").html();
    var html = juicer(tpl, { ID: "dialog-smscode" });
    $(html).appendTo("body");
    var imgUrl = "img.html-rn=.jpg"/*tpa=http://cst58.com/img.html?rn=*/;
    $("img", dialogId).click(function () {
        $(this).attr("src", imgUrl + Math.random());
    }).click();
    var dialogSms = $.ligerDialog.open({ target: $("#dialog-smscode"), title: '图片验证码', width: 500, modal: true });
    $(".btnSendSms", "#dialog-smscode").click(function () {
        var data = {
            Type: $this.attr("data-val") || "0",
            Mobile: mobile,
            ImageCode: $(":text[name=ImageCode]", dialogId).val() || ""
        };
        $.apiPost({
            Url: "/sms", Data: data, Async: false, CallBack: function (res) {
                if (res.IsSuccess) {
                    var $Text = $this.html();
                    $this.Countdown({
                        seconds: res.Data||0,
                        format: "<b>seconds秒</b><b>后重新获取</b>",
                        endTimeHtml: "",
                        timerEndBlackFun: function () {
                            $this.html($Text).bind("click", SendSmsCode);
                        }
                    });
                    $this.unbind();
                    dialogSms.close();
                    $.successAlert(res.Msg);
                }
                else { $(".error-code").html(res.Msg); }
            }
        });

        

    });
}