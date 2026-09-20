let p;
let q;
const RADIUS = 400;
const CANVAS_SIZE = 2 * RADIUS + 20;
let lineColor = "red";
const lineWidth = 4;
let points = [];
let colors = [];
let mcm = 1;
function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
}

/**
 * The draw function is called continuously by p5.js and is responsible for rendering the sketch.
 * It retrieves the values of p and q from the HTML input elements and updates the points array if p has changed.
 * It then sets the value of q and proceeds to clear the canvas, translate the origin, and draw the star using the updated points and q value.
 */
function draw() {
  const pValue = parseInt(document.getElementById("p").value);
  const qValue = parseInt(document.getElementById("q").value);
  let changeColor = false;
  if(p !== pValue) {
    p = pValue;
    points = calculatePoints(p);
    changeColor = true;
  }

  if(q !== qValue) {
    q = qValue;
    changeColor = true;
  }

  if(changeColor) {
    mcm = getMCM(p, q);
    calculateColors();
  }
  
  background(255);
  translate(RADIUS + 10, RADIUS + 10);
  drawStar(points, q);
  changeColor = false;
}

function calculateColors() {
  colors = [];
  for (let i = 0; i < p; i++) {
    colors.push(color(random(255), random(255), random(255)));
  }
}


/**
 * Calculates the points on a circle based on the number of sides.
 * @param {number} p - The number of sides of the circle.
 * @returns {number[]} - An array of points on the circle.
 */
function calculatePoints(p) {
  let points = [PI / 2];
  for (let i = 1; i < p; i++) {
    points.push(points[i - 1] + (2 * PI) / p);
  }
  return points;
}

/**
 * Draws a star shape connecting the given points.
 * 
 * @param {number[]} points - The array of points to connect.
 * @param {number} q - The offset value for selecting points.
 * @returns {void}
 */
function drawStar(points, q) {
  strokeWeight(lineWidth);
  const mcm = getMCM(p, q);
  for (let j = 0; j < points.length; j++) {
    const lineColor = colors[j % mcm];
    stroke(lineColor);
    const k = (j + q) % p; // Selects the next point based on the offset value q.
    line(
      RADIUS * cos(points[j]),
      -RADIUS * sin(points[j]),
      RADIUS * cos(points[k]),
      -RADIUS * sin(points[k])
    );
  }
}

/**
 * Saves the canvas as a PNG image with a filename in the format "star{p}/{q}".
 * 
 * @function saveStar
 * @memberof global
 * @returns {void}
 */
function saveStar() {
  console.log("save", p, q);
  saveCanvas(`star${p}/${q}`, "png");
}

function getMCM(a, b) {
  return b === 0 ? a : getMCM(b, a % b);
}
