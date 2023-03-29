
import {AddUserToGroupByMail, createGroup} from "./apiConnection.js"

//Add users to group
const formAddUser = document.querySelector(".group-settings__form");
const addUserinput = document.querySelector(".group-settings-form__input");
//const succesfull = document.querySelector(".contact-formulier__succes");

if(formAddUser != null) {

    formAddUser.addEventListener("submit", async (event) => {
        // Then we prevent the form from being sent by canceling the event
        event.preventDefault();

        AddUserToGroupByMail(addUserinput.value);

        });
}


const formAddGroup = document.querySelector(".friendgroup-container__form");
const GroupnameInput = document.querySelector(".creategroup__name").value;
const GroupPictureInput = document.querySelector(".creategroup__picture").value;


formAddGroup.addEventListener("submit", async (event) => {
    // Then we prevent the form from being sent by canceling the event
    event.preventDefault();

    createGroup(GroupnameInput, GroupPictureInput);

});


const closePopupAddFriendgroup = document.querySelector(".pop_up_friendgroup__close");

closePopupAddFriendgroup.addEventListener("click", closePopUp)


function closePopUp(){
    document.querySelector(".pop_up__friendgroup").style.display = "none";
}