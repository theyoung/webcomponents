import GifCover from "./GifCover.js";

export default class ShowRandom extends HTMLElement {
    constructor(){
        super();

        this.key = "aHgls1bK762U9sBmnNUWLhdBkdAROHEC";
        this.searchUrl = 'https://api.giphy.com/v1/gifs/random';
        this.showlimit = 20;

        this.shadowObj = this.attachShadow({mode:'open'});
        this.render();
    }

    render(){

        this.shadowObj.innerHTML = this.getTemplate();

    }

    getTemplate(){
        return `
        <div class="show-random__container">
            <div class="show-random__images"></div>
            <button class="show-random__button">Get Another Random Image</button>
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
            .show-random__container {
                text-align : center;
            }
            .show-random__images {
                display:flex;
                padding:10px;
                flex-wrap: wrap;
                box-sizing: border-box;
                justify-content:space-evenly;
            }
            .show-random__button {
                margin:10px;
                border:none;
                font-size:18px;
                color:pointer;
                padding:10px;
            }

            gif-cover {
                flex-basis:10%;
                padding:5px;
            }
        </style>
        `;
    }

    connectedCallback(){
        this.handleSearch();

        this.shadowObj.querySelector('button').addEventListener('click',(e)=> this.handleSearch());
    }

    async handleSearch(){
        const response = await fetch(`${this.searchUrl}?api_key=${this.key}&limit=${this.showlimit}`);
        const jsons = await response.json();
        this.dispatchDataInevent(jsons.data);
    }

    dispatchDataInevent(data) {
        this.shadowObj.querySelector('.show-random__images').innerHTML = `<gif-cover url=${data.image_url}></gif-cover>`;
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


customElements.get('show-random')?? customElements.define('show-random', ShowRandom);
