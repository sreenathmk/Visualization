!function(t,o){"function"==typeof define&&define.amd?define(["d3","topojson","./Choropleth","./us-states","../common/Utility"],o):t.map_ChoroplethStates=o(t.d3,t.topojson,t.map_Choropleth,t.map_usStates,t.common_Utility)}(this,function(t,o,e,s,a){function i(){e.call(this),this.projection("albersUsaPr"),this._choroTopology=s.topology,this._choroTopologyObjects=s.topology.objects.states}var n=o.feature(s.topology,s.topology.objects.states).features,r={};for(var h in n)n[h].id&&(r[s.stateNames[n[h].id].code]=n[h]);return i.prototype=Object.create(e.prototype),i.prototype.constructor=i,i.prototype._class+=" map_ChoroplethStates",i.prototype.layerEnter=function(o,s,i){e.prototype.layerEnter.apply(this,arguments),this._choroplethStates=this._choroplethTransform.insert("g",".mesh"),this._selection=new a.SimpleSelection(this._choroplethStates),this.choroPaths=t.select(null)},i.prototype.layerUpdate=function(t){e.prototype.layerUpdate.apply(this,arguments),this.choroPaths=this._choroplethStates.selectAll(".data").data(this.visible()?this.data():[],function(t){return t[0]});var o=this;this.choroPaths.enter().append("path").attr("class","data").call(this._selection.enter.bind(this._selection)).on("click",function(t){o.click(o.rowToObj(t),"weight",o._selection.selected(this))}).on("mouseover.tooltip",function(t){var e=r[t[0]].id;o.tooltipShow([s.stateNames[e].name,t[1]],o.columns(),1)}).on("mouseout.tooltip",function(t){o.tooltipShow()}).on("mousemove.tooltip",function(t){var e=r[t[0]].id;o.tooltipShow([s.stateNames[e].name,t[1]],o.columns(),1)}),this.choroPaths.attr("d",function(o){var e=t._d3GeoPath(r[o[0]]);return e||console.log("Unknown US State:  "+o),e}).style("fill",function(t){var e=o._palette(t[1],o._dataMinWeight,o._dataMaxWeight);return e}),this.choroPaths.exit().remove()},i});