// Credit: David Shiffman
// Tutorial: https://thecodingtrain.com/CodingChallenges/024-perlinnoiseflowfield.html

const scl = 20;
let cols, rows;

const W = 200;
const H = 200;


function setup() {
  createCanvas(W, H);
  
	// floor to get full rectangles
  cols = floor(W/scl);
  rows = floor(H/scl);
}

function draw() {
  background(255);
  stroke(0);
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      rect(i*scl, j*scl, scl, scl)
    }
  }
}
