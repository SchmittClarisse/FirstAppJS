export const PageDetail = () =>{
	let root = document.querySelector("#root")
	root.innerHTML = `<p>DetailPage </p>`

	let title = window.location.hash.split("/")[window.location.hash.split.length]
	console.log({title})
	let searchGames = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&search=${title}&search_exact=true`
	

	const loadFirstGameData = async() =>{
		let searchGamesblop = await fetch(searchGames)
		let searchJson = await searchGamesblop.json()
		
		let screenshots = searchJson.results[0].short_screenshots;
		return [searchJson.results[0].id, screenshots]
	}
	const loadPreciseGameData = async() =>{
		let [id, screenshots] = await loadFirstGameData();
		let preciseGameQuery = `https://api.rawg.io/api/games/${id}?key=${process.env.API_KEY}`
		let preciseGameResultBlop = await fetch(preciseGameQuery)
		let preciseGameResultJson = await preciseGameResultBlop.json()
		console.log("here", preciseGameResultJson)
		return [preciseGameResultJson,screenshots]
	}

	const displayGameData = async() =>{
		let [item,screenshots] = await loadPreciseGameData();
		let ratingsCounts = item.ratings.map(item =>item.count)
		let totalCount = ratingsCounts.reduce((tally,current) => tally+current)
		
		
		let html = `
			<p>DetailPage </p>
			<div>
			<img class="card_img" src="${item.background_image}">
			<h4>${item.name}</h4>
			<h6>${item.released}</h6>
			<p>${item.description_raw}</p>
			<h6>number of ratings : ${item.ratings.length}</h6>
			<h6>average rating ${item.rating} by ${totalCount} people</h6>
			<p> Site web :<a href="${item.website}">  ${item.website} </a></p>		
			`
			item.genres.forEach(genre => html += `<div><a href="#pagelist/&genre=${genre.slug}/&id=${genre.id}"><span class="genres">${genre.name}</span></div>`)
			item.publishers.forEach(publisher => html += `<div><a href="#pagelist/&publisher=${publisher.slug}/&id=${publisher.id}"><span class="publishers">${publisher.name}</span></a></div>`)

			item.developers.forEach(async (developer) => 
				{
					//console.log("developer",developer)
					//let blop = await getDeveloperData(developer.id)
					//let developerDataJson = await blop.json()
					//console.log({developerDataJson})
				html += `<div class="dev" ><a href="#pagelist/&developer=${developer.slug}/&id=${developer.id}"><span class="developers">${developer.name}</span></a></div>`
				})
			item.platforms.forEach(item => html += `<div><a href="#pagelist/&platform=${item.platform.slug}/&id=${item.platform.id}"><span class=" cli-${(item.platform.name).toLowerCase()} platforms">${item.platform.name}</span><i class=" cib-${(item.platform.name).toLowerCase()}"></i></a></div>`)
			item.tags.forEach(tag => html += `<a href="#pagelist/&tag=${tag.slug}/&id=${tag.id}"><span class="tag">${tag.name}</span></div><a>`)
			item.stores.forEach(item => html += `<span class="store">${item.store.name}</span>`)
			html += `</div>`
			html +=`<div class="images__grid">`
			screenshots.forEach(screenshot => {
				let imgSrc = screenshot.image
				html += `
				<img src="${imgSrc}">
				`
			})
			html += `</div>`
			root.innerHTML = html
	}
	
	// vidéo de présentation du jeu 
	// les liens internes
	// moyenne et nombre de notes à refaire

	displayGameData()
	//const getDeveloperData = async (id)=>{
	//	let query = `https://api.rawg.io/api/developers/${id}?key=${process.env.API_KEY}`
	//	return  await fetch(query)
	//}

	const loadSimilarGames = async () => {
		let [id,_] = await loadFirstGameData()
		let query = `https://api.rawg.io/api/games/${id}/game-series?key=${process.env.API_KEY}`
		console.log({query})
		let similarGamesBlop = await fetch(query)
		let similarGamesJson = await similarGamesBlop.json()
		console.log("similarGamesJson",similarGamesJson)

		let html =`
		<h3 class="similar__header">Similar games</h3>
		<div class="similar__games">
		
		`
		similarGamesJson.results.forEach(results => {
			let background_image = results.background_image
			html += `<div class="similar__game"><img class="similar__img" src="${background_image}">
			<span class="">${results.name}</span></div>
			`
		})
		html += `</div>`
		root.insertAdjacentHTML('beforeend',html)
	}
	
	loadSimilarGames()
}

