 //function imageToBitArray(canvasWithImage){
//  var ctx = canvasWithImage.getContext('2d');
//  var imageData = ctx.getImageData(0, 0, canvas.height, canvas.width);
//  var i=0;
//  var imageArray = new Array();
//  for (i = 0; i < canvas.height; i++){
//    imageArray[i] = new Array();
//    var j = 0;
//    for (j = 0; j < canvas.width; j++){
//      for (var n = 0;n < 4;n++){
//        if (n==0){
//          imageArray[i][j] = new Array();
//        }  
//        if (n != 3) {
//          imageArray[i][j][n] = imageData.data[i*canvas.width+j*4 + n];
//        }
//      }
//    }
//  }
//  return imageArray;
//}



var drawing = $("#drawing");
var previewDrawing = $("#previewDrawing");
var ctx = getCanvasContext(drawing);
var canCtx = getCanvasContext(previewCanvas)
ctx.strokeStyle='white';
var draggable_div = $("#draggable2");
var div_positioned = false;
var pointArray=[];
var hasImage = false;

//var draggable2 = $("draggable2", ctx);
//draggable2.draggable({
 // containment: "parent"
//});

function getHeightWidthRatio(){
  /* 
  Notes from the underground:
  It's not actually true that twice as far gives you twice the height. There's pythagorean
  nonsense going on as well I've got to count.
  If the first one is x away from me, and it's height h:
  tan(theta)=h_r/x_r (h real over x-away real)
  tan(theta)
  The ratio of heights is actually the ratio of angles. It's the same in the small
  angle approximation. So, we've got the height ratio of 

  How far back is it? If it's twice the height in the front, that means that it's twice
  as far as the close one.

  It's not actually twice as far away! I think I should go back to that angle thing.
  
  Two things that take up the same angle

  first assumption: that the first one is as far away as the height.
  So, you take the log of the difference. Then we 

  How far back it goes: Let's say it's maxHeight * (maxHeight / minHeight). That's
  sort of fair. And left right is perceived width 

  */



  var totalWidth = Math.abs(pointArray[0][0] - pointArray[2][0]);
  var h1 = Math.abs(pointArray[1][1]-pointArray[0][1]);
  var h2 = Math.abs(pointArray[3][1]-pointArray[2][1]);
  var maxHeight = Math.max(h1,h2);
  var minHeight = Math.min(h1,h2);
  var slope = ((maxHeight - minHeight) / totalWidth)
  var diff = maxHeight - minHeight;
  var cosine = (totalWidth / Math.sqrt((diff * diff) + (totalWidth * totalWidth)))
  // return (maxHeight / (cosine * totalWidth))
  // return (maxHeight / totalWidth)
  return minHeight / totalWidth
  // return ((maxHeight / minHeight) / totalWidth);
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
    ctx.beginPath();
    ctx.moveTo(x+w1,bottom);
    ctx.lineTo(x+w1,top);
    ctx.stroke();
  }
}

function drawCropRect(){

  if (!hasImage){
    return;
  }
  // console.log("my name is benjamin");
  if (pointArray.length != 4 ) {
    // console.log("drink milk think milk");
    return;
  }

  var draggable_div = $("#draggable2");
  var drawing = $("#drawing");
  //show the div
  draggable_div.show();
  //if this is the first time, get the top left coordinates of the drawing; set the div to appear there
  if (!div_positioned) {
    var drawing_top = drawing.offset().top;
    var drawing_left = drawing.offset().left;
    var drawing_pos = {top : drawing_top, left : drawing_left};
    draggable_div.offset(drawing_pos);
    div_positioned = true;
  }
  draggable_div.width(100);
  draggable_div.height(100 * getHeightWidthRatio())
  //make the div draggable 
  draggable_div.draggable({
    containment : drawing
  });
  //make the div resizable 
  draggable_div.resizable({
    containment : drawing,
    aspectRatio : true,
    minHeight   : 30,
    minWidth    : 30
  });

}


function drawGrid(){
  if (!hasImage){
    return;
  }

  if (pointArray.length != 4 ) {
    console.log("why are you calling this now?!?!");
    return;
  }
  var first = pointArray[0];
  var second = pointArray[1];
  var third = pointArray[2];
  var fourth = pointArray[3];
  
  for (var i = 0; i <= 10; i++) {
    var p1 = [first[0] + i * (second[0] - first[0])/10,first[1] + i * (second[1] - first[1])/10];
    var p2 = [fourth[0] + i * (third[0] - fourth[0])/10,fourth[1] + i * (third[1] - fourth[1])/10];
    ctx.beginPath();
    ctx.moveTo(p1[0],p1[1]);
    ctx.lineTo(p2[0],p2[1]);
    ctx.stroke();
  }
}

