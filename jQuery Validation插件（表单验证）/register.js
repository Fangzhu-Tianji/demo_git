/*
注册
*/
$(function () {
    $('#frmRegStep1').validate({
        errorElement: 'span',
        errorClass: 'validate-txt',
        focusInvalid: false,
        ignore: "",
        messages: {
            Mobile: { required: "请输入手机号码。", remote: "您的手机号已被使用。" },
            Code: { required: "请输入短信验证码。" },
            Referrer: { remote: "推荐码无效。" }
        },
        rules: {
            Mobile: {
                required: true,
                isMobile: true,
                remote: {
                    url: "/home/checkaccount",
                    type: "post",
                    dataType: "json",
                    data: { Account:function(){return $(":text[name=Mobile]").val();} }
                }
            },
            Code: { required: true },
            Referrer: {
                remote: {
                    url: "/home/checkreferrer",
                    type: "post",
                    dataType: "json",
                    data: { Referrer: function () { return $(":text[name=Referrer]").val(); } }
                }
            },
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
            if (!$("#chkArgee").is(":checked")) {
                $.errorAlert("必须同意财视通的服务条款和隐私规则才能提交注册！");
                return false;
            }
            $.apiPost({
                Url: "/sms/check", Data: $(form).serializeJson(), Async: false, CallBack: function (res) {
                    if (res) {
                        window.RegisterData = $(form).serializeJson();
                        $("#frmRegStep1").hide();
                        $("#frmRegStep2").show();
                    }
                    else { $.errorAlert("短信验证码不正确。"); }
                }
            });
         
        }
    });
    //确认注册
    $(".btnRegister").click(function () {
        $('#frmRegStep1').submit();
    });

    $(":password[name=Password]").keyup(function () {
        var _level = pwStrength($(this).val());
        $(".password-color-ls li").removeClass("selected");
        $(".pwdtxt span").removeClass("pwd-low");
           $(".password-color-ls li:lt(" + _level+ ")").addClass("selected");
           $(".pwdtxt span:eq(" + (_level-1) + ")").addClass("pwd-low");
    });

    $('#frmRegStep2').validate({
        errorElement: 'span',
        errorClass: 'validate-txt ml10',
        focusInvalid: false,
        ignore: "",
        messages: {
            //NickName: { required: "请输入用户名。", remote: "您输入的用户名已被使用。" },
            Password: { required: "请设置登录密码。", rangelength:"密码有效长度为6~20位字符" },
            CheckPassword: { equalTo: "两次输入的密码不一致,请重新输入!" }
        },
        rules: {
            //NickName: {
            //    required: true,
            //    remote: {
            //        url: "/home/checkaccount",
            //        type: "post",
            //        dataType: "json",
            //        data: { Account: function () { return $(":text[name=NickName]").val(); } }
            //    }
            //},
            Password: { required: true, rangelength: [6, 20],isPassword:true },
            CheckPassword: { equalTo: ":password[name=Password]" }
        },
        highlight: function (element) { },
        unhighlight: function (element) { },
        success: function (label) { },
        submitHandler: function (form) {
           var data= window.RegisterData = $.extend($(form).serializeJson(), window.RegisterData);
          $.apiPost({
                Url: "/register.html", Data: data, Async: false, CallBack: function (res) {
                    if (res.IsSuccess) {
                        //$("#divResult").html("尊敬的用户：恭喜您注册成功！为了保障您的投资权益，我们建议您立刻进行风险测评。");
                        //var time = 3;
                        // window.setInterval(function () {
                        //     $("#spanTime").text(--time);
                        //     if (time==0) {
                        //         window.location = "/member";
                        //     }
                        //  }, 1000);
                        $("#frmRegStep2").hide();
                        $("#frmRegStep3").show();
                    }
                    else { $.errorAlert(res.Msg); }
                }
            });
        }
    });
    //创建会员
    $(".btnCreateMember").click(function () {
        $('#frmRegStep2').submit();
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
        return 1;
    } else if (pwd.length < 6) {
        return 1;
    } else {
        var S_level = checkStrong(pwd);
        switch (S_level) {
            case 0://低
                return 1;
            case 1://低
                return 1;
            case 2://中
                return 2;
            default://高
                return 3;
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

