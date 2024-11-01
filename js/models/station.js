export class EstacionClimatica {
    constructor() {    
    }
    async obtenerClima(localidad) {
      const key = `9963094be793228ca9bf57b5a25bba28`;    
  
      try {
  
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${localidad},'Argentina'&appid=${key}`);
        const result = await response.json();      
        
        const {main: { humidity, temp }} = result;   
        
        let tempActual = (temp - 273.15).toFixed(1);
        let humedad = humidity;     
        console.log({tempActual, humedad});
        return {tempActual, humedad};
      
      } catch (err) {
  
        console.error("Error during fetch:", err);    
        throw err;
  
      }
    }
  
  }