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

export function loadBuoys() {

}

export function getBuoyLocation () {
  return fetch("/lastData/activestations.xml")
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      // .then(data => console.log(data));
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
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

export function cleanData(buoyData) {
  let validFields = ['YY', 'MM', 'DD', 'hh', 'mm', 'lat', 'lon', 'WDIR', 'WSPD', 'WVHT', 'ATMP', 'WTMP'];
  let numberFields = ['WDIR', 'WSPD', 'WVHT', 'ATMP', 'WTMP'];
  const keys = Object.keys(buoyData);
  const data = Object.values(buoyData);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    let datum = data[i];
    if (!validFields.includes(key) || datum == 'MM') {
      delete buoyData[key];
    } else {
      if (numberFields.includes(key)) {
        buoyData[key] = Number(datum)
      }
    }
  }
  return buoyData;
}

// const keys = Object.keys(yourObject);
// for (let i = 0; i < keys.length; i++) {
//   const key = keys[i];
//   console.log(key, yourObject[key]);
// }