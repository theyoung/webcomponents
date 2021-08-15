export default class CustomHeader extends HTMLElement {
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
        <ul class="custom-header__ul">
            <li class="custom-header__li">
                <a href='#search'>Search</a>
            </li>
            <li class="custom-header__li">
                <a href='#trending'>Trending</a>
            </li>
            <li class="custom-header__li">
                <a href='#random'>Random</a>
            </li>
        </ul>
        ${this.getStyle()}
        `;
    }

    getStyle(){
        return `
        <style>
            :host{
                display:block;
                top:0;
                background:#46cff3;
                position:sticky;
                height:75px;
            }
            .custom-header__ul{
                display:flex;
                margin:0;
                justify-content: flex-end;
                height:100%
            }
            .custom-header__li {
                align-self: center;
                list-style-type:none;
                margin-right: 25px;
            }
            .custom-header__li a{
                text-decoration: none;
                color:white;
                font-size:25px;
            }
        </style>

        `;
    }

    connectedCallback(){
        this.shadowObj.querySelectorAll('.custom-header__li a').forEach((tag,index)=>{
            tag.addEventListener('click',(e)=>{
                this.handleClick(index);
            })
        });
    }

    handleClick(index){
        this.dispatchEvent(new CustomEvent('custom-header-clicked',{
            detail:{
                data:index+1,
            },
            bubbles : true
        }))
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


customElements.get('custom-header')?? customElements.define('custom-header', CustomHeader);
