(function(main){
	main(window, document, window.jQuery);
}

(function(window, document, $){

	var pointArray = [];

	//jQuery Objects
	var editingDiv = $("#editing");
	var infinifyEdit = $("#infinify-edit");
	var uploadIconContainer = $("upload-icon-container");
	var previewImgContainer = $("#preview-img-container");
	var imgContainer = $("#img-container");
	var drawing = $("#drawing");
	var previewCanvas = $("#previewCanvas");
	var downloadBtn = $("#download-btn");
	var uploadBtn = $("#upload-btn");
	var transformBtn = $("#transform-btn");
	var picture = $("#picture");
	var resetBtn = $("#reset-btn");
	var imgLink = $("#img-link");
	var draggableDiv = $("#draggable2");
	var previewIconContainer = $("#preview-icon-container");
	var uploadIconContainer = $("#upload-icon-container");
	var columnMain = $(".column-main");
	var imgLink = $("#img-link");

	//flags
	var hasImage = false;
	var divPositioned = false;
	var hasTransformedImage = false;
	
	//pass in canvas, return canvas context
	function getCanvasContext(canvas){
		console.log("get canvas context called");
		if (canvas instanceof jQuery && canvas.is("canvas")){
			return canvas[0].getContext('2d');
		}
  	console.log("Error, given element is not a canvas");
	}

	//readImage and draw to canvas
	function readImg(){
		if ( this.files && this.files[0] ) {
			var FR= new FileReader();
			FR.onload = function(e) {
				var img = new Image();
				img.onload = function(){
					uploadIconContainer.hide();
					infinifyEdit.show();
					previewImgContainer.show();

					var editingWidth = editingDiv.width();
        	var editingHeight = editingDiv.height();
        	var widthRatio = this.width / editingWidth;
        	var heightRatio = this.height / editingHeight;
        	var drawingWidth, drawingHeight;

        	if (widthRatio > heightRatio) {
          	drawingWidth = editingWidth;
          	drawingHeight = parseInt(this.height * editingWidth / this.width);
          	infinifyEdit.css("margin-top", "auto");
          	infinifyEdit.css("margin-bottom", "auto");
        	}
        	else {
          	drawingHeight = editingHeight;
          	drawingWidth = parseInt(this.width * editingHeight / this.height)

          	infinifyEdit.css("margin-left", "auto");
          	infinifyEdit.css("margin-right", "auto");
        	}

        	var elementsList = [imgContainer, drawing, infinifyEdit, previewImgContainer, previewCanvas];

        	for(var i = 0; i < elementsList.length; i++){
        		elementsList[i].width(drawingWidth - 5);
          	elementsList[i].height(drawingHeight - 5);
          	elementsList[i].attr('width', drawingWidth);
          	elementsList[i].attr('height', drawingHeight);
        	}

        	var pos = imgContainer.offset();
        	drawing.offset(pos);

        	var context = getCanvasContext(imgContainer);
        	console.log(drawingWidth, drawingHeight);
					context.drawImage(img, 0, 0, drawingWidth, drawingHeight);	
				};

				img.src = e.target.result;
      	hasImage = true;
        // console.log(img);
 			}
      FR.readAsDataURL( this.files[0] );
		}
		else{
			console.log("not so fast");
		}
	}


	//download image after its been edited
	function downloadImg(){
		console.log("download img called");

		if (hasTransformedImage){
			var dataurl = previewCanvas.get(0).toDataURL();
	  	imgLink.attr("href", dataurl);
	  	imgLink[0].click();
  	}
	}

	//reset editing div to initial state
	function resetImg(){
		console.log("reset img called");
		pointArray = [];
	  imgContext = getCanvasContext(imgContainer);
	  drawContext= getCanvasContext(drawing);
	  prevCanCtx = getCanvasContext(previewCanvas);
	  editWidth = editingDiv.width();
	  editHeight = editingDiv.height();
	  draggableDiv.hide();
	  drawContext.clearRect(0, 0, editWidth, editHeight);
	  imgContext.clearRect(0,0, editWidth, editHeight);
	  prevCanCtx.clearRect(0, 0, editWidth, editHeight);
	  picture.val('');
	  hasImage = false;
	  hasTransformedImage = false;
	  infinifyEdit.hide();
	  previewImgContainer.hide();
	  previewIconContainer.show();
	  uploadIconContainer.show();
	} 

	//get height width ratio of quadrilateral 
	function getHeightWidthRatio(){
		console.log("getHeightWidthRatio called");
		var totalWidth = Math.abs(pointArray[0][0] - pointArray[2][0]);
	  var h1 = Math.abs(pointArray[1][1]-pointArray[0][1]);
	  var h2 = Math.abs(pointArray[3][1]-pointArray[2][1]);
	  //var maxHeight = Math.max(h1,h2);
	  var minHeight = Math.min(h1,h2);
	  //var slope = ((maxHeight - minHeight) / totalWidth)
	  //var diff = maxHeight - minHeight;
	  //var cosine = (totalWidth / Math.sqrt((diff * diff) + (totalWidth * totalWidth)))
	  return minHeight / totalWidth
	}

	function drawVerticalGrid(){
		var totalWidth = Math.abs(pointArray[0][0] - pointArray[2][0]);
	  var h1 = Math.abs(pointArray[1][1]-pointArray[0][1]);
	  var h2 = Math.abs(pointArray[3][1]-pointArray[2][1]);
	  var w1 = pointArray[0][0]
	  // First, I'll assume that h2 is greater than h1.
	  // also, assume that the first two points are on the left of the second.
	  if (h2 == h1) {
	    console.log("can't do equal yet");
	    alert("can't do equal yet!");
	    return;
	  }
	  var constant = (totalWidth / (h2 - h1)) * (Math.log(1 + ((h2 - h1)/h1)));
	  // console.log('constant: ' + constant);
	  for (var i = 0; i <= 10; i++) {
	    var x = ((Math.exp(((h2 - h1)/totalWidth) * i * constant / 10) - 1) * h1 * totalWidth / (h2 - h1));
	    // When i is 10, we have We have x = totalWidth. When i is 0, x=0. Good.
	    var bottom = pointArray[1][1] + (pointArray[2][1] - pointArray[1][1]) * (x / totalWidth);
	    var top = pointArray[0][1] + (pointArray[3][1] - pointArray[0][1]) * (x / totalWidth);
	    var ctx = getCanvasContext(drawing);
	    ctx.beginPath();
	    ctx.moveTo(x+w1,bottom);
	    ctx.lineTo(x+w1,top);
	    ctx.stroke();
		}
	}

	function drawCropRect(){
		console.log("drawCropRect called");
		if (hasImage && pointArray.length == 4){
		  draggableDiv.show();
		  if (!divPositioned) {
		    var drawing_top = drawing.offset().top;
		    var drawing_left = drawing.offset().left;
		    var drawing_pos = {top : drawing_top, left : drawing_left};
		    draggableDiv.offset(drawing_pos);
		    divPositioned = true;
		  }
		  draggableDiv.width(100);
		  draggableDiv.height(100 * getHeightWidthRatio())
		  //make the div draggable 
		  draggableDiv.draggable({
		    containment : drawing
		  });
		  //make the div resizable 
		  draggableDiv.resizable({
		    containment : drawing,
		    aspectRatio : true,
		    minHeight   : 30,
		    minWidth    : 30
		  });
		}
	}

	function drawGrid(){
		console.log("drawGrid");
		if(hasImage && pointArray.length == 4){
			var first = pointArray[0];
		  var second = pointArray[1];
		  var third = pointArray[2];
		  var fourth = pointArray[3];
		  
		  for (var i = 0; i <= 10; i++) {
		    var p1 = [first[0] + i * (second[0] - first[0])/10,first[1] + i * (second[1] - first[1])/10];
		    var p2 = [fourth[0] + i * (third[0] - fourth[0])/10,fourth[1] + i * (third[1] - fourth[1])/10];
		    var ctx = getCanvasContext(drawing);
		    ctx.beginPath();
		    ctx.moveTo(p1[0],p1[1]);
		    ctx.lineTo(p2[0],p2[1]);
		    ctx.stroke();
		  }
		}
	}

	function drawCurrentPoint(e){
		console.log("drawCurrentPoint called");
		if(hasImage && pointArray.length != 0){
			var offset = drawing.offset();
		  var currCoords = [e.pageX - offset.left, e.pageY - offset.top]
		  var ctx = getCanvasContext(drawing);

		  for (var i = 0; i < pointArray.length; i++){
		    var coords = pointArray[i];
		    ctx.fillStyle="white";
		    ctx.fillRect(coords[0]-3,coords[1]-3,6,6);
		    ctx.fillStyle="black";
		    ctx.fillRect(coords[0]-2,coords[1]-2,4,4);
		    ctx.strokeStyle="white";
		  }
		  if (pointArray.length == 1) {
		    ctx.beginPath();
		    ctx.moveTo(pointArray[0][0],pointArray[0][1]);
		    ctx.lineTo(pointArray[0][0],currCoords[1]);
		    ctx.stroke();
		    return;
		  }
		  if (pointArray.length == 2) {
		    ctx.beginPath();
		    ctx.moveTo(pointArray[0][0],pointArray[0][1]);
		    ctx.lineTo(pointArray[1][0],pointArray[1][1]);
		    ctx.stroke();
		    return;
		  }
		  if (pointArray.length == 3) {
		    ctx.beginPath();
		    ctx.moveTo(pointArray[0][0],pointArray[0][1]);
		    ctx.lineTo(pointArray[1][0],pointArray[1][1]);
		    ctx.stroke();
		    ctx.beginPath();
		    ctx.moveTo(pointArray[2][0],pointArray[2][1]);
		    ctx.lineTo(pointArray[2][0],currCoords[1]);
		    ctx.stroke();
		    return;
		  }
		  if (pointArray.length == 4) {
		    ctx.fillStyle="rgba(0, 0, 0, 0.5)"
		    ctx.beginPath();
		    ctx.moveTo(pointArray[0][0],pointArray[0][1]);
		    ctx.lineTo(pointArray[1][0],pointArray[1][1]);
		    ctx.lineTo(pointArray[2][0],pointArray[2][1]);
		    ctx.lineTo(pointArray[3][0],pointArray[3][1]);
		    ctx.closePath();
		    ctx.stroke();
		    ctx.fill();
		    drawGrid();
		    drawVerticalGrid();
		    drawCropRect();
		    $("#redraw").show();
		    $("#continue").show();
		  }
		}
	}

	function getFracX(fracX){
		console.log("getFracX called");
		var totalWidth = Math.abs(pointArray[0][0] - pointArray[2][0]);
	  var h1 = Math.abs(pointArray[1][1]-pointArray[0][1]);
	  var h2 = Math.abs(pointArray[3][1]-pointArray[2][1]);
	  var w1 = pointArray[0][0];

	  if (h2 == h1) {
	    console.log("can't do equal yet");
	    alert("can't do equal yet!");
	    return;
	  }

	  var constant = (totalWidth / (h2 - h1)) * (Math.log(1 + ((h2 - h1)/h1)));
	  var x = ((Math.exp(((h2 - h1)/totalWidth) * fracX * constant) - 1) * h1 / (h2 - h1));
	  console.log('constant: ' + constant);
	  return x;
	}

	function getTopBottom(fracX){
		console.log("getTopBottom called");
		var bottom = pointArray[1][1] + (pointArray[2][1] - pointArray[1][1]) * (fracX);
	  var top = pointArray[0][1] + (pointArray[3][1] - pointArray[0][1]) * (fracX);
	  return [top, bottom];

	}

	function drawToCanvas(rectLeft, rectTop, rectWidth, rectHeight, canvas){
		console.log("draw to canvas called");
		canCtx = getCanvasContext(previewCanvas);
		var totalWidth = Math.abs(pointArray[0][0] - pointArray[2][0]);
	  var leftX = pointArray[0][0];
	  for (var i = 0; i < totalWidth; i++) {
	    var fracX = i / totalWidth;
	    var quadFracX = getFracX(fracX);
	    var tb = getTopBottom(quadFracX);
	    
	    var sx = parseInt(rectLeft + (rectWidth * fracX));
	    var sy = rectTop;
	    var sw = 2;
	    var sh = rectHeight;
	    var dx = parseInt(leftX + (totalWidth * quadFracX));
	    var dy = tb[0];
	    var dw = 2;
	    var dh = tb[1]-tb[0]
	    console.log(sx, sy, sw, sh, dx, dy, dw, dh);
	    canCtx.drawImage(canvas, sx, sy, sw, sh, dx, dy, dw, dh);
	  }
	}

	//event handlers 
	downloadBtn.click(downloadImg);

	picture.on("change", readImg);

	resetBtn.click(resetImg);

	uploadBtn.click(function(){
  	resetImg();
  	picture.click();
	});

	$(".panel-link").click(function(){
		var collapseDown = $(this).find(".glyphicon-collapse-down");
		var collapseUp = $(this).find(".glyphicon-collapse-up");
		if (collapseDown.is(":visible")){
			collapseDown.hide();
			collapseUp.show();
		}
		else{
			collapseUp.hide();
			collapseDown.show();
		}
	});

	transformBtn.click(function(e){
		console.log("transformBtn clicked");
		if (pointArray.length == 4){
			ctx = getCanvasContext(drawing);
			canCtx = getCanvasContext(previewCanvas);
		  var before = new Date();
		  //var ctx3 = getCanvasContext(previewCanvas);
		  //make new img and set src to the src image in the editing canvas

		  if (previewImgContainer.width() > previewImgContainer.height()) {
		    previewImgContainer.css("margin-top", "auto");
		    previewImgContainer.css("margin-bottom", "auto");
		  }
		  else {
		    previewImgContainer.css("margin-left", "auto");
		    previewImgContainer.css("margin-right", "auto");
		  }

		  canCtx.clearRect(0, 0, previewCanvas.width(), previewCanvas.height());
		  canCtx.drawImage(imgContainer[0], 0 ,0);

		  //ctx.clearRect(0,0,drawing.width(), drawing.height());
		  ctx.drawImage(imgContainer[0], 0,0);
		  var after = new Date();
		  console.log("time it takes to draw single whole thing is " + (after - before));
		  console.log(drawing.position);
		  var left = draggableDiv.position().left;
		  var top = draggableDiv.position().top;
		  var width = draggableDiv.width();
		  var height = draggableDiv.height();
		  console.log(" parameters are "+ left + ", " + top + ", " + width + ", " + height);
		  draggableDiv.hide();
		  var now = new Date();
		  for (var i = 0; i < 5; i++){
		    drawToCanvas(left, top, width, height, previewCanvas[0]);
		  }
		  previewIconContainer.hide();
		  pointArray = [];
		  hasTransformedImage = true;

		  var later = new Date();
		  console.log("Time it takes to draw five times is: " + (later - now));

	}
	else{
		console.log("not there yet");
		return;
	}
	});

	columnMain.hover(function(){

    var thisIcnCont = $(this).find(".icon-container");
    $(this).css("border", "2px dashed #CE7600");
    if(thisIcnCont.is(":visible")){
    	thisIcnCont.find($("img")).css("opacity", "1");
    	thisIcnCont.find($("h3")).css("color", "#B4BABF");
    }
	}, function(){
			$(this).css("border", "2px dashed #162837");
    	var thisIcnCont = $(this).find(".icon-container");
    	$(this).css("border", "2px dashed #162837");
    	if(thisIcnCont.is(":visible")){
    		thisIcnCont.find($("img")).css("opacity", "0.4");
    		thisIcnCont.find($("h3")).css("color", "#162837");
    	}

	});

	drawing.click(function(e){
		if (pointArray.length == 4) {
    	console.log('already there');
    	return;
  	}

	  var offset = drawing.offset();
	  var coords = [e.pageX - offset.left, e.pageY - offset.top]

	  if (pointArray.length == 0) {
	    pointArray.push([coords[0],coords[1]]);
	    drawCurrentPoint(e);
	    return;  
	  }
	  if (pointArray.length == 1) {
	    var first = pointArray[0];
	    coords[0] = first[0];
	    if (first[1] > coords[1]) {
	      pointArray = [coords, first];
	      drawCurrentPoint(e);
	      return;
	    }
	    pointArray = [first, coords];
	    drawCurrentPoint(e);
	    return;
	  }
	  if (pointArray.length == 2) {
	    pointArray.push([coords[0],coords[1]]);
	    drawCurrentPoint(e);
	    return;  
	  }
	  if (pointArray.length == 3) {
	    var third = pointArray[2];
	    coords[0] = third[0];
	    if (third[1] > coords[1]) {
	      pointArray = [pointArray[0],pointArray[1],third, coords];
	    }
	    else{
	      pointArray = [pointArray[0],pointArray[1],coords, third];
	    }
	    if (pointArray[0][0] > pointArray[3][0]) {
	      pointArray = [pointArray[3],pointArray[2],pointArray[1],pointArray[0]]
	    }
	    drawCurrentPoint(e);
	    return;
	  }
	});

}));
