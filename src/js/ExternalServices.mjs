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
function validateDataRead(data) {
  
}