//Pantry Functions
let inputBox = document.getElementById('inputBox');
let ingredientContainter = document.querySelector('.ingredient-containter');
let recipeContainer = document.querySelector('.recipe-container');
let recipeCardContainer = document.querySelector('.recipeCard-container');
let noRecipeCards = document.getElementById('noRecipe');
let searchBtn = document.getElementById('searchBtn');
let loading = document.getElementById('loading');

let tags = [];

window.onload = function() {
	// Retrieve the ingredients list and the search results from the session storage
	let ingredients = JSON.parse(sessionStorage.getItem('ingredients'));
	let pantryResults = JSON.parse(sessionStorage.getItem('pantryResults'));
  
	// Check if the ingredients and pantryResults variables are not null
	if (ingredients && pantryResults) {
		noRecipeCards.style.display = "none";
		recipeContainer.classList.remove('position-relative');
		
		// Clear the recipeCardContainer element
		if (recipeCardContainer.childNodes.length > 0) { recipeCardContainer.innerHTML=""; }
  
	  	// Loop through the ingredients list and display them on the page
	  	for (var i = 0; i < ingredients.length; i++) {
			let ingredient = document.createElement('div');
			ingredient.innerHTML = `
		 		<span onclick="removeIngredient(this, '${ingredients[i]}')" class="p-2 badge border rounded-pill bg-light text-dark fs-6 fw-normal">
					<span>${ingredients[i]}</span>
					<i class="ms-2 fas fa-times text-danger"></i>
		  		</span>
		`;
		ingredientContainter.appendChild(ingredient);
	  }
  
	// Loop through the search results and display them on the page
	for (var i = 0; i < pantryResults.length; i++) {
		let recipeCard = document.createElement('div');
		recipeCard.setAttribute('class', 'recipe-card card mb-3');
		recipeCard.innerHTML = `
		  	<div class="row g-0">
				<div class="col-5 col-sm-5">
				<img id="recipeImage" src="${pantryResults[i].image}" class="img-fluid rounded-start h-100">
				</div>
				<div class="col-7 col-sm-7">
					<div class="card-body">
						<h5 class="card-title text-truncate">${pantryResults[i].title}</h5>
						<a href="./recipe.html?id=${pantryResults[i].id}" class="card-text"><small class="text-muted">Tap to check recipe</small></a>
					</div>
				</div>
		  	</div>
		`;
		recipeCardContainer.appendChild(recipeCard);
	  }
	}
} 

function generateResult(){
	noRecipeCards.style.display = "none";
	recipeContainer.classList.remove('position-relative');
	
	if (recipeCardContainer.childNodes.length > 0) { recipeCardContainer.innerHTML=""; }

	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.spoonacular.com/recipes/findByIngredients",
		"data": {
			apiKey: '20b08b9ff770453ab07e7c767773adaa',
			ingredients: String(tags),
			number: '100',
			ignorePantry: 'false',
			ranking: '1'
		},
		"method": "GET",
		"headers": {
			"Content-Type": "application/json"
		}
	};

	searchBtn.classList.add('d-none');
	loading.classList.remove('d-none');
	
	$.ajax(settings).done(function (response) {
		// Store the search results in the session storage
		sessionStorage.setItem('ingredients', JSON.stringify(tags));
		sessionStorage.setItem('pantryResults', JSON.stringify(response));

		searchBtn.classList.remove('d-none');
		loading.classList.add('d-none');
		
		for (var i = 0; i < response.length; i++) {
			let recipeCard = document.createElement('div');
			recipeCard.setAttribute('class', 'recipe-card card mb-3');
			recipeCard.innerHTML = `
				<div class="row g-0">
					<div class="col-5 col-sm-5">
						<img id="recipeImage" src="${response[i].image}" class="img-fluid rounded-start h-100">
					</div>
					<div class="col-7 col-sm-7">
						<div class="card-body">
							<h5 class="card-title text-truncate">${response[i].title}</h5>
							<a href="./recipe.html?id=${response[i].id}" class="card-text"><small class="text-muted">Tap to check recipe</small></a>
						</div>
					</div>
				</div>
			`;
			recipeCardContainer.appendChild(recipeCard);
		}
		console.log(response);
	});
}

function addIngredient(){
    let val = inputBox.value;

    if (val === '' ||  tags.includes(val))
        return;

    tags.push(val);

    let ingredient = document.createElement('div');
    ingredient.innerHTML = `
        <span onclick="removeIngredient(this, '${val}')" class="p-2 badge border rounded-pill bg-light text-dark fs-6 fw-normal">
            <span>${val}</span>
            <i class="ms-2 fas fa-times text-danger"></i>
        </span>
    `;
    ingredientContainter.appendChild(ingredient);

    inputBox.value = '';
    inputBox.focus();
}

function removeIngredient(ref, tag){
    let parent = ref.parentNode.parentNode;
    parent.removeChild(ref.parentNode);
    let index = tags.indexOf(tag);
    tags.splice(index, 1)
}
