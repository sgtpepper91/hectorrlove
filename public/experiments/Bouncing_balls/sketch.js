let ball;
let g;
let m;
let counter
function setup() {
  createCanvas(480, 500);
  g = 0.2;
  m = 0.02;
  ball = [];
  counter = 1;
  for(let i = 0; i<15; i++) {
    ball.push(new Ball(random(width), random(height), 30));
  }
}

function draw() {
  background(220);
  for(let i = 0; i<ball.length; i++) {
    ball[i].move();
    ball[i].show();
  }
}