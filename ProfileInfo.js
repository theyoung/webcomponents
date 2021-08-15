export default class ProfileInfo extends HTMLElement {
  constructor() {
    super();
    this.name = "";
    this.desination = "";
    this.idNumber = "";
    this.pictureSrc = "";
    this.employeeType = undefined;

    //for shadowing
    this.shadowObj = this.attachShadow({mode:'open'});
  }

  getTemplate() {
    return `
        <div class="profile-info__container">
            <img class="profile-info__picture"
            src="${this.getAttribute("picture-src")}" />
            <div class="profile-info__text">
                <div class="profile-info__name">
                ${this.getAttribute("name")}
                </div>
                <div class="profile-info__designation">
                ${this.getAttribute("designation")}
                </div>
                <div class="profile-info__id-number">
                ${this.getAttribute("id-number")}
                </div>
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
        font-family: sans-serif;
        }

        :host(.profile-info__emp-type-ft){
        background-color: #7bb57b;
        }
        :host(.profile-info__emp-type-pt){
        background-color: #ffc107;
        }
        :host(.profile-info__emp-type-ct){
        background-color: #03a9f4;
        }
        .profile-info__container {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        }

        .profile-info__picture {
        border-radius: 50%;
        width: 80vw;
        height: 80vw;
        margin: 10px auto;
        }

        .profile-info__text {
        padding: 10px;
        flex : 1;
        }

        .profile-info__name {
        font-size: 22px;
        }

        .profile-info__designation {
        font-size: 22px;
        margin-top: 10px;
        }

        .profile-info__id-number {
        margin-top: 10px;
        }

        @media screen and (min-width: 650px) {
            .profile-info__container {
                flex-direction: row;
                text-align: left;
            }

            .profile-info__picture {
                width: 100px;
                height: 100px;
                margin: 10px;
            }
        }
    </style>
      `;
  }

  render() {


    this.clearEmployeetype();
    // switch(this.employeeType){
    //     case 'ft' :
    //         this.classList.add('profile-info__emp-type-ft');
    //         break;
    //     case 'ct' :
    //         this.classList.add('profile-info__emp-type-ct');
    //         break;

    //     case 'pt' :
    //         this.classList.add('profile-info__emp-type-pt');
    //         break;
    // }

    this.classList.add(`profile-info__emp-type-${this.employeeType?? 'pt'}`);
    // this.innerHTML = this.getTemplate();
    //for shadowing
    this.shadowObj.innerHTML = this.getTemplate();
  }

  clearEmployeetype(){
      this.classList.remove('profile-info__emp-type-ft');
      this.classList.remove('profile-info__emp-type-pt');
      this.classList.remove('profile-info__emp-type-ct');
  }

  connectedCallback() {}

  disconnectedCallback() {}

  adoptedCallback() {}

  static get observedAttributes() {
    return ["name", "designation", "id-number", "picture-src", "employee-type"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    let key = name
      .split("-")
      .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
      .join('');
    key = key.charAt(0).toLowerCase() + key.slice(1);

    this[key] = newValue;
    this.render();
  }
}

customElements.define("profile-info", ProfileInfo);
