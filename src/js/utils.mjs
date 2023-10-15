const myElement = document.getElementById("demo");

export function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    myElement.innerHTML = "Geolocation is not supported by this browser.";
  }
}

export function showPosition(position) {
  myElement.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
}

export function getBuoyInfo(buoy) {
    fetch("./41002.txt")
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
}
let buoy = [
  {"buoy": "NE Extension", "longitude": -23, "latitude": 12},
  {"buoy": "SLC", "longitude":  40.044502, "latitude": 111.890},
  {"buoy": "NYC", "longitude": -74.020219, "latitude": 40.578912},
  {"buoy": "NYC", "longitude": -73.992833, "latitude": 40.634345},
  {"buoy": "NYC", "longitude": -74.120332, "latitude": 40.484633}
];