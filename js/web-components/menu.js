import * as functions from "../functions.js";

export class Menu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });   
        this.user = new functions.User(
          'Admin',
          'admin@pacificosur.com',
          'Argentina',
          'Venado Tuerto',
          'Admin',
          '1234'
        );
    }
    getStyles() {
        return `
        <style>
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&display=swap');
        :host {
          background-color: rgb(19, 40, 70);
          height: 50px;
          position:absolute;
          width: 100%;
          z-index: 100;
        }
        a{ text-decoration: none; }
        nav {
          height: 50px;
          display: flex;
          margin-inline: auto;
          width: clamp(400px, 80%, 1100px);  
          justify-content: space-between;  
          align-items: center;
        }
        
        .nombre-titular.nav {
          font-size: 32px;
          color: white;
          font-family: Cinzel;
          font-weight: 600;        
        }       

        .userIcon {
          display: inline-block;        
          width: 25px;
        }

        ul {
          list-style: none;
          margin: 0;
          position: relative;
        }

        ul li {
        position: relative;
        font-weight: 700;
        background-color: rgb(227, 231, 235);
        border-radius: 50%;
        border: 1px black;
        padding: 10px;
        transition: transform 100ms;
        width: 20px;
        height: 20px;
        display: flex;
        justify-content: center;
        align-items: center;        

        &:hover {
            cursor: pointer;
            background-color: rgb(252, 210, 146);
            border: 2px solid rgb(174, 113, 0);            
            transform: scale(1.03);
          }
        }
        </style>
        `;
    }

    template() {
        const template = document.createElement('template');
        template.innerHTML = `
        ${this.getStyles()}
        <nav>
        <a href="#">
          <div class="nombre-titular nav">Pacífico Sur</div>
        </a>
        <ul>
          <li>
            <img class="userIcon" src="./css/img/user.png" />         
          </li>
        </ul>
      </nav>`;
        return template.content.cloneNode(true);
    }
    connectedCallback() {
        this.shadowRoot.appendChild(this.template());        
   }

}

customElements.define('menu-component', Menu);
