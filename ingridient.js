
    var baseURL = "https://www.themealdb.com/images/media/meals/llcbn01574260722.jpg/preview"; 
    var ingrSearch = "img";
    var queryURL = baseURL + "filter.php?i=" + ingrSearch;
    $.ajax({
            url: queryURL,
            method: "GET"
            })
        .then(function(response){
        console.log("image response: " + response);
    });

    
    // var baseURL = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";
    var baseURL = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
    var ingrSearch = ;
    var queryURL = baseURL + ingrSearch;
    $.ajax({
            url: queryURL,
            method: "GET"
            })
        .then(function(response){
        console.log("ingredient: " + response);
    });


   