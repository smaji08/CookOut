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

//Populate Regional Recipes
$("#regionBtn").on("click", function(event){
    event.preventDefault();
    $("#main-content").empty();
    let region = $("#region").val();
    console.log(region);
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + region,
        type: "GET",
        success: function(response){
            $("#main-title").text(region + " Recipes");
            response.meals.forEach((item) => {
                let meal = item.strMeal;
                console.log(meal);
                let container = $("<div>", {"class": "cell medium-4"});
                let card = $("<div>", {"class": "radius bordered card"});
                let cardSection = $("<div>", {"class": "card-section"});
                let id = item.idMeal;
                let img = $("<img>", {"src": item.strMealThumb});
                let p = $("<p>", {"id": id}).text(meal);
                let button = $("<button>", {"class": "button getRecipe display-block", "id": id}).text("View Recipe");
                $("#main-content").append(container);
                container.append(card);
                card.append(img, cardSection);
                cardSection.append(p, button);
            })
        }
    });
});

//Populate Regional Recipes
$("#categoryBtn").on("click", function(event){
    event.preventDefault();
    $("#main-content").empty();
    let category = $("#categories").val();
    console.log(category);
    $.ajax({
        url: "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + category,
        type: "GET",
        success: function(response){
            $("#main-title").text(category + " Recipes");
            response.meals.forEach((item) => {
                let meal = item.strMeal;
                console.log(meal);
                let container = $("<div>", {"class": "cell medium-4"});
                let card = $("<div>", {"class": "radius bordered card"});
                let cardSection = $("<div>", {"class": "card-section"});
                let id = item.idMeal;
                let img = $("<img>", {"src": item.strMealThumb});
                let p = $("<p>", {"id": id}).text(meal);
                let button = $("<button>", {"class": "button getRecipe display-block", "id": id}).text("View Recipe");
                $("#main-content").append(container);
                container.append(card);
                card.append(img, cardSection);
                cardSection.append(p, button);
            })
        }
    });
});


$.ajax(
    {
    url: "https://developers.zomato.com/api/v2.1/categories",
    type: "GET",
    beforeSend: function(xhr){xhr.setRequestHeader("user-key", "0bd2dd813596b1757098bae0d1525796");},
    success: function(response) {
        console.log(response);
     }
 });

var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=Teriyaki%20Chicken%20Casserole";
$.ajax({
        url: queryURL,
        method: "GET"
        })
    .then(function(response){
    console.log(response);
    for (i=1;i<21;i++){
        var x = i.toString();
        var strIngredient = "strIngredient" + i;
        
        // console.log(strIngredient);
        var whatever = response.meals[0][strIngredient];
        // console.log( whatever);
        if (whatever !== ""  && whatever != null){
            console.log(whatever);
        }
    }
});