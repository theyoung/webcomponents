export default class InformationBanner extends HTMLElement {
    constructor(){
        super();
        this.render();
    }

    render(){
        const contents = document.querySelector('#information-banner-template').content.cloneNode(true);
        this.appendHtmlToShadowDom(contents);
    }


    appendHtmlToShadowDom(contents){
        this.innerHTML = '';
        const shadowRoot = this.attachShadow({mode:'open'});
        shadowRoot.append(contents);
    }
};

customElements.define('information-banner',InformationBanner);