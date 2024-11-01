
class User {
  constructor(name, email, country, city, user, pass) {
    this.name = name;
    this.email = email;
    this.country = country;
    this.city = city;
    this.user = user;
    this.pass = pass;
  }
}

class Manager {
  constructor() {    
  }
  async actualizar(data) {
    const obj = JSON.parse(localStorage.getItem('object'));
    const userLogged = obj.user;
  
    fetch(`http://localhost:3000/api/update/${userLogged}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(
      (response) => response.json()
    ).then(
      (data) => {        
          
        const obj = {
          user: data.userData.user,
          name: data.userData.name,
          email: data.userData.email,
          country: data.userData.country,
          city: data.userData.city,
          pass: data.userData.pass,            
        }          
        localStorage.setItem('object', JSON.stringify(obj))
        
      })
    .catch((error) => console.error("Error:", error));
  }

  async registro(data) {
    try {
      const response = await fetch("http://localhost:3000/api/registro", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
    
      const result = await response.json(); 
      console.log(result);
      return result;
      
    }catch(error) {
      console.error("Error:", error);
    }; 
  }

  async ingresar() {    
    const user = document.getElementById("user").value;
    const pass = document.getElementById("confirmPass").value;
  
    const login = {
      user,
      pass
    };
    try {

      const response = await fetch("http://localhost:3000/api/user", {  
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(login),    
      });

      const result = await response.json();

      if (result) {return result}
      return false;

    } catch (err) {
      console.error("Error during login:", err);
      throw err;
    }
  }

  async eliminar(user) { 
    const response = await fetch(`http://localhost:3000/api/deleteAccount?user=${user}`, {
      method: "DELETE",
    });
    const data = await response.json();
  
    return data;
   }
}
  
let map;
function insertarMapa(lat, lon) {
  map = L.map("map").setView([lat, lon], 12);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map); 
  const circle = L.circle([lat, lon], {
    color: "light-blue",
    fillColor: "#6C98C1",
    fillOpacity: 0.2,
    radius: 6000,
  }).addTo(map);
}
async function changeMap(localidad) {
  const encodedCity = encodeURIComponent(localidad);
  const response = await fetch(
    `https://geocode.maps.co/search?q=${encodedCity}&api_key=65b2703b12bdc409410812jxbd55c41`
  )
  const data = await response.json();    
  const coord = {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };
  map.setView(new L.LatLng(coord.lat, coord.lon), 12);
  const circle = L.circle([coord.lat, coord.lon], {
    color: "light-blue",
    fillColor: "#6C98C1",
    fillOpacity: 0.1,
    radius: 6000,
  }).addTo(map);
}


 
export { 
  insertarMapa,
  changeMap,
  User,
  Manager
};


