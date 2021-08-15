import SearchContainer from "./components/SearchContainer.js";
import ShowTrending from "./components/ShowTrending.js";
import ShowRandom from "./components/ShowRandom.js";
import CustomHeader from "./components/CustomHeader.js";

export default class MyApp extends HTMLElement {
    constructor(){
        super();
        this.showSection = 1;
        this.shadowObj = this.attachShadow({mode:'open'});
        this.render();
    }

    render(){

        this.shadowObj.innerHTML = this.getTemplate();

    }

    getTemplate(){
        return `
        <custom-header></custom-header>
        <div class = "app-section">
            ${this.getSection(this.showSection)}
        </div>
        
        ${this.getStyle()}
        `;
    }

    getSection(section){
        switch(section){
            case 1:
                return `<search-container></search-container>`;
            case 2:
                return `<show-trending></show-trending>`;
            case 3:
                return `<show-random></show-random>`;
        }
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
        this.shadowObj.querySelector('custom-header').addEventListener('custom-header-clicked',(event)=>{
            let shownScreen = event.detail.data;
            if(shownScreen != this.showSection){
                this.showSection = shownScreen;
                this.reRender();
            }
        })
    }

    reRender(){
        this.shadowObj.querySelector('.app-section').innerHTML = this.getSection(this.showSection);
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
