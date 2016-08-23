$(function () {
    LoadPageData();

    $(".help-classify a").click(function () {
        var $this = $(this);
        var typeID = $this.attr("data-val");
        $(":hidden[name=ID]").val(typeID);

        $(".help-classify .selected").removeClass("selected");
        $this.addClass("selected")

        LoadPageData();
    });
});
function LoadPageData() {
    var args = mvcParamMatch($.extend($("#form-search").serializeJson(), { ID: $(":hidden[name=ID]").val() }));
    PageLoad(args, {
        Url: "/help/list",
        ID: "#tmpDataList",
        TargetID: "#ulDataList",
    }, function (res) {
        $("#divPager").empty();
        var tpl = $("#tmplPager").html();
        res.Request.Url = "/help/list/";
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