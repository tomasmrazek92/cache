"use strict";(()=>{function r(){var a=$(window).scrollTop();a>=100?($(".nav_wrapper").addClass("sticky"),setTimeout(()=>{$(".nav_wrapper").css("top",0)})):a===0&&($(".nav_wrapper").removeClass("sticky"),$(".nav_wrapper").attr("style",""))}$(window).scroll(r);r();})();
