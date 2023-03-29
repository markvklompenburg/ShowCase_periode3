import {template} from "./modules/chatTemplate.js";
import {chatItem} from "./components/chatItem.js";

class chatApp extends HTMLElement {

    shadowRoot;
    templateId = 'app-click-cirkel-tpl';
    elementId = 'app-click-cirkel';

    constructor() {
        super(); // always call super() first in the ctor.
        this.shadowRoot = this.attachShadow({mode: 'open'})
        this.init();
    }

    init() {
        //plaats alle HTML templates in de DOM
        template.attachTemplates();
    }

    connectedCallback() {
        this.applyTemplate();
        this.attachStyling();
    }

    applyTemplate() {
        let appTemplate = document.getElementById(this.templateId);
        let clone = appTemplate.content.cloneNode(true);
        this.shadowRoot.appendChild(clone);
    }

    // app.js
    attachStyling(){
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "style/Chat.css");
        this.shadowRoot.appendChild(linkElem);
    }

}

customElements.define('app-chat', chatApp);
