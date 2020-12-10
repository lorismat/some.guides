// Below is a set up to get multi p5.js canvas on the same page

const width = window.innerWidth - 20;
const height = window.innerHeight - 20;

const Wmax = 350;
const Hmax = 350;

// creating divs 
var a = $(`<div style="display: flex;align-items: center; margin: 0 auto;width:${width}px;height:${width}px;max-width:${Wmax}px;max-height:${Hmax}px;margin-bottom: 20px;">
	</div>`);

var b = $(`<div style="display: flex;align-items: center; margin: 0 auto;width:${width}px;height:${width}px;max-width:${Wmax}px;max-height:${Hmax}px;margin-bottom: 20px;">
	</div>`);

$(".dataviz").css({
    "padding": "10px",
    "margin-bottom": "70px"
});

// appending a div
$(".dataviz")
    .append(a)
    .append(b)

a.attr("id", "logo1");
b.attr("id", "logo2");

if (width < Wmax) {
    var W = width;
    var H = width
} else {
    var W = Wmax;
    var H = Hmax
};

var A = function(p) {
    let canvNb = parseInt(p._userNode.replace('c', ''));

    p.setup = function() {
        p.myCanvas = p.createCanvas(W, H);
        p.myCanvas.parent(`#logo${canvNb}`);
        $(`#defaultCanvas${canvNb-1}`).css("margin", "0 auto").css("width", `${W-5}px`).css("height", `${H-5}px`).css("border", "4px solid #000");
    };

    p.draw = function() {

    };
};

var B = function(p) {
    let canvNb = parseInt(p._userNode.replace('c', ''));

    p.setup = function() {
        p.myCanvas = p.createCanvas(W, H);
        p.myCanvas.parent(`#logo${canvNb}`);
        $(`#defaultCanvas${canvNb-1}`).css("margin", "0 auto").css("width", `${W-5}px`).css("height", `${H-5}px`).css("border", "4px solid #000");
    };

    p.draw = function() {

    };
};

var myp5 = new p5(A, 'c1');
var myp5 = new p5(B, 'c2');
