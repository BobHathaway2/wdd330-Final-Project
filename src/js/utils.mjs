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


// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
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

export function centerOnClickParameters (){

}