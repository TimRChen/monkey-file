// ==UserScript==
// @name         Teambition自用脚本
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fxck the team.
// @author       TimRChen
// @match        *://www.teambition.com/*
// @grant        none
// ==/UserScript==

{
    const targetURL = 'https://www.teambition.com/project/xxx'; // 目标打开的任务卡看板页URL
    const columnTitleNode = 'span.title-name__2BuR';
    const columnTitle = 'xxx';

    if (window.location.hostname === 'www.teambition.com' && window.location.href !== targetURL) {
        window.location.href = targetURL;
    } else {
		let scrollSuccess = false; // 滑动🔐 判断DOM是否已渲染完毕
		let scrollTimer = setInterval(function () {
			if (!scrollSuccess) {
				document.querySelectorAll(columnTitleNode).forEach(item => {
					if (item.innerText === columnTitle) {
						const workInProcess = item;
						if (!!workInProcess && typeof workInProcess.scrollIntoView === 'function') {
							workInProcess.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
							scrollSuccess = true;
						}
					}
				})
			} else if (scrollSuccess) {
				clearInterval(scrollTimer);
			}
		}, 1000);
	}
}