$(function () {
    LoadPageData();
});
function LoadPageData() {
    PageLoad($("#form-search").serializeJson(), {
        Url: "/info/list",
        ID: "#tmpNotices",
        TargetID: "#ulNotices",
    }, function (res) {
        $("#divPager").empty();
        var tpl = $("#tmplPager").html();
        res.Request.Url = "/info/list/";
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