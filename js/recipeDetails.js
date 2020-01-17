$(document).on("click", ".getRecipeId", function () {
    var recipeId = this.id;
    printrecipe(recipeId);
});

$(document).on("click", ".btnSeeRecipe", function() {
    var recipeId = this.id;
    $("#imgModal").foundation("close");
    printrecipe(recipeId);
});

function printrecipe(recipeId) {
    
    $("#main-content").empty();

    var queryURL = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + recipeId;
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {

            var data = []   
            
            for (var i = 1; i < 21; i++) {
                var strIngredient = "strIngredient" + i;
                var strMeasure = "strMeasure" + i;
                var IngredientList = response.meals[0][strIngredient];
                var strMeasureList = response.meals[0][strMeasure];
                if (IngredientList !== "" && IngredientList != null && strMeasureList !== "" &&
                    strMeasureList != null) {
                    data.push('<p><b>' + IngredientList + " :</b> " + strMeasureList + "</p>");
                }
            }

            let ingredientTitle = $("<h5>").text("Ingredients");
            let directionTitle = $("<h5>").text("Direction");

            let bookmark = $("<i>", {
                "id": recipeId,
                "data-imgURL": response.meals[0].strMealThumb,
                "data-mealName": response.meals[0].strMeal,
                "class": "far fa-bookmark recipe-bookmark margin-left-1",
            });
            
            $('#main-title').html("<strong>" + response.meals[0].strMeal + "</strong>").append(bookmark);

            var cont2 = $("<div>", {"class": "img-container"});
            var link = cont2.append($('<img>', {
                'src': response.meals[0].strMealThumb,
                "class": "image",
                "alt": "Avatar",
                "style": "width:100%"
            }));
            var mid = $("<div>", {"class": "middle"});
            var embed = response.meals[0].strYoutube.replace("watch\?v=","embed\/");
            mid.append($("<div>", {"class": "text" }).html('<a id="vModal" data-recipe-name="' + response.meals[0].strMeal + '" data-open="videoModal" data-embed="' + embed + '">Checkout the video</a>'));
            link.append(mid);

            let ingredients = $("<div>", {"class": "Ingredient cell large-3"}).html(data);
            ingredients.prepend(ingredientTitle);

            var inst = []
            data = []
            inst = response.meals[0].strInstructions.split('.');
            inst.forEach(element => {
                data.push("<p>" + element + '</p>')
            });
            var instru = $("<div>", {
                "class": "Instructions cell large-8"
            }).html(data);
            instru.prepend(directionTitle, cont2);

            $("#main-content").append(ingredients);
            $("#main-content").append(instru);
        });
}

$(document).on("click", "#vModal", function(e){
    console.log("clicked");
    let embed = $(this).attr("data-embed");
    let recipeName = $(this).attr("data-recipe-name");
    $("#videoModalHead").text(recipeName);
    $("#videoIframe").attr("src", embed);
});