let Btn = document.getElementById('search-btns');
let containerBox = document.getElementById('container');

Btn.addEventListener('click', getResVal);

function getResVal() {
    let SearchInput = document.getElementById('myInput').value.trim().toLowerCase();

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchInput}`)
        .then(response => response.json())
        .then(data => {
            cart(data.meals);
        })
        .catch(err => console.log(err));
}

function cart(meals) {

    // if no results
    if (!meals) {
        containerBox.innerHTML = "<h3>No Recipes Found</h3>";
        return;
    }

    let carts = "";

    meals.forEach(meal => {
        carts += `
        <div class="col-md-6 col-lg-4">
          <div class="recipe-card" data-id="${meal.idMeal}">
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <div class="card-content">
              <span class="recipe-tag">${meal.strMeal}</span>
              <h4>${meal.strMeal}</h4>
              <p>${meal.strArea || "Delicious recipe"}</p>
            </div>
          </div>
        </div>
        `;
    });

    containerBox.innerHTML = carts;
}

Btn.addEventListener('click', (e) => {
    e.preventDefault();
    getResVal();
});