import {loadBuoysToIS} from "./ExternalServices.mjs";
import { initCanvas , canvasMajorCities} from "./canvas.mjs";
import { drawWinds } from "./weather.js";

initCanvas();
loadBuoysToIS();
canvasMajorCities();
drawWinds();