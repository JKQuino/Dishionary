let params = new URLSearchParams(document.location.search);
let recipeId = parseInt(params.get("id"));

const recipeInfo = {
        "async": true,
        "crossDomain": true,
        // "url": `https://api.spoonacular.com/recipes/${recipeId}/information`,
        "data": {
            apiKey: '15e63a09410147cd8d03bdc77c7abe77',
			includeNutrition: 'true'
        },
        "method": "GET",
        "headers": {
            "Content-Type": "application/json"
        }
};

$.ajax(recipeInfo).done(function (recipe) {
	$('#recipe-img').attr("src",'https://placeimg.com/120/120/nature');
	$('.recipe-name').text(recipe.title);
    // ingredients
    $.each(recipe.extendedIngredients, function(index, value){
            $("#ingredients").append('<p>' + value + '</p>' + '<br>');
        });
});

const recipeInstruction = {
    "async": true,
    "crossDomain": true,
    // "url": `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
    "data": {
        apiKey: '15e63a09410147cd8d03bdc77c7abe77'
    },
    "method": "GET",
    "headers": {
        "Content-Type": "application/json"
    }
};

$.ajax(recipeInstruction).done(function (instruction) {
	// $('.recipe-name').text(instruction.title);
});

const recipeNutrition = {
    "async": true,
    "crossDomain": true,
    // "url": `https://api.spoonacular.com/recipes/${recipeId}/nutritionWidget.json`,
    "data": {
        apiKey: '15e63a09410147cd8d03bdc77c7abe77'
    },
    "method": "GET",
    "headers": {
        "Content-Type": "application/json"
    }
};

$.ajax(recipeNutrition).done(function (nutrition) {
	// $('.recipe-name').text(nutrition.title);
});
