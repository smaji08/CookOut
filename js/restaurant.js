const apiKey = "c97539c0429e46cfdc293e3c02b52dd2";
const apiKeyBing = "AvYeMBHRRinl7EAEc0aP_W8fojB2lfYzFE19POYyR9ZF4evq9P3b6A16FV1XQIof";

//on clicking SearchforRestaurants button, user's current place is located
$("#heroineSearch").on("click", function (event) {
    event.preventDefault();
    findMe();
});

//hiding the region dropdown when city ad zip input boxes are empty
function checktheInputBoxes() {
    if ($("#searchByCityRestau").val() === "" && $("#searchCityByZipRestau").val() === "") {
        regionDrpDwnHide();
    }
}
setInterval(checktheInputBoxes, 500);

//Hiding the region dropdown elements
function regionDrpDwnHide() {
    $("#lblRegionRestau").hide();
    $("#divRegion").hide();
}

//Showing the region dropdown elements
function regionDrpDwnShow() {
    $("#lblRegionRestau").show();
    $("#divRegion").show();
}

//Restaurant search by city/city, state using Bing API Rest call
$("#btnByCityRestau").on("click", function (event) {
    event.preventDefault();
    searchCity = $("#searchByCityRestau").val().trim();
    if (searchCity !== "") {
        regionDrpDwnShow();
        let geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(searchCity) + "&key=" + apiKeyBing;
        callRestService(geocodeRequest, GeocodeCallback);
    }
});

//clearing the value of Zip input field when focus is in City input field
$("#searchByCityRestau").focusin(function () {
    $("#searchCityByZipRestau").val("");
});

//Restaurant search by Zipcode using Bing API Rest call
$("#btnByZipRestau").on("click", function (event) {
    event.preventDefault();
    searchZip = $("#searchCityByZipRestau").val().trim();
    $("#searchByCityRestau").val("");
    if (searchZip !== "") {
        regionDrpDwnShow();
        let geocodeRequest = "http://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(searchZip) + "&key=" + apiKeyBing;
        callRestService(geocodeRequest, GeocodeCallback);
    }
});

//clearing the value of City input field when focus is in Zip input field
$("#searchCityByZipRestau").focusin(function () {
    $("#searchByCityRestau").attr("placeholder", "Enter City (ex: NYC or NYC,NY)");
    $("#searchByCityRestau").val("");
});

// //Details of each clicked restaurants
// $(document).on("click",".getRestau",function(){
//     restaurantId = this.id;
//     getRestaurantDetails(restaurantId);
// });

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
            $("#errorModalHead").text("Info!!");
            $("#errorModalMsg").html("<h5>" + error.statusText + "</h5>");
            $("#errorModal").foundation("open");

        }
    });
}

//getting the latitude and longitude and passing to the Zomato API
function GeocodeCallback(response) {
    console.log(response);
    lat = response.resourceSets[0].resources[0].point.coordinates[0];
    lon = response.resourceSets[0].resources[0].point.coordinates[1];
    iAmHere(lat, lon);
}

//Restaurant search using Cuisine/Region type
$("#btnRegionRestau").on("click", function (event) {
    event.preventDefault();
    cuisineId = $("#regionRestau").val();
    $("#main-title").text($("#regionRestau option:selected").text() + " Restaurant Options");
    getPopularRestaurants(localityId, localityType, cuisineId);

});

//getting the current location of the user without asking the permission 
function findMe() {
    $.getJSON('https://geolocation-db.com/json/')
        .done(function (location) {
            iAmHere(location.latitude, location.longitude);
        });
}

//getting the location and restaurants nearby and top cusine using latitude and longitude
function iAmHere(lat, lon) {
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/geocode?lat=" + lat + "&lon=" + lon,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("user-key", apiKey);
        },
        success: function (response) {
            outOutIn();
            cityId = response.location.city_id;
            cityName = response.location.city_name;
            localityId = response.location.entity_id;
            localityType = response.location.entity_type;
            var topCuisine = response.popularity.top_cuisines;
            randTopCuisine = topCuisine[Math.floor(Math.random() * topCuisine.length)];
            $("#searchByCityRestau").attr("placeholder", cityName);
            getCuisine(lat, lon, randTopCuisine);
        },
        error: function (xhr) {
            $("#errorModalHead").text("Info!!");
            $("#errorModalMsg").html("<h5>" + xhr.response + " Error: No City Found</h5>");
            $("#errorModal").foundation("open");
        }
    });
}

//using cityId, API call to get the cusine Id of the randomTopCuisine type
function getCuisine(lat, lon, randTopCuisine) {
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/cuisines?lat=" + lat + "&lon=" + lon,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("user-key", apiKey);
        },
        success: function (response) {
            response.cuisines.forEach(item => {
                cuisineId = item.cuisine.cuisine_id;
                cuisineName = item.cuisine.cuisine_name;
                let option = $("<option>", {
                    "value": cuisineId
                }).text(cuisineName);
                $("#regionRestau").append(option);
                if (cuisineName === randTopCuisine) {
                    $('#regionRestau option:contains(' + cuisineName + ')').prop({
                        selected: true
                    });
                    getPopularRestaurants(localityId, localityType, cuisineId);
                }
            });
        },
        error: function (xhr) {
            $("#errorModalHead").text("Info!!");
            $("#errorModalMsg").html("<h5>" + xhr.response + " Error: No Cuisine Found</h5>");
            $("#errorModal").foundation("open");
        }
    });
}

