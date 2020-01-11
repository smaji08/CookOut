//to get the recipe using meal search
var mealSearch = "Teriyaki Chicken Casserole";
queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealSearch;
$.ajax({
        url: queryURL,
        method: "GET"
        })
    .then(function(response){
    console.log(response.meals[0]);
    console.log(response.meals[0].idMeal);
    console.log(response.meals[0].strMeal);
    console.log(response.meals[0].strCategory);
    console.log(response.meals[0].strArea);
    console.log(response.meals[0].strInstructions);
    console.log(response.meals[0].strMealThumb);
    console.log(response.meals[0].strTags);
    console.log(response.meals[0].strYoutube);
    for (var i=1;i<21;i++){
        var strIngredient = "strIngredient" + i;
        var strMeasure = "strMeasure" + i;
        
        var IngredientList = response.meals[0][strIngredient];
        var strMeasureList = response.meals[0][strMeasure];
        if (IngredientList !== ""  && IngredientList != null && strMeasureList !== "" && strMeasureList != null){
            console.log(IngredientList + " : " + strMeasureList);
        }
    }
});