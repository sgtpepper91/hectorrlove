var obj =  {
  x: 300,
  y: 200,
  r: 15,
  vx: 1.5,
  vy: 0
}
var sun = {
  x:300,
  y:300
}
function setup() {
  createCanvas(600, 600);
}

var points = [];
function draw() {
  background(220);
  fill("#FDB813");
  circle(sun.x,sun.y, 60);
  fill("#4f4cb0");
  circle(obj.x, obj.y, obj.r);
  noFill();
  //ellipse(200,200, 250,300);  
  move(obj, sun);
}

function move(obj) {
  var tetha = Math.atan2(sun.y-obj.y, sun.x-obj.x);
  var r = Math.sqrt(Math.pow(sun.y-obj.y,2) + Math.pow(sun.x-obj.x,2));
  var fuerza = 699 / (r*r);
  var ax = fuerza * Math.cos(tetha);
  var ay = fuerza * Math.sin(tetha);
  //console.log(tetha, r, fuerza)
  obj.vx += ax;
  obj.vy += ay;
  obj.x += obj.vx;
  obj.y += obj.vy;
  if(points.length === 0 || points[0].y - obj.y < 0.0001) {
    points.push({x:obj.x, y:obj.y});
    console.log(points.length)
  }

  strokeWeight(1);
  points.forEach(p => point(p.x,p.y));
}