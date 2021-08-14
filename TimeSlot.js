export default class TimeSlot extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        const contents = document.querySelector('#time-slot-template').content.cloneNode(true);
        this.appendHtmlToShadowDom(contents);
    }

    appendHtmlToShadowDom(contents){
        this.innerHTML = '';
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.append(contents);
    }
};

customElements.define('time-slot',TimeSlot);