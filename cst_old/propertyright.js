//$(function () {
//    $(".trading-main-l").slide({
//        mainCell: ".tab-bd",
//        titCell: ".hd li",
//        delayTime: 0
//    });
//})


$(function () {
    LoadPageData();
    //近期热门
    Load(null, { Url: "/propertyright/RecentPopular?id=0", ID: "#tmpRecentPopular", TargetID: "#ulRecentPopular" });
});
function LoadPageData() {
    var args = mvcParamMatch($.extend($("#form-request").serializeJson(), { Args: $("#form-args").serializeJson() }));
    PageLoad(args, {
        Url: "/PropertyRight/list",
        ID: "#tmpCredit",
        TargetID: "#ulCredit",
    }, function (res) {
        $("#divPager").empty();
        var tpl = $("#tmplPager").html();
        res.Request.Url = "/PropertyRight/list/";
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
