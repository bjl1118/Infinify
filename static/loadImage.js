$(document).ready(function(){

	console.log("loadImage function loaded!");
	var Jcanvas = $("#drawing");
	var drawingCanvas = $("#rectDrawing");
	CanvasState(drawingCanvas[0]);
	// window.CanvasState(drawingCanvas[0]);

	
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
					console.log("even this guy");
          			console.log(this.width);
          			console.log(this.height);
          			Jcanvas.width(this.width);
          			Jcanvas.height(this.height);
          			Jcanvas.attr('width', this.width);
          			Jcanvas.attr('height', this.height);
          			drawingCanvas.width(this.width);
					drawingCanvas.height(this.height);
          			drawingCanvas.attr('width', this.width);
					drawingCanvas.attr('height', this.height);
					var pos = Jcanvas.offset();
					drawingCanvas.offset(pos);

					var canvas = Jcanvas[0];
					var context = canvas.getContext('2d');
					context.drawImage(img, 0, 0);

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

		