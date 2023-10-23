import {loadBuoysToIS} from "./ExternalServices.mjs";
import { initCanvas , canvasMajorCities} from "./canvas.mjs";
import { drawWaves, drawWinds } from "./weather.js";
import {handleclick} from "./canvas.mjs"

let showWaves = document.getElementById("show-waves");
let showWinds = document.getElementById("show-winds");
let canvas = document.getElementById("canvas");

initCanvas();
loadBuoysToIS();
canvasMajorCities();

showWaves.addEventListener('change', function() {
    if (this.checked) {
        drawWaves();
      } else {
        initCanvas();
        loadBuoysToIS();
        canvasMajorCities();
        if (showWinds.checked) {
            drawWinds();
        }
      }
})

showWinds.addEventListener('change', function() {
    if (this.checked) {
        drawWinds();
      } else {
        initCanvas();
        loadBuoysToIS();
        canvasMajorCities();
        if (showWaves.checked) {
            drawWaves();
        }
      }
})

canvas.addEventListener('click', handleclick, false);
