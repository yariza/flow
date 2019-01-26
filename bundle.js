!function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={i:i,l:!1,exports:{}};return e[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(i,o,function(t){return e[t]}.bind(null,o));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=2)}([function(e,t,n){var i;i="undefined"!=typeof window?window:this,e.exports=function(e,t){"use strict";var n="E LN10 LN2 LOG2E LOG10E PI SQRT1_2 SQRT2 abs acos asin atan ceil cos exp floor log round sin sqrt tan atan2 pow max min".split(" "),i=Math,o="canvas",r="dom",a=t,u=e,l=[],c={fullscreen:!0,autostart:!0,autoclear:!0,autopause:!0,container:a.body,interval:1,globals:!0,retina:!1,type:o},s={8:"BACKSPACE",9:"TAB",13:"ENTER",16:"SHIFT",27:"ESCAPE",32:"SPACE",37:"LEFT",38:"UP",39:"RIGHT",40:"DOWN"};function d(e){return"function"==typeof e}function f(e){return"string"==typeof e}function p(e,t,n){for(var i in t)!n&&i in e||(e[i]=t[i]);return e}function m(e,t){return function(){e.apply(t,arguments)}}function h(e){var t,n,i,c,h,g,v,w,y,x,b,S,A,C,T,E,D,R=0,k=[],F=!1,O=!1,I=!1,X=u.devicePixelRatio||1,_=e.type==r,B=e.type==o,Y={x:0,y:0,ox:0,oy:0,dx:0,dy:0},V=[e.eventTarget||e.element,H,"mousedown","touchstart",H,"mousemove","touchmove",H,"mouseup","touchend",H,"click",H,"mouseout",H,"mouseover",a,function(t){var n;S=t.keyCode,A="keyup"==t.type,N[S]=N[(n=S,s[n]||String.fromCharCode(n))]=!A,j(e[t.type],t)},"keydown","keyup",u,function(t){e.autopause&&("blur"==t.type?W:U)(),j(e[t.type],t)},"focus","blur",z,"resize"],N={};for(S in s)N[s[S]]=!1;function j(t){d(t)&&t.apply(e,[].splice.call(arguments,1))}function G(e){for(g=0;g<V.length;g++)f(y=V[g])?i[(e?"add":"remove")+"EventListener"].call(i,y,n,{passive:!1,capture:!1}):d(y)?n=y:i=y}function z(){i=_?e.style:e.canvas,v=_?"px":"",E=e.width,D=e.height,e.fullscreen&&(D=e.height=u.innerHeight,E=e.width=u.innerWidth),e.retina&&B&&X&&(i.style.height=D+"px",i.style.width=E+"px",E*=X,D*=X),i.height!==D&&(i.height=D+v),i.width!==E&&(i.width=E+v),B&&!e.autoclear&&e.retina&&e.scale(X,X),I&&j(e.resize)}function L(t,n){return function(e,t){h=t.getBoundingClientRect(),e.x=e.pageX-h.left-(u.scrollX||u.pageXOffset),e.y=e.pageY-h.top-(u.scrollY||u.pageYOffset)}(t,e.element),(n=n||{}).ox=n.x||t.x,n.oy=n.y||t.y,n.x=t.x,n.y=t.y,n.dx=n.x-n.ox,n.dy=n.y-n.oy,n}function q(t){if(t.currentTarget===e.element&&t.preventDefault(),(x=function(e){var t={};for(var n in e)"webkitMovementX"!==n&&"webkitMovementY"!==n&&(d(e[n])?t[n]=m(e[n],e):t[n]=e[n]);return t}(t)).originalEvent=t,x.touches)for(k.length=x.touches.length,g=0;g<x.touches.length;g++)k[g]=L(x.touches[g],k[g]);else k.length=0,k[0]=L(x,Y);return p(Y,k[0],!0),x}function H(t){for(O=!0,t=q(t),C=(T=V.indexOf(b=t.type))-1,e.dragging=!!/down|start/.test(b)||!/up|end/.test(b)&&e.dragging;C;)f(V[C])?j(e[V[C--]],t):f(V[T])?j(e[V[T++]],t):C=0}function U(){e.now=+new Date,e.running=!0}function W(){e.running=!1}return p(e,{touches:k,mouse:Y,keys:N,dragging:!1,running:!1,millis:0,now:NaN,dt:NaN,destroy:function(){c=e.element.parentNode,g=l.indexOf(e),c&&c.removeChild(e.element),~g&&l.splice(g,1),G(!1),W()},toggle:function(){(e.running?W:U)()},clear:function(){B&&e.clearRect(0,0,e.width*X,e.height*X)},start:U,stop:W}),l.push(e),e.autostart&&U(),G(!0),z(),function n(){M(t),t=P(n),I||(j(e.setup),I=d(e.setup)),F||(j(e.resize),F=d(e.resize)),O||(Y.dx=Y.dy=0,Y.ox=Y.x,Y.oy=Y.y),O=!1,e.running&&!R&&(e.dt=(w=+new Date)-e.now,e.millis+=e.dt,e.now=w,j(e.update),B&&(e.retina&&(e.save(),e.autoclear&&e.scale(X,X)),e.autoclear&&e.clear()),j(e.draw),B&&e.retina&&e.restore()),R=++R%e.interval}(),e}for(var g,v,w={CANVAS:o,WEB_GL:"webgl",WEBGL:"webgl",DOM:r,instances:l,install:function(e){if(!e.__hasSketch){for(var t=0;t<n.length;t++)e[n[t]]=i[n[t]];p(e,{TWO_PI:2*i.PI,HALF_PI:i.PI/2,QUARTER_PI:i.PI/4,random:function(e,t){return n=e,"[object Array]"==Object.prototype.toString.call(n)?e[~~(i.random()*e.length)]:(function(e){return"number"==typeof e}(t)||(t=e||1,e=0),e+i.random()*(t-e));var n},lerp:function(e,t,n){return e+n*(t-e)},map:function(e,t,n,i,o){return(e-t)/(n-t)*(o-i)+i}}),e.__hasSketch=!0}},create:function(e){return(e=p(e||{},c)).globals&&w.install(self),g=e.element=e.element||a.createElement(e.type===r?"div":"canvas"),v=e.context=e.context||function(){switch(e.type){case o:return g.getContext("2d",e);case"webgl":return g.getContext("webgl",e)||g.getContext("experimental-webgl",e);case r:return g.canvas=g}}(),(e.container||a.body).appendChild(g),w.augment(v,e)},augment:function(e,t){return(t=p(t||{},c)).element=e.canvas||e,t.element.className+=" sketch",p(e,t,!0),h(e)}},y=["ms","moz","webkit","o"],x=self,b=0,S="AnimationFrame",A="request"+S,C="cancel"+S,P=x[A],M=x[C],T=0;T<y.length&&!P;T++)P=x[y[T]+"Request"+S],M=x[y[T]+"Cancel"+S];return x[A]=P=P||function(e){var t=+new Date,n=i.max(0,16-(t-b)),o=setTimeout(function(){e(t+n)},n);return b=t+n,o},x[C]=M=M||function(e){clearTimeout(e)},w}(i,i.document)},function(e,t,n){var i=n(5);e.exports=function(e,t,n,o){var r,a,u,l,c=[],s=function(e){console.log(e)},d=function(e){c.forEach(function(t){t(e)})};navigator.getUserMedia||(navigator.getUserMedia=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia);this.startCapture=function(){a||function(){l||((r=e||window.document.createElement("video")).style.width=window.document.width+"px",r.style.height=window.document.height+"px",r.setAttribute("autoplay",!0),r.setAttribute("playsinline",!0),r.setAttribute("muted",""),l=new i(r,t));window.MediaStreamTrack.getSources?window.MediaStreamTrack.getSources(function(e){for(var t=0;t<e.length&&("video"!==e[t].kind||(selectedVideoSource=e[t].id,e[t].facing!==n));t++);desiredDevice=o||{optional:[{sourceId:selectedVideoSource}]},navigator.getUserMedia({video:desiredDevice,audio:!1},function(e){a=!0,u=e,r.srcObject=e,window.document.body.appendChild(r),e&&(l.startCapture(r),l.onCalculated(d))},s)}):navigator.mediaDevices.enumerateDevices&&navigator.mediaDevices.enumerateDevices().then(function(e){for(var t=0;t<e.length;t++)"videoinput"==e[t].kind&&(selectedVideoSource=e[t].deviceId);desiredDevice={optional:[{sourceId:selectedVideoSource}]},navigator.getUserMedia({video:desiredDevice},function(e){a=!0,u=e,r.srcObject=e,window.document.body.appendChild(r),e&&(l.startCapture(r),l.onCalculated(d))},s)})}()},this.onCalculated=function(e){c.push(e)},this.stopCapture=function(){a=!1,l&&l.stopCapture(),r&&r.pause(),u&&u.stop()}}},function(e,t,n){e.exports=n(3)},function(e,t,n){"use strict";n.r(t);var i=n(0),o=n.n(i),r=(n(4),n(1)),a=n.n(r);let u=o.a.create({eventTarget:document.body,container:document.body,retina:"auto"}),l=u.element.style;l.position="absolute",l.left="0px",l.top="0px",l.backgroundColor="#000";let c=u;let s,d,f,p,m,h,g=null;function v(e){h=e}function w(e){return e*e}function y(e,t){return w(e.x-t.x)+w(e.y-t.y)}function x(e,t,n){var i=y(t,n);if(0==i)return y(e,t);var o=((e.x-t.x)*(n.x-t.x)+(e.y-t.y)*(n.y-t.y))/i;return o=Math.max(0,Math.min(1,o)),y(e,{x:t.x+o*(n.x-t.x),y:t.y+o*(n.y-t.y)})}u.setup=(()=>{let e=new b2Vec2(0,1e3);g=window.world=new b2World(e);var t=new b2BodyDef;t.type=b2_staticBody;let n=g.CreateBody(t),i=new b2PolygonShape;i.SetAsBoxXYCenterAngle(.5,2,new b2Vec2(2.1,0),0),n.CreateFixtureFromShape(i,5);let o=new b2PolygonShape;o.SetAsBoxXYCenterAngle(.5,2,new b2Vec2(-2.1,0),0),n.CreateFixtureFromShape(o,5);let r=new b2PolygonShape;r.SetAsBoxXYCenterAngle(4,.5,new b2Vec2(0,1.5),0),n.CreateFixtureFromShape(r,5);let u=new b2PolygonShape;u.SetAsBoxXYCenterAngle(4,.5,new b2Vec2(0,-1.5),0),n.CreateFixtureFromShape(u,5);let l=new b2ParticleSystemDef;l.radius=.045,l.dampingStrength=.1,l.surfaceTensionNormalStrength=.004,l.surfaceTensionPressureStrength=.004,s=g.CreateParticleSystem(l);let c=new b2PolygonShape;c.SetAsBoxXYCenterAngle(1.5,.7,new b2Vec2(0,.2),0);let h=new b2ParticleGroupDef;h.shape=c,h.flags=b2_tensileParticle;s.CreateParticleGroup(h);d=s.GetPositionBuffer(),f=s.GetVelocityBuffer(),p=d.length,(m=new a.a(void 0,void 0,void 0,{width:{ideal:480},height:{ideal:320},facingMode:"user"})).startCapture(),m.onCalculated(v)}),u.update=(()=>{let e=c.height,t=c.width,n=c.mouse,i={x:(n.ox-t/2)/e*2,y:(n.oy-e/2)/e*2},o={x:(n.x-t/2)/e*2,y:(n.y-e/2)/e*2},r=n.dx/e*2,a=n.dy/e*2;for(let e=0;e<p;e+=2){let t={x:d[e],y:d[e+1]};if(x(t,i,o)<.1*.1&&(f[e]+=300*r,f[e+1]+=300*a),h){let n=h.numX/h.numY,i=round(map(t.x,-1*n,1*n,h.numX,0)),o=round(map(t.y,-1,1,0,h.numY));if(0<=i&&i<h.numX&&0<=o&&o<h.numY){let t=2*(o*h.numX+i),n=-h.uvArray[t],r=h.uvArray[t+1];f[e]+=1*n,f[e+1]+=1*r}}}g.Step(1/60/40,8,3)}),u.draw=(()=>{let e=window.devicePixelRatio||1,t=c.height*e,n=c.width*e;c.setTransform(t/2,1,1,t/2,n/2,t/2),c.fillStyle="#AAA";for(let e=0;e<p;e+=2){let t,n,i,o=d[e],r=d[e+1],a=f[e],u=f[e+1],l=sqrt(a*a+u*u);l=map(l,0,200,0,1);let s=.7;if(h){let e=h.numX/h.numY,a=floor(map(o,-1*e,1*e,h.width,0));a=min(h.width-1,max(0,a));let u=floor(map(r,-1,1,0,h.height));u=min(h.height-1,max(0,u));let c=4*(h.width*u+a),s=.2126*(t=h.image[c])+.7152*(n=h.image[c+1])+.0722*(i=h.image[c+2]),d=max(10,s)/s,f=pow(l,.3),p=pow(l,.5);t=floor(min(255,t*d*f)),n=floor(min(255,n*d*f)),i=floor(min(255,i*d*p))}else n=t=floor(255*pow(l,.3)),i=floor(255*pow(l,.5));c.fillStyle="rgba("+t+","+n+","+i+","+s+")";let p=map(pow(l,.5),0,1,.001,.045);c.beginPath(),c.arc(o,r,p,0,TWO_PI),c.fill()}}),u.touchstart=(e=>{e.preventDefault()})},function(e,t,n){e.exports=function(){"use strict";var e=function(){var t=0,n=document.createElement("div");function i(e){return n.appendChild(e.dom),e}function o(e){for(var i=0;i<n.children.length;i++)n.children[i].style.display=i===e?"block":"none";t=e}n.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",n.addEventListener("click",function(e){e.preventDefault(),o(++t%n.children.length)},!1);var r=(performance||Date).now(),a=r,u=0,l=i(new e.Panel("FPS","#0ff","#002")),c=i(new e.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var s=i(new e.Panel("MB","#f08","#201"));return o(0),{REVISION:16,dom:n,addPanel:i,showPanel:o,begin:function(){r=(performance||Date).now()},end:function(){u++;var e=(performance||Date).now();if(c.update(e-r,200),a+1e3<=e&&(l.update(1e3*u/(e-a),100),a=e,u=0,s)){var t=performance.memory;s.update(t.usedJSHeapSize/1048576,t.jsHeapSizeLimit/1048576)}return e},update:function(){r=this.end()},domElement:n,setMode:o}};return e.Panel=function(e,t,n){var i=1/0,o=0,r=Math.round,a=r(window.devicePixelRatio||1),u=80*a,l=48*a,c=3*a,s=2*a,d=3*a,f=15*a,p=74*a,m=30*a,h=document.createElement("canvas");h.width=u,h.height=l,h.style.cssText="width:80px;height:48px";var g=h.getContext("2d");return g.font="bold "+9*a+"px Helvetica,Arial,sans-serif",g.textBaseline="top",g.fillStyle=n,g.fillRect(0,0,u,l),g.fillStyle=t,g.fillText(e,c,s),g.fillRect(d,f,p,m),g.fillStyle=n,g.globalAlpha=.9,g.fillRect(d,f,p,m),{dom:h,update:function(l,v){i=Math.min(i,l),o=Math.max(o,l),g.fillStyle=n,g.globalAlpha=1,g.fillRect(0,0,u,f),g.fillStyle=t,g.fillText(r(l)+" "+e+" ("+r(i)+"-"+r(o)+")",c,s),g.drawImage(h,d+a,f,p-a,m,d,f,p-a,m),g.fillRect(d+p-a,f,a,m),g.fillStyle=n,g.globalAlpha=.9,g.fillRect(d+p-a,f,a,r((1-l/v)*m))}}},e}()},function(e,t,n){var i=n(6);e.exports=function(e,t){var n,o,r,a,u,l,c=[],s=e,d=new i(t||8),f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},p=window.cancelAnimationFrame||window.mozCancelAnimationFrame,m=!1,h=function(){var e=function(){if(r=s.videoWidth,a=s.videoHeight,n.width=r,n.height=a,r&&a){o.drawImage(s,0,0);var e=o.getImageData(0,0,r,a);return e.data}}();if(u&&e){var t=d.calculate(u,e,r,a);c.forEach(function(e){e(t)})}u=e},g=function(){m&&(l=f(g),h())};if(!e){var v=new Error;throw v.message="Video tag is required",v}this.startCapture=function(){m=!0,function(){r=s.videoWidth,a=s.videoHeight,n||(n=window.document.createElement("canvas"));o=n.getContext("2d")}(),g()},this.stopCapture=function(){p(l),m=!1},this.onCalculated=function(e){c.push(e)},this.getWidth=function(){return r},this.getHeight=function(){return a}}},function(e,t,n){n(7);function i(e){this.step=e||8}e.exports=i,i.prototype.calculate=function(e,t,n,i){var o,r,a,u,l,c,s,d,f,p=this.step,m=2*p+1;d=f=0;var h,g,v,w,y=n-p-1,x=i-p-1;this.numX=ceil((y-p-1)/m),this.numY=ceil((x-p-1)/m);var b=this.numX*this.numY*2;this.uvArray=this.uvArray&&this.uvArray.length===b?this.uvArray:new Float32Array(b);var S=0;for(h=p+1;h<x;h+=m)for(g=p+1;g<y;g+=m){for(o=r=a=u=l=0,v=-p;v<=p;v++)for(w=-p;w<=p;w++){var A=(h+v)*n+g+w,C=t[4*(A-1)]-t[4*(A+1)],P=t[4*(A-n)]-t[4*(A+n)],M=e[4*A]-t[4*A];o+=C*C,r+=C*P,a+=P*P,l+=C*M,u+=P*M}var T=r*r-o*a;if(0!==T){var E=p/T;c=-(u*r-l*a)*E,s=-(r*l-o*u)*E}else{var D=(r+o)*(r+o)+(a+r)*(a+r);if(0!==D){var R=-(u+l)*(p/D);c=(r+o)*R,s=(a+r)*R}else c=s=0}d+=c=max(-m,min(m,c)),f+=s=max(-m,min(m,s)),this.uvArray[S++]=c,this.uvArray[S++]=s}return{uvArray:this.uvArray,numX:this.numX,numY:this.numY,winStep:m,u:d/(b/2),v:f/(b/2),image:t,width:n,height:i}}},function(e,t){e.exports=function(e,t,n,i){this.x=e,this.y=t,this.u=n,this.v=i}}]);
//# sourceMappingURL=bundle.js.map