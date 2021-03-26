const bcrypt = require('bcrypt')

// function:
// input of pw
// create salt
// create hash
// returns true or false result of authentication


// OPTION 1: 2-steps
// const hash = async function(pw){
// 	const salt = await bcrypt.genSalt(12);
// 	const hashedPw = await bcrypt.hash(pw, salt);
// 	console.log(salt);
// 	console.log(hashedPw);
// }

// OPTION 2: 1-step
const hash = async function(pw){
	const hashedPw = await bcrypt.hash(pw, 12);
	console.log(hashedPw);
}


const login = async function(pw, hashedPw){
	const result = await bcrypt.compare(pw, hashedPw);
	if(result){
		console.log('Logging in. Welcome!')
	}
	else {
		console.log('Incorrect password. Try Again!')
	}
}

// hash('dino!');

login('dino!', '$2b$12$.NSVgjyM8MosBIFlTvZYVOXMXF4fAI3/hNwwilz.i/MmE9AyL2PTW');