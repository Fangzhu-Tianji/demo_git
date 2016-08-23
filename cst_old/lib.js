
function ToDate(d, formatstring) {
    if (!d) return '';
    if (d.indexOf("/Date") > -1) {
        var nS = d.replace(/\/(Date\(-?\d+\))\//, '$1');
        eval('var covDate = new ' + nS + ';');
        return covDate.format(formatstring);
    } else {
        var date = eval('new Date(' + d.replace(/\d+(?=-[^-]+$)/,
        function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
        return date.format(formatstring);
    }
};
function ToString(num, cent, isThousand) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))//检查传入数值为数值类型. 
        num = "0";
    if (isNaN(cent))//确保传入小数位为数值型数值. 
        cent = 0;
    cent = parseInt(cent);
    cent = Math.abs(cent);//求出小数位数,确保为正整数. 
    if (isNaN(isThousand))//确保传入是否需要千分位为数值类型. 
        isThousand = 0;
    isThousand = parseInt(isThousand);
    if (isThousand < 0)
        isThousand = 0;
    if (isThousand >= 1) //确保传入的数值只为0或1 
        isThousand = 1;
    sign = (num == (num = Math.abs(num)));//获取符号(正/负数) 
    //Math.floor:返回小于等于其数值参数的最大整数 
    num = Math.floor(num * Math.pow(10, cent) + 0.50000000001);//把指定的小数位先转换成整数.多余的小数位四舍五入. 
    cents = num % Math.pow(10, cent); //求出小数位数值. 
    num = Math.floor(num / Math.pow(10, cent)).toString();//求出整数位数值. 
    cents = cents.toString();//把小数位转换成字符串,以便求小数位长度. 
    while (cents.length < cent) {//补足小数位到指定的位数. 
        cents = "0" + cents;
    }
    if (isThousand == 0) //不需要千分位符. 
        return (((sign) ? '' : '-') + num + '.' + cents);
    //对整数部分进行千分位格式化. 
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3) ; i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' +
        num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + num + '.' + cents);
}
//分页加载数据
function PageLoad(args, template, callback) {
    $.apiPost({
        Url: template.Url, Data: args, CallBack: function (res) {
            if (res.IsSuccess) {
                if (typeof (res) == "string") {
                    res = eval('(' + res + ')');
                }
                if (res.Request.PageIndex > res.Request.PageCount) {
                    return;
                }
                if (res.Request.RecordCount >= 0) {
                    $(template.TargetID).empty();
                    var tpl = $(template.ID).html();
                    var html = juicer(tpl, res);
                    $(html).appendTo(template.TargetID);
                    if (callback) {
                        callback(res);
                    }
                }

            }

        }
    });
}
function Load(args, template, callback) {
    $.apiGet({
        Url: template.Url, Data: args, CallBack: function (res) {
                $(template.TargetID).empty();
                var tpl = $(template.ID).html();
                var html = juicer(tpl, res);
                $(html).appendTo(template.TargetID);
                if (callback) {
                    callback(res);
            }
        }
    });
}

//公共加载初始化
$(function () {
    juicer.register('ToDate', ToDate);//注册时间格式化函数
    juicer.register('ToString', ToString);//注册时间格式化函数
    $(".Int").numeral();
    $(".Decimal").numeralpoint();
    $(".Wdate").click(function () {
        var option = { minDate: '1960-1-1', dateFmt: "yyyy-MM-dd", maxDate: "" };
        if (($(this).attr("max-date") || "") > "") {
            option.maxDate = $(this).attr("max-date");
        }
        return new WdatePicker(option);
    });
    // $.ligerDefaults.Dialog.width = 350;
    $(".AddFavorite").click(function () {
        try {
            window.external.AddFavorite('http://www.ruithailand.com/', '深圳市e金所金融服务有限公司');
        }
        catch (e) {
            try {
                window.sidebar.addPanel('深圳市e金所金融服务有限公司', 'http://www.ruithailand.com/');
            }
            catch (ex) {
                $.jBox.tip("您浏览器禁不支持这个功能，请按 Ctrl+D 加入收藏夹。", "info");
            }
        }
    })
});
/*
 * @author Wilson
 * @CreateDate 2014/5/24
 * @Description 对$.Ajax进行封装,统一数据验证
 */
