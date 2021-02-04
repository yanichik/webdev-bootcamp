const btn2 = document.querySelector("#v2");
const btn3 = document.querySelector("#v3");

btn2.onclick = function(){
	console.log("Clicked!");
}
function scream (){
	console.log("You're in!")
}
btn2.onmouseenter = scream;


btn3.addEventListener('mousedown', function(){
	alert('Clicked!');
});