// function Rect(state, x, y, w, h, fill){
// 	//rectanglge contstructor
// 	this.state = state;
// 	this.x = x || 0;
// 	this.y = y || 0;
// 	this.w = w || 1;
// 	this.h = h || 1;
// }

function CanvasState(canvas){

	//simple constructor
	console.log('canvasstate constructor called');
	this.canvas = canvas;
	this.width = canvas.width;
	console.log("canvas width: " + canvas.width);
	this.height = canvas.height;
	console.log("canvas.height: " + canvas.height);
	this.ctx = canvas.getContext('2d');

	//flags for keeping track of rectangle state
	this.dragging = false;
	this.resizing = false;
	this.expectResize = -1;
	this.resizeRight = false;
	this.resizeLeft = false;
	this.resizeTop = false;
	this.resizeBottom = false;
	// this.dragoffx = 0;
	// this.dragoffy = 0;
	this.dragClickX = 0;
	this.dragClickY = 0;
	this.currWidth = 0;
	this.currHeight = 0;

	this.ctx.fillStyle = "#FFFF00";
	this.ctx.strokeStyle = "#000000";

	// this.selectionHandles = [];

	// this.rect = null;
	this.upperLeft = [25,25];
	this.upperLeftBeforeDrag = [25,25];
	this.bottomRightBeforeDrag = [125,125];
	this.bottomRight = [125,125];
	this.valid = false;

	// for (var i = 0; i < 8; i++) {
	// 	this.selectionHandles.push(new Rect(this));
	// }
	var that = this;

	canvas.addEventListener('selectstart', function(e){e.preventDefault(); return false;}, false);

	canvas.addEventListener('mousedown', function(e){

		that.clickTop(e);

		if (that.rectContains(e)){
			var xy = that.getMouse(e);
			console.log("click in box!");
			that.dragging = true;
			that.dragClickX = xy[0];
			that.dragClickY = xy[1];
			that.upperLeftBeforeDrag = [that.upperLeft[0],that.upperLeft[1]];
			that.bottomRightBeforeDrag = [that.bottomRight[0],that.bottomRight[1]];
			return;
		}

	}, false);
	
	

	canvas.addEventListener('mousemove', function(e){
		if (that.dragging){
			console.log("dragging");
			var currMouse = that.getMouse(e);
			var oldMouse = [that.dragClickX, that.dragClickY];
			var diff = [currMouse[0]-oldMouse[0], currMouse[1]-oldMouse[1]]
			var newUL = [that.upperLeftBeforeDrag[0]+diff[0], that.upperLeftBeforeDrag[1]+diff[1]];
			var newBR = [that.bottomRightBeforeDrag[0] + diff[0], that.bottomRightBeforeDrag[1] + diff[1]];
			that.upperLeft = newUL;
			that.bottomRight = newBR;
			that.valid = false;
		}
	}, true)

	canvas.addEventListener('mouseup', function(e){
		that.dragging = false;
		console.log("clicked up");
	}, true)

	// setInterval(that.draw, 1000);
	console.log(this);

}

CanvasState.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  console.log(this.width);
  console.log(this.height);
  console.log('cleared');
}



CanvasState.prototype.getMouse = function(e) {
	var mx = e.pageX;
	var my = e.pageY;
	var canvasPos = $(this.canvas).offset();
	var relx = mx - canvasPos.left;
	var rely = my - canvasPos.top;
	return [relx, rely]
}

CanvasState.prototype.clickTop = function(e) {
	var xy = this.getMouse(e);
	console.log("this diff: " + (Math.abs(this.upperLeft[1]-xy[1])));
	if (Math.abs(this.upperLeft[1]-xy[1]) < 20){
		console.log("clicked top");
	}
}

CanvasState.prototype.rectContains = function(e) {
	var mouseCoords = this.getMouse(e)
	if (mouseCoords[0] > this.upperLeft[0] && mouseCoords[0] < this.bottomRight[0] &&
			mouseCoords[1] > this.upperLeft[1] && mouseCoords[1] < this.bottomRight[1]
		 ){
		console.log("rectContains");
		return true;
	}
	console.log('out of scope');
	return false;
}




CanvasState.prototype.draw = function() {
	// console.log(this.canvasState);
	if (!this.valid){
		console.log('drawing');
		var canvas = this.canvas;
		// console.log(canvas);
		var ctx = this.ctx;
		this.clear();
		// console.log(this.upperLeft[0],
		// 						this.upperLeft[1], 
		// 						this.bottomRight[0] - this.upperLeft[0],
		// 						this.bottomRight[1] - this.upperLeft[1]);
		ctx.fillRect(this.upperLeft[0],
								this.upperLeft[1], 
								this.bottomRight[0] - this.upperLeft[0],
								this.bottomRight[1] - this.upperLeft[1]);
		$()

		this.valid = true;


	}
};


