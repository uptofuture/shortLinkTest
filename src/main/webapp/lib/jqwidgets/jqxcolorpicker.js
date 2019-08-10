/*
jQWidgets v5.3.0 (2017-Sep)
Copyright (c) 2011-2017 jQWidgets.
License: https://jqwidgets.com/license/
*/

(function(a){a.jqx.jqxWidget("jqxColorPicker","",{});a.extend(a.jqx._jqxColorPicker.prototype,{defineInstance:function(){var b={disabled:false,height:null,width:null,color:new a.jqx.color({hex:"ff0000"}),redString:"R:",greenString:"G:",blueString:"B:",showTransparent:false,colorMode:"saturation",_delayLoading:false,events:["colorchange"]};if(this===a.jqx._jqxColorPicker.prototype){return b}a.extend(true,this,b);return b},_createFromInput:function(c){var e=this;if(e.element.nodeName.toLowerCase()=="input"){e.field=e.element;if(e.field.className){e._className=e.field.className}var d={title:e.field.title};if(e.field.getAttribute("value")){var g=e.field.getAttribute("value");e.color=new a.jqx.color({hex:g})}if(e.field.id.length){d.id=e.field.id.replace(/[^\w]/g,"_")+"_"+c}else{d.id=a.jqx.utilities.createId()+"_"+c}var h=a("<div></div>",d);h[0].style.cssText=e.field.style.cssText;if(!e.width){e.width=a(e.field).width()}if(!e.height){e.height=a(e.field).outerHeight()}a(e.field).hide().after(h);var f=e.host.data();e.host=h;e.host.data(f);e.element=h[0];e.element.id=e.field.id;e.field.id=d.id;if(e._className){e.host.addClass(e._className);a(e.field).removeClass(e._className)}if(e.field.tabIndex){var b=e.field.tabIndex;e.field.tabIndex=-1;e.element.tabIndex=b}}},createInstance:function(c){this._createFromInput("jqxColorPicker");this.render();var b=this;a.jqx.utilities.resize(this.host,function(){b._setSize();b.refresh()},false,!this._delayLoading)},render:function(){this.element.innerHTML="";var b=this;this._isTouchDevice=a.jqx.mobile.isTouchDevice();if(typeof this.color=="string"){this.color=new a.jqx.color({hex:this.color})}this._setSize();this.host.addClass(this.toThemeProperty("jqx-widget"));this.host.addClass(this.toThemeProperty("jqx-reset"));this.host.addClass(this.toThemeProperty("jqx-color-picker"));this.container=a("<div style='width: 100%; height: 100%; position: relative;'></div>");this.container.appendTo(this.host);this.colorMap=a("<div style='left: 0; top: 0; position: absolute;'></div>");this.colorMap.appendTo(this.container);this.colorBar=a("<div style='left: 0; top: 0; position: absolute;'></div>");this.colorBar.appendTo(this.container);this.colorPanel=a("<div style='left: 0; top: 0; position: absolute;'></div>");this.colorPanel.appendTo(this.container);this.hexPanel=a("<div style='float: left;'></div>");this.hexPanel.appendTo(this.colorPanel);this.hexPanel.append('<span style="text-align: left;" >#</span>');this.hex=a("<input maxlength='6' style='height: 18px;'/>");this.hex.addClass(this.toThemeProperty("jqx-input"));this.hex.addClass(this.toThemeProperty("jqx-widget-content"));this.hex.appendTo(this.hexPanel);this.colorPanel.append('<div style="font-size: 1px; clear: both;"></div>');this.rgb=a("<div style='margin-top: 2px;'></div>");this.rgb.appendTo(this.colorPanel);this.red=a("<input style='width: 25px; height: 18px;' maxlength='3'/>");this.red.addClass(this.toThemeProperty("jqx-input"));this.red.addClass(this.toThemeProperty("jqx-widget-content"));this.rgb.append('<span style="text-align: left;">'+this.redString+"</span>");this.red.appendTo(this.rgb);this.green=a("<input style='margin-right: 2px; height: 18px; width: 25px;' maxlength='3'/>");this.green.addClass(this.toThemeProperty("jqx-input"));this.green.addClass(this.toThemeProperty("jqx-widget-content"));this.rgb.append('<span style="text-align: left;">'+this.greenString+"</span>");this.green.appendTo(this.rgb);this.colorPanel.addClass(this.toThemeProperty("jqx-color-picker-map-overlay"));this._mapImageOverlayURL=this._getImageUrl(this.colorPanel);this.colorPanel.removeClass(this.toThemeProperty("jqx-color-picker-map-overlay"));this.blue=a("<input style='height: 18px; width: 25px;' maxlength='3'/>");this.blue.addClass(this.toThemeProperty("jqx-input"));this.blue.addClass(this.toThemeProperty("jqx-widget-content"));this.rgb.append('<span style="text-align: left;">'+this.blueString+"</span>");this.blue.appendTo(this.rgb);this.preview=a("<div style='background: red; position: absolute;'></div>");this.preview.addClass(this.toThemeProperty("jqx-widget-content"));this.preview.appendTo(this.colorPanel);this.colorBarPointer=a("<div style='top: 0; left: 0; position: absolute; width: 100%;'></div>");this.colorBarPointer.addClass(this.toThemeProperty("jqx-color-picker-bar-pointer"));this.colorMapPointer=a("<div style='top: 0; left: 0; position: absolute; width: 100%;'></div>");this.colorMapPointer.addClass(this.toThemeProperty("jqx-color-picker-pointer"));this.transparent=a("<div style='text-align: center; clear: both;'><a style='text-align: center;' href='#'>transparent</a></div>");if(this.disabled){this.host.addClass(this.toThemeProperty("jqx-fill-state-disabled"));this.element.disabled=true}this._addHandlers()},val:function(b){if(arguments.length==0){return"#"+this.color.hex}this.setColor(b);return this.color.hex},_setPositionFromValue:function(){var d=this;var c=d.color.h;var i=100-d.color.v;var b=d.colorMap.height();var e=d.colorMap.width();var h=c*e/360;var g=i*b/100;if(this.colorMode=="saturation"){var f=100-d.color.s;f=f*b/100;d._saturation=100-d.color.s;d.colorMapPointer.css("margin-left",h-8);d.colorMapPointer.css("margin-top",g-8);d.colorBarPointer.css("margin-top",f-8);d.colorMapImageOverlay.css("opacity",(100-d.color.s)/100)}else{var c=d.color.s;var h=c*e/100;var g=i*b/100;var f=360-d.color.h;f=f*b/360;d._hue=d.color.h;d.colorMapPointer.css("margin-left",h-8);d.colorMapPointer.css("margin-top",g-8);d.colorBarPointer.css("margin-top",f-8)}},updateRGB:function(){var b=this;b.color.setRgb(b.red.val(),b.green.val(),b.blue.val());b._updateUI();b._raiseEvent("0",{color:b.color});b.color.transparent=false},_setPosition:function(f,c,h){var e=parseInt(f.pageX);var g=parseInt(c.offset().left);var b=parseInt(f.pageY);var d=parseInt(c.offset().top);if(this._isTouchDevice){var i=a.jqx.position(f);e=i.left;b=i.top}if(h[0].className.indexOf("jqx-color-picker-bar")==-1){h.css("margin-left",e-8-g)}if(b>=d&&b<=d+c.height()){h.css("margin-top",b-8-d)}},_handleKeyInput:function(c,d,b){if(c.disabled){return}if(!c._validateKey(d)){return d}b.val(c._setValueInRange(b.val(),0,255));this.updateRGB();this._setPositionFromValue()},_addHandlers:function(){var d=this;this.addHandler(this.colorMapPointer,"dragStart",function(j){j.preventDefault();return false});this.addHandler(this.colorBarPointer,"dragStart",function(j){j.preventDefault();return false});this.addHandler(this.transparent,"click",function(j){d._raiseEvent("0",{color:"transparent"});j.preventDefault();d.color.transparent=true});this.addHandler(this.host,"selectionstart",function(j){j.preventDefault();return false});this.addHandler(this.blue,"keyup blur",function(j){d._handleKeyInput(d,j,d.blue)});this.addHandler(this.green,"keyup blur",function(j){d._handleKeyInput(d,j,d.green)});this.addHandler(this.red,"keyup blur",function(j){d._handleKeyInput(d,j,d.red)});this.addHandler(this.hex,"keyup blur",function(j){if(d.disabled){return}if(!d._validateKey(j)){return j}if(d.hex.val().toString().length==6){d.hex.val(d.color.validateHex(d.hex.val()));d.color.setHex(d.hex.val());d._updateUI();d._setPositionFromValue();d._raiseEvent("0",{color:d.color})}});this.addHandler(this.colorMap,"dragstart",function(j){j.preventDefault();return false});var f=function(k){d._setPosition(k,d.colorMap,d.colorMapPointer);if(d.colorMode=="saturation"){var j=d._valuesFromMouse(k,d.colorMap,360,100);if(j.x>360){j.x=360}d.color.setHsv(j.x,d._saturation!=null?100-d._saturation:100,100-j.y)}else{var j=d._valuesFromMouse(k,d.colorMap,100,100);if(j.x>100){j.x=100}d.color.setHsv(d._hue!=null?d._hue:360,j.x,100-j.y)}d._updateUI();d._raiseEvent("0",{color:d.color});d.color.transparent=false};var c="mousedown.picker"+this.element.id;if(this._isTouchDevice){c=a.jqx.mobile.getTouchEventName("touchstart")+".picker"+this.element.id}this.addHandler(this.colorMap,c,function(j){if(d.disabled){return}d.beginDrag=true;f(j)});var b="mousemove.picker"+this.element.id;if(this._isTouchDevice){b=a.jqx.mobile.getTouchEventName("touchmove")+".picker"+this.element.id}this.addHandler(a(document),b,function(j){if(d.disabled){return}if(d.beginDrag==true){f(j);if(d._isTouchDevice){j.preventDefault()}}});if(!this._isTouchDevice){this.addHandler(this.colorBar,"dragstart",function(j){j.preventDefault();return false})}var e=function(k){d._setPosition(k,d.colorBar,d.colorBarPointer);if(d.colorMode=="saturation"){var j=d._valuesFromMouse(k,d.colorBar,100,100);d.color.s=j.y;d._saturation=j.y;d.colorMapImageOverlay.css("opacity",(d.color.s)/100);d.color.setHsv(d.color.h,100-d.color.s,d.color.v)}else{var j=d._valuesFromMouse(k,d.colorBar,100,360);d.color.h=360-j.y;d._hue=d.color.h;d.color.setHsv(d.color.h,d.color.s,d.color.v)}d._updateUI();d._raiseEvent("0",{color:d.color});d.color.transparent=false};var h="mousemove.colorBar"+this.element.id;var g="mousedown.colorBar"+this.element.id;var i="mouseup.colorBar"+this.element.id;if(this._isTouchDevice){h=a.jqx.mobile.getTouchEventName("touchmove")+".colorBar"+this.element.id;g=a.jqx.mobile.getTouchEventName("touchstart")+".colorBar"+this.element.id;i=a.jqx.mobile.getTouchEventName("touchend")+".colorBar"+this.element.id}this.addHandler(this.colorBar,g,function(j){if(d.disabled){return}d.beginDragBar=true;e(j)});this.addHandler(a(document),h,function(j){if(d.disabled){return}if(d.beginDragBar==true){e(j);if(d._isTouchDevice){j.preventDefault()}}});this.addHandler(a(document),i,function(j){if(d.disabled){return}d.beginDrag=false;d.beginDragBar=false})},_removeHandlers:function(){this.removeHandler(this.transparent,"click");this.removeHandler(this.host,"selectionstart");this.removeHandler(this.blue,"keyup blur");this.removeHandler(this.green,"keyup blur");this.removeHandler(this.red,"keyup blur");this.removeHandler(this.hex,"keyup blur");this.removeHandler(this.colorMap,"dragstart");this.removeHandler(this.colorBar,"dragstart");this.removeHandler(this.colorMapPointer,"dragStart");this.removeHandler(this.colorBarPointer,"dragStart");var g=this.element.id;var e="mousemove.colorBar"+g;var d="mousedown.colorBar"+g;var f="mouseup.colorBar"+g;var c="mousedown.picker"+g;var b="mousemove.picker"+g;if(this._isTouchDevice){e=a.jqx.mobile.getTouchEventName("touchmove")+".colorBar"+g;d=a.jqx.mobile.getTouchEventName("touchstart")+".colorBar"+g;f=a.jqx.mobile.getTouchEventName("touchend")+".colorBar"+g;c=a.jqx.mobile.getTouchEventName("touchstart")+".picker"+g;b=a.jqx.mobile.getTouchEventName("touchmove")+".picker"+g}this.removeHandler(this.colorMap,c);this.removeHandler(this.colorMap,b);this.removeHandler(this.colorBar,d);this.removeHandler(this.colorBar,e);this.removeHandler(a(document),b);this.removeHandler(a(document),e);this.removeHandler(a(document),f)},_raiseEvent:function(g,c){if(c==undefined){c={owner:null}}var d=this.events[g];var e=c?c:{};e.owner=this;var f=new a.Event(d);f.owner=this;f.args=e;var b=this.host.trigger(f);return b},setColor:function(b){if(!b){return}if(b=="transparent"){this.color.transparent=true;this.color.hex="000";this.color.r=0;this.color.g=0;this.color.b=0}else{if(b.r){this.color=new a.jqx.color({rgb:b})}else{if(b.substring(0,1)=="#"){this.color=new a.jqx.color({hex:b.substring(1)})}else{this.color=new a.jqx.color({hex:b})}}}this._updateUI();this._setPositionFromValue();this._raiseEvent("0",{color:this.color})},getColor:function(){return this.color},resize:function(c,b){this.width=c;this.height=b;this._setSize();this.refresh()},propertyChangedHandler:function(b,c,e,d){if(b.isInitialized==undefined||b.isInitialized==false){return}if(c=="colorMode"){b.refresh()}if(c=="color"){b._updateUI();b._setPositionFromValue();b._raiseEvent("0",{color:d})}if(c=="width"||c=="height"){b._setSize();b.refresh()}if(c=="showTransparent"){b.refresh()}if(c=="disabled"){this.element.disabled=d;if(d){b.host.addClass(b.toThemeProperty("jqx-fill-state-disabled"))}else{b.host.removeClass(b.toThemeProperty("jqx-fill-state-disabled"))}}},_valuesFromMouse:function(j,g,c,b){var k=0;var i=0;var f=g.offset();var p=g.height();var d=g.width();var n=j.pageX;var m=j.pageY;if(this._isTouchDevice){var l=a.jqx.position(j);n=l.left;m=l.top}if(n<f.left){k=0}else{if(n>f.left+d){k=d}else{k=n-f.left+1}}if(m<f.top){i=0}else{if(m>f.top+p){i=p}else{i=m-f.top+1}}var h=parseInt(k/d*c);var o=parseInt(i/p*b);return{x:h,y:o}},_validateKey:function(b){if(b.keyCode==9||b.keyCode==16||b.keyCode==38||b.keyCode==29||b.keyCode==40||b.keyCode==17||b.keyCode==37||(b.ctrlKey&&(b.keyCode=="c".charCodeAt()||b.keyCode=="v".charCodeAt()))||(b.ctrlKey&&(b.keyCode=="C".charCodeAt()||b.keyCode=="V".charCodeAt()))){return false}if(b.ctrlKey||b.shiftKey){return false}return true},_setValueInRange:function(d,c,b){if(d==""||isNaN(d)){return c}d=parseInt(d);if(d>b){return b}if(d<c){return c}return d},destroy:function(){a.jqx.utilities.resize(this.host,null,true);this.host.removeClass();this._removeHandlers();this.host.remove()},setPointerStyle:function(c){this.colorMapPointer.removeClass();if(c=="transparent"||c.hex==""){this.colorMapPointer.addClass(this.toThemeProperty("jqx-color-picker-pointer"))}var b=105;var d=(c.r*0.299)+(c.g*0.587)+(c.b*0.114);var e=(255-d<b)?"Black":"White";if(e=="Black"){this.colorMapPointer.addClass(this.toThemeProperty("jqx-color-picker-pointer"))}else{this.colorMapPointer.addClass(this.toThemeProperty("jqx-color-picker-pointer-alt"))}},_updateUI:function(){var c=this;c.red.val(c.color.r);c.green.val(c.color.g);c.blue.val(c.color.b);c.hex.val(c.color.hex);var b=new a.jqx.color({hex:"fff"});if(this.colorMode=="saturation"){b.setHsv(this.color.h,100,this.color.v);c.colorBar.css("background","#"+b.hex)}else{b.setHsv(this.color.h,100,100);c.colorMap.css("background-color","#"+b.hex)}c.preview.css("background","#"+this.color.hex);c.setPointerStyle(this.color)},_setSize:function(){if(this.width!=null&&this.width.toString().indexOf("px")!=-1){this.host.width(this.width)}else{if(this.width!=undefined&&!isNaN(this.width)){this.host.width(this.width)}}if(this.height!=null&&this.height.toString().indexOf("px")!=-1){this.host.height(this.height)}else{if(this.height!=undefined&&!isNaN(this.height)){this.host.height(this.height)}}if(this.host.width()<130){this.host.width(150)}if(this.host.height()<70){this.host.height(70)}if(this.width!=null&&this.width.toString().indexOf("%")!=-1){this.host.width(this.width)}if(this.height!=null&&this.height.toString().indexOf("%")!=-1){this.host.height(this.height)}},_arrange:function(){var d=this.host.height();var g=this.host.width();var b=d-44;if(this.showTransparent){b=d-64}if(b<=0){return}this.colorMap.width(85*g/100);this.colorMap.height(b);this.colorBar.height(b);this.colorBar.css("left",this.colorMap.width()+4);this.colorBar.width(8*g/100);this.colorBarPointer.width(this.colorBar.width());this.colorPanel.width(g);this.colorPanel.height(40);if(this.showTransparent){this.colorPanel.height(60)}this.colorPanel.css("top",b+4);this.colorPanel.css("text-align","left");this.hex.width(this.colorMap.width()-this.colorBar.width()-4);var c=this.red.prev().outerWidth()-this.hex.prev().outerWidth();if(c<4){c=4}this.hex.css("margin-left",c+"px");this.preview.width(this.colorBar.width()+7);this.preview.height(25);this.preview.addClass(this.toThemeProperty("jqx-rc-all"));this.preview.addClass(this.toThemeProperty("jqx-color-picker-preview"));this.preview.css("left",this.colorMap.width()-2);this.preview.css("top","5px");var e=this.hex.width();var f=e-this.blue.prev().outerWidth()-this.green.prev().outerWidth()-6;if(f>0){this.blue.width(f/3);this.green.width(f/3);this.red.width(f/3);return}},_getColorPointer:function(){var b=a("<div></div>");b.addClass(this.toThemeProperty("jqx-color-picker-pointer"));return b},_getImageUrl:function(c){var b=c.css("backgroundImage");b=b.replace('url("',"");b=b.replace('")',"");b=b.replace("url(","");b=b.replace(")","");return b},refresh:function(){if(this._delayLoading){return}this._saturation=null;this._hue=null;this.colorMap.removeClass();this.colorBar.removeClass();this.colorMap.addClass(this.toThemeProperty("jqx-disableselect"));this.colorBar.addClass(this.toThemeProperty("jqx-disableselect"));this.colorPanel.addClass(this.toThemeProperty("jqx-color-picker-panel"));this.colorBar.css("background-image","");this.colorMap.css("background-image","");if(this.colorMode=="saturation"){this.colorMap.addClass(this.toThemeProperty("jqx-color-picker-map"));this.colorBar.addClass(this.toThemeProperty("jqx-color-picker-bar"))}else{this.colorMap.addClass(this.toThemeProperty("jqx-color-picker-map-hue"));this.colorBar.addClass(this.toThemeProperty("jqx-color-picker-bar-hue"))}this._barImageURL=this._getImageUrl(this.colorBar);this._mapImageURL=this._getImageUrl(this.colorMap);this._arrange();this.colorBar.children().remove();this.colorBarImageContainer=a("<div style='overflow: hidden;'></div>");this.colorBarImageContainer.width(this.colorBar.width());this.colorBarImageContainer.height(this.colorBar.height());this.colorBarImageContainer.appendTo(this.colorBar);this.colorBarImage=a("<img/>");this.colorBarImage.appendTo(this.colorBarImageContainer);this.colorBarImage.attr("src",this._barImageURL);this.colorBar.css("background-image","none");this.colorBarImage.attr("width",this.colorBar.width());this.colorBarImage.attr("height",this.colorBar.height());this.colorBarPointer.appendTo(this.colorBar);this.colorMap.children().remove();this.colorMapImage=a("<img/>");this.colorMapImage.appendTo(this.colorMap);this.colorMapImage.attr("src",this._mapImageURL);this.colorMap.css("background-image","none");this.colorMapImage.attr("width",this.colorMap.width());this.colorMapImage.attr("height",this.colorMap.height());this.colorMapImageOverlay=a("<img style='position: absolute; left: 0; top: 0;'/>");this.colorMapImageOverlay.prependTo(this.colorMap);this.colorMapImageOverlay.attr("src",this._mapImageOverlayURL);this.colorMapImageOverlay.attr("width",this.colorMap.width());this.colorMapImageOverlay.attr("height",this.colorMap.height());this.colorMapImageOverlay.css("opacity",0);this.colorMapPointer.appendTo(this.colorMap);if(this.showTransparent){this.transparent.appendTo(this.colorPanel)}this._updateUI();this._setPositionFromValue()}});a.jqx.color=function(d){var b={r:0,g:0,b:0,h:0,s:0,v:0,hex:"",hexToRgb:function(i){i=this.validateHex(i);var h="00",f="00",e="00";if(i.length==6){h=i.substring(0,2);f=i.substring(2,4);e=i.substring(4,6)}else{if(i.length>4){h=i.substring(4,i.length);i=i.substring(0,4)}if(i.length>2){f=i.substring(2,i.length);i=i.substring(0,2)}if(i.length>0){e=i.substring(0,i.length)}}return{r:this.hexToInt(h),g:this.hexToInt(f),b:this.hexToInt(e)}},validateHex:function(e){e=new String(e).toUpperCase();e=e.replace(/[^A-F0-9]/g,"0");if(e.length>6){e=e.substring(0,6)}return e},webSafeDec:function(e){e=Math.round(e/51);e*=51;return e},hexToWebSafe:function(i){var h,f,e;if(i.length==3){h=i.substring(0,1);f=i.substring(1,1);e=i.substring(2,1)}else{h=i.substring(0,2);f=i.substring(2,4);e=i.substring(4,6)}return intToHex(this.webSafeDec(this.hexToInt(h)))+this.intToHex(this.webSafeDec(this.hexToInt(f)))+this.intToHex(this.webSafeDec(this.hexToInt(e)))},rgbToWebSafe:function(e){return{r:this.webSafeDec(e.r),g:this.webSafeDec(e.g),b:this.webSafeDec(e.b)}},rgbToHex:function(e){return this.intToHex(e.r)+this.intToHex(e.g)+this.intToHex(e.b)},intToHex:function(f){var e=(parseInt(f).toString(16));if(e.length==1){e=("0"+e)}return e.toUpperCase()},hexToInt:function(e){return(parseInt(e,16))},hslToRgb:function(v){var n=parseInt(v.h)/360;var w=parseInt(v.s)/100;var k=parseInt(v.l)/100;if(k<=0.5){var f=k*(1+w)}else{var f=k+w-(k*w)}var i=2*k-f;var t=n+(1/3);var j=n;var m=n-(1/3);var e=Math.round(this.hueToRgb(i,f,t)*255);var o=Math.round(this.hueToRgb(i,f,j)*255);var u=Math.round(this.hueToRgb(i,f,m)*255);return{r:e,g:o,b:u}},hueToRgb:function(g,f,e){if(e<0){e+=1}else{if(e>1){e-=1}}if((e*6)<1){return g+(f-g)*e*6}else{if((e*2)<1){return f}else{if((e*3)<2){return g+(f-g)*((2/3)-e)*6}else{return g}}}},rgbToHsv:function(h){var k=h.r/255;var j=h.g/255;var f=h.b/255;hsv={h:0,s:0,v:0};var i=0;var e=0;if(k>=j&&k>=f){e=k;i=(j>f)?f:j}else{if(j>=f&&j>=k){e=j;i=(k>f)?f:k}else{e=f;i=(j>k)?k:j}}hsv.v=e;hsv.s=(e)?((e-i)/e):0;if(!hsv.s){hsv.h=0}else{delta=e-i;if(k==e){hsv.h=(j-f)/delta}else{if(j==e){hsv.h=2+(f-k)/delta}else{hsv.h=4+(k-j)/delta}}hsv.h=parseInt(hsv.h*60);if(hsv.h<0){hsv.h+=360}}hsv.s=parseInt(hsv.s*100);hsv.v=parseInt(hsv.v*100);return hsv},hsvToRgb:function(l){rgb={r:0,g:0,b:0};var k=l.h;var r=l.s;var n=l.v;if(r==0){if(n==0){rgb.r=rgb.g=rgb.b=0}else{rgb.r=rgb.g=rgb.b=parseInt(n*255/100)}}else{if(k==360){k=0}k/=60;r=r/100;n=n/100;var j=parseInt(k);var m=k-j;var g=n*(1-r);var e=n*(1-(r*m));var o=n*(1-(r*(1-m)));switch(j){case 0:rgb.r=n;rgb.g=o;rgb.b=g;break;case 1:rgb.r=e;rgb.g=n;rgb.b=g;break;case 2:rgb.r=g;rgb.g=n;rgb.b=o;break;case 3:rgb.r=g;rgb.g=e;rgb.b=n;break;case 4:rgb.r=o;rgb.g=g;rgb.b=n;break;case 5:rgb.r=n;rgb.g=g;rgb.b=e;break}rgb.r=parseInt(rgb.r*255);rgb.g=parseInt(rgb.g*255);rgb.b=parseInt(rgb.b*255)}return rgb},setRgb:function(h,f,e){var j=function(g){if(g<0||g>255){return 0}if(isNaN(parseInt(g))){return 0}return g};this.r=j(h);this.g=j(f);this.b=j(e);var i=this.rgbToHsv(this);this.h=i.h;this.s=i.s;this.v=i.v;this.hex=this.rgbToHex(this)},setHsl:function(g,f,e){this.h=g;this.s=f;this.l=e;var i=this.hslToRgb(this);this.r=i.r;this.g=i.g;this.b=i.b;this.hex=this.rgbToHex(i)},setHsv:function(g,f,e){this.h=g;this.s=f;this.v=e;var i=this.hsvToRgb(this);this.r=i.r;this.g=i.g;this.b=i.b;this.hex=this.rgbToHex(i)},setHex:function(e){this.hex=e;var g=this.hexToRgb(this.hex);this.r=g.r;this.g=g.g;this.b=g.b;var f=this.rgbToHsv(g);this.h=f.h;this.s=f.s;this.v=f.v}};if(d){if(d.hex){var c=b.validateHex(d.hex);b.setHex(c)}else{if(d.r){b.setRgb(d.r,d.g,d.b)}else{if(d.h){b.setHsv(d.h,d.s,d.v)}else{if(d.rgb){b.setRgb(d.rgb.r,d.rgb.g,d.rgb.b)}}}}}return b}})(jqxBaseFramework);

