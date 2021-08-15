export default class EventButton extends HTMLElement {
    constructor(){
        super();
        this.timesClicked = 0;

        this.shadowObj = this.attachShadow({mode:'open'});

        this.render();
    }

    getTimeClicked(){
        return `Times clicked : ${this.timesClicked}`
    }

    render(){
        // this.innerHTML = this.getTemplate();
        this.shadowObj.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return `
            <button> Click Me </button>
            <span> ${this.getTimeClicked()} </span>
            ${this.getStyle()}
        `;
    }



    getStyle(){
        return `
            <style>
            :host {
                display : block;
            }

            button {
                height:50px;
                width:200px;
                border-radius:5px
                display:inline-block;
                border: 1px solid #cac6c6
            }
            </style>
        `;
    }

    handleClick(){
        this.timesClicked++;
        this.shadowObj.querySelector('span').innerText = this.getTimeClicked();

        this.dispatchEvent(new CustomEvent('change', {
            detail : {num : this.timesClicked}
        }));
    }

    connectedCallback(){
        this.shadowObj.querySelector('button').addEventListener('click', this.handleClick.bind(this));

    }

    disconnectedCallback(){
        console.log('Button Disconnected Callback');
        this.shadowObj.querySelector('button').removeEventListener('click',this.handleClick);

    }

    static get observedAttributes(){
        console.log('observedAttributes');
        return ['btitle'];
    }

    attributeChangedCallback(attName, oldValue, newValue){
        console.log(attName, oldValue, newValue);
        this.shadowObj.querySelector('button').innerText = newValue;
    }

    adoptedCallback(){
        console.log('move to somewhere');
    }

};

customElements.define('event-button', EventButton);
