let favoritesContainer = document.querySelector('.favorites-container');
let recipeCardContainer = document.querySelector('.recipeCard-container');
let noFavorite = document.getElementById('noFavorite');

// Get the saved recipe IDs from the local storage
let recipeIds = JSON.parse(localStorage.getItem('recipeIds'));

$('#count').text(recipeIds.length);

// Check if there are any saved recipe IDs
if (recipeIds && recipeIds.length > 0) {
    // Hide the "No favorite recipes" message
    noFavorite.style.display = "none";
    favoritesContainer.classList.remove('position-relative');

    // Set up the API request to get the saved recipes
    let settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.spoonacular.com/recipes/informationBulk",
        "data": {
        apiKey: '20b08b9ff770453ab07e7c767773adaa',
        ids: String(recipeIds),
        },
        "method": "GET",
        "headers": {
        "Content-Type": "application/json"
        }
    };

  // Send the API request to get the saved recipes
  $.ajax(settings).done(function (response) {
        // Add each saved recipe to the page
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
    // Show the "No favorite recipes" message
    noFavorite.style.display = "block";
    favoritesContainer.classList.add('position-relative');
}