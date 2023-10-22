import {loadBuoys} from "./ExternalServices.mjs";
import { initCanvas , canvasMajorCities} from "./canvas.mjs";

let map;
// initMap();
initCanvas();
loadBuoys();
canvasMajorCities();
