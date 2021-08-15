import SearchBar from './SearchBar.js'
import GifCover from './GifCover.js'

export default class SearchContainer extends HTMLElement {
    constructor(){
        super();

        this.shadowObj = this.attachShadow({mode:'open'});

        this.registerOtherComponents();
        this.render();
    }

    registerOtherComponents() { //앞서 로드할 때 이미 다 설정완료된 상태임
        // if (typeof customElements.get('search-bar') === 'undefined') {
        //   customElements.define('search-bar', SearchBar);
        // }
      
        // if (typeof customElements.get('gif-cover') === 'undefined') {
        //   customElements.define('gif-cover', GifCover);
        // }
    }

    render(){

        this.shadowObj.innerHTML = this.getTemplate();

    }

    getTemplate(){
        return `
        <div class="search-container__container">
            <search-bar></search-bar>
            <div class="search-container__images">
                <p> try Searching for a tag in the search bar </p>
            </div>
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
            .search-container__container{
                display : block;
                padding : 10px;
            }
            .search-container__images{
                display : flex;
                padding : 10px;
                flex-wrap : wrap;
                box-sizing : border-box;
                justify-content : space-evenly;
            }
            .gif-cover {
                flex-biasis: 10%;
                padding : 5px;
            }
        `;
    }

    connectedCallback(){
        this.shadowObj.querySelector('search-bar').addEventListener('search-complete',(e)=> this.handleSearchData(e.detail.data.data));
    }

    handleSearchData(data){
        data = data.map((val, index)=>{
            return `
            <gif-cover
                url=${val.images.downsized_medium.url}
            >
            </gif-cover>
            `
        }).join('');

        this.shadowObj.querySelector('.search-container__images').innerHTML = data;
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

customElements.define('search-container', SearchContainer);
