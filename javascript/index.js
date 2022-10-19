var allIngredients = [];
var allUstensils = [];
var allAppliances = [];

// Remplir le HTML de la grille de menus avec les datas json
function displayRecipes(recipes) {
    const grid = document.querySelector(".recipeGrid");
    grid.innerHTML = "";
    let recipesHTML = "";
    recipes.map((recipe) => {
        let ingredientHTML = "";
        recipe.ingredients.map(ingredient => {
            let unit = "";
            let quantity = "";
            if (ingredient.unit) {
                unit = ingredient.unit;
            }

            if (ingredient.quantity) {
                quantity = ingredient.quantity;
            }

            ingredientHTML = ingredientHTML + `<dt>${ingredient.ingredient}</dt>
        <dd>${ingredient.quantity} ${unit}</dd>`;
        })
        const recipeHTML = `<div class="recipeCard">
        <div class="recipeImg"></div>
        <div class="recipeContent">
            <div class="recipeHeader">
                <div class="recipeTitle">
                    <h2>${recipe.name}</h2>
                </div>
                <div class="recipeTime">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10 0C4.5 0 0 4.5 0 10C0 15.5 4.5 20 10 20C15.5 20 20 15.5 20 10C20 4.5 15.5 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10.5 5H9V11L14.2 14.2L15 12.9L10.5 10.2V5Z"
                            fill="black" />
                    </svg>
                    <h3>${recipe.time} min</h3>
                </div>
            </div>
            <div class="recipeText">
                <div class="recipeIngredients">
                    <dl>
                        ${ingredientHTML}
                    </dl>
                </div>
                <div class="recipeInstructions">
                    <p>${recipe.description}</p>
                </div>
            </div>
        </div>
    </div>`;
        recipesHTML = recipesHTML + recipeHTML;
    });
    grid.innerHTML = recipesHTML;
}

function addTag(tag, type) {

    const filters = document.querySelector(".filters");

    const newTag = `<div class="activeFilter ${type}">
    ${tag}
    <button type="button" class="closeFilter" onclick="closeFilter(this)">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12.59 6L10 8.59L7.41 6L6 7.41L8.59 10L6 12.59L7.41 14L10 11.41L12.59 14L14 12.59L11.41 10L14 7.41L12.59 6ZM10 0C4.47 0 0 4.47 0 10C0 15.53 4.47 20 10 20C15.53 20 20 15.53 20 10C20 4.47 15.53 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
                fill="white" />
        </svg>
    </button>

</div>`

    filters.innerHTML = filters.innerHTML + newTag;
}

// Remplir les dropdowns avec les datas du json
function fillDropdowns(recipes) {

    // Remplir ingrédients / ustensiles / appareils
    recipes.map(recipe => {
        recipe.ingredients.map(ingredient => {
            allIngredients.push(ingredient.ingredient.toLowerCase())
        })
        recipe.ustensils.map(ustensil => {
            allUstensils.push(ustensil.toLowerCase())
        })
        allAppliances.push(recipe.appliance.toLowerCase())
    })

    // Supprimer les doublons
    allIngredients = [...new Set(allIngredients)];
    allUstensils = [...new Set(allUstensils)];
    allAppliances = [...new Set(allAppliances)];

    // Remplir les dropdowns
    const listIngredients = document.querySelector(".allIngredients");
    let allIngredientsHTML = "";
    allIngredients.map(ingredient => {
        allIngredientsHTML = allIngredientsHTML + `<li onclick="addTag('${ingredient}', 'ingredient')">${ingredient}</li>`
    })

    listIngredients.innerHTML = allIngredientsHTML;

    const listAppliances = document.querySelector(".allAppliances");
    let allAppliancesHTML = "";
    allAppliances.map(appliance => {
        allAppliancesHTML = allAppliancesHTML + `<li onclick="addTag('${appliance}', 'appliance')">${appliance}</li>`
    })

    listAppliances.innerHTML = allAppliancesHTML;

    const listUstensils = document.querySelector(".allUstensils");
    let allUstensilsHTML = "";
    allUstensils.map(ustensil => {
        allUstensilsHTML = allUstensilsHTML + `<li onclick="addTag('${ustensil}', 'ustensil')">${ustensil}</li>`
    })

    listUstensils.innerHTML = allUstensilsHTML;
}

// Initialise les fonctions de remplissage
function init() {
    displayRecipes(recipes);
    fillDropdowns(recipes);
}

function openDropdown(type) {

    if (type == "ingredients") {
        document.querySelector(".dropdownOpenIngredients").style.display = "block";
    }

    if (type == "appliances") {
        document.querySelector(".dropdownOpenAppliances").style.display = "block";
    }

    if (type == "ustensils") {
        document.querySelector(".dropdownOpenUstensils").style.display = "block";
    }
}

function closeDropdown() {
    document.querySelectorAll(".dropdownOpen").forEach(dropdown => {
        dropdown.style.display = "none";
    })
}

// Supprime les filtres un à un
function closeFilter(el) {
    el.parentNode.remove();
}


// Autocomplete
// variables
var input = document.querySelector('.inputIngredients');
var results;

// functions
function autocomplete(val) {
  var allIngredientsReturn = [];

  for (i = 0; i < allIngredients.length; i++) {
    if (val === allIngredients[i].slice(0, val.length)) {
        allIngredientsReturn.push(allIngredients[i]);
    }
  }

  return allIngredientsReturn;
}

// events
input.onkeyup = function(e) {
  inputVal = this.value; // updates the variable on each ocurrence

  if (inputVal.length > 0) {
    var allIngredientsToShow = [];

    autocompleteResults = document.querySelector(".autocompleteResults");
    autocompleteResults.innerHTML = '';
    allIngredientsToShow = autocomplete(inputVal);
    
    for (i = 0; i < allIngredientsToShow.length; i++) {
        autocompleteResults.innerHTML += '<li>' + allIngredientsToShow[i] + '</li>';

    }
    autocompleteResults.style.display = 'block';
    document.querySelector(".allIngredients").style.display = "none";
  } else {
    allIngredientsToShow = [];
    autocompleteResults.innerHTML = '';
    document.querySelector(".allIngredients").style.display = "block";
  }
}

init();