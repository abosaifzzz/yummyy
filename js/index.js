let searchInput = document.getElementById("name-search");
let firstLetter = document.getElementById("firstLetter");
//window reload
$(window).on("load", function () {
  $(".loading").fadeOut(1000, function () {
    $(".loader").fadeOut(1000);
  });
});

// search button
document.getElementById("search").addEventListener("click", function () {
  document.getElementById("mainMeals").classList.add("d-none");
  document.getElementById("meal-details").classList.add("d-none");
  document.getElementById("categories").classList.add("d-none"); //mainIngredient
  document.getElementById("areas").classList.add("d-none");
  document.getElementById("mainIngredient").classList.add("d-none");

  document.getElementById("search-page").classList.remove("d-none");
  closeBar();
});
// categories button

document.getElementById("category").addEventListener("click", function () {
  document.getElementById("mainMeals").classList.add("d-none");
  document.getElementById("meal-details").classList.add("d-none");
  document.getElementById("search-page").classList.add("d-none");
  document.getElementById("areas").classList.add("d-none");
  document.getElementById("mainArea").classList.add("d-none");
  document.getElementById("mainIngredient").classList.add("d-none");

  document.getElementById("categories").classList.remove("d-none");
  closeBar();
});
// area button

document.getElementById("area").addEventListener("click", function () {
  document.getElementById("mainMeals").classList.add("d-none");
  document.getElementById("meal-details").classList.add("d-none");
  document.getElementById("search-page").classList.add("d-none");
  document.getElementById("mainIngredient").classList.add("d-none");

  document.getElementById("categories").classList.add("d-none");
  document.getElementById("areas").classList.remove("d-none");

  closeBar();
});

// ingredients button

document.getElementById("ingredient").addEventListener("click", function () {
  document.getElementById("mainMeals").classList.add("d-none");
  document.getElementById("meal-details").classList.add("d-none");
  document.getElementById("search-page").classList.add("d-none");
  document.getElementById("categories").classList.add("d-none");
  document.getElementById("areas").classList.add("d-none");
  document.getElementById("mainIngredient").classList.add("d-none");

  document.getElementById("ingredients").classList.remove("d-none");

  closeBar();
});

// close meal details button

document.getElementById("closeMeal").addEventListener("click", function () {
  document.getElementById("mainMeals").classList.remove("d-none");
  document.getElementById("meal-details").classList.add("d-none");
  document.getElementById("search-page").classList.add("d-none");
});

//Menu Open
$(".fa-bars").on("click", function () {
  $(".bar-data").animate({ width: "toggle" }, 500);

  $(".fa-x").removeClass("d-none");
  $(".fa-bars").addClass("d-none");
  $(".top-data ul li").addClass("bounceInUp", 3000);
  $(".top-data ul").removeClass("bounceOutLeft");
  if ($(".fixed-bar").css("z-index") == "0") {
    $(".fixed-bar").css("z-index", 100);
  } else {
    $(".fixed-bar").css("z-index", 0);
  }
});

//menu close
$(".fa-x").on("click", closeBar);
function closeBar() {
  $(".bar-data").animate({ width: "toggle" }, 500);
  $(".top-data ul li").removeClass("bounceInUp", 3000);
  $(".fa-bars").removeClass("d-none");
  $(".fa-x").addClass("d-none");
  $(".top-data ul").addClass("bounceOutLeft");
  setTimeout(function () {
    if ($(".fixed-bar").css("z-index") == "100") {
      $(".fixed-bar").css("z-index", 0);
    } else {
      $(".fixed-bar").css("z-index", 100);
    }
  }, 1000);
}
// get Main Meals

let data = [];
async function getMainMeals() {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  data = await response.json();
  console.log(data);
  displayMainMeals(data);
}
getMainMeals();
// display Main Meals

function displayMainMeals(data) {
  let cartoona = "";
  let meals = data.meals;
  for (let i = 0; i < meals.length; i++) {
    cartoona += `        <div class=" meal-card rounded-2 col-sm-12 col-md-6 col-lg-3"   data-index="${i}">
                <img class="w-100 rounded-2" src="${data.meals[i].strMealThumb}" alt="">
                <div class="meal-overlay">
                    <h2>${data.meals[i].strMeal}</h2>

                </div>
            </div>`;
  }

  document.getElementById("mainMeals").innerHTML = cartoona;

  // get meal details by click
  const allMeals = document.querySelectorAll(".meal-card");
  allMeals.forEach((meal) => {
    meal.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      let mealId = meals[index].idMeal;
      document.getElementById("mainMeals").classList.add("d-none");
      document.getElementById("meal-details").classList.remove("d-none");

      console.log(mealId);
      getMealDetails(mealId);
    });
  });
}
// get meal details data
async function getMealDetails(mealId) {
  const response2 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  mealDetails = await response2.json();
  // console.log(mealDetails);
  displayMealDetails(mealDetails);
}
getMealDetails();
let cartoona2 = "";
// display meal details data

