const mymap = L.map('sample_map').setView([40.741, -3.884], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
  maxZoom: 18
}).addTo(mymap);


var personaIcon = L.icon({
  iconUrl: 'imagenes/persona.png',
  iconSize: [70, 70]
})

var lat = 0;
var lng = 0;
var target = 0;
var marker = L.marker([this.lat, this.lng], { icon: personaIcon })

function getLocation() {
  function success (data) {
    this.lat = data.coords.latitude;
    this.lng = data.coords.longitude;
    this.marker = L.marker([this.lat, this.lng], { icon: personaIcon }).addTo(mymap);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, console.error);
  }
}
mymap.on('click', function(e) {
  console.log(e);
  var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
  target = e.latlng;
  L.Routing.control({
    waypoints: [
      L.latLng(this.lat, this.lng),
      L.latLng(e.latlng.lat, e.latlng.lng)
    ],
    router: L.Routing.mapbox('pk.eyJ1IjoicGFsb21hbnIiLCJhIjoiY2xlZzJhdmJ1MHd1MTNwbWpnamo3NDAwMyJ9.Cx4hZdymPRAoUl_siH3I-w')
  });
})


function comienzaRuta() {
  function success (position) {
    const p = document.querySelector("#geoloc");
    const watchID = navigator.geolocation.watchPosition((position) => {
        p.innerHTML = `${position.coords.latitude}, ${position.coords.longitude}`;
    });
    var distancia_lat_cerca = (this.target.lat - lat)/3;
    var distancia_long_cerca = (this.target.lng - lng)/3;
    var crd = position.coords;
    if (distancia_lat_cerca === crd.latitude && distancia_long_cerca === crd.longitude) {
      while ( this.target.lat != crd.latitude && this.target.lng != crd.longitude) {
        window.navigator.vibrate([200, 100, 200]);
      }
      navigator.geolocation.clearWatch(watchID);
    }
  }
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(success, console.error);
  }
}















