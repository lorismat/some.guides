// Credit: David Shiffman
// Tutorial: https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

const W = 400;
const H = 400;
const particles_nb = 100;

let particles = [];

function Particle() {
  this.pos = createVector(random(W),random(H));
  this.vel = createVector(random(-1,1),random(-1,1));
  
  // acc is used in flow fields
  // this.acc = createVector(0,0);
  
  this.udpate = function() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    
    // accelaration can depend on the flow field
    // this.acc.mult(0);
    
  }
  
	/* forces for flowfields
  this.applyForce = function(force) {
    this.acc.add(force);
  }
	*/
  
  this.show = function() {
    stroke(0);
    point(this.pos.x, this.pos.y);
  }
  
  this.edges = function() {
    if (this.pos.x > W) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = W;
    if (this.pos.y > H) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = H;
  }
}

function setup() {
  createCanvas(W, H);
  
  for (let i = 0; i < particles_nb ; i++) {
    particles[i] = new Particle();
  }
}

function draw() {
  background(255);
  
  for (let i = 0; i < particles.length; i++) {
    particles[i].udpate();
    particles[i].show();
    particles[i].edges();
  }
}
