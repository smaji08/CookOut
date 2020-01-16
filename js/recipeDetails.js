$(document).on("click", ".getRecipeId", function () {
    recipeId = this.id;
    printrecipe(recipeId);
});

$(document).on("click", ".btnSeeRecipe", function() {
    recipeId = this.id;
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

            /* (response.meals[0]);
             (response.meals[0].idMeal);
             (response.meals[0].strMeal);
             (response.meals[0].strCategory);
             (response.meals[0].strArea);
             */
            var data = []
            
            var cont = $("<div>", {
                "class": "container"
            });
            
            /*(response.meals[0].strMealThumb);
            (response.meals[0].strTags);
            (response.meals[0].strYoutube);*/

            
            for (var i = 1; i < 21; i++) {
                var strIngredient = "strIngredient" + i;
                var strMeasure = "strMeasure" + i;

                var IngredientList = response.meals[0][strIngredient];
                var strMeasureList = response.meals[0][strMeasure];
                if (IngredientList !== "" && IngredientList != null && strMeasureList !== "" &&
                    strMeasureList != null) {
                    data.push('<p><b>' + IngredientList + " :</b> " + strMeasureList + "</p>");
                    //console.log(strInstructions);
                }
            }
            /*$("#main-content").append($('<div>', {
                "class": "Name",
                "style": "text-align:center"
            }).text(response.meals[0].strMeal));*/
            
            $('#main-title').html("<strong>" + response.meals[0].strMeal + "</strong>");
            $("#main-content").append(cont);
            var cont2 = ($("<div>", {
                "class": "img-container"
            }));
            var link = cont2.append($('<img>', {
                'src': response.meals[0].strMealThumb,
                "class": "image",
                "alt": "Avatar",
                "style": "width:100%"
            }));
            var mid = $("<div>", {
                "class": "middle"
            });
            mid.append($("<div>", {
                "class": "text"
            }).html('<a target="_blank" href="' + response.meals[0].strYoutube + '">' +
                'Checkout the video</a>'));
            
            link.append(mid);
            //cont2.append(link);
            cont.append(cont2);
                /* $('.text').html('<a target="_blank" href="' + response.meals[0].strYoutube + '">' +
                 'Checkout the video</a>');*/
            
            cont.append($("<div>", {
                "class": "Ingredient"
            }).html(data));

            var inst = []
            data = []
            inst = (response.meals[0].strInstructions).split('.');
            inst.forEach(element => {
                data.push("<p>" + element + '</p>')
            });
            var instru = $("<div>", {
                "class": "Instructions"
            });
            cont.append(instru)
            instru.append("<div>", {
                "class": "Instructions"
            }).html(data);
            
            //$(".test").html(data);
        });
}