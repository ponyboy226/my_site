var inc = 0.1;
var scl = 10;
var cols, rows;
var partnum = 1500;
var zoff = 0;
var particles = [];
var flowfield;
var slider, rSlider, gSlider, bSlider;

function setup() {
  var canvas = createCanvas(800, 500);
  background(255);

  cols = floor(width / scl);
  rows = floor(height / scl);
  slider = createP(' ');

  // Creating particles to start drawing
  flowfield = new Array(cols * rows);
  for (var i = 0; i < partnum; i++) {
    particles[i] = new Particle();

  }
  // // create sliders
  // rSlider = createSlider(0, 255, 100);
  // rSlider.position(20, 20);
  // gSlider = createSlider(0, 255, 0);
  // gSlider.position(20, 50);
  // bSlider = createSlider(0, 255, 255);
  // bSlider.position(20, 80);

  canvas.parent('canvas');

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
  // var r = rSlider.value();
  // var g = gSlider.value();
  // var b = bSlider.value();
}