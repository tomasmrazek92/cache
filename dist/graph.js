"use strict";(()=>{gsap.registerPlugin(ScrollTrigger,TextPlugin);function y(t){return t.toLocaleString("en")}var l=(t,a)=>{$(t).each(function(){let n=$(this).text().trim().replace(/,/g,""),r=parseFloat(n)||0,s=parseFloat(a);if(!isNaN(s)&&r!==s){let v={val:r},w=()=>{let E=y(Math.round(v.val));$(this).text(E)};gsap.fromTo(v,{val:r},{val:s,duration:1,onUpdate:w})}})};function p(t,a){return e.labels[t]+1}function C(t){let a=$('[data-drag="point"]').eq(t),n=$('[data-drag="timeline"]');if($('[data-drag="point"]').removeClass("active"),a.addClass("active"),a.length>0&&n.length>0){let r=a.offset().left,s=n.offset().left;return r-s}return console.warn("Active dragPoint or dragTimeline not found."),0}var d=t=>{let a;t===0?a=0:t===1?a=50:a=100,gsap.to(H,{width:`${a}%`,duration:.75}),gsap.to(k,{x:C(t),duration:.75})},V=$("[graph-section]"),g=$('[data-value="1"]'),u=$('[data-value="2"]'),c=$('[data-bar="wrap"]'),f=$("[data-bar=1-1]"),X=$("[data-bar=1-2]"),o=$("[data-bar=2-1]"),U=$("[data-bar=2-2]"),W=$('[data-gain="1"]'),b=$('[data-gain="text-2"]'),h=$('[data-gain="2"]'),L=$('[data-investment="1"]'),P=$('[data-investment="2"]'),z=$('[data-drag="timeline"]'),k=$('[data-drag="ball"]'),x=$('[data-drag="point"]'),H=$('[data-drag="fill"]'),T=$(".exchange__difference-cta-wrap"),i={value1:[3e5,3e5,584615],value2:[3e5,213125,415320],taxDrag:86875,gain1:284615,gain2:202195},_="#309157",A="#e95c20";gsap.defaults({ease:Power3.easeInOut,duration:1});gsap.set([f,o],{maxHeight:0});gsap.set(o,{background:A});gsap.set(T,{opacity:0});var q=()=>{let t=gsap.timeline({});return t.fromTo(c,{height:0},{height:"13.3em"}),t.call(d,[0],"<"),t.add(m(),"<"),t},m=()=>{let t=gsap.timeline();return t.call(l,[g,i.value1[0]],"<"),t.call(l,[u,i.value2[0]],"<"),t.call(l,[L,i.value1[0]],"<"),t.call(l,[P,i.value2[0]],"<"),t},D=()=>{let t=gsap.timeline({});return t.to(o,{maxHeight:"4em"}),t.set(b,{text:"Tax Drag: -$"},"<"),t.call(d,[1],"<"),t.add(S(),"<"),t},S=()=>{let t=gsap.timeline();return t.call(l,[g,i.value1[1]]),t.call(l,[h,i.taxDrag],"<"),t.call(l,[u,i.value2[1]],"<"),t.call(l,[P,i.value2[1]],"<"),t},F=()=>{let t=gsap.timeline({});return t.to(c.eq(0),{height:"97%"}),t.to(c.eq(1),{height:"18em"},"<"),t.to(f,{maxHeight:"12.5em"},"<"),t.to(o,{maxHeight:"9em",background:_},"<"),t.set(b,{text:"Capital Gain: $"},"<"),t.call(d,[2],"<"),t.add(N(),"<"),t},N=()=>{let t=gsap.timeline();return t.call(l,[g,i.value1[2]],"<"),t.call(l,[u,i.value2[2]],"<"),t.call(l,[h,i.gain2],"<"),t},e=gsap.timeline({scrollTrigger:{trigger:$("[graph-section]"),start:"top center",markers:!0}});e.addLabel("Part 1: Start");e.add(q());e.addLabel("Part 1: End");e.addLabel("Part 2: Start");e.add(D(),"+=1");e.addLabel("Part 2: End");e.addLabel("Part 3: Start");e.add(F(),"+=1");e.addLabel("Part 3: End");e.call(()=>{gsap.to(T,{opacity:1})});x.on("click",function(){e.pause();let t=$(this).index(),a,n;t===0?(a="Part 1: Start",n="Part 1: End",m()):t===1?(a=p("Part 2: Start",1),n="Part 2: End",S()):t===2&&(a=p("Part 3: Start",1),n="Part 3: End"),e.seek(a),e.tweenTo(n)});$("[button-restart]").on("click",function(){e.restart(),m(),d(0)});$(window).on("resize",function(){d($(x.filter(".active")).index())});})();