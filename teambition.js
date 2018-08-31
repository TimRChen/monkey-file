// ==UserScript==
// @name         Teambition自用脚本
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Fxck the team.
// @author       TimRChen
// @match        *://www.teambition.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 😆😆😆 使用该脚本需要手动传入下方两个变量
    var targetURL = 'https://www.xxxx.com'; // 目标打开的任务卡片页
    var dataId = 'xxxxxxx'; // data-id 填写你想定位的任务卡片栏的 data-id

    if (window.location.hostname === 'www.teambition.com' && window.location.href !== targetURL) {
        window.location.href = targetURL;
    } else {
		var scrollSuccess = false; // 滑动🔐 判断DOM是否已渲染完毕
		$(document).ready(function () {
			var scrollTimer = setInterval(function () {
				if (!scrollSuccess) {
                    var targetMissionColumns = `li.scrum-stage[data-id="${dataId}"]`;
					var workInProcess = document.querySelector(targetMissionColumns);
					if (!!workInProcess && typeof workInProcess.scrollIntoView === 'function') {
						workInProcess.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
						scrollSuccess = true;
					}
				} else if (scrollSuccess) {
					clearInterval(scrollTimer);
				}
			}, 1000);
		});
	}
})();