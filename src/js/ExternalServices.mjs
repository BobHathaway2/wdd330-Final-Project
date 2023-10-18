import Buoy from "./buoy.mjs";
import { buoysToCanvas } from "./canvas.mjs";

export function readBuoyData(buoy) {

    let dataArray = [];
    fetch("https://www.ndbc.noaa.gov/data/realtime2/"+ buoy + ".txt")
    // fetch("/lastData/41002.txt")
    .then(response => response.text()) 
    .then(bsvString => {
        const rows = bsvString.split('\n');
        for (let row of rows) {
            dataArray.push(row.split(/[ ]+/));
        }

        console.log(dataArray);
    });
}

export function loadBuoys() {
    fetch("https://www.ndbc.noaa.gov/activestations.xml")
    .then(response => response.text())
    .then(data => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(data,"application/xml");
        // console.log(xml);
        let stations = xml.getElementsByTagName('station');
        const buoys = new Array(stations.length);
        for (let i = 0; i < stations.length; i++) {
            let id = stations[i].getAttribute('id');
            let lat = parseFloat((stations[i].getAttribute('lat')));
            let lon = parseFloat((stations[i].getAttribute('lon')));
            let name = stations[i].getAttribute('name');
            let thisBuoy = new Buoy(id, lat, lon, name);
            buoys.push(thisBuoy);
        }
        buoysToCanvas(buoys);
    })
}