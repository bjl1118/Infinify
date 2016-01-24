// $(document).ready(

  window.onload =

  function(){
	console.log("loadImage function loaded!");
	var Jcanvas = $("#drawing");
	var drawingCanvas = $("#rectDrawing");
	
	// CanvasState(drawingCanvas[0]);
	// window.CanvasState(drawingCanvas[0]);
  var that = this;

  var dragger = $("#draggable");

  // var stopFunctionDrag = function(e, ui){

  // }

  var stopFunction = function(e, ui){
    console.log(ui);
    var draggable = $("#draggable");
    var editingDiv = $('#editing');
    var canvas = document.getElementById('drawing')
    var ctx = canvas.getContext('2d');
    console.log(editingDiv.offset());
    console.log(draggable.offset());

    // console.log(ui.position);
    // console.log(ui.offset);
    // console.log(ui);
    // console.log(draggable.width());
    // console.log(draggable.height());

    var editingOff = editingDiv.offset()
    var editingL = editingOff.left;
    var editingH = editingOff.top;
    var relL = ui.position.left - editingL;
    var relH = ui.position.top - editingH;
    console.log(relL, relH);
    
    var drawW = draggable.width();
    var drawH = draggable.height();
    ctx.drawImage(canvas, relL, relH, drawW, drawH);



  }
  
  // console.log("made resizable");
  dragger.draggable({containment:'parent'});
  dragger.resizable({containment : 'parent', minWidth:100, minHeight:100});
  console.log("made draggable");


	
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
          // var currentCanvas = new CanvasState(drawingCanvas[0]);
          setInterval(function(){
            // console.log(currentCanvas);
            // console.log(currentCanvas.draw);
            // currentCanvas.draw();
          }, 25);
          
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

          var willResize = $("#willResize");

          var canvaslist = [Jcanvas, drawingCanvas, editingDiv, willResize];

          for (var i = 0; i <  canvaslist.length; i++) {
            canvaslist[i].width(drawingWidth);
            canvaslist[i].height(drawingHeight);
            canvaslist[i].attr('width', drawingWidth);
            canvaslist[i].attr('height', drawingHeight);  
          }

          console.log(editingWidth);
          console.log(editingHeight);
          console.log(drawingWidth);
          console.log(drawingHeight);
					console.log("even this guy");

					var pos = Jcanvas.offset();
					drawingCanvas.offset(pos);

          var dragger = $("#draggable");
          dragger.show();

          dragger.offset(pos);
          willResize.offset(pos);
          willResize.show();
          // dragger.resizable();
          console.log("made resizable");
          // dragger.draggable();
          console.log("made draggable");

					var canvas = Jcanvas[0];
					var context = canvas.getContext('2d');
          console.log(drawingWidth, drawingHeight);
					context.drawImage(img, 0, 0, drawingWidth, drawingHeight);
          $("#transform").show();

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

  function transform(){
    console.log('transformed');
    var dragger = $("#draggable");
    var editingDiv = $("#editing");
    var canvas = document.getElementById('drawing');
    var ctx = canvas.getContext('2d');
    var editingOff = editingDiv.offset();
    var draggableOff = dragger.offset();
    var relL = draggableOff.left - editingOff.left;
    var relH = draggableOff.top - editingOff.top;
    var drawW = dragger.width();
    var drawH = dragger.height();
    console.log(relL, relH, drawW, drawH);

    for (var i =0; i < 10; i++){
      ctx.drawImage(canvas, relL, relH, drawW, drawH);
    }
    dragger.hide();
    $("#transform").hide();
  }

  $("#transform").click(transform);

}
// )

		