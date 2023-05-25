let recipeContainer = document.querySelector('.recipe-container');
let recipeCards = document.querySelector('.recipe-cards');
let emptyComponent = document.querySelector('.empty-component');

// Get the saved recipe IDs from the local storage
let recipeIds = JSON.parse(localStorage.getItem('recipeIds'));

$('#count').text(recipeIds.length);

function generateFavorites() {
    // Check if there are any saved recipe IDs
    if (recipeIds && recipeIds.length > 0) {
        emptyComponent.style.display = "none";
        // Set up the API request to get the saved recipes
        let settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://api.spoonacular.com/recipes/informationBulk",
            "data": {
                apiKey: '15e63a09410147cd8d03bdc77c7abe77',
                ids: String(Object.entries(recipeIds)),
            },
            "method": "GET",
            "headers": {
                "Content-Type": "application/json"
            }
        };

    // Send the API request to get the saved recipes
    $.ajax(settings).done(response => {
            // Add each saved recipe to the page
            response.forEach(recipe => {
                let recipes = document.createElement('a');
                recipes.setAttribute('href', `./recipe.html?id=${recipe.id}`);
                recipes.setAttribute('style', "text-decoration: none;");
                recipes.innerHTML = `
                <div class="card text-bg-dark border-0 rounded-4">
                    <img src="${recipe.image}" class="card-img img-fluid rounded-4" style="max-height: 10rem;">
                    <div class="card-img-overlay rounded-4">
                        <p class="card-title text-truncate mb-0 fs-2">${recipe.title}</p>
                        <div class="d-flex justify-content-between">
                            <small class="fs-6 float-start">${recipe.aggregateLikes} <i class="fas fa-star" style="color: #ffd43b;"></i></small>
                            <small class="fs-6 float-end">${recipe.readyInMinutes} mins</small>
                        </div>
                    </div>
                </div>
                `;
                recipeCards.appendChild(recipes);
            });
        }).fail((jqXHR, textStatus, errorThrown) => {
            // Request failed. Show error message to user.
            emptyComponent.style.display = "flex";
            $('#errorModal').modal('show');
        });
    }
}

function retry() {
    // Hide the error modal
    $('#errorModal').modal('hide');
    
    // Retry the AJAX request
    generateFavorites();
};

generateFavorites();
