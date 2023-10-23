import {loadBuoysToIS} from "./ExternalServices.mjs";
import { initCanvas , canvasMajorCities} from "./canvas.mjs";
import { drawWaves, drawWinds } from "./weather.js";

initCanvas();
loadBuoysToIS();
canvasMajorCities();
drawWinds();
drawWaves();