var canvasBody = document.getElementById("canvas"),
    canvas = canvasBody.getContext("2d"),
    w = canvasBody.width = window.innerWidth,
    h = canvasBody.height = window.innerHeight,

    opts = {
      backgroundColor: "#222",
      particleColor: "#fcfcfc",
      defaultSpeed:1,
      addedSpeed:2,
      defaultRadius: 2,
      addedRadius: 2,
      particleAmount: 100,
      lineWidth: 0.5,
      lineColor: "rgba(255,255,255,opacity)",
      commRadius: 170
    },

    particles = [],
    Particle = function(posX, posY){
      this.x = posX ? posX : Math.random() * w;
      this.y = posY ? posY : Math.random() * h;

      this.speed = opts.defaultSpeed + Math.random() * opts.addedSpeed;
      this.directAngle = Math.floor(Math.random() * 360);
      this.color = opts.particleColor;
      this.radius = opts.defaultRadius + Math.random() * opts.addedRadius;
      this.d = {
        x: Math.cos(this.directAngle) * this.speed,
        y: Math.sin(this.directAngle) * this.speed
      };

      this.update = function(){
        this.border();
        this.x += this.d.x;
        this.y +=this.d.y;
      };

      this.border = function(){
        if(this.x >= w || this.x <= 0){
          this.d.x *= -1;
        }
        if(this.y >= h || this.y <= 0){
          this.d.y *= -1;
        }
        this.x > w ? this.x = w : this.x;
        this.y > h ? this.y = h : this.y;
        this.x < 0 ? this.x = 0 : this.x;
        this.y < 0 ? this.y = 0 : this.y;
      };

      this.draw = function(){
        canvas.beginPath();
        canvas.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        canvas.closePath();
        canvas.fillStyle = this.color;
        canvas.fill();
      }
    },

    checkDistance = function(x1, y1, x2, y2){
      return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    };

    commPoints = function(point, parent){
      for (let i = 0; i < parent.length; i++) {
        var distance = checkDistance(point.x, point.y, parent[i].x, parent[i].y);
        var opacity = 1 - distance / opts.commRadius;
        if(opacity > 0){
          canvas.lineWidth = opts.lineWidth;
          canvas.strokeStyle = opts.lineColor.replace("opacity", opacity);
          canvas.beginPath();
          canvas.moveTo(point.x, point.y);
          canvas.lineTo(parent[i].x, parent[i].y);
          canvas.closePath();
          canvas.stroke();
        }
      }
    }

function setup(){
  for(var i = 0; i < opts.particleAmount; i++){
    particles.push(new Particle());
  }
  window.requestAnimationFrame(loop);
}

function loop(){
  canvas.fillStyle = opts.backgroundColor;
  canvas.fillRect(0, 0, w, h);

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
  }

  for (let i = 0; i < particles.length; i++) {
    commPoints(particles[i], particles);
  }
  window.requestAnimationFrame(loop);
}
setup();

canvasBody.addEventListener("click", function(e){
  particles.push(new Particle(e.pageX, e.pageY));
});

canvasBody.addEventListener("contextmenu", function(e){
  e.preventDefault();
  particles.splice(particles.length - 1, 1);
})
