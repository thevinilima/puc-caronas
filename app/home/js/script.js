const map = L.map('map').setView([-19.93262551194009, -43.936037967999724], 17);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap',
}).addTo(map);

const pucMarker = L.marker([-19.9326551541274, -43.936040839319524]).addTo(map);
const pucPopup = L.popup({
  closeOnClick: false,
  closeButton: false,
  autoClose: false,
}).setContent('<strong>PUC MINAS</strong><div>Praça da Liberdade</div>');
pucMarker.bindPopup(pucPopup).openPopup();

const onLocationFound = e => {
  if (e.type === 'locationerror') return;

  const radius = e.accuracy / 2;

  const locationMarker = L.marker(e.latlng).addTo(map);

  const locationCircle = L.circle(e.latlng, radius).addTo(map);
};

const onLocationError = e => {
  console.error(e);
};

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationFound);

map.locate({ setView: true, maxZoom: 16 });
