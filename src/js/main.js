import {loadBuoysToIS, loadReportingBuoys} from "./ExternalServices.mjs";
import { initCanvas , canvasMajorCities} from "./canvas.mjs";
import { drawWaves, drawWinds } from "./weather.js";
import {handleclick} from "./canvas.mjs"

let showWaves = document.getElementById("show-waves");
let showWinds = document.getElementById("show-winds");
let refresh = document.getElementById("refresh");
let canvas = document.getElementById("canvas");
let clearLS = document.getElementById("clearLS");

function init () {
  loadReportingBuoys();
  initCanvas();
  loadBuoysToIS();
  canvasMajorCities();
}

showWaves.addEventListener('click', function() {
    if (this.checked) {
        drawWaves();
      } else {
        init();
        if (showWinds.checked) {
            drawWinds();
        }
      }
})

showWinds.addEventListener('click', function() {
    if (this.checked) {
        drawWinds();
      } else {
        init();
        if (showWaves.checked) {
            drawWaves();
        }
      }
})

refresh.addEventListener('click', function() {
  localStorage.clear();
  init();
  showWaves.checked = false;
  showWinds.checked = false;
})

clearLS.addEventListener('click', function() {
  localStorage.clear();
})

window.onbeforeunload = function () {
  localStorage.clear();
}

init();
canvas.addEventListener('click', handleclick, false);
