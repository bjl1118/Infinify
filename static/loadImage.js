$(document).ready(function(){
	console.log("loadImage function loaded!");
	var Jcanvas = $("#drawing");
	var drawingCanvas = $("#rectDrawing");
	// CanvasState(drawingCanvas[0]);
	// window.CanvasState(drawingCanvas[0]);
  var that = this;

	
	function readImage(){

		//console.log(window);
		//console.log(window.CanvasState);
		console.log('readImage called');

		if ( this.files && this.files[0] ) {
			console.log("this guy written");
			var FR= new FileReader();
			FR.onload = function(e) {
				console.log("and this guy too");
				var img = new Image();
				img.onload = function() {
          var currentCanvas = new CanvasState(drawingCanvas[0]);
          setInterval(function(){
            // console.log(currentCanvas);
            // console.log(currentCanvas.draw);
            currentCanvas.draw();

          }, 50);
          var editingDiv = $("#editing");
          var editingWidth = editingDiv.width();
          var editingHeight = editingDiv.height();
          var widthRatio = this.width / editingWidth;
          var heightRatio = this.height / editingHeight;
          var drawingWidth, drawingHeight;
          if (widthRatio > heightRatio) {
            // var ratio = widthRatio / heightRatio;
            drawingWidth = editingWidth;
            drawingHeight = parseInt(this.height * editingWidth / this.width);
          }
          else {
            drawingHeight = editingHeight;
            drawingWidth = parseInt(this.width * editingHeight / this.height)
          }

          console.log(editingWidth);
          console.log(editingHeight);
          console.log(drawingWidth);
          console.log(drawingHeight);
					console.log("even this guy");
    			Jcanvas.width(drawingWidth);
    			Jcanvas.height(drawingHeight);
    			Jcanvas.attr('width', drawingWidth);
    			Jcanvas.attr('height', drawingHeight);
    			drawingCanvas.width(drawingWidth);
					drawingCanvas.height(drawingHeight);
          drawingCanvas.attr('width', drawingWidth);
					drawingCanvas.attr('height', drawingHeight);
          editingDiv.width(drawingWidth);
          editingDiv.height(drawingHeight);
          editingDiv.attr('width', drawingWidth);
          editingDiv.attr('height', drawingHeight);
					var pos = Jcanvas.offset();
					drawingCanvas.offset(pos);

					var canvas = Jcanvas[0];
					var context = canvas.getContext('2d');
          console.log(drawingWidth, drawingHeight);
					context.drawImage(img, 0, 0, drawingWidth, drawingHeight);

        };
        		img.src = e.target.result;
        // console.log(img);
			}
      FR.readAsDataURL( this.files[0] );
		}
		else{
			console.log("not so fast");
		}

	}
	$('#picture').on("change", readImage);



})

		