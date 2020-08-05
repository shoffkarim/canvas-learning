var opts = {
  count: 10, //Increases the spawn rate
  size: 50, //Minimal is one
  sizeRandom: 10, //Amount of pixels it can be randomed by
  sparkLife: 0.1, //Decreases the sparks life
  spawnOpacity: 1, //Sparks will spawn at this opacity
  color: "rgba(39,173,96,alpha)" //The color of sparks.
},
canvasBody = document.getElementById("canvas"),
canvas = canvasBody.getContext("2d"),
w = canvasBody.width = window.innerWidth,
h = canvasBody.height = window.innerHeight;




function anim(){
  window.requestAnimationFrame(anim);
  step();
}

anim() //Calling the animation function

function step() {
  var fillColor = opts.color.replace("alpha", opts.spawnOpacity);
  canvas.fillStyle = fillColor;
  for(var i = 0; i < Math.round(opts.count); i++)
  {
    var random = Math.random() * opts.sizeRandom;
    canvas.fillRect(-(opts.size/2) + Math.random() * w, -(opts.size/2) + Math.random() * h, opts.size + random, opts.size + random);
  }

  canvas.fillStyle = "rgba(255, 255, 255, "+ opts.sparkLife +")";
  canvas.fillRect(0, 0, w, h);
}
