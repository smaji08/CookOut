$(document).foundation();

var baseURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata"
var mealNameSearch = "Arrabiata";
var queryURL = "https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata" + mealNameSearch;


$.ajax({
    url: queryURL,
    method: "GET",
    .then: function(response){
        console.log (response);
 });