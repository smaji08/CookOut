
var id;
console.log(" am here in our js");
$(document).on("click",".getRecipe",function(){
    console.log("am here honey");
    console.log(this.id);
    id = this.id;
    printrecipe(id);
    
});

function printrecipe(id){
    console.log("inside function:" + id);
    $("#main-content").empty();
    let div = $("#main-content").append($("<div>", {"class": "container"}));
    $("#main-content").append($("<h3>").text());
            $("<div>").attr("img");

}