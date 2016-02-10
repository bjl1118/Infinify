//declare global jquery objects here
var js_editing = $("#editing");
var js_drawing = $("#drawing");
var js_imgContainer = $("#imgContainer");


//reads the image from the input and displays it as canvas 
function read_image(){
	console.log('readImage called');

	if ( this.files && this.files[0] ) {
		console.log("this guy written");
		var FR= new FileReader();
		FR.onload = function(e) {
			console.log("and this guy too");
			var img = new Image();
			img.onload = function() {
         // var currentCanvas = new CanvasState(drawingCanvas[0]);
          
        var js_editing = $("#editing");
        var editingWidth = js_editing.width();
        var editingHeight = js_editing.height();
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

        var canvaslist = [js_drawing, js_editing, js_imgContainer];

        for (var i = 0; i <  canvaslist.length; i++) {
          canvaslist[i].width(drawingWidth);
          canvaslist[i].height(drawingHeight);
          canvaslist[i].attr('width', drawingWidth);
          canvaslist[i].attr('height', drawingHeight);  
        }

        console.log("editing size is: " + editingWidth + ", " + editingHeight);
        console.log(drawingWidth);
        console.log(drawingHeight);
				console.log("drawing size is: " + drawingWidth + ", " + drawingHeight);

				var pos = js_imgContainer.offset();
				js_drawing.offset(pos);

				var canvas = js_imgContainer[0];
				var context = canvas.getContext('2d');
        console.log(drawingWidth, drawingHeight);
				context.drawImage(img, 0, 0, drawingWidth, drawingHeight);
        $("#transform").show();
        $("#download").show();
          // console.log(imageToBitArray(canvas));

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

//downloads the image after it has been transformed 
function save_image(){
	console.log("saved");
  var can = $(document).find("#drawing");
  var dataurl = can.get(0).toDataURL();
  var download = $("#download");
  download.show();
  //window.location.assign(dataurl);
  download.attr("href", dataurl);
}

//event handlers go here 
$("#download").click(save_image);
$('#picture').on("change", read_image);





