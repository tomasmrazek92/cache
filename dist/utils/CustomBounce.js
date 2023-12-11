"use strict";(()=>{var a,E,C,M=()=>a||typeof window!="undefined"&&(a=window.gsap)&&a.registerPlugin&&a,X=r=>{a=M(),C=a&&a.parseEase("_CE"),C?(E=1,a.parseEase("bounce").config=t=>typeof t=="object"?P("",t):P("bounce("+t+")",{strength:+t})):r&&console.warn("Please gsap.registerPlugin(CustomEase, CustomBounce)")},y=r=>{let t=r.length,h=1/r[t-2],u=1e3,l;for(l=2;l<t;l+=2)r[l]=~~(r[l]*h*u)/u;r[t-2]=1},j=1,P=(r,t)=>{if(E||X(1),t=t||{},j){let h=.999,u=Math.min(h,t.strength||.7),l=u,s=(t.squash||0)/100,m=s,x=1/.03,q=.2,d=1,i=.1,o=[0,0,.07,0,.1,1,.1,1],f=[0,0,0,0,.1,0,.1,0],_,w,e,p,n,g,c;for(n=0;n<200&&(q*=l*((l+1)/2),d*=u*u,g=i+q,e=i+q*.49,p=1-d,_=i+d/x,w=e+(e-_)*.8,s&&(i+=s,_+=s,e+=s,w+=s,g+=s,c=s/m,f.push(i-s,0,i-s,c,i-s/2,c,i,c,i,0,i,0,i,c*-.6,i+(g-i)/6,0,g,0),o.push(i-s,1,i,1,i,1),s*=u*u),o.push(i,1,_,p,e,p,w,p,g,1,g,1),u*=.95,x=d/(g-w),i=g,!(p>h));n++);if(t.endAtStart&&t.endAtStart!=="false"){if(e=-.1,o.unshift(e,1,e,1,-.07,0),m)for(s=m*2.5,e-=s,o.unshift(e,1,e,1,e,1),f.splice(0,6),f.unshift(e,0,e,0,e,1,e+s/2,1,e+s,1,e+s,0,e+s,0,e+s,-.6,e+s+.033,0),n=0;n<f.length;n+=2)f[n]-=e;for(n=0;n<o.length;n+=2)o[n]-=e,o[n+1]=1-o[n+1]}return s&&(y(f),f[2]="C"+f[2],C(t.squashID||r+"-squash","M"+f.join(","))),y(o),o[2]="C"+o[2],C(r,"M"+o.join(","))}},b=class{constructor(t,h){this.ease=P(t,h)}static create(t,h){return P(t,h)}static register(t){a=t,X()}};M()&&a.registerPlugin(b);b.version="3.12.3";})();
/*!
 * CustomBounce 3.12.3
 * https://gsap.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