$.extend({
    //统一用POST方式调用API
    apiPost: function (options) {
        try {
            $.ajax({
                type: "POST", url: options.Url, cache: false, dataType: "json", data: options.Data, async: (options.Async == undefined ? true : options.Async),
                success: function (response) {
                    options.CallBack(response);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) { },
                complete: function (xhr, ts) { },
                beforeSend: function (xhr) { },
            });
        }
        catch (e) { $.errorAlert("调用目标错误") }//异常提醒
    },
    // 统一用GET方式调用API
    apiGet: function (options) {
        try {
            $.ajax({
                type: "GET", url: options.Url, cache: false, dataType: "json", data: options.Data, async: (options.Async == undefined ? true : options.Async),
                success: function (result) { options.CallBack(result); },
                error: function (XMLHttpRequest, textStatus, errorThrown) { },
                complete: function (xhr, ts) { },
                beforeSend: function (xhr) { },
            });
        }
        catch (e) { $.errorAlert("调用目标错误") }//异常提醒
    },
    //提示消息框
    successAlert: function (msg,callback) {
        $.ligerDialog.success(msg, '温馨提示', callback);
    },
    errorAlert: function (msg) {
        var box = $.ligerDialog.error(msg, '温馨提示');
      
    },
     confirm: function (msg, CallBack) {
            $.ligerDialog.confirm(msg, '温馨提示', function (yes) {
                if (yes && CallBack) {
                    CallBack();
                }
                else return false;
            });
        },
    tip: function (callback) {
        $.apiGet({
            Url: "/home/tip", CallBack: function (res) {
                if (res) {
                    var options = { closeViaDimmer: false, dimmer: true};
                    callback(res,options);
                }
            }
        });
    },
    castToCurrency: function (strAmount, n) {
        strAmount = this.castToAmount(strAmount);
        n = n > 0 && n <= 20 ? n : 2;
        strAmount = parseFloat((strAmount + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = strAmount.split(".")[0].split("").reverse(),
         r = strAmount.split(".")[1];
        t = "";
        for (i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        return t.split("").reverse().join("") + "." + r;
    },
    castToAmount: function (strAmount) {
        strAmount = strAmount + "";
        return parseFloat(strAmount.replace(/[^\d\.-]/g, "")).toFixed(2);
    }

});

/*
 * @author Wilson
 * @CreateDate 2014/5/24
 * @Description 表单序列化成JSON
 */
(function ($) {
  
    //用于 jquery1.8.3,兼容 die,和 live 方法
    $.fn.extend({
        die: function (type, fn) {
            $(document).undelegate(this.selector, type, fn);
        },
        live: function (type, fn) {
            $(document).delegate(this.selector, type, null, fn);
        }
    });


    //表单序列化
    $.fn.serializeJson = function () {
        var serializeObj = {};
        $(this.serializeArray()).each(function () {
            serializeObj[this.name] = this.value;
        });
        return serializeObj;
    };
    //判断一个字符串是否以某个字符结尾
    $.fn.endWith = function (str) {
        if (null == str || str == "" || this.length == 0 || str.length > this.length)
            return false;

        if (this.substring(this.length - str.length) == str)
            return true;
        else
            return false;
    };
    /**
    *str:子字符串
    *默认区分大小写
    **/
    $.fn.contains = function (str) {
        this.contains(str, false);
    }
    /**
    *str:子字符串
    *isIgnoreCase:忽略大小写
    **/
    $.fn.contains = function (str, isIgnoreCase) {
        var sourceStr = this;
        if (isIgnoreCase) {
            sourceStr = sourceStr.toLowerCase();
            str = str.toLowerCase();
        }
        var startChar = str.substring(0, 1);
        var strLen = str.length;
        for (var j = 0; j < sourceStr.length - strLen + 1; j++) {
            if (sourceStr.charAt(j) == startChar) //如果匹配起始字符,开始查找
            {
                if (sourceStr.substring(j, j + strLen) == str) //如果从j开始的字符与str匹配，那ok
                {
                    return true;
                }
            }
        }
        return false;
    };
    /**
    *判别字符串是否为空串String.prototype.
    **/
    $.fn.isNullOrEmpty = function () {
        if (this) {
            return this == "" || this.length < 1;
        }
        return true;
    };
    //忽略大小写比较字符串
    $.fn.equalsIgnoreCase = function (str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        var sourceStr = this.toLowerCase();
        str = str.toLowerCase();

        return sourceStr == str;
    };
    //判断某个字符串是否
    $.fn.startWith = function (str) {
        if (str == null || str == "" || this.length == 0 || str.length > this.length)
            return false;
        if (this.substr(0, str.length).toLocaleLowerCase() == str.toLocaleLowerCase())
            return true;
        else
            return false;
        return true;
    };
    //文本框只能输入数字，并屏蔽输入法和粘贴  
    $.fn.numeral = function () {
        $(this).css("ime-mode", "disabled");
        this.bind("keypress", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE      
            if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下不能使用退格键     
            {
                return;
            }
            return code >= 48 && code <= 57;
        });
        this.bind("blur", function () {
            if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
                this.value = this.value.substr(0, this.value.length - 1);
            } else if (isNaN($.castToAmount(this.value))) {
                this.value = "";
            }
        });
        this.bind("paste", function () {
            var s = clipboardData.getData('text');
            if (!/\D/.test(s));
            value = s.replace(/^0*/, '');
            return false;
        });
        this.bind("dragenter", function () {
            return false;
        });
        this.bind("keyup", function () {
            if (/(^0+)/.test(this.value)) {
                this.value = this.value.replace(/^0*/, '');
            }
        });
    };
    //文本框只能输入数字和小数点，并屏蔽输入法和粘贴  
    $.fn.numeralpoint = function () {
        $(this).css("ime-mode", "disabled");
        this.bind("keypress", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE   
            if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下 不能使用退格键  
            {
                return;
            }
            return code >= 48 && code <= 57 || code == 46;
        });
        this.bind("blur", function () {
            if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
                this.value = this.value.substr(0, this.value.length - 1);
            } else if (isNaN($.castToAmount(this.value))) {
                this.value = " ";
            }
        });
        this.bind("paste", function () {
            var s = clipboardData.getData('text');
            if (!/\D/.test(s));
            value = s.replace(/^0*/, '');
            return false;
        });
        this.bind("dragenter", function () {
            return false;
        });
        this.bind("keyup", function () {
            this.value = this.value.replace(/[^\d.]/g, "");
            //必须保证第一个为数字而不是.
            this.value = this.value.replace(/^\./g, "");
            //保证只有出现一个.而没有多个.
            this.value = this.value.replace(/\.{2,}/g, ".");
            //保证.只出现一次，而不能出现两次以上
            this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
        });
    };
    //文本框屏蔽输入空格
    $.fn.beehuntspace = function () {
        $(this).css("ime-mode", "disabled");
        this.bind("keypress", function (e) {
            var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE   
            if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下 不能使用退格键  
                return;
            return code > 32 || code < 32;
        });
        this.bind("blur", function () {
            if (/\ +/g.test(this.value))
                this.value = this.value.replace(/\ +/g, "");
        });
        this.bind("paste", function () {
            var s = clipboardData.getData('text');
            if (!/\ +/g.test(s));
            value = s.replace(/\ +/g, '');
            return false;
        });
        this.bind("dragenter", function () {
            return false;
        });
        this.bind("keyup", function () {
            if (/\ +/g.test(this.value))
                this.value = this.value.replace(/\ +/g, "");
        });
    };
})(jQuery);

