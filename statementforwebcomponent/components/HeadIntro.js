export default class HeadIntro extends HTMLElement {
    constructor(){
        super();


        this.render();
    }

    render(){
        this.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return `
            <h1 class="intro__heading">Done list</h1>
            <p class="intro__summary">A list of things that you have achieved today</p>
            <p class="intro__summary"><b>Note:</b> The data isn't stored, so it will disappear if you reload!</p>
        `;
    }

    connectedCallback(){

    }

    disconnectedCallback(){

    }

    static get observedAttributes(){
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue){

    }
};

customElements.get('head-intro')?? customElements.define('head-intro',HeadIntro);


