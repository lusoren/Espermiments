var width, height, center;
var points = 3;
var smooth = true;

var mousePos = view.center / 2;
var pathHeight = mousePos.y;

var paths=[];
var pathCounter=0;

//var drawP = new Path({
//    strokeColor: 'white',
//    fillColor: 'white',
//    strokeWidth: 2,
//}); 

var moveCounter=0;
var addTracker=0;

console.log("started");
addPath();



function addPath() {

    var path = new Path({
        strokeColor: 'white',
        strokeWidth: 2,
    });
    
    curWidth = view.size.width;
    curHeight = view.size.height;
    
    var ritRand=Math.floor(Math.random()*3);
    var letRand=Math.floor(Math.random()*3);
    
    var pathObject = {
        path:path,
        width:curWidth,
        height:curHeight,
        right:ritRand,
        left:letRand
    };
    
    paths[pathCounter]=pathObject;
    initializePath(paths[pathCounter]);
    //drawP.add(pathObject.width,pathObject.height);
    //drawP.closed = true;
    pathCounter++;
}


function initializePath(pathObject) {
    
    var path= pathObject.path;
    
	center = view.center;
	width = view.size.width;
	height = view.size.height / 2;
    
	path.segments = [];

    path.add(view.bounds.topLeft);
    
	for (var i = 1; i < points; i++) {
		var point = new Point(pathObject.width / points * i, center.y);
		path.add(point);
	}
    
    path.add(pathObject.width,pathObject.height);
    
}

function flex(pathObject, count) {
    
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

function onResize(event) {
	moveCounter++
    if ((moveCounter-addTracker)>100) {
        console.log("added");
        addTracker=moveCounter;
        addPath();
    }
    
    for (var i = 0; i < pathCounter; i++) {
    
        initializePath(paths[i]);
        flex(paths[i],event.count);
    
    }
}