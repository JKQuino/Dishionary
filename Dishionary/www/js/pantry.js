//Pantry Functions
let input = document.getElementById('input');
let ingredientContainter = document.querySelector('.ingredient-containter');
let button = document.querySelector('.btn-search')
const search = document.getElementById("search");
const loading = document.getElementById("loading");

let recipeContainer = document.querySelector('.recipe-container');
let emptyComponent = document.querySelector('.empty-component');
let recipeCards = document.querySelector('.recipe-cards');

let tags = [];

function addIngredient(){
	let val = input.value;

	if (val === '' ||  tags.includes(val))
		return;

	tags.push(val);

	let ingredient = document.createElement('div');
	ingredient.innerHTML = `
			<span onclick="removeIngredient(this, '${val}')" class="tag p-2 badge text-body rounded-4 fs-6 fw-normal">
				${val}
			</span>
	`;
	ingredientContainter.appendChild(ingredient);
	input.value = '';

	if (tags.length > 0) {
		button.classList.remove('disabled');
	} else {button.classList.add('disabled');}
}

function removeIngredient(ref, tag){
	let parent = ref.parentNode.parentNode;
	parent.removeChild(ref.parentNode);
	let index = tags.indexOf(tag);
	tags.splice(index, 1)

	if (tags.length > 0) {
		button.classList.remove('disabled');
	} else {button.classList.add('disabled');}
}

function generateResult(){
	const settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.spoonacular.com/recipes/findByIngredients",
		"data": {
			apiKey: '099f3f8c35174ee5b828ea7cd73a64f2',
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

	search.style.display = 'none';
	loading.style.display = 'inline-block';
	
	$.ajax(settings).done(response => {
		loading.style.display = "none";
		search.style.display = "inline-block";
		$('#errorModal').modal('hide');

		if (response.length === 0) {
			$('#queryModal').modal('show');
		} else {
			recipeCards.innerHTML = null;
			emptyComponent.style.display = "none";

			for (var i = 0; i < response.length; i++) {
				let recipes = document.createElement('a');
				recipes.setAttribute('href', `./recipe.html?id=${response[i].id}`);
				recipes.setAttribute('style', "text-decoration: none;");
				recipes.innerHTML = `
				<div class="card border-0 mb-3 bg-transparent text-body">
					<img src="${response[i].image}" class="card-img-top img-fluid border rounded-4" style="height: 12.5rem;">
					<div class="card-body p-0">
						<p class="card-title text-truncate mb-0 fs-3">${response[i].title}</p>
						<small class="fs-6">${response[i].likes} <i class="fas fa-star" style="color: #ffd43b;"></i></small>						
					</div>
				</div>
				`;
				recipeCards.appendChild(recipes);
			}

			// Store the search results in the session storage
			sessionStorage.setItem('ingredients', JSON.stringify(tags));
			sessionStorage.setItem('pantryResults', JSON.stringify(response));
		}
	}).fail((jqXHR, textStatus, errorThrown) => {
		// Request failed. Show error message to user.
		loading.style.display = "none";
		search.style.display = "inline-block";
		emptyComponent.style.display = "flex";
		recipeCards.innerHTML = null;
		$('#errorModal').modal('show');
	});
}

window.onload = function() {
	// Retrieve the ingredients list and the search results from the session storage
	let ingredients = JSON.parse(sessionStorage.getItem('ingredients'));
	let pantryResults = JSON.parse(sessionStorage.getItem('pantryResults'));

	// Check if the ingredients and pantryResults variables are not null
	if (ingredients && pantryResults) {
		button.classList.remove('disabled');
		emptyComponent.style.display = "none";

	  // Loop through the ingredients list and display them on the page
	  for (var i = 0; i < ingredients.length; i++) {
			let ingredient = document.createElement('div');
			ingredient.innerHTML = `
				<span onclick="removeIngredient(this, '${ingredients[i]}')" class="tag p-2 badge text-body rounded-4 fs-6 fw-normal">
					${ingredients[i]}
				</span>
			`;
			ingredientContainter.appendChild(ingredient);
	  }
  
		// Loop through the search results and display them on the page
		for (var i = 0; i < pantryResults.length; i++) {
			let recipes = document.createElement('a');
			recipes.setAttribute('href', `./recipe.html?id=${pantryResults[i].id}`);
			recipes.setAttribute('style', "text-decoration: none;");
			recipes.innerHTML = `
			<div class="card border-0 mb-3 bg-transparent text-body">
				<img src="${pantryResults[i].image}" class="card-img-top img-fluid border rounded-4" style="height: 12.5rem;">
				<div class="card-body p-0">
					<p class="card-title text-truncate mb-0 fs-3">${pantryResults[i].title}</p>
					<small class="fs-6">${pantryResults[i].likes} <i class="fas fa-star" style="color: #ffd43b;"></i></small>				
				</div>
			</div>
			`;
			recipeCards.appendChild(recipes);
		}
	} else {
		button.classList.add('disabled');
		emptyComponent.style.display = "flex";
	}
} 
