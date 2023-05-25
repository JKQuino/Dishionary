const searchBtn = document.getElementById('searchBtn');
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
        <div class="card-border-0 mb-3 bg-transparent text-body" onclick="location.href='./recipe.html?id=${result.id}'">
			<img src="${result.image}" class="carg-image-top img-fluid border rounded-4" style="height: 12.5rem;">
			<div class="card-body p-0">
				<p class="card-title text-truncate mb-0 fs-3">${result.title}</p>
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

  searchBtn.style.display = 'none';
  loading.style.display = 'inline-block';

  fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=15e63a09410147cd8d03bdc77c7abe77&query=${searchInput}&number=100`, settings)
  .then(response => response.json())
  .then(data => {
    console.log(data.totalResults);
    searchBtn.style.display = 'inline-block';
	  loading.style.display = 'none';

    if (data.totalResults === 0) {
      $('#queryModal').modal('show');
    } else {
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
      <div class="card-border-0 mb-3 bg-transparent text-body" onclick="location.href='./recipe.html?id=${result.id}'">
        <img src="${result.image}" class="carg-image-top img-fluid border rounded-4" style="height: 12.5rem;">
        <div class="card-body p-0">
          <p class="card-title text-truncate mb-0 fs-3">${result.title}</p>
        </div>
      </div>
      `;
        });
      }		  
      mealList.innerHTML = html;
    }
    
	})
  .catch(error => {
    // Display error message and open error modal
    // console.log(error);
    searchBtn.style.display = 'inline-block';
    loading.style.display = 'none';
    $('#errorModal').modal('show');
  });
}