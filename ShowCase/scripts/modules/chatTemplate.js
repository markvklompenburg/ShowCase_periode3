import {getChatItemsByGroupId, getFriendGroups, getUserById} from "/scripts/apiConnection.js";
import {getCurrentGroup, isAuthUserId, currentGroup} from "/scripts/auth.js";

const appTemplate = {
    id: 'app-click-cirkel-tpl',
    template: ` 
    `
}

const chatItemTemplate = {
    id: 'chat-item-tpl',
    template: `
                <div class="main-content__message main_content_message_outgoing">
                    <img src="https://www.aap.nl/wp-content/uploads/2021/08/AAP_chimpsoortinfo_profileA.jpg" class="message__image">
                    <div class="main-message__container">
                        <h4 class="message--container__gebruikersnaam">Naam</h4>
                        <p class="message--container__bericht">Dit is een bericht</p>
                        <p class="message--container__tijd">10:20</p>
                    </div>
                </div>
    `
}

class chatTemplate{

    attachTemplates(){
        this.attachTemplate(appTemplate);
        this.attachTemplate(chatItemTemplate);
        this.renderChatItems();
    }

    attachTemplate(tplObject){
        const templateNode = document.createElement('template');
        templateNode.id = tplObject.id;
        templateNode.innerHTML = tplObject.template;
        const body = document.querySelector('body');
        body.appendChild(templateNode);
    }

      async renderChatItems(){
        let data = await getChatItemsByGroupId(getCurrentGroup);

    //     for (let index = 0; index < data.length; ++index) {
    //
    //         //Fetchen van api User ID
    //         let userData = await getUserById(data[index].senderId);
    //         var sendTime = data[index].sendTime;
    //         console.log(sendTime);
    //
    //         if(isAuthUserId(data[index].senderId)) {
    //             document.querySelector(`app-chat`).shadowRoot.innerHTML += `
    //             <div class="main-content__message main_content_message_outgoing">
    //                 <img src="${userData[0].profilePicture}" class="message__image">
    //                 <div class="main-message__container">
    //                     <h4 class="message--container__gebruikersnaam">${userData[0].name}</h4>
    //                     <p class="message--container__bericht">${data[index].message}</p>
    //                     <p class="message--container__tijd">${sendTime}</p>
    //                 </div>
    //             </div>
    // `
    //         } else{
    //             document.querySelector(`app-chat`).shadowRoot.innerHTML += `
    //             <div class="main-content__message">
    //                 <img src="${userData[0].profilePicture}" class="message__image">
    //                 <div class="main-message__container">
    //                     <h4 class="message--container__gebruikersnaam">${userData[0].name}</h4>
    //                     <p class="message--container__bericht">${data[index].message}</p>
    //                     <p class="message--container__tijd">${sendTime}</p>
    //                 </div>
    //             </div>
    // `
    //         }
    //     }
    }
}

const template = new chatTemplate();

export {template};
