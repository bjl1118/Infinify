//declare global jquery objects here
var js_editing = $("#editing");
var js_drawing = $("#drawing");
var js_imgContainer = $("#imgContainer");
var js_transform = $("#transform");
var js_reset = $("#reset");
var js_download = $("#download");
var previewCanvas = $("#previewCanvas");
var previewDrawing = $("#previewDrawing");

//reads the image from the input and displays it as canvas 
/*function disableButtons(){
  $("#picture").prop('disabled', false);
  js_transform.prop('disabled', true);
  js_download.prop('disabled', true);
  js_reset.prop('disabled', true);
}

function enableButtons(){
  $("#picture").prop('disabled', true);
  js_transform.prop('disabled', false);
  js_reset.prop('disabled', false);
  js_download.prop('disabled', false);
}*/

function getCanvasContext(canvas){
  if (canvas instanceof jQuery && canvas.is("canvas")){
    return canvas[0].getContext('2d');
  }
  console.log("Error, given element is not a canvas");
}

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

        var elementslist = [js_imgContainer, js_drawing, previewCanvas, previewDrawing];

        for (var i = 0; i <  elementslist.length; i++) {
          elementslist[i].width(drawingWidth);
          elementslist[i].height(drawingHeight);
          elementslist[i].attr('width', drawingWidth);
          elementslist[i].attr('height', drawingHeight);  
        }

        console.log("editing size is: " + editingWidth + ", " + editingHeight);
        console.log(drawingWidth);
        console.log(drawingHeight);
				console.log("drawing size is: " + drawingWidth + ", " + drawingHeight);

				var pos = js_imgContainer.offset();
				js_drawing.offset(pos);

				
				var context = getCanvasContext(js_imgContainer);
        console.log(drawingWidth, drawingHeight);
				context.drawImage(img, 0, 0, drawingWidth, drawingHeight);

        //enableButtons();

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

//downloads the image after it has been transformed 
function save_image(){
	console.log("saved");
  var can = $(document).find("#drawing");
  var dataurl = can.get(0).toDataURL();
  var download = $("#download");
  var img_link = $("#img_link");
  //download.show();
  //window.location.assign(dataurl);
  img_link.attr("href", dataurl);
  img_link[0].click();
}

function resetImage(){
  console.log("image reset");
  imgContext = getCanvasContext(js_imgContainer);
  drawContext= getCanvasContext(js_drawing);
  prevCanCtx = getCanvasContext(previewCanvas);
  width = js_editing.width();
  height = js_editing.height();
  $("#draggable2").css("display", "none");
  pointArray = [];
  drawContext.clearRect(0, 0, width,height);
  imgContext.clearRect(0,0, width, height);
  prevCanCtx.clearRect(0, 0, width, height)
  $('#picture').val('');
  hasImage = false;
  //disableButtons();


  //console.log(width);
}

//event handlers go here 
$("#download-btn").click(save_image);
$("#picture").on("change", read_image);
$("#reset-btn").click(resetImage);
$("#upload-btn").click(function(){
  $("#picture").click();
});





