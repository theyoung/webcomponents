import AppInput from "./components/AppInput.js";
import AppStatus from "./components/AppStatus.js";
import HeadIntro from "./components/HeadIntro.js";


export default class MainApp extends HTMLElement {
    constructor(){
        super();


        this.render();
    }

    render(){
        this.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return `
            <head-intro class="intro"></head-intro>
            <section class="app">
                <app-input class="app__input" ></app-input>
                <app-status class="app__status" item-count='0'></app-status>
            </section>
        `;
    }

    connectedCallback(){
        let that = this;
        this.querySelector('app-input').addEventListener('changed',(e)=>{
            that.querySelector('app-status').setAttribute('item-count',e.detail.data);
        });
    }

    disconnectedCallback(){

    }

    static get observedAttributes(){
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue){

    }
};

customElements.get('main-app')?? customElements.define('main-app',MainApp);