function displayMealDetails(mealDetails) {
  // let meals = mealDetails.meals;
  // console.log(meals);
  const meal = mealDetails.meals[0];

  cartoona2 = `       <div class="meal-img-lg ">

                                    <img src="${meal.strMealThumb}" alt="">

                                </div>
                                <div class="meal-types pt-2">
                                    <div class="meal-name-lg">
                                        Instructions

                                    </div>


                                    <div class="meal-desc-lg">

                                  ${meal.strInstructions}
                                   
                                    </div>
                                    <div class="meal-details-lg pt-3">
                                        <h3>Area: <span>${
                                          meal.strArea
                                        }</span></h3>
                                        <h3>Category: <span>${
                                          meal.strCategory
                                        }</span></h3>

                                    </div>
                                    <div class="recipes d-sm-block d-md-flex d-lg-flex d-xl-flex">
                                        <h3>Recipes:</h3>
                                        <div class="d-flex ps-2  flex-wrap w-100 ">
                                            ${Object.keys(meal)
                                              .filter(
                                                (key) =>
                                                  key.startsWith(
                                                    "strIngredient"
                                                  ) && meal[key]
                                              )
                                              .map(
                                                (key) => `
                                        <div class="recipe mt-2 me-2">${meal[key]}</div>
                                                            `
                                              )
                                              .join("")}
                                        
                                   
                                        </div>
                                    </div>
                                    <div class="tags pt-3 d-sm-block d-md-flex d-lg-flex d-xl-flex">
                                        <h3>Tags:</h3>
                                        <div class="d-flex ps-2  flex-wrap w-100 ">
                                            ${
                                              meal.strTags
                                                ? meal.strTags
                                                    .split(",")
                                                    .map(
                                                      (tag) => `
                        <div class="tag mt-2 me-2">${tag}</div>
                    `
                                                    )
                                                    .join("")
                                                : ""
                                            }
                                          
                                        </div>
                                    </div>
                                    <div class="sources pt-3 d-sm-block d-md-flex d-lg-flex d-xl-flex">
                                        <div class="d-flex ps-2  flex-wrap w-100 ">

                                          ${
                                            meal.strSource
                                              ? `
                        <div class="source mt-2 me-2">
                            <a href="${meal.strSource}" target="_blank">Source</a>
                        </div>
                    `
                                              : ""
                                          }
                    ${
                      meal.strYoutube
                        ? `
                        <div class="youtube mt-2 me-2">
                            <a href="${meal.strYoutube}" target="_blank">YouTube</a>
                        </div>
                    `
                        : ""
                    }
                                    </div>
                                </div>
                            </div>`;
  document.getElementById("meal-data").innerHTML = cartoona2;
}
// search input function
searchInput.addEventListener("input", function () {
  console.log(searchInput.value);
  let mealName = searchInput.value;
  getSearchMeal(mealName);
});
// get search meal
async function getSearchMeal(mealName) {
  const response3 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}
`
  );
  mealSearch = await response3.json();
  console.log(mealSearch);
  displaySearchMeal(mealSearch);
}

//display search meal
function displaySearchMeal(mealSearch) {
  let cartoona3 = "";
  let result = mealSearch.meals;
  console.log(result);
  for (let i = 0; i < result.length; i++) {
    cartoona3 += `        <div class=" meal-card rounded-2 col-sm-12 col-md-6 col-lg-3"   data-index="${i}">
                <img class="w-100 rounded-2" src="${result[i].strMealThumb}" alt="">
                <div class="meal-overlay">
                    <h2>${result[i].strMeal}</h2>

                </div>
            </div>`;
  }
  document.getElementById("search-meals").innerHTML = cartoona3;

  // get meal details by click
  const allMeals = document.querySelectorAll(".meal-card");
  allMeals.forEach((meal) => {
    meal.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      let mealId = result[index].idMeal;
      document.getElementById("search-page").classList.add("d-none");
      document.getElementById("meal-details").classList.remove("d-none");
      console.log(mealId);
      getMealDetails(mealId);
    });
  });
}
/////////////////////////////////////////////
// first letter Searcg
firstLetter.addEventListener("input", function () {
  console.log(firstLetter.value);
  let mealLetter = firstLetter.value;
  getMealLetter(mealLetter);
});
// get first letter meal

async function getMealLetter(mealLetter) {
  const response4 = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealLetter}
`
  );
  mealLetter = await response4.json();
  console.log(mealLetter);
  displayMealLetter(mealLetter);
}
// display first letter meal

