const input = process.argv[2]
const franc = require('franc')
const langs = require('langs')
const colors = require('colors')
const iso639_3 = franc(input)

if (iso639_3 === "und") {
	console.log('You\'re sentence is too short. Try again. Exiting ...'.red)
	process.exit()
}

const langName = langs.where('3', iso639_3)
console.log(langName.name.rainbow)