function drawCurrent(e){
  //ctx.clearRect(0,0,drawing.width(),drawing.height());
  if(!hasImage){
    return;
  }

  if (pointArray.length == 0) {
    return;
  }

  var offset = drawing.offset();
  var currCoords = [e.pageX - offset.left, e.pageY - offset.top]



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

//$(drawing).mousemove(function(e){
//  console.log('dragging');
//  drawCurrent(e);
//});


$(drawing).click(function(e){
  if (pointArray.length == 4) {
    console.log('already there');
    return;
  }

  var offset = drawing.offset();
  var coords = [e.pageX - offset.left, e.pageY - offset.top]


  if (pointArray.length == 0) {
    pointArray.push([coords[0],coords[1]]);
    drawCurrent(e);
    return;  
  }
  if (pointArray.length == 1) {
    var first = pointArray[0];
    coords[0] = first[0];
    if (first[1] > coords[1]) {
      pointArray = [coords, first];
      drawCurrent(e);
      return;
    }
    pointArray = [first, coords];
    drawCurrent(e);
    return;
  }
  if (pointArray.length == 2) {
    pointArray.push([coords[0],coords[1]]);
    drawCurrent(e);
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
    drawCurrent(e);
    return;
  }
})


function getFracXFromFracX(fracX){
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

function getTopBottomFromFracX(fracX){
  var bottom = pointArray[1][1] + (pointArray[2][1] - pointArray[1][1]) * (fracX);
  var top = pointArray[0][1] + (pointArray[3][1] - pointArray[0][1]) * (fracX);
  return [top, bottom];
}

// drawOntoDest(a.offset().left, a.offset().right,a.width(),a.height(), sourceCanvas);

function drawOntoDest(inputRectLeft, inputRectTop, inputRectWidth, inputRectHeight, sourceCanvas){
  var totalWidth = Math.abs(pointArray[0][0] - pointArray[2][0]);
  var leftX = pointArray[0][0];
  for (var i = 0; i < totalWidth; i++) {
    var fracX = i / totalWidth;
    var quadFracX = getFracXFromFracX(fracX);
    var tb = getTopBottomFromFracX(quadFracX);
    
    var sx = parseInt(inputRectLeft + (inputRectWidth * fracX));
    var sy = inputRectTop;
    var sw = 2;
    var sh = inputRectHeight;
    var dx = parseInt(leftX + (totalWidth * quadFracX));
    var dy = tb[0];
    var dw = 2;
    var dh = tb[1]-tb[0]
    console.log(sx, sy, sw, sh, dx, dy, dw, dh);
    canCtx.drawImage(sourceCanvas, sx, sy, sw, sh, dx, dy, dw, dh);
    // ctx.drawImage(sourceCanvas,
    //   int(inputRectLeft + (inputRectWidth * fracX)),
    //   tb[1], 1, 1,
    //   int(leftX + (totalWidth * quadFracX)), tb[1]-tb[0] )
  }
}

$("#transform-btn").click(function(e){

  var draggable_div = $("#draggable2");
  var sourceCanvas = $("#imgContainer");
  var drawing = $("#drawing");
  var previewDrawing = $("#previewDrawing");
  var previewCanvas = $("#previewCanvas");
  var previewImgContainer = $("#preview-img-container");

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
  canCtx.drawImage(sourceCanvas[0], 0 ,0);

  //ctx.clearRect(0,0,drawing.width(), drawing.height());
  ctx.drawImage(sourceCanvas[0], 0,0);
  var after = new Date();
  console.log("time it takes to draw single whole thing is " + (after - before));
  console.log(drawing.position);
  var left = draggable_div.position().left;
  var top = draggable_div.position().top;
  var width = draggable_div.width();
  var height = draggable_div.height();
  console.log(" parameters are "+ left + ", " + top + ", " + width + ", " + height);
  draggable_div.hide();
  var now = new Date();
  for (var i = 0; i < 5; i++){
    drawOntoDest(left, top, width, height, previewCanvas[0]);
  }
  pointArray = [];

  var later = new Date();
  console.log("Time it takes to draw five times is: " + (later - now));

})









