let savedRecipes = [];
let currentRecipes = [];

const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const navSearch = document.getElementById('search-bar');
const recipesContainer = document.getElementById('recipesContainer');

searchBtn.addEventListener('click', searchRecipes);
searchBtn.inputMode.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') searchRecipes();
});

navSearchInput.addEventListener('keypress', (e) => {
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
    
    const option = document.querySelector('input[name="option"]');
    let apiSearch;

    if(searchType === 'Recipe Name') {
        apiSearch = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";
    } else {
        apiSearch = "www.themealdb.com/api/json/v1/1/list.php?c=list"
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
                <p>No recipes found! please try again</p>
            </div>
            `;
        console.error('Search error: ', error);
    }

}    