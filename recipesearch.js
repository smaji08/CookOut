
    //api call with just ingredient (we may need to take $2 patronage account for multiple ingredient search)
    // var apikey = 1;
    var baseURL = "https://www.themealdb.com/api/json/v1/1/"; 
    var ingrSearch = "egg";
        
    var queryURL = baseURL + "filter.php?i=" + ingrSearch;
    
    $.ajax({
            url: queryURL,
            method: "GET"
            })
        .then(function(response){
        console.log( response);

    });

    //cuisine list
    queryURL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list" ;
    
    $.ajax({
            url: queryURL,
            method: "GET"
            })
        .then(function(response){
        console.log(response);
    });

    //food category search 
    var categorySearch = "chicken";
    queryURL = "https://www.themealdb.com/api/json/v1/1/filter.php?c=" + categorySearch;

    $.ajax({
            url: queryURL,
            method: "GET"
            })
        .then(function(response){
        console.log(response);
    });

    

