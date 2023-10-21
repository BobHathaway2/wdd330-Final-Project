import Buoy from "./buoy.mjs";
import { getLocalStorage, setLocalStorage } from "./utils.mjs";

let buoys = [];


// this was splitting data out
// export function readBuoyData(buoy) {

//     let dataArray = [];
//     // fetch("https://www.ndbc.noaa.gov/data/realtime2/"+ buoy + ".txt")
//     fetch("../src/public/lastData/41002.txt")
//     .then(response => response.text()) 
//     .then(bsvString => {
//         const rows = bsvString.split('\n');
//         for (let row of rows) {
//             dataArray.push(row.split(/[ ]+/));
//         }

//         console.log(dataArray);
//     });
// }

export function loadBuoys() {
    fetch("https://www.ndbc.noaa.gov/activestations.xml")
    // fetch("https://www.ndbc.noaa.gov/data/realtime2/")
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
    })
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

