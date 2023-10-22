import { findAnythingClose } from "./ExternalServices.mjs";
import Buoy from "./buoy.mjs";
import { getLocalStorage } from "./utils.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "8px Times";
let xoffset = 360;
let yoffset = 180;
let scalefactor = 2;
let latCenter = 0;
let lonCenter = 0;

export function initCanvas(){
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0,720, 360)
}

export function canvasMajorCities() {
    putOnCanvas(40.758701, -111.876183, 1, "SLC", "white");
    putOnCanvas(33.9438, -118.4091, 1, "LAX", "white");
    putOnCanvas(40.7128, -73.935242, 1, "NYC", "white");
    putOnCanvas(47.6061, -122.3328, 1, "SEA", "white");
    putOnCanvas(25.7951, -80.2795, 1, "MIA", "white");
    putOnCanvas(25.7951, -157.8581, 1, "HNL", "white");
    putOnCanvas(61.1771, -149.9907, 1, "ANC", "white");

}

export function putOnCanvas(lat, lon, size=1, text="", color="black") {
    let canvasY = yoffset - (lat * scalefactor);
    let canvasX = xoffset + (lon * scalefactor);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, size, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fillText(text, canvasX, canvasY);
    ctx.fill();
}

function handleclick(event){
    const rect = canvas.getBoundingClientRect();
    var x = event.pageX - rect.left;
    var y = event.pageY - rect.top;
    if (x > 0 && y > 0) {
        // console.log(x);
        // console.log(y);
        let closestStation = findAnythingClose(x,y, xoffset, yoffset,scalefactor).id;
        if (closestStation) {
            let stationURL = "https://www.ndbc.noaa.gov/station_page.php?station=" + closestStation;
            let newwindow=window.open(stationURL,'station','height=400,width=300', 'top=40', 'left=40');
            if (window.focus) {newwindow.focus()}
        }
    }

}


function lineToAngle(ctx, x1, y1, length, angle) {
    angle = (angle - 90) * Math.PI / 180;
    var x2 = x1 + length * Math.cos(angle),
      y2 = y1 + length * Math.sin(angle);
  
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.fill();
  
    return {
      x: x2,
      y: y2
    };
  }
  
  function draw_arrow(ctx, x1, y1, length, angle) {
    var pos = lineToAngle(ctx, x1, y1, length, angle);
    lineToAngle(ctx, pos.x, pos.y, length/5, angle - 150);
    lineToAngle(ctx, pos.x, pos.y, length/5, angle + 150);
  }
  function latToY(lat) {
    let canvasY = yoffset - (lat * scalefactor);
    return canvasY;
  }

  function lonToX(lon) {
    let canvasX = xoffset + (lon * scalefactor);
    return canvasX;
  }
  
  export function draw_wind(lat, lon, length, azm, color="black") {
    let x = lonToX(lon);
    let y = latToY(lat);
    var pos = draw_arrow(ctx, x, y, length, azm);
  
    ctx.strokeStyle = color;
  }
canvas.addEventListener('click', handleclick, false);

export function canvasStations() {
  for (var i = 1; i < localStorage.length -1; i++) {
      let data = getLocalStorage(localStorage.key(i));
      let thisBuoy = JSON.parse(data);
      putOnCanvas(thisBuoy.lat, thisBuoy.lon);
  }
}