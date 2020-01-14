//click listener on bookmark that so far toggles the style of the icon element
$(document).on("click", ".recipe-bookmark", function(event){
    event.preventDefault();

    //Set Storage Variables
    let icon = $(this);
    let id = icon.attr("id");
    let imgURL = icon.attr("data-imgurl");
    let name = icon.attr("data-mealname");

    if($(this).hasClass("far")){
        $(this).addClass("fas").removeClass("far");
        //Add to storage
        addToRecipeStorage(id, name, imgURL);

    }else {
        $(this).addClass("far").removeClass("fas");
        //remove from storage
        removeFromStorage(id);
    }
});

//trash can click listener
$(document).on("click", ".trash", function(e){
    e.preventDefault();
    let id = $(this).attr("data-recipe-id");
    removeFromStorage(id);
    recipeBox();
});

//Click listener to generate saved recipes
$("#call-to-action").on("click", function(e){
    e.preventDefault();
    console.log("clicked")
    //click on cook -> show cook -> hide out
    $("#cookSearchPane").removeAttr("style").css("display","block");
    $("#outSearchPane").removeAttr("style").css("display","none");
    $("#main-nav").removeClass("outOut").addClass("inIn");
    $("#menu-title").removeClass("outOut").addClass("inIn")
    $("#call-to-action").removeClass("primary").addClass("warning")
    recipeBox();
});

//Click listener for lightbox modal
$(document).on("click", ".recipeBoxImg", function(e){
    e.preventDefault();
    let recipeName = $(this).attr("alt");
    let recipeURL = $(this).attr("src");
    console.log(recipeURL)
    $("#imgModalTitle").text(recipeName);
    $("#imgModalImg").attr("src", recipeURL);
})

//initalize stored recipes as an empty array
var storedRecipes = initializeFromStorage();

function initializeFromStorage(){
    
    let ls = localStorage.getItem("savedRecipes");
    let lsArr = JSON.parse(ls);
    let emptyArr = [];

    if (lsArr !== null){
        let newArr = $.merge(emptyArr,lsArr);
        return newArr;
    }else{
        return emptyArr
    }

}

//Add recipe to storage array and push to Local storage
function addToRecipeStorage(id, name, imgURL){
    
    storedRecipes.push({
        "id": id,
        "name": name,
        "imgURL": imgURL 
    });

    let stringForStorage = JSON.stringify(storedRecipes);
    localStorage.clear();
    localStorage.setItem("savedRecipes", stringForStorage);
}

//check local storage and set icon values if ID exists
function checkForSavedRecipes(){
    let ls = localStorage.getItem("savedRecipes");
    let lsArr = JSON.parse(ls);
    if (lsArr !== null){
        lsArr.forEach((item) => {  
            $("#"+item.id).next().addClass("fas").removeClass("far");
        })
    }
   
    
}setInterval(checkForSavedRecipes, 1000);//set interval to constantly check

//remove from storage
function removeFromStorage(recipeID){
    let ls = localStorage.getItem("savedRecipes");
    let lsArr = JSON.parse(ls);
    let index = lsArr.findIndex(recipe => recipe.id == recipeID);

    if (index !== -1){
        lsArr.splice(index, 1);
        storedRecipes.splice(index, 1);
        console.log(lsArr);
        let stringForStorage = JSON.stringify(lsArr);
        localStorage.clear();
        localStorage.setItem("savedRecipes", stringForStorage);
    }
}

//render local storage for recipe box
function recipeBox(){

    $("#main-content").empty();
    $("#main-title").empty().text("Saved Recipes");
    let ls = localStorage.getItem("savedRecipes");
    let lsArr = JSON.parse(ls);

    if ( lsArr.length !== 0 ){
        let table = $("<table>", {"class": "hover storageTable", });
        let thead = $("<thead>");
        let tr= $("<tr>");
        let th1 = $("<th>", {"class": "table-center"}).text("Thumbnail");
        let th2 = $("<th>").text("Recipe Name");
        let th3 = $("<th>", {"class": "table-center"}).text("Remove");
        let th4 = $("<th>", {"class": "table-view"}).text("View Recipe");
        let tbody = $("<tbody>");
        
        $("#main-content").append(table);
        table.append(thead,tbody);
        thead.append(tr);
        tr.append(th1,th2,th4,th3);
        
        lsArr.forEach((recipe, _index) => {
            let tr = $("<tr>");
            let td1 = $("<td>", {"width": "150", "align": "center" });
            let td2 = $("<td>", {"data-recipe-id": recipe.id}).text(recipe.name);
            let td4 = $("<td>", {"width": "100", "class": "table-center"});
            let td3 = $("<td>", {"width": "75", "class": "table-center"});
            let tdImg = $("<img>", {"src": recipe.imgURL, "alt": recipe.name, "class": "recipeBoxImg", "data-open": "imgModal"});
            let trash = $("<i>", {"data-recipe-id": recipe.id,"class": "far fa-trash-alt trash"});
            let view = $("<i>", {"data-recipe-id": recipe.id,"class": "far fa-eye view"});
            tbody.append(tr);
            td1.append(tdImg);
            td3.append(trash);
            td4.append(view)
            tr.append(td1,td2,td4,td3);
        });
    }else{
        $("#main-content").empty();
        $("#main-content").text("No Saved Recipes")
    }

}