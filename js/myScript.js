var width, height, center;
var points = 3;
var smooth = true;

var mousePos = view.center / 2;
var pathHeight = mousePos.y;

var paths=[];
var pathCounter=0;

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
    
    var ritRand=Math.floor(Math.random()*3);
    var letRand=Math.floor(Math.random()*3);
    
    var pathObject = {
        path:path,
        width:curWidth,
        right:ritRand,
        left:letRand
    };

    console.log(pathObject.width);
    console.log(pathObject.left);
    console.log(pathObject.right);
    
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
    
    if (pathObject.left==0) {
        path.add(0,0);
        
    } else if (pathObject.left==1) {
        path.add(0,height);
        
    } else {
        path.add(view.bounds.topLeft);
    }
    
	for (var i = 1; i < points; i++) {
		var point = new Point(width / points * i, center.y);
		path.add(point);
	}
    
    if (pathObject.right==0) {
        path.add(view.bounds.bottomRight);
    } else if (pathObject.right==1) {
        path.add(width,height);
    } else {
        path.add(view.bounds.topRight);
    }
	
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

//function onMouseDown(event) {
//	addPath();
//}


// Reposition the path whenever the window is resized:
function onResize(event) {
    moveCounter++

    if ((moveCounter-addTracker)>100) {
        console.log("added");
        addTracker=moveCounter;
        addPath();
    }
    
    for (var i = 0; i < pathCounter; i++) {
	
        initializePath(paths[i]);
        flex(paths[i]);
    
    }
    

}