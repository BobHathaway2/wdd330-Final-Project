import { draw_wind } from "./canvas.mjs";
import { getLocalStorage } from "./utils.mjs";

export function drawWinds() {
    let buoys = getLocalStorage("buoys");
    buoys.forEach((buoy) => {
        let thisBuoy = getLocalStorage(buoy);
        let airTempColor = "black";
        if (thisBuoy.hasOwnProperty('ATMP') && thisBuoy.hasOwnProperty('WDIR') && thisBuoy.hasOwnProperty('WSPD')) {
            if (thisBuoy.ATMP < 16) {
                    airTempColor = 'blue'
            } else { 
                if (thisBuoy.ATMP < 27) {
                    airTempColor = 'yellow'
                } else {
                    airTempColor = 'red'
                }
            }
        }
        draw_wind(thisBuoy.lat, thisBuoy.lon, thisBuoy.WSPD,  thisBuoy.WDIR, airTempColor)
    })
}


