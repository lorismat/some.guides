$(".dataviz-wrapper").attr("style", `
	height: 2500px;
`);

$(".slides").attr("style", `
	position : -webkit-sticky;
	position: sticky;
	top: 0px;
	width: 75%;
  border: 10px solid #fff;	
	padding: 10px;
	height: 100vh;
	background-color: #34495e;
`)

$(".articles").attr("style", `
	width: 25%;
	float: right;
	transform: translateY(-50vh);
`)

$(".article").attr("style", `
	background-color: #777;
	margin-bottom: 50vh;
`)

function slide1() {
	console.log("slide1")
	$(".slides").css("background-color", "#34495e")
}

function slide2() {
	console.log("slide2")
	$(".slides").css("background-color", "#487eb0")
}

function slide3() {
	console.log("slide3")
	$(".slides").css("background-color", "#e84118")
}

var waypoint = new Waypoint({
  element: document.getElementById("article1"),
  handler: function(direction) {
   	slide1(); 
  },
	offset: "50%"
})

var waypoint = new Waypoint({
  element: document.getElementById("article2"),
  handler: function(direction) {
   	slide2();
  },
	offset: "50%"
})

var waypoint = new Waypoint({
  element: document.getElementById("article3"),
  handler: function(direction) {
   	slide3();
  },
	offset: "50%"
})


