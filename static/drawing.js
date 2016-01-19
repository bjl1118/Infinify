function Rect(state, x, y, w, h, fill){
	//rectanglge contstructor
	this.state = state;
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 1;
	this.h = h || 1;
}

function CanvasState(canvas){
	
	//simple constructor
	console.log('canvasstate constructor called');
	this.canvas = canvas;
	this.width = canvas.width;
	this.height = canvas.height;
	this.ctx = canvas.getContext('2d');

	//flags for keeping track of rectangle state
	this.dragging = false;
	this.resizing = false;
	this.expectResize = -1;
	this.dragoffx = 0;
	this.dragoffy = 0;

	this.selectionHandles = [];
	for (var i = 0; i < 8; i++) {
		this.selectionHandles.push(new Rect(this));
	}

	canvas.addEventListener('selectstart', function(e){e.preventDefault(); return false;}, false);

	canvas.addEventListener('mousedown', function(e){
		console.log("clicked down");
		var mx = e.clientX;
		var my = e.clientY;
		this.dragging = true;
		console.log(mx, my);

	}, false);

	canvas.addEventListener('mousemove', function(e){
		if (this.dragging){
			console.log("dragging");
		}
	}, true)

	canvas.addEventListener('mouseup', function(e){
		this.dragging = false;
		console.log("clicked up");
	}, true)
	

}









