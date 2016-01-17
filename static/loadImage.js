$(document).ready(function(){

	console.log("loadImage function loaded!");
	var Jcanvas = $("#drawing");
	// var canvas = Jcanvas[0];
	var drawingCanvas = $("#rectDrawing");
	// var context = canvas.getContext('2d');
	
	function readImage(){
		if ( this.files && this.files[0] ) {
				var FR= new FileReader();
				FR.onload = function(e) {
					var img = new Image();
					img.onload = function() {
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
	}
	$('#picture').on("change", readImage);



})

		