export default class CompanyLogin extends HTMLElement{
    constructor(){
        super();
        this.username = '';
        this.password = '';
        this.shadowObj = this.attachShadow({mode:'open'});
    }

    render(){
        const template = this.getTemplate();
        this.shadowObj.innerHTML = template;
        // this.innerHTML = template;
    }

    getTemplate(){
        return `
            <input type='text' name='username' placeholder="UserName"/>
            <input type='password' name='password' placeholder="Password"/>
            <button type='submit' class="login-button"> Login </button>
            <style>
            :host {
                display: flex;
                flex-direction: column;
                background: #68afe8;
                padding : 20px;
                width: 400px;
                margin : 0 auto;
            }
            
            :host(.login-failure) {
                background: #f35353;
            }
            :host(.login-success) {
                background: #499c19;
            }
            
            input {
                margin-top: 5px;
                padding : 10px;
                height: 30px;
                font-size: 15px;
                border: none;
                border-radius: 5px;
            }
            
            button {
                margin-top: 15px;
                padding:10px;
                font-size: 15px;
                border: none;
                border-radius: 5px;
                height: 50px;
                cursor: pointer;
            }
            </style>
        `;
    }

    connectedCallback(){
        this.render();
        this.shadowObj.querySelector('button').addEventListener('click',(e)=> this.handleLogin(e));
    }

    handleLogin(e){
        this.username = this.shadowObj.querySelector('[name=username]').value;
        this.password = this.shadowObj.querySelector('[name=password]').value;
        console.log(this.username, this.password);

        let loginSuccess = Math.random();
        if(0.5 < loginSuccess) {
            this.classList.remove('login-failure');
            this.classList.add('login-success');
        } else {
            this.classList.remove('login-success');
            this.classList.add('login-failure');
        }
    }

    disconnectedCallback(){

    }

    adoptedCallback(){

    }

    static get observedAttributes(){
        return [];
    }

    attributeChangedCallback(name, oldValue, newValue){

        this.render();
    }

};

customElements.define('company-login',CompanyLogin);