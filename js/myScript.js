var width, height, center;
var points = 3;
var smooth = true;
var path = new Path({
    strokeColor: 'pink',
    strokeWidth: 50
});

var mousePos = view.center / 2;
var pathHeight = mousePos.y;

initWidth = view.size.width;

initializePath();

function initializePath() {
	center = view.center;
	width = view.size.width;
	height = view.size.height / 2;
    
	path.segments = [];
	path.add(view.bounds.bottomLeft);
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
    
	path.add(view.bounds.topRight);
    path.add(view.bounds.bottomRight);
	path.fullySelected = true;
}

function flex() {
	
    pathHeight += (center.y - mousePos.y - pathHeight) / 10;
    h = initWidth-view.size.width;
    
	for (var i = 1; i < points; i++) {
		var sinSeed = h + (i + i % 10) * 100;
		var sinHeight = Math.sin(sinSeed / 200) * height;

		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
		path.segments[i].point.y = yPos;

	}
	if (smooth)
		path.smooth({ type: 'continuous' });
}

function onMouseMove(event) {
	mousePos = event.point;
}


// Reposition the path whenever the window is resized:
function onResize(event) {
    
	initializePath();
    flex();
}