window.addEventListener('load', function() {
  const errorSplash = document.getElementById('errorSplash');
  const heroSlider = document.querySelector('.hero-slider');
  const retryButton = document.getElementById('retryButton');

  // Check internet connection
  const hasInternetConnection = navigator.onLine; // Replace with your internet connection check

  // Check API key validity
  const apiKey = '843a454be0d04f08852506edebd5ef5f'; // Replace with your actual API key

  function checkSystemStatus() {
    checkAPIKeyValidity(apiKey)
      .then(apiKeyValid => {
        if (!hasInternetConnection || !apiKeyValid) {
          errorSplash.style.display = 'flex';
          heroSlider.style.display = 'none';
        } else {
          errorSplash.style.display = 'none';
          heroSlider.style.display = 'block';

          const mealWheel1 = document.getElementById('meal1');
          const mealWheel2 = document.getElementById('meal2');
          const mealWheel3 = document.getElementById('meal3');
          const mealWheel4 = document.getElementById('meal4');
          const mealWheel5 = document.getElementById('meal5');
          const tags = document.querySelectorAll('.carousel-cells');

          const mealWheels = [mealWheel1, mealWheel2, mealWheel3, mealWheel4, mealWheel5];

          const settings = {
            "method": "GET",
            "headers": {
              "Content-Type": "application/json",
            }
          };

          function setTag(index) {
            const tag = tags[index].getAttribute('data-tag');
            const links = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1&tags=${tag}`;

            Promise.all(mealWheels.map((mealWheel, i) => {
              return fetch(links, settings)
                .then(response => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw new Error('Error fetching recipes');
                  }
                })
                .then(data => {
                  console.log(data);
                  let html = "";
                  if (data.recipes) {
                    data.recipes.forEach(recipe => {
                      html += `
                        <div class="carousel-cell" style="background-image: url(${recipe.image})">
                          <div class="overlay"></div>
                          <div class="inner">
                            <h2 class="title">${recipe.title}</h2>
                            <h3 class="subtitle">${recipe.sourceName}</h3>
                            <a href="./recipe.html?id=${recipe.id}" class="btn">Show Recipe</a>
                          </div>
                        </div>
                      `;
                    });
                  }
                  mealWheel.innerHTML = html;
                })
                .catch(error => {
                  console.log(error);
                  // Handle error while fetching recipes
                  mealWheel.innerHTML = "<p>Error fetching recipes. Please try again later.</p>";
                });
            }));
          }

          function initializeTags() {
            tags.forEach((tag, index) => {
              tag.addEventListener('click', function() {
                setTag(index);
              });
            });
          }

          initializeTags();
          setTag(0);  // Set initial tags for the meal wheels
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the API key validity check
        console.log(error);
        errorSplash.style.display = 'flex';
        heroSlider.style.display = 'none';
      });
  }

  retryButton.addEventListener('click', checkSystemStatus);

  checkSystemStatus();
});

function checkAPIKeyValidity(apiKey) {
  const testUrl = `https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=1`;

  return fetch(testUrl)
    .then(response => {
      if (response.ok) {
        // The API key is valid
        return true;
      } else {
        // Check if the error is due to exceeded daily limit
        if (response.status === 402) {
          // Daily limit exceeded, handle the error here
          throw new Error('Daily limit exceeded');
        }
        // Other error occurred, API key is considered invalid
        return false;
      }
    })
    .catch(error => {
      // An error occurred during the request, indicating an invalid API key or other network error
      return false;
    });
}
