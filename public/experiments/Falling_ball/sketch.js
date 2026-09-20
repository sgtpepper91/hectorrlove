let g;
let tetha;
let ball1;
let a;
let b;
let c;
let x1, y1, x2, y2;

function setup() {
  createCanvas(400, 400);
  g = 0.2;
  tetha = atan(200 / 360);
  x1 = 20;
  y1 = 200;
  x2 = 380;
  y2 = 400;
  a = -0.0012;
  b = (a * (x2 * x2 - x1 * x1) + y1 - y2) / (x1 - x2);
  c = (a * x1 * x2 * (x1 - x2) + x1 * y2 - x2 * y1) / (x1 - x2);
  let m = 2 * a * x1 + b;
  let angle = atan(m);
  ball1 = new Ball(20, 200, 15, tetha);
  ball2 = new Ball(20, 200, 15, angle);
}

function draw() {
  background(220);
  stroke(0);
  strokeWeight(1);
  line(20, 200, 380, 400);
  line(20, 200, 20, 400);
  fill(255, 0, 0, 100);
  parabola(20, 200, 380, 400);
  if (ball1.x < 380 || ball1.y < 400) {
    ball1.moveLine();
  } else {
    ball1.x = x1 + 15 * sin(tetha);
    ball1.y = y1 - 15 * cos(tetha);
    ball1.vx = 0;
    ball1.vy = 0;
  }
  ball1.show(tetha);
  if (ball2.x < 380 || ball2.y < 400) {
    ball2.moveParabola();
  } else {
    let m = 2 * a * x1 + b;
    let angle = atan(m);
    ball2.x = x1 + 15 * sin(angle);
    ball2.y = y1 - 15 * cos(angle);
    ball2.vx = 0;
    ball2.vy = 0;
  }
  ball2.show();
}


function parabola(x1, y1, x2, y2) {
  for (let i = x1; i <= x2; i++) {
    let j = a * i * i + b * i + c;
    stroke("blue");
    point(i, j);
  }
}