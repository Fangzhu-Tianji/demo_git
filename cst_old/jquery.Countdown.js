; (function ($) {
	$.fn.Countdown = function (userOption) {
		var option = {
			format: "<span>day天</span><span>hours时</span><span>minutes分<span/><span>seconds秒<span/>",//自定义显示时间结构 注意可以加样式哦  注意：day hours等等是占位符
			startTime: "",//开始时间"2012/12/6 6:00:00",
			endTime: "",//结束时间"2012/12/6 6:00:00",
			seconds: "",//秒数  当这里有值的时候 忽略startTime  endTime
			endTimeHtml: "",//倒计时结束后显示结果  例如：小喇叭广播开始啦！
            isShowDay:true,
			cycleCallOfTime: { seconds: 0, isClearSetInterval: false, cycleCallOfFun: function () { } },//seconds 多少秒调用一次函数
			timerEndBlackFun: function () { }//回调函数
		}
		var options = $.extend({}, option, userOption || {});

		var nMS = new Date(options.endTime) - new Date(options.startTime);
		if (options.seconds > 0) {
			nMS = options.seconds * 1000;
		} else if (nMS > 0) {

		} else {
			options.timerEndBlackFun();
			return;
		}

		var cycleCallOfSeconds = options.cycleCallOfTime.seconds;//
		var cycleCallOfSecondsTemp = cycleCallOfSeconds;//记录多久调用一次方法

		var $this = $(this);
		var times = function () {
			nMS -= 1000;
			if (nMS <= 0) {
				clearInterval(_timeout);
				$this.html(options.endTimeHtml);
				options.timerEndBlackFun.call(this);
				return false;
			}

			//
			//if ($this.html() == options.endTimeHtml && options.endTimeHtml.length!=0) {
			//    clearInterval(_timeout);
			//    $this.html(options.endTimeHtml);
			//    options.timerEndBlackFun.call(this);
			//    return false;
			//}

			var nD = Math.floor(nMS / (1000 * 60 * 60 * 24));
			var nH = Math.floor(nMS / (1000 * 60 * 60)) % 24;
			var nM = Math.floor(nMS / (1000 * 60)) % 60;
			var nS = Math.floor(nMS / 1000) % 60;

			//if (options.isShowDay==false) {
			//    nH += nD * 24;
			//}
			var timesHtml = options.format;
			if (timesHtml.indexOf("day")>-1) {
			        timesHtml = timesHtml.replace("day", nD);
			    }
			    else {
			        nH += nD * 24;
			    }
			
			if (timesHtml.indexOf("hours")>-1) {
			        timesHtml = timesHtml.replace("hours", nH);
			    }
			    else {
			        nM += nH * 60;
			    }
			if (timesHtml.indexOf("minutes")>-1) {
			        timesHtml = timesHtml.replace("minutes", nM);
			    }
			    else {
			        nS += nM * 60;
			    }
		
			timesHtml = timesHtml.replace("seconds", nS);

			$this.html(timesHtml);

			cycleCallOfSeconds--;
			if (cycleCallOfSeconds == 0) {
				if (options.cycleCallOfTime.isClearSetInterval) {
					clearInterval(_timeout);
				}
				cycleCallOfSeconds = cycleCallOfSecondsTemp;
				options.cycleCallOfTime.cycleCallOfFun.call(this);
			}
		}
		var _timeout = setInterval(times, 1000);
	}
})(jQuery);