function displayMealLetter(mealLetter) {
  let cartoona4 = "";
  let result2 = mealLetter.meals;
  console.log(result2);
  for (let i = 0; i < result2.length; i++) {
    cartoona4 += `        <div class=" meal-card rounded-2 col-sm-12 col-md-6 col-lg-3"   data-index="${i}">
                <img class="w-100 rounded-2" src="${result2[i].strMealThumb}" alt="">
                <div class="meal-overlay">
                    <h2>${result2[i].strMeal}</h2>

                </div>
            </div>`;
  }
  document.getElementById("search-meals").innerHTML = cartoona4;

  const allMeals = document.querySelectorAll(".meal-card");
  allMeals.forEach((meal) => {
    meal.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      let mealId = result2[index].idMeal;
      document.getElementById("search-page").classList.add("d-none");

      document.getElementById("meal-details").classList.remove("d-none");
      document.getElementById("search-page").classList.add("d-none");
      console.log(mealId);
      getMealDetails(mealId);
    });
  });
}

// get categories
async function getCategories() {
  const categories = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php"
  );
  data = await categories.json();
  // console.log(data);
  displayCategories(data);
}
getCategories();

// display categories

function displayCategories(data) {
  let cartoona5 = "";
  let categories = data.categories;
  for (let i = 0; i < categories.length; i++) {
    cartoona5 += `        <div class=" category-card rounded-2 col-sm-12 col-md-6 col-lg-3"   category-index="${i}">
                <img class="w-100 rounded-2" src="${categories[i].strCategoryThumb}" alt="">
                <div class="category-overlay">
                    <h2>${categories[i].strCategory}</h2>

                </div>
            </div>`;
  }

  document.getElementById("categories").innerHTML = cartoona5;
  const categoryCards = document.getElementsByClassName("category-card");
  for (let card of categoryCards) {
    card.addEventListener("click", function () {
      let categoryIndex = this.getAttribute("category-index");
      let categoryName = categories[categoryIndex].strCategory;
      console.log("Category name:", categoryName);
      document.getElementById("categories").classList.add("d-none");
      document.getElementById("mainCategory").classList.remove("d-none");

      // You can do additional processing here with the category ID
      getCategoryDetails(categoryName);
    });
  }
}

// get category details
async function getCategoryDetails(categoryName) {
  const category = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`
  );
  data = await category.json();
  console.log(data);
  displayCategoryMeals(data);
}

//display category meals

function displayCategoryMeals(data) {
  let cartoona6 = "";
  let meals = data.meals;
  for (let i = 0; i < meals.length; i++) {
    cartoona6 += `        <div class=" meal-card rounded-2 col-sm-12 col-md-6 col-lg-3"   data-index="${i}">
                <img class="w-100 rounded-2" src="${data.meals[i].strMealThumb}" alt="">
                <div class="meal-overlay">
                    <h2>${data.meals[i].strMeal}</h2>

                </div>
            </div>`;
  }

  document.getElementById("mainCategory").innerHTML = cartoona6;

  // get meal details by click
  const allMeals = document.querySelectorAll(".meal-card");
  allMeals.forEach((meal) => {
    meal.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      let mealId = meals[index].idMeal;
      document.getElementById("mainCategory").classList.add("d-none");
      document.getElementById("meal-details").classList.remove("d-none");
      document.getElementById("mainArea").classList.add("d-none");

      console.log(mealId);
      getMealDetails(mealId);
    });
  });
}

// get areas

async function getAreas() {
  const areas = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  data = await areas.json();
  console.log(data);
  displayAreas(data);
}
getAreas();

// display areas

function displayAreas(data) {
  let cartoona7 = "";
  let meals = data.meals;
  for (let i = 0; i < meals.length; i++) {
    cartoona7 += `         <div class=" area-card rounded-2 col-sm-6 col-md-3 col-lg-2"  data-index="${i}" >
                <img class="w-100 rounded-2" src="/CSS/assets/world.png" alt="">
                <div class="area-overlay">
                    <h2>${data.meals[i].strArea}</h2>

                </div>
            </div>`;
  }

  document.getElementById("areas").innerHTML = cartoona7;

  // get area details by click
  const allAreas = document.querySelectorAll(".area-card");
  allAreas.forEach((area) => {
    area.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      let areaName = meals[index].strArea;
      document.getElementById("areas").classList.add("d-none");
      document.getElementById("mainArea").classList.remove("d-none");

      console.log(areaName);
      getArea(areaName);
    });
  });
}

// get area details
async function getArea(areaName) {
  const area = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`
  );
  data = await area.json();
  console.log(data);
  displayAreaMeals(data);
}

