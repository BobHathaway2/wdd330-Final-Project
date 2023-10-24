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

function CtoF(tempC) {
  return ((tempC * 1.8) + 32);
}

function mToft(meters) {
  return (meters * 3.28); 
}

export function buildInnerHtmlForPopup (station) {
  let stationData = getLocalStorage(station);
  let stationURL = 'https://www.ndbc.noaa.gov/station_page.php?station=' + station;
  let googleURL = 'http://www.google.com/maps/place/' + stationData.lat + ',' + stationData.lon + '/@' + stationData.lat + ',' + stationData.lon + ',7z';
  let localTime = new Date(stationData.dataTime);
  let stationText = 'Station Id: ' + station + 
                    '<br> Location: latitude=' + stationData.lat + ', longitude=' + stationData.lon +
                    '<br> Time of Data: ' + localTime.toLocaleString();
  if (stationData.hasOwnProperty('WSPD')) {
    let windSpeed = (stationData.WSPD * 1.944) + ' knots';
    stationText += '<br> Wind Speed: ' + windSpeed;
  }
  if (stationData.hasOwnProperty('ATMP')) {
    let airTemp = CtoF(stationData.ATMP) + 'F/' + stationData.ATMP + 'C';
    stationText += '<br> Air Temp: ' + airTemp;
  }
  if (stationData.hasOwnProperty('WTMP')){
    let waterTemp = CtoF(stationData.WTMP) + 'F/' + stationData.WTMP + 'C';
    stationText += '<br> Water Temp: ' + waterTemp
  }
  if (stationData.hasOwnProperty('WVHT')){
    let waveHeight = mToft(stationData.WVHT) + 'ft/' + stationData.WVHT + 'm';
    stationText += '<br> Wave Height: ' + waveHeight;
  }
  stationText +=  '<br> <a href="' + stationURL + '" rel="noopener noreferrer"  target="_blank">NOAA NDBC Link</a> <br>' +
                  '<br> <a href="' + googleURL + '" rel="noopener noreferrer"  target="_blank">Google Maps Link</a>';
  return stationText;
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