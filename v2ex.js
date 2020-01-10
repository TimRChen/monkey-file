// ==UserScript==
// @name         v2ex get fish.
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://v2ex.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const hidden = {
        display: 'none'
    }

    const logo = document.querySelector('#Logo');
    const ads = document.querySelector('.adsbygoogle');
    const avatars = document.querySelectorAll('.avatar');
    const h1s = document.querySelectorAll('h1');
    const detailAds = document.querySelector('.sidebar_units');

    Object.assign(logo.style, hidden);
    Object.assign(ads.style, hidden);
    Array.prototype.forEach.call(avatars, (avatar) => {
        Object.assign(avatar.style, hidden)
    })

    Array.prototype.forEach.call(h1s, (h1) => {
        Object.assign(h1.style, {
            fontSize: '16px'
        })
    })

    Object.assign(detailAds.style, hidden);

    // Your code here...
})();