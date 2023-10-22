import {loadBuoys} from "./ExternalServices.mjs";
import { initCanvas , canvasMajorCities} from "./canvas.mjs";
import { getWinds, mapStations } from "./weather.js";

let map;
// initMap();
initCanvas();
loadBuoys();
canvasMajorCities();
mapStations();