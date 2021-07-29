export const PageList = (props) => {
	
	
	if(!!window.location.hash.split("&")[1]){
		let  type= window.location.hash.split("/")[1].split('=')[0]
		let id = window.location.hash.split("/")[2].split('=')[1]
		console.log(id)
		root.innerHTML = ''
		root.insertAdjacentHTML("beforeend",`lien interne`)
		const InternRedirect = async () => {
			
			//let searchURL = `https://api.rawg.io/api/games?page_size=9&ordering=-rating&dates=2008-01-01,2021-06-29&key=${process.env.API_KEY}&search=${result[0]}=${result[1]}&search_precise=true`
			let searchURL= `https://api.rawg.io/api/games?key=${process.env.API_KEY}${type}=${id}&search_precise&search_exact`
			console.log(searchURL)
			//let searchURL = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page_size=9&ordering=-rating&search=&publishers&search_precise=true`
			let blop = await fetch(searchURL)
			let resultJSON = await blop.json()
			let html = ''
			resultJSON.results.forEach(item => {
				//let url = `${window.location.pathname}#pagedetail/game/${item.slug}`
				let url = `${window.location.pathname}#pagedetail/game/${item.slug}`
				html +=
					`	
				<div class="card">
				<a href=${url}>
				<img class="card_img" src="${item.background_image}">
				<h4>${item.name}</h4>
				</a>
				</div>
				`
			})
			root.insertAdjacentHTML('beforeend', html)
		}
		InternRedirect()
	}else{
		let count = 1;
		let root = document.querySelector("#root")
		root.insertAdjacentHTML("beforeend",
			`<div class="pageList__wrapper">
		  <div class="top">
			<div class="top__left title"><h1 class="is__red">The Hyper Progame</h1></div>
			<div class="top__right title">search bar</div>
		  </div>
		  <div class="intro">
			<h1>Welcome,</h1>
			<p>
			  The Hyper Progame is the world’s premier event for computer and video
			  games and related products. At The Hyper Progame, the video game
			  industry’s top talent pack the Los Angeles Convention Center,
			  connecting tens of thousands of the best, brightest, and most
			  innovative in the interactive entertainment industry. For three
			  exciting days, leading-edge companies, groundbreaking new
			  technologies, and never-before-seen products will be showcased. The
			  Hyper Progame connects you with both new and existing partners,
			  industry executives, gamers, and social influencers providing
			  unprecedented exposure
			</p>
	
		   
			<div>
			  <div class="list__wrapper">
				  <div class='list'>
				  </div>
			  </div>
			</div>
		  </div>
		</div>
		`)
		let list = document.querySelector('.list')
		let wrapper =  document.querySelector('.list__wrapper')
		const loadNine = async () => {
			if (count >3) return
			let NineGame = `https://api.rawg.io/api/games?key=${process.env.API_KEY}&page=${count}&page_size=9&dates=2021-08-01,2022-08-01`
			let blop = await fetch(NineGame)
			let resultJson = await blop.json()
			console.log(resultJson)
			let result = resultJson.results
			count++
			return result
			//result.forEach
		}
		const displayNine = async () => {
			let result = await loadNine()
			let html = ``
			result.forEach(item => {
				let url = `${window.location.pathname}#pagedetail/game/${item.slug}`
				html +=
					`	
				<div class="card">
				<a href=${url}>
				<img class="card_img" src="${item.background_image}">
				<h4>${item.name}</h4>
				</a>
				</div>
				`
			})
			list.insertAdjacentHTML('beforeend', html)
		}
		const DisplayButton = () =>{
			wrapper.insertAdjacentHTML("beforeEnd",`<div><button id="plus" class="red__btn">PLUS</button></div>`)
			let btn = document.querySelector('#plus')
			btn.addEventListener("click", displayNine)
		}
		displayNine()
		DisplayButton()
	}
	
}