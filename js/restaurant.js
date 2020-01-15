
const apiKey = "c97539c0429e46cfdc293e3c02b52dd2";
const apiKeyBing = "AvYeMBHRRinl7EAEc0aP_W8fojB2lfYzFE19POYyR9ZF4evq9P3b6A16FV1XQIof";

//on clicking SearchforRestaurants button, user's current place is located
$("#heroineSearch").on("click", function(event){
    event.preventDefault();
    findMe();
    
});

//Restaurant search by city/city, state using Bing API Rest call
$("#btnByCityRestau").on("click",function(event){
    event.preventDefault();
    searchCity = $("#searchByCityRestau").val().trim();
    
    let geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(searchCity) + "&key=" + apiKeyBing;
    callRestService(geocodeRequest, GeocodeCallback);

});

$("#searchByCityRestau").focusin(function(){
    $("#searchCityByZipRestau").val("");
});

$("#searchCityByZipRestau").focusin(function(){

    $("#searchByCityRestau").attr("placeholder","Enter City (ex: NYC or NYC,NY)");
    $("#searchByCityRestau").val("");
});

//Restaurant search by Zipcode using Bing API Rest call
$("#btnByZipRestau").on("click",function(event){
    event.preventDefault();
    searchZip = $("#searchCityByZipRestau").val().trim();
    $("#searchByCityRestau").val("");
    
    let geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(searchZip) + "&key=" + apiKeyBing;
    callRestService(geocodeRequest, GeocodeCallback);

});

//Details of each clicked restaurants
$(document).on("click",".getRestau",function(){
    restaurantId = this.id;
    getRestaurantDetails(restaurantId);
});

//Bing API Rest service call
function callRestService(request, callback) {
    $.ajax({
        url: request,
        dataType: "jsonp",
        jsonp: "jsonp",
        success: function (response) {
            callback(response);
        },
        error: function (error) {
            alert(error.statusText);
        }
    });
}

//getting the latitude and longitude and passing to the Zomato API
function GeocodeCallback(response) {
    lat = response.resourceSets[0].resources[0].point.coordinates[0];
    lon = response.resourceSets[0].resources[0].point.coordinates[1];
    iAmHere(lat,lon);
}

//Restaurant search using Cuisine/Region type
$("#regionRestauBtn").on("click", function(event){
    event.preventDefault();
    cuisineId = $("#regionRestau").val();
    $("#main-title").text($("#regionRestau option:selected").text() + " Restaurant Options");
    getPopularRestaurants(localityId,localityType,cuisineId);
    
});

//getting the current location of the user without asking the permission 
function findMe(){
    $.getJSON('https://geolocation-db.com/json/')
        .done (function(location) {
            iAmHere(location.latitude,location.longitude);   
        });
}

//getting the location and restaurants nearby and top cusine using latitude and longitude
function iAmHere(lat,lon){
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + lon,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader("user-key", apiKey);},
        success: function(response) {
            outOutIn();
            console.log(response);
            
            cityId = response.location.city_id;
            cityName = response.location.city_name;
            localityId = response.location.entity_id;
            localityType = response.location.entity_type;
            var topCuisine = response.popularity.top_cuisines;
            randTopCuisine = topCuisine[Math.floor(Math.random()*topCuisine.length)];
            $("#searchByCityRestau").attr("placeholder", cityName);
            getCuisine(lat,lon,randTopCuisine);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No City Found");
        } 
    });
}

//using cityId, API call to get the cusine Id of the randomTopCuisine type
function getCuisine(lat,lon,randTopCuisine){
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/cuisines?lat=" + lat + "&lon=" + lon,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader("user-key", apiKey);},
        success: function(response) {
            console.log(response);
            response.cuisines.forEach(item => {
                cuisineId = item.cuisine.cuisine_id;
                cuisineName = item.cuisine.cuisine_name;
                let option = $("<option>", {"value": cuisineId}).text(cuisineName);
                $("#regionRestau").append(option);
                if(cuisineName === randTopCuisine){
                    $('#regionRestau option:contains(' + cuisineName + ')').prop({selected: true});
                    getPopularRestaurants(localityId,localityType,cuisineId);
                }
            });
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Cuisine Found");
        } 
    });
}

//according to the location and and cuisine, API call to get the restaurants which serve those cuisine
function getPopularRestaurants(localityId,localityType,cuisineId){
    
    $.ajax(
        {
        url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + localityId + 
            "&entity_type=" + localityType + "&count=15&radius=5000&cuisines=" + cuisineId,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader("user-key", apiKey);},
        success: function(response) {
            console.log(response);
            createRestaurantCards(response);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Restaurants Found");
        } 
    });
}

//Restaurant cards rendered
function createRestaurantCards(response){
    if (response.restaurants.length > 0){
        $("#main-content").empty();
        $("#main-title").text($("#regionRestau option:selected").text() + " Restaurant Options");
        console.log(response);
        response.restaurants.forEach((item) => {
            let container = $("<div>", {"class": "cell medium-6 large-4 xxlarge-3"});
            let card = $("<div>", {"class": "radius bordered card e-card"});
            let cardSection = $("<div>", {"class": "card-section"});
            let id = item.restaurant.R.res_id;
            let divider = $("<div>", {"class": "card-divider card-mealname"}).text(item.restaurant.name);
            let btnContainer = $("<div>", {"class": "grid-x grid-padding-x"});
            let rPhone = $("<p>").text(item.restaurant.phone_numbers);
            let rAddress = $("<p>").text(item.restaurant.location.address);
            let rTiming = $("<p>").text(item.restaurant.timings);
            let rPrice = $("<p>").text(item.restaurant.price_range);
            let button = $("<button>", {"class": "cell auto button rounded alert getRestau display-block", 
                                        "href": item.restaurant.menu_url}).text("View Menu");
            let bookmark = $("<i>", {"id": id, 
                                    "class": "far fa-star restaurant-bookmark cell auto align-self-middle text-right",
                                    "data-name": item.restaurant.name,
                                    "data-phone": item.restaurant.phone_numbers,
                                    "data-address": item.restaurant.location.address
                                    });
            let rating = $("<p>", {"class": "far cell auto align-self-middle text-right"}).html("Rating : <b>" + item.restaurant.user_rating.aggregate_rating +"</b>");
            $("#main-content").append(container);
            container.append(card); 
            card.append(divider, cardSection);
            cardSection.append(rPhone, rAddress, rTiming, rPrice, btnContainer);
            btnContainer.append(button, bookmark);
        });
    }
}

//TO get the details of particular restaurant using API passing restaurantId
function getRestaurantDetails(restaurantId){
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restaurantId,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader("user-key", apiKey);},
        success: function(response) {
            // renderRestaurantDetails(response);
        },
        error: function(xhr){
            alert(xhr.response + " Error: Could not retrieve the restaurant details!");
        } 
    });
}

//the restaurant detail response JSON data --- skeleton
// function renderRestaurantDetails(response){
//     console.log(response);
//     $("#main-content").empty();
//     $("#main-title").empty();
//     console.log(response.id);
//     console.log(response.name);
//     console.log(response.location.address);
//     console.log(response.location.locality);
//     console.log(response.location.city);
//     console.log(response.location.zipcode);
//     console.log(response.timings);
//     console.log(response.photos_url);
//     console.log(response.menu_url);
//     console.log(response.phone_numbers);
// }