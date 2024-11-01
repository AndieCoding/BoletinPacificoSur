export class Dolar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  getStyles() {
    return `
    
    <style>

      :host {
        display: block;
        font-size: 1.5rem;
        color: black;
        font-family: "Roboto Condensed", sans-serif;
        position: relative;
        
      }

      summary {
        visibility: hidden;

        @media ( width < 700px ) {
          visibility: visible;
          margin-left: 1em;
          font-size: 18px;
          margin: 20px 1em;
          cursor: default;
        }
      }   

      .title {
        font-size: 12px;
        font-weight: 600;
        color: green;
        backdrop-filter: blur(3px);
        position: absolute;
        top: 35px;
        left: 50%;
        padding: 0 0.5rem;
      }

      .dolar-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(40px, 100px));       
        gap: 1rem;
        justify-content: center;
        gap: 1em;
        box-shadow: 0 0 1px 1px #dbdbdb;
        margin: 1rem auto;
        padding: 7px 0;
      }

      .dolar {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 25px 15px 1fr;
        font-size: 14px;
        column-gap: 1em;
      }

      .dolar-type {
        grid-column: 1 / 3;
        grid-row: 1 / 2;
        font-size: 1.2rem;
        font-weight: bold;
        text-transform: uppercase;
        margin: 0;
        color: #696767;
      }

      .transaction-type {
        font-size: 0.8rem;
        color: #373f7e;
      }
    </style>
    `;
  }
  
  template() {
    const template = document.createElement("template");
    template.innerHTML = 
    ` 
    ${this.getStyles()}
    <details>
      <summary>EL DÓLAR</summary>
      <div class="title">EL DÓLAR HOY</div>
      <div class="dolar-container"></div>
    </details>
    `;
    return template.content.cloneNode(true);
  }

  connectedCallback() {
    this.shadowRoot.appendChild(this.template());
    this.insertDollars();
    this.checkWindowWidth();

    this.resizeHandler = this.checkWindowWidth.bind(this);
    window.addEventListener('resize', this.resizeHandler);
  }

  checkWindowWidth() {
    const $details = this.shadowRoot.querySelector('details');
    if (window.innerWidth < 700) {
      $details.removeAttribute('open');
    } else {
      $details.setAttribute('open', '');
    }
  }

  async insertDollars() {
    const response = await fetch('https://dolarapi.com/v1/dolares');
    const dollars = await response.json();
    //console.log(dollars);
    this.shadowRoot.querySelector(".dolar-container").innerHTML = dollars.map( (dolar) => {
        if (dolar.nombre == 'Contado con liquidación') dolar.nombre = 'C. con Liqui';
        return `
        <div class="dolar">
            <p class="dolar-type">${dolar.nombre.slice(0,17)}</p>
            <span class="dolar-amount">${dolar.compra}</span>
            <span class="dolar-amount">${dolar.venta}</span>
            <span class="transaction-type">COMPRA</span>
            <span class="transaction-type">VENTA</span>
        </div>`
    }).join('');
  }
}

customElements.define("dolar-component", Dolar);