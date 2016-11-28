var width, height, center;
var points = 1;
var smooth = true;
var path = new Path({
    fillColor: 'black'
});
var mousePos = view.center / 2;
var pathHeight = mousePos.y;
initializePath();


function addPoint () {
    points++;
    initializePath();   
}

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
    path.fillColor('red');
}

function onFrame(event) {
    pathHeight += (center.y - mousePos.y - pathHeight) / 10;
    for (var i = 1; i < points; i++) {
        var sinSeed = event.count + (i + i % 10) * 100;
        var sinHeight = Math.sin(sinSeed / 200) * pathHeight;
        var yPos = Math.sin(sinSeed / 100) * sinHeight + height;
        path.segments[i].point.y = yPos;
    }
    if (smooth)
        path.smooth({ type: 'continuous' });
}

function onMouseMove(event) {
    mousePos = event.point;
}

function onMouseDown(event) {
    addPoint();
    //smooth = !smooth;
    //if (!smooth) {
    //    // If smooth has been turned off, we need to reset
    //    // the handles of the path:
    //    for (var i = 0, l = path.segments.length; i < l; i++) {
    //        var segment = path.segments[i];
    //        segment.handleIn = segment.handleOut = null;
    //    }
    //}
}

// Reposition the path whenever the window is resized:
function onResize(event) {
    initializePath();
}