(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=i(r);fetch(r.href,s)}})();const Je={fx:1159.5880733038064,fy:1164.6601287484507},Ke=[{id:0,img_name:"00001",width:1959,height:1090,position:[-3.0089893469241797,-.11086489695181866,-3.7527640949141428],rotation:[[.877318,0,.479909],[.013344,.999613,-.024394],[-.479724,.027805,.876979]],fy:1164.6601287484507,fx:1159.5880733038064},{id:1,img_name:"00009",width:1959,height:1090,position:[-2.5199776022057296,-.09704735754873686,-3.6247725540304545],rotation:[[.9982731285632193,-.011928707708098955,-.05751927260507243],[.0065061360949636325,.9955928229282383,-.09355533724430458],[.058381769258182864,.09301955098900708,.9939511719154457]],fy:1164.6601287484507,fx:1159.5880733038064},{id:2,img_name:"00017",width:1959,height:1090,position:[-.7737533667465242,-.3364271945329695,-2.9358969417573753],rotation:[[.9998813418672372,.013742375651625236,-.0069605529394208224],[-.014268370388586709,.996512943252834,-.08220929105659476],[.00580653013657589,.08229885200307129,.9965907801935302]],fy:1164.6601287484507,fx:1159.5880733038064},{id:3,img_name:"00025",width:1959,height:1090,position:[1.2198221749590001,-.2196687861401182,-2.3183162007028453],rotation:[[.9208648867765482,.0012010625395201253,.389880004297208],[-.06298204172269357,.987319521752825,.14571693239364383],[-.3847611242348369,-.1587410451475895,.9092635249821667]],fy:1164.6601287484507,fx:1159.5880733038064},{id:4,img_name:"00033",width:1959,height:1090,position:[1.742387858893817,-.13848225198886954,-2.0566370113193146],rotation:[[.24669889292141334,-.08370189346592856,-.9654706879349405],[.11343747891376445,.9919082664242816,-.05700815184573074],[.9624300466054861,-.09545671285663988,.2541976029815521]],fy:1164.6601287484507,fx:1159.5880733038064},{id:5,img_name:"00041",width:1959,height:1090,position:[3.6567309419223935,-.16470990600750707,-1.3458085590422042],rotation:[[.2341293058324528,-.02968330457755884,-.9717522161434825],[.10270823606832301,.99469554638321,-.005638106875665722],[.9667649592295676,-.09848690996657204,.2359360976431732]],fy:1164.6601287484507,fx:1159.5880733038064},{id:6,img_name:"00049",width:1959,height:1090,position:[3.9013554243203497,-.2597500978038105,-.8106154188297828],rotation:[[.6717235545638952,-.015718162115524837,-.7406351366386528],[.055627354673906296,.9980224478387622,.029270992841185218],[.7387104058127439,-.060861588786650656,.6712695459756353]],fy:1164.6601287484507,fx:1159.5880733038064},{id:7,img_name:"00057",width:1959,height:1090,position:[4.742994605467533,-.05591660945412069,.9500365976084458],rotation:[[-.17042655709210375,.01207080756938,-.9852964448542146],[.1165090336695526,.9931575292530063,-.00798543433078162],[.9784581921120181,-.1161568667478904,-.1706667764862097]],fy:1164.6601287484507,fx:1159.5880733038064},{id:8,img_name:"00065",width:1959,height:1090,position:[4.34676307626522,.08168160516967145,1.0876221470355405],rotation:[[-.003575447631888379,-.044792503246552894,-.9989899137764799],[.10770152645126597,.9931680875192705,-.04491693593046672],[.9941768441149182,-.10775333677534978,.0012732004866391048]],fy:1164.6601287484507,fx:1159.5880733038064},{id:9,img_name:"00073",width:1959,height:1090,position:[3.264984351114202,.078974937336732,1.0117200284114904],rotation:[[-.026919994628162257,-.1565891128261527,-.9872968974090509],[.08444552208239385,.983768234577625,-.1583319754069128],[.9960643893290491,-.0876350978794554,-.013259786205163005]],fy:1164.6601287484507,fx:1159.5880733038064}],ke=[.471108,-.01768,.88,0,0,.999799,.02,0,-.882075,-.009442,.47,0,.07,.03,6.55,1];function Ze(t,e,i,n){return[2*t/i,0,0,0,0,-(2*e)/n,0,0,0,0,200/(200-.2),1,0,0,-40/(200-.2),0]}function Qe(t){const e=t.rotation.flat(),i=t.position,n=-i[0]*e[0]-i[1]*e[3]-i[2]*e[6],r=-i[0]*e[1]-i[1]*e[4]-i[2]*e[7],s=-i[0]*e[2]-i[1]*e[5]-i[2]*e[8];return[e[0],e[1],e[2],0,e[3],e[4],e[5],0,e[6],e[7],e[8],0,n,r,s,1]}function et(t,e){return[e[0]*t[0]+e[1]*t[4]+e[2]*t[8]+e[3]*t[12],e[0]*t[1]+e[1]*t[5]+e[2]*t[9]+e[3]*t[13],e[0]*t[2]+e[1]*t[6]+e[2]*t[10]+e[3]*t[14],e[0]*t[3]+e[1]*t[7]+e[2]*t[11]+e[3]*t[15],e[4]*t[0]+e[5]*t[4]+e[6]*t[8]+e[7]*t[12],e[4]*t[1]+e[5]*t[5]+e[6]*t[9]+e[7]*t[13],e[4]*t[2]+e[5]*t[6]+e[6]*t[10]+e[7]*t[14],e[4]*t[3]+e[5]*t[7]+e[6]*t[11]+e[7]*t[15],e[8]*t[0]+e[9]*t[4]+e[10]*t[8]+e[11]*t[12],e[8]*t[1]+e[9]*t[5]+e[10]*t[9]+e[11]*t[13],e[8]*t[2]+e[9]*t[6]+e[10]*t[10]+e[11]*t[14],e[8]*t[3]+e[9]*t[7]+e[10]*t[11]+e[11]*t[15],e[12]*t[0]+e[13]*t[4]+e[14]*t[8]+e[15]*t[12],e[12]*t[1]+e[13]*t[5]+e[14]*t[9]+e[15]*t[13],e[12]*t[2]+e[13]*t[6]+e[14]*t[10]+e[15]*t[14],e[12]*t[3]+e[13]*t[7]+e[14]*t[11]+e[15]*t[15]]}function B(t){const e=t[0]*t[5]-t[1]*t[4],i=t[0]*t[6]-t[2]*t[4],n=t[0]*t[7]-t[3]*t[4],r=t[1]*t[6]-t[2]*t[5],s=t[1]*t[7]-t[3]*t[5],o=t[2]*t[7]-t[3]*t[6],h=t[8]*t[13]-t[9]*t[12],f=t[8]*t[14]-t[10]*t[12],x=t[8]*t[15]-t[11]*t[12],g=t[9]*t[14]-t[10]*t[13],w=t[9]*t[15]-t[11]*t[13],b=t[10]*t[15]-t[11]*t[14],m=e*b-i*w+n*g+r*x-s*f+o*h;return m?[(t[5]*b-t[6]*w+t[7]*g)/m,(t[2]*w-t[1]*b-t[3]*g)/m,(t[13]*o-t[14]*s+t[15]*r)/m,(t[10]*s-t[9]*o-t[11]*r)/m,(t[6]*x-t[4]*b-t[7]*f)/m,(t[0]*b-t[2]*x+t[3]*f)/m,(t[14]*n-t[12]*o-t[15]*i)/m,(t[8]*o-t[10]*n+t[11]*i)/m,(t[4]*w-t[5]*x+t[7]*h)/m,(t[1]*x-t[0]*w-t[3]*h)/m,(t[12]*s-t[13]*n+t[15]*e)/m,(t[9]*n-t[8]*s-t[11]*e)/m,(t[5]*f-t[4]*g-t[6]*h)/m,(t[0]*g-t[1]*f+t[2]*h)/m,(t[13]*i-t[12]*r-t[14]*e)/m,(t[8]*r-t[9]*i+t[10]*e)/m]:null}function Z(t,e,i,n,r){const s=Math.hypot(i,n,r);if(!s)return t;i/=s,n/=s,r/=s;const o=Math.sin(e),h=Math.cos(e),f=1-h,x=i*i*f+h,g=n*i*f+r*o,w=r*i*f-n*o,b=i*n*f-r*o,m=n*n*f+h,c=r*n*f+i*o,A=i*r*f+n*o,_=n*r*f-i*o,u=r*r*f+h;return[t[0]*x+t[4]*g+t[8]*w,t[1]*x+t[5]*g+t[9]*w,t[2]*x+t[6]*g+t[10]*w,t[3]*x+t[7]*g+t[11]*w,t[0]*b+t[4]*m+t[8]*c,t[1]*b+t[5]*m+t[9]*c,t[2]*b+t[6]*m+t[10]*c,t[3]*b+t[7]*m+t[11]*c,t[0]*A+t[4]*_+t[8]*u,t[1]*A+t[5]*_+t[9]*u,t[2]*A+t[6]*_+t[10]*u,t[3]*A+t[7]*_+t[11]*u,...t.slice(12,16)]}function q(t,e,i,n){return[...t.slice(0,12),t[0]*e+t[4]*i+t[8]*n+t[12],t[1]*e+t[5]*i+t[9]*n+t[13],t[2]*e+t[6]*i+t[10]*n+t[14],t[3]*e+t[7]*i+t[11]*n+t[15]]}function ze(t){const e=B(t);if(!e)return{position:[0,0,0],quaternion:[0,0,0,1]};const i=[e[12],e[13],e[14]],n=e[0],r=e[1],s=e[2],o=e[4],h=e[5],f=e[6],x=e[8],g=e[9],w=e[10],b=n+h+w;let m,c,A,_;if(b>0){const a=.5/Math.sqrt(b+1);_=.25/a,m=(f-g)*a,c=(x-s)*a,A=(r-o)*a}else if(n>h&&n>w){const a=2*Math.sqrt(1+n-h-w);_=(f-g)/a,m=.25*a,c=(o+r)/a,A=(x+s)/a}else if(h>w){const a=2*Math.sqrt(1+h-n-w);_=(x-s)/a,m=(o+r)/a,c=.25*a,A=(g+f)/a}else{const a=2*Math.sqrt(1+w-n-h);_=(r-o)/a,m=(x+s)/a,c=(g+f)/a,A=.25*a}const u=Math.sqrt(m*m+c*c+A*A+_*_);return u>1e-6&&(m/=u,c/=u,A/=u,_/=u),{position:i,quaternion:[m,c,A,_]}}function tt(t,e){const[i,n,r,s]=e,o=i*i,h=n*n,f=r*r,x=i*n,g=i*r,w=n*r,b=s*i,m=s*n,c=s*r,A=1-2*(h+f),_=2*(x-c),u=2*(g+m),a=2*(x+c),d=1-2*(o+f),y=2*(w-b),C=2*(g-m),G=2*(w+b),L=1-2*(o+h),T=-(A*t[0]+a*t[1]+C*t[2]),S=-(_*t[0]+d*t[1]+G*t[2]),$=-(u*t[0]+y*t[1]+L*t[2]);return[A,_,u,0,a,d,y,0,C,G,L,0,T,S,$,1]}function it(t,e,i){let[n,r,s,o]=t,[h,f,x,g]=e,w=n*h+r*f+s*x+o*g;if(w<0&&(h=-h,f=-f,x=-x,g=-g,w=-w),w>.9995){const _=n+i*(h-n),u=r+i*(f-r),a=s+i*(x-s),d=o+i*(g-o),y=Math.sqrt(_*_+u*u+a*a+d*d);return[_/y,u/y,a/y,d/y]}const b=Math.acos(w),m=Math.sin(b),c=Math.sin((1-i)*b)/m,A=Math.sin(i*b)/m;return[c*n+A*h,c*r+A*f,c*s+A*x,c*o+A*g]}function nt(t,e,i){return[t[0]+i*(e[0]-t[0]),t[1]+i*(e[1]-t[1]),t[2]+i*(e[2]-t[2])]}function rt(t,e,i){const n=ze(t),r=ze(e),s=nt(n.position,r.position,i),o=it(n.quaternion,r.quaternion,i);return tt(s,o)}function Fe(t,e){const i=B(t);if(!i)return t;const n=q(i,e,0,0);return B(n)??t}function st(t,e,i){if(e===0)return;let n=0,r=0,s=0;const o=Math.min(e,1e4),h=Math.floor(e/o)*8;for(let c=0;c<o;c++){const A=new Float32Array(t.buffer,c*h*4,1)[0],_=new Float32Array(t.buffer,(c*h+1)*4,1)[0],u=new Float32Array(t.buffer,(c*h+2)*4,1)[0];n+=A,r+=_,s+=u}const f=[n/o,r/o,s/o],x=[i.viewMatrix[0],i.viewMatrix[4],i.viewMatrix[8]],g=[i.viewMatrix[1],i.viewMatrix[5],i.viewMatrix[9]],w=[i.viewMatrix[2],i.viewMatrix[6],i.viewMatrix[10]],b=f,m=[x[0],g[0],w[0],0,x[1],g[1],w[1],0,x[2],g[2],w[2],0,-b[0]*x[0]-b[1]*g[0]-b[2]*w[0],-b[0]*x[1]-b[1]*g[1]-b[2]*w[1],-b[0]*x[2]-b[1]*g[2]-b[2]*w[2],1];i.setViewMatrix(m)}const ye="http://www.w3.org/2000/svg",Oe=[{axis:"x",label:"X",color:"#ff4a4a",dir:[1,0,0]},{axis:"y",label:"Y",color:"#47ff5a",dir:[0,1,0]},{axis:"z",label:"Z",color:"#6f75ff",dir:[0,0,1]}];function ot(t){const e=document.createElement("div");e.id="coord-gizmo";const i=document.createElementNS(ye,"svg");i.setAttribute("viewBox","0 0 120 120"),i.setAttribute("aria-label","Coordinate gizmo"),e.appendChild(i),document.body.appendChild(e);const n={x:60,y:60},r=38,s=12,o=Oe.map(({axis:c,label:A,color:_})=>{const u=document.createElementNS(ye,"g"),a=document.createElementNS(ye,"line");a.setAttribute("x1",String(n.x)),a.setAttribute("y1",String(n.y)),a.setAttribute("stroke",_),a.setAttribute("stroke-width","3"),a.setAttribute("stroke-linecap","round"),u.appendChild(a);const d=document.createElementNS(ye,"circle");d.setAttribute("r",String(s)),d.setAttribute("fill","#1a1a1a"),d.setAttribute("stroke",_),d.setAttribute("stroke-width","2"),d.setAttribute("data-axis",`n${c}`),d.style.cursor="pointer",d.style.userSelect="none",u.appendChild(d);const y=document.createElementNS(ye,"circle");y.setAttribute("r",String(s)),y.setAttribute("fill",_),y.setAttribute("data-axis",`p${c}`),y.style.cursor="pointer",y.style.userSelect="none",u.appendChild(y);const C=document.createElementNS(ye,"text");return C.textContent=A,C.setAttribute("data-axis",`p${c}`),C.setAttribute("fill","#111"),C.setAttribute("font-size","16"),C.setAttribute("font-family","ui-sans-serif, system-ui, sans-serif"),C.setAttribute("font-weight","700"),C.setAttribute("text-anchor","middle"),C.setAttribute("dominant-baseline","central"),C.style.cursor="pointer",C.style.userSelect="none",u.appendChild(C),i.appendChild(u),{group:u,line:a,posCircle:y,posLabel:C,negCircle:d}});let h=null,f=!1,x=0,g=0,w=null;i.addEventListener("pointerdown",c=>{const A=c.target,_=A==null?void 0:A.dataset.axis;_&&(h=c.pointerId,f=!1,x=c.clientX,g=c.clientY,w=_,i.setPointerCapture(c.pointerId),c.preventDefault(),c.stopPropagation())}),i.addEventListener("pointermove",c=>{if(h!==c.pointerId)return;const A=c.clientX-x,_=c.clientY-g;x=c.clientX,g=c.clientY,(Math.abs(A)>0||Math.abs(_)>0)&&(f=!0,t.onOrbitDrag(A,_)),c.preventDefault(),c.stopPropagation()});const b=c=>{h===c.pointerId&&(i.releasePointerCapture(c.pointerId),!f&&w&&t.onAlignAxis(w),h=null,w=null,c.preventDefault(),c.stopPropagation())};return i.addEventListener("pointerup",b),i.addEventListener("pointercancel",b),{update:c=>{const _=Oe.map(u=>{const[a,d,y]=u.dir,C=c[0]*a+c[4]*d+c[8]*y,G=c[1]*a+c[5]*d+c[9]*y,L=c[2]*a+c[6]*d+c[10]*y;return{camX:C,camY:G,camZ:L}}).map((u,a)=>({axis:u,index:a})).sort((u,a)=>u.axis.camZ-a.axis.camZ);for(const{axis:u,index:a}of _){const d=n.x+u.camX*r,y=n.y-u.camY*r,C=n.x-u.camX*r,G=n.y+u.camY*r,L=(u.camZ+1)*.5,T=Math.max(.35,Math.min(1,.35+L*.65)),S=o[a];i.appendChild(S.group),S.group.setAttribute("opacity",T.toFixed(3)),S.line.setAttribute("x2",String(d)),S.line.setAttribute("y2",String(y)),S.posCircle.setAttribute("cx",String(d)),S.posCircle.setAttribute("cy",String(y)),S.posLabel.setAttribute("x",String(d)),S.posLabel.setAttribute("y",String(y)),S.negCircle.setAttribute("cx",String(C)),S.negCircle.setAttribute("cy",String(G))}}}}function at(t){let e=[...ke],i=!1,n=performance.now();const r=new Set;let s=!1,o="orbit",h=0,f=0,x=0;const g=.92,w=.5;let b={dx:0,dy:0},m={dx:0,dy:0},c=0,A=0;const _=()=>{b={dx:0,dy:0},m={dx:0,dy:0},c=0,A=0},u=(d,y,C)=>{const G=B(e);if(!G)return;const L=4;let T=q(G,0,0,L);const S=[e[4],e[5],e[6]],$=Math.hypot(S[0],S[1],S[2]);$>1e-6&&(T=Z(T,5*d,S[0]/$,S[1]/$,S[2]/$)),T=Z(T,-5*y,1,0,0),T=q(T,0,0,-L);const J=B(T);J&&(e=J,C&&(b={dx:d,dy:y}))};window.addEventListener("keydown",d=>r.add(d.code)),window.addEventListener("keyup",d=>r.delete(d.code)),window.addEventListener("blur",()=>r.clear()),t.addEventListener("mousedown",d=>{d.preventDefault(),i=!1,s=!0,d.shiftKey?o="roll":d.ctrlKey||d.metaKey||d.button===2?o="pan":o="orbit",h=d.clientX,f=d.clientY,x=performance.now(),_()}),window.addEventListener("mouseup",()=>{performance.now()-x>80&&_(),s=!1}),t.addEventListener("contextmenu",d=>{d.preventDefault()}),window.addEventListener("mousemove",d=>{if(!s)return;d.preventDefault();const y=(d.clientX-h)/Math.max(window.innerWidth,1),C=(d.clientY-f)/Math.max(window.innerHeight,1);if(h=d.clientX,f=d.clientY,x=performance.now(),Math.abs(y)<1e-10&&Math.abs(C)<1e-10)return;let G=y,L=C;if(o==="orbit")u(G,L,!0);else if(o==="roll"){const T=B(e);if(!T)return;const S=B(Z(T,5*y,0,0,1));S&&(e=S),c=y}else{const T=B(e);if(!T)return;const S=q(T,-10*y,-10*C,0),$=B(S);$&&(e=$),m={dx:y,dy:C}}}),t.addEventListener("wheel",d=>{d.preventDefault(),i=!1,A+=-10*d.deltaY/Math.max(window.innerHeight,1)},{passive:!1});const a=d=>{if(i){const z=Math.sin((performance.now()-n)/5e3);let F=B(ke);if(!F)return;F=q(F,2.5*z,0,6*(1-Math.cos(z))),F=Z(F,-.6*z,0,1,0);const k=B(F);k&&(e=k);return}const y=d/(1e3/60),C=Math.pow(g,y);if(!s&&(Math.abs(b.dx)>1e-5||Math.abs(b.dy)>1e-5)){const z=B(e);if(z){let k=q(z,0,0,4);const j=[e[4],e[5],e[6]],W=Math.hypot(j[0],j[1],j[2]);W>1e-6&&(k=Z(k,5*b.dx*y,j[0]/W,j[1]/W,j[2]/W));const ne=-5*b.dy*y;k=Z(k,ne,1,0,0),k=q(k,0,0,-4);const H=B(k);H&&(e=H)}b.dx*=C,b.dy*=C}if(!s&&Math.abs(c)>1e-5){const z=B(e);if(z){const F=B(Z(z,5*c*y,0,0,1));F&&(e=F)}c*=C}if(!s&&(Math.abs(m.dx)>1e-5||Math.abs(m.dy)>1e-5)){const z=B(e);if(z){const F=q(z,-10*m.dx*y,-10*m.dy*y,0),k=B(F);k&&(e=k)}m.dx*=C,m.dy*=C}if(Math.abs(A)>1e-5){const z=B(e);if(z){const F=q(z,0,0,A*y),k=B(F);k&&(e=k)}A*=Math.pow(w,y)}const G=B(e);if(!G)return;const L=.003*d,T=8e-4*d;let S=G,$=!1;if(r.has("ArrowUp")&&(S=q(S,0,0,L),$=!0),r.has("ArrowDown")&&(S=q(S,0,0,-L),$=!0),r.has("ArrowLeft")&&(S=q(S,-L,0,0),$=!0),r.has("ArrowRight")&&(S=q(S,L,0,0),$=!0),r.has("KeyA")&&(S=Z(S,-T,0,1,0),$=!0),r.has("KeyD")&&(S=Z(S,T,0,1,0),$=!0),r.has("KeyW")&&(S=Z(S,T*.7,1,0,0),$=!0),r.has("KeyS")&&(S=Z(S,-T*.7,1,0,0),$=!0),!$)return;const J=B(S);J&&(e=J)};return{camera:{...Je},get viewMatrix(){return e},get isInteracting(){return s||r.size>0},setViewMatrix(d){e=[...d],_()},setCarousel(d){i=d,d&&(n=performance.now(),_())},update:a,orbitBy(d,y){i=!1,u(d,y,!1)}}}function lt(){const t=document.querySelector("#app");if(!t)throw new Error("Missing #app root element");const e=t.querySelector("#canvas"),i=t.querySelector("#message"),n=t.querySelector("#spinner"),r=t.querySelector("#fps"),s=t.querySelector("#progress"),o=t.querySelector("#dropzone"),h=t.querySelector("#btn-anaglyph"),f=t.querySelector("#btn-stereo");if(!e||!i||!n||!r||!s||!o||!h||!f)throw new Error("Missing viewer DOM nodes");return{canvas:e,message:i,spinner:n,fps:r,progress:s,dropzone:o,anaglyphButton:h,stereoButton:f}}function qe(t){t.spinner.classList.remove("hidden"),t.dropzone.classList.add("hidden")}function Ee(t){t.spinner.classList.add("hidden")}function ct(t,e){const i=()=>{const n=e.stereoMode==="anaglyph",r=e.stereoMode==="sbs";t.anaglyphButton.classList.toggle("active",n),t.stereoButton.classList.toggle("active",r),t.anaglyphButton.setAttribute("aria-pressed",String(n)),t.stereoButton.setAttribute("aria-pressed",String(r))};return t.anaglyphButton.addEventListener("click",()=>{e.stereoMode=e.stereoMode==="anaglyph"?"off":"anaglyph",i()}),t.stereoButton.addEventListener("click",()=>{e.stereoMode=e.stereoMode==="sbs"?"off":"sbs",i()}),i(),i}/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */class ee{constructor(e,i,n,r,s="div"){this.parent=e,this.object=i,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(s),this.domElement.classList.add("controller"),this.domElement.classList.add(r),this.$name=document.createElement("div"),this.$name.classList.add("name"),ee.nextNameID=ee.nextNameID||0,this.$name.id=`lil-gui-name-${++ee.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",o=>o.stopPropagation()),this.domElement.addEventListener("keyup",o=>o.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){const i=this.parent.add(this.object,this.property,e);return i.name(this._name),this.destroy(),i}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);const e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}}class dt extends ee{constructor(e,i,n){super(e,i,n,"boolean","label"),this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}}function $e(t){let e,i;return(e=t.match(/(#|0x)?([a-f0-9]{6})/i))?i=e[2]:(e=t.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?i=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=t.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(i=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),i?"#"+i:!1}const ut={isPrimitive:!0,match:t=>typeof t=="string",fromHexString:$e,toHexString:$e},Se={isPrimitive:!0,match:t=>typeof t=="number",fromHexString:t=>parseInt(t.substring(1),16),toHexString:t=>"#"+t.toString(16).padStart(6,0)},ht={isPrimitive:!1,match:t=>Array.isArray(t),fromHexString(t,e,i=1){const n=Se.fromHexString(t);e[0]=(n>>16&255)/255*i,e[1]=(n>>8&255)/255*i,e[2]=(n&255)/255*i},toHexString([t,e,i],n=1){n=255/n;const r=t*n<<16^e*n<<8^i*n<<0;return Se.toHexString(r)}},pt={isPrimitive:!1,match:t=>Object(t)===t,fromHexString(t,e,i=1){const n=Se.fromHexString(t);e.r=(n>>16&255)/255*i,e.g=(n>>8&255)/255*i,e.b=(n&255)/255*i},toHexString({r:t,g:e,b:i},n=1){n=255/n;const r=t*n<<16^e*n<<8^i*n<<0;return Se.toHexString(r)}},ft=[ut,Se,ht,pt];function mt(t){return ft.find(e=>e.match(t))}class gt extends ee{constructor(e,i,n,r){super(e,i,n,"color"),this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=mt(this.initialValue),this._rgbScale=r,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{const s=$e(this.$text.value);s&&this._setValueFromHexString(s)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){const i=this._format.fromHexString(e);this.setValue(i)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}}class Ve extends ee{constructor(e,i,n){super(e,i,n,"function"),this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",r=>{r.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}}class vt extends ee{constructor(e,i,n,r,s,o){super(e,i,n,"number"),this._initInput(),this.min(r),this.max(s);const h=o!==void 0;this.step(h?o:this._getImplicitStep(),h),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,i=!0){return this._step=e,this._stepExplicit=i,this}updateDisplay(){const e=this.getValue();if(this._hasSlider){let i=(e-this._min)/(this._max-this._min);i=Math.max(0,Math.min(i,1)),this.$fill.style.width=i*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;const i=()=>{let a=parseFloat(this.$input.value);isNaN(a)||(this._stepExplicit&&(a=this._snap(a)),this.setValue(this._clamp(a)))},n=a=>{const d=parseFloat(this.$input.value);isNaN(d)||(this._snapClampSetValue(d+a),this.$input.value=this.getValue())},r=a=>{a.key==="Enter"&&this.$input.blur(),a.code==="ArrowUp"&&(a.preventDefault(),n(this._step*this._arrowKeyMultiplier(a))),a.code==="ArrowDown"&&(a.preventDefault(),n(this._step*this._arrowKeyMultiplier(a)*-1))},s=a=>{this._inputFocused&&(a.preventDefault(),n(this._step*this._normalizeMouseWheel(a)))};let o=!1,h,f,x,g,w;const b=5,m=a=>{h=a.clientX,f=x=a.clientY,o=!0,g=this.getValue(),w=0,window.addEventListener("mousemove",c),window.addEventListener("mouseup",A)},c=a=>{if(o){const d=a.clientX-h,y=a.clientY-f;Math.abs(y)>b?(a.preventDefault(),this.$input.blur(),o=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(d)>b&&A()}if(!o){const d=a.clientY-x;w-=d*this._step*this._arrowKeyMultiplier(a),g+w>this._max?w=this._max-g:g+w<this._min&&(w=this._min-g),this._snapClampSetValue(g+w)}x=a.clientY},A=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",c),window.removeEventListener("mouseup",A)},_=()=>{this._inputFocused=!0},u=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",i),this.$input.addEventListener("keydown",r),this.$input.addEventListener("wheel",s,{passive:!1}),this.$input.addEventListener("mousedown",m),this.$input.addEventListener("focus",_),this.$input.addEventListener("blur",u)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");const e=(u,a,d,y,C)=>(u-a)/(d-a)*(C-y)+y,i=u=>{const a=this.$slider.getBoundingClientRect();let d=e(u,a.left,a.right,this._min,this._max);this._snapClampSetValue(d)},n=u=>{this._setDraggingStyle(!0),i(u.clientX),window.addEventListener("mousemove",r),window.addEventListener("mouseup",s)},r=u=>{i(u.clientX)},s=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",r),window.removeEventListener("mouseup",s)};let o=!1,h,f;const x=u=>{u.preventDefault(),this._setDraggingStyle(!0),i(u.touches[0].clientX),o=!1},g=u=>{u.touches.length>1||(this._hasScrollBar?(h=u.touches[0].clientX,f=u.touches[0].clientY,o=!0):x(u),window.addEventListener("touchmove",w,{passive:!1}),window.addEventListener("touchend",b))},w=u=>{if(o){const a=u.touches[0].clientX-h,d=u.touches[0].clientY-f;Math.abs(a)>Math.abs(d)?x(u):(window.removeEventListener("touchmove",w),window.removeEventListener("touchend",b))}else u.preventDefault(),i(u.touches[0].clientX)},b=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",w),window.removeEventListener("touchend",b)},m=this._callOnFinishChange.bind(this),c=400;let A;const _=u=>{if(Math.abs(u.deltaX)<Math.abs(u.deltaY)&&this._hasScrollBar)return;u.preventDefault();const d=this._normalizeMouseWheel(u)*this._step;this._snapClampSetValue(this.getValue()+d),this.$input.value=this.getValue(),clearTimeout(A),A=setTimeout(m,c)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",g,{passive:!1}),this.$slider.addEventListener("wheel",_,{passive:!1})}_setDraggingStyle(e,i="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${i}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:i,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(i=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),i+-n}_arrowKeyMultiplier(e){let i=this._stepExplicit?1:10;return e.shiftKey?i*=10:e.altKey&&(i/=10),i}_snap(e){let i=0;return this._hasMin?i=this._min:this._hasMax&&(i=this._max),e-=i,e=Math.round(e/this._step)*this._step,e+=i,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){const e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}}class xt extends ee{constructor(e,i,n,r){super(e,i,n,"option"),this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(r)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(i=>{const n=document.createElement("option");n.textContent=i,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){const e=this.getValue(),i=this._values.indexOf(e);return this.$select.selectedIndex=i,this.$display.textContent=i===-1?e:this._names[i],this}}class yt extends ee{constructor(e,i,n){super(e,i,n,"string"),this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",r=>{r.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}}var wt=`.lil-gui {
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
}`;function bt(t){const e=document.createElement("style");e.innerHTML=t;const i=document.querySelector("head link[rel=stylesheet], head style");i?document.head.insertBefore(e,i):document.head.appendChild(e)}let Ie=!1;class Be{constructor({parent:e,autoPlace:i=e===void 0,container:n,width:r,title:s="Controls",closeFolders:o=!1,injectStyles:h=!0,touchStyles:f=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(s),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),f&&this.domElement.classList.add("allow-touch-styles"),!Ie&&h&&(bt(wt),Ie=!0),n?n.appendChild(this.domElement):i&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),r&&this.domElement.style.setProperty("--width",r+"px"),this._closeFolders=o}add(e,i,n,r,s){if(Object(n)===n)return new xt(this,e,i,n);const o=e[i];switch(typeof o){case"number":return new vt(this,e,i,n,r,s);case"boolean":return new dt(this,e,i);case"string":return new yt(this,e,i);case"function":return new Ve(this,e,i)}console.error(`gui.add failed
	property:`,i,`
	object:`,e,`
	value:`,o)}addColor(e,i,n=1){return new gt(this,e,i,n)}addFolder(e){const i=new Be({parent:this,title:e});return this.root._closeFolders&&i.close(),i}load(e,i=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Ve||n._name in e.controllers&&n.load(e.controllers[n._name])}),i&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){const i={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Ve)){if(n._name in i.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);i.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in i.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);i.folders[n._title]=n.save()}),i}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{const i=this.$children.clientHeight;this.$children.style.height=i+"px",this.domElement.classList.add("transition");const n=s=>{s.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);const r=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=r+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(i=>{e=e.concat(i.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(i=>{e=e.concat(i.foldersRecursive())}),e}}function At(t,e,i){const n=new Be({title:"Render"});n.add({reset:()=>{e.onReset()}},"reset").name("Reset All Settings");const r=n.addFolder("Splat Settings");r.add(t,"pointCloud").name("Point Cloud"),r.add(t,"pointSize",.5,6,.1).name("Point Size"),r.add(t,"splatScale",0,1,.001).name("Splatscale"),r.add(t,"antialias",0,4,.001).name("Antialias"),r.close();const s=n.addFolder("Camera");s.add(t,"fov",20,120,.1).name("FOV"),s.add(t,"animateCamera").name("Animate Transitions"),s.add(t,"animationDuration",0,3e3,1).name("Animation duration (ms)"),s.add({loadCameras:()=>{const h=document.createElement("input");h.type="file",h.accept=".json",h.onchange=async()=>{var x;const f=(x=h.files)==null?void 0:x[0];if(f){qe(i);try{const g=JSON.parse(await f.text());Array.isArray(g)&&g.length>0&&(e.onCamerasLoaded(g,s,e),e.onApplyCamera(0)),Ee(i)}catch(g){Ee(i),i.message.textContent=`Error loading cameras: ${g instanceof Error?g.message:String(g)}`}}},h.click()}},"loadCameras").name("Load Cameras"),s.add({logPose:()=>{e.onLogPose()}},"logPose").name("Log Camera Pose"),s.close();const o=n.addFolder("Adjust Colors");return o.add(t,"brightness",-1,1,.001).name("Brightness"),o.add(t,"contrast",0,3,.001).name("Contrast"),o.add(t,"gamma",.1,3,.001).name("Gamma"),o.add(t,"blackLevel",-1,1,.001).name("Blacklevel"),o.add(t,"whiteLevel",-1,1,.001).name("Whitelevel"),o.add(t,"intensity",0,3,.001).name("Intensity"),o.add(t,"saturate",0,3,.001).name("Saturate"),o.add(t,"vibrance",-1,1,.001).name("Vibrance"),o.add(t,"temperature",-1,1,.001).name("Temperature"),o.add(t,"tint",-1,1,.001).name("Tint"),o.add(t,"alpha",0,1,.001).name("Alpha"),o.close(),n}function _t(t){const{applyCamera:e,getCurrentCameraIndex:i,saveViewToHash:n,setCarousel:r}=t;window.addEventListener("keydown",s=>{if(/^\d$/.test(s.key)){e(Number.parseInt(s.key,10));return}if(s.key==="-"||s.key==="_"){e(i()-1);return}if(s.key==="+"||s.key==="="){e(i()+1);return}if(s.code==="KeyP"){r(!0);return}s.code==="KeyV"&&n()})}function St(t){const{dropzone:e,onFile:i}=t,n=s=>{s.preventDefault(),s.stopPropagation()};document.addEventListener("dragenter",n),document.addEventListener("dragover",n),document.addEventListener("dragleave",n),document.addEventListener("drop",s=>{var h,f;n(s);const o=(f=(h=s.dataTransfer)==null?void 0:h.files)==null?void 0:f[0];o&&i(o)});const r=document.createElement("input");r.type="file",r.accept=".splat,.ply",r.style.display="none",document.body.appendChild(r),r.addEventListener("change",()=>{var o;const s=(o=r.files)==null?void 0:o[0];s&&i(s),r.value=""}),e.addEventListener("click",()=>{r.click()})}const Ue=32,Ct=`/**
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
`,Ne=`/**
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
`,Ye=`/**
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
`,We=52,Mt=We*4;async function Lt(t){const e=await navigator.gpu.requestAdapter();if(!e)throw new Error("No compatible GPU adapter found");const i=await e.requestDevice({requiredLimits:{maxStorageBufferBindingSize:e.limits.maxStorageBufferBindingSize,maxBufferSize:e.limits.maxBufferSize}}),n=t.getContext("webgpu");if(!n)throw new Error("Unable to create WebGPU canvas context");const r=navigator.gpu.getPreferredCanvasFormat(),s=p=>i.createBuffer({label:p,size:Mt,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),o=s("viewer uniforms"),h=s("viewer uniforms B"),f=s("viewer uniforms C"),x=s("viewer uniforms D"),g=new Float32Array([-2,-2,2,-2,-2,2,2,2]),w=i.createBuffer({label:"quad vertices",size:g.byteLength,usage:GPUBufferUsage.VERTEX|GPUBufferUsage.COPY_DST});i.queue.writeBuffer(w,0,g);let b=8,m=4,c=0,A=i.createBuffer({label:"splat buffer",size:b*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),_=i.createBuffer({label:"sorted index buffer",size:m*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST});const u=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.VERTEX|GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}},{binding:1,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}},{binding:2,visibility:GPUShaderStage.VERTEX,buffer:{type:"read-only-storage"}}]}),a=p=>i.createBindGroup({layout:u,entries:[{binding:0,resource:{buffer:p}},{binding:1,resource:{buffer:A}},{binding:2,resource:{buffer:_}}]}),d=()=>{y=a(o),C=a(h),G=a(f),L=a(x)};let y=a(o),C=a(h),G=a(f),L=a(x);const S=((p=GPUColorWrite.ALL)=>i.createRenderPipeline({layout:i.createPipelineLayout({bindGroupLayouts:[u]}),vertex:{module:i.createShaderModule({code:Ct}),entryPoint:"vs_main",buffers:[{arrayStride:8,stepMode:"vertex",attributes:[{shaderLocation:0,format:"float32x2",offset:0}]}]},fragment:{module:i.createShaderModule({code:Et}),entryPoint:"fs_main",targets:[{format:r,blend:{color:{srcFactor:"one-minus-dst-alpha",dstFactor:"one",operation:"add"},alpha:{srcFactor:"one-minus-dst-alpha",dstFactor:"one",operation:"add"}},writeMask:p}]},primitive:{topology:"triangle-strip"}}))(),$=i.createSampler({magFilter:"linear",minFilter:"linear"}),J=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}}]}),z=i.createRenderPipeline({layout:i.createPipelineLayout({bindGroupLayouts:[J]}),vertex:{module:i.createShaderModule({code:Ne}),entryPoint:"vs_main"},fragment:{module:i.createShaderModule({code:Ne}),entryPoint:"fs_main",targets:[{format:r}]},primitive:{topology:"triangle-strip"}}),F=i.createBindGroupLayout({entries:[{binding:0,visibility:GPUShaderStage.FRAGMENT,sampler:{type:"filtering"}},{binding:1,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:2,visibility:GPUShaderStage.FRAGMENT,texture:{sampleType:"float"}},{binding:3,visibility:GPUShaderStage.FRAGMENT,buffer:{type:"uniform"}}]}),k=i.createRenderPipeline({layout:i.createPipelineLayout({bindGroupLayouts:[F]}),vertex:{module:i.createShaderModule({code:Ye}),entryPoint:"vs_main"},fragment:{module:i.createShaderModule({code:Ye}),entryPoint:"fs_main",targets:[{format:r}]},primitive:{topology:"triangle-strip"}}),j=i.createBuffer({label:"crossfade uniforms",size:16,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST});let W=X(),ne=X(),H=X(),de=X(),ge=Ce(),ue=be(),re=1,ve=0,we=0,l=0,v=0;const D=p=>{p<=b||(b=je(p),A.destroy(),A=i.createBuffer({label:"splat buffer",size:b*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),d())},O=p=>{p<=m||(m=je(p),_.destroy(),_=i.createBuffer({label:"sorted index buffer",size:m*4,usage:GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_DST}),d())},P=()=>{const p=Math.max(1,window.devicePixelRatio||1),N=Math.max(1,Math.round(t.clientWidth*p*re)),Y=Math.max(1,Math.round(t.clientHeight*p*re));N===ve&&Y===we||(ve=N,we=Y,t.width=N,t.height=Y,n.configure({device:i,format:r,alphaMode:"premultiplied"}),[W,ne,H,de].forEach(pe=>pe.destroy()),W=X(),ne=X(),H=X(),de=X(),ge=Ce(),ue=be())};window.addEventListener("resize",P),P();const M=new Float32Array(We),I=p=>{const N=performance.now(),Y=(E,R,K,Q,le,ce,me)=>{M.set(E,0),M.set(R,16),M[32]=p.focal[0],M[33]=p.focal[1],M[34]=K,M[35]=Q,M[36]=le,M[37]=p.pointSize,M[38]=ce,M[39]=p.splatScale,M[40]=p.brightness,M[41]=p.contrast,M[42]=p.gamma,M[43]=p.alpha,M[44]=p.blackLevel,M[45]=p.whiteLevel,M[46]=p.intensity,M[47]=p.saturate,M[48]=p.vibrance,M[49]=p.temperature,M[50]=p.tint,M[51]=p.antialias,i.queue.writeBuffer(me,0,M)},pe=()=>{const E=[...p.projection];return E[0]*=2,E},te=Math.max(0,Math.min(1,p.transition)),Re=te>0&&te<1,oe=i.createCommandEncoder(),ae=n.getCurrentTexture().createView(),fe=E=>{const R=oe.beginRenderPass({colorAttachments:[{view:E.targetView,clearValue:{r:0,g:0,b:0,a:0},loadOp:E.clear?"clear":"load",storeOp:"store"}]});R.setBindGroup(0,E.bg),R.setVertexBuffer(0,w),R.setViewport(E.viewportX,E.viewportY,E.viewportWidth,E.viewportHeight,0,1),Y(E.projection,E.view,E.logicalViewportWidth,E.logicalViewportHeight,E.mode,E.opacity,E.ub),R.setPipeline(S),R.draw(4,c,0,0),R.end()},V=(E,R,K,Q,le,ce,me,Ae,_e,Le,Ge,De,Pe,Te,Xe)=>{if(Re)if(Xe)fe({targetView:E,view:R,viewportX:K,viewportY:Q,viewportWidth:le,viewportHeight:ce,logicalViewportWidth:me,logicalViewportHeight:Ae,projection:_e,clear:Le,mode:0,opacity:1-te,ub:Ge,bg:De}),fe({targetView:E,view:R,viewportX:K,viewportY:Q,viewportWidth:le,viewportHeight:ce,logicalViewportWidth:me,logicalViewportHeight:Ae,projection:_e,clear:!1,mode:1,opacity:te,ub:Pe,bg:Te});else{i.queue.writeBuffer(j,0,new Float32Array([te])),fe({targetView:H.createView(),view:R,viewportX:0,viewportY:0,viewportWidth:le,viewportHeight:ce,logicalViewportWidth:me,logicalViewportHeight:Ae,projection:_e,clear:!0,mode:0,opacity:1,ub:Ge,bg:De}),fe({targetView:de.createView(),view:R,viewportX:0,viewportY:0,viewportWidth:le,viewportHeight:ce,logicalViewportWidth:me,logicalViewportHeight:Ae,projection:_e,clear:!0,mode:1,opacity:1,ub:Pe,bg:Te});const ie=oe.beginRenderPass({colorAttachments:[{view:E,clearValue:{r:0,g:0,b:0,a:1},loadOp:Le?"clear":"load",storeOp:"store"}]});ie.setPipeline(k),ie.setBindGroup(0,ue),ie.setViewport(K,Q,le,ce,0,1),ie.draw(4,1,0,0),ie.end()}else{const ie=te<.5?0:1;fe({targetView:E,view:R,viewportX:K,viewportY:Q,viewportWidth:le,viewportHeight:ce,logicalViewportWidth:me,logicalViewportHeight:Ae,projection:_e,clear:Le,mode:ie,opacity:1,ub:ie===0?Ge:Pe,bg:ie===0?De:Te})}};if(c>0&&p.stereoMode==="anaglyph"){V(W.createView(),p.viewLeft,0,0,t.width,t.height,p.viewport[0],p.viewport[1],p.projection,!0,o,y,f,G,!1),V(ne.createView(),p.viewRight,0,0,t.width,t.height,p.viewport[0],p.viewport[1],p.projection,!0,h,C,x,L,!1);const E=oe.beginRenderPass({colorAttachments:[{view:ae,clearValue:{r:0,g:0,b:0,a:1},loadOp:"clear",storeOp:"store"}]});E.setPipeline(z),E.setBindGroup(0,ge),E.draw(4,1,0,0),E.end()}else if(c>0&&p.stereoMode==="sbs"){const E=Math.max(1,Math.floor(t.width/2)),R=pe(),K=Math.max(1,Math.floor(p.viewport[0]/2)),Q=Math.max(1,p.viewport[0]-K);V(ae,p.viewLeft,0,0,E,t.height,K,p.viewport[1],R,!0,o,y,f,G,!0),V(ae,p.viewRight,E,0,t.width-E,t.height,Q,p.viewport[1],R,!1,h,C,x,L,!0)}else c>0?V(ae,p.view,0,0,t.width,t.height,p.viewport[0],p.viewport[1],p.projection,!0,o,y,f,G,!1):oe.beginRenderPass({colorAttachments:[{view:ae,clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"store"}]}).end();i.queue.submit([oe.finish()]),v=performance.now()-N},se=(p,N)=>{if(N<=0||p.length<=0){c=0;return}const Y=performance.now();D(p.length);const pe=new Uint32Array(p);i.queue.writeBuffer(A,0,pe),l+=performance.now()-Y,c=N},xe=p=>{if(p.length<=0){c=0;return}const N=performance.now();O(p.length);const Y=new Uint32Array(p);i.queue.writeBuffer(_,0,Y),l+=performance.now()-N,c=p.length},he=p=>{const N=Math.max(.3,Math.min(1,p)),Y=Math.round(N*20)/20;Math.abs(Y-re)<1e-6||(re=Y,P())},Me=()=>{const p={uploadMs:l,renderMs:v};return l=0,p};function X(){return i.createTexture({size:{width:Math.max(1,t.width),height:Math.max(1,t.height),depthOrArrayLayers:1},format:r,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.TEXTURE_BINDING})}function Ce(){return i.createBindGroup({layout:J,entries:[{binding:0,resource:$},{binding:1,resource:W.createView()},{binding:2,resource:ne.createView()}]})}function be(){return i.createBindGroup({layout:F,entries:[{binding:0,resource:$},{binding:1,resource:H.createView()},{binding:2,resource:de.createView()},{binding:3,resource:{buffer:j}}]})}return{render:I,setSplatData:se,setSortedIndices:xe,setResolutionScale:he,consumeTimings:Me}}function je(t){let e=1;for(;e<t;)e<<=1;return e}function Gt(t){const e=new Worker(new URL("/splat/assets/sort-worker.worker-B6EnETQq.js",import.meta.url),{type:"module"});return e.onmessage=i=>{var r,s,o;const n=i.data;if(n.type==="depth"){(r=t.onSortResult)==null||r.call(t,{depthIndex:new Uint32Array(n.depthIndex),vertexCount:n.vertexCount,sortMs:n.sortMs});return}if(n.type==="splat"){(s=t.onSplatData)==null||s.call(t,{splatData:new Uint32Array(n.splatData),vertexCount:n.vertexCount});return}n.type==="buffer"&&((o=t.onConvertedBuffer)==null||o.call(t,n.buffer,n.save))},{postViewProjection(i){e.postMessage({type:"view",viewProj:i})},postSplatBuffer(i,n){e.postMessage({type:"buffer",buffer:i,vertexCount:n},[i])},postPlyBuffer(i,n=!1){e.postMessage({type:"ply",buffer:i,save:n},[i])},terminate(){e.terminate()}}}const He={pointCloud:!1,pointSize:.8,stereoMode:"off",fov:75,splatScale:1,antialias:.3,brightness:0,contrast:1,gamma:1,blackLevel:0,whiteLevel:0,intensity:1,saturate:1,vibrance:0,temperature:0,tint:0,alpha:1,animateCamera:!0,animationDuration:1350},Dt=[112,108,121,10];function Pt(t,e){return(t%e+e)%e}function Tt(t){if(!t)return null;try{const e=JSON.parse(decodeURIComponent(t));if(!Array.isArray(e)||e.length!==16)return null;const i=e.map(Number);return i.some(n=>Number.isNaN(n))?null:i}catch{return null}}function Vt(t){const e=t.map(i=>Math.round(i*100)/100);return JSON.stringify(e)}function $t(t,e){const i=new Uint8Array(t),n=new Blob([i.buffer],{type:"application/octet-stream"}),r=URL.createObjectURL(n),s=document.createElement("a");s.download=e,s.href=r,document.body.appendChild(s),s.click(),s.remove(),URL.revokeObjectURL(r)}function Bt(t){const e=new Uint8Array(t);return Dt.every((i,n)=>e[n]===i)}const U=lt();async function Rt(){if(!navigator.gpu){U.message.textContent="WebGPU is not available in this browser.";return}const t=await Lt(U.canvas),e=at(U.canvas),i={...He};let n=[...Ke],r=0,s=null,o=null,h=0;const f=l=>{const v=Math.hypot(l[0],l[1],l[2]);return v>1e-6?[l[0]/v,l[1]/v,l[2]/v]:[0,0,1]},x=(l,v)=>[l[1]*v[2]-l[2]*v[1],l[2]*v[0]-l[0]*v[2],l[0]*v[1]-l[1]*v[0]],g=(l,v,D)=>{const O=f([v[0]-l[0],v[1]-l[1],v[2]-l[2]]),P=f(x(D,O)),M=f(x(O,P));return[P[0],M[0],O[0],0,P[1],M[1],O[1],0,P[2],M[2],O[2],0,-(P[0]*l[0]+P[1]*l[1]+P[2]*l[2]),-(M[0]*l[0]+M[1]*l[1]+M[2]*l[2]),-(O[0]*l[0]+O[1]*l[1]+O[2]*l[2]),1]},b=ot({onAlignAxis:l=>{const v=B(e.viewMatrix);if(!v)return;const D=[v[12],v[13],v[14]],O=f([v[8],v[9],v[10]]),P=[D[0]+O[0]*4,D[1]+O[1]*4,D[2]+O[2]*4],I={px:[1,0,0],py:[0,1,0],pz:[0,0,1],nx:[-1,0,0],ny:[0,-1,0],nz:[0,0,-1]}[l],se=Math.max(Math.hypot(D[0]-P[0],D[1]-P[1],D[2]-P[2]),1),xe=[P[0]+I[0]*se,P[1]+I[1]*se,P[2]+I[2]*se],he=Math.abs(I[1])>.99?[0,0,I[1]>0?-1:1]:[0,1,0];e.setViewMatrix(g(xe,P,he)),e.setCarousel(!1)},onOrbitDrag:(l,v)=>{e.orbitBy(l/Math.max(window.innerWidth,1),v/Math.max(window.innerHeight,1))}}),m=l=>{if(!n.length)return;r=Pt(l,n.length);const v=n[r],D=Qe(v);i.animateCamera?(s=[...e.viewMatrix],o=[...D],h=performance.now()):(e.setViewMatrix(D),s=null,o=null),e.camera.fx=v.fx,e.camera.fy=v.fy,e.setCarousel(!1)},c={selectedCamera:""};let A=null;const _=(l,v,D)=>{A&&A.destroy();const O=l.map((P,M)=>`${M+1}: ${P.img_name}`);c.selectedCamera=O[0]||"",A=v.add(c,"selectedCamera",O).name("Positions").onChange(P=>{const M=P.split(":")[0],I=Number.parseInt(M,10)-1;I>=0&&I<l.length&&D.onApplyCamera(I)})},u={onCamerasLoaded:(l,v,D)=>{n=l,_(l,v,D)},onApplyCamera:l=>{m(l)},onLogPose:()=>{const l=B(e.viewMatrix);if(!l)return;const v={id:crypto.randomUUID(),img_name:`custom_${n.length}`,width:U.canvas.width,height:U.canvas.height,position:[l[12],l[13],l[14]],rotation:[[l[0],l[4],l[8]],[l[1],l[5],l[9]],[l[2],l[6],l[10]]],fy:e.camera.fy,fx:e.camera.fx};console.log("Current Camera Pose:",JSON.stringify(v,null,2))},onReset:()=>{Object.assign(i,He),a.controllersRecursive().forEach(l=>l.updateDisplay()),d()}},a=At(i,u,U),d=ct(U,i),y=a.folders.find(l=>l._title==="Camera");let C=0,G=0,L=1,T=performance.now(),S=0;const $=[...e.viewMatrix];let J=!1,z=0;const F=new Float32Array(16);let k=0,j=!1;const W=l=>{const v=Tt(l);return v?(e.setViewMatrix(v),e.setCarousel(!1),!0):!1},ne=()=>{location.hash=`#${encodeURIComponent(Vt(e.viewMatrix))}`},H=Gt({onSortResult:({depthIndex:l,sortMs:v})=>{t.setSortedIndices(l),k=v,j=!0},onSplatData:({splatData:l,vertexCount:v})=>{C=v,t.setSplatData(l,v),Ee(U),U.dropzone.classList.add("hidden"),st(l,v,e)},onConvertedBuffer:(l,v)=>{const D=new Uint8Array(l);C=Math.floor(D.byteLength/Ue),H.postSplatBuffer(l,C),v&&$t(D,"model.splat")}});W(location.hash.slice(1))||m(r),_t({applyCamera:m,getCurrentCameraIndex:()=>r,saveViewToHash:ne,setCarousel:l=>e.setCarousel(l)}),window.addEventListener("hashchange",()=>{W(location.hash.slice(1))}),St({dropzone:U.dropzone,onFile:async l=>{if(e.setCarousel(!1),qe(U),/\.json$/i.test(l.name)){const D=JSON.parse(await l.text());Array.isArray(D)&&D.length>0&&(n=D,y&&_(D,y,u),m(0),Ee(U));return}const v=await l.arrayBuffer();if(Bt(v)){H.postPlyBuffer(v,!1);return}C=Math.floor(v.byteLength/Ue),H.postSplatBuffer(v,C)}}),U.progress.style.display="none",U.message.textContent="";let de=performance.now(),ge=0,ue=0,re=0,ve=0;const we=l=>{const v=Math.max(l-de,1e-4),D=Math.min(v,34);if(de=l,e.update(D),b.update(e.viewMatrix),e.isInteracting&&(s=null,o=null),s&&o){const V=l-h,E=Math.max(i.animationDuration,1),R=Math.min(V/E,1),K=R*R*(3-2*R),Q=rt(s,o,K);e.setViewMatrix(Q),R>=1&&(s=null,o=null)}let O=0;for(let V=0;V<16;V++){const E=e.viewMatrix[V];O+=Math.abs(E-$[V]),$[V]=E}O>1e-4&&(T=l);const P=l-T<140,M=l-S>180;i.pointCloud?L!==1&&(L=1,S=l,t.setResolutionScale(L)):P&&L>.7&&M?(L=.7,S=l,t.setResolutionScale(L)):!P&&L<1&&M&&(L=L<.85?.85:1,S=l,t.setResolutionScale(L));const I=i.pointCloud?1:0;if(G!==I){const V=v/500*Math.sign(I-G);G=I>G?Math.min(I,G+V):Math.max(I,G+V),Math.abs(G-I)<.001&&(G=I)}const se=Math.max(1,window.devicePixelRatio||1),xe=Math.max(1,Math.round(U.canvas.clientWidth*se)),he=Math.max(1,Math.round(U.canvas.clientHeight*se)),Me=i.fov*Math.PI/180,X=he/(2*Math.tan(Me/2)),Ce=e.camera.fx/Math.max(e.camera.fy,1e-6),be=X*Ce,p=Ze(be,X,xe,he),N=et(p,e.viewMatrix);let Y=0;for(let V=0;V<16;V++)Y=Math.max(Y,Math.abs(N[V]-F[V]));const pe=P?28:85,te=l-z;if(!J||Y>5e-4&&te>=pe||te>=220){H.postViewProjection(N);for(let V=0;V<16;V++)F[V]=N[V];J=!0,z=l}const oe=i.stereoMode==="anaglyph"?.04:.065;t.render({projection:p,view:e.viewMatrix,viewLeft:Fe(e.viewMatrix,-oe),viewRight:Fe(e.viewMatrix,oe),focal:[be,X],viewport:[xe,he],transition:G,pointSize:i.pointSize,splatScale:i.splatScale,antialias:i.antialias,stereoMode:i.stereoMode,brightness:i.brightness,contrast:i.contrast,gamma:i.gamma,blackLevel:i.blackLevel,whiteLevel:i.whiteLevel,intensity:i.intensity,saturate:i.saturate,vibrance:i.vibrance,temperature:i.temperature,tint:i.tint,alpha:i.alpha});const ae=t.consumeTimings(),fe=1e3/v;ge=ge*.9+fe*.1,re=re*.85+ae.uploadMs*.15,ve=ve*.85+ae.renderMs*.15,j?(ue=ue*.75+k*.25,j=!1):ue*=.99,U.fps.textContent=`${Math.round(ge)} fps | ${C.toLocaleString()} pts | sort ${ue.toFixed(1)}ms | upload ${re.toFixed(2)}ms | render ${ve.toFixed(2)}ms`,requestAnimationFrame(we)};window.addEventListener("beforeunload",()=>H.terminate()),window.addEventListener("beforeunload",()=>a.destroy()),requestAnimationFrame(we)}Rt().catch(t=>{const e=t instanceof Error?t.message:String(t);U.message.textContent=`Renderer init failed: ${e}`});
