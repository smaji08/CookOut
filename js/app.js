$(document).foundation();

//Create Category Dropdown
$.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    type: "GET",
    success: function(response){
        response.categories.forEach((item) => {
            let category = item.strCategory;
            let option = $("<option>", {"value": category}).text(category);
            $("#categories").append(option);
        })
    }
});

//Create Region Dropdown
$.ajax({
    url: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    type: "GET",
    success: function(response){
        response.meals.forEach((item) => {
            let region = item.strArea;
            let option = $("<option>", {"value": region}).text(region);
            $("#region").append(option);
        })
    }
})

//Create Recipe Card Function
function createRecipeCards(response, searchTerm){
    if (response.meals.length > 0){
        $("#main-content").empty();
        $("#main-title").text(searchTerm + " Recipes");
        response.meals.forEach((item) => {
            let container = $("<div>", {"class": "cell medium-6 large-4 xxlarge-3"});
            let card = $("<div>", {"class": "radius bordered card e-card"});
            let cardSection = $("<div>", {"class": "card-section"});
            let id = item.idMeal;
            let img = $("<img>", {"src": item.strMealThumb, "alt": item.strMeal, "class": "recipeBoxImg", "data-open": "imgModal"});
            let divider = $("<div>", {"class": "card-divider card-mealname"}).text(item.strMeal);
            let btnContainer = $("<div>", {"class": "grid-x grid-padding-x"})
            let button = $("<button>", {"class": "cell auto button rounded alert getRecipe getRecipeId display-block", "id": id}).text("View Recipe");
            let bookmark = $("<i>", {"id": id, 
                                    "class": "far fa-bookmark recipe-bookmark cell auto align-self-middle text-right",
                                    "data-imgURL": item.strMealThumb,
                                    "data-mealName": item.strMeal});
            $("#main-content").append(container);
            container.append(card);
            card.append(img, divider, cardSection);
            cardSection.append(btnContainer);
            btnContainer.append(button, bookmark);
        });
    }
}

//Recipes by Meal Name Search
$("#btnRecipeByMealName").on("click", function(event){
    event.preventDefault();
    let mealName = $("#recipeByMealName").val().trim();
    
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName,
        type: "GET",
        success: function(response){
            createRecipeCards(response, mealName);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Recipes Found");
        }
    });
});

//Recipes by multi Ingredients search
$("#btnRecipeByIngredients").on("click", function(event){
    event.preventDefault();
    let mainIngredients = $("#recipeByIngredients").val().trim();
    mainIngredients = mainIngredients.replace(/\s/g,'');
    $.ajax({
        url: "https://www.themealdb.com/api/json/v2/9973533/filter.php?i=" + mainIngredients,
        type: "GET",
        success: function(response){
            createRecipeCards(response, mainIngredients);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Recipes Found");
        }
    });
});

//Populate Regional Recipes
$("#regionBtn").on("click", function(event){
    event.preventDefault();
    let region = $("#region").val();
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + region,
        type: "GET",
        success: function(response){
            createRecipeCards(response, region);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Recipes Found");
        }
    });
});

//Populate Category Recipes
$("#categoryBtn").on("click", function(event){
    queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c="
    let category = $("#categories").val();
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category,
        type: "GET",
        success: function(response){
            createRecipeCards(response, category);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Recipes Found");
        }
    });
});

$("#heroSearch").on("click", function(e){
    e.preventDefault();
    randomCategory();
});

//Random Category
function randomCategory(){
    let cats = ["Beef", "Chicken", "Dessert", "Lamb", "Pasta", "Pork", "Seafood", "Side", "Starter", "Vegan", "Vegetarian", "Breakfast"]
    let randomCat = cats[Math.floor(Math.random()*cats.length)];
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + randomCat,
        type: "GET",
        success: function(response){
            createRecipeCards(response, randomCat);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Recipes Found");
        }
    });
}