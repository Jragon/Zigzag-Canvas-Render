function loadTiles(tiles, callback) {
  var images = [];
  var loadedImages = 0;
  var numTiles = tiles.length;

  for(var i = 0; i < numTiles; i++) {
    images[i] = new Image();
    images[i].onload = function() {
      if(++loadedImages >= numTiles) {
        callback(images);
      }
    };
    images[i].src = tiles[i];
  }
}

function drawDiamond (width, height, x, y){
  // move to centre on Y and 100 in on X
  context.moveTo(x, y);
  
  // down (height / 2)px and across (width / 2)
  context.lineTo(x + (width / 2), y + ((height / 2)));
  
  // up (height / 2)px across (width / 2)
  context.lineTo(x + width, y);

  // up (height / 2)px back (width / 2)
  context.lineTo(x + (width / 2), y - ((height / 2)));

  // down (height / 2)px back (width / 2)
  context.lineTo(x, y);
}

function drawMap (width, height, startX, startY, context, rows, columns, tile) {
  console.log('hello')
  var xCoors = {
    x: startX,
    y: startY
  };

  var yCoors = {
    x: startX,
    y: startY
  };

  for(var i=0; i <= rows; i++){
    // if i is odd
    if (i%2 !== 0) {
      xCoors.x = yCoors.x + (width / 2);
    } else {
      xCoors.x = yCoors.x;
    }
    xCoors.y = yCoors.y;

    for(var j=1; j <= columns; j++){
      tileNo = Math.floor(Math.random() * tile.length);
      console.log('hl');
      context.drawImage(tile[tileNo], xCoors.x, xCoors.y - height * 1.5);

      drawDiamond(width, height, xCoors.x, xCoors.y);

      context.textBaseline = "top";
      context.fillText("(" + ((xCoors.x - startX)/(width / 2)) + ", " 
        + ((xCoors.y - startY)/(height / 2)) + ")", xCoors.x + 30, xCoors.y - 5);

      xCoors.x += width;
    }

    yCoors.y += (height / 2);
  }
}

var canvas = document.getElementById("map");
var context = canvas.getContext("2d");

var tiles = ['http://i.imgur.com/TY5t3hE.gif', 'http://i.imgur.com/6CVCBah.gif', 'http://i.imgur.com/cRnAz3h.gif'];

loadTiles(tiles, function (images){
  drawMap(80, 40, 100, 110, context, 10, 5, images);
});

context.strokeType = 'blue';
context.stroke();