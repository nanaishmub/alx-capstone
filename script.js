document.addEventListener('DOMContentLoaded', function(){

let savedRecipes = [];
let currentRecipes = [];

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const navSearch = document.getElementById('search-bar');
const recipesContainer = document.getElementById('recipesContainer');

searchBtn.addEventListener('click', searchRecipes);
searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') searchRecipes();
});

navSearch.addEventListener('keypress', (e) => {
    if(e.key === 'Enter'){
        searchInput.value = navSearch.value;
        showPage('catalogue');
        searchRecipes();
    }
});

function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    document.getElementById(pageId).classList.add('active');
}

async function searchRecipes() {
    const searchValue = searchInput.value.trim();
    if (!searchValue) {
        alert('Please enter a term');
        return;
    }
    
    const option = document.querySelector('input[name="option"]:checked');
    let apiSearch;

    if(option === 'name') {
        apiSearch = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";
    } else {
        apiSearch = "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    }
    try{
        const response = await fetch(apiSearch);
        if (!response.ok){
            throw new Error('No respnse');
        }
        const data = await response.json();

        if (data.meals) {
            currentRecipes = data.meals;
            displayRecipes(data.meals);
        } else {
            recipesContainer.innerHTML = `
            <div class="error-message">
                <p>No recipes found! please try again</p>
            </div>
            `;
        }
    } catch (error) {
        recipesContainer.innerHTML = `
            <div class="error-message">
                <h3>404!</h3>
                <p>No recipes found! please try again</p>
            </div>
            `;
        console.error('Search error: ', error);
    }

    
    function displayRecipes(recipes) {
        recipesContainer.innerHTML = '';

        recipes.forEach(recipe => {
            const isSaved = savedRecipes.some(saved => saved.idMeal === recipe.idMeal);

            const recipeCard = document.createElement('div');
            recipeCard.className ='recipe-card';

            recipeCard.innerHTML = `
            <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}" loading="lazy">
            <div class="recipe-card-content">
                <h3>${recipe.strMeal}</h3>
            <p>${recipe.strArea ? `${recipe.strArea} Cuisine`: 'Delicious Recipe'}</p>
            <p><strong>Category: </strong> ${recipe.strCategory || 'Main Course'}</p>
            <div class ="recipe-actions">
                <button class="btn btn-primary" onclick="viewRecipeDetail('${recipe.idMeal}')">
                    View Recipe
                    <button>
                <button class="btn btn-secondary" onclick="toggleSaveRecipe('${recipe.idMeal}')">
                                ${isSaved ? '❤️ Saved' : '🤍 Save'}
                            </button>
                        </div>
                    </div>
                `;
                
                recipesContainer.appendChild(recipeCard);
            });
        }
            
        
        })
    }

})