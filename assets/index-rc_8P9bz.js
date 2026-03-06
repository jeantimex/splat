(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();const We={fx:1159.5880733038064,fy:1164.6601287484507},Xe=[{id:0,img_name:"00001",width:1959,height:1090,position:[-3.0089893469241797,-.11086489695181866,-3.7527640949141428],rotation:[[.877318,0,.479909],[.013344,.999613,-.024394],[-.479724,.027805,.876979]],fy:1164.6601287484507,fx:1159.5880733038064},{id:1,img_name:"00009",width:1959,height:1090,position:[-2.5199776022057296,-.09704735754873686,-3.6247725540304545],rotation:[[.9982731285632193,-.011928707708098955,-.05751927260507243],[.0065061360949636325,.9955928229282383,-.09355533724430458],[.058381769258182864,.09301955098900708,.9939511719154457]],fy:1164.6601287484507,fx:1159.5880733038064},{id:2,img_name:"00017",width:1959,height:1090,position:[-.7737533667465242,-.3364271945329695,-2.9358969417573753],rotation:[[.9998813418672372,.013742375651625236,-.0069605529394208224],[-.014268370388586709,.996512943252834,-.08220929105659476],[.00580653013657589,.08229885200307129,.9965907801935302]],fy:1164.6601287484507,fx:1159.5880733038064},{id:3,img_name:"00025",width:1959,height:1090,position:[1.2198221749590001,-.2196687861401182,-2.3183162007028453],rotation:[[.9208648867765482,.0012010625395201253,.389880004297208],[-.06298204172269357,.987319521752825,.14571693239364383],[-.3847611242348369,-.1587410451475895,.9092635249821667]],fy:1164.6601287484507,fx:1159.5880733038064},{id:4,img_name:"00033",width:1959,height:1090,position:[1.742387858893817,-.13848225198886954,-2.0566370113193146],rotation:[[.24669889292141334,-.08370189346592856,-.9654706879349405],[.11343747891376445,.9919082664242816,-.05700815184573074],[.9624300466054861,-.09545671285663988,.2541976029815521]],fy:1164.6601287484507,fx:1159.5880733038064},{id:5,img_name:"00041",width:1959,height:1090,position:[3.6567309419223935,-.16470990600750707,-1.3458085590422042],rotation:[[.2341293058324528,-.02968330457755884,-.9717522161434825],[.10270823606832301,.99469554638321,-.005638106875665722],[.9667649592295676,-.09848690996657204,.2359360976431732]],fy:1164.6601287484507,fx:1159.5880733038064},{id:6,img_name:"00049",width:1959,height:1090,position:[3.9013554243203497,-.2597500978038105,-.8106154188297828],rotation:[[.6717235545638952,-.015718162115524837,-.7406351366386528],[.055627354673906296,.9980224478387622,.029270992841185218],[.7387104058127439,-.060861588786650656,.6712695459756353]],fy:1164.6601287484507,fx:1159.5880733038064},{id:7,img_name:"00057",width:1959,height:1090,position:[4.742994605467533,-.05591660945412069,.9500365976084458],rotation:[[-.17042655709210375,.01207080756938,-.9852964448542146],[.1165090336695526,.9931575292530063,-.00798543433078162],[.9784581921120181,-.1161568667478904,-.1706667764862097]],fy:1164.6601287484507,fx:1159.5880733038064},{id:8,img_name:"00065",width:1959,height:1090,position:[4.34676307626522,.08168160516967145,1.0876221470355405],rotation:[[-.003575447631888379,-.044792503246552894,-.9989899137764799],[.10770152645126597,.9931680875192705,-.04491693593046672],[.9941768441149182,-.10775333677534978,.0012732004866391048]],fy:1164.6601287484507,fx:1159.5880733038064},{id:9,img_name:"00073",width:1959,height:1090,position:[3.264984351114202,.078974937336732,1.0117200284114904],rotation:[[-.026919994628162257,-.1565891128261527,-.9872968974090509],[.08444552208239385,.983768234577625,-.1583319754069128],[.9960643893290491,-.0876350978794554,-.013259786205163005]],fy:1164.6601287484507,fx:1159.5880733038064}],ke=[.471108,-.01768,.88,0,0,.999799,.02,0,-.882075,-.009442,.47,0,.07,.03,6.55,1];function Je(t,e,i,n){return[2*t/i,0,0,0,0,-(2*e)/n,0,0,0,0,200/(200-.2),1,0,0,-40/(200-.2),0]}function Ke(t){const e=t.rotation.flat(),i=t.position,n=-i[0]*e[0]-i[1]*e[3]-i[2]*e[6],r=-i[0]*e[1]-i[1]*e[4]-i[2]*e[7],s=-i[0]*e[2]-i[1]*e[5]-i[2]*e[8];return[e[0],e[1],e[2],0,e[3],e[4],e[5],0,e[6],e[7],e[8],0,n,r,s,1]}function Ze(t,e){return[e[0]*t[0]+e[1]*t[4]+e[2]*t[8]+e[3]*t[12],e[0]*t[1]+e[1]*t[5]+e[2]*t[9]+e[3]*t[13],e[0]*t[2]+e[1]*t[6]+e[2]*t[10]+e[3]*t[14],e[0]*t[3]+e[1]*t[7]+e[2]*t[11]+e[3]*t[15],e[4]*t[0]+e[5]*t[4]+e[6]*t[8]+e[7]*t[12],e[4]*t[1]+e[5]*t[5]+e[6]*t[9]+e[7]*t[13],e[4]*t[2]+e[5]*t[6]+e[6]*t[10]+e[7]*t[14],e[4]*t[3]+e[5]*t[7]+e[6]*t[11]+e[7]*t[15],e[8]*t[0]+e[9]*t[4]+e[10]*t[8]+e[11]*t[12],e[8]*t[1]+e[9]*t[5]+e[10]*t[9]+e[11]*t[13],e[8]*t[2]+e[9]*t[6]+e[10]*t[10]+e[11]*t[14],e[8]*t[3]+e[9]*t[7]+e[10]*t[11]+e[11]*t[15],e[12]*t[0]+e[13]*t[4]+e[14]*t[8]+e[15]*t[12],e[12]*t[1]+e[13]*t[5]+e[14]*t[9]+e[15]*t[13],e[12]*t[2]+e[13]*t[6]+e[14]*t[10]+e[15]*t[14],e[12]*t[3]+e[13]*t[7]+e[14]*t[11]+e[15]*t[15]]}function R(t){const e=t[0]*t[5]-t[1]*t[4],i=t[0]*t[6]-t[2]*t[4],n=t[0]*t[7]-t[3]*t[4],r=t[1]*t[6]-t[2]*t[5],s=t[1]*t[7]-t[3]*t[5],a=t[2]*t[7]-t[3]*t[6],p=t[8]*t[13]-t[9]*t[12],f=t[8]*t[14]-t[10]*t[12],g=t[8]*t[15]-t[11]*t[12],y=t[9]*t[14]-t[10]*t[13],w=t[9]*t[15]-t[11]*t[13],x=t[10]*t[15]-t[11]*t[14],m=e*x-i*w+n*y+r*g-s*f+a*p;return m?[(t[5]*x-t[6]*w+t[7]*y)/m,(t[2]*w-t[1]*x-t[3]*y)/m,(t[13]*a-t[14]*s+t[15]*r)/m,(t[10]*s-t[9]*a-t[11]*r)/m,(t[6]*g-t[4]*x-t[7]*f)/m,(t[0]*x-t[2]*g+t[3]*f)/m,(t[14]*n-t[12]*a-t[15]*i)/m,(t[8]*a-t[10]*n+t[11]*i)/m,(t[4]*w-t[5]*g+t[7]*p)/m,(t[1]*g-t[0]*w-t[3]*p)/m,(t[12]*s-t[13]*n+t[15]*e)/m,(t[9]*n-t[8]*s-t[11]*e)/m,(t[5]*f-t[4]*y-t[6]*p)/m,(t[0]*y-t[1]*f+t[2]*p)/m,(t[13]*i-t[12]*r-t[14]*e)/m,(t[8]*r-t[9]*i+t[10]*e)/m]:null}function Z(t,e,i,n,r){const s=Math.hypot(i,n,r);if(!s)return t;i/=s,n/=s,r/=s;const a=Math.sin(e),p=Math.cos(e),f=1-p,g=i*i*f+p,y=n*i*f+r*a,w=r*i*f-n*a,x=i*n*f-r*a,m=n*n*f+p,c=r*n*f+i*a,d=i*r*f+n*a,b=n*r*f-i*a,u=r*r*f+p;return[t[0]*g+t[4]*y+t[8]*w,t[1]*g+t[5]*y+t[9]*w,t[2]*g+t[6]*y+t[10]*w,t[3]*g+t[7]*y+t[11]*w,t[0]*x+t[4]*m+t[8]*c,t[1]*x+t[5]*m+t[9]*c,t[2]*x+t[6]*m+t[10]*c,t[3]*x+t[7]*m+t[11]*c,t[0]*d+t[4]*b+t[8]*u,t[1]*d+t[5]*b+t[9]*u,t[2]*d+t[6]*b+t[10]*u,t[3]*d+t[7]*b+t[11]*u,...t.slice(12,16)]}function j(t,e,i,n){return[...t.slice(0,12),t[0]*e+t[4]*i+t[8]*n+t[12],t[1]*e+t[5]*i+t[9]*n+t[13],t[2]*e+t[6]*i+t[10]*n+t[14],t[3]*e+t[7]*i+t[11]*n+t[15]]}function Re(t){const e=R(t);if(!e)return{position:[0,0,0],quaternion:[0,0,0,1]};const i=[e[12],e[13],e[14]],n=e[0],r=e[1],s=e[2],a=e[4],p=e[5],f=e[6],g=e[8],y=e[9],w=e[10],x=n+p+w;let m,c,d,b;if(x>0){const o=.5/Math.sqrt(x+1);b=.25/o,m=(f-y)*o,c=(g-s)*o,d=(r-a)*o}else if(n>p&&n>w){const o=2*Math.sqrt(1+n-p-w);b=(f-y)/o,m=.25*o,c=(a+r)/o,d=(g+s)/o}else if(p>w){const o=2*Math.sqrt(1+p-n-w);b=(g-s)/o,m=(a+r)/o,c=.25*o,d=(y+f)/o}else{const o=2*Math.sqrt(1+w-n-p);b=(r-a)/o,m=(g+s)/o,c=(y+f)/o,d=.25*o}const u=Math.sqrt(m*m+c*c+d*d+b*b);return u>1e-6&&(m/=u,c/=u,d/=u,b/=u),{position:i,quaternion:[m,c,d,b]}}function Qe(t,e){const[i,n,r,s]=e,a=i*i,p=n*n,f=r*r,g=i*n,y=i*r,w=n*r,x=s*i,m=s*n,c=s*r,d=1-2*(p+f),b=2*(g-c),u=2*(y+m),o=2*(g+c),v=1-2*(a+f),E=2*(w-x),D=2*(y-m),P=2*(w+x),M=1-2*(a+p),C=-(d*t[0]+o*t[1]+D*t[2]),L=-(b*t[0]+v*t[1]+P*t[2]),O=-(u*t[0]+E*t[1]+M*t[2]);return[d,b,u,0,o,v,E,0,D,P,M,0,C,L,O,1]}function et(t,e,i){let[n,r,s,a]=t,[p,f,g,y]=e,w=n*p+r*f+s*g+a*y;if(w<0&&(p=-p,f=-f,g=-g,y=-y,w=-w),w>.9995){const b=n+i*(p-n),u=r+i*(f-r),o=s+i*(g-s),v=a+i*(y-a),E=Math.sqrt(b*b+u*u+o*o+v*v);return[b/E,u/E,o/E,v/E]}const x=Math.acos(w),m=Math.sin(x),c=Math.sin((1-i)*x)/m,d=Math.sin(i*x)/m;return[c*n+d*p,c*r+d*f,c*s+d*g,c*a+d*y]}function tt(t,e,i){return[t[0]+i*(e[0]-t[0]),t[1]+i*(e[1]-t[1]),t[2]+i*(e[2]-t[2])]}function it(t,e,i){const n=Re(t),r=Re(e),s=tt(n.position,r.position,i),a=et(n.quaternion,r.quaternion,i);return Qe(s,a)}function ze(t,e){const i=R(t);if(!i)return t;const n=j(i,e,0,0);return R(n)??t}function nt(t,e,i){if(e===0)return;let n=0,r=0,s=0;const a=Math.min(e,1e4),p=Math.floor(e/a)*8;for(let c=0;c<a;c++){const d=new Float32Array(t.buffer,c*p*4,1)[0],b=new Float32Array(t.buffer,(c*p+1)*4,1)[0],u=new Float32Array(t.buffer,(c*p+2)*4,1)[0];n+=d,r+=b,s+=u}const f=[n/a,r/a,s/a],g=[i.viewMatrix[0],i.viewMatrix[4],i.viewMatrix[8]],y=[i.viewMatrix[1],i.viewMatrix[5],i.viewMatrix[9]],w=[i.viewMatrix[2],i.viewMatrix[6],i.viewMatrix[10]],x=f,m=[g[0],y[0],w[0],0,g[1],y[1],w[1],0,g[2],y[2],w[2],0,-x[0]*g[0]-x[1]*y[0]-x[2]*w[0],-x[0]*g[1]-x[1]*y[1]-x[2]*w[1],-x[0]*g[2]-x[1]*y[2]-x[2]*w[2],1];i.setViewMatrix(m)}function rt(t){let e=[...ke],i=!1,n=performance.now();const r=new Set;let s=!1,a="orbit",p=0,f=0,g=0;const y=.92,w=.5;let x={dx:0,dy:0},m={dx:0,dy:0},c=0,d=0;const b=()=>{x={dx:0,dy:0},m={dx:0,dy:0},c=0,d=0};window.addEventListener("keydown",o=>r.add(o.code)),window.addEventListener("keyup",o=>r.delete(o.code)),window.addEventListener("blur",()=>r.clear()),t.addEventListener("mousedown",o=>{o.preventDefault(),i=!1,s=!0,o.shiftKey?a="roll":o.ctrlKey||o.metaKey||o.button===2?a="pan":a="orbit",p=o.clientX,f=o.clientY,g=performance.now(),b()}),t.addEventListener("mouseup",()=>{performance.now()-g>80&&b(),s=!1}),t.addEventListener("mouseleave",()=>{s=!1}),t.addEventListener("contextmenu",o=>{o.preventDefault()}),t.addEventListener("mousemove",o=>{if(!s)return;o.preventDefault();const v=(o.clientX-p)/Math.max(window.innerWidth,1),E=(o.clientY-f)/Math.max(window.innerHeight,1);if(p=o.clientX,f=o.clientY,g=performance.now(),Math.abs(v)<1e-10&&Math.abs(E)<1e-10)return;let D=v,P=E;const M=R(e);if(M)if(a==="orbit"){let L=j(M,0,0,4);const O=[e[4],e[5],e[6]],G=Math.hypot(O[0],O[1],O[2]);G>1e-6&&(L=Z(L,5*D,O[0]/G,O[1]/G,O[2]/G)),L=Z(L,-5*P,1,0,0),L=j(L,0,0,-4);const $=R(L);$&&(e=$),x={dx:D,dy:P}}else if(a==="roll"){const C=R(Z(M,5*v,0,0,1));C&&(e=C),c=v}else{const C=j(M,-10*v,-10*E,0),L=R(C);L&&(e=L),m={dx:v,dy:E}}}),t.addEventListener("wheel",o=>{o.preventDefault(),i=!1,d+=-10*o.deltaY/Math.max(window.innerHeight,1)},{passive:!1});const u=o=>{if(i){const G=Math.sin((performance.now()-n)/5e3);let $=R(ke);if(!$)return;$=j($,2.5*G,0,6*(1-Math.cos(G))),$=Z($,-.6*G,0,1,0);const B=R($);B&&(e=B);return}const v=o/(1e3/60),E=Math.pow(y,v);if(!s&&(Math.abs(x.dx)>1e-5||Math.abs(x.dy)>1e-5)){const G=R(e);if(G){let B=j(G,0,0,4);const Y=[e[4],e[5],e[6]],W=Math.hypot(Y[0],Y[1],Y[2]);W>1e-6&&(B=Z(B,5*x.dx*v,Y[0]/W,Y[1]/W,Y[2]/W));const ie=-5*x.dy*v;B=Z(B,ie,1,0,0),B=j(B,0,0,-4);const ne=R(B);ne&&(e=ne)}x.dx*=E,x.dy*=E}if(!s&&Math.abs(c)>1e-5){const G=R(e);if(G){const $=R(Z(G,5*c*v,0,0,1));$&&(e=$)}c*=E}if(!s&&(Math.abs(m.dx)>1e-5||Math.abs(m.dy)>1e-5)){const G=R(e);if(G){const $=j(G,-10*m.dx*v,-10*m.dy*v,0),B=R($);B&&(e=B)}m.dx*=E,m.dy*=E}if(Math.abs(d)>1e-5){const G=R(e);if(G){const $=j(G,0,0,d*v),B=R($);B&&(e=B)}d*=Math.pow(w,v)}const D=R(e);if(!D)return;const P=.003*o,M=8e-4*o;let C=D,L=!1;if(r.has("ArrowUp")&&(C=j(C,0,0,P),L=!0),r.has("ArrowDown")&&(C=j(C,0,0,-P),L=!0),r.has("ArrowLeft")&&(C=j(C,-P,0,0),L=!0),r.has("ArrowRight")&&(C=j(C,P,0,0),L=!0),r.has("KeyA")&&(C=Z(C,-M,0,1,0),L=!0),r.has("KeyD")&&(C=Z(C,M,0,1,0),L=!0),r.has("KeyW")&&(C=Z(C,M*.7,1,0,0),L=!0),r.has("KeyS")&&(C=Z(C,-M*.7,1,0,0),L=!0),!L)return;const O=R(C);O&&(e=O)};return{camera:{...We},get viewMatrix(){return e},get isInteracting(){return s||r.size>0},setViewMatrix(o){e=[...o],b()},setCarousel(o){i=o,o&&(n=performance.now(),b())},update:u}}function ot(){const t=document.querySelector("#app");if(!t)throw new Error("Missing #app root element");const e=t.querySelector("#canvas"),i=t.querySelector("#gizmo"),n=t.querySelector("#message"),r=t.querySelector("#spinner"),s=t.querySelector("#fps"),a=t.querySelector("#progress"),p=t.querySelector("#dropzone"),f=t.querySelector("#btn-anaglyph"),g=t.querySelector("#btn-stereo");if(!e||!i||!n||!r||!s||!a||!p||!f||!g)throw new Error("Missing viewer DOM nodes");return{canvas:e,gizmo:i,message:n,spinner:r,fps:s,progress:a,dropzone:p,anaglyphButton:f,stereoButton:g}}function je(t){t.spinner.classList.remove("hidden"),t.dropzone.classList.add("hidden")}function Ce(t){t.spinner.classList.add("hidden")}function st(t,e){const i=()=>{const n=e.stereoMode==="anaglyph",r=e.stereoMode==="sbs";t.anaglyphButton.classList.toggle("active",n),t.stereoButton.classList.toggle("active",r),t.anaglyphButton.setAttribute("aria-pressed",String(n)),t.stereoButton.setAttribute("aria-pressed",String(r))};return t.anaglyphButton.addEventListener("click",()=>{e.stereoMode=e.stereoMode==="anaglyph"?"off":"anaglyph",i()}),t.stereoButton.addEventListener("click",()=>{e.stereoMode=e.stereoMode==="sbs"?"off":"sbs",i()}),i(),i}const at=[{key:"x",vector:[1,0,0],color:"#ff4a4a",label:"X",filled:!0,flipVertical:!0},{key:"-x",vector:[-1,0,0],color:"#ff4a4a",label:"",filled:!1,flipVertical:!0},{key:"y",vector:[0,-1,0],color:"#45ff57",label:"Y",filled:!0,flipVertical:!0},{key:"-y",vector:[0,1,0],color:"#45ff57",label:"",filled:!1,flipVertical:!0},{key:"z",vector:[0,0,-1],color:"#6870ff",label:"Z",filled:!0,flipVertical:!0},{key:"-z",vector:[0,0,1],color:"#6870ff",label:"",filled:!1,flipVertical:!0}];function lt(t,e={}){const i=t.getContext("2d");if(!i)throw new Error("Unable to create camera gizmo 2D context");const n=120,r=n*.5,s=46,a=13,p=a+3;let f=[];const g=(c,d)=>{const b=c[0]*d[0]+c[4]*d[1]+c[8]*d[2],u=c[1]*d[0]+c[5]*d[1]+c[9]*d[2],o=c[2]*d[0]+c[6]*d[1]+c[10]*d[2];return{x:b,y:u,z:o}},y=(c,d,b,u,o,v)=>{i.save(),i.globalAlpha=v,i.lineWidth=4,i.strokeStyle=b,u?(i.fillStyle=b,i.beginPath(),i.arc(c,d,a,0,Math.PI*2),i.fill(),o&&(i.fillStyle="#000000",i.font="bold 15px sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(o,c,d+.5))):(i.fillStyle="#1a2127",i.beginPath(),i.arc(c,d,a,0,Math.PI*2),i.fill(),i.stroke()),i.restore()},w=(c,d,b,u)=>{const o=c-r,v=d-r;o*o+v*v<2||(i.save(),i.globalAlpha=u,i.strokeStyle=b,i.lineWidth=4,i.lineCap="round",i.beginPath(),i.moveTo(r,r),i.lineTo(c,d),i.stroke(),i.restore())},x=c=>{var E;const d=t.getBoundingClientRect();if(d.width<=0||d.height<=0)return;const b=c.clientX-d.left,u=c.clientY-d.top;let o=null,v=1/0;for(const D of f){const P=b-D.cx,M=u-D.cy,C=P*P+M*M;C>p*p||(!o||C<v||D.depth<o.depth)&&(o=D,v=C)}o&&(c.preventDefault(),c.stopPropagation(),(E=e.onAxisClick)==null||E.call(e,o.key))};return t.addEventListener("pointerdown",x),{update:c=>{const d=Math.max(1,window.devicePixelRatio||1),b=Math.round(n*d);(t.width!==b||t.height!==b)&&(t.width=b,t.height=b,t.style.width=`${n}px`,t.style.height=`${n}px`),i.setTransform(d,0,0,d,0,0),i.clearRect(0,0,n,n);const u=at.map(o=>{const v=g(c,o.vector);return{...o,cx:r+v.x*s,cy:r+(o.flipVertical?1:-1)*v.y*s,depth:v.z}});f=u.map(o=>({key:o.key,cx:o.cx,cy:o.cy,depth:o.depth}));for(const o of u)if(o.filled){const v=Math.max(.45,Math.min(1,.85-o.depth*.25));w(o.cx,o.cy,o.color,v)}u.sort((o,v)=>v.depth-o.depth);for(const o of u){const v=Math.max(.4,Math.min(1,.85-o.depth*.25));y(o.cx,o.cy,o.color,o.filled,o.label,v)}},destroy(){t.removeEventListener("pointerdown",x)}}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class te{constructor(e,i,n,r,s="div"){this.parent=e,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),te.nextNameID=te.nextNameID||0,this.$name.id=`lil-gui-name-${++te.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const i=this.parent.add(this.object,this.property,e);return i.name(this._name),this.destroy(),i}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ct extends te{constructor(e,i,n){super(e,i,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function Ve(t){let e,i;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),i?"#"+i:!1}const dt={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:Ve,toHexString:Ve},Ee={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},ut={isPrimitive:!1,match:t=>Array.isArray(t),fromHexString(t,e,i=1){const n=Ee.fromHexString(t);e[0]=(n>>16&255)/255*i,e[1]=(n>>8&255)/255*i,e[2]=(n&255)/255*i},toHexString([t,e,i],n=1){n=255/n;const r=t*n<<16^e*n<<8^i*n<<0;return Ee.toHexString(r)}},ht={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,i=1){const n=Ee.fromHexString(t);e.r=(n>>16&255)/255*i,e.g=(n>>8&255)/255*i,e.b=(n&255)/255*i},toHexString({r:t,g:e,b:i},n=1){n=255/n;const r=t*n<<16^e*n<<8^i*n<<0;return Ee.toHexString(r)}},pt=[dt,Ee,ut,ht];function ft(t){return pt.find(e=>e.match(t))}class mt extends te{constructor(e,i,n,r){super(e,i,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=ft(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=Ve(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const i=this._format.fromHexString(e);this.setValue(i)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Te extends te{constructor(e,i,n){super(e,i,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class gt extends te{constructor(e,i,n,r,s,a){super(e,i,n,"number"),this._initInput(),this.min(r),this.max(s);const p=a!==void 0;this.step(p?a:this._getImplicitStep(),p),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,i=!0){return this._step=e,this._stepExplicit=i,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let i=(e-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let o=parseFloat(this.$input.value);isNaN(o)||(this._stepExplicit&&(o=this._snap(o)),this.setValue(this._clamp(o)))},n=o=>{const v=parseFloat(this.$input.value);isNaN(v)||(this._snapClampSetValue(v+o),this.$input.value=this.getValue())},r=o=>{o.key==="Enter"&&this.$input.blur(),o.code==="ArrowUp"&&(o.preventDefault(),n(this._step*this._arrowKeyMultiplier(o))),o.code==="ArrowDown"&&(o.preventDefault(),n(this._step*this._arrowKeyMultiplier(o)*-1))},s=o=>{this._inputFocused&&(o.preventDefault(),n(this._step*this._normalizeMouseWheel(o)))};let a=!1,p,f,g,y,w;const x=5,m=o=>{p=o.clientX,f=g=o.clientY,a=!0,y=this.getValue(),w=0,window.addEventListener("mousemove",c),window.addEventListener("mouseup",d)},c=o=>{if(a){const v=o.clientX-p,E=o.clientY-f;Math.abs(E)>x?(o.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(v)>x&&d()}if(!a){const v=o.clientY-g;w-=v*this._step*this._arrowKeyMultiplier(o),y+w>this._max?w=this._max-y:y+w<this._min&&(w=this._min-y),this._snapClampSetValue(y+w)}g=o.clientY},d=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",c),window.removeEventListener("mouseup",d)},b=()=>{this._inputFocused=!0},u=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",b),this.$input.addEventListener("blur",u)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(u,o,v,E,D)=>(u-o)/(v-o)*(D-E)+E,i=u=>{const o=this.$slider.getBoundingClientRect();let v=e(u,o.left,o.right,this._min,this._max);this._snapClampSetValue(v)},n=u=>{this._setDraggingStyle(!0),i(u.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",s)},r=u=>{i(u.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",s)};let a=!1,p,f;const g=u=>{u.preventDefault(),this._setDraggingStyle(!0),i(u.touches[0].clientX),a=!1},y=u=>{u.touches.length>1||(this._hasScrollBar?(p=u.touches[0].clientX,f=u.touches[0].clientY,a=!0):g(u),window.addEventListener("touchmove",w,{passive:!1}),window.addEventListener("touchend",x))},w=u=>{if(a){const o=u.touches[0].clientX-p,v=u.touches[0].clientY-f;Math.abs(o)>Math.abs(v)?g(u):(window.removeEventListener("touchmove",w),window.removeEventListener("touchend",x))}else u.preventDefault(),i(u.touches[0].clientX)},x=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",w),window.removeEventListener("touchend",x)},m=this._callOnFinishChange.bind(this),c=400;let d;const b=u=>{if(Math.abs(u.deltaX)<Math.abs(u.deltaY)&&this._hasScrollBar)return;u.preventDefault();const v=this._normalizeMouseWheel(u)*this._step;this._snapClampSetValue(this.getValue()+v),this.$input.value=this.getValue(),clearTimeout(d),d=setTimeout(m,c)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",y,{passive:!1}),this.$slider.addEventListener("wheel",b,{passive:!1})}_setDraggingStyle(e,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${i}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:i,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(i=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(e){let i=this._stepExplicit?1:10;return e.shiftKey?i*=10:e.altKey&&(i/=10),i}_snap(e){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),e-=i,e=Math.round(e/this._step)*this._step,e+=i,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class vt extends te{constructor(e,i,n,r){super(e,i,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),i=this._values.indexOf(e);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?e:this._names[i],this}}class yt extends te{constructor(e,i,n){super(e,i,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var xt=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "↕";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "▾";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "▸";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "✓";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function wt(t){const e=document.createElement("style");e.innerHTML=t;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}let Fe=!1;class $e{constructor({parent:e,autoPlace:i=e===void 0,container:n,width:r,title:s="Controls",closeFolders:a=!1,injectStyles:p=!0,touchStyles:f=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),f&&this.domElement.classList.add("allow-touch-styles"),!Fe&&p&&(wt(xt),Fe=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=a}add(e,i,n,r,s){if(Object(n)===n)return new vt(this,e,i,n);const a=e[i];switch(typeof a){case"number":return new gt(this,e,i,n,r,s);case"boolean":return new ct(this,e,i);case"string":return new yt(this,e,i);case"function":return new Te(this,e,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,e,`
	value:`,a)}addColor(e,i,n=1){return new mt(this,e,i,n)}addFolder(e){const i=new $e({parent:this,title:e});return this.root._closeFolders&&i.close(),i}load(e,i=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Te||n._name in e.controllers&&n.load(e.controllers[n._name])}),i&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Te)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(i=>{e=e.concat(i.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(i=>{e=e.concat(i.foldersRecursive())}),e}}function bt(t,e,i){const n=new $e({title:"Render"});n.add({reset:()=>{e.onReset()}},"reset").name("Reset All Settings");const r=n.addFolder("Splat Settings");r.add(t,"pointCloud").name("Point Cloud"),r.add(t,"pointSize",.5,6,.1).name("Point Size"),r.add(t,"splatScale",0,1,.001).name("Splatscale"),r.add(t,"antialias",0,4,.001).name("Antialias"),r.close();const s=n.addFolder("Camera");s.add(t,"fov",20,120,.1).name("FOV"),s.add(t,"animateCamera").name("Animate Transitions"),s.add(t,"animationDuration",0,3e3,1).name("Animation duration (ms)"),s.add({loadCameras:()=>{const p=document.createElement("input");p.type="file",p.accept=".json",p.onchange=async()=>{var g;const f=(g=p.files)==null?void 0:g[0];if(f){je(i);try{const y=JSON.parse(await f.text());Array.isArray(y)&&y.length>0&&(e.onCamerasLoaded(y,s,e),e.onApplyCamera(0)),Ce(i)}catch(y){Ce(i),i.message.textContent=`Error loading cameras: ${y instanceof Error?y.message:String(y)}`}}},p.click()}},"loadCameras").name("Load Cameras"),s.add({logPose:()=>{e.onLogPose()}},"logPose").name("Log Camera Pose"),s.close();const a=n.addFolder("Adjust Colors");return a.add(t,"brightness",-1,1,.001).name("Brightness"),a.add(t,"contrast",0,3,.001).name("Contrast"),a.add(t,"gamma",.1,3,.001).name("Gamma"),a.add(t,"blackLevel",-1,1,.001).name("Blacklevel"),a.add(t,"whiteLevel",-1,1,.001).name("Whitelevel"),a.add(t,"intensity",0,3,.001).name("Intensity"),a.add(t,"saturate",0,3,.001).name("Saturate"),a.add(t,"vibrance",-1,1,.001).name("Vibrance"),a.add(t,"temperature",-1,1,.001).name("Temperature"),a.add(t,"tint",-1,1,.001).name("Tint"),a.add(t,"alpha",0,1,.001).name("Alpha"),a.close(),n}function At(t){const{applyCamera:e,getCurrentCameraIndex:i,saveViewToHash:n,setCarousel:r}=t;window.addEventListener("keydown",s=>{if(/^\d$/.test(s.key)){e(Number.parseInt(s.key,10));return}if(s.key==="-"||s.key==="_"){e(i()-1);return}if(s.key==="+"||s.key==="="){e(i()+1);return}if(s.code==="KeyP"){r(!0);return}s.code==="KeyV"&&n()})}function _t(t){const{dropzone:e,onFile:i}=t,n=s=>{s.preventDefault(),s.stopPropagation()};document.addEventListener("dragenter",n),document.addEventListener("dragover",n),document.addEventListener("dragleave",n),document.addEventListener("drop",s=>{var p,f;n(s);const a=(f=(p=s.dataTransfer)==null?void 0:p.files)==null?void 0:f[0];a&&i(a)});const r=document.createElement("input");r.type="file",r.accept=".splat,.ply",r.style.display="none",document.body.appendChild(r),r.addEventListener("change",()=>{var a;const s=(a=r.files)==null?void 0:a[0];s&&i(s),r.value=""}),e.addEventListener("click",()=>{r.click()})}const Oe=32,St=`/**
 * =============================================================================
 * 3D GAUSSIAN SPLATTING - VERTEX SHADER
 * =============================================================================
 *
 * This shader transforms 3D Gaussians into 2D screen-space ellipses.
 *
 * THE CORE MATH OF 3DGS PROJECTION:
 * ---------------------------------
 * A 3D Gaussian with covariance Σ₃ₓ₃ projects to a 2D Gaussian with
 * covariance Σ₂ₓ₂. The key insight is that this projection can be
 * computed analytically using the Jacobian of the projection transform.
 *
 * Given:
 *   - 3D covariance Σ (stored as upper triangle in splat buffer)
 *   - View matrix V (camera pose)
 *   - Projection with focal lengths (fx, fy)
 *
 * The 2D covariance is: Σ' = J × V × Σ × Vᵀ × Jᵀ
 *
 * Where J is the Jacobian of perspective projection:
 *   J = | fx/z    0    -fx*x/z² |
 *       |   0   fy/z   -fy*y/z² |
 *       |   0     0        0    |
 *
 * From the 2D covariance, we extract ellipse parameters:
 *   - Eigenvalues λ₁, λ₂ → axis lengths (sqrt for std dev)
 *   - Eigenvector → ellipse orientation
 *
 * INSTANCED RENDERING:
 * --------------------
 * Each Gaussian is one "instance" of a quad (4 vertices).
 * The GPU executes this shader 4× per Gaussian.
 *   - instance_index: Which Gaussian (0 to N-1)
 *   - quad_pos: Which corner of the quad (-2,-2), (2,-2), (-2,2), (2,2)
 *
 * The quad corners are positioned along the ellipse's major/minor axes,
 * scaled by the eigenvalues (axis lengths).
 */

/** Uniform buffer containing camera transforms and render parameters */
struct Uniforms {
  // ---- Camera transforms ----
  /** Projection matrix: camera-space → clip-space (NDC) */
  projection: mat4x4<f32>,
  /** View matrix: world-space → camera-space */
  view: mat4x4<f32>,

  // ---- Camera intrinsics ----
  /**
   * Focal lengths (fx, fy) in pixels from training camera.
   * Used in the Jacobian calculation for projecting 3D → 2D covariance.
   * fx = width / (2 * tan(fov_x/2))
   * fy = height / (2 * tan(fov_y/2))
   */
  focal: vec2<f32>,

  /** Viewport dimensions in physical pixels (width, height) */
  viewport: vec2<f32>,

  // ---- Render parameters ----
  /**
   * x: render mode (0=splat Gaussians, 1=point cloud)
   * y: point size in pixels (for point cloud mode)
   * z: opacity multiplier (for crossfade effects)
   * w: splat scale factor (1.0 = original size)
   */
  render_params: vec4<f32>,

  // ---- Color grading (used in fragment shader) ----
  /** x: brightness, y: contrast, z: gamma, w: alpha multiplier */
  color_basic: vec4<f32>,
  /** x: black level, y: white level, z: intensity, w: saturation */
  color_levels: vec4<f32>,
  /** x: vibrance, y: temperature, z: tint, w: antialias filter strength */
  color_mix: vec4<f32>,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

/**
 * Packed Gaussian data: 8 uint32 per Gaussian (32 bytes total)
 *   [0-2]: Position (x, y, z) as float32 bit patterns
 *   [3]:   Unused
 *   [4-6]: 3D covariance upper triangle (6 float16 packed into 3 uint32)
 *   [7]:   Color RGBA8 packed into 1 uint32
 */
@group(0) @binding(1) var<storage, read> splats: array<u32>;

/**
 * Depth-sorted indices for back-to-front rendering.
 * sorted_indices[i] = index of i-th Gaussian to render (farthest first).
 * Updated by CPU sort worker when camera moves.
 */
@group(0) @binding(2) var<storage, read> sorted_indices: array<u32>;

/** Vertex shader input */
struct VSIn {
  /** Quad corner position: one of (-2,-2), (2,-2), (-2,2), (2,2) */
  @location(0) quad_pos: vec2<f32>,
  /** Which Gaussian instance (0 to N-1) */
  @builtin(instance_index) instance_id: u32,
}

/** Vertex shader output / Fragment shader input */
struct VSOut {
  /** Clip-space position for rasterization */
  @builtin(position) position: vec4<f32>,
  /** Base color (RGB from splat data, alpha from opacity) */
  @location(0) v_color: vec4<f32>,
  /** Local quad position for Gaussian evaluation in fragment shader */
  @location(1) v_position: vec2<f32>,
  /** Render mode: 0=splat, 1=point cloud */
  @location(2) v_mode: f32,
  /** Per-pass opacity multiplier */
  @location(3) v_opacity: f32,
}

/**
 * VERTEX SHADER MAIN - Transforms 3D Gaussians to 2D Ellipses
 *
 * For each vertex of each Gaussian's quad, this shader:
 * 1. Looks up the Gaussian data using sorted_indices[instance_id]
 * 2. Projects the 3D center to 2D screen position
 * 3. Computes the 2D covariance using the Jacobian of projection
 * 4. Extracts ellipse axes from eigenvalues of 2D covariance
 * 5. Positions the quad vertex along the appropriate axis
 *
 * The math follows the 3D Gaussian Splatting paper:
 * "3D Gaussian Splatting for Real-Time Radiance Field Rendering"
 * by Kerbl et al., 2023
 */
@vertex
fn vs_main(input: VSIn) -> VSOut {
  // ==========================================================================
  // STEP 1: Lookup Gaussian data from sorted order
  // ==========================================================================
  // The sorted_indices array maps instance_id to actual Gaussian index.
  // This indirection enables back-to-front rendering without moving data.
  let index = sorted_indices[input.instance_id];
  let base = index * 8u;  // 8 uint32 per Gaussian

  // Unpack position from uint32 bit patterns (bitcast preserves exact float value)
  let center = vec3<f32>(
    bitcast<f32>(splats[base + 0u]),
    bitcast<f32>(splats[base + 1u]),
    bitcast<f32>(splats[base + 2u]),
  );

  // ==========================================================================
  // STEP 2: Project center to screen space
  // ==========================================================================
  // Transform world position → camera space → clip space
  let cam = uniforms.view * vec4<f32>(center, 1.0);  // Camera-space position
  let pos2d = uniforms.projection * cam;             // Clip-space position

  // ==========================================================================
  // STEP 3: Frustum culling
  // ==========================================================================
  // Reject Gaussians that are:
  // - Behind the camera (cam.z < 0)
  // - Too close to near plane (cam.z < 0.01)
  // - Outside clip bounds with margin (for large ellipses)
  let clip = 1.2 * pos2d.w;
  if (
    cam.z < 0.01 ||
    pos2d.w <= 0.0 ||
    pos2d.z < -clip ||
    pos2d.x < -clip || pos2d.x > clip ||
    pos2d.y < -clip || pos2d.y > clip
  ) {
    // Return degenerate vertex outside visible area
    var culled: VSOut;
    culled.position = vec4<f32>(0.0, 0.0, 2.0, 1.0);  // z=2 is behind far plane
    culled.v_color = vec4<f32>(0.0);
    culled.v_position = vec2<f32>(0.0);
    culled.v_mode = uniforms.render_params.x;
    culled.v_opacity = 0.0;
    return culled;
  }

  // ==========================================================================
  // STEP 4: Unpack color (RGBA8 packed into one uint32)
  // ==========================================================================
  let packed_color = splats[base + 7u];
  let color = vec4<f32>(
    f32(packed_color & 0xffu),          // R: bits 0-7
    f32((packed_color >> 8u) & 0xffu),  // G: bits 8-15
    f32((packed_color >> 16u) & 0xffu), // B: bits 16-23
    f32((packed_color >> 24u) & 0xffu)  // A: bits 24-31
  ) / 255.0;

  let depth_tint = 1.0;  // Could be used for depth-based shading
  let center_ndc = pos2d.xy / pos2d.w;  // Normalized device coordinates [-1, 1]
  let point_mode = uniforms.render_params.x;

  var major_axis: vec2<f32>;
  var minor_axis: vec2<f32>;

  if (point_mode > 0.5) {
    // ========================================================================
    // POINT CLOUD MODE: Simple fixed-size dots
    // ========================================================================
    // For debugging or when Gaussian ellipses aren't needed
    let point_size = max(uniforms.render_params.y, 0.5);
    major_axis = vec2<f32>(point_size, 0.0);
    minor_axis = vec2<f32>(0.0, point_size);
  } else {
    // ========================================================================
    // GAUSSIAN SPLAT MODE: Project 3D covariance to 2D ellipse
    // ========================================================================

    // Unpack 3D covariance from 6 float16 values stored in 3 uint32
    // cov0 = (σxx, σxy), cov1 = (σxz, σyy), cov2 = (σyz, σzz)
    let cov0 = unpack2x16float(splats[base + 4u]);
    let cov1 = unpack2x16float(splats[base + 5u]);
    let cov2 = unpack2x16float(splats[base + 6u]);

    // Reconstruct 3D covariance matrix (symmetric)
    // vrk = | σxx  σxy  σxz |
    //       | σxy  σyy  σyz |
    //       | σxz  σyz  σzz |
    let vrk = mat3x3<f32>(
      vec3<f32>(cov0.x, cov0.y, cov1.x),  // Column 0
      vec3<f32>(cov0.y, cov1.y, cov2.x),  // Column 1
      vec3<f32>(cov1.x, cov2.x, cov2.y)   // Column 2
    );

    // =======================================================================
    // JACOBIAN OF PERSPECTIVE PROJECTION
    // =======================================================================
    // The Jacobian J maps small 3D displacements to 2D screen displacements.
    //
    // For perspective projection: x_screen = fx * X/Z, y_screen = fy * Y/Z
    //
    // J = ∂(x_screen, y_screen)/∂(X, Y, Z) =
    //     | fx/Z    0    -fx*X/Z² |
    //     |   0   fy/Z   -fy*Y/Z² |
    //     |   0     0       0     |
    //
    // Note: fy is negated because screen Y is typically inverted
    let z = max(cam.z, 0.0001);
    let j = mat3x3<f32>(
      vec3<f32>(uniforms.focal.x / z, 0.0, -(uniforms.focal.x * cam.x) / (z * z)),
      vec3<f32>(0.0, -uniforms.focal.y / z, (uniforms.focal.y * cam.y) / (z * z)),
      vec3<f32>(0.0, 0.0, 0.0)
    );

    // =======================================================================
    // PROJECT 3D COVARIANCE TO 2D COVARIANCE
    // =======================================================================
    // The 2D covariance is: Σ_2D = J × V × Σ_3D × Vᵀ × Jᵀ
    // where V is the rotation part of the view matrix.
    //
    // We compute: t = transpose(view3) × j
    //            cov2d = transpose(t) × vrk × t
    let view3 = mat3x3<f32>(uniforms.view[0].xyz, uniforms.view[1].xyz, uniforms.view[2].xyz);
    let t = transpose(view3) * j;
    var cov2d = transpose(t) * vrk * t;

    // Apply anti-aliasing low-pass filter (blur very small splats)
    // This prevents Moiré patterns when Gaussians project to sub-pixel sizes
    let antialias = uniforms.color_mix.w;
    cov2d[0][0] += antialias;  // Add variance to X
    cov2d[1][1] += antialias;  // Add variance to Y

    // =======================================================================
    // EIGENDECOMPOSITION OF 2D COVARIANCE
    // =======================================================================
    // For a 2×2 symmetric matrix:
    //   | a  b |
    //   | b  c |
    //
    // Eigenvalues: λ = (a+c)/2 ± sqrt(((a-c)/2)² + b²)
    // Eigenvector for λ₁: (b, λ₁-a) normalized
    //
    // The eigenvalues are the squared axis lengths of the ellipse.
    // The eigenvectors give the ellipse orientation.
    let mid = (cov2d[0][0] + cov2d[1][1]) * 0.5;  // (a+c)/2
    let radius = length(vec2<f32>((cov2d[0][0] - cov2d[1][1]) * 0.5, cov2d[0][1]));  // sqrt(...)
    let lambda1 = mid + radius;  // Larger eigenvalue (major axis²)
    let lambda2 = mid - radius;  // Smaller eigenvalue (minor axis²)

    // Degenerate covariance check (negative eigenvalue = invalid ellipse)
    if (lambda2 < 0.0) {
      var rejected: VSOut;
      rejected.position = vec4<f32>(0.0, 0.0, 2.0, 1.0);
      rejected.v_color = vec4<f32>(0.0);
      rejected.v_position = vec2<f32>(0.0);
      rejected.v_mode = point_mode;
      rejected.v_opacity = 0.0;
      return rejected;
    }

    // =======================================================================
    // COMPUTE ELLIPSE AXES
    // =======================================================================
    // Major axis direction: eigenvector for λ₁ = (b, λ₁-a) normalized
    // Minor axis direction: perpendicular to major = (major.y, -major.x)
    //
    // Axis length = sqrt(2λ) because we want the ellipse to cover ~95%
    // of the Gaussian's visible contribution (2σ ≈ 95% for Gaussian)
    let diag = normalize(vec2<f32>(cov2d[0][1], lambda1 - cov2d[0][0]));
    let splat_scale = uniforms.render_params.w;

    // Clamp axis lengths to prevent extremely large splats
    major_axis = min(sqrt(2.0 * lambda1), 1024.0) * diag * splat_scale;
    minor_axis = min(sqrt(2.0 * lambda2), 1024.0) * vec2<f32>(diag.y, -diag.x) * splat_scale;
  }

  // ==========================================================================
  // STEP 5: Position quad vertex in screen space
  // ==========================================================================
  // The quad_pos input is one of: (-2,-2), (2,-2), (-2,2), (2,2)
  // We position each corner along the major and minor axes:
  //   vertex_pos = center + quad_pos.x * major_axis + quad_pos.y * minor_axis
  //
  // The division by viewport converts from pixel coordinates to NDC [-1, 1]
  var out: VSOut;
  out.v_color = color * depth_tint;
  out.v_position = input.quad_pos;  // Pass local position to fragment shader
  out.v_mode = point_mode;
  out.v_opacity = uniforms.render_params.z;
  out.position = vec4<f32>(
    center_ndc
      + input.quad_pos.x * major_axis / uniforms.viewport
      + input.quad_pos.y * minor_axis / uniforms.viewport,
    0.0,  // z=0 (already depth-sorted by draw order)
    1.0   // w=1 (no perspective division needed)
  );
  return out;
}
`,Et=`/**
 * =============================================================================
 * 3D GAUSSIAN SPLATTING - FRAGMENT SHADER
 * =============================================================================
 *
 * This shader evaluates the Gaussian function at each pixel and applies
 * color grading effects.
 *
 * THE GAUSSIAN FUNCTION:
 * ----------------------
 * For a 2D Gaussian centered at origin with unit covariance:
 *   G(x, y) = exp(-0.5 * (x² + y²)) = exp(-0.5 * r²)
 *
 * This is evaluated in the local quad coordinate system where:
 *   - (0, 0) is the center of the Gaussian
 *   - The ellipse axes have been normalized to unit length
 *   - Coordinates range from [-2, 2] (covering ~95% of Gaussian volume)
 *
 * The vertex shader has already:
 *   1. Projected the 3D Gaussian to a 2D ellipse
 *   2. Scaled the quad to match the ellipse axes
 *   3. Positioned the quad in screen space
 *
 * So here we just evaluate exp(-0.5 * r²) at the interpolated position.
 *
 * ALPHA BLENDING:
 * ---------------
 * The output is PREMULTIPLIED ALPHA:
 *   output = (color * alpha, alpha)
 *
 * This is required by the blend configuration in the render pipeline:
 *   dst = src * (1 - dst.a) + dst
 *
 * With back-to-front draw order, this correctly composites all Gaussians.
 */

/** Uniform buffer (same as vertex shader) */
struct Uniforms {
  projection: mat4x4<f32>,
  view: mat4x4<f32>,
  focal: vec2<f32>,
  viewport: vec2<f32>,
  render_params: vec4<f32>,
  color_basic: vec4<f32>,
  color_levels: vec4<f32>,
  color_mix: vec4<f32>,
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

/** Interpolated data from vertex shader */
struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) v_color: vec4<f32>,
  @location(1) v_position: vec2<f32>,  // Local quad position for Gaussian eval
  @location(2) v_mode: f32,
  @location(3) v_opacity: f32,
}

/**
 * Apply color grading effects to RGB values.
 *
 * Processing order:
 * 1. Brightness (additive offset)
 * 2. Contrast (scaling around 0.5 midpoint)
 * 3. Shadow/highlight (lift/crush dark and light tones)
 * 4. Gamma (power curve)
 * 5. Intensity (multiplicative)
 * 6. Saturation (mix with luminance)
 * 7. Vibrance (selective saturation)
 * 8. Temperature/Tint (color balance)
 *
 * @param rgb_in Input RGB color [0, 1]
 * @return Graded RGB color [0, 1]
 */
fn apply_color_controls(rgb_in: vec3<f32>) -> vec3<f32> {
  // Extract parameters from uniforms
  let brightness = uniforms.color_basic.x;
  let contrast = max(uniforms.color_basic.y, 0.0);
  let gamma = max(uniforms.color_basic.z, 0.001);
  let black_level = uniforms.color_levels.x;
  let white_level = uniforms.color_levels.y;
  let intensity = max(uniforms.color_levels.z, 0.0);
  let saturate = max(uniforms.color_levels.w, 0.0);
  let vibrance = clamp(uniforms.color_mix.x, -1.0, 1.0);
  let temperature = uniforms.color_mix.y;
  let tint = uniforms.color_mix.z;

  // Step 1: Brightness (additive)
  var rgb = rgb_in + vec3<f32>(brightness);

  // Step 2: Contrast (scale around midpoint)
  rgb = (rgb - vec3<f32>(0.5)) * contrast + vec3<f32>(0.5);

  // Step 3: Shadow/highlight controls
  // Compute luminance for masking
  let luma_pre = clamp(dot(rgb, vec3<f32>(0.2126, 0.7152, 0.0722)), 0.0, 1.0);
  // Shadow mask: strong in dark areas, weak in bright
  let shadow_mask = pow(1.0 - luma_pre, 1.5);
  // Highlight mask: weak in dark areas, strong in bright
  let highlight_mask = pow(luma_pre, 1.5);
  // Apply black level (lift/crush shadows)
  rgb += vec3<f32>(black_level * shadow_mask * 0.7);
  // Apply white level (lift/crush highlights)
  rgb += vec3<f32>(white_level * highlight_mask * 0.7);
  rgb = clamp(rgb, vec3<f32>(0.0), vec3<f32>(1.0));

  // Step 4: Gamma correction
  rgb = pow(max(rgb, vec3<f32>(0.0)), vec3<f32>(1.0 / gamma));

  // Step 5: Intensity multiplier
  rgb *= intensity;

  // Step 6: Saturation (blend toward/away from grayscale)
  let luma = dot(rgb, vec3<f32>(0.2126, 0.7152, 0.0722));
  rgb = mix(vec3<f32>(luma), rgb, saturate);

  // Step 7: Vibrance (selective saturation - affects less-saturated colors more)
  let max_channel = max(max(rgb.r, rgb.g), rgb.b);
  let avg = (rgb.r + rgb.g + rgb.b) / 3.0;
  let vib_amount = (max_channel - avg) * (-vibrance * 3.0);
  rgb = mix(rgb, vec3<f32>(max_channel), vib_amount);

  // Step 8: Color temperature and tint
  // Temperature: shift red/blue balance (warm = +R -B, cool = -R +B)
  rgb += vec3<f32>(temperature * 0.2, 0.0, -temperature * 0.2);
  // Tint: shift green/magenta balance
  rgb += vec3<f32>(tint * 0.1, -tint * 0.2, tint * 0.1);

  return clamp(rgb, vec3<f32>(0.0), vec3<f32>(1.0));
}

/**
 * FRAGMENT SHADER MAIN - Evaluate Gaussian and Output Premultiplied Alpha
 *
 * The v_position input contains the local quad coordinates, which range
 * from approximately [-2, -2] to [2, 2] after vertex shader positioning.
 *
 * For the Gaussian evaluation:
 *   G(p) = exp(-0.5 * dot(p, p)) = exp(-0.5 * r²)
 *
 * At the edge (r=2): G(2) = exp(-2) ≈ 0.135 (13.5% opacity)
 * At center (r=0):   G(0) = exp(0) = 1.0 (100% opacity)
 */
@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  // Apply color grading to base color
  let rgb = apply_color_controls(input.v_color.rgb);
  let alpha_multiplier = clamp(uniforms.color_basic.w, 0.0, 1.0);

  if (input.v_mode > 0.5) {
    // ========================================================================
    // POINT CLOUD MODE
    // ========================================================================
    // Render as circular dots instead of soft Gaussians.
    // Discard fragments outside a radius of 2 (matching quad bounds).
    let r2 = dot(input.v_position, input.v_position);
    if (r2 > 4.0) {  // r² > 2² means outside circle
      discard;
    }
    // Premultiplied alpha output
    let alpha = input.v_color.a * input.v_opacity * alpha_multiplier;
    return vec4<f32>(rgb * alpha, alpha);
  }

  // ==========================================================================
  // GAUSSIAN SPLAT MODE
  // ==========================================================================
  // Evaluate the Gaussian function: G(p) = exp(-0.5 * r²)
  //
  // We use a = -dot(p, p) = -r² for efficiency,
  // so G = exp(a * 0.5)... wait, the code uses exp(a) which is exp(-r²).
  //
  // Actually: a = -dot(p, p) = -r², so exp(a) = exp(-r²)
  // This is a Gaussian with σ = 1/√2 instead of σ = 1.
  // The 2× scale in vertex shader compensates (we draw from -2 to 2).
  //
  // Cutoff at a < -4 (r > 2) to avoid wasting cycles on invisible fragments.
  let a = -dot(input.v_position, input.v_position);  // a = -r²
  if (a < -4.0) {
    discard;  // Too far from center, contribution negligible
  }

  // Gaussian falloff multiplied by base alpha and opacity
  // exp(a) where a = -r² gives the characteristic soft falloff
  let b = exp(a) * input.v_color.a * input.v_opacity * alpha_multiplier;

  // Output premultiplied alpha: (color * alpha, alpha)
  // This is required for the "one-minus-dst-alpha" blending mode
  return vec4<f32>(b * rgb, b);
}
`,Ue=`/**
 * =============================================================================
 * ANAGLYPH COMPOSITE SHADER - 3D Stereo Rendering (Red/Cyan Glasses)
 * =============================================================================
 *
 * This shader combines left and right eye renders into a single anaglyph image
 * viewable with red/cyan 3D glasses.
 *
 * HOW ANAGLYPH 3D WORKS:
 * ----------------------
 * 1. Scene is rendered twice: once for left eye, once for right eye
 * 2. Left/right views have slightly different camera positions (eye separation)
 * 3. Left eye view is filtered to RED channel only
 * 4. Right eye view is filtered to CYAN (green + blue) channels
 * 5. Combined image viewed through glasses:
 *    - Red lens (left eye): blocks cyan, sees only red = left view
 *    - Cyan lens (right eye): blocks red, sees only cyan = right view
 * 6. Brain fuses the two views into perceived depth
 *
 * This is the classic "dubois" or "true" anaglyph method.
 * More sophisticated methods use color correction matrices, but this
 * simple version works well for most 3DGS content.
 */

/** Vertex shader output / Fragment shader input */
struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
}

/**
 * Full-screen quad vertex shader.
 * Generates 4 vertices covering the entire screen in triangle-strip order.
 */
@vertex
fn vs_main(@builtin(vertex_index) vertex_index: u32) -> VSOut {
  // Define fullscreen quad corners (triangle strip order)
  var positions = array<vec2<f32>, 4>(
    vec2<f32>(-1.0, -1.0),  // Bottom-left
    vec2<f32>(1.0, -1.0),   // Bottom-right
    vec2<f32>(-1.0, 1.0),   // Top-left
    vec2<f32>(1.0, 1.0),    // Top-right
  );
  let pos = positions[vertex_index];

  var out: VSOut;
  out.position = vec4<f32>(pos, 0.0, 1.0);
  // Convert from NDC [-1,1] to UV [0,1], with Y flipped for texture sampling
  out.uv = vec2<f32>(pos.x * 0.5 + 0.5, 0.5 - pos.y * 0.5);
  return out;
}

/** Texture sampler for eye renders */
@group(0) @binding(0) var tex_sampler: sampler;
/** Left eye render (rendered with camera offset left) */
@group(0) @binding(1) var left_eye_tex: texture_2d<f32>;
/** Right eye render (rendered with camera offset right) */
@group(0) @binding(2) var right_eye_tex: texture_2d<f32>;

/**
 * Combine left/right eye views into anaglyph.
 *
 * Output:
 *   R = left.R  (viewed by left eye through red filter)
 *   G = right.G (viewed by right eye through cyan filter)
 *   B = right.B (viewed by right eye through cyan filter)
 */
@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  let left = textureSample(left_eye_tex, tex_sampler, input.uv);
  let right = textureSample(right_eye_tex, tex_sampler, input.uv);

  // Classic red/cyan anaglyph combination:
  // - Left eye contributes RED channel only
  // - Right eye contributes GREEN and BLUE (cyan) channels
  // When viewed through red/cyan glasses, each eye sees only its view
  return vec4<f32>(left.r, right.g, right.b, 1.0);
}
`,Ie=`/**
 * =============================================================================
 * CROSSFADE COMPOSITE SHADER - Blend Between Rendering Modes
 * =============================================================================
 *
 * This shader smoothly transitions between Gaussian splat rendering and
 * point cloud rendering. This is useful for:
 *
 * 1. Visual comparison of rendering modes
 * 2. Smooth transitions when switching modes
 * 3. Debugging and quality comparison
 *
 * HOW IT WORKS:
 * -------------
 * Both rendering modes are drawn to separate off-screen textures:
 *   - splat_tex: Full Gaussian splatting with soft ellipses
 *   - point_tex: Simple point cloud with hard dots
 *
 * This shader blends them using linear interpolation:
 *   output = splat * (1 - t) + point * t
 *
 * Where t is the transition value:
 *   - t = 0.0: 100% splat mode (smooth Gaussians)
 *   - t = 0.5: 50% blend (both visible)
 *   - t = 1.0: 100% point mode (discrete points)
 *
 * WHY USE A COMPOSITE PASS?
 * -------------------------
 * We can't blend the modes directly in a single pass because:
 * 1. Alpha blending is order-dependent (back-to-front)
 * 2. Splat and point modes have different alpha profiles
 * 3. Directly blending would require complex shader branching
 *
 * By rendering each mode separately then compositing, we get:
 * - Correct alpha compositing within each mode
 * - Clean transition between modes
 * - No shader complexity in the main render passes
 */

/** Vertex shader output / Fragment shader input */
struct VSOut {
  @builtin(position) position: vec4<f32>,
  @location(0) uv: vec2<f32>,
}

/**
 * Full-screen quad vertex shader.
 * Same as anaglyph composite - generates fullscreen triangle strip.
 */
@vertex
fn vs_main(@builtin(vertex_index) vertex_index: u32) -> VSOut {
  var positions = array<vec2<f32>, 4>(
    vec2<f32>(-1.0, -1.0),  // Bottom-left
    vec2<f32>(1.0, -1.0),   // Bottom-right
    vec2<f32>(-1.0, 1.0),   // Top-left
    vec2<f32>(1.0, 1.0),    // Top-right
  );
  let pos = positions[vertex_index];

  var out: VSOut;
  out.position = vec4<f32>(pos, 0.0, 1.0);
  // Convert NDC [-1,1] to UV [0,1] with Y flip
  out.uv = vec2<f32>(pos.x * 0.5 + 0.5, 0.5 - pos.y * 0.5);
  return out;
}

/** Texture sampler for both render targets */
@group(0) @binding(0) var tex_sampler: sampler;
/** Gaussian splat render (soft elliptical Gaussians) */
@group(0) @binding(1) var splat_tex: texture_2d<f32>;
/** Point cloud render (hard circular dots) */
@group(0) @binding(2) var point_tex: texture_2d<f32>;
/** Transition value: 0 = splat, 1 = points */
@group(0) @binding(3) var<uniform> t_value: f32;

/**
 * Blend between splat and point renders.
 *
 * Uses GLSL-style mix() function:
 *   mix(a, b, t) = a * (1 - t) + b * t
 *
 * This produces smooth visual transitions as t animates from 0 to 1.
 */
@fragment
fn fs_main(input: VSOut) -> @location(0) vec4<f32> {
  // Sample both render textures
  let splat = textureSample(splat_tex, tex_sampler, input.uv);
  let point = textureSample(point_tex, tex_sampler, input.uv);

  // Linear interpolation between modes
  // t=0: 100% splat, t=1: 100% point
  return mix(splat, point, t_value);
}
`,He=52,Ct=He*4;async function Mt(t){const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("No compatible GPU adapter found");const i=await e.requestDevice({requiredLimits:{maxStorageBufferBindingSize:e.limits.maxStorageBufferBindingSize,maxBufferSize:e.limits.maxBufferSize}}),n=t.getContext("webgpu");if(!n)throw new Error("Unable to create WebGPU canvas context");const r=navigator.gpu.getPreferredCanvasFormat(),s=h=>i.createBuffer({label:h,size:Ct,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),a=s("viewer uniforms"),p=s("viewer uniforms B"),f=s("viewer uniforms C"),g=s("viewer uniforms D"),y=new Float32Array([-2,-2,2,-2,-2,2,2,2]),w=i.createBuffer({label:"quad vertices",size:y.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});i.queue.writeBuffer(w,0,y);let x=8,m=4,c=0,d=i.createBuffer({label:"splat buffer",size:x*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),b=i.createBuffer({label:"sorted index buffer",size:m*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});const u=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),o=h=>i.createBindGroup({layout:u,entries:[{binding:0,resource:{buffer:h}},{binding:1,resource:{buffer:d}},{binding:2,resource:{buffer:b}}]}),v=()=>{E=o(a),D=o(p),P=o(f),M=o(g)};let E=o(a),D=o(p),P=o(f),M=o(g);const L=((h=GPUColorWrite.ALL)=>i.createRenderPipeline({layout:i.createPipelineLayout({bindGroupLayouts:[u]}),vertex:{module:i.createShaderModule({code:St}),entryPoint:"vs_main",buffers:[{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:0,format:"float32x2",offset:0}]}]},fragment:{module:i.createShaderModule({code:Et}),entryPoint:"fs_main",targets:[{format:r,blend:{color:{srcFactor:"one-minus-dst-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one-minus-dst-alpha",dstFactor:"one",operation:"add"}},writeMask:h}]},primitive:{topology:"triangle-strip"}}))(),O=i.createSampler({magFilter:"linear",minFilter:"linear"}),G=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}}]}),$=i.createRenderPipeline({layout:i.createPipelineLayout({bindGroupLayouts:[G]}),vertex:{module:i.createShaderModule({code:Ue}),entryPoint:"vs_main"},fragment:{module:i.createShaderModule({code:Ue}),entryPoint:"fs_main",targets:[{format:r}]},primitive:{topology:"triangle-strip"}}),B=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),Y=i.createRenderPipeline({layout:i.createPipelineLayout({bindGroupLayouts:[B]}),vertex:{module:i.createShaderModule({code:Ie}),entryPoint:"vs_main"},fragment:{module:i.createShaderModule({code:Ie}),entryPoint:"fs_main",targets:[{format:r}]},primitive:{topology:"triangle-strip"}}),W=i.createBuffer({label:"crossfade uniforms",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let ie=U(),ne=U(),Q=U(),pe=U(),xe=le(),fe=me(),se=1,we=0,be=0,l=0,A=0;const V=h=>{h<=x||(x=Ne(h),d.destroy(),d=i.createBuffer({label:"splat buffer",size:x*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),v())},X=h=>{h<=m||(m=Ne(h),b.destroy(),b=i.createBuffer({label:"sorted index buffer",size:m*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),v())},q=()=>{const h=Math.max(1,window.devicePixelRatio||1),I=Math.max(1,Math.round(t.clientWidth*h*se)),N=Math.max(1,Math.round(t.clientHeight*h*se));I===we&&N===be||(we=I,be=N,t.width=I,t.height=N,n.configure({device:i,format:r,alphaMode:"premultiplied"}),[ie,ne,Q,pe].forEach(ge=>ge.destroy()),ie=U(),ne=U(),Q=U(),pe=U(),xe=le(),fe=me())};window.addEventListener("resize",q),q();const S=new Float32Array(He),z=h=>{const I=performance.now(),N=(_,k,K,ee,ue,he,ye)=>{S.set(_,0),S.set(k,16),S[32]=h.focal[0],S[33]=h.focal[1],S[34]=K,S[35]=ee,S[36]=ue,S[37]=h.pointSize,S[38]=he,S[39]=h.splatScale,S[40]=h.brightness,S[41]=h.contrast,S[42]=h.gamma,S[43]=h.alpha,S[44]=h.blackLevel,S[45]=h.whiteLevel,S[46]=h.intensity,S[47]=h.saturate,S[48]=h.vibrance,S[49]=h.temperature,S[50]=h.tint,S[51]=h.antialias,i.queue.writeBuffer(ye,0,S)},ge=()=>{const _=[...h.projection];return _[0]*=2,_},re=Math.max(0,Math.min(1,h.transition)),Be=re>0&&re<1,ce=i.createCommandEncoder(),de=n.getCurrentTexture().createView(),ve=_=>{const k=ce.beginRenderPass({colorAttachments:[{view:_.targetView,clearValue:{r:0,g:0,b:0,a:0},loadOp:_.clear?"clear":"load",storeOp:"store"}]});k.setBindGroup(0,_.bg),k.setVertexBuffer(0,w),k.setViewport(_.viewportX,_.viewportY,_.viewportWidth,_.viewportHeight,0,1),N(_.projection,_.view,_.logicalViewportWidth,_.logicalViewportHeight,_.mode,_.opacity,_.ub),k.setPipeline(L),k.draw(4,c,0,0),k.end()},T=(_,k,K,ee,ue,he,ye,_e,Se,Me,Le,Pe,De,Ge,Ye)=>{if(Be)if(Ye)ve({targetView:_,view:k,viewportX:K,viewportY:ee,viewportWidth:ue,viewportHeight:he,logicalViewportWidth:ye,logicalViewportHeight:_e,projection:Se,clear:Me,mode:0,opacity:1-re,ub:Le,bg:Pe}),ve({targetView:_,view:k,viewportX:K,viewportY:ee,viewportWidth:ue,viewportHeight:he,logicalViewportWidth:ye,logicalViewportHeight:_e,projection:Se,clear:!1,mode:1,opacity:re,ub:De,bg:Ge});else{i.queue.writeBuffer(W,0,new Float32Array([re])),ve({targetView:Q.createView(),view:k,viewportX:0,viewportY:0,viewportWidth:ue,viewportHeight:he,logicalViewportWidth:ye,logicalViewportHeight:_e,projection:Se,clear:!0,mode:0,opacity:1,ub:Le,bg:Pe}),ve({targetView:pe.createView(),view:k,viewportX:0,viewportY:0,viewportWidth:ue,viewportHeight:he,logicalViewportWidth:ye,logicalViewportHeight:_e,projection:Se,clear:!0,mode:1,opacity:1,ub:De,bg:Ge});const oe=ce.beginRenderPass({colorAttachments:[{view:_,clearValue:{r:0,g:0,b:0,a:1},loadOp:Me?"clear":"load",storeOp:"store"}]});oe.setPipeline(Y),oe.setBindGroup(0,fe),oe.setViewport(K,ee,ue,he,0,1),oe.draw(4,1,0,0),oe.end()}else{const oe=re<.5?0:1;ve({targetView:_,view:k,viewportX:K,viewportY:ee,viewportWidth:ue,viewportHeight:he,logicalViewportWidth:ye,logicalViewportHeight:_e,projection:Se,clear:Me,mode:oe,opacity:1,ub:oe===0?Le:De,bg:oe===0?Pe:Ge})}};if(c>0&&h.stereoMode==="anaglyph"){T(ie.createView(),h.viewLeft,0,0,t.width,t.height,h.viewport[0],h.viewport[1],h.projection,!0,a,E,f,P,!1),T(ne.createView(),h.viewRight,0,0,t.width,t.height,h.viewport[0],h.viewport[1],h.projection,!0,p,D,g,M,!1);const _=ce.beginRenderPass({colorAttachments:[{view:de,clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]});_.setPipeline($),_.setBindGroup(0,xe),_.draw(4,1,0,0),_.end()}else if(c>0&&h.stereoMode==="sbs"){const _=Math.max(1,Math.floor(t.width/2)),k=ge(),K=Math.max(1,Math.floor(h.viewport[0]/2)),ee=Math.max(1,h.viewport[0]-K);T(de,h.viewLeft,0,0,_,t.height,K,h.viewport[1],k,!0,a,E,f,P,!0),T(de,h.viewRight,_,0,t.width-_,t.height,ee,h.viewport[1],k,!1,p,D,g,M,!0)}else c>0?T(de,h.view,0,0,t.width,t.height,h.viewport[0],h.viewport[1],h.projection,!0,a,E,f,P,!1):ce.beginRenderPass({colorAttachments:[{view:de,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]}).end();i.queue.submit([ce.finish()]),A=performance.now()-I},ae=(h,I)=>{if(I<=0||h.length<=0){c=0;return}const N=performance.now();V(h.length);const ge=new Uint32Array(h);i.queue.writeBuffer(d,0,ge),l+=performance.now()-N,c=I},J=h=>{if(h.length<=0){c=0;return}const I=performance.now();X(h.length);const N=new Uint32Array(h);i.queue.writeBuffer(b,0,N),l+=performance.now()-I,c=h.length},H=h=>{const I=Math.max(.3,Math.min(1,h)),N=Math.round(I*20)/20;Math.abs(N-se)<1e-6||(se=N,q())},Ae=()=>{const h={uploadMs:l,renderMs:A};return l=0,h};function U(){return i.createTexture({size:{width:Math.max(1,t.width),height:Math.max(1,t.height),depthOrArrayLayers:1},format:r,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})}function le(){return i.createBindGroup({layout:G,entries:[{binding:0,resource:O},{binding:1,resource:ie.createView()},{binding:2,resource:ne.createView()}]})}function me(){return i.createBindGroup({layout:B,entries:[{binding:0,resource:O},{binding:1,resource:Q.createView()},{binding:2,resource:pe.createView()},{binding:3,resource:{buffer:W}}]})}return{render:z,setSplatData:ae,setSortedIndices:J,setResolutionScale:H,consumeTimings:Ae}}function Ne(t){let e=1;for(;e<t;)e<<=1;return e}function Lt(t){const e=new Worker(new URL("/splat/assets/sort-worker.worker-B6EnETQq.js",import.meta.url),{type:"module"});return e.onmessage=i=>{var r,s,a;const n=i.data;if(n.type==="depth"){(r=t.onSortResult)==null||r.call(t,{depthIndex:new Uint32Array(n.depthIndex),vertexCount:n.vertexCount,sortMs:n.sortMs});return}if(n.type==="splat"){(s=t.onSplatData)==null||s.call(t,{splatData:new Uint32Array(n.splatData),vertexCount:n.vertexCount});return}n.type==="buffer"&&((a=t.onConvertedBuffer)==null||a.call(t,n.buffer,n.save))},{postViewProjection(i){e.postMessage({type:"view",viewProj:i})},postSplatBuffer(i,n){e.postMessage({type:"buffer",buffer:i,vertexCount:n},[i])},postPlyBuffer(i,n=!1){e.postMessage({type:"ply",buffer:i,save:n},[i])},terminate(){e.terminate()}}}const qe={pointCloud:!1,pointSize:.8,stereoMode:"off",fov:75,splatScale:1,antialias:.3,brightness:0,contrast:1,gamma:1,blackLevel:0,whiteLevel:0,intensity:1,saturate:1,vibrance:0,temperature:0,tint:0,alpha:1,animateCamera:!0,animationDuration:1350},Pt=[112,108,121,10];function Dt(t,e){return(t%e+e)%e}function Gt(t){if(!t)return null;try{const e=JSON.parse(decodeURIComponent(t));if(!Array.isArray(e)||e.length!==16)return null;const i=e.map(Number);return i.some(n=>Number.isNaN(n))?null:i}catch{return null}}function Tt(t){const e=t.map(i=>Math.round(i*100)/100);return JSON.stringify(e)}function Vt(t,e){const i=new Uint8Array(t),n=new Blob([i.buffer],{type:"application/octet-stream"}),r=URL.createObjectURL(n),s=document.createElement("a");s.download=e,s.href=r,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(r)}function $t(t){const e=new Uint8Array(t);return Pt.every((i,n)=>e[n]===i)}const F=ot();async function Bt(){if(!navigator.gpu){F.message.textContent="WebGPU is not available in this browser.";return}const t=await Mt(F.canvas),e=rt(F.canvas),i={...qe};let n=[...Xe],r=0,s=null,a=null,p=0;const f=l=>{i.animateCamera?(s=[...e.viewMatrix],a=[...l],p=performance.now()):(e.setViewMatrix(l),s=null,a=null)},g=l=>{const A=Math.hypot(l[0],l[1],l[2]);return A<1e-8?[0,0,1]:[l[0]/A,l[1]/A,l[2]/A]},y=(l,A)=>[l[1]*A[2]-l[2]*A[1],l[2]*A[0]-l[0]*A[2],l[0]*A[1]-l[1]*A[0]],w=l=>{const A={x:[1,0,0],"-x":[-1,0,0],y:[0,-1,0],"-y":[0,1,0],z:[0,0,-1],"-z":[0,0,1]},V=R(e.viewMatrix);if(!V)return null;const X=[V[12],V[13],V[14]],q=g([V[8],V[9],V[10]]),S=4,z=[X[0]+q[0]*S,X[1]+q[1]*S,X[2]+q[2]*S],ae=A[l],J=[z[0]+ae[0]*S,z[1]+ae[1]*S,z[2]+ae[2]*S],H=g([z[0]-J[0],z[1]-J[1],z[2]-J[2]]),Ae=Math.abs(H[1])>.98?[0,0,1]:[0,1,0],U=g(y(Ae,H)),le=g(y(H,U)),me=[U[0],U[1],U[2],0,le[0],le[1],le[2],0,H[0],H[1],H[2],0,J[0],J[1],J[2],1];return R(me)},x=lt(F.gizmo,{onAxisClick:l=>{e.setCarousel(!1);const A=w(l);A&&f(A)}}),m=l=>{if(!n.length)return;r=Dt(l,n.length);const A=n[r],V=Ke(A);f(V),e.camera.fx=A.fx,e.camera.fy=A.fy,e.setCarousel(!1)},c={selectedCamera:""};let d=null;const b=(l,A,V)=>{d&&d.destroy();const X=l.map((q,S)=>`${S+1}: ${q.img_name}`);c.selectedCamera=X[0]||"",d=A.add(c,"selectedCamera",X).name("Positions").onChange(q=>{const S=q.split(":")[0],z=Number.parseInt(S,10)-1;z>=0&&z<l.length&&V.onApplyCamera(z)})},u={onCamerasLoaded:(l,A,V)=>{n=l,b(l,A,V)},onApplyCamera:l=>{m(l)},onLogPose:()=>{const l=R(e.viewMatrix);if(!l)return;const A={id:crypto.randomUUID(),img_name:`custom_${n.length}`,width:F.canvas.width,height:F.canvas.height,position:[l[12],l[13],l[14]],rotation:[[l[0],l[4],l[8]],[l[1],l[5],l[9]],[l[2],l[6],l[10]]],fy:e.camera.fy,fx:e.camera.fx};console.log("Current Camera Pose:",JSON.stringify(A,null,2))},onReset:()=>{Object.assign(i,qe),o.controllersRecursive().forEach(l=>l.updateDisplay()),v()}},o=bt(i,u,F),v=st(F,i),E=o.folders.find(l=>l._title==="Camera");let D=0,P=0,M=1,C=performance.now(),L=0;const O=[...e.viewMatrix];let G=!1,$=0;const B=new Float32Array(16);let Y=0,W=!1;const ie=l=>{const A=Gt(l);return A?(e.setViewMatrix(A),e.setCarousel(!1),!0):!1},ne=()=>{location.hash=`#${encodeURIComponent(Tt(e.viewMatrix))}`},Q=Lt({onSortResult:({depthIndex:l,sortMs:A})=>{t.setSortedIndices(l),Y=A,W=!0},onSplatData:({splatData:l,vertexCount:A})=>{D=A,t.setSplatData(l,A),Ce(F),F.dropzone.classList.add("hidden"),nt(l,A,e)},onConvertedBuffer:(l,A)=>{const V=new Uint8Array(l);D=Math.floor(V.byteLength/Oe),Q.postSplatBuffer(l,D),A&&Vt(V,"model.splat")}});ie(location.hash.slice(1))||m(r),At({applyCamera:m,getCurrentCameraIndex:()=>r,saveViewToHash:ne,setCarousel:l=>e.setCarousel(l)}),window.addEventListener("hashchange",()=>{ie(location.hash.slice(1))}),_t({dropzone:F.dropzone,onFile:async l=>{if(e.setCarousel(!1),je(F),/\.json$/i.test(l.name)){const V=JSON.parse(await l.text());Array.isArray(V)&&V.length>0&&(n=V,E&&b(V,E,u),m(0),Ce(F));return}const A=await l.arrayBuffer();if($t(A)){Q.postPlyBuffer(A,!1);return}D=Math.floor(A.byteLength/Oe),Q.postSplatBuffer(A,D)}}),F.progress.style.display="none",F.message.textContent="";let pe=performance.now(),xe=0,fe=0,se=0,we=0;const be=l=>{const A=Math.max(l-pe,1e-4),V=Math.min(A,34);if(pe=l,e.update(V),x.update(e.viewMatrix),e.isInteracting&&(s=null,a=null),s&&a){const T=l-p,_=Math.max(i.animationDuration,1),k=Math.min(T/_,1),K=k*k*(3-2*k),ee=it(s,a,K);e.setViewMatrix(ee),k>=1&&(s=null,a=null)}let X=0;for(let T=0;T<16;T++){const _=e.viewMatrix[T];X+=Math.abs(_-O[T]),O[T]=_}X>1e-4&&(C=l);const q=l-C<140,S=l-L>180;i.pointCloud?M!==1&&(M=1,L=l,t.setResolutionScale(M)):q&&M>.7&&S?(M=.7,L=l,t.setResolutionScale(M)):!q&&M<1&&S&&(M=M<.85?.85:1,L=l,t.setResolutionScale(M));const z=i.pointCloud?1:0;if(P!==z){const T=A/500*Math.sign(z-P);P=z>P?Math.min(z,P+T):Math.max(z,P+T),Math.abs(P-z)<.001&&(P=z)}const ae=Math.max(1,window.devicePixelRatio||1),J=Math.max(1,Math.round(F.canvas.clientWidth*ae)),H=Math.max(1,Math.round(F.canvas.clientHeight*ae)),Ae=i.fov*Math.PI/180,U=H/(2*Math.tan(Ae/2)),le=e.camera.fx/Math.max(e.camera.fy,1e-6),me=U*le,h=Je(me,U,J,H),I=Ze(h,e.viewMatrix);let N=0;for(let T=0;T<16;T++)N=Math.max(N,Math.abs(I[T]-B[T]));const ge=q?28:85,re=l-$;if(!G||N>5e-4&&re>=ge||re>=220){Q.postViewProjection(I);for(let T=0;T<16;T++)B[T]=I[T];G=!0,$=l}const ce=i.stereoMode==="anaglyph"?.04:.065;t.render({projection:h,view:e.viewMatrix,viewLeft:ze(e.viewMatrix,-ce),viewRight:ze(e.viewMatrix,ce),focal:[me,U],viewport:[J,H],transition:P,pointSize:i.pointSize,splatScale:i.splatScale,antialias:i.antialias,stereoMode:i.stereoMode,brightness:i.brightness,contrast:i.contrast,gamma:i.gamma,blackLevel:i.blackLevel,whiteLevel:i.whiteLevel,intensity:i.intensity,saturate:i.saturate,vibrance:i.vibrance,temperature:i.temperature,tint:i.tint,alpha:i.alpha});const de=t.consumeTimings(),ve=1e3/A;xe=xe*.9+ve*.1,se=se*.85+de.uploadMs*.15,we=we*.85+de.renderMs*.15,W?(fe=fe*.75+Y*.25,W=!1):fe*=.99,F.fps.textContent=`${Math.round(xe)} fps | ${D.toLocaleString()} pts | sort ${fe.toFixed(1)}ms | upload ${se.toFixed(2)}ms | render ${we.toFixed(2)}ms`,requestAnimationFrame(be)};window.addEventListener("beforeunload",()=>Q.terminate()),window.addEventListener("beforeunload",()=>o.destroy()),window.addEventListener("beforeunload",()=>x.destroy()),requestAnimationFrame(be)}Bt().catch(t=>{const e=t instanceof Error?t.message:String(t);F.message.textContent=`Renderer init failed: ${e}`});
