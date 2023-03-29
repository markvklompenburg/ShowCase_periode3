//Pagina's
var mainAfspraken = document.querySelector("#main-content__afspraken");
var mainChat = document.querySelector("#main-content__chat");
var mainBucketList = document.querySelector("#main-content__bucketlist");
var mainGroupSettings = document.querySelector("#main-content__group-settings");

//Menu buttons van pagina's
var buttonAfspraken = document.querySelector(".menu-page__afspraken");
var buttonChat = document.querySelector(".menu-page__chat");
var buttonBucketList = document.querySelector(".menu-page__bucketlist");
var buttonGroupSettings = document.querySelector(".menu-page__group-settings");


//eventlistners die wanneer er op een menu knop wordt gedrukt worden afgevuurd
// en de juiste pagina die weergegeven moet worden meegeeft.
buttonChat.addEventListener("click", function () {
    showPage(mainChat);
});

buttonBucketList.addEventListener("click", function () {
    showPage(mainBucketList);
});

buttonAfspraken.addEventListener("click", function () {
    showPage(mainAfspraken);
});

buttonGroupSettings.addEventListener("click", function () {
    showPage(mainGroupSettings);
});

//Zorgt ervoor dat de juiste pagina zicthbaar wordt.
function showPage(aangekliktePagina){
    //zet alle pagina op onzichtbaar
    mainAfspraken.style.display = "none";
    mainChat.style.display = "none";
    mainBucketList.style.display = "none";
    mainGroupSettings.style.display = "none";

    //maak de aangeklikte pagina zichtbaar
    aangekliktePagina.style.display = "block";
}

//Update mainheader groep naam en profielfoto
export async function getVriendengroep(id){
    let groupsPicture = document.querySelector(".main-header__image");
    let groupsName = document.querySelector(".main-header__groespnaam");

    let response = await fetch(`https://localhost:7227/GetVriendengroepByID?id=${id}`);
    let data = await response.json();

    groupsPicture.src = data[0].groupPicture;
    groupsName.innerHTML = data[0].groupName;
}
//
// getVriendengroep();

