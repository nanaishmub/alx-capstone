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
    }
})