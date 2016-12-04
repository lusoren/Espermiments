var width, height, center;
var points = 3;
var smooth = true;

var mousePos = view.center / 2;
var pathHeight = mousePos.y;

initWidth = view.size.width;

var paths=[];
var rand=[];
pathCounter=0;


for (var i=0; i<10;++i){
    rand[i]=(Math.random()*20)-40;
}

function addPath() {

    var path = new Path({
        strokeColor: 'white',
        strokeWidth: 5,

    });
    
    paths[pathCounter]=path;
    initializePath(paths[pathCounter]);
    
    pathCounter++;
    
}


function initializePath(path) {
	center = view.center;
	width = view.size.width;
	height = view.size.height / 2;
    
    for(var j=0;j<pathCounter;++j) {
        
        path[0].segments = [];
        
        for (var i = 1; i < points; i++) {
            var point = new Point(width / points * i, center.y);
            path.add(point);
        }
    
        if (Math.random()*2<1) {
            path.add(width,height);
        } else {
            path.add(view.bounds.bottomRight)
        }
    }	
}

function flex(path) {
	
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

function onMouseDown(event) {
	addPath();
}


// Reposition the path whenever the window is resized:
function onResize(event) {
    for (var i = 0; i < pathCounter; i++) {
	
        initializePath(paths[i]);
        flex(paths[i]);
    
    }
    

}