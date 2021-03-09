// Credit: David Shiffman
// Tutorial: https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html


// watching frame rate
let fr;

const scl = 4;
let cols, rows;

let xoff = 0;
let yoff = 0;
let zoff = 0;
let xinc = 0.1;
let yinc = 0.05;
let zinc = 0.001;

const W = 400;
const H = 400;

const particles_nb = 100;
const maxSpeed = 1;
const magn = 1;
const alph = 40;

let particles = [];
let flowfield = [];

function setup() {
  createCanvas(W, H);
  
  fr = createP('');
  
  cols = floor(H/scl);
  rows = floor(W/scl);
  
  flowfield = new Array(cols * rows);
  
  for (let i = 0; i < particles_nb ; i++) {
    particles[i] = new Particle();
  }
}

function Particle() {
  this.pos = createVector(random(W),random(H));
  this.vel = createVector(0,0);
  this.acc = createVector(0,0);
  this.maxSpeed = maxSpeed;
  
  this.udpate = function() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    // resetting the accelaration to 0
    this.acc.mult(0);
    
  }
  
  this.follow = function(vectors) {
    let x = floor(this.pos.x / scl);
    let y = floor(this.pos.y / scl);
    let index = x + y * cols;
    let force = vectors[index];
    this.applyForce(force);
  }
  
  this.applyForce = function(force) {
    this.acc.add(force);
  }
  
  this.show = function() {
    stroke(0, alph);
    point(this.pos.x, this.pos.y);
  }
  
  this.edges = function() {
    if (this.pos.x > W) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = W;
    if (this.pos.y > H) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = H;
  }
}

function draw() {
  stroke(0);
  
  yoff = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      
      let index = i + j * cols;
      
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      
      v.setMag(magn);
      
      // all the vectors we are creating are stored in the flowfield array
      flowfield[index] = v;
      
      xoff += xinc;
      
      // visualize the vectors
      /*
      stroke(0, 0, 0, 50);
      push();
      translate(i * scl, j * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();
      */
    }
    xoff = 0;
    yoff += yinc;
  }
  
  zoff += zinc;
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].udpate();
    particles[i].show();
    particles[i].edges();
  }
  
  fr.html(floor(frameRate()));
}
