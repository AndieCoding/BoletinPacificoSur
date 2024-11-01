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
        console.log(this.user);
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

        .navUserName {
        display: block;
        color: #551a8b;
        }
        .navMenuIcon {
        display: none;
        }

        .liWithIcon {
        margin-top: 0.3em;
        font-family: var(--bebas);
        letter-spacing: 3px;
        height: 15px;
        }

        .liUserName {
        height: 34px;
        margin-top: 0.3em;
        }

        ul {
        list-style: none;
        margin: 0;
        position: relative;
        }

        .userIcon {
        display: inline;
        position: absolute;
        left: 7px;
        top: 8px;
        width: 25px;
        }

        a {
        text-decoration: none;
        }


        ul li {
        position: relative;
        text-align: left;
        color: #551a8b;
        font-weight: 700;
        text-transform: uppercase;
        background-color: rgb(227, 231, 235);
        border-radius: 10px;
        border: 1px black;
        padding: 12px;
        padding-left: 2.2em;
        font-family: var(--bebas);
        transition: transform 100ms, padding-left 0.5s;

        &:hover {
            cursor: pointer;
            background-color: rgb(238, 191, 121);
            border: 2px solid rgb(174, 113, 0);
            transform: scale(1.07);
            border-radius: 10px;
        }
        }
        

        ul ul {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        }
        ul li:hover > ul {
        display: block;
        padding-left: 0;
        }
        ul ul li {  
        margin-left: 0;
        width: 170px;
        border-radius: 5px;
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
          <li class="liWithIcon">
            <a class="navUserName" href="#"
              ><img class="userIcon" src="./css/img/user.png" />
              <span id="userName">Usuario</span></a
            >
            <span class="navMenuIcon">&#9776;</span>
            <ul>
              <a><li>Ajustes</li></a>
              <li><a id="" href="">Salir</a></li>
            </ul>
          </li>
        </ul>
      </nav>`;
        return template.content.cloneNode(true);
    }
    connectedCallback() {
        this.shadowRoot.appendChild(this.template());        
        this.shadowRoot.querySelector('#userName').innerText = `${this.user.user}`;  
   }

}

customElements.define('menu-component', Menu);