// function CanvasState(canvas){

// 	//simple constructor
// 	console.log('canvasstate constructor called');
// 	this.canvas = canvas;
// 	this.width = canvas.width;
// 	console.log("canvas width: " + canvas.width);
// 	this.height = canvas.height;
// 	console.log("canvas.height: " + canvas.height);
// 	this.ctx = canvas.getContext('2d');

// 	//flags for keeping track of rectangle state
// 	this.dragging = false;
// 	this.resizing = false;
// 	this.expectResize = -1;
// 	// this.dragoffx = 0;
// 	// this.dragoffy = 0;
// 	this.dragClickX = 0;
// 	this.dragClickY = 0;
// 	this.currWidth = 0;
// 	this.currHeight = 0;

// 	this.ctx.fillStyle = "#CCCCCC";
// 	this.ctx.strokeStyle = "#FFFFFF";

// 	this.selectionHandles = [];

// 	this.rect = null;
// 	this.upperLeft = [25,25];
// 	this.bottomRight = [125,125];
// 	this.valid = true;

// 	// for (var i = 0; i < 8; i++) {
// 	// 	this.selectionHandles.push(new Rect(this));
// 	// }
// 	var that = this;

// 	canvas.addEventListener('selectstart', function(e){e.preventDefault(); return false;}, false);

// 	canvas.addEventListener('mousedown', function(e){

// 		if (that.rectContains(e)){
// 			console.log("click in box!");
// 			that.dragging = true;
// 			return;
// 		}

// 		canvasPos = $(canvas).offset();
// 		// console.log(canvasPos);
// 		console.log("clicked down");
// 		var mx = e.pageX;
// 		var my = e.pageY;
// 		var relx = mx - canvasPos.left;
// 		var rely = my - canvasPos.top;
// 		that.dragging = true;
// 		console.log(relx, rely);
// 		that.bottomRight = [relx, rely];
// 		// console.log(that.bottomRight);
// 		// console.log(that);
// 		that.valid = false;
// 		console.log("that.valid: " + that.valid);
		
// 	}, false);
	
// 	canvas.addEventListener('mousemove', function(e){
// 		if (that.dragging){
// 			console.log("dragging");
// 		}
// 	}, true)

// 	canvas.addEventListener('mouseup', function(e){
// 		that.dragging = false;
// 		console.log("clicked up");
// 	}, true)

// 	// setInterval(that.draw, 1000);
// 	console.log(this);

// }

// CanvasState.prototype.clear = function() {
//   this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   console.log(this.width);
//   console.log(this.height);
//   console.log('cleared');
// }

// CanvasState.prototype.getMouse = function(e) {
// 	var mx = e.pageX;
// 	var my = e.pageY;
// 	var canvasPos = $(this.canvas).offset();
// 	var relx = mx - canvasPos.left;
// 	var rely = my - canvasPos.top;
// 	return [relx, rely]

// }

// CanvasState.prototype.rectContains = function(e) {
// 	var mouseCoords = this.getMouse(e)
// 	if (mouseCoords[0] > this.upperLeft[0] && mouseCoords[0] < this.bottomRight[0] &&
// 			mouseCoords[1] > this.upperLeft[1] && mouseCoords[1] < this.bottomRight[1]
// 		 ){
// 		console.log("rectContains");
// 		return true;
// 	}
// 	console.log('out of scope');
// 	return false;
// }




// CanvasState.prototype.draw = function() {
// 	// console.log(this.canvasState);
// 	if (!this.valid){
// 		console.log('drawing');
// 		var canvas = this.canvas;
// 		// console.log(canvas);
// 		var ctx = this.ctx;
// 		this.clear();
// 		// console.log(this.upperLeft[0],
// 		// 						this.upperLeft[1], 
// 		// 						this.bottomRight[0] - this.upperLeft[0],
// 		// 						this.bottomRight[1] - this.upperLeft[1]);
// 		ctx.fillRect(this.upperLeft[0],
// 								this.upperLeft[1], 
// 								this.bottomRight[0] - this.upperLeft[0],
// 								this.bottomRight[1] - this.upperLeft[1]);

// 		this.valid = true;

// 	}
// };







