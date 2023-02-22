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

function getLocation() {
  function success (data) {
    this.lat = data.coords.latitude;
    this.lng = data.coords.longitude;
    var marker = L.marker([this.lat, this.lng], { icon: personaIcon }).addTo(mymap);
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, console.error);
  }
}



mymap.on('click', function(e) {
  console.log(e);
  var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(mymap);
  L.Routing.control({
    waypoints: [
      L.latLng(this.lat, this.lng),
      L.latLng(e.latlng.lat, e.latlng.lng)
    ],
    router: L.Routing.mapbox('pk.eyJ1IjoicGFsb21hbnIiLCJhIjoiY2xlZzJhdmJ1MHd1MTNwbWpnamo3NDAwMyJ9.Cx4hZdymPRAoUl_siH3I-w')
  }).on('routesfound', function (e) {
    var routes = e.routes;
    console.log(routes);

    e.routes[0].coordinates.forEach(function (coord, index) {
      setTimeout(function () {
        marker.setLatLng([coord.lat, coord.lng]);
      }, 100 * index)
    })

  }).addTo(mymap);

})











