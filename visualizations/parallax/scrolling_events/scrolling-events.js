// Below is a set up for parallax/scrolling effect
// The scrolling event version is not recommended as it can lead to a less smooth experience
// see this article: https://pudding.cool/process/introducing-scrollama/
//
$(".dataviz-wrapper").attr("style", `
	height: 2000px;
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
	
// variable checkup for scrolling
let checkup = 0;

window.addEventListener("scroll", (event) => {

	  let scrollPosition = (window.pageYOffset/window.innerHeight)*100;

		console.log(scrollPosition);

		if (scrollPosition >= 0 && scrollPosition < 55 && (checkup === 0 || checkup === 2)) {
			checkup = 1;
			slide1();
		}

		if (scrollPosition >= 55 && scrollPosition < 100 && (checkup === 1 || checkup === 3)) {
			checkup = 2;
			slide2();
		}

	 	if (scrollPosition >= 100 && checkup === 2) {
			checkup = 3;
			slide3();
		}
})

