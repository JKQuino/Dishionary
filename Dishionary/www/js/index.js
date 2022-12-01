/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    console.log('ready')
}

//Pantry Functions
let inputBox = document.getElementById('inputBox');
let ingredientContainter = document.querySelector('.ingredient-containter');
let recipeContainer = document.querySelector('.recipe-container');
let noRecipeContainer = document.getElementById('noRecipe-container');

let tags = [];

if (tags.length === 0) { noRecipeContainer.style.display = "block"; }

function addIngredient(){
    let val = inputBox.value;

    if (val === '' ||  tags.includes(val))
        return;

    tags.push(val);

    let ingredient = document.createElement('div');
    ingredient.innerHTML = `
        <span onclick="removeIngredient(this, '${val}')" class="p-2 badge border rounded-pill bg-light text-dark fs-6 fw-normal">
            <span>${val}</span>
            <i class="ms-2 fas fa-times text-danger"></i>
        </span>
    `;
    ingredientContainter.appendChild(ingredient);

    inputBox.value = '';
    inputBox.focus();

    noRecipeContainer.style.display = "none";
    recipeContainer.classList.remove('position-relative');

    //Create a loop to populate card and filter query
    // let recipeCard = document.createElement('div');
    // recipeCard.setAttribute('class', 'recipe-card card mb-3');
    // recipeCard.innerHTML = `
    //     <div class="row g-0">
    //         <div class="col-5 col-sm-5">
    //             <img src="img/logo.png" class="img-fluid rounded-start h-100">
    //         </div>
    //         <div class="col-7 col-sm-7">
    //             <div class="card-body">
    //                     <h5 class="card-title">Recipe Name</h5>
    //                     <p class="card-text">Rating: # <i class="fas fa-star"></i><br> Favorite By: # <i class="fas fa-users"></i></p>
    //                     <a href="./recipe.html" class="card-text"><small class="text-muted">Tap to check recipe</small></a>
    //             </div>
    //         </div>
    //     </div>
    // `;
    // recipeContainer.appendChild(recipeCard);
}

function removeIngredient(ref, tag){
    let parent = ref.parentNode.parentNode;
    parent.removeChild(ref.parentNode);
    let index = tags.indexOf(tag);
    tags.splice(index, 1)
}

//Favorites Function

let favoritesContainer = document.querySelector('favorites-container');

let savedRecipe = document.createElement('div');
savedRecipe.setAttribute('class', 'saved-recipe card mb-3');
savedRecipe.innerHTML = `
    <div class="row g-0">
        <div class="col-5 col-sm-5">
            <img src="img/logo.png" class="img-fluid rounded-start h-100">
        </div>
        <div class="col-7 col-sm-7">
            <div class="card-body">
                <h5 class="card-title">Recipe Name</h5>
                <p class="card-text">Rating: # <i class="fas fa-star"></i><br> Favorite By: # <i class="fas fa-users"></i></p>
                <a href="./recipe.html" class="card-text"><small class="text-muted">Tap to check recipe</small></a>
            </div>
        </div>
    </div>
`;

    // noRecipeContainer.style.display = "none";
    // recipeContainer.classList.remove('position-relative');
