// ==UserScript==
// @name         ruanyifeng.com 左侧悬浮目录
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  为ruanyifeng.com添加左侧悬浮目录
// @match        https://www.ruanyifeng.com/blog/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // 创建菜单容器
    const menu = document.createElement('div');
    menu.style.cssText = `
        position: fixed;
        left: 10px;
        top: 50px;
        width: 250px;
        max-height: 80vh;
        overflow-y: auto;
        background-color: #f8f8f8;
        border: 1px solid #ddd;
        padding: 10px;
        font-size: 14px;
        z-index: 9999;
    `;

    // 获取主内容区域
    const mainContent = document.querySelector('div.asset-content.entry-content#main-content');
    if (!mainContent) return;

    // 查找所有h2标签
    const h2Tags = mainContent.querySelectorAll('h2');

    // 生成菜单项
    h2Tags.forEach((h2, index) => {
        // 为h2添加锚点
        const h2Text = h2.textContent.trim();
        const h2Id = `h2-${index}`;
        h2.id = h2Id;
        h2.innerHTML = `<a href="#${h2Id}">${h2Text}</a>`;

        // 创建菜单项
        const menuItem = document.createElement('div');
        menuItem.innerHTML = `<a href="#${h2Id}">${h2Text}</a>`;
        menu.appendChild(menuItem);

        // 查找子菜单项
        let nextElement = h2.nextElementSibling;
        while (nextElement && nextElement.tagName !== 'H2') {
            if (nextElement.tagName === 'P') {
                const match = nextElement.textContent.match(/^\d+、/);
                if (match) {
                    const anchor = nextElement.querySelector('a');
                    if (anchor) {
                        const subItemText = anchor.textContent.trim();
                        const subItemId = `sub-${index}-${subItemText}`;
                        anchor.id = subItemId;
                        anchor.href = `#${subItemId}`;

                        const subMenuItem = document.createElement('div');
                        subMenuItem.style.marginLeft = '20px';
                        subMenuItem.innerHTML = `<a href="#${subItemId}">${subItemText}</a>`;
                        menu.appendChild(subMenuItem);
                    }
                }
            }
            nextElement = nextElement.nextElementSibling;
        }
    });

    // 将菜单添加到页面
    document.body.appendChild(menu);
})();
