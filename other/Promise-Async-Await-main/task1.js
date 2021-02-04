// Task 1: Translate the story into code.
const onMyBday = ((isKayoSick) =>{
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!isKayoSick) {
			return resolve(2);
			}
			else {
				return reject(new Error("Get better first."));
				// return reject(0);
			}
		}, 2000);
	})
});

onMyBday(false)
	.then((result) => {
		console.log(`I'll have ${result} cakes`);
	})
	.catch((result) => {
		console.log(`I'll have ${result} cakes`);
	})
	.finally(() => {
		console.log("Let's party!");
	})