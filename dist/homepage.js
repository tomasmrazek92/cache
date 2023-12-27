"use strict";(()=>{var d,L,C,O=()=>d||typeof window!="undefined"&&(d=window.gsap)&&d.registerPlugin&&d,D=e=>{d=O(),C=d&&d.parseEase("_CE"),C?(L=1,d.parseEase("bounce").config=t=>typeof t=="object"?P("",t):P("bounce("+t+")",{strength:+t})):e&&console.warn("Please gsap.registerPlugin(CustomEase, CustomBounce)")},z=e=>{let t=e.length,a=1/e[t-2],n=1e3,i;for(i=2;i<t;i+=2)e[i]=~~(e[i]*a*n)/n;e[t-2]=1},F=1,P=(e,t)=>{if(L||D(1),t=t||{},F){let a=.999,n=Math.min(a,t.strength||.7),i=n,o=(t.squash||0)/100,h=o,x=1/.03,k=.2,A=1,s=.1,c=[0,0,.07,0,.1,1,.1,1],g=[0,0,0,0,.1,0,.1,0],q,S,r,w,l,m,b;for(l=0;l<200&&(k*=i*((i+1)/2),A*=n*n,m=s+k,r=s+k*.49,w=1-A,q=s+A/x,S=r+(r-q)*.8,o&&(s+=o,q+=o,r+=o,S+=o,m+=o,b=o/h,g.push(s-o,0,s-o,b,s-o/2,b,s,b,s,0,s,0,s,b*-.6,s+(m-s)/6,0,m,0),c.push(s-o,1,s,1,s,1),o*=n*n),c.push(s,1,q,w,r,w,S,w,m,1,m,1),n*=.95,x=A/(m-S),s=m,!(w>a));l++);if(t.endAtStart&&t.endAtStart!=="false"){if(r=-.1,c.unshift(r,1,r,1,-.07,0),h)for(o=h*2.5,r-=o,c.unshift(r,1,r,1,r,1),g.splice(0,6),g.unshift(r,0,r,0,r,1,r+o/2,1,r+o,1,r+o,0,r+o,0,r+o,-.6,r+o+.033,0),l=0;l<g.length;l+=2)g[l]-=r;for(l=0;l<c.length;l+=2)c[l]-=r,c[l+1]=1-c[l+1]}return o&&(z(g),g[2]="C"+g[2],C(t.squashID||e+"-squash","M"+g.join(","))),z(c),c[2]="C"+c[2],C(e,"M"+c.join(","))}},f=class{constructor(t,a){this.ease=P(t,a)}static create(t,a){return P(t,a)}static register(t){d=t,D()}};O()&&d.registerPlugin(f);f.version="3.12.3";gsap.registerPlugin(CustomEase,f);var _=$(".hp-hero_visual"),J=$(".hp-hero_main-box"),y=$(".hp-hero_avatar"),p=$(".hp-hero_box"),K=[1,4,0,3,2],T=$($.map(K,e=>p[e])),B={keyframes:{"50%":{opacity:1}}},R=.7,j=.15,G=!1;f.create("boxBounce",{strength:.25,squash:10});f.create("mainBounce",{strength:.3,squash:.3});var Q=gsap.timeline({onComplete:()=>{X.add(re())}});Q.fromTo(T,{opacity:0,y:"-30em"},{...B,y:"0",stagger:j,ease:"boxBounce",duration:R}).add(function(){G||(gsap.fromTo(J,{opacity:0,rotate:8,y:"-30em"},{...B,y:"0",rotate:0,ease:"mainBounce",duration:1}),G=!0)},"<0.2").to(T,{yPercent:-50,rotate:8,duration:R,stagger:j,ease:"boxBounce-squash"},0).to(T.eq(4),{rotate:-46,yPercent:66},"-=0.1");var v=0,H=["AMZN dropped 55% in 2022","TSLA dropped 72% in 2022","NVDA dropped 65% in 2022"],E=["amzn","tsla","nvda"],I,U;function Y(e,t,a,n){let i=document.querySelector(t),o=a[e],h=document.createElement("div");h.textContent="$"+o,i.innerHTML="",i.appendChild(h),n==="pill"?I=new SplitType(h,{types:"chars"}):n==="label"&&(U=new SplitType(h,{types:"chars"}));let x=gsap.timeline();return x.fromTo($(I.chars),{display:"none"},{display:"inline",ease:"power2",stagger:.08}),x}function W(){let e=gsap.timeline();return e.fromTo(y,{opacity:0,scale:.5},{...B,scale:1,xPercent:-105,duration:.5}).to(y,{duration:.001,onStart:()=>y.css("z-index",1),onReverseComplete:()=>y.css("z-index",1),onComplete:()=>y.css("z-index",5)}).to(y,{xPercent:-50}),e}function N(){let e=gsap.timeline({onReverseComplete:te});return e.add(W()),e}function ee(e){let t=gsap.timeline();return t.to($(e.chars).toArray().reverse(),{display:"none",ease:"power2",stagger:.03}),t}function te(){let e=y.find(".image");e.hide(),console.log("Avatar:",v),e.eq(v).show()}function oe(e){let t=gsap.timeline();return t.add(()=>{E.forEach(n=>{_.removeClass(n)}),_.removeClass("moves");let a=E[e];_.addClass(a),_.addClass("moves")}),t}function V(){u.clear(),u.add(oe(v)),u.add(Y(v,"#hero-stocks",H,"pill")),u.add(Y(v,"#label-stock",E,"label"),"<"),u.addLabel("Avatar"),u.add(N(),"<"),v=(v+1)%H.length,u.add(ee(I),"+=1"),u.add(N().reverse(),"<")}var u=gsap.timeline({repeat:-1,onRepeat:V});V();function re(){let e=gsap.timeline(),t=gsap.getProperty(p.eq(0)[0],"x"),a=gsap.getProperty(p.eq(1)[0],"x");e.fromTo(p.eq(0).add(p.eq(1)),{x:o=>o===0?t:a,opacity:1},{x:"-15rem",keyframes:{"50%":{opacity:0}},stagger:.2,duration:.5});let n=gsap.getProperty(p.eq(3)[0],"x"),i=gsap.getProperty(p.eq(4)[0],"x");return e.fromTo(p.eq(3).add(p.eq(4)),{x:o=>o===0?n:i,opacity:1},{x:"15rem",keyframes:{"50%":{opacity:0}},stagger:.2,duration:.5},"<"),e.fromTo(p.eq(2),{y:gsap.getProperty(p.eq(2)[0],"Y"),opacity:1},{y:"10em",keyframes:{"50%":{opacity:0}},stagger:.2,duration:.5},"<"),e}var X=gsap.timeline({paused:!0});function ae(){let e=$(window).width()<991?15:1;window.scrollY===0?(u.timeScale(1).progress(1).play(),X.reverse()):window.scrollY>=e&&($("#hero-stocks").html(`<div>${$("#hero-stocks").text()}</div>`),u.timeScale(3).reverse(),X.play())}window.addEventListener("scroll",ae);var M=gsap.timeline({paused:!0});M.from($('svg [id^="Avatars"]').get().reverse(),{opacity:0,duration:1,stagger:{each:.05,onStart:function(){let e=this.targets()[0],t=$(e).find('[id^="Avatar"]');gsap.from(t,{scale:0,duration:.5,stagger:.05,transformOrigin:"center"})}}});function ne(e,t){e.forEach(a=>{a.isIntersecting?M.timeScale(2).reverse():M.timeScale(1).play()})}var se=new IntersectionObserver(ne,{threshold:.8});se.observe($(".hp-hero_wall-trigger")[0]);function Z(){let e=$(".section_hp-hero"),t=$(".hp-hero_visual-down"),a=e.outerHeight();t.css("margin-top","-"+a+"px")}Z();$(window).resize(Z);$(".hp-hero_wall-trigger").each(function(){function e(n){n.forEach(i=>{i.isIntersecting?$(".section_hp-hero").css("pointer-events","auto"):$(".section_hp-hero").css("pointer-events","none")})}let t=new IntersectionObserver(e),a=$(this)[0];a&&t.observe(a)});$(".hp-videos_button").on("click",function(){$(this).hide(),$(this).closest(".hp-videos").find("video")[0].play(),$(this).closest(".hp-videos").find("video").attr("controls","true")});})();
/*!
 * CustomBounce 3.12.3
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
