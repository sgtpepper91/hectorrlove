let angle = 0;
let points = [];
let showCircles = true;
let factor = 5.2; // d1/d2
let h = 1; // distancia al centro2
let d = h<=1 ? 400 : (200*2*factor)/(factor+h-1) ; //diametro círculo grande/
let d2 = d / factor;
function setup() {
  createCanvas(404, 404);
  //noLoop();
}

function draw() {
  background(220);
  translate(202, 202);
  strokeWeight(1);
  stroke("black"); // Change the color
  let x = ((d - d2) / 2) * cos(angle);
  let y = ((d - d2) / 2) * sin(angle);
  let x2 = x + ((h * d2) / 2) * cos(-(factor - 1) * angle);
  let y2 = y + ((h * d2) / 2) * sin(-(factor - 1) * angle);
  points.push({ x: x2, y: y2 });
  if (showCircles) {
    circle(0, 0, d);
    circle(x, y, d2);
    line(x, y, x2, y2);
    strokeWeight(5);
    point(x, y);
    point(x2, y2);
  }
  stroke("green"); // Change the color
  strokeWeight(3);
  for (let i = 0; i < points.length; i++) {
    point(points[i].x, points[i].y);
  }
  angle -= 0.002 * PI;
  if (points.length > 1 && abs(x2 - (d - d2 * (1 - h)) / 2) <= 0.00001 && abs(y2) <= 0.00001) {
    noLoop();
  }
}
