/*
找回密码
*/
$(function () {
  
    $('#frmForget').validate({
        errorElement: 'span',
        errorClass: 'validate-txt ml10',
        focusInvalid: false,
        ignore: "",
        messages: {
            Mobile: { required: "请输入手机号码。" },
            Code: { required: "请输入短信验证码。" }
        },
        rules: {
            Mobile: { required: true, isMobile: true },
            Code: { required: true }
        },
        errorPlacement: function(error, element) {
            if (element.attr("name") == "Code") {
                error.insertAfter("#validate-wrap");
            } else {
                error.insertAfter(element);
            }
        },
        highlight: function (element) { },
        unhighlight: function (element) { },
        success: function (label) { },
        submitHandler: function (form) {
            $.apiPost({
                Url: "forget.html"/*tpa=http://cst58.com/forget.html*/, Data: $(form).serializeJson(), Async: false, CallBack: function (res) {
                    if (res) {
                        window.RegisterData = $(form).serializeJson();
                        $("#frmForget").hide();
                        $("#frmSetPassword").show();
                        $(".Mobile", "#frmSetPassword").text(res.Data.MobileView);
                        $(":hidden[name=Mobile]", "#frmSetPassword").val(res.Data.Mobile);
                    }
                    else { $.errorAlert(res.Msg); }
                }
            });
        }
    });
    $(".btnNextOne").click(function () {
        $('#frmForget').submit();
    });

    $(":password[name=Password]").keyup(function () {
        var _level = pwStrength($(this).val());
        $(".password-color-ls li").removeClass("selected");
        $(".password-color-ls li:eq(" + _level + ")").addClass("selected");
    });

    $('#frmSetPassword').validate({
        errorElement: 'span',
        errorClass: 'validate-txt ml10',
        focusInvalid: false,
        ignore: "",
        messages: {
            Password: { required: "请设置登录密码。", rangelength:"密码有效长度为6~20位字符" },
            CheckPassword: { equalTo: "两次输入的密码不一致,请重新输入!" }
        },
        rules: {
            Password: { required: true, rangelength: [6, 20],isPassword:true },
            CheckPassword: { equalTo: ":password[name=Password]" }
        },
        highlight: function (element) { },
        unhighlight: function (element) { },
        success: function (label) { },
        submitHandler: function (form) {
           var data= $(form).serializeJson();
          $.apiPost({
                Url: "http://cst58.com/setpassword.html", Data: data, Async: false, CallBack: function (res) {
                    if (res.IsSuccess) {
                        $("#frmSetPassword").hide();
                        $("#frmSuccess").show();
                        $("#divResult").html(res.Data.NickName + ",您的"+(data.Type==1?"交易":"登录")+"密码设置成功，请记住新密码！"); 
                        var time = 3;
                         window.setInterval(function () {
                             $("#spanTime").text(--time);
                             if (time==0) {
                                 window.location = "login.html-ReturnUrl=-member.htm"/*tpa=http://cst58.com/member*/;
                             }
                          }, 1000);
                      
                    }
                    else { $.errorAlert(res.Msg); }
                }
            });
        }
    });
    $(".btnSave").click(function () {
        $('#frmSetPassword').submit();
    })
})

//手机号验证
$.validator.addMethod("isMobile", function (value, element) {
    var length = value.length;
    var mobile = /^(13[0-9]{9})|(18[0-9]{9})|(14[0-9]{9})|(17[0-9]{9})|(15[0-9]{9})$/;
    return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");
//密码验证
$.validator.addMethod("isPassword", function (value, element) {
    var password = /^(?:(?=.*[a-zA-Z])(?=.*[0-9])).+/;
    return this.optional(element) || password.test(value);
}, "密码必须包含字母及数字");
function pwStrength(pwd) {
    if (pwd == null || pwd == '') {
        return 0;
    } else if (pwd.length < 6) {
        return 0;
    } else {
        var S_level = checkStrong(pwd);
        switch (S_level) {
            case 0://低
                return 0;
            case 1://低
                return 0;
            case 2://中
                return 1;
            default://高
                return 2;
        }
    }
}
function checkStrong(sPW) {
    if (sPW.length <= 4)  return 0; //密码太短  
    Modes = 0;
    //测试每一个字符的类别并统计一共有多少种模式. 
    for (i = 0; i < sPW.length; i++) Modes |= CharMode(sPW.charCodeAt(i));   
    return bitTotal(Modes);
}
//测试某个字符是属于哪一类.  
function CharMode(iN) {
    //数字 
    if (iN >= 48 && iN <= 57) return 1;
    //大写字母
    if (iN >= 65 && iN <= 90) return 2;
    //小写  
    if (iN >= 97 && iN <= 122) return 4;
    //特殊字符  
    else return 8;   
}

//计算出当前密码当中一共有多少种模式  
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}

