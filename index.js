let Btn = document.getElementById('search-btns');
let containerBox = document.getElementById('container');

Btn.addEventListener('click', (e) => {
  e.preventDefault();
  getResVal();
});

// Optional: Load default recipes on page load
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('myInput').value = 'pizza';
  getResVal();
});

function getResVal() {
  let SearchInput = document
    .getElementById('myInput')
    .value
    .trim()
    .toLowerCase();

  if (!SearchInput) {
    containerBox.innerHTML =
      '<div class="col-12 text-center"><h3>Please enter a recipe name</h3></div>';
    return;
  }

  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${SearchInput}`)
    .then(response => response.json())
    .then(data => {
      cart(data.meals);
    })
    .catch(err => {
      console.log(err);
      containerBox.innerHTML =
        '<div class="col-12 text-center"><h3>Something went wrong.</h3></div>';
    });
}

function cart(meals) {
  if (!meals) {
    containerBox.innerHTML =
      '<div class="col-12 text-center"><h3>No Recipes Found</h3></div>';
    return;
  }

  let carts = '';

  meals.forEach(meal => {
    carts += `
      <div class="col-md-6 col-lg-4">
        <div class="recipe-card h-100" data-id="${meal.idMeal}">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
          <div class="card-content">
            <span class="recipe-tag">${meal.strCategory || 'Recipe'}</span>
            <h4>${meal.strMeal}</h4>
            <p>${meal.strArea || 'Delicious recipe'}</p>

            <a
              href="detail.html?id=${meal.idMeal}"
              class="btn btn-warning mt-3 w-100 fw-semibold"
            >
              View Details
            </a>
          </div>
        </div>
      </div>
    `;
  });

  containerBox.innerHTML = carts;
}