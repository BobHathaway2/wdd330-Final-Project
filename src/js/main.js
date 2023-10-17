// Initialize and add the map
import { readBuoyData } from "./ExternalServices.mjs";

let map;

async function initMap() {
  // The location of Buoy 41002
  const position = { lat: 31.759, lng: -74.936 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Buoy 41002
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "BUOYS",
  });

  // The marker, positioned at 41002
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "41002",
  });
}
// async function initCanvas() {
//   const canvas = document.getElementById("canvas");
//   const ctx = canvas.getContext("2d");
//   fetch("https://www.ndbc.noaa.gov/activestations.xml")
//       .then(response => response.text())
//       .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
//       .then(data => console.log(data));

//   ctx.beginPath();
//   ctx.arc(100, 75, 1, 0, 2 * Math.PI);
//   ctx.stroke();
// }

async function initCanvas() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  fetch("https://www.ndbc.noaa.gov/activestations.xml")
      .then(response => response.text())
      .then(data => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(data,"application/xml");
        // console.log(xml);
        let stations = xml.getElementsByTagName('station');
        for (let i=0; i< stations.length; i++) {
          let lat = parseFloat((stations[i].getAttribute('lat')));
          let lon = parseFloat((stations[i].getAttribute('lon')));
          let canvasY = 180 + (2*lat);
          let canvasX = 360 + (2*lon);
          ctx.beginPath();
          ctx.arc(canvasX, canvasY, 1, 0, 2 * Math.PI);
          ctx.stroke();
        }
      });

  // ctx.beginPath();
  // ctx.arc(100, 75, 1, 0, 2 * Math.PI);
  // ctx.stroke();
}
// initMap();
initCanvas();
// readBuoyData(41002);