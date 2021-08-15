import SearchContainer from "./components/SearchContainer.js";
import ShowTrending from "./components/ShowTrending.js";
export default class MyApp extends HTMLElement {
    constructor(){
        super();

        this.shadowObj = this.attachShadow({mode:'open'});
        this.render();
    }

    render(){

        this.shadowObj.innerHTML = this.getTemplate();

    }

    getTemplate(){
        return `
        <search-container></search-container>
        <show-trending></show-trending>
        ${this.getStyle()}
        `;
    }

    getStyle(){
        return `
        <style>
            :host {
                display : block;
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

customElements.define('my-app', MyApp);
