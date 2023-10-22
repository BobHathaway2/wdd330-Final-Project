import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class Buoy {
    constructor (id, lat, lon) {
        this.id = id;
        this.lat = lat;
        this.lon = lon;
        this.init(id, lat,lon);
    }
    async init(id, lat, lon) {
        readBuoyData(id, lat, lon);
    }

}
export function readBuoyData(id, lat, lon) {

    if (localStorage.length == 0) {
        let dataArray = [];
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
            let threeHours = 3*1000*60*60;
            if (age < threeHours) {   // only save new data
                buoyObject.lat = lat;
                buoyObject.lon = lon;
                buoyObject.lastRead = new Date();
                setLocalStorage(id, JSON.stringify(buoyObject));
            }
        })
 
    // } else {
    //     let data = getLocalStorage(id);
    //     let buoyData = JSON.parse(data);
    //     readBuoyData(id, buoyData.lat, buoyData.lon);
    }
}