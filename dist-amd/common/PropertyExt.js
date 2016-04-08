!function(t,e){"function"==typeof define&&define.amd?define(["d3"],e):t.common_PropertyExt=e(t.d3)}(this,function(t){function e(t){return 0===t.indexOf(o)}function i(t,e){return t[h+e]}function r(t,e,i,r,s,n){switch(n=n||{},this.id=t,this.type=i,this.origDefaultValue=e,this.defaultValue=n.optional&&null===e?void 0:e,this.description=r,this.set=s,this.ext=n,i){case"set":this.checkedAssign=function(e){return(!s||s.indexOf(e)<0)&&console.error("Invalid value for '"+t+"':  "+e+" expected "+i),e};break;case"html-color":this.checkedAssign=function(e){if(window.__hpcc_debug&&e&&"red"!==e){var r="red",s=document.createElement("div");s.style.color=r,s.style.color=e,(s.style.color===r||""===s.style.color)&&console.error("Invalid value for '"+t+"':  "+e+" expected "+i)}return e};break;case"boolean":this.checkedAssign=function(t){return"string"==typeof t&&["false","off","0"].indexOf(t.toLowerCase())>=0?!1:Boolean(t)};break;case"number":this.checkedAssign=function(t){return Number(t)};break;case"string":this.checkedAssign=function(t){return String(t)};break;case"array":this.checkedAssign=function(e){return e instanceof Array||console.error("Invalid value for '"+t+"':  "+e+" expected "+i),e};break;case"object":this.checkedAssign=function(e){return e instanceof Object||console.error("Invalid value for '"+t+"':  "+e+" expected "+i),e};break;case"widget":this.checkedAssign=function(e){return(!e._class||e._class.indexOf("common_PropertyExt")<0)&&console.error("Invalid value for '"+t+"':  "+e+" expected "+i),e};break;case"widgetArray":this.checkedAssign=function(e){return e.some(function(t){return!t._class||t._class.indexOf("common_Widget")<0})&&console.error("Invalid value for '"+t+"':  "+e+" expected "+i),e};break;case"propertyArray":this.checkedAssign=function(e){return e.some(function(t){return!t.publishedProperties})&&console.log("Invalid value for '"+t+"':  "+e+" expected "+i),e};break;case"propertyArray":this.checkedAssign=function(e){return e.some(function(t){return!t.publishedProperties})&&console.log("Invalid value for '"+t+"':  "+e+" expected "+i),e};break;default:this.checkedAssign=function(e){return window.__hpcc_debug&&console.error("Unchecked property type for '"+t+"':  "+e+" expected "+i),e}}}function s(t,e,i,r,s){this.id=t,this.type="proxy",this.proxy=e,this.method=i,this.defaultValue=r,this.ext=s||{}}function n(){this._id="_pe"+ ++u,this._watchArr=[],this.publishedProperties(!0).forEach(function(t){switch(t.type){case"array":case"widgetArray":case"propertyArray":this[c+t.id]=[]}},this)}var o="__meta_",h="__private_",c="__prop_",a="__default_",u=0;return n.prototype._class="common_PropertyExt",n.prototype.publishedProperties=function(t){var r=[];for(var s in this)!e(s)||!t&&i(this,s)||r.push(this[s]);return r},n.prototype.publishedProperty=function(t){return this[o+t]},n.prototype.publishReset=function(t,i){t=(t||[]).map(function(t){return o+t}),i=(i||[]).map(function(t){return o+t});for(var r in this)if(e(r)){var s=!t.length||t.length&&t.indexOf(r)>=0,n=i.indexOf(r)>=0;s&&!n&&(this[h+r]=!0)}},n.prototype.publish=function(t,e,i,s,n,h){if(void 0!==this[o+t]&&!h.override)throw t+" is already published.";var u=this[o+t]=new r(t,e,i,s,n,h);this[t]=function(e){return arguments.length?(""===e&&u.ext.optional?e=null:null!==e&&(e=u.checkedAssign(e)),this.broadcast(t,e,this[c+t]),null===e?delete this[c+t]:this[c+t]=e,this):this[t+"_disabled"]()?this[t+"_default"]():void 0!==this[c+t]?this[c+t]:this[t+"_default"]()},this[t+"_disabled"]=function(){return h&&h.disable?h.disable(this):!1},this[t+"_modified"]=function(){return void 0!==this[c+t]&&this[c+t]!==this[t+"_default"]()},this[t+"_exists"]=function(){return void 0!==this[c+t]||void 0!==this[t+"_default"]()},this[t+"_default"]=function(e){return arguments.length?(""===e&&(e=null),null===e?delete this[a+t]:this[a+t]=e,this):void 0!==this[a+t]?this[a+t]:u.defaultValue},this[t+"_reset"]=function(){switch(i){case"widget":this[c+t]&&this[c+t].target(null);break;case"widgetArray":this[c+t]&&this[c+t].forEach(function(t){t.target(null)})}switch(i){case"array":case"widgetArray":case"propertyArray":this[c+u.id]=[];break;default:delete this[c+t]}}},n.prototype.publishWidget=function(t,e,i){for(var r in e.prototype)if(0===r.indexOf("__meta")){var s=e.prototype[r];this.publishProxy(t+c+s.id,i,s.method||s.id)}},n.prototype.publishProxy=function(t,e,i,r){if(i=i||t,void 0!==this[o+t])throw t+" is already published.";this[o+t]=new s(t,e,i,r),this[t]=function(s){return arguments.length?(r&&s===r?this[e][i+"_reset"]():this[e][i](s),this):!r||this[t+"_modified"]()?this[e][i]():r},this[t+"_disabled"]=function(){return this[e][i+"_disabled"]()},this[t+"_modified"]=function(){return this[e][i+"_modified"]()&&(!r||this[e][i]()!==r)},this[t+"_exists"]=function(){return this[e][i+"_exists"]()},this[t+"_default"]=function(t){return arguments.length?(this[e][i+"_default"](t),this):this[e][i+"_default"]()},this[t+"_reset"]=function(){this[e][i+"_reset"]()}},n.prototype._monitorProperty=function(t,e){var i=this,r=this._watchArr.push({propertyID:t,callback:e})-1;return{remove:function(){delete i._watchArr[r]}}},n.prototype.monitor=function(t){var e=this;return 0===this._watchArr.length&&this.publishedProperties().forEach(function(t){switch(t.type){case"proxy":this[t.proxy]&&this[t.proxy]._monitorProperty(t.id,function(t,i,r){e.broadcast(t,i,r)})}},this),this._monitorProperty(void 0,t)},n.prototype.broadcast=function(t,e,i,r){r=r||this,this._watchArr.length&&e!==i&&this._watchArr.forEach(function(s){void 0!==s.propertyID&&s.propertyID!==t||!s.callback||setTimeout(function(){s.callback(t,e,i,r)},0)})},n.prototype.applyTheme=function(t){if(t){var e=this._class.split(" ");for(var i in e)if(t[e[i]])for(var r in t[e[i]])if("overrideTags"===r&&t[e[i]][r]instanceof Object)for(var s in t[e[i]][r])this.publishedProperty(r).ext&&(this.publishedProperty(r).ext.tags=t[e[i]][r][s]);else this.publishedProperty(r)&&(this.publishedProperty(r).defaultValue=t[e[i]][r])}},n});