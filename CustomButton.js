export default class CustomButton extends HTMLElement {
    constructor(){
        super();
        this.timesClicked = 0;
        this.render();
    }

    getTimeClicked(){
        return `Times clicked : ${this.timesClicked}`
    }

    render(){
        this.innerHTML = this.getTemplate();
    }

    getTemplate(){
        return `
            <button> Click Me </button>
            <span> ${this.getTimeClicked()} </span>
        `;
    }

    handleClick(){
        this.timesClicked++;
        this.querySelector('span').innerText = this.getTimeClicked();
    }

    connectedCallback(){
        this.querySelector('button').addEventListener('click', this.handleClick.bind(this));
    }

    disconnectedCallback(){
        console.log('Button Disconnected Callback');
        this.querySelector('button').removeEventListener('click',this.handleClick);

    }

    static get observedAttributes(){
        console.log('observedAttributes');
        return ['btitle'];
    }

    attributeChangedCallback(attName, oldValue, newValue){
        console.log(attName, oldValue, newValue);
        this.querySelector('button').innerText = newValue;
    }

    adoptedCallback(){
        console.log('move to somewhere');
    }

};

customElements.define('custom-button', CustomButton);
