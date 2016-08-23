$(function () {
    LoadPageData();
});
function LoadPageData() {
    var args = mvcParamMatch($.extend($("#form-request").serializeJson(), { Args: $("#form-args").serializeJson() }));
    PageLoad(args, {
        Url: "/financemanager/list",
        ID: "#tmpDataList",
        TargetID: "#ulDataList",
    }, function (res) {
        $("#divPager").empty();
        var tpl = $("#tmplPager").html();
        res.Request.Url = "/financemanager/list/";
        var html = juicer(tpl, res.Request);
        $(html).appendTo("#divPager");
        $("a", "#divPager").click(function (e) {
            if (e.stopPropagation) e.stopPropagation();
            else e.cancelBubble = true;
            $(":hidden[name=PageIndex]").val($(this).attr("data-val") || "1");
            LoadPageData();
            return false;
        });
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
            errorClass: 'validate-txt tl fz14 minh14',
            focusInvalid: false,
            ignore: "",
            messages: {
                Mobile: { required: "请输入手机号码。" },
                ImageCode: { required: "请输入图片验证码。" },
                Name: { required: "请输入姓名。" }
            },
            rules: {
                Mobile: {
                    required: true,
                   // isMobile: true
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