//兼容往后版本jquery
$.browser = $.support;
$.browser.msie = /msie/.test(navigator.userAgent.toLowerCase());

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
        RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};


function StringBuffer() {
    this._strings_ = new Array();
}
StringBuffer.prototype.append = function (str) { this._strings_.push(str); };
StringBuffer.prototype.toString = function (spliter) {
    if (typeof (spliter) == "undefined")
        spliter = "";
    return this._strings_.join(spliter);
};

var mvcParamMatch = (function () {
    var MvcParameterAdaptive = {};
    //验证是否为数组  
    MvcParameterAdaptive.isArray = Function.isArray || function (o) {
        return typeof o === "object" &&
                Object.prototype.toString.call(o) === "[object Array]";
    };

    //将数组转换为对象  
    MvcParameterAdaptive.convertArrayToObject = function (/*数组名*/arrName, /*待转换的数组*/array, /*转换后存放的对象，不用输入*/saveOjb) {
        var obj = saveOjb || {};

        function func(name, arr) {
            for (var i in arr) {
                if (!MvcParameterAdaptive.isArray(arr[i]) && typeof arr[i] === "object") {
                    for (var j in arr[i]) {
                        if (MvcParameterAdaptive.isArray(arr[i][j])) {
                            func(name + "[" + i + "]." + j, arr[i][j]);
                        } else if (typeof arr[i][j] === "object") {
                            MvcParameterAdaptive.convertObject(name + "[" + i + "]." + j + ".", arr[i][j], obj);
                        } else {
                            obj[name + "[" + i + "]." + j] = arr[i][j];
                        }
                    }
                } else {
                    obj[name + "[" + i + "]"] = arr[i];
                }
            }
        }

        func(arrName, array);

        return obj;
    };

    //转换对象  
    MvcParameterAdaptive.convertObject = function (/*对象名*/objName,/*待转换的对象*/turnObj, /*转换后存放的对象，不用输入*/saveOjb) {
        var obj = saveOjb || {};

        function func(name, tobj) {
            for (var i in tobj) {
                if (MvcParameterAdaptive.isArray(tobj[i])) {
                    MvcParameterAdaptive.convertArrayToObject(i, tobj[i], obj);
                } else if (typeof tobj[i] === "object") {
                    func(name + i + ".", tobj[i]);
                } else {
                    obj[name + i] = tobj[i];
                }
            }
        }

        func(objName, turnObj);
        return obj;
    };

    return function (json, arrName) {
        arrName = arrName || "";
        if (typeof json !== "object") throw new Error("请传入json对象");
        if (MvcParameterAdaptive.isArray(json) && !arrName) throw new Error("请指定数组名，对应Action中数组参数名称！");

        if (MvcParameterAdaptive.isArray(json)) {
            return MvcParameterAdaptive.convertArrayToObject(arrName, json);
        }
        return MvcParameterAdaptive.convertObject("", json);
    };
})();