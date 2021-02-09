// dims to fetch dimensions of #myCanvas
const dims = document.getElementById('myCanvas').getBoundingClientRect();

// using W & H in the canvas later
const W = dims.width;
const H = dims.height;

function setup() {
	var myCanvas = createCanvas(W, H);
	// assigning the canvas to the parent specified in HTML
  myCanvas.parent("myCanvas");
}

function draw() {

	// test drawing
  background(255);
  fill("#000");
  stroke("#009944");
  strokeWeight(20);
  rect(0,0,W,H);
}
