const p1Button = document.querySelector('#p1Button');
const p2Button = document.querySelector('#p2Button');
const resetButton= document.querySelector('#reset');
const p1Display = document.querySelector('#p1Display');
const p2Display = document.querySelector('#p2Display');
const playto = document.querySelector('#playto');

let p1Score = 0;
let p2Score = 0;
let winningScore = 3;
let isGameOver = false;

playto.addEventListener('change', function(){
	// console.log(this.value);
	winningScore = parseInt(this.value);
	// console.log(e.target.options.selectedIndex);
	// let index = e.target.options.selectedIndex;
	// winningScore = e.target.options[index].innerText;
	
});

p1Button.addEventListener('click', (e)=>{
	if (!isGameOver) {
		p1Score++;
		if (p1Score === winningScore){
			isGameOver = true;
			p1Display.classList.add('has-text-success');		
			p2Display.classList.add('has-text-danger');
			p1Button.disabled = true;
			p2Button.disabled = true;
		}
		p1Display.textContent = p1Score;
		
	}
});

p2Button.addEventListener('click', (e)=>{
	if (!isGameOver) {
		p2Score++;
		if (p2Score === winningScore){
			isGameOver = true;
			p2Display.classList.add('has-text-success');		
			p1Display.classList.add('has-text-danger');
			p1Button.disabled = true;
			p2Button.disabled = true;
		}
		p2Display.textContent = p2Score;
		
	}
});

resetButton.addEventListener('click', reset);

function reset(){
	p1Display.classList.remove('has-text-success', 'has-text-danger');
	p2Display.classList.remove('has-text-success', 'has-text-danger');
	isGameOver = false;
	p1Score = 0;
	p2Score = 0;
	p1Display.textContent = p1Score;
	p2Display.textContent = p2Score;
	p1Button.disabled = false;
	p2Button.disabled = false;
}
