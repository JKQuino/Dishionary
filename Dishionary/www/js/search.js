const searchBtn = document.getElementById('SearchBtn');
const mealList = document.getElementById('mealList');

window.onload = function() {
  // Retrieve the search input and search results from the session storage
  let searchInput = sessionStorage.getItem('searchInput');
  let searchResults = JSON.parse(sessionStorage.getItem('searchResults'));

  // Check if the searchInput and searchResults variables are not null
  if (searchInput && searchResults) {
    // Loop through the search results and display them on the page
    let html = "";
    searchResults.forEach(result => {
      html += `
        <div class="recipe-card card mb-3">
          <div class="row g-0">
            <div class="col-5 col-sm-5">
              <img src="${result.image}" class="img-fluid rounded-start h-100">
            </div>
            <div class="col-7 col-sm-7">
              <div class="card-body">
                <h5 class="card-title">${result.title}</h5>
                <p class="card-text">Rating: # <br> Favorite By: # Users</p>
                <a href="./recipe.html?id=${result.id}" class="card-text"><small class="text-muted">Tap to check recipe</small></a>
              </div>
            </div>
          </div>
        </div>
      `;
    });
    mealList.innerHTML = html;
  }
};

function generateResult() {
  // Get the search input from the inputBox element
  let searchInput = document.getElementById('inputBox').value.trim();

  // Save the search input in the session storage
  sessionStorage.setItem('searchInput', searchInput);

  const settings = {
    "method": "GET",
    "headers": {
      "Content-Type": "application/json",
    }
  };

  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=099f3f8c35174ee5b828ea7cd73a64f2&query=${searchInput}&number=10`, settings)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let html = "";
    if (data.results) {
      // Clear the mealList element
      if (mealList.childNodes.length > 0) { mealList.innerHTML=""; }

      // Save the search results in the session storage
      sessionStorage.setItem('searchResults', JSON.stringify(data.results));

      // Save the search input and search results in the state object
      let state = {
        searchInput: searchInput,
        searchResults: data.results
      };

      // Push the state object to the history stack
      window.history.pushState(state, "", `?search=${searchInput}`);

      // Loop through the search results and display them on the page
      data.results.forEach(result => {
        html += `
			  <div class="recipe-card card mb-3">
				<div class="row g-0">
				  <div class="col-5 col-sm-5">
					<img src="${result.image}" class="img-fluid rounded-start h-100">
				  </div>
				  <div class="col-7 col-sm-7">
					<div class="card-body">
					  <h5 class="card-title">${result.title}</h5>
					  <p class="card-text">Rating: # <br> Favorite By: # Users</p>
					  <a href="./recipe.html?id=${result.id}" class="card-text"><small class="text-muted">Tap to check recipe</small></a>
					</div>
				  </div>
				</div>
			  </div>
			`;
		  });
		}		  
		mealList.innerHTML = html;
	})	
}