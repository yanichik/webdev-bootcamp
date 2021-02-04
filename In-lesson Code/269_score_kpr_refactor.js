const resetButton = document.querySelector('#reset');
const playto = document.querySelector('#playto');


let winningScore = 3;
let isGameOver = false;

playto.addEventListener('change', function(){
	winningScore = parseInt(this.value);
});

const p1 = {
	score: 0,
	button: document.querySelector('#p1Button'),
	display: document.querySelector('#p1Display')
}

const p2 = {
	score: 0,
	button: document.querySelector('#p2Button'),
	display: document.querySelector('#p2Display')
}

// window.onload = function() {
//   let image = document.querySelector('#img');
//   let context = image.getContext("2d");
//   let img = document.getElementById("source");
//   context.drawImage(img, 0, 0);
//   let imgData = context.getImageData(0, 0,canvas.width,canvas.height);
//   window.requestAnimationFrame(fade);
 
// function fade(){
//   for (let i = 0; i < imgData.data.length; i += 4) {
//     r=imgData.data[i];
//     g=imgData.data[i+1];
//     b=imgData.data[i+2];
//     if(r>0)r--;
//     imgData.data[i]=r;
//     if(g>0)g--;
//     imgData.data[i+1]=g;
//     if(b>0)b--;
//     imgData.data[i+2]=b;
//     }
//   context.putImageData(imgData, 0, 0);
//   window.requestAnimationFrame(fade);
//   }
// }

function updateScores(player1, player2){
	if (!isGameOver) {
		player1.score++;
		if (player1.score === winningScore){
			isGameOver = true;
			player1.display.classList.add('has-text-success');		
			player2.display.classList.add('has-text-danger');
			player1.button.disabled = true;
			player2.button.disabled = true;
		}
		player1.display.textContent = player1.score;
		
	}
}

function reset(){
	isGameOver = false;
	for (let p of [p1,p2]){
		p.display.classList.remove('has-text-success', 'has-text-danger');
		p.score = 0;
		p.display.textContent = p.score;
		p.button.disabled = false;
	}
}

p1.button.addEventListener('click', function(){
	updateScores(p1,p2);
});

p2.button.addEventListener('click', function(){
	updateScores(p2,p1);
});

resetButton.addEventListener('click', reset);
