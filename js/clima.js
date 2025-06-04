import * as functions from "./functions.js";
import { EstacionClimatica } from "./models/station.js";
import { Dolar } from "./web-components/dolar.js";
import { Menu } from "./web-components/menu.js";

const station = new EstacionClimatica();

const user = new functions.User(
  'Admin',
  'admin@pacificosur.com',
  'Argentina',
  'Venado Tuerto',
  'Admin',
  '1234'
);

window.addEventListener('load', async () => {
 setTimeout(() => {      
    document.querySelector('body').classList.remove('no-scroll');
      document.querySelector('.loader').style.display = 'none';
  }, 1000);  
});

document.addEventListener("DOMContentLoaded", async () => {
  const encodedCity = encodeURIComponent(user.city);

  //estilos de la primer card
  const firstCard = document.querySelector('#portada news-card');
  firstCard.shadowRoot.querySelector('.img').style.height = '400px';
  firstCard.shadowRoot.querySelector('.card').style.boxShadow = 'none';

  const formClima = document.querySelector('#formClima');
  formClima.addEventListener("submit", (event) => {
    event.preventDefault();
    obtenerClima();
  });

  try {
    const data = await station.obtenerClima(user.country, encodedCity);  

    const response = await fetch(`https://geocode.maps.co/search?q=${encodedCity}&api_key=65b2703b12bdc409410812jxbd55c41`);
    const result = await response.json();
    if (result) {
      const coord = {
        lat: parseFloat(result[0].lat),
        lon: parseFloat(result[0].lon),
      };
      await functions.insertarMapa(coord.lat, coord.lon);   
    }

  } catch (err) {

    console.error(err);    

  }  
});

async function obtenerClima(city) {
  let localidad = city ? city : document.querySelector("input#localidad").value;
  let pais = "Argentina";

  if (localidad.trim() == "") {
    mostrarError("No se encuentra la localidad");
    return;
  }  
  functions.changeMap(localidad);
  const data = await station.obtenerClima(pais, encodeURIComponent(localidad)); 
  
  if (data.cod == 404) {
    return mostrarError("No se encuentra la localidad");
  } else {
    mostrarResultado(data.humedad, data.tempActual);
  }
}

const divResultados = document.getElementById("resultados");

function mostrarResultado(humedad, temperatura) {
  const localidad = document.getElementById("localidad").value;
  const divExistente = document.querySelector(".map-container");

  if (localidad === "") return;

  if (document.querySelector(".spanTemperatura")) {
    document.querySelector(".spanTemperatura").innerHTML = '<p class="tempLabel">TEMP.<br>ACTUAL</p>' + temperatura + 'º';
    document.querySelector("spanHumedad").innerHTML = '<p class="tempLabel">HUMEDAD</p>' + humedad + '%';
  } else {
    const $spanTemperatura = document.createElement("span");
    $spanTemperatura.classList.add("spanTemperatura");
    $spanTemperatura.innerHTML = '<p class="tempLabel">TEMP.<br>ACTUAL</p>' + temperatura + 'º';
    const $spanHumedad = document.createElement("span");
    $spanHumedad.classList.add("spanHumedad");
    $spanHumedad.innerHTML = '<p class="tempLabel">HUMEDAD</p>' + humedad + '%';
    
    divExistente.appendChild($spanTemperatura);
    divExistente.appendChild($spanHumedad);
  }  
}

function mostrarError(mensaje) {
  const divExistente = document.getElementById("divCondiciones");
  if (divExistente) {
    divExistente.remove();
  }
  const divError = document.createElement("div");
  divError.classList.add("divError");
  divError.innerHTML = `<p id="mensajeError">${mensaje}</p>`;
  divResultados.appendChild(divError);

  setTimeout(() => {
    divError.remove();
  }, 2500);
}

async function changeMap() {
  const encodedCity = encodeURIComponent(
    document.getElementById("localidad").value
  );
  const response = await fetch(
    `https://geocode.maps.co/search?q=${encodedCity}&api_key=65b2703b12bdc409410812jxbd55c41`
  )
    const data = await response.json();
    const coord = {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon),
    };
    functions.changeMap(coord.lat, coord.lon);
}

function resize() {
  const currentHeight = window.innerHeight;
  const currentWidth = window.innerWidth;
  const details = document.querySelectorAll('.details');

  if (Math.abs( currentHeight - initialHeight) < 100 && currentWidth < 800 ) {    
    return;
  }
   
  initialHeight = currentHeight;  

  details.forEach( tag => {
    
    if ( currentWidth < 800 ) {
      tag.removeAttribute('open');
    } else {
      tag.setAttribute('open', 'true');
    }
  })
}

let initialHeight = window.innerHeight;
window.addEventListener('resize', resize);
resize();