import L from 'leaflet'

const map = L.map('map')

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 10,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

setInterval(() => {
  fetch('https://api.wheretheiss.at/v1/satellites/25544').then(res => res.json()).then(data => viewit(data))
}, 1000)

const iss = L.icon({
  iconUrl: 'iss.svg',
  iconSize: [64, 40],
  iconAnchor: [32, 20],
})

let ftime = true
let lgroup = L.layerGroup().addTo(map)

const viewit = data => {
  lgroup.clearLayers()
  const { longitude, latitude } = data
  document.querySelector('#lat').innerText = latitude.toFixed(2)
  document.querySelector('#lon').innerText = longitude.toFixed(2)
  ftime ? map.setView([latitude, longitude], 2) : ftime = false
  let marker1 = L.marker([latitude, longitude], { icon: iss })
  lgroup.addLayer(marker1)
}




