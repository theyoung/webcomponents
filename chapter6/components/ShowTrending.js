import GifCover from "./GifCover.js";

export default class ShowTrending extends HTMLElement {
    constructor(){
        super();

        this.key = "aHgls1bK762U9sBmnNUWLhdBkdAROHEC";
        this.searchUrl = 'https://api.giphy.com/v1/gifs/trending';
        this.showlimit = 20;

        this.shadowObj = this.attachShadow({mode:'open'});
        this.render();
    }

    render(){

        this.shadowObj.innerHTML = this.getTemplate();

    }

    getTemplate(){
        return `
        <div class="show-trending__container">
            <h2 class="show-trending__heading">Trending Gifs</h2>
            <div class="show-trending__images"></div>
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
            .show-trending__heading{
                text-align : center;
            }
            .show-trending__images{
                display:flex;
                flex-wrap:wrap;
                padding:10px;
                box-sizing: border-box;
                justify-content : space-evenly;
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
    }

    async handleSearch(){
        const response = await fetch(`${this.searchUrl}?api_key=${this.key}&limit=${this.showlimit}`);
        const jsons = await response.json();
        this.dispatchDataInevent(jsons.data);
    }

    dispatchDataInevent(data) {
        data = data.map((val,index)=>{
            return `
                <gif-cover url=${val.images.downsized_medium.url}></gif-cover>
            `;
        }).join('');

        this.shadowObj.querySelector('.show-trending__images').innerHTML = data;
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


customElements.get('show-trending')?? customElements.define('show-trending', ShowTrending);
