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
	//$('#recipe-fave').text(recipe.aggregateLikes.toString());
	$('#recipe-author').text(recipe.sourceName);
	$('#servings').text(recipe.servings.toString());
	$('#time').text(recipe.readyInMinutes.toString());

	//nutritions
	$.each(recipe.nutrition.nutrients, function(index, value) {
		$(".nutri").append(value.name + ": " + value.amount.toString() + " " + value.unit + " | ");
	});
    
	// ingredients
	$.each(recipe.extendedIngredients, function(index, value) {
		$("#ingredients").append('<p>' + "• " + value.original + '</p>');
	});
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
	$.each(equipments.equipment, function(index, value) {
		$("#equipments").append('<p>' + "• " + value.name + '</p>');
	});
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
    $.each(instruction, function(index, value) {
        $.each(value.steps, function(stepIndex, stepValue) {
			$("#instructions").append('<p>' + stepValue.number + ". " + stepValue.step + '</p>');
        });
    });
});


const random = {
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

$.ajax(random).done(function (trivia) {
	$('#random').text(trivia.text + " Happy Cooking!");
});


//Save Button
const button = document.getElementById('btn-save'); // get the button element with the id "btn-save"
const heart = document.querySelector('.fa-heart'); // get the element with the class "fa-heart"

let isSaved = false; // initialize a variable to track whether the item is saved

// check if the item is saved in local storage
if (localStorage.getItem('saved') === 'true') {
	heart.style.color = 'red'; // change the color of the heart to red
	isSaved = true; // update the saved state
}

button.addEventListener('click', function() { // listen for a click event on the button
	if (isSaved) { // if the item is saved
		// show the unsave modal
		$('#unsaveModal').modal('show');
	}
	
	else { // if the item is not saved
		// show the save modal
		$('#saveModal').modal('show');
		
		// add to local storage and set color to red
		localStorage.setItem('saved', 'true');
		heart.style.color = 'red';
		isSaved = true;
		
		// Save the recipeId in the userFavorites.json file
		let userFavorites = {};
		
		try {
			if (localStorage.getItem('../userFavorites')) {
				userFavorites = JSON.parse(localStorage.getItem('../userFavorites'));
			}
			
			if (!userFavorites[recipeId]) {
				userFavorites[recipeId] = true;
				localStorage.setItem('../userFavorites', JSON.stringify(userFavorites));
			}
		}
		
		catch (error) {
		  console.error(error);
		}
	}
});

const unsaveButton = document.getElementById('btn-unsave'); // get the unsave button

unsaveButton.addEventListener('click', function() { // listen for a click event on the unsave button
	// hide the unsave modal
	$('#unsaveModal').modal('hide');
  
	// remove from local storage and set color to initial
	localStorage.removeItem('saved');
	heart.style.color = 'initial';
	isSaved = false;
  
	// Remove the recipeId from the userFavorites.json file
	try {
		if (localStorage.getItem('../userFavorites')) {
			let userFavorites = JSON.parse(localStorage.getItem('../userFavorites'));
		}
		
		if (userFavorites[recipeId]) {
			delete userFavorites[recipeId];
			localStorage.setItem('../userFavorites', JSON.stringify(userFavorites));
		}
	} 
	
	catch (error) {
		console.error(error);
	}
});
