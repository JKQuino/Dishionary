//Pantry Functions
let inputBox = document.getElementById('inputBox');
let ingredientContainter = document.querySelector('.ingredient-containter');
let recipeContainer = document.querySelector('.recipe-container');
let noRecipeContainer = document.getElementById('noRecipe-container');

let tags = [];

function generateResult(){
	const settings = {
		"async": true,
		"crossDomain": true,
		// "url": "https://api.spoonacular.com/recipes/findByIngredients",
		"data": {
			apiKey: '15e63a09410147cd8d03bdc77c7abe77',
			ingredients: String(tags),
			number: '10',
			ignorePantry: 'false',
			ranking: '1'
		},
		"method": "GET",
		"headers": {
			"Content-Type": "application/json"
		}
	};
	
	$.ajax(settings).done(function (response) {
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
							<h5 class="card-title">${response[i].title}</h5>
							<p class="card-text">Rating: # <i class="fas fa-star"></i><br> Favorite By: # <i class="fas fa-users"></i></p>
							<a href="./recipe.html?id=${response[i].id}" class="card-text"><small class="text-muted">Tap to check recipe</small></a>
						</div>
					</div>
				</div>
			`;
			recipeContainer.appendChild(recipeCard);
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

    noRecipeContainer.style.display = "none";
    recipeContainer.classList.remove('position-relative');
}

function removeIngredient(ref, tag){
    let parent = ref.parentNode.parentNode;
    parent.removeChild(ref.parentNode);
    let index = tags.indexOf(tag);
    tags.splice(index, 1)

    if (tags.length === 0) { noRecipeContainer.style.display = "block"; }
}
