/**
 * Created by zwj-pc on 2017/9/24.
 */
// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://blog.csdn.net/earthcto/article/details/42151643
// @grant        none
// @require    http://code.jquery.com/jquery-1.11.0.min.js
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $('table tr').each(function(){
        var lesson = $(this).find("td").eq(1).children('span').text();
        if(lesson == 'Java技术' || lesson == '有效共同技巧（MOOC）'){
            if($(this).children('td').eq(7).children('a').text() != ''){
                $(this).children('td').eq(7).children('a').trigger('click');

                console.log(window.frames[0].document.querySelectorAll('input[id=contentParent_dgData_ImageButton1_0]'));
                setTimeout(function(){
                    $(window.frames[0].document.querySelectorAll('input[id=contentParent_dgData_ImageButton1_0]')).click();
                    $('#contentParent_dgData_ImageButton1_0').click();

                    console.log('chose class now !');
                }, 2000);
            }
            else{
                location.reload();
            }
        }
    });
})();