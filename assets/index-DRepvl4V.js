(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();const Je={fx:1159.5880733038064,fy:1164.6601287484507},Ke=[{id:0,img_name:"00001",width:1959,height:1090,position:[-3.0089893469241797,-.11086489695181866,-3.7527640949141428],rotation:[[.877318,0,.479909],[.013344,.999613,-.024394],[-.479724,.027805,.876979]],fy:1164.6601287484507,fx:1159.5880733038064},{id:1,img_name:"00009",width:1959,height:1090,position:[-2.5199776022057296,-.09704735754873686,-3.6247725540304545],rotation:[[.9982731285632193,-.011928707708098955,-.05751927260507243],[.0065061360949636325,.9955928229282383,-.09355533724430458],[.058381769258182864,.09301955098900708,.9939511719154457]],fy:1164.6601287484507,fx:1159.5880733038064},{id:2,img_name:"00017",width:1959,height:1090,position:[-.7737533667465242,-.3364271945329695,-2.9358969417573753],rotation:[[.9998813418672372,.013742375651625236,-.0069605529394208224],[-.014268370388586709,.996512943252834,-.08220929105659476],[.00580653013657589,.08229885200307129,.9965907801935302]],fy:1164.6601287484507,fx:1159.5880733038064},{id:3,img_name:"00025",width:1959,height:1090,position:[1.2198221749590001,-.2196687861401182,-2.3183162007028453],rotation:[[.9208648867765482,.0012010625395201253,.389880004297208],[-.06298204172269357,.987319521752825,.14571693239364383],[-.3847611242348369,-.1587410451475895,.9092635249821667]],fy:1164.6601287484507,fx:1159.5880733038064},{id:4,img_name:"00033",width:1959,height:1090,position:[1.742387858893817,-.13848225198886954,-2.0566370113193146],rotation:[[.24669889292141334,-.08370189346592856,-.9654706879349405],[.11343747891376445,.9919082664242816,-.05700815184573074],[.9624300466054861,-.09545671285663988,.2541976029815521]],fy:1164.6601287484507,fx:1159.5880733038064},{id:5,img_name:"00041",width:1959,height:1090,position:[3.6567309419223935,-.16470990600750707,-1.3458085590422042],rotation:[[.2341293058324528,-.02968330457755884,-.9717522161434825],[.10270823606832301,.99469554638321,-.005638106875665722],[.9667649592295676,-.09848690996657204,.2359360976431732]],fy:1164.6601287484507,fx:1159.5880733038064},{id:6,img_name:"00049",width:1959,height:1090,position:[3.9013554243203497,-.2597500978038105,-.8106154188297828],rotation:[[.6717235545638952,-.015718162115524837,-.7406351366386528],[.055627354673906296,.9980224478387622,.029270992841185218],[.7387104058127439,-.060861588786650656,.6712695459756353]],fy:1164.6601287484507,fx:1159.5880733038064},{id:7,img_name:"00057",width:1959,height:1090,position:[4.742994605467533,-.05591660945412069,.9500365976084458],rotation:[[-.17042655709210375,.01207080756938,-.9852964448542146],[.1165090336695526,.9931575292530063,-.00798543433078162],[.9784581921120181,-.1161568667478904,-.1706667764862097]],fy:1164.6601287484507,fx:1159.5880733038064},{id:8,img_name:"00065",width:1959,height:1090,position:[4.34676307626522,.08168160516967145,1.0876221470355405],rotation:[[-.003575447631888379,-.044792503246552894,-.9989899137764799],[.10770152645126597,.9931680875192705,-.04491693593046672],[.9941768441149182,-.10775333677534978,.0012732004866391048]],fy:1164.6601287484507,fx:1159.5880733038064},{id:9,img_name:"00073",width:1959,height:1090,position:[3.264984351114202,.078974937336732,1.0117200284114904],rotation:[[-.026919994628162257,-.1565891128261527,-.9872968974090509],[.08444552208239385,.983768234577625,-.1583319754069128],[.9960643893290491,-.0876350978794554,-.013259786205163005]],fy:1164.6601287484507,fx:1159.5880733038064}],ke=[.471108,-.01768,.88,0,0,.999799,.02,0,-.882075,-.009442,.47,0,.07,.03,6.55,1];function Ze(t,e,i,n){return[2*t/i,0,0,0,0,-(2*e)/n,0,0,0,0,200/(200-.2),1,0,0,-40/(200-.2),0]}function Qe(t){const e=t.rotation.flat(),i=t.position,n=-i[0]*e[0]-i[1]*e[3]-i[2]*e[6],r=-i[0]*e[1]-i[1]*e[4]-i[2]*e[7],s=-i[0]*e[2]-i[1]*e[5]-i[2]*e[8];return[e[0],e[1],e[2],0,e[3],e[4],e[5],0,e[6],e[7],e[8],0,n,r,s,1]}function et(t,e){return[e[0]*t[0]+e[1]*t[4]+e[2]*t[8]+e[3]*t[12],e[0]*t[1]+e[1]*t[5]+e[2]*t[9]+e[3]*t[13],e[0]*t[2]+e[1]*t[6]+e[2]*t[10]+e[3]*t[14],e[0]*t[3]+e[1]*t[7]+e[2]*t[11]+e[3]*t[15],e[4]*t[0]+e[5]*t[4]+e[6]*t[8]+e[7]*t[12],e[4]*t[1]+e[5]*t[5]+e[6]*t[9]+e[7]*t[13],e[4]*t[2]+e[5]*t[6]+e[6]*t[10]+e[7]*t[14],e[4]*t[3]+e[5]*t[7]+e[6]*t[11]+e[7]*t[15],e[8]*t[0]+e[9]*t[4]+e[10]*t[8]+e[11]*t[12],e[8]*t[1]+e[9]*t[5]+e[10]*t[9]+e[11]*t[13],e[8]*t[2]+e[9]*t[6]+e[10]*t[10]+e[11]*t[14],e[8]*t[3]+e[9]*t[7]+e[10]*t[11]+e[11]*t[15],e[12]*t[0]+e[13]*t[4]+e[14]*t[8]+e[15]*t[12],e[12]*t[1]+e[13]*t[5]+e[14]*t[9]+e[15]*t[13],e[12]*t[2]+e[13]*t[6]+e[14]*t[10]+e[15]*t[14],e[12]*t[3]+e[13]*t[7]+e[14]*t[11]+e[15]*t[15]]}function k(t){const e=t[0]*t[5]-t[1]*t[4],i=t[0]*t[6]-t[2]*t[4],n=t[0]*t[7]-t[3]*t[4],r=t[1]*t[6]-t[2]*t[5],s=t[1]*t[7]-t[3]*t[5],a=t[2]*t[7]-t[3]*t[6],f=t[8]*t[13]-t[9]*t[12],h=t[8]*t[14]-t[10]*t[12],w=t[8]*t[15]-t[11]*t[12],y=t[9]*t[14]-t[10]*t[13],v=t[9]*t[15]-t[11]*t[13],A=t[10]*t[15]-t[11]*t[14],g=e*A-i*v+n*y+r*w-s*h+a*f;return g?[(t[5]*A-t[6]*v+t[7]*y)/g,(t[2]*v-t[1]*A-t[3]*y)/g,(t[13]*a-t[14]*s+t[15]*r)/g,(t[10]*s-t[9]*a-t[11]*r)/g,(t[6]*w-t[4]*A-t[7]*h)/g,(t[0]*A-t[2]*w+t[3]*h)/g,(t[14]*n-t[12]*a-t[15]*i)/g,(t[8]*a-t[10]*n+t[11]*i)/g,(t[4]*v-t[5]*w+t[7]*f)/g,(t[1]*w-t[0]*v-t[3]*f)/g,(t[12]*s-t[13]*n+t[15]*e)/g,(t[9]*n-t[8]*s-t[11]*e)/g,(t[5]*h-t[4]*y-t[6]*f)/g,(t[0]*y-t[1]*h+t[2]*f)/g,(t[13]*i-t[12]*r-t[14]*e)/g,(t[8]*r-t[9]*i+t[10]*e)/g]:null}function ne(t,e,i,n,r){const s=Math.hypot(i,n,r);if(!s)return t;i/=s,n/=s,r/=s;const a=Math.sin(e),f=Math.cos(e),h=1-f,w=i*i*h+f,y=n*i*h+r*a,v=r*i*h-n*a,A=i*n*h-r*a,g=n*n*h+f,c=r*n*h+i*a,d=i*r*h+n*a,b=n*r*h-i*a,m=r*r*h+f;return[t[0]*w+t[4]*y+t[8]*v,t[1]*w+t[5]*y+t[9]*v,t[2]*w+t[6]*y+t[10]*v,t[3]*w+t[7]*y+t[11]*v,t[0]*A+t[4]*g+t[8]*c,t[1]*A+t[5]*g+t[9]*c,t[2]*A+t[6]*g+t[10]*c,t[3]*A+t[7]*g+t[11]*c,t[0]*d+t[4]*b+t[8]*m,t[1]*d+t[5]*b+t[9]*m,t[2]*d+t[6]*b+t[10]*m,t[3]*d+t[7]*b+t[11]*m,...t.slice(12,16)]}function W(t,e,i,n){return[...t.slice(0,12),t[0]*e+t[4]*i+t[8]*n+t[12],t[1]*e+t[5]*i+t[9]*n+t[13],t[2]*e+t[6]*i+t[10]*n+t[14],t[3]*e+t[7]*i+t[11]*n+t[15]]}function Re(t){const e=k(t);if(!e)return{position:[0,0,0],quaternion:[0,0,0,1]};const i=[e[12],e[13],e[14]],n=e[0],r=e[1],s=e[2],a=e[4],f=e[5],h=e[6],w=e[8],y=e[9],v=e[10],A=n+f+v;let g,c,d,b;if(A>0){const o=.5/Math.sqrt(A+1);b=.25/o,g=(h-y)*o,c=(w-s)*o,d=(r-a)*o}else if(n>f&&n>v){const o=2*Math.sqrt(1+n-f-v);b=(h-y)/o,g=.25*o,c=(a+r)/o,d=(w+s)/o}else if(f>v){const o=2*Math.sqrt(1+f-n-v);b=(w-s)/o,g=(a+r)/o,c=.25*o,d=(y+h)/o}else{const o=2*Math.sqrt(1+v-n-f);b=(r-a)/o,g=(w+s)/o,c=(y+h)/o,d=.25*o}const m=Math.sqrt(g*g+c*c+d*d+b*b);return m>1e-6&&(g/=m,c/=m,d/=m,b/=m),{position:i,quaternion:[g,c,d,b]}}function tt(t,e){const[i,n,r,s]=e,a=i*i,f=n*n,h=r*r,w=i*n,y=i*r,v=n*r,A=s*i,g=s*n,c=s*r,d=1-2*(f+h),b=2*(w-c),m=2*(y+g),o=2*(w+c),l=1-2*(a+h),x=2*(v-A),P=2*(y-g),O=2*(v+A),q=1-2*(a+f),M=-(d*t[0]+o*t[1]+P*t[2]),E=-(b*t[0]+l*t[1]+O*t[2]),$=-(m*t[0]+x*t[1]+q*t[2]);return[d,b,m,0,o,l,x,0,P,O,q,0,M,E,$,1]}function it(t,e,i){let[n,r,s,a]=t,[f,h,w,y]=e,v=n*f+r*h+s*w+a*y;if(v<0&&(f=-f,h=-h,w=-w,y=-y,v=-v),v>.9995){const b=n+i*(f-n),m=r+i*(h-r),o=s+i*(w-s),l=a+i*(y-a),x=Math.sqrt(b*b+m*m+o*o+l*l);return[b/x,m/x,o/x,l/x]}const A=Math.acos(v),g=Math.sin(A),c=Math.sin((1-i)*A)/g,d=Math.sin(i*A)/g;return[c*n+d*f,c*r+d*h,c*s+d*w,c*a+d*y]}function nt(t,e,i){return[t[0]+i*(e[0]-t[0]),t[1]+i*(e[1]-t[1]),t[2]+i*(e[2]-t[2])]}function rt(t,e,i){const n=Re(t),r=Re(e),s=nt(n.position,r.position,i),a=it(n.quaternion,r.quaternion,i);return tt(s,a)}function Fe(t,e){const i=k(t);if(!i)return t;const n=W(i,e,0,0);return k(n)??t}function st(t,e,i){if(e===0)return;let n=0,r=0,s=0;const a=Math.min(e,1e4),f=Math.floor(e/a)*8;for(let c=0;c<a;c++){const d=new Float32Array(t.buffer,c*f*4,1)[0],b=new Float32Array(t.buffer,(c*f+1)*4,1)[0],m=new Float32Array(t.buffer,(c*f+2)*4,1)[0];n+=d,r+=b,s+=m}const h=[n/a,r/a,s/a],w=[i.viewMatrix[0],i.viewMatrix[4],i.viewMatrix[8]],y=[i.viewMatrix[1],i.viewMatrix[5],i.viewMatrix[9]],v=[i.viewMatrix[2],i.viewMatrix[6],i.viewMatrix[10]],A=h,g=[w[0],y[0],v[0],0,w[1],y[1],v[1],0,w[2],y[2],v[2],0,-A[0]*w[0]-A[1]*y[0]-A[2]*v[0],-A[0]*w[1]-A[1]*y[1]-A[2]*v[1],-A[0]*w[2]-A[1]*y[2]-A[2]*v[2],1];i.setViewMatrix(g)}function ot(t,e={}){let i=[...ke],n=!1,r=performance.now();const s=new Set;let a=!1,f="orbit",h=0,w=0,y=0;const v=.92,A=.5;let g={dx:0,dy:0},c={dx:0,dy:0},d=0,b=0;const m=()=>{g={dx:0,dy:0},c={dx:0,dy:0},d=0,b=0};window.addEventListener("keydown",l=>{var x;s.add(l.code),(x=e.onInvalidate)==null||x.call(e)}),window.addEventListener("keyup",l=>{var x;s.delete(l.code),(x=e.onInvalidate)==null||x.call(e)}),window.addEventListener("blur",()=>{var l;s.clear(),(l=e.onInvalidate)==null||l.call(e)}),t.addEventListener("mousedown",l=>{var x;l.preventDefault(),n=!1,a=!0,l.shiftKey?f="roll":l.ctrlKey||l.metaKey||l.button===2?f="pan":f="orbit",h=l.clientX,w=l.clientY,y=performance.now(),m(),(x=e.onInvalidate)==null||x.call(e)}),t.addEventListener("mouseup",()=>{var l;performance.now()-y>80&&m(),a=!1,(l=e.onInvalidate)==null||l.call(e)}),t.addEventListener("mouseleave",()=>{var l;a=!1,(l=e.onInvalidate)==null||l.call(e)}),t.addEventListener("contextmenu",l=>{l.preventDefault()}),t.addEventListener("mousemove",l=>{var E;if(!a)return;l.preventDefault();const x=(l.clientX-h)/Math.max(window.innerWidth,1),P=(l.clientY-w)/Math.max(window.innerHeight,1);if(h=l.clientX,w=l.clientY,y=performance.now(),(E=e.onInvalidate)==null||E.call(e),Math.abs(x)<1e-10&&Math.abs(P)<1e-10)return;let O=x,q=P;const M=k(i);if(M)if(f==="orbit"){let R=W(M,0,0,4);const L=[i[4],i[5],i[6]],T=Math.hypot(L[0],L[1],L[2]);T>1e-6&&(R=ne(R,5*O,L[0]/T,L[1]/T,L[2]/T)),R=ne(R,-5*q,1,0,0),R=W(R,0,0,-4);const z=k(R);z&&(i=z),g={dx:O,dy:q}}else if(f==="roll"){const $=k(ne(M,5*x,0,0,1));$&&(i=$),d=x}else{const $=W(M,-10*x,-10*P,0),R=k($);R&&(i=R),c={dx:x,dy:P}}}),t.addEventListener("wheel",l=>{var x;l.preventDefault(),n=!1,b+=-10*l.deltaY/Math.max(window.innerHeight,1),(x=e.onInvalidate)==null||x.call(e)},{passive:!1});const o=l=>{if(n){const L=Math.sin((performance.now()-r)/5e3);let T=k(ke);if(!T)return;T=W(T,2.5*L,0,6*(1-Math.cos(L))),T=ne(T,-.6*L,0,1,0);const z=k(T);z&&(i=z);return}const x=l/(1e3/60),P=Math.pow(v,x);if(!a&&(Math.abs(g.dx)>1e-5||Math.abs(g.dy)>1e-5)){const L=k(i);if(L){let z=W(L,0,0,4);const X=[i[4],i[5],i[6]],J=Math.hypot(X[0],X[1],X[2]);J>1e-6&&(z=ne(z,5*g.dx*x,X[0]/J,X[1]/J,X[2]/J));const re=-5*g.dy*x;z=ne(z,re,1,0,0),z=W(z,0,0,-4);const K=k(z);K&&(i=K)}g.dx*=P,g.dy*=P}if(!a&&Math.abs(d)>1e-5){const L=k(i);if(L){const T=k(ne(L,5*d*x,0,0,1));T&&(i=T)}d*=P}if(!a&&(Math.abs(c.dx)>1e-5||Math.abs(c.dy)>1e-5)){const L=k(i);if(L){const T=W(L,-10*c.dx*x,-10*c.dy*x,0),z=k(T);z&&(i=z)}c.dx*=P,c.dy*=P}if(Math.abs(b)>1e-5){const L=k(i);if(L){const T=W(L,0,0,b*x),z=k(T);z&&(i=z)}b*=Math.pow(A,x)}const O=k(i);if(!O)return;const q=.003*l,M=8e-4*l;let E=O,$=!1;if(s.has("ArrowUp")&&(E=W(E,0,0,q),$=!0),s.has("ArrowDown")&&(E=W(E,0,0,-q),$=!0),s.has("ArrowLeft")&&(E=W(E,-q,0,0),$=!0),s.has("ArrowRight")&&(E=W(E,q,0,0),$=!0),s.has("KeyA")&&(E=ne(E,-M,0,1,0),$=!0),s.has("KeyD")&&(E=ne(E,M,0,1,0),$=!0),s.has("KeyW")&&(E=ne(E,M*.7,1,0,0),$=!0),s.has("KeyS")&&(E=ne(E,-M*.7,1,0,0),$=!0),!$)return;const R=k(E);R&&(i=R)};return{camera:{...Je},get viewMatrix(){return i},get isInteracting(){return a||s.size>0},setViewMatrix(l){var x;i=[...l],m(),(x=e.onInvalidate)==null||x.call(e)},setCarousel(l){var x;n=l,l&&(r=performance.now(),m()),(x=e.onInvalidate)==null||x.call(e)},update:o}}function at(){const t=document.querySelector("#app");if(!t)throw new Error("Missing #app root element");const e=t.querySelector("#canvas"),i=t.querySelector("#gizmo"),n=t.querySelector("#message"),r=t.querySelector("#spinner"),s=t.querySelector("#fps"),a=t.querySelector("#progress"),f=t.querySelector("#dropzone"),h=t.querySelector("#btn-anaglyph"),w=t.querySelector("#btn-stereo");if(!e||!i||!n||!r||!s||!a||!f||!h||!w)throw new Error("Missing viewer DOM nodes");return{canvas:e,gizmo:i,message:n,spinner:r,fps:s,progress:a,dropzone:f,anaglyphButton:h,stereoButton:w}}function je(t){t.spinner.classList.remove("hidden"),t.dropzone.classList.add("hidden")}function Te(t){t.spinner.classList.add("hidden")}function lt(t,e,i){const n=()=>{const r=e.stereoMode==="anaglyph",s=e.stereoMode==="sbs";t.anaglyphButton.classList.toggle("active",r),t.stereoButton.classList.toggle("active",s),t.anaglyphButton.setAttribute("aria-pressed",String(r)),t.stereoButton.setAttribute("aria-pressed",String(s))};return t.anaglyphButton.addEventListener("click",()=>{e.stereoMode=e.stereoMode==="anaglyph"?"off":"anaglyph",n(),i==null||i()}),t.stereoButton.addEventListener("click",()=>{e.stereoMode=e.stereoMode==="sbs"?"off":"sbs",n(),i==null||i()}),n(),n}const ct=[{key:"x",vector:[1,0,0],color:"#ff4a4a",label:"X",filled:!0,flipVertical:!0},{key:"-x",vector:[-1,0,0],color:"#ff4a4a",label:"",filled:!1,flipVertical:!0},{key:"y",vector:[0,-1,0],color:"#45ff57",label:"Y",filled:!0,flipVertical:!0},{key:"-y",vector:[0,1,0],color:"#45ff57",label:"",filled:!1,flipVertical:!0},{key:"z",vector:[0,0,-1],color:"#6870ff",label:"Z",filled:!0,flipVertical:!0},{key:"-z",vector:[0,0,1],color:"#6870ff",label:"",filled:!1,flipVertical:!0}];function dt(t,e={}){const i=t.getContext("2d");if(!i)throw new Error("Unable to create camera gizmo 2D context");const n=120,r=n*.5,s=46,a=13,f=a+3;let h=[];const w=(c,d)=>{const b=c[0]*d[0]+c[4]*d[1]+c[8]*d[2],m=c[1]*d[0]+c[5]*d[1]+c[9]*d[2],o=c[2]*d[0]+c[6]*d[1]+c[10]*d[2];return{x:b,y:m,z:o}},y=(c,d,b,m,o,l)=>{i.save(),i.globalAlpha=l,i.lineWidth=4,i.strokeStyle=b,m?(i.fillStyle=b,i.beginPath(),i.arc(c,d,a,0,Math.PI*2),i.fill(),o&&(i.fillStyle="#000000",i.font="bold 15px sans-serif",i.textAlign="center",i.textBaseline="middle",i.fillText(o,c,d+.5))):(i.fillStyle="#1a2127",i.beginPath(),i.arc(c,d,a,0,Math.PI*2),i.fill(),i.stroke()),i.restore()},v=(c,d,b,m)=>{const o=c-r,l=d-r;o*o+l*l<2||(i.save(),i.globalAlpha=m,i.strokeStyle=b,i.lineWidth=4,i.lineCap="round",i.beginPath(),i.moveTo(r,r),i.lineTo(c,d),i.stroke(),i.restore())},A=c=>{var x;const d=t.getBoundingClientRect();if(d.width<=0||d.height<=0)return;const b=c.clientX-d.left,m=c.clientY-d.top;let o=null,l=1/0;for(const P of h){const O=b-P.cx,q=m-P.cy,M=O*O+q*q;M>f*f||(!o||M<l||P.depth<o.depth)&&(o=P,l=M)}o&&(c.preventDefault(),c.stopPropagation(),(x=e.onAxisClick)==null||x.call(e,o.key))};return t.addEventListener("pointerdown",A),{update:c=>{const d=Math.max(1,window.devicePixelRatio||1),b=Math.round(n*d);(t.width!==b||t.height!==b)&&(t.width=b,t.height=b,t.style.width=`${n}px`,t.style.height=`${n}px`),i.setTransform(d,0,0,d,0,0),i.clearRect(0,0,n,n);const m=ct.map(o=>{const l=w(c,o.vector);return{...o,cx:r+l.x*s,cy:r+(o.flipVertical?1:-1)*l.y*s,depth:l.z}});h=m.map(o=>({key:o.key,cx:o.cx,cy:o.cy,depth:o.depth}));for(const o of m)if(o.filled){const l=Math.max(.45,Math.min(1,.85-o.depth*.25));v(o.cx,o.cy,o.color,l)}m.sort((o,l)=>l.depth-o.depth);for(const o of m){const l=Math.max(.4,Math.min(1,.85-o.depth*.25));y(o.cx,o.cy,o.color,o.filled,o.label,l)}},destroy(){t.removeEventListener("pointerdown",A)}}}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class le{constructor(e,i,n,r,s="div"){this.parent=e,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),le.nextNameID=le.nextNameID||0,this.$name.id=`lil-gui-name-${++le.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const i=this.parent.add(this.object,this.property,e);return i.name(this._name),this.destroy(),i}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class ut extends le{constructor(e,i,n){super(e,i,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function qe(t){let e,i;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),i?"#"+i:!1}const ht={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:qe,toHexString:qe},Ge={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},pt={isPrimitive:!1,match:t=>Array.isArray(t),fromHexString(t,e,i=1){const n=Ge.fromHexString(t);e[0]=(n>>16&255)/255*i,e[1]=(n>>8&255)/255*i,e[2]=(n&255)/255*i},toHexString([t,e,i],n=1){n=255/n;const r=t*n<<16^e*n<<8^i*n<<0;return Ge.toHexString(r)}},ft={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,i=1){const n=Ge.fromHexString(t);e.r=(n>>16&255)/255*i,e.g=(n>>8&255)/255*i,e.b=(n&255)/255*i},toHexString({r:t,g:e,b:i},n=1){n=255/n;const r=t*n<<16^e*n<<8^i*n<<0;return Ge.toHexString(r)}},mt=[ht,Ge,pt,ft];function gt(t){return mt.find(e=>e.match(t))}class vt extends le{constructor(e,i,n,r){super(e,i,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=gt(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=qe(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const i=this._format.fromHexString(e);this.setValue(i)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class ze extends le{constructor(e,i,n){super(e,i,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class yt extends le{constructor(e,i,n,r,s,a){super(e,i,n,"number"),this._initInput(),this.min(r),this.max(s);const f=a!==void 0;this.step(f?a:this._getImplicitStep(),f),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,i=!0){return this._step=e,this._stepExplicit=i,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let i=(e-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let o=parseFloat(this.$input.value);isNaN(o)||(this._stepExplicit&&(o=this._snap(o)),this.setValue(this._clamp(o)))},n=o=>{const l=parseFloat(this.$input.value);isNaN(l)||(this._snapClampSetValue(l+o),this.$input.value=this.getValue())},r=o=>{o.key==="Enter"&&this.$input.blur(),o.code==="ArrowUp"&&(o.preventDefault(),n(this._step*this._arrowKeyMultiplier(o))),o.code==="ArrowDown"&&(o.preventDefault(),n(this._step*this._arrowKeyMultiplier(o)*-1))},s=o=>{this._inputFocused&&(o.preventDefault(),n(this._step*this._normalizeMouseWheel(o)))};let a=!1,f,h,w,y,v;const A=5,g=o=>{f=o.clientX,h=w=o.clientY,a=!0,y=this.getValue(),v=0,window.addEventListener("mousemove",c),window.addEventListener("mouseup",d)},c=o=>{if(a){const l=o.clientX-f,x=o.clientY-h;Math.abs(x)>A?(o.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(l)>A&&d()}if(!a){const l=o.clientY-w;v-=l*this._step*this._arrowKeyMultiplier(o),y+v>this._max?v=this._max-y:y+v<this._min&&(v=this._min-y),this._snapClampSetValue(y+v)}w=o.clientY},d=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",c),window.removeEventListener("mouseup",d)},b=()=>{this._inputFocused=!0},m=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",g),this.$input.addEventListener("focus",b),this.$input.addEventListener("blur",m)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(m,o,l,x,P)=>(m-o)/(l-o)*(P-x)+x,i=m=>{const o=this.$slider.getBoundingClientRect();let l=e(m,o.left,o.right,this._min,this._max);this._snapClampSetValue(l)},n=m=>{this._setDraggingStyle(!0),i(m.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",s)},r=m=>{i(m.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",s)};let a=!1,f,h;const w=m=>{m.preventDefault(),this._setDraggingStyle(!0),i(m.touches[0].clientX),a=!1},y=m=>{m.touches.length>1||(this._hasScrollBar?(f=m.touches[0].clientX,h=m.touches[0].clientY,a=!0):w(m),window.addEventListener("touchmove",v,{passive:!1}),window.addEventListener("touchend",A))},v=m=>{if(a){const o=m.touches[0].clientX-f,l=m.touches[0].clientY-h;Math.abs(o)>Math.abs(l)?w(m):(window.removeEventListener("touchmove",v),window.removeEventListener("touchend",A))}else m.preventDefault(),i(m.touches[0].clientX)},A=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",v),window.removeEventListener("touchend",A)},g=this._callOnFinishChange.bind(this),c=400;let d;const b=m=>{if(Math.abs(m.deltaX)<Math.abs(m.deltaY)&&this._hasScrollBar)return;m.preventDefault();const l=this._normalizeMouseWheel(m)*this._step;this._snapClampSetValue(this.getValue()+l),this.$input.value=this.getValue(),clearTimeout(d),d=setTimeout(g,c)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",y,{passive:!1}),this.$slider.addEventListener("wheel",b,{passive:!1})}_setDraggingStyle(e,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${i}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:i,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(i=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(e){let i=this._stepExplicit?1:10;return e.shiftKey?i*=10:e.altKey&&(i/=10),i}_snap(e){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),e-=i,e=Math.round(e/this._step)*this._step,e+=i,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class xt extends le{constructor(e,i,n,r){super(e,i,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),i=this._values.indexOf(e);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?e:this._names[i],this}}class wt extends le{constructor(e,i,n){super(e,i,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var bt=`.lil-gui {
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
}`;function At(t){const e=document.createElement("style");e.innerHTML=t;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}let Ie=!1;class Be{constructor({parent:e,autoPlace:i=e===void 0,container:n,width:r,title:s="Controls",closeFolders:a=!1,injectStyles:f=!0,touchStyles:h=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),h&&this.domElement.classList.add("allow-touch-styles"),!Ie&&f&&(At(bt),Ie=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=a}add(e,i,n,r,s){if(Object(n)===n)return new xt(this,e,i,n);const a=e[i];switch(typeof a){case"number":return new yt(this,e,i,n,r,s);case"boolean":return new ut(this,e,i);case"string":return new wt(this,e,i);case"function":return new ze(this,e,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,e,`
	value:`,a)}addColor(e,i,n=1){return new vt(this,e,i,n)}addFolder(e){const i=new Be({parent:this,title:e});return this.root._closeFolders&&i.close(),i}load(e,i=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof ze||n._name in e.controllers&&n.load(e.controllers[n._name])}),i&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof ze)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(i=>{e=e.concat(i.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(i=>{e=e.concat(i.foldersRecursive())}),e}}function _t(t,e,i){const n=new Be({title:"Gaussian Splat Viewer"});n.close();const s=n.addFolder("About").$children;if(s){const y=document.createElement("div");y.style.padding="10px 12px 4px",y.style.fontSize="12px",y.style.lineHeight="1.45",y.style.opacity="0.9",y.textContent="A lightweight WebGPU viewer for exploring 3D Gaussian Splat scenes in the browser.";const v=document.createElement("ul");v.style.margin="0",v.style.padding="0 18px 8px 28px",v.style.fontSize="12px",v.style.lineHeight="1.5",v.style.opacity="0.85";const A=["Loads .splat and .ply scene files.","Supports camera presets, color controls, and stereo viewing.","Includes anaglyph and VR side-by-side modes."];for(const b of A){const m=document.createElement("li");m.textContent=b,v.append(m)}const g=document.createElement("div");g.style.padding="8px 12px",g.style.display="flex",g.style.alignItems="center",g.style.gap="8px";const c=document.createElement("span");c.innerHTML='<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.55 7.55 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg>',c.setAttribute("aria-hidden","true"),c.style.display="inline-flex",c.style.alignItems="center",c.style.opacity="0.9";const d=document.createElement("a");d.href="https://github.com/jeantimex/splat",d.target="_blank",d.rel="noreferrer",d.textContent="jeantimex",d.style.color="inherit",d.style.textDecoration="underline",d.style.textUnderlineOffset="0.18em",g.append(c,d),s.append(y,v,g)}const a=n.addFolder("Splat Settings");a.add(t,"pointCloud").name("Point Cloud"),a.add(t,"pointSize",.5,6,.1).name("Point Size"),a.add(t,"splatScale",0,1,.001).name("Splatscale"),a.add(t,"antialias",0,4,.001).name("Antialias"),a.close();const f=n.addFolder("Camera");f.add(t,"fov",20,120,.1).name("FOV"),f.add(t,"animateCamera").name("Animate Transitions"),f.add(t,"animationDuration",0,3e3,1).name("Animation duration (ms)"),f.add({loadCameras:()=>{const y=document.createElement("input");y.type="file",y.accept=".json",y.onchange=async()=>{var A;const v=(A=y.files)==null?void 0:A[0];if(v){je(i);try{const g=JSON.parse(await v.text());Array.isArray(g)&&g.length>0&&(e.onCamerasLoaded(g,f,e),e.onApplyCamera(0)),Te(i)}catch(g){Te(i),i.message.textContent=`Error loading cameras: ${g instanceof Error?g.message:String(g)}`}}},y.click()}},"loadCameras").name("Load Cameras"),f.add({logPose:()=>{e.onLogPose()}},"logPose").name("Log Camera Pose"),f.close();const h=n.addFolder("Adjust Colors");h.add(t,"brightness",-1,1,.001).name("Brightness"),h.add(t,"contrast",0,3,.001).name("Contrast"),h.add(t,"gamma",.1,3,.001).name("Gamma"),h.add(t,"blackLevel",-1,1,.001).name("Blacklevel"),h.add(t,"whiteLevel",-1,1,.001).name("Whitelevel"),h.add(t,"intensity",0,3,.001).name("Intensity"),h.add(t,"saturate",0,3,.001).name("Saturate"),h.add(t,"vibrance",-1,1,.001).name("Vibrance"),h.add(t,"temperature",-1,1,.001).name("Temperature"),h.add(t,"tint",-1,1,.001).name("Tint"),h.add(t,"alpha",0,1,.001).name("Alpha"),h.close();const w=n.addFolder("Debug");return w.add(t,"debugTimings").name("Show Timings"),w.close(),n.add({reset:()=>{e.onReset()}},"reset").name("Reset All Settings"),n}function St(t){const{applyCamera:e,getCurrentCameraIndex:i,saveViewToHash:n,setCarousel:r}=t;window.addEventListener("keydown",s=>{if(/^\d$/.test(s.key)){e(Number.parseInt(s.key,10));return}if(s.key==="-"||s.key==="_"){e(i()-1);return}if(s.key==="+"||s.key==="="){e(i()+1);return}if(s.code==="KeyP"){r(!0);return}s.code==="KeyV"&&n()})}function Et(t){const{dropzone:e,onFile:i}=t,n=s=>{s.preventDefault(),s.stopPropagation()};document.addEventListener("dragenter",n),document.addEventListener("dragover",n),document.addEventListener("dragleave",n),document.addEventListener("drop",s=>{var f,h;n(s);const a=(h=(f=s.dataTransfer)==null?void 0:f.files)==null?void 0:h[0];a&&i(a)});const r=document.createElement("input");r.type="file",r.accept=".splat,.ply",r.style.display="none",document.body.appendChild(r),r.addEventListener("change",()=>{var a;const s=(a=r.files)==null?void 0:a[0];s&&i(s),r.value=""}),e.addEventListener("click",()=>{r.click()})}const Ct=32,Mt=`/**
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
 *   - 3D Gaussian scale/rotation (stored in raw .splat row layout)
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
 * Raw .splat row data: 8 uint32 per Gaussian (32 bytes total)
 *   [0-2]: Position (x, y, z) as float32 bit patterns
 *   [3-5]: Scale (sx, sy, sz) as float32 bit patterns
 *   [6]:   Color RGBA8 packed into 1 uint32
 *   [7]:   Rotation quaternion bytes (qw, qx, qy, qz) quantized to uint8
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
  let scale = vec3<f32>(
    bitcast<f32>(splats[base + 3u]),
    bitcast<f32>(splats[base + 4u]),
    bitcast<f32>(splats[base + 5u]),
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
  let packed_color = splats[base + 6u];
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

    // Decode quaternion from uint8 storage. We preserve the existing runtime
    // convention used by the old CPU packer: bytes encode (qw, qx, qy, qz).
    let packed_rotation = splats[base + 7u];
    let qw = (f32(packed_rotation & 0xffu) - 128.0) / 128.0;
    let qx = (f32((packed_rotation >> 8u) & 0xffu) - 128.0) / 128.0;
    let qy = (f32((packed_rotation >> 16u) & 0xffu) - 128.0) / 128.0;
    let qz = (f32((packed_rotation >> 24u) & 0xffu) - 128.0) / 128.0;

    let qxqx = qx * qx;
    let qyqy = qy * qy;
    let qzqz = qz * qz;
    let qxqy = qx * qy;
    let qxqz = qx * qz;
    let qyqz = qy * qz;
    let qwqx = qw * qx;
    let qwqy = qw * qy;
    let qwqz = qw * qz;

    let m0 = (1.0 - 2.0 * (qyqy + qzqz)) * scale.x;
    let m1 = (2.0 * (qxqy + qwqz)) * scale.x;
    let m2 = (2.0 * (qxqz - qwqy)) * scale.x;
    let m3 = (2.0 * (qxqy - qwqz)) * scale.y;
    let m4 = (1.0 - 2.0 * (qxqx + qzqz)) * scale.y;
    let m5 = (2.0 * (qyqz + qwqx)) * scale.y;
    let m6 = (2.0 * (qxqz + qwqy)) * scale.z;
    let m7 = (2.0 * (qyqz - qwqx)) * scale.z;
    let m8 = (1.0 - 2.0 * (qxqx + qyqy)) * scale.z;

    let sigma0 = 4.0 * (m0 * m0 + m3 * m3 + m6 * m6); // σxx
    let sigma1 = 4.0 * (m0 * m1 + m3 * m4 + m6 * m7); // σxy
    let sigma2 = 4.0 * (m0 * m2 + m3 * m5 + m6 * m8); // σxz
    let sigma3 = 4.0 * (m1 * m1 + m4 * m4 + m7 * m7); // σyy
    let sigma4 = 4.0 * (m1 * m2 + m4 * m5 + m7 * m8); // σyz
    let sigma5 = 4.0 * (m2 * m2 + m5 * m5 + m8 * m8); // σzz

    // Reconstruct 3D covariance matrix (symmetric)
    let vrk = mat3x3<f32>(
      vec3<f32>(sigma0, sigma1, sigma2),
      vec3<f32>(sigma1, sigma3, sigma4),
      vec3<f32>(sigma2, sigma4, sigma5)
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
`,Lt=`/**
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
`,Oe=`/**
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
`,Ue=`/**
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
`,Ye=52,Gt=Ye*4;async function Pt(t){const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("No compatible GPU adapter found");const i=await e.requestDevice({requiredLimits:{maxStorageBufferBindingSize:e.limits.maxStorageBufferBindingSize,maxBufferSize:e.limits.maxBufferSize}}),n=t.getContext("webgpu");if(!n)throw new Error("Unable to create WebGPU canvas context");const r=navigator.gpu.getPreferredCanvasFormat(),s=p=>i.createBuffer({label:p,size:Gt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),a=s("viewer uniforms"),f=s("viewer uniforms B"),h=s("viewer uniforms C"),w=s("viewer uniforms D"),y=new Float32Array([-2,-2,2,-2,-2,2,2,2]),v=i.createBuffer({label:"quad vertices",size:y.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});i.queue.writeBuffer(v,0,y);let A=8,g=4,c=0,d=i.createBuffer({label:"splat buffer",size:A*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),b=i.createBuffer({label:"sorted index buffer",size:g*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});const m=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),o=p=>i.createBindGroup({layout:m,entries:[{binding:0,resource:{buffer:p}},{binding:1,resource:{buffer:d}},{binding:2,resource:{buffer:b}}]}),l=()=>{x=o(a),P=o(f),O=o(h),q=o(w)};let x=o(a),P=o(f),O=o(h),q=o(w);const E=((p=GPUColorWrite.ALL)=>i.createRenderPipeline({layout:i.createPipelineLayout({bindGroupLayouts:[m]}),vertex:{module:i.createShaderModule({code:Mt}),entryPoint:"vs_main",buffers:[{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:0,format:"float32x2",offset:0}]}]},fragment:{module:i.createShaderModule({code:Lt}),entryPoint:"fs_main",targets:[{format:r,blend:{color:{srcFactor:"one-minus-dst-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one-minus-dst-alpha",dstFactor:"one",operation:"add"}},writeMask:p}]},primitive:{topology:"triangle-strip"}}))(),$=i.createSampler({magFilter:"linear",minFilter:"linear"}),R=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}}]}),L=i.createRenderPipeline({layout:i.createPipelineLayout({bindGroupLayouts:[R]}),vertex:{module:i.createShaderModule({code:Oe}),entryPoint:"vs_main"},fragment:{module:i.createShaderModule({code:Oe}),entryPoint:"fs_main",targets:[{format:r}]},primitive:{topology:"triangle-strip"}}),T=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),z=i.createRenderPipeline({layout:i.createPipelineLayout({bindGroupLayouts:[T]}),vertex:{module:i.createShaderModule({code:Ue}),entryPoint:"vs_main"},fragment:{module:i.createShaderModule({code:Ue}),entryPoint:"fs_main",targets:[{format:r}]},primitive:{topology:"triangle-strip"}}),X=i.createBuffer({label:"crossfade uniforms",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let J=_(),re=_(),K=_(),he=_(),ye=V(),ee=j(),ce=1,fe=0,me=0,ge=0,Ae=0;const Ve=p=>{p<=A||(A=Ne(p),d.destroy(),d=i.createBuffer({label:"splat buffer",size:A*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),l())},xe=p=>{p<=g||(g=Ne(p),b.destroy(),b=i.createBuffer({label:"sorted index buffer",size:g*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),l())},we=()=>{const p=Math.max(1,window.devicePixelRatio||1),D=Math.max(1,Math.round(t.clientWidth*p*ce)),C=Math.max(1,Math.round(t.clientHeight*p*ce));D===fe&&C===me||(fe=D,me=C,t.width=D,t.height=C,n.configure({device:i,format:r,alphaMode:"premultiplied"}),[J,re,K,he].forEach(Z=>Z.destroy()),J=_(),re=_(),K=_(),he=_(),ye=V(),ee=j())};window.addEventListener("resize",we),we();const G=new Float32Array(Ye),be=p=>{const D=performance.now(),C=(S,F,Y,oe,ie,ue,ae)=>{G.set(S,0),G.set(F,16),G[32]=p.focal[0],G[33]=p.focal[1],G[34]=Y,G[35]=oe,G[36]=ie,G[37]=p.pointSize,G[38]=ue,G[39]=p.splatScale,G[40]=p.brightness,G[41]=p.contrast,G[42]=p.gamma,G[43]=p.alpha,G[44]=p.blackLevel,G[45]=p.whiteLevel,G[46]=p.intensity,G[47]=p.saturate,G[48]=p.vibrance,G[49]=p.temperature,G[50]=p.tint,G[51]=p.antialias,i.queue.writeBuffer(ae,0,G)},Z=()=>{const S=[...p.projection];return S[0]*=2,S},U=Math.max(0,Math.min(1,p.transition)),Q=U>0&&U<1,de=i.createCommandEncoder(),N=n.getCurrentTexture().createView(),te=S=>{const F=de.beginRenderPass({colorAttachments:[{view:S.targetView,clearValue:{r:0,g:0,b:0,a:0},loadOp:S.clear?"clear":"load",storeOp:"store"}]});F.setBindGroup(0,S.bg),F.setVertexBuffer(0,v),F.setViewport(S.viewportX,S.viewportY,S.viewportWidth,S.viewportHeight,0,1),C(S.projection,S.view,S.logicalViewportWidth,S.logicalViewportHeight,S.mode,S.opacity,S.ub),F.setPipeline(E),F.draw(4,c,0,0),F.end()},se=(S,F,Y,oe,ie,ue,ae,pe,ve,Ee,Ce,Me,Le,Pe,B)=>{if(Q)if(B)te({targetView:S,view:F,viewportX:Y,viewportY:oe,viewportWidth:ie,viewportHeight:ue,logicalViewportWidth:ae,logicalViewportHeight:pe,projection:ve,clear:Ee,mode:0,opacity:1-U,ub:Ce,bg:Me}),te({targetView:S,view:F,viewportX:Y,viewportY:oe,viewportWidth:ie,viewportHeight:ue,logicalViewportWidth:ae,logicalViewportHeight:pe,projection:ve,clear:!1,mode:1,opacity:U,ub:Le,bg:Pe});else{i.queue.writeBuffer(X,0,new Float32Array([U])),te({targetView:K.createView(),view:F,viewportX:0,viewportY:0,viewportWidth:ie,viewportHeight:ue,logicalViewportWidth:ae,logicalViewportHeight:pe,projection:ve,clear:!0,mode:0,opacity:1,ub:Ce,bg:Me}),te({targetView:he.createView(),view:F,viewportX:0,viewportY:0,viewportWidth:ie,viewportHeight:ue,logicalViewportWidth:ae,logicalViewportHeight:pe,projection:ve,clear:!0,mode:1,opacity:1,ub:Le,bg:Pe});const H=de.beginRenderPass({colorAttachments:[{view:S,clearValue:{r:0,g:0,b:0,a:1},loadOp:Ee?"clear":"load",storeOp:"store"}]});H.setPipeline(z),H.setBindGroup(0,ee),H.setViewport(Y,oe,ie,ue,0,1),H.draw(4,1,0,0),H.end()}else{const H=U<.5?0:1;te({targetView:S,view:F,viewportX:Y,viewportY:oe,viewportWidth:ie,viewportHeight:ue,logicalViewportWidth:ae,logicalViewportHeight:pe,projection:ve,clear:Ee,mode:H,opacity:1,ub:H===0?Ce:Le,bg:H===0?Me:Pe})}};if(c>0&&p.stereoMode==="anaglyph"){se(J.createView(),p.viewLeft,0,0,t.width,t.height,p.viewport[0],p.viewport[1],p.projection,!0,a,x,h,O,!1),se(re.createView(),p.viewRight,0,0,t.width,t.height,p.viewport[0],p.viewport[1],p.projection,!0,f,P,w,q,!1);const S=de.beginRenderPass({colorAttachments:[{view:N,clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]});S.setPipeline(L),S.setBindGroup(0,ye),S.draw(4,1,0,0),S.end()}else if(c>0&&p.stereoMode==="sbs"){const S=Math.max(1,Math.floor(t.width/2)),F=Z(),Y=Math.max(1,Math.floor(p.viewport[0]/2)),oe=Math.max(1,p.viewport[0]-Y);se(N,p.viewLeft,0,0,S,t.height,Y,p.viewport[1],F,!0,a,x,h,O,!0),se(N,p.viewRight,S,0,t.width-S,t.height,oe,p.viewport[1],F,!1,f,P,w,q,!0)}else c>0?se(N,p.view,0,0,t.width,t.height,p.viewport[0],p.viewport[1],p.projection,!0,a,x,h,O,!1):de.beginRenderPass({colorAttachments:[{view:N,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]}).end();i.queue.submit([de.finish()]),Ae=performance.now()-D},_e=(p,D)=>{if(D<=0||p.length<=0){c=0;return}const C=performance.now();Ve(p.length);const Z=new Uint32Array(p);i.queue.writeBuffer(d,0,Z),ge+=performance.now()-C,c=D},Se=p=>{if(p.length<=0){c=0;return}const D=performance.now();xe(p.length);const C=new Uint32Array(p);i.queue.writeBuffer(b,0,C),ge+=performance.now()-D,c=p.length},$e=p=>{const D=Math.max(.3,Math.min(1,p)),C=Math.round(D*20)/20;Math.abs(C-ce)<1e-6||(ce=C,we())},u=()=>{const p={uploadMs:ge,renderMs:Ae};return ge=0,p};function _(){return i.createTexture({size:{width:Math.max(1,t.width),height:Math.max(1,t.height),depthOrArrayLayers:1},format:r,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})}function V(){return i.createBindGroup({layout:R,entries:[{binding:0,resource:$},{binding:1,resource:J.createView()},{binding:2,resource:re.createView()}]})}function j(){return i.createBindGroup({layout:T,entries:[{binding:0,resource:$},{binding:1,resource:K.createView()},{binding:2,resource:he.createView()},{binding:3,resource:{buffer:X}}]})}return{render:be,setSplatData:_e,setSortedIndices:Se,setResolutionScale:$e,consumeTimings:u}}function Ne(t){let e=1;for(;e<t;)e<<=1;return e}function Dt(t){const e=new Worker(new URL("/splat/assets/sort-worker.worker-BTqRfH7j.js",import.meta.url),{type:"module"});return e.onmessage=i=>{var r,s,a;const n=i.data;if(n.type==="depth"){(r=t.onSortResult)==null||r.call(t,{depthIndex:new Uint32Array(n.depthIndex),vertexCount:n.vertexCount,sortMs:n.sortMs});return}if(n.type==="splat"){(s=t.onSplatData)==null||s.call(t,{splatData:new Uint32Array(n.splatData),vertexCount:n.vertexCount,loadMs:n.loadMs});return}n.type==="buffer"&&((a=t.onConvertedBuffer)==null||a.call(t,n.buffer,n.save))},{postViewProjection(i){e.postMessage({type:"view",viewProj:i})},postSplatBuffer(i,n){e.postMessage({type:"buffer",buffer:i,vertexCount:n},[i])},postPlyBuffer(i,n=!1){e.postMessage({type:"ply",buffer:i,save:n},[i])},terminate(){e.terminate()}}}const He={pointCloud:!1,pointSize:.8,stereoMode:"off",fov:75,splatScale:1,antialias:.3,brightness:0,contrast:1,gamma:1,blackLevel:0,whiteLevel:0,intensity:1,saturate:1,vibrance:0,temperature:0,tint:0,alpha:1,animateCamera:!0,animationDuration:1350,debugTimings:!1},Tt=[112,108,121,10];function Vt(t,e){return(t%e+e)%e}function $t(t){if(!t)return null;try{const e=JSON.parse(decodeURIComponent(t));if(!Array.isArray(e)||e.length!==16)return null;const i=e.map(Number);return i.some(n=>Number.isNaN(n))?null:i}catch{return null}}function zt(t){const e=t.map(i=>Math.round(i*100)/100);return JSON.stringify(e)}function qt(t,e){const i=new Uint8Array(t),n=new Blob([i.buffer],{type:"application/octet-stream"}),r=URL.createObjectURL(n),s=document.createElement("a");s.download=e,s.href=r,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(r)}function Bt(t){const e=new Uint8Array(t);return Tt.every((i,n)=>e[n]===i)}const I=at();async function kt(){if(!navigator.gpu){I.message.textContent="WebGPU is not available in this browser.";return}let t=null;const e=()=>{t===null&&(t=requestAnimationFrame($e))},i=await Pt(I.canvas),n=ot(I.canvas,{onInvalidate:e}),r={...He};let s=[...Ke],a=0,f=null,h=null,w=0;const y=u=>{r.animateCamera?(f=[...n.viewMatrix],h=[...u],w=performance.now()):(n.setViewMatrix(u),f=null,h=null),e()},v=u=>{const _=Math.hypot(u[0],u[1],u[2]);return _<1e-8?[0,0,1]:[u[0]/_,u[1]/_,u[2]/_]},A=(u,_)=>[u[1]*_[2]-u[2]*_[1],u[2]*_[0]-u[0]*_[2],u[0]*_[1]-u[1]*_[0]],g=u=>{const _={x:[1,0,0],"-x":[-1,0,0],y:[0,-1,0],"-y":[0,1,0],z:[0,0,-1],"-z":[0,0,1]},V=k(n.viewMatrix);if(!V)return null;const j=[V[12],V[13],V[14]],p=v([V[8],V[9],V[10]]),D=4,C=[j[0]+p[0]*D,j[1]+p[1]*D,j[2]+p[2]*D],Z=_[u],U=[C[0]+Z[0]*D,C[1]+Z[1]*D,C[2]+Z[2]*D],Q=v([C[0]-U[0],C[1]-U[1],C[2]-U[2]]),de=Math.abs(Q[1])>.98?[0,0,1]:[0,1,0],N=v(A(de,Q)),te=v(A(Q,N)),se=[N[0],N[1],N[2],0,te[0],te[1],te[2],0,Q[0],Q[1],Q[2],0,U[0],U[1],U[2],1];return k(se)},c=dt(I.gizmo,{onAxisClick:u=>{n.setCarousel(!1);const _=g(u);_&&y(_)}}),d=u=>{if(!s.length)return;a=Vt(u,s.length);const _=s[a],V=Qe(_);y(V),n.camera.fx=_.fx,n.camera.fy=_.fy,n.setCarousel(!1)},b={selectedCamera:""};let m=null;const o=(u,_,V)=>{m&&m.destroy();const j=u.map((p,D)=>`${D+1}: ${p.img_name}`);b.selectedCamera=j[0]||"",m=_.add(b,"selectedCamera",j).name("Positions").onChange(p=>{const D=p.split(":")[0],C=Number.parseInt(D,10)-1;C>=0&&C<u.length&&V.onApplyCamera(C),e()})},l={onCamerasLoaded:(u,_,V)=>{s=u,o(u,_,V)},onApplyCamera:u=>{d(u)},onLogPose:()=>{const u=k(n.viewMatrix);if(!u)return;const _={id:crypto.randomUUID(),img_name:`custom_${s.length}`,width:I.canvas.width,height:I.canvas.height,position:[u[12],u[13],u[14]],rotation:[[u[0],u[4],u[8]],[u[1],u[5],u[9]],[u[2],u[6],u[10]]],fy:n.camera.fy,fx:n.camera.fx};console.log("Current Camera Pose:",JSON.stringify(_,null,2))},onReset:()=>{Object.assign(r,He),x.controllersRecursive().forEach(u=>u.updateDisplay()),P(),e()}},x=_t(r,l,I);x.controllersRecursive().forEach(u=>{u.onChange(()=>{e()})});const P=lt(I,r,e),O=x.folders.find(u=>u._title==="Camera");let q=0,M=0,E=1,$=performance.now(),R=0;const L=[...n.viewMatrix];let T=!1,z=0;const X=new Float32Array(16);let J=0,re=!1,K={reorderMs:0,packMs:0,totalMs:0},he=0,ye=0,ee=0,ce=!1,fe=!1,me=!1;const ge=()=>{ee<=0||!fe||!me||(ce=!0)},Ae=u=>{const _=$t(u);return _?(n.setViewMatrix(_),n.setCarousel(!1),!0):!1},Ve=()=>{location.hash=`#${encodeURIComponent(zt(n.viewMatrix))}`},xe=Dt({onSortResult:({depthIndex:u,sortMs:_})=>{i.setSortedIndices(u),J=_,re=!0,ee>0&&(fe=!0,ge()),e()},onSplatData:({splatData:u,vertexCount:_,loadMs:V})=>{q=_,K=V,i.setSplatData(u,_),Te(I),I.dropzone.classList.add("hidden"),st(u,_,n),ee>0&&(me=!0,ge()),e()},onConvertedBuffer:(u,_)=>{_&&qt(new Uint8Array(u),"model.splat")}});Ae(location.hash.slice(1))||d(a),St({applyCamera:d,getCurrentCameraIndex:()=>a,saveViewToHash:Ve,setCarousel:u=>{n.setCarousel(u),e()}}),window.addEventListener("hashchange",()=>{Ae(location.hash.slice(1)),e()}),window.addEventListener("resize",e),Et({dropzone:I.dropzone,onFile:async u=>{if(n.setCarousel(!1),je(I),ee=performance.now(),ce=!1,fe=!1,me=!1,he=0,ye=0,/\.json$/i.test(u.name)){const V=JSON.parse(await u.text());Array.isArray(V)&&V.length>0&&(s=V,O&&o(V,O,l),d(0),Te(I),e());return}const _=await u.arrayBuffer();if(he=performance.now()-ee,Bt(_)){xe.postPlyBuffer(_,!1);return}q=Math.floor(_.byteLength/Ct),xe.postSplatBuffer(_,q)}}),I.progress.style.display="none",I.message.textContent="";let we=performance.now(),G=0,be=0,_e=0,Se=0;function $e(u){t=null;const _=Math.max(u-we,1e-4),V=Math.min(_,34);if(we=u,n.update(V),c.update(n.viewMatrix),n.isInteracting&&(f=null,h=null),f&&h){const B=u-w,H=Math.max(r.animationDuration,1),De=Math.min(B/H,1),We=De*De*(3-2*De),Xe=rt(f,h,We);n.setViewMatrix(Xe),De>=1&&(f=null,h=null)}let j=0;for(let B=0;B<16;B++){const H=n.viewMatrix[B];j+=Math.abs(H-L[B]),L[B]=H}j>1e-4&&($=u);const p=u-$<140,D=u-R>180;r.pointCloud?E!==1&&(E=1,R=u,i.setResolutionScale(E)):p&&E>.7&&D?(E=.7,R=u,i.setResolutionScale(E)):!p&&E<1&&D&&(E=E<.85?.85:1,R=u,i.setResolutionScale(E));const C=r.pointCloud?1:0;if(M!==C){const B=_/500*Math.sign(C-M);M=C>M?Math.min(C,M+B):Math.max(C,M+B),Math.abs(M-C)<.001&&(M=C)}const Z=Math.max(1,window.devicePixelRatio||1),U=Math.max(1,Math.round(I.canvas.clientWidth*Z)),Q=Math.max(1,Math.round(I.canvas.clientHeight*Z)),de=r.fov*Math.PI/180,N=Q/(2*Math.tan(de/2)),te=n.camera.fx/Math.max(n.camera.fy,1e-6),se=N*te,S=Ze(se,N,U,Q),F=et(S,n.viewMatrix);let Y=0;for(let B=0;B<16;B++)Y=Math.max(Y,Math.abs(F[B]-X[B]));const oe=p?28:85,ie=u-z;if(!T||Y>5e-4&&ie>=oe||ie>=220){xe.postViewProjection(F);for(let B=0;B<16;B++)X[B]=F[B];T=!0,z=u}const ae=r.stereoMode==="anaglyph"?.04:.065;i.render({projection:S,view:n.viewMatrix,viewLeft:Fe(n.viewMatrix,-ae),viewRight:Fe(n.viewMatrix,ae),focal:[se,N],viewport:[U,Q],transition:M,pointSize:r.pointSize,splatScale:r.splatScale,antialias:r.antialias,stereoMode:r.stereoMode,brightness:r.brightness,contrast:r.contrast,gamma:r.gamma,blackLevel:r.blackLevel,whiteLevel:r.whiteLevel,intensity:r.intensity,saturate:r.saturate,vibrance:r.vibrance,temperature:r.temperature,tint:r.tint,alpha:r.alpha}),ce&&ee>0&&(ye=performance.now()-ee,ce=!1,fe=!1,me=!1,ee=0);const pe=i.consumeTimings(),ve=1e3/_;G=G*.9+ve*.1,_e=_e*.85+pe.uploadMs*.15,Se=Se*.85+pe.renderMs*.15,re?(be=be*.75+J*.25,re=!1):be*=.99,I.fps.textContent=`${Math.round(G)} fps | ${q.toLocaleString()} pts`,r.debugTimings&&q>0&&(I.fps.textContent+=` | sort ${be.toFixed(1)}ms | upload ${_e.toFixed(2)}ms | render ${Se.toFixed(2)}ms`,I.fps.textContent+=` | read ${he.toFixed(1)}ms | load ${K.totalMs.toFixed(1)}ms (reorder ${K.reorderMs.toFixed(1)}ms, prepare ${K.packMs.toFixed(1)}ms) | first frame ${ye.toFixed(1)}ms`);const Ee=f!==null&&h!==null,Ce=j>1e-6,Me=E<1||u-$<180,Le=Math.abs(M-C)>1e-4;(n.isInteracting||Ee||Ce||Me||Le)&&e()}window.addEventListener("beforeunload",()=>xe.terminate()),window.addEventListener("beforeunload",()=>x.destroy()),window.addEventListener("beforeunload",()=>c.destroy()),e()}kt().catch(t=>{const e=t instanceof Error?t.message:String(t);I.message.textContent=`Renderer init failed: ${e}`});
