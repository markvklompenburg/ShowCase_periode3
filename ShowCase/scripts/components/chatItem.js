class chatItem extends HTMLElement {

    shadowRoot;
    templateId = 'chat-item-tpl';
    elementId = 'chat-item';

    constructor() {
        super(); // always call super() first in the ctor.
        this.shadowRoot = this.attachShadow({mode: 'open'});
        this.applyTemplate();
        this.attachStyling();
    }

    applyTemplate() {
        let template = document.getElementById(this.templateId);
        let clone = template.content.cloneNode(true);
        this.shadowRoot.appendChild(clone);
    }

    attachStyling(){
        const linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", "style/Chat.css");
        this.shadowRoot.appendChild(linkElem);
    }
}

customElements.define('chat-item', chatItem);

export {chatItem};
