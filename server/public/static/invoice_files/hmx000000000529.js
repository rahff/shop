;var hmx_privacy='{}';(function(){var n="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,e){a!=Array.prototype&&a!=Object.prototype&&(a[b]=e.value)},q="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function r(a,b){if(b){for(var e=q,d=a.split("."),c=0;c<d.length-1;c++){var g=d[c];g in e||(e[g]={});e=e[g]}d=d[d.length-1];c=e[d];g=b(c);g!=c&&null!=g&&n(e,d,{configurable:!0,writable:!0,value:g})}}
r("String.prototype.endsWith",function(a){return a?a:function(b,e){if(null==this)throw new TypeError("The 'this' value for String.prototype.endsWith must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype.endsWith must not be a regular expression");void 0===e&&(e=this.length);for(var d=Math.max(0,Math.min(e|0,this.length)),c=b.length;0<c&&0<d;)if(this[--d]!=b[--c])return!1;return 0>=c}});
function t(a){var b="",e,d=0;a=String(a).replace(/\r\n/g,"\n");var c="";for(e=0;e<a.length;e++){var g=a.charCodeAt(e);128>g?c+=String.fromCharCode(g):(127<g&&2048>g?c+=String.fromCharCode(g>>6|192):(c+=String.fromCharCode(g>>12|224),c+=String.fromCharCode(g>>6&63|128)),c+=String.fromCharCode(g&63|128))}for(a=c;d<a.length;){var l=a.charCodeAt(d++);c=a.charCodeAt(d++);e=a.charCodeAt(d++);g=l>>2;l=(l&3)<<4|c>>4;var k=(c&15)<<2|e>>6;var h=e&63;isNaN(c)?k=h=64:isNaN(e)&&(h=64);b=b+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(g)+
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(l)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(k)+"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(h)}return b}function v(a){try{var b=t(a)}catch(e){b=""}return b};function w(a){"undefined"!==typeof console&&console.error("[TVTY] "+a)}function y(){return(new Date).getTime()}function z(){return("000000"+Math.floor(16777215*Math.random()).toString(16)).slice(-6)}function A(){var a="";try{a=window.self!==window.top?window.top.location.href:window.location.href}catch(b){a=window.location.href}"undefined"===typeof a&&(a="");return a}
function B(){var a=0,b=window.TVTYObj,e=window[b].cmd||[];window[b]=function(){(window[b].cmd=window[b].cmd||e).push(arguments);var d=a,c=window[window.TVTYObj].cmd;if("undefined"!==typeof c&&"number"===typeof c.length){for(var g=c.length;d<g;d++)window[C()](c[d]),c[d]=[];d=g}a=d};window[b]("consumeBuffer")}function D(a){if("number"===typeof a)return a;if("string"===typeof a)try{return Number(a.replace(",",".").replace(" ",""))}catch(b){return NaN}else return NaN}
function C(){return"TVTYEntryPoint"}Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){if(null==this)throw new TypeError('"this" is null or not defined');var e=Object(this),d=e.length>>>0;if(0===d)return-1;var c=+b||0;Infinity===Math.abs(c)&&(c=0);if(c>=d)return-1;for(c=Math.max(0<=c?c:d-Math.abs(c),0);c<d;){if(c in e&&e[c]===a)return c;c++}return-1});function E(){this.j=z()+z();this.url=A();try{var a=window.self!==window.top?window.parent.document.referrer:document.referrer}catch(b){a=document.referrer}"undefined"===typeof a&&(a="");this.c=a;a="";try{a="undefined"!==typeof navigator.languages&&0<navigator.languages.length?-1!==navigator.languages[0].indexOf("-")||2>navigator.languages.length?navigator.languages[0]:navigator.languages[1]:navigator.language||navigator.browserLanguage}catch(b){}"undefined"===typeof a&&(a="");this.g=a;a="";try{a=
"1"==window.doNotTrack||"1"==window.navigator.msDoNotTrack||"1"==window.navigator.doNotTrack?"1":"0"}catch(b){}this.f=a;this.h=new Date;a="";try{a=this.h.getTimezoneOffset()}catch(b){}"undefined"===typeof a&&(a="");this.i=a;a="";try{a=(new Intl.DateTimeFormat).resolvedOptions().timeZone}catch(b){}"undefined"===typeof a&&(a="");this.tz=a;try{this.b=document.domain,null==this.b&&(this.b="")}catch(b){this.b=""}this.a=F}
function G(a){if(a.a==H){var b=A();if(b!=a.url)return a.c=a.url,a.url=b,!0}return!1}E.prototype={toString:function(){return JSON.stringify(this.toJSON())},toJSON:function(){return{rand:this.j,url:this.url,referer:this.c,lang:this.g,dnt:this.f,offset:this.i,tz:this.tz}}};for(var I=[],J=0;256>J;J++){for(var K=J,L=0;8>L;L++)K=K&1?3988292384^K>>>1:K>>>1;I[J]=K}function N(a){for(var b=-1,e=0,d=a.length;e<d;e++)b=b>>>8^I[(b^a.charCodeAt(e))&255];return(b^-1)>>>0};function O(a,b,e,d,c,g){this.l="C360i";this.a=a;this.b=b;this.i=this.j=e;this.h=d;this.c=c;this.g=0==this.c;this.m=[];this.o=[];this.f=g}function P(a){a.c+=1;a.h="4.3.0";a.j=y()}function Q(a){var b=void 0===b?31536E6:b;var e=document.domain,d="";"undefined"!==typeof e&&(e=e.split("."),d=2,0<=["uk","au"].indexOf(e[e.length-1])&&(d=3),d=e.slice(e.length-d).join("."));a.write(d,b)}function R(a,b){if(b!=a.a&&""!=b&&"undefined"!==typeof b){var e=a.m;-1===e.indexOf(b)&&e.push(b)}}
O.prototype={toString:function(){return JSON.stringify({cookieId:this.l,cookieJS:this.a,created:this.b,updated:this.j,tag_id:this.h,count:this.c,otherCookieValues:this.m,otherEtagValues:this.o,expirationTimestamp:this.f})},toJSON:function(){return{created:this.b,updated:this.j,tag_id:this.h,count:this.c,exp:this.f}},write:function(a,b){b=void 0===b?31536E6:b;0==this.f&&(this.f=y()+b);var e=(new Date(this.f)).toUTCString(),d=this.l,c="";try{c=JSON.stringify(this.toJSON())}catch(g){c="{}"}try{c=this.a+
"|"+t(c)}catch(g){c=this.a+"|"}d=d+"="+c+";";""!==a&&(d+=" domain="+a+";");document.cookie=d+(" path=/; expires="+e)+"; SameSite=Lax"}};function S(a){if(0==a.length)return!1;var b=a.length;if(1==b)var e=a[0];else{a.sort(function(c,g){return c.b>g.b?1:c.b<g.b?-1:0});e=a[0];for(var d=1;d<b;d++)R(e,a[d].a)}return e}
function T(){var a=[];var b=void 0===b?"C360i":b;var e=[];if(document.cookie)for(var d=document.cookie.split(";"),c=0,g=d.length;c<g;c++){var l=d[c].indexOf("=");0<l&&b===d[c].substring(0,l).replace(/^ +/,"")&&e.push(d[c].substring(l+1))}b=0;for(d=e.length;b<d;b++){l=g=c=void 0;var k=e[b],h=k,f=-1!==h.indexOf("|")?h.indexOf("|"):h.length;if(("00000000"+N(h.substring(0,24)).toString(16).toUpperCase()).slice(-8)===h.substring(24,f).toUpperCase()){k=k.split("|");try{f=h=void 0;var x=String(k[1]).replace(/=+$/,
"");if(1==x.length%4)var p="";else{for(var m=0,u=0,M="";h=x.charAt(u++);~h&&(M+=(f=m%4?64*f+h:h,m++%4)?String.fromCharCode(255&f>>(-2*m&6)):""))h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(h);p=M}k[1]=p;""===k[1]&&(k[1]="{}")}catch(ca){k[1]="{}"}h=JSON.parse(k[1]);"number"===typeof h.created?l=h.created:l=y();"number"===typeof h.updated?g=h.updated:g=y();"undefined"===typeof h.tag_id?c="4.3.0":c=h.tag_id;c=new O(k[0],l,g,c,"number"===typeof h.count?parseInt(h.count,
10):0,"number"===typeof h.exp?parseInt(h.exp,10):0)}else w("invalid CRC. Discarding cookie"),c=!1;!1!==c&&a.push(c)}a=S(a);"boolean"===typeof a&&(a=y(),e=(z()+z()+z()+z()).toUpperCase(),p=("00000000"+N(e).toString(16).toUpperCase()).slice(-8),a=new O(e+p,a,a,"4.3.0",0,0));return a};function U(a){try{(new Image(1,1)).src=a}catch(b){}};function V(a,b){this.b=a;this.a=b}
function W(a,b,e){G(a.a);var d="",c;for(c in b)"function"!==typeof b[c]&&(d+="&"+c+"="+v(b[c]));a:{for(var g in b)if("step"===g&&"function"!==typeof b[g]){b="";break a}b="&step="+v("other")}a="https://u360.d-bi.fr/000000000529.gif?c="+a.b.a+"-"+a.a.j+"&cgen="+(a.b.g?1:0)+d+b+"&hmxtagid=4.3.0&u="+v(a.a.url)+"&hmxts="+a.a.h.getTime()+"&hmxtzoffset="+v(a.a.i)+"&hmxtzname="+v(a.a.tz)+"&navlang="+v(a.a.g)+"&hmxdnt="+v(a.a.f)+"&r="+v(a.a.c)+"&hmx_send_ts="+y();e&&(a+="&hmx_new_session=1");return a}
V.prototype={};function aa(a,b,e){try{var d=document.querySelectorAll(b)}catch(h){w("set_pixel_event_listener query error. Is the querySelector ok ?"+b);return}for(var c=0;c<d.length;c++)for(var g=0;g<e.length;g++){var l=e[g],k=b;d[c].addEventListener(l,function(){var h=k;window[C()](["set","hmx_event_type",l]);window[C()](["set","hmx_event_query_selector",h]);window[C()](["set","step",a]);window[C()](["send"])})}};function X(){this.a=this.b=!1}function ba(a){var b=JSON.parse(decodeURI(hmx_privacy));"boolean"===typeof b.dnt?a.b=b.dnt:a.b=!1;"boolean"===typeof b.dmp?a.a=b.dmp:a.a=!1}X.prototype={};function Y(a){this.b=a;this.a=!1}function Z(a){if(a.a){if(G(a.b.a)){var b=W(a.b,[],!1);U(b)}setTimeout(function(e){return function(){Z(e)}}(a),1E3)}}Y.prototype={};var F=0,H=1;
(function(a){var b=new X;try{"undefined"!==typeof hmx_privacy&&ba(b)}catch(h){w("Something wrong happen when deadling with user privacy: "+h)}if(!b.b){var e=!1;"undefined"!==typeof a.ObjHmx&&(a.TVTYObj=a.ObjHmx,e=!0);if("undefined"===typeof a.TVTYObj)w("TVTY tag was called directly. Please use the provided js.");else{var d=T();P(d);Q(d);var c=new E,g=new V(d,c),l=new Y(g),k=0;a.pixelarg={};a.TVTYEntryPoint=function x(f){if(0<f.length)if(JSON.stringify(f),"send"===f[0]){var p=0==k&&(d.g||18E5<y()-
d.i),m=W(g,window.pixelarg,p);U(m);k+=1}else if("enable_single_page_application_context"===f[0])g.a.a=H;else if("disable_single_page_application_context"===f[0])g.a.a=F;else if("enable_single_page_application_url_detection"===f[0])g.a.a=H,0==k&&(p=0==k&&(d.g||18E5<y()-d.i),m=W(g,window.pixelarg,p),U(m),k+=1),0==l.a&&(l.a=!0,Z(l));else if("disable_single_page_application_url_detection"===f[0])l.a=!1;else if("set_amount"===f[0]){if(3!==f.length)return w("Received "+f.length+" parameter(s). 3 required."),
!1;x(["set_price","amount",f[1],f[2]])}else if("set_price"===f[0]){if(4!==f.length)return w("Received "+f.length+" parameter(s). 4 required."),!1;if(f[1].endsWith("_currency"))return w("You cannot ends your variable "+f[1]+' with string "_currency", it is a reserved word'),!1;x(["set_number",f[1],f[2]])?a.pixelarg[f[1]+"_currency"]=f[3]:w('Because amount "'+f[2]+'" is invalid, currency "'+f[3]+"\" won't be stored either.")}else{if("set_number"===f[0]){if(3!==f.length)return w("Received "+f.length+
" parameter(s). 3 required."),!1;m=D(f[2]);0==isNaN(m)?a.pixelarg[f[1]]=m:w('Value "'+f[2]+'" is not a number and will not be stored in '+f[1]);return 0==isNaN(m)}if("set"===f[0])a.pixelarg[f[1]]=f[2];else if("callbackPartner"===f[0]){if(!b.a){p=0==k&&(d.g||18E5<y()-d.i);m=f[1];f=f[2];if("string"==typeof m&&/^[A-Za-z0-9_-]+$/.test(m)&&""!=f&&"undefined"!==typeof f){var u={};u.partner_name="id_"+m.toLowerCase();u.partner_uuid=""+f;JSON.stringify(u);m=W(new V(d,c),u,p);U(m)}k+=1}}else"consumeBuffer"!==
f[0]&&("set_pixel_event_listener"===f[0]?3===f.length||4===f.length&&Array.isArray(f[3])?aa(f[1],f[2],3===f.length?["click","keypress"]:f[3]):w('hmx("set_pixel_event_listener"): received '+f.length+" parameter(s). 3 or 4 required."):w("Cannot process parameter : "+f[0]+". List="+f.toString()))}};e&&(a.HmxEntryPoint=a.TVTYEntryPoint);B()}}})(window);}).call(this);
