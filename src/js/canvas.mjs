import { centerOnClickParameters, findAnythingClose} from "./utils.mjs";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.font = "8px Times";
let xoffset = 360;
let yoffset = 180;
let scalefactor = 2;
let latCenter = 0;
let lonCenter = 0;
let canvasX = 720;
let canvasY = 360;

export function initCanvas(){
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvasX, canvasY);
}

export function canvasMajorCities() {
    putOnCanvas(40.758701, -111.876183, 1, "SLC", "black");
    putOnCanvas(33.9438, -118.4091, 1, "LAX", "black");
    putOnCanvas(40.7128, -73.935242, 1, "NYC", "black");
    putOnCanvas(47.6061, -122.3328, 1, "SEA", "black");
    putOnCanvas(25.7951, -80.2795, 1, "MIA", "black");
    putOnCanvas(25.7951, -157.8581, 1, "HNL", "black");
    putOnCanvas(61.1771, -149.9907, 1, "ANC",   "black");

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

export function handleclick(event){
    const rect = canvas.getBoundingClientRect();
    var x = event.pageX - rect.left;
    var y = event.pageY - rect.top;
    let closestStation = "";
    if (x > 0 && y > 0) {
        // console.log(x);
        // console.log(y);
        closestStation = findAnythingClose(x,y, xoffset, yoffset,scalefactor).id;
        if (closestStation) {
            let stationURL = "https://www.ndbc.noaa.gov/station_page.php?station=" + closestStation;
            let newwindow=window.open(stationURL,'station','height=400,width=300', 'top=40', 'left=40');
            if (window.focus) {newwindow.focus()}
        }
    }
    centerOnClickParameters(x, y, rect.left, rect.top, scalefactor, latCenter, lonCenter)

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
    lineToAngle(ctx, pos.x, pos.y, length/5, angle - 135);
    lineToAngle(ctx, pos.x, pos.y, length/5, angle + 135);
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
    var pos = draw_arrow(ctx, x, y, length*2, azm);
  
    ctx.strokeStyle = color;
  }

  export function draw_wave(lat, lon, height, color="black") {
    let x = lonToX(lon);
    let y = latToY(lat);
    height = height*5;
    var pos = lineToAngle(ctx, x, y, height, 20);
    lineToAngle(ctx, pos.x, pos.y, height, 160);
    ctx.strokeStyle = color;
  }

