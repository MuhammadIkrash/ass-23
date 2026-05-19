const container = document.getElementById('recipe-details');

// Get recipe ID from URL
const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');

if (!recipeId) {
  container.innerHTML = '<h2>Recipe not found.</h2>';
} else {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      renderRecipe(meal);
    })
    .catch(() => {
      container.innerHTML = '<h2>Failed to load recipe details.</h2>';
    });
}

function renderRecipe(meal) {
  // Collect ingredients
  let ingredients = '';

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients += `
        <li class="list-group-item">
          ${measure} ${ingredient}
        </li>
      `;
    }
  }

  container.innerHTML = `
    <div class="row g-5 align-items-start">
      <div class="col-lg-5">
        <img
          src="${meal.strMealThumb}"
          alt="${meal.strMeal}"
          class="img-fluid rounded shadow"
        />
      </div>

      <div class="col-lg-7">
        <span class="badge bg-warning text-dark mb-3 fs-6">
          ${meal.strCategory}
        </span>

        <h1 class="fw-bold mb-3">${meal.strMeal}</h1>

        <p><strong>Area:</strong> ${meal.strArea}</p>

        <h3 class="mt-4">Ingredients</h3>
        <ul class="list-group mb-4">
          ${ingredients}
        </ul>

        <h3>Instructions</h3>
        <p style="line-height: 1.8; white-space: pre-line;">
          ${meal.strInstructions}
        </p>

        ${
          meal.strYoutube
            ? `
          <a
            href="${meal.strYoutube}"
            target="_blank"
            class="btn btn-danger mt-4"
          >
            Watch on YouTube
          </a>
        `
            : ''
        }
      </div>
    </div>
  `;
}