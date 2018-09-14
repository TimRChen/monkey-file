// ==UserScript==
// @name         github自用主题
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://*.github.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

	var welcome = setTimeout(() => {
		showToast('欢迎使用由TimRChen开发的github脚本工具，开心每一天.', '30%');
		clearTimeout(welcome);
	}, 1000);

	var $ = document.querySelector.bind(document);
	var $All = document.querySelectorAll.bind(document);
	$('.Header').style.backgroundColor = 'black';

	var topBtn = document.createElement('div');
	$('body').appendChild(topBtn);
	topBtn.innerHTML = '△';
	topBtn.className = 'top-btn-timrchen';

	var btnStyle = {
		opacity: '0',
		width: '45px',
		color: '#fff',
		height: '35px',
		fontSize: '22px',
		transition: 'all .5s ease-in-out',
		backgroundColor: 'darkcyan',
		borderRadius: '4px',
		lineHeight: '35px',
		textAlign: 'center',
		position: 'fixed',
		cursor: 'pointer',
		bottom: '50px',
		right: '30px'
	};
	Object.assign(topBtn.style, btnStyle);

	topBtn.onclick = function (event) {
		event.preventDefault();
		var scrollDuration = 2000;
        var scrollHeight = window.scrollY,
              scrollStep = Math.PI / ( scrollDuration / 15 ),
              cosParameter = scrollHeight / 2;
        var scrollCount = 0,
            scrollMargin,
            scrollInterval = setInterval(function () {
              if ( window.scrollY != 0 ) {
                scrollCount = scrollCount + 1;
                scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
              } else {
                clearInterval(scrollInterval);
              }
            }, 1);
	};

	topBtn.onselectstart = function () {
		return false;
	};

	topBtn.addEventListener('mousedown', function () {
		topBtn.style.backgroundColor = 'darkred';
	});

	topBtn.addEventListener('mouseup', function () {
		topBtn.style.backgroundColor = 'black';
	});

	// 监听滚动事件，返回顶部按钮显隐
	window.onscroll = function (e) {
		var innerHeight = window.innerHeight;
		var pageOffsetTop = window.scrollY;
		if (pageOffsetTop >= innerHeight) {
			topBtn.style.opacity = '1';
			topBtn.style.backgroundColor = 'black';
			topBtn.style.color = '#fff';
		} else {
			topBtn.style.opacity = '0';
		}
		detectScrollChange();
	};

	function detectScrollChange () {
		var pageOffsetTop = window.scrollY;
		var detectTimer = setInterval(function () {
			if (pageOffsetTop === window.scrollY) {
				topBtn.style.backgroundColor = 'transparent';
				topBtn.style.color = 'black';
			} else {
				clearInterval(detectTimer);
			}
		}, 1000);
	}


	// copy按钮生成器
	var makeCopyBtn = function () {
		var randomStr = parseInt(Math.random() * 100) + 'timrchen' + parseInt(Math.random() * 1000);
		var copyBtn = document.createElement('div');
		copyBtn.innerHTML = 'copy';
		copyBtn.className = `copy-btn-by-${randomStr}`;

		var copyBtnStyle = {
			color: '#fff',
			width: '35px',
			height: '20px',
			fontSize: '12px',
			lineHeight: '20px',
			textAlign: 'center',
			backgroundColor: '#000',
			position: 'absolute',
			borderRadius: '2px',
			cursor: 'pointer',
			margin: '15px',
			right: '0',
			top: '0'
		};
		Object.assign(copyBtn.style, copyBtnStyle);
		return copyBtn;
	};

	// 生成copy按钮，并注册点击事件
	let copyStr = '';
	var preList = $All('pre');
	preList.forEach(pre => {
		var copyBtn = makeCopyBtn();
		pre.appendChild(copyBtn);
		pre.style.position = 'relative';

		copyBtn.onclick = function (e) {
			e.preventDefault();
			copyStr = '';
			pre.childNodes.forEach(node => {
				if (node.nodeType === 1) {
					copyStr += node.innerText;
				} else if (node.nodeType === 3) {
					copyStr += `${node.textContent}`;
				}
			});
			copyStr = copyStr.slice(0, copyStr.length - 4);
			fakeSelect(copyBtn, copyStr);
		};
	});

	/**
	 * 模拟选中
	 * @argument container - 包裹元素
	 * @argument str - 待复制字符串
	 */
	var fakeSelect = function (container, str) {
		var isRTL = document.documentElement.getAttribute('dir') == 'rtl';
		var fakeElem = document.createElement('textarea');
		var offset = isRTL ? 'right' : 'left';
		var fakeStyle = {
			fontSize: '12px',
			padding: '0',
			border: '0',
			margin: '0',
			opacity: '0',
			offset: '-9999px',
			position: 'absolute',
			top: `${window.pageYOffset}px`
		};
		container.appendChild(fakeElem);

		var isReadOnly = fakeElem.hasAttribute('readonly');
        if (!isReadOnly) {
            fakeElem.setAttribute('readonly', '');
        }

		fakeElem.innerHTML = str;

		fakeElem.select();
		fakeElem.setSelectionRange(0, fakeElem.value.length);

        if (!isReadOnly) {
            fakeElem.removeAttribute('readonly');
		}
		copyText(container, fakeElem);
	};

	/**
	 * 复制文本
	 * @argument parentNode - 父节点
	 * @argument childNode - 子节点
	 */
	var copyText = function (parentNode, childNode) {
        try {
			document.execCommand('copy', false, null);
			parentNode.removeChild(childNode);
			showToast('复制成功', '100px');
        } catch (err) {
            console.error(err);
        }
	};
	
	/**
	 * toast 函数
	 * @argument msg - toast内容
	 */
	var showToast = function (msg, width) {
		console.log(msg);
		var toast = document.createElement('div');
		toast.className = 'toast-show-by-timrchen';
		var toastStyle = {
			width,
			height: '30px',
			borderRadius: '4px',
			color: 'rgb(0, 238, 0)',
			backgroundColor: 'rgba(0, 0, 0, 1)',
			textAlign: 'center',
			lineHeight: '30px',
			position: 'fixed',
			margin: 'auto',
			bottom: '0',
			right: '0',
			left: '0',
			top: '0'
		};
		Object.assign(toast.style, toastStyle);
		toast.innerHTML = msg;
		$('body').appendChild(toast);
		var destroyTimer = setTimeout(function () {
			toast.style.display = 'none';
			clearTimeout(destroyTimer);
		}, 1000);
	};


})();