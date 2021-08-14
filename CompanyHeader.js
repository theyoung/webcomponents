export default class CompanyHeader extends HTMLElement{
    constructor(){
        super();
        this.icon = '';
        this.title = '';
        this.shadowObj = this.attachShadow({mode:'open'});
    }

    render(){
        const template = this.getTemplate();
        this.shadowObj.innerHTML = template;
        // this.innerHTML = template;
    }

    getTemplate(){
        return `
            <a href="/chapter3.html">
                <img class="icon" src=${this.icon}></img>
            </a>
            <h1 class="heading">${this.title}</h1>
            <div>
                <a class="header-links">home</a>
                <a class="header-links">About Us</a>
            </div>
            <style>
            :host {
                display: flex;
                background: #44afdc;
                align-items: center;
                justify-content: center;
                
                padding: 0 10px;
            }
            
            .icon {
                width:50px;
                height: 50px;
                border-radius: 50%;
                background: white;
            }
            
            .heading {
                flex:1;
                color : white;
                padding-left: 20px;
            }
            
            .header-links {
                text-decoration: none;
                padding: 20px;
                color: white;
            }
            </style>
        `;
    }

    connectedCallback(){
        this.render();
    }

    disconnectedCallback(){

    }

    adoptedCallback(){

    }

    static get observedAttributes(){
        return ['icon','page-name'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name === 'icon'){
            this.icon = newValue;
        }
        if(name === 'page-name'){
            this.title = newValue;
        }
        this.render();
    }

};

customElements.define('company-header',CompanyHeader);