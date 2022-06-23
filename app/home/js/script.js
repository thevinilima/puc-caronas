var map = L.map('map').setView([-19.93262551194009, -43.936037967999724], 17)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map)

var marker = L.marker([-19.9326551541274, -43.936040839319524]).addTo(map)
marker.bindPopup('<b>PUC MINAS</b><br>Unidade Praça da Liberdade').openPopup()

function onLocationFound(e) {
  var radius = e.accuracy / 2

  var locationMarker = L.marker(e.latlng).addTo(map)

  var locationCircle = L.circle(e.latlng, radius).addTo(map)
}

function onLocationError(e) {
  alert(e.message)
}

map.on('locationfound', onLocationFound)
map.on('locationerror', onLocationError)

map.locate({ setView: true, maxZoom: 16 })
