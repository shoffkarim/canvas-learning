var canvasBody = document.getElementById("canvas"),
  canvas = canvasBody.getContext("2d"),
  w = canvasBody.width = window.innerWidth,
  h = canvasBody.height = window.innerHeight,
  tick = 0,
  currentHue = 0,
  painting = false,

  opts = {
    radius: 50,
    color: "hsl(hue, 100%, 40%)"
  };

canvasBody.addEventListener("mousedown", function()
{
  painting = true;
});

canvasBody.addEventListener("mouseup", function()
{
  painting = false;
});

canvasBody.addEventListener("mousemove", function(e)
{
  if(painting)
  {
    var posX = e.pageX,
        posY = e.pageY;
    ++tick;
    if(!(tick % 2))
    {
      if((currentHue !== 356))
      {
        currentHue++;
      }
      else
      {
        currentHue = 0;
      }
    }
    currentColor = opts.color.replace("hue", currentHue);
    canvas.fillStyle = currentColor;
    canvas.beginPath();
    canvas.arc(posX, posY, opts.radius, 0, Math.PI * 2);
    canvas.fill();
  }
})
