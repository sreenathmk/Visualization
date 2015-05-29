(function(e,t){typeof define=="function"&&define.amd?define(["d3","dagre"],t):e.graph_GraphLayouts=t(e.d3,e.dagre)})(this,function(e,t){function n(e,t,n,r){var i=this;this.pos={};var s=0;r=r||(t<n?t-s:n-s)/2;var o=e.nodeCount(),u=-Math.PI/2,a=2*Math.PI/o;e.eachNode(function(e,t){var n=t.getBBox(!0),s=Math.max(n.width,n.height);i.pos[e]={x:t.fixed?t.x:Math.cos(u)*(r-s),y:t.fixed?t.y:Math.sin(u)*(r-s),width:n.width,height:n.height},u+=a})}function r(e,t,n,r){var i=this;this.pos={},e.eachNode(function(e,t){i.pos[e]={x:t.x,y:t.y,width:t.width,height:t.height}})}function i(t,n,r,i){var s=this;this.pos={},this.vertices=[],this.vertexMap={},t.eachNode(function(e){var n=t.node(e),r=n.getBBox(!0),i={id:e,x:n.pos().x,y:n.pos().y,width:r.width,height:r.height,value:n};s.vertices.push(i),s.vertexMap[e]=i}),this.edges=[],t.eachEdge(function(e,t,n){s.edges.push({source:s.vertexMap[t],target:s.vertexMap[n]})}),this.force=e.layout.force().charge(function(e){var t=e.value.getBBox();return-25*Math.max(t.width,t.height)}).linkDistance(300).nodes(this.vertices).links(this.edges);if(i){this.force.start();var o=t.nodeCount();o=Math.min(o*o,500);for(var u=0;u<o;++u)this.force.tick();this.force.stop()}}function s(e,n,r,i){var s=(new t.graphlib.Graph({multigraph:!0,compound:!0})).setGraph(i).setDefaultNodeLabel(function(){return{}}).setDefaultEdgeLabel(function(){return{}});e.eachNode(function(t){var n=e.node(t),r=n.getBBox();s.setNode(t,{width:r.width,height:r.height})}),e.eachEdge(function(t,n,r){var i=e.edge(t);s.setEdge(n,r,{weight:i.weight()})}),e.eachNode(function(t){s.setParent(t,e.parent(t))}),this.dagreLayout=t.layout(s);var o=-s.graph().width/2,u=-s.graph().height/2;s.nodes().forEach(function(e){var t=s.node(e);t.x+=o,t.y+=u}),s.edges().forEach(function(e){var t=s.edge(e);for(var n=0;n<t.points.length;++n)t.points[n].x+=o,t.points[n].y+=u}),this.digraph=s}n.prototype.nodePos=function(e){return this.pos[e]},n.prototype.edgePoints=function(e){return[]},r.prototype.nodePos=function(e){return this.pos[e]},r.prototype.edgePoints=function(e){return[]},i.prototype.nodePos=function(e){return this.vertexMap[e]},i.prototype.edgePoints=function(e){return[]},s.prototype.nodePos=function(e){return this.digraph.node(e)},s.prototype.edgePoints=function(e){return this.digraph.edge(e).points};var o={None:r,Circle:n,ForceDirected:i,Hierarchy:s};return o});