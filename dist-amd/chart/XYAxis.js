!function(t,i){"function"==typeof define&&define.amd?define(["d3","../common/SVGWidget","../common/Utility","css!./XYAxis"],i):t.chart_XYAxis=i(t.d3,t.common_SVGWidget,t.common_Utility)}(this,function(t,i,e){function s(e){i.call(this),this._drawStartPos="origin",this._dateParserData=t.time.format("%Y-%m-%d").parse,this._dateParserValue=t.time.format("%Y-%m-%d").parse}s.prototype=Object.create(i.prototype),s.prototype.constructor=s,s.prototype._class+=" chart_XYAxis",s.prototype.publish("orientation","horizontal","set","Selects orientation for the axis",["horizontal","vertical"]),s.prototype.publish("selectionMode",!1,"boolean","Range Selector"),s.prototype.publish("xAxisTickCount",null,"number","X-Axis Tick Count",null,{optional:!0}),s.prototype.publish("xAxisTickFormat",null,"string","X-Axis Tick Format",null,{optional:!0}),s.prototype.publish("xAxisType","ordinal","set","X-Axis Type",["ordinal","linear","time"]),s.prototype.publish("xAxisTypeTimePattern","%Y-%m-%d","string","Time Series Pattern"),s.prototype.publish("xAxisDomainLow","","string","X-Axis Low"),s.prototype.publish("xAxisDomainHigh","","string","X-Axis High"),s.prototype.publish("xAxisOverlapMode","stagger","set","X-Axis Label Overlap Mode",["none","stagger","hide","rotate"]),s.prototype.publish("xAxisLabelRotation",null,"number","X-Axis Label Rotation"),s.prototype.publish("yAxisTitle","","string","Y-Axis Title"),s.prototype.publish("yAxisTickCount",null,"number","Y-Axis Tick Count",null,{optional:!0}),s.prototype.publish("yAxisTickFormat",null,"string","Y-Axis Tick Format",null,{optional:!0}),s.prototype.publish("yAxisType","linear","set","Y-Axis Type",["none","linear","pow","log","time"]),s.prototype.publish("yAxisTypeTimePattern","%Y-%m-%d","string","Time Series Pattern"),s.prototype.publish("yAxisTypePowExponent",2,"number","Exponent for Pow on Value Axis"),s.prototype.publish("yAxisTypeLogBase",10,"number","Base for log on Value Axis"),s.prototype.publish("yAxisDomainLow","","string","Y-Axis Low"),s.prototype.publish("yAxisDomainHigh","","string","Y-Axis High"),s.prototype.publish("yAxisDomainPadding",5,"number","Y-Axis Low/High Padding (if no low/high specified"),s.prototype.publish("regions",[],"array","Regions"),s.prototype.publish("sampleData","","set","Display Sample Data",["","ordinal","ordinalRange","linear","time-x","time-y"]),s.prototype.resetSelection=function(){return this._prevBrush=null,this};var a=s.prototype.xAxisTypeTimePattern;s.prototype.xAxisTypeTimePattern=function(i){var e=a.apply(this,arguments);return arguments.length&&(this._dateParserData=t.time.format(i).parse),e};var r=s.prototype.yAxisTypeTimePattern;return s.prototype.yAxisTypeTimePattern=function(i){var e=r.apply(this,arguments);return arguments.length&&(this._dateParserValue=t.time.format(i).parse),e},s.prototype.columns=function(t){return i.prototype.columns.apply(this,arguments)},s.prototype.formatData=function(t){switch(this.xAxisType()){case"time":return this._dateParserData("number"==typeof t?t.toString():t);default:return t}},s.prototype.formatValue=function(t){if(!t)return t;if(t instanceof Array)return t.map(function(t){return this.formatValue(t)},this);switch(this.yAxisType()){case"time":return this._dateParserValue("number"==typeof t?t.toString():t);default:return"string"==typeof t?+t:t}},s.prototype.formattedData=function(){return this.data().map(function(t){return t.map(function(t,i){return 0===i?this.formatData(t):i>=this.columns().length?t:this.formatValue(t)},this)},this)},s.prototype.enter=function(s,a){i.prototype.enter.apply(this,arguments),this.dataAxis=t.svg.axis().orient("bottom"),this.valueAxis=t.svg.axis().orient("left"),this.svg=a.append("g"),this.svgRegions=a.append("g"),this.svgData=this.svg.append("g"),this.svgXAxis=this.svg.append("g"),this.svgXAxisText=this.svgXAxis.append("text").attr("y",-2).style("text-anchor","end"),this.svgYAxis=this.svg.append("g"),this.svgYAxisText=this.svgYAxis.append("text").attr("transform","rotate(-90)").attr("x",-2).attr("y",2).attr("dy",".71em").style("text-anchor","end"),this.svgBrush=a.append("g").attr("class","brush");var r=this;this.xBrush=t.svg.brush().on("brush",function(){return r.brushMoved.apply(r,arguments)}),this.yBrush=t.svg.brush().on("brush",function(){return r.brushMoved.apply(r,arguments)}),this._selection=new e.SimpleSelection(this.svgData)},s.prototype.resizeBrushHandle=function(t,i,e){var s,a,r;return"e"===t||"w"===t?(s=+("e"===t),a=s?1:-1,r=e/3,"M"+.5*a+","+r+"A6,6 0 0 "+s+" "+6.5*a+","+(r+6)+"V"+(2*r-6)+"A6,6 0 0 "+s+" "+.5*a+","+2*r+"ZM"+2.5*a+","+(r+8)+"V"+(2*r-8)+"M"+4.5*a+","+(r+8)+"V"+(2*r-8)):(s=+("s"===t),r=s?1:-1,a=i/3,"M"+a+", "+.5*r+"A6,6 0 0 "+(s+1)%2+" "+(a+6)+","+6.5*r+"H"+(2*a-6)+"A6,6 0 0 "+(s+1)%2+" "+2*a+","+.5*r+"ZM"+(a+8)+","+2.5*r+"H"+(2*a-8)+"M"+(a+8)+","+4.5*r+"H"+(2*a-8))},s.prototype.brushMoved=i.prototype.debounce(function(){var t=this.formattedData().filter(function(t){var i;switch(this.xAxisType()){case"ordinal":return i=this.dataScale(t[0])+(this.dataScale.rangeBand?this.dataScale.rangeBand()/2:0),"horizontal"===this.orientation()?i>=this.xBrush.extent()[0]&&i<=this.xBrush.extent()[1]:i>=this.yBrush.extent()[0]&&i<=this.yBrush.extent()[1];default:return i=t[0],"horizontal"===this.orientation()?i>=this.xBrush.extent()[0]&&i<=this.xBrush.extent()[1]:i>=this.yBrush.extent()[0]&&i<=this.yBrush.extent()[1]}},this);this.selection(t)},250),s.prototype.dataPos=function(t){var i=this.dataScale(this.formatData(t));return"ordinal"===this.xAxisType()&&(i+=this.dataScale.rangeBand()/2),i},s.prototype.valuePos=function(t){return this.valueScale(this.formatValue(t))},s.prototype.setScaleRange=function(t,i){this.currScale.rangeRoundBands?this.currScale.rangeRoundBands([0,t],.1):this.currScale.rangeRound&&this.currScale.range([0,t]),this.otherScale.rangeRoundBands?this.otherScale.rangeRoundBands([i,0],.1):this.otherScale.rangeRound&&this.otherScale.range([i,0])},s.prototype.adjustXAxisText=function(i,e){switch(this.xAxisOverlapMode()){case"stagger":i.selectAll(".tick > text").style("text-anchor","middle").attr("dy",function(t,i){return.71+i%e.overlapModulus+"em"}).attr("dx",0).attr("visibility",null).attr("transform","rotate(0)");break;case"hide":i.selectAll(".tick > text").style("text-anchor","middle").attr("dy","0.71em").attr("dx",0).attr("visibility",function(t,i){return i%e.overlapModulus?"hidden":null}).attr("transform","rotate(0)");break;case"rotate":var s=-this.xAxisLabelRotation()||0;if(0!==s&&e.overlapModulus>1){i.selectAll(".tick > text").each(function(){var i=t.select(this),e=i.node().getBBox(),a=Math.sin(Math.PI*(-Math.abs(s)/180));i.style("text-anchor",s>0?"start":"end").attr("dy",e.height/2*a+"px").attr("dx",s>0?"0.71em":"-0.71em").attr("transform","rotate("+s+")").attr("visibility",null)});break}default:i.selectAll(".tick > text").style("text-anchor","middle").attr("dy","0.71em").attr("dx",0).attr("visibility",null).attr("transform","rotate(0)")}},s.prototype.calcMargin=function(t,i,e){var s={top:this.selectionMode()?10:2,right:this.selectionMode()?10:2,bottom:this.selectionMode()?10:2,left:this.selectionMode()?10:2,overlapModulus:1},a=this.height()-s.top-s.bottom,r=i.append("g");if(this.setScaleRange(this.width(),this.height()),"none"!==this.yAxisType()){var o=r.append("g").attr("class",e?"y axis":"x axis").call(this.otherAxis),n=o.node().getBBox();s.left=n.width,s.top-=n.y}var h=this.width()-s.left-s.right;this.setScaleRange(h,this.height());var l=r.append("g").attr("class",e?"x axis":"y axis").attr("transform","translate("+s.left+","+a/2+")").call(this.currAxis);switch(this.xAxisOverlapMode()){case"rotate":case"stagger":case"hide":var u=[];l.selectAll(".tick > text").each(function(t){for(var i=this.getBoundingClientRect(),e=u.length-1;e>=0&&!(u[e].right<i.left);--e)u.length+1-e>s.overlapModulus&&(s.overlapModulus=u.length+1-e);u.push(i)})}this.adjustXAxisText(l,s);var p=l.node().getBBox();return s.right-=h-(p.x+p.width),s.bottom=p.height,this.setScaleRange(this.width()-s.left-s.right,this.height()-s.top-s.bottom),r.remove(),s},s.prototype.updateRegions=function(i,e,s){var a=this,r=this.svgRegions.selectAll(".region").data(this.regions());r.enter().append("rect").attr("class","region"),s?r.attr("x",function(t){return a.dataPos(t.x0)}).attr("y",0).attr("width",function(t){return a.dataPos(t.x1)-a.dataPos(t.x0)}).attr("height",this.height()).style("stroke",function(t){return a._palette(t.colorID)}).style("fill",function(i){return t.hsl(a._palette(i.colorID)).brighter()}):r.attr("x",0).attr("y",function(t){return a.dataPos(t.x0)}).attr("width",this.width()).attr("height",function(t){return a.dataPos(t.x0)-a.dataPos(t.x1)}).style("stroke",function(t){return a._palette(t.colorID)}).style("fill",function(i){return t.hsl(a._palette(i.colorID)).brighter()}),r.exit().remove()},s.prototype.update=function(i,e){var s=this,a="horizontal"===this.orientation();switch(this.updateRegions(i,e,a),this.xAxisType()){case"linear":this.dataScale=t.scale.linear(),this.dataFormatter=t.format(this.xAxisTickFormat());break;case"time":this.dataScale=t.time.scale(),this.dataFormatter=this.xAxisTickFormat()?t.time.format(this.xAxisTickFormat()):null;break;case"ordinal":default:this.dataScale=t.scale.ordinal(),this.dataFormatter=null}switch(this.dataAxis.scale(this.dataScale).ticks(this.xAxisTickCount()).tickFormat(this.dataFormatter),this.yAxisType()){case"pow":this.valueScale=t.scale.pow().exponent(this.yAxisTypePowExponent()),this.valueFormatter=t.format(this.yAxisTickFormat());break;case"log":this.valueScale=t.scale.log().base(this.yAxisTypeLogBase()),this.valueFormatter=t.format(this.yAxisTickFormat());break;case"time":this.valueScale=t.time.scale(),this.valueFormatter=this.yAxisTickFormat()?t.time.format(this.yAxisTickFormat()):null;break;case"linear":default:this.valueScale=t.scale.linear(),this.valueFormatter=t.format(this.yAxisTickFormat())}this.valueAxis.scale(this.valueScale).ticks(this.yAxisTickCount()).tickFormat(this.valueFormatter),this.dataAxis.orient(a?"bottom":"left"),this.valueAxis.orient(a?"left":"bottom"),this.currAxis=a?this.dataAxis:this.valueAxis,this.otherAxis=a?this.valueAxis:this.dataAxis,this.currScale=a?this.dataScale:this.valueScale,this.otherScale=a?this.valueScale:this.dataScale;var r=a?this.xBrush:this.yBrush,o=a?this.yBrush:this.xBrush,n=o.extent();switch(this.xAxisType()){case"ordinal":this.dataScale.domain(this.data().map(function(t){return t[0]}));break;default:var h=this.xAxisDomainLow()?this.formatData(this.xAxisDomainLow()):t.min(this.formattedData(),function(t){return t[0]}),l=this.xAxisDomainHigh()?this.formatData(this.xAxisDomainHigh()):t.max(this.formattedData(),function(t){return t[0]});void 0!==h&&void 0!==l&&this.dataScale.domain([h,l])}var u=this.yAxisDomainLow()?this.formatValue(this.yAxisDomainLow()):t.min(this.formattedData(),function(i){return t.min(i.filter(function(t,i){return i>0&&s.columns()[i]&&0!==s.columns()[i].indexOf("__")&&null!==t}),function(t){return t instanceof Array?t[0]:t})}),p=this.yAxisDomainHigh()?this.formatValue(this.yAxisDomainHigh()):t.max(this.formattedData(),function(i){return t.max(i.filter(function(t,i){return i>0&&s.columns()[i]&&0!==s.columns()[i].indexOf("__")&&null!==t}),function(t){return t instanceof Array?t[1]:t})});switch(this.yAxisType()){case"time":break;default:if(""===this.yAxisDomainLow()&&""===this.yAxisDomainHigh()){var c=(p-u)*this.yAxisDomainPadding()/100,x=u-c;(u>=0&&0>x||u===p)&&(x=0),u=x,p+=c}}this.valueScale.domain([u,p]),this.margin=this.calcMargin(i,e,a);var d=this.width()-this.margin.left-this.margin.right;0>d&&(d=0);var m=this.height()-this.margin.top-this.margin.bottom;0>m&&(m=0);var y=a?d:m,g=a?m:d;if(this.svg.transition().attr("transform","translate("+this.margin.left+","+this.margin.top+")"),this.svgXAxis.transition().attr("class",a?"x axis":"y axis").attr("transform","translate(0,"+m+")").call(this.currAxis),this.svgXAxisText.attr("x",d-2).text(a?this.columns()[0]:this.yAxisTitle()),this.svgYAxis.transition().style("visibility","none"===this.yAxisType()?"hidden":null).attr("class",a?"y axis":"x axis").call(this.otherAxis).each(function(){s.adjustXAxisText(s.svgXAxis,s.margin)}),this.svgYAxisText.text(a?this.yAxisTitle():this.columns()[0]),this.xBrush.x(this.dataScale),this.yBrush.y(this.dataScale),this.selectionMode()){if(this._prevXAxisType!==this.xAxisType()&&(this._prevXAxisType=this.xAxisType(),this._prevBrush=null),this._prevBrush){if(this._prevBrush&&this._prevBrush.orientation!==this.orientation())switch(this.xAxisType()){case"ordinal":r.extent([y-n[0]*y/this._prevBrush.maxCurrExtent,y-n[1]*y/this._prevBrush.maxCurrExtent]);break;default:r.extent(n)}}else switch(this.xAxisType()){case"ordinal":r.extent([0,y]);break;default:r.extent(this.dataScale.domain())}this._prevBrush={orientation:this.orientation(),maxCurrExtent:y}}this.svgBrush.attr("transform","translate("+this.margin.left+", "+this.margin.top+")").style("display",this.selectionMode()?null:"none").call(r).selectAll(".background").transition().attr("width",d).attr("height",m),this.svgBrush.selectAll(".extent, .resize rect").transition().attr(a?"y":"x",0).attr(a?"height":"width",g);var f=this.svgBrush.selectAll(".resize").selectAll("path").data(function(t){return t});f.enter().append("path"),f.transition().attr("d",function(t){return s.resizeBrushHandle(t,d,m)}),this.updateChart(i,e,this.margin,d,m,a)},s.prototype.updateChart=function(t,i,e,s,a,r){},s.prototype.exit=function(t,e){i.prototype.exit.apply(this,arguments),delete this._selection},s.prototype.selection=function(t){console.log(t)},s});