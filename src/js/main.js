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

initMap();
readBuoyData(41002);