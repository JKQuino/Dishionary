//access userFavorites.json to get recipe id and store in array
let favoritesContainer = document.querySelector('favorites-container');
let recipeIds = [];

const settings = {
    "async": true,
    "crossDomain": true,
    // "url": "https://api.spoonacular.com/recipes/informationBulk",
    "data": {
        apiKey: '15e63a09410147cd8d03bdc77c7abe77',
        // ids: String(recipeIds),
    },
    "method": "GET",
    "headers": {
        "Content-Type": "application/json"
    }
};

$.ajax(settings).done(function (response) {
    for (var i = 0; i < response.length; i++) {
        let savedRecipe = document.createElement('div');
        savedRecipe.setAttribute('class', 'saved-recipe card mb-3');
        savedRecipe.innerHTML = `
            <div class="row g-0">
                <div class="col-5 col-sm-5">
                    <img src="${response[i].image}" class="img-fluid rounded-start h-100">
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
        favoritesContainer.appendChild(savedRecipe);
    }
    console.log(response);
});
