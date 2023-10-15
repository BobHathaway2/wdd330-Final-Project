export function readBuoyData(buoy) {

    let dataArray = [];
    // fetch("https://www.ndbc.noaa.gov/data/realtime2/41002.txt")
    fetch("/lastData/41002.txt")
    .then(response => response.text()) 
    .then(bsvString => {
        //Split the csv into rows
        const rows = bsvString.split('\n');
        for (let row of rows) {
        //Split the row into each of the comma separated values
            // console.log(row.split(/[ ]+/));
            dataArray.push(row.split(/[ ]+/));
        }

        console.log(dataArray);
    });
}
function validateDataRead(data) {
  
}