//click listener on bookmark that so far toggles the style of the icon element
$(document).on("click", ".recipe-bookmark", function(event){
    event.preventDefault();

    //Set Storage Variables
    let id = $(this).attr("id");
    let imgURL = icon.attr("data-imgurl");
    let name = icon.attr("data-mealname");

    if($(this).hasClass("far")){
        $(this).addClass("fas").removeClass("far");
    }else {
        $(this).addClass("far").removeClass("fas");
    }
    let icon = $(this);
    console.log(icon, id, imgURL, name);
});

function addToRecipeStorage(id){}