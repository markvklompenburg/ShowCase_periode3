"use strict";

import {currentGroup, getCurrentGroup, isAuthUserId} from "./scripts/auth.js";
import {getUser, getUserById, getChats} from "./scripts/apiConnection.js"

var submit = document.getElementById("chat_submit");
var input = document.getElementById("chat_input");

var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7199/chatHub").build();


//Disable the send button until connection is established.
submit.disabled = true;

//gets de messages
connection.on("Send", async function (message, user, dateTime) {
    var userObject = await getUserById(user);

    var userPicture = userObject[0].profilePicture;
    var userName = userObject[0].name;

    var authObject = await getUser();
    var authId = authObject[0].id;

    if(authId == user) {
        document.querySelector(`app-chat`).shadowRoot.innerHTML += `
                <div class="main-content__message main_content_message_outgoing">
                    <img src="${userPicture}" class="message__image">
                    <div class="main-message__container">
                        <h4 class="message--container__gebruikersnaam">${userName}</h4>
                        <p class="message--container__bericht">${message}</p>
                        <p class="message--container__tijd">${dateTime}</p>
                    </div>
                </div>
                `
    } else{
        document.querySelector(`app-chat`).shadowRoot.innerHTML += `
                <div class="main-content__message">
                    <img src="${userPicture}" class="message__image">
                    <div class="main-message__container">
                        <h4 class="message--container__gebruikersnaam">${userName}</h4>
                        <p class="message--container__bericht">${message}</p>
                        <p class="message--container__tijd">${dateTime}</p>
                    </div>
                </div>
                `
    }

    //Scroll to bottom
    const scrollingElement = document.querySelector('.main__content');


        const scrollToBottom = () => {
            scrollingElement.scrollTop = scrollingElement.scrollHeight;
        }
        scrollToBottom();

});

//starts the connection
connection.start().then(function () {
    submit.disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});


// sends the message
submit.addEventListener("click", async function (event) {
    event.preventDefault();

    var userId = await getUser();
    userId = userId[0].id;
    var groupName = getCurrentGroup().toString();
    var message = input.value;

    connection.invoke("SendMessageToGroup", groupName, message, userId).catch(function (err) {
        return console.error(err.toString());
    });

    getChats(message, userId);

});


export function addToGroup(groupId){
    connection.invoke("AddToGroup", groupId);
}

export function removeFromGroup(groupId){
    connection.invoke("RemoveFromGroup", groupId);
}