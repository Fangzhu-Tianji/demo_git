$(function () {
    LoadPageData();

});
function LoadPageData() {
    var args = mvcParamMatch($.extend($("#form-request").serializeJson(), { Args: $("#form-args").serializeJson() }));
    PageLoad(args, {
        Url: "/assets/list",
        ID: "#tmpCredit",
        TargetID: "#ulCredit",
    }, function (res) {
        $("#divPager").empty();
        var tpl = $("#tmplPager").html();
        res.Request.Url = "/assets/list/";
       
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