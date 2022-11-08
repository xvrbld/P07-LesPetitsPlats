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
        <dd>${quantity} ${unit}</dd>`;
        })
        const recipeHTML = `<div class="recipeCard">
        <div class="recipeImg"></div>
        <div class="recipeContent">
            <div class="recipeHeader">
                <div class="recipeTitle" data-type="titleType">
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
                <div class="recipeIngredients" data-type="ingredientsType">
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

// Ajouter un tag/filtre
function addTag(tag, type) {

    const filters = document.querySelector(".filters");
    const filtersSelected = document.querySelectorAll(".activeFilter");

    let alreadySelected = false;

    filtersSelected.forEach(filter => {
        if (filter.innerText == tag) {
            alreadySelected = true;
        }
    });

    if (alreadySelected) {
        alert('Déjà ajouté');
        return false;
    }

    const newTag = `<div class="activeFilter ${type}" data-type="${type}">
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
    algo();
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

// Ouvrir les dropdowns
function openDropdown(type) {
    closeDropdown();
    if (type == "ingredients") {
        document.querySelector(".dropdownOpenIngredients").style.display = "block";
        document.querySelector(".dropdownOpenAppliances").style.display = "none";
        document.querySelector(".dropdownOpenUstensils").style.display = "none";
        document.querySelector(".buttonIngredients").style.width = document.querySelector('.dropdownOpenIngredients').offsetWidth + "px";
    }

    if (type == "appliances") {
        document.querySelector(".dropdownOpenAppliances").style.display = "block";
        document.querySelector(".dropdownOpenIngredients").style.display = "none";
        document.querySelector(".dropdownOpenUstensils").style.display = "none";
        document.querySelector(".buttonAppliances").style.width = document.querySelector('.dropdownOpenAppliances').offsetWidth + "px";
    }

    if (type == "ustensils") {
        document.querySelector(".dropdownOpenUstensils").style.display = "block";
        document.querySelector(".dropdownOpenAppliances").style.display = "none";
        document.querySelector(".dropdownOpenIngredients").style.display = "none";
        document.querySelector(".buttonUstensils").style.width = document.querySelector('.dropdownOpenUstensils').offsetWidth + "px";
    }
}

// Fermer les dropdowns
function closeDropdown() {
    document.querySelectorAll(".dropdownOpen").forEach(dropdown => {
        dropdown.style.display = "none";

        if (window.innerWidth > 980) {
            document.querySelector('.buttonIngredients').style.width = 'auto';
            document.querySelector('.buttonAppliances').style.width = 'auto';
            document.querySelector('.buttonUstensils').style.width = 'auto';
        } else {
            document.querySelector('.buttonIngredients').style.width = '100%';
            document.querySelector('.buttonAppliances').style.width = '100%';
            document.querySelector('.buttonUstensils').style.width = '100%';
        }
    })
}

// Supprime les filtres un à un
function closeFilter(el) {
    el.parentNode.remove();
    algo();
}

// Autocomplete
function autoComplete(search, type) {
    let arrayToFilter = null;

    if (type == 'ingredient') {
        arrayToFilter = allIngredients
    }

    if (type == 'ustensil') {
        arrayToFilter = allUstensils
    }

    if (type == 'appliance') {
        arrayToFilter = allAppliances
    }

    return arrayToFilter.filter((value) => {
        const valueLowerCase = value.toLowerCase()
        const searchLowerCase = search.toLowerCase()

        return valueLowerCase.includes(searchLowerCase)
    })
}


const inputAutocomplete = document.querySelectorAll('.inputAutocomplete')

inputAutocomplete.forEach(el => {
    el.addEventListener('input', ({
        target
    }) => {
        const value = target.value;
        const type = target.dataset.type;
        const results = target.dataset.results;
        const clear = target.dataset.clear;
        if (value.length > 0) {
            if (clear == 'external') {
                document.querySelector(`.${results}`).style.display = 'block';
            }

            const autocompleteResults = autoComplete(value, type);
            let resultsHtml = "";
            autocompleteResults.map(result => {
                resultsHtml = resultsHtml + `<li onclick="addTag('${result}', '${type}')">${result}</li>`
            })

            document.querySelector(`.${results}`).innerHTML = resultsHtml;


        } else {
            if (clear == 'external') {
                document.querySelector(`.${results}`).style.display = 'none';

            }

            if (clear == 'internal') {
                fillDropdowns(recipes);
            }
        }
    });
});

const inputSearchbar = document.querySelector('.inputSearchbar');
inputSearchbar.addEventListener('input', ({
    target
}) => {
    algo();
})

function algo() {

    // On récupére les tags
    const filtersSelected = document.querySelectorAll(".activeFilter");
    const filters = [];

    // FOR EACH
    for (let a = 0; a < filtersSelected.length; a++) {
        filters.push({
            type: filtersSelected[a].dataset.type,
            text: filtersSelected[a].innerText
        })
    }

    // On récupére le champ de recherche
    const search = document.querySelector('.inputSearchbar').value;

    // Boucle recettes
    const recipesFiltered = [];

    // FOR EACH
    for (let b = 0; b < recipes.length; b++) {
        // Pour chaque recettes

        // FOR EACH
        const ingredient = [];
        for (let d = 0; d < recipes[b].ingredients.length; d++) {
            ingredient.push(recipes[b].ingredients[d].ingredient.toLowerCase())
        }

        let recipeHasAppliance = true;
        let recipeHasUstensil = true;
        let recipeHasIngredient = true;

        if (filters.length > 0) {

            // FOR EACH - .filter

            for (let c = 0; c < filters.length; c++) {
                // On vérifie les appareils
                if (filters[c].type == 'appliance') {
                    if (recipes[b].appliance.toLowerCase() != filters[c].text.toLowerCase()) {
                        recipeHasAppliance = false;
                    }
                }
                // On vérifie les ustensils
                if (filters[c].type == 'ustensil') {
                    if (!recipes[b].ustensils.includes(filters[c].text.toLowerCase())) {
                        recipeHasUstensil = false;
                    }
                }
                // On vérifie les ingredients
                if (filters[c].type == 'ingredient') {
                    if (!ingredient.includes(filters[c].text.toLowerCase())) {
                        recipeHasIngredient = false;
                    }
                }
            }
        }

        // Filtre par le texte
        let recipeHasSearch = true

        // Lancer la recherche si plus de 3 caractères
        if (search.length >= 3) {
            if (!recipes[b].name.toLowerCase().includes(search.toLowerCase()) && !recipes[b].description.toLowerCase().includes(search.toLowerCase()) && !ingredient.includes(search.toLowerCase())) {
                recipeHasSearch = false;


            }
        }

        if (recipeHasAppliance && recipeHasUstensil && recipeHasIngredient && recipeHasSearch) {
            recipesFiltered.push(recipes[b])
        }
    }

    // Si le nombre de recettes = 0 écrire message rien de trouvé sinon displayRecipes

    if (recipesFiltered == 0) {
        document.querySelector('.noRecipes').style.display = "flex";
    } else {
        document.querySelector('.noRecipes').style.display = "none";
    }

    displayRecipes(recipesFiltered);
}

init();

//test