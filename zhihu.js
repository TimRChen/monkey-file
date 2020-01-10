// ==UserScript==
// @name         超简zhihu
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.zhihu.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const hidden = {
        display: 'none'
    }

    const topNavBar = document.querySelector('[data-za-module="TopNavBar"]');
    Object.assign(topNavBar.style, hidden)

    function loopNode(fn, nodes) {
        Array.prototype.forEach.call(nodes, fn);
    }

    const favicon = document.querySelector('[type="image/x-icon"]');
    Object.assign(favicon.style, hidden)
    favicon.setAttribute('href', 'http://img1.imgtn.bdimg.com/it/u=3742089222,2249154965&fm=26&gp=0.jpg');


    function hiddenAllMedia() {
        const imgs = document.querySelectorAll('img');
        const svgs = document.querySelectorAll('svg');
        const richContentCoverPics = document.querySelectorAll('.RichContent-cover');
        const btns = document.querySelectorAll('.Button');

        loopNode((img) => {
            Object.assign(img.style, hidden);
        }, imgs)

        loopNode((svg) => {
            Object.assign(svg.style, hidden);
        }, svgs)

        loopNode((img) => {
            Object.assign(img.style, hidden);
        }, richContentCoverPics)

        loopNode((btn) => {
            Object.assign(btn.style, hidden);
        }, btns)

    }


    function loopHanlder() {
        hiddenAllMedia();


        const titles = document.querySelectorAll('[data-za-detail-view-element_name="Title"]');

        loopNode((title) => {
            Object.assign(title.style, {
                fontSize: '14px'
            })
        }, titles)


    }

    setInterval(loopHanlder, 1000);


    // Your code here...
})();