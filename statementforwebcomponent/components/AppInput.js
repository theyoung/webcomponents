export default class AppInput extends HTMLElement {
    constructor(){
        super();
        this.items = new Array();

        this.render();
    }

    render(){
        this.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return `
            <h2 class="app__heading">What you've done</h2>
            <div class="js-items" aria-live="polite" aria-label="A list of items you have done"></div>
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
            that.addItem();
        });
    }
    
    addItem(){
        let item = this.querySelector('#new-item-field').value.trim();
        this.items.push(item);
        this.dispatchItems();
        this.renderList();
    }

    renderList(){
        let that = this;
        this.querySelector('.js-items').innerHTML = `
            <ul>
                ${this.items.map((item,idx)=> `<li> ${item} <button class="rm" aria-label="Delete this item">×</button></li>`).join('')}
            </ul>
        `;

        this.querySelectorAll('.rm').forEach((btn,idx)=>{
            btn.addEventListener('click',(e)=>{
                that.items.splice(idx, 1);
                that.renderList();
                that.dispatchItems();
            });
        });
    }

    dispatchItems(){
        this.dispatchEvent(new CustomEvent('changed',{
            detail : {data : this.items.length},
            bubbles : true
        }));
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


