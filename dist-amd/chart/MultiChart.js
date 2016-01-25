(function(e,t){typeof define=="function"&&define.amd?define(["d3","../common/SVGWidget","../common/Utility","../api/INDChart"],t):e.chart_MultiChart=t(e.d3,e.common_SVGWidget,e.common_Utility,e.api_INDChart)})(this,function(e,t,n,r){function i(){t.call(this),r.call(this),this._allCharts={},this._allChartTypes.forEach(function(e){var t=JSON.parse(JSON.stringify(e));t.widget=null,this._allCharts[e.id]=t,this._allCharts[e.display]=t,this._allCharts[e.widgetClass]=t},this)}return i.prototype=Object.create(t.prototype),i.prototype.constructor=i,i.prototype._class+=" chart_MultiChart",i.prototype.implements(r.prototype),i.prototype._1DChartTypes=[{id:"SUMMARY",display:"Summary",widgetClass:"chart_Summary"},{id:"C3_GAUGE",display:"Gauge (C3)",widgetClass:"c3chart_Gauge"}].map(function(e){return e.family="1D",e}),i.prototype._2DChartTypes=[{id:"BUBBLE",display:"Bubble",widgetClass:"chart_Bubble"},{id:"PIE",display:"Pie",widgetClass:"chart_Pie"},{id:"GOOGLE_PIE",display:"Pie (Google)",widgetClass:"google_Pie"},{id:"C3_DONUT",display:"Donut (C3)",widgetClass:"c3chart_Donut"},{id:"C3_PIE",display:"Pie (C3)",widgetClass:"c3chart_Pie"},{id:"AM_FUNNEL",display:"Area (amCharts)",widgetClass:"amchart_Funnel"},{id:"AM_PIE",display:"Pie (amCharts)",widgetClass:"amchart_Pie"},{id:"AM_PYRAMID",display:"Area (amCharts)",widgetClass:"amchart_Pyramid"},{id:"WORD_CLOUD",display:"Word Cloud",widgetClass:"other_WordCloud"}].map(function(e){return e.family="2D",e}),i.prototype._NDChartTypes=[{id:"COLUMN",display:"Column",widgetClass:"chart_Column"},{id:"BAR",display:"Bar",widgetClass:"chart_Bar"},{id:"LINE",display:"Line",widgetClass:"chart_Line"},{id:"AREA",display:"Area",widgetClass:"chart_Area"},{id:"STEP",display:"Step",widgetClass:"chart_Step"},{id:"SCATTER",display:"Scatter",widgetClass:"chart_Scatter"},{id:"GOOGLE_BAR",display:"Bar (Google)",widgetClass:"google_Bar"},{id:"GOOGLE_COLUMN",display:"Column (Google)",widgetClass:"google_Column"},{id:"GOOGLE_LINE",display:"Line (Google)",widgetClass:"google_Line"},{id:"GOOGLE_SCATTER",display:"Scatter (Google)",widgetClass:"google_Scatter"},{id:"GOOGLE_COMBO",display:"Combo (Google)",widgetClass:"google_Combo"},{id:"C3_AREA",display:"Area (C3)",widgetClass:"c3chart_Area"},{id:"C3_BAR",display:"Bar (C3)",widgetClass:"c3chart_Bar"},{id:"C3_COLUMN",display:"Column (C3)",widgetClass:"c3chart_Column"},{id:"C3_LINE",display:"Line (C3)",widgetClass:"c3chart_Line"},{id:"C3_SCATTER",display:"Scatter (C3)",widgetClass:"c3chart_Scatter"},{id:"C3_STEP",display:"Step (C3)",widgetClass:"c3chart_Step"},{id:"C3_COMBO",display:"Combo (C3)",widgetClass:"c3chart_Combo"},{id:"AM_AREA",display:"Area (amCharts)",widgetClass:"amchart_Area"},{id:"AM_BAR",display:"Bar (amCharts)",widgetClass:"amchart_Bar"},{id:"AM_LINE",display:"Line (amCharts)",widgetClass:"amchart_Line"},{id:"AM_SCATTER",display:"Scatter (amCharts)",widgetClass:"amchart_Scatter"},{id:"AM_COLUMN",display:"Column (amCharts)",widgetClass:"amchart_Column"},{id:"AM_GANTT",display:"Gantt (amCharts)",widgetClass:"amchart_Gantt"},{id:"AM_COMBO",display:"Combo (amCharts)",widgetClass:"amchart_Combo"}].map(function(e){return e.family="ND",e}),i.prototype._anyChartTypes=[{id:"TABLE",display:"Table",widgetClass:"other_Table"}].map(function(e){return e.family="any",e}),i.prototype._allChartTypes=i.prototype._1DChartTypes.concat(i.prototype._2DChartTypes.concat(i.prototype._NDChartTypes.concat(i.prototype._anyChartTypes))),i.prototype.publishReset(),i.prototype.publish("chartType","BUBBLE","set","Chart Type",i.prototype._allChartTypes.map(function(e){return e.id}),{tags:["Basic"]}),i.prototype.publish("chart",null,"widget","Chart",null,{tags:["Basic"]}),i.prototype.fields=function(e){var n=t.prototype.fields.apply(this,arguments);return arguments.length&&this.chart()&&this.chart().fields(e),n},i.prototype.columns=function(e){var n=t.prototype.columns.apply(this,arguments);return arguments.length&&this.chart()&&this.chart().columns(e),n},i.prototype.data=function(e){var n=t.prototype.data.apply(this,arguments);return arguments.length&&this.chart()&&this.chart().data(e),n},i.prototype._origChart=i.prototype.chart,i.prototype.chart=function(e){var t=i.prototype._origChart.apply(this,arguments);if(arguments.length){var n=this;e.click=function(e,t,r){n.click(e,t,r)}}return t},i.prototype.hasOverlay=function(){return this.chart()&&this.chart().hasOverlay()},i.prototype.visible=function(e){return arguments.length?(this.chart()&&this.chart().visible(e),this):this.chart()&&this.chart().visible()},i.prototype.chartTypeProperties=function(e){return arguments.length?(this._chartTypeProperties=e,this):this._chartTypeProperties},i.prototype.getChartDataFamily=function(){return this._allCharts[this.chartType()].family},i.prototype.requireContent=function(e,t){n.requireWidget(this._allCharts[e].widgetClass).then(function(e){t(new e)})},i.prototype.switchChart=function(e){if(this._switchingTo===this.chartType()){e&&e(this);return}this._switchingTo&&console.log("Attempting switch to:  "+this.chartType()+", before previous switch is complete ("+this._switchingTo+")"),this._switchingTo=this.chartType();var t=this.chart(),n=this;this.requireContent(this.chartType(),function(r){if(r!==t){var i=n.size();r.fields(n.fields()).data(n.data()).size(i);if(n._chartTypeProperties){for(var s in n._chartTypeProperties)if(r[s])try{r[s](n._chartTypeProperties[s])}catch(o){console.log("Exception Setting Property:  "+s)}else console.log("Unknown Property:  "+s);delete n._chartTypeProperties}n.chart(r),t&&t.data([]).size({width:1,height:1}).render()}delete n._switchingTo,e&&e(this)})},i.prototype.update=function(e,n){t.prototype.update.apply(this,arguments);var r=n.selectAll(".multiChart").data(this.chart()?[this.chart()]:[],function(e){return e._id});r.enter().append("g").attr("class","multiChart").each(function(e){e.target(this)});var i=this.size();r.each(function(e){e.size(i).render()}),r.exit().transition().each(function(e){e.target(null)}).remove()},i.prototype.exit=function(e,n){this.chart()&&this.chart().target(null),t.prototype.exit.apply(this,arguments)},i.prototype.render=function(e){if(this.chartType()&&(!this.chart()||this.chart().classID()!==this._allCharts[this.chartType()].widgetClass)){var n=this,r=arguments;return this.switchChart(function(){t.prototype.render.apply(n,r)}),this}return t.prototype.render.apply(this,arguments)},i});