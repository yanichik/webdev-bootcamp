let par = document.getElementsByTagName('p')[0];
const req = new XMLHttpRequest();

req.onload = function(){
	console.log("Req Complete");
	console.log(this);
	// par.appendChild('this');
	// par.innerText = JSON.parse(this.response.price);
	// const something = JSON.parse(this.response).ticker.price;
	const something = parseInt(JSON.parse(this.response).ticker.price);
	par.innerText = something.toFixed(2);
	// par.innerText = JSON.parse(this.response).ticker.price;

	// par.innerText = this.response;
}

req.onerror = function(){
	console.log("Ooooh, that's just wrong!");
	console.log(this);
}

req.open('GET', 'https://api.cryptonator.com/api/full/btc-usd');
req.send();
