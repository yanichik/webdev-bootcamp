const input = document.querySelector("input");

input.addEventListener('keydown', (e)=>{
	switch (e.code)	{
		case 'ArrowUp':
			console.log('UP');
			break;
		case 'ArrowDown':
			console.log('DOWN');
			break;
		case 'ArrowLeft':
			console.log('LEFT');
			break;
		case 'ArrowRight':
			console.log('RIGHT');
			break;
	}
});