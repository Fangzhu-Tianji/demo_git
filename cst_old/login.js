$(function () {
    //$("img", "#frmLogin").click(function () {
    //    $(this).attr("src", "/img.html?rn=" + Math.random());
    //})
    $('#frmLogin').validate({
        errorElement: 'div',
        errorClass: 'validate-txt validate-position',
        focusInvalid: false,
        ignore: "",
        messages: {
            LoginName: { required: "请输入用户名/手机号。"},
            Password: { required: "输入登录密码。" },
            //ImageCode: { required: "两次输入图片验证码。" }
        },
        rules: {
            LoginName: {required: true},
            Password: { required: true},
            //ImageCode: { required: true }
        },
        highlight: function (element) { },
        unhighlight: function (element) { },
        success: function (label, element) {
            $(label).remove();
        },
        submitHandler: function (form) {
            // 记住用户名
            if ($("#chkRemberme").is(":checked")) {
                $.cookie('_USERNAME', $("input[name=LoginName]",form).val(), { path: "/", expires: 30 });
            } else {
                $.cookie('_USERNAME', null, { path: "/", expires: -1 });
            }
            var data = $(form).serializeJson();
            $.apiPost({
                Url: "login.html"/*tpa=http://cst58.com/login.html*/, Data: data, Async: false, CallBack: function (res) {
                    if (res.IsSuccess) {
                        window.location = "login.html-ReturnUrl=-member.htm"/*tpa=http://cst58.com/member*/;
                    }
                    else { $.errorAlert(res.Msg); }
                }
            });
        }
    });
    //登录
    $(".btnLogin").click(function () {
        $('#frmLogin').submit();
    })
    //读取用户名
    var _USERNAME = $.cookie('_USERNAME');
    if (_USERNAME != undefined && _USERNAME != null && _USERNAME != '') {
        $("input[name=LoginName]", "#frmLogin").val(_USERNAME);
        $("#chkRemberme").attr("checked", true);
    }
    else {
        $("input[name=LoginName]", "#frmLogin").val("");
    }
})