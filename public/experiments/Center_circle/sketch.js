function setup() {
  createCanvas(400, 400);
  background(220);
  translate(200,200);
  stroke("black");
  strokeWeight(1);
  circle(0,0,398);
  strokeWeight(4);
  stroke("blue");
  point(0,0);
  let a1 = random(0,2*PI);
  let a2 = random(0,2*PI);
  let a3 = random(0,2*PI);
  let a4 = random(0,2*PI);
  stroke("green");
  strokeWeight(4);
  point(199*cos(a1), 199*sin(a1));
  point(199*cos(a2), 199*sin(a2));
  point(199*cos(a3), 199*sin(a3));
  point(199*cos(a4), 199*sin(a4));
  strokeWeight(1);
  perpendicularLine(199*cos(a1), 199*sin(a1), 199*cos(a2), 199*sin(a2));
  perpendicularLine(199*cos(a3), 199*sin(a3), 199*cos(a4), 199*sin(a4));
}

function perpendicularLine(x1,y1, x2,y2) {
  stroke("red");
  line(x1, y1, x2, y2);
  let mT = -(x1-x2)/(y1-y2);
  let yM = (y1+y2) / 2;
  let xM = (x1+x2) / 2;
  let b = yM - mT * xM;
  let b1 = mT * -200 + b;
  let b2 = mT * 200 + b;
  stroke("orange");
  line(-200,b1, 200,b2);
}