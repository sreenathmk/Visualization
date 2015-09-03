(function(e,t){typeof define=="function"&&define.amd?define(["d3"],t):e.other_Bag=t(e.d3)})(this,function(e){function t(){this.items={}}function n(e){this._widgetElement=e}return t.prototype.clear=function(){for(var e in this.items)this.items[e].element().classed("selected",!1);this.items={}},t.prototype.isEmpty=function(){for(var e in this.items)return!1;return!0},t.prototype.append=function(e){this.items[e._id]=e,e.element().classed("selected",!0)},t.prototype.remove=function(e){this.items[e._id].element().classed("selected",!1),delete this.items[e._id]},t.prototype.isSelected=function(e){return this.items[e._id]!==undefined},t.prototype.get=function(){var e=[];for(var t in this.items)e.push(this.items[t]);return e},t.prototype.set=function(e){this.clear(),e.forEach(function(e,t){this.append(e)},this)},t.prototype.click=function(e,t){t.ctrlKey?this.items[e._id]?this.remove(e):this.append(e):(this.clear(),this.append(e))},n.prototype.enter=function(t,n){var r=this;t.on("click.SimpleSelection",function(t,n){var i=e.select(this),s=i.classed("selected");r._widgetElement.selectAll(".selected").classed("selected",null),s||i.classed("selected",!0)}).on("mouseover.SimpleSelection",function(t,n){e.select(this).classed("over",!0)}).on("mouseout.SimpleSelection",function(t,n){e.select(this).classed("over",null)})},n.prototype.selected=function(t){return e.select(t).classed("selected")},{Selection:t,SimpleSelection:n,Navigation:null}});