$(function () {
    window.OrderBy = "Default";
    LoadPageData();
    $(".CreditStatus li").click(function () {Search("CreditStatus",this);});
    $(".YearRate li").click(function () { Search("YearRate", this); });
    $(".Deadline li").click(function () { Search("Deadline", this); });
    $(".BidAmount li").click(function () { Search("BidAmount", this); });
    $(".OrderBy a").click(function () {
        var $this = $(this);  
        if ($this.attr("data-val")==window.OrderBy) { //当前已选中，升降切换
            if ($this.find("i").is(".icon-up")) { //当前是升，则降
                $this.find("i").removeClass("icon-up").addClass("icon-down")
                $(":hidden[name=IsASC]").val("false");
            }
            else {//当前是降，则升
                $this.find("i").removeClass("icon-down").addClass("icon-up")
                $(":hidden[name=IsASC]").val("true");
            }
            window.OrderBy = $this.attr("data-val");
            $(":hidden[name=OrderBy]").val($this.attr("data-val"));
        }
        else { //未选中
            InitOrderBy($this.attr("data-val"));
            $(".OrderBy .active").removeClass("active");
            $this.addClass("active")
            window.OrderBy = $this.attr("data-val");
            $(":hidden[name=OrderBy]").val($this.attr("data-val"));
            $(":hidden[name=IsASC]").val("true");
        }
        if ($this.attr("data-val") == "Default") $(":hidden[name=IsASC]").val("true");
        $(":hidden[name=PageIndex]").val("1");
        LoadPageData();
    });
});
function InitOrderBy(val) {
    $(".OrderBy i").removeClass("icon-down").removeClass("icon-up");
    if (val == "Progress") $(".OrderBy a[data-val=Progress] i").removeClass("icon-up").addClass("icon-down");
    else $(".OrderBy a[data-val="+val+"] i").removeClass("icon-down").addClass("icon-up");
                 $(":hidden[name=OrderBy]").val("Default");
                $(":hidden[name=IsASC]").val("true");
}

function Search(className,obj) {
    $("."+className+" .active").removeClass("active");
    $(obj).addClass("active");
    $(":hidden[name="+className+"]").val($(obj).attr("data-val"));
    $(":hidden[name=PageIndex]").val("1");
    LoadPageData();
}
function LoadPageData() {
    var args = mvcParamMatch($.extend($("#form-request").serializeJson(), { Args: $("#form-args").serializeJson() }));
    PageLoad(args, {
        Url: "/invest/list",
        ID: "#tmpCredit",
        TargetID: "#ulCredit",
    }, function (res) {
        $("#divPager").empty();
        var tpl = $("#tmplPager").html();
        res.Request.Url = "/invest/list/";
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