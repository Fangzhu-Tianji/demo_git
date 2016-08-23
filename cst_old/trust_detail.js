$(function () {
        $("embed").css({ width: '542' });
    $("#jquery_jplayer_1").jPlayer({
        ready: function () {
            $(this).jPlayer("setMedia", {
                //title: "Big Buck Bunny",
                m4v: "http://www.jplayer.org/video/m4v/Big_Buck_Bunny_Trailer.m4v",
                ogv: "http://www.jplayer.org/video/ogv/Big_Buck_Bunny_Trailer.ogv",
                webmv: "http://www.jplayer.org/video/webm/Big_Buck_Bunny_Trailer.webm",
                poster: "video-cover.png"/*tpa=http://cst58.com/mat/default/images/video-cover.png*/ //封面图片
            });
        },
        swfPath: "../../dist/jplayer",
        supplied: "webmv, ogv, m4v",
        size: {
            width: "542px",
            height: "336px",
            cssClass: "jp-video-360p"
        },
        useStateClassSkin: true,
        autoBlur: false,
        smoothPlayBar: true,
        keyEnabled: true,
        remainingDuration: false,
        toggleDuration: true
    });
    window._bd_share_config = {
        common: {
            bdText: '',
            bdMini: '2',
            bdMiniList: false,
            bdPic: ''
        },
        "share": {}
    };
    with (document) 0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
});
function LoadBidRecord() {
    var args = $("#form-request").serializeJson();
    PageLoad(args, {
        Url: "/trust/BespokeCreditRecord",
        ID: "#tmpBidRecord",
        TargetID: "#tbBidRecord",
    }, function (res) {
        $("#divPager").empty();
        var tpl = $("#tmplPager").html();
        res.Request.Url = "/trust/BespokeCreditRecord/";
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