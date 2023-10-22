import { draw_wind, putOnCanvas } from "./canvas.mjs";
import { getLocalStorage } from "./utils.mjs";

export function getWinds() {
    for (var i = 1; i < localStorage.length -1; i++) {
        let data = getLocalStorage(localStorage.key(i));
        let thisBuoy = JSON.parse(data);
        let airTempColor = "black";
        if (thisBuoy.ATMP != 'MM') {
            if (thisBuoy.ATMP< 60) {
                    airTempColor = 'blue'
            } else { 
                if (thisBuoy.ATMP< 80) {
                    airTempColor = 'yellow'
                } else {
                    airTempColor = 'red'
                }
            }
        }
        draw_wind(thisBuoy.lat, thisBuoy.lon, thisBuoy.WDSP,  thisBuoy.WDIR, airTempColor)
    }
}


