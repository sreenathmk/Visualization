(function(e,t){typeof define=="function"&&define.amd?define(["d3","./Class","./PropertyExt"],t):e.common_Database=t(e.d3,e.common_Class,e.common_PropertyExt)})(this,function(e,t,n){function r(e,r){t.call(this),n.call(this),this._id=e||this._id,r=r||{},this.label(r.label||""),this.type(r.type||""),this.mask(r.mask||null),this.format(r.format||null)}function u(){t.call(this),n.call(this),this.clear()}function l(e,t){return e instanceof Array||(e=[e]),e.filter(function(e){return e!==""}).every(t)}function c(e){return typeof e=="boolean"}function h(e){return typeof e=="number"||!isNaN(e)}function p(e){return typeof e=="string"}function g(t,n){for(var r=0;r<t.length;++r){var i=e.time.format(t[r]).parse(n);if(i)return f=t[r],t[r]}return null}function y(e){return g(d,e)}function b(e){return g(v,e)}function w(e){return g(m,e)}function E(e){return["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY","AS","DC","FM","GU","MH","MP","PW","PR","VI"].indexOf(String(e).toUpperCase())>=0}r.prototype=Object.create(t.prototype),r.prototype.constructor=r,r.prototype.mixin(n),r.prototype._class+=" common_Database.Field",r.prototype.id=function(){return this._id},r.prototype.publish("label","","string","Label"),r.prototype.publish("type","","set","Type",["","string","number","boolean","time"]);var i=r.prototype.type;r.prototype.type=function(e){var t=i.apply(this,arguments);if(arguments.length)switch(this.type()){case"number":this._typeTransformer=function(e){return Number(e)};break;case"string":this._typeTransformer=function(e){return String(e)};break;case"boolean":this._typeTransformer=function(e){return typeof e=="string"&&["false","off","0"].indexOf(e.toLowerCase())>=0?!1:Boolean(e)};break;case"time":case"date":this._typeTransformer=function(e){return this._maskTransformer.parse(e)};break;default:this._typeTransformer=function(e){return e}}return t},r.prototype.publish("mask","","string","Time Mask");var s=r.prototype.mask;r.prototype.mask=function(e){var t=s.apply(this,arguments);return arguments.length&&(this._maskTransformer=this.formatter(e)),t},r.prototype.publish("format","","string","Format");var o=r.prototype.format;r.prototype.format=function(e){var t=o.apply(this,arguments);return arguments.length&&(this._formatTransformer=this.formatter(e)),t},r.prototype.parse=function(e){if(!e)return e;try{return this._typeTransformer(e)}catch(t){return console.log("Unable to parse:  "+e),null}},r.prototype.transform=function(e){if(!e)return e;try{return this._formatTransformer(this._typeTransformer(e))}catch(t){return console.log("Unable to transform:  "+e),null}},r.prototype.clone=function(){return new r(this._id,{label:this.label(),type:this.type(),mask:this.mask(),format:this.format()})},r.prototype.formatter=function(t){var n;if(!t)return n=function(e){return e},n.parse=function(e){return e},n;switch(this.type()){case"time":case"date":return e.time.format(t)}return n=e.format(t),n.parse=function(e){return e},n},u.prototype=Object.create(t.prototype),u.prototype.constructor=u,u.prototype.mixin(n),u.prototype._class+=" common_Database.Grid",u.prototype.publish("fields",[],"propertyArray","Fields"),u.prototype.clear=function(){return this._data=[],this},u.prototype.legacyColumns=function(e){return arguments.length?(this.row(0,e),this):this.row(0)},u.prototype.legacyData=function(e,t){return u.prototype.data.apply(this,arguments)},u.prototype.field=function(e){return this.fields()[e]};var a=u.prototype.fields;u.prototype.fields=function(e,t){return arguments.length?a.call(this,t?e.map(function(e){return e.clone()}):e):a.apply(this,arguments)},u.prototype.fieldByLabel=function(e,t){return this.fields().filter(function(n,r){return n.idx=r,t?n.label().toLowerCase()===e.toLowerCase():n.label()===e})[0]},u.prototype.data=function(e,t){return arguments.length?(this._data=t?e.map(function(e){return e.map(function(e){return e})}):e,this):this._data},u.prototype.parsedData=function(){var e=this;return this._data.map(function(t){return t.map(function(t,n){return e.fields()[n].parse(t)})})},u.prototype.formattedData=function(){var e=this;return this._data.map(function(t){return t.map(function(t,n){return e.fields()[n].transform(t)})})},u.prototype.row=function(e,t){return arguments.length<2?e===0?this.fields().map(function(e){return e.label()}):this._data[e-1]:(e===0?this.fields(t.map(function(e){return(new r).label(e)})):this._data[e-1]=t,this)},u.prototype.rows=function(e){return arguments.length?(this.row(0,e[0]),this._data=e.filter(function(e,t){return t>0}),this):[this.row(0)].concat(this._data)},u.prototype.column=function(e,t){return arguments.length<2?[this.fields()[e].label()].concat(this._data.map(function(t,n){return t[e]})):(t.forEach(function(n,i){i===0?this.fields()[e]=(new r).label(t[0]):this._data[i-1][e]=n},this),this)},u.prototype.columnData=function(e,t){return arguments.length<2?this._data.map(function(t,n){return t[e]}):(t.forEach(function(t,n){this._data[n][e]=t},this),this)},u.prototype.columns=function(e){return arguments.length?(e.forEach(function(t,n){this.column(n,e[n])},this),this):this.fields().map(function(e,t){return this.column(t)},this)},u.prototype.cell=function(e,t,n){return arguments.length<3?this.row(e)[t]:(e===0?this.fields()[t]=(new r).label(n):this._data[e][t]=n,this)},u.prototype.grid=function(e){return u.prototype.rows.apply(this,arguments)},u.prototype.hipieMapSortArray=function(e){return e.map(function(e){var t=!1;e.indexOf("-")===0&&(e=e.substring(1),t=!0);var n=this.fieldByLabel(e,!0);return n||console.log("Grid.prototype.hipieMapSortArray:  Invalid sort array - "+e),{idx:n?n.idx:-1,reverse:t}},this).filter(function(e){return e.idx>=0})},u.prototype.hipieMappings=function(t){function u(e,t,n,r){var i=n.map(function(e){return e});i[t]=e.key,e.values instanceof Array?e.values.forEach(function(e){u(e,t+1,i,r)}):(i[t+1]=e.values,r.push(i))}var n=-1,r=[],i=[],s=-1,o=[];t.forEach(function(e,t){if(e instanceof Object)switch(e.function){case"SUM":case"AVE":case"MIN":case"MAX":n>=0&&console.log("Rollup field already exists - there should only be one?"),n=t,e.params.forEach(function(e){var t=this.fieldByLabel(e.param1,!0);t?r.push(t.idx):console.log("Grid.prototype.hipieMappings:  Invalid rollup field - "+e.param1)},this);break;case"SCALE":s>=0&&console.log("Scale field already exists - there should only be one?"),s=t,e.params.forEach(function(e){var t=this.fieldByLabel(e.param1,!0);if(!t)console.log("Grid.prototype.hipieMappings:  Invalid scale field - "+e.param1);else{var n=t.idx,r=e.param2;o.push(function(e){return e[n]/r})}},this);break;default:console.log("Unknown field function - "+e.function)}else if(e.indexOf("_AVE")===e.length-4&&this.fieldByLabel(e.substring(0,e.length-4)+"_SUM",!0)&&this.fieldByLabel("base_count",!0)){console.log("Deprecated - Symposium AVE Hack");var u=this.fieldByLabel(e.substring(0,e.length-4)+"_SUM",!0),a=this.fieldByLabel("base_count",!0);i.push(u.idx),o.push(function(e){return e[u.idx]/e[a.idx]})}else{var f=this.fieldByLabel(e,!0);f&&(i.push(f.idx),o.push(function(e){return e[f.idx]}))}},this);if(n>=0){var a=t[n],f=[];for(var l in a.params)f.push(a.params[l]);var c=this.rollup(i,function(t){switch(a.function){case"SUM":return e.sum(t,function(e){return e[r[0]]});case"AVE":return e.mean(t,function(e){return e[r[0]]});case"MIN":return e.min(t,function(e){return e[r[0]]});case"MAX":return e.max(t,function(e){return e[r[0]]})}return console.log("Unsupported Mapping Function:  "+a.function),0}),h=[];return c instanceof Array?c.forEach(function(e){u(e,0,[],h)}):h.push([c]),h}return this._data.map(function(e){var t=[];return o.forEach(function(n){t.push(n(e))}),t})},u.prototype._nest=function(t,n){t instanceof Array||(t=[t]);var r=e.nest();return t.forEach(function(e){r.key(function(t){return t[e]})}),r},u.prototype.nest=function(e){return this._nest(e).entries(this._data)},u.prototype.rollup=function(e,t){return this._nest(e).rollup(t).entries(this._data)},u.prototype.length=function(){return this._data.length+1},u.prototype.width=function(){return this.fields().length},u.prototype.pivot=function(){return this.rows(this.columns()),this},u.prototype.clone=function(e){return(new u).fields(this.fields(),e).data(this.data(),e)},u.prototype.filter=function(e){var t={};return this.row(0).forEach(function(e,n){t[e]=n}),(new u).fields(this.fields(),!0).data(this.data().filter(function(n){for(var r in e)if(e[r]!==n[t[r]])return!1;return!0}))};var f=null;u.prototype.analyse=function(e){e instanceof Array||(e=[e]);var t=[];return e.forEach(function(e){var n=this.rollup(e,function(e){return e.length});t.push(n);var r=n.map(function(e){return e.key});this.fields()[e].isBoolean=l(r,c),this.fields()[e].isNumber=l(r,h),this.fields()[e].isString=!this.fields()[e].isNumber&&l(r,p),this.fields()[e].isUSState=this.fields()[e].isString&&l(r,E),this.fields()[e].isDateTime=this.fields()[e].isString&&l(r,y),this.fields()[e].isDateTimeFormat=f,this.fields()[e].isDate=!this.fields()[e].isDateTime&&l(r,b),this.fields()[e].isDateFormat=f,this.fields()[e].isTime=this.fields()[e].isString&&!this.fields()[e].isDateTime&&!this.fields()[e].isDate&&l(r,w),this.fields()[e].isTimeFormat=f},this),t},u.prototype.jsonObj=function(e){return arguments.length?(this.clear(),this.data(e.map(function(e,t){var n=[];for(var i in e){var s=this.row(0).indexOf(i);s<0&&(s=this.fields().length,this.fields().push((new r).label(i))),n[s]=e[i]}return n},this)),this):this._data.map(function(e){var t={};return this.row(0).forEach(function(n,r){t[n]=e[r]}),t},this)},u.prototype.json=function(e){return arguments.length?(this.jsonObj(JSON.parse(e)),this):JSON.stringify(this.jsonObj(),null,"  ")},u.prototype.csv=function(t){return arguments.length?(this.jsonObj(e.csv.parse(t)),this):e.csv.formatRows(this.grid())},u.prototype.tsv=function(t){return arguments.length?(this.jsonObj(e.tsv.parse(t)),this):e.tsv.formatRows(this.grid())};var d=[],v=["%Y-%m-%d","%Y%m%d"],m=["%H:%M:%S.%LZ","%H:%M:%SZ","%H:%M:%S"];return v.forEach(function(e){m.forEach(function(t){d.push(e+"T"+t)})}),{Field:r,Grid:u}});