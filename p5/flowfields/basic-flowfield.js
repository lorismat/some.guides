// Credit: David Shiffman
// Tutorial: https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

const scl = 10;
let cols, rows;

let xoff = 0;
let yoff = 0;
let zoff = 0;
let xinc = 0.1;
let yinc = 0.05;
let zinc = 0.01;

const W = 200;
const H = 200;

function setup() {
  createCanvas(W, H);
  
  
  cols = floor(H/scl);
  rows = floor(W/scl);

}

function draw() {
  background(255);
  stroke(0);
  
  yoff = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let angle = noise(xoff, yoff, zoff) * TWO_PI;
      let v = p5.Vector.fromAngle(angle);
      xoff += xinc;
      stroke(0);
      push();
      translate(i * scl, j * scl);
      rotate(v.heading());
      line(0, 0, scl, 0);
      pop();
    }
    xoff = 0;
    yoff += yinc;
  }
  
  zoff += zinc;
}
