export default class GifCover extends HTMLElement {
    constructor(){
        super();

        this.url = this.getAttribute('url');

        this.shadowObj = this.attachShadow({mode:'open'});
        this.render();
    }

    render(){

        this.shadowObj.innerHTML = this.getTemplate();

    }

    getTemplate(){
        return `
        <div>
            <img class="gif-cover__image" src="${this.url}"/>
        </div>
        ${this.getStyle()}
        `;
    }

    getStyle(){
        return `
        <style>
            :host {
                display : block;
            }
            .gif-cover__image {
                height : 150px
            }
        </style>
        `;
    }

    connectedCallback(){

    }

    disconnectedCallback(){

    }

    adoptedCallback(){

    }

    static get observedAttributes(){
        return [];
    }

    attributeChangedCallback(name,oldValue, newValue){

    }

};


customElements.get('gif-cover')?? customElements.define('gif-cover', GifCover);
