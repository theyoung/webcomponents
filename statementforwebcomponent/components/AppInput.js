import StoreInstance from "../statem/StoreInstance.js";
export default class AppInput extends HTMLElement {
    constructor(){
        super();
        this.store = StoreInstance;
        this.store.events.subscribe('stateChange',this.renderList.bind(this));

        this.render();
        this.renderList();
    }

    render(){

        this.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return `
            <h2 class="app__heading">What you've done</h2>
            <div class="js-items" aria-live="polite" aria-label="A list of items you have done">
            </div>
            <form class="[ new-item ] [ boilerform ] [ js-form ]">
                <div class="boilerform">
                    <!-- Form styles from the https://boilerform.design boilerplate -->
                    <label for="new-item-field" class="[ new-item__label ] [ c-label ]">Add a new item</label>
                    <input type="text" class="[ new-item__details ] [ c-input-field ]" id="new-item-field" autocomplete="off" />
                    <button class="[ c-button ] [ new-item__button ]">Save</button>
                </div>
            </form>
        `;
    }

    connectedCallback(){
        let that = this;
        this.querySelector('form').addEventListener('submit',(e)=> {
            e.preventDefault();
            that.addItemWithStore(); //for state management
        });
    }
    
    addItemWithStore(){
        let item = this.querySelector('#new-item-field').value.trim();   
        StoreInstance.dispatch("ADD_ITEM", item);
    }

    renderList(){
        let that = this;
        const list = `
            <ul>
                ${this.store.state.items.map((item,idx)=> `<li> ${item} <button class="rm" aria-label="Delete this item">×</button></li>`).join('')}
            </ul>
        `;

        this.querySelector('.js-items').innerHTML = list;

        this.querySelectorAll('.rm').forEach((btn,idx)=>{
            btn.addEventListener('click',(e)=>{
                that.dispatchItemsWithStore(idx);
            });
        });
    }

    dispatchItemsWithStore(idx){
        this.store.dispatch("DELETE_ITEM",idx);
    }

    disconnectedCallback(){

    }

    static get observedAttributes(){
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue){

    }
};

customElements.get('app-input')?? customElements.define('app-input',AppInput);


