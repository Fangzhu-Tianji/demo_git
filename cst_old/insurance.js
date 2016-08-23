$(function () {
    LoadPageData();
});

function LoadPageData() {
    var args = mvcParamMatch($.extend($("#form-request").serializeJson(), { Args: $("#form-args").serializeJson() }));
    PageLoad(args, {
        Url: "/insurance/list",
        ID: "#tmpCredit",
        TargetID: "#ulCredit",
    }, function (res) {
        $("#divPager").empty();
        var tpl = $("#tmplPager").html();
        res.Request.Url = "/fund/list/";
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

function introduceCompany() {
    var _USERNAME = $.cookie('_FundNoShow');
    if (_USERNAME != undefined && _USERNAME != null && _USERNAME != '') {
        return false;
    }
    $.ligerDialog.open({
        target: $("#introduce-company"),
        id: 'aa',
        title: '<div class="fix alert-default-tit"><img src=' + mat + "/default/images\/alert-logo.png" + ' height="55" width="310"><div class="r">合格投资者认定<\/div><\/div>',
        width: 1000,
        modal: true,
        allowClose: false //是否允许关闭弹框
    });
}

