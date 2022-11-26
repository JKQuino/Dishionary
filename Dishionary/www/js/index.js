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
let addBtn = document.getElementById('addBtn')
let ingredientContainter = document.querySelector('.ingredient-containter');

let tags = [];

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

    console.log(tags)
}

function removeIngredient(ref, tag){
    let parent = ref.parentNode.parentNode;
    parent.removeChild(ref.parentNode);
    let index = tags.indexOf(tag);
    tags.splice(index, 1)

    console.log(tags);
}

addBtn.addEventListener('click', addIngredient);
