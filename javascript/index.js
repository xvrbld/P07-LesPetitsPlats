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
            if (ingredient.unit) {
                unit = ingredient.unit;
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

// Remplir les dropdowns avec les datas du json
function fillDropdowns(recipes) {
    recipes.map(recipe => {
        /*const dropdown = document.querySelector(".dropdownOpen");
        dropdown.innerHTML = "";
        let allingredientsHTML = "";*/
        recipe.ingredients.map(ingredient => {
            allIngredients.push(ingredient.ingredient)

            /*const ingredientsHTML = `<div class="dropdownIngredients">
            <input type="text" placeholder="Rechercher un ingrédient" />
            <svg class="arrowUp" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.88 10.5466L8 4.43996L14.12 10.5466L16 8.66663L8 0.66663L1.64355e-07 8.66663L1.88 10.5466Z" fill="white"/>
                </svg>
            <ul>
                <li>${allIngredients}</li>
            </ul>
    </div>`;
    allingredientsHTML = ingredientsHTML;*/

        })
        recipe.ustensils.map(ustensil => {
            allUstensils.push(ustensil)
        })

        
    })

    /*dropdown.innerHTML = allingredientsHTML + ingredientsHTML;*/

    console.log(allIngredients);
    console.log(allUstensils);
    console.log(allAppliances);
}

// Initialise les fonctions de remplissage
function init() {
    displayRecipes(recipes);
    fillDropdowns(recipes);
}

document.querySelector(".arrowDown").addEventListener("click", openDropdown);
document.querySelector(".arrowUp").addEventListener("click", closeDropdown);

/*document.querySelectorAll('.arrowDown').forEach(el => {
    el.addEventListener('click', () => {
        console.log(el);
    });
});*/

/*document.querySelectorAll('.arrowDown').forEach(el => {
    el.addEventListener('click', (openDropdown) => {
        openDropdown.target.style.display = "block";
        console.log(openDropdown);
    });
});*/

function openDropdown() {
    document.querySelector(".dropdownOpen").style.display = "block";
    document.querySelector(".dropdownClosed").style.display = "none";
}

function closeDropdown() {
    document.querySelector(".dropdownOpen").style.display = "none";
    document.querySelector(".dropdownClosed").style.display = "block";
}

// Supprime les filtres un à un
function closeFilter(el) {
    el.parentNode.remove();
}

init();