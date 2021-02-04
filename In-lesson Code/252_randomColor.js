const colorTag = document.querySelector("#colorTag");
const ccBtn = document.querySelector("#ccBtn");

var a, b, c;
var randomNum = function(){
	return Math.floor(Math.random()*255);
}
var change = function(){
	a = randomNum();
	b = randomNum();
	c = randomNum();
	document.body.style.backgroundColor = "rgb(" + a + ", " + b + ", " + c + ")";
	document.querySelector("#colorTag").innerHTML = "rgb(" + a + ", " + b + ", " + c + ")";
	if ( 150 >= (a + b + c)) {
		document.querySelector("#colorTag").style.color = "white";
	}
	else {
		document.querySelector("#colorTag").style.color = "black";
	}
}

ccBtn.addEventListener('click', change);