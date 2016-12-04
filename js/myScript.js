var width, height, center;
var points = 3;
var smooth = true;

var paths=[];
var pathCounter=0;
var moveCounter=0;

console.log("ss");

function addPath() {

    var path = new Path({
        strokeColor: 'white',
        strokeWidth: 2,
    });
    
    curWidth = view.size.width;
    var pathObject = {
        path:path,
        width:curWidth
    };

    console.log(pathObject.width);
    
    paths[pathCounter]=pathObject;
    initializePath(paths[pathCounter]);
    
    pathCounter++;
    
}


function initializePath(pathObject) {
    
    var path= pathObject.path;
    
	center = view.center;
	width = view.size.width;
	height = view.size.height / 2;
    
	path.segments = [];
    
    path.add(view.bounds.bottomLeft);
    
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
    
    path.add(width,height);
	
}

function flex(pathObject) {
    
    var path= pathObject.path;
	
    pathHeight += (center.y - mousePos.y - pathHeight) / 10;
    h = pathObject.width-view.size.width;
    
    
	for (var i = 1; i < points; i++) {
		var sinSeed = h + (i + i % 10) * 100;
		var sinHeight = Math.sin(sinSeed / 200) * height;
		var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
 
        path.segments[i].point.y = yPos;
	}
	if (smooth)
		path.smooth({ type: 'continuous' });
}

function onMouseDown(event) {
	addPath();
}


// Reposition the path whenever the window is resized:
function onResize(event) {
    
    movCounter++;
    if (moveCounter%2==0) {
        for (var i = 0; i < pathCounter; i++) {
	
        initializePath(paths[i]);
        flex(paths[i]);
    
    }
    }
    
    

}