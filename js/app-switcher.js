function outOutIn(){
     //click on out -> show out -> hide cook
     $("#cookSearchPane").removeAttr("style").css("display","none");
     $("#outSearchPane").removeAttr("style").css("display","block");
     $("#main-nav").removeClass("inIn").addClass("outOut");
     $("#menu-title").removeClass("inIn").addClass("outOut");
     $("#call-to-action").removeClass("warning").addClass("primary");

}

function inInOut(){
    //click on cook -> show cook -> hide out
    $("#cookSearchPane").removeAttr("style").css("display","block");
    $("#outSearchPane").removeAttr("style").css("display","none");
    $("#main-nav").removeClass("outOut").addClass("inIn");
    $("#menu-title").removeClass("outOut").addClass("inIn");
    $("#call-to-action").removeClass("primary").addClass("warning");


}

$("#outSearch").on("click", function(e){
    //click on out -> show out -> hide cook
    outOutIn();
});

$("#cookSearch").on("click", function(e){
    //click on cook -> show cook -> hide out
    inInOut();

});