//display area meals

function displayAreaMeals(data) {
  let cartoona8 = "";
  let meals = data.meals;
  for (let i = 0; i < meals.length; i++) {
    cartoona8 += `        <div class=" meal-card rounded-2 col-sm-12 col-md-6 col-lg-3"   data-index="${i}">
                <img class="w-100 rounded-2" src="${data.meals[i].strMealThumb}" alt="">
                <div class="meal-overlay">
                    <h2>${data.meals[i].strMeal}</h2>

                </div>
            </div>`;
  }

  document.getElementById("mainArea").innerHTML = cartoona8;

  // get meal details by click
  const allMeals = document.querySelectorAll(".meal-card");
  allMeals.forEach((meal) => {
    meal.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      let mealId = meals[index].idMeal;
      document.getElementById("mainArea").classList.add("d-none");
      document.getElementById("meal-details").classList.remove("d-none");

      console.log(mealId);
      getMealDetails(mealId);
    });
  });
}

//get ingredients

async function getIngredients() {
  const ingredients = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  data = await ingredients.json();
  console.log(data);
  displayIngredients(data);
}
getIngredients();

// display ingredients

function displayIngredients(data) {
  let cartoona9 = "";
  let meals = data.meals;
  for (let i = 0; i < meals.length - 400; i++) {
    cartoona9 += `       <div class=" ingredients-card rounded-2 col-sm-6 col-md-3 col-lg-2" data-index="${i}">
                <img class="w-100 rounded-2"
                    src="/CSS/assets/pizza-concept-with-food-and-cooking-ingredients-in-circle-shape-vector-illustration-2EAXN6F_prev_ui.png"
                    alt="">
                <div class="ingredients-overlay">
                    <h2>${meals[i].strIngredient.substring(0, 20)}</h2>
                

                </div>

            </div> 
            `;
  }

  document.getElementById("ingredients").innerHTML = cartoona9;

  // get ingredient details by click
  const allIngredients = document.querySelectorAll(".ingredients-card");
  allIngredients.forEach((ingredient) => {
    ingredient.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      let ingredientName = meals[index].strIngredient;
      document.getElementById("ingredients").classList.add("d-none");
      document.getElementById("mainIngredient").classList.remove("d-none");

      console.log(ingredientName);
      getIngredientDetails(ingredientName);
    });
  });
}

// get ingredient details

async function getIngredientDetails(ingredientName) {
  const ingredients = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredientName}`
  );
  data = await ingredients.json();
  console.log(data);
  displayIngredientDetails(data);
}

// display ingredient details

function displayIngredientDetails(data) {
  let cartoona10 = "";
  let meals = data.meals;
  for (let i = 0; i < meals.length; i++) {
    cartoona10 += `        <div class=" meal-card rounded-2 col-sm-12 col-md-6 col-lg-3"   data-index="${i}">
                <img class="w-100 rounded-2" src="${data.meals[i].strMealThumb}" alt="">
                <div class="meal-overlay">
                    <h2>${data.meals[i].strMeal}</h2>

                </div>
            </div>`;
  }

  document.getElementById("mainIngredient").innerHTML = cartoona10;

  // get meal details by click
  const allMeals = document.querySelectorAll(".meal-card");
  allMeals.forEach((meal) => {
    meal.addEventListener("click", function () {
      const index = this.getAttribute("data-index");
      let mealId = meals[index].idMeal;
      document.getElementById("mainIngredient").classList.add("d-none");
      document.getElementById("meal-details").classList.remove("d-none");

      console.log(mealId);
      getMealDetails(mealId);
    });
  });
}
