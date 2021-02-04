const searchTitle = document.querySelector('#searchTitle')
searchTitle.addEventListener('submit', async function(e){
	e.preventDefault()
	console.log("Submitted!")
	const searchVal = searchTitle.elements.title.value
	const config = {params: {q: searchVal}}
	const res = await axios.get(' http://api.tvmaze.com/search/shows', config)
	for (const datum of res.data){
		if (datum.show.image) {
			const img = document.createElement('IMG')
			img.src = datum.show.image.medium
			document.body.append(img)
		}
	}
	searchTitle.elements.query.value = ''
})

