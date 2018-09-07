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

	var $ = document.querySelector.bind(document);
	$('body').style.background = 'rgba(8, 8, 8, 0.05)';
	$('.Header').style.backgroundColor = 'darkcyan';

	var topBtn = document.createElement('div');
	$('body').appendChild(topBtn);
	topBtn.innerHTML = 'TOP';
	topBtn.className = 'top-btn-timrchen';

	var btnStyle = {
		opacity: '0',
		width: '65px',
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
		topBtn.style.backgroundColor = '#09a9a9';
	});

	topBtn.addEventListener('mouseup', function () {
		topBtn.style.backgroundColor = 'darkcyan';
	});

	$('body').addEventListener('mouseup', function () {
		window.getSelection().removeAllRanges(); // 鼠标抬起自动清除选中
	});

	window.onscroll = function (e) {
		var innerHeight = window.innerHeight;
		var pageOffsetTop = window.scrollY;
		if (pageOffsetTop >= innerHeight) {
			topBtn.style.opacity = '1';
			topBtn.style.backgroundColor = 'darkcyan';
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
				topBtn.style.color = 'darkcyan';
			} else {
				clearInterval(detectTimer);
			}
		}, 1000);
	}

})();