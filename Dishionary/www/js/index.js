const mealWheel1 = document.getElementById('meal1');
const mealWheel2 = document.getElementById('meal2');
const mealWheel3 = document.getElementById('meal3');
const mealWheel4 = document.getElementById('meal4');
const mealWheel5 = document.getElementById('meal5');
const c1 = document.getElementById('Tag1');
const c2 = document.getElementById('Tag2');
const c3 = document.getElementById('Tag3');
const c4 = document.getElementById('Tag4');
const c5 = document.getElementById('Tag5');



const mealWheels = [mealWheel1, mealWheel2, mealWheel3, mealWheel4, mealWheel5];
const tags = [c1, c2, c3, c4 ,c5];
const links = "https://api.spoonacular.com/recipes/random?apiKey=20b08b9ff770453ab07e7c767773adaa&number=1";

const settings = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
    }
};

function setTag1 (){
	let links = "https://api.spoonacular.com/recipes/random?apiKey=20b08b9ff770453ab07e7c767773adaa&number=1&tags=vegetarian";
	for (let i = 0; i < mealWheels.length; i++) {
    fetch(links, settings)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        let html = "";
        if (data.recipes) {
            data.recipes.forEach(recipes => {
            html += `
			<div class="carousel-cell" id="meal1" style="background-image: url(${recipes.image})">
					<div class="overlay" ></div>
					<div class="inner">
						<h2 class="title">${recipes.title}</h2>
						<h3 class="subtitle">Rating:</h3>
						<a href="./recipe.html?id=${recipes.id}" class="btn">Show Recipe</a>
					</div>
				</div>
            `;
            });
        }
        mealWheels[i].innerHTML = html;
    });
}
}

function setTag2 (){
	let links = "https://api.spoonacular.com/recipes/random?apiKey=20b08b9ff770453ab07e7c767773adaa&number=1&tags=vegan";
	for (let i = 0; i < mealWheels.length; i++) {
    fetch(links, settings)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        let html = "";
        if (data.recipes) {
            data.recipes.forEach(recipes => {
            html += `
			<div class="carousel-cell" id="meal1" style="background-image: url(${recipes.image})">
					<div class="overlay" ></div>
					<div class="inner">
						<h2 class="title">${recipes.title}</h2>
						<h3 class="subtitle">Rating:</h3>
						<a href="./recipe.html?id=${recipes.id}" class="btn">Show Recipe</a>
					</div>
				</div>
            `;
            });
        }
        mealWheels[i].innerHTML = html;
    });
}
}

function setTag3 (){
	let links = "https://api.spoonacular.com/recipes/random?apiKey=20b08b9ff770453ab07e7c767773adaa&number=1&tags=glutenFree";
	for (let i = 0; i < mealWheels.length; i++) {
    fetch(links, settings)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        let html = "";
        if (data.recipes) {
            data.recipes.forEach(recipes => {
            html += `
			<div class="carousel-cell" id="meal1" style="background-image: url(${recipes.image})">
					<div class="overlay" ></div>
					<div class="inner">
						<h2 class="title">${recipes.title}</h2>
						<h3 class="subtitle">Rating:</h3>
						<a href="./recipe.html?id=${recipes.id}" class="btn">Show Recipe</a>
					</div>
				</div>
            `;
            });
        }
        mealWheels[i].innerHTML = html;
    });
}
}

function setTag4 (){
	let links = "https://api.spoonacular.com/recipes/random?apiKey=20b08b9ff770453ab07e7c767773adaa&number=1&tags=dairyFree";
	for (let i = 0; i < mealWheels.length; i++) {
    fetch(links, settings)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        let html = "";
        if (data.recipes) {
            data.recipes.forEach(recipes => {
            html += `
			<div class="carousel-cell" id="meal1" style="background-image: url(${recipes.image})">
					<div class="overlay" ></div>
					<div class="inner">
						<h2 class="title">${recipes.title}</h2>
						<h3 class="subtitle">Rating:</h3>
						<a href="./recipe.html?id=${recipes.id}" class="btn">Show Recipe</a>
					</div>
				</div>
            `;
            });
        }
        mealWheels[i].innerHTML = html;
    });
}
}

function setTag5 (){
	let links = "https://api.spoonacular.com/recipes/random?apiKey=20b08b9ff770453ab07e7c767773adaa&number=1&tags=veryHealthy";
	for (let i = 0; i < mealWheels.length; i++) {
    fetch(links, settings)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        let html = "";
        if (data.recipes) {
            data.recipes.forEach(recipes => {
            html += `
			<div class="carousel-cell" id="meal1" style="background-image: url(${recipes.image})">
					<div class="overlay" ></div>
					<div class="inner">
						<h2 class="title">${recipes.title}</h2>
						<h3 class="subtitle">Rating:</h3>
						<a href="./recipe.html?id=${recipes.id}" class="btn">Show Recipe</a>
					</div>
				</div>
            `;
            });
        }
        mealWheels[i].innerHTML = html;
    });
}
}


for (let i = 0; i < mealWheels.length; i++) {
    fetch(links, settings)
        .then(response => response.json())
        .then(data => {
        console.log(data);
        let html = "";
        if (data.recipes) {
            data.recipes.forEach(recipes => {
            html += `
			<div class="carousel-cell" id="meal1" style="background-image: url(${recipes.image})">
					<div class="overlay" ></div>
					<div class="inner">
						<h2 class="title">${recipes.title}</h2>
						<h3 class="subtitle">Rating:</h3>
						<a href="./recipe.html?id=${recipes.id}" class="btn">Show Recipe</a>
					</div>
				</div>
            `;
            });
        }
        mealWheels[i].innerHTML = html;
    });
}