//access userFavorites.json to get recipe id and store in array
let favoritesContainer = document.querySelector('.favorites-container');
let recipeCardContainer = document.querySelector('.recipeCard-container');
let noFavorite = document.getElementById('noFavorite');
let recipeIds = [];

$.getJSON('userFavorites.json', function(recipes) {
    recipes.forEach(recipe => {
        recipeIds.push(recipe.recipe_id);
    });

    $('#count').text(recipes.length);

    if (recipeIds.length != 0){
        noFavorite.style.display = "none";
	    favoritesContainer.classList.remove('position-relative');

        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.spoonacular.com/recipes/informationBulk",
            "data": {
                apiKey: '15e63a09410147cd8d03bdc77c7abe77',
                ids: String(recipeIds),
            },
            "method": "GET",
            "headers": {
                "Content-Type": "application/json"
            }
        };

        $.ajax(settings).done(function (response) {
            response.forEach(recipe => {
                let savedRecipe = document.createElement('div');
                    savedRecipe.setAttribute('class', 'saved-recipe card mb-3');
                    savedRecipe.innerHTML = `
                        <div class="row g-0">
                            <div class="col-5 col-sm-5">
                                <img src="${recipe.image}" class="img-fluid rounded-start h-100">
                            </div>
                            <div class="col-7 col-sm-7">
                                <div class="card-body">
                                    <h5 class="card-title text-truncate">${recipe.title}</h5>
                                    <p class="card-text">Rating: # <i class="fas fa-star"></i><br> Favorite By: # <i class="fas fa-users"></i></p>
                                    <a href="./recipe.html?id=${recipe.id}" class="card-text"><small class="text-muted">Tap to check recipe</small></a>
                                </div>
                            </div>
                        </div>
                    `;
                    recipeCardContainer.appendChild(savedRecipe);
            });
        });
    }
    else {
        noFavorite.style.display = "block";
	    favoritesContainer.classList.add('position-relative');
    }
});
