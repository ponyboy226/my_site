var inc = 0.1;
var scl = 10;
var cols, rows;
var partnum = 1500;
var zoff = 0;
var particles = [];
var flowfield;

function setup() {
  createCanvas(800, 500);
  background(255);

  cols = floor(width / scl);
  rows = floor(height / scl);
  
  // Creating particles to start drawing
  flowfield = new Array(cols * rows);
  for (var i = 0; i < partnum; i++) {
    particles[i] = new Particle();

  }
}

function draw() {
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * cols;
      var angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(0.5);
      flowfield[index] = v
      xoff += inc;
      stroke(0, 100);
      push();
      
      translate(x * scl, y * scl);
      rotate(v.heading());
      //line(0, 0, scl, 0);
      pop();
    }
    yoff += inc;
    zoff += 0.001;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
}
