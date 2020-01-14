
const apiKey = "c97539c0429e46cfdc293e3c02b52dd2";
const apiKeyBing = "AvYeMBHRRinl7EAEc0aP_W8fojB2lfYzFE19POYyR9ZF4evq9P3b6A16FV1XQIof";

$("#heroineSearch").on("click", function(event){
    event.preventDefault();
    findme();
    
});

$("#btnByCityRestau").on("click",function(event){
    event.preventDefault();
    searchCity = $("#searchByCityRestau").val().trim();

    let geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(searchCity) + "&key=" + apiKeyBing;
    callRestService(geocodeRequest, GeocodeCallback);

});

$("#btnByZipRestau").on("click",function(event){
    event.preventDefault();
    searchZip = $("#searchCityByZipRestau").val().trim();

    let geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(searchZip) + "&key=" + apiKeyBing;
    callRestService(geocodeRequest, GeocodeCallback);

});

$(document).on("click",".getRestau",function(){
    restaurantId = this.id;
    getRestaurantDetails(restaurantId);
});

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

function GeocodeCallback(response) {
    // console.log(response);
    lat = response.resourceSets[0].resources[0].point.coordinates[0];
    lon = response.resourceSets[0].resources[0].point.coordinates[1];
    iamhere(lat,lon);

}

$("#regionRestauBtn").on("click", function(event){
    event.preventDefault();
    cuisineId = $("#regionRestau").val();
    $("#main-title").text($("#regionRestau option:selected").text() + " Restaurant Options");
    getpopularrestaurants(localityId,localityType,cuisineId);
    
});

function findme(){
    $.getJSON('https://geolocation-db.com/json/')
        .done (function(location) {
            iamhere(location.latitude,location.longitude);   
        });
}

function iamhere(lat,lon){

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
            getcuisine(cityId,randTopCuisine);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Category Found");
        } 
    });

}

function getcuisine(cityId,randTopCuisine){
    
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/cuisines?city_id=" + cityId,
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
                    getpopularrestaurants(localityId,localityType,cuisineId);
                }
            });
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Category Found");
        } 
    });
}

function getpopularrestaurants(localityId,localityType,cuisineId){
    
    $.ajax(
        {
        url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + localityId + 
            "&entity_type=" + localityType + "&count=16&radius=5000&cuisines=" + cuisineId,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader("user-key", apiKey);},
        success: function(response) {
            createrestaurantcards(response);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Category Found");
        } 
    });
}

function createrestaurantcards(response){
    if (response.restaurants.length > 0){
        $("#main-content").empty();
        $("#main-title").text($("#regionRestau option:selected").text() + " Restaurant Options");

        response.restaurants.forEach((item) => {
            let container = $("<div>", {"class": "cell medium-6 large-4 xxlarge-3"});
            let card = $("<div>", {"class": "radius bordered card e-card"});
            let cardSection = $("<div>", {"class": "card-section"});
            let id = item.restaurant.R.res_id;
            let img = $("<img>", {"src": item.restaurant.thumb, "alt": item.restaurant.featured_image,
                                "class": "recipeBoxImg", "data-open": "imgModal"});
            let divider = $("<div>", {"class": "card-divider card-mealname"}).text(item.restaurant.name);
            let btnContainer = $("<div>", {"class": "grid-x grid-padding-x"});
            let button = $("<button>", {"class": "cell auto button rounded alert getRecipe getRestau display-block", 
                                        "id": id}).text("Check this!");
            let rating = $("<p>", {"class": "far cell auto align-self-middle text-right"}).html("Rating : <b>" + item.restaurant.user_rating.aggregate_rating +"</b>");
            $("#main-content").append(container);
            container.append(card); 
            card.append(img, divider, cardSection);
            cardSection.append(btnContainer);
            btnContainer.append(button, rating);
        });
    }
}

function getRestaurantDetails(restaurantId){
    
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/restaurant?res_id=" + restaurantId,
        type: "GET",
        beforeSend: function(xhr){xhr.setRequestHeader("user-key", apiKey);},
        success: function(response) {
            renderRestaurantDetails(response);
        },
        error: function(xhr){
            alert(xhr.response + " Error: No Category Found");
        } 
    });
}

function renderRestaurantDetails(response){
    console.log(response);
    $("#main-content").empty();
    $("#main-title").empty();
    console.log(response.id);
    console.log(response.name);
    console.log(response.location.address);
    console.log(response.location.locality);
    console.log(response.location.city);
    console.log(response.location.zipcode);
    console.log(response.timings);
    console.log(response.photos_url);
    console.log(response.menu_url);
    console.log(response.phone_numbers);
}