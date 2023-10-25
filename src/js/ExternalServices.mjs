import { cleanData, getLocalStorage, setLocalStorage } from "./utils.mjs";
import { drawWaves, drawWinds } from "./weather.js";
let buoys = [];

let updateElement = document.getElementById("lastUpdate")
export function loadBuoysToIS() {
    try {
        if (!getLocalStorage("buoys")) {
            fetch("https://www.ndbc.noaa.gov/activestations.xml")
            // fetch("src/public/lastData/activestations.xml")
            .then(response => response.text())
            .then(data => {
                let parser = new DOMParser();
                let xml = parser.parseFromString(data,"application/xml");
                let stations = xml.getElementsByTagName('station');
                let reportingStations = getLocalStorage("reportingStations");
                for (let i = 0; i < stations.length; i++) {
                    let type = stations[i].getAttribute('type');
                    let id = stations[i].getAttribute('id');
                    if (type == "buoy" && reportingStations.includes(id)) {
                    // if (reportingStations.includes(id)) {
                        let lat = parseFloat((stations[i].getAttribute('lat')));
                        let lon = parseFloat((stations[i].getAttribute('lon')));
                        getBuoyData(id, lat, lon)
                    }
                }
            })
            let lastUpdate = new Date().toLocaleString('en-US');
            setLocalStorage("lastUpdate", lastUpdate)
        }
        let storedLastUpdate = getLocalStorage("lastUpdate")
        updateElement.innerHTML = "Last Updated: " + storedLastUpdate;
    } catch(error) {
        console.log('Unable to fetch NDBC station list', error)
    }
}


export function getBuoyData(id, lat, lon) {

    try {
        fetch("https://www.ndbc.noaa.gov/data/realtime2/"+ id + ".txt")
        // fetch("../src/public/lastData/41002.txt")
        .then(response => response.text())
        .then(str => {
            var rows = str.split('\n');
            var cells = []
            cells.push(rows[0].split(/\s+/));
            cells.push(rows[2].split(/\s+/));
            let buoyData = '{';
            for (let i = 0; i < cells[1].length - 1; i++) { 
                buoyData = buoyData + '"' + cells[0][i] + '":"' + cells[1][i] + '",';
            }
            buoyData = buoyData + '"' + cells[0][cells.length-1] + '":"' + cells[1][cells.length-1] + '"}';
            buoyData = buoyData.replace("#", "");
            let buoyObject = JSON.parse(buoyData);
            let lastUpdateUTC = new Date(Date.UTC(buoyObject.YY, buoyObject.MM - 1, buoyObject.DD, buoyObject.hh, buoyObject.mm, '00'));
            let age = new Date() - lastUpdateUTC;
            let threeHours = 10*1000*60*60;
            if (age < threeHours) {   // only save new data
                if (getLocalStorage('buoys')) {
                    buoys = getLocalStorage('buoys');
                }
                buoys.push(id);
                setLocalStorage("buoys", buoys);
                let newBuoyObject = cleanData(buoyObject);
                newBuoyObject.lat = Number(lat);
                newBuoyObject.lon = Number(lon);
                newBuoyObject.lastRead = new Date();
                newBuoyObject.dataTime = lastUpdateUTC;
                setLocalStorage(id, newBuoyObject);
            }
            drawWaves();
            drawWinds();    
        })

    } catch {
        console.log('Unable to fetch NDBC buoy data: ', error)
    } 
}

export function loadReportingBuoys() {
    try {
        let stations = [];
        fetch("https://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt")
        .then(response => response.text())
        .then(str => {
            var rows = str.split('\n');
            for (let i = 2; i < rows.length; i++) {
                var cells = []
                cells.push(rows[i].split(/\s+/))
                stations.push(cells[0][0]);
            }
            setLocalStorage("reportingStations", stations)
        })
    }
    catch(error) {
        console.log('Unable to fetch NDBC reporting stations list', error)
    }
}