import {userID, currentGroup, getCurrentGroup} from "/scripts/auth.js";

var APIConnectionString = "https://localhost:7227/";

//User
 export async function getUser(){
    let response = await fetch(`${APIConnectionString}GetUser`, {
        method: 'GET',
        headers: {'token': `${getCookie("SessionToken")}`}
    });
    let data = await response.json();

    return data;
}

export async function getUserById(id){
    let response = await fetch(`${APIConnectionString}GetUserById?userId=${id}`, {
        method: 'GET',
        headers: {'token': `${getCookie("SessionToken")}`}
    });
    let data = await response.json();

    return data;
}

//get token from cookie
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

//Groups
export async function getFriendGroupById(GroupId){
    let response = await fetch(`${APIConnectionString}GetVriendengroepByID?id=${GroupId}`);
    let data = await response.json();

    return data;
}

export async function getFriendGroups(){
    let response = await fetch(`${APIConnectionString}GetUserGroupsByUserId` , {
        method: 'GET',
        headers: {'token': `${getCookie("SessionToken")}`}
    });

    let data = await response.json();

    let groups = [];

    for (let index = 0; index < data.length; ++index) {
        let result = await getFriendGroupById(data[index]);
        groups.push(result);
    }
    return groups;
}

export async function getUsersInFriendGroup(){
    let response = await fetch(`${APIConnectionString}GetUsersByGroupId?groupId=${getCurrentGroup()}`);
    let data = await response.json();

    return data;
}

export async function deleteUserFromGroup(GroupId, UserId){
    let response = await fetch(`${APIConnectionString}DeleteUserFromGroup?groupId=${GroupId}&userId=${UserId}`, {
        method: 'DELETE'
    });

    let data = await response;

    return data;
}

//Chat items
export async function getChatItemsByGroupId(GroupId) {
    let response = await fetch(`${APIConnectionString}GetChatItemByGroupId?id=${GroupId}`);
    let data = await response.json();

    return data;
}

//------ Post functions ------

// //PostChats
// const formChats = document.querySelector(".main-footer__form");
// const input = document.querySelector(".main-footer-form__input");
// //const succesfull = document.querySelector(".contact-formulier__succes");
//
// if(formChats != null) {
//
//     formChats.addEventListener("submit", async (event) => {
//         // Then we prevent the form from being sent by canceling the event
//         event.preventDefault();

// export async function postChat() {
//
//     var userId = await getUser();
//     userId = userId[0].id;
//
//     let response = await fetch(`${APIConnectionString}SetChatItem`, {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             id: 0,
//             message: input.value,
//             sendTime: "2023-03-16T13:02:11.021Z",
//             senderId: userId,
//             groupId: currentGroup
//         })
//     });
// }

    //     console.log(response.json());
    //
    // });
//}

export async function getChats(message, senderId){
    let response = await fetch(`${APIConnectionString}SetChatItem`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: 0,
            message: message,
            sendTime: "2023-03-16T13:02:11.021Z",
            senderId: senderId,
            groupId: currentGroup
        })
    });
}

export async function AddUserToGroupByMail(Mail){
    var groupId = await getCurrentGroup();

    let response = await fetch(`${APIConnectionString}SetUserGroupByMail?groupId=${groupId}` , {
        method: 'POST',
        headers: {'mail': `${Mail}`}
    });
}

export async function createGroup(Groepsnaam, Groepsafbeelding){
    let response = await fetch(`${APIConnectionString}SetVriendengroep`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            id: 0,
            groupName: Groepsnaam,
            groupPicture: Groepsafbeelding
        })
    });
}


// //Add users to group
// const formAddUser = document.querySelector(".group-settings__form");
// const addUserinput = document.querySelector(".group-settings-form__input");
// //const succesfull = document.querySelector(".contact-formulier__succes");
//
// if(formAddUser != null) {
//
//     formAddUser.addEventListener("submit", async (event) => {
//         // Then we prevent the form from being sent by canceling the event
//         event.preventDefault();
//
//         var groupId = await getCurrentGroup();
//
//         let response = await fetch(`${APIConnectionString}SetUserGroupByMail?groupId=${groupId}` , {
//             method: 'POST',
//             headers: {'mail': `${addUserinput.value}`}
//         });
//     });
// }


//PostUser
const formRegister = document.querySelector(".register-container__form");
const name = document.querySelector(".register_name");
const email = document.querySelector(".register_email");
const password = document.querySelector(".register_password");
const profilePicture = document.querySelector(".register_profilePicture");

//const succesfull = document.querySelector(".contact-formulier__succes");

if(formRegister != null) {

    formRegister.addEventListener("submit", async (event) => {
        // Then we prevent the form from being sent by canceling the event
        event.preventDefault();

        let response = await fetch(`${APIConnectionString}SetUser`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: 0,
                name: name.value,
                email: email.value,
                password: password.value,
                profilePicture: profilePicture.value
            })
        });

        let data = await response.json();

        window.location.href = "http://localhost:63342/ShowCase/login.html";

    });
}