//according to the location and and cuisine, API call to get the restaurants which serve those cuisine
function getPopularRestaurants(localityId, localityType, cuisineId) {
    $.ajax({
        url: "https://developers.zomato.com/api/v2.1/search?entity_id=" + localityId +
            "&entity_type=" + localityType + "&count=15&radius=5000&cuisines=" + cuisineId,
        type: "GET",
        beforeSend: function (xhr) {
            xhr.setRequestHeader("user-key", apiKey);
        },
        success: function (response) {
            createRestaurantCards(response);
        },
        error: function (xhr) {
            $("#errorModalHead").text("Info!!");
            $("#errorModalMsg").html("<h5>" + xhr.response + " Error: No Restaurants Found</h5>");
            $("#errorModal").foundation("open");
        }
    });
}

//Restaurant cards rendered
function createRestaurantCards(response) {
    console.log(response);
    if (response.restaurants.length > 0) {
        $("#main-content").empty();
        $("#main-title").text($("#regionRestau option:selected").text() + " Restaurant Options");

        response.restaurants.forEach((item) => {
            let container = $("<div>", {
                "class": "cell small-12"
            });
            let card = $("<div>", {
                "class": "radius bordered card e-card"
            });
            let cardSection = $("<div>", {
                "class": "card-section"
            });
            let id = item.restaurant.R.res_id;
            let ratingNumber = item.restaurant.user_rating.aggregate_rating;
            let stars = starIcons(ratingNumber);
            let divider = $("<div>", {
                "class": "card-divider rest-name-background"
            }).html('<span class="restName">' + item.restaurant.name + "</span>" + stars);
            let btnContainer = $("<div>", {
                "class": "grid-x grid-padding-x align-justify"
            });
            let rPhoneAdd = $("<p>").html(
                '<i class="fas fa-phone phone"></i>' + " " + item.restaurant.phone_numbers +
                '<i class="fas fa-map-marked-alt address"></i>' + item.restaurant.location.address );
            let rTiming = $("<p>").text("Hours: " + item.restaurant.timings);
            let dollarSigns = item.restaurant.price_range;
            let dollarSign = dollarIcons(dollarSigns);
            let rPrice = $("<p>").addClass("price").text("Price: " + dollarSign);
            let rMenu = $("<a>", {
                "class": "cell small-3 button rounded alert getRestau display-block",
                "href": item.restaurant.menu_url,
                "target": "_blank"
            }).text("View Menu");
            let iframeCont = $("<div>", {"class": "iframeContainer"});
            let iframe = createIframe(item.restaurant.location.address);
            console.log(iframe);
            let bookmark = $("<i>", {
                "id": id,
                "class": "cell small-3 far fa-star restaurant-bookmark align-self-middle text-right",
                "data-name": item.restaurant.name,
                "data-phone": item.restaurant.phone_numbers,
                "data-address": item.restaurant.location.address
            });
            $("#main-content").append(container);
            container.append(card);
            card.append(divider, cardSection);
 Aug1601
            cardSection.append(rPhone, rAddress, rTiming, rPrice, btnContainer);
            btnContainer.append(rMenu, bookmark);
        });
    }

            iframeCont.append(iframe);
            cardSection.append(iframeCont, rPhoneAdd, rTiming, rPrice, btnContainer);
            // btnContainer.append(button, bookmark);
            btnContainer.append(rMenu, bookmark);
        });
    } else {
        $("#main-content").empty();
        $("#main-content").text("No Restaurants Found");
    }
}

//Print star rating
function starIcons (rating){
    if (rating < 2){
        let stars = '<i class="fas fa-star ratingStar"></i><i class="far fa-star ratingStar"></i><i class="far fa-star ratingStar"></i><i class="far fa-star ratingStar"></i><i class="far fa-star ratingStar"></i>';
        return stars;
    } else if (rating < 3){
        let stars = '<i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i><i class="far fa-star ratingStar"></i><i class="far fa-star ratingStar"></i><i class="far fa-star ratingStar"></i>';
        return stars;
    } else if (rating < 4){
        let stars = '<i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i><i class="far fa-star ratingStar"></i><i class="far fa-star ratingStar"></i>';
        return stars;
    } else if (rating < 5){
        let stars = '<i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i><i class="far fa-star ratingStar"></i>';
        return stars;
    } else {
        let stars = '<i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i><i class="fas fa-star ratingStar"></i>';
        return stars;
    }
}

//Print dollar signs
function dollarIcons (dollars){
    if (dollars === 4){
        let dollarSign = "$$$$";
        return dollarSign;
    } else if (dollars === 3) {
        let dollarSign = "$$$";
        return dollarSign;
    } else if (dollars === 2) {
        let dollarSign = "$$";
        return dollarSign;
    } else if (dollars === 1) {
        let dollarSign = "$";
        return dollarSign;
    }
}

function createIframe(address){
    console.log("in createIframe: " + address)
    let iframe = $("<iframe>", {
        "width": "100%",
        "height": "100%",
        "src": "https://maps.google.com/maps?width=100%&hl=en&q=" + address + "&ie=UTF8&t=&z=15&iwloc=B&output=embed",
        "frameborder": "0",
        "scrolling": "no",
        "marginheight": "0",
        "marginwidth": "0"
    });
    return iframe; master
}