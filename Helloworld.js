class HelloWorld extends HTMLElement {
    constructor(){
        super();
        const $template = document.querySelector('#hello-world-template');
        const contents = $template.content;

        const shadow = this.attachShadow({mode:'open'});

        shadow.append(contents.cloneNode(true));
    }
}

customElements.define('hello-world', HelloWorld);
const $shadowRoot = document.querySelector('p');
const shadowRoot   = $shadowRoot.attachShadow({mode: 'open'});
const $span        = document.createElement('span');
$span.innerText = "새로운 root를 붙여보자";
shadowRoot.appendChild($span);

const $template = document.querySelector('#my-template');
const contents = $template.content;
document.querySelector('#target').appendChild(contents.cloneNode(true));