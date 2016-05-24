(function(main){
	main(window, document, window.jQuery);
}

(function(window, document, $){

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
	var picture = $("#picture");
	var resetBtn = $("#reset-btn");


	//flags

	
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
	}

	//reset editing div to initial state
	function resetImg(){
		console.log("reset img called");
	} 

	//get height width ratio of quadrilateral 
	function getHeighWidthRatio(){
		console.log("getHeighWidthRatio called");
	}

	function drawCropRect(){
		console.log("drawCropRect called");
	}

	function drawGrid(){
		console.log("drawGrid");
	}

	function drawCurrentPoint(e){
		console.log("drawCurrentPoint called");
	}

	function getFracX(fracX){
		console.log("getFracX called");
	}

	function getTopBottom(fracX){
		console.log("getTopBottom called")
	}

	function drawToCanvas(rectLeft, rectTop, rectWidth, rectHeight, canvas){
		console.log("draw to canvas called");
	}

	downloadBtn.click(downloadImg);
	picture.on("change", readImg);
	resetBtn.click(resetImg);
	uploadBtn.click(function(){
  	resetImg();
  	picture.click();
	});


}));