import {
    getUser,
    getFriendGroups,
    getFriendGroupById,
    getChatItemsByGroupId,
    getUserById,
    getUsersInFriendGroup,
    deleteUserFromGroup
} from "/scripts/apiConnection.js";
import {getVriendengroep} from "./mainHeader.js";
import {getCurrentGroup, isAuthUserId, setCurrentGroup} from "/scripts/auth.js";
import {addToGroup, removeFromGroup} from "/chat.js";

renderUser();
renderFriendgroups();

//renders the user in the sidebar
async function renderUser(){
    var profilePicture = document.querySelector(".persona__profile-picture");
    var profileName = document.querySelector(".persona__name");

    let data = await getUser();

   profilePicture.src = data[0].profilePicture;
   profileName.innerHTML = data[0].name;
}

//renders the friendgroups in the sidebar
async function renderFriendgroups(){
    let data = await getFriendGroups();
    document.querySelector(".vriendengroepen__lijst").innerHTML = "";

    for (let index = 0; index < data.length; ++index) {
        document.querySelector(".vriendengroepen__lijst").innerHTML +=
        `
                 <li class="vriendengroepen-lijst__item" id="group${data[index][0].id}">
                   <img src="${data[index][0].groupPicture}" class="vriendengroepen-lijst-item__image">
                   <p>${data[index][0].groupName}</p>
                 </li>
        `
    }

    //wanneer op een groep wordt geklikt update hij hem
    for (let index = 0; index < data.length; ++index) {
        document.querySelector(`#group${data[index][0].id}`).addEventListener("click", function () {
            removeFromGroup(getCurrentGroup().toString());
            setCurrentGroup(data[index][0].id);
            document.querySelector(`#default_main`).style.display ='none';
            document.querySelector(`#main`).style.display ='block';
            groupUpdateScreen()
        });
    }
}

function groupUpdateScreen(){
    addToGroup(getCurrentGroup().toString());
    getVriendengroep(getCurrentGroup());
    renderFriendgroups();
    renderChatItems();
    renderGroupUsers();
}

async function renderChatItems() {

    document.querySelector(`app-chat`).shadowRoot.innerHTML = "<link rel=\"stylesheet\" href=\"style/Chat.css\">";
    let data = await getChatItemsByGroupId(getCurrentGroup());

    for (let index = 0; index < data.length; ++index) {

        //Fetchen van api User ID
        let userData = await getUserById(data[index].senderId);

        var sendTimeRough = data[index].sendTime.split('T')[1];
        var sendTimeHour = sendTimeRough.split(':')[0];
        var sendTimeMinutes = sendTimeRough.split(':')[1];
        var sendTime = `${sendTimeHour}:${sendTimeMinutes}` ;

        var authObject = await getUser();
        var authId = authObject[0].id;

        if(authId == userData[0].id) {
            document.querySelector(`app-chat`).shadowRoot.innerHTML += `
                <div class="main-content__message main_content_message_outgoing">
                    <img src="${userData[0].profilePicture}" class="message__image">
                    <div class="main-message__container">
                        <h4 class="message--container__gebruikersnaam">${userData[0].name}</h4>
                        <p class="message--container__bericht">${data[index].message}</p>
                        <p class="message--container__tijd">${sendTime}</p>
                    </div>
                </div>
    `
        } else {
            document.querySelector(`app-chat`).shadowRoot.innerHTML += `
                <div class="main-content__message">
                    <img src="${userData[0].profilePicture}" class="message__image">
                    <div class="main-message__container">
                        <h4 class="message--container__gebruikersnaam">${userData[0].name}</h4>
                        <p class="message--container__bericht">${data[index].message}</p>
                        <p class="message--container__tijd">${sendTime}</p>
                    </div>
                </div>
    `
        }
    }

    //Scroll to bottom
    const scrollingElement = document.querySelector('.main__content');
    const scrollToBottom = () => {
        scrollingElement.scrollTop = scrollingElement.scrollHeight;
    }
    scrollToBottom();
}


async function renderGroupUsers() {
    //Ophalen user in groep
    var data = await getUsersInFriendGroup();
    document.querySelector(`.group-settings__container`).innerHTML = "";

    //loop door array users in groep
    for (let index = 0; index < data.length; ++index) {
        var tempUser = await getUserById(data[index])
        document.querySelector(`.group-settings__container`).innerHTML += `
                    <div class="group-settings-container__item group-settings-container__item-${tempUser[0].id}">
                        <div class="group-settings-container-item__titelcontainer">
                            <img class="group-settings-container-item__image" src="${tempUser[0].profilePicture}">
                            <h4 class="group-settings-container-item__title">${tempUser[0].name}</h4>
                        </div>

                        <div class="group-settings-contianer-item__edit-container">
                            <span class="group-settings-container-item__delete" value="${tempUser[0].id}">🗑️</span>
                        </div>
                    </div>
    `
    }

    //wanneer op een groep wordt geklikt update hij hem
    for (let index = 0; index < data.length; ++index) {
        var tempUser = await getUserById(data[index])
        document.querySelector(`.group-settings-container__item-${tempUser[0].id}`).addEventListener("click", async function () {
                var currentGroup = await getCurrentGroup();
                var ding = await deleteUserFromGroup(currentGroup, tempUser[0].id);
                console.log(ding);
        });
    }

    // document.querySelector('.group-settings-container-item__delete').addEventListener("click", async (event) => {
    //
    //     var currentGroup = await getCurrentGroup();
    //     console.log(this.);
    //     //await deleteUserFromGroup(currentGroup, this.value);
    // });

}



// async function getFriendgroups(value){
//     let response = await fetch(`https://localhost:7227/GetVriendengroepByID?id=${value}`);
//     let data = await response.json();
//     data = data[0];
//
//     document.querySelector(".vriendengroepen__lijst").innerHTML +=
//         `
//                  <li class="vriendengroepen-lijst__item" onclick="changeVriendGroup(${data.id})">
//                    <img src="${data.groupPicture}" class="vriendengroepen-lijst-item__image">
//                    <p>${data.groupname}</p>
//                  </li>
//         `
// }