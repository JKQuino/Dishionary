let params = new URLSearchParams(document.location.search);
let recipeId = parseInt(params.get("id"));

const recipeInfo = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.spoonacular.com/recipes/${recipeId}/information`,
    "data": $.param({
        apiKey: '099f3f8c35174ee5b828ea7cd73a64f2',
        includeNutrition: true
    }),
    "method": "GET",
    "headers": {
        "Content-Type": "application/json"
    }
};

$.ajax(recipeInfo).done(function (recipe) {
    $('#recipe-img').attr("src",recipe.image);
    $('#recipe-name').text(recipe.title);
    $('#recipe-fave').text(recipe.aggregateLikes.toString());
    $('#recipe-author').text(recipe.sourceName);
    $('#servings').text(recipe.servings.toString());
    $('#time').text(recipe.readyInMinutes.toString());

    // nutritions
    if (recipe.nutrition.nutrients.length === 0) {
        $("#nutrition").append('<p>' + "No available nutritional information" + '</p>');
    } else {
        $.each(recipe.nutrition.nutrients, function(index, value) {
            $("#nutrition").append('<p>' + "• " + value.name + ": " + value.amount.toString() + " " + value.unit + '</p>');
        });
    }

    // ingredients
    if (recipe.extendedIngredients.length === 0) {
        $("#ingredients").append('<p>' + "No available ingredients" + '</p>');
    } else {
        $.each(recipe.extendedIngredients, function(index, value) {
            $("#ingredients").append('<p>' + "• " + value.original + '</p>');
        });
    }

    //wine pairing
    let pairingText;
    if (recipe.winePairing && recipe.winePairing.pairingText) {
        pairingText = recipe.winePairing.pairingText;
    }
    
    else {
        pairingText = "No wine pairing available.";
    }
    
    $("#wine-pair").append(`<p>${pairingText}</p>`);      
});
    
    
const recipeEquipment = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.spoonacular.com/recipes/${recipeId}/equipmentWidget.json`,
    "data": ({
      	apiKey: '099f3f8c35174ee5b828ea7cd73a64f2'
    }),
    "method": "GET",
    "headers": {
      	"Content-Type": "application/json"
    }
};

$.ajax(recipeEquipment).done(function (equipments) {
    if (equipments.equipment.length === 0) {
        $("#equipments").append('<p>' + "No available equipment" + '</p>');
    } else {
        $.each(equipments.equipment, function(index, value) {
            $("#equipments").append('<p>' + "• " + value.name + '</p>');
        });
    }
});


const recipeInstruction = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions`,
    "data": ({
        apiKey: '099f3f8c35174ee5b828ea7cd73a64f2'
    }),
    "method": "GET",
    "headers": {
        "Content-Type": "application/json"
    }
};

$.ajax(recipeInstruction).done(function (instruction) {
    if (instruction.length === 0) {
        $("#instructions").append('<p>' + "No available instructions" + '</p>');
    } else {
        $.each(instruction, function(index, value) {
            $.each(value.steps, function(stepIndex, stepValue) {
                $("#instructions").append('<p>' + stepValue.number + ". " + stepValue.step + '</p>');
            });
        });
    }
});


const trivias = {
    "async": true,
    "crossDomain": true,
    "url": `https://api.spoonacular.com/food/trivia/random`,
    "data": $.param({
        apiKey: '099f3f8c35174ee5b828ea7cd73a64f2'
    }),
    "method": "GET",
    "headers": {
        "Content-Type": "application/json"
    }
};

$.ajax(trivias).done(function (trivia) {
	$('#ran-triv').text(trivia.text + " Happy Cooking!");
}); 


//Similar Recipes
const settings = {
	"async": true,
	"crossDomain": true,
	"url": `https://api.spoonacular.com/recipes/${recipeId}/similar`,
	"data": $.param({
        apiKey: '099f3f8c35174ee5b828ea7cd73a64f2'
    }),
	"method": "GET",
	"headers": {
		"Content-Type": "application/json"
	}
};

$.ajax(settings).done(function (response) {
    let recipeList = $("<ul>").css("list-style-type", "disc");
    if (response.length === 0) {
        $(".recipeCard-container").html("<p>No similar recipes found</p>");
    } else {
        for (let i = 0; i < response.length; i++) {
            let recipeItem = $("<li>");
            let recipeTitle = $("<h6>").text(response[i].title);
            let recipeLink = $("<small>").css({"text-decoration": "underline", "color": "blue"}).text("View Recipe").click(function() {
                window.location.href = `recipe.html?id=${response[i].id}`;
            });
            recipeItem.append(recipeTitle).append(" ").append(recipeLink);
            recipeList.append(recipeItem).append("<br>");
        }
        $(".recipeCard-container").append(recipeList);
    }
});


//Save Button
function addSaveButtonEventListener() {
    // Get a reference to the button
    let saveButton = document.getElementById('btn-save');

    // Check if the recipe IDs are already saved in the local storage
    let recipeIds = JSON.parse(localStorage.getItem('recipeIds'));
    
    if (recipeIds && recipeIds.indexOf(recipeId) >= 0) {
        // Update the text and icon of the button if the recipe is already saved
        saveButton.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> Saved';
    }
    
    else {
        // Update the text and icon of the button if the recipe is not saved
        saveButton.innerHTML = '<i class="fas fa-heart" style="color: black;"></i> Save';
    }

    // Add an event listener to the button
    saveButton.addEventListener('click', function() {
        if (!recipeIds) {
        // Initialize the recipe IDs array if it does not exist
        recipeIds = [];
    }

        // Check if the current recipe is already saved
        const index = recipeIds.indexOf(recipeId);
      
        if (index >= 0) {
        // Remove the recipe from the array if it is already saved
        recipeIds.splice(index, 1);
        // Update the text and icon of the button
        saveButton.innerHTML = '<i class="fas fa-heart" style="color: black;"></i> Save';
        }
      
        else {
        // Add the recipe to the array if it is not already saved
        recipeIds.push(recipeId);
        // Update the text and icon of the button
        saveButton.innerHTML = '<i class="fas fa-heart" style="color: red;"></i> Saved';
        }

        // Save the updated recipe IDs array to the local storage
        localStorage.setItem('recipeIds', JSON.stringify(recipeIds));
    });
}

// Add the event listener to the button when the page is loaded
addEventListener('load', addSaveButtonEventListener);

