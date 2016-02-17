//declare global jquery objects here
var js_editing = $("#editing");
var js_drawing = $("#drawing");
var js_imgContainer = $("#imgContainer");
var js_transform = $("#transform");
var js_reset = $("#reset");
var js_download = $("#download");

js_transform.prop('disabled', true);
js_download.prop('disabled', true);
js_reset.prop('disabled', true);



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

        var elementslist = [js_editing, js_imgContainer, js_drawing];

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

				var canvas = js_imgContainer[0];
				var context = canvas.getContext('2d');
        console.log(drawingWidth, drawingHeight);
				context.drawImage(img, 0, 0, drawingWidth, drawingHeight);
        //$("#transform").show();
        //$("#download").show();
        js_transform.prop('disabled', false);
        js_reset.prop('disabled', false);
        js_download.prop('disabled', false);
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
  var img_link = $("#img_link");
  //download.show();
  //window.location.assign(dataurl);
  img_link.attr("href", dataurl);
  img_link[0].click();
}

//event handlers go here 
$("#download").click(save_image);
$('#picture').on("change", read_image);





