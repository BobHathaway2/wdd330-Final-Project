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
