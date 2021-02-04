const ul = document.querySelector('ul')
const btn = document.querySelector('button')

// const fetchBitCoinPrice = async () => {
// 	try{
// 		const res = await axios.get('https://api.4cryptonator.com/api/full/btc-usd')
// 		console.log(res.data.ticker.price)
// 		return res
// 	}
// 	catch (e){
// 		console.log('error', e)
// 	}
// }

// const addNewBitCoinPrice = async () => {
// 	const priceTxt = await fetchBitCoinPrice()
// 	if (!priceTxt) {
// 		throw 'Bad Error - Exiting Program'
// 	}
// 	const newPriceLI = document.createElement('li')
// 	newPriceLI.append(priceTxt.data.ticker.price)
// 	ul.append(newPriceLI)
// 	console.log(priceTxt)
// 	console.log(newPriceLI)
// }

// btn.addEventListener('click', addNewBitCoinPrice)

const fetchJoke = async () => {
	try{
		const config = {headers: {Accept: 'application/json'}}
		const res = await axios.get('https://icanhazdadjoke.com/', config)
		// console.log(res)
		return res.data.joke
	}
	catch (e){
		return 'No Jokes Avail'
	}
}

const addJoke = async() => {
	const newJokeTxt = await fetchJoke()
	// console.log(newJokeObj)
	const newJokeLI = document.createElement('li')
	newJokeLI.append(newJokeTxt)
	ul.append(newJokeLI)

}



btn.addEventListener('click', addJoke)