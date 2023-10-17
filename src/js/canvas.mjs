const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

export function initCanvas(){
    ctx.fillStyle = "lightblue";
    ctx.fillRect(0,0,720, 360)
}
export function buoysToCanvas(lat, lon, size=1) {
    let canvasY = 180 + (lat * 2);
    let canvasX = 360 + (lon * 2);
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, size, 0, 2 * Math.PI);
    ctx.stroke();
}
