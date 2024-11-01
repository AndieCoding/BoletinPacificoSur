export class Card extends HTMLElement {
    constructor(noticia) {
        super();
        this.attachShadow({ mode: 'open' });
        this.image = noticia.image_url;
        this.title = noticia.title;
        this.fecha = noticia.pubDate;
        this.descripcion = noticia.description;
        this.autor = noticia.source_name;
        this.link = noticia.link;
    }
    getStyles() {
        return `
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto+Condensed:ital,wght@0,100..900;1,100..900&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
            :host-context(.portada) {
                .product-name {
                    font-size: 28px;
                }
            }
            
            :host {
                display: block;
            }

            .card {
                font-family: arial;
                border-radius: 10px;
                padding: 1.5em;
                cursor: pointer;
                overflow: hidden;
                box-shadow: 0 0 4px 1px rgb(124, 159, 195, 0.3);
                background-color: white;
                position: relative;
               
                .img {             
                    height: 250px;
                }

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }

                p {
                    text-wrap: balance;
                }

                .buttons {
                    display: flex;
                    justify-content: space-between;
                    gap: 1em;
                }

                .buttons a {
                    display: block;
                    text-decoration: none;
                    background-color: blue;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    padding: 1em 3em;
                    width: fit-content;
                    margin: 0.5em auto;
                }
                .buttons a.agregar {
                    background-color: rgb(59 201 59);
                    color: #eee;
                    font-weight: 600;
                    transition: background-color 0.2s;

                    &:hover {
                        outline: 1px solid green;
                        background-color: rgb(105 225 105);
                        color: #394f4b;
                    }
                }

                input {
                    display: none;
                }
            }

            .product-name {
                font-family: Roboto Condensed;
                font-size: 22px;
                text-transform: uppercase;
                color: #553b28;
                margin: 0.5em 0;      
                text-align: center;
            }
            .price {                
                border-radius: 5px;
                padding: 0;
                font-family: Roboto Condensed;
                font-size: 18px;
                font-weight: 400;
                text-transform: uppercase;
                color: #26313d;
                margin: 0;
                top: 50%;
                right: 20px;
                text-align: center;
            }

            .product-details {
                margin-bottom: 2em;
            }

            .product-marca {
                font-family: Bebas Neue;
                font-size: 20px;
                letter-spacing: 2px;
                text-transform: uppercase;
                color: #53585fd4;
                margin: 0.3em 0;
            }

            .product-description {
                font-family: Roboto Condensed;
                font-size: 16px;
                color: #53585f;
                text-align: center;
            }
            .talon {
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }    
            .talon a {
                text-decoration: none;
                font-weight: 600;
                text-align: right;
            }
        </style>
        `;
    }
    template() {
        const template = document.createElement('template');
        template.innerHTML = `
        ${this.getStyles()}
        <div class="card">
                <a href="/detalle">
                <div class="img">
                    <img src="${this.image}" alt="${this.title}">
                </div>
                </a>
                <div class="product-info">
                    <div>
                        <h3 class="product-name">${this.title}</h3>
                    </div>
                    <div class="product-price">
                       <h4 class="price">${this.fecha}</h4>
                    </div>
                </div>
                <div class="product-details">
                    <h4 class="product-marca">${this.autor}</h4>                
                    <p class="product-description">${this.descripcion}</p>
                </div>
                <div class="talon"><a href="${this.link}" target="_blank">Leer más</a></div>
                
            </div>
        `;
        return template.content.cloneNode(true);
    }
    connectedCallback() {        
        this.image = this.getAttribute('image_url') || '/src/img.webp';
        this.title = this.getAttribute('title') || 'Títular de la noticia';
        this.fecha = this.getAttribute('pub_date') || 'Fecha de publicación';
        this.descripcion = this.getAttribute('description') || 'Cuerpo de la noticia';
        this.autor = this.getAttribute('source_name') || 'Autor de la noticia';
        this.link = this.getAttribute('link') || 'https://www.google.com';

        this.shadowRoot.appendChild(this.template());
    }    
}

customElements.define('news-card', Card);