import { cleanData, getLocalStorage, setLocalStorage } from "./utils.mjs";
let buoys = [];

export function loadBuoysToIS() {
    try {
        if (!getLocalStorage("buoys")) {
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
                    if (type == "buoy") {
                        let id = stations[i].getAttribute('id');
                        let lat = parseFloat((stations[i].getAttribute('lat')));
                        let lon = parseFloat((stations[i].getAttribute('lon')));
                        getBuoyData(id, lat, lon)
                    }
                }
            })
        
        }
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
                setLocalStorage(id, newBuoyObject);
            }
        })

    } catch {
        console.log('Unable to fetch NDBC buoy data: ', error)
    } 
}