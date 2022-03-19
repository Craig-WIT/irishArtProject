const mymap = L.map("mapid").setView([53.1424, 7.6921],5);
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3JhaWctd2l0IiwiYSI6ImNsMHhzdnV0bjA3a3UzaW54N3ZjMXlqZnEifQ.GLTY8zI_FymC9JE_ugB0cw", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
}).addTo(mymap);

const mymap1 = L.map("mapid1").setView([53.1424, 7.6921],5);
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY3JhaWctd2l0IiwiYSI6ImNsMHhzdnV0bjA3a3UzaW54N3ZjMXlqZnEifQ.GLTY8zI_FymC9JE_ugB0cw", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 5,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
}).addTo(mymap);

const  popup = L.popup();

const layerGroup = L.layerGroup().addTo(mymap);

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent(`You clicked the map at ${  e.latlng.toString()}`)
    .openOn(mymap);
}

function addMarker(lat,lng){
  const marker = L.marker([lat, lng]).addTo(layerGroup);
}

mymap.on("click", onMapClick);