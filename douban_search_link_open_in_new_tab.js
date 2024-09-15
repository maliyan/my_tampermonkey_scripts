// ==UserScript==
// @name         豆瓣搜索结果新窗口打开
// @namespace    http://tampermonkey.net/
// @version      2024-09-15
// @description  为豆瓣搜索结果的链接添加新窗口打开功能
// @author       You
// @match        https://search.douban.com/book/subject_search?search_text=*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=douban.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // 函数：为指定元素下的所有a标签添加target="_blank"属性
    function addTargetBlankToLinks(element) {
        const links = element.querySelectorAll('a[href^="https://book.douban.com/subject/"]');
        links.forEach(link => {
            link.setAttribute('target', '_blank');
        });
    }

    // 函数：查找并处理所有匹配的div
    function processMatchingDivs() {
        const matchingDivs = document.querySelectorAll('div.sc-bZQynM.sc-bxivhb');
        matchingDivs.forEach(addTargetBlankToLinks);
    }

    // 初始执行
    processMatchingDivs();

    // 创建一个MutationObserver来监视DOM变化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                processMatchingDivs();
            }
        });
    });

    // 配置观察选项
    const config = { childList: true, subtree: true };

    // 开始观察文档体的变化
    observer.observe(document.body, config);
})();
