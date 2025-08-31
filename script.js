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

