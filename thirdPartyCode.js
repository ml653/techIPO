// Resolves collisions between d and all other circles.
//FOLLOWING FUNCTION TAKEN TAKEN FROM (http://bl.ocks.org/mbostock/1748247)
function collide(alpha, nodes) {
	var quadtree = d3.geom.quadtree(nodes);
	return function(d) {
		var r = d.radius + nodePadding,
				nx1 = d.x - r,
				nx2 = d.x + r,
				ny1 = d.y - r,
				ny2 = d.y + r;
		quadtree.visit(function(quad, x1, y1, x2, y2) {
			if (quad.point && (quad.point !== d)) {
				var x = d.x - quad.point.x,
						y = d.y - quad.point.y,
						l = Math.sqrt(x * x + y * y),
						r = d.radius + quad.point.radius + nodePadding;
				if (l < r) {
					l = (l - r) / l * alpha;
					d.x -= x *= l;
					d.y -= y *= l;
					quad.point.x += x;
					quad.point.y += y;
				}
			}
			return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
		});
	};
}

//Not our merge or mergeSort; 
//cite (http://khan4019.github.io/front-end-Interview-Questions/sort.html);
function merge(left, right){
	var result = [],
			lLen = left.length,
			rLen = right.length,
			l = 0,
			r = 0;
	while(l < lLen && r < rLen){
		if(left[l].date < right[r].date){
			result.push(left[l++]);
		}
		else{
			result.push(right[r++]);
		}
	}
	return result.concat(left.slice(l)).concat(right.slice(r));
}
function mergeSort(arr){
	var len = arr.length;
	if(len <2)
		return arr;
	var mid = Math.floor(len/2),
			left = arr.slice(0,mid),
			right =arr.slice(mid);
	return merge(mergeSort(left),mergeSort(right));
}