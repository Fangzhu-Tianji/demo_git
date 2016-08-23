$(function () {
    $("button", "#frmBidCredit").bind("click", BidCredit);
})

function BidCredit() {
    if (!$IsCanClick) return false;
    if (false == ChekLogin()) return false;
    window.PostData = $.extend($("#frmBidCredit").serializeJson());
    if (window.PostData.Amount == "" || isNaN(window.PostData.Amount) || parseFloat(window.PostData.Amount) <= 0) {
        $.errorAlert("请输入预约金额");
        return false;
    }
   
    if (parseFloat(window.PostData.Amount) < parseFloat(window.PostData.MinBidAmount)) {
        $.errorAlert("最低起投金额为" + parseFloat(window.PostData.MinBidAmount)+"万元");
        return false;
    }
    formSubmit();
    return false;
}
function formSubmit() {
    $.post("/fund/fundcredit", $("#frmBidCredit").serializeJson(), function (res) {
        if (res.IsSuccess) {
            $.successAlert("您的申请已提交成功，我们会尽快与您联系。", function () { window.location.reload(); });
        }
        else { $.errorAlert(res.Msg); }
    })
}

