import Store from "../Store.js";

export default class AppStatus extends HTMLElement {
    constructor(){
        super();
        // this.count = this.getAttribute('item-count');
        this.subscribes = new Array();
        this.render();
    }

    render(){
        this.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return `
            <aside class="app__status">
            <p role="status" class="visually-hidden">You have done <span class="js-status">1 thing</span> today!</p>
            <div class="[ app__decor ] [ js-count ]" aria-hidden="true">
                <small>You've done</small>
                <span>${Store.getState()['counter']}</span>
                <small>things today 😢</small>
            </div>
            </aside>
        `;
    }

    connectedCallback(){
        const unsubscribe = Store.subscribe(()=>{
            this.render();
        });

        this.subscribes.push(unsubscribe);
    }

    disconnectedCallback(){
        this.subscribes.forEach((unsubscribe)=>{
            unsubscribe();
        });
    }

    static get observedAttributes(){
        return ['item-count'];
    }

    attributeChangedCallback(name, oldValue, newValue){
        if(name = 'item-count'){
            this.count = newValue;
            this.render();
        }
    }
};

customElements.get('app-status')?? customElements.define('app-status',AppStatus);
