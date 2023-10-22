import Buoy from "./buoy.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { canvasStations } from "./canvas.mjs";
let buoys = [];

export function loadBuoys() {
    try {
        fetch("https://www.ndbc.noaa.gov/activestations.xml")
        // fetch("src/public/lastData/activestations.xml")
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(data,"application/xml");
            // console.log(xml);
            let stations = xml.getElementsByTagName('station');
            for (let i = 0; i < stations.length; i++) {
                let type = stations[i].getAttribute('type');
                let owner = stations[i].getAttribute('owner');
                if (type == "buoy") {
                    let id = stations[i].getAttribute('id');
                    let lat = parseFloat((stations[i].getAttribute('lat')));
                    let lon = parseFloat((stations[i].getAttribute('lon')));
                    let name = stations[i].getAttribute('name');
                    let thisBuoy = new Buoy(id, lat, lon);
                    buoys.push(thisBuoy);
                }
            }
            canvasStations();
        })
    } catch(error) {
        console.log('Unable to fetch NDBC station list', error)
    }

    //     for (let k = 0; k < localStorage.length - 1; k++) {
    //             let buoy = localStorage.key(k)
    //             // console.log(k + ": " + localStorage.key(k));
    //             let data = getLocalStorage(buoy);
    //             let buoyData = JSON.parse(data);
    //             let thisBuoy = new Buoy(buoy, buoyData.lat, buoyData.lon);
    //             buoys.push(thisBuoy);
        
    //     }
    // }
}

export function findAnythingClose(xclicked, yclicked, xoffset, yoffset, scalefactor) {
    let closestDistance = 50000;
    let closestStation = new Buoy;
    for (let buoy of buoys) {
        let xofbuoy = xoffset + (buoy.lon * scalefactor);
        let yofbuoy = yoffset - (buoy.lat * scalefactor);
        let xdistance = Math.sqrt(Math.pow((xofbuoy - xclicked), 2) + Math.pow((yofbuoy - yclicked),2));
        if (xdistance < 5 && xdistance < closestDistance) {
            closestDistance = xdistance;
            closestStation = buoy;
        } 
    }
    return closestStation;
}

